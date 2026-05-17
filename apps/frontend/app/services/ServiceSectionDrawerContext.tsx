"use client";

import { createContext, useContext } from "react";

export type ServiceDrawerPricingOption = {
  key: string;
  title: string;
  priceLabel: string;
  timeline: string;
  paymentTerms: string;
  summary: string;
  includes?: string[];
  badge?: string;
  depositLabel?: string;
};

export type ServiceDrawerPaymentOption = {
  title: string;
  amountLabel: string;
  note: string;
};

export type ServiceDrawerOffer = {
  name: string;
  title: string;
  timeline: string;
  price: string;
  description: string;
  coverImg: string;
  businessOutcomes: string[];
  deliverables: string[];
  bestFor: string;
  singleDesignGallery?: number[];
  singleDesignImages?: string[];
};

export type ServiceDrawerPayload = {
  title: string;
  description: string;
  link: string;
  price?: string;
  summary?: string;
  timeline?: string;
  bestFor?: string;
  deliverables?: string[];
  thumbnail?: string;
  previewImages?: string[];
  requestKind?: "service" | "design-direction";
  priceHighlights?: string[];
  pricingOptions?: ServiceDrawerPricingOption[];
  bundleOptions?: ServiceDrawerPricingOption[];
  paymentOptions?: ServiceDrawerPaymentOption[];
  offers?: ServiceDrawerOffer[];
};

export type ServiceSectionDrawerContextValue = {
  activeService: ServiceDrawerPayload | null;
  isOpen: boolean;
  openDrawer: (service?: ServiceDrawerPayload | null) => void;
  closeDrawer: () => void;
  setActiveService: (service: ServiceDrawerPayload | null) => void;
};

export const ServiceSectionDrawerContext =
  createContext<ServiceSectionDrawerContextValue | null>(null);

export function useServiceSectionDrawer() {
  const context = useContext(ServiceSectionDrawerContext);

  if (!context) {
    throw new Error(
      "useServiceSectionDrawer must be used within ServiceSectionPage.",
    );
  }

  return context;
}