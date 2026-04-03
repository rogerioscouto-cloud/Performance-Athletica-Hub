import { calculateReadiness } from "@/domain/readiness/calculate-readiness";
import { ReadinessRepository } from "@/data/repositories/readiness.repository";
import { getCurrentAthleteProfile } from "@/lib/auth/profile";
import { requireUser } from "@/lib/auth/session";

export class ReadinessService {
  private repo = new ReadinessRepository();

  async createDailyReadiness(input: {
    date: string;
    restingHeartRate: number;
    sleepHours: number;
    fatigueScore: number;
    sorenessScore?: number | null;
  }) {
    const user = await requireUser();
    const profile = await getCurrentAthleteProfile();

    const baseline = profile?.resting_hr ?? 56;

    const result = calculateReadiness({
      restingHeartRate: input.restingHeartRate,
      baselineRestingHR: baseline,
      sleepHours: input.sleepHours,
      fatigueScore: input.fatigueScore,
      sorenessScore: input.sorenessScore
    });

    await this.repo.create({
      userId: user.id,
      date: input.date,
      restingHr: input.restingHeartRate,
      sleepHours: input.sleepHours,
      fatigueScore: input.fatigueScore,
      sorenessScore: input.sorenessScore,
      readinessScore: result.score,
      status: result.status
    });

    return result;
  }

  async list() {
    const user = await requireUser();
    return this.repo.list(user.id);
  }
}
