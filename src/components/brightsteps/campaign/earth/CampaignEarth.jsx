import React, { useState } from "react";
import EarthScene from "./EarthScene";
import { GOLD } from "@/data/campaignTeam";

const COPY = {
  dark: {
    tag: "DARK TIMELINE — 2050",
    line: "The grid tightens. Chronic disease compounds. Life expectancy falls to 52 years.",
    stat: ["52 yrs", "1 in 22", "$8T"],
    label: ["Projected lifespan", "Children with ASD", "Protected pharma revenue"],
    color: "#FF3B30",
  },
  light: {
    tag: "LIGHT TIMELINE — 2050",
    line: "The field is restored. Cellular repair becomes accessible. Children are given their futures back.",
    stat: ["120 yrs", "Reversible", "$0"],
    label: ["Restored lifespan", "Neurological outcomes", "Cost of suppression"],
    color: GOLD,
  },
};

export default function CampaignEarth() {
  const [light, setLight] = useState(false);
  const mode = light ? COPY.light : COPY.dark;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className="bs-card overflow-hidden relative"
      style={{ background: "#02060B", border: `1px solid ${light ? GOLD : "rgba(255,59,48,0.4)"}`, transition: "border-color 800ms ease" }}
    >
      <div className="relative" style={{ height: isMobile ? 300 : 420 }}>
        <EarthScene target={light ? 1 : 0} quality={isMobile ? "low" : "high"} />

        <div
          className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{ height: 150, background: "linear-gradient(to top, #02060B 15%, transparent)" }}
        />

        <div className="absolute top-3 left-3 right-3 pointer-events-none">
          <div className="font-display" style={{ fontSize: 10, color: mode.color, letterSpacing: "0.16em", transition: "color 800ms ease" }}>
            {mode.tag}
          </div>
          <div className="font-display mt-1" style={{ fontSize: isMobile ? 14 : 18, color: "#F2F6FA", lineHeight: 1.4, maxWidth: 520, textShadow: "0 2px 12px #02060B" }}>
            {mode.line}
          </div>
        </div>

        <div className="absolute left-3 right-3 flex flex-wrap gap-3" style={{ bottom: 66 }}>
          {mode.stat.map((s, i) => (
            <div key={mode.label[i]} style={{ minWidth: 96 }}>
              <div className="font-display" style={{ fontSize: isMobile ? 16 : 20, color: mode.color, transition: "color 800ms ease", textShadow: `0 0 18px ${mode.color}55` }}>{s}</div>
              <div className="font-body" style={{ fontSize: 9, color: "var(--text-muted)" }}>{mode.label[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle */}
      <div className="flex gap-2 p-3" style={{ borderTop: "1px solid var(--border)" }}>
        <button
          onClick={() => setLight(false)}
          className="font-display flex-1 rounded"
          style={{
            fontSize: 10, padding: "12px 10px", minHeight: 48, letterSpacing: "0.08em",
            color: light ? "var(--text-muted)" : "#FFF0EF",
            background: light ? "transparent" : "rgba(255,59,48,0.16)",
            border: `1px solid ${light ? "var(--border)" : "#FF3B30"}`,
            boxShadow: light ? "none" : "0 0 22px rgba(255,59,48,0.35)",
            transition: "all 500ms ease",
          }}
        >
          🔴 DARK TIMELINE
        </button>
        <button
          onClick={() => setLight(true)}
          className="font-display flex-1 rounded"
          style={{
            fontSize: 10, padding: "12px 10px", minHeight: 48, letterSpacing: "0.08em",
            color: light ? "#0B0803" : "var(--text-muted)",
            background: light ? GOLD : "transparent",
            border: `1px solid ${light ? GOLD : "var(--border)"}`,
            boxShadow: light ? `0 0 26px ${GOLD}66` : "none",
            transition: "all 500ms ease",
          }}
        >
          🌟 LIGHT TIMELINE
        </button>
      </div>
    </div>
  );
}