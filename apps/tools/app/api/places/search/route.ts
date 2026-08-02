import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { demoPlaces, searchPlaces } from "@/lib/google-places";
import { consumeDailyLimit, getRequestIdentity, RateLimitUnavailableError, refundDailyLimit } from "@/lib/rate-limit";
import { firstValidationMessage, SearchRequestSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const maxDuration = 30;
export const dynamic = "force-dynamic";
const MAX_REQUEST_BYTES = 12_000;

export async function POST(request: Request) {
  let identity = ""; let reserved = false;
  try {
    if (!env.prospectSearchEnabled) return NextResponse.json({ error: "Prospect search is temporarily unavailable." }, { status: 503 });
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_REQUEST_BYTES) return NextResponse.json({ error: "The search request is too large." }, { status: 413 });
    const parsed = SearchRequestSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: firstValidationMessage(parsed.error) }, { status: 400 });
    identity = getRequestIdentity(request);
    const rateLimit = await consumeDailyLimit(identity, "search", env.searchDailyLimit);
    if (!rateLimit.allowed) return NextResponse.json({ error: "You have reached today's search limit.", rateLimit }, { status: 429 });
    reserved = true;
    const textQuery = `${parsed.data.category} in ${parsed.data.location}`;
    if (!env.googlePlacesApiKey) {
      if (!env.demoMode) {
        await refundDailyLimit(identity, "search"); reserved = false;
        return NextResponse.json({ error: "Google Places is not configured yet." }, { status: 503 });
      }
      return NextResponse.json({ places: demoPlaces(textQuery), demo: true, rateLimit });
    }
    const places = await searchPlaces(textQuery);
    return NextResponse.json({ places, demo: false, rateLimit });
  } catch (error) {
    if (reserved && identity) await refundDailyLimit(identity, "search").catch(() => undefined);
    console.error("Prospect search failed", { name: error instanceof Error ? error.name : "UnknownError", message: error instanceof Error ? error.message.slice(0, 700) : "Unknown error" });
    if (error instanceof RateLimitUnavailableError) return NextResponse.json({ error: error.message }, { status: 503 });
    return NextResponse.json({ error: "Unable to search for businesses right now. Please try again shortly." }, { status: 502 });
  }
}
