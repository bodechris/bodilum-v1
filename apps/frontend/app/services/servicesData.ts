export type ServiceEntry = {
  title: string;
  description: string;
  link: string;
  price?: string;
  accent?: string;
  accentSoft?: string;
  accentContrast?: string;
  heroPattern?: "mesh" | "grid" | "spotlight" | "bands";
  heroMood?: "calm" | "bold" | "technical" | "editorial";
  summary?: string;
  timeline?: string;
  bestFor?: string;
  outcomes?: string[];
  process?: string[];
  deliverables?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  ctaLabel?: string;
  ctaHref?: string;
  thumbnail?: string;
};

export type ServiceSectionData = {
  title: string;
  subtitle?: string;
  description?: string;
  media?: string;
  services: ServiceEntry[];
};

export const aiIntegrationsSection: ServiceSectionData = {
  title: "AI Integrations",
  subtitle:
    "AI workflows that reduce response time and repetitive work for high-performing teams.",
  description:
    "Bodilum connects AI tools to your customer journey and internal workflow so you can handle leads, content, and routine operations with more speed and less manual effort.",
  media: "/images/design-8.webp",
  services: [
    {
      title: "AI Opportunity Audit",
      description:
        "We’ll audit your customer journey and internal workflow to identify the best opportunities to integrate AI tools that can save you time, reduce manual work, and help you respond faster to customers.",
      summary:
        "A short consulting sprint that shows you where AI will actually create leverage before you spend money implementing the wrong tools.",
      accent: "#0f766e",
      accentSoft: "#d9fbf3",
      accentContrast: "#ecfffb",
      heroPattern: "mesh",
      heroMood: "calm",
      thumbnail: "/images/ai-integrations-1.webp",
      link: "/services/ai-integrations/ai-opportunity-audit",
      price: "310",
      timeline: "2 to 3 business days",
      outcomes: [
        "A prioritized list of AI opportunities worth acting on first",
        "Clear recommendations for tools, workflows, and automations",
        "A rollout roadmap your team can actually execute",
      ],
      process: [
        "Review your current customer journey and internal operations",
        "Map repetitive tasks, delays, and decision bottlenecks",
        "Recommend high-impact AI use cases and practical next steps",
      ],
      deliverables: [
        "AI opportunity audit",
        "Customer journey analysis",
        "Internal workflow analysis",
        "AI tool recommendations",
        "Implementation roadmap",
      ],
      faqs: [
        {
          question: "Is this technical or strategic?",
          answer:
            "It is mainly strategic with operational recommendations. You get concrete implementation direction without paying for a full build sprint yet.",
        },
        {
          question: "Who is this best for?",
          answer:
            "Teams that know AI could help but want clarity on where to start and what will produce measurable time savings first.",
        },
      ],
      ctaLabel: "Book the audit",
      ctaHref: "/contact",
    },
    {
      title: "AI Starter Sprint",
      description:
        "A fast, focused sprint to implement 1–3 AI tools that can save you time, reduce manual work, and help you respond faster to customers. We’ll implement the AI tools in a way that’s seamless for your team and customers.",
      summary:
        "A hands-on implementation sprint for teams ready to move from AI ideas into working automations and assistant flows.",
      accent: "#065f46",
      accentSoft: "#d4ffe8",
      accentContrast: "#effff7",
      heroPattern: "grid",
      heroMood: "technical",
      link: "/services/ai-integrations/ai-starter-sprint",
      thumbnail: "/images/ai-integrations-3.webp",
      price: "920",
      timeline: "5 to 7 business days",
      bestFor:
        "Startups, consultants, coaches, small businesses, personal brands, service providers, and founders who need a modern landing page quickly without spending premium-launch money.",
      outcomes: [
        "Fewer manual follow-ups and repetitive admin tasks",
        "Faster response times for leads and customer questions",
        "An initial AI stack your team can keep using after launch",
      ],
      process: [
        "Pick the top 1 to 3 AI workflows worth implementing first",
        "Configure tools, prompts, and automation handoffs",
        "Test the flows with your real business scenarios and refine them",
      ],
      deliverables: [
        "1–3 AI tool implementation",
        "AI workflow audit",
        "AI tool selection",
        "AI integration implementation",
        "AI customer reply assistant",
        "AI lead qualification flow",
        "AI proposal/quote assistant",
        "AI content engine",
        "AI follow-up system",
        "AI internal knowledge base",
      ],
      faqs: [
        {
          question: "Do I need existing AI tools before this starts?",
          answer:
            "No. Tool selection is part of the sprint, and the setup is matched to your workflow, budget, and team size.",
        },
        {
          question: "Will my team know how to use it after delivery?",
          answer:
            "Yes. The sprint includes setup clarity and operational guidance so the workflows are usable immediately.",
        },
      ],
      ctaLabel: "Start the sprint",
      ctaHref: "/contact",
    },
    {
      title: "AI Business Upgrade Sprint",
      description:
        "A fast, focused sprint to identify and implement AI tools that can save you time, reduce manual work, and help you respond faster to customers. We’ll audit your current workflow, identify the best AI tools for your business, and implement them in a way that’s seamless for your team and customers.",
      summary:
        "A higher-touch AI upgrade for businesses that want multiple workflows redesigned, automated, and rolled out with stronger operational structure.",
      accent: "#164e63",
      accentSoft: "#d8f3ff",
      accentContrast: "#effbff",
      heroPattern: "spotlight",
      heroMood: "bold",
      thumbnail: "/images/ai-integrations-6.webp",
      link: "/services/ai-integrations/ai-business-upgrade-sprint",
      price: ">=1530",
      timeline: "10 to 14 business days",
      bestFor:
        "Startups, consultants, coaches, small businesses, personal brands, service providers, and founders who need a modern landing page quickly without spending premium-launch money.",
      outcomes: [
        "Multiple customer and internal workflows improved in one sprint",
        "A more scalable operations layer with less manual coordination",
        "A stronger AI operating system for sales, support, and delivery",
      ],
      process: [
        "Audit the business workflows that create the most drag",
        "Prioritize the best 3 to 5 areas for AI integration",
        "Implement, test, and refine the selected systems with your team",
      ],
      deliverables: [
        "AI workflow audit",
        "3–5 workflow selection",
        "AI tool recommendations",
        "AI integration implementation",
        "AI customer reply assistant",
        "AI lead qualification flow",
        "AI proposal/quote assistant",
        "AI content engine",
        "AI follow-up system",
        "AI internal knowledge base",
        "AI FAQ/customer support assistant",
        "AI admin assistant",
        "AI document generator",
        "AI staff prompt library",
      ],
      faqs: [
        {
          question: "How is this different from the starter sprint?",
          answer:
            "The upgrade sprint handles more workflows, more moving parts, and a broader business systems view rather than a small first-wave rollout.",
        },
        {
          question: "Can this include customer-facing and internal tools together?",
          answer:
            "Yes. The sprint can combine lead handling, support, content, sales ops, and internal team processes in one structured rollout.",
        },
      ],
      ctaLabel: "Plan the upgrade",
      ctaHref: "/contact",
    },
  ],
};

export const designSection: ServiceSectionData = {
  title: "Design Services",
  subtitle:
    "Design that creates a polished brand presence for businesses that want to stand out and get better results.",
  description:
    "Bodilum's design services help small businesses create a polished and professional brand presence across their website, customer touchpoints, and marketing materials — so they can get better leads, respond faster, and operate smarter.",
  media: "/images/design-1.webp",
  services: [
    {
      title: "48-Hour Small Business Professional Makeover",
      description:
        "A fast, focused makeover to give your small business a more polished and professional brand presence across your customer touchpoints, and marketing materials. We’ll audit your current brand presence, identify the most impactful improvements, and implement them in a way that’s seamless for your team and customers.",
      summary:
        "A rapid brand polish sprint for businesses that need to look more credible and consistent without waiting weeks for a full rebrand.",
      accent: "#9a3412",
      accentSoft: "#ffe8d9",
      accentContrast: "#fff5ef",
      heroPattern: "bands",
      heroMood: "editorial",
      link: "/services/design/48-hour-small-business-makeover",
      thumbnail: "/images/branding-1.webp",
      price: "460",
      timeline: "48 hours",
      bestFor:
        "Startups, consultants, coaches, small businesses, personal brands, service providers, and founders who need a modern landing page quickly without spending premium-launch money.",
      outcomes: [
        "A cleaner and more professional visual presence fast",
        "Improved consistency across customer touchpoints",
        "Sharper day-to-day business assets your team can use immediately",
      ],
      process: [
        "Review your current brand touchpoints and visible gaps",
        "Choose the most important assets to improve first",
        "Deliver a polished update package you can use right away",
      ],
      deliverables: [
        "2 simple logo variations",
        "Business card",
        "Price list/menu",
        "Invoice",
        "Quote",
        "Receipt",
        "Email signature",
        "Google My Business profile",
        "Google Analytics setup",
        "Social media profile",
        "Free on-board of brand identity on BiznesXpo",
      ],
      faqs: [
        {
          question: "Is this a full rebrand?",
          answer:
            "No. It is a focused makeover designed to improve the most visible brand assets quickly without the depth of a full strategy-led rebrand.",
        },
        {
          question: "What makes this useful for small businesses?",
          answer:
            "It targets the practical assets customers see first, so the improvement shows up where trust and first impressions matter most.",
        },
      ],
      ctaLabel: "Request the makeover",
      ctaHref: "/contact",
    },
    {
      title: "Brand Discovery & Refresh",
      description:
        "Helping businesses discover their unique brand identity and refreshing existing brand identity to stay relevant in the market.",
      summary:
        "A deeper refresh for brands that need clearer positioning, stronger consistency, and a more intentional identity system.",
      accent: "#7c2d12",
      accentSoft: "#ffe2db",
      accentContrast: "#fff3f0",
      heroPattern: "spotlight",
      heroMood: "editorial",
      link: "/services/design/brand-discovery-and-refresh",
      thumbnail: "/images/brand-discovery-and-refresh-2.webp",
      price: "920",
      timeline: "1 to 2 weeks",
      bestFor:
        "Startups, consultants, coaches, small businesses, personal brands, service providers, and founders who need a modern landing page quickly without spending premium-launch money.",
      outcomes: [
        "Clearer brand direction and stronger positioning cues",
        "A more cohesive visual system across channels",
        "Reusable brand assets that support future growth",
      ],
      process: [
        "Run a discovery phase around brand goals and market perception",
        "Define the core visual direction and identity refresh path",
        "Package the updated assets and usage rules for rollout",
      ],
      deliverables: [
        "Brand discovery workshop",
        "Brand identity development",
        "Logo design",
        "Color palette creation",
        "Typography selection",
        "Brand guidelines document",
        "Social media profile design",
        "Email signature design",
        "Business card design",
        "Brand collateral templates",
        "Free on-board of brand identity on BiznesXpo",
      ],
      faqs: [
        {
          question: "Can this work if I already have a logo?",
          answer:
            "Yes. The refresh can evolve an existing identity rather than replacing everything from scratch.",
        },
        {
          question: "Do I get practical assets or just strategy?",
          answer:
            "You get both. The service combines discovery and actual deliverables your team can use in the business.",
        },
      ],
      ctaLabel: "Refresh my brand",
      ctaHref: "/contact",
    },
    {
      title: "Content & Marketing Package",
      description:
        "A content and marketing package that includes copywriting (with AI assistance), re-usable design templates, and strategy to help businesses create a cohesive and effective marketing presence.",
      summary:
        "A practical content system for businesses that need stronger messaging and reusable design assets for ongoing marketing output.",
      accent: "#7c3aed",
      accentSoft: "#efe2ff",
      accentContrast: "#f8f2ff",
      heroPattern: "mesh",
      heroMood: "bold",
      link: "/services/design/content-marketing-package",
      thumbnail: "/images/content-and-marketing-package.webp",
      price: ">=640",
      timeline: "5 to 10 business days",
      bestFor:
        "Startups, consultants, coaches, small businesses, personal brands, service providers, and founders who need a modern landing page quickly without spending premium-launch money.",
      outcomes: [
        "Clearer messaging across campaigns and content",
        "Reusable templates that reduce design bottlenecks",
        "A more consistent output rhythm for marketing execution",
      ],
      process: [
        "Review your current content gaps and marketing bottlenecks",
        "Create the message direction and reusable content assets",
        "Package the templates and strategy for regular publishing",
      ],
      deliverables: [
        "Copywriting (with AI assistance)",
        "Re-usable design templates",
        "Marketing strategy",
      ],
      faqs: [
        {
          question: "Is this mainly design or messaging?",
          answer:
            "It is both. The package is designed to improve what you say and how it looks so the system is usable in real campaigns.",
        },
        {
          question: "Will I be able to reuse the assets later?",
          answer:
            "Yes. Reusability is one of the core goals, so the package is structured for ongoing use rather than one-off delivery.",
        },
      ],
      ctaLabel: "Build my content system",
      ctaHref: "/contact",
    },
  ],
};

export const webDevelopmentSection: ServiceSectionData = {
  title: "Web Development Services",
  subtitle: "Development that ships clean, fast, and ready for real use.",
  description:
    "Bodilum builds focused digital products, landing pages, and business tools that are lightweight, maintainable, and designed around the action you need customers or staff to take.",
  media: "/images/design-4.webp",
  services: [
    {
      title: "AI-Assisted Starter Landing Page",
      description:
        "A fast, modern, AI-assisted landing page built with senior creative direction, clean design, secure modern tech, CMS editing, and a polished launch setup.",
      summary:
        "A conversion-focused launch page for founders who need something polished, credible, and fast without dragging into a long custom build cycle.",
      accent: "#1d4ed8",
      accentSoft: "#dfeaff",
      accentContrast: "#f3f7ff",
      heroPattern: "grid",
      heroMood: "technical",
      link: "/services/web-development/ai-assisted-starter-landing-page",
      thumbnail: "/images/landing-page-3.webp",
      price: "920",
      timeline: "7 to 14 days",
      bestFor:
        "Startups, consultants, coaches, small businesses, personal brands, service providers, and founders who need a modern landing page quickly without spending premium-launch money.",
      outcomes: [
        "A stronger first impression for paid and organic traffic",
        "A page built to turn attention into inquiries or leads",
        "A maintainable launch-ready setup your team can keep using",
      ],
      process: [
        "Clarify your offer, audience, and conversion goal",
        "Design and build the page with a clean production setup",
        "Launch with analytics, performance work, and handover support",
      ],
      deliverables: [
        "Brand and offer discovery",
        "Conversion-focused landing page structure",
        "Premium UI direction",
        "Responsive Next.js build",
        "CMS setup",
        "Contact/lead form",
        "Analytics and event tracking",
        "SEO metadata",
        "Deployment to Vercel/Netlify",
        "Speed/performance optimization",
        "7–14 day delivery",
        "Handover video",
        "14 days post-launch support",
        "Mobile-first design",
        "Copywriting cleanup",
        "WhatsApp CTA",
        "Lead form",
        "Google Maps/contact section",
        "Testimonials section",
        "Basic SEO",
        "Vercel or Netlify deployment",
        "Domain connection",
        "Analytics setup",
        "Optional branded documents",
      ],
      faqs: [
        {
          question: "Can this be edited after launch?",
          answer:
            "Yes. The setup includes CMS editing so content changes do not require a developer for every update.",
        },
        {
          question: "Is this only for startups?",
          answer:
            "No. It works well for consultants, service businesses, and personal brands that need a stronger digital front door.",
        },
      ],
      ctaLabel: "Launch my page",
      ctaHref: "/contact",
    },
    {
      title: "14-Day Premium Launch Page",
      description:
        "Awwwards-level landing pages for startups, apps, SaaS products, consultants, and premium service brands.This is for founders, consultants, startups, and service businesses that need a beautiful, credible, fast-loading website that helps them sell.",
      summary:
        "A premium launch page engagement for brands that need a stronger visual standard, sharper messaging, and a more ambitious web presence.",
      accent: "#0f172a",
      accentSoft: "#e2e8f0",
      accentContrast: "#f8fafc",
      heroPattern: "bands",
      heroMood: "bold",
      link: "/services/web-development/14-day-premium-launch-page",
      thumbnail: "/images/landing-page-5.webp",
      price: ">=1530",
      timeline: "14 days",
      bestFor:
        "Startups, apps, SaaS products, consultants, and premium service brands",
      outcomes: [
        "A more premium digital perception that supports pricing and trust",
        "A launch page with stronger creative direction and higher polish",
        "A faster, clearer path from visit to inquiry or demo request",
      ],
      process: [
        "Define the story, offer structure, and visual ambition",
        "Design a high-end interface and build the production experience",
        "Ship with performance, analytics, SEO, and launch readiness handled",
      ],
      deliverables: [
        "Brand and offer discovery",
        "Conversion-focused landing page structure",
        "Premium UI direction",
        "Responsive Next.js build",
        "CMS setup",
        "Contact/lead form",
        "Analytics and event tracking",
        "SEO metadata",
        "Deployment to Vercel/Netlify",
        "Speed/performance optimization",
        "7–14 day delivery",
        "Handover video",
        "14 days post-launch support",
      ],
      faqs: [
        {
          question: "What makes this premium compared to the starter page?",
          answer:
            "It carries more visual ambition, more refined storytelling, and a higher level of production polish for brands where perception matters heavily.",
        },
        {
          question: "Is this suitable for product launches?",
          answer:
            "Yes. It is well suited for SaaS launches, premium offers, consultants, and brands that need a strong market-facing reveal.",
        },
      ],
      ctaLabel: "Plan the premium launch",
      ctaHref: "/contact",
    },
    {
      title: "Prototype-to-Production Engineering Sprint",
      description:
        "For founders with AI-built or vibe-coded apps who need senior engineers to make the product stable, secure, scalable, and launch-ready. This is a 14-day sprint where we audit your codebase, identify and fix critical issues, and get your product ready for real users.",
      summary:
        "A stabilization sprint for promising products that need senior engineering scrutiny before real customers hit the system.",
      accent: "#374151",
      accentSoft: "#e5e7eb",
      accentContrast: "#f9fafb",
      heroPattern: "grid",
      heroMood: "technical",
      link: "/services/web-development/prototype-to-production-engineering-sprint",
      thumbnail: "/images/ai-integrations-2.webp",
      price: ">=460",
      timeline: "7 to 14 days",
      bestFor:
        "Startups, apps, SaaS products, consultants, and premium service brands that need to get a product out the door quickly without sacrificing code quality or security.",
      outcomes: [
        "A clearer picture of production risk before launch",
        "Critical issues identified and prioritized by impact",
        "A more stable base for shipping to real users with confidence",
      ],
      process: [
        "Audit the codebase, architecture, and operational weak points",
        "Fix the highest-risk issues affecting launch readiness",
        "Deliver a roadmap for the next stabilization or scale phase",
      ],
      deliverables: [
        "Codebase audit report",
        "Risk list",
        "Production-readiness score",
        "Fix roadmap",
        "Launch estimate",
        "Recommended next sprint",
      ],
      faqs: [
        {
          question: "Do you only audit, or do you also fix issues?",
          answer:
            "The sprint is designed to do both. It identifies the highest-risk problems and addresses the most important ones within the engagement scope.",
        },
        {
          question: "Is this useful for AI-generated or vibe-coded apps?",
          answer:
            "Yes. That is one of the core use cases, especially when a product moves from prototype momentum into real production expectations.",
        },
      ],
      ctaLabel: "Audit my product",
      ctaHref: "/contact",
    },
  ],
};

export const allServiceSections: ServiceSectionData[] = [
  aiIntegrationsSection,
  designSection,
  webDevelopmentSection,
];

export function getServiceByLink(link: string) {
  return allServiceSections
    .flatMap((section) => section.services)
    .find((service) => service.link === link);
}

export function formatServicePrice(price?: string) {
  if (!price) {
    return undefined;
  }

  const isStartingAt = price.startsWith(">=");
  const numericPart = price.replace(">=", "").trim();
  const formattedPrice = /^\d+(\.\d+)?$/.test(numericPart)
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(Number(numericPart))
    : numericPart;

  return isStartingAt ? `Starting at ${formattedPrice}` : formattedPrice;
}