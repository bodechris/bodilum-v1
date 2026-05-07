import PageV0 from '@/components/ui/page-v0/PageV0';
import styled from 'styled-components';

function CookiesPage() {
  return (
    <PageV0>
      <LegalPageWrapper>
        <header>
          <p className="eyebrow">Cookies</p>
          <h1>Cookie policy</h1>
          <p className="intro">
            Bodilum uses cookies and similar technologies to keep the site working, measure performance, and
            understand how visitors move through pages like services, pricing, and contact.
          </p>
        </header>

        <section>
          <h2>Essential cookies</h2>
          <p>
            These cookies help core site features function correctly, including security, routing, and basic page
            behaviour required for Bodilum.com to operate reliably.
          </p>
        </section>

        <section>
          <h2>Performance and analytics</h2>
          <p>
            Bodilum may use analytics or performance tools to understand which pages attract attention, where traffic
            comes from, and which parts of the site need improvement.
          </p>
        </section>

        <section>
          <h2>Marketing and embedded services</h2>
          <p>
            Some third-party tools, embeds, or campaign links may also place cookies when enabled. These are used to
            support communication, analytics, or future marketing measurement connected to Bodilum offers.
          </p>
        </section>

        <section>
          <h2>Managing cookies</h2>
          <p>
            You can control cookies through your browser settings. Disabling some cookies may affect how parts of
            the site function or limit Bodilum's ability to measure and improve the experience.
          </p>
        </section>

        <section>
          <h2>Policy changes</h2>
          <p>
            If the site stack, analytics setup, or embedded tools change, this policy may be updated to reflect the
            current use of cookies and related technologies.
          </p>
        </section>
      </LegalPageWrapper>
    </PageV0>
  );
}

export default CookiesPage;

const LegalPageWrapper = styled.article`
  width: min(900px, 92%);
  margin: 0 auto;
  padding: 4rem 0 6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.16em;
    font-size: 0.82rem;
    color: #6b7280;
  }

  h1 {
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    line-height: 0.95;
  }

  .intro,
  section p {
    font-size: 1rem;
    line-height: 1.7;
    color: #374151;
    max-width: 70ch;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  h2 {
    font-size: 1.35rem;
    line-height: 1.2;
  }
`;