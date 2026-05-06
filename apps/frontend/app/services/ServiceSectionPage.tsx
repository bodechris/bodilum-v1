import Link from "next/link";
import PageV0 from "@/components/ui/page-v0/PageV0";
import styled from "styled-components";

type ServiceSectionPageProps = {
  title: string;
  subtitle?: string;
  description?: string;
  deliverables: string[];
  outcomes?: string[];
};

function ServiceSectionPage(props: ServiceSectionPageProps) {
  const { title, subtitle, description, deliverables, outcomes } = props;

  return (
    <PageV0>
      <ServiceSectionWrapper>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
        {description && <p>{description}</p>}
        {deliverables.length > 0 && (
          <ul>
            {deliverables.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        {outcomes && outcomes.length > 0 && (
          <ul>
            {outcomes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </ServiceSectionWrapper>
    </PageV0>
  );
}

export default ServiceSectionPage;


const ServiceSectionWrapper = styled.section`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 10rem;
  border: 1px solid #f7f7f7;
  padding: 2rem;
  border-radius: 25%;
`;