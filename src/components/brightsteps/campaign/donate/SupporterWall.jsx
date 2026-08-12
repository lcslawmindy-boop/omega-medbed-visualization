import React from "react";
import { SUPPORTERS, FUNDING } from "@/data/campaignDonation";

export default function SupporterWall() {
  return (
    <div className="bs-card p-3" style={{ background: "var(--bg-panel)" }}>
      <div className="font-display" style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.12em" }}>
        THE LIGHT TIMELINE IS BUILT BY PEOPLE LIKE THESE:
      </div>
      <div
        className="bs-scroll mt-2 space-y-1.5 overflow-y-auto pr-1"
        style={{ maxHeight: 210 }}
      >
        {SUPPORTERS.map((s, i) => (
          <div
            key={`${s.name}-${i}`}
            className="bs-card flex items-center justify-between gap-2 px-2.5 py-2"
            style={{ background: "var(--bg-card)", borderRadius: 12, animationDelay: `${i * 45}ms` }}
          >
            <div className="min-w-0">
              <div className="font-body truncate" style={{ fontSize: 10.5, color: "var(--text-primary)" }}>{s.name}</div>
              <div className="font-mono truncate" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{s.loc}</div>
            </div>
            <span className="font-display flex-none rounded-full" style={{ fontSize: 8, padding: "3px 7px", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.35)" }}>
              {s.tier}
            </span>
          </div>
        ))}
      </div>
      <div className="font-display mt-2" style={{ fontSize: 9.5, color: "var(--text-muted)", letterSpacing: "0.1em" }}>
        {FUNDING.donors} SUPPORTERS ACROSS {FUNDING.countries} COUNTRIES
      </div>
    </div>
  );
}