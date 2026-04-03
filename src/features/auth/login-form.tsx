"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthService } from "./auth.service";
import { loginSchema, type LoginInput } from "./auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const service = new AuthService();

  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    try {
      setError(null);
      await service.login(data.email, data.password);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no login.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md space-y-4 rounded-3xl border border-border bg-card p-6">
      <Input placeholder="Email" {...form.register("email")} />
      <Input type="password" placeholder="Senha" {...form.register("password")} />
      <Button type="submit">Entrar</Button>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </form>
  );
}
