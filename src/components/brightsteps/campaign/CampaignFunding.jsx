import React from "react";
import { CAMPAIGN, USE_OF_FUNDS, CAMPAIGN_MILESTONES } from "@/data/brightstepsCampaign";

const money = (n) => `$${n.toLocaleString()}`;

export default function CampaignFunding() {
  const pct = Math.min(100, (CAMPAIGN.raised / CAMPAIGN.goal) * 100);
  return (
    <div className="space-y-3">
      <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
        <div className="flex items-end gap-3 flex-wrap">
          <div>
            <div className="font-display" style={{ fontSize: 22, color: "var(--sky)" }}>{money(CAMPAIGN.raised)}</div>
            <div className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>pledged of {money(CAMPAIGN.goal)} goal</div>
          </div>
          <div>
            <div className="font-display" style={{ fontSize: 18, color: "var(--text-primary)" }}>{CAMPAIGN.backers}</div>
            <div className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>backers</div>
          </div>
          <div>
            <div className="font-display" style={{ fontSize: 18, color: "var(--text-primary)" }}>{CAMPAIGN.daysLeft}</div>
            <div className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>days to go</div>
          </div>
        </div>
        <div className="mt-2 rounded-full overflow-hidden" style={{ height: 8, background: "var(--bg-panel)" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "var(--sky)" }} />
        </div>
      </div>

      <div>
        <div className="font-display text-sky mb-1.5" style={{ fontSize: 10, letterSpacing: "0.14em" }}>USE OF FUNDS</div>
        <div className="space-y-1.5">
          {USE_OF_FUNDS.map((u) => (
            <div key={u.label} className="bs-card px-3 py-2" style={{ background: "var(--bg-panel)" }}>
              <div className="flex items-baseline gap-2">
                <span className="font-body flex-1 min-w-0 truncate" style={{ fontSize: 11, color: "var(--text-primary)" }}>{u.label}</span>
                <span className="font-mono" style={{ fontSize: 10, color: "var(--sky)" }}>{money(u.amount)}</span>
                <span className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)", width: 30, textAlign: "right" }}>{u.pct}%</span>
              </div>
              <div className="mt-1 rounded-full overflow-hidden" style={{ height: 4, background: "var(--bg-card)" }}>
                <div style={{ width: `${u.pct * 4}%`, maxWidth: "100%", height: "100%", background: "var(--teal)" }} />
              </div>
              <div className="font-mono mt-1" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{u.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="font-display text-sky mb-1.5" style={{ fontSize: 10, letterSpacing: "0.14em" }}>FUNDING MILESTONES</div>
        <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
          {CAMPAIGN_MILESTONES.map((m) => (
            <div key={m.pct} className="bs-card px-3 py-2" style={{ background: "var(--bg-panel)", borderLeft: `3px solid ${m.pct > 100 ? "var(--violet, #A78BFA)" : "var(--sky)"}` }}>
              <div className="flex items-baseline gap-2">
                <span className="font-display" style={{ fontSize: 11, color: "var(--sky)" }}>{m.pct}%</span>
                <span className="font-body flex-1 truncate" style={{ fontSize: 10.5, color: "var(--text-primary)" }}>{m.label}</span>
                <span className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>{money(m.amount)}</span>
              </div>
              <div className="font-body mt-1" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.5 }}>{m.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}