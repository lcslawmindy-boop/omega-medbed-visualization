import React from "react";
import PillGroup from "./PillGroup";
import { AGE_GROUPS, INTENSITIES } from "@/data/brightstepsNav";

export default function PatientProfileWidget({ age, onAge, intensity, onIntensity }) {
  return (
    <div className="rounded-md p-2.5" style={{ background: "var(--bg-card)", borderLeft: "3px solid var(--sky)" }}>
      <div className="font-display mb-1.5" style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.12em" }}>
        PATIENT SESSION
      </div>
      <PillGroup options={AGE_GROUPS} value={age} onChange={onAge} activeColor="var(--sky)" />
      <div className="mt-1.5">
        <PillGroup options={INTENSITIES} value={intensity} onChange={onIntensity} activeColor="var(--teal)" />
      </div>
      <p className="font-body italic mt-2 mb-0" style={{ fontSize: 8, color: "var(--text-muted)", lineHeight: 1.5 }}>
        Auto-adjusts all modality parameters by age group via KIDS-OS
      </p>
    </div>
  );
}