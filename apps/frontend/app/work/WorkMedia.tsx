"use client";

import styled from "styled-components";

type WorkMediaProps = {
  src?: string;
  alt: string;
  title: string;
  accent: string;
  surface: string;
  position?: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  className?: string;
};

export default function WorkMedia({
  src,
  alt,
  title,
  accent,
  surface,
  position = "center center",
  fit = "cover",
  priority = false,
  className,
}: WorkMediaProps) {
  if (src) {
    const isVideo = /\.(mp4|webm)$/i.test(src);

    return (
      <ImageWrap className={className} $surface={surface}>
        {isVideo ? (
          <video
            src={src}
            aria-label={alt}
            autoPlay
            muted
            loop
            playsInline
            preload={priority ? "auto" : "metadata"}
            style={{ objectPosition: position, objectFit: fit }}
          />
        ) : (
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            style={{ objectPosition: position, objectFit: fit }}
          />
        )}
      </ImageWrap>
    );
  }

  return (
    <Placeholder
      className={className}
      $accent={accent}
      $surface={surface}
      role="img"
      aria-label={`${title} project artwork coming soon`}
    >
      <PlaceholderGrid aria-hidden="true" />
      <PlaceholderOrb aria-hidden="true" />
      <PlaceholderCopy>
        <span>Case study in progress</span>
        <strong>{title}</strong>
      </PlaceholderCopy>
    </Placeholder>
  );
}

const ImageWrap = styled.div<{ $surface: string }>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: ${({ $surface }) => $surface};

  img,
  video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

const Placeholder = styled.div<{ $accent: string; $surface: string }>`
  width: 100%;
  height: 100%;
  min-height: 320px;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  color: #fff;
  background:
    radial-gradient(circle at 72% 28%, ${({ $accent }) => $accent} 0, transparent 34%),
    linear-gradient(135deg, ${({ $surface }) => $surface}, #0b0b0b 84%);
`;

const PlaceholderGrid = styled.div`
  position: absolute;
  inset: -20%;
  opacity: 0.26;
  transform: rotate(-10deg) scale(1.2);
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.22) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.22) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 85%);
`;

const PlaceholderOrb = styled.div`
  width: min(46vw, 520px);
  aspect-ratio: 1;
  position: absolute;
  top: 50%;
  right: 9%;
  border-radius: 50%;
  transform: translateY(-50%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow:
    inset 0 0 80px rgba(255, 255, 255, 0.08),
    0 0 120px rgba(255, 255, 255, 0.08);

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: inherit;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  &::before {
    inset: 14%;
  }

  &::after {
    inset: 31%;
  }
`;

const PlaceholderCopy = styled.div`
  width: min(72%, 760px);
  position: absolute;
  left: clamp(24px, 5vw, 72px);
  bottom: clamp(24px, 5vw, 72px);
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;

  span {
    font-size: 0.72rem;
    line-height: 1;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  strong {
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(2.25rem, 7vw, 7rem);
    line-height: 0.88;
    letter-spacing: -0.06em;
    max-width: 10ch;
  }
`;
