export type DesignDirectionDetailsType = {
  cover: Record<string, any>;
}
export type DesignDirectionOfferType = {
    name: string;
    title: string;
    timeline: string;
    price: string;
    description: string;
    coverImg: string;
    businessOutcomes: string[];
    deliverables: string[];
    notIncluded: string[];
    idealUseCases: string[];
    revisionPolicy: string;
    clientNeedsToProvide: string[];
    pricingOptions?: Record<string, any>[];
    singleDesignGallery?: number[];
    techStack?: string[];
    bestFor: string;
}
export type DesignDirectionDataType = {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnails: string[];
  layout?: string;
  price?: string;
  timeline?: string;
  bestFor?: string;
  faqs?: { question: string; answer: string }[];
  sections?: DesignDirectionDetailsType;
  offers?: DesignDirectionOfferType[];
  media?: string[];
};


const techSaasFleoxxMedia: string[] = [
  "/images/tech-saas-fleoxx/fleoxx-2560-1440-v1.webp",
  "/images/tech-saas-fleoxx/fleoxx-2560-1440-v2.webp",
  ...Array.from(
    { length: 59 },
    (_, i) => `/images/tech-saas-fleoxx/fleoxx-img-${i + 1}.webp`
  ),
];

const realEstateMormonMedia: string[] = [
  "/images/real-estate-mormon/mormon-2560-1440.webp",
  ...Array.from(
    { length: 61 },
    (_, i) => `/images/real-estate-mormon/mormon-img-${i + 1}.webp`
  ),
];

const beautyYossiMedia: string[] = [
  "/images/beauty-yossi/yossi-2560-1440.webp",
  ...Array.from(
    { length: 34 },
    (_, i) => `/images/beauty-yossi/yossi-img-${i + 1}.webp`
  ),
  "/images/beauty-yossi/yossi-logo-1.webp",
];

const techSaasMoveasiMedia: string[] = [
  ...Array.from(
    { length: 52 },
    (_, i) => `/images/tech-saas-moveasi/moveasi-img-${i + 1}.webp`
  ),
];

const beautyMoriaMedia: string[] = [
  ...Array.from(
    { length: 40 },
    (_, i) => `/images/beauty-moria/moria-img-${i + 1}.webp`
  ),
  "/images/beauty-moria/mori-logo-bg-1.webp",
  "/images/beauty-moria/mori-logo-bg-2.webp",
  "/images/beauty-moria/mori-logo-bg-3.webp",
];

const realEstateSavanahNestMedia: string[] = [
  "/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp",
  ...Array.from(
    { length: 24 },
    (_, i) => `/images/real-estate-savanah-nest/savanah-nest-img-${i + 1}.webp`
  ),
];

type DesignDirectionMediaConfig = {
  mainImgIndex: number;
  thumbnailIndices: number[];
  previewIndices: number[];
  singleDesignGallery: number[];
};

const DIRECTION_MEDIA_CONFIGS: Record<number, DesignDirectionMediaConfig> = {
  1: {
    mainImgIndex: 0,
    thumbnailIndices: [8, 9, 10, 11, 12],
    previewIndices: Array.from({ length: 24 }, (_, index) => index + 1),
    singleDesignGallery: Array.from({ length: 24 }, (_, index) => index + 1),
  },
  2: {
    mainImgIndex: 40,
    thumbnailIndices: [40, 0, 1, 2, 3, 4, 5, 6, 7],
    previewIndices: [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    singleDesignGallery: [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  },
  3: {
    mainImgIndex: 0,
    thumbnailIndices: [3, 1, 5, 4, 6, 7, 8, 9, 10, 11, 12],
    previewIndices: [1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    singleDesignGallery: [1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  },
  4: {
    mainImgIndex: 0,
    thumbnailIndices: [3, 1, 2, 0, 4, 5, 6, 7, 8, 9, 10, 11],
    previewIndices: [0, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    singleDesignGallery: [0, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  },
  5: {
    mainImgIndex: 0,
    thumbnailIndices: [22, 2, 3, 1, 5, 6, 7, 8, 9, 10, 11, 12],
    previewIndices: [1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    singleDesignGallery: [1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  },
  6: {
    mainImgIndex: 0,
    thumbnailIndices: [2, 14, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    previewIndices: [2, 3, 4, 5, 6, 7, 8, 9, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    singleDesignGallery: [2, 3, 4, 5, 6, 7, 8, 9, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  },
};

function pickMediaItem(media: string[], index: number, fallback?: string) {
  return media[index] ?? fallback ?? "";
}

function pickMediaItems(media: string[], indices: number[], fallback: string[] = []) {
  const selectedMedia = indices
    .map((index) => media[index])
    .filter((item): item is string => typeof item === "string" && item.length > 0);

  return selectedMedia.length ? selectedMedia : fallback;
}

function attachDirectionMedia(direction: DesignDirectionDataType): DesignDirectionDataType {
  const media = direction.media ?? [];
  const mediaConfig = DIRECTION_MEDIA_CONFIGS[direction.id];

  if (!media.length || !mediaConfig) {
    return {
      ...direction,
      offers: direction.offers?.length ? direction.offers : [...designDirectionOffers],
    };
  }

  const mainImg = pickMediaItem(
    media,
    mediaConfig.mainImgIndex,
    typeof direction.sections?.cover?.mainImg === "string" ? direction.sections.cover.mainImg : direction.thumbnails[0],
  );
  const previewImgs = pickMediaItems(media, mediaConfig.previewIndices, direction.sections?.cover?.previewImgs ?? []);
  const thumbnails = pickMediaItems(media, mediaConfig.thumbnailIndices, direction.thumbnails);
  const directionOfferImages = previewImgs.length ? previewImgs : thumbnails;
  const offers = (direction.offers?.length ? direction.offers : designDirectionOffers).map((offer, index) => ({
    ...offer,
    singleDesignGallery:
      offer.name === "single-design-customisation"
        ? mediaConfig.singleDesignGallery
        : offer.singleDesignGallery,
    coverImg:
      directionOfferImages[index % directionOfferImages.length] ??
      thumbnails[index % thumbnails.length] ??
      mainImg ??
      offer.coverImg,
  }));

  return {
    ...direction,
    thumbnails,
    sections: {
      ...(direction.sections ?? { cover: {} }),
      cover: {
        ...(direction.sections?.cover ?? {}),
        mainImg,
        previewImgs,
      },
    },
    offers,
  };
}

function buildDirectionOffers(directionId: number): DesignDirectionOfferType[] {
  const mediaConfig = DIRECTION_MEDIA_CONFIGS[directionId];

  return designDirectionOffers.map((offer) => ({
    ...offer,
    singleDesignGallery:
      offer.name === "single-design-customisation"
        ? mediaConfig?.singleDesignGallery ?? offer.singleDesignGallery
        : offer.singleDesignGallery,
  }));
}


export const designDirectionOffers: DesignDirectionOfferType[] = [
    {
        name: "single-design-customisation",
        title: "Customise Single Design",
        timeline: "24 - 48 hours",
        price: "100",
        description: "Choose one pre-made Bodilum design direction and we’ll customise it for your business within 24–48 hours. This is ideal if you need a premium-looking visual asset quickly without going through a full brand identity or strategy process. We’ll adapt the selected design with your business name, colours, text, images, contact details, and basic brand styling so it feels specific to your business and ready to use.",
        coverImg: "/images/real-estate-savanah-nest/savanah-nest-img-1.webp",
        businessOutcomes: [
            "Get a polished, premium-looking design without starting from scratch",
            "Launch or promote your business faster with a ready-to-use customised asset",
            "Improve how your brand appears on social media, WhatsApp, websites, or client presentations",
            "Test a design direction before investing in a full brand identity or launch kit",
            "Save time by choosing from an existing professional design instead of briefing a designer from zero"
        ],

        deliverables: [
            "Customisation of one selected pre-made design",
            "Your business name, headline, copy, colours, images, and contact details added",
            "Basic visual refinement to make the design feel aligned with your business",
            "One final exported design file ready for digital use",
            "Delivery in high-quality PNG/JPG/WebP format",
            "One minor revision round for text, colour, or image adjustments"
        ],

        bestFor: "Small businesses, real estate agents, interior designers, consultants, coaches, restaurants, beauty brands, churches, event brands, and founders who need one beautiful design customised quickly.",

        notIncluded: [
            "New logo design",
            "Full brand identity system",
            "Brand discovery or strategy",
            "Multiple design concepts",
            "Website development",
            "Print production setup",
            "Advanced copywriting",
            "Multiple revision rounds"
        ],

        idealUseCases: [
            "Social media promo design",
            "WhatsApp flyer or status design",
            "Real estate listing promo",
            "Interior design service promo",
            "Event announcement",
            "Business launch announcement",
            "Single campaign visual",
            "Website hero/banner graphic",
            "Service offer graphic"
        ],

        revisionPolicy: "Includes one minor revision round. Minor revisions cover text changes, image swaps, colour tweaks, and small layout adjustments. A full redesign or changing to a different design direction is billed as a new design customisation.",

        clientNeedsToProvide: [
            "Business name",
            "Selected design direction/template",
            "Exact text or offer details to include",
            "Logo, if available",
            "Brand colours, if available",
            "Images, if required",
            "Phone number, website, email, or social media handle"
        ],

        },
        {
          name: "brand-core-sprint",
            title: "Brand Core Sprint",
            timeline: "7 - 10 days",
            price: "750",
            description: "A focused brand foundation sprint for businesses that need clarity, direction, and a premium visual starting point before investing in full brand identity, applications, or website design. We help define the emotional centre of the brand, its personality, visual direction, colour system, typography direction, and logo direction using one selected pre-made Bodilum design category as the creative starting point.",

            coverImg: "/images/offers/brand-core-sprint.webp",

            businessOutcomes: [
            "Clarify what your brand should feel like, look like, and communicate",
            "Create a premium visual direction before investing in full brand identity",
            "Avoid random design decisions by building from a clear brand foundation",
            "Get a stronger brand presence for pitches, social media, sales, and marketing",
            "Move faster by starting from a curated Bodilum design direction instead of a blank page"
            ],

            deliverables: [
            "Brand discovery direction",
            "Brand emotional centre",
            "Brand soul and personality direction",
            "What the brand is and what the brand is not",
            "What the brand should feel like, look like, and sound like",
            "Brand metaphors and creative references",
            "Logo direction or refinement recommendation",
            "Primary colour palette",
            "Secondary/accent colour palette",
            "Typography direction",
            "Visual moodboard or design direction board",
            "Mini brand direction PDF",
            "One revision round"
            ],

            bestFor: "Founders, consultants, real estate businesses, interior designers, beauty brands, coaches, churches, service businesses, and startups that need a clear brand direction before creating brand assets, presentations, or a website.",

            notIncluded: [
            "Full logo design system",
            "Complete brand guideline document",
            "Business cards, invoices, letterheads, or brand applications",
            "Social media design set",
            "Website design or development",
            "Corporate presentation design",
            "Print-ready production files",
            "Multiple brand concepts"
            ],

            idealUseCases: [
            "New business launch",
            "Brand refresh",
            "Preparing for a website redesign",
            "Preparing for investor or client presentation",
            "Cleaning up a confusing visual identity",
            "Choosing a premium design direction before expansion"
            ],

            revisionPolicy: "Includes one revision round focused on refinement of direction, colours, typography, and brand expression. A completely new creative direction or a second brand concept is billed separately.",

            clientNeedsToProvide: [
            "Business name",
            "Short business description",
            "Target audience",
            "Current logo, if available",
            "Existing brand colours, if available",
            "Selected Bodilum design direction or category",
            "Competitors or reference brands",
            "Any existing website, social page, or company profile"
            ]
        },

        {
      name: "brand-applications",
            title: "Brand Applications",
            timeline: "5 - 7 days",
            price: "600",
            description: "A practical brand application package that turns your existing or newly created brand direction into usable business materials. This package gives you the everyday branded assets you need to look professional across client communication, sales, proposals, invoices, and basic social media presence.",

            coverImg: "/images/offers/brand-applications.webp",

            businessOutcomes: [
            "Make your brand look consistent across everyday business touchpoints",
            "Improve trust when sending invoices, proposals, letters, or documents",
            "Give your business a more professional and established appearance",
            "Create ready-to-use branded assets without doing a full campaign",
            "Prepare your brand for client communication, social media, and sales activity"
            ],

            deliverables: [
            "Business card design",
            "Invoice design",
            "Letterhead design",
            "3 social media base designs",
            "Email signature design",
            "Basic document styling direction",
            "Digital export files for each asset",
            "Editable source files where applicable",
            "One revision round"
            ],

            bestFor: "Businesses that already have a logo or Brand Core Sprint completed and now need practical brand assets for day-to-day business use.",

            notIncluded: [
            "New logo design",
            "Full brand strategy",
            "Full brand guideline document",
            "Website design",
            "Large social media campaign sets",
            "Print production management",
            "Copywriting for all documents",
            "Advanced document automation"
            ],

            idealUseCases: [
            "New business setup",
            "Post-brand-refresh rollout",
            "Professionalising client-facing documents",
            "Preparing for outreach and sales",
            "Creating consistent visual assets for internal and external use"
            ],

            revisionPolicy: "Includes one minor revision round covering text, layout, colour, or image adjustments. Additional applications or major redesigns are billed separately.",

            clientNeedsToProvide: [
            "Logo files",
            "Brand colours",
            "Business contact details",
            "Social media handles",
            "Invoice information",
            "Business registration/VAT details, if required",
            "Preferred document wording",
            "Any existing brand files"
            ],

        },

        {
      name: "social-media-sets",
            title: "Social Media Sets",
            timeline: "3 - 10 days",
            price: "300",
            description: "A premium set of branded social media designs created from your selected design direction or existing brand identity. Choose a set of 6, 12, or 24 designs depending on how much content you need for launch, promotion, campaign activity, or ongoing brand visibility.",

            coverImg: "/images/offers/social-media-sets.webp",

            pricingOptions: [
            {
                title: "Set of 6",
                price: "300",
                timeline: "3 - 4 days"
            },
            {
                title: "Set of 12",
                price: "550",
                timeline: "5 - 7 days"
            },
            {
                title: "Set of 24",
                price: "950",
                timeline: "7 - 10 days"
            }
            ],

            businessOutcomes: [
            "Show up online with a consistent and premium brand presence",
            "Launch campaigns faster with ready-made branded social assets",
            "Improve trust and recognition across Instagram, Facebook, LinkedIn, and WhatsApp",
            "Reduce the stress of designing content from scratch every week",
            "Create a visual content system that can be reused and expanded"
            ],

            deliverables: [
            "Branded social media design set",
            "Square post format",
            "Story/status format where applicable",
            "Campaign or content structure recommendation",
            "Designs adapted to your colours, fonts, images, and message",
            "High-quality PNG/JPG/WebP exports",
            "One revision round"
            ],

            bestFor: "Small businesses, personal brands, coaches, consultants, churches, real estate agents, interior designers, restaurants, beauty brands, and startups that need premium branded content for social media.",

            notIncluded: [
            "Daily content management",
            "Social media posting",
            "Caption writing for every post",
            "Ad management",
            "Video editing",
            "Photography",
            "Influencer marketing",
            "Community management"
            ],

            idealUseCases: [
            "Launch campaign",
            "New offer announcement",
            "Product or service promotion",
            "Real estate listings",
            "Church event promotion",
            "Beauty or fashion campaign",
            "Restaurant menu promotion",
            "Consultant or coach content series",
            "Personal brand authority posts"
            ],

            revisionPolicy: "Includes one revision round per set. Minor revisions include text changes, image swaps, colour tweaks, and small layout adjustments. A new content direction or full redesign is billed separately.",

            clientNeedsToProvide: [
            "Brand/logo files",
            "Content or rough post ideas",
            "Images, if required",
            "Offer or campaign details",
            "Social media handles",
            "Preferred platform",
            "Selected design direction or references"
            ]
        },

        {
      name: "print-media-sets",
            title: "Print Media Sets",
            timeline: "7 - 14 days",
            price: "900",
            description: "A print-focused design package for businesses that need professional branded materials for physical marketing, events, retail spaces, activations, conferences, signage, or outdoor visibility. We create a cohesive set of print-ready designs that carry your brand across multiple physical touchpoints.",

            coverImg: "/images/offers/print-media-sets.webp",

            businessOutcomes: [
            "Make your brand visible and memorable in physical spaces",
            "Create a consistent look across signage, banners, flyers, posters, and merchandise",
            "Prepare professionally designed materials for events, launches, and promotions",
            "Improve perceived business quality through premium print design",
            "Avoid disconnected one-off print materials that weaken your brand"
            ],

            deliverables: [
            "Flyer design",
            "Poster design",
            "Indoor signage concept",
            "Outdoor signage concept",
            "Conference or pull-up banner design",
            "Billboard or large-format ad concept",
            "T-shirt or merchandise design concept",
            "Print-ready PDF exports where applicable",
            "Digital preview mockups",
            "One revision round"
            ],

            bestFor: "Retail businesses, real estate brands, churches, event organisers, conferences, restaurants, fashion brands, beauty brands, schools, property developers, and companies preparing for physical activations.",

            notIncluded: [
            "Printing costs",
            "Supplier management",
            "Installation",
            "Photography",
            "Copywriting for full campaign",
            "Full brand identity design",
            "Packaging design",
            "Multiple campaign concepts"
            ],

            idealUseCases: [
            "Store launch",
            "Property launch",
            "Church conference",
            "Business expo",
            "Restaurant opening",
            "Product launch",
            "Outdoor campaign",
            "Retail promotion",
            "Event branding",
            "Merchandise rollout"
            ],

            revisionPolicy: "Includes one revision round covering layout, copy, colour, image, and sizing adjustments. Major campaign direction changes or additional print formats are billed separately.",

            clientNeedsToProvide: [
            "Logo and brand files",
            "Exact print sizes, if known",
            "Printer specifications, if available",
            "Campaign message",
            "Images or product photos",
            "Contact information",
            "Event or campaign dates",
            "Any legal or compliance text required"
            ],
        },

        {
      name: "full-brand-identity",
            title: "Full Brand Identity",
            timeline: "14 - 21 days",
            price: "2500",
            description: "A complete premium brand identity system for businesses that need to look established, memorable, and ready for serious growth. This package goes beyond a logo by creating a full visual identity system including strategy direction, logo system, colours, typography, visual language, brand applications, and brand guidelines. Website design and development are not included.",

            coverImg: "/images/offers/full-brand-identity.webp",

            businessOutcomes: [
            "Build a complete brand identity that looks professional and premium",
            "Create consistency across digital, print, social, sales, and client-facing materials",
            "Improve trust, recognition, and perceived value",
            "Give your business a strong foundation for marketing, sales, and future growth",
            "Move from scattered visuals to a clear, intentional brand system"
            ],

            deliverables: [
            "Brand discovery and creative direction",
            "Brand personality and emotional direction",
            "Logo design system",
            "Primary logo",
            "Secondary logo or lockup",
            "Icon or brand mark",
            "Colour palette",
            "Typography system",
            "Visual language direction",
            "Image style direction",
            "Basic layout system",
            "Business card design",
            "Letterhead design",
            "Invoice or quote template design",
            "Social media profile graphics",
            "3 social media base designs",
            "Mini brand guideline document",
            "Exported logo files",
            "Digital-ready brand assets",
            "Two revision rounds"
            ],

            bestFor: "Startups, growing businesses, property brands, interior design studios, beauty brands, professional services, churches, personal brands, consultants, and companies that need a complete identity system before launching or scaling.",

            notIncluded: [
            "Website design or development",
            "Corporate presentation",
            "Full social media content calendar",
            "Print production",
            "Packaging design",
            "Photography",
            "Video production",
            "Advanced brand strategy workshop",
            "Legal trademark registration"
            ],

            idealUseCases: [
            "Launching a new company",
            "Rebranding an existing company",
            "Preparing for premium clients",
            "Preparing for investor conversations",
            "Improving perceived business value",
            "Creating a consistent identity before marketing"
            ],

            revisionPolicy: "Includes two revision rounds. Revisions cover refinement of the chosen direction. A completely new logo direction or brand concept after approval is billed separately.",

            clientNeedsToProvide: [
            "Business name",
            "Business description",
            "Target audience",
            "Competitors",
            "Existing logo or brand files, if available",
            "Design references",
            "Brand likes and dislikes",
            "Business contact details",
            "Any required brand wording"
            ]
        },

        {
      name: "premium-web",
            title: "Premium Web",
            timeline: "21 - 30 days",
            price: "3500",
            description: "A premium 5-page website designed and developed to feel modern, polished, animated, and high-end. This is for businesses that want more than a basic website — they want a memorable digital experience with strong visual direction, smooth interactions, premium layout, responsive design, and performance-conscious development. Brand identity is not included unless added separately.",

            coverImg: "/images/offers/premium-web.webp",

            businessOutcomes: [
            "Launch a premium website that makes your business look more established",
            "Increase trust with a polished, modern digital presence",
            "Present your services, story, work, and offer more clearly",
            "Create a website experience that feels better than standard template sites",
            "Give your business a stronger destination for ads, outreach, and sales"
            ],

            deliverables: [
            "5-page premium website",
            "Homepage",
            "About page",
            "Services or offers page",
            "Work/case studies or design direction page",
            "Contact or request service page",
            "Custom UI/UX design",
            "Responsive desktop, tablet, and mobile layouts",
            "Premium visual direction",
            "Modern frontend development",
            "Smooth animations and interactions",
            "Basic SEO setup",
            "Contact/request form integration",
            "Deployment setup",
            "Performance-conscious build",
            "Two revision rounds"
            ],

            bestFor: "Premium service businesses, design-led brands, real estate businesses, interior design studios, consultants, agencies, coaches, churches, startups, and companies that need a high-quality website to support sales and trust.",

            notIncluded: [
            "Full brand identity",
            "Advanced backend system",
            "Custom dashboard",
            "E-commerce system",
            "Copywriting from scratch",
            "Photography",
            "Ongoing maintenance",
            "Paid ads setup",
            "Complex 3D production",
            "Large CMS architecture"
            ],

            idealUseCases: [
            "Premium business website",
            "Agency website",
            "Real estate brand website",
            "Interior design studio website",
            "Consultant website",
            "Startup launch website",
            "Service business website",
            "Campaign landing website"
            ],

            revisionPolicy: "Includes two revision rounds across design and implementation. Major changes to approved structure, page count, or creative direction may require additional billing.",

            clientNeedsToProvide: [
            "Logo and brand files",
            "Website copy or rough content",
            "Images or visual assets",
            "Page list",
            "Service details",
            "Contact information",
            "Domain access",
            "Hosting or deployment preference",
            "Reference websites"
            ],

            techStack: [
            "Next.js",
            "React",
            "Tailwind CSS or equivalent styling system",
            "Framer Motion or GSAP for animation where appropriate",
            "Vercel or Netlify deployment",
            "Optional CMS integration"
            ]
        },

        {
      name: "corporate-presentation",
            title: "Corporate Presentation",
            timeline: "7 - 14 days",
            price: "1200",
            description: "A premium PowerPoint or corporate profile presentation designed to help your business look credible, polished, and ready for investors, partners, clients, internal teams, or sales conversations. We turn your content into a strong visual narrative with clean structure, premium layouts, branded slides, and presentation-ready exports.",

            coverImg: "/images/offers/corporate-presentation.webp",

            businessOutcomes: [
            "Present your business with more confidence and credibility",
            "Improve how investors, partners, and clients understand your company",
            "Make complex information easier to follow and more visually engaging",
            "Create a polished sales or company profile document",
            "Strengthen your brand perception in meetings, pitches, and proposals"
            ],

            deliverables: [
            "Premium corporate presentation design",
            "Up to 15 slides",
            "Cover slide",
            "Company overview slide",
            "Problem/opportunity slide",
            "Solution/services slide",
            "Process or methodology slide",
            "Market or audience slide",
            "Team slide",
            "Case study or portfolio slide",
            "Pricing or package slide",
            "Contact/closing slide",
            "Branded layout system",
            "Icons, diagrams, and visual hierarchy where needed",
            "Editable PowerPoint file",
            "PDF export",
            "One revision round"
            ],

            bestFor: "Companies, startups, consultants, real estate brands, agencies, service providers, churches, schools, NGOs, and founders who need a premium presentation for clients, investors, partners, or internal use.",

            notIncluded: [
            "Full brand identity",
            "Website design",
            "Advanced financial modelling",
            "Investor pitch strategy",
            "Market research",
            "Long-form copywriting from scratch",
            "Video presentation",
            "Animation-heavy deck production"
            ],

            idealUseCases: [
            "Company profile",
            "Sales presentation",
            "Investor intro deck",
            "Service proposal deck",
            "Partnership presentation",
            "Church/ministry profile",
            "Real estate development presentation",
            "Internal business presentation"
            ],

            revisionPolicy: "Includes one revision round covering content placement, layout, visuals, and brand refinement. Major content restructuring or additional slides are billed separately.",

            clientNeedsToProvide: [
            "Logo and brand files",
            "Presentation content or rough outline",
            "Business description",
            "Target audience for the deck",
            "Images, charts, or data",
            "Existing company profile, if available",
            "Preferred slide size",
            "Reference decks, if available"
            ],
        },

        {
      name: "full-brand-identity-corporate-presentation",
            title: "Full Brand Identity + Corporate Presentation",
            timeline: "21 - 30 days",
            price: "3500",
            description: "A combined brand and presentation package for businesses that need to look premium, credible, and ready to pitch. We create the full brand identity system first, then apply it to a professional corporate presentation or company profile so your business is ready for sales meetings, investors, partners, and client conversations.",

            coverImg: "/images/offers/brand-identity-presentation.webp",

            businessOutcomes: [
            "Create a complete premium brand identity and a polished business presentation",
            "Improve trust before sales, investor, or partnership conversations",
            "Make your business look more established and ready for serious opportunities",
            "Ensure your presentation feels consistent with your new brand identity",
            "Launch with both brand clarity and a strong communication tool"
            ],

            deliverables: [
            "Everything in Full Brand Identity",
            "Brand discovery and creative direction",
            "Logo system",
            "Colour and typography system",
            "Visual language direction",
            "Brand applications",
            "Mini brand guideline document",
            "Premium corporate presentation",
            "Up to 15 slides",
            "Editable PowerPoint file",
            "PDF export",
            "Two revision rounds"
            ],

            bestFor: "Founders, startups, consultants, property businesses, professional service firms, churches, NGOs, and companies preparing to pitch, sell, raise, launch, or reposition.",

            notIncluded: [
            "Website design or development",
            "Advanced pitch strategy",
            "Financial model",
            "Copywriting from scratch",
            "Paid advertising",
            "Print production",
            "Photography",
            "Video production"
            ],

            idealUseCases: [
            "Investor preparation",
            "Business relaunch",
            "New company launch",
            "Sales presentation preparation",
            "Partnership outreach",
            "Corporate profile redesign",
            "Premium brand repositioning"
            ],

            revisionPolicy: "Includes two revision rounds across brand identity and presentation design. Major changes to approved brand direction or deck structure may require additional billing.",

            clientNeedsToProvide: [
            "Business name",
            "Business description",
            "Target audience",
            "Presentation purpose",
            "Existing brand files, if available",
            "Deck content or outline",
            "Images, charts, or data",
            "Competitors or reference brands",
            "Contact details"
            ]
        },

        {
      name: "full-brand-identity-corporate-presentation-website",
            title: "Full Brand Identity + Corporate Presentation + Website",
            timeline: "30 - 45 days",
            price: "6500",
            description: "A complete premium launch system for businesses that need a full identity, a strong presentation, and a premium website. This package gives your business the key assets needed to look credible, communicate clearly, and convert interest into trust across meetings, outreach, ads, and online presence.",

            coverImg: "/images/offers/full-brand-launch-system.webp",

            businessOutcomes: [
            "Launch or relaunch with a complete premium brand presence",
            "Create a consistent identity across brand, presentation, and website",
            "Improve trust with investors, clients, partners, and prospects",
            "Avoid the fragmented look that comes from designing assets separately",
            "Give your business a premium foundation for marketing and sales"
            ],

            deliverables: [
            "Everything in Full Brand Identity",
            "Complete visual identity system",
            "Logo system",
            "Colour palette",
            "Typography system",
            "Brand applications",
            "Mini brand guideline document",
            "Premium corporate presentation",
            "Up to 15 slides",
            "Editable PowerPoint file",
            "PDF export",
            "Premium 5-page website",
            "Custom UI/UX design",
            "Responsive frontend development",
            "Animations and interactions",
            "Contact/request form integration",
            "Deployment setup",
            "Basic SEO setup",
            "Two revision rounds"
            ],

            bestFor: "Businesses launching, relaunching, raising funds, entering a new market, repositioning, or preparing to attract premium clients with a complete brand and digital presence.",

            notIncluded: [
            "Advanced backend platform",
            "E-commerce system",
            "Large CMS architecture",
            "Paid ads setup",
            "Social media management",
            "Printing costs",
            "Photography",
            "Video production",
            "Legal trademark registration",
            "Ongoing maintenance after launch"
            ],

            idealUseCases: [
            "Premium business launch",
            "Startup launch",
            "Real estate company launch",
            "Interior design studio launch",
            "Consulting firm launch",
            "Agency relaunch",
            "Investor readiness",
            "Market repositioning",
            "High-ticket service business launch"
            ],

            revisionPolicy: "Includes two revision rounds across brand, presentation, and website. Structural changes after approval, additional pages, or new creative directions are billed separately.",

            clientNeedsToProvide: [
            "Business name",
            "Business description",
            "Target audience",
            "Website page requirements",
            "Presentation content or outline",
            "Images and media assets",
            "Competitor or reference links",
            "Domain access",
            "Hosting/deployment preference",
            "Contact details",
            "Any existing brand materials"
            ],

            techStack: [
            "Next.js",
            "React",
            "Tailwind CSS or equivalent styling system",
            "Framer Motion or GSAP where appropriate",
            "Vercel or Netlify deployment",
            "Optional CMS integration"
            ]
        },
      ];

const baseDesignDirectionData: DesignDirectionDataType[] = [
    {
      id: 1,
      title: 'savanah nest brand identity direction',
      description: "A calm, premium real estate brand direction built around warm living, natural elegance, and high-trust property presentation. Savanah Nest is ideal for developers, estate agencies, interior studios, architects, short-stay brands, and property consultants who want their brand to feel established, peaceful, and desirable. The direction uses spacious layouts, refined typography, soft earthy tones, and lifestyle-led property visuals to help buyers imagine comfort, security, and long-term value.",
      category: 'Real Estate',
      layout: 'layout-5',
      price: "100",
      timeline: "24 - 48 hours",
      bestFor: "Real Estate, Interior Design, Architecture",

      media: realEstateSavanahNestMedia,

      thumbnails: [
        '/images/real-estate-savanah-nest/savanah-nest-img-8.webp',
        '/images/real-estate-savanah-nest/savanah-nest-img-9.webp',
        '/images/real-estate-savanah-nest/savanah-nest-img-10.webp',
        '/images/real-estate-savanah-nest/savanah-nest-img-11.webp',
        '/images/real-estate-savanah-nest/savanah-nest-img-12.webp',
      ],

      sections: {
        cover: {
          mainImg: '/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp',
          previewImgs: [
            '/images/real-estate-savanah-nest/savanah-nest-img-1.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-2.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-3.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-4.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-5.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-6.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-7.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-8.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-9.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-10.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-11.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-12.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-13.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-14.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-15.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-16.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-17.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-18.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-19.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-20.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-21.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-22.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-23.webp',
            '/images/real-estate-savanah-nest/savanah-nest-img-24.webp'
          ],
          overview: [
            "This direction gives a real estate or architecture brand a calm, premium and nature-led identity that feels trustworthy from first glance. It is built for property developers, estate agencies, interior studios or boutique accommodation brands that want to sell space as lifestyle, not just square metres.",
            "The visual language combines warm neutrals, spacious layouts, refined typography and strong property imagery so the brand feels established, expensive and easy to believe in. It can work for luxury residential developments, rental apartments, short-stay homes, property investment offers or architectural concept presentations.",
            "When customised, the direction can carry your business name, colours, copy, property photography, location details and key selling points across the logo treatment, social posts, brochure-style layouts, web sections and presentation assets.",
            "Choose this direction if you want your brand to communicate comfort, security, modern living and high-value property without looking loud or overly corporate."
          ],
          highlights: [
            'Brand Identity Design',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          process: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          outcomes: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Customised Social media assets',
            'Customised Print media assets',
            'Customised Premium Website Design (5 pages | Design only)',
            'Simple Brand Style Guide',
            'Customised Presentation Templates ( PowerPoint, Keynote (Extra cost) )',
            'Customised Premium Website Development ( 5 pages | Design + Development (Extra cost) )'
          ]
        }
      },
      offers: buildDirectionOffers(1)
    },
    {
      id: 2,
      title: 'moria beauty brand identity direction',
      description: "A soft, refined beauty and wellness brand direction created for skincare, spa, salon, cosmetics, and personal care businesses that want to look premium without feeling cold or corporate. Moria combines graceful typography, gentle spacing, polished product presentation, and a calm editorial mood to make the brand feel trustworthy, feminine, clean, and emotionally appealing. It is especially useful for brands that sell care, confidence, self-worth, and everyday beauty rituals.",
      category: 'Beauty',
      price: "100",
      timeline: "24 - 48 hours",
      bestFor: "Beauty, Skincare, Wellness",
      media: beautyMoriaMedia,
      thumbnails: [
        '/images/beauty-moria/mori-logo-bg-1.webp',
        '/images/beauty-moria/moria-img-1.webp',
        '/images/beauty-moria/moria-img-2.webp',
        '/images/beauty-moria/moria-img-3.webp',
        '/images/beauty-moria/moria-img-4.webp',
        '/images/beauty-moria/moria-img-5.webp',
        '/images/beauty-moria/moria-img-6.webp',
        '/images/beauty-moria/moria-img-7.webp',
        '/images/beauty-moria/moria-img-8.webp',
      ],
      sections: {
        cover: {
          mainImg: '/images/beauty-moria/mori-logo-bg-1.webp',
          previewImgs: [
            '/images/beauty-moria/moria-img-2.webp',
            '/images/beauty-moria/moria-img-3.webp',
            '/images/beauty-moria/moria-img-4.webp',
            '/images/beauty-moria/moria-img-5.webp',
            '/images/beauty-moria/moria-img-6.webp',
            '/images/beauty-moria/moria-img-7.webp',
            '/images/beauty-moria/moria-img-8.webp',
            '/images/beauty-moria/moria-img-2.webp',
            '/images/beauty-moria/moria-img-3.webp',
            '/images/beauty-moria/moria-img-4.webp',
            '/images/beauty-moria/moria-img-5.webp',
            '/images/beauty-moria/moria-img-6.webp',
            '/images/beauty-moria/moria-img-7.webp',
            '/images/beauty-moria/moria-img-8.webp',
            '/images/beauty-moria/moria-img-9.webp',
            '/images/beauty-moria/moria-img-10.webp',
            '/images/beauty-moria/moria-img-11.webp',
            '/images/beauty-moria/moria-img-12.webp',
            '/images/beauty-moria/moria-img-13.webp',
            '/images/beauty-moria/moria-img-14.webp',
            '/images/beauty-moria/moria-img-15.webp',
            '/images/beauty-moria/moria-img-16.webp',
            '/images/beauty-moria/moria-img-17.webp',
            '/images/beauty-moria/moria-img-18.webp'
          ],
          overview: [
            "Moria is a refined beauty and wellness direction created for skincare brands, salons, spas, cosmetic studios and personal care founders who want to look premium from day one. It feels soft, clean and intentional, with enough elegance to support both product-led and service-led beauty businesses.",
            "The design language leans into delicate spacing, graceful typography, polished product presentation and a calm editorial mood. It is ideal for brands that want customers to feel cared for, confident and emotionally connected before they make a booking or buy a product.",
            "When customised, this direction can be adapted with your brand name, signature colours, treatment names, product ranges, founder story, booking calls-to-action and campaign messages across social graphics, packaging-style visuals, web sections and launch materials.",
            "Choose this direction if your beauty brand needs to feel gentle, trustworthy, premium and feminine without becoming generic or overly decorative."
          ],
          highlights: [
            'Brand Identity Design',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          process: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          outcomes: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Customised Social media assets',
            'Customised Print media assets',
            'Customised Premium Website Design (5 pages | Design only)',
            'Simple Brand Style Guide',
            'Customised Presentation Templates ( PowerPoint, Keynote (Extra cost) )',
            'Customised Premium Website Development ( 5 pages | Design + Development (Extra cost) )'
          ]
        }
      },
      offers: buildDirectionOffers(2)
    },
    {
      id: 3,
      title: 'Yossi beauty brand identity direction',
      description: "A bold, stylish beauty direction for brands that want stronger personality, visual confidence, and social-first campaign energy. Yossi is designed for cosmetics, skincare, haircare, beauty retail, influencer-led products, modern salons, and launch-focused beauty businesses that need to stand out quickly. The direction feels fashionable, youthful, expressive, and premium, making it suitable for product launches, Instagram campaigns, paid ads, packaging concepts, and online storefront visuals.",
      category: 'Beauty',
      price: "100",
      timeline: "24 - 48 hours",
      bestFor: "Beauty, Skincare, Wellness",
      media: beautyYossiMedia,
      thumbnails: [
        '/images/beauty-yossi/yossi-img-3.webp',
        '/images/beauty-yossi/yossi-img-1.webp',
        '/images/beauty-yossi/yossi-img-5.webp',
        '/images/beauty-yossi/yossi-img-4.webp',
        '/images/beauty-yossi/yossi-img-6.webp',
        '/images/beauty-yossi/yossi-img-7.webp',
        '/images/beauty-yossi/yossi-img-8.webp',
        '/images/beauty-yossi/yossi-img-9.webp',
        '/images/beauty-yossi/yossi-img-10.webp',
        '/images/beauty-yossi/yossi-img-11.webp',
        '/images/beauty-yossi/yossi-img-12.webp',
      ],
     sections: {
        cover: {
          mainImg: '/images/beauty-yossi/yossi-2560-1440.webp',
          previewImgs: [
            '/images/beauty-yossi/yossi-img-1.webp',
            '/images/beauty-yossi/yossi-img-2.webp',
            '/images/beauty-yossi/yossi-img-3.webp',
            '/images/beauty-yossi/yossi-img-4.webp',
            '/images/beauty-yossi/yossi-img-5.webp',
            '/images/beauty-yossi/yossi-img-6.webp',
            '/images/beauty-yossi/yossi-img-7.webp',
            '/images/beauty-yossi/yossi-img-8.webp',
            '/images/beauty-yossi/yossi-img-2.webp',
            '/images/beauty-yossi/yossi-img-3.webp',
            '/images/beauty-yossi/yossi-img-4.webp',
            '/images/beauty-yossi/yossi-img-5.webp',
            '/images/beauty-yossi/yossi-img-6.webp',
            '/images/beauty-yossi/yossi-img-7.webp',
            '/images/beauty-yossi/yossi-img-8.webp',
            '/images/beauty-yossi/yossi-img-9.webp',
            '/images/beauty-yossi/yossi-img-10.webp',
            '/images/beauty-yossi/yossi-img-11.webp',
            '/images/beauty-yossi/yossi-img-12.webp',
            '/images/beauty-yossi/yossi-img-13.webp',
            '/images/beauty-yossi/yossi-img-14.webp',
            '/images/beauty-yossi/yossi-img-15.webp',
            '/images/beauty-yossi/yossi-img-16.webp',
            '/images/beauty-yossi/yossi-img-17.webp',
            '/images/beauty-yossi/yossi-img-18.webp',
          ],
          overview: [
            "Yossi is a bold beauty direction for brands that want more personality, confidence and visual energy. It is suitable for cosmetics, haircare, skincare, beauty retail, influencer-led products and modern salons that want to stand out in a crowded feed.",
            "The system is designed to feel stylish and social-first, with expressive compositions, strong campaign energy, modern typography and a premium lifestyle mood. It gives the brand room to feel youthful, fashionable and commercially ready without losing polish.",
            "When customised, this direction can support product launches, social campaigns, website hero sections, promotional graphics, service menus, packaging concepts and brand touchpoints that need to look consistent across digital and print.",
            "Choose this direction if you want your beauty brand to feel confident, current, memorable and ready for attention on Instagram, TikTok, paid ads and online storefronts."
          ],
          highlights: [
            'Brand Identity Design',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          process: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          outcomes: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Customised Social media assets',
            'Customised Print media assets',
            'Customised Premium Website Design (5 pages | Design only)',
            'Simple Brand Style Guide',
            'Customised Presentation Templates ( PowerPoint, Keynote (Extra cost) )',
            'Customised Premium Website Development ( 5 pages | Design + Development (Extra cost) )'
          ]
        }
      },
      offers: buildDirectionOffers(3)
    },
    {
      id: 4,
      title: 'Moveasi brand identity direction',
      description: "A clean, modern technology and SaaS brand direction for startups, apps, platforms, and digital products that need to explain innovation clearly and look credible from day one. Moveasi is especially suited to mobility, logistics, productivity, booking, operations, automation, and service-based software businesses. It uses structured layouts, product-led visuals, confident typography, and interface-style compositions to make the brand feel useful, scalable, investor-ready, and easy to understand.",
      category: 'Tech & Saas',
      layout: 'layout-3',
      price: "100",
      timeline: "24 - 48 hours",
      bestFor: "Tech & Saas, Startups, Innovation",
      media: techSaasMoveasiMedia,
      thumbnails: [
        '/images/tech-saas-moveasi/moveasi-img-4.webp',
        '/images/tech-saas-moveasi/moveasi-img-2.webp',
        '/images/tech-saas-moveasi/moveasi-img-3.webp',
        '/images/tech-saas-moveasi/moveasi-img-1.webp',
        '/images/tech-saas-moveasi/moveasi-img-5.webp',
        '/images/tech-saas-moveasi/moveasi-img-6.webp',
        '/images/tech-saas-moveasi/moveasi-img-7.webp',
        '/images/tech-saas-moveasi/moveasi-img-8.webp',
        '/images/tech-saas-moveasi/moveasi-img-9.webp',
        '/images/tech-saas-moveasi/moveasi-img-10.webp',
        '/images/tech-saas-moveasi/moveasi-img-11.webp',
        '/images/tech-saas-moveasi/moveasi-img-12.webp',
      ],
      sections: {
        cover: {
          mainImg: '/images/tech-saas-moveasi/moveasi-img-1.webp',
          previewImgs: [
            '/images/tech-saas-moveasi/moveasi-img-1.webp',
            '/images/tech-saas-moveasi/moveasi-img-2.webp',
            '/images/tech-saas-moveasi/moveasi-img-3.webp',
            '/images/tech-saas-moveasi/moveasi-img-4.webp',
            '/images/tech-saas-moveasi/moveasi-img-5.webp',
            '/images/tech-saas-moveasi/moveasi-img-6.webp',
            '/images/tech-saas-moveasi/moveasi-img-7.webp',
            '/images/tech-saas-moveasi/moveasi-img-8.webp',
            '/images/tech-saas-moveasi/moveasi-img-2.webp',
            '/images/tech-saas-moveasi/moveasi-img-3.webp',
            '/images/tech-saas-moveasi/moveasi-img-4.webp',
            '/images/tech-saas-moveasi/moveasi-img-5.webp',
            '/images/tech-saas-moveasi/moveasi-img-6.webp',
            '/images/tech-saas-moveasi/moveasi-img-7.webp',
            '/images/tech-saas-moveasi/moveasi-img-8.webp',
            '/images/tech-saas-moveasi/moveasi-img-9.webp',
            '/images/tech-saas-moveasi/moveasi-img-10.webp',
            '/images/tech-saas-moveasi/moveasi-img-11.webp',
            '/images/tech-saas-moveasi/moveasi-img-12.webp',
            '/images/tech-saas-moveasi/moveasi-img-13.webp',
            '/images/tech-saas-moveasi/moveasi-img-14.webp',
            '/images/tech-saas-moveasi/moveasi-img-15.webp',
            '/images/tech-saas-moveasi/moveasi-img-16.webp',
            '/images/tech-saas-moveasi/moveasi-img-17.webp',
            '/images/tech-saas-moveasi/moveasi-img-18.webp',
          ],
          overview: [
            "Moveasi is a clean technology and SaaS direction built for startups, apps and digital platforms that need to explain innovation in a simple, credible way. It works especially well for mobility, logistics, productivity, booking, operations, automation or service-platform ideas.",
            "The visual approach is modern, structured and product-focused, using clear interface-style layouts, confident type, dynamic spacing and digital product moments to make the business feel usable, scalable and investor-ready.",
            "When customised, the direction can present your product name, value proposition, feature set, dashboard screens, app previews, customer benefits, pricing sections and launch messaging across a landing page, pitch visuals, social assets and product marketing graphics.",
            "Choose this direction if you want your tech brand to feel fast, useful, well-engineered and easy to understand without looking cold or overly complicated."
          ],
          highlights: [
            'Brand Identity Design',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          process: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          outcomes: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Customised Social media assets',
            'Customised Print media assets',
            'Customised Premium Website Design (5 pages | Design only)',
            'Simple Brand Style Guide',
            'Customised Presentation Templates ( PowerPoint, Keynote (Extra cost) )',
            'Customised Premium Website Development ( 5 pages | Design + Development (Extra cost) )'
          ]
        }
      },
      offers: buildDirectionOffers(4)
    },
    {
      id: 5,
      title: 'Mormon brand identity direction',
      description: "A polished, high-trust real estate direction for property brands that need a more corporate, investment-ready, and commercially mature identity. Mormon works well for developers, estate agencies, property consultants, construction-linked businesses, interior studios, and architecture-led brands. The direction balances premium design with structure and clarity, helping you present listings, developments, investment opportunities, neighbourhood stories, brochures, landing pages, and sales materials with confidence.",
      category: 'Real Estate',
      layout: 'layout-5',
      price: "100",
      timeline: "24 - 48 hours",
      bestFor: "Real Estate, Interior Design, Architecture",
      media: realEstateMormonMedia,
      thumbnails: [
        '/images/real-estate-mormon/mormon-img-22.webp',
        '/images/real-estate-mormon/mormon-img-2.webp',
        '/images/real-estate-mormon/mormon-img-3.webp',
        '/images/real-estate-mormon/mormon-img-1.webp',
        '/images/real-estate-mormon/mormon-img-5.webp',
        '/images/real-estate-mormon/mormon-img-6.webp',
        '/images/real-estate-mormon/mormon-img-7.webp',
        '/images/real-estate-mormon/mormon-img-8.webp',
        '/images/real-estate-mormon/mormon-img-9.webp',
        '/images/real-estate-mormon/mormon-img-10.webp',
        '/images/real-estate-mormon/mormon-img-11.webp',
        '/images/real-estate-mormon/mormon-img-12.webp',
      ],
      sections: {
        cover: {
          mainImg: '/images/real-estate-mormon/mormon-2560-1440.webp',
          previewImgs: [
            '/images/real-estate-mormon/mormon-img-1.webp',
            '/images/real-estate-mormon/mormon-img-2.webp',
            '/images/real-estate-mormon/mormon-img-3.webp',
            '/images/real-estate-mormon/mormon-img-4.webp',
            '/images/real-estate-mormon/mormon-img-5.webp',
            '/images/real-estate-mormon/mormon-img-6.webp',
            '/images/real-estate-mormon/mormon-img-7.webp',
            '/images/real-estate-mormon/mormon-img-8.webp',
            '/images/real-estate-mormon/mormon-img-2.webp',
            '/images/real-estate-mormon/mormon-img-3.webp',
            '/images/real-estate-mormon/mormon-img-4.webp',
            '/images/real-estate-mormon/mormon-img-5.webp',
            '/images/real-estate-mormon/mormon-img-6.webp',
            '/images/real-estate-mormon/mormon-img-7.webp',
            '/images/real-estate-mormon/mormon-img-8.webp',
            '/images/real-estate-mormon/mormon-img-9.webp',
            '/images/real-estate-mormon/mormon-img-10.webp',
            '/images/real-estate-mormon/mormon-img-11.webp',
            '/images/real-estate-mormon/mormon-img-12.webp',
            '/images/real-estate-mormon/mormon-img-13.webp',
            '/images/real-estate-mormon/mormon-img-14.webp',
            '/images/real-estate-mormon/mormon-img-15.webp',
            '/images/real-estate-mormon/mormon-img-16.webp',
            '/images/real-estate-mormon/mormon-img-17.webp',
            '/images/real-estate-mormon/mormon-img-18.webp',
          ],
          overview: [
            "Mormon is a polished real estate direction for property businesses that want a more corporate, investment-ready and high-trust identity. It is suited to developers, property consultants, estate agencies, construction-linked brands and interior or architectural studios selling premium spaces.",
            "The direction balances elegance with structure, giving the brand a serious but attractive presence. It can support property listings, investment brochures, development launches, neighbourhood stories, sales presentations and landing pages where credibility matters as much as beauty.",
            "When customised, it can carry your logo, brand colours, property photography, floor-plan highlights, location benefits, buyer messaging, contact details and campaign copy across digital and print-ready layouts.",
            "Choose this direction if your property brand needs to look established, reliable and commercially strong while still feeling modern, spacious and premium."
          ],
          highlights: [
            'Brand Identity Design',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          process: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          outcomes: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Customised Social media assets',
            'Customised Print media assets',
            'Customised Premium Website Design (5 pages | Design only)',
            'Simple Brand Style Guide',
            'Customised Presentation Templates ( PowerPoint, Keynote (Extra cost) )',
            'Customised Premium Website Development ( 5 pages | Design + Development (Extra cost) )'
          ]
        }
      },
      offers: buildDirectionOffers(5)
    },
    {
      id: 6,
      title: 'Fleoxx brand identity direction',
      description: "A sharp, flexible technology and SaaS brand direction for startups that want to look modern, intelligent, and ready to scale. Fleoxx is a strong fit for AI tools, workflow platforms, automation products, dashboards, fintech, collaboration software, business apps, and B2B SaaS offers. The direction uses clear hierarchy, product-focused layouts, premium digital styling, and conversion-friendly sections to help explain features, use cases, benefits, pricing, onboarding, and product value.",
      category: 'Tech & Saas',
      price: "100",
      timeline: "24 - 48 hours",
      bestFor: "Tech & Saas, Startups, Innovation",
      media: techSaasFleoxxMedia,
      thumbnails: [
        '/images/tech-saas-fleoxx/fleoxx-img-1.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-13.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-3.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-4.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-5.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-6.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-7.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-8.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-9.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-10.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-11.webp',
        '/images/tech-saas-fleoxx/fleoxx-img-12.webp',
      ],
      sections: {
        cover: {
          mainImg: '/images/tech-saas-fleoxx/fleoxx-2560-1440-v1.webp',
          previewImgs: [
            '/images/tech-saas-fleoxx/fleoxx-img-1.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-2.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-3.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-4.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-5.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-6.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-7.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-8.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-2.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-3.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-4.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-5.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-6.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-7.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-8.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-9.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-10.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-11.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-12.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-13.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-14.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-15.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-16.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-17.webp',
            '/images/tech-saas-fleoxx/fleoxx-img-18.webp',
          ],
          overview: [
            "Fleoxx is a flexible technology and SaaS direction for startups that want to feel modern, smart and highly adaptable. It is a strong fit for workflow tools, AI products, automation platforms, dashboards, business software, fintech, collaboration tools and digital service products.",
            "The visual language is sharp and system-driven, with product-led layouts, clear hierarchy, confident typography and enough motion-friendly structure to work across landing pages, pitch decks, app previews and launch campaigns.",
            "When customised, this direction can turn your product story into a polished brand experience with sections for your core promise, features, use cases, screenshots, testimonials, pricing, onboarding flow and conversion-focused calls-to-action.",
            "Choose this direction if you want your SaaS or tech startup to look credible, scalable and premium while still feeling fresh, approachable and easy to sell."
          ],
          highlights: [
            'Brand Identity Design',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          process: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Logo Design',
            'Color Palette Development',
            'Typography Selection',
            'Visual Style Guide Creation'
          ],
          outcomes: [
            'Customised Logo, Brand discovery, Brand colors, Typography',
            'Customised Social media assets',
            'Customised Print media assets',
            'Customised Premium Website Design (5 pages | Design only)',
            'Simple Brand Style Guide',
            'Customised Presentation Templates ( PowerPoint, Keynote (Extra cost) )',
            'Customised Premium Website Development ( 5 pages | Design + Development (Extra cost) )'
          ]
        }
      },
      offers: buildDirectionOffers(6)
    },
  ];

export const designDirectionData: DesignDirectionDataType[] = baseDesignDirectionData.map(attachDirectionMedia);


  