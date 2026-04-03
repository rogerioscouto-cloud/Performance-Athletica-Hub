import { Activity, BarChart3, Dumbbell, HeartPulse, Upload, Zap } from "lucide-react";
import { FeatureCard } from "@/components/ui/feature-card";
import { OverviewMetricCard } from "@/components/ui/overview-metric-card";

const features = [
  {
    title: "Prontidão diária",
    description: "Score diário com semáforo GREEN/YELLOW/RED baseado em FC, sono e fadiga.",
    icon: HeartPulse
  },
  {
    title: "Logs de corrida",
    description: "Registro com pace, carga, eficiência e integração com dashboard.",
    icon: Activity
  },
  {
    title: "Treino de força",
    description: "Sessões dinâmicas com volume total calculado automaticamente.",
    icon: Dumbbell
  },
  {
    title: "Dashboard",
    description: "KPIs, séries temporais e visão consolidada da preparação.",
    icon: BarChart3
  },
  {
    title: "Importação XLSX",
    description: "Preview, validação e commit seguro no banco.",
    icon: Upload
  },
  {
    title: "Plano adaptativo",
    description: "Ajuste de intensidade e volume com base em prontidão e carga recente.",
    icon: Zap
  }
] as const;

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            V2 • Produção
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Plataforma científica de acompanhamento para corrida e maratona.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Base pronta para equipe de TI evoluir com Next.js App Router, TypeScript forte, Supabase e arquitetura por camadas.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <OverviewMetricCard label="Volume semanal" value="-- km" helper="Aguardando ingestão de treinos" />
            <OverviewMetricCard label="Carga total" value="--" helper="Calculada automaticamente" />
            <OverviewMetricCard label="Aderência" value="-- %" helper="Planejado x realizado" />
            <OverviewMetricCard label="Prontidão hoje" value="--" helper="Sem check-in diário" />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-soft">
          <p className="text-sm font-medium text-primary">Estado atual</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Projeto inicializado com arquitetura por camadas.</h2>
          <div className="mt-6 space-y-3 text-sm">
            <p>• App Router</p>
            <p>• Tailwind + componentes reutilizáveis</p>
            <p>• Supabase SSR</p>
            <p>• Auth + RLS</p>
            <p>• Dashboard, alertas e plano adaptativo</p>
            <p>• Testes unitários e E2E</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </section>
    </div>
  );
}
