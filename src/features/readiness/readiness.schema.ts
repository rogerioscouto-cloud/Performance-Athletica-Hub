import { z } from "zod";

export const readinessFormSchema = z.object({
  date: z.string().min(1),
  restingHeartRate: z.number().min(30).max(120),
  sleepHours: z.number().min(0).max(12),
  fatigueScore: z.number().min(1).max(10),
  sorenessScore: z.number().min(1).max(10).optional()
});

export type ReadinessFormValues = z.infer<typeof readinessFormSchema>;
