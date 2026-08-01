import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Local Prospect Finder",
  description: "Find local businesses worth approaching, analyse the commercial opportunity and generate a personalised introductory email and PDF report.",
};

export default function ProspectFinderLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
