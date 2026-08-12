import React, { useState, useEffect } from "react";
import Sparkline from "@/components/medbed/spec/Sparkline";

const HISTORY = 24;

function makeInitial(base, variance, n = HISTORY) {
  return Array.from({ length: n }, () => base + (Math.random() - 0.5) * variance);
}

function Row({ label, value, status, color, points }) {
  return (
    <div className="flex items-center gap-2">
      <div className="font-mono text-muted" style={{ fontSize: 8.5, width: 48 }}>{label}</div>
      <Sparkline points={points} color={color} width={72} height={20} />
      <div className="flex-1 text-right">
        <div className="font-mono" style={{ fontSize: 10, color: "var(--text-primary)" }}>{value}</div>
        <div className="font-mono" style={{ fontSize: 7.5, color: status.color }}>● {status.label}</div>
      </div>
    </div>
  );
}

// Dynamic telemetry dashboard overlay — tracks power stability, scalar field
// intensity, and thermal output in real time, derived from the live power ramp.
export default function TelemetryOverlay({ active, power }) {
  const [powerPts, setPowerPts] = useState(() => makeInitial(0, 2));
  const [scalarPts, setScalarPts] = useState(() => makeInitial(0, 0.4));
  const [thermalPts, setThermalPts] = useState(() => makeInitial(22, 0.6));

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      const p = power;
      // Power stability (%) — noise shrinks as power climbs toward full lock
      const pNoise = (1 - p * 0.7) * 3;
      const pVal = Math.max(0, Math.min(100, p * 100 + (Math.random() - 0.5) * pNoise));
      // Scalar field intensity (mT) — 0 → 12 mT with power
      const sVal = Math.max(0, p * 12 + (Math.random() - 0.5) * 0.5);
      // Thermal output (°C) — ambient 22°C → operating ~38°C
      const tVal = 22 + p * 16 + (Math.random() - 0.5) * 0.5;
      setPowerPts((a) => [...a.slice(1), pVal]);
      setScalarPts((a) => [...a.slice(1), sVal]);
      setThermalPts((a) => [...a.slice(1), tVal]);
    }, 450);
    return () => clearInterval(id);
  }, [active, power]);

  if (!active) return null;

  const pNow = powerPts[powerPts.length - 1] ?? 0;
  const sNow = scalarPts[scalarPts.length - 1] ?? 0;
  const tNow = thermalPts[thermalPts.length - 1] ?? 22;

  const pStatus = pNow > 98 ? { label: "LOCKED", color: "var(--green)" } : pNow > 60 ? { label: "STABLE", color: "var(--gold)" } : { label: "RAMP", color: "var(--amber)" };
  const sStatus = sNow > 11 ? { label: "PEAK", color: "var(--violet)" } : sNow > 6 ? { label: "ONLINE", color: "var(--gold)" } : { label: "SPIN-UP", color: "var(--amber)" };
  const tStatus = tNow > 37 ? { label: "NOMINAL", color: "var(--green)" } : tNow > 30 ? { label: "RISING", color: "var(--gold)" } : { label: "WARMING", color: "var(--amber)" };

  return (
    <div
      className="absolute z-10 rounded-sm fade-in"
      style={{ left: 12, bottom: 12, width: 236, background: "rgba(0,4,8,0.86)", border: "1px solid var(--gold-dim)", backdropFilter: "blur(6px)" }}
    >
      <div className="flex items-center justify-between px-2.5 py-1.5 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="font-display text-gold" style={{ fontSize: 9, letterSpacing: "0.14em" }}>LIVE TELEMETRY</span>
        <span className="flex items-center gap-1 font-mono" style={{ fontSize: 8, color: "var(--green)" }}>
          <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} />
          REC
        </span>
      </div>
      <div className="px-2.5 py-2 space-y-1.5">
        <Row label="PWR STAB" value={`${pNow.toFixed(1)}%`} status={pStatus} color="var(--gold)" points={powerPts} />
        <Row label="SCALAR φ" value={`${sNow.toFixed(2)} mT`} status={sStatus} color="var(--violet)" points={scalarPts} />
        <Row label="THERMAL" value={`${tNow.toFixed(1)}°C`} status={tStatus} color="var(--amber)" points={thermalPts} />
      </div>
      <div className="px-2.5 py-1 border-t font-mono text-muted flex justify-between" style={{ fontSize: 7.5, borderColor: "var(--border)" }}>
        <span>SAMPLE 450ms</span>
        <span>BFAC+ACE</span>
      </div>
    </div>
  );
}