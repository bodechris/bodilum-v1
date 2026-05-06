import ServiceSectionPage from "../ServiceSectionPage";

function AIIntegrationsServicePage() {
  return (
    <ServiceSectionPage
      title="AI Integrations"
      subtitle="AI workflows that reduce response time and repetitive work for high-performing teams."
      description="Bodilum connects AI tools to your customer journey and internal workflow so you can handle leads, content, and routine operations with more speed and less manual effort."
      media="/images/design-8.webp"
      services={[
        {
          title: "AI Opportunity Audit",
          description: "We’ll audit your customer journey and internal workflow to identify the best opportunities to integrate AI tools that can save you time, reduce manual work, and help you respond faster to customers.",
          link: "/services/brand-refresh",
          price: '5000',
          deliverables: [
            "AI opportunity audit",
            "Customer journey analysis",
            "Internal workflow analysis",
            "AI tool recommendations",
            "Implementation roadmap"
          ]
        },
        {
          title: "AI Starter Sprint",
          description: "A fast, focused sprint to implement 1–3 AI tools that can save you time, reduce manual work, and help you respond faster to customers. We’ll implement the AI tools in a way that’s seamless for your team and customers.",
          link: "/services/brand-refresh",
          price: '15000',
          bestFor: "Startups, consultants, coaches, small businesses, personal brands, service providers, and founders who need a modern landing page quickly without spending premium-launch money.",
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
          ]
        },
        {
            title: "AI Business Upgrade Sprint",
            description: "A fast, focused sprint to identify and implement AI tools that can save you time, reduce manual work, and help you respond faster to customers. We’ll audit your current workflow, identify the best AI tools for your business, and implement them in a way that’s seamless for your team and customers.",
            link: "/services/brand-refresh", 
            price: '>=25000',
            bestFor: "Startups, consultants, coaches, small businesses, personal brands, service providers, and founders who need a modern landing page quickly without spending premium-launch money.",
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
              "AI staff prompt library"
            ]
        },
        
      ]}
    />
  );
}

export default AIIntegrationsServicePage;