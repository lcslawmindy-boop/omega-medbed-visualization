import React, { useState } from "react";
import { BS_NAV_SYSTEMS } from "@/data/brightstepsNav";
import PatientProfileWidget from "./sidebar/PatientProfileWidget";
import KidsOsWidget from "./sidebar/KidsOsWidget";
import SystemRow from "./sidebar/SystemRow";
import SidebarStats from "./sidebar/SidebarStats";
import HowItWorksModal from "./sidebar/HowItWorksModal";

function BsMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="10" fill="none" stroke="#38BDF8" strokeWidth="1.2" opacity="0.7" />
      <circle cx="11" cy="7.5" r="2.2" fill="#38BDF8" />
      <path d="M7 16.5c0-2.6 1.8-4.2 4-4.2s4 1.6 4 4.2" fill="#38BDF8" opacity="0.85" />
    </svg>
  );
}

export default function BsSidebar({ activeCode, onSelect }) {
  const [age, setAge] = useState("7-9");
  const [intensity, setIntensity] = useState("STANDARD");
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <>
      <aside
        className="bs-edges fixed left-0 z-[90] hidden lg:flex flex-col overflow-y-auto bs-scroll no-select"
        style={{ width: 280, background: "var(--bg-panel)", borderRight: "1px solid var(--border)" }}
      >
        {/* HEADER */}
        <div className="p-4 flex-none">
          <BsMark />
          <div className="font-display font-bold text-sky mt-1.5" style={{ fontSize: 13, letterSpacing: "0.06em" }}>
            BRIGHTSTEPS
          </div>
          <div className="font-display" style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.08em" }}>
            ASD THERAPY POD — BS-ATP-Ω
          </div>
          <div className="my-2.5" style={{ height: 1, background: "var(--sky-dim)", opacity: 0.5 }} />
          <PatientProfileWidget age={age} onAge={setAge} intensity={intensity} onIntensity={setIntensity} />
          <div className="mt-2">
            <KidsOsWidget />
          </div>
          <div className="mt-2.5" style={{ height: 1, background: "var(--sky-dim)", opacity: 0.5 }} />
        </div>

        {/* SYSTEM LIST */}
        <div className="flex-1 pr-2 pb-2">
          {BS_NAV_SYSTEMS.map((s) => (
            <SystemRow key={s.code} sys={s} active={s.code === activeCode} onSelect={onSelect} />
          ))}
        </div>

        {/* BOTTOM STATS */}
        <div className="flex-none">
          <SidebarStats onHowItWorks={() => setGuideOpen(true)} />
          <div className="px-2.5 py-2 font-mono" style={{ fontSize: 8, color: "var(--text-muted)", borderTop: "1px solid var(--border)", lineHeight: 1.6 }}>
            AATCS-P1 · Rev A · 2026-08-12<br />CONCEPT — NOT FOR MANUFACTURE
          </div>
        </div>
      </aside>

      <HowItWorksModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    </>
  );
}