import React from "react";
import { ROADMAP_METRICS, MILESTONES } from "@/data/campaignFinance";
import MilestoneCard from "./MilestoneCard";

export default function CampaignRoadmap() {
  return (
    <section className="rounded-2xl p-3" style={{ background: "#05080F", border: "1px solid var(--border)" }}>
      <div className="text-center">
        <div className="font-display" style={{ fontSize: 10, color: "var(--gold, #C9A84C)", letterSpacing: "0.16em" }}>
          THE ROADMAP TO SAVING HUMANITY
        </div>
        <h2 className="font-display" style={{ fontSize: 22, color: "#fff", lineHeight: 1.25, margin: "6px 0 0" }}>
          6 Phases. 104 Weeks. $31.7M. One Civilizational Outcome.
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 mt-3">
        {ROADMAP_METRICS.map((m) => (
          <span
            key={m}
            className="font-display rounded-full"
            style={{ fontSize: 9.5, padding: "6px 11px", color: "var(--gold, #C9A84C)", border: "1px solid rgba(201,168,76,0.45)", background: "rgba(201,168,76,0.08)", letterSpacing: "0.08em" }}
          >
            {m}
          </span>
        ))}
      </div>

      <div className="relative mt-4">
        {/* timeline rail */}
        <div className="absolute" style={{ left: 12, top: 6, bottom: 40, width: 2, background: "var(--border)" }} />
        <div className="absolute" style={{ left: 12, top: 6, height: "16%", width: 2, background: "linear-gradient(180deg,#C9A84C,#8A6E2E)" }} />
        {MILESTONES.map((m) => <MilestoneCard key={m.id} m={m} />)}
      </div>

      <div className="text-center font-mono" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.7 }}>
        TOTAL MILESTONES: 104 weeks | $31.7M<br />
        <span style={{ color: "var(--gold, #C9A84C)" }}>"The most consequential engineering roadmap in human history"</span>
      </div>
    </section>
  );
}