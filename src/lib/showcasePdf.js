import { jsPDF } from "jspdf";
import { stampPdfWatermark } from "@/lib/pdfWatermark";

// Fetch a remote image and return { dataUrl, width, height, format }
async function loadImage(url) {
  const res = await fetch(url, { mode: "cors" });
  const blob = await res.blob();
  const dataUrl = await new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.readAsDataURL(blob);
  });
  const dims = await new Promise((resolve) => {
    const im = new window.Image();
    im.onload = () => resolve({ w: im.naturalWidth, h: im.naturalHeight });
    im.src = dataUrl;
  });
  return { dataUrl, ...dims, format: blob.type.includes("png") ? "PNG" : "JPEG" };
}

const MARGIN = 10;

function addSheet(doc, img, item, first) {
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  if (!first) doc.addPage("a4", img.w >= img.h ? "landscape" : "portrait");

  doc.setFillColor(7, 11, 20);
  doc.rect(0, 0, pw, ph, "F");

  doc.setTextColor(56, 189, 248);
  doc.setFontSize(12);
  doc.text(item.title, MARGIN, MARGIN + 4);
  doc.setTextColor(125, 133, 144);
  doc.setFontSize(8);
  doc.text(`${item.doc} · ${item.group} · BrightSteps BS-ATP-Ω`, MARGIN, MARGIN + 10);

  const top = MARGIN + 14;
  const maxW = pw - MARGIN * 2;
  const maxH = ph - top - 14;
  const scale = Math.min(maxW / img.w, maxH / img.h);
  const w = img.w * scale;
  const h = img.h * scale;
  doc.addImage(img.dataUrl, img.format, (pw - w) / 2, top, w, h);
  stampPdfWatermark(doc, { light: true });

  doc.setTextColor(125, 133, 144);
  doc.setFontSize(7);
  doc.text(
    "CONCEPT — NOT A MEDICAL DEVICE · NOT FOR MANUFACTURE · © 2026 Aethon Apex IP Holdings LLC",
    MARGIN,
    ph - 6
  );
}

// Single reference sheet → PDF
export async function downloadSheetPdf(item) {
  const img = await loadImage(item.url);
  const doc = new jsPDF({ orientation: img.w >= img.h ? "landscape" : "portrait", unit: "mm", format: "a4" });
  addSheet(doc, img, item, true);
  doc.save(`${item.doc}.pdf`);
}

// All sheets → one investor package PDF
export async function downloadInvestorPackage(items, onProgress) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();

  // Cover
  doc.setFillColor(7, 11, 20);
  doc.rect(0, 0, pw, ph, "F");
  doc.setTextColor(56, 189, 248);
  doc.setFontSize(26);
  doc.text("BRIGHTSTEPS BS-ATP-Ω", pw / 2, ph / 2 - 20, { align: "center" });
  doc.setFontSize(13);
  doc.setTextColor(230, 237, 243);
  doc.text("Investor Engineering Package", pw / 2, ph / 2 - 8, { align: "center" });
  doc.setFontSize(9);
  doc.setTextColor(125, 133, 144);
  doc.text(`${items.length} reference sheets · Generated ${new Date().toLocaleDateString()}`, pw / 2, ph / 2 + 2, { align: "center" });
  doc.text("Aethon Apex IP Holdings LLC — Confidential", pw / 2, ph / 2 + 10, { align: "center" });
  doc.setFontSize(7);
  doc.text("CONCEPT — NOT A MEDICAL DEVICE · NOT FOR MANUFACTURE", pw / 2, ph - 8, { align: "center" });
  stampPdfWatermark(doc, { light: true });

  for (let i = 0; i < items.length; i++) {
    if (onProgress) onProgress(i + 1, items.length);
    const img = await loadImage(items[i].url);
    addSheet(doc, img, items[i], false);
  }
  doc.save("BrightSteps_Investor_Package.pdf");
}