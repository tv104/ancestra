import { z } from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

export const CitizenshipRecordSchema = z.object({
  id: z.string(),
  type: z.literal("citizenship"),
  date: DateStringSchema,
  location: LocationNameSchema,
  person: PersonSchema,
  archive: z.object({
    accessNumber: z.string(),
    inventoryNumber: z.string(),
    source: z.string(),
  }),
  notes: z.string(),
});

export type CitizenshipRecord = z.infer<typeof CitizenshipRecordSchema>;