import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import AppFrontend from "@/components/modules/app-frontend/AppFrontend";
import { Lato, Bricolage_Grotesque } from "next/font/google";
import { headers } from "next/headers";
import Providers from "@/providers/Providers";
import "./globals.css";

import { MetaPixel } from "@/components/integrations/MetaPixel";
import { MetaPixelTracker } from "@/components/integrations/MetaPixelTracker";


const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
});

const bricolage_grotesque = Bricolage_Grotesque({
  weight: ["200", "300", "400", "700", "800"],
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bodilum | Motion-led Design & Web Experiences",
  description:
    "Bodilum creates motion-led brand identities, cinematic web experiences, and growth systems for ambitious businesses and creative teams. We take your brand beyond the ordinary.",
};

function normalizeCountryCode(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const normalizedCountryCode = value.trim().toUpperCase();

  return /^[A-Z]{2}$/.test(normalizedCountryCode)
    ? normalizedCountryCode
    : undefined;
}

async function resolveRequestCountry() {
  const requestHeaders = await headers();

  const headerCountry = [
    requestHeaders.get("x-vercel-ip-country"),
    requestHeaders.get("cf-ipcountry"),
    requestHeaders.get("x-country-code"),
    requestHeaders.get("cloudfront-viewer-country"),
  ]
    .map((value) => normalizeCountryCode(value))
    .find(Boolean);

  return headerCountry;
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialCountryCode = await resolveRequestCountry();

  return (
    <html lang="en" className={`${lato.variable} ${bricolage_grotesque.variable} antialiased`} suppressHydrationWarning>
      <body>
        <Providers>
          <AppFrontend initialCountryCode={initialCountryCode}>
            {children}
          </AppFrontend>
        </Providers>
        {process.env.NEXT_PUBLIC_GA_ID ? <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} /> : null}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID ? (
          <>
            <MetaPixel />
            <MetaPixelTracker />
          </>
        ) : null}
      </body>
    </html>
  );
}
