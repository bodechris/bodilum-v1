"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import PageV0 from "@/components/ui/page-v0/PageV0";

type Slide = {
  title: string;
  caption: string;
  src?: string;
};

type PortfolioProject = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  scope: string;
  outcome: string;
  tone: "cream" | "dark" | "warm";
  slides: Slide[];
};

const CTA_HREF =
  "mailto:hello@bodilum.com?subject=Start%20a%20Web%20Xperience%20Project&body=Hi%20Bodilum%2C%0A%0AI%27d%20like%20to%20start%20a%20Web%20Xperience%20project.%0A%0ABusiness%20name%3A%0AWebsite%20type%3A%20One-page%20/%203-5%20pages%20/%203D%20experience%0ABudget%20range%3A%0ATimeline%3A%0A";

const portfolioProjects: PortfolioProject[] = [
  {
    id: "beauty-commerce",
    number: "01",
    eyebrow: "Beauty / booking / commerce",
    title: "Kaykay Hair Studio",
    description:
      "A clean, premium beauty web experience designed to turn services, products, memberships, lookbooks and before-after results into a confident booking journey.",
    scope: "3–5 page Web Xperience",
    outcome: "Book services, browse offers, explore visual proof and enquire faster.",
    tone: "cream",
    slides: [
      {
        title: "Home experience",
        caption: "Large editorial hero with service-led conversion.",
        src: "",
      },
      {
        title: "Services story",
        caption: "Slim typography, breathing space and guided package discovery.",
        src: "",
      },
      {
        title: "Shop preview",
        caption: "Minimal product browsing for hair care and add-ons.",
        src: "",
      },
      {
        title: "Lookbook",
        caption: "Awwwards-style image browsing for beauty inspiration.",
        src: "",
      },
      {
        title: "Before / after",
        caption: "Interactive transformation sections with scroll reveal.",
        src: "",
      },
    ],
  },
  {
    id: "ai-office",
    number: "02",
    eyebrow: "AI product / dashboard / interface",
    title: "Lola AI Digital Office",
    description:
      "A product-style web experience for an AI assistant interface, combining fixed navigation, deep content panels, clean chat flow and a premium system feel.",
    scope: "Product Web Xperience",
    outcome: "Explain the product, demonstrate the workflow and move users into action.",
    tone: "dark",
    slides: [
      {
        title: "AI workspace",
        caption: "ChatGPT/Gemini-inspired layout with a fixed left panel.",
        src: "",
      },
      {
        title: "Brand office flow",
        caption: "Guided creation journey for adding a business or brand.",
        src: "",
      },
      {
        title: "Active chat state",
        caption: "Clean conversation rhythm with space for generated assets.",
        src: "",
      },
      {
        title: "Business memory",
        caption: "A structured interface for brand context, files and tasks.",
        src: "",
      },
      {
        title: "Responsive state",
        caption: "Mobile-first simplification without losing the premium feel.",
        src: "",
      },
    ],
  },
  {
    id: "webgl-lobby",
    number: "03",
    eyebrow: "3D / WebGL / immersive microsite",
    title: "3D Brand Lobby",
    description:
      "A lightweight WebGL microsite concept where users enter a minimal 3D lobby, click hotspots, explore brand pages and customise colours, logo and content.",
    scope: "3D Web Xperience",
    outcome: "Turn a brand profile into an interactive space people remember.",
    tone: "warm",
    slides: [
      {
        title: "Lobby view",
        caption: "Minimal office lobby with calm spatial composition.",
        src: "",
      },
      {
        title: "Hotspot system",
        caption: "Clickable zones for services, portfolio, contact and documents.",
        src: "",
      },
      {
        title: "Brand customisation",
        caption: "Colours, logo and typography applied to the environment.",
        src: "",
      },
      {
        title: "Content planes",
        caption: "2D content panels arranged inside a 3D world.",
        src: "",
      },
      {
        title: "Mobile transform",
        caption: "Responsive camera and layout behaviour for smaller screens.",
        src: "",
      },
    ],
  },
];

function WebXperiencePage() {
  const [activeSlides, setActiveSlides] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    portfolioProjects.forEach((project) => {
      initial[project.id] = 0;
    });
    return initial;
  });

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const setSlide = (projectId: string, slideIndex: number) => {
    setActiveSlides((current) => ({
      ...current,
      [projectId]: slideIndex,
    }));
  };

  const goToPreviousSlide = (project: PortfolioProject) => {
    setActiveSlides((current) => {
      const currentIndex = current[project.id] ?? 0;
      const nextIndex =
        currentIndex === 0 ? project.slides.length - 1 : currentIndex - 1;

      return {
        ...current,
        [project.id]: nextIndex,
      };
    });
  };

  const goToNextSlide = (project: PortfolioProject) => {
    setActiveSlides((current) => {
      const currentIndex = current[project.id] ?? 0;
      const nextIndex =
        currentIndex === project.slides.length - 1 ? 0 : currentIndex + 1;

      return {
        ...current,
        [project.id]: nextIndex,
      };
    });
  };

  return (
    <PageV0>
      <WebXperienceWrapper>
        <HeroSection>
          <HeroInner data-reveal>
            <HeroMeta>
              <span>Web Xperience</span>
              <span>Design / Motion / Frontend / AI-ready systems</span>
            </HeroMeta>

            <HeroGrid>
              <HeroCopy>
                <h1>
                  Premium websites that feel less like pages and more like
                  experiences.
                </h1>

                <p>
                  For founders, brands and creative teams that want a memorable
                  digital presence: one-page experiences, 3–5 page websites,
                  motion-led landing pages, product stories, WebGL microsites and
                  conversion-focused brand websites.
                </p>

                <CtaRow>
                  <PrimaryCta href={CTA_HREF}>
                    <span>Start a Web Xperience</span>
                    <small>→</small>
                  </PrimaryCta>
                </CtaRow>
              </HeroCopy>

              <PriceCard>
                <span className="label">Starting price</span>
                <strong>From R35,000</strong>
                <p>
                  Best for one-page experiences. Most 3–5 page or motion-heavy
                  projects range from <b>R45,000–R120,000+</b>.
                </p>

                <div>
                  <small>Typical timeline</small>
                  <span>2–6 weeks</span>
                </div>

                <div>
                  <small>Payment</small>
                  <span>50% deposit / 50% before launch</span>
                </div>
              </PriceCard>
            </HeroGrid>
          </HeroInner>
        </HeroSection>

        <OutcomeSection>
          <SectionLabel data-reveal>
            <span>Outcome</span>
            <p>What the business should be able to do after launch.</p>
          </SectionLabel>

          <OutcomeGrid>
            {[
              {
                title: "Look premium instantly",
                text: "Create a sharper first impression with a site that feels designed, intentional and trustworthy.",
              },
              {
                title: "Explain the offer clearly",
                text: "Turn services, products or ideas into a simple story people can understand and act on.",
              },
              {
                title: "Convert attention into enquiries",
                text: "Guide visitors toward one clear action: start a project, book, enquire or request access.",
              },
              {
                title: "Stand apart visually",
                text: "Use motion, scroll effects, editorial layouts, 3D or interactive sections where they add value.",
              },
              {
                title: "Launch with strong foundations",
                text: "Responsive frontend, SEO basics, analytics setup, performance checks and clean handover.",
              },
              {
                title: "Grow into a system",
                text: "Add AI replies, booking flows, content updates, CMS, pixels, reports or automation later.",
              },
            ].map((item, index) => (
              <OutcomeCard key={item.title} data-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </OutcomeCard>
            ))}
          </OutcomeGrid>

          <CenteredCta data-reveal>
            <PrimaryCta href={CTA_HREF}>
              <span>Start a Web Xperience</span>
              <small>→</small>
            </PrimaryCta>
          </CenteredCta>
        </OutcomeSection>

        <OfferStrip data-reveal>
          <p>What can be requested?</p>

          <div>
            <span>One-page web experience</span>
            <span>3–5 page brand website</span>
            <span>Motion-led landing page</span>
            <span>WebGL / 3D microsite</span>
            <span>Product story page</span>
            <span>AI-ready business website</span>
          </div>
        </OfferStrip>

        <PortfolioIntro data-reveal>
          <span>Selected directions</span>
          <h2>Three Web Xperiences currently in progress.</h2>
          <p>
           
          </p>
        </PortfolioIntro>

        <PortfolioSection>
          {portfolioProjects.map((project) => {
            const activeIndex = activeSlides[project.id] ?? 0;
            const activeSlide = project.slides[activeIndex];

            return (
              <PortfolioCase key={project.id} data-reveal>
                <CaseContent>
                  <CaseMeta>
                    <CaseNumber>{project.number}</CaseNumber>
                    <p>{project.eyebrow}</p>
                    <h3>{project.title}</h3>
                    <span>{project.description}</span>

                    <CaseFacts>
                      <div>
                        <small>Scope</small>
                        <strong>{project.scope}</strong>
                      </div>

                      <div>
                        <small>Outcome</small>
                        <strong>{project.outcome}</strong>
                      </div>
                    </CaseFacts>

                    <InlineCta href={CTA_HREF}>Start a similar project →</InlineCta>
                  </CaseMeta>

                  <CaseVisual>
                    <MediaFrame $tone={project.tone}>
                      {activeSlide.src ? (
                        <img src={activeSlide.src} alt={activeSlide.title} />
                      ) : (
                        <PlaceholderVisual>
                          <span>{project.number}</span>
                          <strong>{activeSlide.title}</strong>
                          <p>Replace with project screenshot</p>
                        </PlaceholderVisual>
                      )}

                      <SlideCounter>
                        {String(activeIndex + 1).padStart(2, "0")} /{" "}
                        {String(project.slides.length).padStart(2, "0")}
                      </SlideCounter>

                      <SlideCaption>
                        <strong>{activeSlide.title}</strong>
                        <span>{activeSlide.caption}</span>
                      </SlideCaption>
                    </MediaFrame>

                    <GalleryNav>
                      <button
                        type="button"
                        onClick={() => goToPreviousSlide(project)}
                        aria-label={`Previous ${project.title} image`}
                      >
                        Prev
                      </button>

                      <Dots>
                        {project.slides.map((slide, slideIndex) => (
                          <button
                            key={slide.title}
                            type="button"
                            aria-label={`Show ${slide.title}`}
                            className={slideIndex === activeIndex ? "active" : ""}
                            onClick={() => setSlide(project.id, slideIndex)}
                          />
                        ))}
                      </Dots>

                      <button
                        type="button"
                        onClick={() => goToNextSlide(project)}
                        aria-label={`Next ${project.title} image`}
                      >
                        Next
                      </button>
                    </GalleryNav>
                  </CaseVisual>
                </CaseContent>
              </PortfolioCase>
            );
          })}
        </PortfolioSection>

        <ProcessSection>
          <SectionLabel data-reveal>
            <span>How it works</span>
            <p>Simple enough to start quickly. Detailed enough to build properly.</p>
          </SectionLabel>

          <ProcessGrid>
            {[
              {
                title: "01 / Direction",
                text: "We define the offer, audience, visual direction, reference quality and the main action the page must drive.",
              },
              {
                title: "02 / Design system",
                text: "We create the page structure, UI direction, typography, motion language and key sections.",
              },
              {
                title: "03 / Build",
                text: "We develop the responsive frontend with interaction, scroll effects, performance and SEO foundations.",
              },
              {
                title: "04 / Launch",
                text: "We connect forms, analytics, pixels, basic reporting and hand over the live experience.",
              },
            ].map((item) => (
              <ProcessCard key={item.title} data-reveal>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </ProcessCard>
            ))}
          </ProcessGrid>
        </ProcessSection>

        <FinalCta data-reveal>
          <span>Ready when the idea deserves more than a normal website.</span>
          <h2>Start with one clear Web Xperience.</h2>
          <PrimaryCta href={CTA_HREF}>
            <span>Start a Web Xperience</span>
            <small>→</small>
          </PrimaryCta>
        </FinalCta>
      </WebXperienceWrapper>
    </PageV0>
  );
}

export default WebXperiencePage;

const WebXperienceWrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  color: #111;
  background:
    radial-gradient(circle at top left, rgba(180, 156, 119, 0.14), transparent 32rem),
    linear-gradient(180deg, #f8f5ef 0%, #fff 36%, #f6f2ea 100%);
  overflow: hidden;

  [data-reveal] {
    opacity: 0;
    transform: translateY(36px);
    transition:
      opacity 900ms ease,
      transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  [data-reveal].is-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: grid;
  align-items: center;
  padding: 9rem 4vw 6rem;

  @media (max-width: 768px) {
    padding: 7rem 1.25rem 4rem;
  }
`;

const HeroInner = styled.div`
  width: min(1560px, 100%);
  margin: 0 auto;
`;

const HeroMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: clamp(4rem, 8vw, 9rem);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.58);

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 3rem;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: clamp(2rem, 7vw, 8rem);
  align-items: end;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled.div`
  h1 {
    max-width: 1100px;
    margin: 0;
    font-size: clamp(4.4rem, 11vw, 13.5rem);
    line-height: 0.86;
    letter-spacing: -0.095em;
    font-weight: 500;
  }

  p {
    width: min(720px, 100%);
    margin: 3rem 0 0;
    font-size: clamp(1.05rem, 1.5vw, 1.45rem);
    line-height: 1.55;
    color: rgba(17, 17, 17, 0.66);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: clamp(4rem, 18vw, 6.5rem);
      letter-spacing: -0.075em;
    }

    p {
      margin-top: 2rem;
    }
  }
`;

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.6rem;
`;

const PrimaryCta = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  min-height: 58px;
  padding: 0 1.35rem 0 1.55rem;
  border-radius: 999px;
  background: #111;
  color: #fff;
  text-decoration: none;
  overflow: hidden;
  isolation: isolate;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-radius: 999px;
    background: #fff;
    z-index: -1;
    transition:
      width 460ms cubic-bezier(0.16, 1, 0.3, 1),
      height 460ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    color: #111;
  }

  &:hover::before {
    width: 120%;
    height: 320%;
  }

  small {
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
    font-size: 1rem;
    line-height: 1;
  }

  &:hover small {
    background: rgba(17, 17, 17, 0.08);
  }
`;

const PriceCard = styled.aside`
  padding: 1.35rem;
  border: 1px solid rgba(17, 17, 17, 0.12);
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.68);
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 80px rgba(17, 17, 17, 0.08);

  .label {
    display: block;
    margin-bottom: 1.7rem;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(17, 17, 17, 0.52);
  }

  > strong {
    display: block;
    font-size: clamp(3rem, 5vw, 5.4rem);
    line-height: 0.9;
    letter-spacing: -0.08em;
    font-weight: 500;
  }

  > p {
    margin: 1.5rem 0 2rem;
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(17, 17, 17, 0.65);
  }

  div {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.1rem 0;
    border-top: 1px solid rgba(17, 17, 17, 0.1);
  }

  small {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(17, 17, 17, 0.48);
  }

  div span {
    text-align: right;
    font-size: 0.9rem;
    color: rgba(17, 17, 17, 0.78);
  }
`;

const OutcomeSection = styled.section`
  width: min(1560px, calc(100% - 8vw));
  margin: 0 auto;
  padding: 8rem 0 5rem;

  @media (max-width: 768px) {
    width: calc(100% - 2.5rem);
    padding: 5rem 0 3rem;
  }
`;

const SectionLabel = styled.div`
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  span {
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(17, 17, 17, 0.48);
  }

  p {
    max-width: 680px;
    margin: 0;
    font-size: clamp(1.8rem, 4vw, 4.6rem);
    line-height: 0.95;
    letter-spacing: -0.07em;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    p {
      font-size: clamp(2.5rem, 13vw, 4rem);
    }
  }
`;

const OutcomeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid rgba(17, 17, 17, 0.12);
  border-left: 1px solid rgba(17, 17, 17, 0.12);

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const OutcomeCard = styled.article`
  min-height: 300px;
  padding: 1.25rem;
  border-right: 1px solid rgba(17, 17, 17, 0.12);
  border-bottom: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(255, 255, 255, 0.42);

  span {
    display: block;
    margin-bottom: 5rem;
    font-size: 0.78rem;
    color: rgba(17, 17, 17, 0.42);
  }

  h3 {
    max-width: 320px;
    margin: 0;
    font-size: clamp(1.5rem, 2.4vw, 2.7rem);
    line-height: 0.98;
    letter-spacing: -0.055em;
    font-weight: 500;
  }

  p {
    max-width: 390px;
    margin: 1rem 0 0;
    font-size: 0.96rem;
    line-height: 1.55;
    color: rgba(17, 17, 17, 0.58);
  }
`;

const CenteredCta = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 4rem;
`;

const OfferStrip = styled.section`
  width: min(1560px, calc(100% - 8vw));
  margin: 6rem auto 0;
  padding: 1rem 0;
  border-top: 1px solid rgba(17, 17, 17, 0.12);
  border-bottom: 1px solid rgba(17, 17, 17, 0.12);
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 2rem;

  > p {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(17, 17, 17, 0.48);
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
  }

  span {
    display: inline-flex;
    min-height: 42px;
    align-items: center;
    padding: 0 1rem;
    border: 1px solid rgba(17, 17, 17, 0.12);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.5);
    font-size: 0.85rem;
    color: rgba(17, 17, 17, 0.68);
  }

  @media (max-width: 768px) {
    width: calc(100% - 2.5rem);
    grid-template-columns: 1fr;
  }
`;

const PortfolioIntro = styled.section`
  width: min(1560px, calc(100% - 8vw));
  margin: 0 auto;
  padding: 12rem 0 5rem;

  > span {
    display: block;
    margin-bottom: 2rem;
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(17, 17, 17, 0.46);
  }

  h2 {
    width: min(980px, 100%);
    margin: 0;
    font-size: clamp(4rem, 9vw, 11rem);
    line-height: 0.88;
    letter-spacing: -0.095em;
    font-weight: 500;
  }

  p {
    width: min(620px, 100%);
    margin: 2rem 0 0 auto;
    font-size: 1.05rem;
    line-height: 1.6;
    color: rgba(17, 17, 17, 0.58);
  }

  code {
    padding: 0.15rem 0.35rem;
    border-radius: 0.4rem;
    background: rgba(17, 17, 17, 0.08);
  }

  @media (max-width: 768px) {
    width: calc(100% - 2.5rem);
    padding: 7rem 0 3rem;

    h2 {
      font-size: clamp(3.8rem, 16vw, 6.5rem);
    }

    p {
      margin-left: 0;
    }
  }
`;

const PortfolioSection = styled.section`
  width: min(1560px, calc(100% - 8vw));
  margin: 0 auto;

  @media (max-width: 768px) {
    width: calc(100% - 2.5rem);
  }
`;

const PortfolioCase = styled.article`
  min-height: 115vh;
  display: grid;
  align-items: start;
  padding: 5rem 0 8rem;
  border-top: 1px solid rgba(17, 17, 17, 0.12);

  @media (max-width: 980px) {
    min-height: auto;
    padding: 4rem 0 5rem;
  }
`;

const CaseContent = styled.div`
  display: grid;
  grid-template-columns: 0.78fr 1.22fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const CaseMeta = styled.div`
  position: sticky;
  top: 7rem;
  padding-bottom: 2rem;

  > p {
    margin: 0 0 1.4rem;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(17, 17, 17, 0.45);
  }

  h3 {
    max-width: 650px;
    margin: 0;
    font-size: clamp(3.4rem, 7vw, 8rem);
    line-height: 0.88;
    letter-spacing: -0.09em;
    font-weight: 500;
  }

  > span {
    display: block;
    max-width: 570px;
    margin-top: 1.8rem;
    font-size: 1.02rem;
    line-height: 1.65;
    color: rgba(17, 17, 17, 0.62);
  }

  @media (max-width: 980px) {
    position: static;
  }
`;

const CaseNumber = styled.strong`
  display: block;
  margin-bottom: clamp(4rem, 10vw, 8rem);
  font-size: clamp(6rem, 13vw, 16rem);
  line-height: 0.72;
  letter-spacing: -0.12em;
  font-weight: 500;
  color: rgba(17, 17, 17, 0.12);
`;

const CaseFacts = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;

  div {
    display: grid;
    gap: 0.45rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(17, 17, 17, 0.12);
  }

  small {
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(17, 17, 17, 0.4);
  }

  strong {
    max-width: 440px;
    font-size: 0.98rem;
    line-height: 1.45;
    font-weight: 500;
    color: rgba(17, 17, 17, 0.75);
  }
`;

const InlineCta = styled(Link)`
  display: inline-flex;
  margin-top: 2rem;
  color: #111;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  &:hover {
    opacity: 0.55;
  }
`;

const CaseVisual = styled.div`
  position: sticky;
  top: 5.5rem;

  @media (max-width: 980px) {
    position: static;
  }
`;

const MediaFrame = styled.div<{ $tone: PortfolioProject["tone"] }>`
  position: relative;
  min-height: clamp(520px, 72vh, 840px);
  overflow: hidden;
  border-radius: 2rem;
  background: ${({ $tone }) => {
    if ($tone === "dark") {
      return "radial-gradient(circle at 30% 20%, #474747, transparent 28rem), linear-gradient(135deg, #111, #2d2d2d)";
    }

    if ($tone === "warm") {
      return "radial-gradient(circle at 70% 20%, #d3a15e, transparent 26rem), linear-gradient(135deg, #241b14, #7c6046)";
    }

    return "radial-gradient(circle at 70% 15%, #fff4d9, transparent 28rem), linear-gradient(135deg, #e9dfcf, #fffaf0)";
  }};
  box-shadow: 0 50px 120px rgba(17, 17, 17, 0.16);

  img {
    width: 100%;
    height: 100%;
    min-height: inherit;
    display: block;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    min-height: 440px;
    border-radius: 1.4rem;
  }
`;

const PlaceholderVisual = styled.div`
  min-height: inherit;
  display: grid;
  place-items: center;
  padding: 2rem;
  text-align: center;
  color: #fff;

  span {
    position: absolute;
    top: 1.25rem;
    left: 1.25rem;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0.68;
  }

  strong {
    max-width: 700px;
    font-size: clamp(3.2rem, 7vw, 8rem);
    line-height: 0.88;
    letter-spacing: -0.09em;
    font-weight: 500;
    mix-blend-mode: difference;
  }

  p {
    position: absolute;
    right: 1.25rem;
    bottom: 1.25rem;
    margin: 0;
    font-size: 0.78rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    opacity: 0.72;
  }
`;

const SlideCounter = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.25rem;
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  padding: 0 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.76);
  backdrop-filter: blur(10px);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  color: rgba(17, 17, 17, 0.72);
`;

const SlideCaption = styled.div`
  position: absolute;
  left: 1.25rem;
  bottom: 1.25rem;
  width: min(420px, calc(100% - 2.5rem));
  padding: 1rem;
  border-radius: 1.2rem;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(16px);

  strong {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 1rem;
    letter-spacing: -0.02em;
  }

  span {
    display: block;
    font-size: 0.9rem;
    line-height: 1.45;
    color: rgba(17, 17, 17, 0.58);
  }
`;

const GalleryNav = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  > button {
    height: 46px;
    padding: 0 1.1rem;
    border: 1px solid rgba(17, 17, 17, 0.14);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.55);
    cursor: pointer;
    font-size: 0.74rem;
    font-weight: 800;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: rgba(17, 17, 17, 0.68);
  }

  > button:hover {
    background: #111;
    color: #fff;
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  button {
    width: 2.6rem;
    height: 0.45rem;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: rgba(17, 17, 17, 0.16);
    cursor: pointer;
    transition:
      width 240ms ease,
      background 240ms ease;
  }

  button.active {
    width: 4.6rem;
    background: #111;
  }

  @media (max-width: 640px) {
    button {
      width: 1.6rem;
    }

    button.active {
      width: 2.8rem;
    }
  }
`;

const ProcessSection = styled.section`
  width: min(1560px, calc(100% - 8vw));
  margin: 0 auto;
  padding: 7rem 0 3rem;
  border-top: 1px solid rgba(17, 17, 17, 0.12);

  @media (max-width: 768px) {
    width: calc(100% - 2.5rem);
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessCard = styled.article`
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.1rem;
  border-radius: 1.4rem;
  background: #111;
  color: #fff;

  h3 {
    margin: 0;
    font-size: clamp(1.5rem, 2vw, 2.35rem);
    line-height: 0.98;
    letter-spacing: -0.055em;
    font-weight: 500;
  }

  p {
    margin: 1rem 0 0;
    font-size: 0.92rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.62);
  }
`;

const FinalCta = styled.section`
  width: min(1560px, calc(100% - 8vw));
  min-height: 80vh;
  margin: 0 auto;
  padding: 8rem 0;
  display: grid;
  place-items: center;
  text-align: center;

  > span {
    display: block;
    margin-bottom: 2rem;
    font-size: 0.78rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(17, 17, 17, 0.48);
  }

  h2 {
    width: min(1000px, 100%);
    margin: 0 0 2.4rem;
    font-size: clamp(4rem, 9vw, 11rem);
    line-height: 0.88;
    letter-spacing: -0.095em;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    width: calc(100% - 2.5rem);
    min-height: 70vh;

    h2 {
      font-size: clamp(3.7rem, 16vw, 6.3rem);
    }
  }
`;