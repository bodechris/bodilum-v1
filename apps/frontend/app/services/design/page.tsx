import ServiceDetailPage from "../ServiceDetailPage";

function DesignServicePage() {
  return (
    <ServiceDetailPage
      eyebrow="Design Services"
      title="Design that makes your brand look established fast."
      summary="Bodilum creates practical, high-conviction design systems for small businesses that need to look premium, trustworthy, and ready to sell without wasting months on revisions."
      deliverables={[
        "Brand identity direction, typography, and color decisions tailored to your offer.",
        "Marketing-ready design assets for social posts, flyers, brochures, decks, or menus.",
        "Conversion-focused landing page or website section design concepts.",
        "A clean visual system your team can keep using after launch.",
      ]}
      outcomes={[
        "A sharper first impression across your website, social channels, and sales materials.",
        "Design assets that feel consistent instead of patched together.",
        "Less back-and-forth because the design is tied directly to your business goal.",
        "A brand presence that looks credible enough to support higher-value offers.",
      ]}
    />
  );
}

export default DesignServicePage;