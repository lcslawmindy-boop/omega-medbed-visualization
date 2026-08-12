import React from "react";
import { BS_SYSTEMS } from "@/data/brightsteps";

export default function BsSidebar({ activeCode, onSelect }) {
  return (
    <aside
      className="bs-edges fixed left-0 z-[90] hidden lg:flex flex-col no-select"
      style={{ width: 280, background: "var(--bg-panel)", borderRight: "1px solid var(--border)" }}
    >
      <div className="px-3 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="font-display text-sky" style={{ fontSize: 10, letterSpacing: "0.14em" }}>THERAPY SYSTEMS</div>
        <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>12 integrated · KIDS-OS supervised</div>
      </div>
      <div className="flex-1 overflow-y-auto bs-scroll py-1">
        {BS_SYSTEMS.map((s, i) => {
          const on = s.code === activeCode;
          return (
            <button
              key={s.code}
              data-bscode={s.code}
              onClick={() => onSelect(s.code)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors"
              style={{
                background: on ? "var(--bg-elevated)" : "transparent",
                borderLeft: `3px solid ${on ? s.color : "transparent"}`,
                minHeight: 44,
              }}
            >
              <span className="font-mono flex-none" style={{ fontSize: 9, color: "var(--text-muted)", width: 16 }}>{String(i + 1).padStart(2, "0")}</span>
              <span className="inline-block w-2 h-2 rounded-full flex-none" style={{ background: s.color, boxShadow: on ? `0 0 8px ${s.color}` : "none" }} />
              <span className="font-display flex-none" style={{ fontSize: 10, color: s.color, width: 40, letterSpacing: "0.05em" }}>{s.code}</span>
              <span className="font-body flex-1 truncate" style={{ fontSize: 10.5, color: on ? "var(--text-primary)" : "var(--text-muted)" }}>{s.name}</span>
              {s.isMaster && <span style={{ fontSize: 9, color: "var(--green)" }}>★</span>}
            </button>
          );
        })}
      </div>
      <div className="px-3 py-2 font-mono" style={{ fontSize: 8, color: "var(--text-muted)", borderTop: "1px solid var(--border)", lineHeight: 1.6 }}>
        AATCS-P1 · Rev A · 2026-08-12<br />CONCEPT — NOT FOR MANUFACTURE
      </div>
    </aside>
  );
}