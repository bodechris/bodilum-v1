import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name"),
  lastName: z.string().trim().min(2, "Please enter your last name"),
  email: z.email("Please enter a valid email address"),
  company: z.string().trim().max(120, "Company name is too long").optional().or(z.literal("")),
  website: z.string().trim().max(0, "Invalid submission").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please share at least a few details about your request")
    .max(2000, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;