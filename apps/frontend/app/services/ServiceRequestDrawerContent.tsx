"use client";

import { Button } from "@chakra-ui/react";
import { useGlobalAppStates } from "@bod/utils/contexts/GlobalAppVarProvider";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useReactForm from "@/hooks/useReactForm";
import { trackMetaEvent } from "@/lib/metaPixelEvents";
import LocalizedServicePrice from "./LocalizedServicePrice";
import {
  ServiceSectionDrawerContext,
  ServiceDrawerPayload,
  ServiceDrawerPricingOption,
} from "./ServiceSectionDrawerContext";
import {
  serviceRequestFormSchema,
  type ServiceRequestFormValues,
} from "./serviceRequestFormSchema";

const DEPOSIT_THRESHOLD_ZAR = 11_000;
const PRICE_ROUNDING_INCREMENT = 500;

type ServiceRequestDrawerContentProps = {
  service?: ServiceDrawerPayload | null;
  onClose?: () => void;
};

type SubmitState =
  | { status: "idle"; message: string | null }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function parseServiceBasePrice(price?: string) {
  if (!price) {
    return null;
  }

  const numericPart = Number(price.replace(">=", "").trim());

  return Number.isFinite(numericPart) ? numericPart : null;
}

function summarizeDeliverables(deliverables?: string[]) {
  if (!deliverables?.length) {
    return "We will confirm the exact scope and deliverables with you before the project starts.";
  }

  if (deliverables.length <= 3) {
    return deliverables.join(", ");
  }

  return `${deliverables.slice(0, 3).join(", ")}, and ${deliverables.length - 3} more.`;
}

function buildSelectedRequestValues(
  service: ServiceDrawerPayload | null,
  paymentTerms: string,
  selectedOffer?: ServiceDrawerPricingOption | null,
) {
  return {
    serviceTitle: selectedOffer ? `${service?.title ?? ""} - ${selectedOffer.title}` : service?.title ?? "",
    serviceLink: service?.link ?? "",
    servicePrice: selectedOffer?.priceLabel ?? service?.price ?? "",
    serviceSummary:
      selectedOffer?.summary
      ?? service?.summary
      ?? service?.description
      ?? "",
    serviceTimeline: selectedOffer?.timeline ?? service?.timeline ?? "",
    paymentTerms,
  };
}

function buildDefaultValues(
  service: ServiceDrawerPayload | null,
  paymentTerms: string,
): ServiceRequestFormValues {
  const selectedValues = buildSelectedRequestValues(service, paymentTerms);

  return {
    firstName: "",
    lastName: "",
    workEmail: "",
    phoneNumber: "",
    companyName: "",
    companyAddress: "",
    notes: "",
    website: "",
    ...selectedValues,
  };
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <FieldErrorText>{message}</FieldErrorText>;
}

type OfferPreview = {
  id: number;
  title: string;
  price: string;
  timeline: string;
  description: string;
  guidance: string;
  details: string[];
};

const DESIGN_DIRECTION_OFFER_PREVIEWS: OfferPreview[] = [
  {
    id: 1,
    title: "Customise Single Design",
    price: "Starts at R1,500 ($90)",
    timeline: "24-48 hours",
    description:
      "The client picks one design from any premade set and requests a simple customisation such as logo, text, colour, or image swaps.",
    guidance:
      "R1,500 is viable if the scope stays tightly limited to one adapted design with fast delivery.",
    details: [
      "Pick any design from any premade set.",
      "Request simple customisation such as text, logo, colour, or image swaps.",
      "Built for fast-turnaround premium edits, not full system redesigns.",
    ],
  },
  {
    id: 2,
    title: "Brand Core Set",
    price: "Suggested from R18,000",
    timeline: "7-14 days",
    description:
      "Logo direction, brand discovery, emotional centre, brand soul, what the brand is and is not, how it feels, looks, sounds, and the metaphor system, plus colours and typography.",
    guidance:
      "R10,000 is too low for this level of strategy. A cleaner live price is R18,000, with room to move upward for deeper scope.",
    details: [
      "Choose a pre-designed category and build a foundational brand system from it.",
      "Includes logo direction, discovery, colour system, and typography system.",
      "Best positioned as a strategic identity sprint rather than a budget logo package.",
    ],
  },
  {
    id: 3,
    title: "Campaign Set",
    price: "Suggested from R12,500",
    timeline: "5-14 days",
    description:
      "The client picks a premade category style and requests a custom social media set, print set, or both, depending on launch needs.",
    guidance:
      "Use R12,500 as the real floor so the offer still feels premium, then scale upward for more assets or both channels.",
    details: [
      "Use the chosen direction as the visual foundation for launch assets.",
      "Can be social media, print, or a combined campaign system.",
      "Price should expand with asset count, size variations, and print complexity.",
    ],
  },
  {
    id: 4,
    title: "Brand Applications",
    price: "Suggested from R12,500",
    timeline: "7-14 days",
    description:
      "Brand application assets such as invoices, letterheads, business cards, quotes, receipts, and other branded business tools.",
    guidance:
      "Treat this as an expandable system: start from R12,500 and increase the cost as more branded items are added.",
    details: [
      "Ideal for branded operational assets and everyday business touchpoints.",
      "Includes stationery and document systems rather than campaign creatives.",
      "The offer should scale upward cleanly as more application items are added.",
    ],
  },
  {
    id: 5,
    title: "Corporate Profile / Presentation",
    price: "Suggested from R15,000 template or R25,000 profile",
    timeline: "7-14 days",
    description:
      "A customisable branded PowerPoint or presentation system, with a 10-page template as the standard starting offer.",
    guidance:
      "R15,000 works for a design-only 10-page template. Use around R25,000 when structure, refinement, and profile polish are included.",
    details: [
      "Position the standard entry offer as a 10-page branded PowerPoint template.",
      "A higher price is justified when narrative structure or profile refinement is involved.",
      "This works best when sold as a branded authority asset, not generic slide design.",
    ],
  },
  {
    id: 6,
    title: "5-Page Awwwards-Style Website",
    price: "Suggested from R35,000 static, R45,000 premium, R85,000+ advanced",
    timeline: "14-45 days",
    description:
      "A five-page website using the design language of the chosen category, ranging from elegant static builds to motion-rich, concept-heavy experiences.",
    guidance:
      "R15,000 is too low for an Awwwards-positioned site. Use R35,000 as the static floor and R45,000+ for stronger interactions and production quality.",
    details: [
      "Use the selected direction as the art direction for a five-page site.",
      "Static builds can be priced lower, while animation, 3D, and deeper interaction raise the cost significantly.",
      "The public price should signal premium execution, not entry-level web design.",
    ],
  },
  {
    id: 7,
    title: "Full Brand Identity",
    price: "Suggested from R45,000",
    timeline: "21-30 days",
    description:
      "A full brand identity built from the chosen direction, excluding the website and corporate presentation.",
    guidance:
      "This is a system-level offer. Starting at R45,000 keeps it commercial without collapsing the perceived value.",
    details: [
      "Bundle the core brand system with applications and supporting identity elements.",
      "Keep website and corporate presentation outside this package.",
      "This should read as a serious system build, not a slightly larger logo package.",
    ],
  },
  {
    id: 8,
    title: "Full Brand Identity + Corporate Profile",
    price: "Suggested from R75,000",
    timeline: "28-40 days",
    description:
      "The complete brand identity package plus a branded corporate profile or presentation, excluding the website.",
    guidance:
      "A launch-ready authority package should start around R75,000 so the profile work is priced like strategy, not like an add-on.",
    details: [
      "Combine full identity work with the profile or presentation layer for authority-driven brands.",
      "Good fit for businesses that need polished sales and company materials without a website build.",
      "This offer should feel like an executive launch system, not a bundle discount.",
    ],
  },
  {
    id: 9,
    title: "Full Brand Identity + Corporate Profile + Website",
    price: "Suggested from R150,000",
    timeline: "45-75 days",
    description:
      "A full market-launch system including identity, profile or presentation, and a premium website built from the selected direction.",
    guidance:
      "This is the highest-value bundle. R150,000 is a stronger premium starting point than R120,000 if the website is meant to feel world-class.",
    details: [
      "This is the complete market-launch offer built from one chosen direction.",
      "It combines identity, authority materials, and a premium website system.",
      "Use this as the top-tier commercial pathway for clients who want one studio to build everything.",
    ],
  },
];

export default function ServiceRequestDrawerContent({ service }: ServiceRequestDrawerContentProps) {
  const drawerContext = useContext(ServiceSectionDrawerContext);
  const resolvedService = service ?? drawerContext?.activeService ?? null;
  const { currencyCode, isExchangeRateLoading, usdExchangeRate } = useGlobalAppStates();
  const [zarExchangeRate, setZarExchangeRate] = useState<number | null>(
    currencyCode === "ZAR" ? usdExchangeRate : null,
  );
  const [selectedPricingKey, setSelectedPricingKey] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: null,
  });

  const basePrice = useMemo(() => parseServiceBasePrice(resolvedService?.price), [resolvedService?.price]);

  useEffect(() => {
    setSelectedPricingKey(resolvedService?.pricingOptions?.[0]?.key ?? null);
    setSubmitState({ status: "idle", message: null });
  }, [resolvedService?.title, resolvedService?.pricingOptions]);

  useEffect(() => {
    if (currencyCode === "ZAR") {
      setZarExchangeRate(usdExchangeRate);
      return;
    }

    let isCancelled = false;

    async function loadZarExchangeRate() {
      try {
        const response = await fetch("/api/forex?currency=ZAR", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Unable to load ZAR exchange rate.");
        }

        const payload = (await response.json()) as { rate?: number };

        if (!isCancelled && typeof payload.rate === "number" && Number.isFinite(payload.rate)) {
          setZarExchangeRate(payload.rate);
        }
      } catch {
        if (!isCancelled) {
          setZarExchangeRate(null);
        }
      }
    }

    void loadZarExchangeRate();

    return () => {
      isCancelled = true;
    };
  }, [currencyCode, usdExchangeRate]);

  const localizedThreshold = useMemo(() => {
    if (!zarExchangeRate || !Number.isFinite(zarExchangeRate)) {
      return null;
    }

    const convertedThreshold = DEPOSIT_THRESHOLD_ZAR / zarExchangeRate;
    return Math.ceil(convertedThreshold / PRICE_ROUNDING_INCREMENT) * PRICE_ROUNDING_INCREMENT;
  }, [zarExchangeRate]);

  const selectedPricingOption = useMemo(
    () => resolvedService?.pricingOptions?.find((option) => option.key === selectedPricingKey) ?? null,
    [selectedPricingKey, resolvedService?.pricingOptions],
  );

  const fallbackPaymentTerms = useMemo(() => {
    if (basePrice && localizedThreshold && basePrice >= localizedThreshold) {
      return "50% upfront to start, with the balance due before final delivery.";
    }

    return "100% upfront before work begins.";
  }, [basePrice, localizedThreshold]);

  const paymentTerms = selectedPricingOption?.paymentTerms ?? fallbackPaymentTerms;
  const defaultValues = useMemo(
    () => buildDefaultValues(resolvedService, paymentTerms),
    [paymentTerms, resolvedService],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useReactForm({
    schema: serviceRequestFormSchema,
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    reset(buildDefaultValues(resolvedService, paymentTerms));
  }, [paymentTerms, reset, resolvedService]);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState({ status: "idle", message: null });

    const response = await fetch("/api/service-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const payload = (await response.json().catch(() => null)) as { message?: string } | null;

    if (!response.ok) {
      setSubmitState({
        status: "error",
        message: payload?.message ?? "We could not send your request. Please try again.",
      });
      return;
    }

    reset(buildDefaultValues(resolvedService, paymentTerms));
    trackMetaEvent("Lead", {
      content_name: resolvedService?.title ?? "Service Request",
      content_category: "Design Service",
    });
    setSubmitState({
      status: "success",
      message: payload?.message ?? "Your request has been sent. We will reply shortly.",
    });
  });

  if (!resolvedService || resolvedService.requestKind === "design-direction") {
    return (
      <DrawerContentShell>
        <EmptyState>
          <p>Choose a service to see the request flow.</p>
        </EmptyState>
      </DrawerContentShell>
    );
  }

  const summaryImage = resolvedService.thumbnail ?? resolvedService.previewImages?.[0] ?? null;
  const selectedValues = buildSelectedRequestValues(resolvedService, paymentTerms, selectedPricingOption);

  return (
    <DrawerContentShell>
      <SummaryCard>
        {summaryImage ? <img src={summaryImage} alt={resolvedService.title} /> : null}

        <div className="summary-card__content">
          <span className="summary-card__eyebrow">Service summary</span>
          <h3>{resolvedService.title}</h3>
          <p className="summary-card__copy">{resolvedService.summary ?? resolvedService.description}</p>

          <div className="summary-card__details">
            {resolvedService.timeline ? (
              <div>
                <span className="summary-card__label">Timeline</span>
                <p className="summary-card__meta">{resolvedService.timeline}</p>
              </div>
            ) : null}

            {resolvedService.bestFor ? (
              <div>
                <span className="summary-card__label">Best for</span>
                <p className="summary-card__meta">{resolvedService.bestFor}</p>
              </div>
            ) : null}
          </div>

          {resolvedService.priceHighlights?.length ? (
            <div className="summary-card__signals">
              {resolvedService.priceHighlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          ) : null}

          {resolvedService.link ? (
            <Link href={resolvedService.link} className="summary-card__link">
              See full offer
            </Link>
          ) : null}
        </div>
      </SummaryCard>

      <PriceCard>
        <span className="price-card__eyebrow">Project cost</span>
        <div className="price-card__price">
          <LocalizedServicePrice price={selectedPricingOption?.priceLabel ?? resolvedService.price} />
        </div>
        {selectedPricingOption?.timeline ?? resolvedService.timeline ? (
          <p className="price-card__timeline">Timeline: {selectedPricingOption?.timeline ?? resolvedService.timeline}</p>
        ) : null}
        <p className="price-card__caption">
          {selectedPricingOption?.summary ?? resolvedService.summary ?? resolvedService.description}
        </p>
        <div className="price-card__notice" data-loading={isExchangeRateLoading ? "true" : "false"}>
          <strong>Payment terms</strong>
          <p>{paymentTerms}</p>
          {currencyCode !== "ZAR" && !zarExchangeRate ? (
            <span>We will confirm the local currency equivalent before invoicing.</span>
          ) : null}
        </div>
      </PriceCard>

      {resolvedService.pricingOptions?.length ? (
        <PricingSection>
          <div className="pricing-section__header">
            <span className="pricing-section__eyebrow">Pricing options</span>
            <h3>Choose the scope that fits this request</h3>
            <p>Select an option to prefill the request with the right price, timing, and payment terms.</p>
          </div>

          <div className="pricing-section__grid">
            {resolvedService.pricingOptions.map((option) => {
              const isActive = option.key === selectedPricingOption?.key;

              return (
                <button
                  key={option.key}
                  type="button"
                  className="offer-card"
                  data-active={isActive ? "true" : "false"}
                  onClick={() => setSelectedPricingKey(option.key)}
                >
                  <div className="offer-card__topline">
                    {option.badge ? <span className="offer-card__badge">{option.badge}</span> : <span />}
                    {option.depositLabel ? <span className="offer-card__deposit">{option.depositLabel}</span> : null}
                  </div>
                  <h4>{option.title}</h4>
                  <div className="offer-card__price">{option.priceLabel}</div>
                  <div className="offer-card__timeline">{option.timeline}</div>
                  <p className="offer-card__summary">{option.summary}</p>
                  {option.includes?.length ? (
                    <ul>
                      {option.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </button>
              );
            })}
          </div>
        </PricingSection>
      ) : null}

      {resolvedService.paymentOptions?.length ? (
        <PaymentOptionsCard>
          <div className="payment-options__header">
            <span className="payment-options__eyebrow">Payment options</span>
            <h3>Common payment routes</h3>
            <p>Use these as a guide if you want us to prepare an invoice around a specific entry point.</p>
          </div>

          <div className="payment-options__grid">
            {resolvedService.paymentOptions.map((option) => (
              <div key={`${option.title}-${option.amountLabel}`} className="payment-option">
                <div>
                  <strong>{option.title}</strong>
                  <span>{option.note}</span>
                </div>
                <b>{option.amountLabel}</b>
              </div>
            ))}
          </div>
        </PaymentOptionsCard>
      ) : null}

      <FormCard>
        <div className="form-card__header">
          <span className="form-card__eyebrow">Request service</span>
          <h3>Tell us about your project</h3>
          <p>We will review the request, confirm scope, and get back to you with the next step.</p>
        </div>

        <StyledForm onSubmit={onSubmit} noValidate>
          <HiddenFieldWrapper aria-hidden="true">
            <FieldLabel>
              Website
              <TextInput type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </FieldLabel>
          </HiddenFieldWrapper>

          <HiddenInput type="hidden" value={selectedValues.serviceTitle} {...register("serviceTitle")} />
          <HiddenInput type="hidden" value={selectedValues.serviceLink} {...register("serviceLink")} />
          <HiddenInput type="hidden" value={selectedValues.servicePrice} {...register("servicePrice")} />
          <HiddenInput type="hidden" value={selectedValues.serviceSummary} {...register("serviceSummary")} />
          <HiddenInput type="hidden" value={selectedValues.serviceTimeline} {...register("serviceTimeline")} />
          <HiddenInput type="hidden" value={selectedValues.paymentTerms} {...register("paymentTerms")} />

          <TwoColumnFields>
            <FieldLabel>
              First name
              <TextInput type="text" autoComplete="given-name" {...register("firstName")} />
              <FieldError message={errors.firstName?.message} />
            </FieldLabel>

            <FieldLabel>
              Last name
              <TextInput type="text" autoComplete="family-name" {...register("lastName")} />
              <FieldError message={errors.lastName?.message} />
            </FieldLabel>
          </TwoColumnFields>

          <TwoColumnFields>
            <FieldLabel>
              Work email
              <TextInput type="email" autoComplete="email" {...register("workEmail")} />
              <FieldError message={errors.workEmail?.message} />
            </FieldLabel>

            <FieldLabel>
              Phone number
              <TextInput type="tel" autoComplete="tel" {...register("phoneNumber")} />
              <FieldError message={errors.phoneNumber?.message} />
            </FieldLabel>
          </TwoColumnFields>

          <TwoColumnFields>
            <FieldLabel>
              Company name
              <TextInput type="text" autoComplete="organization" {...register("companyName")} />
              <FieldError message={errors.companyName?.message} />
            </FieldLabel>

            <FieldLabel>
              Company address
              <TextInput type="text" autoComplete="street-address" {...register("companyAddress")} />
              <FieldError message={errors.companyAddress?.message} />
            </FieldLabel>
          </TwoColumnFields>

          <FieldLabel>
            Project notes
            <MessageInput
              placeholder={`Tell us what you need, key deadlines, and anything specific about ${resolvedService.title}.`}
              {...register("notes")}
            />
            <FieldError message={errors.notes?.message} />
          </FieldLabel>

          <ActionsRow>
            <Button type="submit" loading={isSubmitting} loadingText="Sending">
              Send project request
            </Button>
          </ActionsRow>

          {submitState.message ? (
            <SubmitMessage $status={submitState.status}>{submitState.message}</SubmitMessage>
          ) : null}
        </StyledForm>
      </FormCard>
    </DrawerContentShell>
  );
}

const DrawerContentShell = styled.div`
  display: grid;
  gap: 1rem;
  color: #111;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow-x: hidden;
`;

const sharedCardStyles = `
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 1.5rem;
  background: #fff;
  padding: 1rem;

  @media (min-width: 48rem) {
    padding: 1.25rem;
  }
`;

const SummaryCard = styled.section`
  ${sharedCardStyles}
  display: grid;
  gap: 1rem;

  @media (min-width: 48rem) {
    grid-template-columns: minmax(0, 220px) minmax(0, 1fr);
  }

  img {
    width: 100%;
    min-height: 12rem;
    object-fit: cover;
    border-radius: 1.25rem;
  }

  .summary-card__content {
    display: grid;
    gap: 0.85rem;
  }

  .summary-card__eyebrow,
  .summary-card__label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #767676;
  }

  .summary-card__copy,
  .summary-card__meta,
  .summary-card__details p {
    color: #4f4f4f;
    line-height: 1.6;
  }

  .summary-card__details {
    display: grid;
    gap: 0.85rem;

    @media (min-width: 40rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .summary-card__signals {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .summary-card__signals span {
    display: inline-flex;
    align-items: center;
    min-height: 2.25rem;
    padding: 0.55rem 0.85rem;
    border-radius: 999px;
    background: #f6f4ef;
    color: #3f3a2f;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .summary-card__link {
    width: fit-content;
    color: #111;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
  }
`;

const PriceCard = styled.section`
  ${sharedCardStyles}
  display: grid;
  gap: 0.75rem;

  .price-card__eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #767676;
  }

  .price-card__price .price-meta {
    display: block;
  }

  .price-card__price .price-badge,
  .price-card__price .price-badge--loading {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    font-size: clamp(2rem, 5vw, 3.25rem);
    line-height: 1;
    font-weight: 800;
    color: #111;
    background: transparent;
    border: 0;
    padding: 0;
    border-radius: 0;
  }

  .price-card__price .price-loader {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 999px;
    border: 2px solid rgba(17, 17, 17, 0.18);
    border-top-color: #111;
    animation: service-request-price-spin 0.8s linear infinite;
  }

  .price-card__caption {
    color: #666;
    line-height: 1.5;
  }

  .price-card__timeline {
    color: #4f4f4f;
    font-weight: 600;
  }

  .price-card__notice {
    display: grid;
    gap: 0.35rem;
    padding: 0.9rem 1rem;
    border-radius: 1rem;
    background: #f7f3ea;
    color: #4f4431;
  }

  .price-card__notice strong {
    color: #111;
  }

  .price-card__notice span {
    font-size: 0.875rem;
    color: #6b5d43;
  }

  @keyframes service-request-price-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const StaticPrice = styled.div`
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1;
  font-weight: 800;
  color: #111;
`;

const PricingSection = styled.section`
  ${sharedCardStyles}
  display: grid;
  gap: 1rem;

  .pricing-section__header {
    display: grid;
    gap: 0.35rem;
  }

  .pricing-section__eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #767676;
  }

  h3 {
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    line-height: 1.1;
    font-weight: 800;
  }

  p {
    color: #666;
    line-height: 1.6;
  }

  .pricing-section__grid {
    display: grid;
    gap: 0.85rem;

    @media (min-width: 48rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .offer-card {
    display: grid;
    gap: 0.7rem;
    text-align: left;
    padding: 1rem;
    border-radius: 1.25rem;
    border: 1px solid rgba(17, 17, 17, 0.1);
    background: #fcfcfb;
    transition: border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
  }

  .offer-card[data-active="true"] {
    border-color: #111;
    box-shadow: 0 18px 34px rgba(17, 17, 17, 0.08);
    transform: translateY(-1px);
    background: #fff;
  }

  .offer-card__topline {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .offer-card__badge,
  .offer-card__deposit {
    display: inline-flex;
    align-items: center;
    min-height: 2rem;
    padding: 0.35rem 0.7rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .offer-card__badge {
    background: #f0ede6;
    color: #4f4431;
  }

  .offer-card__deposit {
    background: #f7f7f7;
    color: #555;
  }

  h4 {
    font-size: 1.125rem;
    line-height: 1.2;
    font-weight: 800;
    color: #111;
  }

  .offer-card__price {
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    line-height: 1;
    font-weight: 800;
    color: #111;
  }

  .offer-card__timeline {
    font-size: 0.95rem;
    font-weight: 600;
    color: #4f4f4f;
  }

  .offer-card__summary {
    color: #666;
    line-height: 1.55;
  }

  ul {
    display: grid;
    gap: 0.55rem;
    padding-left: 1rem;
    color: #444;
    line-height: 1.5;
  }
`;

const PaymentOptionsCard = styled.section`
  ${sharedCardStyles}
  display: grid;
  gap: 1rem;

  .payment-options__header {
    display: grid;
    gap: 0.35rem;
  }

  .payment-options__eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #767676;
  }

  h3 {
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    line-height: 1.1;
    font-weight: 800;
  }

  p {
    color: #666;
    line-height: 1.6;
  }

  .payment-options__grid {
    display: grid;
    gap: 0.75rem;
  }

  .payment-option {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: flex-start;
    padding: 0.95rem 1rem;
    border-radius: 1rem;
    background: #fbfaf7;
    border: 1px solid rgba(17, 17, 17, 0.08);
  }

  .payment-option div {
    display: grid;
    gap: 0.3rem;
  }

  .payment-option strong,
  .payment-option b {
    color: #111;
  }

  .payment-option span {
    color: #666;
    line-height: 1.5;
  }
`;

const OfferIntroCard = styled.section`
  ${sharedCardStyles}
  display: grid;
  gap: 0.6rem;

  .offer-intro__eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #767676;
  }

  h3 {
    font-size: clamp(1.2rem, 2vw, 1.7rem);
    line-height: 1.1;
    font-weight: 800;
    color: #111;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const OffersListCard = styled.section`
  ${sharedCardStyles}
  display: grid;
  gap: 1rem;

  .offers-list__header {
    display: grid;
    gap: 0.35rem;
  }

  .offers-list__eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #767676;
  }

  h3 {
    font-size: clamp(1.2rem, 2vw, 1.7rem);
    line-height: 1.1;
    font-weight: 800;
    color: #111;
  }

  p {
    color: #666;
    line-height: 1.6;
  }

  .offers-list__grid {
    display: grid;
    gap: 0.85rem;
  }

  .offer-preview {
    display: grid;
    gap: 0.65rem;
    width: 100%;
    padding: 1rem;
    border-radius: 1.25rem;
    border: 1px solid rgba(17, 17, 17, 0.08);
    background: #fcfcfb;
    min-width: 0;
    text-align: left;
    transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
  }

  .offer-preview:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 34px rgba(17, 17, 17, 0.08);
    border-color: rgba(17, 17, 17, 0.16);
  }

  .offer-preview__topline {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .offer-preview__index,
  .offer-preview__timeline {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #767676;
  }

  h4 {
    font-size: 1.1rem;
    line-height: 1.2;
    font-weight: 800;
    color: #111;
  }

  .offer-preview__price {
    font-size: clamp(1.2rem, 2vw, 1.55rem);
    line-height: 1.15;
    font-weight: 800;
    color: #111;
  }

  .offer-preview__description {
    color: #555;
    line-height: 1.6;
  }

  .offer-preview__guidance {
    padding: 0.85rem 0.95rem;
    border-radius: 1rem;
    background: #f7f3ea;
    color: #4f4431;
    line-height: 1.55;
  }
`;

const DrawerScreensViewport = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
`;

const DrawerScreensTrack = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 100%));
  width: 200%;
  transform: translateX(0%);
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);

  &[data-detail-open="true"] {
    transform: translateX(-50%);
  }
`;

const DrawerScreen = styled.div`
  min-width: 0;
  width: 100%;
  display: grid;
  gap: 1rem;
  padding-right: 0.25rem;
`;

const OfferDetailCard = styled.section`
  ${sharedCardStyles}
  display: grid;
  gap: 0.85rem;

  .offer-detail__back {
    width: fit-content;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 2.5rem;
    padding: 0.55rem 0.9rem;
    border-radius: 999px;
    border: 1px solid rgba(17, 17, 17, 0.12);
    background: #fff;
    color: #111;
    font-weight: 700;
  }

  .offer-detail__eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #767676;
  }

  h3 {
    font-size: clamp(1.35rem, 2.3vw, 2rem);
    line-height: 1.1;
    font-weight: 800;
    color: #111;
  }

  .offer-detail__price {
    font-size: clamp(1.5rem, 3vw, 2rem);
    line-height: 1.1;
    font-weight: 800;
    color: #111;
  }

  .offer-detail__timeline {
    color: #4f4f4f;
    font-weight: 600;
  }

  .offer-detail__description,
  .offer-detail__note p {
    color: #666;
    line-height: 1.65;
  }

  .offer-detail__section {
    display: grid;
    gap: 0.7rem;
    padding: 1rem;
    border-radius: 1.15rem;
    background: #fcfcfb;
    border: 1px solid rgba(17, 17, 17, 0.08);
  }

  .offer-detail__note {
    background: #f7f3ea;
  }

  h4 {
    font-size: 1rem;
    line-height: 1.2;
    font-weight: 800;
    color: #111;
  }

  ul {
    display: grid;
    gap: 0.6rem;
    padding-left: 1rem;
    color: #444;
    line-height: 1.55;
  }
`;

const FormCard = styled.section`
  ${sharedCardStyles}

  .form-card__header {
    display: grid;
    gap: 0.35rem;
    margin-bottom: 1rem;
  }

  .form-card__eyebrow {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #767676;
  }

  h3 {
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    line-height: 1.1;
    font-weight: 800;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const StyledForm = styled.form`
  display: grid;
  gap: 1rem;
  position: relative;
`;

const HiddenFieldWrapper = styled.div`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const HiddenInput = styled.input`
  display: none;
`;

const TwoColumnFields = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 40rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FieldLabel = styled.label`
  display: grid;
  gap: 0.5rem;
  color: #000;
  font-size: 0.875rem;
  font-weight: 500;
`;

const inputStyles = `
  min-height: 3rem;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 1rem;
  background: #fff;
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 160ms ease;

  &:focus {
    border-color: #111;
  }
`;

const TextInput = styled.input`
  ${inputStyles}
`;

const MessageInput = styled.textarea`
  ${inputStyles}
  min-height: 9rem;
  border-radius: 1.25rem;
  resize: vertical;
`;

const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 0.25rem;
  button {
    border-radius: 30px;
  }
`;

const FieldErrorText = styled.span`
  font-size: 0.8125rem;
  color: #c62828;
`;

const SubmitMessage = styled.p<{ $status: SubmitState["status"] }>`
  margin: 0;
  padding: 0.85rem 1rem;
  border-radius: 1rem;
  background: ${({ $status }) => ($status === "success" ? "#edf7ef" : $status === "error" ? "#fff2f2" : "transparent")};
  color: ${({ $status }) => ($status === "success" ? "#1f5f2f" : $status === "error" ? "#9f1c1c" : "#666")};
`;

const EmptyState = styled.div`
  ${sharedCardStyles}
  color: #666;
`;