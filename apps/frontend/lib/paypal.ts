type PayPalEnv = "sandbox" | "live";

const PAYPAL_API_BASE_URLS: Record<PayPalEnv, string> = {
  sandbox: "https://api-m.sandbox.paypal.com",
  live: "https://api-m.paypal.com",
};

function getPayPalEnv(): PayPalEnv {
  return process.env.PAYPAL_ENV === "live" ? "live" : "sandbox";
}

export function getPayPalBaseUrl() {
  return PAYPAL_API_BASE_URLS[getPayPalEnv()];
}

export function getPayPalBrandName() {
  return process.env.PAYPAL_BRAND_NAME?.trim() || "Bodilum Multimedia";
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3010";
}

export function assertPayPalEnv() {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    throw new Error(
      "PayPal is not configured. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in apps/frontend/.env.local.",
    );
  }

  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error(
      "Set NEXT_PUBLIC_SITE_URL in apps/frontend/.env.local so PayPal can return to your site.",
    );
  }
}

export async function getPayPalAccessToken() {
  assertPayPalEnv();

  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`,
  ).toString("base64");

  const response = await fetch(`${getPayPalBaseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | { access_token?: string; error_description?: string }
    | null;

  if (!response.ok || !payload?.access_token) {
    throw new Error(payload?.error_description || "Failed to get PayPal access token.");
  }

  return payload.access_token;
}