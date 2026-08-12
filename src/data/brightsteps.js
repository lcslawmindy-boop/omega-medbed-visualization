// BrightSteps ASD Therapy Pod BS-ATP-Ω — 12 therapy systems, pod modes, product line
const IMG = "https://media.base44.com/images/public/6a7c053f6098c206f62a3535";

export const BS_SYSTEMS = [
  {
    code: "PBM", name: "Photobiomodulation", color: "#FB7185", zone: "pbm",
    spec: "660/850nm LED array · pediatric-dose 40–60 mW/cm²",
    mechanism: ["Photonic"],
    clinician: "Overhead 660nm red + 850nm NIR array at pediatric irradiance with aluminum heat sinks and diffuser lens. Transcranial-capable, BFAC dose-capped.",
    parent: "Gentle warm light — like sunshine — that helps brain cells make energy and supports calm, clear thinking.",
    technical: "AATCS-P1-CAN-001 canopy assembly · LED panel + TIM pad + mounting bracket · thermal cutoff supervised.",
  },
  {
    code: "PEMF", name: "Pulsed EM Field", color: "#38BDF8", zone: "pemf",
    spec: "7.83Hz Schumann resonance · under-floor coil matrix",
    mechanism: ["Electromagnetic"],
    clinician: "Floor-plate coil matrix delivering Schumann-band grounding fields. Driver board with shielding layer; field uniformity mapped across seat volume.",
    parent: "An invisible, super-gentle 'earth rhythm' — the same natural frequency the planet hums at — that helps the body feel grounded.",
    technical: "AATCS-P1-PCB-PEMF driver · coil windings + shielding layer + floor plate · 7.83Hz ± 0.05Hz.",
  },
  {
    code: "VAT", name: "Vibroacoustic Therapy", color: "#2DD4BF", zone: "vat",
    spec: "30–528Hz transducer matrix behind seat",
    mechanism: ["Acoustic"],
    clinician: "Seat-back transducer discs with acoustic chamber and DSP amplifier. Proprioceptive input for sensory-seeking profiles; amplitude child-limited.",
    parent: "Soft, deep vibrations the child feels through the seat — like a cat's purr — that soothe the nervous system.",
    technical: "AATCS-P1-SFC-001 transducer plate · transducer discs + mounting plate + DSP amp · 30–528Hz.",
  },
  {
    code: "FIT", name: "Far-Infrared Thermal", color: "#FBBF24", zone: "fit",
    spec: "37–55°C FIR panels · thermal sensor array ×12",
    mechanism: ["Thermal"],
    clinician: "FIR heating elements with thermal insulation and 12-point sensor array. Pediatric thermal envelope with dual-channel cutoff.",
    parent: "A cozy, even warmth — like a warm hug — that relaxes muscles and improves circulation.",
    technical: "AATCS-P1-FIR-001 panels · FIR heating element + insulation + mounting plate · 37–55°C supervised.",
  },
  {
    code: "BIN", name: "Binaural Beat Engine", color: "#A78BFA", zone: "bin",
    spec: "Δ 0.5–40Hz beat offset · dual near-ear emitters",
    mechanism: ["Acoustic", "Neural"],
    clinician: "Stereo near-field emitters generating theta/alpha beat offsets for entrainment. Protocol-linked to EEG state targets.",
    parent: "Two slightly different gentle tones — one for each ear — that the brain blends into a calming rhythm.",
    technical: "Dual emitter pods at headrest · Δf 0.5–40Hz · phase-locked to KIDS-OS protocol clock.",
  },
  {
    code: "NAD", name: "Nada Acoustic Resonance", color: "#C4B5FD", zone: "nad",
    spec: "256–426Hz formant set · 7-resonator interior arc",
    mechanism: ["Acoustic", "Resonance"],
    clinician: "Seven formant resonators arrayed across the canopy interior delivering the bija frequency set; amplitude-shaped for pediatric comfort.",
    parent: "Seven soft singing tones arranged like a rainbow overhead — musical frequencies that help the body settle.",
    technical: "7× resonator spheres, canopy arc · LAM 256 → OM 426Hz · protocol-sequenced.",
  },
  {
    code: "GSC", name: "Global Scaling Resonator", color: "#6E40C9", zone: "gsc",
    spec: "5Hz / 101Hz / 2032Hz · 2× G-Element, <1W",
    mechanism: ["Resonance"],
    clinician: "Reduced two-element PZT resonator set (child-scale) at standing-wave node frequencies with DDS oscillator.",
    parent: "Tiny crystal resonators that hum at nature's own frequencies — completely silent and gentle.",
    technical: "SFT scalar coils + DDS oscillator + mounting bracket · 20Hz–20kHz sweep capable.",
  },
  {
    code: "MCT", name: "Microcurrent Therapy", color: "#C9A84C", zone: "mct",
    spec: "1–999μA · armrest gold ports · GFCI protected",
    mechanism: ["Electrical"],
    clinician: "Precision microcurrent output ports in each armrest. 1–999μA range with wiring harness isolation and dual GFCI.",
    parent: "A current so tiny it can't be felt — it gives cells a little extra energy to do their repair work.",
    technical: "MCT microcurrent ports · driver PCB + wiring harness · 1–999μA precision output.",
  },
  {
    code: "VOR", name: "Vortex Water Unit", color: "#0891B2", zone: "vor",
    spec: "4.0°C ±0.5°C · 8L copper vortex chamber",
    mechanism: ["Fluid"],
    clinician: "Adjacent copper vortex chamber producing structured water for pre-session hydration. Peltier-cooled, child-safe spout.",
    parent: "A little copper fountain that swirls chilled drinking water — kids love watching the mini whirlpool.",
    technical: "Schauberger vortex chamber · Peltier cooling · 8L reservoir, food-grade copper.",
  },
  {
    code: "CHM", name: "Chromotherapy Canopy", color: "#34D399", zone: "chm",
    spec: "RGB WLED dome · 8 protocol color presets",
    mechanism: ["Photonic"],
    clinician: "Full-dome WLED array driving protocol-appropriate ambient color (teal-green sensory regulation default). Lux-limited for photosensitivity.",
    parent: "The whole pod glows in soft colors chosen for each session — like sitting inside a gentle sunset.",
    technical: "RGB ambient LED ring + canopy WLED array · 8 presets, KIDS-OS mapped · flicker-free drivers.",
  },
  {
    code: "EEG", name: "EEG Neurofeedback", color: "#7C3AED", zone: "eeg",
    spec: "8-channel pediatric montage · real-time FFT",
    mechanism: ["Neural", "AI"],
    clinician: "Headrest-docked 8-channel pediatric EEG with real-time FFT. Alpha/theta training targets; hyperarousal detection feeds BFAC.",
    parent: "A soft headband that listens to brainwaves — so the pod knows exactly when the child feels calm.",
    technical: "EEG dock ring, headrest · 8-ch pediatric montage · FFT to ACE adaptive engine.",
  },
  {
    code: "BIO", name: "KIDS-OS Closed-Loop ★", color: "#34D399", zone: "bio", isMaster: true,
    spec: "HRV + GSR + SpO₂ + Temp + EEG · 100ms cycle",
    mechanism: ["AI Control", "Safety"],
    clinician: "BFAC safety engine + ACE adaptive engine on Raspberry Pi 5 stack. Coherence scoring, child profile memory, <100ms interlock cutoff.",
    parent: "The pod's caring brain — it watches heart rhythm and comfort every moment and adjusts everything to keep the child safe and relaxed.",
    technical: "BFAC (fault detection, e-shutdown relay, leakage monitor) + ACE (coherence scoring, modulation, telemetry) · Pi 5 + 3× Pi Zero 2W.",
  },
];

export const BS_SYSTEM_BY_CODE = Object.fromEntries(BS_SYSTEMS.map((s) => [s.code, s]));

export const POD_MODES = [
  { name: "Sensory Regulation", color: "#00D4AA", blurb: "Teal-green ambient · VAT + NAD lead" },
  { name: "Trauma Release", color: "#C4B5FD", blurb: "Lavender ambient · BIN theta + VAT" },
  { name: "Sleep Induction", color: "#1D6FA4", blurb: "Deep blue ambient · PEMF delta + BIN" },
  { name: "Focus Enhancement", color: "#FBBF24", blurb: "Amber ambient · BIN alpha + PBM" },
  { name: "Social Priming", color: "#34D399", blurb: "Emerald ambient · NAD + CHM" },
  { name: "TBI Recovery", color: "#CC4400", blurb: "Warm red ambient · PBM transcranial lead" },
  { name: "Immune Support", color: "#6EE7B7", blurb: "Mint ambient · FIT + PEMF" },
  { name: "Custom", color: "#38BDF8", blurb: "Clinician-defined blend" },
];

export const BS_ECOSYSTEM = [
  { url: `${IMG}/617bdf312_Copilot_20260809_074820.png`, title: "BrightSteps Complete Product Line", doc: "BS-ECO-001" },
  { url: `${IMG}/92f059a3a_SoftwareHardwareMasterpacketdiagram.png`, title: "Software · Hardware · Master Packet", doc: "BS-DOC-MP-001" },
  { url: `${IMG}/20567be26_TherapyPodexplodedCAD.png`, title: "AATCS-P1 Exploded View — Complete System Diagram", doc: "AATCS-P1-EXP-001" },
  { url: `${IMG}/280468697_TherapyPodinteriorCADhybrid.png`, title: "Therapy Pod Interior — Systems Callout", doc: "AATCS-P1-INT-001" },
  { url: `${IMG}/251d38d27_Copilot_20260711_170813.png`, title: "Slicon Systems Master Ecosystem", doc: "BS-SW-ECO-001" },
  { url: `${IMG}/cf9dda46a_Copilot_20260711_171115.png`, title: "OS Kids Architecture", doc: "BS-SW-OSK-001" },
  { url: `${IMG}/abb397627_Copilot_20260711_180156.png`, title: "Band Buddy™ — Raccoon Companion", doc: "BS-BB-001" },
  { url: `${IMG}/d97c4acff_Copilot_20260711_182007.png`, title: "Band Buddy™ — Panda Companion", doc: "BS-BB-002" },
  { url: `${IMG}/1ceb28eb2_Copilot_20260711_182210.png`, title: "BrightSteps PEMF Grounding Shoes", doc: "BS-SHOE-001" },
  { url: `${IMG}/88cee81ec_Copilot_20260711_182446.png`, title: "GroundLink™ Copper System — Callouts", doc: "BS-SHOE-002" },
  { url: `${IMG}/eca9dd8b9_Copilot_20260711_183155.png`, title: "Band Buddy™ — Bear + Backpack", doc: "BS-BB-003" },
  { url: `${IMG}/fb359d38a_Copilot_20260711_183227.png`, title: "ASD Unified Therapy Systems — Device Family", doc: "BS-ECO-002" },
];

export const BS_MODES = [
  { id: "clinician", label: "CLINICIAN MODE", icon: "👨‍⚕️" },
  { id: "parent", label: "PARENT MODE", icon: "👨‍👩‍👦" },
  { id: "technical", label: "TECHNICAL MODE", icon: "🔬" },
];

export const BS_SESSIONS = [
  { date: "2026-08-11", mode: "Sensory Regulation", dur: "22 min", coherence: "86%", hrv: "72 bpm", note: "Settled at 4 min · full session" },
  { date: "2026-08-10", mode: "Focus Enhancement", dur: "18 min", coherence: "79%", hrv: "78 bpm", note: "Alpha target reached" },
  { date: "2026-08-09", mode: "Sleep Induction", dur: "25 min", coherence: "91%", hrv: "64 bpm", note: "Theta onset at 9 min" },
  { date: "2026-08-08", mode: "Sensory Regulation", dur: "20 min", coherence: "83%", hrv: "70 bpm", note: "Reduced GSR variance" },
  { date: "2026-08-06", mode: "Social Priming", dur: "15 min", coherence: "75%", hrv: "81 bpm", note: "Pre-therapy warm-up" },
];