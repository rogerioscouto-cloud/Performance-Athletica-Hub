export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH";

export type Alert = {
  type: string;
  message: string;
  severity: AlertSeverity;
};

export type Recommendation = {
  message: string;
};
