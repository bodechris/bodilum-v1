import ServiceSectionPage from "../ServiceSectionPage";

function DesignServicePage() {
  return (
    <ServiceSectionPage
      title="Design Services"
      subtitle="Design that creates a polished brand presence for businesses that want to stand out and get better results."
      description="Bodilum's design services help small businesses create a polished and professional brand presence across their website, customer touchpoints, and marketing materials — so they can get better leads, respond faster, and operate smarter."

      media="/images/design-1.webp"

      services={[
        {
            title: "48-Hour Small Business Professional Makeover",
            description: "A fast, focused makeover to give your small business a more polished and professional brand presence across your customer touchpoints, and marketing materials. We’ll audit your current brand presence, identify the most impactful improvements, and implement them in a way that’s seamless for your team and customers.",
            link: "/services/brand-refresh", 
            thumbnail: "/images/48-hour-design-refresh.webp",            
            price: '460',
            bestFor: "Startups, consultants, coaches, small businesses, personal brands, service providers, and founders who need a modern landing page quickly without spending premium-launch money.",
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
              "Free on-board of brand identity on BiznesXpo"
            ]
        },
        {
            title: "Brand Discovery & Refresh",
            description: "Helping businesses discover their unique brand identity and refreshing existing brand identity to stay relevant in the market.",
            link: "/services/brand-refresh", 
            thumbnail: "/images/brand-discovery-and-refresh-2.webp",
            price: '920',
            bestFor: "Startups, consultants, coaches, small businesses, personal brands, service providers, and founders who need a modern landing page quickly without spending premium-launch money.",
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
              "Free on-board of brand identity on BiznesXpo"
            ]
        },
        {
          title: "Content & Marketing Package",
          description: "A content and marketing package that includes copywriting (with AI assistance), re-usable design templates, and strategy to help businesses create a cohesive and effective marketing presence.",
          link: "/services/content-marketing-package",
          thumbnail: "/images/content-and-marketing-package.webp",
          price: '>=640',
          bestFor: "Startups, consultants, coaches, small businesses, personal brands, service providers, and founders who need a modern landing page quickly without spending premium-launch money.",
          deliverables: [
            "Copywriting (with AI assistance)",
            "Re-usable design templates",
            "Marketing strategy"
          ]
        },
        
        
      ]}

    />
  );
}

export default DesignServicePage;