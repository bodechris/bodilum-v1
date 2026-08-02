import { ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { z } from "zod";
import { getBedrockClient } from "@/lib/bedrock";
import { sanitiseEmails, sanitiseEmailsForWebsites, sanitisePhones, sanitiseWebsites } from "@/lib/contact-utils";
import { bedrockConfigured, env } from "@/lib/env";
import type {
  BusinessProfile,
  DecisionMaker,
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

function senderText(profile: BusinessProfile) {
  return [profile.industry, profile.description, ...profile.offers.flatMap((offer) => [offer.name, offer.description])]
    .join(" ")
    .toLowerCase();
}

function isLegalBusiness(profile: BusinessProfile) {
  return /\b(?:law|legal|lawyer|attorney|litigation|dispute|arbitration|mediation|court|legal counsel|debt recovery)\b/i.test(senderText(profile));
}

function isDigitalGrowthBusiness(profile: BusinessProfile) {
  return /\b(?:website|web design|digital marketing|lead generation|crm|whatsapp|automation|artificial intelligence|\bai\b|seo|advertising|customer journey|conversion)\b/i.test(senderText(profile));
}

function senderLabel(profile: BusinessProfile) {
  return profile.website
    ? `${profile.businessName} (${cleanWebsite(profile.website)})`
    : profile.businessName;
}

function contactData(place: PlaceDetails, evidence: WebsiteEvidence | null) {
  const officialWebsites = sanitiseWebsites([place.website, evidence?.website]);
  return {
    emails: sanitiseEmailsForWebsites(evidence?.emails ?? [], officialWebsites).slice(0, 8),
    phones: sanitisePhones([
      place.internationalPhone,
      place.phone,
      ...(evidence?.phones ?? []),
    ]).slice(0, 8),
    websites: officialWebsites.slice(0, 4),
    socialLinks: evidence?.socialLinks ?? [],
    bookingLinks: evidence?.bookingLinks ?? [],
  };
}

function legalFallbackContent(
  profile: BusinessProfile,
  place: PlaceDetails,
  evidence: WebsiteEvidence | null,
) {
  const offer = profile.offers[0]?.name || "commercial legal support";
  const offerOutcome = profile.offers[0]?.description || profile.description;
  const sender = senderLabel(profile);
  const sector = place.primaryType.toLowerCase();
  const reviews = place.reviewCount ?? 0;
  const observation = reviews
    ? `${place.name} has built substantial public visibility, with approximately ${reviews.toLocaleString()} ratings/reviews.`
    : `${place.name} has an established public presence as a ${sector}.`;

  return {
    opportunity: [
      {
        title: `Position ${offer} around business continuity and financial exposure`,
        description: `${sector} businesses commonly manage supplier, employment, customer, property and service relationships that can become expensive when a disagreement escalates. Present ${profile.businessName} as a commercially minded dispute partner rather than implying that ${place.name} currently has a legal problem.`,
        outcome: `Earlier legal input can protect management time, reduce avoidable exposure and improve the organisation's response when a dispute arises.`,
      },
      {
        title: "Offer a clear escalation route for high-stakes disputes",
        description: `Connect the stated outcome of your offer — ${offerOutcome} — to situations requiring court, arbitration, negotiation or urgent strategic advice. Keep the initial proposition narrow: an introductory discussion about dispute readiness, overflow support or a second opinion on complex matters.`,
        outcome: "A specific dispute-response proposition is easier to evaluate than a broad claim to handle every legal need.",
      },
    ],
    bestAngle: {
      headline: `Give ${place.name} a commercially focused litigation and dispute-resolution partner before a costly issue escalates.`,
      explanation: `Lead with management protection, speed of response and control of financial exposure. Explain how ${profile.businessName}'s ${offer} can complement existing advisers or an internal team when a matter becomes complex, urgent or likely to proceed to court or arbitration.`,
      avoidLeadingWith: `Do not suggest that ${place.name} currently has a dispute, and do not lead with generic growth, website or AI language. Lead with preparedness, specialist capability and the commercial cost of unresolved conflict.`,
    },
    objections: [
      {
        objection: "We already have a law firm or an internal legal team.",
        response: "Position the firm as specialist dispute counsel, overflow capacity or an independent second opinion for complex, urgent or high-value matters—not as a replacement for trusted existing advisers.",
      },
      {
        objection: "We do not have an active dispute right now.",
        response: "Offer a low-pressure introductory discussion focused on readiness, escalation routes and the situations in which external litigation or arbitration support would be useful.",
      },
      {
        objection: "We need relevant experience and cost certainty before instructing new counsel.",
        response: "Prepare concise proof of comparable work, the senior people who would handle the matter, the proposed first step and a clearly scoped fee approach before asking for a mandate.",
      },
    ],
    roles: [
      "General counsel, head of legal or company secretary",
      "General manager, managing director or chief executive",
      "Finance director or chief financial officer",
      "Operations, procurement or human-resources leader relevant to the dispute type",
    ],
    email: {
      subjectLines: [
        `A dispute-readiness idea for ${place.name}`,
        `Specialist litigation support for ${place.name}`,
        `A practical legal support conversation for ${place.name}`,
      ],
      body: `Hello ${place.name} team,\n\nI came across ${place.name} while researching established ${sector} businesses in your area. ${observation}\n\nBusinesses operating at this scale usually manage a wide range of supplier, employment, property, customer and service relationships. Most work smoothly, but when a disagreement becomes high-value, urgent or likely to proceed to court or arbitration, the cost is often measured in management time and commercial disruption as much as legal fees.\n\nThrough ${sender}, we provide ${offer}. Our focus is ${offerOutcome}\n\nI am not assuming that ${place.name} currently has an active dispute. I would simply value the opportunity to introduce our capability and understand who oversees complex disputes or external litigation support within the business, so that there is a credible route to call on when specialist support is required.\n\nWould a brief 20-minute introductory conversation be useful?\n\nWarm regards,\n${profile.contactName}\n${sender}\n${profile.contactPhone || ""}\n${profile.contactEmail || ""}`,
      whatsapp: `Hello, my name is ${profile.contactName} from ${sender}. We provide ${offer} for businesses that need specialist support with complex disputes, court matters or arbitration. I am not suggesting that ${place.name} has a current dispute; I would like to send a short introduction to the person responsible for legal matters or external counsel. Please could you share the best contact?`,
      followUp: `Hello, I am following up on my introduction from ${sender} regarding ${offer}. Our aim is to be a credible specialist option when a complex or urgent dispute requires additional capacity, a second opinion, court action or arbitration support. Would it be useful to arrange a brief introductory call with the person who oversees legal matters for ${place.name}?`,
    },
  };
}

function genericFallbackContent(profile: BusinessProfile, place: PlaceDetails) {
  const offer = profile.offers[0]?.name || "the sender's principal service";
  const offerOutcome = profile.offers[0]?.description || profile.description;
  const sender = senderLabel(profile);
  return {
    opportunity: [
      {
        title: `Apply ${offer} to a specific priority at ${place.name}`,
        description: `Use the stated result of the offer — ${offerOutcome} — to form one narrow, credible hypothesis about where ${place.name} could benefit. Present it as a hypothesis to explore, not as an unsupported claim about the business.`,
        outcome: "A precise offer-to-need connection makes the outreach easier to understand and evaluate.",
      },
      {
        title: "Start with a low-risk diagnostic or focused first step",
        description: `Propose a small first conversation or review that lets ${place.name} assess the relevance of ${profile.businessName} without committing to a large project.`,
        outcome: "Lower initial friction increases the chance of a response from an established prospect.",
      },
    ],
    bestAngle: {
      headline: `Connect ${offer} to one measurable priority for ${place.name}.`,
      explanation: `Lead with the exact business result described in ${profile.businessName}'s offer: ${offerOutcome}. Use public evidence about ${place.name} to show why the business has the capacity and context to benefit, while clearly labelling any unverified need as a hypothesis.`,
      avoidLeadingWith: "Do not lead with a generic list of capabilities. Do not default to website, marketing, AI or customer-conversion language unless those are genuinely part of the sender's offer.",
    },
    objections: [
      {
        objection: `We already have a provider for ${offer}.`,
        response: "Differentiate with a focused use case, specialist capability, second opinion, overflow capacity or a lower-risk first engagement rather than asking them to replace an existing relationship.",
      },
      {
        objection: "We do not see an immediate need.",
        response: `Tie the discussion to one plausible sector priority and offer a short diagnostic conversation. Avoid claiming that the business has a problem you cannot prove.`,
      },
      {
        objection: "Why should we consider your business?",
        response: "Use concise evidence: relevant expertise, a clear delivery approach, proof of comparable outcomes and a practical first step with defined scope.",
      },
    ],
    roles: [
      "Founder, owner, managing director or general manager",
      "Functional leader responsible for the problem the offer solves",
      "Finance or operations leader involved in commercial approval",
    ],
    email: {
      subjectLines: [`A ${offer} idea for ${place.name}`, `A practical introduction for ${place.name}`, `${offer} support for ${place.name}`],
      body: `Hello ${place.name} team,\n\nI came across ${place.name} while researching established ${place.primaryType.toLowerCase()} businesses in your area, and I was impressed by the public presence you have built.\n\nThrough ${sender}, we provide ${offer}. The outcome we focus on is: ${offerOutcome}\n\nBased on the public information available, I believe there may be a useful conversation around where that outcome could support one of ${place.name}'s current priorities. I would treat this as a hypothesis to explore rather than assume a need that has not been confirmed.\n\nWould you be open to a brief 20-minute introduction, or could you point me to the person responsible for this area?\n\nWarm regards,\n${profile.contactName}\n${sender}\n${profile.contactPhone || ""}\n${profile.contactEmail || ""}`,
      whatsapp: `Hello, my name is ${profile.contactName} from ${sender}. We provide ${offer}, focused on ${offerOutcome}. I have a short, researched idea for ${place.name}. Please could you share the best person or email address for this area?`,
      followUp: `Hello, I am following up on the ${offer} introduction I shared for ${place.name}. I would be happy to keep the first conversation focused on one relevant priority and a practical, low-risk next step. Would a brief call be convenient?`,
    },
  };
}

function personRelevance(role: string, profile: BusinessProfile) {
  const lower = role.toLowerCase();
  let score = 0;
  if (/chief executive|ceo|managing director|general manager|owner|founder/.test(lower)) score += 4;
  if (/finance|cfo|legal|general counsel|company secretary|operations|procurement|human resources|hr/.test(lower)) score += isLegalBusiness(profile) ? 6 : 3;
  if (/marketing|customer experience/.test(lower)) score += isDigitalGrowthBusiness(profile) ? 5 : -2;
  return score;
}

function verifiedPeople(evidence: WebsiteEvidence | null, profile: BusinessProfile) {
  return [...(evidence?.people ?? [])].sort((a, b) => personRelevance(b.role, profile) - personRelevance(a.role, profile));
}

function fallbackDecisionMakers(
  profile: BusinessProfile,
  evidence: WebsiteEvidence | null,
  suggestedRoles: string[],
): DecisionMaker[] {
  const named = verifiedPeople(evidence, profile).slice(0, 4).map((person) => ({
    name: person.name,
    role: person.role,
    confidence: "Verified" as const,
    source: person.sourceUrl,
  }));
  const suggested: DecisionMaker[] = suggestedRoles.slice(0, Math.max(1, 4 - named.length)).map((role) => ({
    role,
    confidence: "Suggested" as const,
    source: "Recommended buyer role based on the sender's offer",
  }));
  return [...named, ...suggested];
}

function fallbackReport(
  profile: BusinessProfile,
  place: PlaceDetails,
  evidence: WebsiteEvidence | null,
): ProspectReport {
  const reviews = place.reviewCount ?? 0;
  const rating = place.rating ?? 0;
  const hasWebsite = Boolean(place.website);
  const contacts = contactData(place, evidence);

  let score = 5.1;
  if (reviews >= 250) score += 1.5;
  else if (reviews >= 80) score += 1;
  else if (reviews >= 20) score += 0.5;
  if (rating >= 4.7) score += 0.7;
  else if (rating >= 4.3) score += 0.4;
  if (hasWebsite) score += 0.5;
  if (contacts.emails.length || contacts.phones.length) score += 0.3;
  if (profile.offers.length >= 3) score += 0.3;
  score = Math.min(9.2, Number(score.toFixed(1)));

  const content = isLegalBusiness(profile)
    ? legalFallbackContent(profile, place, evidence)
    : genericFallbackContent(profile, place);

  return {
    prospectName: place.name,
    prospectScore: score,
    confidence: evidence?.pagesAnalysed.length ? "Medium" : "Low",
    priority: tierFromScore(score),
    oneLineVerdict: `${place.name} appears commercially established enough to justify personalised outreach, provided the proposition is tied directly to ${profile.businessName}'s actual offers.`,
    commerciallyAttractive: [
      {
        title: "Visible commercial activity",
        evidence: reviews
          ? `${place.name} has approximately ${reviews.toLocaleString()} public ratings/reviews and a ${rating || "strong"} rating.`
          : "The business is publicly listed and operational in the selected market.",
        whyItMatters: "An active, established organisation is more likely to have recurring commercial needs, decision-makers and budget than an unproven listing.",
      },
      {
        title: "Established operating context",
        evidence: `${place.name} is positioned as a ${place.primaryType.toLowerCase()}${hasWebsite ? " with an active public website" : ""}.`,
        whyItMatters: `The business context creates a basis for testing how ${profile.businessName}'s offers could support a real operational, financial or strategic priority.`,
      },
      {
        title: "Reachable prospect",
        evidence: contacts.emails[0]
          ? `A public email address was found: ${contacts.emails[0]}.`
          : contacts.phones[0]
            ? `A public telephone number is available: ${contacts.phones[0]}.`
            : contacts.websites[0]
              ? "An official website is available for contact research."
              : "A public Google Maps route is available for initial contact research.",
        whyItMatters: "A verifiable route to the organisation reduces the effort required to test a carefully researched introduction.",
      },
    ],
    opportunity: content.opportunity,
    bestAngle: content.bestAngle,
    objections: content.objections,
    decisionMakers: fallbackDecisionMakers(profile, evidence, content.roles),
    finalAssessment: {
      verdict: `${place.name} is worth approaching with a concise proposition built around ${profile.businessName}'s specific expertise—not a generic growth pitch.`,
      nextStep: "Verify the most relevant buyer, personalise one evidence-backed observation and ask for a brief introductory conversation without assuming an unconfirmed problem.",
    },
    email: content.email,
    discoveredContacts: contacts,
    sources: [
      ...(place.googleMapsUri ? [{ label: "Google Maps business listing", url: place.googleMapsUri }] : []),
      ...(evidence?.pagesAnalysed.map((page) => ({ label: page.title, url: page.url })) ?? []),
    ].slice(0, 10),
    generatedWithAI: false,
    dataNote: "This report used a conservative rules-based fallback because an AI model was unavailable. Verify public information before contacting the prospect.",
  };
}

const OptionalShortTextSchema = z.preprocess(
  (value) => value === null || value === "" ? undefined : value,
  z.string().trim().max(500).optional(),
);
const ConfidenceSchema = z.preprocess(
  (value) => typeof value === "string"
    ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    : value,
  z.enum(["High", "Medium", "Low"]),
);
const DecisionConfidenceSchema = z.preprocess(
  (value) => typeof value === "string"
    ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    : value,
  z.enum(["Verified", "Likely", "Suggested"]),
);
const EvidencePointSchema = z.object({
  title: z.string().trim().min(1).max(220),
  evidence: z.string().trim().min(1).max(1800),
  whyItMatters: z.string().trim().min(1).max(1200),
});
const OpportunityPointSchema = z.object({
  title: z.string().trim().min(1).max(220),
  description: z.string().trim().min(1).max(1800),
  outcome: z.string().trim().min(1).max(1000),
});
const ModelReportSchema = z.object({
  prospectName: z.string().trim().min(1).max(240),
  prospectScore: z.coerce.number().min(0).max(10),
  confidence: ConfidenceSchema,
  oneLineVerdict: z.string().trim().min(1).max(700),
  commerciallyAttractive: z.array(EvidencePointSchema).min(2).max(5),
  opportunity: z.array(OpportunityPointSchema).min(2).max(5),
  bestAngle: z.object({
    headline: z.string().trim().min(1).max(300),
    explanation: z.string().trim().min(1).max(1400),
    avoidLeadingWith: z.string().trim().min(1).max(700),
  }),
  objections: z.array(z.object({
    objection: z.string().trim().min(1).max(300),
    response: z.string().trim().min(1).max(1000),
  })).min(2).max(5),
  decisionMakers: z.array(z.object({
    name: OptionalShortTextSchema,
    role: z.string().trim().min(1).max(300),
    contact: OptionalShortTextSchema,
    confidence: DecisionConfidenceSchema,
    source: OptionalShortTextSchema,
  })).min(1).max(7),
  finalAssessment: z.object({
    verdict: z.string().trim().min(1).max(800),
    nextStep: z.string().trim().min(1).max(800),
  }),
  email: z.object({
    subjectLines: z.array(z.string().trim().min(1).max(180)).min(1).max(3),
    body: z.string().trim().min(1).max(9000),
    whatsapp: z.string().trim().min(1).max(1800),
    followUp: z.string().trim().min(1).max(1800),
  }),
});
type ModelReport = z.infer<typeof ModelReportSchema>;

function extractJson(text: string) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) throw new Error("The model did not return a JSON object");
  return JSON.parse(cleaned.slice(first, last + 1)) as unknown;
}

function parseModelReport(text: string) {
  return ModelReportSchema.parse(extractJson(text));
}

const STOP_WORDS = new Set(["with", "from", "that", "this", "your", "their", "business", "services", "service", "help", "support", "provide", "provides", "through", "about", "into", "more", "better", "company"]);
function offerTerms(profile: BusinessProfile) {
  return [...new Set(senderText(profile).match(/[a-z][a-z-]{3,}/g)?.filter((word) => !STOP_WORDS.has(word)) ?? [])].slice(0, 30);
}

function senderRelevanceIssues(report: ModelReport, profile: BusinessProfile) {
  const issues: string[] = [];
  const terms = offerTerms(profile);
  const angle = `${report.bestAngle.headline} ${report.bestAngle.explanation}`.toLowerCase();
  const objections = report.objections.map((item) => `${item.objection} ${item.response}`).join(" ").toLowerCase();
  const outreach = `${report.email.body} ${report.email.whatsapp} ${report.email.followUp}`.toLowerCase();
  const hasTerm = (text: string) => terms.some((term) => text.includes(term));
  const exactName = profile.contactName.trim().toLowerCase();
  const exactEmail = profile.contactEmail.trim().toLowerCase();
  const exactPhoneDigits = profile.contactPhone.replace(/\D/g, "");

  if (exactName && !outreach.includes(exactName)) {
    issues.push("missing-sender-name");
  }
  if (exactEmail && !report.email.body.toLowerCase().includes(exactEmail)) {
    issues.push("missing-sender-email");
  }
  if (exactPhoneDigits && !report.email.body.replace(/\D/g, "").includes(exactPhoneDigits)) {
    issues.push("missing-sender-phone");
  }

  if (terms.length && (!hasTerm(angle) || !hasTerm(outreach))) {
    issues.push("weak-offer-relevance");
  }
  if (!isDigitalGrowthBusiness(profile)) {
    const genericAgencyLanguage = /\b(?:website redesign|web agency|lead generation|booking conversion|customer[- ]journey|turn more attention into|measurable customer action|digital marketing|crm implementation|whatsapp automation|ai-enabled customer)\b/i;
    if (genericAgencyLanguage.test(`${angle} ${objections} ${outreach}`)) {
      issues.push("generic-agency-language");
    }
  }
  if (isLegalBusiness(profile)) {
    const legalTerms = /\b(?:legal|law|litigation|dispute|arbitration|court|counsel|liability|claim|contract)\b/i;
    if (!legalTerms.test(angle) || !legalTerms.test(objections) || !legalTerms.test(outreach)) {
      issues.push("weak-legal-relevance");
    }
    if (/we already have a website|customer[- ]journey|booking conversion|lead generation|marketing agency/i.test(objections)) {
      issues.push("irrelevant-legal-objections");
    }
  }
  return issues;
}

function applyRelevanceSafeguards(
  candidate: ModelReport,
  fallback: ProspectReport,
  profile: BusinessProfile,
) {
  const issues = senderRelevanceIssues(candidate, profile);
  if (!issues.length) return { candidate, issues };

  const strategyIssue = issues.some((issue) => [
    "weak-offer-relevance",
    "generic-agency-language",
    "weak-legal-relevance",
    "irrelevant-legal-objections",
  ].includes(issue));
  const outreachIssue = strategyIssue || issues.some((issue) => issue.startsWith("missing-sender-"));

  const corrected: ModelReport = {
    ...candidate,
    opportunity: strategyIssue ? fallback.opportunity : candidate.opportunity,
    bestAngle: strategyIssue ? fallback.bestAngle : candidate.bestAngle,
    objections: strategyIssue ? fallback.objections : candidate.objections,
    email: outreachIssue ? fallback.email : candidate.email,
  };

  return { candidate: corrected, issues };
}

function normaliseName(value: string) {
  return value.toLowerCase().replace(/[^a-z]+/g, " ").trim();
}

function mergeDecisionMakers(
  candidate: DecisionMaker[],
  evidence: WebsiteEvidence | null,
  profile: BusinessProfile,
  verifiedContacts: ProspectReport["discoveredContacts"],
): DecisionMaker[] {
  const people = verifiedPeople(evidence, profile);
  const verifiedNames = new Map(people.map((person) => [normaliseName(person.name), person]));
  const verifiedEmailSet = new Set(verifiedContacts.emails);
  const verifiedPhoneSet = new Set(verifiedContacts.phones.map((phone) => phone.replace(/\D/g, "")));
  const cleanContact = (contact?: string) => {
    if (!contact) return undefined;
    const email = sanitiseEmails([contact])[0];
    if (email && verifiedEmailSet.has(email)) return email;
    const phone = sanitisePhones([contact])[0];
    if (phone && verifiedPhoneSet.has(phone.replace(/\D/g, ""))) return phone;
    return undefined;
  };

  const cleaned = candidate.map((person) => {
    const contact = cleanContact(person.contact);
    if (!person.name) {
      return {
        ...person,
        contact,
        confidence: person.confidence === "Verified" ? "Likely" as const : person.confidence,
      };
    }
    const verified = verifiedNames.get(normaliseName(person.name));
    if (!verified) {
      return {
        role: person.role,
        contact,
        confidence: person.confidence === "Suggested" ? "Suggested" as const : "Likely" as const,
        source: person.source || "Role recommended from the public business context; name could not be verified",
      };
    }
    return {
      ...person,
      contact,
      name: verified.name,
      role: verified.role || person.role,
      confidence: "Verified" as const,
      source: verified.sourceUrl,
    };
  });

  for (const verified of people.slice(0, 4)) {
    if (!cleaned.some((person) => person.name && normaliseName(person.name) === normaliseName(verified.name))) {
      cleaned.unshift({
        contact: undefined,
        name: verified.name,
        role: verified.role,
        confidence: "Verified",
        source: verified.sourceUrl,
      });
    }
  }

  const seen = new Set<string>();
  const relevant = isLegalBusiness(profile)
    ? cleaned.filter((person) => !/marketing|customer experience/i.test(person.role))
    : cleaned;
  return relevant
    .sort((a, b) => personRelevance(b.role, profile) - personRelevance(a.role, profile))
    .filter((person) => {
      const key = `${normaliseName(person.name ?? "")}|${person.role.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 6);
}

function applyModelReport(
  rawCandidate: ModelReport,
  fallback: ProspectReport,
  profile: BusinessProfile,
  evidence: WebsiteEvidence | null,
): ProspectReport {
  const { candidate, issues } = applyRelevanceSafeguards(rawCandidate, fallback, profile);
  const score = Number(candidate.prospectScore.toFixed(1));
  return {
    ...fallback,
    ...candidate,
    prospectScore: score,
    priority: tierFromScore(score),
    decisionMakers: mergeDecisionMakers(candidate.decisionMakers, evidence, profile, fallback.discoveredContacts),
    discoveredContacts: fallback.discoveredContacts,
    sources: fallback.sources,
    generatedWithAI: true,
    dataNote: issues.length
      ? "AI-assisted analysis generated from public Google Maps data and public website content. Offer-relevance safeguards corrected sections that did not match the user's stated services. Verify contacts, names, roles and commercial assumptions before outreach."
      : "AI-assisted analysis generated from public Google Maps data and public website content. Verify contacts, names, roles and commercial assumptions before outreach.",
  };
}

async function invokeBedrock(prompt: string, maxTokens = 5200) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.bedrockTimeoutMs);
  try {
    const response = await getBedrockClient().send(new ConverseCommand({
      modelId: env.bedrockModelId,
      system: [{
        text: "You are an evidence-led B2B prospect analyst. The sender is selling its own stated services to the target prospect. Tailor every strategic recommendation to the sender's exact offers and industry. Use only supplied evidence for claims about the target. Sector-level hypotheses are allowed only when clearly labelled as hypotheses. Never invent names, contacts, services, branches, prices, reviews, problems or facts. Use the sender contact name, email and phone exactly as supplied; never substitute a developer, owner or previously seen person's name. Return only valid JSON matching the requested schema, with no markdown.",
      }],
      messages: [{ role: "user", content: [{ text: prompt }] }],
      inferenceConfig: { maxTokens, temperature: 0.15, topP: 0.85 },
    }), { abortSignal: controller.signal });
    const text = response.output?.message?.content?.map((item) => ("text" in item ? item.text ?? "" : "")).join("").trim() ?? "";
    if (!text) throw new Error("Amazon Bedrock returned an empty response");
    console.info("Prospect analysis model invocation completed", {
      provider: "amazon-bedrock",
      modelId: env.bedrockModelId,
      inputTokens: response.usage?.inputTokens,
      outputTokens: response.usage?.outputTokens,
    });
    return text;
  } finally {
    clearTimeout(timeout);
  }
}

function schemaTemplate() {
  return {
    prospectName: "string",
    prospectScore: 0,
    confidence: "High | Medium | Low",
    oneLineVerdict: "string",
    commerciallyAttractive: [{ title: "string", evidence: "string", whyItMatters: "string" }],
    opportunity: [{ title: "string", description: "string", outcome: "string" }],
    bestAngle: { headline: "string", explanation: "string", avoidLeadingWith: "string" },
    objections: [{ objection: "string", response: "string" }],
    decisionMakers: [{ name: "optional verified public name", role: "string", contact: "optional verified public contact", confidence: "Verified | Likely | Suggested", source: "optional source URL or reason" }],
    finalAssessment: { verdict: "string", nextStep: "string" },
    email: { subjectLines: ["string"], body: "string", whatsapp: "string", followUp: "string" },
  };
}

function analysisRules(profile: BusinessProfile) {
  const technologyRule = isDigitalGrowthBusiness(profile)
    ? "Technology or AI may be mentioned only as a supporting enabler after the commercial outcome is clear."
    : "Do not insert AI, automation, website, marketing, lead-generation, booking or customer-conversion language unless it is explicitly part of the sender's offers.";
  const professionalRule = isLegalBusiness(profile)
    ? "The sender is a legal business. Opportunities, objections, buyer roles and outreach must concern the sender's actual legal services. For a target such as a hotel, use relevant but clearly hypothetical commercial contexts such as supplier disputes, employment matters, property/service agreements, claims, court proceedings or arbitration. Never imply the target currently has a dispute. Relevant buyers may include general counsel, company secretary, general manager/CEO, finance, operations, procurement or HR—not marketing unless the legal offer specifically relates to marketing."
    : "Identify the sender's offer category before writing. Choose buyer roles and objections that are specific to purchasing that category of service.";

  return `
- The sender is the seller; the target business is the prospect. Every opportunity, angle, objection response, buyer role and outreach message must explain why the sender's exact offers matter to this target.
- Do not copy generic agency language. Never default to a website, marketing, customer-journey or conversion pitch unless the sender actually sells those services.
- ${professionalRule}
- ${technologyRule}
- 8.5-10 means Tier A; 7-8.4 Tier B; 5.5-6.9 Tier C; below 5.5 low priority.
- Score demand, commercial capacity, fit with the sender's offers, plausible need, reachability and evidence quality. A strong reputation is a positive capacity signal.
- Every factual claim about the target must be supported by supplied evidence. You may discuss common sector risks or needs only as hypotheses, using wording such as “businesses in this sector commonly…” rather than claiming the target has that problem.
- The best-angle headline must name or unmistakably reflect one of the sender's actual offers or outcomes. It must not be a generic “grow more” proposition.
- Possible objections must be objections to buying the sender's actual service. Responses must show how the sender should address those objections.
- Search the supplied public evidence for real decision-maker names and roles. Include a name only when it appears in the supplied evidence and mark it Verified. If no name is available, give the most relevant buyer role and mark it Likely or Suggested.
- Select decision-makers based on the sender's offer, not a fixed template.
- The email, WhatsApp message and follow-up must sound as though the sender genuinely provides its stated offers. They must include a relevant public observation, one offer-specific hypothesis and a low-friction CTA. Do not pretend the target has an unverified problem.
- Whenever the sender's business name appears in the outreach, append its website in parentheses when supplied.
- Use the sender's contactName, contactEmail and contactPhone exactly as supplied in the sender profile. Never infer, substitute or invent a personal name. The email body must end with those supplied sender details, and the WhatsApp introduction must use the supplied contactName.
- Do not criticise the prospect harshly or promise guaranteed results.
- Do not include sources, discoveredContacts, priority, generatedWithAI or dataNote; the application adds those fields.`;
}

export async function generateProspectReport(
  profile: BusinessProfile,
  place: PlaceDetails,
  evidence: WebsiteEvidence | null,
): Promise<ProspectReport> {
  const fallback = fallbackReport(profile, place, evidence);
  if (!bedrockConfigured()) return fallback;

  const evidencePayload = evidence ? {
    pages: evidence.pagesAnalysed.map((page) => ({
      title: page.title,
      url: page.url,
      text: page.text.slice(0, 12_000),
    })),
    verifiedContactCandidates: {
      emails: fallback.discoveredContacts.emails,
      phones: fallback.discoveredContacts.phones,
      websites: fallback.discoveredContacts.websites,
      socialLinks: fallback.discoveredContacts.socialLinks,
      bookingLinks: fallback.discoveredContacts.bookingLinks,
    },
    namedPeopleCandidates: evidence.people,
    notes: evidence.notes,
  } : null;
  const template = schemaTemplate();
  const rules = analysisRules(profile);
  const prompt = `Analyse whether the target business is a strong commercial prospect for the sender's specific offers. Produce a genuinely offer-specific B2B analysis, not a generic digital-agency report.

Sender business profile:
${JSON.stringify(profile)}

Target business from Google Places:
${JSON.stringify(place)}

Public website evidence:
${JSON.stringify(evidencePayload)}

Return only one valid JSON object matching this structure and field types:
${JSON.stringify(template)}

Rules:${rules}`;

  try {
    const firstResponse = await invokeBedrock(prompt);
    let firstParsed: ModelReport | null = null;
    let repairReason = "";

    try {
      firstParsed = parseModelReport(firstResponse);
      const relevanceIssues = senderRelevanceIssues(firstParsed, profile);
      if (!relevanceIssues.length) {
        return applyModelReport(firstParsed, fallback, profile, evidence);
      }
      repairReason = `Offer relevance checks: ${relevanceIssues.join(", ")}`;
    } catch (validationError) {
      repairReason = validationError instanceof Error
        ? validationError.message.slice(0, 700)
        : "Unknown validation error";
    }

    console.warn("Bedrock response required one repair attempt", { error: repairReason });
    const repairPrompt = `The previous response failed validation or was insufficiently relevant to the sender's actual services. Rewrite it completely as one valid JSON object. Do not merely edit generic wording. Re-read the sender's exact offers and make the opportunity, best angle, objections, buyer roles, email, WhatsApp message and follow-up specific to those offers.

Reason the previous response was rejected:
${repairReason}

Sender business profile:
${JSON.stringify(profile)}

Target business:
${JSON.stringify(place)}

Public website evidence:
${JSON.stringify(evidencePayload)}

Required structure:
${JSON.stringify(template)}

Rules:${rules}

Previous invalid or irrelevant response:
${firstResponse.slice(0, 24_000)}`;

    try {
      const repaired = parseModelReport(await invokeBedrock(repairPrompt));
      return applyModelReport(repaired, fallback, profile, evidence);
    } catch (repairError) {
      if (firstParsed) {
        console.warn("Bedrock repair failed; using the parsed AI report with deterministic offer-relevance safeguards", {
          error: repairError instanceof Error ? repairError.message.slice(0, 700) : "Unknown repair error",
        });
        return applyModelReport(firstParsed, fallback, profile, evidence);
      }
      throw repairError;
    }
  } catch (error) {
    console.error("Bedrock prospect analysis invocation failed; returning rules-based fallback", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message.slice(0, 700) : "Unknown error",
      modelId: env.bedrockModelId,
      region: env.awsRegion,
    });
    return fallback;
  }
}
