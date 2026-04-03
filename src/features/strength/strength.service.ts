import { calculateStrengthMetrics } from "@/domain/strength/calculate-strength";
import { StrengthRepository } from "@/data/repositories/strength.repository";
import { requireUser } from "@/lib/auth/session";

export class StrengthService {
  private repo = new StrengthRepository();

  async createSession(input: { date: string; exercises: Array<{ name: string; sets: number; reps: number; loadKg?: number | null }> }) {
    const user = await requireUser();
    const metrics = calculateStrengthMetrics(input);
    const session = await this.repo.createSession({
      userId: user.id,
      date: input.date,
      totalVolume: metrics.totalVolume
    });
    await this.repo.insertExercises(session.id, input.exercises);
    return metrics;
  }

  async list() {
    const user = await requireUser();
    return this.repo.list(user.id);
  }
}
