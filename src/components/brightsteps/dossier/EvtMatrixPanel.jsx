import React, { useState } from "react";
import { EVT_MATRIX, EVT_SECTIONS } from "@/data/brightstepsDossier";

export default function EvtMatrixPanel() {
  const [open, setOpen] = useState(EVT_MATRIX[0].code);
  return (
    <div className="space-y-3">
      <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
        <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>MODALITY ACCEPTANCE CRITERIA MATRIX</div>
        {EVT_MATRIX.map((m) => {
          const on = open === m.code;
          return (
            <div key={m.code} style={{ borderBottom: "1px solid var(--border)" }}>
              <button onClick={() => setOpen(on ? null : m.code)} className="w-full flex items-center gap-2 text-left py-2" style={{ minHeight: 40 }}>
                <span className="font-display flex-none rounded" style={{ fontSize: 9, padding: "3px 6px", background: on ? "var(--sky)" : "var(--bg-elevated)", color: on ? "#04121F" : "var(--sky)" }}>{m.code}</span>
                <span className="font-display flex-1 truncate" style={{ fontSize: 10, color: "var(--text-primary)" }}>{m.sys}</span>
                <span className="font-mono hidden sm:inline" style={{ fontSize: 8.5, color: "var(--green)" }}>{m.accept}</span>
                <span style={{ color: "var(--text-muted)", fontSize: 10 }}>{on ? "−" : "+"}</span>
              </button>
              {on && (
                <div className="pb-2.5 pl-1 space-y-1">
                  <Row label="TESTS" v={m.tests} />
                  <Row label="EQUIPMENT" v={m.equip} />
                  <Row label="ACCEPTANCE" v={m.accept} c="var(--green)" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
        <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>EVT BINDER STRUCTURE — 13 SECTIONS</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
          {EVT_SECTIONS.map((s, i) => (
            <div key={s} className="flex gap-2 items-center font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>
              <span style={{ color: "var(--sky)" }}>{String(i + 1).padStart(2, "0")}</span> {s}
            </div>
          ))}
        </div>
        <div className="font-mono mt-3" style={{ fontSize: 8.5, color: "var(--text-muted)", lineHeight: 1.6 }}>
          EVT precedes DVT and PVT — required for SBIR Phase I technical validation, clinical pilot readiness, manufacturing feasibility and safety certification pre-checks. All safety cutoffs must activate within 250 ms.
        </div>
      </div>
    </div>
  );
}

function Row({ label, v, c }) {
  return (
    <div className="flex gap-2">
      <span className="font-display flex-none" style={{ fontSize: 8.5, color: "var(--text-muted)", letterSpacing: "0.08em", width: 78 }}>{label}</span>
      <span className="font-mono" style={{ fontSize: 9, color: c || "var(--text-primary)", lineHeight: 1.55 }}>{v}</span>
    </div>
  );
}