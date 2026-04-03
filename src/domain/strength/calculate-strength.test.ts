import { describe, it, expect } from "vitest";
import { calculateStrengthMetrics } from "./calculate-strength";

describe("calculateStrengthMetrics", () => {
  it("calcula volume total", () => {
    const result = calculateStrengthMetrics({
      date: "2026-01-01",
      exercises: [
        { name: "Squat", sets: 3, reps: 10, loadKg: 100 },
        { name: "Bench", sets: 3, reps: 8, loadKg: 80 }
      ]
    });
    expect(result.totalVolume).toBe(4920);
  });
});
