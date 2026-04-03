import { describe, it, expect } from "vitest";
import { calculateReadiness } from "./calculate-readiness";

describe("calculateReadiness", () => {
  it("retorna GREEN em boa condição", () => {
    const result = calculateReadiness({
      restingHeartRate: 55,
      baselineRestingHR: 56,
      sleepHours: 8,
      fatigueScore: 2,
      sorenessScore: 1
    });
    expect(result.status).toBe("GREEN");
    expect(result.score).toBeGreaterThan(70);
  });

  it("retorna RED em baixa prontidão", () => {
    const result = calculateReadiness({
      restingHeartRate: 70,
      baselineRestingHR: 56,
      sleepHours: 4,
      fatigueScore: 9,
      sorenessScore: 8
    });
    expect(result.status).toBe("RED");
  });
});
