import React, { useState, useEffect } from "react";
import Sparkline from "@/components/medbed/spec/Sparkline";
import { POD_MODES } from "@/data/brightsteps";

const seed = (base, jitter, n = 24) => Array.from({ length: n }, () => base + (Math.random() - 0.5) * jitter);

function Row({ label, value, unit, color, data }) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
      <span className="font-mono flex-none" style={{ fontSize: 8.5, color: "var(--text-muted)", width: 74 }}>{label}</span>
      <span className="font-mono flex-none text-right" style={{ fontSize: 11, color, width: 58 }}>{value}<span style={{ fontSize: 8, color: "var(--text-muted)" }}> {unit}</span></span>
      <div className="flex-1 min-w-0"><Sparkline data={data} color={color} width={90} height={20} /></div>
    </div>
  );
}

export default function BsSpecPanel({ podModeIdx, mobile }) {
  const [hrv, setHrv] = useState(seed(72, 8));
  const [coh, setCoh] = useState(seed(84, 10));
  const [gsr, setGsr] = useState(seed(2.1, 0.5));
  const [temp, setTemp] = useState(seed(36.7, 0.3));

  useEffect(() => {
    const id = setInterval(() => {
      setHrv((d) => [...d.slice(1), 72 + (Math.random() - 0.5) * 8]);
      setCoh((d) => [...d.slice(1), 84 + (Math.random() - 0.5) * 10]);
      setGsr((d) => [...d.slice(1), 2.1 + (Math.random() - 0.5) * 0.5]);
      setTemp((d) => [...d.slice(1), 36.7 + (Math.random() - 0.5) * 0.3]);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const mode = POD_MODES[podModeIdx];
  const content = (
    <>
      <div className="px-2.5 py-2" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="font-display text-sky" style={{ fontSize: 10, letterSpacing: "0.14em" }}>LIVE BIOMETRICS</div>
        <div className="font-mono" style={{ fontSize: 8, color: "var(--text-muted)" }}>KIDS-OS closed-loop · 100ms cycle · simulated</div>
      </div>
      <Row label="HRV" value={Math.round(hrv[hrv.length - 1])} unit="bpm" color="var(--coral)" data={hrv} />
      <Row label="COHERENCE" value={Math.round(coh[coh.length - 1])} unit="%" color="var(--green)" data={coh} />
      <Row label="GSR" value={gsr[gsr.length - 1].toFixed(2)} unit="μS" color="var(--teal)" data={gsr} />
      <Row label="CORE TEMP" value={temp[temp.length - 1].toFixed(1)} unit="°C" color="var(--amber)" data={temp} />

      <div className="px-2.5 py-2 mt-1" style={{ borderBottom: "1px solid var(--border)", borderTop: "1px solid var(--border)" }}>
        <div className="font-display text-sky" style={{ fontSize: 10, letterSpacing: "0.14em" }}>KIDS-OS DASHBOARD</div>
      </div>
      <div className="px-2.5 py-2 space-y-2">
        <div className="bs-card p-2.5" style={{ background: "var(--bg-card)" }}>
          <div className="flex items-center justify-between">
            <span className="font-kid font-bold" style={{ fontSize: 11, color: "var(--text-primary)" }}>😊 Calm State</span>
            <span className="font-mono" style={{ fontSize: 10, color: "var(--green)" }}>{Math.round(coh[coh.length - 1])}%</span>
          </div>
          <div className="mt-1.5 rounded-full overflow-hidden" style={{ height: 6, background: "var(--bg-elevated)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.round(coh[coh.length - 1])}%`, background: "linear-gradient(90deg, var(--teal), var(--green))" }} />
          </div>
        </div>
        <div className="bs-card p-2.5" style={{ background: "var(--bg-card)" }}>
          <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>ACTIVE POD MODE</div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: mode.color, boxShadow: `0 0 8px ${mode.color}` }} />
            <span className="font-display" style={{ fontSize: 10.5, color: mode.color, letterSpacing: "0.05em" }}>{mode.name.toUpperCase()}</span>
          </div>
          <div className="font-body mt-1" style={{ fontSize: 9, color: "var(--text-muted)" }}>{mode.blurb}</div>
        </div>
        <div className="bs-card p-2.5" style={{ background: "var(--bg-card)" }}>
          <div className="font-mono mb-1.5" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>BFAC SAFETY ENGINE</div>
          {["Fault detection", "Leakage monitor", "Thermal sensor bus", "E-stop interlock"].map((s) => (
            <div key={s} className="flex items-center justify-between py-0.5">
              <span className="font-body" style={{ fontSize: 9.5, color: "var(--text-primary)" }}>{s}</span>
              <span className="font-mono" style={{ fontSize: 8.5, color: "var(--green)" }}>● NOMINAL</span>
            </div>
          ))}
        </div>
        <div className="font-mono text-center py-1" style={{ fontSize: 7.5, color: "var(--text-muted)", lineHeight: 1.6 }}>
          Simulated concept telemetry — not real patient data
        </div>
      </div>
    </>
  );

  if (mobile) return <div className="bs-scroll">{content}</div>;
  return (
    <aside
      className="bs-edges fixed right-0 z-[90] hidden lg:flex flex-col overflow-y-auto bs-scroll no-select"
      style={{ width: 320, background: "var(--bg-panel)", borderLeft: "1px solid var(--border)" }}
    >
      {content}
    </aside>
  );
}