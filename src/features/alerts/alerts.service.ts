import { requireUser } from "@/lib/auth/session";
import { generateAlerts } from "@/domain/alerts/alert-engine";
import { generateRecommendations } from "@/domain/alerts/recommendation-engine";
import { AlertsRepository } from "@/data/repositories/alerts.repository";
import { RecommendationsRepository } from "@/data/repositories/recommendations.repository";
import { DashboardRepository } from "@/features/dashboard/dashboard.repository";

type WorkoutSummaryItem = {
  date: string;
  training_load?: number | null;
};

type ReadinessSummaryItem = {
  date: string;
  readiness_score?: number | null;
};

export class AlertsService {
  private alertsRepo = new AlertsRepository();
  private recRepo = new RecommendationsRepository();
  private dashboardRepo = new DashboardRepository();

  async processToday(date: string) {
    const user = await requireUser();

    const workouts = (await this.dashboardRepo.getWorkoutSummary(
      user.id
    )) as WorkoutSummaryItem[];

    const readiness = (await this.dashboardRepo.getReadinessSummary(
      user.id
    )) as ReadinessSummaryItem[];

    const latestReadiness = [...readiness].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

    const todayLoad =
      workouts.find((item) => item.date === date)?.training_load ?? 0;

    const recentAvg =
      workouts.length > 0
        ? workouts.reduce(
            (sum: number, item: WorkoutSummaryItem) =>
              sum + Number(item.training_load ?? 0),
            0
          ) / workouts.length
        : 0;

    const alerts = generateAlerts({
      readinessScore: Number(latestReadiness?.readiness_score ?? 100),
      trainingLoad: Number(todayLoad),
      recentLoadAvg: recentAvg
    });

    const recs = generateRecommendations({
      readinessScore: Number(latestReadiness?.readiness_score ?? 100)
    });

    await this.alertsRepo.insertAlerts(user.id, date, alerts);
    await this.recRepo.insert(user.id, date, recs);

    return { alerts, recs };
  }
}
