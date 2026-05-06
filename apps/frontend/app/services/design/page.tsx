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
            title: "Web Design",
            description: "Creating visually appealing and user-friendly websites.",
            link: "/services/web-design"
        },
        {
            title: "Graphic Design",
            description: "Designing logos, brochures, and other marketing materials.",
            link: "/services/graphic-design"
        },
        {
            title: "UI/UX Design",
            description: "Enhancing user experience through intuitive design.",
            link: "/services/ui-ux-design"
        },
        {
            title: "Branding",
            description: "Creating a strong brand identity for your business.",
            link: "/services/branding"
        },
        {
            title: "Social Media Design",
            description: "Designing engaging content for social media platforms.",
            link: "/services/social-media-design"
        }
      ]}

    />
  );
}

export default DesignServicePage;