import React from "react";
import { PARENT_TIMELINE } from "@/data/brightstepsProtocols";

export default function ParentTimeline() {
  return (
    <div>
      <div className="font-kid font-bold mb-2" style={{ fontSize: 13, color: "var(--sky)" }}>What to expect, step by step</div>
      <div className="flex gap-2 overflow-x-auto bs-scroll pb-2">
        {PARENT_TIMELINE.map(([icon, phase, text], i) => (
          <div key={phase} className="bs-card flex-none p-3" style={{ width: 170, background: "var(--bg-card)", borderRadius: 16 }}>
            <div style={{ fontSize: 20 }}>{icon}</div>
            <div className="font-kid font-bold mt-1" style={{ fontSize: 12, color: "var(--sky)" }}>{i + 1}. {phase}</div>
            <p className="font-kid m-0 mt-1" style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}