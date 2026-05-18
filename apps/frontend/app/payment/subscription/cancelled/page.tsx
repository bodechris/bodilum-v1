"use client";

import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import PageV0 from "@/components/ui/page-v0/PageV0";
import { trackMetaCustomEvent } from "@/lib/metaPixelEvents";

export default function SubscriptionCancelledPage() {
  useEffect(() => {
    trackMetaCustomEvent("CheckoutCancelled", {
      checkout_type: "paypal-subscription",
    });
  }, []);

  return (
    <PageV0>
      <SubscriptionCancelledShell>
        <section className="state-card">
          <span className="state-card__eyebrow">Subscription cancelled</span>
          <h1>Your PayPal subscription checkout was cancelled.</h1>
          <p>You can return to the monthly support page, review the plans again, and restart when ready.</p>
          <div className="state-card__actions">
            <Link href="/monthly-support">Back to monthly support</Link>
            <Link href="/contact">Contact Bodilum</Link>
          </div>
        </section>
      </SubscriptionCancelledShell>
    </PageV0>
  );
}

const SubscriptionCancelledShell = styled.div`
  width: min(48rem, 92%);
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