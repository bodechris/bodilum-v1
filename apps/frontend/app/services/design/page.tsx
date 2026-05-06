import ServiceSectionPage from "../ServiceSectionPage";

function DesignServicePage() {
  return (
    <ServiceSectionPage
      title="All Design Services"
      subtitle="Bodilum's design services for small businesses, including brand kits, landing pages, company profiles, and more."
      description="Bodilum's design services help small businesses create a polished and professional brand presence across their website, customer touchpoints, and marketing materials — so they can get better leads, respond faster, and operate smarter."
      deliverables={[
        "Brand kits with logo, color palette, typography, and usage guidelines.",
        "Landing pages designed for clarity, speed, and lead capture.",
        "Company profiles that communicate your offer and story clearly.",
        "Pricelists, menus, or service lists that make it easy for customers to understand and choose your offerings.",
        "Google Business Profile makeovers that improve your local presence and lead generation.",
      ]}
      outcomes={[
        "A more polished and professional brand presence across your website and customer touchpoints.",
        "Improved lead quality and conversion through clearer communication of your offer.",
        "Faster response time and better customer experience with well-designed touchpoints.",
        "A stronger foundation for future marketing and growth efforts with a cohesive brand identity.",
      ]}
    />
  );
}

export default DesignServicePage;