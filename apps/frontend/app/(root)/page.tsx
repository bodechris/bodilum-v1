"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomePageComp from "@/components/ui/HomePageComp";
import PageV0 from "@/components/ui/page-v0/PageV0";
import { workProjects } from "../work/workData";

gsap.registerPlugin(ScrollTrigger);

const featuredSlugs = [
  "biznesxpo-microsites",
  "bobobo-ai-challenger",
  "naija-fashion-index",
  "afrochess",
  "unscripted-with-nompumelelo",
  "bahati",
];

const servicePathways = [
  {
    index: "01",
    eyebrow: "A clear visual starting point",
    title: "Design Directions",
    description:
      "Explore a focused identity direction before committing to a complete brand system. We shape the logo thinking, colour, typography, applications and visual world into one confident route.",
    outcome:
      "A distinctive direction your business can approve, refine and grow into.",
    href: "/design-direction",
    cta: "Explore design directions",
    tone: "paper" as const,
    visualStyle: "collage" as const,
    imagePosition: "center center",
    images: [
      "/images/beauty-yossi/yossi-2560-1440.webp",
      "/images/real-estate-savanah-nest/savanah_nest_2560x1440.webp",
      "/images/beauty-moria/mori-logo-bg-3.webp",
    ],
  },
  {
    index: "02",
    eyebrow: "Cinematic digital storytelling",
    title: "Web Xperiences",
    description:
      "Editorial websites and interactive worlds that combine art direction, motion, 3D, WebGL and advanced front-end development without losing clarity or commercial purpose.",
    outcome:
      "A digital experience people do not only visit — they explore, feel and remember.",
    href: "/web-experiences",
    cta: "Enter web xperiences",
    tone: "ink" as const,
    visualStyle: "single" as const,
    imagePosition: "center center",
    images: ["/portfolios/afrochess/afrochess-26.webp"],
  },
  {
    index: "03",
    eyebrow: "Ongoing visibility + conversion",
    title: "Growth Systems",
    description:
      "Monthly design, content, web, analytics and practical AI support connected into one system — so your business can publish consistently, respond faster and convert more opportunities.",
    outcome:
      "A repeatable route from attention to enquiries, follow-up and measurable growth.",
    href: "/growth-systems",
    cta: "View growth systems",
    tone: "signal" as const,
    visualStyle: "single" as const,
    imagePosition: "center center",
    images: ["/images/ai-integrations-4.webp"],
  },
];

const capabilities = [
  "Brand identity",
  "Creative direction",
  "Motion design",
  "3D design",
  "WebGL + Three.js",
  "Product design",
  "AI integrations",
  "Advanced development",
];

const testimonials = [
  {
    quote:
      "Bodilum gave us more than a polished identity. They created a visual system that finally made our product feel as ambitious as the business behind it, and the process stayed clear from the first workshop to launch.",
    name: "Amina Okafor",
    role: "Founder",
    company: "Kora House",
    market: "Lagos, Nigeria",
  },
  {
    quote:
      "The team translated a complicated service into a digital experience that feels simple, premium and easy to trust. Our internal team could immediately see how the new direction would improve every customer touchpoint.",
    name: "Thabo Maseko",
    role: "Managing Director",
    company: "Northline Advisory",
    market: "Johannesburg, South Africa",
  },
  {
    quote:
      "What stood out was the balance of design thinking and engineering depth. The final product looked distinctive, moved beautifully and still performed like a serious business platform from day one.",
    name: "Jordan Ellis",
    role: "Product Lead",
    company: "Fieldwork Labs",
    market: "Austin, United States",
  },
];

export default function Home() {
  const middleRef = useRef<HTMLElement>(null);
  const testimonialContentRef = useRef<HTMLDivElement>(null);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);

  const activeTestimonial = testimonials[activeTestimonialIndex];

  const showPreviousTestimonial = () => {
    setActiveTestimonialIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length,
    );
  };

  const showNextTestimonial = () => {
    setActiveTestimonialIndex((current) => (current + 1) % testimonials.length);
  };

  const featuredProjects = useMemo(
    () =>
      featuredSlugs
        .map((slug) => workProjects.find((project) => project.slug === slug))
        .filter((project): project is (typeof workProjects)[number] =>
          Boolean(project),
        ),
    [],
  );

  useEffect(() => {
    if (testimonialPaused) return;

    const interval = window.setInterval(() => {
      setActiveTestimonialIndex(
        (current) => (current + 1) % testimonials.length,
      );
    }, 7000);

    return () => window.clearInterval(interval);
  }, [testimonialPaused]);

  useLayoutEffect(() => {
    if (!testimonialContentRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-testimonial-animate]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.06,
          ease: "power3.out",
        },
      );
    }, testimonialContentRef);

    return () => context.revert();
  }, [activeTestimonialIndex]);

  useLayoutEffect(() => {
    if (!middleRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const context = gsap.context(() => {
      const revealItems = gsap.utils.toArray(
        "[data-home-reveal]",
      ) as HTMLElement[];
      const mediaItems = gsap.utils.toArray(
        "[data-home-media]",
      ) as HTMLElement[];

      revealItems.forEach((element) => {
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

      mediaItems.forEach((element) => {
        const image = element.querySelector("img");

        gsap.fromTo(
          element,
          { clipPath: "inset(100% 0% 0% 0%)", y: 68 },
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
    }, middleRef);

    return () => context.revert();
  }, []);

  return (
    <PageV0>
      {/* The existing homepage hero and both of its CTAs stay completely unchanged. */}
      <HomePageComp />

      {/* Everything below is inserted after the existing hero and before PageV0's animated footer logo. */}
      <HomeMiddle ref={middleRef} data-home-revision="clear-service-visuals-v4">
        <StudioStatement data-home-reveal>
          <SectionEyebrow>One connected creative practice</SectionEyebrow>
          <StatementTitle>
            Strategy, identity, motion and software shaped as one experience.
          </StatementTitle>
          <StatementCopy>
            Bodilum works across the layers that ambitious brands normally split
            between several teams. The idea, visual language, movement and final
            product are developed together — creating work that feels clearer,
            more coherent and harder to ignore.
          </StatementCopy>
        </StudioStatement>

        <CapabilityRail aria-label="Bodilum capabilities">
          <CapabilityTrack>
            {[...capabilities, ...capabilities].map((capability, index) => (
              <span key={`${capability}-${index}`}>
                {capability} <i aria-hidden="true">✦</i>
              </span>
            ))}
          </CapabilityTrack>
        </CapabilityRail>

        <SelectedWorkSection>
          <SectionHeader data-home-reveal>
            <HeaderTitleBlock>
              <SectionEyebrow>Selected work / 2026</SectionEyebrow>
              <SectionTitle>
                Built with purpose.
                <br />
                Finished with feeling.
              </SectionTitle>
            </HeaderTitleBlock>
            <HeaderDescription>
              A selection of brand identities, products, motion systems and
              interactive experiences that define where the studio is going.
            </HeaderDescription>
          </SectionHeader>

          <WorkGrid>
            {featuredProjects.map((project, index) => (
              <WorkArticle key={project.slug} $index={index} data-home-reveal>
                <WorkLink href={`/work/${project.slug}`}>
                  <WorkMedia data-home-media $surface={project.surface}>
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
                      <WorkFallback $accent={project.accent}>
                        <span>{project.shortTitle}</span>
                      </WorkFallback>
                    )}
                    <WorkHover>
                      <span>View project</span>
                      <strong aria-hidden="true">↗</strong>
                    </WorkHover>
                  </WorkMedia>

                  <WorkInformation>
                    <WorkMeta>
                      <span>{project.number}</span>
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </WorkMeta>
                    <WorkTitleRow>
                      <h3>{project.title}</h3>
                      <span aria-hidden="true">↗</span>
                    </WorkTitleRow>
                    <p>{project.summary}</p>
                  </WorkInformation>
                </WorkLink>
              </WorkArticle>
            ))}
          </WorkGrid>

          <ViewAllWork data-home-reveal>
            <span>
              {String(workProjects.length).padStart(2, "0")} projects and
              growing
            </span>
            <EditorialLink href="/work">
              View all work <span aria-hidden="true">↗</span>
            </EditorialLink>
          </ViewAllWork>
        </SelectedWorkSection>

        <PathwaysSection>
          <SectionHeader data-home-reveal>
            <HeaderTitleBlock>
              <SectionEyebrow>Ways into the studio</SectionEyebrow>
              <SectionTitle>
                Start with the layer
                <br />
                your business needs now.
              </SectionTitle>
            </HeaderTitleBlock>
            <HeaderDescription>
              Commission a focused visual direction, build an unforgettable web
              experience, or create the monthly system that keeps your business
              visible and moving.
            </HeaderDescription>
          </SectionHeader>

          <PathwayList>
            {servicePathways.map((pathway) => (
              <PathwayCard
                key={pathway.title}
                $tone={pathway.tone}
                $visualStyle={pathway.visualStyle}
                data-home-reveal
              >
                <PathwayVisual
                  data-home-media
                  aria-hidden="true"
                  $visualStyle={pathway.visualStyle}
                >
                  <PathwayMainImage $visualStyle={pathway.visualStyle}>
                    <img
                      src={pathway.images[0]}
                      alt=""
                      style={{ objectPosition: pathway.imagePosition }}
                    />
                  </PathwayMainImage>

                  {pathway.visualStyle === "collage" && (
                    <>
                      <PathwaySmallImage $position="top">
                        <img src={pathway.images[1]} alt="" />
                      </PathwaySmallImage>
                      <PathwaySmallImage $position="bottom">
                        <img src={pathway.images[2]} alt="" />
                      </PathwaySmallImage>
                      <PathwayNumber>{pathway.index}</PathwayNumber>
                    </>
                  )}
                </PathwayVisual>

                <PathwayContent>
                  <PathwayMeta>
                    <span>{pathway.index}</span>
                    <span>{pathway.eyebrow}</span>
                  </PathwayMeta>
                  <PathwayTitle>{pathway.title}</PathwayTitle>
                  <PathwayDescription>{pathway.description}</PathwayDescription>
                  <PathwayOutcome>
                    <small>What it gives you</small>
                    <p>{pathway.outcome}</p>
                  </PathwayOutcome>
                  <PathwayLink href={pathway.href}>
                    {pathway.cta} <span aria-hidden="true">↗</span>
                  </PathwayLink>
                </PathwayContent>
              </PathwayCard>
            ))}
          </PathwayList>
        </PathwaysSection>

        <TestimonialSection aria-labelledby="testimonial-heading">
          <TestimonialIntro data-home-reveal>
            <div>
              <SectionEyebrow>Client perspective</SectionEyebrow>
              <TestimonialHeading id="testimonial-heading">
                Three perspectives. One standard of care.
              </TestimonialHeading>
            </div>
            <p>
              Sample testimonials for layout demonstration. Replace each quote,
              name and company with verified client feedback before publishing.
            </p>
          </TestimonialIntro>

          <TestimonialCarousel
            data-home-reveal
            onMouseEnter={() => setTestimonialPaused(true)}
            onMouseLeave={() => setTestimonialPaused(false)}
          >
            <TestimonialProgress aria-hidden="true">
              <span>{String(activeTestimonialIndex + 1).padStart(2, "0")}</span>
              <ProgressTrack>
                <i
                  style={{
                    width: `${
                      ((activeTestimonialIndex + 1) / testimonials.length) * 100
                    }%`,
                  }}
                />
              </ProgressTrack>
              <span>{String(testimonials.length).padStart(2, "0")}</span>
            </TestimonialProgress>

            <TestimonialContent ref={testimonialContentRef} aria-live="polite">
              <QuoteMark data-testimonial-animate aria-hidden="true">
                “
              </QuoteMark>
              <blockquote data-testimonial-animate>
                {activeTestimonial.quote}
              </blockquote>
              <TestimonialFooter data-testimonial-animate>
                <div>
                  <strong>{activeTestimonial.name}</strong>
                  <span>
                    {activeTestimonial.role} · {activeTestimonial.company}
                  </span>
                </div>
                <TestimonialMarket>
                  {activeTestimonial.market}
                </TestimonialMarket>
              </TestimonialFooter>
            </TestimonialContent>

            <CarouselControls>
              <ControlButton
                type="button"
                onClick={showPreviousTestimonial}
                aria-label="Show previous testimonial"
              >
                <span aria-hidden="true">←</span>
                Previous
              </ControlButton>

              <CarouselDots aria-label="Choose testimonial">
                {testimonials.map((testimonial, index) => (
                  <DotButton
                    key={testimonial.name}
                    type="button"
                    $active={index === activeTestimonialIndex}
                    onClick={() => setActiveTestimonialIndex(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-pressed={index === activeTestimonialIndex}
                  />
                ))}
              </CarouselDots>

              <ControlButton
                type="button"
                onClick={showNextTestimonial}
                aria-label="Show next testimonial"
              >
                Next
                <span aria-hidden="true">→</span>
              </ControlButton>
            </CarouselControls>
          </TestimonialCarousel>
        </TestimonialSection>

        <ClosingSection data-home-reveal>
          <ClosingEyebrow>
            Have a brand, platform or experience in mind?
          </ClosingEyebrow>
          <ClosingLink href="/contact">
            <span>Let&apos;s build something people remember.</span>
            <i aria-hidden="true">↗</i>
          </ClosingLink>
          <ClosingMeta>
            <span>Brand · Motion · AI · Digital</span>
          </ClosingMeta>
        </ClosingSection>
      </HomeMiddle>
    </PageV0>
  );
}

const HomeMiddle = styled.main`
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

const StudioStatement = styled.section`
  margin: 0 clamp(18px, 3vw, 58px);
  padding: clamp(120px, 15vw, 240px) 0 clamp(100px, 13vw, 210px);
  display: grid;
  grid-template-columns: minmax(145px, 0.28fr) minmax(0, 1.15fr) minmax(
      260px,
      0.48fr
    );
  align-items: start;
  gap: clamp(30px, 5vw, 92px);
  border-top: 1px solid rgba(17, 17, 17, 0.2);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const SectionEyebrow = styled.p`
  margin: 0;
  font-size: 0.72rem;
  line-height: 1.2;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const StatementTitle = styled.h2`
  max-width: 1080px;
  margin: 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(2.8rem, 5.8vw, 7.5rem);
  line-height: 0.92;
  font-weight: 700;
  letter-spacing: -0.062em;
`;

const StatementCopy = styled.p`
  max-width: 430px;
  margin: 0;
  font-size: clamp(1rem, 1.3vw, 1.3rem);
  line-height: 1.55;
  font-weight: 560;
`;

const CapabilityRail = styled.div`
  width: 100%;
  padding: 25px 0;
  overflow: hidden;
  border-top: 1px solid rgba(17, 17, 17, 0.2);
  border-bottom: 1px solid rgba(17, 17, 17, 0.2);
`;

const CapabilityTrack = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  animation: capability-marquee 34s linear infinite;

  span {
    display: inline-flex;
    align-items: center;
    gap: 28px;
    padding-right: 28px;
    white-space: nowrap;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(1.35rem, 2.2vw, 2.7rem);
    line-height: 1;
    font-weight: 700;
    letter-spacing: -0.04em;
  }

  i {
    font-family: sans-serif;
    font-size: 0.48em;
    font-style: normal;
  }

  @keyframes capability-marquee {
    to {
      transform: translateX(-50%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const SelectedWorkSection = styled.section`
  padding: clamp(120px, 15vw, 240px) clamp(18px, 3vw, 58px);
`;

const PathwaysSection = styled.section`
  padding: clamp(110px, 13vw, 220px) clamp(18px, 3vw, 58px);
  background: #fff;
`;

const SectionHeader = styled.header`
  padding-top: clamp(24px, 3vw, 48px);
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.46fr);
  align-items: end;
  gap: clamp(36px, 8vw, 140px);
  border-top: 1px solid rgba(17, 17, 17, 0.22);

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

const HeaderTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(42px, 7vw, 110px);
`;

const SectionTitle = styled.h2`
  max-width: 1120px;
  margin: 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(3rem, 6.9vw, 8.3rem);
  line-height: 0.87;
  font-weight: 700;
  letter-spacing: -0.068em;
`;

const HeaderDescription = styled.p`
  max-width: 470px;
  margin: 0 0 0.25em;
  font-size: clamp(1rem, 1.45vw, 1.38rem);
  line-height: 1.5;
  font-weight: 580;
`;

const WorkGrid = styled.div`
  margin-top: clamp(76px, 10vw, 155px);
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: clamp(14px, 1.7vw, 30px);
  row-gap: clamp(80px, 11vw, 170px);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 78px;
  }
`;

const WorkArticle = styled.article<{ $index: number }>`
  grid-column: ${({ $index }) => {
    switch ($index) {
      case 0:
        return "1 / span 8";
      case 1:
        return "9 / span 4";
      case 2:
        return "1 / span 5";
      case 3:
        return "6 / span 7";
      case 4:
        return "1 / span 7";
      default:
        return "8 / span 5";
    }
  }};
  align-self: ${({ $index }) => ($index === 1 || $index === 5 ? "end" : "start")};

  @media (max-width: 760px) {
    grid-column: 1;
  }
`;

const WorkLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const WorkMedia = styled.div<{ $surface: string }>`
  aspect-ratio: 16 / 10;
  position: relative;
  overflow: hidden;
  background: ${({ $surface }) => $surface};
  will-change: clip-path, transform;

  ${WorkArticle}:nth-child(2) &,
  ${WorkArticle}:nth-child(5) & {
    aspect-ratio: 4 / 5;
  }

  ${WorkArticle}:nth-child(3) &,
  ${WorkArticle}:nth-child(6) & {
    aspect-ratio: 1 / 1;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform 700ms cubic-bezier(0.2, 0.72, 0.2, 1);
  }

  ${WorkLink}:hover & img {
    transform: scale(1.035) !important;
  }
`;

const WorkFallback = styled.div<{ $accent: string }>`
  width: 100%;
  height: 100%;
  padding: 40px;
  display: flex;
  align-items: flex-end;
  color: #fff;
  background: ${({ $accent }) => $accent};

  span {
    max-width: 85%;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(2.2rem, 5vw, 6rem);
    line-height: 0.9;
    font-weight: 700;
    letter-spacing: -0.06em;
  }
`;

const WorkHover = styled.div`
  position: absolute;
  right: 18px;
  bottom: 18px;
  padding: 14px 17px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 999px;
  color: #111;
  background: rgba(255, 255, 255, 0.93);
  backdrop-filter: blur(8px);
  transform: translateY(14px);
  opacity: 0;
  transition:
    opacity 260ms ease,
    transform 260ms ease;

  span {
    font-size: 0.72rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  strong {
    font-size: 1rem;
  }

  ${WorkLink}:hover & {
    transform: translateY(0);
    opacity: 1;
  }

  @media (hover: none) {
    display: none;
  }
`;

const WorkInformation = styled.div`
  padding-top: 20px;

  > p {
    max-width: 680px;
    margin: 14px 0 0;
    color: rgba(17, 17, 17, 0.68);
    font-size: 0.95rem;
    line-height: 1.48;
    font-weight: 560;
  }
`;

const WorkMeta = styled.div`
  padding-bottom: 12px;
  display: flex;
  gap: 14px;
  border-bottom: 1px solid rgba(17, 17, 17, 0.2);

  span {
    font-size: 0.67rem;
    font-weight: 900;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  span:last-child {
    margin-left: auto;
  }
`;

const WorkTitleRow = styled.div`
  padding-top: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 22px;

  h3 {
    margin: 0;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(1.65rem, 2.75vw, 3.6rem);
    line-height: 0.96;
    font-weight: 700;
    letter-spacing: -0.055em;
  }

  > span {
    font-size: 1.3rem;
    transition: transform 220ms ease;
  }

  ${WorkLink}:hover & > span {
    transform: rotate(45deg);
  }
`;

const ViewAllWork = styled.div`
  margin-top: clamp(90px, 12vw, 180px);
  padding-top: clamp(24px, 3vw, 45px);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 36px;
  border-top: 1px solid rgba(17, 17, 17, 0.22);

  > span {
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  @media (max-width: 620px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const EditorialLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: clamp(24px, 4vw, 70px);
  color: inherit;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(2rem, 4.2vw, 5.2rem);
  line-height: 0.9;
  font-weight: 700;
  letter-spacing: -0.06em;
  text-decoration: none;

  span {
    font-family: sans-serif;
    font-size: 0.48em;
    transition: transform 250ms ease;
  }

  &:hover span {
    transform: rotate(45deg);
  }
`;

const PathwayList = styled.div`
  margin-top: clamp(72px, 10vw, 150px);
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 4vw, 66px);
`;

type PathwayTone = "paper" | "ink" | "signal";
type PathwayVisualStyle = "collage" | "single";

const PathwayCard = styled.article<{
  $tone: PathwayTone;
  $visualStyle: PathwayVisualStyle;
}>`
  min-height: ${({ $visualStyle }) =>
    $visualStyle === "single"
      ? "clamp(650px, 64vw, 900px)"
      : "clamp(680px, 70vw, 980px)"};
  padding: clamp(12px, 1.4vw, 24px);
  display: grid;
  grid-template-columns: ${({ $visualStyle }) =>
    $visualStyle === "single"
      ? "minmax(0, 1.12fr) minmax(390px, 0.88fr)"
      : "minmax(0, 1.14fr) minmax(340px, 0.72fr)"};
  gap: clamp(12px, 1.4vw, 24px);
  color: ${({ $tone }) => ($tone === "ink" ? "#fff" : "#111")};
  background: ${({ $tone }) => {
    if ($tone === "ink") return "#111";
    if ($tone === "signal") return "#eef1f5";
    return "#e9e5dd";
  }};

  &:nth-child(even) {
    grid-template-columns: ${({ $visualStyle }) =>
      $visualStyle === "single"
        ? "minmax(390px, 0.88fr) minmax(0, 1.12fr)"
        : "minmax(340px, 0.72fr) minmax(0, 1.14fr)"};

    > div:first-child {
      order: 2;
    }
  }

  @media (max-width: 1050px) {
    grid-template-columns: minmax(0, 1fr) minmax(330px, 0.8fr);

    &:nth-child(even) {
      grid-template-columns: minmax(330px, 0.8fr) minmax(0, 1fr);
    }
  }

  @media (max-width: 900px) {
    min-height: auto;
    grid-template-columns: 1fr;

    &:nth-child(even) {
      grid-template-columns: 1fr;

      > div:first-child {
        order: 0;
      }
    }
  }
`;

const PathwayVisual = styled.div<{ $visualStyle: PathwayVisualStyle }>`
  min-height: ${({ $visualStyle }) =>
    $visualStyle === "single" ? "620px" : "640px"};
  position: relative;
  overflow: hidden;
  background: ${({ $visualStyle }) =>
    $visualStyle === "single" ? "#111" : "#d8d4cd"};
  will-change: clip-path, transform;

  ${({ $visualStyle }) =>
    $visualStyle === "single" &&
    `
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 62%, rgba(0, 0, 0, 0.14) 100%);
      }
    `}

  @media (max-width: 900px) {
    min-height: min(82vw, 680px);
  }
`;

const PathwayMainImage = styled.div<{ $visualStyle: PathwayVisualStyle }>`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    ${({ $visualStyle }) =>
      $visualStyle === "single" &&
      `
        transform: scale(1.001);
      `}
  }
`;

const PathwaySmallImage = styled.div<{ $position: "top" | "bottom" }>`
  width: clamp(145px, 21vw, 340px);
  aspect-ratio: 4 / 3;
  position: absolute;
  z-index: 2;
  right: clamp(16px, 2.2vw, 36px);
  ${({ $position }) =>
    $position === "top"
      ? "top: clamp(16px, 2.2vw, 36px);"
      : "bottom: clamp(16px, 2.2vw, 36px);"}
  padding: clamp(5px, 0.65vw, 10px);
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 18px 55px rgba(0, 0, 0, 0.15);
  transform: ${({ $position }) =>
    $position === "top" ? "rotate(2.3deg)" : "rotate(-2.1deg)"};

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`;

const PathwayNumber = styled.span`
  position: absolute;
  z-index: 3;
  left: clamp(18px, 2vw, 36px);
  bottom: clamp(18px, 2vw, 36px);
  color: #fff;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(3.2rem, 7vw, 9rem);
  line-height: 0.75;
  font-weight: 700;
  letter-spacing: -0.08em;
  mix-blend-mode: difference;
`;

const PathwayContent = styled.div`
  padding: clamp(34px, 5vw, 82px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 42px;
`;

const PathwayMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 26px;

  span {
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  span:last-child {
    text-align: right;
  }
`;

const PathwayTitle = styled.h3`
  max-width: 760px;
  margin: auto 0 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(3.15rem, 6.1vw, 7.8rem);
  line-height: 0.84;
  font-weight: 700;
  letter-spacing: -0.072em;
  overflow-wrap: normal;
  word-break: normal;
`;

const PathwayDescription = styled.p`
  max-width: 600px;
  margin: 0;
  font-size: clamp(1rem, 1.42vw, 1.38rem);
  line-height: 1.48;
  font-weight: 570;
`;

const PathwayOutcome = styled.div`
  padding-top: 24px;
  border-top: 1px solid currentColor;

  small {
    display: block;
    margin-bottom: 13px;
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.65;
  }

  p {
    max-width: 610px;
    margin: 0;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(1.55rem, 2.45vw, 3.1rem);
    line-height: 1.03;
    font-weight: 700;
    letter-spacing: -0.045em;
  }
`;

const PathwayLink = styled(Link)`
  width: fit-content;
  padding-bottom: 8px;
  display: inline-flex;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid currentColor;
  color: inherit;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  text-decoration: none;

  span {
    transition: transform 220ms ease;
  }

  &:hover span {
    transform: rotate(45deg);
  }
`;

const TestimonialSection = styled.section`
  padding: clamp(110px, 14vw, 220px) clamp(18px, 3vw, 58px);
  color: #f7f6f2;
  background: #111;
`;

const TestimonialIntro = styled.header`
  padding-bottom: clamp(42px, 6vw, 88px);
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.45fr);
  align-items: end;
  gap: clamp(36px, 8vw, 140px);
  border-bottom: 1px solid rgba(247, 246, 242, 0.24);

  > div {
    display: flex;
    flex-direction: column;
    gap: clamp(34px, 5vw, 72px);
  }

  > p {
    max-width: 470px;
    margin: 0;
    font-size: clamp(0.92rem, 1.2vw, 1.12rem);
    line-height: 1.55;
    font-weight: 570;
    color: rgba(247, 246, 242, 0.72);
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

const TestimonialHeading = styled.h2`
  max-width: 1040px;
  margin: 0;
  font-family: var(--font-bricolage-grotesque), sans-serif;
  font-size: clamp(2.8rem, 6.6vw, 8rem);
  line-height: 0.88;
  font-weight: 700;
  letter-spacing: -0.068em;
`;

const TestimonialCarousel = styled.div`
  padding-top: clamp(48px, 7vw, 105px);
`;

const TestimonialProgress = styled.div`
  display: grid;
  grid-template-columns: auto minmax(120px, 260px) auto;
  align-items: center;
  justify-content: end;
  gap: 14px;
  color: rgba(247, 246, 242, 0.65);
  font-size: 0.68rem;
  font-weight: 900;
  letter-spacing: 0.1em;
`;

const ProgressTrack = styled.span`
  height: 1px;
  overflow: hidden;
  background: rgba(247, 246, 242, 0.25);

  i {
    height: 100%;
    display: block;
    background: #fc6d05;
    transition: width 520ms cubic-bezier(0.2, 0.72, 0.2, 1);
  }
`;

const TestimonialContent = styled.div`
  min-height: clamp(530px, 55vw, 780px);
  padding: clamp(54px, 7vw, 110px) 0 clamp(44px, 6vw, 88px);
  display: grid;
  grid-template-columns: minmax(70px, 0.16fr) minmax(0, 1fr);
  align-content: start;
  gap: clamp(24px, 5vw, 90px);

  blockquote {
    max-width: 1320px;
    margin: 0;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(2.4rem, 5.1vw, 6.35rem);
    line-height: 0.96;
    font-weight: 600;
    letter-spacing: -0.055em;
  }

  @media (max-width: 760px) {
    min-height: 600px;
    grid-template-columns: 1fr;
  }
`;

const QuoteMark = styled.span`
  color: #fc6d05;
  font-family: Georgia, serif;
  font-size: clamp(5rem, 10vw, 11rem);
  line-height: 0.65;
`;

const TestimonialFooter = styled.div`
  grid-column: 2;
  margin-top: clamp(52px, 7vw, 105px);
  padding-top: 22px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;
  border-top: 1px solid rgba(247, 246, 242, 0.24);

  > div {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  strong {
    font-size: 0.9rem;
    font-weight: 900;
  }

  span {
    color: rgba(247, 246, 242, 0.65);
    font-size: 0.76rem;
  }

  @media (max-width: 760px) {
    grid-column: 1;
    flex-direction: column;
  }
`;

const TestimonialMarket = styled.small`
  padding: 9px 12px;
  border: 1px solid rgba(247, 246, 242, 0.24);
  border-radius: 999px;
  color: rgba(247, 246, 242, 0.72);
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const CarouselControls = styled.div`
  padding-top: 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  border-top: 1px solid rgba(247, 246, 242, 0.24);

  > button:last-child {
    justify-self: end;
  }
`;

const ControlButton = styled.button`
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border: 0;
  color: #f7f6f2;
  background: transparent;
  font: inherit;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  cursor: pointer;

  span {
    font-size: 1.15rem;
    transition: transform 220ms ease;
  }

  &:first-child:hover span {
    transform: translateX(-4px);
  }

  &:last-child:hover span {
    transform: translateX(4px);
  }
`;

const CarouselDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
`;

const DotButton = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "34px" : "8px")};
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? "#fc6d05" : "rgba(247, 246, 242, 0.32)"};
  cursor: pointer;
  transition:
    width 320ms ease,
    background 320ms ease;
`;

const ClosingSection = styled.section`
  min-height: clamp(620px, 72vw, 980px);
  padding: clamp(70px, 9vw, 150px) clamp(18px, 3vw, 58px) clamp(36px, 5vw, 80px);
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
  gap: clamp(28px, 6vw, 100px);
  color: inherit;
  text-decoration: none;

  span {
    max-width: 1450px;
    font-family: var(--font-bricolage-grotesque), sans-serif;
    font-size: clamp(4rem, 10vw, 12.5rem);
    line-height: 0.77;
    font-weight: 700;
    letter-spacing: -0.085em;
  }

  i {
    font-size: clamp(3rem, 6vw, 7.5rem);
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
  gap: 26px;
  border-top: 1px solid rgba(17, 17, 17, 0.22);

  span {
    font-size: 0.67rem;
    font-weight: 900;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }
`;