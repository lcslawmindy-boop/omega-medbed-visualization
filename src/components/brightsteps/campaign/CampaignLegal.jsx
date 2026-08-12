import React from "react";
import { DISCLAIMERS, GOLD } from "@/data/campaignTeam";

export default function CampaignLegal() {
  return (
    <div className="space-y-2 pt-3" style={{ borderTop: "1px solid rgba(239,68,68,0.35)" }}>
      <div className="font-display" style={{ fontSize: 11, color: GOLD, letterSpacing: "0.14em" }}>
        LEGAL NOTICES & RESEARCH DISCLAIMERS
      </div>
      {DISCLAIMERS.map((d) => (
        <div key={d.title} className="bs-card p-3" style={{ background: "var(--bg-panel)", borderLeft: `3px solid ${d.color}` }}>
          <div className="font-display" style={{ fontSize: 10, color: d.color, letterSpacing: "0.1em" }}>{d.title}</div>
          <p className="font-body" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.7, margin: "6px 0 0" }}>{d.body}</p>
        </div>
      ))}
    </div>
  );
}