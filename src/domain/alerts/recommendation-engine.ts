import type { Recommendation } from "./types";

export function generateRecommendations(input: { readinessScore: number }): Recommendation[] {
  if (input.readinessScore < 40) {
    return [{ message: "Realizar descanso ativo ou OFF." }];
  }
  if (input.readinessScore < 70) {
    return [{ message: "Treino leve/moderado recomendado." }];
  }
  return [{ message: "Apto para treino intenso." }];
}
