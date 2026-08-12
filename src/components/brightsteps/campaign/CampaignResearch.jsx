import React from "react";
import { RESEARCH_SOURCES, ATTRIBUTION, GOLD } from "@/data/campaignTeam";
import ResearchCard from "./research/ResearchCard";

export default function CampaignResearch() {
  return (
    <div className="space-y-3">
      <div>
        <div className="font-display" style={{ fontSize: 10, color: GOLD, letterSpacing: "0.14em" }}>
          STANDING ON THE SHOULDERS OF GIANTS
        </div>
        <div className="font-display" style={{ fontSize: 19, color: "var(--text-primary)", lineHeight: 1.35 }}>
          The Primary Source Research Behind Every Device in This Portfolio.
        </div>
      </div>

      <p className="font-body mx-auto text-center" style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.75, maxWidth: 680, margin: 0 }}>
        Everything in this portfolio is grounded in documented historical research — patents, peer-reviewed studies,
        declassified government documents, and witnessed experimental results. We built nothing from speculation.
        We engineered from evidence.
      </p>

      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
        {RESEARCH_SOURCES.map((s) => <ResearchCard key={s.title} src={s} />)}
      </div>

      <p className="font-body mx-auto text-center" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 800, opacity: 0.85, margin: 0 }}>
        {ATTRIBUTION}
      </p>
    </div>
  );
}