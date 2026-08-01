import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { generateProspectReport } from "@/lib/analysis";
import { crawlWebsite } from "@/lib/crawler";
import { getPlaceDetails } from "@/lib/google-places";
import { consumeDailyLimit, getRequestIdentity } from "@/lib/rate-limit";
import type { BusinessProfile, PlaceDetails, PlaceSummary, WebsiteEvidence } from "@/types/prospect";

export const runtime = "nodejs";
export const maxDuration = 120;

function validProfile(profile: BusinessProfile) {
  return Boolean(
    profile?.businessName?.trim() &&
      profile?.industry?.trim() &&
      profile?.description?.trim() &&
      Array.isArray(profile?.offers) &&
      profile.offers.some((offer) => offer.name?.trim() && offer.description?.trim()),
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { profile?: BusinessProfile; place?: PlaceSummary };
    if (!body.profile || !validProfile(body.profile) || !body.place?.id) {
      return NextResponse.json(
        { error: "Complete your business profile and select a prospect before analysing." },
        { status: 400 },
      );
    }

    const identity = getRequestIdentity(request);
    const rateLimit = await consumeDailyLimit(identity, "analysis", env.analysisDailyLimit);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "You have reached today's free analysis limit.", rateLimit },
        { status: 429 },
      );
    }

    let place: PlaceDetails;
    if (body.place.demo || !env.googlePlacesApiKey) {
      place = {
        ...body.place,
        website: body.place.website,
        phone: body.place.phone,
        openingHours: [],
        types: [body.place.primaryType],
      };
    } else {
      place = await getPlaceDetails(body.place.id);
    }

    let evidence: WebsiteEvidence | null = null;
    if (place.website) {
      try {
        evidence = await crawlWebsite(place.website);
      } catch (error) {
        console.error("Website crawl failed", error);
      }
    }

    const report = await generateProspectReport(body.profile, place, evidence);
    return NextResponse.json({ report, place, rateLimit });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unable to analyse this prospect.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
