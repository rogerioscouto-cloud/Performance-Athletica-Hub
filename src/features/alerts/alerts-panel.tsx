"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { todayDateInput } from "@/lib/utils";

export function AlertsPanel() {
  const [data, setData] = useState<{ alerts: Array<{ severity: string; message: string }>; recs: Array<{ message: string }> } | null>(null);

  const generate = async () => {
    const response = await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: todayDateInput() })
    });

    const json = await response.json();
    setData(json);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <Button onClick={generate}>Gerar alertas do dia</Button>
      {data ? (
        <div className="mt-4 space-y-4 text-sm">
          <div>
            <h3 className="font-semibold">Alertas</h3>
            <div className="mt-2 space-y-2">
              {data.alerts.length > 0 ? data.alerts.map((alert, index) => (
                <p key={`${alert.message}-${index}`}>[{alert.severity}] {alert.message}</p>
              )) : <p>Nenhum alerta crítico.</p>}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Recomendações</h3>
            <div className="mt-2 space-y-2">
              {data.recs.map((recommendation, index) => (
                <p key={`${recommendation.message}-${index}`}>{recommendation.message}</p>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
