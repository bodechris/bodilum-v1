const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;

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

export function normaliseEmailCandidate(value: string): string | null {
  const decoded = safeDecode(value)
    .replace(/^mailto:/i, "")
    .split("?")[0]
    .trim()
    .toLowerCase();
  const email = trimContactPunctuation(decoded);
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) return null;
  if (/\.(png|jpe?g|gif|svg|webp|pdf)$/i.test(email)) return null;
  const [local, domain] = email.split("@");
  if (!local || !domain) return null;
  if (/^(?:example|test|yourname|your-name|name|email|noreply|no-reply|donotreply|do-not-reply)$/i.test(local)) return null;
  if (/^(?:example\.(?:com|org|net)|localhost|invalid)$/i.test(domain)) return null;
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
  return [...new Set(values.map((value) => (value ? normaliseEmailCandidate(value) : null)).filter((value): value is string => Boolean(value)))];
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
      if (!['http:', 'https:'].includes(url.protocol)) continue;
      url.hash = "";
      const key = `${url.hostname.replace(/^www\./, "").toLowerCase()}${url.pathname.replace(/\/$/, "")}`;
      websites.set(key, url.toString());
    } catch {
      // Ignore invalid website candidates.
    }
  }
  return [...websites.values()];
}
