import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { env } from "@/lib/env";
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

function extractJson(text: string) {
  const cleaned = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  if (first === -1 || last === -1) throw new Error("The model did not return JSON");
  return JSON.parse(cleaned.slice(first, last + 1));
}

function ensureReport(value: unknown, fallback: ProspectReport): ProspectReport {
  if (!value || typeof value !== "object") return fallback;
  const candidate = value as Partial<ProspectReport>;
  const score = Math.max(0, Math.min(10, Number(candidate.prospectScore ?? fallback.prospectScore)));
  const confidence = ["High", "Medium", "Low"].includes(String(candidate.confidence))
    ? candidate.confidence as ProspectReport["confidence"]
    : fallback.confidence;
  const email: Partial<ProspectReport["email"]> = candidate.email && typeof candidate.email === "object" ? candidate.email : {};
  const bestAngle: Partial<ProspectReport["bestAngle"]> = candidate.bestAngle && typeof candidate.bestAngle === "object" ? candidate.bestAngle : {};
  const finalAssessment: Partial<ProspectReport["finalAssessment"]> = candidate.finalAssessment && typeof candidate.finalAssessment === "object" ? candidate.finalAssessment : {};

  return {
    ...fallback,
    ...candidate,
    prospectName: typeof candidate.prospectName === "string" && candidate.prospectName.trim() ? candidate.prospectName : fallback.prospectName,
    prospectScore: score,
    confidence,
    priority: tierFromScore(score),
    oneLineVerdict: typeof candidate.oneLineVerdict === "string" && candidate.oneLineVerdict.trim() ? candidate.oneLineVerdict : fallback.oneLineVerdict,
    commerciallyAttractive: Array.isArray(candidate.commerciallyAttractive) && candidate.commerciallyAttractive.length ? candidate.commerciallyAttractive.slice(0, 5) : fallback.commerciallyAttractive,
    opportunity: Array.isArray(candidate.opportunity) && candidate.opportunity.length ? candidate.opportunity.slice(0, 5) : fallback.opportunity,
    bestAngle: {
      headline: typeof bestAngle.headline === "string" && bestAngle.headline.trim() ? bestAngle.headline : fallback.bestAngle.headline,
      explanation: typeof bestAngle.explanation === "string" && bestAngle.explanation.trim() ? bestAngle.explanation : fallback.bestAngle.explanation,
      avoidLeadingWith: typeof bestAngle.avoidLeadingWith === "string" && bestAngle.avoidLeadingWith.trim() ? bestAngle.avoidLeadingWith : fallback.bestAngle.avoidLeadingWith,
    },
    objections: Array.isArray(candidate.objections) && candidate.objections.length ? candidate.objections.slice(0, 5) : fallback.objections,
    decisionMakers: Array.isArray(candidate.decisionMakers) && candidate.decisionMakers.length ? candidate.decisionMakers.slice(0, 6) : fallback.decisionMakers,
    finalAssessment: {
      verdict: typeof finalAssessment.verdict === "string" && finalAssessment.verdict.trim() ? finalAssessment.verdict : fallback.finalAssessment.verdict,
      nextStep: typeof finalAssessment.nextStep === "string" && finalAssessment.nextStep.trim() ? finalAssessment.nextStep : fallback.finalAssessment.nextStep,
    },
    email: {
      subjectLines: Array.isArray(email.subjectLines) && email.subjectLines.length ? email.subjectLines.filter((line): line is string => typeof line === "string").slice(0, 3) : fallback.email.subjectLines,
      body: typeof email.body === "string" && email.body.trim() ? email.body : fallback.email.body,
      whatsapp: typeof email.whatsapp === "string" && email.whatsapp.trim() ? email.whatsapp : fallback.email.whatsapp,
      followUp: typeof email.followUp === "string" && email.followUp.trim() ? email.followUp : fallback.email.followUp,
    },
    sources: fallback.sources,
    discoveredContacts: fallback.discoveredContacts,
    generatedWithAI: true,
    dataNote: "Generated from public Google Places data and public website content. Verify contacts, pricing, roles and claims before outreach.",
  };
}

export async function generateProspectReport(
  profile: BusinessProfile,
  place: PlaceDetails,
  evidence: WebsiteEvidence | null,
): Promise<ProspectReport> {
  const fallback = fallbackReport(profile, place, evidence);
  const hasAwsCredentials = Boolean(process.env.AWS_ACCESS_KEY_ID || process.env.AWS_PROFILE || process.env.AWS_WEB_IDENTITY_TOKEN_FILE);
  if (!hasAwsCredentials || !env.bedrockModelId) return fallback;

  const evidencePayload = evidence
    ? {
        pages: evidence.pagesAnalysed.map((page) => ({
          title: page.title,
          url: page.url,
          text: page.text.slice(0, 12_000),
        })),
        contacts: {
          emails: evidence.emails,
          phones: evidence.phones,
          socialLinks: evidence.socialLinks,
          bookingLinks: evidence.bookingLinks,
        },
        notes: evidence.notes,
      }
    : null;

  const prompt = `You are an evidence-led B2B prospect analyst. Analyse whether the target business is a good prospect for the sender's offers. Focus on commercial outcomes, not technology. Never invent names, emails, roles, branches, prices or facts. Mark inferred roles as Suggested or Likely. Use only the supplied evidence.\n\nSender business profile:\n${JSON.stringify(profile)}\n\nTarget business from Google Places:\n${JSON.stringify(place)}\n\nPublic website evidence:\n${JSON.stringify(evidencePayload)}\n\nReturn ONLY valid JSON matching this exact structure:\n${JSON.stringify(fallback)}\n\nScoring guidance: 8.5-10 Tier A; 7-8.4 Tier B; 5.5-6.9 Tier C; below 5.5 Low priority. Consider demand, commercial capacity, fit with the sender's offers, visible opportunity, reachability and evidence quality.\n\nEmail requirements: human and professional; include one genuine observation; explain one outcome-led opportunity; include a practical customer scenario where useful; create tasteful urgency that future market leaders will become AI-enabled across customer acquisition, service and operations; do not lead with AI or technical features. Whenever the sender business name is mentioned in the email, include its website in parentheses when a website is available. Do not claim that something was found if it is not in the evidence.`;

  try {
    const client = new BedrockRuntimeClient({ region: env.awsRegion });
    const response = await client.send(
      new ConverseCommand({
        modelId: env.bedrockModelId,
        messages: [
          {
            role: "user",
            content: [{ text: prompt }],
          },
        ],
        inferenceConfig: {
          maxTokens: 5000,
          temperature: 0.25,
          topP: 0.9,
        },
      }),
    );

    const text = response.output?.message?.content
      ?.map((item) => ("text" in item ? item.text : ""))
      .join("") ?? "";
    return ensureReport(extractJson(text), fallback);
  } catch (error) {
    console.error("Bedrock analysis failed; using fallback report", error);
    return fallback;
  }
}
