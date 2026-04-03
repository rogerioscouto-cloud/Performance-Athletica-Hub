import { DashboardService } from "@/features/dashboard/dashboard.service";
import { DashboardKpis } from "@/features/dashboard/dashboard-kpis";
import { DistanceChart, LoadChart, ReadinessChart } from "@/features/dashboard/dashboard-charts";

export default async function DashboardPage() {
  const service = new DashboardService();
  let data: Awaited<ReturnType<DashboardService["getDashboard"]>> | null = null;

  try {
    data = await service.getDashboard();
  } catch {
    data = { kpis: { totalDistance: "0.0", totalLoad: "0.0", avgEfficiency: "0.000", readinessScore: "--", readinessStatus: "--" }, workouts: [], readiness: [] };
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <DashboardKpis kpis={data.kpis} />
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-2 font-medium">Distância</h2>
          <DistanceChart data={data.workouts} />
        </div>
        <div>
          <h2 className="mb-2 font-medium">Carga</h2>
          <LoadChart data={data.workouts} />
        </div>
        <div className="md:col-span-2">
          <h2 className="mb-2 font-medium">Prontidão</h2>
          <ReadinessChart data={data.readiness} />
        </div>
      </div>
    </div>
  );
}
