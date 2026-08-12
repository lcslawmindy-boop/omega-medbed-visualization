import React, { useState, useEffect } from "react";
import TopHeader from "@/components/medbed/TopHeader";
import LegalFooter from "@/components/medbed/LegalFooter";
import ModalitySidebar from "@/components/medbed/ModalitySidebar";
import SpecPanel from "@/components/medbed/SpecPanel";
import MedBedScene from "@/components/medbed/MedBedScene";
import SceneOverlay from "@/components/medbed/SceneOverlay";
import CenterPanel from "@/components/medbed/CenterPanel";
import ModalityDetailModal from "@/components/medbed/ModalityDetailModal";
import ProtocolBuilder from "@/components/medbed/ProtocolBuilder";
import { MODALITIES } from "@/data/modalities";

export default function OmegaMedBed() {
  const [activeCode, setActiveCode] = useState("SFT");
  const [view, setView] = useState("reset");
  const [detailCode, setDetailCode] = useState(null);
  const [protocolOpen, setProtocolOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [remaining, setRemaining] = useState(0);

  const openDetail = (code) => setDetailCode(code);
  const closeDetail = () => setDetailCode(null);
  const cycleDetail = (dir) => {
    setDetailCode((cur) => {
      const idx = MODALITIES.findIndex((m) => m.code === cur);
      const next = (idx + dir + MODALITIES.length) % MODALITIES.length;
      return MODALITIES[next].code;
    });
  };
  const startSession = (codes, dur) => {
    setSession({ codes, endAt: Date.now() + dur * 1000 });
    setProtocolOpen(false);
  };

  useEffect(() => {
    if (!session) return;
    const tick = () => {
      const rem = Math.max(0, Math.round((session.endAt - Date.now()) / 1000));
      setRemaining(rem);
      if (rem <= 0) setSession(null);
    };
    tick();
    const id = setInterval(tick, 1000);
    let idx = 0;
    setActiveCode(session.codes[0]);
    const cycleId = setInterval(() => {
      idx = (idx + 1) % session.codes.length;
      setActiveCode(session.codes[idx]);
    }, 3000);
    return () => { clearInterval(id); clearInterval(cycleId); };
  }, [session]);

  const handleExport = () => {
    // Minimal export: dump current modality summary to a text file download
    const blob = new Blob(
      [`OMEGA MEDBED ZA-MB-Ω — Modality ${activeCode}\nResearch prototype only. © 2026 Aethon Apex IP Holdings LLC.`],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ZA-MB-Omega_${activeCode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-primary overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <TopHeader onExport={handleExport} session={!!session} remaining={remaining} />
      <ModalitySidebar activeCode={activeCode} onSelect={setActiveCode} onOpenDetail={openDetail} />
      <SpecPanel />

      {/* Center scene area */}
      <main
        className="absolute flex flex-col overflow-hidden"
        style={{ top: 60, bottom: 40, left: 280, right: 320, background: "var(--bg-primary)" }}
      >
        <div className="relative flex-1 min-h-0">
          <MedBedScene activeCode={activeCode} view={view} onPickModality={setActiveCode} />
          <SceneOverlay activeCode={activeCode} onHighlight={setActiveCode} onView={setView} />
        </div>
        <CenterPanel
          activeCode={activeCode}
          onSelect={setActiveCode}
          onOpenDetail={openDetail}
          onOpenProtocol={() => setProtocolOpen(true)}
        />
      </main>

      <ProtocolBuilder open={protocolOpen} onClose={() => setProtocolOpen(false)} onSessionStart={startSession} />
      {detailCode && (
        <ModalityDetailModal
          code={detailCode}
          onClose={closeDetail}
          onPrev={() => cycleDetail(-1)}
          onNext={() => cycleDetail(1)}
        />
      )}

      <LegalFooter />
    </div>
  );
}