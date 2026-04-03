import { describe, it, expect } from "vitest";
import { calculateRunningMetrics } from "./calculate-metrics";

describe("calculateRunningMetrics", () => {
  it("calcula pace corretamente", () => {
    const result = calculateRunningMetrics({ distanceKm: 5, durationSec: 1500, avgHeartRate: 150 });
    expect(result.paceSecPerKm).toBe(300);
  });
});
