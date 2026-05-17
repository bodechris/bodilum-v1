import { z } from "zod";

const SUPPORT_TYPE_VALUES = [
  "design-only",
  "web-support",
  "motion",
  "ai-workflows",
  "all",
] as const;

const BUDGET_VALUES = [
  "$2,500-$5,000/month",
  "$5,000-$10,000/month",
  "$10,000+/month",
] as const;

const URGENCY_VALUES = ["Immediately", "Within 30 days", "Exploring"] as const;

export const monthlySupportRequestFormSchema = z.object({
  businessName: z.string().trim().min(2, "Please enter your business name"),
  websiteOrSocialLink: z.string().trim().min(5, "Please enter your website or social link"),
  industry: z.string().trim().min(2, "Please enter your industry"),
  monthlyDesignNeeds: z.string().trim().min(12, "Please describe your monthly design needs"),
  brandCount: z.string().trim().min(1, "Please enter the number of brands or accounts"),
  supportTypes: z.array(z.enum(SUPPORT_TYPE_VALUES)).min(1, "Select at least one support type"),
  expectedRequestsPerMonth: z.string().trim().min(1, "Please enter your expected monthly request volume"),
  budgetRange: z.enum(BUDGET_VALUES, { message: "Please select a budget range" }),
  urgency: z.enum(URGENCY_VALUES, { message: "Please select an urgency" }),
  email: z.email("Please enter a valid email address"),
  whatsapp: z.string().trim().min(7, "Please enter a valid WhatsApp number").max(32, "WhatsApp number is too long"),
  website: z.string().trim().max(0, "Invalid submission").optional().or(z.literal("")),
});

export type MonthlySupportRequestFormValues = z.infer<typeof monthlySupportRequestFormSchema>;