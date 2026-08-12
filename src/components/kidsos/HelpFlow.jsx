import React, { useState } from "react";
import { HELP_CATEGORIES, TRUSTED_ADULTS, RESPONSE_CARDS } from "@/data/kidsos";
import { logEvent } from "@/lib/kidsLog";
import HoldButton from "./HoldButton";

export default function HelpFlow({ holdMs, onClose }) {
  const [category, setCategory] = useState(null);
  const [sent, setSent] = useState(false);

  const send = (adult) => {
    logEvent({
      type: "help_request",
      category: category.id,
      trusted_adult_requested: adult,
      alert_sent: true,
    });
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3" style={{ background: "rgba(2, 10, 20, 0.82)" }}>
      <div className="kids-card w-full p-4" style={{ maxWidth: 560, maxHeight: "88vh", overflowY: "auto" }}>
        {sent ? (
          <div className="text-center py-4">
            <span className="k-emoji kids-bounce" aria-hidden="true" style={{ fontSize: "calc(52px * var(--k-scale))" }}>💙</span>
            <p className="k-t-xl font-bold mt-2">You are brave for asking for help! 💙</p>
            <p className="k-t-md mt-2" style={{ color: "var(--k-muted)" }}>A grown-up has been told. Help is coming.</p>
            <div className="kids-card p-3 mt-4 text-left">
              <div className="k-t-sm font-bold" style={{ color: "var(--k-sky)" }}>FOR THE GROWN-UP — SUGGESTED RESPONSES</div>
              <ul className="mt-2 space-y-1" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {RESPONSE_CARDS.slice(0, 4).map((r) => (
                  <li key={r} className="k-t-sm" style={{ color: "var(--k-muted)" }}>› {r}</li>
                ))}
              </ul>
            </div>
            <HoldButton holdMs={holdMs} onActivate={onClose} className="kids-solid k-t-md font-bold px-6 mt-4" style={{ background: "var(--k-sky)", color: "#04121F", minHeight: 52 }}>
              Okay
            </HoldButton>
          </div>
        ) : !category ? (
          <>
            <h2 className="k-t-xl font-bold">What is happening?</h2>
            <div className="mt-3 grid gap-3 kids-gap" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
              {HELP_CATEGORIES.map((c) => (
                <HoldButton key={c.id} holdMs={holdMs} onActivate={() => setCategory(c)} className="kids-card p-3 flex flex-col items-center" style={{ minHeight: 100 }}>
                  <span className="k-emoji" aria-hidden="true">{c.icon}</span>
                  <span className="k-t-md font-bold mt-1 text-center">{c.label}</span>
                </HoldButton>
              ))}
            </div>
            <button type="button" onClick={onClose} className="kids-tap k-t-sm mt-4 px-3" style={{ color: "var(--k-muted)", minHeight: 44 }}>
              I am okay now
            </button>
          </>
        ) : (
          <>
            <h2 className="k-t-xl font-bold">Who should I tell?</h2>
            <div className="mt-3 grid gap-3 kids-gap" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
              {TRUSTED_ADULTS.map((a) => (
                <HoldButton key={a} holdMs={holdMs} onActivate={() => send(a)} className="kids-card p-3 flex flex-col items-center" style={{ minHeight: 92 }}>
                  <span className="k-emoji" aria-hidden="true">🧡</span>
                  <span className="k-t-md font-bold mt-1">{a}</span>
                </HoldButton>
              ))}
            </div>
            <HoldButton holdMs={holdMs} onActivate={() => send("any grown-up")} className="kids-solid k-t-md font-bold w-full mt-3" style={{ background: "var(--k-sky)", color: "#04121F", minHeight: 52 }}>
              Tell any grown-up now
            </HoldButton>
          </>
        )}
      </div>
    </div>
  );
}