import { DashboardRepository } from "./dashboard.repository";
import { computeKpis } from "./dashboard.selectors";
import { requireUser } from "@/lib/auth/session";

export class DashboardService {
  private repo = new DashboardRepository();

  async getDashboard() {
    const user = await requireUser();
    const workouts = await this.repo.getWorkoutSummary(user.id);
    const readiness = await this.repo.getReadinessSummary(user.id);
    const kpis = computeKpis(workouts as any, readiness as any);

    return { kpis, workouts, readiness };
  }
}
