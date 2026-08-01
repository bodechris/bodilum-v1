export type Offer = {
  name: string;
  description: string;
};

export type BusinessProfile = {
  businessName: string;
  website: string;
  industry: string;
  description: string;
  offers: Offer[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

export type PlaceSummary = {
  id: string;
  name: string;
  address: string;
  primaryType: string;
  businessStatus?: string;
  googleMapsUri?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  phone?: string;
  demo?: boolean;
};

export type PlaceDetails = PlaceSummary & {
  internationalPhone?: string;
  openingHours?: string[];
  types?: string[];
};

export type WebsiteEvidence = {
  website: string;
  pagesAnalysed: Array<{ title: string; url: string; text: string }>;
  emails: string[];
  phones: string[];
  socialLinks: string[];
  bookingLinks: string[];
  pageTitles: string[];
  notes: string[];
};

export type EvidencePoint = {
  title: string;
  evidence: string;
  whyItMatters: string;
};

export type OpportunityPoint = {
  title: string;
  description: string;
  outcome: string;
};

export type Objection = {
  objection: string;
  response: string;
};

export type DecisionMaker = {
  name?: string;
  role: string;
  contact?: string;
  confidence: "Verified" | "Likely" | "Suggested";
  source?: string;
};

export type ProspectReport = {
  prospectName: string;
  prospectScore: number;
  confidence: "High" | "Medium" | "Low";
  priority: "Tier A" | "Tier B" | "Tier C" | "Low priority";
  oneLineVerdict: string;
  commerciallyAttractive: EvidencePoint[];
  opportunity: OpportunityPoint[];
  bestAngle: {
    headline: string;
    explanation: string;
    avoidLeadingWith: string;
  };
  objections: Objection[];
  decisionMakers: DecisionMaker[];
  finalAssessment: {
    verdict: string;
    nextStep: string;
  };
  email: {
    subjectLines: string[];
    body: string;
    whatsapp: string;
    followUp: string;
  };
  discoveredContacts: {
    emails: string[];
    phones: string[];
    socialLinks: string[];
    bookingLinks: string[];
  };
  sources: Array<{ label: string; url: string }>;
  generatedWithAI: boolean;
  dataNote: string;
};
