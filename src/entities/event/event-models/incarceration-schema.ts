import { z } from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

const IncarcerationPersonSchema = PersonSchema.extend({
  ageAtEvent: z.number(),
  birthplace: LocationNameSchema,
});

const PhysicalDescriptionSchema = z.object({
  stature: z.string().optional(),
  face: z.string().optional(),
  hair: z.string().optional(),
  eyes: z.string().optional(),
});

const ArchiveReferenceSchema = z.object({
  accessNumber: z.string().optional(),
  inventoryNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
});

const IncarcerationDetailsSchema = z.object({
  crime: z.string(),
  sentence: z.string(),
  institution: z.string(),
  physicalDescription: PhysicalDescriptionSchema.optional(),
  archiveReference: ArchiveReferenceSchema.optional(),
  notes: z.string().optional(),
});

export const IncarcerationRecordSchema = z.object({
  id: z.string(),
  person: IncarcerationPersonSchema,
  date: DateStringSchema,
  location: LocationNameSchema,
  details: IncarcerationDetailsSchema,
});

export type IncarcerationRecord = z.infer<typeof IncarcerationRecordSchema>;
