import { z } from "zod";

export const workoutSchema = z.object({
  date: z.string().min(1, "Informe a data."),
  distanceKm: z.coerce.number().positive("Informe uma distância válida."),
  duration: z
    .string()
    .regex(/^(\d{2}):([0-5]\d):([0-5]\d)$/, "Use o formato HH:MM:SS."),
  avgHr: z.coerce.number().int().positive().optional(),
});
