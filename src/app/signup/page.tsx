import { SignupForm } from "@/features/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Cadastro</h1>
      <SignupForm />
    </div>
  );
}
