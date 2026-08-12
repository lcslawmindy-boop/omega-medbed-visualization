import React from "react";
import { MODALITIES } from "@/data/modalities";

export default function ModalitySidebar({ activeCode, onSelect, onOpenDetail }) {
  return (
    <aside
      className="fixed left-0 top-[60px] bottom-[40px] z-50 flex flex-col bg-panel border-r border-soft"
      style={{ width: 280, borderColor: "var(--border)" }}
    >
      <div className="px-4 py-3 border-b border-soft" style={{ borderColor: "var(--border)" }}>
        <div className="font-display text-gold" style={{ fontSize: 11, letterSpacing: "0.14em" }}>
          MODALITY INDEX
        </div>
        <div className="font-mono text-muted mt-0.5" style={{ fontSize: 9 }}>
          18 / 18 ACTIVE · BFAC+ACE
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-dark">
        {MODALITIES.map((m, i) => {
          const active = m.code === activeCode;
          return (
            <button
              key={m.code}
              onClick={() => onSelect(m.code)}
              onDoubleClick={() => onOpenDetail && onOpenDetail(m.code)}
              data-modcode={m.code}
              className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 transition-colors group"
              style={{
                background: active ? "var(--bg-elevated)" : "transparent",
                borderLeft: active ? "2px solid var(--gold)" : "2px solid transparent",
              }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: m.color, boxShadow: `0 0 8px ${m.color}` }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      color: active ? "var(--gold)" : "var(--text-primary)",
                    }}
                  >
                    {m.code}
                  </span>
                  <span className="font-body text-muted truncate" style={{ fontSize: 10 }}>
                    {m.name}
                  </span>
                </div>
                <div className="font-mono text-muted truncate" style={{ fontSize: 8.5, marginTop: 1 }}>
                  {m.category}
                </div>
              </div>
              <span className="font-mono text-muted" style={{ fontSize: 8 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}