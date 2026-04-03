import { z } from "zod";

export const workoutSchema = z.object({
  date: z.string().min(1),
  distanceKm: z.number().min(0.1),
  durationSec: z.number().min(1),
  avgHeartRate: z.number().nullable().optional()
});

export type WorkoutFormValues = z.infer<typeof workoutSchema>;
