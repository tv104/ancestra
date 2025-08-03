import { z } from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

export const ChurchMembershipRecordSchema = z.object({
  id: z.string(),
  date: DateStringSchema,
  location: LocationNameSchema,
  person: PersonSchema,
  partner: PersonSchema.optional(),
  organization: z.string(),
  archive: z.object({
    accessNumber: z.string(),
    inventoryNumber: z.string(),
    source: z.string(),
  }),
  notes: z.string().optional(),
});

export type ChurchMembershipRecord = z.infer<typeof ChurchMembershipRecordSchema>;
