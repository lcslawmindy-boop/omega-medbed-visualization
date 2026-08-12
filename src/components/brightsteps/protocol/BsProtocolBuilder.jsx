import React, { useState, useEffect } from "react";
import { AGE_GROUPS } from "@/data/brightstepsNav";
import { BS_PROTOCOLS, ASD_PROFILES, DEFAULT_ON, T3_CODES } from "@/data/brightstepsProtocols";
import { BS_POWER } from "@/data/brightstepsSpec";
import { generateBsPackage } from "@/lib/bsSpecReport";
import ProtocolCard from "./ProtocolCard";
import SystemToggles from "./SystemToggles";
import ClinicianGate from "./ClinicianGate";
import BsToast from "../BsToast";

const WATTS = Object.fromEntries(BS_POWER.map((p) => [p.code, p.watts]));
const initialOn = () =>
  Object.fromEntries([...DEFAULT_ON.map((c) => [c, true]), ...T3_CODES.map((c) => [c, false])]);

function Pill({ label, on, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="font-display rounded-full transition-colors"
      style={{
        fontSize: 9, padding: "6px 10px", minHeight: 32, letterSpacing: "0.05em",
        color: on ? "#04121F" : color, background: on ? color : "transparent", border: `1px solid ${color}`,
      }}
    >
      {label}
    </button>
  );
}

function Toggle({ label, on, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-2 py-1.5 text-left" style={{ minHeight: 32 }}>
      <span className="flex-none rounded" style={{ width: 14, height: 14, border: "1px solid var(--sky)", background: on ? "var(--sky)" : "transparent", color: "#04121F", fontSize: 10, lineHeight: "13px", textAlign: "center" }}>
        {on ? "✓" : ""}
      </span>
      <span className="font-body" style={{ fontSize: 10, color: "var(--text-primary)" }}>{label}</span>
    </button>
  );
}

export default function BsProtocolBuilder({ open, onClose, onStart }) {
  const [age, setAge] = useState(null);
  const [ageBanner, setAgeBanner] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [protoId, setProtoId] = useState(null);
  const [on, setOn] = useState(initialOn);
  const [dur, setDur] = useState(25);
  const [adaptive, setAdaptive] = useState(true);
  const [alerts, setAlerts] = useState({ start: true, complete: true, safety: true, feed: false });
  const [gateOpen, setGateOpen] = useState(false);
  const [override, setOverride] = useState(false);
  const [ageToast, setAgeToast] = useState(false);
  const [authLog, setAuthLog] = useState([]);
  const [manual, setManual] = useState(60);

  useEffect(() => {
    if (open && !age) setAgeToast(true);
  }, [open, age]);

  useEffect(() => {
    if (!age) return;
    setAgeBanner(`KIDS-OS loading ${age} yrs parameter set...`);
    const id = setTimeout(() => setAgeBanner(`✓ ${age} yrs parameters loaded`), 900);
    return () => clearTimeout(id);
  }, [age]);

  const proto = BS_PROTOCOLS.find((p) => p.id === protoId);
  const custom = protoId === "F";
  const codes = custom ? Object.keys(on).filter((c) => on[c]) : proto ? [...proto.systems, "BIO"] : [];
  const watts = codes.reduce((s, c) => s + (WATTS[c] || 0), 0);
  const pct = Math.min((watts / 1200) * 100, 100);
  const barColor = watts > 1150 ? "var(--coral)" : watts > 1000 ? "var(--amber)" : "var(--sky)";

  const saveJson = () => {
    const blob = new Blob([JSON.stringify({ device: "BS-ATP-Ω", age, profiles, protocol: proto ? proto.name : null, duration_min: dur, systems: codes, adaptive, alerts, est_watts: watts, clinician_override: override, manual_intensity: override ? manual : null, authorization_log: authLog }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "BS-ATP-Omega_protocol.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[190]" style={{ background: "rgba(7,11,20,0.6)" }} onClick={onClose} />
      <aside
        className="bs-edges bs-scroll fixed right-0 z-[195] overflow-y-auto"
        style={{ width: 320, maxWidth: "100vw", background: "var(--bg-elevated)", borderLeft: "2px solid var(--sky)" }}
      >
        <div className="flex items-center gap-2 p-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <svg width="16" height="16" viewBox="0 0 22 22" aria-hidden="true">
            <circle cx="11" cy="11" r="10" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="11" cy="7.5" r="2.4" fill="#38BDF8" />
            <path d="M7 16.5c0-2.6 1.8-4.2 4-4.2s4 1.6 4 4.2" fill="#38BDF8" />
          </svg>
          <span className="font-display flex-1 text-sky" style={{ fontSize: 12, letterSpacing: "0.07em" }}>SESSION PROTOCOL BUILDER</span>
          {override && (
            <span className="font-display rounded-full px-2 py-1" style={{ fontSize: 8, color: "var(--amber)", border: "1px solid var(--amber)", letterSpacing: "0.06em" }}>
              ● CLINICIAN OVERRIDE ACTIVE
            </span>
          )}
          <button onClick={onClose} className="text-sky" style={{ fontSize: 14, minWidth: 32, minHeight: 32 }} aria-label="Close">✕</button>
        </div>

        <div className="p-3 space-y-4">
          {/* PATIENT SETUP */}
          <div>
            <div className="font-display text-sky mb-1.5" style={{ fontSize: 9.5, letterSpacing: "0.12em" }}>AGE GROUP (REQUIRED)</div>
            <div id="bs-age-pills" className="flex flex-wrap gap-1.5">
              {AGE_GROUPS.map((a) => (
                <Pill key={a} label={`${a} yrs`} on={age === a} color="var(--sky)" onClick={() => setAge(a)} />
              ))}
            </div>
            {ageBanner && (
              <div className="font-mono mt-1.5 rounded-md px-2 py-1" style={{ fontSize: 9, color: "var(--sky)", background: "rgba(56,189,248,0.1)" }}>{ageBanner}</div>
            )}
          </div>

          {/* ASD PROFILE */}
          <div>
            <div className="font-display mb-1.5" style={{ fontSize: 9.5, color: "var(--teal)", letterSpacing: "0.12em" }}>CHILD'S PRIMARY PROFILE</div>
            <div className="flex flex-wrap gap-1.5">
              {ASD_PROFILES.map((p) => (
                <Pill
                  key={p}
                  label={p}
                  on={profiles.includes(p)}
                  color="var(--teal)"
                  onClick={() => setProfiles((l) => (l.includes(p) ? l.filter((x) => x !== p) : [...l, p]))}
                />
              ))}
            </div>
          </div>

          {/* PROTOCOL SELECTOR */}
          {!age ? (
            <div className="font-body rounded-md p-2" style={{ fontSize: 9.5, color: "var(--amber)", border: "1px solid var(--amber)" }}>
              Select an age group to load protocols.
            </div>
          ) : (
            <div>
              <div className="font-display text-sky mb-1.5" style={{ fontSize: 9.5, letterSpacing: "0.12em" }}>PROTOCOL — {age} YRS</div>
              <div className="space-y-1.5">
                {BS_PROTOCOLS.map((p) => (
                  <ProtocolCard
                    key={p.id}
                    p={p}
                    selected={protoId === p.id}
                    onSelect={(id) => { setProtoId(id); const q = BS_PROTOCOLS.find((x) => x.id === id); if (q && q.dur) setDur(q.dur); }}
                  />
                ))}
              </div>
            </div>
          )}

          {custom && <SystemToggles on={on} onToggle={(c) => setOn((o) => ({ ...o, [c]: !o[c] }))} />}

          {/* DURATION */}
          <div>
            <div className="font-display text-sky mb-1" style={{ fontSize: 9.5, letterSpacing: "0.12em" }}>SESSION DURATION</div>
            <div className="font-display text-sky" style={{ fontSize: 16 }}>SESSION: {String(dur).padStart(2, "0")}:00</div>
            <input
              type="range" min={15} max={45} value={dur}
              onChange={(e) => setDur(Number(e.target.value))}
              className="w-full mt-1" style={{ accentColor: "var(--sky)" }}
              aria-label="Session duration"
            />
            <div className="font-mono flex justify-between" style={{ fontSize: 8, color: "var(--text-muted)" }}><span>15 min</span><span>45 min</span></div>
          </div>

          {/* ADAPTATION */}
          <div>
            <div className="font-display mb-1" style={{ fontSize: 9.5, color: "var(--green)", letterSpacing: "0.12em" }}>KIDS-OS ADAPTATION</div>
            <div className="flex gap-1.5">
              <Pill label="KIDS-OS ADAPTIVE" on={adaptive} color="var(--green)" onClick={() => { setAdaptive(true); setOverride(false); }} />
              <Pill label="MANUAL (PIN)" on={!adaptive} color="var(--amber)" onClick={() => setGateOpen(true)} />
            </div>
            <div className="font-body mt-1" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>
              {adaptive ? "All intensities auto-managed by ACE." : "Clinician override active — pediatric auto-scaling disabled."}
            </div>
            {override && (
              <div className="mt-2">
                <div className="font-display" style={{ fontSize: 9, color: "var(--amber)", letterSpacing: "0.1em" }}>MANUAL MASTER INTENSITY — {manual}%</div>
                <input
                  type="range" min={10} max={100} value={manual}
                  onChange={(e) => setManual(Number(e.target.value))}
                  className="w-full mt-1" style={{ accentColor: "var(--amber)" }}
                  aria-label="Manual master intensity"
                />
              </div>
            )}
          </div>

          {/* POWER */}
          <div>
            <div className="font-display mb-1" style={{ fontSize: 9.5, color: barColor, letterSpacing: "0.1em" }}>
              EST. DRAW: {(watts / 1000).toFixed(1)} kW / 1.2 kW MAX
            </div>
            <div className="rounded-full overflow-hidden" style={{ height: 8, background: "var(--bg-panel)" }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: barColor, transition: "width 250ms ease" }} />
            </div>
          </div>

          {/* PARENT ALERTS */}
          <div>
            <div className="font-display text-sky mb-1" style={{ fontSize: 9.5, letterSpacing: "0.12em" }}>PARENT ALERT SETTINGS</div>
            <Toggle label="Session start alert" on={alerts.start} onClick={() => setAlerts((a) => ({ ...a, start: !a.start }))} />
            <Toggle label="Session complete alert" on={alerts.complete} onClick={() => setAlerts((a) => ({ ...a, complete: !a.complete }))} />
            <Toggle label="Safety threshold alert" on={alerts.safety} onClick={() => setAlerts((a) => ({ ...a, safety: !a.safety }))} />
            <Toggle label="Real-time sensor feed (optional)" on={alerts.feed} onClick={() => setAlerts((a) => ({ ...a, feed: !a.feed }))} />
          </div>

          <button
            disabled={!age || !protoId || codes.length === 0}
            onClick={() => onStart({ name: proto.name, color: proto.color, dur, codes, age })}
            className="font-display w-full rounded-lg"
            style={{
              fontSize: 12, padding: "14px 0", letterSpacing: "0.08em", minHeight: 48,
              background: !age || !protoId ? "var(--bg-card)" : "var(--sky)",
              color: !age || !protoId ? "var(--text-muted)" : "#04121F",
            }}
          >
            ▶ START SESSION
          </button>

          <div className="flex flex-wrap gap-1.5 pb-4">
            <button onClick={saveJson} className="font-display rounded-md" style={{ fontSize: 8.5, padding: "7px 8px", color: "var(--sky)", border: "1px solid var(--sky-dim)", minHeight: 32 }}>💾 Save Protocol</button>
            <button onClick={generateBsPackage} className="font-display rounded-md" style={{ fontSize: 8.5, padding: "7px 8px", color: "var(--sky)", border: "1px solid var(--sky-dim)", minHeight: 32 }}>📤 Export PDF</button>
            <button onClick={() => window.print()} className="font-display rounded-md" style={{ fontSize: 8.5, padding: "7px 8px", color: "var(--sky)", border: "1px solid var(--sky-dim)", minHeight: 32 }}>📋 Print for Parent</button>
          </div>
        </div>
      </aside>

      {ageToast && (
        <BsToast
          message="⚠ Select child's age group first — KIDS-OS parameter scaling requires age group selection"
          actionLabel="Select Age Group →"
          onAction={() => { setAgeToast(false); document.getElementById("bs-age-pills")?.scrollIntoView({ block: "center", behavior: "smooth" }); }}
          onDismiss={() => setAgeToast(false)}
        />
      )}

      {gateOpen && (
        <ClinicianGate
          onCancel={() => setGateOpen(false)}
          onAuthorized={() => { setGateOpen(false); setOverride(true); setAdaptive(false); }}
          onLog={(entry) => setAuthLog((l) => [...l, entry])}
        />
      )}
    </>
  );
}