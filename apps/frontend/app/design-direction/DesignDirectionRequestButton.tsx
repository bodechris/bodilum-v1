"use client";

import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import DesignRequestDrawerContent from "./DesignRequestDrawerContent";
import {
  ServiceDrawerPayload,
  ServiceDrawerPaymentOption,
  ServiceDrawerPricingOption,
} from "../services/ServiceSectionDrawerContext";
import { DesignDirectionDataType } from "./designDirectionData";

type DesignDirectionRequestButtonProps = {
  direction: DesignDirectionDataType;
  className?: string;
  children: React.ReactNode;
};

function getDesignDirectionLink(title: string) {
  return `/design-direction/${title.toLowerCase().replace(/\s+/g, "-")}`;
}

function toTitleCase(value: string) {
  return value.replace(/\b\w/g, (character) => character.toUpperCase());
}

const DESIGN_DIRECTION_PRICING_OPTIONS: ServiceDrawerPricingOption[] = [
  {
    key: "customise-1-design",
    title: "Customise 1 Design",
    priceLabel: "R1,500",
    timeline: "24-48 hours",
    paymentTerms: "100% upfront before we start customising the selected design.",
    summary:
      "A tightly scoped customisation of one premade design from this direction for a fast premium launch.",
    includes: [
      "1 premade design customised",
      "Business name, logo, or text swap",
      "Colour adjustment, image replacement, export, and 1 revision",
    ],
    badge: "Fast start",
    depositLabel: "Pay in full: R1,500",
  },
  {
    key: "brand-core-sprint",
    title: "Brand Core Sprint",
    priceLabel: "R18,000",
    timeline: "7-14 days",
    paymentTerms: "Pay a R9,000 deposit to start, with the balance due before final files.",
    summary:
      "Logo direction, discovery, colours, typography, and a simple brand guide for a real foundational brand system.",
    includes: [
      "Brand discovery, emotional centre, and brand soul",
      "Logo customisation or logo direction",
      "Colour system, typography system, and simple brand guide",
    ],
    badge: "Core brand",
    depositLabel: "Deposit: R9,000",
  },
  {
    key: "campaign-design-kit",
    title: "Campaign Design Kit",
    priceLabel: "From R12,500",
    timeline: "5-14 days",
    paymentTerms: "50% upfront. Typical starting deposit: R6,250.",
    summary:
      "Campaign-ready design assets built from this direction for launches, social drops, and ongoing promotions.",
    includes: [
      "Social Campaign Kit: 8 social media designs",
      "Launch Campaign Kit: 12-15 social, story, or ad assets",
      "Full Campaign Kit: social, print, and resizing support",
    ],
    badge: "Campaign",
    depositLabel: "Deposit from R6,250",
  },
  {
    key: "business-brand-kit",
    title: "Business Brand Kit",
    priceLabel: "From R12,500",
    timeline: "7-14 days",
    paymentTerms: "50% upfront. Typical starting deposit: R6,250.",
    summary:
      "A polished business asset system for your client-facing documents, stationery, and operational brand touchpoints.",
    includes: [
      "Starter Business Kit: 6 business assets",
      "Growth Business Kit: 10 business assets",
      "Extended system with extra assets at R1,500-R2,500 each",
    ],
    badge: "Business kit",
    depositLabel: "Deposit from R6,250",
  },
  {
    key: "corporate-story-deck",
    title: "Corporate Story Deck",
    priceLabel: "From R18,000",
    timeline: "10-21 days",
    paymentTerms: "50% upfront. Typical starting deposit: R9,000.",
    summary:
      "A presentation or profile system with stronger structure, storytelling, and sales polish for authority-driven brands.",
    includes: [
      "10-page presentation template from R15,000",
      "10-page corporate profile from R25,000",
      "Premium profile or pitch deck with advanced storytelling from R35,000",
    ],
    badge: "Authority deck",
    depositLabel: "Deposit from R9,000",
  },
  {
    key: "premium-web-launch",
    title: "Premium Web Launch",
    priceLabel: "From R45,000",
    timeline: "14-45 days",
    paymentTerms:
      "50% deposit to start, 30% after design approval, and 20% before launch.",
    summary:
      "A premium website built from this design direction, ranging from a refined static site to a cinematic launch experience.",
    includes: [
      "Static Style Website: R25,000-R35,000",
      "Premium Web Launch: R45,000-R75,000",
      "Cinematic Web Launch: R85,000-R150,000+",
    ],
    badge: "Website",
    depositLabel: "Deposit from R22,500",
  },
];

const DESIGN_DIRECTION_BUNDLE_OPTIONS: ServiceDrawerPricingOption[] = [
  {
    key: "brand-launch-system",
    title: "Brand Launch System",
    priceLabel: "From R45,000",
    timeline: "21-30 days",
    paymentTerms: "50% upfront to start, with the remaining balance scheduled across project milestones.",
    summary:
      "A bundled brand identity system with core strategy, business assets, and a starter social set for launch.",
    includes: [
      "Brand Core Sprint plus logo, colour, and typography systems",
      "Business card, letterhead, invoice, quote, receipt, and email signature",
      "WhatsApp or profile graphics plus a starter social media kit",
    ],
    badge: "Bundle",
    depositLabel: "Start from R22,500",
  },
  {
    key: "authority-launch-system",
    title: "Authority Launch System",
    priceLabel: "From R75,000",
    timeline: "28-40 days",
    paymentTerms: "50% upfront to start, with the remaining balance scheduled across project milestones.",
    summary:
      "Everything in the brand launch system, plus a structured corporate profile or presentation for stronger authority.",
    includes: [
      "Brand launch system foundations",
      "10-15 page corporate profile with editable deck version",
      "Company story structure, services pages, and case study layout",
    ],
    badge: "Bundle",
    depositLabel: "Start from R37,500",
  },
  {
    key: "complete-market-launch",
    title: "Complete Market Launch",
    priceLabel: "From R120,000",
    timeline: "45-75 days",
    paymentTerms: "50% upfront to start, milestone payments through production, and final balance before launch.",
    summary:
      "The full market-ready system: brand identity, business kit, campaign assets, profile, and premium website launch.",
    includes: [
      "Full brand identity and business brand kit",
      "Campaign starter kit plus corporate profile or presentation",
      "5-page premium website, deployment, and launch graphics",
    ],
    badge: "Bundle",
    depositLabel: "Start from R60,000",
  },
];

const DESIGN_DIRECTION_PAYMENT_OPTIONS: ServiceDrawerPaymentOption[] = [
  {
    title: "Design Pick",
    amountLabel: "R1,500",
    note: "Single design customisation, paid in full to begin.",
  },
  {
    title: "Brand Core Deposit",
    amountLabel: "R9,000",
    note: "Start the Brand Core Sprint with a deposit.",
  },
  {
    title: "Campaign Kit Deposit",
    amountLabel: "R6,250",
    note: "Typical starting deposit for campaign design work.",
  },
  {
    title: "Business Brand Kit Deposit",
    amountLabel: "R6,250",
    note: "Typical starting deposit for a business asset system.",
  },
  {
    title: "Corporate Story Deck Deposit",
    amountLabel: "R9,000",
    note: "Typical starting deposit for a deck or profile project.",
  },
  {
    title: "Website Deposit",
    amountLabel: "R22,500",
    note: "Typical starting deposit for a Premium Web Launch.",
  },
  {
    title: "Custom Amount / Invoice Request",
    amountLabel: "Custom",
    note: "Use the form below if you need a tailored scope or a manual invoice.",
  },
];

function buildDesignDirectionPayload(direction: DesignDirectionDataType): ServiceDrawerPayload {
  return {
    title: toTitleCase(direction.title),
    description: direction.description,
    link: getDesignDirectionLink(direction.title),
    price: direction.price,
    summary: direction.sections?.cover?.overview?.[0] ?? direction.description,
    timeline: direction.timeline,
    bestFor: direction.bestFor,
    deliverables: direction.sections?.cover?.outcomes,
    requestKind: "design-direction",
    priceHighlights: [
      "Customise this direction from R1,500",
      "Brand systems from R18,000",
      "Websites from R45,000",
    ],
    pricingOptions: DESIGN_DIRECTION_PRICING_OPTIONS,
    bundleOptions: DESIGN_DIRECTION_BUNDLE_OPTIONS,
    paymentOptions: DESIGN_DIRECTION_PAYMENT_OPTIONS,
    offers: direction.offers?.map((offer) => ({
      name: offer.name,
      title: offer.title,
      timeline: offer.timeline,
      price: offer.price,
      description: offer.description,
      coverImg: offer.coverImg,
      businessOutcomes: offer.businessOutcomes,
      deliverables: offer.deliverables,
      bestFor: offer.bestFor,
      singleDesignGallery: offer.singleDesignGallery,
      singleDesignImages:
        offer.singleDesignGallery
          ?.map((index) => direction.media?.[index])
          .filter((image): image is string => typeof image === "string" && image.length > 0) ?? [],
    })),
    thumbnail:
      typeof direction.sections?.cover?.mainImg === "string"
        ? direction.sections.cover.mainImg
        : direction.thumbnails[0],
    previewImages:
      direction.sections?.cover?.previewImgs?.filter(
        (image: unknown): image is string => typeof image === "string" && image.length > 0,
      ) ?? direction.thumbnails,
  };
}

export default function DesignDirectionRequestButton({
  direction,
  className,
  children,
}: DesignDirectionRequestButtonProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();
  const drawerPayload = useMemo(() => buildDesignDirectionPayload(direction), [direction]);
  const showFooterLink = pathname === "/design-direction";

  return (
    <>
      <button style={{ cursor: "pointer" }} className={className} type="button" onClick={() => setIsDrawerOpen(true)}>
        <span>{children}</span>
      </button>

      <Drawer.Root
        lazyMount
        unmountOnExit
        placement="end"
        open={isDrawerOpen}
        onOpenChange={(details) => setIsDrawerOpen(details.open)}
      >
        <Portal>
          <Drawer.Backdrop bg="rgba(17, 17, 17, 0.55)" />
          <Drawer.Positioner p={{ base: "0", md: "4" }}>
            <Drawer.Content
              width={{ base: "100%", md: "65vw" }}
              minW={{ base: "100%", md: "65vw" }}
              maxW={{ base: "100%", md: "65vw" }}
              h={{ base: "88vh", md: "calc(100vh - 2rem)" }}
              maxH={{ base: "88vh", md: "calc(100vh - 2rem)" }}
              borderRadius={{ base: "1.5rem 1.5rem 0 0", md: "1.75rem" }}
              boxShadow="-24px 0 64px rgba(0, 0, 0, 0.18)"
              overflowX="hidden"
              overflowY="hidden"
              display="flex"
              flexDirection="column"
            >
              <Drawer.Header display="flex" alignItems="flex-start" gap="1rem" pb="1rem">
                <Drawer.Title fontSize="clamp(1.5rem, 3vw, 2rem)" lineHeight="1" fontWeight="800">
                  {drawerPayload.title}
                </Drawer.Title>
              </Drawer.Header>

              <Drawer.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  position="absolute"
                  top="1.25rem"
                  insetEnd="1.25rem"
                  rounded="full"
                  borderWidth="1px"
                  borderColor="#ddd"
                  bg="#fff"
                />
              </Drawer.CloseTrigger>

              <Drawer.Body display="flex" flexDirection="column" gap="1rem" flex="1" minH="0" overflow="hidden">
                <DesignRequestDrawerContent
                  service={drawerPayload}
                  onClose={() => setIsDrawerOpen(false)}
                />
              </Drawer.Body>

              {showFooterLink ? (
                <Drawer.Footer display="flex" justifyContent="flex-start" pt="0.25rem">
                  <Button
                    asChild
                    minH="44px"
                    px="1.1rem"
                    rounded="full"
                    fontWeight="700"
                    borderWidth="1px"
                    borderColor="#d8d8d8"
                    bg="#fff"
                    color="#111"
                  >
                    <Link href={drawerPayload.link}>See full offer</Link>
                  </Button>
                </Drawer.Footer>
              ) : null}
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}