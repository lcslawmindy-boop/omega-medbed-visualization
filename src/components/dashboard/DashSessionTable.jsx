import React from "react";
import { format } from "date-fns";

export default function DashSessionTable({ sessions, selectedId, onSelect }) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
      <div className="font-display px-3 py-2" style={{ fontSize: 9.5, color: "var(--gold)", letterSpacing: "0.14em", borderBottom: "1px solid var(--border)" }}>
        SESSION RECORDS — SELECT TO INSPECT RAMP CURVE
      </div>
      <div className="overflow-x-auto scroll-dark">
        <table className="w-full font-mono" style={{ fontSize: 9.5 }}>
          <thead>
            <tr style={{ color: "var(--text-muted)" }}>
              {["DATE", "PROTOCOL", "MODS", "DUR", "SCALAR", "STABILITY", "HRV", "STATUS"].map((h) => (
                <th key={h} className="text-left font-normal px-3 py-1.5 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sessions.map((s, i) => {
              const on = s.id === selectedId;
              return (
                <tr
                  key={s.id}
                  onClick={() => onSelect(s.id)}
                  className="cursor-pointer"
                  style={{ background: on ? "var(--bg-card)" : i % 2 ? "rgba(255,255,255,0.02)" : "transparent", borderLeft: `2px solid ${on ? "var(--gold)" : "transparent"}` }}
                >
                  <td className="px-3 py-2 whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{s.started_at ? format(new Date(s.started_at), "MMM d HH:mm") : "—"}</td>
                  <td className="px-3 py-2 whitespace-nowrap" style={{ color: "var(--gold)" }}>{s.protocol_name}</td>
                  <td className="px-3 py-2">{s.modality_count ?? (s.modalities || []).length}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{Math.round((s.duration_sec || 0) / 60)} min</td>
                  <td className="px-3 py-2" style={{ color: "var(--violet)" }}>{(s.scalar_field ?? 0).toFixed(2)}</td>
                  <td className="px-3 py-2" style={{ color: "var(--green)" }}>{s.power_stability ?? "—"}%</td>
                  <td className="px-3 py-2">{s.hrv ?? "—"}</td>
                  <td className="px-3 py-2" style={{ color: s.status === "completed" ? "var(--green)" : "var(--amber)" }}>{(s.status || "").toUpperCase()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}