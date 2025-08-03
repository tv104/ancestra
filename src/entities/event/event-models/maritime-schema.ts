import { z } from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

const MaritimePersonSchema = PersonSchema.extend({
  origin: LocationNameSchema,
});

const TransferDetailsSchema = z.object({
  transferred: z.boolean().optional(),
  transferShipName: z.string().optional(),
  chamber: z.string().optional(),
});

const ServiceInfoSchema = z.object({
  destination: z.array(LocationNameSchema),
  type: z.string(),
  enlistmentDate: DateStringSchema,
  function: z.enum(["Opperstuurman", "Matroos", "Soldaat", "Jongen", "Hooploper", "Zwaardveger"]),
  functionDescription: z.string(),
  shipName: z.string(),
  transferDetails: TransferDetailsSchema.optional(),
  administrativeLocation: LocationNameSchema,
  departureLocation: z.union([LocationNameSchema, z.string()]),
});

const DischargeInfoSchema = z.object({
  date: DateStringSchema,
  location: LocationNameSchema,
  reason: z.string(),
  reasonDescription: z.string(),
});

const FinancialInfoSchema = z.object({
  debtLetter: z.boolean(),
  monthlyLetter: z.boolean(),
});

const ArchiveInfoSchema = z.object({
  scan: z.string(),
  reference: z.string(),
});

export const MaritimeRecordSchema = z.object({
  id: z.string(),
  person: MaritimePersonSchema,
  service: ServiceInfoSchema,
  discharge: DischargeInfoSchema.optional(),
  financial: FinancialInfoSchema,
  archives: ArchiveInfoSchema,
  narrative: z.string(),
});

export type MaritimeRecord = z.infer<typeof MaritimeRecordSchema>;
  