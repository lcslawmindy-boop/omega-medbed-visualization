import React, { useState } from "react";
import TopHeader from "@/components/medbed/TopHeader";
import LegalFooter from "@/components/medbed/LegalFooter";
import ModalitySidebar from "@/components/medbed/ModalitySidebar";
import SpecPanel from "@/components/medbed/SpecPanel";
import MedBedScene from "@/components/medbed/MedBedScene";
import SceneOverlay from "@/components/medbed/SceneOverlay";
import CenterPanel from "@/components/medbed/CenterPanel";

export default function OmegaMedBed() {
  const [activeCode, setActiveCode] = useState("SFT");
  const [view, setView] = useState("reset");

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
      <TopHeader onExport={handleExport} />
      <ModalitySidebar activeCode={activeCode} onSelect={setActiveCode} />
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
        <CenterPanel activeCode={activeCode} onSelect={setActiveCode} />
      </main>

      <LegalFooter />
    </div>
  );
}