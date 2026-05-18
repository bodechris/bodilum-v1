"use client";

import { useState } from "react";
import styled from "styled-components";
import useReactForm from "@/hooks/useReactForm";
import { trackMetaEvent } from "@/lib/metaPixelEvents";
import {
  contactFormSchema,
  type ContactFormValues,
} from "./contactFormSchema";

const defaultValues: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  website: "",
  message: "",
};

type SubmitState =
  | { status: "idle"; message: string | null }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function FieldError({ message }: { message?: string }) {   
  if (!message) {
    return null;
  }

  return <ErrorText>{message}</ErrorText>;
}

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: null, 
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useReactForm({
    schema: contactFormSchema,
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState({ status: "idle", message: null });

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    if (!response.ok) {
      setSubmitState({
        status: "error",
        message: payload?.message ?? "We could not send your message. Please try again.",
      });
      return;
    }

    reset(defaultValues);
    trackMetaEvent("Lead", {
      content_name: "Bodilum Contact Form",
      content_category: "Contact",
    });
    trackMetaEvent("Contact", {
      content_name: "Bodilum Contact Form",
      content_category: "Contact",
    });
    setSubmitState({
      status: "success",
      message: payload?.message ?? "Your message has been sent. We will reply shortly.",
    });
  });

  return (
    <FormShell>
      <FormGrid>
        <StyledForm onSubmit={onSubmit} noValidate>
          <HiddenFieldWrapper aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              tabIndex={-1}
              type="text"
              autoComplete="off"
              {...register("website")}
            />
          </HiddenFieldWrapper>

          <TwoColumnFields>
            <FieldLabel>
              First name
              <TextInput
                {...register("firstName")}
                autoComplete="given-name"
                placeholder="Ada"
              />
              <FieldError message={errors.firstName?.message} />
            </FieldLabel>

            <FieldLabel>
              Last name
              <TextInput
                {...register("lastName")}
                autoComplete="family-name"
                placeholder="Lovelace"
              />
              <FieldError message={errors.lastName?.message} />
            </FieldLabel>
          </TwoColumnFields>

          <TwoColumnFields>
            <FieldLabel>
              Email
              <TextInput
                {...register("email")}
                autoComplete="email"
                placeholder="ada@company.com"
                type="email"
              />
              <FieldError message={errors.email?.message} />
            </FieldLabel>

            <FieldLabel>
              Company
              <TextInput
                {...register("company")}
                autoComplete="organization"
                placeholder="Analytical Engines"
              />
              <FieldError message={errors.company?.message} />
            </FieldLabel>
          </TwoColumnFields>

          <FieldLabel>
            Message
            <MessageInput
              {...register("message")}
              placeholder="Describe the project, timeline, or the question you need answered."
            />
            <FieldError message={errors.message?.message} />
          </FieldLabel>

          <ActionsRow>
            <SubmitButton disabled={isSubmitting} type="submit">
              {isSubmitting ? "Sending..." : "Submit your message"}
            </SubmitButton>

            {submitState.message ? (
              <SubmitMessage
                $status={submitState.status}
                role={submitState.status === "error" ? "alert" : "status"}
              >
                {submitState.message}
              </SubmitMessage>
            ) : null}
          </ActionsRow>
        </StyledForm>
      </FormGrid>
    </FormShell>
  );
}

const FormShell = styled.div`
  width: 100%;
  max-width: 80rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  background: #fff;
  border: 0.5px solid #f0f0f0;
  padding: 1.5rem;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.08);

  @media (min-width: 48rem) {
    padding: 2rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 48rem) {
    grid-template-columns: 1fr;
  }
`;

const StyledForm = styled.form`
  display: grid;
  gap: 1rem;
  position: relative;
`;

const HiddenFieldWrapper = styled.div`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const TwoColumnFields = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 40rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FieldLabel = styled.label`
  display: grid;
  gap: 0.5rem;
  color: #000;
  font-size: 0.875rem;
  font-weight: 500;
`;

const inputStyles = `
  min-height: 3rem;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  background: #fff;
  padding: 0.75rem 1rem;
  outline: none;
  transition: border-color 160ms ease;

  &:focus {
    border-color: #000;
  }
`;

const TextInput = styled.input`
  ${inputStyles}
`;

const MessageInput = styled.textarea`
  ${inputStyles}
  min-height: 10rem;
  border-radius: 1.5rem;
  resize: vertical;
`;

const ActionsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.5rem;

  @media (min-width: 40rem) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 9999px;
  background: #fc6d05;
  padding: 0 1.5rem;
  color: #000;
  font-size: 0.875rem;
  font-weight: 600;
  transition: filter 160ms ease, opacity 160ms ease;

  &:hover:not(:disabled) {
    filter: brightness(0.95);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ErrorText = styled.p`
  color: #d44d1c;
  font-size: clamp(0.65rem, 2vw, 0.775rem) !important;
  text-align: left !important;
  padding: 0 !important;
`;

const SubmitMessage = styled.p<{ $status: SubmitState["status"] }>`
  color: ${({ $status }) => ($status === "success" ? "#15803d" : "#d44d1c")};
  font-size: 0.875rem !important;
`;