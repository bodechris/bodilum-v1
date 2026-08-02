const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

const BLOCKED_EMAIL_DOMAIN_PARTS = [
  "sentry",
  "wixpress",
  "googleusercontent",
  "cloudfront",
  "amazonaws",
  "vercel-dns",
  "webpack",
];

const PUBLIC_EMAIL_ROOTS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "yahoo.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
]);

const MULTI_PART_PUBLIC_SUFFIXES = new Set([
  "co.za",
  "com.ng",
  "co.uk",
  "com.au",
  "co.nz",
  "co.ke",
  "co.ug",
  "co.bw",
  "co.zw",
  "com.gh",
  "com.br",
  "com.mx",
  "com.sg",
  "com.my",
  "com.tr",
]);

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function trimContactPunctuation(value: string) {
  return value.trim().replace(/^[\s,;:|<>()[\]{}]+|[\s,;:|<>()[\]{}.!?]+$/g, "");
}

function domainRoot(hostname: string) {
  const host = hostname.toLowerCase().replace(/^www\./, "").replace(/\.$/, "");
  const parts = host.split(".").filter(Boolean);
  if (parts.length <= 2) return host;
  const lastTwo = parts.slice(-2).join(".");
  return MULTI_PART_PUBLIC_SUFFIXES.has(lastTwo)
    ? parts.slice(-3).join(".")
    : lastTwo;
}

function looksMachineGeneratedLocalPart(local: string) {
  const compact = local.replace(/[._+-]/g, "");
  if (/^[a-f0-9]{16,}$/i.test(compact)) return true;
  if (/^[a-z0-9]{28,}$/i.test(compact) && /[a-z]/i.test(compact) && /\d/.test(compact)) return true;
  if (/^(?:sentry|webpack|vite|chunk|trace|telemetry|monitoring)[._+-]/i.test(local)) return true;
  return false;
}

export function normaliseEmailCandidate(value: string): string | null {
  const decoded = safeDecode(value)
    .replace(/^mailto:/i, "")
    .split("?")[0]
    .trim()
    .toLowerCase();
  const email = trimContactPunctuation(decoded);
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) return null;
  if (/\.(png|jpe?g|gif|svg|webp|pdf)$/i.test(email)) return null;
  const atIndex = email.lastIndexOf("@");
  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  if (!local || !domain) return null;
  if (/^(?:example|test|yourname|your-name|name|email|noreply|no-reply|donotreply|do-not-reply)$/i.test(local)) return null;
  if (/^(?:example\.(?:com|org|net)|localhost|invalid)$/i.test(domain)) return null;
  if (looksMachineGeneratedLocalPart(local)) return null;
  if (BLOCKED_EMAIL_DOMAIN_PARTS.some((part) => domain.includes(part))) return null;
  if (domain.split(".").some((part) => part.length > 63)) return null;
  return email;
}

function looksLikeDateOrCoordinate(value: string) {
  const compact = value.trim();
  if (/[-+]?\d{1,3}\.\d{4,}/.test(compact)) return true;
  if (/\b(?:19|20)\d{2}[\s./-]+(?:0?[1-9]|1[0-2])(?:[\s./-]+(?:0?[1-9]|[12]\d|3[01]))?\b/.test(compact)) return true;
  if (/\b(?:0?[1-9]|[12]\d|3[01])[\s./-]+(?:0?[1-9]|1[0-2])[\s./-]+(?:19|20)?\d{2}\b/.test(compact)) return true;
  return false;
}

export function normalisePhoneCandidate(value: string): string | null {
  let decoded = safeDecode(value)
    .replace(/^tel:/i, "")
    .split(/[?#]/)[0]
    .replace(/(?:ext\.?|extension|x)\s*\d+$/i, "")
    .trim();

  decoded = trimContactPunctuation(decoded);
  if (!decoded || looksLikeDateOrCoordinate(decoded)) return null;
  if (/[a-z]/i.test(decoded.replace(/(?:ext\.?|extension)/gi, ""))) return null;

  const hasLeadingPlus = /^\s*\+/.test(decoded);
  const digits = decoded.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  if (/^(\d)\1+$/.test(digits)) return null;
  if (/^(?:0123456789|1234567890|9876543210)$/.test(digits)) return null;

  return hasLeadingPlus ? `+${digits}` : digits;
}

export function sanitiseEmails(values: Array<string | null | undefined>) {
  return [...new Set(values
    .map((value) => (value ? normaliseEmailCandidate(value) : null))
    .filter((value): value is string => Boolean(value)))];
}

export function sanitiseEmailsForWebsites(
  values: Array<string | null | undefined>,
  websites: Array<string | null | undefined>,
) {
  const officialRoots = new Set<string>();
  for (const website of websites) {
    if (!website) continue;
    try {
      const url = new URL(website.startsWith("http") ? website : `https://${website}`);
      officialRoots.add(domainRoot(url.hostname));
    } catch {
      // Ignore invalid official website candidates.
    }
  }

  const emails = sanitiseEmails(values);
  if (!officialRoots.size) return emails;

  return emails.filter((email) => {
    const domain = email.slice(email.lastIndexOf("@") + 1);
    const root = domainRoot(domain);
    return officialRoots.has(root) || PUBLIC_EMAIL_ROOTS.has(root);
  });
}

export function sanitisePhones(values: Array<string | null | undefined>) {
  const byNumber = new Map<string, string>();
  for (const value of values) {
    if (!value) continue;
    const normalised = normalisePhoneCandidate(value);
    if (!normalised) continue;
    const digits = normalised.replace(/\D/g, "");
    const key = digits.length >= 9 ? digits.slice(-9) : digits;
    const current = byNumber.get(key);
    if (!current || (normalised.startsWith("+") && !current.startsWith("+"))) {
      byNumber.set(key, normalised);
    }
  }
  return [...byNumber.values()];
}

export function sanitiseWebsites(values: Array<string | null | undefined>) {
  const websites = new Map<string, string>();
  for (const value of values) {
    if (!value) continue;
    try {
      const url = new URL(value.startsWith("http") ? value : `https://${value}`);
      if (!["http:", "https:"].includes(url.protocol)) continue;
      url.hash = "";
      const key = `${url.hostname.replace(/^www\./, "").toLowerCase()}${url.pathname.replace(/\/$/, "")}`;
      websites.set(key, url.toString());
    } catch {
      // Ignore invalid website candidates.
    }
  }
  return [...websites.values()];
}
