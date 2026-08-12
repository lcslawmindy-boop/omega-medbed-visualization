import React from "react";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const axis = { fontSize: 9, fill: "#7D8590", fontFamily: "var(--font-mono)" };
const tip = {
  contentStyle: { background: "#0D1117", border: "1px solid #21262D", borderRadius: 6, fontSize: 10, fontFamily: "var(--font-mono)" },
  labelStyle: { color: "#C9A84C", fontSize: 10 },
};

function Panel({ title, children, height = 220 }) {
  return (
    <div className="rounded-lg p-3" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
      <div className="font-display mb-2" style={{ fontSize: 9.5, color: "var(--gold)", letterSpacing: "0.14em" }}>{title}</div>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
      </div>
    </div>
  );
}

export default function DashTrends({ data, curve }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
      <Panel title="SCALAR FIELD INTENSITY — SESSION TREND">
        <AreaChart data={data} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="gScalar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9B30FF" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#9B30FF" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#21262D" vertical={false} />
          <XAxis dataKey="label" tick={axis} stroke="#21262D" />
          <YAxis tick={axis} stroke="#21262D" />
          <Tooltip {...tip} />
          <Area type="monotone" dataKey="scalar_field" name="Scalar (Hz)" stroke="#9B30FF" fill="url(#gScalar)" strokeWidth={2} />
        </AreaChart>
      </Panel>

      <Panel title="POWER STABILITY VS. DRAW">
        <LineChart data={data} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#21262D" vertical={false} />
          <XAxis dataKey="label" tick={axis} stroke="#21262D" />
          <YAxis yAxisId="l" tick={axis} stroke="#21262D" domain={[60, 100]} />
          <YAxis yAxisId="r" orientation="right" tick={axis} stroke="#21262D" />
          <Tooltip {...tip} />
          <Legend wrapperStyle={{ fontSize: 9, fontFamily: "var(--font-mono)" }} />
          <Line yAxisId="l" type="monotone" dataKey="power_stability" name="Stability %" stroke="#10B981" strokeWidth={2} dot={{ r: 2 }} />
          <Line yAxisId="r" type="monotone" dataKey="kw" name="Draw kW" stroke="#F59E0B" strokeWidth={2} dot={{ r: 2 }} />
        </LineChart>
      </Panel>

      <Panel title="BIOMETRIC RESPONSE — HRV / EEG ALPHA / SpO₂">
        <LineChart data={data} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#21262D" vertical={false} />
          <XAxis dataKey="label" tick={axis} stroke="#21262D" />
          <YAxis tick={axis} stroke="#21262D" />
          <Tooltip {...tip} />
          <Legend wrapperStyle={{ fontSize: 9, fontFamily: "var(--font-mono)" }} />
          <Line type="monotone" dataKey="hrv" name="HRV ms" stroke="#1D6FA4" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="eeg_alpha" name="EEG α" stroke="#C9A84C" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="spo2" name="SpO₂ %" stroke="#0D9488" strokeWidth={2} dot={false} />
        </LineChart>
      </Panel>

      <Panel title={curve.length ? "INTRA-SESSION RAMP — SCALAR / POWER / THERMAL" : "INTRA-SESSION RAMP"}>
        <BarChart data={curve} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="#21262D" vertical={false} />
          <XAxis dataKey="t" tick={axis} stroke="#21262D" />
          <YAxis tick={axis} stroke="#21262D" />
          <Tooltip {...tip} />
          <Legend wrapperStyle={{ fontSize: 9, fontFamily: "var(--font-mono)" }} />
          <Bar dataKey="scalar" name="Scalar" fill="#9B30FF" radius={[2, 2, 0, 0]} />
          <Bar dataKey="thermal" name="Thermal °C" fill="#EF4444" radius={[2, 2, 0, 0]} />
        </BarChart>
      </Panel>
    </div>
  );
}