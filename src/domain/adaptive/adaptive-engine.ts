import type { AdaptationInput, AdaptedDay } from "./types";

export function adaptTrainingPlan(input: AdaptationInput): AdaptedDay[] {
  return input.plan.map((day) => {
    let adjustedDistanceKm = day.plannedDistanceKm;
    let adjustedIntensity = day.plannedIntensity;
    let reason = "Plano mantido";

    if (input.readinessScore < 40) {
      adjustedDistanceKm = day.plannedDistanceKm * 0.5;
      adjustedIntensity = "LOW";
      reason = "Baixa prontidão";
    } else if (input.recentLoadRatio > 1.5) {
      adjustedDistanceKm = day.plannedDistanceKm * 0.7;
      adjustedIntensity = "LOW";
      reason = "Carga elevada recente";
    } else if (input.readinessScore > 80 && day.plannedIntensity === "HIGH") {
      adjustedDistanceKm = day.plannedDistanceKm * 1.05;
      adjustedIntensity = "HIGH";
      reason = "Alta prontidão - estímulo otimizado";
    }

    return {
      ...day,
      adjustedDistanceKm: Number(adjustedDistanceKm.toFixed(2)),
      adjustedIntensity,
      reason
    };
  });
}
