import React from "react";
import { PNL_ROWS } from "@/data/campaignFinance";

export default function PnlTab() {
  return (
    <div>
      <div className="font-display" style={{ fontSize: 12, color: "var(--text-primary)" }}>5-Year Financial Projections</div>
      <div className="font-body" style={{ fontSize: 9.5, color: "#FBBF24" }}>
        Projections for planning purposes only. Not a securities offering.
      </div>

      <div className="mt-2.5 overflow-x-auto bs-scroll">
        <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 520 }}>
          <thead>
            <tr>
              {["Item", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5"].map((h) => (
                <th key={h} className="font-display text-left py-1.5 px-2" style={{ fontSize: 8.5, color: "var(--gold, #C9A84C)", letterSpacing: "0.1em", borderBottom: "1px solid var(--border)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PNL_ROWS.map((r) => (
              <tr key={r.label} style={{ background: r.head ? "rgba(201,168,76,0.07)" : "transparent" }}>
                <td className="font-body py-1.5 px-2" style={{ fontSize: 9.5, color: r.head ? "var(--gold, #C9A84C)" : "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{r.label}</td>
                {r.vals.map((v, i) => (
                  <td key={i} className="font-mono py-1.5 px-2" style={{ fontSize: 9, color: r.head ? "var(--text-primary)" : "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="font-body mt-2" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.6 }}>
        Note: Year 5 negative net reflects ramp-up to manufacturing scale — funded by Year 4 surplus and Series A institutional raise.
      </div>
    </div>
  );
}