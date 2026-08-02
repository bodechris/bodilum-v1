import { ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { z } from "zod";
import { getBedrockClient } from "@/lib/bedrock";
import { bedrockConfigured, env } from "@/lib/env";
import type {
  BusinessProfile,
  PlaceDetails,
  ProspectReport,
  WebsiteEvidence,
} from "@/types/prospect";

function cleanWebsite(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function tierFromScore(score: number): ProspectReport["priority"] {
  if (score >= 8.5) return "Tier A";
  if (score >= 7) return "Tier B";
  if (score >= 5.5) return "Tier C";
  return "Low priority";
}

function fallbackReport(
  profile: BusinessProfile,
  place: PlaceDetails,
  evidence: WebsiteEvidence | null,
): ProspectReport {
  const reviews = place.reviewCount ?? 0;
  const rating = place.rating ?? 0;
  const hasWebsite = Boolean(place.website);
  const hasBooking = Boolean(evidence?.bookingLinks.length);

  let score = 5.1;
  if (reviews >= 250) score += 1.5;
  else if (reviews >= 80) score += 1;
  else if (reviews >= 20) score += 0.5;
  if (rating >= 4.7) score += 0.7;
  else if (rating >= 4.3) score += 0.4;
  if (hasWebsite) score += 0.5;
  if (hasBooking) score += 0.3;
  if (profile.offers.length >= 3) score += 0.3;
  score = Math.min(9.2, Number(score.toFixed(1)));

  const sender = profile.website
    ? `${profile.businessName} (${cleanWebsite(profile.website)})`
    : profile.businessName;
  const primaryOffer = profile.offers[0]?.name || "our services";
  const targetOutcome = profile.offers[0]?.description || profile.description;
  const email = evidence?.emails[0];

  return {
    prospectName: place.name,
    prospectScore: score,
    confidence: evidence?.pagesAnalysed.length ? "Medium" : "Low",
    priority: tierFromScore(score),
    oneLineVerdict: `${place.name} appears to be a commercially active business with enough visible demand to justify personalised outreach.`,
    commerciallyAttractive: [
      {
        title: "Visible customer demand",
        evidence: reviews
          ? `${place.name} has approximately ${reviews.toLocaleString()} public ratings/reviews and a ${rating || "strong"} rating.`
          : "The business is publicly listed and operational in the selected market.",
        whyItMatters: "Existing demand makes it easier to sell an improvement that converts more of the attention they already receive.",
      },
      {
        title: "Clear commercial offering",
        evidence: `${place.name} is positioned as a ${place.primaryType.toLowerCase()} with a public customer journey${hasWebsite ? " and an active website" : ""}.`,
        whyItMatters: "Businesses with a clear offer can usually measure the value of better lead generation, conversion or operations.",
      },
      {
        title: "Reachable prospect",
        evidence: email
          ? `A public email address was found: ${email}.`
          : place.phone
            ? `A public telephone number is available: ${place.phone}.`
            : "A public Google Maps route is available for initial contact research.",
        whyItMatters: "A practical contact route reduces the friction involved in testing a personalised outreach angle.",
      },
    ],
    opportunity: [
      {
        title: `Apply ${primaryOffer} to a visible business outcome`,
        description: `Position ${profile.businessName} around the result described in your offer: ${targetOutcome}`,
        outcome: "A specific commercial promise is more compelling than a broad list of capabilities.",
      },
      {
        title: "Improve the enquiry-to-action journey",
        description: `Review how customers move from Google or the website to contact, booking, purchase or follow-up. ${hasBooking ? "A booking path exists, so the opportunity is to improve completion and follow-up rather than replace it." : "There may be room to create a clearer next step for interested customers."}`,
        outcome: "Fewer interested customers fall through the cracks.",
      },
    ],
    bestAngle: {
      headline: `Help ${place.name} turn more existing attention into measurable customer action.`,
      explanation: `Lead with the business outcome your strongest offer can create for ${place.name}. Use their visible reputation and current customer journey as evidence that the opportunity is worth improving.`,
      avoidLeadingWith: "Do not begin with tools, software, AI or a complete redesign. Begin with the revenue, customer-experience or operational outcome.",
    },
    objections: [
      {
        objection: "We already have a website or an existing supplier.",
        response: "Position the work as improving a specific commercial journey or measurable outcome rather than replacing everything they already use.",
      },
      {
        objection: "Our team already handles this internally.",
        response: "Explain that the implementation can make the existing team faster and more consistent while reducing repetitive work.",
      },
      {
        objection: "This is not a priority right now.",
        response: "Offer a small, focused starting point tied to one immediate bottleneck and one measurable result.",
      },
    ],
    decisionMakers: [
      {
        role: "Founder, owner or managing director",
        confidence: "Suggested",
        source: "Recommended for commercial approval",
      },
      {
        role: "Marketing, operations or customer-experience lead",
        confidence: "Suggested",
        source: "Recommended for day-to-day implementation",
      },
      ...(email
        ? [{ role: "Public business contact", contact: email, confidence: "Verified" as const, source: evidence?.website }]
        : []),
    ],
    finalAssessment: {
      verdict: `${place.name} is worth approaching with a concise, researched and outcome-led introduction.`,
      nextStep: "Verify the best decision-maker, personalise one observation from the website and send a low-friction request for a short conversation.",
    },
    email: {
      subjectLines: [
        `A growth idea for ${place.name}`,
        `Helping ${place.name} convert more customer interest`,
        `A practical opportunity for ${place.name}`,
      ],
      body: `Hello ${place.name} team,\n\nI came across ${place.name} while researching established ${place.primaryType.toLowerCase()} businesses in your area, and I was impressed by the reputation you have built.\n\nI believe there may be an opportunity to help more of the people who discover or contact ${place.name} move from initial interest to a completed booking, purchase or next step.\n\nThrough ${sender}, we help businesses improve the customer and commercial journeys around ${primaryOffer}. The focus is not simply on adding technology; it is on helping the business respond faster, reduce missed opportunities and turn more demand into measurable growth.\n\nThe future winners in your market will be the businesses that become AI-enabled across the way they attract, serve and retain customers. The advantage will not come from using AI for its own sake, but from making every customer interaction easier, faster and more consistent before competitors do.\n\nWould you be open to a brief 20-minute conversation? I would be happy to share a practical concept tailored to ${place.name}.\n\nWarm regards,\n${profile.contactName || "Your name"}\n${sender}\n${profile.contactPhone || ""}\n${profile.contactEmail || ""}`,
      whatsapp: `Hello, my name is ${profile.contactName || "[Your name]"} from ${sender}. I have prepared a short idea showing how ${place.name} could improve a specific customer-growth opportunity. Please could you share the best email address or person to send it to?`,
      followUp: `Hello, I wanted to follow up on the short growth idea I shared for ${place.name}. I believe the strongest opportunity is to improve one specific customer journey rather than introduce a large or disruptive project. Would a brief conversation next week be convenient?`,
    },
    discoveredContacts: {
      emails: evidence?.emails ?? [],
      phones: Array.from(new Set([place.phone, place.internationalPhone, ...(evidence?.phones ?? [])].filter(Boolean) as string[])),
      socialLinks: evidence?.socialLinks ?? [],
      bookingLinks: evidence?.bookingLinks ?? [],
    },
    sources: [
      ...(place.googleMapsUri ? [{ label: "Google Maps business listing", url: place.googleMapsUri }] : []),
      ...(evidence?.pagesAnalysed.map((page) => ({ label: page.title, url: page.url })) ?? []),
    ].slice(0, 8),
    generatedWithAI: false,
    dataNote: "This report used a rules-based fallback because an AI model was not available. Verify public information before contacting the prospect.",
  };
}

const EvidencePointSchema = z.object({ title: z.string().trim().min(1).max(160), evidence: z.string().trim().min(1).max(1200), whyItMatters: z.string().trim().min(1).max(800) });
const OpportunityPointSchema = z.object({ title: z.string().trim().min(1).max(160), description: z.string().trim().min(1).max(1200), outcome: z.string().trim().min(1).max(600) });
const ModelReportSchema = z.object({
  prospectName: z.string().trim().min(1).max(200), prospectScore: z.number().min(0).max(10), confidence: z.enum(["High","Medium","Low"]), oneLineVerdict: z.string().trim().min(1).max(700),
  commerciallyAttractive: z.array(EvidencePointSchema).min(2).max(5), opportunity: z.array(OpportunityPointSchema).min(2).max(5),
  bestAngle: z.object({ headline: z.string().trim().min(1).max(300), explanation: z.string().trim().min(1).max(1400), avoidLeadingWith: z.string().trim().min(1).max(700) }),
  objections: z.array(z.object({ objection: z.string().trim().min(1).max(300), response: z.string().trim().min(1).max(1000) })).min(2).max(5),
  decisionMakers: z.array(z.object({ name: z.string().trim().max(160).optional(), role: z.string().trim().min(1).max(180), contact: z.string().trim().max(300).optional(), confidence: z.enum(["Verified","Likely","Suggested"]), source: z.string().trim().max(500).optional() })).min(1).max(6),
  finalAssessment: z.object({ verdict: z.string().trim().min(1).max(800), nextStep: z.string().trim().min(1).max(800) }),
  email: z.object({ subjectLines: z.array(z.string().trim().min(1).max(180)).min(1).max(3), body: z.string().trim().min(1).max(9000), whatsapp: z.string().trim().min(1).max(1800), followUp: z.string().trim().min(1).max(1800) }),
});
type ModelReport = z.infer<typeof ModelReportSchema>;

function extractJson(text: string) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const first = cleaned.indexOf("{"); const last = cleaned.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) throw new Error("The model did not return a JSON object");
  return JSON.parse(cleaned.slice(first, last + 1)) as unknown;
}
function parseModelReport(text: string) { return ModelReportSchema.parse(extractJson(text)); }
function applyModelReport(candidate: ModelReport, fallback: ProspectReport): ProspectReport {
  const score = Number(candidate.prospectScore.toFixed(1));
  return { ...fallback, ...candidate, prospectScore: score, priority: tierFromScore(score), discoveredContacts: fallback.discoveredContacts, sources: fallback.sources, generatedWithAI: true, dataNote: "AI-assisted analysis generated from public Google Maps data and public website content. Verify contacts, pricing, roles and claims before outreach." };
}
async function invokeBedrock(prompt: string, maxTokens = 5000) {
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), env.bedrockTimeoutMs);
  try {
    const response = await getBedrockClient().send(new ConverseCommand({
      modelId: env.bedrockModelId,
      system: [{ text: "You are an evidence-led B2B prospect analyst. Use only supplied evidence. Never invent names, contacts, services, branches, prices, reviews or facts. Return only valid JSON matching the requested schema, with no markdown." }],
      messages: [{ role: "user", content: [{ text: prompt }] }],
      inferenceConfig: { maxTokens, temperature: 0.2, topP: 0.9 },
    }), { abortSignal: controller.signal });
    const text = response.output?.message?.content?.map((item) => ("text" in item ? item.text ?? "" : "")).join("").trim() ?? "";
    if (!text) throw new Error("Amazon Bedrock returned an empty response");
    console.info("Prospect analysis model invocation completed", { provider: "amazon-bedrock", modelId: env.bedrockModelId, inputTokens: response.usage?.inputTokens, outputTokens: response.usage?.outputTokens });
    return text;
  } finally { clearTimeout(timeout); }
}
function modelTemplate(fallback: ProspectReport) {
  return { prospectName: fallback.prospectName, prospectScore: fallback.prospectScore, confidence: fallback.confidence, oneLineVerdict: fallback.oneLineVerdict, commerciallyAttractive: fallback.commerciallyAttractive, opportunity: fallback.opportunity, bestAngle: fallback.bestAngle, objections: fallback.objections, decisionMakers: fallback.decisionMakers, finalAssessment: fallback.finalAssessment, email: fallback.email };
}

export async function generateProspectReport(profile: BusinessProfile, place: PlaceDetails, evidence: WebsiteEvidence | null): Promise<ProspectReport> {
  const fallback = fallbackReport(profile, place, evidence);
  if (!bedrockConfigured()) return fallback;
  const evidencePayload = evidence ? { pages: evidence.pagesAnalysed.map((page) => ({ title: page.title, url: page.url, text: page.text.slice(0, 12_000) })), contacts: { emails: evidence.emails, phones: evidence.phones, socialLinks: evidence.socialLinks, bookingLinks: evidence.bookingLinks }, notes: evidence.notes } : null;
  const template = modelTemplate(fallback);
  const prompt = `Analyse whether the target business is a strong commercial prospect for the sender's specific offers. Focus on commercial outcomes, customer journeys and operational opportunities rather than technology. The score must reflect demand, commercial capacity, fit with the sender's offers, visible opportunity, reachability and evidence quality. A strong reputation is a positive buying-capacity signal, not a reason to score the prospect lower.

Sender business profile:
${JSON.stringify(profile)}

Target business from Google Places:
${JSON.stringify(place)}

Public website evidence:
${JSON.stringify(evidencePayload)}

Return only one valid JSON object matching this structure and field types:
${JSON.stringify(template)}

Rules:
- 8.5-10 means Tier A; 7-8.4 Tier B; 5.5-6.9 Tier C; below 5.5 low priority.
- Every business-specific claim must be supported by the supplied evidence.
- A decision-maker name or contact is Verified only when it appears in the supplied public evidence. Otherwise omit the name/contact and mark the role Likely or Suggested.
- Do not criticise the prospect harshly. Frame gaps as commercial opportunities.
- The best angle must be tailored to the sender's offers and the prospect's visible customer journey.
- The email must be human, concise and outcome-led. Include a genuine observation, one clear commercial opportunity, a practical customer scenario where useful, and a low-friction CTA.
- Create tasteful urgency: future market leaders will become AI-enabled across customer acquisition, service and operations, but do not lead with AI or technical features.
- Whenever the sender's business name appears in the email, append its website in parentheses when a website was supplied.
- Do not include sources, discovered contacts, priority, generatedWithAI or dataNote fields; the application adds those itself.`;
  try {
    const firstResponse = await invokeBedrock(prompt);
    try { return applyModelReport(parseModelReport(firstResponse), fallback); }
    catch (validationError) {
      console.warn("Bedrock response required one JSON repair attempt", { error: validationError instanceof Error ? validationError.message.slice(0, 500) : "Unknown validation error" });
      const repairPrompt = `Repair the following response into one valid JSON object that exactly matches the required structure. Do not add markdown or commentary. Preserve only claims supported by the original supplied evidence. If a field is missing, use the provided template's conservative wording.

Required structure:
${JSON.stringify(template)}

Invalid response:
${firstResponse.slice(0, 24_000)}`;
      return applyModelReport(parseModelReport(await invokeBedrock(repairPrompt)), fallback);
    }
  } catch (error) {
    console.error("Bedrock prospect analysis failed; returning rules-based fallback", { name: error instanceof Error ? error.name : "UnknownError", message: error instanceof Error ? error.message.slice(0, 700) : "Unknown error", modelId: env.bedrockModelId, region: env.awsRegion });
    return fallback;
  }
}
