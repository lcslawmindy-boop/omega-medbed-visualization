import React from "react";
import PageShell from "@/components/shell/PageShell";
import SectionCard from "@/components/shell/SectionCard";

const SHUTDOWN = [
  "Press the E-STOP — every emitter de-energises in under 100 ms.",
  "Open the chamber. It is never latched and opens from the inside without power.",
  "Stay with the child. Speak calmly; no correction, no consequence.",
  "Log the event in the session record with the time and what preceded it.",
  "Run the sensor self-test and re-calibrate before any further session.",
];

const RULES = [
  ["The help button can never be removed", "I NEED HELP is present on every screen, in every mode, at all times."],
  ["Safe Play is always reachable", "A child can leave any activity for the Calm Corner without a PIN or approval."],
  ["The chamber never locks", "There is no latch, magnet, or software hold on the door. Ever."],
  ["BFAC cannot be disabled", "The closed-loop safety engine runs on independent hardware and cannot be switched off from the UI."],
  ["Settings are PIN-gated", "Parameter changes, overrides, and data export require the caregiver or clinician PIN."],
  ["Audio is capped in child mode", "70% maximum volume, with no sudden onsets."],
];

const LEGAL = [
  "This system is a conceptual engineering exercise. It is not a manufactured product and not a medical device.",
  "It is not approved or cleared by the FDA, FCC, CE, or any other regulatory authority for therapeutic, clinical, or consumer use.",
  "Nothing here is medical advice. No diagnosis, treatment, cure, or prevention of any condition is claimed or implied.",
  "Autism is not an illness to be cured. Every design decision supports regulation, communication, and autonomy — never compliance or suppression.",
  "Always consult a qualified clinician before making any decision about a child's care.",
];

export default function SafetyCenter() {
  return (
    <PageShell title="SAFETY CENTER" subtitle="Emergency shutdown · non-negotiable rules · legal disclosures" accent="#EF4444">
      <SectionCard title="EMERGENCY SHUTDOWN PROCEDURE" accent="#EF4444">
        <ol className="space-y-1.5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {SHUTDOWN.map((s, i) => (
            <li key={s} className="bs-card flex gap-3 px-3 py-2.5" style={{ background: "var(--bg-panel)" }}>
              <span className="font-display flex-none text-center rounded" style={{ fontSize: 10, width: 26, height: 26, lineHeight: "26px", color: "#EF4444", border: "1px solid #EF4444" }}>{i + 1}</span>
              <span className="font-body" style={{ fontSize: 11, color: "var(--text-primary)", lineHeight: 1.6 }}>{s}</span>
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title="NON-NEGOTIABLE DEVICE RULES" accent="var(--amber, #F59E0B)">
        <div className="grid gap-1.5 sm:grid-cols-2">
          {RULES.map(([t, d]) => (
            <div key={t} className="bs-card px-3 py-2" style={{ background: "var(--bg-panel)" }}>
              <div className="font-body" style={{ fontSize: 11, color: "var(--text-primary)" }}>{t}</div>
              <div className="font-body mt-0.5" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="LEGAL & HEALTH DISCLOSURES" accent="var(--text-muted)">
        <ul className="space-y-1.5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {LEGAL.map((l) => (
            <li key={l} className="font-body" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.7 }}>› {l}</li>
          ))}
        </ul>
      </SectionCard>
    </PageShell>
  );
}