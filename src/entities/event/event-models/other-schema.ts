import { z } from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

const OtherPersonSchema = PersonSchema.extend({
  partner: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }).optional(),
});

const OtherArchiveSchema = z.object({
  accessNumber: z.string(),
  inventoryNumber: z.string(),
  source: z.string(),
});

export const OtherRecordSchema = z.object({
  id: z.string(),
  date: DateStringSchema,
  location: LocationNameSchema,
  person: OtherPersonSchema,
  organization: z.string().optional(),
  archive: OtherArchiveSchema,
  notes: z.string(),
});

export type OtherRecord = z.infer<typeof OtherRecordSchema>;