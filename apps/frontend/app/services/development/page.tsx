import ServiceSectionPage from "../ServiceSectionPage";

function DevelopmentServicePage() {
  return (
    <ServiceSectionPage
      title="Development Services"
      subtitle="Development that ships clean, fast, and ready for real use."
      description="Bodilum builds focused digital products, landing pages, and business tools that are lightweight, maintainable, and designed around the action you need customers or staff to take."
      deliverables={[
        "Responsive marketing pages or product pages built for speed and clarity.",
        "Custom frontend implementation for booking, lead capture, onboarding, or client portals.",
        "API and form integrations that connect your website to your business workflow.",
        "Production-ready deployment support so your team is not left with half-finished setup.",
      ]}
      outcomes={[
        "A more polished customer experience on desktop and mobile.",
        "Fewer manual workarounds in your day-to-day operations.",
        "Pages that load faster and communicate your offer more clearly.",
        "A codebase you can keep extending instead of rebuilding from scratch.",
      ]}
    />
  );
}

export default DevelopmentServicePage;