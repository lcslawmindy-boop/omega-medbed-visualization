import { jsPDF } from "jspdf";
import { MODALITIES } from "@/data/modalities";
import { BOM_METRICS, SYSTEM_SPECS } from "@/data/engineeringDocs";

// Generates an A4 engineering spec sheet mirroring the reference documentation layout.
export function generateEngSpecReport() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = 595;
  const M = 40;
  const GOLD = [201, 168, 76];
  const MUTED = [125, 133, 144];
  const INK = [40, 40, 40];
  let y = 50;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text("OMEGA MEDBED ZA-MB-Ω", M, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.text("Engineering Specification Sheet · ZA-ENG-MB-OMEGA-A-PRD · Rev A · 2026-08-12", M, y + 13);
  doc.text("Zenith Apex Research Division · Aethon Apex IP Holdings LLC", M, y + 24);
  y += 40;

  // BOM metrics strip
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.5);
  doc.line(M, y, W - M, y);
  y += 12;
  doc.setFontSize(7.5);
  doc.setTextColor(INK[0], INK[1], INK[2]);
  doc.text(BOM_METRICS.map((m) => `${m.value} ${m.label}`).join("    |    "), M, y);
  y += 8;
  doc.line(M, y, W - M, y);
  y += 22;

  // System specifications
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text("SYSTEM SPECIFICATIONS", M, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const colW = (W - 2 * M) / 2;
  SYSTEM_SPECS.forEach((row) => {
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(String(row[0]), M, y);
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.text(String(row[1]), M + 92, y);
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(String(row[2]), M + colW, y);
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.text(String(row[3]), M + colW + 92, y);
    y += 13;
  });
  y += 14;

  // 18 modality summary (two columns)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text("18 INTEGRATED MODALITIES", M, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  const half = Math.ceil(MODALITIES.length / 2);
  for (let i = 0; i < half; i++) {
    const left = MODALITIES[i];
    const right = MODALITIES[i + half];
    const yy = y + i * 13;
    doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
    doc.text(`${String(i + 1).padStart(2, "0")} ${left.code}`, M, yy);
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.text(left.name, M + 52, yy);
    if (right) {
      const j = i + half;
      doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
      doc.text(`${String(j + 1).padStart(2, "0")} ${right.code}`, M + colW, yy);
      doc.setTextColor(INK[0], INK[1], INK[2]);
      doc.text(right.name, M + colW + 52, yy);
    }
  }
  y += half * 13 + 18;

  // Disclaimer footer
  doc.setDrawColor(200, 40, 40);
  doc.setLineWidth(0.6);
  doc.rect(M, y, W - 2 * M, 56);
  doc.setFontSize(7);
  doc.setTextColor(120, 30, 30);
  const disc = "RESEARCH PROTOTYPE — CLASS III MEDICAL DEVICE CONCEPT (FDA 21 CFR PART 880). Not approved by FDA, FCC, or any regulatory authority for clinical, therapeutic, commercial, or consumer use. Not medical advice. Concept — subject to manufacturer validation.";
  const lines = doc.splitTextToSize(disc, W - 2 * M - 16);
  doc.text(lines, M + 8, y + 14);
  doc.setFontSize(6.5);
  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.text("ZA-ENG-MB-OMEGA-A · Rev A · 2026-08-12 · © 2026 Aethon Apex IP Holdings LLC", M + 8, y + 48);

  doc.save("ZA-MB-Omega_Engineering_Spec.pdf");
}