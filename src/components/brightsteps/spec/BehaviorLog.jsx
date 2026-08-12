import React, { useState, useEffect, useRef } from "react";
import { LOG_TEMPLATES } from "@/data/brightstepsSpec";

const stamp = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
};

export default function BehaviorLog() {
  const [lines, setLines] = useState(() =>
    LOG_TEMPLATES.slice(0, 7).map((t) => `> ${stamp()} — ${t}`)
  );
  const boxRef = useRef(null);

  useEffect(() => {
    let i = 7;
    const id = setInterval(() => {
      const t = LOG_TEMPLATES[i % LOG_TEMPLATES.length];
      i += 1;
      setLines((l) => [...l.slice(-24), `> ${stamp()} — ${t}`]);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [lines]);

  return (
    <div className="mt-2">
      <div className="font-display mb-1" style={{ fontSize: 8.5, color: "var(--text-muted)", letterSpacing: "0.1em" }}>
        BEHAVIOR OBSERVATION LOG
      </div>
      <div
        ref={boxRef}
        className="bs-scroll overflow-y-auto rounded-md p-2"
        style={{ height: 90, background: "#050A14", border: "1px solid var(--border)" }}
      >
        {lines.map((l, i) => (
          <div key={i} className="font-mono" style={{ fontSize: 8, color: "var(--sky)", lineHeight: 1.7, whiteSpace: "nowrap" }}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}