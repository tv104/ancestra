import { z } from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

const MarriagePersonSchema = PersonSchema.extend({
  role: z.enum(["Bruidegom", "Bruid"]),
});

const OtherPersonSchema = PersonSchema.extend({
  relation: z.enum([
    "mother",
    "father", 
    "brother",
    "sister",
    "bride",
    "groom",
    "other"
  ]),
});

export const MarriageRecordSchema = z.object({
  id: z.string(),
  type: z.literal("witness_event").optional(),
  date: DateStringSchema,
  location: LocationNameSchema,
  person: MarriagePersonSchema,
  notes: z.string().optional(),
  otherPeople: z.array(OtherPersonSchema).optional(),
});

export type MarriageRecord = z.infer<typeof MarriageRecordSchema>;