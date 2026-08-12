import React from "react";
import { OUTCOMES_CLINICIAN, OUTCOMES_PARENT } from "@/data/brightstepsSpec";

export default function TargetOutcomes({ mode }) {
  const parent = mode === "parent";
  const list = parent ? OUTCOMES_PARENT : OUTCOMES_CLINICIAN;
  return (
    <div>
      <div className="px-3 py-2 font-display text-sky" style={{ fontSize: 10, letterSpacing: "0.14em", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        TARGET THERAPEUTIC OUTCOMES
      </div>
      <div className="px-3 py-2">
        <div className="flex flex-wrap gap-1">
          {list.map((o, i) => {
            const c = i % 2 ? "var(--sky)" : "var(--teal)";
            return (
              <span
                key={o}
                className={`rounded-full px-2 py-0.5 ${parent ? "font-kid font-bold" : "font-body"}`}
                style={{ fontSize: 9, color: c, border: `1px solid ${c}66`, background: `${"transparent"}` }}
              >
                {o}
              </span>
            );
          })}
        </div>
        <p className="font-body italic mt-2 mb-0" style={{ fontSize: 8, color: "var(--amber)", lineHeight: 1.55 }}>
          Outcomes are therapeutic targets of the conceptual multi-system integration framework. No clinical claims are made. Individual results are not guaranteed. Research and IP development purposes only.
        </p>
      </div>
    </div>
  );
}