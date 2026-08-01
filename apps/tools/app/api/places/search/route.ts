import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { demoPlaces, searchPlaces } from "@/lib/google-places";
import { consumeDailyLimit, getRequestIdentity } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { category?: string; location?: string };
    const category = body.category?.trim();
    const location = body.location?.trim();

    if (!category || !location) {
      return NextResponse.json({ error: "Enter both a prospect category and a location." }, { status: 400 });
    }

    const identity = getRequestIdentity(request);
    const rateLimit = await consumeDailyLimit(identity, "search", env.searchDailyLimit);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "You have reached today's search limit.", rateLimit },
        { status: 429 },
      );
    }

    const textQuery = `${category} in ${location}`;
    if (!env.googlePlacesApiKey) {
      if (!env.demoMode) {
        return NextResponse.json(
          { error: "Google Places is not configured yet. Add GOOGLE_PLACES_API_KEY in Vercel." },
          { status: 503 },
        );
      }
      return NextResponse.json({ places: demoPlaces(textQuery), demo: true, rateLimit });
    }

    const places = await searchPlaces(textQuery);
    return NextResponse.json({ places, demo: false, rateLimit });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unable to search for businesses.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
