import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Sparkline from "@/components/medbed/spec/Sparkline";
import { MODALITY_BY_CODE } from "@/data/modalities";

// recharts SVG strokes need literal hex (CSS vars don't resolve as SVG attributes)
const C = { border: "#21262D", gold: "#C9A84C", violet: "#9B30FF", muted: "#7D8590", elevated: "#161B22", panel: "#0D1117" };

const fmtDate = (iso) =>
  new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
const fmtDur = (s) => `${Math.floor(s / 60)}m ${s % 60}s`;

export default function SessionHistory() {
  const [logs, setLogs] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    try {
      const res = await base44.entities.SessionLog.list("-created_date", 50);
      setLogs(res || []);
    } catch (e) {
      setLogs([]);
    }
  };
  useEffect(() => {
    load();
  }, []);

  if (logs === null) {
    return (
      <div className="p-6 text-center font-mono text-muted" style={{ fontSize: 11 }}>
        LOADING SESSION HISTORY...
      </div>
    );
  }
  if (!logs.length) {
    return (
      <div className="p-6 text-center font-mono text-muted" style={{ fontSize: 11, lineHeight: 1.6 }}>
        NO SESSIONS LOGGED YET.<br />RUN A SIMULATION TO BEGIN BUILDING PERFORMANCE TRENDS.
      </div>
    );
  }

  // chronological (oldest first) for trend lines
  const chrono = [...logs].reverse();
  const chartData = chrono.map((l, i) => ({
    idx: i + 1,
    power: l.power_stability ?? 0,
    watts: l.total_watts ?? 0,
  }));
  const avgP = (logs.reduce((s, l) => s + (l.power_stability || 0), 0) / logs.length).toFixed(1);
  const avgW = Math.round(logs.reduce((s, l) => s + (l.total_watts || 0), 0) / logs.length);

  return (
    <div className="p-3 space-y-4 select-text">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-2">
        <Stat label="SESSIONS" value={String(logs.length)} />
        <Stat label="AVG POWER STAB" value={`${avgP}%`} />
        <Stat label="AVG DRAW" value={`${avgW} W`} />
      </div>

      {/* Trend charts */}
      <ChartCard title="POWER STABILITY TREND" color={C.gold}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: -24 }}>
          <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
          <XAxis dataKey="idx" stroke={C.muted} fontSize={9} tickLine={false} />
          <YAxis domain={[0, 100]} stroke={C.muted} fontSize={9} tickLine={false} />
          <Tooltip contentStyle={{ background: C.elevated, border: `1px solid ${C.gold}`, fontSize: 10, borderRadius: 4 }} labelStyle={{ color: C.gold }} />
          <Line type="monotone" dataKey="power" stroke={C.gold} strokeWidth={2} dot={{ r: 2.5, fill: C.gold }} name="Power %" />
        </LineChart>
      </ChartCard>

      <ChartCard title="TOTAL POWER DRAW TREND" color={C.violet}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: -24 }}>
          <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
          <XAxis dataKey="idx" stroke={C.muted} fontSize={9} tickLine={false} />
          <YAxis stroke={C.muted} fontSize={9} tickLine={false} />
          <Tooltip contentStyle={{ background: C.elevated, border: `1px solid ${C.violet}`, fontSize: 10, borderRadius: 4 }} labelStyle={{ color: C.violet }} />
          <Line type="monotone" dataKey="watts" stroke={C.violet} strokeWidth={2} dot={{ r: 2.5, fill: C.violet }} name="Watts" />
        </LineChart>
      </ChartCard>

      {/* Session list */}
      <div>
        <div className="font-display text-gold mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>
          SESSION LOG
        </div>
        <div className="space-y-2">
          {logs.map((l) => {
            const open = expanded === l.id;
            const pts = (l.samples || []).map((s) => (s.power || 0) * 100);
            return (
              <div
                key={l.id}
                className="rounded-sm"
                style={{ background: "var(--bg-panel)", border: `1px solid ${open ? "var(--gold)" : "var(--border)"}` }}
              >
                <button
                  onClick={() => setExpanded(open ? null : l.id)}
                  className="w-full text-left p-3 flex items-center gap-3"
                  style={{ minHeight: 44 }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full flex-none"
                    style={{ background: l.status === "completed" ? "var(--green)" : "var(--amber)" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-display truncate" style={{ fontSize: 11, color: "var(--text-primary)" }}>
                      {l.protocol_name}
                    </div>
                    <div className="font-mono text-muted truncate" style={{ fontSize: 9 }}>
                      {fmtDate(l.started_at)} · {l.modality_count} modalities · {fmtDur(l.duration_sec)}
                    </div>
                  </div>
                  <div className="text-right flex-none">
                    <div className="font-mono" style={{ fontSize: 11, color: "var(--gold)" }}>
                      {Math.round(l.power_stability || 0)}%
                    </div>
                    <div className="font-mono text-muted" style={{ fontSize: 9 }}>{l.total_watts}W</div>
                  </div>
                </button>
                {open && (
                  <div className="px-3 pb-3 border-t" style={{ borderColor: "var(--border)" }}>
                    {pts.length > 1 && (
                      <div className="my-2">
                        <div className="font-mono text-muted mb-1" style={{ fontSize: 8 }}>POWER RAMP</div>
                        <Sparkline points={pts} color="var(--gold)" width={320} height={36} />
                      </div>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-2">
                      <Metric label="SCALAR φ" value={`${(l.scalar_field || 0).toFixed(2)} mT`} />
                      <Metric label="THERMAL" value={`${(l.thermal || 0).toFixed(1)}°C`} />
                      <Metric label="HRV" value={`${l.hrv || 0} bpm`} />
                      <Metric label="SpO2" value={`${(l.spo2 || 0).toFixed(1)}%`} />
                      <Metric label="EEG α" value={`${(l.eeg_alpha || 0).toFixed(1)} Hz`} />
                      <Metric label="GSR" value={`${(l.gsr || 0).toFixed(2)} kΩ`} />
                    </div>
                    <div className="font-mono text-muted mb-1" style={{ fontSize: 9 }}>MODALITIES</div>
                    <div className="flex flex-wrap gap-1">
                      {(l.modalities || []).map((c) => {
                        const m = MODALITY_BY_CODE[c];
                        return (
                          <span
                            key={c}
                            className="font-display rounded-sm"
                            style={{
                              fontSize: 9,
                              padding: "2px 6px",
                              color: m?.color || "var(--gold)",
                              border: `1px solid ${m?.color || "var(--gold-dim)"}`,
                            }}
                          >
                            {c}
                          </span>
                        );
                      })}
                    </div>
                    <div className="font-mono text-muted mt-2" style={{ fontSize: 9 }}>
                      STATUS:{" "}
                      <span style={{ color: l.status === "completed" ? "var(--green)" : "var(--amber)" }}>
                        {l.status?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-sm p-2 text-center" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
      <div className="font-mono text-muted" style={{ fontSize: 8, letterSpacing: "0.08em" }}>{label}</div>
      <div className="font-display text-gold" style={{ fontSize: 16 }}>{value}</div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-sm px-2 py-1" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
      <div className="font-mono text-muted" style={{ fontSize: 8 }}>{label}</div>
      <div className="font-mono" style={{ fontSize: 11, color: "var(--text-primary)" }}>{value}</div>
    </div>
  );
}

function ChartCard({ title, color, children }) {
  return (
    <div className="rounded-sm" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
      <div className="font-display px-3 py-2" style={{ fontSize: 10, letterSpacing: "0.12em", color }}>{title}</div>
      <div style={{ height: 140, padding: "0 8px 8px" }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}