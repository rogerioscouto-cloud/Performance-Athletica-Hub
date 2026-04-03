import { AdaptivePlan } from "@/features/adaptive/adaptive-plan";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Plano adaptativo</h1>
      <AdaptivePlan />
    </div>
  );
}
