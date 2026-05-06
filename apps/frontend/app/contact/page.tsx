import PageV0 from "@/components/ui/page-v0/PageV0";
import ContactForm from "./ContactForm";
import styled from "styled-components";

function ContactPage() {
  return (
    <PageV0>
      <ContactPageWrapper>
        <h1>Start the conversation.</h1>
        <p>For enquiries, questions, or partnership requests, please fill out the form below.</p>
        <ContactForm />
      </ContactPageWrapper>
    </PageV0>
  );
}

export default ContactPage;

const ContactPageWrapper = styled.div`
  width: min(1200px, 90%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 4rem 0 4rem 0 !important;
  position: relative;

  h1 {
    text-align: center;
    font-size: clamp(3.0rem, 10vw, 7.5rem);
    line-height: 0.9;
    font-weight: bolder;
  }
  p {
    width: min(500px, 90%);
    font-size: clamp(12px, 2.5vw, 20px);
    font-weight: bolder;
    text-align: center;
    line-height: 1.2;
  }
`;