// Clinical baseline (pre-therapy reference) and healing goal for each logged biometric.
export const GOAL_METRICS = [
  { key: "hrv",         label: "HRV (RMSSD)",      unit: "ms",  baseline: 34,   goal: 55,   dir: "up",   color: "#38BDF8" },
  { key: "spo2",        label: "SpO₂",             unit: "%",   baseline: 95,   goal: 99,   dir: "up",   color: "#34D399" },
  { key: "eeg_alpha",   label: "EEG Alpha Power",  unit: "µV²", baseline: 6.2,  goal: 11,   dir: "up",   color: "#A78BFA" },
  { key: "gsr",         label: "Skin Conductance", unit: "µS",  baseline: 8.4,  goal: 4.5,  dir: "down", color: "#2DD4BF" },
  { key: "core_temp",   label: "Core Temperature", unit: "°C",  baseline: 37.4, goal: 36.8, dir: "down", color: "#FBBF24" },
];

// Percent of the way from baseline to goal (clamped 0–100).
export function goalProgress(value, m) {
  if (value == null || m.goal === m.baseline) return 0;
  const pct = ((value - m.baseline) / (m.goal - m.baseline)) * 100;
  return Math.max(0, Math.min(100, pct));
}