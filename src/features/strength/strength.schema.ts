import { z } from "zod";

export const strengthSchema = z.object({
  date: z.string().min(1, "Informe a data."),
  durationMinutes: z.coerce
    .number({
      invalid_type_error: "Informe a duração da sessão.",
    })
    .int("A duração deve ser um número inteiro.")
    .positive("A duração deve ser maior que zero."),

  caloriesBurned: z
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
      (value) =>
        value === undefined || (Number.isFinite(value) && value >= 0),
      {
        message: "Calorias deve ser um número válido.",
      }
    )
    .optional(),

  sessionType: z.string().optional(),
  notes: z.string().optional(),
});

export type StrengthInput = z.infer<typeof strengthSchema>;
export type StrengthFormValues = z.infer<typeof strengthSchema>;
