"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageV0 from "@/components/ui/page-v0/PageV0";
import { workProjects } from "../work/workData";

gsap.registerPlugin(ScrollTrigger);

const featuredSlugs = [
  "naija-fashion-index",
  "afrochess",
  "bobobo-ai-challenger",
  "biznesxpo-microsites",
];

const practiceAreas = [
  {
    number: "01",
    title: "Brand direction",
    text: "Identity systems, campaigns and visual worlds built to make a business easier to recognise, trust and remember.",
    href: "/design-direction",
  },
  {
    number: "02",
    title: "Motion + 3D",
    text: "Cinematic movement, product films, animated identities and spatial visuals that give ideas presence and personality.",
    href: "/work",
  },
  {
    number: "03",
    title: "Web xperiences",
    text: "Editorial websites and interactive products combining clear storytelling, advanced front-end development and immersive technology.",
    href: "/web-experiences",
  },
  {
    number: "04",
    title: "AI + systems",
    text: "Practical automation, intelligent workflows and connected digital systems that help teams respond, publish and grow with less friction.",
    href: "/growth-systems",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand",
    text: "We define the real business problem, the audience and the outcome before choosing a visual or technical direction.",
  },
  {
    number: "02",
    title: "Direct",
    text: "We establish one strong creative point of view across message, identity, movement, interaction and product behaviour.",
  },
  {
    number: "03",
    title: "Build",
    text: "Design and engineering move together, so the final experience keeps the quality and intention of the original idea.",
  },
  {
    number: "04",
    title: "Refine",
    text: "We test, simplify and polish the details that separate something functional from something people genuinely remember.",
  },
];

const studioLinks = [
  {
    index: "01",
    title: "Selected work",
    text: "Brand identities, motion systems, products and interactive experiences.",
    href: "/work",
  },
  {
    index: "02",
    title: "Design directions",
    text: "Focused visual routes for businesses ready to sharpen how they look and communicate.",
    href: "/design-direction",
  },
  {
    index: "03",
    title: "Web xperiences",
    text: "Cinematic, editorial and technically ambitious digital experiences.",
    href: "/web-experiences",
  },
  {
    index: "04",
    title: "Growth systems",
    text: "Ongoing creative, digital and AI support connected to measurable business outcomes.",
    href: "/growth-systems",
  },
  {
    index: "05",
    title: "Agency partner",
    text: "Senior creative and technical support for studios that need to move faster without lowering the standard.",
    href: "/agency-partner",
  },
];

const capabilities = [
  "Creative direction",
  "Brand identity",
  "Motion design",
  "3D design",
  "Product design",
  "WebGL + Three.js",
  "AI integrations",
  "Advanced development",
];

export default function AboutBodilum() {
  const pageRef = useRef<HTMLElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);

  const featuredProjects = useMemo(
    () =>
      featuredSlugs
        .map((slug) => workProjects.find((project) => project.slug === slug))
        .filter((project): project is (typeof workProjects)[number] =>
          Boolean(project),
        ),
    [],
  );

  const heroProject = featuredProjects[0];

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>("[data-about-hero]"),
        { y: 58, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power4.out",
          delay: 0.08,
        },
      );

      gsap.utils
        .toArray<HTMLElement>("[data-about-reveal]")
        .forEach((element) => {
          gsap.fromTo(
            element,
            { y: 54, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-about-media]")
        .forEach((element) => {
          const image = element.querySelector<HTMLElement>("img");

          gsap.fromTo(
            element,
            { clipPath: "inset(100% 0% 0% 0%)", y: 64 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              y: 0,
              duration: 1.12,
              ease: "power4.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                once: true,
              },
            },
          );

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.08 },
              {
                scale: 1,
                duration: 1.35,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 90%",
                  once: true,
                },
              },
            );
          }
        });

      gsap.utils
        .toArray<HTMLElement>("[data-process-row]")
        .forEach((row, index) => {
          gsap.fromTo(
            row,
            { x: index % 2 === 0 ? -28 : 28, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.82,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 90%",
                once: true,
              },
            },
          );
        });
    }, pageRef);

    const media = heroMediaRef.current;
    const image = media?.querySelector<HTMLImageElement>("img");

    let cleanupPointer = () => undefined;

    if (media && image) {
      const moveX = gsap.quickTo(image, "x", {
        duration: 0.6,
        ease: "power3.out",
      });
      const moveY = gsap.quickTo(image, "y", {
        duration: 0.6,
        ease: "power3.out",
      });

      const onPointerMove = (event: PointerEvent) => {
        const bounds = media.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        moveX(x * 18);
        moveY(y * 18);
      };

      const onPointerLeave = () => {
        moveX(0);
        moveY(0);
      };

      media.addEventListener("pointermove", onPointerMove);
      media.addEventListener("pointerleave", onPointerLeave);

      cleanupPointer = () => {
        media.removeEventListener("pointermove", onPointerMove);
        media.removeEventListener("pointerleave", onPointerLeave);
      };
    }

    return () => {
      cleanupPointer();
      context.revert();
    };
  }, []);

  return (
    <PageV0>
      <AboutPage ref={pageRef}>
        <HeroSection>
          <HeroTopline data-about-hero>
            <Eyebrow>About Bodilum</Eyebrow>
            <HeroDescriptor>Creative technology studio</HeroDescriptor>
          </HeroTopline>

          <HeroGrid>
            <HeroTitle data-about-hero>
              Built on experience.
              <br />
              Proven through delivery.
              <br />
              <span>Connected across disciplines.</span>
            </HeroTitle>

            <HeroAside data-about-hero>
              <HeroIntro>
                Bodilum connects brand identity, motion, web experiences and
                AI to create memorable work that is strategically clear,
                technically strong and built to perform.
              </HeroIntro>

              <HeroNote>
                African perspective. Global ambition. One connected creative
                and technical practice.
              </HeroNote>

              <HeroActions>
                <PrimaryLink href="/work">
                  View selected work <span aria-hidden="true">↗</span>
                </PrimaryLink>
                <TextLink href="/contact">
                  Start a project <span aria-hidden="true">→</span>
                </TextLink>
              </HeroActions>
            </HeroAside>
          </HeroGrid>

          <HeroMedia ref={heroMediaRef} data-about-media>
            {heroProject?.thumbnail || heroProject?.cover ? (
              <img
                src={heroProject.thumbnail ?? heroProject.cover}
                alt={`${heroProject.title} project visual`}
                style={{
                  objectPosition:
                    heroProject.thumbnailPosition ??
                    heroProject.coverPosition ??
                    "center center",
                }}
              />
            ) : (
              <HeroFallback>Ideas into experiences.</HeroFallback>
            )}

            <HeroMediaTop>
              <span>Brand · Motion · AI · Digital</span>
              <span>01 / Studio perspective</span>
            </HeroMediaTop>

            <HeroMediaBottom>
              <span>Design-led. Technically fluent.</span>
              <span>Scroll to explore ↓</span>
            </HeroMediaBottom>
          </HeroMedia>
        </HeroSection>

        <StatementSection data-about-reveal>
          <Eyebrow>What connects the work</Eyebrow>
          <StatementTitle>
            We do not separate the story from the system that has to carry it.
          </StatementTitle>
          <StatementCopy>
            The strongest work happens when identity, movement, interface and
            engineering are shaped together. That is the centre of the Bodilum
            practice: fewer disconnected hand-offs, a clearer creative idea and
            a final experience that feels coherent from every angle.
          </StatementCopy>
        </StatementSection>

        <CapabilityRail aria-label="Bodilum capabilities">
          <CapabilityTrack>
            {[...capabilities, ...capabilities].map((capability, index) => (
              <span key={`${capability}-${index}`}>
                {capability} <i aria-hidden="true">✦</i>
              </span>
            ))}
          </CapabilityTrack>
        </CapabilityRail>

        <ReelSection>
          <SectionHeader data-about-reveal>
            <div>
              <Eyebrow>A connected visual practice</Eyebrow>
              <SectionTitle>
                Different formats.
                <br />
                The same standard.
              </SectionTitle>
            </div>
            <SectionIntro>
              From identity and motion to WebGL, product design and AI-enabled
              workflows, every discipline is treated as part of the same brand
              experience.
            </SectionIntro>
          </SectionHeader>

          <VisualRail data-about-reveal>
            {featuredProjects.map((project, index) => (
              <VisualPanel key={project.slug}>
                <VisualLink href={`/work/${project.slug}`}>
                  <VisualImage data-about-media>
                    {project.thumbnail || project.cover ? (
                      <img
                        src={project.thumbnail ?? project.cover}
                        alt={`${project.title} project visual`}
                        style={{
                          objectPosition:
                            project.thumbnailPosition ??
                            project.coverPosition ??
                            "center center",
                        }}
                      />
                    ) : (
                      <VisualFallback>{project.shortTitle}</VisualFallback>
                    )}
                  </VisualImage>

                  <VisualOverlay>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{project.title}</strong>
                    <i aria-hidden="true">↗</i>
                  </VisualOverlay>
                </VisualLink>
              </VisualPanel>
            ))}
          </VisualRail>
        </ReelSection>

        <PracticeSection>
          <SectionHeader data-about-reveal>
            <div>
              <Eyebrow>One practice / four layers</Eyebrow>
              <SectionTitle>
                Built to think across
                <br />
                the whole experience.
              </SectionTitle>
            </div>
            <SectionIntro>
              Clients can start with one focused need, while the studio keeps
              the wider brand, product and growth system in view.
            </SectionIntro>
          </SectionHeader>

          <PracticeGrid>
            {practiceAreas.map((area) => (
              <PracticeCard key={area.number} href={area.href} data-about-reveal>
                <PracticeTopline>
                  <span>{area.number}</span>
                  <i aria-hidden="true">↗</i>
                </PracticeTopline>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </PracticeCard>
            ))}
          </PracticeGrid>
        </PracticeSection>

        <PerspectiveSection>
          <PerspectiveGrid>
            <PerspectiveCopy data-about-reveal>
              <Eyebrow>Perspective matters</Eyebrow>
              <PerspectiveTitle>
                African context.
                <br />
                Global craft.
              </PerspectiveTitle>
              <PerspectiveText>
                Bodilum is interested in work that feels contemporary without
                becoming anonymous. We draw from African culture, texture,
                history, humour and ambition — then translate those references
                through modern design, motion and technology.
              </PerspectiveText>
            </PerspectiveCopy>

            <PerspectiveMedia data-about-media>
              {featuredProjects[1]?.thumbnail || featuredProjects[1]?.cover ? (
                <img
                  src={
                    featuredProjects[1].thumbnail ?? featuredProjects[1].cover
                  }
                  alt={`${featuredProjects[1].title} project visual`}
                  style={{
                    objectPosition:
                      featuredProjects[1].thumbnailPosition ??
                      featuredProjects[1].coverPosition ??
                      "center center",
                  }}
                />
              ) : null}
              <PerspectiveBadge>
                <span>Built from where we are.</span>
                <span>Made to travel.</span>
              </PerspectiveBadge>
            </PerspectiveMedia>
          </PerspectiveGrid>

          <StudioFacts data-about-reveal>
            <Fact>
              <strong>20+</strong>
              <span>Years of experience across design, motion and software</span>
            </Fact>
            <Fact>
              <strong>100+</strong>
              <span>Creative and digital projects delivered for businesses, brands and organisations</span>
            </Fact>
            <Fact>
              <strong>04</strong>
              <span>Connected practices: brand identity, motion, web experiences and AI</span>
            </Fact>
          </StudioFacts>
        </PerspectiveSection>

        <ProcessSection>
          <SectionHeader data-about-reveal>
            <div>
              <Eyebrow>How the studio works</Eyebrow>
              <SectionTitle>
                Clear thinking.
                <br />
                Strong direction.
                <br />
                Careful execution.
              </SectionTitle>
            </div>
            <SectionIntro>
              The process stays collaborative and transparent, but each stage
              has a clear purpose, owner and outcome.
            </SectionIntro>
          </SectionHeader>

          <ProcessList>
            {processSteps.map((step) => (
              <ProcessRow key={step.number} data-process-row>
                <ProcessNumber>{step.number}</ProcessNumber>
                <ProcessTitle>{step.title}</ProcessTitle>
                <ProcessText>{step.text}</ProcessText>
                <ProcessArrow aria-hidden="true">↘</ProcessArrow>
              </ProcessRow>
            ))}
          </ProcessList>
        </ProcessSection>

        <ExploreSection>
          <ExploreHeader data-about-reveal>
            <Eyebrow>Explore the studio</Eyebrow>
            <ExploreTitle>Choose where to begin.</ExploreTitle>
          </ExploreHeader>

          <ExploreList>
            {studioLinks.map((item) => (
              <ExploreLink key={item.index} href={item.href} data-about-reveal>
                <span>{item.index}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <i aria-hidden="true">↗</i>
              </ExploreLink>
            ))}
          </ExploreList>
        </ExploreSection>

        <ClosingSection data-about-reveal>
          <ClosingEyebrow>Have something ambitious in mind?</ClosingEyebrow>
          <ClosingLink href="/contact">
            <span>Let&apos;s shape it into something people remember.</span>
            <i aria-hidden="true">↗</i>
          </ClosingLink>
          <ClosingMeta>
            <span>Brand · Motion · AI · Digital</span>
          </ClosingMeta>
        </ClosingSection>
      </AboutPage>
    </PageV0>
  );
}

const AboutPage = styled.main`
  width: min(100%, 1920px);
  margin: 0 auto;
  overflow: hidden;
  color: #111;
  background: #f7f6f2;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

const HeroSection = styled.section`
  padding: clamp(150px, 17vw, 270px) clamp(18px, 3vw, 58px)
    clamp(95px, 12vw, 180px);
`;

const HeroTopline = styled.div`
  padding-top: 22px;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  border-top: 1px solid rgba(17, 17, 17, 0.22);
`;

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  line-height: 1.2;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
`;

const HeroDescriptor = styled.span`
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
`;

const HeroGrid = styled.div`
  margin-top: clamp(64px, 9vw, 138px);
  display: grid;
  grid-template-columns: minmax(0, 1.28fr) minmax(300px, 0.46fr);
  align-items: end;
  gap: clamp(50px, 9vw, 160px);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

const HeroTitle = styled.h1`
  max-width: 1240px;
  margin: 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(4rem, 9.3vw, 11.5rem);
  line-height: 0.79;
  font-weight: 700;
  letter-spacing: -0.082em;

  span {
    color: rgba(17, 17, 17, 0.28);
  }
`;

const HeroAside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const HeroIntro = styled.p`
  margin: 0;
  font-size: clamp(1.2rem, 1.8vw, 1.75rem);
  line-height: 1.35;
  font-weight: 650;
  letter-spacing: -0.025em;
`;

const HeroNote = styled.p`
  margin: 0;
  color: rgba(17, 17, 17, 0.64);
  font-size: 0.92rem;
  line-height: 1.55;
  font-weight: 560;
`;

const HeroActions = styled.div`
  padding-top: 18px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 26px;
`;

const PrimaryLink = styled(Link)`
  min-height: 52px;
  padding: 0 20px;
  display: inline-flex;
  align-items: center;
  gap: 28px;
  border-radius: 999px;
  color: #fff;
  background: #111;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition:
    transform 240ms ease,
    background 240ms ease;

  span {
    transition: transform 240ms ease;
  }

  &:hover {
    background: #fc6d05;
    transform: translateY(-2px);
  }

  &:hover span {
    transform: rotate(45deg);
  }
`;

const TextLink = styled(Link)`
  padding-bottom: 6px;
  display: inline-flex;
  align-items: center;
  gap: 18px;
  border-bottom: 1px solid currentColor;
  color: inherit;
  font-size: 0.76rem;
  font-weight: 900;
  text-decoration: none;

  span {
    transition: transform 220ms ease;
  }

  &:hover span {
    transform: translateX(5px);
  }
`;

const HeroMedia = styled.div`
  min-height: clamp(560px, 62vw, 1020px);
  margin-top: clamp(90px, 12vw, 175px);
  position: relative;
  overflow: hidden;
  background: #151515;
  cursor: crosshair;
  will-change: clip-path, transform;

  > img {
    width: calc(100% + 40px);
    height: calc(100% + 40px);
    margin: -20px;
    display: block;
    object-fit: cover;
    will-change: transform;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.28) 0%,
      rgba(0, 0, 0, 0) 35%,
      rgba(0, 0, 0, 0) 65%,
      rgba(0, 0, 0, 0.36) 100%
    );
  }
`;

const HeroFallback = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  display: flex;
  align-items: flex-end;
  color: #fff;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(3rem, 8vw, 10rem);
  line-height: 0.82;
  font-weight: 700;
  letter-spacing: -0.07em;
`;

const HeroMediaTop = styled.div`
  position: absolute;
  z-index: 2;
  top: clamp(18px, 2.4vw, 38px);
  left: clamp(18px, 2.4vw, 38px);
  right: clamp(18px, 2.4vw, 38px);
  display: flex;
  justify-content: space-between;
  gap: 20px;
  color: #fff;

  span {
    font-size: 0.67rem;
    font-weight: 900;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }
`;

const HeroMediaBottom = styled(HeroMediaTop)`
  top: auto;
  bottom: clamp(18px, 2.4vw, 38px);
`;

const StatementSection = styled.section`
  margin: 0 clamp(18px, 3vw, 58px);
  padding: clamp(115px, 15vw, 235px) 0;
  display: grid;
  grid-template-columns: minmax(140px, 0.24fr) minmax(0, 1.2fr) minmax(
      260px,
      0.42fr
    );
  align-items: start;
  gap: clamp(34px, 6vw, 110px);
  border-top: 1px solid rgba(17, 17, 17, 0.22);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const StatementTitle = styled.h2`
  max-width: 1150px;
  margin: 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(3rem, 6.4vw, 8.1rem);
  line-height: 0.88;
  font-weight: 700;
  letter-spacing: -0.067em;
`;

const StatementCopy = styled.p`
  max-width: 430px;
  margin: 0;
  font-size: clamp(1rem, 1.3vw, 1.28rem);
  line-height: 1.56;
  font-weight: 560;
`;

const CapabilityRail = styled.div`
  width: 100%;
  padding: 24px 0;
  overflow: hidden;
  border-top: 1px solid rgba(17, 17, 17, 0.22);
  border-bottom: 1px solid rgba(17, 17, 17, 0.22);
`;

const CapabilityTrack = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  animation: about-capability-marquee 36s linear infinite;

  span {
    display: inline-flex;
    align-items: center;
    gap: 26px;
    padding-right: 26px;
    white-space: nowrap;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(1.35rem, 2.2vw, 2.7rem);
    line-height: 1;
    font-weight: 700;
    letter-spacing: -0.04em;
  }

  i {
    font-size: 0.46em;
    font-style: normal;
  }

  @keyframes about-capability-marquee {
    to {
      transform: translateX(-50%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ReelSection = styled.section`
  padding: clamp(115px, 15vw, 235px) clamp(18px, 3vw, 58px);
  background: #fff;
`;

const SectionHeader = styled.header`
  padding-top: 24px;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.44fr);
  align-items: end;
  gap: clamp(40px, 8vw, 145px);
  border-top: 1px solid rgba(17, 17, 17, 0.22);

  > div {
    display: flex;
    flex-direction: column;
    gap: clamp(42px, 7vw, 105px);
  }

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

const SectionTitle = styled.h2`
  max-width: 1120px;
  margin: 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(3rem, 6.8vw, 8.3rem);
  line-height: 0.87;
  font-weight: 700;
  letter-spacing: -0.068em;
`;

const SectionIntro = styled.p`
  max-width: 460px;
  margin: 0 0 0.2em;
  font-size: clamp(1rem, 1.4vw, 1.34rem);
  line-height: 1.52;
  font-weight: 570;
`;

const VisualRail = styled.div`
  height: clamp(620px, 65vw, 940px);
  margin-top: clamp(74px, 10vw, 150px);
  display: flex;
  gap: clamp(8px, 0.8vw, 14px);
  overflow: hidden;

  @media (max-width: 860px) {
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

const VisualPanel = styled.article`
  min-width: 0;
  flex: 1;
  transition: flex 620ms cubic-bezier(0.2, 0.72, 0.2, 1);

  &:hover {
    flex: 2.1;
  }

  @media (max-width: 860px) {
    aspect-ratio: 4 / 5;
  }
`;

const VisualLink = styled(Link)`
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
  overflow: hidden;
  color: #fff;
  background: #111;
  text-decoration: none;
`;

const VisualImage = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  will-change: clip-path, transform;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform 650ms cubic-bezier(0.2, 0.72, 0.2, 1);
  }

  ${VisualLink}:hover & img {
    transform: scale(1.045) !important;
  }
`;

const VisualFallback = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  align-items: flex-end;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(2rem, 4vw, 5rem);
  line-height: 0.9;
  font-weight: 700;
`;

const VisualOverlay = styled.div`
  position: absolute;
  z-index: 2;
  inset: 0;
  padding: clamp(18px, 2vw, 32px);
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: end;
  gap: 18px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.04) 50%,
    rgba(0, 0, 0, 0.72) 100%
  );

  span {
    font-size: 0.66rem;
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  strong {
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: clamp(0.92rem, 1.3vw, 1.2rem);
    font-weight: 800;
  }

  i {
    font-size: 1.25rem;
    font-style: normal;
    transition: transform 220ms ease;
  }

  ${VisualLink}:hover & i {
    transform: rotate(45deg);
  }
`;

const PracticeSection = styled.section`
  padding: clamp(115px, 15vw, 235px) clamp(18px, 3vw, 58px);
`;

const PracticeGrid = styled.div`
  margin-top: clamp(70px, 10vw, 145px);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid rgba(17, 17, 17, 0.22);
  border-left: 1px solid rgba(17, 17, 17, 0.22);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const PracticeCard = styled(Link)`
  min-height: clamp(420px, 38vw, 620px);
  padding: clamp(28px, 4vw, 66px);
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(17, 17, 17, 0.22);
  border-bottom: 1px solid rgba(17, 17, 17, 0.22);
  color: inherit;
  background: transparent;
  text-decoration: none;
  transition:
    color 320ms ease,
    background 320ms ease;

  h3 {
    max-width: 590px;
    margin: auto 0 28px;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(2.4rem, 5vw, 6.3rem);
    line-height: 0.88;
    font-weight: 700;
    letter-spacing: -0.065em;
  }

  p {
    max-width: 520px;
    margin: 0;
    font-size: clamp(0.95rem, 1.2vw, 1.14rem);
    line-height: 1.55;
    font-weight: 560;
    opacity: 0.72;
  }

  &:hover {
    color: #fff;
    background: #111;
  }
`;

const PracticeTopline = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.1em;
  }

  i {
    font-size: 1.25rem;
    font-style: normal;
    transition: transform 240ms ease;
  }

  ${PracticeCard}:hover & i {
    transform: rotate(45deg);
  }
`;

const PerspectiveSection = styled.section`
  padding: clamp(110px, 14vw, 220px) clamp(18px, 3vw, 58px);
  color: #f7f6f2;
  background: #111;
`;

const PerspectiveGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(340px, 0.66fr) minmax(0, 1.34fr);
  gap: clamp(50px, 8vw, 140px);
  align-items: center;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const PerspectiveCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(36px, 6vw, 84px);
`;

const PerspectiveTitle = styled.h2`
  margin: 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(3.2rem, 7vw, 8.7rem);
  line-height: 0.84;
  font-weight: 700;
  letter-spacing: -0.072em;
`;

const PerspectiveText = styled.p`
  max-width: 520px;
  margin: 0;
  color: rgba(247, 246, 242, 0.72);
  font-size: clamp(1rem, 1.35vw, 1.28rem);
  line-height: 1.56;
  font-weight: 560;
`;

const PerspectiveMedia = styled.div`
  min-height: clamp(560px, 62vw, 920px);
  position: relative;
  overflow: hidden;
  background: #1a1a1a;
  will-change: clip-path, transform;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`;

const PerspectiveBadge = styled.div`
  position: absolute;
  right: clamp(18px, 2.4vw, 38px);
  bottom: clamp(18px, 2.4vw, 38px);
  left: clamp(18px, 2.4vw, 38px);
  padding-top: 18px;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.52);
  color: #fff;

  span {
    font-size: 0.67rem;
    font-weight: 900;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }
`;

const StudioFacts = styled.div`
  margin-top: clamp(80px, 10vw, 155px);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid rgba(247, 246, 242, 0.24);
  border-left: 1px solid rgba(247, 246, 242, 0.24);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Fact = styled.div`
  min-height: 250px;
  padding: clamp(24px, 3vw, 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(247, 246, 242, 0.24);
  border-bottom: 1px solid rgba(247, 246, 242, 0.24);

  strong {
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(4rem, 8vw, 9.2rem);
    line-height: 0.75;
    letter-spacing: -0.08em;
  }

  span {
    max-width: 250px;
    color: rgba(247, 246, 242, 0.68);
    font-size: 0.82rem;
    line-height: 1.45;
    font-weight: 700;
  }
`;

const ProcessSection = styled.section`
  padding: clamp(115px, 15vw, 235px) clamp(18px, 3vw, 58px);
  background: #fff;
`;

const ProcessList = styled.div`
  margin-top: clamp(78px, 10vw, 150px);
  border-top: 1px solid rgba(17, 17, 17, 0.24);
`;

const ProcessRow = styled.div`
  min-height: clamp(180px, 17vw, 270px);
  padding: clamp(24px, 3vw, 46px) 0;
  display: grid;
  grid-template-columns: 90px minmax(220px, 0.55fr) minmax(280px, 0.72fr) auto;
  align-items: center;
  gap: clamp(24px, 4vw, 70px);
  border-bottom: 1px solid rgba(17, 17, 17, 0.24);
  transition:
    padding 300ms ease,
    background 300ms ease;

  &:hover {
    padding-right: clamp(12px, 2vw, 32px);
    padding-left: clamp(12px, 2vw, 32px);
    background: #f3f1eb;
  }

  @media (max-width: 820px) {
    grid-template-columns: 55px 1fr auto;

    p {
      grid-column: 2 / -1;
    }
  }
`;

const ProcessNumber = styled.span`
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.1em;
`;

const ProcessTitle = styled.h3`
  margin: 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(2rem, 4vw, 5rem);
  line-height: 0.9;
  font-weight: 700;
  letter-spacing: -0.055em;
`;

const ProcessText = styled.p`
  max-width: 600px;
  margin: 0;
  color: rgba(17, 17, 17, 0.67);
  font-size: clamp(0.95rem, 1.15vw, 1.12rem);
  line-height: 1.55;
  font-weight: 560;
`;

const ProcessArrow = styled.span`
  font-size: clamp(1.7rem, 2.5vw, 3rem);
  transition: transform 260ms ease;

  ${ProcessRow}:hover & {
    transform: rotate(-45deg);
  }
`;

const ExploreSection = styled.section`
  padding: clamp(110px, 14vw, 220px) clamp(18px, 3vw, 58px);
`;

const ExploreHeader = styled.header`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: clamp(44px, 7vw, 105px);
  border-top: 1px solid rgba(17, 17, 17, 0.22);
`;

const ExploreTitle = styled.h2`
  margin: 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(3.2rem, 7.4vw, 9rem);
  line-height: 0.84;
  font-weight: 700;
  letter-spacing: -0.073em;
`;

const ExploreList = styled.div`
  margin-top: clamp(72px, 10vw, 145px);
  border-top: 1px solid rgba(17, 17, 17, 0.22);
`;

const ExploreLink = styled(Link)`
  min-height: clamp(170px, 15vw, 250px);
  padding: clamp(24px, 3vw, 46px) 0;
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(24px, 5vw, 90px);
  border-bottom: 1px solid rgba(17, 17, 17, 0.22);
  color: inherit;
  text-decoration: none;
  transition:
    padding 300ms ease,
    color 300ms ease,
    background 300ms ease;

  > span {
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.1em;
  }

  h3 {
    margin: 0;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(2.2rem, 4.7vw, 5.8rem);
    line-height: 0.88;
    font-weight: 700;
    letter-spacing: -0.06em;
  }

  p {
    max-width: 610px;
    margin: 14px 0 0;
    color: rgba(17, 17, 17, 0.63);
    font-size: 0.9rem;
    line-height: 1.5;
    font-weight: 560;
  }

  i {
    font-size: clamp(1.7rem, 3vw, 3.4rem);
    font-style: normal;
    transition: transform 240ms ease;
  }

  &:hover {
    padding-right: clamp(14px, 2vw, 32px);
    padding-left: clamp(14px, 2vw, 32px);
    color: #fff;
    background: #111;
  }

  &:hover p {
    color: rgba(255, 255, 255, 0.7);
  }

  &:hover i {
    transform: rotate(45deg);
  }

  @media (max-width: 680px) {
    grid-template-columns: 48px minmax(0, 1fr) auto;
  }
`;

const ClosingSection = styled.section`
  min-height: clamp(640px, 74vw, 1020px);
  padding: clamp(76px, 10vw, 150px) clamp(18px, 3vw, 58px)
    clamp(36px, 5vw, 80px);
  display: flex;
  flex-direction: column;
  color: #111;
  background: #fff;
  border-top: 1px solid rgba(17, 17, 17, 0.14);
`;

const ClosingEyebrow = styled.p`
  margin: 0;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.11em;
  text-transform: uppercase;
`;

const ClosingLink = styled(Link)`
  margin: auto 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: clamp(30px, 6vw, 100px);
  color: inherit;
  text-decoration: none;

  span {
    max-width: 1480px;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(4rem, 9.8vw, 12rem);
    line-height: 0.77;
    font-weight: 700;
    letter-spacing: -0.084em;
  }

  i {
    font-size: clamp(3rem, 6vw, 7.2rem);
    font-style: normal;
    transition: transform 260ms ease;
  }

  &:hover i {
    transform: rotate(45deg);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const ClosingMeta = styled.div`
  padding-top: 22px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(17, 17, 17, 0.22);

  span {
    font-size: 0.67rem;
    font-weight: 900;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }
`;