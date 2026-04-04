import { createWorkout as createWorkoutRepo } from "@/data/repositories/workout.repository";

type CreateWorkoutInput = {
  date: string;
  distanceKm: number;
  durationSec: number;
  avgHr?: number | null;
};

export async function createWorkout(input: CreateWorkoutInput) {
  return createWorkoutRepo({
    date: input.date,
    distance_km: input.distanceKm,
    duration_sec: input.durationSec,
    avg_hr: input.avgHr ?? null,
  });
}
