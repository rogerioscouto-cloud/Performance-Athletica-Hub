import { z } from "zod";

export const exerciseSchema = z.object({
  name: z.string().min(1),
  sets: z.number().min(1),
  reps: z.number().min(1),
  loadKg: z.number().optional()
});

export const strengthSchema = z.object({
  date: z.string().min(1),
  exercises: z.array(exerciseSchema).min(1)
});

export type StrengthFormValues = z.infer<typeof strengthSchema>;
