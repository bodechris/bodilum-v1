"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import PageV0 from "@/components/ui/page-v0/PageV0";
import { getPublicErrorMessage } from "@/lib/publicError";

type CaptureResponse = {
  internalOrderId: string | null;
  paypalOrderId: string;
  paypalCaptureId?: string;
  amountUsd: number | null;
  currency: string;
  directionTitle: string | null;
  offerName: string | null;
  selectedDesignIndexes: number[];
  selectedMedia: string[];
  status: string;
  error?: string;
};

function formatUsd(amount: number | null) {
  if (amount === null) {
    return null;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<CaptureResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get("token");
    const internalOrderId = searchParams.get("internalOrderId") || undefined;

    if (!orderId) {
      setError("PayPal did not return an order token.");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const captureOrder = async () => {
      try {
        const response = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId, internalOrderId }),
        });
        const payload = (await response.json().catch(() => null)) as CaptureResponse | null;

        if (!response.ok) {
          throw new Error(payload?.error || "Could not capture your PayPal payment.");
        }

        if (isMounted) {
          setResult(payload);
        }
      } catch (captureError) {
        if (isMounted) {
          setError(
            getPublicErrorMessage({
              internalMessage: captureError instanceof Error ? captureError.message : undefined,
              publicMessage:
                "We could not confirm your payment right now. Please contact us if this continues.",
            }),
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    captureOrder();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  return (
    <PageV0>
      <PaymentStateShell>
        {isLoading ? (
          <section className="payment-state-card">
            <span className="payment-state-card__eyebrow">Processing payment</span>
            <h1>Finalising your PayPal order.</h1>
            <p>We are confirming your payment now. Do not close this page.</p>
          </section>
        ) : error ? (
          <section className="payment-state-card">
            <span className="payment-state-card__eyebrow">Payment issue</span>
            <h1>We could not confirm your payment yet.</h1>
            <p>{error}</p>
            <div className="payment-state-card__actions">
              <Link href="/contact">Contact Bodilum</Link>
              <Link href="/design-direction">Back to design directions</Link>
            </div>
          </section>
        ) : (
          <section className="payment-state-card">
            <span className="payment-state-card__eyebrow">Payment received</span>
            <h1>Your design order is confirmed.</h1>
            <p>
              We received your PayPal payment and will contact you shortly to complete your
              customisation brief.
            </p>

            <div className="payment-state-card__details">
              {result?.directionTitle ? <p><strong>Direction:</strong> {result.directionTitle}</p> : null}
              {result?.offerName ? <p><strong>Offer:</strong> {result.offerName}</p> : null}
              {result?.amountUsd !== null ? (
                <p><strong>Charged:</strong> {formatUsd(result?.amountUsd ?? null)}</p>
              ) : null}
              {result?.selectedDesignIndexes.length ? (
                <p><strong>Selected designs:</strong> {result.selectedDesignIndexes.join(", ")}</p>
              ) : null}
              {result?.internalOrderId ? <p><strong>Order ID:</strong> {result.internalOrderId}</p> : null}
            </div>

            <div className="payment-state-card__actions">
              <Link href="/contact">Contact Bodilum</Link>
              <Link href="/design-direction">Back to design directions</Link>
            </div>
          </section>
        )}
      </PaymentStateShell>
    </PageV0>
  );
}

const PaymentStateShell = styled.div`
  width: min(52rem, 92%);
  min-height: calc(100vh - 8rem);
  margin: 0 auto;
  display: grid;
  align-items: center;
  padding: 4rem 0;

  .payment-state-card {
    display: grid;
    gap: 1rem;
    padding: clamp(1.25rem, 3vw, 2rem);
    border: 1px solid rgba(17, 17, 17, 0.08);
    border-radius: 1.5rem;
    background: #fff;
  }

  .payment-state-card__eyebrow {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #767676;
  }

  h1 {
    font-size: clamp(2rem, 6vw, 4rem);
    line-height: 0.95;
    font-weight: 900;
    color: #111;
  }

  p {
    color: #4f4f4f;
    line-height: 1.65;
  }

  .payment-state-card__details {
    display: grid;
    gap: 0.4rem;
    padding: 1rem;
    border-radius: 1rem;
    background: #fcfcfb;
    border: 1px solid rgba(17, 17, 17, 0.08);
  }

  .payment-state-card__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .payment-state-card__actions a {
    min-height: 2.9rem;
    padding: 0.8rem 1.1rem;
    border-radius: 999px;
    border: 1px solid rgba(17, 17, 17, 0.12);
    color: #111;
    font-weight: 700;
    text-decoration: none;
  }
`;