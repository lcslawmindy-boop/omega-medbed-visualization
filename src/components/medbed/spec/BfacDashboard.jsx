import React, { useState, useEffect, useRef } from "react";
import Sparkline from "./Sparkline";

const PROCESSORS = ["ARM Cortex-A72", "STM32H7", "TensorFlow Lite"];

const LOG_TEMPLATES = [
  "HRV ↑ → PEMF Δ +2%",
  "SpO₂ stable → no adj",
  "EEG α ↑ → PBM Δ -3%",
  "GSR ↓ → FIT Δ +1°C",
  "NAD sync → CHM updated",
  "Cycle {n} — all nominal",
  "Skin temp nominal → no adj",
  "Phase lock confirmed → SFT stable",
  "H₂ flow nominal → HIT steady",
  "Orgone ΔT within band",
];

function makeInitialPoints(base, variance, n = 20) {
  return Array.from({ length: n }, () => base + (Math.random() - 0.5) * variance);
}

function SensorRow({ label, value, status, color, points }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="font-mono text-muted" style={{ fontSize: 9, width: 56 }}>{label}</div>
      <Sparkline points={points} color={color} width={60} height={18} />
      <div className="flex-1 font-mono text-right" style={{ fontSize: 10, color: "var(--text-primary)" }}>
        {value}
      </div>
      <div className="font-mono" style={{ fontSize: 8, color, width: 52, textAlign: "right" }}>● {status}</div>
    </div>
  );
}

export default function BfacDashboard() {
  const [hrv, setHrv] = useState(68);
  const [hrvPts, setHrvPts] = useState(() => makeInitialPoints(68, 6));
  const [spo2Pts, setSpo2Pts] = useState(() => makeInitialPoints(98, 1));
  const [eegPts, setEegPts] = useState(() => makeInitialPoints(2.8, 1.2));
  const [gsrPts, setGsrPts] = useState(() => makeInitialPoints(4.2, 0.6));
  const [tempPts, setTempPts] = useState(() => makeInitialPoints(36.8, 0.1));

  const [log, setLog] = useState(() => [
    "22:14:07 — HRV ↑ → PEMF Δ +2%",
    "22:14:15 — SpO₂ stable → no adj",
    "22:14:23 — EEG α ↑ → PBM Δ -3%",
    "22:14:31 — GSR ↓ → FIT Δ +1°C",
    "22:14:39 — Cycle 147 — all nominal",
    "22:14:47 — NAD sync → CHM updated",
  ]);
  const cycleRef = useRef(147);
  const logEndRef = useRef(null);

  // HRV updates every 3s
  useEffect(() => {
    const id = setInterval(() => {
      setHrv((v) => {
        const nv = Math.max(60, Math.min(76, v + (Math.random() - 0.5) * 4));
        setHrvPts((p) => [...p.slice(1), nv]);
        return nv;
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Other sensors: gentle drift every 4s
  useEffect(() => {
    const id = setInterval(() => {
      setSpo2Pts((p) => [...p.slice(1), 98 + (Math.random() - 0.5) * 0.8]);
      setEegPts((p) => [...p.slice(1), 2.8 + (Math.random() - 0.5) * 1.2]);
      setGsrPts((p) => [...p.slice(1), 4.2 + (Math.random() - 0.5) * 0.6]);
      setTempPts((p) => [...p.slice(1), 36.8 + (Math.random() - 0.5) * 0.15]);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Dosimetry log appends every 8s
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      const ts = now.toTimeString().slice(0, 8);
      const tpl = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      const msg = tpl.includes("{n}") ? tpl.replace("{n}", String(cycleRef.current++)) : tpl;
      setLog((l) => [...l, `${ts} — ${msg}`].slice(-40));
    }, 8000);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll log to bottom
  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollTop = logEndRef.current.scrollHeight;
  }, [log]);

  return (
    <div className="px-4 py-3">
      <div className="font-display uppercase mb-2" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--green)" }}>
        BFAC+ACE Closed-Loop AI
      </div>

      <div className="rounded-sm p-3 border" style={{ borderColor: "var(--green)", background: "rgba(16,185,129,0.04)" }}>
        {/* Processor badges */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {PROCESSORS.map((p) => (
            <span
              key={p}
              className="font-mono rounded-sm"
              style={{ fontSize: 8, padding: "2px 6px", background: "var(--bg-elevated)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Sensors */}
        <div className="border-t border-soft pt-1" style={{ borderColor: "var(--border)" }}>
          <SensorRow label="HRV" value={`${hrv.toFixed(0)} ms`} status="normal" color="var(--green)" points={hrvPts} />
          <SensorRow label="SpO₂" value="98%" status="normal" color="var(--green)" points={spo2Pts} />
          <SensorRow label="EEG α/θ" value="2.8:1 ratio" status="training" color="var(--gold)" points={eegPts} />
          <SensorRow label="GSR" value="4.2 μS" status="normal" color="var(--green)" points={gsrPts} />
          <SensorRow label="Skin Temp" value="36.8°C" status="normal" color="var(--green)" points={tempPts} />
        </div>

        {/* Dosimetry log terminal */}
        <div className="mt-2.5">
          <div className="font-mono text-muted uppercase mb-1" style={{ fontSize: 8, letterSpacing: "0.1em" }}>
            Dosimetry Adaptation Log
          </div>
          <div
            ref={logEndRef}
            className="font-mono scroll-dark"
            style={{
              fontSize: 8,
              height: 80,
              overflowY: "auto",
              background: "#040a07",
              border: "1px solid var(--border)",
              borderRadius: 3,
              padding: 6,
              color: "var(--green)",
              lineHeight: 1.5,
            }}
          >
            {log.map((line, i) => (
              <div key={i}>&gt; {line}</div>
            ))}
          </div>
        </div>

        {/* Safety engine */}
        <div
          className="mt-2.5 rounded-sm p-2.5 font-mono"
          style={{ background: "rgba(16,185,129,0.08)", border: "1px solid var(--green)", color: "var(--green)", fontSize: 9, lineHeight: 1.6 }}
        >
          <div className="font-display" style={{ fontSize: 9, letterSpacing: "0.08em" }}>SAFETY ENGINE: ● ARMED</div>
          <div>Cutoff threshold: &lt;100ms</div>
          <div>Monitored channels: 18</div>
          <div>Last cutoff test: PASS</div>
        </div>
      </div>
    </div>
  );
}