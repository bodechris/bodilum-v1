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

const CTA_HREF = "mailto:hello@bodilum.com?subject=Start%20a%20Web%20Xperience%20Project&body=Hi%20Bodilum%2C%0A%0AI%27d%20like%20to%20start%20a%20Web%20Xperience%20project.%0A%0ABusiness%20name%3A%0AWebsite%20type%3A%20One-page%20/%203-5%20pages%20/%203D%20experience%0ABudget%20range%3A%0ATimeline%3A%0A";

const portfolioProjects: PortfolioProject[] = [
  {
    id: "world-cup-2026",
    number: "01",
    eyebrow: "Motion / storytelling / interactive web / On-Going",
    title: "World Cup 2026: Road to Glory",
    description:
      "A cinematic scroll-driven web experience that follows the winning nation's journey from its opening match to the final whistle, combining match events, emotional turning points, motion design and African visual storytelling.",
    scope: "Cinematic Motion + Web Xperience",
    outcome:
      "Transform the tournament timeline into an immersive digital story people can explore, feel and remember.",
    tone: "dark",
    slides: [
      {
        title: "Opening ceremony",
        caption:
          "A cinematic introduction to the tournament, host cities and the road ahead.",
        src: "/portfolios/world-cup/world-cup-xp-04.webp",
      },
      {
        title: "Group-stage journey",
        caption:
          "Scroll through the early matches, decisive moments, wins and setbacks.",
        src: "/portfolios/world-cup/world-cup-xp-03.webp",
      },
      {
        title: "Emotional match chapters",
        caption:
          "Goals, losses and turning points expressed through motion, colour and sound.",
        src: "/portfolios/world-cup/world-cup-xp-01.webp",
      },
      {
        title: "African visual language",
        caption:
          "Patterns, cultural objects and sculptural forms used as transitions and narrative devices.",
        src: "/portfolios/world-cup/world-cup-xp-02.webp",
      },
      {
        title: "The final",
        caption:
          "A climactic interactive sequence celebrating the winning nation’s rise to glory.",
        src: "/portfolios/world-cup/world-cup-xp-05.webp",
      },
    ],
  },
  {
    id: "biznesxpo-microsites",
    number: "02",
    eyebrow: "Business tools / microsites / AI platform / On-Going",
    title: "BiznesXpo Microsites",
    description:
      "A modular microsite system that turns business information, brand assets, products, services and documents into polished digital profiles that can be created, customised and shared quickly.",
    scope: "AI-Powered Microsite System",
    outcome:
      "Help small businesses establish a credible web presence without the cost or complexity of building a traditional website.",
    tone: "cream",
    slides: [
      {
        title: "Business profile",
        caption:
          "A premium introduction to the company, its story and its value proposition.",
        src: "/portfolios/bx-microsites/3dOfficesV2.webp",
      },
      {
        title: "Brand-led customisation",
        caption:
          "Colours, typography, logos and imagery generated from each business identity.",
        src: "/portfolios/bx-microsites/Xpo-Office-MoreScreens_1C.webp",
      },
      {
        title: "Products and services",
        caption:
          "Flexible sections for presenting offers, pricing and featured work.",
        src: "/portfolios/bx-microsites/Xpo-Office-MoreScreens2.webp",
      },
      {
        title: "Business documents",
        caption:
          "Invoices, quotations, brochures and other assets connected to the microsite.",
        src: "/portfolios/bx-microsites/Xpo-Office-MoreScreens3.webp",
      },
      {
        title: "Mobile sharing",
        caption:
          "Responsive profiles designed for WhatsApp, NFC cards and social distribution.",
        src: "/portfolios/bx-microsites/microsite-1.webp",
      },
    ],
  },
  {
    id: "bodilum-brand-identity",
    number: "03",
    eyebrow: "Brand identity / motion / design system / On-Going",
    title: "Bodilum Brand Identity",
    description:
      "A living identity system for an African design and technology studio working across brand, software, motion and immersive digital experiences.",
    scope: "Brand Identity + Motion System",
    outcome:
      "Position Bodilum as a distinctive African studio capable of delivering world-class creative and technical work.",
    tone: "warm",
    slides: [
      {
        title: "Core identity",
        caption:
          "A refined visual system built around clarity, confidence and experimentation.",
        src: "/portfolios/bodilum-indent/bodilum-indent-6.webp",
      },
      {
        title: "Logo behaviour",
        caption:
          "Responsive lockups and animated expressions for digital environments.",
        src: "/portfolios/bodilum-indent/logo-anim-1.webp",
      },
      {
        title: "Typography system",
        caption:
          "Bold editorial hierarchy balanced with precise supporting typography.",
        src: "/portfolios/bodilum-indent/bodilum-indent-5.webp",
      },
      {
        title: "Motion language",
        caption:
          "Transitions, reveals and spatial movement designed to make the identity feel alive.",
        src: "/portfolios/bodilum-indent/bodilum-indent-2.webp",
      },
      {
        title: "Studio applications",
        caption:
          "The identity applied across web experiences, proposals, social content and presentations.",
        src: "/portfolios/bodilum-indent/bodilum-indent-4.webp",
      },
    ],
  },
  {
    id: "bobobo-ai-challenger",
    number: "04",
    eyebrow: "AI gaming / multiplayer / character system / On-Going",
    title: "Bobobo — Your AI Challenger",
    description:
      "A playful game experience where players compete against Bobobo, a bold AI personality, on Ludo & Chess board games, with reactions, banter, progression and social competition.",
    scope: "AI Game + Interactive Experience",
    outcome:
      "Turn traditional games into a character-led digital experience that feels modern, competitive, social and endlessly replayable.",
    tone: "dark",
    slides: [
  {
    title: "Meet Bobobo",
    caption:
      "A sharp, funny and instantly recognizable game companion built to make every challenge feel personal.",
    src: "/portfolios/bobobo/bobobo-11.webp",
  },
  {
    title: "A challenge arrives",
    caption:
      "Each experience begins with a message inviting Bobobo into a new game, puzzle or competitive moment.",
    src: "/portfolios/bobobo/bobobo-12.webp",
  },
  {
    title: "Challenge accepted",
    caption:
      "Bobobo responds with confidence, setting the tone before the player enters the game.",
    src: "/portfolios/bobobo/bobobo-14.webp",
  },
  {
    title: "Choose your game",
    caption:
      "Select from quick strategy games, familiar classics and new challenges designed around Bobobo’s personality.",
    src: "/portfolios/bobobo/bobobo-1.webp",
  },
  {
    title: "Set the difficulty",
    caption:
      "Adjust the challenge level and decide whether Bobobo should play casually, strategically or without mercy.",
    src: "/portfolios/bobobo/bobobo-2.webp",
  },
  {
    title: "Enter the arena",
    caption:
      "A focused transition moves the player from character-led storytelling into the active game experience.",
    src: "/portfolios/bobobo/bobobo-9.webp",
  },
  {
    title: "Live gameplay",
    caption:
      "Clean, responsive game interfaces keep attention on every move while Bobobo reacts in real time.",
    src: "/portfolios/bobobo/bobobo-10.webp",
  },
  {
    title: "Playful reactions",
    caption:
      "Expressions, gestures and animated feedback make Bobobo feel present without interrupting the game.",
    src: "/portfolios/bobobo/bobobo-6.webp",
  },
  {
    title: "In-game banter",
    caption:
      "Text-based conversations bring humour, tension and personality directly into the active gameplay screen.",
    src: "/portfolios/bobobo/bobobo-3.webp",
  },
  {
    title: "Strategic personality",
    caption:
      "Bobobo thinks, celebrates, teases and adapts, turning a simple opponent into a memorable rival.",
    src: "/portfolios/bobobo/bobobo-13.webp",
  },
  {
    title: "Every move matters",
    caption:
      "Key decisions are reinforced with expressive character moments, visual feedback and competitive energy.",
    src: "/portfolios/bobobo/bobobo-7.webp",
  },
  {
    title: "Wins, losses and comebacks",
    caption:
      "Match outcomes build an evolving relationship between the player and Bobobo across repeated challenges.",
    src: "/portfolios/bobobo/bobobo-4.webp",
  },
  {
    title: "Rivalry progression",
    caption:
      "Track victories, streaks, rankings, achievements and the growing intensity of each rivalry.",
    src: "/portfolios/bobobo/bobobo-5.webp",
  },
  {
    title: "Social competition",
    caption:
      "Challenge friends, watch matches, compare results and share the moments worth remembering.",
    src: "/portfolios/bobobo/bobobo-8.webp",
  },
  {
    title: "A growing game universe",
    caption:
      "Bobobo is designed to expand across multiple games, stories, challenges and interactive experiences.",
    src: "/portfolios/bobobo/bobobo-15.webp",
  },
],
  },
  {
    id: "naija-fashion-index",
    number: "05",
    eyebrow: "Fashion archive / culture / editorial web / On-Going",
    title: "Naija Fashion Index",
    description:
      "A living digital archive documenting Nigerian fashion, designers, garments, movements and cultural influences through an expressive editorial and interactive web experience.",
    scope: "Cultural Archive Web Xperience",
    outcome:
      "Create a discoverable visual record of Nigerian fashion while giving designers, researchers and audiences a richer way to explore its evolution.",
    tone: "cream",
    slides: [
      {
        title: "Dele enters the runway",
        caption:
          "A confident opening look blending contemporary streetwear with Nigerian-inspired patterns and adornments.",
        src: "/portfolios/naija-fashion-index/naija-fashion-index-18.webp",
      },
      {
        title: "Details of Dele",
        caption:
          "A closer look at the eyewear, beadwork, textures and graphic language defining Dele’s style.",
        src: "/portfolios/naija-fashion-index/naija-fashion-index-20.webp",
      },
      {
        title: "Chichi in motion",
        caption:
          "A vibrant runway look combining flowing fabric, modern tailoring and culturally inspired accessories.",
        src: "/portfolios/naija-fashion-index/naija-fashion-index-2.webp",
      },
      {
        title: "Details of Chichi",
        caption:
          "A close portrait celebrating expressive eyewear, braided hair, jewellery and bold colour combinations.",
        src: "/portfolios/naija-fashion-index/naija-fashion-index-3.webp",
      },
      {
        title: "The fashion duo",
        caption:
          "Dele and Chichi walk together as complementary expressions of contemporary Nigerian fashion.",
        src: "/portfolios/naija-fashion-index/naija-fashion-index-4.webp",
      },
      {
        title: "Culture in conversation",
        caption:
          "A cinematic two-character composition exploring contrast, harmony and shared cultural identity.",
        src: "/portfolios/naija-fashion-index/naija-fashion-index-5.webp",
      },
      {
        title: "Across the aisle",
        caption:
          "An over-the-shoulder runway moment that makes the viewer feel present inside the fashion experience.",
        src: "/portfolios/naija-fashion-index/naija-fashion-index-8.webp",
      },
      {
        title: "Ceremonial expression",
        caption:
          "A richly layered look featuring sculptural headwear, coral-inspired adornments and woven textiles.",
        src: "/portfolios/naija-fashion-index/naija-fashion-index-9.webp",
      },
      {
        title: "The silhouette from behind",
        caption:
          "A rear view highlighting garment construction, fabric movement and the storytelling potential of the back.",
        src: "/portfolios/naija-fashion-index/naija-fashion-index-12.webp",
      },
      {
        title: "Dele walks onward",
        caption:
          "A back-facing runway shot focused on scale, movement and the bold graphic composition of the outer garment.",
        src: "/portfolios/naija-fashion-index/naija-fashion-index-22.webp",
      },
    ],
  },
  {
    id: "afrochess",
    number: "06",
    eyebrow: "Cultural gaming / strategy / 3D world",
    title: "Afrochess",
    description:
      "A reimagining of chess in which African royal powers, warriors, artefacts and architectural traditions replace the conventional European pieces and visual language.",
    scope: "Cultural Strategy Game",
    outcome:
      "Build a globally recognisable chess experience rooted in African history, symbolism and storytelling.",
    tone: "warm",
    slides: [
      {
        title: "Enter AfroChess",
        caption:
          "A cinematic reimagining of chess through African-inspired royalty, craftsmanship and symbolism.",
        src: "/portfolios/afrochess/afrochess-0.webp",
      },
      {
        title: "The ceremonial battlefield",
        caption:
          "A polished chessboard staged like a monumental arena, waiting for the first strategic move.",
        src: "/portfolios/afrochess/afrochess-3.webp",
      },
      {
        title: "Strategy from above",
        caption:
          "A graphic top-down composition revealing the complete board through symmetry, order and tension.",
        src: "/portfolios/afrochess/afrochess-10.webp",
      },
      {
        title: "The royal assembly",
        caption:
          "Kings, queens, warriors and guardians form a unified sculptural family with distinctive silhouettes.",
        src: "/portfolios/afrochess/afrochess-8.webp",
      },
      {
        title: "The king’s authority",
        caption:
          "Commanding proportions, ceremonial regalia and symbolic details establish the centre of power.",
        src: "/portfolios/afrochess/afrochess-13.webp",
      },
      {
        title: "The queen’s presence",
        caption:
          "A poised royal figure balancing elegance, intelligence and unmistakable battlefield authority.",
        src: "/portfolios/afrochess/afrochess-18.webp",
      },
      {
        title: "The royal cavalry",
        caption:
          "The traditional knight is transformed through sculpted armour, engraved patterns and a powerful silhouette.",
        src: "/portfolios/afrochess/afrochess-26.webp",
      },
      {
        title: "Fortresses of the realm",
        caption:
          "Architectural rooks imagined as fortified monuments rather than conventional chess towers.",
        src: "/portfolios/afrochess/afrochess-14.webp",
      },
      {
        title: "Guardians of the frontline",
        caption:
          "Shield-bearing warriors give the front rank discipline, protection and a strong visual rhythm.",
        src: "/portfolios/afrochess/afrochess-23.webp",
      },
      {
        title: "Every move becomes theatre",
        caption:
          "Low camera angles, directional light and restrained motion turn each confrontation into a dramatic ritual.",
        src: "/portfolios/afrochess/afrochess-7.webp",
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
          {/* <span>Selected directions</span> */}
          <h2>Selected Web Xperiences</h2>
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

                      {/* <div>
                        <small>Outcome</small>
                        <strong>{project.outcome}</strong>
                      </div> */}
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

                      {/* <SlideCaption>
                        <strong>{activeSlide.title}</strong>
                        <span>{activeSlide.caption}</span>
                      </SlideCaption> */}
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