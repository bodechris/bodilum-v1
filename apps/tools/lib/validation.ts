import { z } from "zod";

const trimmed = (max: number) => z.string().trim().min(1).max(max);
const optionalTrimmed = (max: number) => z.string().trim().max(max).default("");

export const SearchRequestSchema = z.object({
  category: trimmed(120),
  location: trimmed(180),
});

export const BusinessProfileSchema = z.object({
  businessName: trimmed(140),
  website: optionalTrimmed(500).refine(
    (value) => !value || /^https?:\/\//i.test(value) || /^[a-z0-9.-]+\.[a-z]{2,}/i.test(value),
    "Enter a valid business website.",
  ),
  industry: trimmed(140),
  description: trimmed(2500),
  offers: z.array(z.object({ name: trimmed(180), description: trimmed(1600) })).min(1).max(5),
  contactName: optionalTrimmed(160),
  contactEmail: optionalTrimmed(254).refine(
    (value) => !value || z.string().email().safeParse(value).success,
    "Enter a valid email address.",
  ),
  contactPhone: optionalTrimmed(80),
});

export const PlaceSummarySchema = z.object({
  id: trimmed(500),
  name: trimmed(240),
  address: trimmed(500),
  primaryType: trimmed(180),
  businessStatus: z.string().trim().max(80).optional(),
  googleMapsUri: z.string().trim().max(1000).optional(),
  website: z.string().trim().max(1000).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().min(0).optional(),
  phone: z.string().trim().max(100).optional(),
  demo: z.boolean().optional(),
});

export const AnalyseRequestSchema = z.object({
  profile: BusinessProfileSchema,
  place: PlaceSummarySchema,
});

export function firstValidationMessage(error: z.ZodError) {
  return error.issues[0]?.message ?? "The submitted information is invalid.";
}
