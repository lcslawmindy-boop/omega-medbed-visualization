import React, { useEffect } from "react";

const NOTICE = "© 2026 AETHON APEX IP HOLDINGS LLC — ALL RIGHTS RESERVED · CONFIDENTIAL";

/**
 * Site-wide IP protection: blocks copy / cut / right-click / image drag,
 * paints a repeating copyright watermark over all content (including images),
 * and shows a persistent copyright notice.
 */
export default function ProtectionLayer() {
  useEffect(() => {
    const block = (e) => e.preventDefault();
    const blockCopy = (e) => {
      e.preventDefault();
      if (e.clipboardData) e.clipboardData.setData("text/plain", NOTICE);
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("copy", blockCopy);
    document.addEventListener("cut", blockCopy);
    document.addEventListener("dragstart", block);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("cut", blockCopy);
      document.removeEventListener("dragstart", block);
    };
  }, []);

  return (
    <>
      <div className="wm-overlay" aria-hidden="true">
        <div className="wm-tile">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="font-mono">© AETHON APEX — CONFIDENTIAL</span>
          ))}
        </div>
      </div>
      <div className="copyright-badge font-mono" aria-hidden="true">{NOTICE}</div>
    </>
  );
}