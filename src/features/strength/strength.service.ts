import { createStrengthSession } from "@/data/repositories/strength.repository";

type CreateStrengthSessionInput = {
  userId: string;
  date: string;
  durationMinutes: number;
  caloriesBurned?: number | null;
  sessionType?: string;
  notes?: string;
};

export async function createStrengthSessionService(
  input: CreateStrengthSessionInput
) {
  return createStrengthSession({
    user_id: input.userId,
    date: input.date,
    duration_minutes: input.durationMinutes,
    calories_burned: input.caloriesBurned ?? null,
    session_type: input.sessionType ?? null,
    notes: input.notes ?? null,
  });
}
