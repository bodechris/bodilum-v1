import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { generateProspectReport } from "@/lib/analysis";
import { crawlWebsite } from "@/lib/crawler";
import { getPlaceDetails } from "@/lib/google-places";
import { consumeDailyLimit, getRequestIdentity, RateLimitUnavailableError, refundDailyLimit } from "@/lib/rate-limit";
import { AnalyseRequestSchema, firstValidationMessage } from "@/lib/validation";
import type { PlaceDetails, WebsiteEvidence } from "@/types/prospect";

export const runtime = "nodejs";
export const maxDuration = 120;
export const dynamic = "force-dynamic";
const MAX_REQUEST_BYTES = 45_000;

export async function POST(request: Request) {
  let identity = ""; let reserved = false;
  try {
    if (!env.prospectAnalysisEnabled) return NextResponse.json({ error: "Prospect analysis is temporarily unavailable." }, { status: 503 });
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_REQUEST_BYTES) return NextResponse.json({ error: "The analysis request is too large." }, { status: 413 });
    const parsed = AnalyseRequestSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: firstValidationMessage(parsed.error) }, { status: 400 });
    const { profile, place: selectedPlace } = parsed.data;
    identity = getRequestIdentity(request);
    const rateLimit = await consumeDailyLimit(identity, "analysis", env.analysisDailyLimit);
    if (!rateLimit.allowed) return NextResponse.json({ error: "You have reached today's free analysis limit.", rateLimit }, { status: 429 });
    reserved = true;
    let place: PlaceDetails;
    if (selectedPlace.demo || !env.googlePlacesApiKey) {
      if (!env.demoMode && !env.googlePlacesApiKey) throw new Error("Google Places is not configured");
      place = { ...selectedPlace, openingHours: [], types: [selectedPlace.primaryType] };
    } else { place = await getPlaceDetails(selectedPlace.id); }
    let evidence: WebsiteEvidence | null = null;
    if (place.website) {
      try { evidence = await crawlWebsite(place.website); }
      catch (error) { console.warn("Website crawl was unavailable", { name: error instanceof Error ? error.name : "UnknownError", message: error instanceof Error ? error.message.slice(0, 500) : "Unknown error" }); }
    }
    const report = await generateProspectReport(profile, place, evidence);
    return NextResponse.json({ report, place, rateLimit });
  } catch (error) {
    if (reserved && identity) await refundDailyLimit(identity, "analysis").catch(() => undefined);
    console.error("Prospect analysis request failed", { name: error instanceof Error ? error.name : "UnknownError", message: error instanceof Error ? error.message.slice(0, 700) : "Unknown error" });
    if (error instanceof RateLimitUnavailableError) return NextResponse.json({ error: error.message }, { status: 503 });
    return NextResponse.json({ error: "Unable to analyse this prospect right now. Please try again shortly." }, { status: 502 });
  }
}
