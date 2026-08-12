import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { base44 } from "@/api/base44Client";
import PageShell from "@/components/shell/PageShell";
import BsBiometrics from "@/components/brightsteps/BsBiometrics";
import BaselineGoalChart from "@/components/therapy/BaselineGoalChart";

export default function TherapyLogs() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    base44.entities.SessionLog.list("-started_at", 200).then((r) => { setRows(r); setLoading(false); });
  }, []);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) =>
      [r.protocol_name, r.status, ...(r.modalities || [])].join(" ").toLowerCase().includes(s)
    );
  }, [rows, q]);

  return (
    <PageShell title="THERAPY LOGS" subtitle="Past sessions · protocol detail · biometric baseline vs goal">
      {!loading && rows.length > 0 && <BaselineGoalChart sessions={rows} />}

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search protocol, modality or status…"
        className="w-full rounded font-body"
        style={{ padding: "11px 12px", minHeight: 44, fontSize: 12, background: "var(--bg-panel)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
      />

      {loading ? (
        <div className="font-mono py-10 text-center" style={{ fontSize: 11, color: "var(--text-muted)" }}>Loading session history…</div>
      ) : list.length === 0 ? (
        <div className="font-mono py-10 text-center" style={{ fontSize: 11, color: "var(--text-muted)" }}>
          {rows.length ? "No sessions match that search." : "No sessions logged yet. Run a protocol to populate this log."}
        </div>
      ) : (
        <div className="space-y-1.5">
          {list.map((s) => (
            <div key={s.id} className="bs-card p-3" style={{ background: "var(--bg-panel)" }}>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-display flex-1 min-w-0 truncate" style={{ fontSize: 12, color: "var(--text-primary)" }}>{s.protocol_name}</span>
                <span className="font-mono" style={{ fontSize: 9, color: s.status === "completed" ? "var(--green, #34D399)" : "var(--amber, #F59E0B)" }}>
                  {(s.status || "").toUpperCase()}
                </span>
                <span className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>
                  {s.started_at ? format(new Date(s.started_at), "MMM d yyyy · HH:mm") : "—"}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {(s.modalities || []).map((m) => (
                  <span key={m} className="font-mono rounded" style={{ fontSize: 8, padding: "3px 6px", color: "var(--sky)", border: "1px solid var(--border)" }}>{m}</span>
                ))}
              </div>
              <div className="font-mono mt-1.5" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.7 }}>
                {Math.round((s.duration_sec || 0) / 60)} min · HRV {s.hrv ?? "—"} ms · SpO₂ {s.spo2 ?? "—"}% · alpha {s.eeg_alpha ?? "—"} · scalar {s.scalar_field ?? "—"}% · {s.total_watts ?? "—"} W · BFAC {s.bfac ? "ON" : "OFF"}
              </div>
            </div>
          ))}
        </div>
      )}

      <BsBiometrics />
    </PageShell>
  );
}