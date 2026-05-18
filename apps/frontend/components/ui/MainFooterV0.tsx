"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import { trackMetaEvent } from '@/lib/metaPixelEvents';
import {
  FaArrowRight,
  FaEnvelope,
  FaFileLines,
  FaGlobe,
} from 'react-icons/fa6';

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Bodilum', href: '/about' },
  // { label: 'Inspiration Gallery', href: '/inspirations' },
  // { label: 'Start a Project', href: '/start' },
];

const serviceLinks = [
  { label: 'Design Services', href: '/services/design' },
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'AI Integrations', href: '/services/ai-integrations' },
  // { label: 'Pricing', href: '/pricing' },
];

const companyLinks = [
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

const actionLinks = [
  { label: 'Visit bodilum.com', href: '/', icon: FaGlobe },
  // { label: 'Book a discovery call', href: '/start', icon: FaArrowRight },
  { label: 'Contact the team', href: '/contact', icon: FaEnvelope },
  // { label: 'View pricing', href: '/pricing', icon: FaFileLines },
];

type SubmitState =
  | { status: 'idle'; message: null }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

function MainFooterV0() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: 'idle',
    message: null,
  });

  async function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ status: 'idle', message: null });

    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, website, source: 'footer' }),
    });

    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    if (!response.ok) {
      setSubmitState({
        status: 'error',
        message: payload?.message ?? 'We could not save your subscription. Please try again.',
      });
      setIsSubmitting(false);
      return;
    }

    setEmail('');
    setWebsite('');
    trackMetaEvent('Subscribe', {
      content_name: 'Bodilum Newsletter',
      content_category: 'Newsletter',
    });
    setSubmitState({
      status: 'success',
      message: payload?.message ?? 'You have been added to the Bodilum updates list.',
    });
    setIsSubmitting(false);
  }

  return (
    <MainFooterV0Wrapper>
      <div className="footer-shell">
        <div className="footer-grid">
          <div className="footer-column footer-column--discover">
            <p className="footer-heading">Explore</p>
            <nav>
              <ul>
                {exploreLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="footer-column footer-column--assets">
            <p className="footer-heading">Services</p>
            <nav>
              <ul>
                {serviceLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="footer-column footer-column--platform">
            <p className="footer-heading">Company</p>
            <nav>
              <ul>
                {companyLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="footer-column footer-column--subscribe">
            <p className="footer-kicker">Bodilum</p>
            <p className="subscribe-copy">
              Bodilum helps brands launch sharper identities, faster websites, and practical AI workflows.
            </p>

            <p className="subscribe-copy subscribe-copy--secondary">
              Join the list for launch notes, new offers, and selected ideas worth saving.
            </p>

            <form className="subscribe-form" onSubmit={handleSubscribe} noValidate>
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email address"
                aria-label="Enter your email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isSubmitting}
                required
              />
              <label className="sr-only" htmlFor="footer-website">Website</label>
              <input
                id="footer-website"
                className="bot-field"
                tabIndex={-1}
                type="text"
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
              <button disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Saving...' : 'Subscribe'}
              </button>
            </form>

            {submitState.message ? (
              <p
                className={`submit-message submit-message--${submitState.status}`}
                role={submitState.status === 'error' ? 'alert' : 'status'}
              >
                {submitState.message}
              </p>
            ) : null}

            <div className="social-block">
              <p className="footer-heading">Quick actions</p>
              <div className="social-links">
                {actionLinks.map(({ label, href, icon: Icon }) => (
                  <Link key={label} href={href} aria-label={label}>
                    <Icon />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>&copy; Bodilum. 2026 All rights reserved.</p>
          <a href="https://www.biznesxpo.com" target="_blank" rel="noopener noreferrer">Bodilum is the design studio from the team behind BiznesXpo</a>
        </div>
      </div>
    </MainFooterV0Wrapper>
  )
}

export default MainFooterV0;

const MainFooterV0Wrapper = styled.footer`
  width: 100%;
  height: auto !important;
  // min-height: 70vh !important;
  background: #111;
  display: flex;
  position: relative;
  z-index: 0;
  justify-content: center;
  align-items: stretch;
  color: #f5f5f5;
  padding: 5rem 0 1.8rem;

  .footer-shell {
    width: min(1200px, 92%);
    display: flex;
    flex-direction: column;
    gap: 2.6rem;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: minmax(220px, 1.2fr) minmax(170px, 1fr) minmax(170px, 1fr) minmax(300px, 1.8fr);
    gap: 2rem;
    align-items: start;
  }

  .footer-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-heading {
    font-size: 0.95rem;
    line-height: 1;
    color: #8d8d8d;
  }

  .footer-kicker {
    font-size: 0.78rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #cfcfcf;
  }

  .footer-heading--ghost {
    opacity: 0;
    pointer-events: none;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li a {
    color: #f3f3f3;
    font-size: 1rem;
    line-height: 1.2;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: #b9b9b9;
    }
  }

  .subscribe-copy {
    color: #9a9a9a;
    font-size: 0.95rem;
    line-height: 1.5;
    max-width: 42ch;
  }

  .subscribe-copy--secondary {
    margin-top: -0.45rem;
  }

  .subscribe-form {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    width: min(100%, 380px);
    border: 1px solid rgba(255, 255, 255, 0.65);
    border-radius: 999px;
    padding: 0.28rem;
    gap: 0.45rem;
    background: transparent;

    input {
      width: 100%;
      background: transparent;
      border: 0;
      outline: 0;
      color: #f5f5f5;
      padding: 0 1.1rem;
      font-size: 0.95rem;

      &::placeholder {
        color: #8c8c8c;
      }
    }

    .bot-field {
      position: absolute;
      left: -9999px;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
    }

    button {
      min-height: 2.55rem;
      padding: 0.55rem 1.4rem;
      border-radius: 999px;
      border: 0;
      background: #efefef;
      color: #111;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s ease, background 0.2s ease;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.72;
      }

      &:hover:not(:disabled) {
        transform: translateY(-1px);
        background: #ffffff;
      }
    }
  }

  .submit-message {
    font-size: 0.875rem;
    line-height: 1.5;
    max-width: 38ch;
  }

  .submit-message--success {
    color: #9ff5ba;
  }

  .submit-message--error {
    color: #ffb2aa;
  }

  .social-block {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    margin-top: 0.8rem;
  }

  .social-links {
    display: flex;
    align-items: center;
    gap: 0.85rem;

    a {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: #f5f5f5;
      font-size: 1rem;
      transition: color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;

      &:hover {
        color: #bbbbbb;
        transform: translateY(-1px);
        border-color: rgba(255, 255, 255, 0.4);
      }
    }
  }

  .footer-divider {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
  }

  .footer-bottom {
    color: #6f6f6f;
    font-size: 0.92rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    p { 
      flex: 1;
    }
    a {
      flex: 1;
      max-width: 500px;
      text-align: right;
      &:hover {
        color: #ccc;
        text-decoration: underline;
      }
    }
  }

  @media all and (max-width: 1080px) {
    .footer-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .footer-heading--ghost {
      display: none;
    }
  }

  @media all and (max-width: 720px) {
    padding-top: 3.5rem;

    .footer-grid {
      grid-template-columns: 1fr;
      gap: 2.4rem;
    }

    .subscribe-form {
      width: 100%;
    }
  }
`;