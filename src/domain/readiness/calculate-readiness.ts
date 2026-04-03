import type { ReadinessInputs, ReadinessResult } from "./value-objects";

export function calculateReadiness(input: ReadinessInputs): ReadinessResult {
  const hrDeviation = input.restingHeartRate - input.baselineRestingHR;
  const hrPenalty = Math.max(0, hrDeviation * 2);
  const sleepScore = Math.min(100, (input.sleepHours / 7.5) * 100);
  const fatiguePenalty = input.fatigueScore * 5;
  const sorenessPenalty = (input.sorenessScore ?? 0) * 3;

  let score = 100 - hrPenalty - fatiguePenalty - sorenessPenalty + (sleepScore - 100) * 0.5;
  score = Math.max(0, Math.min(100, score));

  let status: ReadinessResult["status"] = "GREEN";
  if (score < 40) status = "RED";
  else if (score < 70) status = "YELLOW";

  return { score: Math.round(score), status };
}
