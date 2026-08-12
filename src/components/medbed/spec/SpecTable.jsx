import React, { useState, useEffect, useRef } from "react";

const ROWS = [
  ["Designator", "ZA-MB-Ω"],
  ["Active Modalities", "18"],
  ["BOM Line Items", "94"],
  ["Total Components", "1,284"],
  ["Assembly Hours", "166h"],
  ["Length", "2,400 mm"],
  ["Width", "1,600 mm"],
  ["Height", "1,800 mm"],
  ["Int. Chamber", "2,100×900×500 mm"],
  ["Total Mass", "≤ 1,200 kg"],
  ["Max Power", "3.5 kW"],
  ["Power Input", "120/240V 30A"],
  ["Max Patient", "180 kg"],
  ["Safety Cutoff", "< 100 ms"],
  ["Freq. Precision", "± 0.01 Hz"],
  ["PBM Irradiance", "100-120 mW/cm²"],
  ["PEMF Uniformity", "± 5%"],
  ["TRZ Ratio", "> 0.8"],
  ["Vortex Temp", "4.0°C ± 0.5°C"],
  ["Orgone ΔT", "≥ 1.0°F / 30 min"],
  ["EEG Channels", "19-ch 10-20"],
  ["Biometric Inputs", "5 channels"],
  ["AI Cycle", "100 ms"],
  ["H₂ Purity", "99.99%"],
  ["Ion Density", "10⁶–10⁷ ions/cm³"],
  ["Session Range", "30s – 45 min"],
];

function CountUp({ value, delay }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const groups = String(value).match(/\d[\d,]*\.?\d*/g);
    if (!groups || groups.length !== 1) {
      setDisplay(value);
      return;
    }
    const raw = groups[0];
    const target = parseFloat(raw.replace(/,/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].replace(/\D/g, "").length : 0;
    const prefix = String(value).slice(0, String(value).indexOf(raw));
    const suffix = String(value).slice(String(value).indexOf(raw) + raw.length);
    const isInt = decimals === 0;

    let raf;
    const begin = setTimeout(() => {
      const start = performance.now();
      const dur = 1200;
      const step = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = target * eased;
        const formatted = isInt ? Math.round(cur).toLocaleString() : cur.toFixed(decimals);
        setDisplay(`${prefix}${formatted}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(step);
        else setDisplay(`${prefix}${isInt ? Math.round(target).toLocaleString() : target.toFixed(decimals)}${suffix}`);
      };
      raf = requestAnimationFrame(step);
    }, delay);

    return () => { clearTimeout(begin); cancelAnimationFrame(raf); };
  }, [value, delay]);

  return <>{display}</>;
}

export default function SpecTable() {
  return (
    <div className="px-4 py-3">
      <div className="font-display text-gold uppercase mb-2" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
        System Specifications
      </div>
      <div className="rounded-sm overflow-hidden border border-soft" style={{ borderColor: "var(--border)" }}>
        {ROWS.map(([k, v], i) => (
          <div
            key={k}
            className="flex items-center font-mono"
            style={{
              fontSize: 10,
              height: 28,
              background: i % 2 === 0 ? "var(--bg-panel)" : "var(--bg-elevated)",
            }}
          >
            <div className="flex-1 px-3 text-muted">{k}</div>
            <div className="px-3 text-right" style={{ color: "var(--gold)" }}>
              <CountUp value={v} delay={i * 70} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}