import React, { useState, useEffect } from "react";

const W = 240;
const H = 28;
const N = 40;

function buildPath(data) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  return data
    .map((v, i) => {
      const x = (i / (N - 1)) * W;
      const y = H - ((v - min) / span) * (H - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function KidsOsWidget() {
  const [data, setData] = useState(() =>
    Array.from({ length: N }, (_, i) => 72 + Math.sin(i * 0.45) * 5 + (Math.random() - 0.5) * 2)
  );

  useEffect(() => {
    let t = N;
    const id = setInterval(() => {
      t += 1;
      setData((d) => [...d.slice(1), 72 + Math.sin(t * 0.45) * 5 + (Math.random() - 0.5) * 2]);
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-md p-2.5" style={{ background: "var(--bg-card)", border: "1px solid var(--green)" }}>
      <div className="font-body flex items-center gap-1.5" style={{ fontSize: 10, color: "var(--green)" }}>
        <span className="bs-pulse inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} />
        KIDS-OS v2.4 ONLINE
      </div>
      <div className="font-body mt-0.5" style={{ fontSize: 9, color: "var(--green)" }}>ACE SYNC: ● ACTIVE</div>
      <div className="font-body" style={{ fontSize: 9, color: "var(--text-muted)" }}>Biometric inputs: 5 channels</div>
      <div className="font-body" style={{ fontSize: 9, color: "var(--text-muted)" }}>Adaptation cycle: 100ms</div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} className="mt-1.5 block" aria-hidden="true">
        <path d={buildPath(data)} fill="none" stroke="var(--sky)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}