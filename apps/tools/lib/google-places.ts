import { env } from "@/lib/env";
import type { PlaceDetails, PlaceSummary } from "@/types/prospect";

type GoogleDisplayName = { text?: string };

type GooglePlace = {
  id?: string;
  displayName?: GoogleDisplayName;
  formattedAddress?: string;
  primaryTypeDisplayName?: GoogleDisplayName;
  businessStatus?: string;
  googleMapsUri?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  types?: string[];
};

function normalisePlace(place: GooglePlace): PlaceSummary {
  return {
    id: place.id ?? "",
    name: place.displayName?.text ?? "Unnamed business",
    address: place.formattedAddress ?? "Address unavailable",
    primaryType: place.primaryTypeDisplayName?.text ?? "Business",
    businessStatus: place.businessStatus,
    googleMapsUri: place.googleMapsUri,
    website: place.websiteUri,
    rating: place.rating,
    reviewCount: place.userRatingCount,
    phone: place.nationalPhoneNumber,
  };
}

export async function searchPlaces(textQuery: string): Promise<PlaceSummary[]> {
  if (!env.googlePlacesApiKey) {
    throw new Error("GOOGLE_PLACES_API_KEY is not configured");
  }

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
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
      ].join(","),
    },
    body: JSON.stringify({
      textQuery,
      pageSize: 12,
      rankPreference: "RELEVANCE",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Google Places search failed (${response.status}): ${message}`);
  }

  const payload = (await response.json()) as { places?: GooglePlace[] };
  return (payload.places ?? []).map(normalisePlace).filter((place) => place.id);
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetails> {
  if (!env.googlePlacesApiKey) {
    throw new Error("GOOGLE_PLACES_API_KEY is not configured");
  }

  const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
    headers: {
      "X-Goog-Api-Key": env.googlePlacesApiKey,
      "X-Goog-FieldMask": [
        "id",
        "displayName",
        "formattedAddress",
        "primaryTypeDisplayName",
        "businessStatus",
        "googleMapsUri",
        "websiteUri",
        "rating",
        "userRatingCount",
        "nationalPhoneNumber",
        "internationalPhoneNumber",
        "regularOpeningHours",
        "types",
      ].join(","),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Google Place Details failed (${response.status}): ${message}`);
  }

  const place = (await response.json()) as GooglePlace;
  return {
    ...normalisePlace(place),
    internationalPhone: place.internationalPhoneNumber,
    openingHours: place.regularOpeningHours?.weekdayDescriptions ?? [],
    types: place.types ?? [],
  };
}

export function demoPlaces(textQuery: string): PlaceSummary[] {
  const category = textQuery.split(" in ")[0] || "Local business";
  return [
    {
      id: "demo-1",
      name: `Apex ${category}`,
      address: "Central business district · Demo result",
      primaryType: category,
      businessStatus: "OPERATIONAL",
      googleMapsUri: "https://maps.google.com",
      rating: 4.8,
      reviewCount: 286,
      demo: true,
    },
    {
      id: "demo-2",
      name: `The Modern ${category}`,
      address: "Popular neighbourhood · Demo result",
      primaryType: category,
      businessStatus: "OPERATIONAL",
      googleMapsUri: "https://maps.google.com",
      rating: 4.6,
      reviewCount: 94,
      demo: true,
    },
    {
      id: "demo-3",
      name: `${category} Collective`,
      address: "City centre · Demo result",
      primaryType: category,
      businessStatus: "OPERATIONAL",
      googleMapsUri: "https://maps.google.com",
      rating: 4.9,
      reviewCount: 41,
      demo: true,
    },
  ];
}
