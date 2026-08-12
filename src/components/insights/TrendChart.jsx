import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export default function TrendChart({ title, data, series, height = 190 }) {
  return (
    <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
      <div className="font-display" style={{ fontSize: 10, color: "var(--text-primary)", letterSpacing: "0.1em" }}>{title}</div>
      <div style={{ height, marginTop: 6 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: -18 }}>
            <CartesianGrid stroke="#1B2B45" strokeDasharray="2 4" />
            <XAxis dataKey="label" tick={{ fill: "#7D8590", fontSize: 8 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "#7D8590", fontSize: 8 }} tickLine={false} axisLine={false} domain={["auto", "auto"]} />
            <Tooltip contentStyle={{ background: "#0D1117", border: "1px solid #21262D", borderRadius: 10, fontSize: 10 }} labelStyle={{ color: "#7D8590" }} />
            <Legend wrapperStyle={{ fontSize: 9, color: "#7D8590" }} />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={2}
                strokeDasharray={s.dashed ? "4 4" : undefined}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}