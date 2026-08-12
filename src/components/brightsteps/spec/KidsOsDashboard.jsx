import React, { useState, useEffect } from "react";
import SensorRow from "./SensorRow";
import BehaviorLog from "./BehaviorLog";
import { PROCESSORS } from "@/data/brightstepsSpec";

const seed = (base, jitter, n = 16) => Array.from({ length: n }, () => base + (Math.random() - 0.5) * jitter);
const fall = (from, to, n = 16) => Array.from({ length: n }, (_, i) => from + ((to - from) * i) / (n - 1) + (Math.random() - 0.5) * 0.2);

const SAFETY = [
  ["ACE SAFETY ENGINE", "● ARMED"],
  ["Pediatric parameter ceiling", "ACTIVE"],
  ["Adult modality limits", "LOCKED OUT"],
  ["Cutoff response", "<100ms"],
  ["Emergency parent alert", "● ENABLED"],
  ["Last safety test", "PASS ✓"],
];

export default function KidsOsDashboard() {
  const [hrv, setHrv] = useState(() => seed(52, 6));
  const [spo2, setSpo2] = useState(() => seed(99, 1));
  const [theta, setTheta] = useState(() => seed(68, 10));
  const [gsr, setGsr] = useState(() => fall(8.1, 6.4));
  const [temp, setTemp] = useState(() => seed(36.6, 0.15));
  const [secs, setSecs] = useState(18 * 60 + 24);

  useEffect(() => {
    const id = setInterval(() => {
      setHrv((d) => [...d.slice(1), 52 + (Math.random() - 0.5) * 6]);
      setSpo2((d) => [...d.slice(1), 99 + (Math.random() - 0.5) * 1]);
      setTheta((d) => [...d.slice(1), 68 + (Math.random() - 0.5) * 10]);
      setGsr((d) => [...d.slice(1), Math.max(5.8, d[d.length - 1] - 0.06 + (Math.random() - 0.5) * 0.15)]);
      setTemp((d) => [...d.slice(1), 36.6 + (Math.random() - 0.5) * 0.15]);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const last = (d) => d[d.length - 1];
  const clock = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;

  return (
    <div>
      <div className="px-3 py-2 font-display" style={{ fontSize: 10, color: "var(--green)", letterSpacing: "0.12em", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        KIDS-OS v2.4 — ACE CLOSED-LOOP AI
      </div>

      <div className="m-3 rounded-lg p-3" style={{ background: "var(--bg-card)", border: "1px solid var(--green)" }}>
        {/* Processors */}
        <div className="flex flex-wrap gap-1">
          {PROCESSORS.map((p) => (
            <span key={p} className="font-mono rounded px-1.5 py-0.5" style={{ fontSize: 8, color: "var(--text-muted)", background: "#050A14", border: "1px solid var(--border)" }}>
              {p}
            </span>
          ))}
        </div>

        {/* Patient profile */}
        <div className="flex flex-wrap gap-1 mt-2.5">
          <span className="font-display rounded-full px-2 py-0.5" style={{ fontSize: 8, color: "var(--sky)", border: "1px solid var(--sky)" }}>AGE GROUP: 7-9</span>
          <span className="font-display rounded-full px-2 py-0.5" style={{ fontSize: 8, color: "var(--teal)", border: "1px solid var(--teal)" }}>PROTOCOL: SENSORY REGULATION</span>
          <span className="font-mono rounded-full px-2 py-0.5" style={{ fontSize: 8, color: "var(--gold)", border: "1px solid var(--gold)" }}>SESSION: {clock} remaining</span>
        </div>

        {/* Sensors */}
        <div className="mt-2.5">
          <SensorRow label="HRV" value={`${Math.round(last(hrv))} ms`} data={hrv} color="var(--teal)" status="improving" statusColor="var(--green)" />
          <SensorRow label="SpO₂" value={`${Math.round(last(spo2))}%`} data={spo2} color="var(--sky)" status="normal" statusColor="var(--green)" />
          <SensorRow label="EEG θ/α" value={`theta dominant: ${Math.round(last(theta))}%`} data={theta} color="var(--violet)" status="calming" statusColor="var(--amber)" badge="THETA TRAINING ACTIVE" />
          <SensorRow label="GSR" value={`${last(gsr).toFixed(1)} μS`} data={gsr} color="var(--teal)" status="calming ↓" statusColor="var(--green)" />
          <SensorRow label="Skin Temp" value={`${last(temp).toFixed(1)}°C`} data={temp} color="var(--green)" status="normal" statusColor="var(--green)" />
        </div>

        <BehaviorLog />
      </div>

      {/* Safety engine */}
      <div className="mx-3 rounded-lg p-3" style={{ background: "rgba(52, 211, 153, 0.08)", border: "1px solid var(--green)" }}>
        {SAFETY.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-0.5 gap-2">
            <span className="font-body" style={{ fontSize: 9, color: "var(--text-primary)" }}>{k}</span>
            <span className="font-mono flex-none" style={{ fontSize: 8.5, color: "var(--green)" }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Pediatric lock warning */}
      <div className="m-3 rounded-lg p-2.5" style={{ background: "rgba(251, 191, 36, 0.08)", border: "1px solid var(--amber)" }}>
        <p className="font-body m-0" style={{ fontSize: 8.5, color: "var(--amber)", lineHeight: 1.6 }}>
          ⚠ KIDS-OS enforces pediatric-specific parameter ceilings. All adult Omega MedBed intensity limits are locked. Parameters are auto-scaled by age group. Manual override requires clinician authorization code.
        </p>
      </div>
    </div>
  );
}