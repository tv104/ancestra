import { z } from "zod";

export const PersonSchema = z.object({
    title: z.string().optional(),
    firstName: z.string(),
    patronym: z.string().optional(),
    prefix: z.string().optional(),
    lastName: z.string(),
});

export const PersonWithFullNameSchema = PersonSchema.extend({
    fullName: z.string(),
});

export type PersonWithFullName = z.infer<typeof PersonWithFullNameSchema>;
export type Person = z.infer<typeof PersonSchema>;
