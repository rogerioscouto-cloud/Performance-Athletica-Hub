import type { Alert } from "./types";

export function generateAlerts(input: {
  readinessScore: number;
  trainingLoad: number;
  recentLoadAvg: number;
}): Alert[] {
  const alerts: Alert[] = [];

  if (input.readinessScore < 40) {
    alerts.push({
      type: "LOW_READINESS",
      severity: "HIGH",
      message: "Prontidão muito baixa. Recomenda-se descanso ou treino leve."
    });
  }

  const ratio = input.recentLoadAvg > 0 ? input.trainingLoad / input.recentLoadAvg : 1;

  if (ratio > 1.5) {
    alerts.push({
      type: "LOAD_SPIKE",
      severity: "HIGH",
      message: "Aumento abrupto de carga. Risco elevado de lesão."
    });
  } else if (ratio > 1.2) {
    alerts.push({
      type: "MODERATE_LOAD",
      severity: "MEDIUM",
      message: "Carga acima da média recente."
    });
  }

  return alerts;
}
