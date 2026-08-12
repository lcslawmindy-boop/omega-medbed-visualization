// Engineering document package — PRD / PDR / BOM / SOW / EVT / DVT
// Two products: Omega MedBed ZA-MB-Ω and AATCS-P1 Adaptive Resonator Bed.
// Block types consumed by src/lib/docPackageReport.js:
//   { h: "Heading" } | { p: "paragraph" } | { list: [..] }
//   { table: { cols: [..], widths: [..], rows: [[..]] } }
//   { kv: [[k, v], ..] }

import { BS_PRODUCT, BS_DOCUMENTS } from "@/data/brightstepsPackage";
import { CAMPAIGN_DOC } from "@/data/brightstepsCampaign";

export const PRODUCTS = [
  { id: "omega", name: "Omega MedBed", designator: "ZA-MB-Ω", prefix: "ZA-ENG-MB-OMEGA-A" },
  { id: "aatcs", name: "AATCS-P1 Adaptive Resonator Bed", designator: "AATCS-P1", prefix: "AATCS-P1" },
  BS_PRODUCT,
];

const DISCLAIMER =
  "RESEARCH PROTOTYPE — CLASS III MEDICAL DEVICE CONCEPT (FDA 21 CFR PART 880). Not approved by FDA, FCC, or any regulatory authority for clinical, therapeutic, commercial, or consumer use. Tier 3 modalities are non-validated research concepts and are not supported by regulatory clearance. Not medical advice. All figures are engineering targets subject to manufacturer validation.";

/* ============================ OMEGA MEDBED ============================ */

const OMEGA_PRD = {
  id: "omega-prd",
  product: "omega",
  kind: "PRD",
  code: "ZA-ENG-MB-OMEGA-A-PRD",
  title: "Product Requirements Document",
  subtitle: "Omega MedBed ZA-MB-Ω · 18-Modality Integrated Therapeutic Platform",
  blocks: [
    { h: "1. Purpose & Scope" },
    { p: "This document defines the complete product requirements for the Omega MedBed ZA-MB-Ω engineering prototype: a supine, canopy-enclosed therapeutic platform integrating 18 physical modalities under a single BFAC+ACE closed-loop AI controller. It is the controlling requirements baseline for hardware manufacture, firmware development, and application software. All downstream documents (PDR, BOM, SOW, EVT, DVT) trace to the requirement identifiers defined here." },
    { p: "Scope covers one (1) fully functional engineering prototype including chassis, canopy, all 18 modality subsystems, the control stack, the operator application, and the verification fixtures required to execute EVT and DVT. Out of scope: production tooling, sterile packaging, clinical trial execution, regulatory submission authoring, and manufacturing scale-up beyond the prototype unit." },

    { h: "2. Product Definition" },
    { kv: [
      ["Designator", "ZA-MB-Ω"],
      ["Classification", "Class III concept (FDA 21 CFR Part 880) — research prototype"],
      ["Form Factor", "Supine bed with articulating geodesic canopy + side equipment column"],
      ["Envelope (L×W×H)", "2,400 × 1,600 × 1,800 mm"],
      ["Internal Chamber", "2,100 × 900 × 500 mm"],
      ["Total Mass", "≤ 1,200 kg"],
      ["Max Patient Mass", "180 kg"],
      ["Power Input", "120/240 VAC, 30 A, 50/60 Hz, dedicated circuit"],
      ["Max Continuous Power", "3.5 kW"],
      ["Session Range", "30 s – 45 min, protocol-driven"],
      ["Integrated Modalities", "18 (Tier 1: 6 · Tier 2: 5 · Tier 3: 7)"],
    ] },

    { h: "3. Functional Requirements" },
    { table: { cols: ["REQ ID", "Requirement", "Acceptance Criterion"], widths: [70, 210, 235], rows: [
      ["FR-001", "System shall drive all 18 modalities concurrently under a single protocol", "18 channels active ≥ 10 min, no channel dropout"],
      ["FR-002", "BFAC controller shall sample HRV, SpO₂, EEG, GSR and core temperature", "5 streams logged at ≥ 10 Hz continuously"],
      ["FR-003", "Closed-loop adaptation cycle shall complete within 100 ms", "p99 cycle latency ≤ 100 ms over 60 min"],
      ["FR-004", "Safety engine shall cut power to any out-of-threshold modality", "Cutoff verified < 100 ms from threshold breach"],
      ["FR-005", "Operator shall build, save, recall and run named protocols", "Protocol round-trip persists 100% of parameters"],
      ["FR-006", "System shall log full session telemetry to persistent storage", "Session record complete for normal + interrupted runs"],
      ["FR-007", "Emergency stop shall de-energize all emitters", "All channels ≤ 0 V / 0 flow within 200 ms of E-stop"],
      ["FR-008", "System shall present a mandatory research-use acknowledgement", "Gate blocks all function until acknowledged"],
      ["FR-009", "Frequency generation shall be OCXO-disciplined", "± 0.01 Hz across full operating temperature range"],
      ["FR-010", "System shall refuse session start on any failed self-test", "POST failure blocks start and reports failing subsystem"],
    ] } },

    { h: "4. Modality Subsystem Requirements" },
    { table: { cols: ["Code", "Modality", "Key Specification", "Tier"], widths: [42, 148, 285, 40], rows: [
      ["PBM", "Photobiomodulation", "660/810/850 nm NIR · 5×5 grid · 100–120 mW/cm²", "T1"],
      ["PEMF", "Pulsed EM Field", "0.5–4 Hz delta + 7.83 Hz Schumann · 2×2 Helmholtz", "T1"],
      ["VAT", "Vibroacoustic Therapy", "20–528 Hz · 8-transducer mattress array", "T1"],
      ["FIT", "Far-Infrared Thermal", "5–14 μm · 37–55 °C · TCO 60 °C hard cutoff", "T1"],
      ["MCT", "Microcurrent Therapy", "1–999 μA · 4-channel · GFCI 10 μA trip", "T1"],
      ["BIO", "Biometric AI Closed-Loop", "HRV/SpO₂/EEG/GSR/Temp · 100 ms cycle", "T1"],
      ["EEG", "EEG Neurofeedback", "19-channel 10-20 · real-time FFT", "T1"],
      ["HIT", "Hydrogen Inhalation", "99.99% H₂ · PEM · 150–300 mL/min · 25% LEL cutoff", "T2"],
      ["NIA", "Negative Ion Therapy", "10⁶–10⁷ ions/cm³ · O₃ interlock at 0.03 ppm", "T2"],
      ["NAD", "Vedic Nada Acoustic", "256/288/320/341/384/426 Hz formant set", "T2"],
      ["CHM", "Chromotherapy", "WLED full-spectrum · 7-color programmable", "T2"],
      ["OZO", "Ozone Therapy", "0.5–5% O₃ · auto-off at 0.05 ppm ambient", "T2"],
      ["SFT", "Scalar Field / Phase-Conjugate", "10–40 kHz carrier · 8-pair bifilar octagon", "T3"],
      ["PRI", "ZA-PRI Multichannel Modulator", "F1×F2×F3→Fz · conditioned electron tubes", "T3"],
      ["RIF", "ZA-RIF Frequency Windows", "12.5 Hz – 6.1×10¹⁴ Hz · 24 trigger windows", "T3"],
      ["ORG", "ZA-ORG Biofield Accumulator", "20-layer organic/metallic · ΔT ≥ 1.0 °F / 30 min", "T3"],
      ["VOR", "ZA-VOR Implosion Vortex Water", "4.0 °C ± 0.5 °C · implosion impeller · 40 L", "T3"],
      ["GSC", "Global Scaling Resonator", "5/101/2032 Hz · 40.8 kHz · PZT-5H G-Elements", "T3"],
    ] } },

    { h: "5. Software Requirements" },
    { list: [
      "SW-001 — Control firmware on STM32H7 (hard real-time, 100 ms deterministic loop, FreeRTOS).",
      "SW-002 — Supervisory application on ARM Cortex-A72 (Linux) hosting protocol engine, telemetry store and operator UI.",
      "SW-003 — TensorFlow Lite inference for adaptive dosimetry; model versioned and pinned per build.",
      "SW-004 — Safety engine implemented independently of the AI path; AI may only reduce dose, never raise it above protocol ceiling.",
      "SW-005 — Operator UI: 3D chamber visualization, modality index, protocol builder, live telemetry, session history, exportable reports.",
      "SW-006 — All sessions persisted with configuration, telemetry samples and completion status (completed | interrupted).",
      "SW-007 — Watchdog: loss of biometric stream > 500 ms forces graceful session abort and logs the event.",
      "SW-008 — Firmware update over authenticated channel with rollback to last-known-good image.",
    ] },

    { h: "6. Safety & Interlock Requirements" },
    { table: { cols: ["ID", "Hazard", "Mitigation", "Verification"], widths: [50, 140, 200, 167], rows: [
      ["SF-001", "Thermal burn (FIT)", "NTC at 3 contact points + TCO 60 °C", "DVT-04 thermal soak"],
      ["SF-002", "Electrical leakage (MCT)", "GFCI 10 μA trip + crowbar 1000 μA cap", "EVT-06 leakage test"],
      ["SF-003", "H₂ accumulation", "MQ-8 sensor, auto-shutdown at 25% LEL", "DVT-07 gas safety"],
      ["SF-004", "Ozone over-exposure", "Ambient O₃ sensor, auto-off at 0.05 ppm", "DVT-07 gas safety"],
      ["SF-005", "Spark near H₂", "Hard interlock: HIT and MCT mutually exclusive", "EVT-06 interlock matrix"],
      ["SF-006", "Patient entrapment", "Canopy lift force limit + E-stop within reach", "DVT-09 mechanical safety"],
      ["SF-007", "Runaway AI dosing", "Independent safety engine caps every channel", "DVT-02 fault injection"],
      ["SF-008", "Loss of mains", "Controlled shutdown sequence on UPS reserve", "DVT-06 power interruption"],
    ] } },

    { h: "7. Performance Targets" },
    { kv: [
      ["Safety cutoff latency", "< 100 ms (p99)"],
      ["Frequency precision", "± 0.01 Hz (OCXO-disciplined)"],
      ["PBM irradiance uniformity", "100–120 mW/cm² across treatment plane"],
      ["PEMF field uniformity", "± 5% across chamber volume"],
      ["Thermal ramp", "37 → 55 °C within 12 min, ± 1.0 °C hold"],
      ["Acoustic TRZ ratio", "> 0.8"],
      ["Vortex water temperature", "4.0 °C ± 0.5 °C"],
      ["Orgone differential", "≥ 1.0 °F over 30 min vs. control"],
      ["Continuous duty", "8 h/day without thermal derating"],
    ] },

    { h: "8. Regulatory & Compliance Posture" },
    { list: [
      "FDA 21 CFR Part 880 — Class III concept; no clearance sought at prototype stage.",
      "IEC 60601-1 — general safety design intent (not certified at prototype stage).",
      "IEC 60601-1-2 — EMC design intent; Tier 3 emitters require shielded-room characterization.",
      "FCC Part 15/18 — emissions characterization required before any demonstration outside a shielded facility.",
      "ISO 14971 — risk management file to be maintained across EVT and DVT.",
      "IEC 62304 — software lifecycle process applied to firmware and supervisory software.",
    ] },

    { h: "9. Deliverables & Acceptance" },
    { list: [
      "One (1) functional Omega MedBed prototype meeting FR-001 through FR-010.",
      "Complete as-built BOM with serialized long-lead items.",
      "Firmware and application source, build scripts, and reproducible image.",
      "EVT and DVT reports with pass/fail against every requirement ID.",
      "Risk management file, test fixtures, and calibration certificates.",
      "Acceptance = 100% of FR and SF requirements pass, with no open Severity-1 or Severity-2 defects.",
    ] },
    { p: DISCLAIMER },
  ],
};

const OMEGA_PDR = {
  id: "omega-pdr",
  product: "omega",
  kind: "PDR",
  code: "ZA-ENG-MB-OMEGA-A-PDR",
  title: "Preliminary Design Review",
  subtitle: "Omega MedBed ZA-MB-Ω · Architecture, Layer Stack & Risk Review",
  blocks: [
    { h: "1. Review Objective" },
    { p: "The Preliminary Design Review establishes that the proposed Omega MedBed architecture satisfies the PRD requirements baseline, that all long-lead and high-risk items are identified, and that the design is mature enough to release the BOM and begin EVT build. Exit criteria: every PRD requirement mapped to a physical or software element, all Severity-1 risks mitigated or accepted in writing, and all interfaces frozen." },

    { h: "2. Physical Layer Stack (Bottom to Top)" },
    { table: { cols: ["Level", "Datum", "Assembly", "Subsystems"], widths: [45, 55, 200, 157], rows: [
      ["L-1", "−1.9 m", "Steel plinth / skid frame", "STRUCTURAL"],
      ["L0", "−1.5 m", "Power & safety base tray", "PWR, SAFETY, E-stop bus"],
      ["L1", "−1.1 m", "Subsystem column components", "PRI, BIO, HIT, VOR"],
      ["L2", "−0.7 m", "Orgone accumulator base, 20-layer stack", "ORG"],
      ["L3", "−0.3 m", "Mattress assembly, 6-layer stack", "VAT, PEMF, FIT"],
      ["L4", "0.0 m", "Patient table chassis, electrode ports", "MCT, structural datum"],
      ["L5", "+0.4 m", "Canopy structural frame + lift mechanism", "STRUCTURAL"],
      ["L6", "+0.8 m", "Vedic Nada acoustic manifold, 7-resonator", "NAD"],
      ["L7", "+1.2 m", "Global scaling resonator array, 4× G-Element", "GSC"],
      ["L8", "+1.6 m", "Chromotherapy + PBM + EEG service tray", "CHM, PBM, EEG, HIT, NIA"],
      ["L9", "+2.0 m", "Canopy outer shell", "STRUCTURAL, RIF plasma ports"],
      ["L10", "+2.5 m", "Scalar field corona array", "SFT, phase-conjugate stage"],
    ] } },

    { h: "3. Control Architecture" },
    { p: "A three-tier control stack separates hard real-time safety from adaptive intelligence. The safety tier is authoritative: it can independently de-energize any channel and cannot be overridden by the inference tier." },
    { table: { cols: ["Tier", "Processor", "Responsibility", "Cycle"], widths: [70, 130, 220, 92], rows: [
      ["Safety / RT", "STM32H7 (dual)", "Interlocks, emitter drive, threshold cutoff", "1 ms"],
      ["Adaptive", "ARM Cortex-A72", "Protocol engine, dosimetry, telemetry store", "100 ms"],
      ["Inference", "TensorFlow Lite / NPU", "Biometric response model, dose recommendation", "100 ms"],
      ["Operator", "Application UI", "Protocol authoring, visualization, reporting", "Event-driven"],
    ] } },

    { h: "4. Interface Control Summary" },
    { table: { cols: ["Interface", "Type", "From → To", "Notes"], widths: [90, 90, 170, 162], rows: [
      ["ICD-01", "CAN-FD 5 Mbps", "Safety RT → Modality drivers", "Deterministic, dual-redundant"],
      ["ICD-02", "SPI + DMA", "Sensor front-end → Safety RT", "Biometric acquisition"],
      ["ICD-03", "Ethernet / gRPC", "Adaptive → Operator UI", "Telemetry + control"],
      ["ICD-04", "Hardwired loop", "E-stop → All power stages", "Fail-safe open, no software"],
      ["ICD-05", "Fiber optic", "Adaptive → SFT/PRI stage", "Galvanic isolation of T3 emitters"],
      ["ICD-06", "I²C", "Gas sensors → Safety RT", "H₂ / O₃ interlock chain"],
    ] } },

    { h: "5. Design Risk Register" },
    { table: { cols: ["Risk", "Description", "Sev", "Mitigation"], widths: [60, 220, 40, 192], rows: [
      ["R-01", "Tier 3 emitters have no validated dosimetry basis", "1", "Hard power ceilings; shielded-room characterization before patient-facing use"],
      ["R-02", "EMI from SFT/PRI corrupts biometric acquisition", "1", "Fiber isolation, shielded sensor loom, notch filtering; verified in EVT-05"],
      ["R-03", "H₂ + electrode spark coexistence", "1", "Mutually exclusive interlock, forced purge cycle"],
      ["R-04", "3.5 kW thermal load in enclosed canopy", "2", "Active extraction, derating curve, DVT-04 soak"],
      ["R-05", "OCXO drift over long sessions", "2", "GPS/rubidium discipline option, 30-min warm-up gate"],
      ["R-06", "Long-lead electron tubes (PRI) unavailable", "2", "Dual-source qualification; solid-state fallback stage"],
      ["R-07", "AI model overfits limited biometric dataset", "3", "Conservative dose ceilings; model may only attenuate"],
      ["R-08", "Canopy lift pinch hazard", "2", "Force-limited actuator, light curtain, DVT-09"],
    ] } },

    { h: "6. Long-Lead Items" },
    { list: [
      "Conditioned electron tube set (PRI) — 16 weeks",
      "PZT-5H nanocrystal G-Elements (GSC) — 14 weeks",
      "OCXO frequency reference, ± 0.01 Hz — 12 weeks",
      "Custom bifilar coil winding, 8-pair octagon (SFT) — 12 weeks",
      "19-channel EEG front-end module — 10 weeks",
      "PEM hydrogen electrolyzer stack — 10 weeks",
      "Corrugated implosion impeller, machined (VOR) — 10 weeks",
    ] },

    { h: "7. PDR Exit Criteria" },
    { list: [
      "All PRD requirement IDs traced to an assembly or software module — required.",
      "Interfaces ICD-01 through ICD-06 frozen — required.",
      "Severity-1 risks R-01, R-02, R-03 carry written mitigation plans — required.",
      "BOM released to procurement with long-lead POs placed — required.",
      "EVT test plan drafted and reviewed — required.",
    ] },
    { p: DISCLAIMER },
  ],
};

const OMEGA_BOM = {
  id: "omega-bom",
  product: "omega",
  kind: "BOM",
  code: "ZA-ENG-MB-OMEGA-A-BOM-001",
  title: "Bill of Materials",
  subtitle: "Omega MedBed ZA-MB-Ω · 94 Line Items · 1,284 Components",
  blocks: [
    { h: "1. BOM Summary" },
    { kv: [
      ["BOM Line Items", "94"],
      ["Total Component Count", "1,284"],
      ["Assembly Labour", "166 h"],
      ["Structural Mass", "≤ 1,200 kg"],
      ["Longest Lead Time", "16 weeks (PRI tube set)"],
      ["Revision", "Rev A · 2026-08-12"],
    ] },

    { h: "2. Structural & Mechanical" },
    { table: { cols: ["Item", "Description", "Qty", "Material / Spec"], widths: [50, 230, 40, 192], rows: [
      ["1.01", "Steel plinth / skid frame, welded", "1", "A36 steel, powder coated"],
      ["1.02", "Patient table chassis", "1", "6061-T6 aluminium"],
      ["1.03", "Corner guard, titanium", "4", "Ti-6Al-4V"],
      ["1.04", "Canopy structural frame, geodesic", "1", "6061-T6, anodized"],
      ["1.05", "Canopy outer shell panel", "12", "Composite, EMI-shielded"],
      ["1.06", "Canopy lift actuator, force-limited", "2", "24 VDC, 4 kN, encoder feedback"],
      ["1.07", "Mattress core, 6-layer", "1", "Memory foam + acoustic transfer layer"],
      ["1.08", "Vibration isolation mount", "8", "Elastomeric, 60 Shore A"],
      ["1.09", "Equipment column enclosure", "1", "Steel, ventilated, lockable"],
      ["1.10", "Access porthole, brass ring", "3", "Borosilicate window"],
    ] } },

    { h: "3. Modality Emitters & Transducers" },
    { table: { cols: ["Item", "Description", "Qty", "Spec"], widths: [50, 230, 40, 192], rows: [
      ["2.01", "LED module, 660 nm", "25", "PBM · 100–120 mW/cm²"],
      ["2.02", "LED module, 810 nm", "25", "PBM · transcranial capable"],
      ["2.03", "LED module, 850 nm", "25", "PBM · deep tissue"],
      ["2.04", "Helmholtz coil pair", "4", "PEMF · 2×2 matrix, ± 5% uniformity"],
      ["2.05", "Acoustic transducer", "8", "VAT · 20–528 Hz"],
      ["2.06", "Carbon fibre FIR panel", "6", "FIT · 5–14 μm, 37–55 °C"],
      ["2.07", "Gold-plated electrode port", "4", "MCT · 1–999 μA"],
      ["2.08", "Bifilar coil pair, octagonal", "8", "SFT · 10–40 kHz carrier"],
      ["2.09", "Conditioned electron tube", "3", "PRI · F1/F2/F3 channels"],
      ["2.10", "Plasma tube, quartz-windowed", "4", "RIF · 200–400 nm UV capable"],
      ["2.11", "PZT-5H G-Element resonator", "4", "GSC · < 1 W each"],
      ["2.12", "WLED chromotherapy strip", "14", "CHM · full-spectrum programmable"],
      ["2.13", "Nada acoustic resonator", "7", "NAD · 256–426 Hz formants"],
      ["2.14", "Corona ion emitter", "2", "NIA · 5–8 kV"],
      ["2.15", "Orgone layer set, organic/metallic", "20", "ORG · wool felt + galvanized steel"],
    ] } },

    { h: "4. Fluid, Gas & Thermal" },
    { table: { cols: ["Item", "Description", "Qty", "Spec"], widths: [50, 230, 40, 192], rows: [
      ["3.01", "PEM hydrogen electrolyzer", "1", "HIT · 99.99%, 150–300 mL/min"],
      ["3.02", "Ozone generator, medical grade", "1", "OZO · 0.5–5%"],
      ["3.03", "Implosion vortex impeller, corrugated", "1", "VOR · machined stainless"],
      ["3.04", "Water reservoir, 40 L", "1", "VOR · insulated, food grade"],
      ["3.05", "Peltier + compressor hybrid chiller", "1", "VOR · 4.0 °C ± 0.5 °C"],
      ["3.06", "HEPA + activated carbon filter", "2", "NIA · canopy atmosphere"],
      ["3.07", "Extraction fan, EC, variable", "4", "Thermal management"],
      ["3.08", "Gas manifold, spark-free", "1", "H₂ delivery, purge capable"],
    ] } },

    { h: "5. Control, Sensing & Power" },
    { table: { cols: ["Item", "Description", "Qty", "Spec"], widths: [50, 230, 40, 192], rows: [
      ["4.01", "ARM Cortex-A72 SBC", "1", "Adaptive tier, Linux"],
      ["4.02", "STM32H7 real-time controller", "2", "Safety tier, redundant"],
      ["4.03", "NPU inference accelerator", "1", "TensorFlow Lite"],
      ["4.04", "OCXO frequency reference", "1", "± 0.01 Hz"],
      ["4.05", "19-channel EEG front-end", "1", "10-20 montage"],
      ["4.06", "HRV / ECG front-end", "1", "Biometric tier"],
      ["4.07", "SpO₂ sensor module", "2", "Biometric tier"],
      ["4.08", "GSR sensor module", "2", "Biometric tier"],
      ["4.09", "NTC temperature probe", "5", "3 contact + 2 ambient"],
      ["4.10", "MQ-8 hydrogen sensor", "2", "25% LEL cutoff"],
      ["4.11", "Ozone ambient sensor", "2", "0.03 / 0.05 ppm thresholds"],
      ["4.12", "Isolated power supply, 3.5 kW", "1", "120/240 VAC, 30 A"],
      ["4.13", "UPS reserve module", "1", "Controlled shutdown"],
      ["4.14", "GFCI module, 10 μA trip", "1", "MCT protection"],
      ["4.15", "E-stop assembly, hardwired", "3", "Fail-safe open"],
      ["4.16", "Fibre-optic isolation link", "4", "T3 emitter galvanic isolation"],
      ["4.17", "CAN-FD backbone harness", "1", "Dual-redundant, 5 Mbps"],
      ["4.18", "Operator display, medical grade", "1", "Touch, 1080p"],
    ] } },
    { p: "Full 94-line indented BOM with manufacturer part numbers, approved-vendor list, and serialization plan is released to the manufacturer as a controlled spreadsheet at PDR exit. The table above is the summary rollup by assembly group." },
    { p: DISCLAIMER },
  ],
};

const OMEGA_SOW = {
  id: "omega-sow",
  product: "omega",
  kind: "SOW",
  code: "ZA-ENG-MB-OMEGA-A-SOW-001",
  title: "Statement of Work",
  subtitle: "Omega MedBed ZA-MB-Ω · Prototype Build, Firmware & Application Development",
  blocks: [
    { h: "1. Engagement Summary" },
    { p: "This Statement of Work covers the design-for-manufacture, procurement, fabrication, integration, firmware development, application software development, and verification of one (1) Omega MedBed ZA-MB-Ω engineering prototype. Two vendor tracks execute in parallel: a hardware manufacturer track and a software developer track, joined at integration." },

    { h: "2. Hardware Manufacturer Scope" },
    { list: [
      "HW-1 — Design for manufacture: convert PDR-level design to released fabrication drawings, tolerance stack-up and weldments.",
      "HW-2 — Procurement: place all 94 BOM lines, expedite the seven long-lead items, maintain an approved-vendor list.",
      "HW-3 — Fabrication: chassis, plinth, canopy frame and shell, equipment column, mattress stack, orgone layer set.",
      "HW-4 — Subassembly: all 18 modality emitter modules built and bench-qualified before integration.",
      "HW-5 — Harnessing: CAN-FD backbone, shielded sensor loom, fibre isolation links, hardwired E-stop loop.",
      "HW-6 — Integration: full mechanical and electrical build to the L-1 through L10 layer stack.",
      "HW-7 — Fixtures: EVT/DVT test fixtures, thermal soak chamber interface, EMC pre-scan rig.",
      "HW-8 — Documentation: as-built BOM, calibration certificates, deviation log, assembly record (166 h target).",
    ] },

    { h: "3. Software Developer Scope" },
    { list: [
      "SW-1 — Safety firmware on STM32H7: 1 ms interlock loop, threshold cutoff, E-stop handling, POST self-test.",
      "SW-2 — Modality drivers: 18 channel drivers with per-channel power ceilings and calibration tables.",
      "SW-3 — Adaptive layer on Cortex-A72: protocol engine, dosimetry scheduler, telemetry pipeline.",
      "SW-4 — Inference integration: TensorFlow Lite model loading, versioning, attenuate-only dose policy.",
      "SW-5 — Operator application: 3D chamber visualization, modality index, protocol builder, live telemetry, session history, report export.",
      "SW-6 — Persistence: session records with configuration, telemetry samples, completion status.",
      "SW-7 — Update path: authenticated firmware update with last-known-good rollback.",
      "SW-8 — Test automation: hardware-in-the-loop harness executing the EVT and DVT protocol suites.",
    ] },

    { h: "4. Schedule & Milestones" },
    { table: { cols: ["Milestone", "Description", "Week", "Gate"], widths: [60, 230, 45, 177], rows: [
      ["M1", "Contract award, PRD baseline frozen", "0", "PRD sign-off"],
      ["M2", "PDR complete, BOM released, long-lead POs placed", "4", "PDR exit criteria"],
      ["M3", "Fabrication drawings released", "8", "DFM review"],
      ["M4", "Subassemblies bench-qualified", "16", "Module acceptance"],
      ["M5", "Firmware alpha on bench hardware", "18", "Safety loop demo"],
      ["M6", "Mechanical integration complete", "22", "Layer stack inspection"],
      ["M7", "Power-on, POST passing, EVT start", "24", "EVT entry"],
      ["M8", "EVT complete, defects triaged", "30", "EVT exit"],
      ["M9", "DVT complete, reports issued", "38", "DVT exit"],
      ["M10", "Prototype acceptance and handover", "40", "Final acceptance"],
    ] } },

    { h: "5. Deliverables" },
    { list: [
      "One (1) integrated Omega MedBed prototype, powered and passing POST.",
      "Released fabrication drawing package and as-built BOM.",
      "Firmware and application source with reproducible build and signed images.",
      "Hardware-in-the-loop test harness and automation scripts.",
      "EVT report, DVT report, calibration certificates, deviation log.",
      "Risk management file updated through DVT exit.",
    ] },

    { h: "6. Acceptance Criteria" },
    { list: [
      "All FR-001 through FR-010 verified pass.",
      "All SF-001 through SF-008 verified pass with documented evidence.",
      "Safety cutoff p99 latency ≤ 100 ms across the full DVT dataset.",
      "Zero open Severity-1 or Severity-2 defects at handover.",
      "As-built documentation matches the delivered unit with all deviations logged and approved.",
    ] },

    { h: "7. Assumptions & Exclusions" },
    { list: [
      "Excluded: clinical trials, human subject use, regulatory submission authoring, production tooling.",
      "Excluded: certification testing to IEC 60601 (design intent only at prototype stage).",
      "Assumed: customer supplies the shielded facility required for Tier 3 emitter characterization.",
      "Assumed: single prototype quantity; no production yield or cost-down obligations.",
      "Changes to the PRD baseline after M2 are handled by written change order with schedule and cost impact.",
    ] },
    { p: DISCLAIMER },
  ],
};

const OMEGA_EVT = {
  id: "omega-evt",
  product: "omega",
  kind: "EVT",
  code: "ZA-ENG-MB-OMEGA-A-EVT-001",
  title: "Engineering Validation Test Plan",
  subtitle: "Omega MedBed ZA-MB-Ω · Does the design work?",
  blocks: [
    { h: "1. EVT Objective" },
    { p: "Engineering Validation Test confirms that the integrated prototype functions as designed: every subsystem powers, every interface communicates, every interlock fires, and every requirement is demonstrable at least once under nominal conditions. EVT is a functional gate, not a durability or margin gate — those belong to DVT." },
    { kv: [
      ["Entry Criteria", "Integration complete, POST passing, all 18 channels enumerated"],
      ["Exit Criteria", "100% of EVT cases executed; zero open Severity-1 defects"],
      ["Unit Quantity", "1 prototype"],
      ["Duration", "6 weeks (M7 → M8)"],
    ] },

    { h: "2. EVT Test Matrix" },
    { table: { cols: ["Test", "Title", "Method", "Pass Criterion"], widths: [50, 150, 170, 142], rows: [
      ["EVT-01", "Power-on & POST", "Cold start ×50 cycles", "50/50 clean POST, no fault latch"],
      ["EVT-02", "Channel enumeration", "Driver bring-up, all 18", "18/18 respond, calibration loaded"],
      ["EVT-03", "PBM irradiance", "Radiometer, 25-point grid", "100–120 mW/cm² at every point"],
      ["EVT-04", "PEMF uniformity", "Gaussmeter, chamber volume", "± 5% across mapped volume"],
      ["EVT-05", "EMI / biometric integrity", "T3 emitters on, sensors live", "No biometric corruption, SNR within spec"],
      ["EVT-06", "Electrical safety & interlock", "Leakage + interlock matrix", "GFCI trips ≤ 10 μA; HIT/MCT exclusive"],
      ["EVT-07", "Thermal ramp", "FIT 37 → 55 °C", "Ramp ≤ 12 min, hold ± 1.0 °C"],
      ["EVT-08", "Acoustic response", "VAT sweep 20–528 Hz", "TRZ ratio > 0.8, no rattle"],
      ["EVT-09", "Frequency accuracy", "Counter vs OCXO reference", "± 0.01 Hz on all channels"],
      ["EVT-10", "Gas subsystem", "H₂ flow + O₃ concentration", "Flow 150–300 mL/min; sensors respond"],
      ["EVT-11", "Vortex water loop", "Chiller + impeller run", "4.0 °C ± 0.5 °C achieved and held"],
      ["EVT-12", "Biometric acquisition", "5 streams, 60 min", "All streams ≥ 10 Hz, no dropout"],
      ["EVT-13", "Closed-loop latency", "Injected threshold events ×200", "p99 cycle ≤ 100 ms"],
      ["EVT-14", "Safety cutoff", "Threshold breach per channel", "Cutoff < 100 ms, all 18 channels"],
      ["EVT-15", "E-stop function", "All 3 E-stops ×10 each", "All emitters de-energized ≤ 200 ms"],
      ["EVT-16", "Protocol round-trip", "Build, save, recall, run ×25", "100% parameter fidelity"],
      ["EVT-17", "Telemetry logging", "Normal + interrupted sessions", "Records complete for both paths"],
      ["EVT-18", "Report export", "Generate every report type", "All exports render with correct data"],
      ["EVT-19", "Canopy lift safety", "Obstruction test ×20", "Force limit holds, motion stops"],
      ["EVT-20", "Firmware update", "Update + forced rollback ×10", "10/10 recover to known-good image"],
    ] } },

    { h: "3. Instrumentation" },
    { list: [
      "Calibrated radiometer (350–1000 nm) for PBM irradiance mapping.",
      "Three-axis gaussmeter for PEMF field mapping.",
      "Frequency counter disciplined to an external reference for OCXO verification.",
      "Thermal imaging camera plus calibrated NTC reference probes.",
      "Near-field EMI probe set and spectrum analyser for pre-scan.",
      "Hardware-in-the-loop harness for injected fault and latency measurement.",
      "Calibrated H₂ and O₃ reference gas sensors.",
    ] },

    { h: "4. Defect Severity & Disposition" },
    { table: { cols: ["Severity", "Definition", "Disposition"], widths: [80, 250, 182], rows: [
      ["1", "Safety function fails or hazard is unmitigated", "Blocks EVT exit — fix and full retest"],
      ["2", "Requirement not met, no safety impact", "Blocks EVT exit — fix and targeted retest"],
      ["3", "Degraded performance within tolerance", "May defer to DVT with written rationale"],
      ["4", "Cosmetic or documentation issue", "Log and close before final acceptance"],
    ] } },
    { p: DISCLAIMER },
  ],
};

const OMEGA_DVT = {
  id: "omega-dvt",
  product: "omega",
  kind: "DVT",
  code: "ZA-ENG-MB-OMEGA-A-DVT-001",
  title: "Design Validation Test Plan",
  subtitle: "Omega MedBed ZA-MB-Ω · Does the design hold up?",
  blocks: [
    { h: "1. DVT Objective" },
    { p: "Design Validation Test proves the design holds margin over time, temperature, fault conditions and repeated use. Where EVT demonstrated function once, DVT demonstrates function repeatedly under stress, and characterizes the failure boundary. DVT exit is the gate for prototype acceptance." },
    { kv: [
      ["Entry Criteria", "EVT exit achieved, zero open Severity-1 defects"],
      ["Exit Criteria", "All DVT cases pass; margin documented; risk file updated"],
      ["Duration", "8 weeks (M8 → M9)"],
      ["Sample", "1 prototype, full-configuration"],
    ] },

    { h: "2. DVT Test Matrix" },
    { table: { cols: ["Test", "Title", "Stress Condition", "Pass Criterion"], widths: [50, 145, 175, 142], rows: [
      ["DVT-01", "Continuous duty", "8 h/day × 20 days at 3.5 kW", "No thermal derate, no channel failure"],
      ["DVT-02", "Fault injection", "500 injected faults across 18 channels", "100% correct safety response"],
      ["DVT-03", "Safety latency margin", "10,000 threshold breach events", "p99 ≤ 100 ms, p100 ≤ 150 ms"],
      ["DVT-04", "Thermal soak", "40 °C ambient, full load, 12 h", "All surfaces within limits, TCO untripped"],
      ["DVT-05", "Cold start", "10 °C ambient, 50 cycles", "POST pass, OCXO settles within warm-up gate"],
      ["DVT-06", "Power interruption", "200 mains drops, random phase", "Controlled shutdown, no data loss"],
      ["DVT-07", "Gas safety", "Forced H₂ leak + O₃ over-range", "Auto-shutdown at 25% LEL / 0.05 ppm"],
      ["DVT-08", "EMC pre-compliance", "Radiated + conducted scan, all T3 on", "Within IEC 60601-1-2 design targets"],
      ["DVT-09", "Mechanical safety", "Canopy 5,000 cycles + entrapment test", "No degradation, force limit holds"],
      ["DVT-10", "Structural load", "180 kg static + 1.5× dynamic", "No permanent deformation"],
      ["DVT-11", "Vibration & transport", "ISTA-class transport profile", "No loosening, POST pass after"],
      ["DVT-12", "Frequency stability", "72 h continuous, drift logged", "± 0.01 Hz maintained throughout"],
      ["DVT-13", "Water loop endurance", "500 h vortex operation", "4.0 °C ± 0.5 °C held, no cavitation damage"],
      ["DVT-14", "Orgone differential", "30-min runs ×30 vs control", "ΔT ≥ 1.0 °F, repeatable"],
      ["DVT-15", "Biometric endurance", "100 sessions, 5 streams", "Zero unlogged dropouts"],
      ["DVT-16", "AI dose ceiling", "Adversarial biometric inputs ×1,000", "Model never exceeds protocol ceiling"],
      ["DVT-17", "Session data integrity", "500 sessions incl. forced interrupts", "500/500 records complete and consistent"],
      ["DVT-18", "Sustained soak", "30-day powered soak, mixed protocols", "No latent fault, no memory growth"],
    ] } },

    { h: "3. Reliability Targets" },
    { kv: [
      ["Prototype MTBF target", "≥ 2,000 h (demonstrated by soak extrapolation)"],
      ["Safety function availability", "100% — no tolerated failures"],
      ["Canopy actuator life", "≥ 5,000 cycles without degradation"],
      ["Emitter output drift", "≤ 5% over 500 h operation"],
      ["Calibration interval", "6 months or 1,000 operating hours"],
    ] },

    { h: "4. DVT Exit & Acceptance" },
    { list: [
      "All 18 DVT cases executed with recorded evidence and raw data retained.",
      "Zero open Severity-1 or Severity-2 defects.",
      "Margin documented for every safety-critical parameter.",
      "Risk management file (ISO 14971) updated with post-DVT residual risk.",
      "As-built documentation reconciled against the delivered unit.",
      "Formal handover package issued to the customer.",
    ] },
    { p: DISCLAIMER },
  ],
};

/* ============================= AATCS-P1 ============================== */

const AATCS_PRD = {
  id: "aatcs-prd",
  product: "aatcs",
  kind: "PRD",
  code: "AATCS-P1-PRD",
  title: "Product Requirements Document",
  subtitle: "AATCS-P1 Adaptive Resonator Bed · Adaptive Acoustic & Thermal Coupled System",
  blocks: [
    { h: "1. Purpose & Scope" },
    { p: "The AATCS-P1 Adaptive Resonator Bed is a focused, lower-complexity companion platform to the Omega MedBed. It delivers adaptive acoustic resonance, thermal coupling and photonic entrainment in an open-frame pod without the Tier 3 emitter set, hydrogen or ozone subsystems. Its purpose is to provide a faster-to-build, lower-risk platform for validating the shared BFAC+ACE closed-loop control stack." },
    { p: "Scope: one (1) functional AATCS-P1 prototype including frame, resonator manifold, thermal envelope, photonic array, biometric acquisition, shared control stack and operator application. Out of scope: all Tier 3 modalities, gas subsystems, and vortex water loop." },

    { h: "2. Product Definition" },
    { kv: [
      ["Designator", "AATCS-P1"],
      ["Classification", "Research prototype — non-clinical"],
      ["Form Factor", "Open-frame resonance pod, contoured couch"],
      ["Envelope (L×W×H)", "2,100 × 1,100 × 1,200 mm"],
      ["Total Mass", "≤ 380 kg"],
      ["Max Patient Mass", "180 kg"],
      ["Power Input", "120/240 VAC, 15 A"],
      ["Max Continuous Power", "1.2 kW"],
      ["Session Range", "30 s – 60 min"],
      ["Integrated Modalities", "7 (all Tier 1 / Tier 2)"],
    ] },

    { h: "3. Modality Set" },
    { table: { cols: ["Code", "Modality", "Specification", "Tier"], widths: [45, 140, 290, 40], rows: [
      ["VAT", "Vibroacoustic Resonance", "20–528 Hz · 12-transducer contoured array", "T1"],
      ["FIT", "Far-Infrared Thermal", "5–14 μm · 37–50 °C · 4 carbon panels", "T1"],
      ["PBM", "Photobiomodulation", "660/850 nm · 3×5 overhead array", "T1"],
      ["PEMF", "Pulsed EM Field", "0.5–4 Hz + 7.83 Hz Schumann · single Helmholtz pair", "T1"],
      ["BIO", "Biometric Closed-Loop", "HRV/SpO₂/GSR/Temp · 100 ms cycle", "T1"],
      ["NAD", "Nada Acoustic Resonance", "256–426 Hz formant set · 5 resonators", "T2"],
      ["CHM", "Chromotherapy", "WLED full-spectrum · 7-color programmable", "T2"],
    ] } },

    { h: "4. Functional Requirements" },
    { table: { cols: ["REQ ID", "Requirement", "Acceptance Criterion"], widths: [70, 215, 230], rows: [
      ["AFR-01", "Drive all 7 modalities concurrently", "7 channels active ≥ 30 min, no dropout"],
      ["AFR-02", "Acquire HRV, SpO₂, GSR and temperature", "4 streams at ≥ 10 Hz continuously"],
      ["AFR-03", "Adaptive resonance tracking of body response", "Resonance re-tune within 2 s of drift"],
      ["AFR-04", "Closed-loop cycle within 100 ms", "p99 latency ≤ 100 ms"],
      ["AFR-05", "Safety cutoff on threshold breach", "< 100 ms de-energize, all channels"],
      ["AFR-06", "Share protocol format with Omega MedBed", "Protocols portable between platforms"],
      ["AFR-07", "Log full session telemetry", "Records complete for normal + interrupted runs"],
      ["AFR-08", "Emergency stop de-energizes all emitters", "≤ 200 ms from actuation"],
    ] } },

    { h: "5. Performance Targets" },
    { kv: [
      ["Acoustic coupling (TRZ)", "> 0.85 across contoured surface"],
      ["Acoustic frequency precision", "± 0.05 Hz"],
      ["Thermal ramp", "37 → 50 °C within 8 min, ± 1.0 °C hold"],
      ["PBM irradiance", "80–100 mW/cm² across treatment plane"],
      ["PEMF uniformity", "± 8% across couch volume"],
      ["Safety cutoff latency", "< 100 ms (p99)"],
      ["Continuous duty", "10 h/day without derating"],
      ["Acoustic noise floor", "≤ 45 dBA at 1 m (non-therapeutic)"],
    ] },

    { h: "6. Shared Architecture Requirement" },
    { p: "AATCS-P1 shall reuse the Omega MedBed control stack unchanged wherever possible: the same STM32H7 safety tier, the same protocol schema, the same telemetry record format and the same operator application, differing only in the channel manifest and calibration tables. This makes AATCS-P1 the de-risking vehicle for the shared software before Omega integration." },
    { p: DISCLAIMER },
  ],
};

const AATCS_PDR = {
  id: "aatcs-pdr",
  product: "aatcs",
  kind: "PDR",
  code: "AATCS-P1-PDR",
  title: "Preliminary Design Review",
  subtitle: "AATCS-P1 Adaptive Resonator Bed · Architecture & Risk Review",
  blocks: [
    { h: "1. Review Objective" },
    { p: "Confirm the AATCS-P1 architecture meets its PRD baseline, that it genuinely reuses the shared control stack, and that the design is ready for BOM release and EVT build. Because AATCS-P1 precedes Omega integration, an additional exit criterion applies: the shared software must run on AATCS-P1 hardware without forking." },

    { h: "2. Assembly Stack" },
    { table: { cols: ["Level", "Assembly", "Subsystems"], widths: [55, 230, 227], rows: [
      ["A0", "Base frame and levelling feet", "STRUCTURAL"],
      ["A1", "Power and safety tray", "PWR, SAFETY, E-stop bus"],
      ["A2", "Helmholtz coil pair, under-couch", "PEMF"],
      ["A3", "Resonator manifold, 12-transducer contoured", "VAT"],
      ["A4", "Thermal envelope, 4 carbon panels", "FIT"],
      ["A5", "Contoured couch surface, acoustic transfer", "STRUCTURAL, VAT coupling"],
      ["A6", "Nada resonator ring, 5-element", "NAD"],
      ["A7", "Overhead photonic arch", "PBM, CHM"],
      ["A8", "Biometric sensor harness", "BIO"],
      ["A9", "Control enclosure, side mounted", "Control stack, operator display"],
    ] } },

    { h: "3. Control Architecture" },
    { table: { cols: ["Tier", "Processor", "Responsibility", "Cycle"], widths: [70, 130, 220, 92], rows: [
      ["Safety / RT", "STM32H7", "Interlocks, drive, threshold cutoff", "1 ms"],
      ["Adaptive", "ARM Cortex-A72", "Resonance tracking, protocol engine, telemetry", "100 ms"],
      ["Inference", "TensorFlow Lite", "Response model, attenuate-only dose policy", "100 ms"],
      ["Operator", "Shared application", "Identical UI to Omega, different manifest", "Event-driven"],
    ] } },
    { p: "Interfaces reuse Omega ICD-01 (CAN-FD), ICD-02 (sensor SPI), ICD-03 (gRPC telemetry) and ICD-04 (hardwired E-stop). ICD-05 (fibre isolation) and ICD-06 (gas sensors) are not populated on AATCS-P1." },

    { h: "4. Design Risk Register" },
    { table: { cols: ["Risk", "Description", "Sev", "Mitigation"], widths: [55, 225, 40, 192], rows: [
      ["AR-01", "Acoustic coupling varies with patient mass and posture", "2", "Adaptive re-tune loop; TRZ measured across 5 body types in DVT"],
      ["AR-02", "Transducer heating during long sessions", "2", "Thermal derate curve, forced convection, DVT-04"],
      ["AR-03", "PEMF coil interferes with biometric acquisition", "2", "Shielded sensor loom, synchronized blanking window"],
      ["AR-04", "Shared software forks for AATCS-specific behaviour", "2", "Channel manifest abstraction; fork check at PDR exit"],
      ["AR-05", "Open frame offers less patient containment", "3", "Guard rails, E-stop within reach, documented supervision requirement"],
      ["AR-06", "Resonance re-tune oscillation", "3", "Damped controller, 2 s settle requirement, DVT-03"],
    ] } },

    { h: "5. Long-Lead Items" },
    { list: [
      "Contoured 12-transducer resonator manifold, custom tooling — 10 weeks",
      "Helmholtz coil pair, wound to spec — 8 weeks",
      "Carbon fibre FIR panel set, contoured — 8 weeks",
      "Biometric front-end module — 8 weeks",
      "Contoured couch surface, acoustic transfer layer — 6 weeks",
    ] },

    { h: "6. PDR Exit Criteria" },
    { list: [
      "All AFR requirement IDs traced to an assembly or software module.",
      "Shared control stack demonstrated running on AATCS hardware without a code fork.",
      "Severity-2 risks AR-01 through AR-04 carry written mitigation plans.",
      "BOM released and long-lead POs placed.",
      "EVT plan reviewed and approved.",
    ] },
    { p: DISCLAIMER },
  ],
};

const AATCS_BOM = {
  id: "aatcs-bom",
  product: "aatcs",
  kind: "BOM",
  code: "AATCS-P1-BOM-001",
  title: "Bill of Materials",
  subtitle: "AATCS-P1 Adaptive Resonator Bed · 46 Line Items · 412 Components",
  blocks: [
    { h: "1. BOM Summary" },
    { kv: [
      ["BOM Line Items", "46"],
      ["Total Component Count", "412"],
      ["Assembly Labour", "58 h"],
      ["Structural Mass", "≤ 380 kg"],
      ["Longest Lead Time", "10 weeks (resonator manifold)"],
      ["Revision", "Rev A · 2026-08-12"],
    ] },

    { h: "2. Structural & Mechanical" },
    { table: { cols: ["Item", "Description", "Qty", "Material / Spec"], widths: [50, 230, 40, 192], rows: [
      ["1.01", "Base frame, welded open pod", "1", "6061-T6 aluminium, anodized"],
      ["1.02", "Levelling foot, vibration isolating", "4", "Elastomeric, 60 Shore A"],
      ["1.03", "Contoured couch shell", "1", "Composite, acoustic transfer layer"],
      ["1.04", "Couch cushion set, 3-layer", "1", "Memory foam, medical upholstery"],
      ["1.05", "Overhead photonic arch", "1", "Aluminium extrusion, adjustable"],
      ["1.06", "Guard rail, removable", "2", "Powder-coated steel"],
      ["1.07", "Control enclosure, side mount", "1", "Ventilated, lockable"],
      ["1.08", "Resonator manifold housing", "1", "Machined, damped mounting"],
    ] } },

    { h: "3. Emitters & Transducers" },
    { table: { cols: ["Item", "Description", "Qty", "Spec"], widths: [50, 230, 40, 192], rows: [
      ["2.01", "Acoustic transducer, contoured mount", "12", "VAT · 20–528 Hz"],
      ["2.02", "Nada acoustic resonator", "5", "NAD · 256–426 Hz formants"],
      ["2.03", "Carbon fibre FIR panel, contoured", "4", "FIT · 5–14 μm, 37–50 °C"],
      ["2.04", "LED module, 660 nm", "8", "PBM · 80–100 mW/cm²"],
      ["2.05", "LED module, 850 nm", "7", "PBM · deep tissue"],
      ["2.06", "WLED chromotherapy strip", "6", "CHM · full-spectrum programmable"],
      ["2.07", "Helmholtz coil, wound", "2", "PEMF · single pair, ± 8%"],
      ["2.08", "Audio power amplifier channel", "12", "Class-D, per-transducer drive"],
    ] } },

    { h: "4. Control, Sensing & Power" },
    { table: { cols: ["Item", "Description", "Qty", "Spec"], widths: [50, 230, 40, 192], rows: [
      ["3.01", "ARM Cortex-A72 SBC", "1", "Adaptive tier, shared image"],
      ["3.02", "STM32H7 real-time controller", "1", "Safety tier"],
      ["3.03", "HRV / ECG front-end", "1", "Biometric tier"],
      ["3.04", "SpO₂ sensor module", "1", "Biometric tier"],
      ["3.05", "GSR sensor module", "1", "Biometric tier"],
      ["3.06", "NTC temperature probe", "4", "2 contact + 2 ambient"],
      ["3.07", "Accelerometer, coupling feedback", "4", "Resonance tracking"],
      ["3.08", "Isolated power supply, 1.2 kW", "1", "120/240 VAC, 15 A"],
      ["3.09", "E-stop assembly, hardwired", "2", "Fail-safe open"],
      ["3.10", "CAN-FD harness", "1", "Shared ICD-01"],
      ["3.11", "Shielded sensor loom", "1", "PEMF interference mitigation"],
      ["3.12", "Operator display, touch", "1", "Shared application UI"],
      ["3.13", "Cooling fan, EC, variable", "2", "Transducer thermal management"],
    ] } },
    { p: "Full 46-line indented BOM with manufacturer part numbers and approved-vendor list is released to the manufacturer as a controlled spreadsheet at PDR exit." },
    { p: DISCLAIMER },
  ],
};

const AATCS_SOW = {
  id: "aatcs-sow",
  product: "aatcs",
  kind: "SOW",
  code: "AATCS-P1-SOW-001",
  title: "Statement of Work",
  subtitle: "AATCS-P1 Adaptive Resonator Bed · Prototype Build & Shared Stack Validation",
  blocks: [
    { h: "1. Engagement Summary" },
    { p: "This Statement of Work covers design-for-manufacture, procurement, fabrication, integration and verification of one (1) AATCS-P1 Adaptive Resonator Bed prototype, plus the software work required to prove the shared control stack on AATCS hardware ahead of Omega MedBed integration. AATCS-P1 is intentionally sequenced first to de-risk the shared software." },

    { h: "2. Hardware Manufacturer Scope" },
    { list: [
      "AHW-1 — Design for manufacture: fabrication drawings for frame, couch shell, resonator manifold and photonic arch.",
      "AHW-2 — Procurement: all 46 BOM lines, expedite the five long-lead items.",
      "AHW-3 — Fabrication: base frame, contoured couch, manifold housing, control enclosure.",
      "AHW-4 — Subassembly: 12-transducer manifold, FIR panel set, photonic arch, coil pair — each bench-qualified.",
      "AHW-5 — Harnessing: CAN-FD backbone, shielded sensor loom, hardwired E-stop loop.",
      "AHW-6 — Integration: full build to the A0–A9 assembly stack (58 h target).",
      "AHW-7 — Fixtures: acoustic coupling test rig, thermal soak interface.",
      "AHW-8 — Documentation: as-built BOM, calibration certificates, deviation log.",
    ] },

    { h: "3. Software Developer Scope" },
    { list: [
      "ASW-1 — Channel manifest abstraction so one codebase serves both platforms with no fork.",
      "ASW-2 — AATCS safety firmware configuration: 7-channel interlock map and calibration tables.",
      "ASW-3 — Adaptive resonance tracking loop with 2 s re-tune requirement and damping.",
      "ASW-4 — Biometric acquisition for 4 streams with PEMF blanking window.",
      "ASW-5 — Operator application manifest for the AATCS channel set, reusing all shared UI.",
      "ASW-6 — Protocol portability: verify protocols round-trip between AATCS-P1 and Omega.",
      "ASW-7 — Hardware-in-the-loop harness covering the AATCS EVT and DVT suites.",
    ] },

    { h: "4. Schedule & Milestones" },
    { table: { cols: ["Milestone", "Description", "Week", "Gate"], widths: [60, 235, 45, 172], rows: [
      ["AM1", "Contract award, PRD baseline frozen", "0", "PRD sign-off"],
      ["AM2", "PDR complete, BOM released, long-lead POs", "3", "PDR exit criteria"],
      ["AM3", "Fabrication drawings released", "6", "DFM review"],
      ["AM4", "Subassemblies bench-qualified", "12", "Module acceptance"],
      ["AM5", "Shared stack running on AATCS hardware", "14", "No-fork demonstration"],
      ["AM6", "Integration complete, POST passing", "16", "EVT entry"],
      ["AM7", "EVT complete", "20", "EVT exit"],
      ["AM8", "DVT complete, reports issued", "26", "DVT exit"],
      ["AM9", "Prototype acceptance and handover", "28", "Final acceptance"],
    ] } },

    { h: "5. Deliverables & Acceptance" },
    { list: [
      "One (1) integrated AATCS-P1 prototype, powered and passing POST.",
      "Released fabrication drawings and as-built BOM.",
      "Shared-stack software demonstrating no platform fork.",
      "EVT and DVT reports with pass/fail against every AFR requirement ID.",
      "Acceptance = all AFR-01 through AFR-08 pass, protocol portability demonstrated, zero open Severity-1 or Severity-2 defects.",
    ] },

    { h: "6. Assumptions & Exclusions" },
    { list: [
      "Excluded: Tier 3 modalities, hydrogen, ozone and vortex water subsystems.",
      "Excluded: clinical use, human subject trials, regulatory submissions, production tooling.",
      "Assumed: Omega MedBed PRD is frozen so shared interfaces do not move mid-build.",
      "Assumed: single prototype quantity.",
      "Baseline changes after AM2 require a written change order.",
    ] },
    { p: DISCLAIMER },
  ],
};

const AATCS_EVT = {
  id: "aatcs-evt",
  product: "aatcs",
  kind: "EVT",
  code: "AATCS-P1-EVT-001",
  title: "Engineering Validation Test Plan",
  subtitle: "AATCS-P1 Adaptive Resonator Bed · Functional Verification",
  blocks: [
    { h: "1. EVT Objective" },
    { p: "Confirm that the integrated AATCS-P1 prototype functions as designed across all 7 channels, that the shared control stack operates without modification, and that every AFR requirement is demonstrable under nominal conditions." },
    { kv: [
      ["Entry Criteria", "Integration complete, POST passing, 7 channels enumerated"],
      ["Exit Criteria", "100% of cases executed; zero open Severity-1 defects"],
      ["Duration", "4 weeks (AM6 → AM7)"],
    ] },

    { h: "2. EVT Test Matrix" },
    { table: { cols: ["Test", "Title", "Method", "Pass Criterion"], widths: [55, 150, 165, 142], rows: [
      ["AEVT-01", "Power-on & POST", "Cold start ×50", "50/50 clean POST"],
      ["AEVT-02", "Channel enumeration", "Driver bring-up, all 7", "7/7 respond with calibration"],
      ["AEVT-03", "Acoustic coupling", "TRZ measurement, loaded couch", "TRZ > 0.85 across surface"],
      ["AEVT-04", "Acoustic sweep", "20–528 Hz, all 12 transducers", "No rattle, response within ± 3 dB"],
      ["AEVT-05", "Frequency accuracy", "Counter vs reference", "± 0.05 Hz across band"],
      ["AEVT-06", "Thermal ramp", "FIT 37 → 50 °C", "Ramp ≤ 8 min, hold ± 1.0 °C"],
      ["AEVT-07", "PBM irradiance", "Radiometer, 15-point grid", "80–100 mW/cm² at every point"],
      ["AEVT-08", "PEMF uniformity", "Gaussmeter, couch volume", "± 8% across mapped volume"],
      ["AEVT-09", "Biometric acquisition", "4 streams, 60 min", "All ≥ 10 Hz, no dropout"],
      ["AEVT-10", "PEMF blanking", "Coils active, sensors live", "No biometric corruption"],
      ["AEVT-11", "Resonance re-tune", "Induced coupling drift ×50", "Re-tune within 2 s, no oscillation"],
      ["AEVT-12", "Closed-loop latency", "Injected events ×200", "p99 cycle ≤ 100 ms"],
      ["AEVT-13", "Safety cutoff", "Threshold breach per channel", "< 100 ms, all 7 channels"],
      ["AEVT-14", "E-stop function", "Both E-stops ×10 each", "De-energized ≤ 200 ms"],
      ["AEVT-15", "Protocol portability", "Round-trip Omega ↔ AATCS ×25", "100% parameter fidelity"],
      ["AEVT-16", "Shared stack no-fork", "Build audit + runtime check", "Single codebase, manifest-only delta"],
      ["AEVT-17", "Telemetry logging", "Normal + interrupted sessions", "Records complete both paths"],
      ["AEVT-18", "Acoustic noise floor", "Non-therapeutic idle, 1 m", "≤ 45 dBA"],
    ] } },

    { h: "3. Instrumentation" },
    { list: [
      "Calibrated accelerometer array and acoustic analyser for TRZ coupling measurement.",
      "Calibrated radiometer for PBM irradiance mapping.",
      "Three-axis gaussmeter for PEMF field mapping.",
      "Thermal imaging camera and reference NTC probes.",
      "Sound level meter, Class 1, for noise floor.",
      "Hardware-in-the-loop harness for latency and fault injection.",
    ] },
    { p: DISCLAIMER },
  ],
};

const AATCS_DVT = {
  id: "aatcs-dvt",
  product: "aatcs",
  kind: "DVT",
  code: "AATCS-P1-DVT-001",
  title: "Design Validation Test Plan",
  subtitle: "AATCS-P1 Adaptive Resonator Bed · Durability & Margin Validation",
  blocks: [
    { h: "1. DVT Objective" },
    { p: "Prove the AATCS-P1 design holds margin over time, temperature, patient variation and fault conditions, and that the shared control stack remains stable under sustained load. DVT exit gates prototype acceptance and clears the shared stack for Omega MedBed integration." },
    { kv: [
      ["Entry Criteria", "EVT exit achieved, zero open Severity-1 defects"],
      ["Exit Criteria", "All cases pass; margin documented; stack cleared for Omega"],
      ["Duration", "6 weeks (AM7 → AM8)"],
    ] },

    { h: "2. DVT Test Matrix" },
    { table: { cols: ["Test", "Title", "Stress Condition", "Pass Criterion"], widths: [55, 145, 170, 142], rows: [
      ["ADVT-01", "Continuous duty", "10 h/day × 20 days at 1.2 kW", "No derate, no channel failure"],
      ["ADVT-02", "Fault injection", "300 faults across 7 channels", "100% correct safety response"],
      ["ADVT-03", "Resonance stability", "Induced drift ×2,000", "Re-tune ≤ 2 s, zero oscillation events"],
      ["ADVT-04", "Transducer thermal soak", "40 °C ambient, full drive, 12 h", "Within limits, derate curve holds"],
      ["ADVT-05", "Patient variation", "5 body types × 20 sessions", "TRZ > 0.85 for all combinations"],
      ["ADVT-06", "Cold start", "10 °C ambient, 50 cycles", "POST pass every cycle"],
      ["ADVT-07", "Power interruption", "200 mains drops", "Controlled shutdown, no data loss"],
      ["ADVT-08", "EMC pre-compliance", "Radiated + conducted scan", "Within IEC 60601-1-2 design targets"],
      ["ADVT-09", "Structural load", "180 kg static + 1.5× dynamic", "No permanent deformation"],
      ["ADVT-10", "Couch surface wear", "2,000 ingress/egress cycles", "No delamination, TRZ unchanged"],
      ["ADVT-11", "Vibration & transport", "ISTA-class profile", "No loosening, POST pass after"],
      ["ADVT-12", "Biometric endurance", "100 sessions, 4 streams", "Zero unlogged dropouts"],
      ["ADVT-13", "AI dose ceiling", "Adversarial inputs ×1,000", "Never exceeds protocol ceiling"],
      ["ADVT-14", "Session data integrity", "500 sessions incl. interrupts", "500/500 records complete"],
      ["ADVT-15", "Sustained soak", "30-day powered soak", "No latent fault, no memory growth"],
      ["ADVT-16", "Shared stack regression", "Full Omega suite on AATCS build", "No platform-specific regression"],
    ] } },

    { h: "3. Reliability Targets" },
    { kv: [
      ["Prototype MTBF target", "≥ 3,000 h (soak extrapolation)"],
      ["Safety function availability", "100% — no tolerated failures"],
      ["Transducer output drift", "≤ 5% over 500 h operation"],
      ["Couch surface life", "≥ 2,000 ingress/egress cycles"],
      ["Calibration interval", "6 months or 1,000 operating hours"],
    ] },

    { h: "4. DVT Exit & Acceptance" },
    { list: [
      "All 16 DVT cases executed with recorded evidence and retained raw data.",
      "Zero open Severity-1 or Severity-2 defects.",
      "Margin documented for every safety-critical parameter.",
      "Shared control stack formally cleared for Omega MedBed integration.",
      "Risk management file updated with post-DVT residual risk.",
      "Formal handover package issued.",
    ] },
    { p: DISCLAIMER },
  ],
};

export const ENG_DOCUMENTS = [
  OMEGA_PRD, OMEGA_PDR, OMEGA_BOM, OMEGA_SOW, OMEGA_EVT, OMEGA_DVT,
  AATCS_PRD, AATCS_PDR, AATCS_BOM, AATCS_SOW, AATCS_EVT, AATCS_DVT,
  ...BS_DOCUMENTS, CAMPAIGN_DOC,
];

export const DOC_KIND_INFO = {
  PRD: { label: "Product Requirements", blurb: "Requirements baseline — what the system must do" },
  PDR: { label: "Preliminary Design Review", blurb: "Architecture, layer stack, interfaces and risk register" },
  BOM: { label: "Bill of Materials", blurb: "Line items, quantities, materials and lead times" },
  SOW: { label: "Statement of Work", blurb: "Vendor scope, milestones, deliverables and acceptance" },
  EVT: { label: "Engineering Validation", blurb: "Functional test matrix — does the design work" },
  DVT: { label: "Design Validation", blurb: "Durability and margin test matrix — does it hold up" },
  CAMPAIGN: { label: "Crowdfunding Campaign Brief", blurb: "Funding goal, use of funds, reward tiers and milestones" },
};