import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";
import { z } from "zod";

const BaptismPersonSchema = PersonSchema.extend({
  role: z.enum(["Dopeling", "Vader", "Moeder", "Getuige"]),
});

export const BaptismRecordSchema = z.object({
  id: z.string(),
  type: z.literal("baptism"),
  date: DateStringSchema,
  birthDate: DateStringSchema.optional(),
  location: LocationNameSchema,
  church: z.string(),
  people: z.array(BaptismPersonSchema),
  archive: z.object({
    accessNumber: z.string(),
    inventoryNumber: z.string(),
    source: z.string(),
  }),
  notes: z.string().optional(),
  source: z.string().optional(),
});

export type BaptismRecord = z.infer<typeof BaptismRecordSchema>;
