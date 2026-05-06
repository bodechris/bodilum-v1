import ServiceSectionPage from "../ServiceSectionPage";

function DevelopmentServicePage() {
  return (
    <ServiceSectionPage
      title="Web Development Services"
      subtitle="Development that ships clean, fast, and ready for real use."
      description="Bodilum builds focused digital products, landing pages, and business tools that are lightweight, maintainable, and designed around the action you need customers or staff to take."
      media="/images/design-4.webp"
      services={[
        {
            title: "AI-Assisted Starter Landing Page",
            description: "A fast, modern, AI-assisted landing page built with senior creative direction, clean design, secure modern tech, CMS editing, and a polished launch setup.",
            link: "/services/brand-refresh", 
            price: '15000',
            bestFor: "Startups, consultants, coaches, small businesses, personal brands, service providers, and founders who need a modern landing page quickly without spending premium-launch money.",
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
              "Optional branded documents"
            ]
        },
        {
            title: "14-Day Premium Launch Page",
            description: "Awwwards-level landing pages for startups, apps, SaaS products, consultants, and premium service brands.This is for founders, consultants, startups, and service businesses that need a beautiful, credible, fast-loading website that helps them sell.",
            link: "/services/brand-refresh", 
            price: '>=25000',
            bestFor: "Startups, apps, SaaS products, consultants, and premium service brands",
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
              "14 days post-launch support"
            ]
        },
        {
            title: "Prototype-to-Production Engineering Sprint",
            description: "For founders with AI-built or vibe-coded apps who need senior engineers to make the product stable, secure, scalable, and launch-ready. This is a 14-day sprint where we audit your codebase, identify and fix critical issues, and get your product ready for real users.",
            link: "/services/brand-refresh", 
            price: '7500-450000',
            bestFor: "Startups, apps, SaaS products, consultants, and premium service brands that need to get a product out the door quickly without sacrificing code quality or security.",
            deliverables: [
              "Codebase audit report",
              "Risk list",
              "Production-readiness score",
              "Fix roadmap",
              "Launch estimate",
              "Recommended next sprint"
            ]
        },
        
      ]}
    />
  );
}

export default DevelopmentServicePage;