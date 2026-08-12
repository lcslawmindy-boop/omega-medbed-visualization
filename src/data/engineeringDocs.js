// Engineering reference documentation for the Omega MedBed ZA-MB-Ω
// Source sheets: exploded isometric assembly, plan-view zone map, PRD spec sheets, AATCS-P2 platform.

const BASE = "https://media.base44.com/images/public/6a7c053f6098c206f62a3535";

export const ENG_DOC_IMAGES = [
  { url: `${BASE}/363da9bea_ChatGPTImageAug11202610_02_37PM.png`, section: "assembly", title: "Exploded Isometric Assembly View", doc: "ZA-ENG-MB-OMEGA-A-EXP-001", rev: "Rev A · 2026-08-12 · Scale: NTS" },
  { url: `${BASE}/4cf3d69a4_ChatGPTImageAug11202610_04_32PM.png`, section: "plan", title: "Plan View — Modality Zone Map", doc: "ZA-ENG-MB-OMEGA-A-PLN-001", rev: "Rev A · 2026-08-12 · Scale: 1:20" },
  { url: `${BASE}/6fc203896_ChatGPTImageAug11202610_18_40PM.png`, section: "specs", title: "System Specification & Callouts", doc: "ZA-ENG-MB-OMEGA-A-PRD", rev: "Rev A · 2026-08-12" },
  { url: `${BASE}/ad1a5b5ac_ChatGPTImageAug11202610_23_21PM.png`, section: "aatcs", title: "AATCS-P2 Adaptive Resonance Pod", doc: "AATCS-P2-EXP-001", rev: "Rev A · 2026-08-12" },
];

export const DOC_SECTIONS = [
  { id: "assembly", label: "Assembly" },
  { id: "plan", label: "Plan View" },
  { id: "specs", label: "Specifications" },
  { id: "aatcs", label: "AATCS-P2" },
  { id: "modalities", label: "Modalities" },
  { id: "documents", label: "Documents" },
];

export const BOM_METRICS = [
  { label: "BOM LINE ITEMS", value: "94" },
  { label: "TOTAL COMPONENTS", value: "1,284" },
  { label: "ASSEMBLY TIME", value: "166h" },
  { label: "MODALITIES", value: "18" },
  { label: "POWER", value: "3.5 kW" },
  { label: "DIMENSIONS", value: "2.4×1.6×1.8 m" },
];

// Each row: [key1, value1, key2, value2]
export const SYSTEM_SPECS = [
  ["Designator", "ZA-MB-Ω", "Max Patient Mass", "180 kg"],
  ["Active Modalities", "18", "Safety Cutoff", "< 100 ms"],
  ["BOM Line Items", "94", "Freq. Precision", "± 0.01 Hz (OCXO)"],
  ["Total Components", "1,284", "PBM Irradiance", "100–120 mW/cm²"],
  ["Assembly Hours", "166h", "PEMF Uniformity", "± 5%"],
  ["Length", "2,400 mm", "TRZ Ratio", "> 0.8"],
  ["Width", "1,600 mm", "Vortex Temp.", "4.0°C ± 0.5°C"],
  ["Height", "1,800 mm", "Orgone ΔT", "≥ 1.0°F / 30 min"],
  ["Internal Chamber", "2,100×900×500 mm", "EEG Channels", "19-ch 10-20"],
  ["Total Mass", "≤ 1,200 kg", "Biometric Inputs", "HRV/SpO₂/EEG/GSR/Temp"],
  ["Max Power", "3.5 kW", "AI Cycle", "100 ms"],
  ["Power Input", "120/240V AC, 30A", "H₂ Purity", "99.99%"],
  ["Session Range", "30s – 45 min", "Ion Density", "10⁶–10⁷ /cm³"],
];