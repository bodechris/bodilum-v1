import type {
  BrandScorecardAnswerMap,
  BrandScorecardCategoryId,
  BrandScorecardCategoryScore,
  BrandScorecardInsight,
  BrandScorecardPlanItem,
  BrandScorecardProfile,
  BrandScorecardResult,
} from "@/types/brand-scorecard";

export type BrandScorecardQuestion = {
  id: string;
  categoryId: BrandScorecardCategoryId;
  title: string;
  help: string;
  action: string;
  whyItMatters: string;
};

export type BrandScorecardCategory = {
  id: BrandScorecardCategoryId;
  title: string;
  shortTitle: string;
  description: string;
  questions: BrandScorecardQuestion[];
};

export const scoreOptions = [
  { value: 1, label: "Not in place", shortLabel: "Not in place" },
  { value: 2, label: "Weak or mostly informal", shortLabel: "Weak" },
  { value: 3, label: "Partly in place", shortLabel: "Partial" },
  { value: 4, label: "Strong and consistent", shortLabel: "Strong" },
  { value: 5, label: "Excellent and systemised", shortLabel: "Excellent" },
] as const;

export const brandScorecardCategories: BrandScorecardCategory[] = [
  {
    id: "foundation",
    title: "Brand foundation and positioning",
    shortTitle: "Foundation",
    description: "How clearly the business understands who it serves, what it promises and why customers should choose it.",
    questions: [
      {
        id: "foundation-purpose",
        categoryId: "foundation",
        title: "We can explain why the business exists beyond simply making sales.",
        help: "A useful purpose gives the team and customers a reason to care about the brand.",
        action: "Write one plain-language sentence explaining the change your business exists to create for customers.",
        whyItMatters: "A clear purpose improves decision-making, communication and long-term trust.",
      },
      {
        id: "foundation-audience",
        categoryId: "foundation",
        title: "We have a specific description of our most valuable customer.",
        help: "The answer should be narrower than “everyone” or “small businesses.”",
        action: "Define one primary customer by situation, need, buying power and location—not only age or gender.",
        whyItMatters: "Specific brands are easier to notice, remember and recommend.",
      },
      {
        id: "foundation-problem",
        categoryId: "foundation",
        title: "We clearly understand the urgent problem or desire that brings customers to us.",
        help: "Think about the moment that makes a customer start searching, asking or comparing.",
        action: "Document the three most common situations that trigger a customer enquiry or purchase.",
        whyItMatters: "Brands grow faster when their message begins with the customer’s real motivation.",
      },
      {
        id: "foundation-difference",
        categoryId: "foundation",
        title: "Customers can quickly understand what makes us meaningfully different.",
        help: "Being friendly or offering quality is rarely distinctive enough on its own.",
        action: "Choose one defendable difference based on expertise, process, access, speed, experience or outcome.",
        whyItMatters: "A meaningful difference reduces price-only comparison.",
      },
      {
        id: "foundation-value",
        categoryId: "foundation",
        title: "Our main value proposition is clear in one short statement.",
        help: "It should connect the customer, the result and the reason to believe.",
        action: "Create a one-sentence value proposition: who you help, the result you create and how you do it differently.",
        whyItMatters: "A clear value proposition improves websites, sales conversations and referrals.",
      },
      {
        id: "foundation-promise",
        categoryId: "foundation",
        title: "Our brand promise is realistic, specific and consistently delivered.",
        help: "The promise should describe the experience or outcome customers can rely on.",
        action: "Define one customer promise and identify the operational behaviour required to keep it every time.",
        whyItMatters: "A reliable promise turns marketing claims into reputation.",
      },
      {
        id: "foundation-competition",
        categoryId: "foundation",
        title: "We understand the alternatives customers compare us with.",
        help: "Alternatives can include competitors, doing nothing or solving the problem themselves.",
        action: "Review five alternatives and note where they are stronger, weaker and more memorable than your brand.",
        whyItMatters: "Competitive awareness prevents a brand from sounding identical to the market.",
      },
      {
        id: "foundation-team",
        categoryId: "foundation",
        title: "Our team explains the business in a consistent way.",
        help: "Customers should not hear a completely different story from every staff member.",
        action: "Create a short internal brand script covering who you help, what you offer, the promise and the next step.",
        whyItMatters: "Consistency across people makes a small business appear more credible and established.",
      },
    ],
  },
  {
    id: "identity",
    title: "Visual identity and consistency",
    shortTitle: "Identity",
    description: "How professionally and consistently the brand presents itself across everyday customer touchpoints.",
    questions: [
      {
        id: "identity-logo",
        categoryId: "identity",
        title: "Our logo is distinctive, legible and works at both small and large sizes.",
        help: "It should work on a phone screen, invoice, sign, social profile and printed material.",
        action: "Test the logo in black and white, at 24 pixels and on light and dark backgrounds; fix weak versions.",
        whyItMatters: "A usable logo protects recognition across low-cost and premium touchpoints.",
      },
      {
        id: "identity-colours",
        categoryId: "identity",
        title: "We use a deliberate brand colour system rather than choosing colours randomly.",
        help: "A practical palette includes primary, secondary, neutral and accessibility guidance.",
        action: "Define a compact colour palette with exact HEX/RGB/CMYK values and clear usage roles.",
        whyItMatters: "Consistent colour improves recognition before a customer even reads the name.",
      },
      {
        id: "identity-type",
        categoryId: "identity",
        title: "Our typography is consistent and easy to read.",
        help: "This includes headings, body text, digital use and printed materials.",
        action: "Select one display font and one body font, then document sizes and hierarchy for common materials.",
        whyItMatters: "Good typography makes a brand feel organised, premium and easier to trust.",
      },
      {
        id: "identity-guidelines",
        categoryId: "identity",
        title: "We have simple brand guidelines that other people can follow.",
        help: "Even a five-page guide is useful if it covers the essentials.",
        action: "Create a concise guide covering logo use, colours, typography, imagery, tone and common mistakes.",
        whyItMatters: "Guidelines reduce design inconsistency as the business grows or outsources work.",
      },
      {
        id: "identity-consistency",
        categoryId: "identity",
        title: "Our website, social pages, documents, signage and customer messages look like one brand.",
        help: "A customer should recognise the business when moving between channels.",
        action: "Audit ten current touchpoints and replace the three most inconsistent ones first.",
        whyItMatters: "Visual consistency compounds trust across repeated customer encounters.",
      },
      {
        id: "identity-imagery",
        categoryId: "identity",
        title: "Our photography, illustrations or product images feel intentional and credible.",
        help: "The imagery should reflect the real customer, market and quality of the offer.",
        action: "Create a simple image direction and replace low-quality, generic or misleading visuals.",
        whyItMatters: "Customers often judge quality from imagery before they examine the offer.",
      },
      {
        id: "identity-templates",
        categoryId: "identity",
        title: "We have reusable templates for our most frequent brand materials.",
        help: "Examples include quotations, invoices, social posts, presentations and WhatsApp graphics.",
        action: "Build templates for the five assets your team recreates most often.",
        whyItMatters: "Templates improve speed without sacrificing consistency.",
      },
      {
        id: "identity-recognition",
        categoryId: "identity",
        title: "Our brand is visually recognisable without always relying on the logo.",
        help: "Distinctive brands use a repeatable combination of colour, type, layout, imagery and tone.",
        action: "Choose two or three distinctive visual devices and use them consistently across major touchpoints.",
        whyItMatters: "Recognition lowers the effort required for customers to remember and choose the brand.",
      },
    ],
  },
  {
    id: "digital",
    title: "Digital presence and credibility",
    shortTitle: "Digital",
    description: "How easy it is for customers to find, understand, trust and contact the business online—especially on mobile.",
    questions: [
      {
        id: "digital-home",
        categoryId: "digital",
        title: "Our website or main business page immediately explains what we do and who it is for.",
        help: "A first-time visitor should understand the offer within a few seconds.",
        action: "Rewrite the first screen around the customer, the result and one clear next action.",
        whyItMatters: "Clarity prevents interested visitors from leaving before they understand the value.",
      },
      {
        id: "digital-mobile",
        categoryId: "digital",
        title: "Our digital experience works well on affordable mobile devices and slower connections.",
        help: "This matters especially in mobile-first and emerging markets.",
        action: "Test the site on a mid-range phone and mobile data; fix load time, text size and difficult interactions.",
        whyItMatters: "A heavy or difficult mobile experience quietly excludes valuable customers.",
      },
      {
        id: "digital-offers",
        categoryId: "digital",
        title: "Our products or services are clearly explained with outcomes and next steps.",
        help: "Customers should not need to message simply to discover the basics.",
        action: "Create one clear page or section for each priority offer: problem, result, proof, process and CTA.",
        whyItMatters: "Clear offers shorten the journey from curiosity to enquiry.",
      },
      {
        id: "digital-discovery",
        categoryId: "digital",
        title: "Our business information is accurate and discoverable on search and local listings.",
        help: "Check name, address, phone, opening hours, categories and location pages.",
        action: "Standardise business details across Google Business Profile, directories and social accounts.",
        whyItMatters: "Accurate listings improve discovery and reduce customer doubt.",
      },
      {
        id: "digital-social",
        categoryId: "digital",
        title: "Our social profiles consistently reflect the current brand and offers.",
        help: "The bio, visuals, links, pinned posts and recent content should tell one story.",
        action: "Refresh every active profile with one positioning statement, current links and consistent visual assets.",
        whyItMatters: "Many customers use social pages as a credibility check before contacting a business.",
      },
      {
        id: "digital-proof",
        categoryId: "digital",
        title: "We show credible proof such as reviews, case studies, results or recognised clients.",
        help: "Proof should be specific and easy to verify where possible.",
        action: "Collect and publish three proof assets that demonstrate results, experience or customer satisfaction.",
        whyItMatters: "Proof reduces the perceived risk of choosing a smaller or unfamiliar business.",
      },
      {
        id: "digital-contact",
        categoryId: "digital",
        title: "Customers can contact, book or buy from us without unnecessary friction.",
        help: "Test the full journey from Google or social media through WhatsApp, forms, booking or payment.",
        action: "Choose one primary conversion path and remove unclear links, repeated questions and avoidable steps.",
        whyItMatters: "Every extra step gives an interested customer another chance to abandon the journey.",
      },
      {
        id: "digital-freshness",
        categoryId: "digital",
        title: "Our digital presence looks current and actively maintained.",
        help: "Outdated prices, dates, team members or promotions damage credibility.",
        action: "Run a quarterly digital freshness review and remove expired or contradictory information.",
        whyItMatters: "Fresh information signals that the business is active, attentive and reliable.",
      },
    ],
  },
  {
    id: "experience",
    title: "Customer experience and trust",
    shortTitle: "Experience",
    description: "How consistently the business turns brand promises into reassuring, professional customer interactions.",
    questions: [
      {
        id: "experience-enquiry",
        categoryId: "experience",
        title: "We have a clear and consistent way to handle new enquiries.",
        help: "The first response should qualify the need, answer common questions and guide the next step.",
        action: "Create an enquiry script and checklist for phone, WhatsApp, email and social messages.",
        whyItMatters: "The first conversation often determines whether interest becomes revenue.",
      },
      {
        id: "experience-speed",
        categoryId: "experience",
        title: "Customers usually receive a useful response quickly enough for our market.",
        help: "A fast acknowledgement is useful only when it moves the customer forward.",
        action: "Set response-time standards and prepare approved answers for the ten most common questions.",
        whyItMatters: "Slow or inconsistent replies send ready-to-buy customers to easier competitors.",
      },
      {
        id: "experience-tone",
        categoryId: "experience",
        title: "Our tone of voice feels consistent across staff and channels.",
        help: "The brand should sound like the same business on WhatsApp, invoices, social media and in person.",
        action: "Define three tone principles with examples of what to say and what to avoid.",
        whyItMatters: "A consistent voice makes interactions feel intentional rather than improvised.",
      },
      {
        id: "experience-onboarding",
        categoryId: "experience",
        title: "Our booking, ordering, payment or onboarding process is clear and professional.",
        help: "Customers should know what happens next, what is required and when delivery begins.",
        action: "Map the full onboarding journey and create a simple confirmation message or welcome pack.",
        whyItMatters: "Good onboarding protects trust at the moment money and expectations change hands.",
      },
      {
        id: "experience-expectations",
        categoryId: "experience",
        title: "We set clear expectations about price, timing, scope and customer responsibilities.",
        help: "Surprises create complaints even when the core service is good.",
        action: "Standardise quotations, terms, timelines and pre-service instructions for priority offers.",
        whyItMatters: "Clear expectations reduce disputes, rework and avoidable disappointment.",
      },
      {
        id: "experience-followup",
        categoryId: "experience",
        title: "We follow up after delivery, appointments or purchases.",
        help: "Follow-up can confirm satisfaction, solve issues and create the next opportunity.",
        action: "Create one post-purchase follow-up and one reactivation message for past customers.",
        whyItMatters: "The cheapest growth often comes from customers who already know the brand.",
      },
      {
        id: "experience-reviews",
        categoryId: "experience",
        title: "We consistently ask satisfied customers for reviews, referrals or testimonials.",
        help: "The request should happen at the right moment and make the action easy.",
        action: "Build a review request into the completion process and give staff a direct link to share.",
        whyItMatters: "A steady flow of recent proof improves trust and local discovery.",
      },
      {
        id: "experience-feedback",
        categoryId: "experience",
        title: "We capture complaints and feedback, then use them to improve the business.",
        help: "The goal is not only to resolve one complaint but to prevent repetition.",
        action: "Maintain a simple feedback log with issue, cause, resolution and process change.",
        whyItMatters: "Brands become stronger when customer friction produces operational learning.",
      },
    ],
  },
  {
    id: "growth",
    title: "Growth readiness and AI enablement",
    shortTitle: "Growth",
    description: "Whether the brand is supported by repeatable systems, useful data and practical AI-enabled ways of working.",
    questions: [
      {
        id: "growth-goals",
        categoryId: "growth",
        title: "We have specific brand and growth goals for the next 90 days.",
        help: "Goals should name an outcome, measure, owner and deadline.",
        action: "Choose three 90-day goals covering visibility, conversion and customer retention.",
        whyItMatters: "Clear goals prevent brand activity from becoming endless content without commercial progress.",
      },
      {
        id: "growth-leads",
        categoryId: "growth",
        title: "We consistently capture and track enquiries or leads.",
        help: "A notebook is better than memory, but a shared system is better than a notebook.",
        action: "Create one lead register with source, need, status, value, next action and owner.",
        whyItMatters: "Untracked enquiries become invisible lost revenue.",
      },
      {
        id: "growth-metrics",
        categoryId: "growth",
        title: "We know which brand and marketing activities create enquiries, sales or repeat customers.",
        help: "Useful measures include source, response, conversion, repeat rate and average value.",
        action: "Track five commercial metrics monthly and stop reporting vanity numbers without business context.",
        whyItMatters: "Measurement helps a small business invest scarce time and money where it works.",
      },
      {
        id: "growth-sales",
        categoryId: "growth",
        title: "We have a repeatable sales process rather than relying entirely on the owner’s memory.",
        help: "The process should cover qualification, proposal, follow-up, close and handover.",
        action: "Document the current sales journey and create the three follow-up messages used most often.",
        whyItMatters: "Repeatability makes growth less dependent on one person’s energy or availability.",
      },
      {
        id: "growth-database",
        categoryId: "growth",
        title: "We maintain permission-based customer and prospect information for future communication.",
        help: "This can include email, WhatsApp opt-ins, purchase history and relevant preferences.",
        action: "Create a clean customer list and define how consent, segmentation and opt-out requests are handled.",
        whyItMatters: "Owned customer relationships are more resilient than relying only on social algorithms.",
      },
      {
        id: "growth-automation",
        categoryId: "growth",
        title: "Routine customer or administrative tasks are automated where it improves service.",
        help: "Examples include confirmations, reminders, follow-ups, review requests and internal summaries.",
        action: "Choose one repetitive, high-volume task and automate it without removing the human escalation path.",
        whyItMatters: "Practical automation gives a small team more time for judgement, service and sales.",
      },
      {
        id: "growth-ai",
        categoryId: "growth",
        title: "Our team uses AI safely and consistently in everyday business work.",
        help: "Useful areas include research, drafting, customer responses, analysis, design support and process documentation.",
        action: "Define three approved AI use cases, reusable prompts and rules for reviewing sensitive or customer-facing work.",
        whyItMatters: "Early, disciplined AI adoption can improve speed and learning before competitors build the same capability.",
      },
      {
        id: "growth-plan",
        categoryId: "growth",
        title: "Someone owns a practical plan for improving the brand over time.",
        help: "The plan should connect brand improvements to business outcomes and capacity.",
        action: "Assign one owner, a monthly review and a prioritised backlog of brand improvements.",
        whyItMatters: "Brands weaken when improvement belongs to everyone in theory and no one in practice.",
      },
    ],
  },
];

export const allBrandScorecardQuestions = brandScorecardCategories.flatMap((category) => category.questions);
export const brandScorecardQuestionIds = allBrandScorecardQuestions.map((question) => question.id);

function categoryInterpretation(score: number) {
  if (score >= 85) return "A clear competitive strength that should be protected and used more deliberately.";
  if (score >= 70) return "Strong overall, with a few inconsistencies limiting the full commercial value.";
  if (score >= 55) return "Credible but uneven; customers may experience different levels of quality across touchpoints.";
  if (score >= 40) return "Emerging; useful pieces exist but the brand still depends heavily on improvisation.";
  return "A priority risk; the weakness can reduce trust, clarity or the ability to grow consistently.";
}

export function maturityFromScore(score: number) {
  if (score >= 90) {
    return {
      label: "Category-leading brand",
      description: "The brand is clear, recognisable, trusted and supported by repeatable systems. The focus should shift to protecting distinctiveness and compounding the advantage.",
    };
  }
  if (score >= 80) {
    return {
      label: "Strong and scalable brand",
      description: "The brand already creates confidence and consistency. A smaller number of strategic gaps are now limiting growth or differentiation.",
    };
  }
  if (score >= 65) {
    return {
      label: "Competitive brand",
      description: "Customers can understand and trust the business, but inconsistent touchpoints and processes still weaken the full experience.",
    };
  }
  if (score >= 50) {
    return {
      label: "Credible but inconsistent",
      description: "The business has useful brand assets and customer trust, but too much still depends on individual effort, memory or channel-by-channel improvisation.",
    };
  }
  if (score >= 35) {
    return {
      label: "Emerging brand",
      description: "The brand is taking shape, but customers may struggle to understand the difference, trust the presentation or experience the same quality consistently.",
    };
  }
  return {
    label: "Fragile brand foundation",
    description: "The business may deliver real value, but the brand is not yet communicating or supporting that value reliably enough to compete with confidence.",
  };
}

function insightFromQuestion(question: BrandScorecardQuestion, score: number): BrandScorecardInsight {
  const category = brandScorecardCategories.find((item) => item.id === question.categoryId);
  return {
    questionId: question.id,
    categoryId: question.categoryId,
    category: category?.title ?? question.categoryId,
    title: question.title,
    score,
    action: question.action,
    whyItMatters: question.whyItMatters,
  };
}

function categoryScores(answers: BrandScorecardAnswerMap): BrandScorecardCategoryScore[] {
  return brandScorecardCategories.map((category) => {
    const values = category.questions.map((question) => Number(answers[question.id] ?? 0));
    const answered = values.filter((value) => value > 0).length;
    const raw = values.reduce((sum, value) => sum + value, 0);
    const minimum = category.questions.length;
    const range = category.questions.length * 4;
    const score = answered === category.questions.length
      ? Math.round(((raw - minimum) / range) * 100)
      : Math.round((raw / (category.questions.length * 5)) * 100);
    return {
      id: category.id,
      title: category.title,
      shortTitle: category.shortTitle,
      score,
      answered,
      totalQuestions: category.questions.length,
      interpretation: categoryInterpretation(score),
    };
  });
}

function defaultAiInsight(profile: BrandScorecardProfile, score: number, priorities: BrandScorecardInsight[]) {
  const first = priorities[0];
  const second = priorities[1];
  return {
    executiveSummary: `${profile.businessName} has a brand score of ${score}/100. The business has a real foundation to build on, but its next advantage will come from making the customer experience more deliberate and consistent—not simply producing more promotional content.`,
    commercialImpact: [
      first ? `${first.category}: ${first.whyItMatters}` : "Prioritise the weakest customer-facing touchpoint first.",
      second ? `${second.category}: ${second.whyItMatters}` : "Turn brand decisions into repeatable team behaviours.",
      "Connect every brand improvement to a measurable result such as response, conversion, repeat business or customer trust.",
    ],
    priorityNarrative: priorities.slice(0, 3).map((item) => `${item.action}`),
    firstMove: first?.action ?? "Choose one high-friction customer touchpoint and improve it this week.",
  };
}

function lowestQuestionForCategory(answers: BrandScorecardAnswerMap, categoryId: BrandScorecardCategoryId) {
  const category = brandScorecardCategories.find((item) => item.id === categoryId);
  if (!category) return null;
  return [...category.questions].sort((a, b) => (answers[a.id] ?? 0) - (answers[b.id] ?? 0))[0] ?? null;
}

function buildPlan(answers: BrandScorecardAnswerMap): BrandScorecardPlanItem[] {
  const foundation = lowestQuestionForCategory(answers, "foundation");
  const visible = [
    lowestQuestionForCategory(answers, "identity"),
    lowestQuestionForCategory(answers, "digital"),
  ].filter(Boolean).sort((a, b) => (answers[a!.id] ?? 0) - (answers[b!.id] ?? 0))[0];
  const experience = lowestQuestionForCategory(answers, "experience");
  const growth = lowestQuestionForCategory(answers, "growth");

  return [
    {
      period: "Week 1",
      title: "Clarify the promise",
      action: foundation?.action ?? "Clarify the customer, problem and brand promise.",
      outcome: foundation?.whyItMatters ?? "The business becomes easier to understand and recommend.",
    },
    {
      period: "Week 2",
      title: "Fix the most visible trust gap",
      action: visible?.action ?? "Improve the weakest visible customer touchpoint.",
      outcome: visible?.whyItMatters ?? "Customers receive a more credible and consistent first impression.",
    },
    {
      period: "Week 3",
      title: "Improve one customer journey",
      action: experience?.action ?? "Standardise one high-volume customer interaction.",
      outcome: experience?.whyItMatters ?? "More customer interest becomes completed action.",
    },
    {
      period: "Week 4",
      title: "Install a repeatable growth habit",
      action: growth?.action ?? "Assign ownership and measurement to the next brand improvement.",
      outcome: growth?.whyItMatters ?? "Brand improvement becomes a business system rather than a one-off project.",
    },
  ];
}

export function calculateBrandScorecard(
  profile: BrandScorecardProfile,
  answers: BrandScorecardAnswerMap,
  id: string,
): BrandScorecardResult {
  const categoryResults = categoryScores(answers);
  const total = allBrandScorecardQuestions.reduce((sum, question) => sum + Number(answers[question.id] ?? 0), 0);
  const minimum = allBrandScorecardQuestions.length;
  const range = allBrandScorecardQuestions.length * 4;
  const overallScore = Math.max(0, Math.min(100, Math.round(((total - minimum) / range) * 100)));
  const maturity = maturityFromScore(overallScore);
  const ranked = allBrandScorecardQuestions
    .map((question) => insightFromQuestion(question, Number(answers[question.id] ?? 0)))
    .sort((a, b) => a.score - b.score);
  const priorities = ranked.slice(0, 5);
  const strengths = [...ranked].sort((a, b) => b.score - a.score).slice(0, 4);
  const weakestCategory = [...categoryResults].sort((a, b) => a.score - b.score)[0];
  const strongestCategory = [...categoryResults].sort((a, b) => b.score - a.score)[0];
  const verdict = `${profile.businessName} is currently a ${maturity.label.toLowerCase()}. ${strongestCategory.shortTitle} is the strongest area, while ${weakestCategory.shortTitle.toLowerCase()} is the clearest opportunity to improve trust and commercial performance.`;

  return {
    id,
    profile,
    answers,
    overallScore,
    maturity,
    verdict,
    categoryScores: categoryResults,
    strengths,
    priorities,
    next30Days: buildPlan(answers),
    aiInsight: defaultAiInsight(profile, overallScore, priorities),
    generatedWithAI: false,
    generatedAt: new Date().toISOString(),
  };
}
