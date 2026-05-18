"use client";

import { useState } from "react";
import styled from "styled-components";
import PageV0 from "@/components/ui/page-v0/PageV0";
import { getPublicErrorMessage } from "@/lib/publicError";
import LocalizedServicePrice from "../services/LocalizedServicePrice";
import useReactForm from "@/hooks/useReactForm";
import {
  monthlySupportRequestFormSchema,
  type MonthlySupportRequestFormValues,
} from "@/app/monthly-support/monthlySupportFormSchema";

const MONTHLY_SUPPORT_PLANS = [
  {
    key: "brand-care",
    title: "Brand Care",
    usdPrice: "499",
    localAnchor: "about R9,500",
    bestFor:
      "Small businesses that need consistent design help every month without handing over full campaign pressure.",
    activeRequests: "1 active request at a time",
    taskLimit: "Up to 10 small design tasks per month",
    turnaround: "48-72 hour average turnaround per small task",
    isPopular: false,
    features: [
      "Social media graphics",
      "WhatsApp flyers and status graphics",
      "Price list and menu updates",
      "Simple ad creatives",
      "Basic document polishing",
      "Minor website image or text updates",
      "Trello client board",
      "Cancel anytime",
    ],
  },
  {
    key: "campaign-support",
    title: "Campaign Support",
    usdPrice: "999",
    localAnchor: "about R18,500",
    bestFor:
      "Businesses running offers, launches, events, promotions, or monthly campaigns that need design linked to revenue.",
    activeRequests: "2 active requests at a time",
    taskLimit: "Up to 20 design tasks per month",
    turnaround: "Priority turnaround",
    isPopular: true,
    features: [
      "Everything in Brand Care",
      "Monthly campaign concept",
      "Ad creative set",
      "Social post and story set",
      "Landing page section updates",
      "Email or newsletter design",
      "Sales flyer or pitch PDF",
      "Canva or Figma handover where needed",
      "Light copy refinement",
    ],
  },
  {
    key: "creative-partner",
    title: "Creative Partner",
    usdPrice: "1999",
    localAnchor: "about R37,000",
    bestFor:
      "Founders, churches, agencies, startups, real estate brands, and service businesses that need Bodilum as a part-time creative department.",
    activeRequests: "3 active requests at a time",
    taskLimit: "Up to 35 design or support tasks per month",
    turnaround: "Faster turnaround",
    isPopular: false,
    features: [
      "Everything in Campaign Support",
      "Monthly brand and marketing direction call",
      "Campaign design system support",
      "Landing page or website improvement support",
      "Sales deck, proposal, and presentation design",
      "Motion graphics and light animation support",
      "AI-assisted content or design workflow setup",
      "Brand consistency checks",
      "Dedicated Trello workflow",
    ],
  },
] as const;

const SHARED_GUARDRAILS = [
  "Submit requests into your queue and we work through them based on your plan and active request limit.",
  "Monthly support covers ongoing creative production, brand continuity, and light web support - not full websites or full brand identity projects.",
  "Brand identity work starts as a separate upfront package, then monthly support helps your business stay consistent afterward.",
];

const SUPPORT_TYPE_OPTIONS = [
  { value: "design-only", label: "Design only" },
  { value: "web-support", label: "Web support" },
  { value: "motion", label: "Motion" },
  { value: "ai-workflows", label: "AI workflows" },
  { value: "all", label: "All" },
] as const;

const BUDGET_OPTIONS = [
  "$2,500-$5,000/month",
  "$5,000-$10,000/month",
  "$10,000+/month",
] as const;

const URGENCY_OPTIONS = ["Immediately", "Within 30 days", "Exploring"] as const;

type SubscriptionResponse = {
  approveUrl?: string;
  internalSubscriptionId?: string;
  error?: string;
};

function MonthlySupportPage() {
  const [isSubmittingPlanKey, setIsSubmittingPlanKey] = useState<string | null>(null);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null);
  const [requestState, setRequestState] = useState<{
    kind: "idle" | "success" | "error";
    message: string;
  }>({ kind: "idle", message: "" });

  const form = useReactForm<MonthlySupportRequestFormValues>({
    schema: monthlySupportRequestFormSchema,
    defaultValues: {
      businessName: "",
      websiteOrSocialLink: "",
      industry: "",
      monthlyDesignNeeds: "",
      brandCount: "1",
      supportTypes: [],
      expectedRequestsPerMonth: "",
      budgetRange: undefined,
      urgency: undefined,
      email: "",
      whatsapp: "",
      website: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const startSubscription = async (planKey: string) => {
    setIsSubmittingPlanKey(planKey);
    setSubscriptionError(null);

    try {
      const response = await fetch("/api/paypal/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planKey }),
      });
      const payload = (await response.json().catch(() => null)) as SubscriptionResponse | null;

      if (!response.ok || !payload?.approveUrl) {
        throw new Error(payload?.error || "Could not start the PayPal subscription checkout.");
      }

      window.location.assign(payload.approveUrl);
    } catch (error) {
      setSubscriptionError(
        getPublicErrorMessage({
          internalMessage: error instanceof Error ? error.message : undefined,
          publicMessage: "We could not start the PayPal checkout right now. Please try again shortly.",
        }),
      );
      setIsSubmittingPlanKey(null);
    }
  };

  const submitCustomRequest = handleSubmit(async (values) => {
    setRequestState({ kind: "idle", message: "" });

    try {
      const response = await fetch("/api/monthly-support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(payload?.message || "Could not send your monthly support request.");
      }

      setRequestState({
        kind: "success",
        message: payload?.message || "Your request has been sent.",
      });
      reset();
    } catch (error) {
      setRequestState({
        kind: "error",
        message: getPublicErrorMessage({
          internalMessage: error instanceof Error ? error.message : undefined,
          publicMessage: "We could not send your request right now. Please try again shortly.",
        }),
      });
    }
  });

  return (
    <PageV0>
      <MonthlySupportPageShell>
        {/* <section className="hero-panel">
          <div className="hero-panel__intro">
            <span className="hero-panel__eyebrow">Monthly Support</span>
            <h1>Ongoing premium creative support for businesses that need consistent assets every month.</h1>
            <p>
              Bodilum monthly support is for businesses that need steady brand, marketing, and web
              asset production without hiring a full-time designer or carrying a full agency team.
            </p>
          </div>

          <div className="hero-panel__notes">
            <div className="hero-note-card">
              <strong>Queue-based support</strong>
              <p>Submit requests into your queue. We work through them based on your plan and active request limit.</p>
            </div>
            <div className="hero-note-card">
              <strong>Built to protect quality</strong>
              <p>Ongoing support covers creative production, campaign assets, and light web updates - not vague unlimited work.</p>
            </div>
          </div>
        </section> */}

        <section className="plans-panel">
          <div className="section-heading">
            <span>Plans</span>
            <h2>Three monthly support plans, one clear growth ladder.</h2>
            <p>
              Start with maintenance, move into campaigns, then upgrade into part-time creative department support.
            </p>
          </div>

          {subscriptionError ? <p className="form-message form-message--error">{subscriptionError}</p> : null}

          <div className="plans-grid">
            {MONTHLY_SUPPORT_PLANS.map((plan) => (
              <article
                key={plan.key}
                className={`plan-card${plan.isPopular ? " plan-card--featured" : ""}`}
              >
                <div className="plan-card__top">
                  <div>
                    <div className="plan-card__badge-row">
                      <span className="plan-card__label">{plan.title}</span>
                      {plan.isPopular ? <span className="plan-card__badge">Most Popular</span> : null}
                    </div>
                    <p className="plan-card__best-for">{plan.bestFor}</p>
                  </div>

                  <div className="plan-card__price-group">
                    <div className="plan-card__price-local">
                      <LocalizedServicePrice price={plan.usdPrice} />
                      <span>/ month</span>
                    </div>
                    {/* <p className="plan-card__price-usd">${plan.usdPrice}/month · {plan.localAnchor}</p> */}
                    {/* <p className="plan-card__price-usd">${plan.usdPrice}/month</p> */}
                  </div>
                </div>

                <div className="plan-card__meta-grid">
                  <div>
                    <span className="plan-card__meta-label">Capacity</span>
                    <p>{plan.activeRequests}</p>
                  </div>
                  <div>
                    <span className="plan-card__meta-label">Volume</span>
                    <p>{plan.taskLimit}</p>
                  </div>
                  <div>
                    <span className="plan-card__meta-label">Turnaround</span>
                    <p>{plan.turnaround}</p>
                  </div>
                </div>

                <ul className="plan-card__feature-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="plan-card__action"
                  onClick={() => startSubscription(plan.key)}
                  disabled={isSubmittingPlanKey !== null}
                >
                  {isSubmittingPlanKey === plan.key ? "Redirecting to PayPal..." : `Start ${plan.title}`}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* <section className="guardrails-panel">
          <div className="section-heading section-heading--compact">
            <span>How It Works</span>
            <h2>Clear monthly production, not open-ended promises.</h2>
          </div>

          <div className="guardrails-grid">
            {SHARED_GUARDRAILS.map((guardrail) => (
              <div key={guardrail} className="guardrail-card">
                <p>{guardrail}</p>
              </div>
            ))}
          </div>
        </section> */}

        <section className="custom-panel">
          <div className="section-heading">
            <span>Custom Subscription</span>
            <h2>Need more than this? Request a custom creative subscription.</h2>
            <p>
              For businesses, agencies, churches, startups, and teams that need larger monthly creative capacity,
              website support, AI workflows, motion design, or multiple brands managed every month.
            </p>
          </div>

          <div className="custom-panel__content">
            <div className="custom-panel__copy">
              <div className="custom-info-card">
                <strong>Ideal for larger teams</strong>
                <p>
                  Multi-brand support, campaign-heavy operations, motion requests, AI-enabled production, and more structured monthly pipelines.
                </p>
              </div>
              <div className="custom-info-card">
                <strong>Budget guidance</strong>
                <p>
                  Custom subscriptions start where standard plans stop and scale based on monthly request volume, team complexity, and delivery speed.
                </p>
              </div>
            </div>

            <form className="custom-form" onSubmit={submitCustomRequest} noValidate>
              <div className="form-grid">
                <label className="field">
                  <span>Business name</span>
                  <input type="text" {...register("businessName")} />
                  {errors.businessName ? <small>{errors.businessName.message}</small> : null}
                </label>

                <label className="field">
                  <span>Website or social link</span>
                  <input type="url" placeholder="https://" {...register("websiteOrSocialLink")} />
                  {errors.websiteOrSocialLink ? <small>{errors.websiteOrSocialLink.message}</small> : null}
                </label>

                <label className="field">
                  <span>Industry</span>
                  <input type="text" {...register("industry")} />
                  {errors.industry ? <small>{errors.industry.message}</small> : null}
                </label>

                <label className="field">
                  <span>How many brands or accounts do you manage?</span>
                  <input type="number" min="1" {...register("brandCount")} />
                  {errors.brandCount ? <small>{errors.brandCount.message}</small> : null}
                </label>

                <label className="field field--full">
                  <span>Monthly design needs</span>
                  <textarea rows={5} {...register("monthlyDesignNeeds")} />
                  {errors.monthlyDesignNeeds ? <small>{errors.monthlyDesignNeeds.message}</small> : null}
                </label>

                <label className="field">
                  <span>Expected number of requests per month</span>
                  <input type="text" {...register("expectedRequestsPerMonth")} />
                  {errors.expectedRequestsPerMonth ? <small>{errors.expectedRequestsPerMonth.message}</small> : null}
                </label>

                <label className="field">
                  <span>Budget range</span>
                  <select defaultValue="" {...register("budgetRange")}>
                    <option value="" disabled>Select a range</option>
                    {BUDGET_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.budgetRange ? <small>{errors.budgetRange.message}</small> : null}
                </label>

                <label className="field">
                  <span>Urgency</span>
                  <select defaultValue="" {...register("urgency")}>
                    <option value="" disabled>Select urgency</option>
                    {URGENCY_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.urgency ? <small>{errors.urgency.message}</small> : null}
                </label>

                <label className="field">
                  <span>Email</span>
                  <input type="email" {...register("email")} />
                  {errors.email ? <small>{errors.email.message}</small> : null}
                </label>

                <label className="field">
                  <span>WhatsApp</span>
                  <input type="text" {...register("whatsapp")} />
                  {errors.whatsapp ? <small>{errors.whatsapp.message}</small> : null}
                </label>

                <fieldset className="field field--full checkbox-group">
                  <span>Do you need design only, web support, motion, AI workflows, or all?</span>
                  <div className="checkbox-grid">
                    {SUPPORT_TYPE_OPTIONS.map((option) => (
                      <label key={option.value} className="checkbox-pill">
                        <input type="checkbox" value={option.value} {...register("supportTypes")} />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.supportTypes ? <small>{errors.supportTypes.message as string}</small> : null}
                </fieldset>

                <input type="text" tabIndex={-1} autoComplete="off" className="honeypot" {...register("website")} />
              </div>

              {requestState.kind !== "idle" ? (
                <p className={`form-message form-message--${requestState.kind}`}>{requestState.message}</p>
              ) : null}

              <button type="submit" className="custom-form__submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending request..." : "Request Custom Subscription"}
              </button>
            </form>
          </div>
        </section>
      </MonthlySupportPageShell>
    </PageV0>
  );
}

export default MonthlySupportPage;

const MonthlySupportPageShell = styled.div`
  --paper: #f8f3ea;
  --ink: #141414;
  --muted: #6a655d;
  --line: rgba(20, 20, 20, 0.08);
  --card: rgba(255, 255, 255, 0.86);
  --accent: #efe6d4;

  width: min(1240px, 92%);
  display: grid;
  gap: 1.5rem;
  padding: 2rem 0 4rem;

  .hero-panel,
  .plans-panel,
  .guardrails-panel,
  .custom-panel {
    border: 1px solid var(--line);
    border-radius: 1.75rem;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0.86)),
      radial-gradient(circle at top left, rgba(239, 230, 212, 0.9), transparent 45%);
    padding: clamp(1.1rem, 2vw, 1.6rem);
    box-shadow: 0 18px 40px rgba(16, 16, 16, 0.06);
  }

  .hero-panel {
    display: grid;
    gap: 1.2rem;

    @media (min-width: 64rem) {
      grid-template-columns: minmax(0, 1.45fr) minmax(20rem, 0.85fr);
      align-items: stretch;
    }
  }

  .hero-panel__intro {
    display: grid;
    gap: 1rem;
  }

  .hero-panel__eyebrow,
  .section-heading span,
  .drawer-eyebrow {
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #7b7366;
  }

  h1,
  h2,
  h3 {
    color: var(--ink);
    line-height: 0.95;
  }

  .hero-panel h1 {
    font-size: clamp(2.8rem, 7vw, 6rem);
    max-width: 12ch;
  }

  .hero-panel p,
  .section-heading p,
  .custom-info-card p,
  .guardrail-card p,
  .plan-card__best-for,
  .plan-card__price-usd,
  .plan-card__meta-grid p,
  .plan-card__feature-list li,
  .field span,
  .form-message,
  .checkbox-pill span {
    color: var(--muted);
    line-height: 1.6;
  }

  .hero-panel__notes {
    display: grid;
    gap: 0.85rem;
  }

  .hero-note-card,
  .guardrail-card,
  .custom-info-card {
    display: grid;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: 1.25rem;
    background: var(--paper);
    border: 1px solid rgba(20, 20, 20, 0.06);
  }

  .hero-note-card strong,
  .custom-info-card strong {
    font-size: 1rem;
    font-weight: 800;
    color: var(--ink);
  }

  .section-heading {
    display: grid;
    gap: 0.5rem;
    max-width: 48rem;
    margin-bottom: 1rem;
  }

  .section-heading h2 {
    font-size: clamp(1.8rem, 4vw, 3.25rem);
  }

  .section-heading--compact {
    margin-bottom: 0.8rem;
  }

  .plans-grid {
    display: grid;
    gap: 1rem;

    @media (min-width: 68rem) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .plan-card {
    display: grid;
    gap: 1rem;
    padding: 1.05rem;
    border-radius: 1.4rem;
    border: 1px solid var(--line);
    background: var(--card);
  }

  .plan-card--featured {
    background: linear-gradient(180deg, #fff, #f7f0e2);
    border-color: rgba(20, 20, 20, 0.14);
  }

  .plan-card__top,
  .plan-card__meta-grid,
  .plan-card__feature-list {
    display: grid;
    gap: 0.85rem;
  }

  .plan-card__badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    align-items: center;
    margin-bottom: 0.35rem;
  }

  .plan-card__label,
  .plan-card__badge,
  .plan-card__meta-label {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .plan-card__label,
  .plan-card__meta-label {
    color: #7b7366;
  }

  .plan-card__badge {
    padding: 0.32rem 0.55rem;
    border-radius: 999px;
    background: #111;
    color: #fff;
  }

  .plan-card__best-for {
    min-height: 5rem;
  }

  .plan-card__price-group {
    display: grid;
    gap: 0.35rem;
  }

  .plan-card__price-local {
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
    flex-wrap: wrap;
    color: var(--ink);
    font-size: clamp(1.35rem, 3vw, 2.15rem);
    font-weight: 900;
  }

  .plan-card__price-local .price-meta,
  .plan-card__price-local .price-badge {
    color: inherit;
    font: inherit;
    background: transparent;
    padding: 0;
    border-radius: 0;
  }

  .plan-card__meta-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .plan-card__meta-grid div {
    padding: 0.8rem;
    border-radius: 1rem;
    background: #fff;
    border: 1px solid var(--line);
  }

  .plan-card__feature-list {
    padding-left: 1rem;
  }

  .plan-card__action,
  .custom-form__submit {
    min-height: 3.2rem;
    padding: 0.9rem 1.1rem;
    border: 0;
    border-radius: 999px;
    background: #111;
    color: #fff;
    font-weight: 800;
    cursor: pointer;
  }

  .plan-card__action:disabled,
  .custom-form__submit:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  .guardrails-grid {
    display: grid;
    gap: 0.9rem;

    @media (min-width: 62rem) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .custom-panel__content {
    display: grid;
    gap: 1rem;

    @media (min-width: 64rem) {
      grid-template-columns: minmax(18rem, 0.8fr) minmax(0, 1.2fr);
      align-items: start;
    }
  }

  .custom-panel__copy {
    display: grid;
    gap: 0.85rem;
  }

  .custom-form {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1.4rem;
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid var(--line);
  }

  .form-grid {
    display: grid;
    gap: 0.9rem;

    @media (min-width: 48rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .field {
    display: grid;
    gap: 0.45rem;
    min-width: 0;
  }

  .field--full {
    grid-column: 1 / -1;
  }

  .field input,
  .field textarea,
  .field select {
    width: 100%;
    min-width: 0;
    min-height: 3rem;
    padding: 0.85rem 0.95rem;
    border-radius: 1rem;
    border: 1px solid var(--line);
    background: #fff;
    color: #111;
  }

  .field textarea {
    min-height: 8rem;
    resize: vertical;
  }

  .field small,
  .form-message--error {
    color: #a11a1a;
  }

  .form-message--success {
    color: #166534;
  }

  .checkbox-group {
    padding: 0;
    border: 0;
    margin: 0;
  }

  .checkbox-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
  }

  .checkbox-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.7rem 0.95rem;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: #fff;
  }

  .checkbox-pill input {
    margin: 0;
  }

  .honeypot {
    position: absolute;
    left: -9999px;
    opacity: 0;
    pointer-events: none;
  }
`;