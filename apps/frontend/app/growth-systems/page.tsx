"use client";

import Link from "next/link";
import styled from "styled-components";
import PageV0 from "@/components/ui/page-v0/PageV0";

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/\s+/g, "-");



const growthPackages = [
  {
    eyebrow: "01 / Growth Foundation",
    name: "Growth Foundation",
    price: "R7,500",
    setup: "R12,000 setup",
    subtitle: "Get found. Look credible. Show up consistently.",
    description:
      "For businesses that need a stronger digital presence, better trust signals, basic marketing consistency, and the essential tracking needed to understand what is working.",
    outcomes: [
      "Look more professional when customers search for your business.",
      "Make it easier for people to find you on Google and social platforms.",
      "Show up consistently with clear, branded marketing content.",
      "Collect more reviews and build trust faster.",
      "Understand basic website and campaign activity through monthly reporting.",
    ],
    bestFor: [
      "New businesses",
      "Local service businesses",
      "Brands with weak digital presence",
      "Businesses that need visibility and trust",
    ],
    included: [
      "Brand and offer clarity",
      "Google Business Profile setup or optimisation",
      "Social media profile cleanup",
      "Website or landing page support",
      "2 website updates per month",
      "8 social media designs per month",
      "Captions and posting to 2 platforms",
      "Google Analytics basic setup",
      "Meta Pixel basic setup",
      "Review request templates",
      "Monthly visibility report",
      "Monthly growth check-in",
    ],
    ai: [
      "AI fast-reply templates",
      "FAQ response bank",
      "Review request messages",
      "Email and WhatsApp response templates",
    ],
    cta: "Start with Foundation",
  },
  {
    eyebrow: "02 / Conversion Engine",
    name: "Conversion Engine",
    price: "R18,000",
    setup: "R25,000 setup",
    subtitle: "Turn more visitors into leads, bookings, and customers.",
    description:
      "For businesses that already get attention but are losing potential customers because they do not have a clear funnel, lead capture system, follow-up flow, or conversion tracking.",
    outcomes: [
      "Capture more leads from people who visit your website or campaign pages.",
      "Follow up with interested prospects instead of losing them after one visit.",
      "Send people to clearer landing pages built around specific offers.",
      "Prepare your business for paid ads with better tracking and retargeting assets.",
      "Understand where enquiries are coming from and what needs to improve.",
    ],
    bestFor: [
      "Businesses with traffic but low enquiries",
      "Businesses planning to run ads",
      "Service providers and consultants",
      "Product businesses with active campaigns",
    ],
    included: [
      "Everything in Growth Foundation",
      "Sales funnel planning",
      "1 campaign landing page",
      "Lead capture or quote request form",
      "Email list setup",
      "Welcome email setup",
      "3-email lead nurture sequence",
      "12 social media designs per month",
      "Retargeting creative assets",
      "GA4 event tracking",
      "Meta Pixel lead events",
      "Monthly conversion report",
    ],
    ai: [
      "Lead qualification prompts",
      "Website form auto-response copy",
      "Sales email templates",
      "Objection-handling response bank",
    ],
    cta: "Build My Funnel",
  },
  {
    eyebrow: "03 / Retention Engine",
    name: "Retention Engine",
    price: "R32,000",
    setup: "R45,000 setup",
    subtitle: "Turn customers into repeat buyers, reviews, and referrals.",
    description:
      "For businesses with existing customers that want stronger follow-up, repeat purchases, customer nurturing, reviews, referrals, and better long-term customer value.",
    outcomes: [
      "Stay in touch with customers after they buy or book.",
      "Encourage repeat bookings, repeat purchases, reviews and referrals.",
      "Send newsletters and nurture messages that keep customers engaged.",
      "Identify customer groups such as new, repeat, inactive and VIP customers.",
      "Build stronger long-term customer relationships instead of relying only on new leads.",
    ],
    bestFor: [
      "Businesses with existing customers",
      "Salons, clinics, studios and service brands",
      "Membership or subscription businesses",
      "Businesses that want more repeat sales",
    ],
    included: [
      "Everything in Conversion Engine",
      "Customer nurture strategy",
      "Post-purchase or post-service follow-up flow",
      "Automatic review request flow",
      "Repeat booking or purchase reminders",
      "Referral campaign setup",
      "Customer segmentation",
      "2 customer newsletters per month",
      "12 to 16 social media designs per month",
      "Loyalty and reactivation campaign planning",
      "Monthly traffic, leads and retention report",
      "Monthly retention review",
    ],
    ai: [
      "Customer care response templates",
      "Newsletter draft support",
      "Review automation copy",
      "Repeat purchase reminder flows",
    ],
    cta: "Grow Customer Value",
  },
];

const addOns = [
  {
    title: "Paid Ads Management",
    price: "From R6,000/month",
    description:
      "Google, Meta, TikTok or LinkedIn ad setup and management. Ad spend is paid separately by the client.",
  },
  {
    title: "Extra Landing Pages",
    price: "From R4,500/page",
    description:
      "Campaign pages, offer pages, product pages, consultation pages, or A/B test variants.",
  },
  {
    title: "Extra Social Content",
    price: "From R1,500/month",
    description:
      "Add more weekly posts, reels, campaign graphics, launch assets, or daily weekday posting.",
  },
  {
    title: "Motion Design Pack",
    price: "From R6,500/month",
    description:
      "Simple animated social graphics, motion posters, story assets, product/service animations, and campaign motion designs.",
  },
  {
    title: "Premium Motion Campaign",
    price: "From R15,000",
    description:
      "Launch videos, animated brand stories, explainer-style motion, promo videos, and higher-end campaign animation.",
  },
  {
    title: "Advanced AI Automation",
    price: "From R8,500 setup",
    description:
      "AI website assistant, WhatsApp auto-replies, lead qualification, customer support flows, and business knowledge base setup.",
  },
  {
    title: "Email Marketing Expansion",
    price: "From R5,000/month",
    description:
      "More newsletters, deeper nurture sequences, customer segmentation, list cleanup, and monthly campaign management.",
  },
  {
    title: "Advanced Analytics Setup",
    price: "From R7,500 setup",
    description:
      "Advanced GA4 events, Meta Pixel events, conversion tracking, custom dashboards, campaign tracking, and performance insights.",
  },
  {
    title: "Monthly Dev Support",
    price: "From R4,500/month",
    description:
      "Extra website updates, small feature improvements, bug fixes, integrations, and technical support.",
  },
];

const terms = [
  "All packages require a minimum 3-month commitment.",
  "Monthly retainers are billed in advance.",
  "Setup fees are paid before onboarding begins.",
  "Google Analytics and Meta Pixel setup require access to the client’s website, Google account, Meta Business account, and ad account where applicable.",
  "Monthly reports cover agreed package activity, visibility, traffic, leads, conversion activity, campaign performance, and recommendations where tracking data is available.",
  "Paid ad spend is not included and is paid directly by the client.",
  "Third-party tools, hosting, domains, email platforms, CRM tools, SMS, WhatsApp API, stock assets and AI API usage are billed separately.",
  "Included social posting means scheduling approved content. It does not include daily community management, replying to DMs, influencer outreach, or full social media management unless added separately.",
  "Motion design is not included in the base packages unless agreed in writing. Motion design packs, reels, launch videos, 3D animation, shoots, voiceovers and complex campaign animation are quoted separately.",
  "Each design, page, email or campaign asset includes up to 2 revision rounds.",
  "Clients may upgrade at any time. Upgrades are billed pro-rata or from the next billing cycle.",
  "Clients may downgrade after the minimum term with 30 days written notice.",
  "Bodilum does not guarantee specific sales, leads, rankings or revenue outcomes.",
];

export default function GrowthSystemsPage() {
  return (
    <PageV0>
      <GrowthSystemsPageWrapper>
        <HeroSection>
          <HeroGrid>
            <HeroContent>
              <Eyebrow>Bodilum Growth Systems</Eyebrow>
              <HeroTitle>Growth systems for businesses.</HeroTitle>
            </HeroContent>

            <HeroAside>
              <HeroText>
                We help businesses build the digital presence, conversion
                systems and customer nurture flows they need to attract, convert
                and retain more customers.
              </HeroText>

              <ButtonRow>
                <PrimaryButton href="/contact?package=growth-systems">
                  Start a project
                </PrimaryButton>

                <SecondaryButton href="#packages">View packages</SecondaryButton>
              </ButtonRow>
            </HeroAside>
          </HeroGrid>
        </HeroSection>

        <IntroSection>
          <SectionLabel>The system</SectionLabel>

          <IntroContent>
            <LargeText>
              Most businesses do not only need a website. They need a system
              that helps people find them, trust them, buy from them and come
              back.
            </LargeText>

            <StepsGrid>
              <StepCard>
                <StepNumber>01</StepNumber>
                <StepTitle>Visibility</StepTitle>
                <StepText>Get found and look credible.</StepText>
              </StepCard>

              <StepCard>
                <StepNumber>02</StepNumber>
                <StepTitle>Conversion</StepTitle>
                <StepText>Turn interest into enquiries and sales.</StepText>
              </StepCard>

              <StepCard>
                <StepNumber>03</StepNumber>
                <StepTitle>Retention</StepTitle>
                <StepText>Bring customers back and grow loyalty.</StepText>
              </StepCard>
            </StepsGrid>
          </IntroContent>
        </IntroSection>

        <PackagesSection id="packages">
          <SectionHeader>
            <div>
              <SectionLabel>Packages</SectionLabel>
              <SectionTitle>Choose your growth layer.</SectionTitle>
            </div>

            <SectionHeaderText>
              Start with the system you need now. Keep the base package focused, then add PPC, motion design, AI automation, email marketing or dev support when the business is ready.
            </SectionHeaderText>
          </SectionHeader>

          <PackageList>
            {growthPackages.map((pkg) => (
              <PackageCard key={pkg.name}>
                <PackageLeft>
                  <div>
                    <PackageEyebrow>{pkg.eyebrow}</PackageEyebrow>
                    <PackageTitle>{pkg.name}</PackageTitle>
                    <PackageSubtitle>{pkg.subtitle}</PackageSubtitle>
                  </div>

                  <PackagePriceBlock>
                    <PriceLine>
                      <Price>{pkg.price}</Price>
                      <PriceMeta>/ month</PriceMeta>
                    </PriceLine>

                    <SetupText>{pkg.setup}</SetupText>

                    <PackageButton
                      href={`/contact?package=${slugify(pkg.name)}`}
                    >
                      {pkg.cta}
                    </PackageButton>
                  </PackagePriceBlock>
                </PackageLeft>

                <PackageRight>
                  <PackageDescription>{pkg.description}</PackageDescription>

                  <OutcomeBox>
                    <OutcomeLabel>What your business will be able to do</OutcomeLabel>

                    <OutcomeList>
                      {pkg.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </OutcomeList>
                  </OutcomeBox>


                  <PackageColumns>
                    <PackageColumn>
                      <ColumnTitle>Best for</ColumnTitle>
                      <CleanList>
                        {pkg.bestFor.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </CleanList>
                    </PackageColumn>

                    <PackageColumn>
                      <ColumnTitle>Included</ColumnTitle>
                      <CleanList>
                        {pkg.included.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </CleanList>
                    </PackageColumn>

                    <PackageColumn>
                      <ColumnTitle>Simple AI</ColumnTitle>
                      <CleanList>
                        {pkg.ai.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </CleanList>
                    </PackageColumn>
                  </PackageColumns>
                </PackageRight>
              </PackageCard>
            ))}
          </PackageList>
        </PackagesSection>

        <AddOnsSection>
          <SectionHeader>
            <div>
              <SectionLabel>Flexible add-ons</SectionLabel>
              <SectionTitle>Expand without changing everything.</SectionTitle>
            </div>

            <SectionHeaderText>
              Add more content, landing pages, PPC, email marketing, dev support
              or AI automation when the business is ready.
            </SectionHeaderText>
          </SectionHeader>

          <AddOnsGrid>
            {addOns.map((addon) => (
              <AddOnCard key={addon.title}>
                <div>
                  <AddOnTitle>{addon.title}</AddOnTitle>
                  <AddOnText>{addon.description}</AddOnText>
                </div>

                <AddOnPrice>{addon.price}</AddOnPrice>
              </AddOnCard>
            ))}
          </AddOnsGrid>
        </AddOnsSection>

        <TermsSection>
          <SectionLabel>Terms</SectionLabel>

          <TermsGrid>
            <SectionTitle>Clear, flexible, scalable.</SectionTitle>

            <TermsCard>
              <TermsList>
                {terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </TermsList>
            </TermsCard>
          </TermsGrid>
        </TermsSection>

        <FinalCta>
          <FinalTitle>
            Build the system behind your next stage of growth.
          </FinalTitle>

          <FinalContent>
            <FinalText>
              Start with visibility, move into conversion, then build customer
              retention. Bodilum helps you grow the system month by month.
            </FinalText>

            <FinalButton href="/contact?package=growth-systems">
              Start a project
            </FinalButton>
          </FinalContent>
        </FinalCta>
      </GrowthSystemsPageWrapper>
    </PageV0>
  );
}

const GrowthSystemsPageWrapper = styled.main`
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
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(40px, 8vw, 120px);
  align-items: end;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const HeroContent = styled.div``;

const Eyebrow = styled.p`
  margin: 0 0 34px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.42);
`;

const HeroTitle = styled.h1`
  max-width: 1050px;
  margin: 0;
  font-size: clamp(72px, 12vw, 210px);
  line-height: 0.82;
  letter-spacing: -0.1em;
  font-weight: 700;
`;

const HeroAside = styled.div`
  padding-bottom: 14px;
`;

const HeroText = styled.p`
  max-width: 640px;
  margin: 0;
  font-size: clamp(18px, 1.7vw, 28px);
  line-height: 1.35;
  color: rgba(0, 0, 0, 0.58);
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
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: #222;
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
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: border-color 0.25s ease, transform 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #050505;
  }
`;

const IntroSection = styled.section`
  display: grid;
  grid-template-columns: 0.75fr 1.25fr;
  gap: clamp(40px, 8vw, 120px);
  padding: clamp(90px, 11vw, 170px) 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const SectionLabel = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.42);
`;

const IntroContent = styled.div``;

const LargeText = styled.h2`
  max-width: 980px;
  margin: 0;
  font-size: clamp(38px, 5.4vw, 92px);
  line-height: 0.98;
  letter-spacing: -0.07em;
  font-weight: 700;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 56px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  min-height: 210px;
  padding: 28px;
  border-radius: 34px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(16px);
`;

const StepNumber = styled.p`
  margin: 0 0 56px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.22em;
  color: rgba(0, 0, 0, 0.35);
`;

const StepTitle = styled.h3`
  margin: 0;
  font-size: 28px;
  letter-spacing: -0.05em;
`;

const StepText = styled.p`
  margin: 10px 0 0;
  color: rgba(0, 0, 0, 0.55);
  line-height: 1.55;
`;

const PackagesSection = styled.section`
  padding: clamp(90px, 10vw, 160px) 0;
`;

const SectionHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 40px;
  align-items: end;
  margin-bottom: 54px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  max-width: 850px;
  margin: 22px 0 0;
  font-size: clamp(48px, 7vw, 112px);
  line-height: 0.9;
  letter-spacing: -0.075em;
  font-weight: 700;
`;

const SectionHeaderText = styled.p`
  margin: 0;
  font-size: 17px;
  line-height: 1.65;
  color: rgba(0, 0, 0, 0.55);
`;

const PackageList = styled.div`
  display: grid;
  gap: 28px;
`;

const PackageCard = styled.article`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(40px, 6vw, 90px);
  padding: clamp(34px, 5vw, 72px);
  border-radius: clamp(34px, 4vw, 60px);
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.055);
  backdrop-filter: blur(20px);
  transition: transform 0.35s ease, border-color 0.35s ease,
    box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(0, 0, 0, 0.22);
    box-shadow: 0 40px 120px rgba(0, 0, 0, 0.085);
  }

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const PackageLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 64px;
`;

const PackageEyebrow = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.36em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.36);
`;

const PackageTitle = styled.h3`
  max-width: 620px;
  margin: 34px 0 0;
  font-size: clamp(52px, 6.2vw, 108px);
  line-height: 0.9;
  letter-spacing: -0.085em;
  font-weight: 700;
`;

const PackageSubtitle = styled.p`
  max-width: 520px;
  margin: 28px 0 0;
  font-size: clamp(18px, 1.6vw, 25px);
  line-height: 1.45;
  color: rgba(0, 0, 0, 0.58);
`;

const PackagePriceBlock = styled.div``;

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
  letter-spacing: -0.075em;
  font-weight: 700;
`;

const PriceMeta = styled.p`
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.38);
`;

const SetupText = styled.p`
  margin: 14px 0 0;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.48);
`;

const PackageButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  margin-top: 28px;
  padding: 0 26px;
  border-radius: 999px;
  background: #050505;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: #222;
  }
`;

const PackageRight = styled.div``;

const PackageDescription = styled.p`
  max-width: 850px;
  margin: 0;
  font-size: 18px;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.58);
`;

const PackageColumns = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.2fr 0.9fr;
  gap: 30px;
  margin-top: 42px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const PackageColumn = styled.div``;

const ColumnTitle = styled.p`
  margin: 0 0 14px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.38);
`;

const CleanList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 13px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 15px;
    line-height: 1.45;
    color: rgba(0, 0, 0, 0.68);
  }
`;

const AddOnsSection = styled.section`
  padding: clamp(90px, 10vw, 160px) 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const AddOnsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const AddOnCard = styled.div`
  min-height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  border-radius: 34px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(16px);
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(0, 0, 0, 0.22);
  }
`;

const AddOnTitle = styled.h3`
  margin: 0;
  font-size: 28px;
  line-height: 1;
  letter-spacing: -0.055em;
`;

const AddOnText = styled.p`
  margin: 18px 0 0;
  color: rgba(0, 0, 0, 0.54);
  line-height: 1.6;
`;

const AddOnPrice = styled.p`
  margin: 42px 0 0;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const TermsSection = styled.section`
  padding: clamp(90px, 10vw, 160px) 0;
`;

const TermsGrid = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(40px, 6vw, 90px);
  margin-top: 28px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const TermsCard = styled.div`
  padding: clamp(28px, 4vw, 52px);
  border-radius: 44px;
  background: #050505;
  color: #fff;
`;

const TermsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 20px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.7);
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
  padding: clamp(44px, 7vw, 90px);
  border-radius: clamp(36px, 5vw, 70px);
  background: #050505;
  color: #fff;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const FinalTitle = styled.h2`
  max-width: 950px;
  margin: 0;
  font-size: clamp(52px, 8vw, 130px);
  line-height: 0.88;
  letter-spacing: -0.085em;
  font-weight: 700;
`;

const FinalContent = styled.div``;

const FinalText = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.62);
`;

const FinalButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  margin-top: 30px;
  padding: 0 26px;
  border-radius: 999px;
  background: #fff;
  color: #050505;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: transform 0.25s ease, opacity 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.85;
  }
`;


const OutcomeBox = styled.div`
  margin-top: 36px;
  padding: clamp(24px, 3vw, 38px);
  border-radius: 34px;
  background: #050505;
  color: #fff;
`;

const OutcomeLabel = styled.p`
  margin: 0 0 24px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
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
    color: rgba(255, 255, 255, 0.76);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.72em;
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: #fff;
      opacity: 0.7;
    }
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;