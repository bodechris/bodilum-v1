"use client";

import { useState } from "react";
import styled from "styled-components";
import PageV0 from "@/components/ui/page-v0/PageV0";

const partnerOffers = [
  {
    eyebrow: "01 / Small studios",
    name: "Studio Partner",
    price: "R18,500",
    cadence: "/ month",
    description:
      "Senior creative, web, motion, and AI support for small studios that need premium backup without hiring.",
    bestFor:
      "Small creative studios, solo-led agencies, and boutique teams that need reliable senior execution.",
    capacity: [
      "1 active workstream at a time",
      "Approx. 20 monthly support hours",
      "Design direction and visual polish",
      "Landing page and web section support",
      "Frontend styling and animation refinement",
      "Light motion and micro-interactions",
      "Simple AI workflow ideas and prototypes",
      "1 monthly creative review call",
      "White-label delivery available",
    ],
    outcome:
      "Your agency can take on better-looking digital work, improve client presentations, move faster on design/dev tasks, and add premium polish without carrying another salary.",
  },
  {
    eyebrow: "02 / Growing agencies",
    name: "Creative Acceleration Partner",
    price: "R45,000",
    cadence: "/ month",
    recommended: true,
    description:
      "A stronger monthly partner layer for agencies that need faster delivery, sharper design, better frontend, motion, and practical AI capability.",
    bestFor:
      "Growing agencies with recurring client work, multiple campaigns, and an in-house team that needs extra senior capacity.",
    capacity: [
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
    outcome:
      "Your agency can deliver more ambitious client work, reduce production bottlenecks, add motion and AI capabilities, and raise the perceived value of your creative output.",
  },
  {
    eyebrow: "03 / Larger studios",
    name: "Embedded Partner",
    price: "From R95,000",
    cadence: "/ month",
    description:
      "A deeper embedded support pod for agencies and studios that need premium digital production capacity across serious client work.",
    bestFor:
      "Larger creative studios, marketing teams, and agencies handling higher-value digital, campaign, and innovation projects.",
    capacity: [
      "3–4 active workstreams",
      "Approx. 100+ monthly support hours",
      "Dedicated creative/dev support pod",
      "Advanced frontend and animation support",
      "Interactive landing pages and campaign microsites",
      "AI workflow prototyping for clients",
      "Design system and component support",
      "Weekly production check-ins",
      "Private white-label workflow",
      "NDA-friendly collaboration",
      "Optional sprint add-ons for launches",
    ],
    outcome:
      "Your agency can expand production capacity, accept higher-value digital projects, improve delivery speed, and offer advanced web, motion, and AI capabilities without building a full specialist team internally.",
  },
];

const supportAreas = [
  {
    title: "Creative uplift",
    text: "Design direction, visual systems, campaign concepts, deck polish, website refinement, and stronger client-facing presentation.",
  },
  {
    title: "Web experiences",
    text: "Landing pages, microsites, responsive layouts, styled components, frontend polish, interaction details, and quality assurance.",
  },
  {
    title: "Motion design",
    text: "Scroll reveals, page transitions, micro-interactions, hero motion, product reveals, and lightweight animated details.",
  },
  {
    title: "AI client systems",
    text: "Fast replies, email helpers, review requests, client onboarding assistants, lead follow-up workflows, and simple knowledge assistants.",
  },
];

const process = [
  "We understand your agency workflow, client needs, and delivery rhythm.",
  "You add Bodilum to selected projects as a quiet creative and technical partner.",
  "We work through a shared queue with clear priorities and active workstreams.",
  "We deliver design, dev, motion, or AI support your team can present confidently.",
];

const faqs = [
  {
    q: "Is this unlimited?",
    a: "No. Each plan includes a defined monthly capacity and active workstream limit. This keeps the quality high and protects delivery focus.",
  },
  {
    q: "Can you work white-label?",
    a: "Yes. We can work quietly behind your agency, with client communication handled by you or shared depending on the project.",
  },
  {
    q: "Can we upgrade or downgrade?",
    a: "Yes. You can scale the partnership up or down with 30 days’ notice, depending on workload and budget.",
  },
  {
    q: "Do you join client calls?",
    a: "Yes, when helpful. We can join as Bodilum or remain behind the scenes as your production partner.",
  },
];

function AgencyPartnerPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <PageV0>
      <AgencyPartnerPageWrapper>
        <HeroSection>
          <HeroMeta>
            <span>Agency Partner</span>
            <span>Creative / Web / Motion / AI</span>
          </HeroMeta>

          <HeroContent>
            <HeroEyebrow>For ambitious creative studios</HeroEyebrow>
            <h1>Your agency’s premium creative and technology partner.</h1>
            <p>
              We work quietly alongside your in-house team to uplift client work
              across design, web, motion, and AI — helping you move faster,
              present stronger, and deliver digital experiences with a sharper,
              more premium finish.
            </p>

            <HeroActions>
              <a href="mailto:hello@bodilum.com?subject=Agency%20Partner%20Enquiry">
                Become an Agency Partner
              </a>
              <a href="mailto:hello@bodilum.com?subject=Agency%20Fit%20Call">
                Book a Fit Call
              </a>
            </HeroActions>
          </HeroContent>
        </HeroSection>

        <IntroSection>
          <LargeStatement>
            Your team already has taste, clients, and creative ambition.
            Bodilum adds the extra senior capacity to make the work feel more
            refined, more interactive, more useful, and more premium.
          </LargeStatement>

          <IntroGrid>
            <IntroCard>
              <span>01</span>
              <h3>Not a freelancer list.</h3>
              <p>
                A focused creative partner for design direction, frontend
                execution, motion polish, and practical AI support.
              </p>
            </IntroCard>

            <IntroCard>
              <span>02</span>
              <h3>Not unlimited design.</h3>
              <p>
                Clear monthly capacity, focused workstreams, and senior-quality
                execution instead of rushed, low-value output.
              </p>
            </IntroCard>

            <IntroCard>
              <span>03</span>
              <h3>Built for agencies.</h3>
              <p>
                We can work white-label, support pitches, improve delivery, and
                help your team sell more premium digital work.
              </p>
            </IntroCard>
          </IntroGrid>
        </IntroSection>

        <PricingSection>
          <SectionHeader $light>
            <span>Partnership levels</span>
            <h2>One offer. Three levels of support.</h2>
            <p>
              Start lean as a small studio or bring us in deeper when your
              agency needs serious creative and technical capacity.
            </p>
          </SectionHeader>

          <OfferList>
            {partnerOffers.map((offer) => (
              <OfferCard key={offer.name} $recommended={offer.recommended}>
                <OfferTop>
                  <OfferMeta>
                    <span>{offer.eyebrow}</span>
                    {offer.recommended && <Recommended>Recommended</Recommended>}
                  </OfferMeta>

                  <OfferTitle>
                    <h3>{offer.name}</h3>
                    <PriceBlock>
                      <strong>{offer.price}</strong>
                      <span>{offer.cadence}</span>
                    </PriceBlock>
                  </OfferTitle>

                  <OfferDescription>{offer.description}</OfferDescription>
                </OfferTop>

                <OfferBody>
                  <BestFor>
                    <span>Best for</span>
                    <p>{offer.bestFor}</p>
                  </BestFor>

                  <Includes>
                    {offer.capacity.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </Includes>

                  <Outcome>
                    <span>Outcome</span>
                    <p>{offer.outcome}</p>
                  </Outcome>
                </OfferBody>
              </OfferCard>
            ))}
          </OfferList>
        </PricingSection>

        <SupportSection>
          <SectionHeader $spaced>
            <span>What we help with</span>
            <h2>Premium support where agency work usually slows down.</h2>
          </SectionHeader>

          <SupportGrid>
            {supportAreas.map((area) => (
              <SupportCard key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </SupportCard>
            ))}
          </SupportGrid>
        </SupportSection>

        <OutcomesSection>
          <SectionHeader $spaced>
            <span>Agency outcomes</span>
            <h2>What your studio becomes able to do.</h2>
          </SectionHeader>

          <OutcomeGrid>
            <OutcomeCard>
              <span>01</span>
              <h3>Take on better projects.</h3>
              <p>
                Add senior creative and technical support when a client brief
                needs more polish, interaction, or digital depth.
              </p>
            </OutcomeCard>

            <OutcomeCard>
              <span>02</span>
              <h3>Move faster.</h3>
              <p>
                Reduce delays across design, frontend, motion, presentation
                work, and client revisions.
              </p>
            </OutcomeCard>

            <OutcomeCard>
              <span>03</span>
              <h3>Sell more premium work.</h3>
              <p>
                Show clients stronger visual direction, sharper interactions,
                and more advanced digital capability.
              </p>
            </OutcomeCard>

            <OutcomeCard>
              <span>04</span>
              <h3>Add AI without pretending.</h3>
              <p>
                Bring useful AI workflows into client projects in simple,
                practical, maintainable ways.
              </p>
            </OutcomeCard>
          </OutcomeGrid>
        </OutcomesSection>

        <ProcessSection>
          <SectionHeader $spaced>
            <span>How it works</span>
            <h2>A quiet extension of your team.</h2>
          </SectionHeader>

          <ProcessList>
            {process.map((item, index) => (
              <ProcessItem key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </ProcessItem>
            ))}
          </ProcessList>
        </ProcessSection>

        <TermsSection>
          <TermsContent>
            <SectionHeader $light $spaced>
              <span>Terms</span>
              <h2>Simple enough to start. Clear enough to scale.</h2>
            </SectionHeader>

            <TermsList>
              <li>Monthly retainer with 30 days’ notice to cancel.</li>
              <li>Upgrade or downgrade as your agency workload changes.</li>
              <li>Each plan includes a defined capacity and workstream limit.</li>
              <li>
                Unused capacity may roll over for 30 days, up to 20% of the
                monthly plan.
              </li>
              <li>
                Full platforms, complex 3D, advanced backend systems, and large
                AI products are quoted separately.
              </li>
              <li>White-label and NDA-friendly collaboration are available.</li>
              <li>
                Rush work depends on availability and may attract a priority
                fee.
              </li>
            </TermsList>
          </TermsContent>

          <FaqList>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <FaqItem key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <em>{isOpen ? "−" : "+"}</em>
                  </button>

                  {isOpen && <p>{faq.a}</p>}
                </FaqItem>
              );
            })}
          </FaqList>
        </TermsSection>

        <FinalCta>
          <span>Ready when your next client brief needs more.</span>
          <h2>
            Plug Bodilum into your agency and deliver work that feels sharper,
            faster, and more premium.
          </h2>
          <a href="mailto:hello@bodilum.com?subject=Agency%20Partner%20Enquiry">
            Start the partnership
          </a>
        </FinalCta>
      </AgencyPartnerPageWrapper>
    </PageV0>
  );
}

export default AgencyPartnerPage;

const AgencyPartnerPageWrapper = styled.main`
  width: min(100%, 1600px);
  margin: 0 auto;
  color: #111;
  background: #f7f4ef;
  overflow: hidden;

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const SectionHeader = styled.div<{ $light?: boolean; $spaced?: boolean }>`
  max-width: 980px;
  margin-bottom: ${({ $spaced }) =>
    $spaced ? "clamp(40px, 6vw, 88px)" : "0"};

  span {
    display: inline-flex;
    margin-bottom: 22px;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ $light }) =>
      $light ? "rgba(247, 244, 239, 0.58)" : "rgba(17, 17, 17, 0.48)"};
  }

  h2 {
    margin: 0;
    font-size: clamp(3rem, 7vw, 8rem);
    line-height: 0.9;
    letter-spacing: -0.075em;
    font-weight: 500;
  }

  p {
    max-width: 620px;
    margin: 28px 0 0;
    font-size: clamp(1rem, 1.4vw, 1.25rem);
    line-height: 1.55;
    color: ${({ $light }) =>
      $light ? "rgba(247, 244, 239, 0.58)" : "rgba(17, 17, 17, 0.62)"};
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  padding: 32px clamp(20px, 4vw, 72px) 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeroMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  font-size: clamp(0.75rem, 1vw, 0.95rem);
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.55);

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const HeroContent = styled.div`
  max-width: 1220px;
  padding-top: 18vh;

  h1 {
    max-width: 1180px;
    margin: 0;
    font-size: clamp(4.5rem, 13vw, 13.5rem);
    line-height: 0.82;
    letter-spacing: -0.095em;
    font-weight: 500;
  }

  p {
    max-width: 720px;
    margin: clamp(28px, 4vw, 56px) 0 0 auto;
    font-size: clamp(1.05rem, 1.55vw, 1.55rem);
    line-height: 1.45;
    color: rgba(17, 17, 17, 0.68);
  }

  @media (max-width: 800px) {
    padding-top: 14vh;

    p {
      margin-left: 0;
    }
  }
`;

const HeroEyebrow = styled.span`
  display: inline-flex;
  margin-bottom: 28px;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.5);
`;

const HeroActions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;

  a {
    min-height: 56px;
    padding: 0 24px;
    border: 1px solid rgba(17, 17, 17, 0.22);
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    transition: transform 0.35s ease, background 0.35s ease, color 0.35s ease,
      border-color 0.35s ease;
  }

  a:first-child {
    background: #111;
    color: #f7f4ef;
    border-color: #111;
  }

  a:hover {
    transform: translateY(-3px);
    background: #111;
    color: #f7f4ef;
    border-color: #111;
  }

  a:first-child:hover {
    background: transparent;
    color: #111;
  }

  @media (max-width: 800px) {
    justify-content: flex-start;

    a {
      width: 100%;
    }
  }
`;

const IntroSection = styled.section`
  padding: clamp(80px, 12vw, 180px) clamp(20px, 4vw, 72px);
`;

const LargeStatement = styled.p`
  max-width: 1250px;
  margin: 0;
  font-size: clamp(2.6rem, 6.8vw, 8.8rem);
  line-height: 0.94;
  letter-spacing: -0.075em;
  font-weight: 500;
`;

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin-top: clamp(56px, 8vw, 120px);
  background: rgba(17, 17, 17, 0.12);
  border: 1px solid rgba(17, 17, 17, 0.12);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const IntroCard = styled.article`
  min-height: 320px;
  padding: clamp(24px, 3vw, 44px);
  background: #f7f4ef;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    font-size: 0.78rem;
    color: rgba(17, 17, 17, 0.45);
  }

  h3 {
    margin: auto 0 18px;
    font-size: clamp(1.7rem, 2.8vw, 3.2rem);
    line-height: 0.95;
    letter-spacing: -0.055em;
    font-weight: 500;
  }

  p {
    max-width: 360px;
    margin: 0;
    color: rgba(17, 17, 17, 0.62);
    line-height: 1.55;
  }
`;

const PricingSection = styled.section`
  padding: clamp(80px, 10vw, 160px) clamp(20px, 4vw, 72px);
  background: #111;
  color: #f7f4ef;
`;

const OfferList = styled.div`
  display: grid;
  gap: 18px;
  margin-top: clamp(56px, 8vw, 110px);
`;

const OfferCard = styled.article<{ $recommended?: boolean }>`
  position: relative;
  overflow: hidden;
  padding: clamp(24px, 4vw, 58px);
  border: 1px solid
    ${({ $recommended }) =>
      $recommended ? "rgba(247, 244, 239, 0.5)" : "rgba(247, 244, 239, 0.14)"};
  border-radius: clamp(24px, 4vw, 48px);
  background: ${({ $recommended }) =>
    $recommended ? "rgba(247, 244, 239, 0.1)" : "rgba(247, 244, 239, 0.035)"};
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(36px, 6vw, 90px);
  transition: transform 0.45s ease, border-color 0.45s ease,
    background 0.45s ease;

  &::before {
    content: "";
    position: absolute;
    inset: auto -20% -40% auto;
    width: 50vw;
    height: 50vw;
    border-radius: 999px;
    background: radial-gradient(
      circle,
      rgba(247, 244, 239, 0.12),
      transparent 62%
    );
    opacity: 0;
    transition: opacity 0.45s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(247, 244, 239, 0.48);
    background: rgba(247, 244, 239, 0.09);
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const OfferTop = styled.div`
  position: relative;
  z-index: 1;
`;

const OfferMeta = styled.div`
  min-height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: clamp(36px, 5vw, 84px);

  > span:first-child {
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(247, 244, 239, 0.52);
  }
`;

const Recommended = styled.span`
  padding: 9px 13px;
  border: 1px solid rgba(247, 244, 239, 0.24);
  border-radius: 999px;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #f7f4ef;
`;

const OfferTitle = styled.div`
  h3 {
    max-width: 640px;
    margin: 0;
    font-size: clamp(3rem, 6.5vw, 8.5rem);
    line-height: 0.86;
    letter-spacing: -0.085em;
    font-weight: 500;
  }
`;

const PriceBlock = styled.div`
  margin-top: clamp(28px, 4vw, 52px);
  display: flex;
  align-items: flex-end;
  gap: 10px;

  strong {
    font-size: clamp(2.4rem, 4.6vw, 5.6rem);
    line-height: 0.9;
    letter-spacing: -0.06em;
    font-weight: 500;
  }

  span {
    padding-bottom: 8px;
    color: rgba(247, 244, 239, 0.55);
  }
`;

const OfferDescription = styled.p`
  max-width: 560px;
  margin: 32px 0 0;
  color: rgba(247, 244, 239, 0.68);
  font-size: clamp(1rem, 1.45vw, 1.25rem);
  line-height: 1.55;
`;

const OfferBody = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 28px;
`;

const BestFor = styled.div`
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(247, 244, 239, 0.12);

  span {
    display: block;
    margin-bottom: 12px;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(247, 244, 239, 0.42);
  }

  p {
    max-width: 620px;
    margin: 0;
    color: rgba(247, 244, 239, 0.75);
    line-height: 1.55;
  }
`;

const Includes = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  columns: 2;
  column-gap: 30px;

  li {
    break-inside: avoid;
    position: relative;
    padding: 0 0 14px 20px;
    color: rgba(247, 244, 239, 0.72);
    line-height: 1.45;
  }

  li::before {
    content: "";
    position: absolute;
    top: 0.63em;
    left: 0;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: rgba(247, 244, 239, 0.55);
  }

  @media (max-width: 700px) {
    columns: 1;
  }
`;

const Outcome = styled.div`
  padding: clamp(22px, 3vw, 34px);
  border-radius: 28px;
  background: rgba(247, 244, 239, 0.08);

  span {
    display: block;
    margin-bottom: 12px;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(247, 244, 239, 0.44);
  }

  p {
    margin: 0;
    color: rgba(247, 244, 239, 0.78);
    line-height: 1.6;
  }
`;

const SupportSection = styled.section`
  padding: clamp(80px, 10vw, 160px) clamp(20px, 4vw, 72px);
`;

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid rgba(17, 17, 17, 0.14);
  border-left: 1px solid rgba(17, 17, 17, 0.14);

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const SupportCard = styled.article`
  min-height: 420px;
  padding: clamp(24px, 3vw, 42px);
  border-right: 1px solid rgba(17, 17, 17, 0.14);
  border-bottom: 1px solid rgba(17, 17, 17, 0.14);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: background 0.35s ease, transform 0.35s ease;

  h3 {
    margin: 0 0 18px;
    font-size: clamp(2rem, 3vw, 4rem);
    line-height: 0.95;
    letter-spacing: -0.065em;
    font-weight: 500;
  }

  p {
    margin: 0;
    color: rgba(17, 17, 17, 0.6);
    line-height: 1.55;
  }

  &:hover {
    background: #fffaf1;
    transform: translateY(-4px);
  }
`;

const OutcomesSection = styled.section`
  padding: clamp(80px, 10vw, 160px) clamp(20px, 4vw, 72px);
  background: #ebe4d9;
`;

const OutcomeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const OutcomeCard = styled.article`
  min-height: 360px;
  padding: clamp(24px, 4vw, 54px);
  border-radius: 36px;
  background: #f7f4ef;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    color: rgba(17, 17, 17, 0.4);
    font-size: 0.8rem;
  }

  h3 {
    max-width: 560px;
    margin: auto 0 18px;
    font-size: clamp(2.2rem, 4.4vw, 5.8rem);
    line-height: 0.88;
    letter-spacing: -0.075em;
    font-weight: 500;
  }

  p {
    max-width: 520px;
    margin: 0;
    color: rgba(17, 17, 17, 0.62);
    line-height: 1.55;
  }
`;

const ProcessSection = styled.section`
  padding: clamp(80px, 10vw, 160px) clamp(20px, 4vw, 72px);
`;

const ProcessList = styled.div`
  display: grid;
  border-top: 1px solid rgba(17, 17, 17, 0.14);
`;

const ProcessItem = styled.article`
  min-height: 180px;
  padding: clamp(24px, 3vw, 42px) 0;
  border-bottom: 1px solid rgba(17, 17, 17, 0.14);
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 30px;
  align-items: center;

  span {
    color: rgba(17, 17, 17, 0.38);
    font-size: 0.8rem;
  }

  p {
    max-width: 980px;
    margin: 0;
    font-size: clamp(1.8rem, 3.7vw, 5rem);
    line-height: 0.98;
    letter-spacing: -0.065em;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const TermsSection = styled.section`
  padding: clamp(80px, 10vw, 160px) clamp(20px, 4vw, 72px);
  background: #111;
  color: #f7f4ef;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(340px, 0.7fr);
  gap: clamp(40px, 7vw, 120px);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const TermsContent = styled.div``;

const TermsList = styled.ul`
  max-width: 720px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 18px 0;
    border-bottom: 1px solid rgba(247, 244, 239, 0.12);
    color: rgba(247, 244, 239, 0.68);
    line-height: 1.55;
  }
`;

const FaqList = styled.div`
  display: grid;
  align-content: start;
  border-top: 1px solid rgba(247, 244, 239, 0.14);
`;

const FaqItem = styled.article`
  border-bottom: 1px solid rgba(247, 244, 239, 0.14);

  button {
    width: 100%;
    padding: 26px 0;
    border: 0;
    background: transparent;
    color: #f7f4ef;
    display: flex;
    justify-content: space-between;
    gap: 24px;
    text-align: left;
    cursor: pointer;
  }

  button span {
    font-size: clamp(1.1rem, 1.6vw, 1.45rem);
    letter-spacing: -0.035em;
  }

  button em {
    font-style: normal;
    color: rgba(247, 244, 239, 0.54);
  }

  p {
    max-width: 560px;
    margin: 0;
    padding: 0 0 28px;
    color: rgba(247, 244, 239, 0.62);
    line-height: 1.6;
  }
`;

const FinalCta = styled.section`
  min-height: 90vh;
  padding: clamp(80px, 10vw, 160px) clamp(20px, 4vw, 72px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(17, 17, 17, 0.48);
  }

  h2 {
    max-width: 1280px;
    margin: clamp(80px, 10vw, 150px) 0 42px;
    font-size: clamp(3.2rem, 8.2vw, 10.5rem);
    line-height: 0.88;
    letter-spacing: -0.085em;
    font-weight: 500;
  }

  a {
    width: fit-content;
    min-height: 62px;
    padding: 0 28px;
    border-radius: 999px;
    background: #111;
    color: #f7f4ef;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    letter-spacing: -0.025em;
    transition: transform 0.35s ease, background 0.35s ease, color 0.35s ease;
  }

  a:hover {
    transform: translateY(-4px);
    background: #ebe4d9;
    color: #111;
  }

  @media (max-width: 700px) {
    a {
      width: 100%;
    }
  }
`;