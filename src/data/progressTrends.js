// Conceptual modelling data — simulated 12-session progression, not clinical results.
const build = (baseline, goal, noise) =>
  Array.from({ length: 12 }, (_, i) => {
    const f = i / 11;
    const ease = 1 - Math.pow(1 - f, 1.8);
    const jitter = Math.sin(i * 1.9 + baseline) * noise;
    return +(baseline + (goal - baseline) * ease * 0.88 + jitter).toFixed(2);
  });

const LABELS = Array.from({ length: 12 }, (_, i) => `S${i + 1}`);

export const METRIC_SPECS = [
  { key: "hrv", name: "HRV (RMSSD, ms)", baseline: 34, goal: 55, color: "#38BDF8", noise: 0.8 },
  { key: "alpha", name: "EEG alpha (µV²)", baseline: 6.2, goal: 11, color: "#A78BFA", noise: 0.18 },
  { key: "gsr", name: "Skin conductance (µS)", baseline: 8.4, goal: 4.5, color: "#2DD4BF", noise: 0.14 },
  { key: "hr", name: "Resting HR (bpm)", baseline: 104, goal: 82, color: "#F59E0B", noise: 1.1 },
];

export const SESSION_TRENDS = LABELS.map((label, i) => {
  const row = { label };
  METRIC_SPECS.forEach((m) => {
    row[m.key] = build(m.baseline, m.goal, m.noise)[i];
    row[`${m.key}_baseline`] = m.baseline;
  });
  return row;
});

export const CHILD_TRENDS = LABELS.map((label, i) => ({
  label,
  independence: +Math.min(100, 32 + i * 5.2 + Math.sin(i) * 2).toFixed(1),
  calmMinutes: +(4 + i * 1.6 + Math.cos(i) * 0.8).toFixed(1),
  helpRequests: +Math.max(0, 9 - i * 0.65 + Math.sin(i * 1.3) * 0.5).toFixed(1),
  starsEarned: Math.round(6 + i * 2.3),
}));