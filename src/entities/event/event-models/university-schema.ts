import { z } from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

const UniversityPersonSchema = PersonSchema.extend({
  role: z.enum(["Student", "Professor", "Administrator", "Graduate", "Unknown"]),
  partner: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }).optional(),
});

export const UniversityRecordSchema = z.object({
  id: z.string(),
  type: z.literal("university_enrollment"),
  date: DateStringSchema,
  location: LocationNameSchema,
  person: UniversityPersonSchema,
  university: z.string(),
  faculty: z.string().optional(),
  degree: z.string().optional(),
  enrollmentType: z.enum(["Matriculation", "Graduation", "Administrative", "Teaching"]).optional(),
  archive: z.object({
    accessNumber: z.string(),
    inventoryNumber: z.string(),
    source: z.string(),
  }),
  notes: z.string().optional(),
});

export type UniversityRecord = z.infer<typeof UniversityRecordSchema>;
