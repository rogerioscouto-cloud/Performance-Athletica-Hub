import type { ParsedWorkout } from "@/domain/imports/types";

export function validateWorkouts(data: ParsedWorkout[]) {
  const errors: string[] = [];

  data.forEach((row, index) => {
    if (!row.date) errors.push(`Linha ${index + 1}: data inválida`);
    if (!row.distanceKm || row.distanceKm <= 0) errors.push(`Linha ${index + 1}: distância inválida`);
    if (!row.durationSec || row.durationSec <= 0) errors.push(`Linha ${index + 1}: duração inválida`);
  });

  return { valid: errors.length === 0, errors };
}
