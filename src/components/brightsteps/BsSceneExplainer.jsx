import React, { useState } from "react";
import { BS_SYSTEM_BY_CODE } from "@/data/brightsteps";

// Toggleable "what's happening" card explaining the live simulation, incl. the spinning corona
export default function BsSceneExplainer({ activeCode, sessionActive }) {
  const [open, setOpen] = useState(false);
  const sys = BS_SYSTEM_BY_CODE[activeCode];
  return (
    <div className="absolute top-10 left-2 z-30 no-select flex flex-col items-start" style={{ maxWidth: "min(300px, calc(100% - 16px))" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="font-display rounded-md"
        style={{
          fontSize: 9, padding: "7px 10px", minHeight: 32, letterSpacing: "0.08em",
          color: open ? "#04121F" : "var(--sky)",
          background: open ? "var(--sky)" : "rgba(14,21,37,0.88)",
          border: "1px solid var(--sky)", backdropFilter: "blur(4px)",
        }}
      >
        ⓘ WHAT'S HAPPENING?
      </button>
      {open && (
        <div
          className="mt-1 p-2.5 rounded-md fade-in overflow-y-auto bs-scroll"
          style={{ background: "rgba(10,16,30,0.94)", border: "1px solid var(--border)", backdropFilter: "blur(6px)", maxHeight: 210 }}
        >
          <div className="font-display" style={{ fontSize: 8.5, color: "var(--sky)", letterSpacing: "0.12em" }}>
            LIVE SIMULATION GUIDE
          </div>
          <p className="font-body" style={{ fontSize: 10, color: "var(--text-primary)", lineHeight: 1.6, margin: "5px 0 0" }}>
            <b style={{ color: "#A78BFA" }}>Spinning energy rings (GSC):</b> the counter-rotating rings above the pod
            represent the Scalar Corona concept — paired field coils modeled spinning in opposite directions to
            visualize a low-intensity ambient field envelope around the pod. The spin speed shows simulated system
            activity: it idles slowly, and spins up when a session runs.
          </p>
          <p className="font-body" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.6, margin: "6px 0 0" }}>
            <b style={{ color: "var(--sky)" }}>Glowing spine column:</b> the 7 Nada resonators (NAD) — during a session,
            light cascades crown-to-root to show the acoustic sequence. <b style={{ color: "#FFD9A0" }}>Fireflies</b> are
            ambient particles for depth. <b style={{ color: "var(--teal)" }}>Pod glow color</b> follows the selected pod mode.
          </p>
          <p className="font-body" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.6, margin: "6px 0 0" }}>
            {sessionActive
              ? "▶ Session running — systems ignite in sequence and the corona is at full spin."
              : sys
                ? `Highlighted now: ${sys.name} (${activeCode}). Tap any pod component to select its system.`
                : "Tap any pod component to select its system."}
          </p>
          <div className="font-mono mt-1.5" style={{ fontSize: 7.5, color: "var(--text-muted)", lineHeight: 1.5 }}>
            Artistic concept rendering — not a measurement, not a medical device.
          </div>
        </div>
      )}
    </div>
  );
}