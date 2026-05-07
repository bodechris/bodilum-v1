"use client";

import { Button } from "@chakra-ui/react";
import { useGlobalAppStates } from "@bod/utils/contexts/GlobalAppVarProvider";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useReactForm from "@/hooks/useReactForm";
import LocalizedServicePrice from "./LocalizedServicePrice";
import { ServiceDrawerPayload } from "./ServiceSectionDrawerContext";
import {
  serviceRequestFormSchema,
  type ServiceRequestFormValues,
} from "./serviceRequestFormSchema";

const DEPOSIT_THRESHOLD_ZAR = 11_000;
const PRICE_ROUNDING_INCREMENT = 500;

type ServiceRequestDrawerContentProps = {
  service: ServiceDrawerPayload | null;
  onClose: () => void;
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

function buildDefaultValues(service: ServiceDrawerPayload | null, paymentTerms: string): ServiceRequestFormValues {
  return {
    firstName: "",
    lastName: "",
    workEmail: "",
    phoneNumber: "",
    companyName: "",
    companyAddress: "",
    notes: "",
    website: "",
    serviceTitle: service?.title ?? "",
    serviceLink: service?.link ?? "",
    servicePrice: service?.price ?? "",
    serviceSummary: service?.summary ?? service?.description ?? "",
    serviceTimeline: service?.timeline ?? "",
    paymentTerms,
  };
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <FieldErrorText>{message}</FieldErrorText>;
}

export default function ServiceRequestDrawerContent({
  service,
  onClose,
}: ServiceRequestDrawerContentProps) {
  const { currencyCode, isExchangeRateLoading, usdExchangeRate } = useGlobalAppStates();
  const [zarExchangeRate, setZarExchangeRate] = useState<number | null>(
    currencyCode === "ZAR" ? usdExchangeRate : null,
  );
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: null,
  });

  const basePrice = useMemo(() => parseServiceBasePrice(service?.price), [service?.price]);

  useEffect(() => {
    if (currencyCode === "ZAR") {
      setZarExchangeRate(usdExchangeRate);
      return;
    }

    let isCancelled = false;

    async function loadZarExchangeRate() {
      try {
        const response = await fetch("/api/forex?currency=ZAR", {
          cache: "no-store",
        });

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
    if (!zarExchangeRate || !Number.isFinite(zarExchangeRate) || zarExchangeRate <= 0) {
      return null;
    }

    const usdThreshold = DEPOSIT_THRESHOLD_ZAR / zarExchangeRate;
    const localRate = currencyCode === "USD" ? 1 : usdExchangeRate;
    const localValue = Math.round((usdThreshold * localRate) / PRICE_ROUNDING_INCREMENT)
      * PRICE_ROUNDING_INCREMENT;

    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(localValue);
  }, [currencyCode, usdExchangeRate, zarExchangeRate]);

  const paymentTerms = useMemo(() => {
    if (!basePrice || !zarExchangeRate) {
      return "Projects below R11,000 are paid in full before kickoff. Projects at R11,000 and above start with a 50% upfront payment.";
    }

    const priceInZar = basePrice * zarExchangeRate;

    if (priceInZar < DEPOSIT_THRESHOLD_ZAR) {
      return "This project falls below R11,000, so full payment is required before work begins.";
    }

    return "This project is at or above R11,000, so we begin with a 50% upfront payment.";
  }, [basePrice, zarExchangeRate]);

  const defaultValues = useMemo(
    () => buildDefaultValues(service, paymentTerms),
    [paymentTerms, service],
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
    reset(defaultValues);
    setSubmitState({ status: "idle", message: null });
  }, [defaultValues, reset]);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState({ status: "idle", message: null });

    const response = await fetch("/api/service-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    if (!response.ok) {
      setSubmitState({
        status: "error",
        message: payload?.message ?? "We could not send your request. Please try again.",
      });
      return;
    }

    reset(buildDefaultValues(service, paymentTerms));
    setSubmitState({
      status: "success",
      message: payload?.message ?? "Your request has been sent. We will reply shortly.",
    });
  });

  if (!service) {
    return (
      <EmptyState>
        <p>Choose a service to see a short project summary and request form here.</p>
      </EmptyState>
    );
  }

  const deliverablesSummary = summarizeDeliverables(service.deliverables);
  const isStartingAtPrice = Boolean(service.price?.trim().startsWith(">="));

  return (
    <DrawerContentShell>
      <SummaryCard>
        {service.thumbnail ? <img src={service.thumbnail} alt={service.title} /> : null}

        <div className="summary-card__content">
          <span className="summary-card__eyebrow">Service summary</span>
          <p className="summary-card__copy">{service.summary ?? service.description}</p>
          {service.bestFor ? (
            <p className="summary-card__meta">
              <strong>Best for:</strong> {service.bestFor}
            </p>
          ) : null}

          <div className="summary-card__details">
            <div>
              <span className="summary-card__label">Deliverables</span>
              <p>{deliverablesSummary}</p>
            </div>
            <div>
              <span className="summary-card__label">Estimated delivery</span>
              <p>{service.timeline ?? "We confirm the final timeline after reviewing your exact scope."}</p>
            </div>
          </div>

          <Link className="summary-card__link" href={service.link}>
            Review the full offer
          </Link>
        </div>
      </SummaryCard>

      <PriceCard>
        <span className="price-card__eyebrow">Project Cost</span>
        <div className="price-card__price">
          <LocalizedServicePrice price={service.price} />
        </div>
        <p className="price-card__caption"></p>
        <div className="price-card__notice" data-loading={isExchangeRateLoading ? "true" : "false"}>
          <strong>Payment terms</strong>
          <p>{paymentTerms}</p>
          {isStartingAtPrice ? <span>Based on the starting price for this offer.</span> : null}
        </div>
      </PriceCard>

      <FormCard>
        <div className="form-card__header">
          <div>
            <span className="form-card__eyebrow">Project request</span>
            <h3>Share your company details</h3>
          </div>
          <p>
            Send the essentials now and we will follow up with next steps, scope confirmation, and scheduling.
          </p>
        </div>

        <StyledForm onSubmit={onSubmit} noValidate>
          <HiddenFieldWrapper aria-hidden="true">
            <label htmlFor="service-request-website">Website</label>
            <input
              id="service-request-website"
              tabIndex={-1}
              type="text"
              autoComplete="off"
              {...register("website")}
            />
          </HiddenFieldWrapper>

          <HiddenInput type="hidden" {...register("serviceTitle")} />
          <HiddenInput type="hidden" {...register("serviceLink")} />
          <HiddenInput type="hidden" {...register("servicePrice")} />
          <HiddenInput type="hidden" {...register("serviceSummary")} />
          <HiddenInput type="hidden" {...register("serviceTimeline")} />
          <HiddenInput type="hidden" {...register("paymentTerms")} />

          <TwoColumnFields>
            <FieldLabel>
              First name
              <TextInput {...register("firstName")} autoComplete="given-name" placeholder="Ada" />
              <FieldError message={errors.firstName?.message} />
            </FieldLabel>

            <FieldLabel>
              Last name
              <TextInput {...register("lastName")} autoComplete="family-name" placeholder="Lovelace" />
              <FieldError message={errors.lastName?.message} />
            </FieldLabel>
          </TwoColumnFields>

          <TwoColumnFields>
            <FieldLabel>
              Work email
              <TextInput
                {...register("workEmail")}
                autoComplete="email"
                placeholder="ada@company.com"
                type="email"
              />
              <FieldError message={errors.workEmail?.message} />
            </FieldLabel>

            <FieldLabel>
              Phone number
              <TextInput
                {...register("phoneNumber")}
                autoComplete="tel"
                placeholder="+27 71 234 5678"
                type="tel"
              />
              <FieldError message={errors.phoneNumber?.message} />
            </FieldLabel>
          </TwoColumnFields>

          <TwoColumnFields>
            <FieldLabel>
              Company name
              <TextInput
                {...register("companyName")}
                autoComplete="organization"
                placeholder="Analytical Engines"
              />
              <FieldError message={errors.companyName?.message} />
            </FieldLabel>

            <FieldLabel>
              Company address
              <TextInput
                {...register("companyAddress")}
                autoComplete="street-address"
                placeholder="12 Long Street, Cape Town"
              />
              <FieldError message={errors.companyAddress?.message} />
            </FieldLabel>
          </TwoColumnFields>

          <FieldLabel>
            Project note
            <MessageInput
              {...register("notes")}
              placeholder="Add anything we should know about the project, decision timeline, constraints, or questions you want answered."
            />
            <FieldError message={errors.notes?.message} />
          </FieldLabel>

          <ActionsRow>
            <Button
              type="submit"
              minH="48px"
              px="1.1rem"
              rounded="full"
              fontWeight="700"
              bg="#111"
              color="#fff"
              borderWidth="1px"
              borderColor="#111"
              loading={isSubmitting}
              loadingText="Sending"
            >
              Send project request
            </Button>

            <Button
              type="button"
              minH="48px"
              px="1.1rem"
              rounded="full"
              fontWeight="700"
              borderWidth="1px"
              borderColor="#d8d8d8"
              bg="#fff"
              color="#111"
              onClick={onClose}
            >
              Close
            </Button>
          </ActionsRow>

          {submitState.message ? (
            <SubmitMessage
              $status={submitState.status}
              role={submitState.status === "error" ? "alert" : "status"}
            >
              {submitState.message}
            </SubmitMessage>
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