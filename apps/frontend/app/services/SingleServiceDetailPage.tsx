"use client";

import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import Link from 'next/link';
import React, { useMemo, useState } from 'react'
import PageV0 from '@/components/ui/page-v0/PageV0';
import styled from 'styled-components';
import { ServiceEntry } from './servicesData';
import LocalizedServicePrice from './LocalizedServicePrice';
import ServiceRequestDrawerContent from './ServiceRequestDrawerContent';
import { ServiceDrawerPayload } from './ServiceSectionDrawerContext';

type SingleServiceDetailPageProps = {
  service: ServiceEntry;
};

function SingleServiceDetailPage({ service }: SingleServiceDetailPageProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const serviceCategoryLink = service.link.split('/').slice(0, 3).join('/');
  const ctaHref = service.ctaHref ?? "/contact";
  const ctaLabel = service.ctaLabel ?? "Request this service";
  const shouldOpenRequestDrawer = !service.ctaHref || ctaHref === "/contact";
  const accent = service.accent ?? "#111111";
  const accentSoft = service.accentSoft ?? "#f4f4f5";
  const accentContrast = service.accentContrast ?? "#ffffff";
  const heroPattern = service.heroPattern ?? "mesh";
  const heroMood = service.heroMood ?? "calm";
  const drawerService = useMemo<ServiceDrawerPayload>(() => ({
    title: service.title,
    description: service.description,
    link: service.link,
    price: service.price,
    summary: service.summary,
    timeline: service.timeline,
    bestFor: service.bestFor,
    deliverables: service.deliverables,
    thumbnail: service.thumbnail,
  }), [service]);

  return (
    <>
      <PageV0>
        <SingleServiceDetailPageWrapper
          className={`hero-pattern-${heroPattern} hero-mood-${heroMood}`}
          style={{
            ["--service-accent" as string]: accent,
            ["--service-accent-soft" as string]: accentSoft,
            ["--service-accent-contrast" as string]: accentContrast,
          }}
        >
          <Link className="back-link" href={serviceCategoryLink}>
            Back to services
          </Link>

          <div className="service-hero">
            <div className="service-copy">
              <div className="service-meta">
                <LocalizedServicePrice price={service.price} />
                {service.timeline && <span className="timeline-badge">{service.timeline}</span>}
              </div>
              <h1>{service.title}</h1>
              {service.summary && <p className="summary">{service.summary}</p>}
              <p className="description">{service.description}</p>
              {service.bestFor && (
                <p className="best-for">
                  <strong>Best for:</strong> {service.bestFor}
                </p>
              )}

              <div className="hero-actions">
                {shouldOpenRequestDrawer ? (
                  <button
                    className="primary-cta"
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    {ctaLabel}
                  </button>
                ) : (
                  <Link className="primary-cta" href={ctaHref}>{ctaLabel}</Link>
                )}
                <Link className="secondary-cta" href={serviceCategoryLink}>Browse all offers</Link>
              </div>
            </div>

            {service.thumbnail && (
              <div className="service-media">
                <img src={service.thumbnail} alt={service.title} />
              </div>
            )}
          </div>

          {service.outcomes?.length ? (
            <section className="outcomes-section section-card">
              <h2>What changes after this</h2>
              <div className="chip-grid">
                {service.outcomes.map((outcome) => (
                  <div key={outcome} className="chip-card">{outcome}</div>
                ))}
              </div>
            </section>
          ) : null}

          {service.process?.length ? (
            <section className="process-section section-card">
              <h2>How it works</h2>
              <div className="step-list">
                {service.process.map((step, index) => (
                  <div key={step} className="step-card">
                    <span className="step-number">0{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {service.deliverables?.length ? (
            <section className="deliverables-section section-card">
              <h2>What you get</h2>
              <ul>
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {service.faqs?.length ? (
            <section className="faq-section section-card">
              <h2>FAQs</h2>
              <div className="faq-list">
                {service.faqs.map((faq) => (
                  <article key={faq.question} className="faq-item">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </SingleServiceDetailPageWrapper>
      </PageV0>

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
              maxW={{ base: "100%", md: "760px" }}
              maxH={{ base: "88vh", md: "calc(100vh - 2rem)" }}
              borderRadius={{ base: "1.5rem 1.5rem 0 0", md: "1.75rem" }}
              boxShadow="-24px 0 64px rgba(0, 0, 0, 0.18)"
            >
              <Drawer.Header display="flex" alignItems="flex-start" gap="1rem" pb="1rem">
                <Drawer.Title fontSize="clamp(1.5rem, 3vw, 2rem)" lineHeight="1" fontWeight="800">
                  {service.title}
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

              <Drawer.Body display="flex" flexDirection="column" gap="1rem">
                <ServiceRequestDrawerContent
                  service={drawerService}
                  onClose={() => setIsDrawerOpen(false)}
                />
              </Drawer.Body>

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
                  <Link href={service.link}>See full offer</Link>
                </Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  )
}

export default SingleServiceDetailPage;


const SingleServiceDetailPageWrapper = styled.div`
  width: min(1200px, 92%);
  min-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  padding: 3rem 0 6rem;

  .back-link {
    color: var(--service-accent);
    font-size: 0.95rem;
    font-weight: 700;

    &:hover {
      text-decoration: underline;
    }
  }

  .service-hero {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 2rem;
    width: 100%;
    align-items: start;
    padding: 2rem;
    border-radius: 2rem;
    background:
      radial-gradient(circle at top right, var(--service-accent-soft), transparent 35%),
      linear-gradient(180deg, var(--service-accent-contrast) 0%, #ffffff 100%);
    border: 1px solid color-mix(in srgb, var(--service-accent) 14%, white);
  }

  &.hero-pattern-grid .service-hero {
    background-image:
      linear-gradient(color-mix(in srgb, var(--service-accent) 8%, transparent) 1px, transparent 1px),
      linear-gradient(90deg, color-mix(in srgb, var(--service-accent) 8%, transparent) 1px, transparent 1px),
      linear-gradient(180deg, var(--service-accent-contrast) 0%, #ffffff 100%);
    background-size: 24px 24px, 24px 24px, auto;
    background-position: 0 0, 0 0, 0 0;
  }

  &.hero-pattern-spotlight .service-hero {
    background:
      radial-gradient(circle at 80% 15%, color-mix(in srgb, var(--service-accent) 22%, white), transparent 22%),
      radial-gradient(circle at 20% 80%, var(--service-accent-soft), transparent 28%),
      linear-gradient(180deg, var(--service-accent-contrast) 0%, #ffffff 100%);
  }

  &.hero-pattern-bands .service-hero {
    background:
      repeating-linear-gradient(
        135deg,
        color-mix(in srgb, var(--service-accent) 7%, white) 0,
        color-mix(in srgb, var(--service-accent) 7%, white) 18px,
        transparent 18px,
        transparent 48px
      ),
      linear-gradient(180deg, var(--service-accent-contrast) 0%, #ffffff 100%);
  }

  &.hero-pattern-mesh .service-hero {
    background:
      radial-gradient(circle at top right, var(--service-accent-soft), transparent 35%),
      radial-gradient(circle at bottom left, color-mix(in srgb, var(--service-accent) 12%, white), transparent 30%),
      linear-gradient(180deg, var(--service-accent-contrast) 0%, #ffffff 100%);
  }

  &.hero-mood-bold .service-copy h1 {
    max-width: 10ch;
    letter-spacing: -0.04em;
  }

  &.hero-mood-technical .service-hero {
    border-radius: 1.25rem;
  }

  &.hero-mood-technical .section-card,
  &.hero-mood-technical .service-media {
    border-radius: 1rem;
  }

  &.hero-mood-editorial .service-copy h1 {
    max-width: 12ch;
    font-size: clamp(2.6rem, 6.5vw, 5.4rem);
  }

  &.hero-mood-editorial .summary {
    max-width: 48ch;
  }

  &.hero-mood-calm .service-hero {
    box-shadow: 0 18px 50px color-mix(in srgb, var(--service-accent) 8%, transparent);
  }

  .service-copy {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1 {
      font-size: clamp(2.4rem, 6vw, 5rem);
      line-height: 0.95;
      font-weight: 800;
    }
  }

  .service-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
  }

  .price-meta {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .price-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    background: var(--service-accent);
    color: #fff;
    font-family: var(--font-lato), sans-serif;
    font-weight: 900;
  }

  .price-badge--loading {
    min-width: 12rem;
    min-height: 2.1rem;
    justify-content: center;
    gap: 0.6rem;
  }

  .price-loader {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 999px;
    border: 2px solid rgba(255, 255, 255, 0.35);
    border-top-color: #fff;
    animation: service-price-spin 0.8s linear infinite;
  }

  .price-context {
    font-size: 0.82rem;
    line-height: 1.2;
    color: color-mix(in srgb, var(--service-accent) 78%, #111);
    font-weight: 700;
  }

  .timeline-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    background: var(--service-accent-soft);
    color: var(--service-accent);
    font-weight: 700;
  }

  .summary {
    font-size: clamp(1.1rem, 1.9vw, 1.35rem);
    line-height: 1.5;
    color: color-mix(in srgb, var(--service-accent) 78%, #111);
    max-width: 55ch;
  }

  .description,
  .best-for {
    color: #555;
    font-size: clamp(1rem, 1.6vw, 1.15rem);
    line-height: 1.7;
    max-width: 70ch;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
    margin-top: 0.5rem;
  }

  .primary-cta,
  .secondary-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 0.75rem 1rem;
    border-radius: 999px;
    border: 1px solid #ddd;
    font-weight: 700;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .primary-cta {
    background: var(--service-accent);
    color: #fff;
    border-color: var(--service-accent);
    box-shadow: 0 14px 30px color-mix(in srgb, var(--service-accent) 22%, transparent);
  }

  .secondary-cta {
    color: var(--service-accent);
    background: var(--service-accent-contrast);
    border-color: color-mix(in srgb, var(--service-accent) 20%, white);
  }

  .primary-cta:hover,
  .secondary-cta:hover {
    transform: translateY(-1px);
  }

  .section-card {
    width: 100%;
    padding: 2rem;
    border-radius: 1.5rem;
    background: linear-gradient(180deg, var(--service-accent-contrast) 0%, #fafafa 100%);
    border: 1px solid color-mix(in srgb, var(--service-accent) 12%, white);
  }

  .section-card h2 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    margin-bottom: 1rem;
  }

  .chip-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  .chip-card {
    padding: 1rem;
    border-radius: 1rem;
    background: #fff;
    border: 1px solid color-mix(in srgb, var(--service-accent) 10%, white);
    color: #444;
    line-height: 1.6;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--service-accent) 4%, transparent);
  }

  .step-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  .step-card {
    padding: 1rem;
    border-radius: 1rem;
    background: #fff;
    border: 1px solid color-mix(in srgb, var(--service-accent) 10%, white);

    p {
      color: #444;
      line-height: 1.6;
    }
  }

  .step-number {
    display: inline-flex;
    margin-bottom: 0.8rem;
    font-family: var(--font-lato), sans-serif;
    font-weight: 900;
    color: var(--service-accent);
  }

  .service-media {
    width: 100%;
    border-radius: 1.5rem;
    overflow: hidden;
    box-shadow: 0 30px 60px color-mix(in srgb, var(--service-accent) 16%, transparent);
    border: 1px solid color-mix(in srgb, var(--service-accent) 14%, white);

    img {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 320px;
      object-fit: cover;
    }
  }

  .deliverables-section {
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0.85rem 1.2rem;
      padding: 0;
      list-style: none;
    }

    li {
      padding: 1rem;
      border-radius: 1rem;
      background: #fff;
      border: 1px solid color-mix(in srgb, var(--service-accent) 10%, white);
      color: #444;
      line-height: 1.6;
    }
  }

  .faq-list {
    display: grid;
    gap: 1rem;
  }

  .faq-item {
    padding: 1rem 0;
    border-top: 1px solid color-mix(in srgb, var(--service-accent) 12%, white);

    &:first-child {
      border-top: 0;
      padding-top: 0;
    }

    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.05rem;
      font-weight: 800;
      color: color-mix(in srgb, var(--service-accent) 82%, #111);
    }

    p {
      color: #555;
      line-height: 1.7;
    }
  }

  @media all and (max-width: 900px) {
    .service-hero {
      grid-template-columns: 1fr;
    }
  }

  @keyframes service-price-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;