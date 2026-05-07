import { z } from "zod";

export const serviceRequestFormSchema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name"),
  lastName: z.string().trim().min(2, "Please enter your last name"),
  workEmail: z.email("Please enter a valid work email address"),
  phoneNumber: z.string().trim().min(7, "Please enter a valid phone number").max(32, "Phone number is too long"),
  companyName: z.string().trim().min(2, "Please enter your company name").max(120, "Company name is too long"),
  companyAddress: z.string().trim().min(6, "Please enter your company address").max(240, "Company address is too long"),
  notes: z.string().trim().max(2000, "Your note is too long").optional().or(z.literal("")),
  website: z.string().trim().max(0, "Invalid submission").optional().or(z.literal("")),
  serviceTitle: z.string().trim().min(2, "Invalid service title"),
  serviceLink: z.string().trim().min(1, "Invalid service link"),
  servicePrice: z.string().trim().max(80, "Invalid service price").optional().or(z.literal("")),
  serviceSummary: z.string().trim().max(500, "Service summary is too long").optional().or(z.literal("")),
  serviceTimeline: z.string().trim().max(120, "Timeline is too long").optional().or(z.literal("")),
  paymentTerms: z.string().trim().max(200, "Payment terms are too long").optional().or(z.literal("")),
});

export type ServiceRequestFormValues = z.infer<typeof serviceRequestFormSchema>;