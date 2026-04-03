import type { StrengthSessionInput, StrengthMetrics } from "./value-objects";

export function calculateStrengthMetrics(input: StrengthSessionInput): StrengthMetrics {
  let totalVolume = 0;
  for (const exercise of input.exercises) {
    totalVolume += (exercise.loadKg ?? 0) * exercise.reps * exercise.sets;
  }
  return { totalVolume: Number(totalVolume.toFixed(2)) };
}
