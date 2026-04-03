import { adaptTrainingPlan } from "@/domain/adaptive/adaptive-engine";
import { DashboardRepository } from "@/features/dashboard/dashboard.repository";
import { requireUser } from "@/lib/auth/session";

export class AdaptiveService {
  private dashboardRepo = new DashboardRepository();

  async generatePlan() {
    const user = await requireUser();
    const workouts = await this.dashboardRepo.getWorkoutSummary(user.id);
    const readiness = await this.dashboardRepo.getReadinessSummary(user.id);

    const latestReadiness = [...readiness].sort((a, b) => new Date(String(b.date)).getTime() - new Date(String(a.date)).getTime())[0];
    const latestLoad = Number(workouts.at(-1)?.training_load ?? 0);
    const avgLoad =
      workouts.length > 0
        ? workouts.reduce((sum, item) => sum + Number(item.training_load ?? 0), 0) / workouts.length
        : 1;

    const basePlan = [
      { date: "D1", plannedDistanceKm: 8, plannedIntensity: "LOW" as const },
      { date: "D2", plannedDistanceKm: 10, plannedIntensity: "MODERATE" as const },
      { date: "D3", plannedDistanceKm: 6, plannedIntensity: "LOW" as const },
      { date: "D4", plannedDistanceKm: 12, plannedIntensity: "HIGH" as const }
    ];

    return adaptTrainingPlan({
      readinessScore: Number(latestReadiness?.readiness_score ?? 100),
      recentLoadRatio: avgLoad > 0 ? latestLoad / avgLoad : 1,
      plan: basePlan
    });
  }
}
