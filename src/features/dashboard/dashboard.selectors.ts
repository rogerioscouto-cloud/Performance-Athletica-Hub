export function computeKpis(
  workouts: Array<{ distance_km?: number; training_load?: number; efficiency?: number }>,
  readiness: Array<{ date: string; readiness_score?: number; status?: string }>
) {
  const totalDistance = workouts.reduce((sum, item) => sum + (item.distance_km ?? 0), 0);
  const totalLoad = workouts.reduce((sum, item) => sum + (item.training_load ?? 0), 0);
  const avgEfficiency =
    workouts.length > 0
      ? workouts.reduce((sum, item) => sum + (item.efficiency ?? 0), 0) / workouts.length
      : 0;

  const latestReadiness = [...readiness].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return {
    totalDistance: totalDistance.toFixed(1),
    totalLoad: totalLoad.toFixed(1),
    avgEfficiency: avgEfficiency.toFixed(3),
    readinessScore: latestReadiness?.readiness_score ?? "--",
    readinessStatus: latestReadiness?.status ?? "--"
  };
}
