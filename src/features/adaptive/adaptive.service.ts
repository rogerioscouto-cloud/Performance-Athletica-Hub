import { requireUser } from "@/lib/auth/session";
import { DashboardRepository } from "@/features/dashboard/dashboard.repository";
import { adaptTrainingPlan } from "@/domain/adaptive/adaptive-engine";

type WorkoutSummaryItem = {
  training_load?: number | null;
};

export class AdaptiveService {
  private dashboardRepo = new DashboardRepository();

  async generatePlan() {
    const user = await requireUser();

    const workouts = (await this.dashboardRepo.getWorkoutSummary(
      user.id
    )) as WorkoutSummaryItem[];

    const readiness = await this.dashboardRepo.getReadinessSummary(user.id);

    const latestReadiness = [...readiness].sort(
      (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

    const avgLoad =
      workouts.length > 0
        ? workouts.reduce(
            (sum: number, item: WorkoutSummaryItem) =>
              sum + Number(item.training_load ?? 0),
            0
          ) / workouts.length
        : 1;

    const todayLoad = Number(workouts[0]?.training_load ?? 0);
    const loadRatio = avgLoad > 0 ? todayLoad / avgLoad : 1;

    const basePlan = [
      { date: "D1", plannedDistanceKm: 8, plannedIntensity: "LOW" as const },
      { date: "D2", plannedDistanceKm: 10, plannedIntensity: "MODERATE" as const },
      { date: "D3", plannedDistanceKm: 6, plannedIntensity: "LOW" as const },
      { date: "D4", plannedDistanceKm: 12, plannedIntensity: "HIGH" as const }
    ];

    return adaptTrainingPlan({
      readinessScore: Number(latestReadiness?.readiness_score ?? 100),
      recentLoadRatio: loadRatio,
      plan: basePlan
    });
  }
}
