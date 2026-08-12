import React from "react";
import PageShell from "@/components/shell/PageShell";
import SectionCard from "@/components/shell/SectionCard";

const SETUP = [
  ["Select the patient profile", "Open the sidebar and set age band (4–6, 7–9, 10–12, 13–17) and intensity. KIDS-OS auto-adjusts every modality parameter to that band."],
  ["Open the Protocol Builder", "Press S, or tap PROTOCOL BUILDER in the header. Choose a preset protocol or build a custom stack."],
  ["Choose modalities and duration", "Toggle the therapy systems you need. Live power draw is shown — the builder blocks any stack exceeding the 1.2 kW envelope."],
  ["Confirm safety toggles", "BFAC closed-loop monitoring stays on. Clinician override requires PIN authorisation."],
  ["Start the session", "The pod runs the crown-to-root activation sequence with an ascending chime, then cycles active systems on the 3D scene."],
];

const NAV = [
  ["Sidebar", "Therapy system list, patient profile and KIDS-OS status. Press 1–9 / 0 / A / B to jump to a system."],
  ["3D scene", "Space toggles auto-rotate. F fits the view, R resets it. Hover any subsystem for its engineering tag."],
  ["Spec panel", "Device identity, specification tables, power allocation and regulatory blocks for the selected configuration."],
  ["Mode tabs", "M cycles Clinician → Parent → Technical. Parent mode uses plain language and softer visuals."],
];

const OVERRIDE = [
  ["Immediate stop", "Press the physical E-STOP or tap the red HALT control. All emitters de-energise in under 100 ms."],
  ["Manual override", "Hold the override key and enter the clinician PIN. This suspends ACE adaptation and holds current parameters."],
  ["Door / egress release", "The chamber is never latched. The occupant can open it from inside at any point with no power required."],
  ["After any override", "Log the event in the session record, run the sensor self-test, and re-calibrate before the next session."],
];

function Steps({ items, numbered, accent }) {
  return (
    <ol className="space-y-1.5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map(([t, d], i) => (
        <li key={t} className="bs-card flex gap-3 px-3 py-2.5" style={{ background: "var(--bg-panel)" }}>
          <span className="font-display flex-none text-center rounded" style={{ fontSize: 10, width: 26, height: 26, lineHeight: "26px", color: accent, border: `1px solid ${accent}` }}>
            {numbered ? i + 1 : "›"}
          </span>
          <div className="min-w-0">
            <div className="font-body" style={{ fontSize: 11.5, color: "var(--text-primary)" }}>{t}</div>
            <div className="font-body mt-0.5" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.6 }}>{d}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function QuickStart() {
  return (
    <PageShell title="QUICK START GUIDE" subtitle="Set up a session · navigate the UI · emergency overrides">
      <SectionCard title="1 · SET UP A NEW SESSION">
        <Steps items={SETUP} numbered accent="var(--sky, #38BDF8)" />
      </SectionCard>
      <SectionCard title="2 · NAVIGATING THE INTERFACE" accent="var(--teal, #2DD4BF)">
        <Steps items={NAV} accent="var(--teal, #2DD4BF)" />
      </SectionCard>
      <SectionCard title="3 · EMERGENCY MANUAL OVERRIDE" accent="#EF4444">
        <Steps items={OVERRIDE} accent="#EF4444" />
      </SectionCard>
    </PageShell>
  );
}