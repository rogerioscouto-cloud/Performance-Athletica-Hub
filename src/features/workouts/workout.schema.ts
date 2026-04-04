import { z } from "zod";

export const workoutSchema = z.object({
  date: z.string().min(1, "Informe a data."),
  distanceKm: z.coerce
    .number({
      invalid_type_error: "Informe uma distância válida.",
    })
    .positive("A distância deve ser maior que zero."),

  duration: z
    .string()
    .min(1, "Informe a duração.")
    .regex(/^(\d{2}):([0-5]\d):([0-5]\d)$/, "Use o formato HH:MM:SS."),

  avgHr: z
    .union([z.string(), z.number(), z.undefined(), z.null()])
    .transform((value) => {
      if (value === undefined || value === null || value === "") {
        return undefined;
      }

      const parsed = Number(value);

      if (!Number.isFinite(parsed)) {
        return NaN;
      }

      return parsed;
    })
    .refine(
      (value) => value === undefined || (Number.isFinite(value) && value > 0),
      {
        message: "A FC média deve ser um número válido.",
      }
    )
    .optional(),
});

export type WorkoutInput = z.infer<typeof workoutSchema>;
