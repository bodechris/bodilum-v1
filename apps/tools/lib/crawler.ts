import dns from "node:dns/promises";
import net from "node:net";
import * as cheerio from "cheerio";
import robotsParser from "robots-parser";
import { sanitiseEmails, sanitisePhones } from "@/lib/contact-utils";
import type { PublicPerson, WebsiteEvidence } from "@/types/prospect";

const USER_AGENT = "BodilumProspectFinder/1.1 (+https://tools.bodilum.com)";
const MAX_PAGES = 7;
const MAX_PAGE_BYTES = 1_000_000;
const MAX_TOTAL_TEXT = 78_000;
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
  if (!["http:", "https:"].includes(url.protocol)) {
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

const ROLE_PATTERN = /\b(?:founder|co-founder|owner|chair(?:man|woman|person)?|chief executive officer|ceo|managing director|executive director|non-executive director|general manager|hotel manager|property manager|regional manager|operations director|operations manager|head of operations|commercial director|finance director|chief financial officer|cfo|legal counsel|general counsel|head of legal|company secretary|procurement director|procurement manager|human resources director|hr director|head of human resources|marketing director|marketing manager|customer experience lead|partner|principal|director|vice president|president)\b/i;
const NAME_PATTERN = /^[A-Z][A-Za-zÀ-ÖØ-öø-ÿ'’.-]+(?:\s+[A-Z][A-Za-zÀ-ÖØ-öø-ÿ'’.-]+){1,4}$/;
const NON_NAME_PATTERN = /\b(?:about|contact|services|service|team|management|leadership|careers|privacy|terms|hotel|restaurant|company|group|home|welcome|book|booking)\b/i;

function validPersonName(value: string) {
  const name = normaliseText(value).replace(/\s*[|–—-]\s*.*$/, "");
  return name.length >= 5 && name.length <= 90 && NAME_PATTERN.test(name) && !NON_NAME_PATTERN.test(name);
}

function addPerson(people: PublicPerson[], nameValue: unknown, roleValue: unknown, sourceUrl: string) {
  if (typeof nameValue !== "string" || typeof roleValue !== "string") return;
  const name = normaliseText(nameValue);
  const role = normaliseText(roleValue);
  if (!validPersonName(name) || !ROLE_PATTERN.test(role)) return;
  const key = `${name.toLowerCase()}|${role.toLowerCase()}`;
  if (!people.some((person) => `${person.name.toLowerCase()}|${person.role.toLowerCase()}` === key)) {
    people.push({ name, role, sourceUrl });
  }
}

function walkStructuredData(value: unknown, sourceUrl: string, people: PublicPerson[]) {
  if (Array.isArray(value)) {
    value.forEach((item) => walkStructuredData(item, sourceUrl, people));
    return;
  }
  if (!value || typeof value !== "object") return;
  const record = value as Record<string, unknown>;
  const rawType = record["@type"];
  const types = Array.isArray(rawType) ? rawType : [rawType];
  if (types.some((type) => typeof type === "string" && type.toLowerCase() === "person")) {
    addPerson(people, record.name, record.jobTitle ?? record.role, sourceUrl);
  }
  for (const nested of Object.values(record)) walkStructuredData(nested, sourceUrl, people);
}

function extractVisiblePeople($: cheerio.CheerioAPI, pageUrl: string, people: PublicPerson[]) {
  $("h1, h2, h3, h4, h5, strong, b, [class*='name'], [class*='person']").each((_, element) => {
    const name = normaliseText($(element).text());
    if (!validPersonName(name)) return;

    let container = $(element);
    for (let depth = 0; depth < 5 && container.length; depth += 1) {
      const context = normaliseText(container.text()).slice(0, 520);
      const roleMatch = context.match(ROLE_PATTERN);
      if (roleMatch) {
        const escapedRole = roleMatch[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const roleContext = context.match(new RegExp(`[^.!?]{0,90}${escapedRole}[^.!?]{0,120}`, "i"))?.[0] ?? roleMatch[0];
        addPerson(people, name, roleContext, pageUrl);
        return;
      }
      container = container.parent();
    }
  });

  // Team and leadership cards often keep the name and role in sibling elements rather
  // than a heading. Inspect likely cards as a second, conservative pass.
  $("article, li, [class*='team'], [class*='leadership'], [class*='director'], [class*='management'], [class*='person']").each((_, element) => {
    const context = normaliseText($(element).text()).slice(0, 600);
    const roleMatch = context.match(ROLE_PATTERN);
    if (!roleMatch) return;
    const candidates = $(element)
      .find("h2, h3, h4, h5, strong, [class*='name']")
      .map((__, candidate) => normaliseText($(candidate).text()))
      .get()
      .filter(validPersonName);
    if (!candidates.length) return;
    addPerson(people, candidates[0], roleMatch[0], pageUrl);
  });
}


function extractPage(html: string, pageUrl: string) {
  const $ = cheerio.load(html);
  const title = normaliseText($("title").first().text()) || new URL(pageUrl).pathname || "Page";

  const emailCandidates: string[] = [];
  const phoneCandidates: string[] = [];
  const socialLinks = new Set<string>();
  const bookingLinks = new Set<string>();
  const internalLinks: string[] = [];
  const people: PublicPerson[] = [];

  $("script[type='application/ld+json']").each((_, element) => {
    try {
      walkStructuredData(JSON.parse($(element).text()), pageUrl, people);
    } catch {
      // Ignore malformed structured data.
    }
  });
  extractVisiblePeople($, pageUrl, people);

  $("a[href]").each((_, element) => {
    const href = $(element).attr("href")?.trim();
    if (!href) return;
    const anchorText = normaliseText($(element).text()).toLowerCase();

    if (href.toLowerCase().startsWith("mailto:")) {
      emailCandidates.push(href);
      return;
    }
    if (href.toLowerCase().startsWith("tel:")) {
      phoneCandidates.push(href);
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
  for (const match of rawText.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)) emailCandidates.push(match[0]);

  // Phone numbers are deliberately extracted only from likely contact areas. Scanning all
  // page text tends to misclassify dates, coordinates, prices and analytics values as phones.
  const contactText = $("header, footer, address, [class*='contact'], [id*='contact'], [class*='phone'], [id*='phone'], [class*='telephone'], [id*='telephone']")
    .map((_, element) => $(element).text())
    .get()
    .join(" ");
  for (const match of contactText.matchAll(/(?<!\d)(?:\+?\d[\d\s()./-]{5,20}\d)(?!\d)/g)) phoneCandidates.push(match[0]);

  $("script, style, noscript, svg, canvas, iframe, nav").remove();
  const text = normaliseText($("main").text() || $("body").text()).slice(0, 24_000);

  return {
    title,
    text,
    emails: sanitiseEmails(emailCandidates),
    phones: sanitisePhones(phoneCandidates),
    socialLinks: [...socialLinks],
    bookingLinks: [...bookingLinks],
    internalLinks,
    people,
  };
}

function linkPriority(link: string) {
  const path = new URL(link).pathname.toLowerCase();
  const keywords = ["team", "our-team", "our-people", "people", "leadership", "management", "executive", "board", "governance", "directors", "about", "contact", "service", "product", "legal", "corporate", "book", "appointment", "location", "branch", "faq", "price"];
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
  const people: PublicPerson[] = [];
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
      for (const person of page.people) {
        if (!people.some((existing) => existing.name.toLowerCase() === person.name.toLowerCase() && existing.role.toLowerCase() === person.role.toLowerCase())) {
          people.push(person);
        }
      }

      const nextLinks = unique(page.internalLinks)
        .filter((link) => new URL(link).hostname === startUrl.hostname)
        .sort((a, b) => linkPriority(a) - linkPriority(b));

      for (const link of nextLinks) {
        if (queue.length + pages.length >= MAX_PAGES * 5) break;
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
    emails: sanitiseEmails(emails).slice(0, 8),
    phones: sanitisePhones(phones).slice(0, 8),
    socialLinks: unique(socialLinks).slice(0, 12),
    bookingLinks: unique(bookingLinks).slice(0, 12),
    pageTitles: pages.map((page) => page.title),
    people: people.slice(0, 12),
    notes,
  };
}
