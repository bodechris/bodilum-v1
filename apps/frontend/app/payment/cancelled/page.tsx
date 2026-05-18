"use client";

import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import PageV0 from "@/components/ui/page-v0/PageV0";
import { trackMetaCustomEvent } from "@/lib/metaPixelEvents";

export default function PaymentCancelledPage() {
  useEffect(() => {
    trackMetaCustomEvent("CheckoutCancelled", {
      checkout_type: "paypal-order",
    });
  }, []);

  return (
    <PageV0>
      <CancelledShell>
        <section className="cancelled-card">
          <span className="cancelled-card__eyebrow">Checkout cancelled</span>
          <h1>Your PayPal checkout was cancelled.</h1>
          <p>You can return to the design direction drawer, adjust your selections, and try again.</p>
          <div className="cancelled-card__actions">
            <Link href="/design-direction">Back to design directions</Link>
            <Link href="/contact">Contact Bodilum</Link>
          </div>
        </section>
      </CancelledShell>
    </PageV0>
  );
}

const CancelledShell = styled.div`
  width: min(48rem, 92%);
  min-height: calc(100vh - 8rem);
  margin: 0 auto;
  display: grid;
  align-items: center;
  padding: 4rem 0;

  .cancelled-card {
    display: grid;
    gap: 1rem;
    padding: clamp(1.25rem, 3vw, 2rem);
    border: 1px solid rgba(17, 17, 17, 0.08);
    border-radius: 1.5rem;
    background: #fff;
  }

  .cancelled-card__eyebrow {
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

  .cancelled-card__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .cancelled-card__actions a {
    min-height: 2.9rem;
    padding: 0.8rem 1.1rem;
    border-radius: 999px;
    border: 1px solid rgba(17, 17, 17, 0.12);
    color: #111;
    font-weight: 700;
    text-decoration: none;
  }
`;