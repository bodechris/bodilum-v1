import { env } from "@/lib/env";
import type { PlaceDetails, PlaceSummary } from "@/types/prospect";

type GoogleDisplayName = { text?: string };
type GooglePlace = {
  id?: string; displayName?: GoogleDisplayName; formattedAddress?: string;
  primaryTypeDisplayName?: GoogleDisplayName; businessStatus?: string; googleMapsUri?: string;
  websiteUri?: string; rating?: number; userRatingCount?: number; nationalPhoneNumber?: string;
  internationalPhoneNumber?: string; regularOpeningHours?: { weekdayDescriptions?: string[] }; types?: string[];
};
const GOOGLE_TIMEOUT_MS = 12_000;
const GOOGLE_PAGE_SIZE = 20;
export const DEFAULT_PROSPECT_RESULT_COUNT = 50;
export const MAX_PROSPECT_RESULT_COUNT = 500;
export const GOOGLE_TEXT_SEARCH_RESULT_LIMIT = 60;

function normalisePlace(place: GooglePlace): PlaceSummary {
  return {
    id: place.id ?? "", name: place.displayName?.text ?? "Unnamed business",
    address: place.formattedAddress ?? "Address unavailable",
    primaryType: place.primaryTypeDisplayName?.text ?? "Business",
    businessStatus: place.businessStatus, googleMapsUri: place.googleMapsUri,
    website: place.websiteUri, rating: place.rating, reviewCount: place.userRatingCount,
    phone: place.nationalPhoneNumber,
  };
}

async function googleFetch(url: string, init: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GOOGLE_TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal, cache: "no-store" });
    if (!response.ok) {
      const providerMessage = (await response.text()).slice(0, 800);
      console.error("Google Places request failed", { status: response.status, providerMessage });
      throw new Error(`Google Places returned ${response.status}`);
    }
    return response;
  } finally { clearTimeout(timeout); }
}

export async function searchPlaces(
  textQuery: string,
  requestedCount = DEFAULT_PROSPECT_RESULT_COUNT,
): Promise<PlaceSummary[]> {
  if (!env.googlePlacesApiKey) throw new Error("GOOGLE_PLACES_API_KEY is not configured");

  const targetCount = Math.min(
    MAX_PROSPECT_RESULT_COUNT,
    Math.max(1, Math.trunc(requestedCount)),
  );
  const placesById = new Map<string, PlaceSummary>();
  const seenPageTokens = new Set<string>();
  let pageToken: string | undefined;

  do {
    const remaining = targetCount - placesById.size;
    const response = await googleFetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": env.googlePlacesApiKey,
        "X-Goog-FieldMask": [
          "places.id",
          "places.displayName",
          "places.formattedAddress",
          "places.primaryTypeDisplayName",
          "places.businessStatus",
          "places.googleMapsUri",
          "nextPageToken",
        ].join(","),
      },
      body: JSON.stringify({
        textQuery,
        pageSize: Math.min(GOOGLE_PAGE_SIZE, remaining),
        rankPreference: "RELEVANCE",
        ...(pageToken ? { pageToken } : {}),
      }),
    });
    const payload = (await response.json()) as { places?: GooglePlace[]; nextPageToken?: string };

    for (const place of payload.places ?? []) {
      const normalised = normalisePlace(place);
      if (!normalised.id || normalised.businessStatus === "CLOSED_PERMANENTLY") continue;
      placesById.set(normalised.id, normalised);
      if (placesById.size >= targetCount) break;
    }

    const nextPageToken = payload.nextPageToken;
    if (!nextPageToken || seenPageTokens.has(nextPageToken)) break;
    seenPageTokens.add(nextPageToken);
    pageToken = nextPageToken;
  } while (placesById.size < targetCount);

  return Array.from(placesById.values()).slice(0, targetCount);
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetails> {
  if (!env.googlePlacesApiKey) throw new Error("GOOGLE_PLACES_API_KEY is not configured");
  const response = await googleFetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
    headers: {
      "X-Goog-Api-Key": env.googlePlacesApiKey,
      "X-Goog-FieldMask": ["id","displayName","formattedAddress","primaryTypeDisplayName","businessStatus","googleMapsUri","websiteUri","rating","userRatingCount","nationalPhoneNumber","internationalPhoneNumber","regularOpeningHours","types"].join(","),
    },
  });
  const place = (await response.json()) as GooglePlace;
  return { ...normalisePlace(place), internationalPhone: place.internationalPhoneNumber, openingHours: place.regularOpeningHours?.weekdayDescriptions ?? [], types: place.types ?? [] };
}

export function demoPlaces(textQuery: string): PlaceSummary[] {
  const category = textQuery.split(" in ")[0] || "Local business";
  return [
    { id: "demo-1", name: `Apex ${category}`, address: "Central business district · Demo result", primaryType: category, businessStatus: "OPERATIONAL", googleMapsUri: "https://maps.google.com", rating: 4.8, reviewCount: 286, demo: true },
    { id: "demo-2", name: `The Modern ${category}`, address: "Popular neighbourhood · Demo result", primaryType: category, businessStatus: "OPERATIONAL", googleMapsUri: "https://maps.google.com", rating: 4.6, reviewCount: 94, demo: true },
    { id: "demo-3", name: `${category} Collective`, address: "City centre · Demo result", primaryType: category, businessStatus: "OPERATIONAL", googleMapsUri: "https://maps.google.com", rating: 4.9, reviewCount: 41, demo: true },
  ];
}
