import React, { useEffect, useState } from "react";
import { FUNDING } from "@/data/campaignDonation";

function useCount(target, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    let raf;
    const step = (t) => {
      const p = Math.min((t - t0) / ms, 1);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

export default function FundingProgress() {
  const raised = useCount(FUNDING.phase1Raised);
  const [fill, setFill] = useState(0);
  const pct = (FUNDING.phase1Raised / FUNDING.phase1Goal) * 100;
  const missionPct = (FUNDING.missionRaised / FUNDING.missionGoal) * 100;

  useEffect(() => {
    const t = setTimeout(() => setFill(1), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="bs-card p-4"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.16) 0%, rgba(7,11,20,0) 65%), var(--bg-panel)",
        border: "1px solid rgba(201,168,76,0.35)",
      }}
    >
      <div className="font-display text-center" style={{ fontSize: 14, color: "var(--gold)", letterSpacing: "0.16em" }}>
        FUND THE LIGHT TIMELINE
      </div>
      <p
        className="font-display text-center mx-auto"
        style={{ fontSize: 18, color: "var(--text-primary)", lineHeight: 1.4, margin: "8px auto 0", maxWidth: 620 }}
      >
        Every dollar directly accelerates prototype development, patent filing, and clinical trials.
      </p>

      <div className="mt-5">
        <div className="flex justify-between items-baseline gap-2">
          <span className="font-display" style={{ fontSize: 10.5, color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            PHASE 1 GOAL: ${FUNDING.phase1Goal.toLocaleString()}
          </span>
          <span className="font-display" style={{ fontSize: 15, color: "var(--gold)" }}>
            ${raised.toLocaleString()} raised
          </span>
        </div>
        <div className="mt-2 rounded-full overflow-hidden" style={{ height: 16, background: "#0A1120", border: "1px solid var(--border)" }}>
          <div
            style={{
              height: "100%",
              width: `${fill * pct}%`,
              background: "linear-gradient(90deg, #8A6E2E 0%, #C9A84C 70%, #F2DC9B 100%)",
              boxShadow: "0 0 14px rgba(201,168,76,0.75)",
              transition: "width 1600ms cubic-bezier(.2,.7,.2,1)",
            }}
          />
        </div>
        <div className="font-display mt-2" style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em" }}>
          {pct.toFixed(1)}% FUNDED · {FUNDING.donors} DONORS · {FUNDING.daysRemaining} DAYS REMAINING
        </div>
      </div>

      <div className="mt-4">
        <div className="font-body" style={{ fontSize: 10, color: "var(--text-muted)" }}>
          5-Year Mission: ${(FUNDING.missionGoal / 1e6).toFixed(1)}M needed | ${FUNDING.missionRaised.toLocaleString()} raised to date | {missionPct.toFixed(2)}% of total
        </div>
        <div className="mt-1.5 rounded-full overflow-hidden" style={{ height: 7, background: "#0A1120", border: "1px solid var(--border)" }}>
          <div
            style={{
              height: "100%",
              width: `${fill * Math.max(missionPct, 0.4)}%`,
              background: "rgba(201,168,76,0.5)",
              transition: "width 1800ms ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
}