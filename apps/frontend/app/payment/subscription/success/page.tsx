"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import PageV0 from "@/components/ui/page-v0/PageV0";
import { getPublicErrorMessage } from "@/lib/publicError";

type SubscriptionDetailsResponse = {
  subscriptionId: string;
  status: string | null;
  subscriberEmail: string | null;
  subscriberName: string | null;
  planId: string | null;
  startTime: string | null;
  error?: string;
};

export default function SubscriptionSuccessPage() {
  const searchParams = useSearchParams();
  const [details, setDetails] = useState<SubscriptionDetailsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscriptionId = searchParams.get("subscription_id");
    const internalSubscriptionId = searchParams.get("internalSubscriptionId") || "";

    if (!subscriptionId) {
      setError("PayPal did not return a subscription id.");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadDetails = async () => {
      try {
        const response = await fetch(
          `/api/paypal/subscription-details?subscriptionId=${encodeURIComponent(subscriptionId)}&internalSubscriptionId=${encodeURIComponent(internalSubscriptionId)}`,
          { cache: "no-store" },
        );
        const payload = (await response.json().catch(() => null)) as SubscriptionDetailsResponse | null;

        if (!response.ok) {
          throw new Error(payload?.error || "Could not verify your PayPal subscription.");
        }

        if (isMounted) {
          setDetails(payload);
        }
      } catch (lookupError) {
        if (isMounted) {
          setError(
            getPublicErrorMessage({
              internalMessage: lookupError instanceof Error ? lookupError.message : undefined,
              publicMessage:
                "We could not confirm your subscription right now. Please contact us if this continues.",
            }),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDetails();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  return (
    <PageV0>
      <SubscriptionStateShell>
        <section className="state-card">
          {isLoading ? (
            <>
              <span className="state-card__eyebrow">Processing subscription</span>
              <h1>Finalising your monthly support subscription.</h1>
              <p>We are confirming the PayPal subscription now.</p>
            </>
          ) : error ? (
            <>
              <span className="state-card__eyebrow">Subscription issue</span>
              <h1>We could not confirm your subscription yet.</h1>
              <p>{error}</p>
            </>
          ) : (
            <>
              <span className="state-card__eyebrow">Subscription active</span>
              <h1>Your monthly support subscription is confirmed.</h1>
              <p>
                We received your PayPal subscription confirmation and will contact you shortly to set up your Trello workflow and onboarding.
              </p>
              <div className="state-card__details">
                {details?.subscriberName ? <p><strong>Name:</strong> {details.subscriberName}</p> : null}
                {details?.subscriberEmail ? <p><strong>Email:</strong> {details.subscriberEmail}</p> : null}
                {details?.status ? <p><strong>Status:</strong> {details.status}</p> : null}
                {details?.subscriptionId ? <p><strong>Subscription ID:</strong> {details.subscriptionId}</p> : null}
              </div>
            </>
          )}

          <div className="state-card__actions">
            <Link href="/contact">Contact Bodilum</Link>
            <Link href="/monthly-support">Back to monthly support</Link>
          </div>
        </section>
      </SubscriptionStateShell>
    </PageV0>
  );
}

const SubscriptionStateShell = styled.div`
  width: min(52rem, 92%);
  min-height: calc(100vh - 8rem);
  display: grid;
  align-items: center;
  padding: 4rem 0;

  .state-card {
    display: grid;
    gap: 1rem;
    padding: clamp(1.25rem, 3vw, 2rem);
    border-radius: 1.5rem;
    border: 1px solid rgba(17, 17, 17, 0.08);
    background: #fff;
  }

  .state-card__eyebrow {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #767676;
  }

  h1 {
    font-size: clamp(2rem, 6vw, 4rem);
    line-height: 0.95;
    color: #111;
  }

  p {
    color: #4f4f4f;
    line-height: 1.65;
  }

  .state-card__details {
    display: grid;
    gap: 0.45rem;
    padding: 1rem;
    border-radius: 1rem;
    background: #fcfcfb;
    border: 1px solid rgba(17, 17, 17, 0.08);
  }

  .state-card__actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .state-card__actions a {
    min-height: 2.9rem;
    padding: 0.8rem 1.1rem;
    border-radius: 999px;
    border: 1px solid rgba(17, 17, 17, 0.12);
    color: #111;
    font-weight: 700;
    text-decoration: none;
  }
`;