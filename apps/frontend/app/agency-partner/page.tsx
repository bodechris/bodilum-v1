"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageV0 from "@/components/ui/page-v0/PageV0";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger);

CustomEase.create("smoothReveal", "0.16, 1, 0.1, 1");

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/\s+/g, "-");

const partnerOffers = [
  {
    eyebrow: "01 / Small studios",
    name: "Studio Partner",
    price: "R18,500",
    cadence: "/ month",
    subtitle: "Premium backup for small studios.",
    description:
      "Senior creative, web, motion and AI support for small studios that need sharper delivery without hiring another full-time specialist.",
    outcomes: [
      "Take on more polished digital work with less internal pressure.",
      "Improve client-facing design, web sections, decks and campaign assets.",
      "Add tasteful motion and frontend refinement where the work needs lift.",
      "Bring simple AI workflow ideas into client projects without overcomplicating delivery.",
    ],
    bestFor: [
      "Small creative studios",
      "Solo-led agencies",
      "Boutique design teams",
      "Teams that need senior overflow support",
    ],
    included: [
      "1 active workstream at a time",
      "Approx. 20 monthly support hours",
      "Design direction and visual polish",
      "Landing page and web section support",
      "Frontend styling and interaction refinement",
      "Light motion and micro-interactions",
      "Simple AI workflow ideas and prototypes",
      "1 monthly creative review call",
      "White-label delivery available",
    ],
    partnerLayer: [
      "Quiet production support",
      "Senior taste check",
      "Clean handover assets",
      "NDA-friendly collaboration",
    ],
    cta: "Start as Studio Partner",
  },
  {
    eyebrow: "02 / Growing agencies",
    name: "Creative Acceleration Partner",
    price: "R45,000",
    cadence: "/ month",
    recommended: true,
    subtitle: "A stronger creative and technical layer.",
    description:
      "A higher-capacity partnership for agencies that need faster delivery, sharper design, better frontend, tasteful motion and practical AI support across recurring client work.",
    outcomes: [
      "Deliver more ambitious client work without slowing the studio down.",
      "Reduce bottlenecks across design, frontend, decks, revisions and launches.",
      "Raise the perceived value of your agency's digital output.",
      "Add motion and AI capability without building a specialist team first.",
    ],
    bestFor: [
      "Growing agencies",
      "Recurring campaign teams",
      "Studios with multiple active clients",
      "Teams selling more premium digital work",
    ],
    included: [
      "2 active workstreams at a time",
      "Approx. 50 monthly support hours",
      "Senior design direction",
      "Website and landing page UI support",
      "Frontend development support",
      "GSAP-style motion and interaction polish",
      "AI client workflow support",
      "Pitch deck and proposal visual support",
      "Monthly creative systems review",
      "Priority turnaround",
      "White-label delivery available",
    ],
    partnerLayer: [
      "Priority production rhythm",
      "Creative systems review",
      "Pitch and proposal support",
      "Shared delivery queue",
    ],
    cta: "Accelerate My Agency",
  },
];

const partnershipPillars = [
  {
    number: "01",
    title: "Taste",
    text: "A senior eye on layout, hierarchy, polish, interaction and presentation quality.",
  },
  {
    number: "02",
    title: "Execution",
    text: "Design, frontend, motion and launch support that plugs into your agency workflow.",
  },
  {
    number: "03",
    title: "AI layer",
    text: "Useful AI workflows for client operations, content, support and lightweight automation.",
  },
];

const capabilities = [
  {
    title: "Design direction",
    text: "Visual systems, landing pages, campaign polish, decks, proposals and brand-led presentation work.",
  },
  {
    title: "Frontend polish",
    text: "Responsive sections, styled components, animation-ready interfaces, QA and UI refinement.",
  },
  {
    title: "Motion details",
    text: "Scroll reveals, hero movement, micro-interactions, transitions and lightweight motion systems.",
  },
  {
    title: "Client AI systems",
    text: "Fast replies, lead follow-up, onboarding helpers, internal knowledge flows and practical automation concepts.",
  },
];

const workflow = [
  "We map your agency rhythm, active clients, bottlenecks and the type of work you want us to support.",
  "You add Bodilum to selected projects as a quiet white-label or visible specialist partner.",
  "We work from a shared priority queue so active workstreams stay focused and quality stays protected.",
  "Your team receives polished design, frontend, motion or AI support that is ready to present or integrate.",
];

const terms = [
  "Monthly retainer with a defined capacity and active workstream limit.",
  "30 days' notice to cancel, upgrade or downgrade after the first month.",
  "Unused capacity may roll over for 30 days, up to 20% of the monthly plan.",
  "Full platforms, complex 3D, advanced backend systems and large AI products are quoted separately.",
  "White-label and NDA-friendly collaboration are available.",
  "Rush work depends on availability and may attract a priority fee.",
];

export default function AgencyPartnerPage() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      const revealElements = gsap.utils.toArray<HTMLElement>(
        ".scroll-reveal",
      );
      const cardElements = gsap.utils.toArray<HTMLElement>(".scroll-card");
      const lineElements = gsap.utils.toArray<HTMLElement>(".scroll-line");
      const allAnimatedElements = [
        ...revealElements,
        ...cardElements,
        ...lineElements,
      ];

      if (reduceMotion) {
        gsap.set(allAnimatedElements, {
          clearProps: "transform,clipPath,visibility,willChange",
        });
        return;
      }

      const getDelay = (element: HTMLElement) => {
        const delayClass = Array.from(element.classList).find((className) =>
          className.startsWith("scroll-delay-"),
        );
        const delayIndex = Number(delayClass?.replace("scroll-delay-", ""));

        return Number.isFinite(delayIndex)
          ? Math.max(0, delayIndex - 1) * 0.08
          : 0;
      };

      const createMaskedReveal = (
        element: HTMLElement,
        distance: number,
        duration: number,
      ) => {
        gsap.fromTo(
          element,
          {
            y: distance,
            opacity: 0,
            visibility: "hidden",
            willChange: "transform, opacity",
          },
          {
            y: 0,
            opacity: 1,
            visibility: "visible",
            duration,
            delay: getDelay(element),
            ease: "smoothReveal",
            clearProps: "transform,opacity,visibility,willChange",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      };

      revealElements.forEach((element) =>
        createMaskedReveal(element, 64, 1.15),
      );

      cardElements.forEach((element) =>
        createMaskedReveal(element, 82, 1.2),
      );

      lineElements.forEach((element) =>
        createMaskedReveal(element, 38, 0.95),
      );
    }, page);

    return () => context.revert();
  }, []);

  return (
    <PageV0>
      <AgencyPartnerPageWrapper ref={pageRef}>
        <HeroSection>
          <HeroGrid>
            <HeroContent className="scroll-reveal">
              <Eyebrow>Bodilum Agency Partner</Eyebrow>
              <HeroTitle>Premium support for serious agencies.</HeroTitle>
            </HeroContent>

            <HeroAside className="scroll-reveal scroll-delay-1">
              <HeroText>
                We plug into your agency as a senior creative, frontend, motion
                and AI partner, helping your team deliver sharper client work
                without adding another full-time hire.
              </HeroText>

              <ButtonRow>
                <PrimaryButton href="/contact?package=agency-partner">
                  Start the partnership
                </PrimaryButton>

                <SecondaryButton href="#offers">View offers</SecondaryButton>
              </ButtonRow>
            </HeroAside>
          </HeroGrid>
        </HeroSection>

        <IntroSection>
          <SectionLabel className="scroll-reveal">The partnership</SectionLabel>

          <IntroContent>
            <LargeText className="scroll-reveal">
              Your agency keeps the relationship. Bodilum strengthens the work
              behind it.
            </LargeText>

            <PillarsGrid>
              {partnershipPillars.map((pillar, index) => (
                <PillarCard
                  key={pillar.title}
                  className={`scroll-card scroll-delay-${index + 1}`}
                >
                  <PillarNumber>{pillar.number}</PillarNumber>
                  <div>
                    <PillarTitle>{pillar.title}</PillarTitle>
                    <PillarText>{pillar.text}</PillarText>
                  </div>
                </PillarCard>
              ))}
            </PillarsGrid>
          </IntroContent>
        </IntroSection>

        <OffersSection id="offers">
          <SectionHeader className="scroll-reveal">
            <div>
              <SectionLabel>Offers</SectionLabel>
              <SectionTitle>Choose the support layer.</SectionTitle>
            </div>

            <SectionHeaderText>
              Two focused monthly partnerships. No bloated menu. No unlimited
              promise. Just clear capacity, senior taste and better delivery.
            </SectionHeaderText>
          </SectionHeader>

          <OfferList>
            {partnerOffers.map((offer, index) => (
              <OfferCard
                key={offer.name}
                className={`scroll-card scroll-delay-${index + 1}`}
                $recommended={offer.recommended}
              >
                <OfferLeft>
                  <div>
                    <OfferEyebrow>{offer.eyebrow}</OfferEyebrow>

                    <OfferTitleRow>
                      <OfferTitle>{offer.name}</OfferTitle>
                      {offer.recommended && <Recommended>Recommended</Recommended>}
                    </OfferTitleRow>

                    <OfferSubtitle>{offer.subtitle}</OfferSubtitle>
                  </div>

                  <OfferPriceBlock>
                    <PriceLine>
                      <Price>{offer.price}</Price>
                      <PriceMeta>{offer.cadence}</PriceMeta>
                    </PriceLine>

                    <OfferButton href={`/contact?package=${slugify(offer.name)}`}>
                      {offer.cta}
                    </OfferButton>
                  </OfferPriceBlock>
                </OfferLeft>

                <OfferRight>
                  <OfferDescription>{offer.description}</OfferDescription>

                  <OutcomeBox>
                    <OutcomeLabel>What your agency becomes able to do</OutcomeLabel>

                    <OutcomeList>
                      {offer.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </OutcomeList>
                  </OutcomeBox>

                  <OfferColumns>
                    <OfferColumn>
                      <ColumnTitle>Best for</ColumnTitle>
                      <CleanList>
                        {offer.bestFor.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </CleanList>
                    </OfferColumn>

                    <OfferColumn>
                      <ColumnTitle>Included</ColumnTitle>
                      <CleanList>
                        {offer.included.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </CleanList>
                    </OfferColumn>

                    <OfferColumn>
                      <ColumnTitle>Partner layer</ColumnTitle>
                      <CleanList>
                        {offer.partnerLayer.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </CleanList>
                    </OfferColumn>
                  </OfferColumns>
                </OfferRight>
              </OfferCard>
            ))}
          </OfferList>
        </OffersSection>

        <CapabilitiesSection>
          <SectionHeader className="scroll-reveal">
            <div>
              <SectionLabel>Where we plug in</SectionLabel>
              <SectionTitle>Specialist support without studio bloat.</SectionTitle>
            </div>

            <SectionHeaderText>
              Bring us in where the work needs more detail, speed or premium
              finish. Keep your internal team focused on the client relationship
              and creative direction.
            </SectionHeaderText>
          </SectionHeader>

          <CapabilitiesGrid>
            {capabilities.map((capability, index) => (
              <CapabilityCard
                key={capability.title}
                className={`scroll-card scroll-delay-${index + 1}`}
              >
                <CapabilityTitle>{capability.title}</CapabilityTitle>
                <CapabilityText>{capability.text}</CapabilityText>
              </CapabilityCard>
            ))}
          </CapabilitiesGrid>
        </CapabilitiesSection>

        <WorkflowSection>
          <SectionLabel className="scroll-reveal">How it works</SectionLabel>

          <WorkflowGrid>
            <SectionTitle className="scroll-reveal">
              A calm extension of your team.
            </SectionTitle>

            <WorkflowList>
              {workflow.map((item, index) => (
                <WorkflowItem
                  key={item}
                  className={`scroll-line scroll-delay-${index + 1}`}
                >
                  <WorkflowNumber>{String(index + 1).padStart(2, "0")}</WorkflowNumber>
                  <WorkflowText>{item}</WorkflowText>
                </WorkflowItem>
              ))}
            </WorkflowList>
          </WorkflowGrid>
        </WorkflowSection>

        <TermsSection>
          <DarkSectionLabel className="scroll-reveal">Terms</DarkSectionLabel>

          <TermsGrid>
            <DarkTitle className="scroll-reveal">
              Clear enough to start. Flexible enough to scale.
            </DarkTitle>

            <TermsCard className="scroll-reveal scroll-delay-1">
              <TermsList>
                {terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </TermsList>
            </TermsCard>
          </TermsGrid>
        </TermsSection>

        <FinalCta className="scroll-reveal">
          <FinalTitle>
            Give your next client brief the finish it deserves.
          </FinalTitle>

          <FinalContent>
            <FinalText>
              Start with one focused partnership layer. Use Bodilum where the
              work needs more polish, motion, frontend depth or practical AI.
            </FinalText>

            <FinalButton href="/contact?package=agency-partner">
              Start the partnership
            </FinalButton>
          </FinalContent>
        </FinalCta>
      </AgencyPartnerPageWrapper>
    </PageV0>
  );
}

const AgencyPartnerPageWrapper = styled.main`
  && {
    width: min(92vw, 1500px);
    margin: 0 auto;
    padding: 150px 0 80px;
    color: #090909;
    position: relative;
    z-index: 2;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  .scroll-reveal,
  .scroll-card,
  .scroll-line {
    transform-origin: 50% 100%;
  }

  @media (max-width: 768px) {
    && {
      width: min(92vw, 100%);
      padding-top: 120px;
    }
  }
`;

const HeroSection = styled.section`
  min-height: 82vh;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const HeroGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  gap: clamp(44px, 8vw, 128px);
  align-items: end;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const HeroContent = styled.div``;

const Eyebrow = styled.p`
  margin: 0 0 34px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.58);
`;

const HeroTitle = styled.h1`
  max-width: 1100px;
  margin: 0;
  font-size: clamp(68px, 11vw, 188px);
  line-height: 0.83;
  letter-spacing: -0.105em;
  font-weight: 800;
`;

const HeroAside = styled.div`
  padding-bottom: 14px;
`;

const HeroText = styled.p`
  max-width: 650px;
  margin: 0;
  font-size: clamp(18px, 1.7vw, 27px);
  line-height: 1.36;
  color: rgba(0, 0, 0, 0.62);
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 36px;
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  padding: 0 26px;
  border-radius: 999px;
  background: #050505;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: #222;
  }

  @media (max-width: 620px) {
    width: 100%;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  padding: 0 26px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.16);
  color: #050505;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: border-color 0.25s ease, transform 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #050505;
  }

  @media (max-width: 620px) {
    width: 100%;
  }
`;

const IntroSection = styled.section`
  display: grid;
  grid-template-columns: 0.75fr 1.25fr;
  gap: clamp(40px, 8vw, 120px);
  padding: clamp(96px, 12vw, 180px) 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const SectionLabel = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.58);
`;

const IntroContent = styled.div``;

const LargeText = styled.h2`
  max-width: 980px;
  margin: 0;
  font-size: clamp(38px, 5.2vw, 88px);
  line-height: 0.98;
  letter-spacing: -0.075em;
  font-weight: 800;
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 56px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const PillarCard = styled.div`
  min-height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px;
  border-radius: 34px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.06);
  }
`;

const PillarNumber = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.22em;
  color: rgba(0, 0, 0, 0.46);
`;

const PillarTitle = styled.h3`
  margin: 0;
  font-size: clamp(28px, 2.8vw, 44px);
  line-height: 0.95;
  letter-spacing: -0.065em;
  font-weight: 800;
`;

const PillarText = styled.p`
  margin: 14px 0 0;
  color: rgba(0, 0, 0, 0.58);
  line-height: 1.6;
`;

const OffersSection = styled.section`
  padding: clamp(96px, 11vw, 170px) 0;
`;

const SectionHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 430px;
  gap: 40px;
  align-items: end;
  margin-bottom: 56px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  max-width: 900px;
  margin: 22px 0 0;
  font-size: clamp(46px, 6.8vw, 108px);
  line-height: 0.9;
  letter-spacing: -0.08em;
  font-weight: 800;
`;

const SectionHeaderText = styled.p`
  margin: 0;
  font-size: 17px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.58);
`;

const OfferList = styled.div`
  display: grid;
  gap: 28px;
`;

const OfferCard = styled.article<{ $recommended?: boolean }>`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(40px, 6vw, 90px);
  padding: clamp(34px, 5vw, 72px);
  border-radius: clamp(34px, 4vw, 60px);
  --card-ink: ${({ $recommended }) => ($recommended ? "#fff" : "#090909")};
  --card-muted: ${({ $recommended }) =>
    $recommended ? "rgba(255, 255, 255, 0.64)" : "rgba(0, 0, 0, 0.58)"};
  --card-soft: ${({ $recommended }) =>
    $recommended ? "rgba(255, 255, 255, 0.58)" : "rgba(0, 0, 0, 0.52)"};
  --card-line: ${({ $recommended }) =>
    $recommended ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)"};
  --inverse-bg: ${({ $recommended }) => ($recommended ? "#fff" : "#050505")};
  --inverse-ink: ${({ $recommended }) => ($recommended ? "#050505" : "#fff")};

  background: ${({ $recommended }) =>
    $recommended ? "rgba(5, 5, 5, 0.96)" : "rgba(255, 255, 255, 0.84)"};
  color: var(--card-ink);
  border: 1px solid
    ${({ $recommended }) =>
      $recommended ? "rgba(255, 255, 255, 0.14)" : "rgba(0, 0, 0, 0.08)"};
  box-shadow: ${({ $recommended }) =>
    $recommended
      ? "0 40px 120px rgba(0, 0, 0, 0.18)"
      : "0 30px 100px rgba(0, 0, 0, 0.055)"};
  transition: transform 0.35s ease, border-color 0.35s ease,
    box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ $recommended }) =>
      $recommended ? "rgba(255, 255, 255, 0.32)" : "rgba(0, 0, 0, 0.22)"};
    box-shadow: ${({ $recommended }) =>
      $recommended
        ? "0 50px 140px rgba(0, 0, 0, 0.22)"
        : "0 40px 120px rgba(0, 0, 0, 0.085)"};
  }

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const OfferLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 64px;
`;

const OfferEyebrow = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.36em;
  text-transform: uppercase;
  color: var(--card-soft);
`;

const OfferTitleRow = styled.div`
  margin-top: 34px;
`;

const OfferTitle = styled.h3`
  max-width: 650px;
  margin: 0;
  font-size: clamp(50px, 6vw, 104px);
  line-height: 0.9;
  letter-spacing: -0.088em;
  font-weight: 800;
`;

const Recommended = styled.span`
  display: inline-flex;
  width: fit-content;
  min-height: 36px;
  margin-top: 24px;
  padding: 0 15px;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.86);
`;

const OfferSubtitle = styled.p`
  max-width: 520px;
  margin: 28px 0 0;
  font-size: clamp(18px, 1.6vw, 25px);
  line-height: 1.45;
  color: var(--card-muted);
`;

const OfferPriceBlock = styled.div``;

const PriceLine = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
`;

const Price = styled.p`
  margin: 0;
  font-size: clamp(42px, 5vw, 76px);
  line-height: 0.9;
  letter-spacing: -0.078em;
  font-weight: 800;
`;

const PriceMeta = styled.p`
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--card-soft);
`;

const OfferButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  margin-top: 28px;
  padding: 0 26px;
  border-radius: 999px;
  background: var(--inverse-bg);
  color: var(--inverse-ink);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.82;
  }
`;

const OfferRight = styled.div``;

const OfferDescription = styled.p`
  max-width: 850px;
  margin: 0;
  font-size: 18px;
  line-height: 1.7;
  color: var(--card-muted);
`;

const OutcomeBox = styled.div`
  margin-top: 36px;
  padding: clamp(24px, 3vw, 38px);
  border-radius: 34px;
  background: var(--inverse-bg);
  color: var(--inverse-ink);
`;

const OutcomeLabel = styled.p`
  margin: 0 0 24px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: currentColor;
  opacity: 0.58;
`;

const OutcomeList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 26px;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding-left: 20px;
    font-size: clamp(15px, 1.1vw, 17px);
    line-height: 1.55;
    color: currentColor;
    opacity: 0.78;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.72em;
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: currentColor;
      opacity: 0.7;
    }
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const OfferColumns = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.2fr 0.9fr;
  gap: 30px;
  margin-top: 42px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const OfferColumn = styled.div``;

const ColumnTitle = styled.p`
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--card-soft);
`;

const CleanList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 13px 0;
    border-top: 1px solid var(--card-line);
    font-size: 15px;
    line-height: 1.45;
    color: var(--card-muted);
  }
`;

const CapabilitiesSection = styled.section`
  padding: clamp(96px, 11vw, 170px) 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const CapabilityCard = styled.article`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  border-radius: 34px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(0, 0, 0, 0.22);
  }
`;

const CapabilityTitle = styled.h3`
  max-width: 260px;
  margin: 0;
  font-size: clamp(30px, 3.2vw, 50px);
  line-height: 0.94;
  letter-spacing: -0.075em;
  font-weight: 800;
`;

const CapabilityText = styled.p`
  margin: 52px 0 0;
  color: rgba(0, 0, 0, 0.58);
  line-height: 1.6;
`;

const WorkflowSection = styled.section`
  padding: clamp(96px, 11vw, 170px) 0;
`;

const WorkflowGrid = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(40px, 6vw, 90px);
  margin-top: 28px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const WorkflowList = styled.div`
  display: grid;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

const WorkflowItem = styled.article`
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 28px;
  padding: 28px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  align-items: start;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const WorkflowNumber = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.22em;
  color: rgba(0, 0, 0, 0.46);
`;

const WorkflowText = styled.p`
  margin: 0;
  font-size: clamp(18px, 2vw, 30px);
  line-height: 1.25;
  letter-spacing: -0.045em;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.74);
`;

const TermsSection = styled.section`
  padding: clamp(86px, 9vw, 140px);
  border-radius: clamp(36px, 5vw, 70px);
  background: #050505;
  color: #fff;
`;

const DarkSectionLabel = styled(SectionLabel)`
  color: rgba(255, 255, 255, 0.68);
`;

const TermsGrid = styled.div`
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: clamp(40px, 6vw, 90px);
  margin-top: 28px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const DarkTitle = styled(SectionTitle)`
  margin-top: 0;
  color: #fff;
`;

const TermsCard = styled.div`
  padding: clamp(28px, 4vw, 52px);
  border-radius: 44px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TermsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 20px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.72);
    line-height: 1.65;

    &:first-child {
      border-top: 0;
      padding-top: 0;
    }
  }
`;

const FinalCta = styled.section`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: clamp(40px, 7vw, 100px);
  align-items: end;
  margin-top: 28px;
  padding: clamp(44px, 7vw, 90px);
  border-radius: clamp(36px, 5vw, 70px);
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.055);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const FinalTitle = styled.h2`
  max-width: 980px;
  margin: 0;
  font-size: clamp(52px, 8vw, 128px);
  line-height: 0.88;
  letter-spacing: -0.088em;
  font-weight: 800;
`;

const FinalContent = styled.div``;

const FinalText = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.65;
  color: rgba(0, 0, 0, 0.58);
`;

const FinalButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  margin-top: 30px;
  padding: 0 26px;
  border-radius: 999px;
  background: #050505;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: #222;
  }

  @media (max-width: 620px) {
    width: 100%;
  }
`;