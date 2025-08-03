import { z } from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

const MilitaryPersonSchema = PersonSchema.extend({
  role: z.enum(["Soldier", "Officer", "Militia", "Guard", "Veteran", "Sniper"]),
  partner: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }).optional(),
});

const MilitaryServiceSchema = z.object({
  rank: z.string(),
  unit: z.string().optional(),
  enlistmentDate: DateStringSchema,
  serviceLocation: LocationNameSchema,
  campaigns: z.array(z.string()).optional(),
});

const MilitaryDischargeSchema = z.object({
  date: DateStringSchema,
  location: LocationNameSchema,
  reason: z.string(),
  reasonDescription: z.string().optional(),
});

const MilitaryArchiveSchema = z.object({
  accessNumber: z.string(),
  inventoryNumber: z.string(),
  source: z.string(),
  regiment: z.string().optional(),
  company: z.string().optional(),
});

export const MilitaryRecordSchema = z.object({
  id: z.string(),
  type: z.literal("military_service"),
  date: DateStringSchema,
  location: LocationNameSchema,
  person: MilitaryPersonSchema,
  service: MilitaryServiceSchema.optional(),
  discharge: MilitaryDischargeSchema.optional(),
  organization: z.string(),
  archive: MilitaryArchiveSchema,
  notes: z.string().optional(),
});

export type MilitaryRecord = z.infer<typeof MilitaryRecordSchema>;
