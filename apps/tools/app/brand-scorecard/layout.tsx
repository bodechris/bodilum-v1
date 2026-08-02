import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Brand Scorecard",
  description: "Answer 40 practical questions to measure your brand clarity, credibility, customer experience and readiness to grow.",
  alternates: { canonical: "/brand-scorecard" },
  openGraph: {
    title: "Free Brand Scorecard · Bodilum Tools",
    description: "See how strong your brand is, where it is holding the business back and what to improve first.",
    url: "/brand-scorecard",
    type: "website",
  },
};

export default function BrandScorecardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
