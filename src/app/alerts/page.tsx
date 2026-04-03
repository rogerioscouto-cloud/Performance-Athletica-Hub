import { AlertsPanel } from "@/features/alerts/alerts-panel";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Alertas & Recomendações</h1>
      <AlertsPanel />
    </div>
  );
}
