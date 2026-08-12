import React from "react";
import { Image } from "@/components/ui/image";

// Fullscreen zoomable viewer for engineering reference sheets.
export default function DocLightbox({ images, index, onClose, onIndex }) {
  const img = images[index];
  const prev = () => onIndex((index - 1 + images.length) % images.length);
  const next = () => onIndex((index + 1) % images.length);
  return (
    <div className="fixed inset-0 z-[200] flex flex-col fade-in" style={{ background: "rgba(0,4,8,0.97)" }} onClick={onClose}>
      <div className="flex items-center justify-between gap-3 px-4 safe-top flex-none" style={{ height: "calc(48px + env(safe-area-inset-top))", borderBottom: "1px solid var(--border)" }} onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0 flex-1">
          <div className="font-display text-gold truncate" style={{ fontSize: 11, letterSpacing: "0.06em" }}>{img.title}</div>
          <div className="font-mono text-muted truncate" style={{ fontSize: 9 }}>{img.doc} · {img.rev}</div>
        </div>
        <button onClick={onClose} className="text-gold flex items-center justify-center flex-none" style={{ fontSize: 22, minWidth: 44, minHeight: 44 }} aria-label="Close">✕</button>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center p-2" onClick={onClose}>
        <Image src={img.url} alt={img.title} fittingType="fit" className="block w-full h-full" style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </div>
      <div className="flex items-center justify-between px-4 py-1 safe-bottom flex-none" style={{ borderTop: "1px solid var(--border)" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={prev} className="font-display text-gold flex items-center" style={{ fontSize: 12, minHeight: 44, minWidth: 44 }}>‹ PREV</button>
        <span className="font-mono text-muted" style={{ fontSize: 10 }}>{index + 1} / {images.length}</span>
        <button onClick={next} className="font-display text-gold flex items-center" style={{ fontSize: 12, minHeight: 44, minWidth: 44 }}>NEXT ›</button>
      </div>
    </div>
  );
}