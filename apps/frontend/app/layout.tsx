import type { Metadata } from "next";
import AppFrontend from "@/components/modules/app-frontend/AppFrontend";
import { Lato, Bricolage_Grotesque } from "next/font/google";
import Providers from "@/providers/Providers";
import "./globals.css";


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
  title: "Bodilum AI Design Agency",
  description: "Create stunning designs with Bodilum AI Design Agency. Choose from pre-designed templates or craft a custom brief to elevate your brand effortlessly.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${bricolage_grotesque.variable} antialiased`} suppressHydrationWarning>
      <body>
        <Providers>
          <AppFrontend>
            {children}
          </AppFrontend>
        </Providers>
      </body>
    </html>
  );
}
