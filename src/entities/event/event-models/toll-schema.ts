import { z } from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

const MerchantPersonSchema = PersonSchema.extend({
  role: z.string(),
  residence: z.string().optional(),
  notes: z.string().optional(),
  standardizedFirstName: z.string().optional(),
  standardizedLastName: z.string().optional(),
});

const ShipInfoSchema = z.object({
  name: z.string().optional(),
  isUnknown: z.boolean(),
});

const DateInfoSchema = z.object({
  original: z.string(),
  startDate: DateStringSchema,
  endDate: DateStringSchema.optional(),
});

const ProductRecordSchema = z.object({
  product: z.string(),
  modernName: z.string(),
  quantity: z.object({
    amount: z.number(),
    unit: z.string(),
  }),
  fees: z.object({
    heffing2: z.number().optional(),
    heffing3: z.number().optional(),
    totalFee: z.number(),
    currency: z.string(),
  }),
});

const RecordMetadataSchema = z.object({
  source: z.object({
    file: z.string(),
    merchant: z.string(),
  }),
  accounting: z.object({
    rekening: z.string(),
    year: z.string(),
  }),
  isPartOf: z.string().optional(),
});

export const TollRecordSchema = z.object({
  id: z.string(),
  referenceNumber: z.string(),
  merchant: MerchantPersonSchema,
  ship: ShipInfoSchema,
  date: DateInfoSchema,
  location: LocationNameSchema,
  products: z.array(ProductRecordSchema),
  metadata: RecordMetadataSchema,
});

export type TollRecord = z.infer<typeof TollRecordSchema>;