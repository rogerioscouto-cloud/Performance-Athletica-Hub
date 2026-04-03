export type RunningWorkoutInput = {
  distanceKm: number;
  durationSec: number;
  avgHeartRate?: number | null;
};

export type RunningWorkoutMetrics = {
  paceSecPerKm: number;
  trainingLoad: number;
  efficiency: number;
};
