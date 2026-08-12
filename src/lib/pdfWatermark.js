// Diagonal Aethon Apex watermark stamped across every generated PDF page.
const TEXT = "AETHON APEX — CONFIDENTIAL";

export function stampPdfWatermark(doc, { light = false } = {}) {
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const step = pw / 3.2;

  doc.saveGraphicsState?.();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(pw > 400 ? 9 : 7);
  const tone = light ? 235 : 120;
  doc.setTextColor(tone, tone, tone);
  if (doc.GState && doc.setGState) doc.setGState(new doc.GState({ opacity: light ? 0.1 : 0.08 }));

  for (let y = step * 0.4; y < ph + step; y += step * 0.85) {
    for (let x = -step * 0.4; x < pw + step; x += step) {
      doc.text(TEXT, x, y, { angle: 28 });
    }
  }
  if (doc.GState && doc.setGState) doc.setGState(new doc.GState({ opacity: 1 }));
  doc.restoreGraphicsState?.();
  doc.setTextColor(0, 0, 0);
}