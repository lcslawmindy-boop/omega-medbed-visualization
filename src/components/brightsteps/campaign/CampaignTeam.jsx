import React from "react";
import { OPEN_ROLES, GOLD } from "@/data/campaignTeam";
import FounderCard from "./team/FounderCard";
import OpenRoleCard from "./team/OpenRoleCard";

export default function CampaignTeam() {
  return (
    <div className="space-y-3">
      <div>
        <div className="font-display" style={{ fontSize: 10, color: GOLD, letterSpacing: "0.14em" }}>
          THE PEOPLE BEHIND THE MISSION
        </div>
        <div className="font-display" style={{ fontSize: 20, color: "var(--text-primary)", lineHeight: 1.35 }}>
          Founders, Researchers, and Mission Partners.
        </div>
      </div>

      <FounderCard />

      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
        {OPEN_ROLES.map((r) => <OpenRoleCard key={r.role} role={r} />)}
      </div>

      <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
        <div className="font-display" style={{ fontSize: 9.5, color: GOLD, letterSpacing: "0.12em" }}>ADVISORY BOARD</div>
        <p className="font-body" style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.6, margin: "5px 0 0" }}>
          Advisory board forming. First advisors will be announced with Phase 1 funding close.
        </p>
      </div>

      <div className="bs-card p-3 flex gap-3 items-start" style={{ background: "var(--bg-panel)", border: "1px solid var(--sky-dim)" }}>
        <div className="flex-none flex items-center justify-center rounded-full" style={{ width: 40, height: 40, border: "1px solid var(--sky)", fontSize: 18 }}>🌐</div>
        <div className="min-w-0">
          <div className="font-display" style={{ fontSize: 11, color: "var(--sky)", letterSpacing: "0.08em" }}>MINEWING — MANUFACTURING PARTNER</div>
          <p className="font-body" style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.6, margin: "5px 0 0" }}>
            Prototype assembly: AATCS-P1 · EVT → DVT → PVT phases. Manufacturer of the BrightSteps Therapy Pod AATCS-P1 prototype assembly.
          </p>
        </div>
      </div>
    </div>
  );
}