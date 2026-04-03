import { AlertsRepository } from "@/data/repositories/alerts.repository";
import { RecommendationsRepository } from "@/data/repositories/recommendations.repository";
import { generateAlerts } from "@/domain/alerts/alert-engine";
import { generateRecommendations } from "@/domain/alerts/recommendation-engine";
import { DashboardRepository } from "@/features/dashboard/dashboard.repository";
import { requireUser } from "@/lib/auth/session";

export class AlertsService {
  private alertsRepo = new AlertsRepository();
  private recommendationsRepo = new RecommendationsRepository();
  private dashboardRepo = new DashboardRepository();

  async processToday(date: string) {
    const user = await requireUser();
    const workouts = await this.dashboardRepo.getWorkoutSummary(user.id);
    const readiness = await this.dashboardRepo.getReadinessSummary(user.id);

    const latestReadiness = [...readiness].sort((a, b) => new Date(String(b.date)).getTime() - new Date(String(a.date)).getTime())[0];
    const latestWorkout = [...workouts].sort((a, b) => new Date(String(b.date)).getTime() - new Date(String(a.date)).getTime())[0];

    const recentAvg =
      workouts.length > 0
        ? workouts.reduce((sum, item) => sum + Number(item.training_load ?? 0), 0) / workouts.length
        : 0;

    const alerts = generateAlerts({
      readinessScore: Number(latestReadiness?.readiness_score ?? 100),
      trainingLoad: Number(latestWorkout?.training_load ?? 0),
      recentLoadAvg: recentAvg
    });

    const recommendations = generateRecommendations({
      readinessScore: Number(latestReadiness?.readiness_score ?? 100)
    });

    await this.alertsRepo.insertAlerts(user.id, date, alerts);
    await this.recommendationsRepo.insert(user.id, date, recommendations);

    return { alerts, recs: recommendations };
  }
}
