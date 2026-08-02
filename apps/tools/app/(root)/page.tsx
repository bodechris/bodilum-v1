import { BrandHeader } from "@/components/BrandHeader";
import { ToolCard } from "@/components/ToolCard";
import { LegalFooterLinks } from "@/components/LegalFooterLinks";
import { Brush, ChartNoAxesCombined, Palette, ScanSearch } from "lucide-react";

export default function Home() {
  return (
    <main className="site-shell home-page">
      <BrandHeader />

      <section className="home-hero reveal-up">
        <div className="eyebrow"><span /> Practical tools for ambitious businesses</div>
        <h1>Build a stronger business,<br />one useful tool at a time.</h1>
        <p>
          Free, focused tools from <strong>Bodilum</strong> to help you shape your brand,
          find better opportunities and make smarter growth decisions.
        </p>
      </section>

      <section className="tool-grid" aria-label="Bodilum business tools">
        <ToolCard
          number="01"
          title="Generate Business Name"
          description="Create distinctive business-name directions that fit your idea and market."
          href="https://biznesxpo.com/tools/generate-business-name"
          external
          icon={<Brush size={24} />}
        />
        <ToolCard
          number="02"
          title="Generate Brand Colors"
          description="Build a practical colour palette that gives your new brand a clear visual direction."
          href="https://biznesxpo.com/tools/generate-brand-colors"
          external
          icon={<Palette size={24} />}
        />
        <ToolCard
          number="03"
          title="Find Prospects for Your Business Offers"
          description="Discover local businesses worth approaching, understand the opportunity and prepare a stronger introduction."
          href="/prospect-finder"
          active
          icon={<ScanSearch size={24} />}
        />
        <ToolCard
          number="04"
          title="Brand Scorecard"
          description="See how credible, clear and commercially ready your brand appears to potential customers."
          comingSoon
          icon={<ChartNoAxesCombined size={24} />}
        />
      </section>

      <footer className="site-footer">
        <p>Tools by <a href="https://www.bodilum.com" target="_blank" rel="noreferrer">Bodilum</a> — a Nigerian-owned creative technology studio based in Johannesburg.</p>
        <div className="footer-meta"><LegalFooterLinks /><span>© {new Date().getFullYear()} Bodilum</span></div>
      </footer>
    </main>
  );
}
