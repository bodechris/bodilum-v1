"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageV0 from "@/components/ui/page-v0/PageV0";
import WorkMedia from "./WorkMedia";
import type { WorkProject } from "./workData";

gsap.registerPlugin(ScrollTrigger);

type WorkDetailClientProps = {
  project: WorkProject;
  nextProject: WorkProject;
};

export default function WorkDetailClient({
  project,
  nextProject,
}: WorkDetailClientProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [creditsOpen, setCreditsOpen] = useState(false);

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-detail-title] > span",
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.06,
          ease: "power4.out",
        },
      );

      gsap.fromTo(
        "[data-detail-meta]",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.35, ease: "power3.out" },
      );

      gsap.fromTo(
        "[data-hero-media]",
        { clipPath: "inset(100% 0% 0% 0%)", y: 80 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 1.35,
          delay: 0.2,
          ease: "power4.out",
        },
      );

      gsap.utils.toArray("[data-reveal]").forEach((item) => {
        const element = item as HTMLElement;
        gsap.fromTo(
          element,
          { y: 58, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray("[data-gallery-media]").forEach((item) => {
        const element = item as HTMLElement;
        gsap.fromTo(
          element,
          { clipPath: "inset(100% 0% 0% 0%)", y: 70 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 1.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, pageRef);

    return () => context.revert();
  }, [project.slug]);

  const serviceLine = project.services.join(" / ");
  const hasGallery = project.media.length > 0;

  return (
    <PageV0>
      <DetailShell ref={pageRef}>
        <ProjectHero $surface={project.surface} $textColor={project.textColor}>
          <HeroTopBar data-detail-meta>
            <Link href="/work">← All work</Link>
            <span>
              {project.number} / {String(12).padStart(2, "0")}
            </span>
          </HeroTopBar>

          <HeroTitle data-detail-title>
            {project.title.split(" ").map((word, index) => (
              <span key={`${word}-${index}`}>{word}&nbsp;</span>
            ))}
          </HeroTitle>

          <HeroMeta data-detail-meta>
            <div>
              <small>Discipline</small>
              <p>{serviceLine}</p>
            </div>
            <div>
              <small>Year</small>
              <p>{project.year}</p>
            </div>
            {project.status ? (
              <div>
                <small>Status</small>
                <p>{project.status}</p>
              </div>
            ) : null}
          </HeroMeta>
        </ProjectHero>

        <HeroMedia data-hero-media $surface={project.surface}>
          <WorkMedia
            src={project.cover}
            alt={`${project.title} hero artwork`}
            title={project.title}
            accent={project.accent}
            surface={project.surface}
            position={project.coverPosition}
            priority
          />
        </HeroMedia>

        <EditorialIntro>
          <SectionLabel data-reveal>Overview</SectionLabel>
          <LeadText data-reveal>{project.intro}</LeadText>
          <SummaryText data-reveal>{project.summary}</SummaryText>
        </EditorialIntro>

        <NarrativeGrid>
          <NarrativeBlock data-reveal>
            <span>01 / The challenge</span>
            <h2>Finding the clearest idea inside the complexity.</h2>
            <p>{project.challenge}</p>
          </NarrativeBlock>

          <NarrativeBlock data-reveal>
            <span>02 / The response</span>
            <h2>A system designed to stay expressive as it grows.</h2>
            <p>{project.response}</p>
          </NarrativeBlock>
        </NarrativeGrid>

        {hasGallery ? (
          <GallerySection aria-label={`${project.title} project gallery`}>
            <GalleryHeading data-reveal>
              <SectionLabel>Selected frames</SectionLabel>
              <h2>Identity, detail + experience.</h2>
            </GalleryHeading>

            <GalleryGrid>
              {project.media.map((item, index) => {
                const isWide = item.layout
                  ? item.layout === "wide"
                  : index === 0 || index % 5 === 3;
                const isTall = item.layout
                  ? item.layout === "tall"
                  : index % 5 === 1;

                return (
                  <GalleryItem
                    key={`${item.src}-${index}`}
                    $wide={isWide}
                    $tall={isTall}
                  >
                    <GalleryMedia
                      data-gallery-media
                      $surface={project.surface}
                      $tall={isTall}
                    >
                      <WorkMedia
                        src={item.src}
                        alt={item.alt}
                        title={project.title}
                        accent={project.accent}
                        surface={project.surface}
                        position={item.position}
                        fit={item.fit}
                      />
                    </GalleryMedia>
                    {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                  </GalleryItem>
                );
              })}
            </GalleryGrid>
          </GallerySection>
        ) : (
          <PlaceholderStudy data-reveal>
            <WorkMedia
              alt={`${project.title} case study placeholder`}
              title={project.title}
              accent={project.accent}
              surface={project.surface}
            />
            <PlaceholderNote>
              <span>Artwork pending</span>
              <p>
                This page is fully structured and ready for the final project
                images, process frames and motion clips when they are available.
              </p>
            </PlaceholderNote>
          </PlaceholderStudy>
        )}

        <OutcomeSection>
          <SectionLabel data-reveal>Outcome</SectionLabel>
          <OutcomeCopy data-reveal>{project.outcome}</OutcomeCopy>
        </OutcomeSection>

        <CreditsSection>
          <CreditsButton
            type="button"
            onClick={() => setCreditsOpen((current) => !current)}
            aria-expanded={creditsOpen}
          >
            <span>{creditsOpen ? "Hide credits" : "Show credits"}</span>
            <i aria-hidden="true">{creditsOpen ? "−" : "+"}</i>
          </CreditsButton>

          <CreditsPanel $open={creditsOpen} aria-hidden={!creditsOpen}>
            {project.credits.map((credit) => (
              <Credit key={`${credit.role}-${credit.name}`}>
                <span>{credit.role}</span>
                <strong>{credit.name}</strong>
              </Credit>
            ))}
          </CreditsPanel>
        </CreditsSection>

        <NextProjectLink
          href={`/work/${nextProject.slug}`}
          $surface={nextProject.surface}
          $textColor={nextProject.textColor}
        >
          <NextMedia>
            <WorkMedia
              src={nextProject.thumbnail ?? nextProject.cover}
              alt={`${nextProject.title} next project preview`}
              title={nextProject.title}
              accent={nextProject.accent}
              surface={nextProject.surface}
              position={nextProject.thumbnailPosition ?? nextProject.coverPosition}
            />
          </NextMedia>
          <NextOverlay aria-hidden="true" />
          <NextCopy>
            <span>Next project</span>
            <h2>{nextProject.title}</h2>
            <i>↗</i>
          </NextCopy>
        </NextProjectLink>
      </DetailShell>
    </PageV0>
  );
}

const DetailShell = styled.main`
  width: 100%;
  overflow: hidden;
  color: #111;
  background: #f4f2ed;
`;

const ProjectHero = styled.header<{
  $surface: string;
  $textColor: "light" | "dark";
}>`
  min-height: 86vh;
  padding: clamp(110px, 14vh, 190px) clamp(18px, 3.2vw, 64px) clamp(48px, 7vw, 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ $textColor }) => ($textColor === "light" ? "#fff" : "#111")};
  background: ${({ $surface }) => $surface};
`;

const HeroTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  font-size: 0.72rem;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const HeroTitle = styled.h1`
  max-width: 1480px;
  margin: clamp(90px, 14vh, 170px) 0;
  overflow: hidden;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(4rem, 10.7vw, 13.6rem);
  line-height: 0.79;
  font-weight: 700;
  letter-spacing: -0.075em;

  > span {
    display: inline-block;
  }
`;

const HeroMeta = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) repeat(2, minmax(140px, 0.35fr));
  gap: 34px;
  align-items: start;

  div {
    padding-top: 13px;
    border-top: 1px solid currentColor;
  }

  small {
    display: block;
    margin-bottom: 10px;
    font-size: 0.66rem;
    line-height: 1;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.68;
  }

  p {
    margin: 0;
    font-size: clamp(0.9rem, 1.2vw, 1.1rem);
    line-height: 1.4;
    font-weight: 700;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const HeroMedia = styled.div<{ $surface: string }>`
  width: 100%;
  min-height: 58vw;
  max-height: 1120px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${({ $surface }) => $surface};
  will-change: clip-path, transform;

  @media (max-width: 760px) {
    min-height: 70vh;
    aspect-ratio: auto;
  }
`;

const EditorialIntro = styled.section`
  padding: clamp(100px, 15vw, 230px) clamp(18px, 3.2vw, 64px);
  display: grid;
  grid-template-columns: 0.4fr minmax(0, 1.35fr) minmax(260px, 0.65fr);
  align-items: start;
  gap: clamp(30px, 5vw, 90px);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const SectionLabel = styled.span`
  display: block;
  font-size: 0.7rem;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
`;

const LeadText = styled.p`
  margin: 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(2.15rem, 4.6vw, 6.1rem);
  line-height: 0.98;
  font-weight: 650;
  letter-spacing: -0.052em;
`;

const SummaryText = styled.p`
  max-width: 520px;
  margin: 0;
  font-size: clamp(1rem, 1.45vw, 1.34rem);
  line-height: 1.53;
  font-weight: 600;
`;

const NarrativeGrid = styled.section`
  padding: 0 clamp(18px, 3.2vw, 64px) clamp(120px, 17vw, 260px);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(28px, 5vw, 92px);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const NarrativeBlock = styled.article`
  padding-top: 18px;
  border-top: 1px solid rgba(17, 17, 17, 0.32);

  > span {
    font-size: 0.7rem;
    line-height: 1;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  h2 {
    max-width: 720px;
    margin: clamp(48px, 6vw, 84px) 0 28px;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(2.1rem, 4.2vw, 5.3rem);
    line-height: 0.96;
    font-weight: 650;
    letter-spacing: -0.052em;
  }

  p {
    max-width: 690px;
    margin: 0;
    font-size: clamp(1rem, 1.3vw, 1.23rem);
    line-height: 1.58;
    font-weight: 600;
  }
`;

const GallerySection = styled.section`
  padding: clamp(90px, 13vw, 200px) clamp(18px, 3.2vw, 64px);
  color: #fff;
  background: #0d0d0d;
`;

const GalleryHeading = styled.div`
  margin-bottom: clamp(70px, 10vw, 145px);
  display: grid;
  grid-template-columns: 0.35fr 1fr;
  gap: 30px;
  align-items: start;

  h2 {
    max-width: 930px;
    margin: 0;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(3rem, 7.3vw, 9.2rem);
    line-height: 0.87;
    font-weight: 650;
    letter-spacing: -0.065em;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(22px, 4vw, 68px) clamp(16px, 2.4vw, 42px);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled.figure<{ $wide: boolean; $tall: boolean }>`
  min-width: 0;
  margin: 0;
  grid-column: ${({ $wide }) => ($wide ? "1 / -1" : "auto")};

  figcaption {
    max-width: 520px;
    margin-top: 13px;
    font-size: 0.78rem;
    line-height: 1.45;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.72);
  }

  @media (max-width: 760px) {
    grid-column: auto;
  }
`;

const GalleryMedia = styled.div<{ $surface: string; $tall: boolean }>`
  aspect-ratio: ${({ $tall }) => ($tall ? "4 / 5" : "16 / 10")};
  overflow: hidden;
  background: ${({ $surface }) => $surface};
  will-change: clip-path, transform;
`;

const PlaceholderStudy = styled.section`
  margin: 0 clamp(18px, 3.2vw, 64px);
  min-height: 76vh;
  position: relative;

  > div:first-child {
    min-height: 76vh;
  }
`;

const PlaceholderNote = styled.div`
  width: min(440px, calc(100% - 40px));
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 20px;
  color: #111;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);

  span {
    display: block;
    margin-bottom: 12px;
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.45;
    font-weight: 650;
  }
`;

const OutcomeSection = styled.section`
  padding: clamp(120px, 17vw, 260px) clamp(18px, 3.2vw, 64px);
  display: grid;
  grid-template-columns: 0.35fr 1fr;
  gap: 30px;
  align-items: start;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const OutcomeCopy = styled.p`
  max-width: 1200px;
  margin: 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(2.7rem, 6.6vw, 8.4rem);
  line-height: 0.9;
  font-weight: 650;
  letter-spacing: -0.062em;
`;

const CreditsSection = styled.section`
  padding: 0 clamp(18px, 3.2vw, 64px) clamp(110px, 14vw, 210px);
`;

const CreditsButton = styled.button`
  width: 100%;
  padding: 20px 0;
  border: 0;
  border-top: 1px solid rgba(17, 17, 17, 0.32);
  border-bottom: 1px solid rgba(17, 17, 17, 0.32);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  color: inherit;
  background: transparent;
  cursor: pointer;
  font: inherit;

  span {
    font-size: 0.74rem;
    line-height: 1;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  i {
    font-style: normal;
    font-size: 1.8rem;
    line-height: 1;
  }
`;

const CreditsPanel = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "900px" : "0")};
  overflow: hidden;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition:
    max-height 700ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 350ms ease;
`;

const Credit = styled.div`
  padding: 22px 0;
  border-bottom: 1px solid rgba(17, 17, 17, 0.16);
  display: grid;
  grid-template-columns: minmax(180px, 0.4fr) 1fr;
  gap: 30px;

  span,
  strong {
    font-size: clamp(0.88rem, 1.1vw, 1.05rem);
    line-height: 1.35;
  }

  span {
    font-weight: 700;
    opacity: 0.56;
  }

  strong {
    font-weight: 800;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 6px;
  }
`;

const NextProjectLink = styled(Link)<{
  $surface: string;
  $textColor: "light" | "dark";
}>`
  min-height: min(900px, 78vh);
  position: relative;
  display: block;
  overflow: hidden;
  color: ${({ $textColor }) => ($textColor === "light" ? "#fff" : "#111")};
  background: ${({ $surface }) => $surface};
  text-decoration: none;

  &:hover img {
    transform: scale(1.045);
  }
`;

const NextMedia = styled.div`
  position: absolute;
  inset: 0;
`;

const NextOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.54), rgba(0, 0, 0, 0.08) 58%);
`;

const NextCopy = styled.div`
  position: absolute;
  inset: auto clamp(18px, 3.2vw, 64px) clamp(36px, 6vw, 90px);
  z-index: 2;
  color: #fff;

  > span {
    display: block;
    margin-bottom: 20px;
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  h2 {
    max-width: 1200px;
    margin: 0;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(4rem, 10vw, 12rem);
    line-height: 0.82;
    font-weight: 700;
    letter-spacing: -0.072em;
  }

  i {
    position: absolute;
    right: 0;
    bottom: 0.12em;
    font-style: normal;
    font-size: clamp(2rem, 5vw, 6rem);
  }
`;
