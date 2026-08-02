import { z } from "zod";

const trimmed = (max: number) => z.string().trim().min(1).max(max);
const draftText = (max: number) => z.string().trim().max(max).default("");

export const SearchRequestSchema = z.object({
  category: trimmed(120),
  location: trimmed(180),
});

const OfferDraftSchema = z.object({
  name: draftText(180),
  description: draftText(1600),
});

export const BusinessProfileDraftSchema = z.object({
  businessName: draftText(140),
  website: draftText(500).refine(
    (value) => !value || /^https?:\/\//i.test(value) || /^[a-z0-9.-]+\.[a-z]{2,}/i.test(value),
    "Enter a valid business website.",
  ),
  industry: draftText(140),
  description: draftText(2500),
  offers: z.array(OfferDraftSchema).min(1).max(5),
  contactName: draftText(160),
  contactEmail: draftText(254).refine(
    (value) => !value || z.string().email().safeParse(value).success,
    "Enter a valid email address.",
  ),
  contactPhone: draftText(80).refine(
    (value) => !value || value.replace(/\D/g, "").length >= 7,
    "Enter a valid phone or WhatsApp number.",
  ),
});

export const BusinessProfileSchema = BusinessProfileDraftSchema.superRefine((value, context) => {
  if (!value.businessName) {
    context.addIssue({ code: "custom", path: ["businessName"], message: "Enter your business name." });
  }
  if (!value.industry) {
    context.addIssue({ code: "custom", path: ["industry"], message: "Enter your industry." });
  }
  if (!value.description) {
    context.addIssue({ code: "custom", path: ["description"], message: "Describe the outcomes your business creates." });
  }
  if (!value.offers.some((offer) => offer.name && offer.description)) {
    context.addIssue({ code: "custom", path: ["offers"], message: "Add at least one complete product or service." });
  }
  if (!value.contactName) {
    context.addIssue({ code: "custom", path: ["contactName"], message: "Enter the name that should appear in the outreach." });
  }
  if (!value.contactEmail && !value.contactPhone) {
    context.addIssue({ code: "custom", path: ["contactEmail"], message: "Add an email address or phone/WhatsApp number for the outreach signature." });
  }
});

export const ProspectFinderPreferencesSchema = z.object({
  profile: BusinessProfileDraftSchema,
  targetCategory: draftText(120),
  targetLocation: draftText(180),
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
