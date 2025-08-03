import { z } from "zod";
import { LocationNameSchema } from "../../location/location-model";
import { PersonSchema } from "../../person/person-model";
import { DateStringSchema } from "@/shared";

const MedicalPersonSchema = PersonSchema.extend({
  role: z.enum(["Patient", "Doctor", "Nurse", "Administrator", "Visitor"]),
  partner: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }).optional(),
});

const MedicalAdmissionSchema = z.object({
  admissionDate: DateStringSchema,
  dischargeDate: DateStringSchema.optional(),
  dischargeReason: z.string().optional(),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
  outcome: z.enum(["Recovered", "Discharged", "Deceased", "Transferred", "Unknown"]).optional(),
});

const MedicalArchiveSchema = z.object({
  accessNumber: z.string(),
  inventoryNumber: z.string(),
  source: z.string(),
  register: z.string().optional(),
  folio: z.string().optional(),
});

export const MedicalRecordSchema = z.object({
  id: z.string(),
  type: z.literal("historical_mention"),
  date: DateStringSchema,
  location: LocationNameSchema,
  person: MedicalPersonSchema,
  institution: z.string(),
  admission: MedicalAdmissionSchema.optional(),
  archive: MedicalArchiveSchema,
  notes: z.string().optional(),
});

export type MedicalRecord = z.infer<typeof MedicalRecordSchema>;