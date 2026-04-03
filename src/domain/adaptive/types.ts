import type { TrainingIntensity } from "@/types";

export type TrainingDay = {
  date: string;
  plannedDistanceKm: number;
  plannedIntensity: TrainingIntensity;
};

export type AdaptationInput = {
  readinessScore: number;
  recentLoadRatio: number;
  plan: TrainingDay[];
};

export type AdaptedDay = TrainingDay & {
  adjustedDistanceKm: number;
  adjustedIntensity: TrainingIntensity;
  reason: string;
};
