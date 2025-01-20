import {
  awardSchema,
  educationSchema,
  experienceSchema,
  organizationSchema,
  personalSchema,
  skillSchema,
} from "@/lib/schemas";
import { z } from "zod";

export type Personal = z.infer<typeof personalSchema>;
export type Education = z.infer<typeof educationSchema> & { id: string };
export type Experience = z.infer<typeof experienceSchema> & { id: string };
export type Organization = z.infer<typeof organizationSchema> & { id: string };
export type Award = z.infer<typeof awardSchema> & { id: string };
export type Skill = z.infer<typeof skillSchema> & { id: string };

export interface Resume {
  personal: Personal;
  educations: Education[];
  experiences: Experience[];
  organizations: Organization[];
  awards: Award[];
  skills: Skill[];
}
