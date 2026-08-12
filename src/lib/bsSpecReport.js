import { jsPDF } from "jspdf";
import { BS_SYSTEMS, POD_MODES } from "@/data/brightsteps";

// BrightSteps BS-ATP-Ω one-page spec package
export function generateBsPackage() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = 595, M = 40;
  const SKY = [29, 111, 164];
  const MUTED = [110, 120, 135];
  const INK = [35, 35, 35];

  doc.setFillColor(10, 18, 34);
  doc.rect(0, 0, W, 120, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(90, 170, 230);
  doc.text("AETHON APEX IP HOLDINGS LLC · ZENITH APEX RESEARCH DIVISION", M, 38);
  doc.setFontSize(20);
  doc.setTextColor(120, 195, 250);
  doc.text("BRIGHTSTEPS — BS-ATP-Ω", M, 66);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(225, 235, 245);
  doc.text("ASD Therapy Pod · Adaptive Multi-Modal Sensory Wellness System", M, 84);
  doc.setFont("courier", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 180, 210);
  doc.text("AATCS-P1 · Rev A · 2026-08-12 · Export Package", M, 102);

  let y = 150;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(SKY[0], SKY[1], SKY[2]);
  doc.text("12 INTEGRATED THERAPY SYSTEMS", M, y);
  y += 8;
  doc.setDrawColor(SKY[0], SKY[1], SKY[2]);
  doc.line(M, y, W - M, y);
  y += 16;

  BS_SYSTEMS.forEach((s) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(SKY[0], SKY[1], SKY[2]);
    doc.text(s.code, M, y);
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.text(s.name, M + 40, y);
    doc.setFont("courier", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(s.spec, M + 200, y, { maxWidth: W - M - 200 - M });
    y += 22;
  });

  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(SKY[0], SKY[1], SKY[2]);
  doc.text("POD MODES", M, y);
  y += 8;
  doc.line(M, y, W - M, y);
  y += 14;
  POD_MODES.forEach((m) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.text(m.name, M, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(m.blurb, M + 130, y);
    y += 13;
  });

  const disclaimer =
    "CONCEPTUAL ENGINEERING DOCUMENTATION — research and IP development purposes only. Not a manufactured product. Not a medical device. Not approved by FDA, FCC, or any regulatory authority. Not medical advice. ASD interventions should always involve qualified clinical professionals. © 2026 Aethon Apex IP Holdings LLC — Henderson, Nevada 89002.";
  const lines = doc.splitTextToSize(disclaimer, W - 2 * M - 16);
  const boxH = lines.length * 9 + 14;
  y += 8;
  doc.setDrawColor(204, 34, 0);
  doc.rect(M, y - 8, W - 2 * M, boxH);
  doc.setFontSize(6.5);
  doc.setTextColor(204, 34, 0);
  lines.forEach((ln, i) => doc.text(ln, M + 8, y + 3 + i * 9));

  doc.save("BS-ATP-Omega_Export_Package.pdf");
}