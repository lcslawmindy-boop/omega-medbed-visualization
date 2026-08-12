// Derived from AATCS-P1 engineering, EVT, ACE and IRB source documents.

export const ACE_INPUTS = [
  { group: "Physiological", color: "coral", items: ["HRV — RMSSD, SDNN", "EDA — phasic peaks, amplitude", "Motion — agitation, stillness, repetition"] },
  { group: "Behavioral", color: "sky", items: ["Emotion check-in", "Mission completion", "Frustration markers", "Transition difficulty"] },
  { group: "Contextual", color: "amber", items: ["Time of day", "Routine type", "Environment tag — home / clinic / school"] },
  { group: "Safety", color: "green", items: ["BFAC Stage 1–3", "Thermal readings", "Interlock status"] },
];

export const ACE_FLOW = [
  { n: 1, t: "Sensors → Stress Detection Engine", d: "PPG, EDA, IMU, thermal and pressure telemetry sampled continuously." },
  { n: 2, t: "Stress + behavior → ACE feature vector", d: "HRV stability, EDA arousal, motion agitation, check-in alignment, engagement, transition smoothness." },
  { n: 3, t: "Dual-model inference → Coherence Score", d: "Model A gradient boosting (fast, interpretable) + Model B LSTM (temporal patterns), ensemble-fused to 0–100." },
  { n: 4, t: "Modulation engine → Kids OS + Pod", d: "Adjusts visual complexity, pacing, reinforcement, and PBM / PEMF / VAT / FIT / SFT / MCT / HIT / NIA intensity." },
  { n: 5, t: "BFAC safety envelope → override", d: "Commands validated against modality-specific safety envelopes; BFAC override always wins." },
  { n: 6, t: "Cloud sync → long-term learning", d: "Short-term (minutes), mid-term (daily rolling), long-term (weeks–months, IEP alignment)." },
];

export const BFAC_STAGES = [
  { stage: "STAGE 1", action: "ACE reduces sensory load", color: "amber" },
  { stage: "STAGE 2", action: "ACE disables affected modality", color: "coral" },
  { stage: "STAGE 3", action: "ACE halts all modulation", color: "red" },
];

export const ACE_PERFORMANCE = [
  { k: "Closed-loop latency", v: "< 200 ms telemetry → modulation" },
  { k: "Safety cutoff response", v: "< 250 ms (thermal, EMI, leakage, E-STOP)" },
  { k: "Reliability", v: "Graceful degradation on sensor loss" },
  { k: "Explainability", v: "Feature importance + coherence trend graphs" },
  { k: "Security", v: "Encrypted telemetry · child-specific isolation · HIPAA-aligned" },
];

export const EVT_MATRIX = [
  { code: "PBM", sys: "Photobiomodulation", tests: "Wavelength verification, power output, LED thermal rise, flicker/noise, uniformity mapping", equip: "Optical power meter, spectrometer, thermal camera", accept: "±5% wavelength · ±10% power · <2°C/min rise" },
  { code: "PEMF", sys: "Pulsed EM Field", tests: "Coil field strength, frequency accuracy, harmonic distortion, EMI leakage", equip: "Gaussmeter, spectrum analyzer", accept: "Field ±10% · frequency ±2% · EMI < FCC Class B" },
  { code: "VAT", sys: "Vibroacoustic", tests: "Frequency response 20–200 Hz, harmonic distortion, surface vibration uniformity", equip: "Accelerometer array, audio analyzer", accept: "±5% frequency · <5% distortion" },
  { code: "FIT", sys: "Far-Infrared Thermal", tests: "FIR wavelength, surface temperature rise, thermal uniformity", equip: "IR spectrometer, thermal camera", accept: "<2°C/min rise · uniformity ±10%" },
  { code: "SFT", sys: "Scalar Frequency", tests: "Coil resonance, coherence field mapping, EMI containment", equip: "Network analyzer, field probe", accept: "Resonance ±3% · EMI below threshold" },
  { code: "MCT", sys: "Microcurrent", tests: "Current stability, electrode impedance, leakage current", equip: "Precision source meter", accept: "Leakage <100 µA · current ±5%" },
  { code: "HIT", sys: "Hydrogen Inhalation", tests: "Purity, flow rate, temperature", equip: "H₂ purity analyzer, flow meter", accept: "Purity >95% · flow ±10%" },
  { code: "NIA", sys: "Negative Ion Air", tests: "Ion output, ozone measurement", equip: "Ion counter, ozone monitor", accept: "Ion output ±10% · ozone <0.05 ppm" },
];

export const EVT_SECTIONS = [
  "Modality Validation Protocols", "Safety System Validation (BFAC)", "Adaptive Intelligence Validation (ACE)",
  "Sensor Fusion Validation", "Electrical Validation", "Thermal Validation", "EMI/EMC Pre-Compliance",
  "Mechanical Validation", "Firmware Validation", "Cloud Sync Validation", "Kids OS Integration Validation",
  "Acceptance Criteria Matrix", "EVT Reporting Templates",
];

export const IRB_DESIGN = [
  { k: "Protocol number", v: "AW-IRB-2026-001 · Version 1.0" },
  { k: "Study type", v: "Interventional RCT — superiority design" },
  { k: "Phase", v: "Phase II (efficacy and safety)" },
  { k: "Duration", v: "12 weeks — 8 treatment + 4 follow-up" },
  { k: "Sample size", v: "N = 240 evaluable (120/arm) · 276 enrolled" },
  { k: "Allocation", v: "1:1 active : active-sham" },
  { k: "Randomization", v: "Permuted blocks (4, 6), stratified by sex and Prakriti type" },
  { k: "Blinding", v: "Double-blind — participant and outcome assessor" },
  { k: "Primary endpoint", v: "Serum cortisol change, baseline → Week 8" },
  { k: "Framework", v: "45 CFR 46 · ICH E6(R2) GCP · Declaration of Helsinki" },
];

export const IRB_ENDPOINTS = [
  { name: "Serum cortisol", unit: "µg/dL", tier: "PRIMARY", note: "AM fasting draw, ECLIA, batch-analyzed" },
  { name: "HRV — SDNN / RMSSD", unit: "ms", tier: "SECONDARY", note: "5-min resting PPG recording" },
  { name: "HRV — LF/HF ratio", unit: "ratio", tier: "SECONDARY", note: "Lower = parasympathetic dominance" },
  { name: "hs-CRP", unit: "mg/L", tier: "SECONDARY", note: "Systemic inflammation" },
  { name: "Interleukin-6", unit: "pg/mL", tier: "SECONDARY", note: "Pro-inflammatory cytokine" },
  { name: "PSS-10", unit: "0–40", tier: "SECONDARY", note: "≥14 = moderate-high perceived stress" },
  { name: "DASS-21", unit: "3 × 0–42", tier: "SECONDARY", note: "Depression / anxiety / stress subscales" },
  { name: "WHO-5", unit: "0–100", tier: "SECONDARY", note: "<50 indicates poor wellbeing" },
  { name: "PSQI", unit: "0–21", tier: "SECONDARY", note: ">5 indicates poor sleep quality" },
  { name: "FSS", unit: "1–7", tier: "SECONDARY", note: "≥4 = clinically significant fatigue" },
  { name: "Serum BDNF", unit: "ng/mL", tier: "SECONDARY", note: "Weeks 0, 8, 12" },
  { name: "Coherence Index", unit: "0–100", tier: "EXPLORATORY", note: "HRV + biophoton + alpha/theta composite" },
];

export const IRB_VISITS = [
  { v: "Screening", w: "–2 to 0", d: "60–90 min", k: "Consent, history, exam, PSS-10, MRI safety questionnaire, screening labs" },
  { v: "Baseline (V1)", w: "Week 0", d: "90–120 min", k: "Randomization, Prakriti questionnaire, full coherence assessment, full panel" },
  { v: "Sessions 1–12", w: "Weeks 1–4", d: "45–50 min", k: "3 sessions/week, AE inquiry, tolerability rating each session" },
  { v: "Mid-study (V2)", w: "Week 4", d: "60 min", k: "Blood draw, HRV, all PRO questionnaires, AE review" },
  { v: "Sessions 13–24", w: "Weeks 5–8", d: "45–50 min", k: "3 sessions/week, AE inquiry, attendance logged" },
  { v: "End-of-treatment (V3)", w: "Week 8", d: "90 min", k: "Full biomarker panel, biophoton, blinding integrity question" },
  { v: "Follow-up (V4)", w: "Week 12", d: "60 min", k: "Durability assessment, final AE inquiry, unblinding, debrief" },
];

export const IRB_EXCLUSIONS = [
  { t: "Implanted electronic device", abs: true, d: "Pacemaker, ICD, DBS, cochlear implant, insulin pump — PEMF absolutely contraindicated" },
  { t: "Active seizure disorder", abs: true, d: "Any type, or documented photosensitive epilepsy history" },
  { t: "Pregnancy or breastfeeding", abs: true, d: "Urine pregnancy test required at screening for WOCBP" },
  { t: "Metallic implants in PEMF field", abs: true, d: "Spinal hardware, joint prostheses — MRI safety questionnaire enforced" },
  { t: "Active malignancy", abs: false, d: "Or cancer treatment within 12 months" },
  { t: "Photosensitivity / active skin condition", abs: false, d: "In regions targeted by PBM LED delivery" },
  { t: "Severe hearing impairment", abs: false, d: ">70 dB HL better ear — interferes with acoustic protocol" },
  { t: "Retinal disease", abs: false, d: "Goggle optical blockade may be unsuitable" },
];

export const AE_RISKS = [
  { r: "Mild fatigue / drowsiness post-session", p: "Common 15–20%", g: "Grade 1", m: "Anticipated relaxation response; 10-min rest offered; resolves 1–4 h" },
  { r: "PEMF tingling or fasciculation", p: "Uncommon 5–10%", g: "Grade 1", m: "Titrate from minimum dose; participant E-stop; no escalation past tolerance" },
  { r: "Headache (acoustic / vibroacoustic)", p: "Uncommon 5–10%", g: "Grade 1", m: "Noise dosimetry ≤75 dB SPL; volume control; session modification" },
  { r: "Ear discomfort from headphones", p: "Rare <2%", g: "Grade 1", m: "Disposable cushions; fit adjustment; SPL limit enforced" },
  { r: "Anxiety during relaxation induction", p: "Rare <2%", g: "Grade 1–2", m: "Session pausable anytime; mental health referral pathway" },
  { r: "PBM photosensitivity / erythema", p: "Rare <1%", g: "Grade 1–2", m: "UV-free LEDs; thermal cutoff at 40°C; immediate cessation protocol" },
  { r: "Vasovagal near-syncope", p: "Rare <1%", g: "Grade 2", m: "Semi-reclined position; vitals pre-session; AED within 30 s" },
  { r: "EMF interaction, undetected implant", p: "Very rare <0.1%", g: "Grade 3–5", m: "MRI safety screen; per-session attestation; emergency PEMF shutdown" },
];

export const AE_REPORTING = [
  { e: "SAE — any grade, any relationship", t: "24 hours", to: "IRB · DSMB Chair · Sponsor" },
  { e: "Unanticipated problem (UPIRP)", t: "24 hours", to: "IRB (primary) · DSMB Chair" },
  { e: "Unexpected related SAE", t: "24 hours", to: "IRB · DSMB · FDA per 21 CFR 803" },
  { e: "Major protocol deviation", t: "5 business days", to: "IRB" },
  { e: "Annual safety report", t: "30 days of anniversary", to: "IRB · DSMB" },
];

export const STOPPING_RULES = [
  "Any death possibly, probably, or definitely related to the intervention",
  "≥ 3 related serious adverse events of Grade 3 or higher",
  "≥ 3 participants in a 4-week period with the same serious unexpected AE",
  "Any device malfunction resulting in participant injury",
  "DSMB recommendation to suspend following an interim safety review",
];

export const PATENT_CLAIMS = [
  { n: "Claim 1", type: "INDEPENDENT — SYSTEM", t: "Adaptive therapeutic modulation system", d: "Wearables capturing HRV, EDA and motion; a child-facing OS producing behavioral and emotional indicators; a therapeutic device of plural sensory modalities; a safety engine monitoring thermal, electrical, interlock and electromagnetic conditions; and an adaptive control engine that extracts features, computes a coherence score, generates modulation commands and validates them against safety conditions in real time." },
  { n: "Claim 2", type: "DEPENDENT", t: "Stress-driven modulation", d: "The engine reduces sensory load when a stress score derived from the physiological signals exceeds a predetermined threshold." },
  { n: "Claim 3", type: "DEPENDENT", t: "Dual-model architecture", d: "Coherence scoring applies a first model for instantaneous features and a second temporal model for sequential patterns, combining both outputs." },
  { n: "Claim 4", type: "DEPENDENT", t: "Modality-specific control", d: "Commands adjust PBM brightness, PEMF amplitude, vibroacoustic frequency, FIR temperature, scalar output, microcurrent amplitude, hydrogen flow, or ion density." },
  { n: "Claim 5", type: "DEPENDENT", t: "Safety override", d: "The safety engine overrides modulation on thermal rise, electrical leakage, interlock violation, or electromagnetic interference." },
  { n: "Claim 6", type: "DEPENDENT", t: "Closed-loop cycle", d: "The adaptive control engine executes a closed-loop update cycle at intervals of less than 200 milliseconds." },
  { n: "Claim 7", type: "DEPENDENT", t: "Child-specific personalization", d: "Modulation parameters update from historical coherence scores held in cloud-based memory." },
  { n: "Claim 8", type: "DEPENDENT", t: "Behavioral integration", d: "Behavioral indicators comprise emotional check-ins, mission completion metrics, frustration markers and transition difficulty scores." },
  { n: "Claim 9", type: "DEPENDENT", t: "Safety-bounded AI", d: "Commands are generated only within modality-specific safety envelopes defined by the safety engine." },
  { n: "Claim 10", type: "INDEPENDENT — METHOD", t: "Computer-implemented modulation method", d: "Receiving physiological, behavioral and safety inputs; extracting features; computing a coherence score; generating and validating modulation commands; adjusting at least one sensory modality." },
  { n: "Claim 11", type: "DEPENDENT", t: "Predictive escalation detection", d: "Escalation risk is predicted with a temporal model and modulation commands adjusted accordingly." },
  { n: "Claim 12", type: "INDEPENDENT — CRM", t: "Non-transitory medium", d: "Instructions that, when executed, cause processors to perform the method of Claim 10." },
];

export const IP_PROTECTIONS = [
  { t: "No transfer of rights", d: "Disclosure grants no license, assignment or ownership in any disclosed intellectual property." },
  { t: "BrightSteps carve-out", d: "No rights to BrightSteps™ / KidsOS™, pod, grounding band, PEMF shoes, sensory backpack, software, UI/UX, workflows or clinical architecture." },
  { t: "No reverse engineering", d: "No decompiling, disassembly, competitive analysis, derivation of algorithms or schematics — including AI-assisted methods." },
  { t: "Prototype ownership", d: "All prototypes, drawings, firmware and builds remain the exclusive property of the disclosing party." },
  { t: "Joint development", d: "Any joint IP requires a separate signed agreement; no implied joint ownership." },
  { t: "Term and survival", d: "3-year term · confidentiality survives 5 years · trade secrets survive indefinitely · Nevada law, Clark County jurisdiction." },
];