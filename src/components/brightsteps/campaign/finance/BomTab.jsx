import React, { useState } from "react";
import { BOM, BOM_SUBTOTALS } from "@/data/campaignFinance";

const FILTERS = [
  ["all", "All"],
  ["PRI", "Prioré PRI"],
  ["BRH", "Helmet BRH"],
  ["VPO", "VPO"],
  ["GRD", "Grid GRD"],
];

export default function BomTab() {
  const [q, setQ] = useState("");
  const [f, setF] = useState("all");

  const rows = BOM.filter(([ref, , desc]) => {
    const matchF = f === "all" || ref.startsWith(f);
    const matchQ = !q || `${ref} ${desc}`.toLowerCase().includes(q.toLowerCase());
    return matchF && matchQ;
  });
  const total = rows.reduce((s, r) => s + r[3], 0);

  return (
    <div>
      <div className="font-display" style={{ fontSize: 12, color: "var(--text-primary)" }}>
        Complete Bill of Materials — Prototype Quantities — $52,480 Total
      </div>
      <div className="font-body" style={{ fontSize: 9.5, color: "var(--text-muted)" }}>
        All 4 devices. Every component documented.
      </div>

      <div className="flex flex-wrap gap-1.5 mt-2.5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="🔍 Search components..."
          className="font-body rounded flex-1"
          style={{ fontSize: 10, padding: "8px 10px", minWidth: 160, minHeight: 36, background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
        />
        {FILTERS.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setF(id)}
            className="font-display rounded"
            style={{
              fontSize: 9, padding: "8px 10px", minHeight: 36, letterSpacing: "0.06em",
              color: f === id ? "#0B0B0B" : "var(--gold, #C9A84C)",
              background: f === id ? "var(--gold, #C9A84C)" : "transparent",
              border: "1px solid rgba(201,168,76,0.45)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-2.5 overflow-x-auto bs-scroll">
        <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 420 }}>
          <thead>
            <tr>
              {["REF", "QTY", "DESCRIPTION", "COST ($)"].map((h) => (
                <th key={h} className="font-display text-left py-1.5 px-2" style={{ fontSize: 8.5, color: "var(--gold, #C9A84C)", letterSpacing: "0.1em", borderBottom: "1px solid var(--border)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([ref, qty, desc, cost]) => (
              <tr key={ref}>
                <td className="font-mono py-1.5 px-2" style={{ fontSize: 9, color: "var(--text-primary)", borderBottom: "1px solid var(--border)" }}>{ref}</td>
                <td className="font-mono py-1.5 px-2" style={{ fontSize: 9, color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{qty}</td>
                <td className="font-body py-1.5 px-2" style={{ fontSize: 9.5, color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{desc}</td>
                <td className="font-mono py-1.5 px-2" style={{ fontSize: 9, color: "var(--gold, #C9A84C)", borderBottom: "1px solid var(--border)" }}>${cost.toLocaleString()}</td>
              </tr>
            ))}
            <tr>
              <td className="font-mono py-1.5 px-2" style={{ fontSize: 9, color: "var(--gold, #C9A84C)" }}>TOTAL</td>
              <td />
              <td className="font-body py-1.5 px-2" style={{ fontSize: 9.5, color: "var(--gold, #C9A84C)" }}>
                {rows.length === BOM.length ? "All 4 devices — prototype quantities" : `${rows.length} line items shown`}
              </td>
              <td className="font-mono py-1.5 px-2" style={{ fontSize: 9, color: "var(--gold, #C9A84C)" }}>${total.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid gap-1.5 mt-2.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {BOM_SUBTOTALS.map(([k, v]) => (
          <div key={k} className="rounded p-2" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{k}</div>
            <div className="font-mono" style={{ fontSize: 10, color: "var(--gold, #C9A84C)" }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}