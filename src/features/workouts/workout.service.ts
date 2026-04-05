import { createWorkout as createWorkoutRepo } from "@/data/repositories/workout.repository";
import { requireUser } from "@/lib/auth/session";

type CreateWorkoutInput = {
  date: string;
  distanceKm: number;
  durationSec: number;
  avgHr?: number | null;
};

export async function createWorkout(input: CreateWorkoutInput) {
  const user = await requireUser();

  return createWorkoutRepo({
    user_id: user.id,
    type: "RUN!",
    date: input.date,
    distance_km: input.distanceKm,
    duration_sec: input.durationSec,
    avg_hr: input.avgHr ?? null,
  });
}
