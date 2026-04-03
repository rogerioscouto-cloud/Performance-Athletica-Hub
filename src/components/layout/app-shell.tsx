import Link from "next/link";
import { BarChart3, HeartPulse, Dumbbell, Upload, Zap, Activity } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/readiness", label: "Prontidão", icon: HeartPulse },
  { href: "/workouts", label: "Corrida", icon: Activity },
  { href: "/strength", label: "Força", icon: Dumbbell },
  { href: "/import", label: "Importação", icon: Upload },
  { href: "/alerts", label: "Alertas", icon: Zap },
  { href: "/adaptive", label: "Plano adaptativo", icon: Zap }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight">Marathon Tracker V2</p>
            <p className="text-sm text-muted-foreground">Next.js + TypeScript + Supabase</p>
          </div>
          <nav className="flex flex-wrap gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-8">{children}</main>
    </div>
  );
}
