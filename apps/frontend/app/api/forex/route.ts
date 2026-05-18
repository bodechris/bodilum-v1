import { NextResponse } from "next/server";

const DEFAULT_BASE_CURRENCY = "USD";

async function readFrankfurterRate(currency: string) {
  const response = await fetch(
    `https://api.frankfurter.app/latest?from=${DEFAULT_BASE_CURRENCY}&to=${currency}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    rates?: Record<string, number>;
  };
  const rate = payload.rates?.[currency];

  return typeof rate === "number" && Number.isFinite(rate) && rate > 0 ? rate : null;
}

async function readOpenExchangeRate(currency: string) {
  const response = await fetch("https://open.er-api.com/v6/latest/USD", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    rates?: Record<string, number>;
  };
  const rate = payload.rates?.[currency];

  return typeof rate === "number" && Number.isFinite(rate) && rate > 0 ? rate : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("currency")?.trim().toUpperCase();

  if (!currency || !/^[A-Z]{3}$/.test(currency)) {
    return NextResponse.json(
      {
        message: "A valid ISO 4217 currency code is required.",
      },
      { status: 400 },
    );
  }

  if (currency === DEFAULT_BASE_CURRENCY) {
    return NextResponse.json({
      base: DEFAULT_BASE_CURRENCY,
      currency,
      rate: 1,
    });
  }

  const rate = await readFrankfurterRate(currency) ?? await readOpenExchangeRate(currency);

  if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
    return NextResponse.json(
      {
        message: "Failed to fetch a valid forex rate.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    base: DEFAULT_BASE_CURRENCY,
    currency,
    rate,
  });
}