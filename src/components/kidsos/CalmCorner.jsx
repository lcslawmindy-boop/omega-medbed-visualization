import React, { useState, useEffect, useRef } from "react";
import { CALM_TOOLS } from "@/data/kidsos";
import { logEvent } from "@/lib/kidsLog";
import HoldButton from "./HoldButton";

export default function CalmCorner({ holdMs }) {
  const [tool, setTool] = useState(null);
  const [secs, setSecs] = useState(0);
  const startedAt = useRef(0);

  useEffect(() => {
    if (!tool) return;
    startedAt.current = Date.now();
    setSecs(0);
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [tool]);

  const finish = () => {
    logEvent({
      type: "calm_session",
      tool_used: tool.id,
      duration_seconds: Math.round((Date.now() - startedAt.current) / 1000),
    });
    setTool(null);
  };

  return (
    <section className="kids-card p-4">
      <h2 className="k-t-lg font-bold">Calm Corner</h2>
      {!tool ? (
        <div className="mt-3 grid gap-3 kids-gap" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
          {CALM_TOOLS.map((c) => (
            <HoldButton key={c.id} holdMs={holdMs} onActivate={() => setTool(c)} className="kids-card p-3 flex flex-col items-center" style={{ minHeight: 96 }}>
              <span className="k-emoji" aria-hidden="true">{c.icon}</span>
              <span className="k-t-md font-bold mt-1">{c.label}</span>
            </HoldButton>
          ))}
        </div>
      ) : (
        <div className="mt-3 flex flex-col items-center text-center">
          <span className="k-emoji kids-bounce" aria-hidden="true" style={{ fontSize: "calc(56px * var(--k-scale))" }}>{tool.icon}</span>
          <p className="k-t-lg font-bold mt-2">{tool.label}</p>
          <p className="k-t-md mt-1" style={{ color: "var(--k-muted)" }}>{tool.hint}</p>
          <p className="k-t-md mt-2" style={{ color: "var(--k-teal)" }}>{secs}s of calm 💙</p>
          <HoldButton holdMs={holdMs} onActivate={finish} className="kids-solid k-t-md font-bold px-5 mt-3" style={{ background: "var(--k-teal)", color: "#04121F", minHeight: 52 }}>
            I feel ready
          </HoldButton>
        </div>
      )}
    </section>
  );
}