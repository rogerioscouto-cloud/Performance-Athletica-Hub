import { StrengthForm } from "@/features/strength/strength-form";
import { StrengthList } from "@/features/strength/strength-list";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Treino de força</h1>
      <StrengthForm />
      <StrengthList />
    </div>
  );
}
