// Session Telemetry Report generator for the Omega MedBed ZA-MB-OMEGA.
// Produces a dark, engineering-grade multi-page PDF capturing:
//   1. Cover + document metadata + session summary + system specifications
//   2. Live telemetry dashboard snapshot + power-stability metrics
//   3. Full 18-modality log
import { jsPDF } from "jspdf";
import { MODALITIES } from "@/data/modalities";
import { POWER_WATTS, MAX_WATTS } from "@/data/powerAllocation";

// ---- palette (rgb tuples) -------------------------------------------------
const GOLD = [201, 168, 76];
const GOLD_DIM = [138, 110, 46];
const WHITE = [230, 237, 243];
const MUTED = [125, 133, 144];
const PANEL = [13, 17, 23];
const ELEVATED = [22, 27, 34];
const BORDER = [40, 46, 54];
const RED = [204, 34, 0];
const GREEN = [16, 185, 129];
const AMBER = [245, 158, 11];
const VIOLET = [155, 48, 255];

const PAGE_W = 612;
const PAGE_H = 792;
const M = 36;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rand = () => (Math.random() - 0.5);
const hexRgb = (hex) => {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
// jsPDF standard fonts use WinAnsi; strip glyphs that won't render.
const clean = (s) =>
  String(s)
    .replace(/Ω/g, "OMEGA")
    .replace(/φ/g, "phi")
    .replace(/Δ/g, "d")
    .replace(/≤/g, "<=")
    .replace(/≥/g, ">=")
    .replace(/±/g, "+/-")
    .replace(/²/g, "2")
    .replace(/³/g, "3")
    .replace(/·/g, "|")
    .replace(/[—–]/g, "-")
    .replace(/★/g, "*")
    .replace(/→/g, "->")
    .replace(/✓/g, "v");

const TIER_COLOR = { T1: GREEN, T2: AMBER, T3: RED };

// ---- snapshot model (mirrors TelemetryOverlay live math) ------------------
function telemetrySnapshot(power) {
  const pNoise = (1 - power * 0.7) * 3;
  const pVal = clamp(power * 100 + rand() * pNoise, 0, 100);
  const sVal = Math.max(0, power * 12 + rand() * 0.5);
  const tVal = 22 + power * 16 + rand() * 0.5;
  return {
    pVal,
    sVal,
    tVal,
    hrv: clamp(60 - power * 6 + rand() * 2, 45, 80),
    spo2: clamp(96 + power * 2.5 + rand() * 0.4, 90, 100),
    eegAlpha: 8 + power * 4 + rand() * 0.8,
    gsr: clamp(2.5 - power * 0.8 + rand() * 0.1, 0.5, 4),
    temp: 36.5 + power * 0.3 + rand() * 0.05,
  };
}

function historyFor(target, base, variance, n = 24) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const f = i / (n - 1);
    out.push(base + (target - base) * f + rand() * variance);
  }
  return out;
}

function sparkline(doc, pts, x, y, w, h, color) {
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const range = max - min || 1;
  doc.setDrawColor(...color);
  doc.setLineWidth(1.1);
  for (let i = 0; i < pts.length - 1; i++) {
    const x1 = x + (i / (pts.length - 1)) * w;
    const x2 = x + ((i + 1) / (pts.length - 1)) * w;
    const y1 = y + h - ((pts[i] - min) / range) * h;
    const y2 = y + h - ((pts[i + 1] - min) / range) * h;
    doc.line(x1, y1, x2, y2);
  }
}

// ---- low-level drawing helpers -------------------------------------------
function paintPage(doc) {
  doc.setFillColor(5, 5, 5);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
}

function panel(doc, x, y, w, h, fill = PANEL, border = BORDER) {
  doc.setFillColor(...fill);
  doc.setDrawColor(...border);
  doc.setLineWidth(0.7);
  doc.roundedRect(x, y, w, h, 2.5, 2.5, "FD");
}

function text(doc, str, x, y, opts = {}) {
  doc.setFont(opts.font || "helvetica", opts.weight || "normal");
  doc.setFontSize(opts.size || 9);
  doc.setTextColor(...(opts.color || WHITE));
  const align = opts.align || "left";
  if (opts.maxWidth) {
    const lines = doc.splitTextToSize(clean(str), opts.maxWidth);
    doc.text(lines, x, y, { align });
  } else {
    doc.text(clean(str), x, y, { align });
  }
}

function heading(doc, str, x, y, size = 11) {
  text(doc, str, x, y, { weight: "bold", size, color: GOLD });
  doc.setDrawColor(...GOLD_DIM);
  doc.setLineWidth(0.6);
  doc.line(x, y + 4, x + 540, y + 4);
}

function pageHeader(doc, title, subtitle) {
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1.4);
  doc.line(M, 44, PAGE_W - M, 44);
  text(doc, title, M, 34, { weight: "bold", size: 14, color: GOLD });
  text(doc, subtitle, M, 24, { size: 7, color: MUTED });
  text(doc, "ZA-ENG-MB-OMEGA-A-RPT | Rev A | 2026-08-12", PAGE_W - M, 34, { size: 7, color: MUTED, align: "right" });
}

function pageFooter(doc, pageNum) {
  const y = 742;
  doc.setFillColor(34, 8, 8);
  doc.setDrawColor(...RED);
  doc.setLineWidth(0.8);
  doc.roundedRect(M, y, 540, 30, 2, 2, "FD");
  text(doc, "RESEARCH PROTOTYPE - CLASS III MEDICAL DEVICE CONCEPT - FDA 21 CFR PART 880", M + 6, y + 11, { weight: "bold", size: 6.5, color: RED });
  text(doc, "Not approved for clinical use. Not evaluated by FDA/FCC. Conceptual - subject to manufacturer validation. Not medical advice.", M + 6, y + 20, { size: 6, color: [180, 170, 160] });
  text(doc, "© 2026 Aethon Apex IP Holdings LLC", M, y + 38, { size: 6, color: MUTED });
  text(doc, `Page ${pageNum}`, PAGE_W - M, y + 38, { size: 6, color: MUTED, align: "right" });
}

// ---- section renderers -----------------------------------------------------
function renderCover(doc, ctx) {
  paintPage(doc);
  // top accent bar
  doc.setFillColor(...GOLD);
  doc.rect(0, 0, PAGE_W, 6, "F");

  text(doc, "OMEGA MEDBED  ZA-MB-OMEGA", M, 64, { weight: "bold", size: 22, color: WHITE });
  text(doc, "THE WORLD'S FIRST UNIFIED 18-MODALITY BIOELECTROMAGNETIC THERAPY CHAMBER", M, 78, { size: 7.5, color: MUTED });
  text(doc, "ZENITH APEX RESEARCH DIVISION", M, 90, { size: 7.5, color: GOLD });

  text(doc, "CLASS III MEDICAL DEVICE CONCEPT", PAGE_W - M, 64, { weight: "bold", size: 8, color: RED, align: "right" });
  text(doc, "FDA 21 CFR PART 880 - RESEARCH PROTOTYPE", PAGE_W - M, 74, { size: 7, color: MUTED, align: "right" });
  text(doc, "SESSION TELEMETRY REPORT", PAGE_W - M, 84, { size: 7, color: GOLD, align: "right" });

  // document metadata block
  panel(doc, M, 104, 540, 70);
  const meta = [
    ["DOCUMENT", "ZA-ENG-MB-OMEGA-A-RPT"],
    ["REV / DATE", "A  |  2026-08-12"],
    ["DIVISION", "Zenith Apex Research Division"],
    ["ENTITY", "Aethon Apex IP Holdings LLC"],
    ["GENERATED", new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC"],
  ];
  meta.forEach(([k, v], i) => {
    const col = i < 3 ? 0 : 1;
    const row = i % 3;
    const x = M + 14 + col * 270;
    const y = 122 + row * 18;
    text(doc, k, x, y, { size: 6.5, color: MUTED });
    text(doc, v, x, y + 9, { size: 9, color: GOLD, weight: "bold" });
  });

  // session summary
  heading(doc, "SESSION SUMMARY", M, 196, 11);
  panel(doc, M, 204, 540, 86);
  const activeCount = ctx.activeCodes.length;
  const dur = ctx.session ? `${Math.floor(ctx.dur / 60)}m ${ctx.dur % 60}s` : "—";
  const elapsed = ctx.session ? `${Math.floor((ctx.dur - ctx.remaining) / 60)}m ${(ctx.dur - ctx.remaining) % 60}s` : "—";
  const status = ctx.session ? (ctx.remaining > 0 ? "ACTIVE" : "COMPLETE") : "STANDBY — NO ACTIVE SESSION";
  const statusColor = ctx.session ? GREEN : AMBER;
  const rows = [
    ["STATUS", status, statusColor],
    ["DURATION", dur, WHITE],
    ["ELAPSED", elapsed, WHITE],
    ["MODALITIES ACTIVE", `${activeCount} / 18`, WHITE],
    ["POWER LEVEL", `${(ctx.power * 100).toFixed(1)}%`, WHITE],
    ["FOCUS MODALITY", ctx.activeCode || "—", GOLD],
  ];
  rows.forEach(([k, v, c], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = M + 14 + col * 180;
    const y = 222 + row * 26;
    text(doc, k, x, y, { size: 6.5, color: MUTED });
    text(doc, v, x, y + 10, { size: 10, color: c, weight: "bold" });
  });

  // system specifications (two columns, 13 rows each)
  heading(doc, "SYSTEM SPECIFICATIONS", M, 306, 11);
  const specs = [
    ["Designator", "ZA-MB-OMEGA"], ["Active Modalities", "18"], ["BOM Line Items", "94"],
    ["Total Components", "1,284"], ["Assembly Hours", "166h"], ["Length", "2,400 mm"],
    ["Width", "1,600 mm"], ["Height", "1,800 mm"], ["Int. Chamber", "2,100x900x500 mm"],
    ["Total Mass", "<= 1,200 kg"], ["Max Power", "3.5 kW"], ["Power Input", "120/240V 30A"],
    ["Max Patient", "180 kg"], ["Safety Cutoff", "< 100 ms"], ["Freq. Precision", "+/- 0.01 Hz"],
    ["PBM Irradiance", "100-120 mW/cm2"], ["PEMF Uniformity", "+/- 5%"], ["TRZ Ratio", "> 0.8"],
    ["Vortex Temp", "4.0C +/- 0.5C"], ["Orgone dT", ">= 1.0F / 30 min"], ["EEG Channels", "19-ch 10-20"],
    ["Biometric Inputs", "5 channels"], ["AI Cycle", "100 ms"], ["H2 Purity", "99.99%"],
    ["Ion Density", "10^6 - 10^7 ions/cm3"], ["Session Range", "30s - 45 min"],
  ];
  const colW = 264;
  const rowH = 15;
  specs.forEach(([k, v], i) => {
    const col = i < 13 ? 0 : 1;
    const row = i % 13;
    const x = M + col * (colW + 12);
    const y = 316 + row * rowH;
    doc.setFillColor(...(row % 2 === 0 ? PANEL : ELEVATED));
    doc.rect(x, y, colW, rowH - 1, "F");
    text(doc, k, x + 8, y + 10, { size: 7.5, color: MUTED });
    text(doc, v, x + colW - 8, y + 10, { size: 7.5, color: GOLD, align: "right" });
  });

  pageFooter(doc, 1);
}

function renderTelemetry(doc, ctx, snap) {
  doc.addPage();
  paintPage(doc);
  pageHeader(doc, "SESSION TELEMETRY DASHBOARD", "REAL-TIME SENSOR SNAPSHOT - BFAC+ACE CLOSED LOOP");

  // primary channel cards
  heading(doc, "PRIMARY CHANNELS", M, 70, 10);
  const cards = [
    { label: "POWER STABILITY", val: `${snap.pVal.toFixed(1)}%`, st: snap.pVal > 98 ? "LOCKED" : snap.pVal > 60 ? "STABLE" : "RAMP", sc: snap.pVal > 98 ? GREEN : snap.pVal > 60 ? GOLD : AMBER, pts: historyFor(snap.pVal, 0, 4), col: GOLD },
    { label: "SCALAR FIELD phi", val: `${snap.sVal.toFixed(2)} mT`, st: snap.sVal > 11 ? "PEAK" : snap.sVal > 6 ? "ONLINE" : "SPIN-UP", sc: snap.sVal > 11 ? VIOLET : snap.sVal > 6 ? GOLD : AMBER, pts: historyFor(snap.sVal, 0, 0.6), col: VIOLET },
    { label: "THERMAL OUTPUT", val: `${snap.tVal.toFixed(1)}C`, st: snap.tVal > 37 ? "NOMINAL" : snap.tVal > 30 ? "RISING" : "WARMING", sc: snap.tVal > 37 ? GREEN : snap.tVal > 30 ? GOLD : AMBER, pts: historyFor(snap.tVal, 22, 0.8), col: AMBER },
  ];
  const cw = 168;
  cards.forEach((c, i) => {
    const x = M + i * (cw + 18);
    const y = 80;
    panel(doc, x, y, cw, 78);
    text(doc, c.label, x + 10, y + 14, { size: 7, color: MUTED });
    text(doc, c.val, x + 10, y + 34, { size: 17, color: c.col, weight: "bold" });
    text(doc, `● ${c.st}`, x + cw - 10, y + 34, { size: 7.5, color: c.sc, align: "right", weight: "bold" });
    sparkline(doc, c.pts, x + 10, y + 46, cw - 20, 22, c.col);
  });

  // biometric inputs
  heading(doc, "BIOMETRIC INPUTS", M, 178, 10);
  panel(doc, M, 186, 540, 96);
  const bio = [
    ["HRV", `${snap.hrv.toFixed(0)} bpm`, snap.hrv < 55 ? "LOW" : snap.hrv > 70 ? "ELEVATED" : "NOMINAL", snap.hrv < 55 || snap.hrv > 70 ? AMBER : GREEN],
    ["SpO2", `${snap.spo2.toFixed(1)}%`, snap.spo2 >= 97 ? "NORMAL" : snap.spo2 >= 94 ? "LOW" : "CRITICAL", snap.spo2 >= 97 ? GREEN : snap.spo2 >= 94 ? AMBER : RED],
    ["EEG ALPHA", `${snap.eegAlpha.toFixed(1)} Hz`, "ACTIVE", GREEN],
    ["GSR", `${snap.gsr.toFixed(2)} kOhm`, snap.gsr < 2 ? "CALM" : snap.gsr <= 3 ? "NORMAL" : "ELEVATED", snap.gsr < 2 ? GREEN : snap.gsr <= 3 ? GOLD : AMBER],
    ["CORE TEMP", `${snap.temp.toFixed(2)}C`, snap.temp > 37.5 ? "HIGH" : snap.temp < 36 ? "LOW" : "NORMAL", snap.temp > 37.5 || snap.temp < 36 ? AMBER : GREEN],
  ];
  bio.forEach(([k, v, st, sc], i) => {
    const y = 200 + i * 16;
    text(doc, k, M + 14, y, { size: 7.5, color: MUTED });
    text(doc, v, M + 150, y, { size: 8, color: WHITE, weight: "bold" });
    text(doc, `● ${st}`, M + 540 - 14, y, { size: 7.5, color: sc, align: "right", weight: "bold" });
    if (i < bio.length - 1) {
      doc.setDrawColor(...BORDER);
      doc.setLineWidth(0.4);
      doc.line(M + 14, y + 4, M + 540 - 14, y + 4);
    }
  });

  // power stability metrics
  heading(doc, "POWER STABILITY METRICS", M, 300, 10);
  const items = ctx.activeCodes
    .map((c) => MODALITIES.find((m) => m.code === c))
    .filter(Boolean)
    .map((m) => ({ m, w: POWER_WATTS[m.code] || 0 }));
  const total = items.reduce((s, x) => s + x.w, 0);
  const maxInList = Math.max(1, ...items.map((x) => x.w));
  const pctMax = (total / MAX_WATTS) * 100;
  const stability = snap.pVal;
  const verdict = stability > 98 ? "LOCKED — FULL POWER STABLE" : stability > 60 ? "STABLE — WITHIN TOLERANCE" : "RAMP — STABILIZING";
  const verdictColor = stability > 98 ? GREEN : stability > 60 ? GOLD : AMBER;

  panel(doc, M, 308, 540, 30);
  text(doc, "MODALITY", M + 12, 322, { size: 7, color: MUTED });
  text(doc, "WATTS", M + 260, 322, { size: 7, color: MUTED });
  text(doc, "% TOTAL", M + 330, 322, { size: 7, color: MUTED });
  text(doc, "LOAD", M + 410, 322, { size: 7, color: MUTED });
  text(doc, "STABILITY", M + 540 - 12, 322, { size: 7, color: MUTED, align: "right" });

  const top = 340;
  const rh = Math.min(15, Math.floor((380) / Math.max(1, items.length)));
  items.forEach((it, i) => {
    const y = top + i * rh;
    if (y > 560) return; // safety cap
    doc.setFillColor(...(i % 2 === 0 ? PANEL : ELEVATED));
    doc.rect(M, y, 540, rh - 1, "F");
    const dotRgb = hexRgb(it.m.color);
    doc.setFillColor(...dotRgb);
    doc.circle(M + 16, y + rh / 2 - 1, 2.2, "F");
    text(doc, `${it.m.code}  ${it.m.name}`, M + 24, y + rh / 2 + 2, { size: 7.5, color: WHITE, maxWidth: 230 });
    text(doc, `${it.w} W`, M + 260, y + rh / 2 + 2, { size: 7.5, color: GOLD });
    text(doc, `${((it.w / Math.max(1, total)) * 100).toFixed(1)}%`, M + 330, y + rh / 2 + 2, { size: 7.5, color: WHITE });
    // load bar
    const barX = M + 410;
    const barW = 80;
    doc.setFillColor(...ELEVATED);
    doc.rect(barX, y + rh / 2 - 3, barW, 5, "F");
    doc.setFillColor(...GOLD);
    doc.rect(barX, y + rh / 2 - 3, (it.w / maxInList) * barW, 5, "F");
    text(doc, it.m.tierCode, M + 540 - 12, y + rh / 2 + 2, { size: 7, color: TIER_COLOR[it.m.tierCode] || MUTED, align: "right", weight: "bold" });
  });

  // summary band
  const sy = Math.min(566, top + items.length * rh + 8);
  panel(doc, M, sy, 540, 44, ELEVATED, GOLD_DIM);
  text(doc, "TOTAL DRAW", M + 14, sy + 16, { size: 7, color: MUTED });
  text(doc, `${total} W  /  ${pctMax.toFixed(1)}% of ${MAX_WATTS} W max`, M + 14, sy + 28, { size: 9, color: GOLD, weight: "bold" });
  text(doc, "STABILITY", M + 260, sy + 16, { size: 7, color: MUTED });
  text(doc, `${stability.toFixed(1)}%`, M + 260, sy + 28, { size: 9, color: WHITE, weight: "bold" });
  text(doc, "VERDICT", M + 410, sy + 16, { size: 7, color: MUTED });
  text(doc, verdict, M + 540 - 14, sy + 28, { size: 8, color: verdictColor, weight: "bold", align: "right" });

  pageFooter(doc, 2);
}

function renderModalityLogs(doc, ctx) {
  doc.addPage();
  paintPage(doc);
  pageHeader(doc, "MODALITY LOGS", "18 INTEGRATED THERAPEUTIC MODALITIES - BFAC+ACE REGISTRY");

  // column header
  panel(doc, M, 70, 540, 18);
  text(doc, "#", M + 10, 82, { size: 6.5, color: MUTED });
  text(doc, "CODE", M + 30, 82, { size: 6.5, color: MUTED });
  text(doc, "NAME / SPECIFICATION", M + 80, 82, { size: 6.5, color: MUTED });
  text(doc, "CATEGORY", M + 330, 82, { size: 6.5, color: MUTED });
  text(doc, "TIER", M + 410, 82, { size: 6.5, color: MUTED });
  text(doc, "WATTS", M + 470, 82, { size: 6.5, color: MUTED });
  text(doc, "ZONE", M + 520, 82, { size: 6.5, color: MUTED });

  const top = 92;
  const rh = 26;
  MODALITIES.forEach((m, i) => {
    const y = top + i * rh;
    const active = m.code === ctx.activeCode;
    doc.setFillColor(...(i % 2 === 0 ? PANEL : ELEVATED));
    doc.rect(M, y, 540, rh - 2, "F");
    if (active) {
      doc.setFillColor(...GOLD);
      doc.rect(M, y, 3, rh - 2, "F");
    }
    const dotRgb = hexRgb(m.color);
    doc.setFillColor(...dotRgb);
    doc.circle(M + 18, y + 9, 2.6, "F");
    text(doc, String(i + 1).padStart(2, "0"), M + 10, y + 11, { size: 7.5, color: MUTED });
    text(doc, m.code, M + 30, y + 11, { size: 8, color: dotRgb, weight: "bold" });
    text(doc, m.name, M + 80, y + 11, { size: 8, color: WHITE, weight: "bold", maxWidth: 245 });
    text(doc, m.spec, M + 80, y + 20, { size: 6.5, color: MUTED, maxWidth: 245 });
    text(doc, m.category, M + 330, y + 11, { size: 7, color: WHITE });
    text(doc, m.tierCode, M + 410, y + 11, { size: 7.5, color: TIER_COLOR[m.tierCode] || MUTED, weight: "bold" });
    text(doc, `${POWER_WATTS[m.code] || 0} W`, M + 470, y + 11, { size: 7.5, color: GOLD });
    text(doc, m.zone, M + 520, y + 11, { size: 6.5, color: MUTED });
  });

  // tier legend
  const ly = top + MODALITIES.length * rh + 8;
  text(doc, "TIER LEGEND", M, ly, { size: 7.5, color: GOLD, weight: "bold" });
  const legend = [
    ["T1", "FDA-cleared / peer-reviewed", GREEN],
    ["T2", "Clinical evidence / emerging", AMBER],
    ["T3", "Frontier / theoretical research", RED],
  ];
  legend.forEach(([t, d, c], i) => {
    const x = M + i * 180;
    doc.setFillColor(...c);
    doc.circle(x + 4, ly + 12, 2.6, "F");
    text(doc, t, x + 12, ly + 14, { size: 7.5, color: c, weight: "bold" });
    text(doc, d, x + 30, ly + 14, { size: 6.5, color: MUTED });
  });

  pageFooter(doc, 3);
}

// ---- public entry ----------------------------------------------------------
export function generateSessionReport({ session, power, activeCode, remaining }) {
  const ctx = {
    session,
    power: power || 0,
    activeCode: activeCode || (session ? session.codes[0] : "SFT"),
    remaining: remaining || 0,
    dur: session?.dur || 0,
    activeCodes: session?.codes?.length ? session.codes : MODALITIES.map((m) => m.code),
  };
  const snap = telemetrySnapshot(ctx.power);

  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });
  renderCover(doc, ctx);
  renderTelemetry(doc, ctx, snap);
  renderModalityLogs(doc, ctx);

  const stamp = new Date().toISOString().slice(0, 10);
  doc.save(`ZA-MB-OMEGA_SessionReport_${stamp}.pdf`);
}