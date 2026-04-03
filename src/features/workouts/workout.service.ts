import { calculateRunningMetrics } from "@/domain/workouts/calculate-metrics";
import { WorkoutRepository } from "@/data/repositories/workout.repository";
import { requireUser } from "@/lib/auth/session";

export class WorkoutService {
  private repo = new WorkoutRepository();

  async createRun(input: {
    date: string;
    distanceKm: number;
    durationSec: number;
    avgHeartRate?: number | null;
  }) {
    const user = await requireUser();
    const metrics = calculateRunningMetrics(input);

    await this.repo.create({
      userId: user.id,
      date: input.date,
      distanceKm: input.distanceKm,
      durationSec: input.durationSec,
      avgPace: metrics.paceSecPerKm,
      avgHr: input.avgHeartRate,
      trainingLoad: metrics.trainingLoad,
      efficiency: metrics.efficiency
    });

    return metrics;
  }

  async list() {
    const user = await requireUser();
    return this.repo.list(user.id);
  }
}
