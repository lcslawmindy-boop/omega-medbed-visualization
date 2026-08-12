import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { USE_OF_FUNDS } from "@/data/campaignFinance";

export default function UseOfFundsTab() {
  const [sel, setSel] = useState(null);

  return (
    <div>
      <div className="font-display" style={{ fontSize: 12, color: "var(--text-primary)" }}>How Every Dollar Gets Used</div>

      <div className="grid gap-3 mt-2.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={USE_OF_FUNDS}
                dataKey="pct"
                nameKey="name"
                innerRadius="55%"
                outerRadius="85%"
                paddingAngle={2}
                onClick={(d) => setSel(d.name)}
              >
                {USE_OF_FUNDS.map((s) => (
                  <Cell key={s.name} fill={s.color} stroke={sel === s.name ? "#fff" : "transparent"} strokeWidth={2} cursor="pointer" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-1">
          {USE_OF_FUNDS.map((s) => (
            <button
              key={s.name}
              onClick={() => setSel(s.name)}
              className="w-full flex items-center gap-2 rounded px-2 text-left"
              style={{ minHeight: 34, background: sel === s.name ? "var(--bg-elevated)" : "transparent", border: "1px solid var(--border)" }}
            >
              <span className="rounded-full flex-none" style={{ width: 9, height: 9, background: s.color }} />
              <span className="font-body flex-1" style={{ fontSize: 10, color: "var(--text-primary)" }}>{s.name}</span>
              <span className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>{s.pct}% · {s.amount}</span>
            </button>
          ))}
          <div className="flex items-center gap-2 rounded px-2" style={{ minHeight: 34, border: "1px solid rgba(201,168,76,0.45)" }}>
            <span className="font-display flex-1" style={{ fontSize: 10, color: "var(--gold, #C9A84C)" }}>TOTAL</span>
            <span className="font-mono" style={{ fontSize: 9, color: "var(--gold, #C9A84C)" }}>100% · $31.7M</span>
          </div>
        </div>
      </div>

      <div className="font-body mt-3 rounded p-2.5" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.7, background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
        We commit to full financial transparency with all donors, partners, and investors. Annual reports will be published.
        All IP assets are held as protected trade secrets under NRS 600A and the Defend Trade Secrets Act.
      </div>
    </div>
  );
}