export function DashboardKpis({ kpis }: { kpis: Record<string, string | number> }) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Kpi label="Volume" value={`${kpis.totalDistance} km`} />
      <Kpi label="Carga" value={String(kpis.totalLoad)} />
      <Kpi label="Eficiência" value={String(kpis.avgEfficiency)} />
      <Kpi label="Readiness" value={String(kpis.readinessScore)} />
      <Kpi label="Status" value={String(kpis.readinessStatus)} />
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
