import { z } from "zod";
import { capitalizeFirstLetter } from "./utils";

const zCommonString = (field: string) => {
  return z
    .string()
    .min(3, `${capitalizeFirstLetter(field)} must be at least 3 characters.`);
};

const zOptionalString = (field: string) => {
  return zCommonString(field).optional().or(z.literal(""));
};

const zEmail = z.string().email("Invalid email address.");

function validateDuration({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate?: Date;
}) {
  return !endDate || endDate > startDate;
}

export const personalSchema = z.object({
  name: zCommonString("name"),
  email: zEmail,
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits."),
  address: zOptionalString("address"),
});

export const educationSchema = z
  .object({
    school: zCommonString("school"),
    title: zCommonString("title"),
    startDate: z.date(),
    endDate: z.date().optional(),
    description: zOptionalString("description"),
  })
  .refine((data) => {
    if (data.endDate) {
      return data.endDate > data.startDate;
    } else {
      return true;
    }
  }, "End date must be after start date.");

export const experienceSchema = z
  .object({
    company: zCommonString("company"),
    title: zCommonString("title"),
    startDate: z.date(),
    endDate: z.date().optional(),
    description: zOptionalString("description"),
  })
  .refine(validateDuration, "End date must be after start date.");

export const organizationSchema = z
  .object({
    name: zCommonString("name"),
    position: zCommonString("position"),
    location: zCommonString("location"),
    startDate: z.date(),
    endDate: z.date().optional(),
    description: zOptionalString("description"),
  })
  .refine(validateDuration, "End date must be after start date.");

export const awardSchema = z.object({
  name: zCommonString("name"),
  organization: zCommonString("organization"),
  date: z.date(),
  description: zOptionalString("description"),
});

export const skillSchema = z.object({
  name: zCommonString("name"),
});
