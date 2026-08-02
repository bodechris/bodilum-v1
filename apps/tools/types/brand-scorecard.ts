export type BrandScorecardProfile = {
  businessName: string;
  website: string;
  industry: string;
  respondentName: string;
  contactEmail: string;
  contactPhone: string;
};

export type BrandScorecardAnswerMap = Record<string, number>;

export type BrandScorecardCategoryId =
  | "foundation"
  | "identity"
  | "digital"
  | "experience"
  | "growth";

export type BrandScorecardCategoryScore = {
  id: BrandScorecardCategoryId;
  title: string;
  shortTitle: string;
  score: number;
  answered: number;
  totalQuestions: number;
  interpretation: string;
};

export type BrandScorecardInsight = {
  questionId: string;
  categoryId: BrandScorecardCategoryId;
  category: string;
  title: string;
  score: number;
  action: string;
  whyItMatters: string;
};

export type BrandScorecardPlanItem = {
  period: string;
  title: string;
  action: string;
  outcome: string;
};

export type BrandScorecardAiInsight = {
  executiveSummary: string;
  commercialImpact: string[];
  priorityNarrative: string[];
  firstMove: string;
};

export type BrandScorecardResult = {
  id: string;
  profile: BrandScorecardProfile;
  answers: BrandScorecardAnswerMap;
  overallScore: number;
  maturity: {
    label: string;
    description: string;
  };
  verdict: string;
  categoryScores: BrandScorecardCategoryScore[];
  strengths: BrandScorecardInsight[];
  priorities: BrandScorecardInsight[];
  next30Days: BrandScorecardPlanItem[];
  aiInsight: BrandScorecardAiInsight;
  generatedWithAI: boolean;
  generatedAt: string;
};

export type BrandScorecardSavedState = {
  profile: BrandScorecardProfile;
  answers: BrandScorecardAnswerMap;
  currentStep: number;
  lastResult: BrandScorecardResult | null;
};
