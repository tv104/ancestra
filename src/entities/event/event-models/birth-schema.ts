import z from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

export const BirthRecordSchema = z.object({
  id: z.string(),
  person: PersonSchema,
  date: DateStringSchema,
  location: LocationNameSchema,
  metadata: z.object({
    source: z.string(),
    notes: z.string().optional(),
  }),
});

export type BirthRecord = z.infer<typeof BirthRecordSchema>;
