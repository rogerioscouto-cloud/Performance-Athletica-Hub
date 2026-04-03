"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type ChartPoint = Record<string, string | number>;

function BaseChart({ data, dataKey }: { data: ChartPoint[]; dataKey: string }) {
  return (
    <div className="h-64 rounded-2xl border border-border p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DistanceChart({ data }: { data: ChartPoint[] }) {
  return <BaseChart data={data} dataKey="distance_km" />;
}

export function LoadChart({ data }: { data: ChartPoint[] }) {
  return <BaseChart data={data} dataKey="training_load" />;
}

export function ReadinessChart({ data }: { data: ChartPoint[] }) {
  return <BaseChart data={data} dataKey="readiness_score" />;
}
