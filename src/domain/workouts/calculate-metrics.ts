import type { RunningWorkoutInput, RunningWorkoutMetrics } from "./value-objects";

export function calculateRunningMetrics(input: RunningWorkoutInput): RunningWorkoutMetrics {
  const pace = input.durationSec / input.distanceKm;
  const load = (input.durationSec * (input.avgHeartRate ?? 130)) / 1000;
  const speed = input.distanceKm / (input.durationSec / 3600);
  const efficiency = input.avgHeartRate ? speed / input.avgHeartRate : 0;

  return {
    paceSecPerKm: Math.round(pace),
    trainingLoad: Number(load.toFixed(2)),
    efficiency: Number(efficiency.toFixed(4))
  };
}
