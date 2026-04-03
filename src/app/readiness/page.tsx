import { ReadinessForm } from "@/features/readiness/readiness-form";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Prontidão diária</h1>
      <ReadinessForm />
    </div>
  );
}
