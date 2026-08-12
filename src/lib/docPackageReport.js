import { jsPDF } from "jspdf";
import { ENG_DOCUMENTS, PRODUCTS } from "@/data/engineeringPackage";

const W = 595;
const H = 842;
const M = 40;
const GOLD = [176, 141, 52];
const MUTED = [125, 133, 144];
const INK = [35, 35, 35];
const RED = [150, 35, 35];

function newDoc() {
  return new jsPDF({ unit: "pt", format: "a4" });
}

function drawFooter(doc, meta, page) {
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(M, H - 42, W - M, H - 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
  doc.text(`${meta.code} · Rev A · 2026-08-12 · CONCEPT — MANUFACTURER VALIDATION REQUIRED`, M, H - 30);
  doc.text(`Page ${page}`, W - M, H - 30, { align: "right" });
  doc.text("© 2026 Aethon Apex IP Holdings LLC · Zenith Apex Research Division", M, H - 20);
}

// Page-break-aware cursor
function makeCursor(doc, meta) {
  const c = { y: 0, page: 1 };
  c.need = (h) => {
    if (c.y + h > H - 60) {
      drawFooter(doc, meta, c.page);
      doc.addPage();
      c.page += 1;
      c.y = M + 10;
    }
  };
  return c;
}

function drawTitlePage(doc, docDef, product, c) {
  doc.setFillColor(12, 16, 22);
  doc.rect(0, 0, W, 150, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text("ZENITH APEX RESEARCH DIVISION", M, 44);
  doc.setFontSize(22);
  doc.setTextColor(214, 178, 84);
  doc.text(docDef.kind, M, 82);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(235, 235, 235);
  doc.text(docDef.title, M + 62, 82);
  doc.setFontSize(9);
  doc.setTextColor(170, 170, 170);
  doc.text(docDef.subtitle, M, 104);
  doc.setFont("courier", "normal");
  doc.setFontSize(8);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text(`${docDef.code}  ·  Rev A  ·  2026-08-12  ·  ${product.designator}`, M, 124);

  c.y = 180;
}

function h1(doc, text, c) {
  c.need(34);
  c.y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.text(text, M, c.y);
  c.y += 6;
  doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
  doc.setLineWidth(0.7);
  doc.line(M, c.y, W - M, c.y);
  c.y += 14;
}

function para(doc, text, c) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(INK[0], INK[1], INK[2]);
  const lines = doc.splitTextToSize(text, W - 2 * M);
  lines.forEach((ln) => {
    c.need(14);
    doc.text(ln, M, c.y);
    c.y += 11.5;
  });
  c.y += 6;
}

function disclaimerBox(doc, text, c) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const lines = doc.splitTextToSize(text, W - 2 * M - 16);
  const boxH = lines.length * 9.5 + 16;
  c.need(boxH + 10);
  doc.setDrawColor(RED[0], RED[1], RED[2]);
  doc.setLineWidth(0.7);
  doc.rect(M, c.y - 8, W - 2 * M, boxH);
  doc.setTextColor(RED[0], RED[1], RED[2]);
  lines.forEach((ln, i) => doc.text(ln, M + 8, c.y + 4 + i * 9.5));
  c.y += boxH + 8;
}

function bullets(doc, items, c) {
  doc.setFontSize(8.5);
  items.forEach((it) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(INK[0], INK[1], INK[2]);
    const lines = doc.splitTextToSize(it, W - 2 * M - 14);
    lines.forEach((ln, i) => {
      c.need(14);
      if (i === 0) {
        doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
        doc.text("•", M + 2, c.y);
        doc.setTextColor(INK[0], INK[1], INK[2]);
      }
      doc.text(ln, M + 14, c.y);
      c.y += 11.5;
    });
    c.y += 2;
  });
  c.y += 4;
}

function kvList(doc, rows, c) {
  doc.setFontSize(8.5);
  rows.forEach(([k, v]) => {
    c.need(15);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
    doc.text(String(k), M + 4, c.y);
    doc.setFont("courier", "normal");
    doc.setTextColor(INK[0], INK[1], INK[2]);
    const lines = doc.splitTextToSize(String(v), W - M - 200);
    doc.text(lines, M + 190, c.y);
    c.y += Math.max(1, lines.length) * 11 + 2;
  });
  c.y += 6;
}

function table(doc, spec, c) {
  const { cols, widths, rows } = spec;
  const drawHead = () => {
    c.need(24);
    doc.setFillColor(238, 234, 222);
    doc.rect(M, c.y - 9, W - 2 * M, 16, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(120, 96, 30);
    let x = M + 4;
    cols.forEach((col, i) => {
      doc.text(String(col), x, c.y + 2);
      x += widths[i];
    });
    c.y += 18;
  };
  drawHead();

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  rows.forEach((row, ri) => {
    // measure tallest cell
    const cellLines = row.map((cell, i) => doc.splitTextToSize(String(cell), widths[i] - 8));
    const rowH = Math.max(...cellLines.map((l) => l.length)) * 9.5 + 7;
    if (c.y + rowH > H - 60) {
      drawFooter(doc, c.meta, c.page);
      doc.addPage();
      c.page += 1;
      c.y = M + 10;
      drawHead();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
    }
    if (ri % 2 === 1) {
      doc.setFillColor(248, 248, 246);
      doc.rect(M, c.y - 8, W - 2 * M, rowH, "F");
    }
    let x = M + 4;
    cellLines.forEach((lines, i) => {
      doc.setTextColor(i === 0 ? GOLD[0] : INK[0], i === 0 ? GOLD[1] : INK[1], i === 0 ? GOLD[2] : INK[2]);
      lines.forEach((ln, li) => doc.text(ln, x, c.y + li * 9.5));
      x += widths[i];
    });
    c.y += rowH;
    doc.setDrawColor(228, 228, 228);
    doc.setLineWidth(0.3);
    doc.line(M, c.y - 7, W - M, c.y - 7);
  });
  c.y += 10;
}

function renderBlocks(doc, docDef, c) {
  docDef.blocks.forEach((b) => {
    if (b.h) h1(doc, b.h, c);
    else if (b.p) {
      if (b.p.startsWith("RESEARCH PROTOTYPE")) disclaimerBox(doc, b.p, c);
      else para(doc, b.p, c);
    } else if (b.list) bullets(doc, b.list, c);
    else if (b.kv) kvList(doc, b.kv, c);
    else if (b.table) table(doc, b.table, c);
  });
}

// Render a single document to its own PDF file.
export function generateEngDocument(docId) {
  const docDef = ENG_DOCUMENTS.find((d) => d.id === docId);
  if (!docDef) return;
  const product = PRODUCTS.find((p) => p.id === docDef.product);
  const doc = newDoc();
  const c = makeCursor(doc, docDef);
  c.meta = docDef;
  drawTitlePage(doc, docDef, product, c);
  renderBlocks(doc, docDef, c);
  drawFooter(doc, docDef, c.page);
  doc.save(`${docDef.code}_${docDef.kind}.pdf`);
}

// Render every document for one product (or all products) into one combined PDF.
export function generateEngPackage(productId) {
  const set = productId ? ENG_DOCUMENTS.filter((d) => d.product === productId) : ENG_DOCUMENTS;
  if (!set.length) return;
  const doc = newDoc();
  const meta = { code: productId ? PRODUCTS.find((p) => p.id === productId).prefix : "ZA-ENG-PACKAGE" };
  const c = makeCursor(doc, meta);
  c.meta = meta;

  set.forEach((d, i) => {
    if (i > 0) {
      drawFooter(doc, c.meta, c.page);
      doc.addPage();
      c.page += 1;
    }
    c.meta = d;
    const product = PRODUCTS.find((p) => p.id === d.product);
    drawTitlePage(doc, d, product, c);
    renderBlocks(doc, d, c);
  });
  drawFooter(doc, c.meta, c.page);
  const name = productId
    ? `${PRODUCTS.find((p) => p.id === productId).prefix}_ENGINEERING_PACKAGE.pdf`
    : "ZA-ENG_FULL_DOCUMENT_PACKAGE.pdf";
  doc.save(name);
}