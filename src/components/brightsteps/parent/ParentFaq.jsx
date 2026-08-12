import React, { useState } from "react";
import { PARENT_FAQ } from "@/data/brightstepsProtocols";

export default function ParentFaq() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <div className="font-kid font-bold mb-2" style={{ fontSize: 13, color: "var(--sky)" }}>
        Parent frequently asked questions
      </div>
      <div className="space-y-1.5">
        {PARENT_FAQ.map(([q, a], i) => {
          const on = open === i;
          return (
            <div key={q} className="bs-card" style={{ background: "var(--bg-card)", borderRadius: 16, overflow: "hidden" }}>
              <button
                onClick={() => setOpen(on ? null : i)}
                className="w-full flex items-center gap-2 text-left p-3"
                style={{ minHeight: 44 }}
              >
                <span className="font-kid font-bold flex-1" style={{ fontSize: 12.5, color: "var(--text-primary)" }}>{q}</span>
                <span className="flex-none" style={{ fontSize: 13, color: "var(--sky)" }}>{on ? "−" : "+"}</span>
              </button>
              {on && (
                <p className="font-body m-0 px-3 pb-3" style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>{a}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}