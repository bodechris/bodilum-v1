"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageV0 from "@/components/ui/page-v0/PageV0";
import WorkMedia from "./WorkMedia";
import { workProjects } from "./workData";

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-work-hero] > *",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.15,
          stagger: 0.08,
          ease: "power4.out",
        },
      );

      gsap.utils
        .toArray<HTMLElement>("[data-work-card]")
        .forEach((card) => {
            const media = card.querySelector<HTMLElement>("[data-work-media]");
            const copy = card.querySelector<HTMLElement>("[data-work-copy]");

            gsap.fromTo(
            card,
            {
                clipPath: "inset(0% 0% 100% 0%)",
                y: 70,
            },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                y: 0,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                trigger: card,
                start: "top 86%",
                once: true,
                },
            },
            );

            if (copy) {
            gsap.fromTo(
                copy,
                {
                y: 34,
                opacity: 0,
                },
                {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 82%",
                    once: true,
                },
                },
            );
            }

            if (media) {
            gsap.fromTo(
                media,
                {
                scale: 1.08,
                },
                {
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 86%",
                    once: true,
                },
                },
            );
            }
        });
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <PageV0>
      <WorkPageShell ref={pageRef}>
        <HeroSection>
          <HeroKicker>Bodilum / Selected work</HeroKicker>

          <HeroTitle data-work-hero aria-label="Work that moves between identity, motion and technology">
            <LineMask>
              <span>Work that moves</span>
            </LineMask>
            <LineMask>
              <span>between identity,</span>
            </LineMask>
            <LineMask>
              <span>motion + technology.</span>
            </LineMask>
          </HeroTitle>

          <HeroFooter>
            <p>
              Brand systems, digital products, cinematic motion and immersive
              experiences built with an African point of view.
            </p>
            <ProjectCount>
              <span>Projects</span>
              <strong>{String(workProjects.length).padStart(2, "0")}</strong>
            </ProjectCount>
          </HeroFooter>
        </HeroSection>

        <ProjectsGrid aria-label="Selected portfolio projects">
          {workProjects.map((project, index) => (
            <ProjectArticle
              key={project.slug}
              data-work-card
              $feature={index === 0 || index === 3 || index === 8 || index === 11}
            >
              <ProjectLink href={`/work/${project.slug}`}>
                <ProjectMedia data-card-media $surface={project.surface}>
                  <WorkMedia
                    src={project.thumbnail ?? project.cover}
                    alt={`${project.title} featured project image`}
                    title={project.title}
                    accent={project.accent}
                    surface={project.surface}
                    position={project.thumbnailPosition ?? project.coverPosition}
                    priority={index < 2}
                  />
                  <OpenProject aria-hidden="true">
                    <span>View project</span>
                    <i>↗</i>
                  </OpenProject>
                </ProjectMedia>

                <ProjectCopy data-card-copy>
                  <ProjectMeta>
                    <span>{project.number}</span>
                    <span>{project.category}</span>
                  </ProjectMeta>

                  <ProjectTitleRow>
                    <h2>{project.title}</h2>
                    <span aria-hidden="true">↗</span>
                  </ProjectTitleRow>

                  <ProjectDetails>
                    <p>{project.summary}</p>
                    <ProjectServices>
                      {project.services.slice(0, 3).map((service) => (
                        <span key={service}>{service}</span>
                      ))}
                    </ProjectServices>
                  </ProjectDetails>
                </ProjectCopy>
              </ProjectLink>
            </ProjectArticle>
          ))}
        </ProjectsGrid>

        <ContactSection>
          <span>Have a project in mind?</span>
          <Link href="mailto:hello@bodilum.com?subject=Start%20a%20project%20with%20Bodilum">
            Let&apos;s make something memorable.
          </Link>
        </ContactSection>
      </WorkPageShell>
    </PageV0>
  );
}

const WorkPageShell = styled.main`
  width: min(100%, 1920px);
  margin: 0 auto;
  padding: 0 clamp(18px, 2.6vw, 52px) clamp(80px, 12vw, 180px);
  color: #111;
  background: #f4f2ed;
`;

const HeroSection = styled.section`
  min-height: min(960px, 92vh);
  padding: clamp(130px, 17vh, 220px) 0 clamp(70px, 9vw, 140px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid rgba(17, 17, 17, 0.22);
`;

const HeroKicker = styled.p`
  margin: 0 0 clamp(80px, 12vh, 170px);
  font-size: 0.76rem;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(3.55rem, 8.2vw, 10.5rem);
  line-height: 0.86;
  font-weight: 700;
  letter-spacing: -0.065em;
  text-transform: none;
`;

const LineMask = styled.span`
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;

  > span {
    display: block;
  }
`;

const HeroFooter = styled.div`
  margin-top: clamp(70px, 11vh, 150px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 32px;

  p {
    max-width: 560px;
    margin: 0;
    font-size: clamp(1rem, 1.5vw, 1.4rem);
    line-height: 1.42;
    font-weight: 600;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCount = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;

  span {
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  strong {
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(2rem, 4vw, 4.8rem);
    line-height: 0.8;
    letter-spacing: -0.06em;
  }
`;

const ProjectsGrid = styled.section`
  padding-top: clamp(55px, 8vw, 110px);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(18px, 2.6vw, 52px);
  row-gap: clamp(70px, 10vw, 150px);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectArticle = styled.article<{ $feature: boolean }>`
  min-width: 0;
  grid-column: ${({ $feature }) => ($feature ? "1 / -1" : "auto")};

  @media (max-width: 820px) {
    grid-column: auto;
  }
`;

const ProjectLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;

  &:hover img,
  &:hover video {
    transform: scale(1.035);
  }

  &:hover [data-card-copy] h2 + span {
    transform: rotate(45deg);
  }
`;

const ProjectMedia = styled.div<{ $surface: string }>`
  aspect-ratio: 16 / 10;
  overflow: hidden;
  position: relative;
  background: ${({ $surface }) => $surface};
  will-change: clip-path, transform;

  ${ProjectArticle}[data-work-card]:nth-child(3n + 2) & {
    aspect-ratio: 4 / 5;
  }

  ${ProjectArticle}[data-work-card]:nth-child(3n) & {
    aspect-ratio: 5 / 4;
  }

  @media (max-width: 820px) {
    aspect-ratio: 16 / 11 !important;
  }
`;

const OpenProject = styled.div`
  position: absolute;
  right: clamp(16px, 2vw, 30px);
  bottom: clamp(16px, 2vw, 30px);
  padding: 10px 12px 10px 15px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 999px;
  color: #111;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  i {
    font-style: normal;
    font-size: 1rem;
  }
`;

const ProjectCopy = styled.div`
  padding-top: 18px;
  border-top: 1px solid rgba(17, 17, 17, 0.22);
`;

const ProjectMeta = styled.div`
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  font-size: 0.68rem;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const ProjectTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;

  h2 {
    margin: 0;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(2rem, 4.2vw, 5.6rem);
    line-height: 0.93;
    font-weight: 700;
    letter-spacing: -0.055em;
  }

  > span {
    margin-top: 0.2em;
    display: inline-block;
    font-size: clamp(1.4rem, 2.3vw, 2.7rem);
    line-height: 1;
    transition: transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

const ProjectDetails = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(180px, 0.75fr);
  gap: clamp(24px, 5vw, 84px);

  p {
    max-width: 660px;
    margin: 0;
    font-size: clamp(0.98rem, 1.25vw, 1.18rem);
    line-height: 1.5;
    font-weight: 600;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const ProjectServices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;

  span {
    font-size: 0.78rem;
    line-height: 1.25;
    font-weight: 800;
  }
`;

const ContactSection = styled.section`
  margin-top: clamp(130px, 19vw, 290px);
  padding: clamp(32px, 5vw, 72px) 0;
  border-top: 1px solid rgba(17, 17, 17, 0.28);
  border-bottom: 1px solid rgba(17, 17, 17, 0.28);
  display: grid;
  grid-template-columns: minmax(180px, 0.35fr) 1fr;
  align-items: start;
  gap: 30px;

  > span {
    font-size: 0.74rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(2.5rem, 6.8vw, 8.4rem);
    line-height: 0.9;
    font-weight: 700;
    letter-spacing: -0.06em;
    transition: opacity 250ms ease;
  }

  a:hover {
    opacity: 0.55;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;
