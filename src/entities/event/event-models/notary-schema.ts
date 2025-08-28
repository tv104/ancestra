import { z } from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

const NotaryRecordPersonSchema = PersonSchema.extend({
  partner: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }).optional(),
});

export const NotaryRecordSchema = z.object({
  id: z.string(),
  notaryType: z.enum([
    "Notariële akte",
    "Kadastraal eigenaar", 
    "Stakeholder",
    "Functionaris",
    "Property registration",
    "Litigation",
    "Testament",
    "Witness Testimony",
  ]),
  date: DateStringSchema,
  location: LocationNameSchema,
  person: NotaryRecordPersonSchema,
  organization: z.string().optional(),
  archive: z.object({
    accessNumber: z.string(),
    inventoryNumber: z.string(),
    source: z.string(),
  }),
  notes: z.string(),
});

export type NotaryRecord = z.infer<typeof NotaryRecordSchema>;