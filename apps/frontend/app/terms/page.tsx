import PageV0 from '@/components/ui/page-v0/PageV0';
import styled from 'styled-components';

function TermsPage() {
  return (
    <PageV0>
      <LegalPageWrapper>
        <header>
          <p className="eyebrow">Terms</p>
          <h1>Terms of use</h1>
          <p className="intro">
            These terms describe the general rules for using Bodilum.com and the basis on which Bodilum provides
            strategy, design, development, and AI implementation services.
          </p>
        </header>

        <section>
          <h2>Website use</h2>
          <p>
            You may browse and use this website for lawful purposes only. Content on the site is provided for
            general information about Bodilum services, capabilities, and current offers.
          </p>
        </section>

        <section>
          <h2>Project engagements</h2>
          <p>
            Paid project work, retainers, subscriptions, sprints, and implementation engagements are governed by
            separate proposals, scopes, invoices, and written agreements shared during the engagement process.
          </p>
        </section>

        <section>
          <h2>Payment and delivery</h2>
          <p>
            Delivery timelines, payment schedules, revision rounds, and launch support are defined per engagement.
            Bodilum is not responsible for delays caused by missing client feedback, approvals, assets, or third-party platform issues.
          </p>
        </section>

        <section>
          <h2>Intellectual property</h2>
          <p>
            Unless a written agreement says otherwise, Bodilum retains ownership of its methods, frameworks,
            templates, prompt systems, and pre-existing materials. Client deliverables are assigned or licensed according to the approved scope.
          </p>
        </section>

        <section>
          <h2>Liability and updates</h2>
          <p>
            Bodilum may update these terms when the website, service structure, or legal requirements change.
            Continued use of the site means you accept the current version. To the maximum extent permitted by law,
            Bodilum is not liable for indirect or consequential losses arising from use of the site or delayed service access.
          </p>
        </section>
      </LegalPageWrapper>
    </PageV0>
  );
}

export default TermsPage;

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