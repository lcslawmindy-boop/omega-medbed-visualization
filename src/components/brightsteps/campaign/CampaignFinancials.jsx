import React, { useState } from "react";
import PhaseBudgetTab from "./finance/PhaseBudgetTab";
import BomTab from "./finance/BomTab";
import PnlTab from "./finance/PnlTab";
import UseOfFundsTab from "./finance/UseOfFundsTab";

const TABS = [
  ["budget", "Phase Budget"],
  ["bom", "BOM Detail"],
  ["pnl", "5-Year P&L"],
  ["funds", "Use of Funds"],
];

export default function CampaignFinancials() {
  const [tab, setTab] = useState("budget");

  return (
    <section className="rounded-2xl p-3" style={{ background: "var(--bg-primary)", border: "1px solid var(--border)" }}>
      <div className="text-center">
        <div className="font-display" style={{ fontSize: 10, color: "var(--gold, #C9A84C)", letterSpacing: "0.16em" }}>
          COMPLETE FINANCIAL TRANSPARENCY
        </div>
        <h2 className="font-display" style={{ fontSize: 20, color: "#fff", lineHeight: 1.3, margin: "6px 0 0" }}>
          Every dollar accounted for. Open books for a world-changing mission.
        </h2>
      </div>

      <div className="flex gap-1 mt-3 overflow-x-auto bs-scroll" style={{ borderBottom: "1px solid var(--border)" }}>
        {TABS.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="font-display flex-none"
            style={{
              fontSize: 10, padding: "9px 12px", minHeight: 40, letterSpacing: "0.08em", borderRadius: 0,
              color: tab === id ? "var(--gold, #C9A84C)" : "var(--text-muted)",
              borderBottom: `2px solid ${tab === id ? "var(--gold, #C9A84C)" : "transparent"}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-3">
        {tab === "budget" && <PhaseBudgetTab />}
        {tab === "bom" && <BomTab />}
        {tab === "pnl" && <PnlTab />}
        {tab === "funds" && <UseOfFundsTab />}
      </div>
    </section>
  );
}