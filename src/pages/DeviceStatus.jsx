import React, { useEffect, useState } from "react";
import PageShell from "@/components/shell/PageShell";
import SectionCard from "@/components/shell/SectionCard";
import StatusMetric from "@/components/status/StatusMetric";

const SENSORS = [
  { name: "HRV / PPG array", state: "CALIBRATED", drift: "0.4%" },
  { name: "EEG dry-electrode set (5ch)", state: "CALIBRATED", drift: "0.9%" },
  { name: "GSR skin conductance", state: "CALIBRATED", drift: "1.2%" },
  { name: "IR core temperature", state: "RE-CAL DUE", drift: "2.8%" },
  { name: "Scalar field coil probe", state: "CALIBRATED", drift: "0.6%" },
];

const jitter = (base, spread) => +(base + (Math.random() - 0.5) * spread).toFixed(1);

function SystemBlock({ name, accent, seed }) {
  const [m, setM] = useState({ power: seed.power, scalar: seed.scalar, thermal: seed.thermal, latency: seed.latency });

  useEffect(() => {
    const id = setInterval(() => {
      setM({
        power: jitter(seed.power, 1.2),
        scalar: jitter(seed.scalar, 2.4),
        thermal: jitter(seed.thermal, 0.8),
        latency: jitter(seed.latency, 6),
      });
    }, 1500);
    return () => clearInterval(id);
  }, [seed]);

  return (
    <SectionCard title={name} accent={accent} note="Simulated telemetry · 1.5 s refresh">
      <div className="grid gap-2 sm:grid-cols-2">
        <StatusMetric label="Power stability" value={m.power} unit="%" pct={m.power} color={accent} detail="Rail ripple within ±1.5% envelope" />
        <StatusMetric label="Scalar field connectivity" value={m.scalar} unit="%" pct={m.scalar} color="var(--teal, #2DD4BF)" detail="Coil phase lock · 7.83 Hz reference" />
        <StatusMetric label="Thermal headroom" value={m.thermal} unit="°C" pct={(m.thermal / 45) * 100} color="var(--amber, #F59E0B)" detail="Cutoff at 42 °C surface" />
        <StatusMetric label="Safety loop latency" value={m.latency} unit=" ms" pct={100 - m.latency} color="var(--green, #34D399)" detail="BFAC hard cutoff < 100 ms" />
      </div>
    </SectionCard>
  );
}

export default function DeviceStatus() {
  return (
    <PageShell title="DEVICE STATUS" subtitle="Power · sensor calibration · scalar field connectivity">
      <SystemBlock name="OMEGA MEDBED — OMB-Ω" accent="var(--gold, #C9A84C)" seed={{ power: 98.2, scalar: 94.5, thermal: 36.4, latency: 62 }} />
      <SystemBlock name="BRIGHTSTEPS BS-ATP-Ω" accent="var(--sky, #38BDF8)" seed={{ power: 99.1, scalar: 91.8, thermal: 34.1, latency: 48 }} />

      <SectionCard title="SENSOR CALIBRATION STATE" accent="var(--teal, #2DD4BF)">
        <div className="space-y-1.5">
          {SENSORS.map((s) => (
            <div key={s.name} className="bs-card flex items-center gap-2 px-3 py-2" style={{ background: "var(--bg-panel)" }}>
              <span className="font-body flex-1 min-w-0 truncate" style={{ fontSize: 10.5, color: "var(--text-primary)" }}>{s.name}</span>
              <span className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>drift {s.drift}</span>
              <span
                className="font-mono rounded"
                style={{
                  fontSize: 8, padding: "3px 7px",
                  color: s.state === "CALIBRATED" ? "var(--green, #34D399)" : "var(--amber, #F59E0B)",
                  border: `1px solid ${s.state === "CALIBRATED" ? "var(--green, #34D399)" : "var(--amber, #F59E0B)"}`,
                }}
              >
                {s.state}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}