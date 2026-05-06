import ServiceSectionPage from "../ServiceSectionPage";

function AIIntegrationsServicePage() {
  return (
    <ServiceSectionPage
      title="AI Integrations"
      subtitle="AI workflows that reduce response time and repetitive work."
      description="Bodilum connects AI tools to your customer journey and internal workflow so you can handle leads, content, and routine operations with more speed and less manual effort."
      deliverables={[
        "AI-assisted lead qualification, intake, or response flows connected to your forms and channels.",
        "Prompt and workflow setup for recurring content, messaging, or client support tasks.",
        "Integrations between your website, CRM, Slack, WhatsApp, or internal tools where appropriate.",
        "A documented AI workflow your team can actually operate after handoff.",
      ]}
      outcomes={[
        "Faster replies to prospects and clients without sacrificing quality.",
        "Reduced admin load for repetitive communication and content tasks.",
        "A clearer system for where AI helps and where human review still matters.",
        "Operational leverage that saves time each week instead of adding another tool to manage.",
      ]}
    />
  );
}

export default AIIntegrationsServicePage;