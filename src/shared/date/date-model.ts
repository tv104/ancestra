import { z } from "zod";

export const DateStringSchema = z.custom<`${number}-${string}-${string}`>((val) => {
    return typeof val === "string" ? /^\d{4}-\d{2}-\d{2}$/.test(val) : false;
});

export type DateString = z.infer<typeof DateStringSchema>;


