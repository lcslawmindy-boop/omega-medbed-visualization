import React, { useState } from "react";
import { EMOTIONS } from "@/data/kidsos";
import { logEvent } from "@/lib/kidsLog";
import HoldButton from "./HoldButton";
import { playCue } from "@/lib/kidsSound";

export default function EmotionCheckin({ holdMs, sound }) {
  const [picked, setPicked] = useState(null);
  const [saved, setSaved] = useState(false);

  const save = (intensity) => {
    logEvent({ type: "emotion_checkin", emotion: picked.id, intensity, location_context: "home" });
    playCue("emotion", sound);
    setSaved(true);
    setTimeout(() => { setSaved(false); setPicked(null); }, 2200);
  };

  return (
    <section className="kids-card p-4">
      <h2 className="k-t-lg font-bold">How I feel</h2>
      {saved ? (
        <p className="k-t-md mt-2" style={{ color: "var(--k-teal)" }}>Thank you for telling me 💙</p>
      ) : !picked ? (
        <div className="mt-3 grid gap-3 kids-gap" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))" }}>
          {EMOTIONS.map((e) => (
            <HoldButton
              key={e.id}
              holdMs={holdMs}
              onActivate={() => setPicked(e)}
              className="kids-card p-3 flex flex-col items-center"
              style={{ minHeight: 92 }}
            >
              <span className="k-emoji" aria-hidden="true">{e.icon}</span>
              <span className="k-t-sm font-bold mt-1" style={{ color: e.color }}>{e.label}</span>
            </HoldButton>
          ))}
        </div>
      ) : (
        <div className="mt-3">
          <p className="k-t-md">How big is <strong>{picked.label.toLowerCase()}</strong> right now?</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {[1, 2, 3, 4, 5].map((n) => (
              <HoldButton
                key={n}
                holdMs={holdMs}
                onActivate={() => save(n)}
                className="kids-solid k-t-lg font-bold flex-1"
                style={{ background: picked.color, color: "#04121F", minHeight: 60, minWidth: 60 }}
              >
                {n}
              </HoldButton>
            ))}
          </div>
          <button type="button" onClick={() => setPicked(null)} className="kids-tap k-t-sm mt-3 px-3" style={{ color: "var(--k-muted)", minHeight: 44 }}>
            ← pick a different feeling
          </button>
        </div>
      )}
    </section>
  );
}