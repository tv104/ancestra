import { z } from "zod";
import { BaptismRecordSchema } from "./baptism-schema";

export const BaptismWitnessRecordSchema = BaptismRecordSchema.extend({
  type: z.literal("church_event_witness"),
});

export type BaptismWitnessRecord = z.infer<typeof BaptismWitnessRecordSchema>;