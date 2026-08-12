// Right spec panel data for BrightSteps BS-ATP-Ω
export const BS_SPECS = [
  ["Designator", "BS-ATP-Ω"],
  ["Active Systems", "12"],
  ["Target Population", "ASD Ages 4-17"],
  ["BOM Line Items", "67"],
  ["Total Components", "847"],
  ["Assembly Hours", "112h"],
  ["Form Factor", "Enclosed Pod Chair"],
  ["Length", "1,600 mm"],
  ["Width", "1,400 mm"],
  ["Height", "1,500 mm"],
  ["Internal Chamber", "1,300×700×400 mm"],
  ["Total Mass", "≤ 380 kg"],
  ["Max Power", "1.2 kW"],
  ["Power Input", "120V AC · 15A"],
  ["Max Patient Mass", "90 kg"],
  ["Max Patient Height", "170 cm"],
  ["Age Range", "4 - 17 years"],
  ["Safety Cutoff", "< 100 ms"],
  ["Freq. Precision", "± 0.01 Hz (OCXO)"],
  ["PBM Irradiance", "60-100 mW/cm²"],
  ["PEMF Uniformity", "± 8%"],
  ["FIR Max Temp", "42°C (TCO 45°C hard)"],
  ["Session Range", "15 - 45 min"],
  ["EEG Channels", "19-ch + 4-ch pediatric"],
  ["Biometric Inputs", "5 channels"],
  ["AI Cycle", "100 ms"],
  ["Age Protocols", "4 auto-scaled groups"],
  ["Software", "KIDS-OS v2.4 + ACE"],
  ["Enclosure Rating", "IP42 (child-safe)"],
];

export const PROCESSORS = ["ARM Cortex-A72", "STM32H7", "TensorFlow Lite", "KIDS-OS Kernel", "ACE Safety Engine"];

export const BS_POWER = [
  { code: "PBM", watts: 350, color: "#C9A84C" },
  { code: "FIT", watts: 200, color: "#FB923C" },
  { code: "VAT", watts: 150, color: "#2DD4BF" },
  { code: "PEMF", watts: 120, color: "#38BDF8" },
  { code: "BIN", watts: 100, color: "#A78BFA" },
  { code: "CHM", watts: 80, color: "#F472B6" },
  { code: "EEG", watts: 70, color: "#818CF8" },
  { code: "BIO", watts: 60, color: "#34D399" },
  { code: "MCT", watts: 40, color: "#C9A84C" },
  { code: "NAD", watts: 30, color: "#7C3AED" },
  { code: "GSC", watts: 20, color: "#6E40C9" },
  { code: "VOR", watts: 0, color: "#0891B2", note: "passive (pre-session)" },
];

export const OUTCOMES_CLINICIAN = [
  "Sensory Regulation",
  "Autonomic Nervous System Coherence",
  "Alpha/Theta Brainwave Training",
  "HRV Improvement",
  "Cortisol/Stress Biomarker Reduction",
  "Proprioceptive Integration",
  "Language Processing Support",
  "Sleep Architecture Improvement",
  "Mast Cell / Immune Modulation",
  "Somatic Trauma Release",
];

export const OUTCOMES_PARENT = [
  "Calmer Sensory Experience",
  "Better Sleep",
  "Reduced Meltdown Frequency",
  "Improved Focus",
  "Body Awareness",
  "Emotional Regulation Support",
  "Stress Reduction",
  "Language Readiness",
];

export const LOG_TEMPLATES = [
  "GSR ↓ 12% → VAT adj +5Hz",
  "EEG θ ↑ → BIN adj delta→theta",
  "HRV ↑ 4ms → PBM nominal",
  "Behavior flag: calm ●",
  "Protocol: Sensory Reg cycle 7",
  "CHM sync: blue→green shift",
  "ACE cycle 184 — all nominal",
  "SpO₂ steady 99% → FIT hold",
  "Thermal bus nominal — 12 sensors",
  "Coherence score 0.86 → hold protocol",
];