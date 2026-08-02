import dns from "node:dns/promises";
import net from "node:net";
import * as cheerio from "cheerio";
import robotsParser from "robots-parser";
import type { WebsiteEvidence } from "@/types/prospect";

const USER_AGENT = "BodilumProspectFinder/1.0 (+https://tools.bodilum.com)";
const MAX_PAGES = 5;
const MAX_PAGE_BYTES = 1_000_000;
const MAX_TOTAL_TEXT = 70_000;
const REQUEST_TIMEOUT_MS = 10_000;

function isPrivateIpv4(address: string) {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) return true;
  const [a, b] = parts;
  return (
    a === 10 ||
    a === 127 ||
    a === 0 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127) ||
    a >= 224
  );
}

function isPrivateIp(address: string) {
  const version = net.isIP(address);
  if (version === 4) return isPrivateIpv4(address);
  if (version === 6) {
    const normalised = address.toLowerCase();
    return (
      normalised === "::1" ||
      normalised.startsWith("fc") ||
      normalised.startsWith("fd") ||
      normalised.startsWith("fe80") ||
      normalised === "::"
    );
  }
  return true;
}

async function assertPublicHttpUrl(input: string) {
  const url = new URL(input);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error("Only http and https websites can be analysed");
  }
  if (url.username || url.password) throw new Error("Websites containing embedded credentials cannot be analysed");
  if (url.port && !["80", "443"].includes(url.port)) throw new Error("Only standard website ports can be analysed");
  url.hash = "";

  const hostname = url.hostname.toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".local") || hostname === "169.254.169.254") {
    throw new Error("Private or internal websites cannot be analysed");
  }

  const addresses = await dns.lookup(hostname, { all: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateIp(address))) {
    throw new Error("Private or internal websites cannot be analysed");
  }

  return url;
}

async function readLimitedText(response: Response) {
  const contentLength = Number(response.headers.get("content-length") ?? 0);
  if (contentLength > MAX_PAGE_BYTES) throw new Error("Page is too large to analyse safely");

  if (!response.body) return "";
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let output = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_PAGE_BYTES) {
      await reader.cancel();
      throw new Error("Page is too large to analyse safely");
    }
    output += decoder.decode(value, { stream: true });
  }

  output += decoder.decode();
  return output;
}

async function safeFetch(input: string, redirectCount = 0): Promise<{ response: Response; finalUrl: string }> {
  if (redirectCount > 3) throw new Error("Too many redirects");
  const url = await assertPublicHttpUrl(input);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml,text/plain;q=0.8,*/*;q=0.5",
      },
      redirect: "manual",
      signal: controller.signal,
      cache: "no-store",
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) throw new Error("Redirect without a location header");
      const nextUrl = new URL(location, url).toString();
      return safeFetch(nextUrl, redirectCount + 1);
    }

    return { response, finalUrl: url.toString() };
  } finally {
    clearTimeout(timeout);
  }
}

function normaliseText(text: string) {
  return text.replace(/\s+/g, " ").replace(/\u00a0/g, " ").trim();
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function extractPage(html: string, pageUrl: string) {
  const $ = cheerio.load(html);
  const title = normaliseText($("title").first().text()) || new URL(pageUrl).pathname || "Page";

  const emails = new Set<string>();
  const phones = new Set<string>();
  const socialLinks = new Set<string>();
  const bookingLinks = new Set<string>();
  const internalLinks: string[] = [];

  $("a[href]").each((_, element) => {
    const href = $(element).attr("href")?.trim();
    if (!href) return;
    const anchorText = normaliseText($(element).text()).toLowerCase();

    if (href.toLowerCase().startsWith("mailto:")) {
      emails.add(href.slice(7).split("?")[0].toLowerCase());
      return;
    }
    if (href.toLowerCase().startsWith("tel:")) {
      phones.add(href.slice(4));
      return;
    }

    try {
      const resolved = new URL(href, pageUrl);
      const hostname = resolved.hostname.toLowerCase();
      if (["instagram.com", "www.instagram.com", "facebook.com", "www.facebook.com", "linkedin.com", "www.linkedin.com", "tiktok.com", "www.tiktok.com", "x.com", "twitter.com"].some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))) {
        socialLinks.add(resolved.toString());
      }
      if (/book|appointment|reserve|schedule|fresha|calendly|setmore|treatwell/i.test(`${href} ${anchorText}`)) {
        bookingLinks.add(resolved.toString());
      }
      if (resolved.hostname === new URL(pageUrl).hostname) internalLinks.push(resolved.toString());
    } catch {
      // Ignore malformed links.
    }
  });

  const rawText = $("body").text();
  for (const match of rawText.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)) {
    emails.add(match[0].toLowerCase());
  }

  for (const match of rawText.matchAll(/(?:\+?\d[\d\s().-]{7,}\d)/g)) {
    const phone = normaliseText(match[0]);
    if (phone.length <= 24) phones.add(phone);
  }

  $("script, style, noscript, svg, canvas, iframe, nav").remove();
  const text = normaliseText($("main").text() || $("body").text()).slice(0, 24_000);

  return {
    title,
    text,
    emails: [...emails],
    phones: [...phones],
    socialLinks: [...socialLinks],
    bookingLinks: [...bookingLinks],
    internalLinks,
  };
}

function linkPriority(link: string) {
  const path = new URL(link).pathname.toLowerCase();
  const keywords = ["about", "service", "product", "contact", "book", "appointment", "team", "location", "branch", "faq", "price"];
  const index = keywords.findIndex((keyword) => path.includes(keyword));
  return index === -1 ? 999 : index;
}

export async function crawlWebsite(input: string): Promise<WebsiteEvidence> {
  const start = input.startsWith("http") ? input : `https://${input}`;
  const startUrl = await assertPublicHttpUrl(start);
  const notes: string[] = [];
  let robots = robotsParser(new URL("/robots.txt", startUrl).toString(), "");

  try {
    const { response } = await safeFetch(new URL("/robots.txt", startUrl).toString());
    if (response.ok) robots = robotsParser(new URL("/robots.txt", startUrl).toString(), await readLimitedText(response));
  } catch {
    notes.push("The website did not provide a readable robots.txt file.");
  }

  const queue = [startUrl.toString()];
  const visited = new Set<string>();
  const pages: WebsiteEvidence["pagesAnalysed"] = [];
  const emails: string[] = [];
  const phones: string[] = [];
  const socialLinks: string[] = [];
  const bookingLinks: string[] = [];
  let totalText = 0;

  while (queue.length && pages.length < MAX_PAGES && totalText < MAX_TOTAL_TEXT) {
    const url = queue.shift()!;
    if (visited.has(url)) continue;
    visited.add(url);

    if (robots.isAllowed(url, USER_AGENT) === false) {
      notes.push(`Skipped ${new URL(url).pathname || "/"} because robots.txt disallows access.`);
      continue;
    }

    try {
      const { response, finalUrl } = await safeFetch(url);
      const contentType = response.headers.get("content-type") ?? "";
      if (!response.ok || !contentType.includes("text/html")) continue;
      const html = await readLimitedText(response);
      const page = extractPage(html, finalUrl);
      if (!page.text) continue;

      pages.push({ title: page.title, url: finalUrl, text: page.text });
      totalText += page.text.length;
      emails.push(...page.emails);
      phones.push(...page.phones);
      socialLinks.push(...page.socialLinks);
      bookingLinks.push(...page.bookingLinks);

      const nextLinks = unique(page.internalLinks)
        .filter((link) => new URL(link).hostname === startUrl.hostname)
        .sort((a, b) => linkPriority(a) - linkPriority(b));

      for (const link of nextLinks) {
        if (queue.length + pages.length >= MAX_PAGES * 4) break;
        if (!visited.has(link) && linkPriority(link) < 999) queue.push(link);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown fetch error";
      notes.push(`Could not analyse ${new URL(url).pathname || "/"}: ${message}`);
    }
  }

  if (!pages.length) notes.push("No readable public website pages were available, so confidence may be lower.");

  return {
    website: startUrl.toString(),
    pagesAnalysed: pages,
    emails: unique(emails).slice(0, 12),
    phones: unique(phones).slice(0, 12),
    socialLinks: unique(socialLinks).slice(0, 12),
    bookingLinks: unique(bookingLinks).slice(0, 12),
    pageTitles: pages.map((page) => page.title),
    notes,
  };
}
