"use client";

import { createContext, useContext } from "react";

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