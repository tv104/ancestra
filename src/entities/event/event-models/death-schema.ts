import { z } from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

const RelatedPersonSchema = PersonSchema.extend({
  relationship: z.string().optional(),
});

const ArchiveInfoSchema = z.object({
  accessNumber: z.string(),
  inventoryNumber: z.string(),
  source: z.string(),
});

export const DeathRecordSchema = z.object({
  id: z.string(),
  person: PersonSchema,
  burialDate: DateStringSchema,
  deathDate: DateStringSchema.optional(),
  burialPlace: LocationNameSchema,
  cemetery: z.string().optional(),
  address: z.string().optional(),
  relatedPerson: RelatedPersonSchema.optional(),
  archiveInfo: ArchiveInfoSchema.optional(),
  notes: z.string().optional(),
});

export type DeathRecord = z.infer<typeof DeathRecordSchema>;