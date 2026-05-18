import { z } from "zod";

const optionalPhoneNumberSchema = z
  .string()
  .trim()
  .max(32, "Phone number is too long")
  .refine((value) => value.length === 0 || value.length >= 7, {
    message: "Please enter a valid phone number",
  });

const optionalCompanyAddressSchema = z
  .string()
  .trim()
  .max(240, "Company address is too long")
  .refine((value) => value.length === 0 || value.length >= 6, {
    message: "Please enter a valid company address",
  });

export const designRequestCheckoutSchema = z.object({
  firstName: z.string().trim().min(2, "Please enter your first name"),
  lastName: z.string().trim().min(2, "Please enter your last name"),
  workEmail: z.email("Please enter a valid work email address"),
  phoneNumber: optionalPhoneNumberSchema,
  companyAddress: optionalCompanyAddressSchema,
  additionalNotes: z.string().trim().max(2000, "Your note is too long").optional().or(z.literal("")),
});

export type DesignRequestCheckoutValues = z.infer<typeof designRequestCheckoutSchema>;