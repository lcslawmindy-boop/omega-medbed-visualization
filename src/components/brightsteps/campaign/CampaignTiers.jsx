import React from "react";
import { TIERS } from "@/data/brightstepsCampaign";

export default function CampaignTiers({ onPledge }) {
  return (
    <div>
      <div className="font-display text-sky mb-1.5" style={{ fontSize: 10, letterSpacing: "0.14em" }}>BACKER REWARD TIERS</div>
      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
        {TIERS.map((t) => (
          <div key={t.amount} className="bs-card p-3 flex flex-col" style={{ background: "var(--bg-panel)" }}>
            <div className="flex items-baseline gap-2">
              <span className="font-display" style={{ fontSize: 16, color: "var(--sky)" }}>${t.amount.toLocaleString()}</span>
              <span className="font-body flex-1 truncate" style={{ fontSize: 11, color: "var(--text-primary)" }}>{t.name}</span>
            </div>
            {t.limit && (
              <div className="font-mono mt-0.5" style={{ fontSize: 8.5, color: "var(--amber, #F59E0B)" }}>Limited — {t.limit} available</div>
            )}
            <ul className="mt-2 flex-1 space-y-1" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {t.items.map((it) => (
                <li key={it} className="font-body flex gap-1.5" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.5 }}>
                  <span style={{ color: "var(--sky)" }}>›</span>{it}
                </li>
              ))}
            </ul>
            <button
              onClick={() => onPledge(t)}
              className="font-display rounded mt-2.5 w-full"
              style={{ fontSize: 9, padding: "9px 10px", minHeight: 38, color: "var(--sky)", border: "1px solid var(--sky-dim)", letterSpacing: "0.06em" }}
            >
              BACK THIS TIER
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}