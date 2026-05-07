import PageV0 from '@/components/ui/page-v0/PageV0';
import styled from 'styled-components';

function PrivacyPage() {
  return (
    <PageV0>
      <LegalPageWrapper>
        <header>
          <p className="eyebrow">Privacy</p>
          <h1>Privacy policy</h1>
          <p className="intro">
            This policy explains how Bodilum handles personal information shared through Bodilum.com,
            enquiry forms, newsletter signups, and project delivery conversations.
          </p>
        </header>

        <section>
          <h2>Information we collect</h2>
          <p>
            Bodilum may collect your name, email address, company name, project details, billing or proposal
            information, and any other details you choose to send when requesting services or updates.
          </p>
        </section>

        <section>
          <h2>How Bodilum uses that information</h2>
          <p>
            This information is used to reply to enquiries, prepare proposals, deliver agreed services, improve
            the website, manage client communication, and send Bodilum updates only when you have requested them.
          </p>
        </section>

        <section>
          <h2>Sharing and service providers</h2>
          <p>
            Bodilum does not sell personal information. Data may be processed through trusted providers used for
            hosting, analytics, communications, invoicing, or project operations when that is necessary to run the business.
          </p>
        </section>

        <section>
          <h2>Retention and protection</h2>
          <p>
            Access to submitted information is limited to what is needed for active business use. Bodilum keeps
            information only for as long as it remains relevant for communication, legal, tax, security, or service-delivery purposes.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>
            You can request access, correction, deletion, or removal from marketing updates by contacting Bodilum
            through the site. Where the law applies, Bodilum will handle those requests within a reasonable timeframe.
          </p>
        </section>
      </LegalPageWrapper>
    </PageV0>
  );
}

export default PrivacyPage;

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