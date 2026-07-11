import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Work | Bodilum",
  description:
    "Selected brand identities, digital products, motion systems and immersive web experiences by Bodilum.",
};

export default function WorkLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
