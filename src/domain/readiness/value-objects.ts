import type { ReadinessStatus } from "@/types";

export type ReadinessInputs = {
  restingHeartRate: number;
  baselineRestingHR: number;
  sleepHours: number;
  fatigueScore: number;
  sorenessScore?: number | null;
};

export type ReadinessResult = {
  score: number;
  status: ReadinessStatus;
};
