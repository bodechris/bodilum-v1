"use client";

import Link, { type LinkProps } from "next/link";
import React from "react";
import styled from "styled-components";

type Tone = "dark" | "outline" | "light";

type RadialFollowLinkProps = Omit<LinkProps, "as"> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "as"> & {
    tone?: Tone;
    showArrow?: boolean;
    children: React.ReactNode;
  };

export function RadialFollowLink({
  children,
  tone = "dark",
  showArrow = true,
  onPointerMove,
  onPointerEnter,
  ...props
}: RadialFollowLinkProps) {
  const updatePointer = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--x",
      `${event.clientX - rect.left}px`
    );

    event.currentTarget.style.setProperty(
      "--y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
  <StyledRadialFollowLink
    {...props}
    data-tone={tone}
    onPointerMove={(event) => {
      updatePointer(event);
      onPointerMove?.(event);
    }}
    onPointerEnter={(event) => {
      updatePointer(event);
      onPointerEnter?.(event);
    }}
  >
    <span className="cta-inner">
      <span className="cta-label">{children}</span>

      {showArrow && (
        <span className="cta-icon" aria-hidden="true">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M13 6L19 12L13 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </span>
  </StyledRadialFollowLink>
);
}

export default RadialFollowLink;

const StyledRadialFollowLink = styled(Link)`
  --x: 50%;
  --y: 50%;

  position: relative;
  isolation: isolate;
  overflow: hidden;

  box-sizing: border-box;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: auto;
  min-width: 220px;
  height: 58px;

  padding: 0;

  border-radius: 999px;
  border: 1.5px solid var(--btn-border);
  background: var(--btn-bg);
  color: var(--btn-text);

  text-decoration: none;
  cursor: pointer;

  transition:
    color 360ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 360ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1);

  &[data-tone="dark"] {
    --btn-bg: #111;
    --btn-text: #fff;
    --btn-border: #111;

    --btn-wipe: #fff;
    --btn-hover-text: #111;

    --icon-bg: #fff;
    --icon-text: #111;

    --icon-hover-bg: #111;
    --icon-hover-text: #fff;
  }

  &[data-tone="outline"] {
    --btn-bg: #fff;
    --btn-text: #111;
    --btn-border: #111;

    --btn-wipe: #111;
    --btn-hover-text: #fff;

    --icon-bg: #111;
    --icon-text: #fff;

    --icon-hover-bg: #fff;
    --icon-hover-text: #111;
  }

  &[data-tone="light"] {
    --btn-bg: #fff;
    --btn-text: #111;
    --btn-border: #111;

    --btn-wipe: #721aff;
    --btn-hover-text: #fff;

    --icon-bg: #111;
    --icon-text: #fff;

    --icon-hover-bg: #fff;
    --icon-hover-text: #111;
  }

  &::before {
    content: "";
    position: absolute;
    left: var(--x);
    top: var(--y);
    z-index: 0;

    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: var(--btn-wipe);

    transform: translate(-50%, -45%) scale(0);
    transition: transform 540ms cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }

  .cta-inner {
    position: absolute;
    inset: 0;
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;

    width: 100%;
    height: 100%;

    padding: 0 0.7rem 0 1.35rem;
    box-sizing: border-box;

    transform: translateY(-1px);
  }

  .cta-label {
    display: flex;
    align-items: center;
    justify-content: center;

    white-space: nowrap;

    font-size: 0.9rem;
    font-weight: 950;
    line-height: 1;
    letter-spacing: -0.025em;
  }

  .cta-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
    min-width: 40px;
    flex: 0 0 40px;

    border-radius: 999px;
    background: var(--icon-bg);
    color: var(--icon-text);

    transition:
      transform 420ms cubic-bezier(0.16, 1, 0.3, 1),
      background 260ms ease,
      color 260ms ease;
  }

  .cta-icon svg {
    display: block;
    width: 17px;
    height: 17px;
  }

  &:hover {
    color: var(--btn-hover-text);
    transform: translateY(-2px);
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(3.6);
  }

  &:hover .cta-icon {
    transform: translateX(3px) rotate(-18deg);
    background: var(--icon-hover-bg);
    color: var(--icon-hover-text);
  }

  &:focus-visible {
    outline: 3px solid rgba(255, 53, 184, 0.35);
    outline-offset: 4px;
  }

  @media (max-width: 520px) {
    width: 100%;
    min-width: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::before,
    .cta-icon {
      transition: none;
    }

    &:hover {
      transform: none;
    }
  }
`;