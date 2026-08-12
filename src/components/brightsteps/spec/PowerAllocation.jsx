import React from "react";
import { BS_POWER } from "@/data/brightstepsSpec";

const MAX = 350;

export default function PowerAllocation() {
  return (
    <div>
      <div className="px-3 py-2 font-display text-sky" style={{ fontSize: 10, letterSpacing: "0.14em", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        POWER ALLOCATION — 1.2kW TOTAL
      </div>
      <div className="px-3 py-2 space-y-1.5">
        {BS_POWER.map((p) => (
          <div key={p.code} className="flex items-center gap-2">
            <span className="font-display flex-none" style={{ fontSize: 9, color: p.color, width: 34, letterSpacing: "0.04em" }}>{p.code}</span>
            <div className="flex-1 min-w-0 rounded-full overflow-hidden" style={{ height: 6, background: "var(--bg-elevated)" }}>
              <div className="h-full rounded-full" style={{ width: `${Math.max((p.watts / MAX) * 100, 2)}%`, background: p.color }} />
            </div>
            <span className="font-mono flex-none text-right" style={{ fontSize: 9, color: "var(--text-muted)", width: p.note ? 74 : 34 }}>
              {p.note || `${p.watts}W`}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="font-display flex-none" style={{ fontSize: 9, color: "var(--gold)", width: 34 }}>TOTAL</span>
          <div className="flex-1 rounded-full overflow-hidden" style={{ height: 8, background: "var(--bg-elevated)" }}>
            <div className="h-full rounded-full" style={{ width: "100%", background: "var(--gold)" }} />
          </div>
          <span className="font-mono flex-none text-right" style={{ fontSize: 9, color: "var(--gold)", width: 46 }}>1.2kW</span>
        </div>
      </div>
    </div>
  );
}