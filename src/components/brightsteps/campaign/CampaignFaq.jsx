import React, { useState } from "react";
import { CAMPAIGN_FAQ } from "@/data/brightstepsCampaign";

export default function CampaignFaq() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <div className="font-display text-sky mb-1.5" style={{ fontSize: 10, letterSpacing: "0.14em" }}>CAMPAIGN FAQ · RISKS & CHALLENGES</div>
      <div className="space-y-1.5">
        {CAMPAIGN_FAQ.map((f, i) => (
          <div key={f.q} className="bs-card overflow-hidden" style={{ background: "var(--bg-panel)" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left px-3 py-2.5 flex items-center gap-2"
              style={{ minHeight: 42 }}
            >
              <span className="font-body flex-1" style={{ fontSize: 10.5, color: "var(--text-primary)" }}>{f.q}</span>
              <span className="font-mono" style={{ fontSize: 12, color: "var(--sky)" }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div className="font-body px-3 pb-2.5" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.6 }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}