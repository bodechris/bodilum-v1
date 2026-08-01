import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tools.bodilum.com"),
  title: {
    default: "Bodilum Business Tools",
    template: "%s · Bodilum Tools",
  },
  description: "Free practical tools to help businesses shape their brand, find prospects and grow with AI-enabled systems.",
  openGraph: {
    title: "Bodilum Business Tools",
    description: "Free practical tools for ambitious small businesses.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
