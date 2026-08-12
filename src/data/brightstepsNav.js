// Sidebar navigation metadata for the 12 BrightSteps therapy systems.
export const BS_NAV_SYSTEMS = [
  { code: "PBM", color: "#C9A84C", name: "Photobiomodulation", param: "630/660/810/850nm · 60-100 mW/cm²", tier: "T1", status: "green" },
  { code: "PEMF", color: "#38BDF8", name: "Pulsed EM Field", param: "7.83Hz Schumann + 10Hz alpha", tier: "T1", status: "green" },
  { code: "VAT", color: "#2DD4BF", name: "Vibroacoustic Therapy", param: "20-120Hz · 6-transducer array", tier: "T1", status: "green" },
  { code: "FIT", color: "#FB923C", name: "Far-Infrared Thermal", param: "5-14μm · 36-42°C · child-safe TCO", tier: "T1", status: "green" },
  { code: "BIN", color: "#A78BFA", name: "Binaural Beat / AVE", param: "Delta 0.5-4Hz · Theta 4-8Hz · Alpha 8-13Hz", tier: "T2", status: "green" },
  { code: "NAD", color: "#7C3AED", name: "Vedic Nada Acoustic", param: "LAM 256→OM 426Hz · 7 chakra zones", tier: "T2", status: "green" },
  { code: "GSC", color: "#6E40C9", name: "Global Scaling Resonator", param: "5Hz / 101Hz / 2032Hz · G-Elements", tier: "T3", status: "green" },
  { code: "MCT", color: "#C9A84C", name: "Microcurrent Therapy", param: "1-300μA · head/torso zones · pediatric", tier: "T1", status: "green" },
  { code: "VOR", color: "#0891B2", name: "Schauberger Vortex Water", param: "4.0°C ±0.5°C · Repulsine · 20L", tier: "T3", status: "amber" },
  { code: "CHM", color: "#F472B6", name: "Chromotherapy", param: "WLED full-spectrum · 7 zones · child-sync", tier: "T2", status: "green" },
  { code: "EEG", color: "#818CF8", name: "EEG Neurofeedback", param: "19-ch + 4-ch pediatric · real-time FFT", tier: "T1", status: "green" },
  { code: "BIO", color: "#34D399", name: "KIDS-OS AI Closed-Loop", param: "HRV+SpO₂+EEG+GSR+Temp · 100ms", tier: "T1", status: "green", isMaster: true },
];

export const AGE_GROUPS = ["4-6", "7-9", "10-12", "13-17"];
export const INTENSITIES = ["GENTLE", "STANDARD", "FULL"];

export const SIDEBAR_STATS = [
  { label: "SYSTEMS", value: "12", color: "var(--sky)" },
  { label: "T1 TIER", value: "6", color: "var(--green)" },
  { label: "T2 TIER", value: "3", color: "var(--amber)" },
  { label: "T3 TIER", value: "3", color: "var(--coral)" },
  { label: "POWER", value: "1.2kW", color: "var(--text-muted)" },
  { label: "CYCLE", value: "100ms", color: "var(--text-muted)" },
];