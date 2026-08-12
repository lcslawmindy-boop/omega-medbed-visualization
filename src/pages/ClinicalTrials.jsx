import React from "react";
import PageShell from "@/components/shell/PageShell";
import SectionCard from "@/components/shell/SectionCard";
import TrendChart from "@/components/insights/TrendChart";
import { SESSION_TRENDS, METRIC_SPECS } from "@/data/progressTrends";

const TRIALS = [
  { id: "AA-BS-001", title: "BS-ATP-Ω sensory regulation feasibility", phase: "Feasibility", n: 24, status: "IRB SUBMITTED", site: "Single site · ages 7–12", endpoint: "Δ HRV RMSSD at 12 sessions" },
  { id: "AA-BS-002", title: "Multi-modal ASD co-regulation protocol", phase: "Pilot", n: 60, status: "PROTOCOL DRAFT", site: "3 sites · ages 4–17", endpoint: "Caregiver-reported regulation score" },
  { id: "AA-OM-003", title: "Omega MedBed recovery adjunct", phase: "Pilot", n: 40, status: "PLANNING", site: "2 sites · adults 25–65", endpoint: "Sleep efficiency + EEG alpha" },
];

const OUTCOMES = [
  ["Sessions completed without interruption", "97.4%"],
  ["Participants reporting improved calm", "81%"],
  ["Mean HRV improvement at 12 sessions", "+48.2%"],
  ["Mean skin-conductance reduction", "−41.6%"],
  ["Adverse events (device-related)", "0 reported"],
  ["Caregiver retention through study arc", "92%"],
];

export default function ClinicalTrials() {
  return (
    <PageShell title="CLINICAL TRIALS" subtitle="Study registry · participant outcomes · aggregated biometrics" accent="var(--violet, #A78BFA)">
      <SectionCard title="ACTIVE & PLANNED STUDIES" accent="var(--violet, #A78BFA)">
        <div className="space-y-1.5">
          {TRIALS.map((t) => (
            <div key={t.id} className="bs-card p-3" style={{ background: "var(--bg-panel)" }}>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-mono" style={{ fontSize: 9, color: "var(--violet, #A78BFA)" }}>{t.id}</span>
                <span className="font-body flex-1 min-w-0" style={{ fontSize: 11.5, color: "var(--text-primary)" }}>{t.title}</span>
                <span className="font-mono rounded" style={{ fontSize: 8, padding: "3px 7px", color: "var(--amber, #F59E0B)", border: "1px solid var(--border)" }}>{t.status}</span>
              </div>
              <div className="font-mono mt-1" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.7 }}>
                {t.phase} · n={t.n} · {t.site}<br />Primary endpoint: {t.endpoint}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="AGGREGATED PARTICIPANT OUTCOMES" accent="var(--green, #34D399)" note="Modelled projections used for study powering — not observed results.">
        <div className="grid gap-2 sm:grid-cols-3">
          {OUTCOMES.map(([k, v]) => (
            <div key={k} className="bs-card p-3" style={{ background: "var(--bg-panel)" }}>
              <div className="font-display" style={{ fontSize: 16, color: "var(--green, #34D399)" }}>{v}</div>
              <div className="font-body mt-0.5" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.5 }}>{k}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      {METRIC_SPECS.slice(0, 3).map((m) => (
        <TrendChart
          key={m.key}
          title={`COHORT ${m.name.toUpperCase()} — MEAN vs BASELINE`}
          data={SESSION_TRENDS}
          series={[
            { key: m.key, name: "Cohort mean", color: m.color },
            { key: `${m.key}_baseline`, name: "Enrolment baseline", color: "#7D8590", dashed: true },
          ]}
        />
      ))}

      <div className="font-mono" style={{ fontSize: 8, color: "var(--text-muted)", lineHeight: 1.7 }}>
        No trial has commenced. All figures are conceptual modelling for protocol design and IRB submission planning. Not evidence of safety or efficacy.
      </div>
    </PageShell>
  );
}