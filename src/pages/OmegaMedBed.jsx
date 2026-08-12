import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import TopHeader from "@/components/medbed/TopHeader";
import LegalFooter from "@/components/medbed/LegalFooter";
import ModalitySidebar from "@/components/medbed/ModalitySidebar";
import SpecPanel from "@/components/medbed/SpecPanel";
import MedBedScene from "@/components/medbed/MedBedScene";
import SceneOverlay from "@/components/medbed/SceneOverlay";
import CenterPanel from "@/components/medbed/CenterPanel";
import ModalityDetailModal from "@/components/medbed/ModalityDetailModal";
import ProtocolBuilder from "@/components/medbed/ProtocolBuilder";
import TelemetryOverlay from "@/components/medbed/TelemetryOverlay";
import FirstVisitGate from "@/components/medbed/FirstVisitGate";
import { MODALITIES, MODALITY_BY_CODE } from "@/data/modalities";

// 1-9,0 -> indices 0-9; A-E,G-H -> indices 10-16 (F reserved for fit)
const KEY_INDEX = {
  "1": 0, "2": 1, "3": 2, "4": 3, "5": 4, "6": 5, "7": 6, "8": 7, "9": 8, "0": 9,
  a: 10, b: 11, c: 12, d: 13, e: 14, g: 15, h: 16,
};

// Scripted power-up boot sequence — staged phases with power level + focus modality
const BOOT_STAGES = [
  { t: 0,     power: 0.08, code: "BIO", label: "BFAC CONTROLLER ONLINE" },
  { t: 1500,  power: 0.20, code: "PBM", label: "PHOTONIC ARRAY PRIMED" },
  { t: 3000,  power: 0.34, code: "PEMF", label: "ELECTROMAGNETIC FIELD" },
  { t: 4500,  power: 0.48, code: "VAT", label: "ACOUSTIC RESONANCE" },
  { t: 6000,  power: 0.62, code: "FIT", label: "THERMAL ENVELOPE" },
  { t: 7500,  power: 0.80, code: "SFT", label: "SCALAR CORONA SPIN-UP" },
  { t: 9000,  power: 0.92, code: "PRI", label: "MULTICHANNEL MODULATOR" },
  { t: 10500, power: 1.00, code: "BIO", label: "ALL SYSTEMS NOMINAL" },
];
const BOOT_END = BOOT_STAGES[BOOT_STAGES.length - 1].t + 1500;

export default function OmegaMedBed() {
  const [activeCode, setActiveCode] = useState("SFT");
  const [view, setView] = useState("reset");
  const [paused, setPaused] = useState(false);
  const [detailCode, setDetailCode] = useState(null);
  const [protocolOpen, setProtocolOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [nominal, setNominal] = useState(false);
  const [power, setPower] = useState(0);
  const [bootStage, setBootStage] = useState(null);

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

  // Session countdown + scripted power-up boot sequence
  useEffect(() => {
    if (!session) return;
    const steps = session.codes.length;
    const tick = () => {
      const rem = Math.max(0, Math.round((session.endAt - Date.now()) / 1000));
      setRemaining(rem);
      if (rem <= 0) { setSession(null); setPower(0); setBootStage(null); }
    };
    tick();
    const id = setInterval(tick, 1000);

    // Scripted staged boot sequence — drives power, focus modality, and stage label
    const start = Date.now();
    setNominal(false);
    let cycleId = null;
    const applyStage = (s) => {
      setBootStage(s.label);
      setPower(s.power);
      setActiveCode(s.code);
    };
    applyStage(BOOT_STAGES[0]);
    const bootId = setInterval(() => {
      const elapsed = Date.now() - start;
      let stage = BOOT_STAGES[0];
      for (const s of BOOT_STAGES) if (elapsed >= s.t) stage = s;
      applyStage(stage);
      if (elapsed >= BOOT_END) {
        clearInterval(bootId);
        setBootStage(null);
        setPower(1);
        setNominal(true);
        setTimeout(() => setNominal(false), 2500);
        // Post-boot: continue cycling through session modalities at full power
        let i = 0;
        cycleId = setInterval(() => {
          i += 1;
          setActiveCode(session.codes[i % steps]);
        }, 1500);
      }
    }, 120);

    return () => { clearInterval(id); clearInterval(bootId); if (cycleId) clearInterval(cycleId); };
  }, [session]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target && e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Escape") {
        if (detailCode) setDetailCode(null);
        else if (protocolOpen) setProtocolOpen(false);
        return;
      }
      const k = e.key.toLowerCase();
      if (k === "s") { setProtocolOpen((o) => !o); return; }
      if (e.key === " ") { e.preventDefault(); setPaused((p) => !p); return; }
      if (k === "r") { setView("reset"); return; }
      if (k === "f") { setView("front"); return; }
      if (KEY_INDEX[k] !== undefined && MODALITIES[KEY_INDEX[k]]) {
        setActiveCode(MODALITIES[KEY_INDEX[k]].code);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detailCode, protocolOpen]);

  const handleSearchSelect = (code) => {
    setActiveCode(code);
    setTimeout(() => {
      const el = document.querySelector(`[data-modcode="${code}"]`);
      if (el) el.scrollIntoView({ block: "nearest" });
    }, 60);
  };

  const handleExport = (type) => {
    if (type === "protocol") {
      const data = {
        device: "ZA-MB-Ω",
        activeModality: activeCode,
        timestamp: new Date().toISOString(),
        note: "Research prototype only. © 2026 Aethon Apex IP Holdings LLC.",
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ZA-MB-Omega_protocol.json";
      a.click();
      URL.revokeObjectURL(url);
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("OMEGA MEDBED ZA-MB-Ω", 14, 20);
    doc.setFontSize(8);
    doc.text("Research prototype only — © 2026 Aethon Apex IP Holdings LLC", 14, 26);
    if (type === "prd") {
      doc.setFontSize(12);
      doc.text("Full PRD Summary", 14, 42);
      doc.setFontSize(8);
      doc.text("18 modalities under BFAC+ACE closed-loop control. Class III concept.", 14, 50);
      doc.text("Refer to ZA-ENG-MB-OMEGA-A-PRD Rev A (2026-08-12).", 14, 56);
      MODALITIES.forEach((m, i) => doc.text(`${m.code} — ${m.name} (${m.tier})`, 14, 66 + i * 6));
    } else if (type === "spec") {
      const m = MODALITY_BY_CODE[activeCode];
      doc.setFontSize(12);
      doc.text(`Modality Spec Sheet — ${m.code}`, 14, 42);
      doc.setFontSize(9);
      doc.text(`Name: ${m.name}`, 14, 54);
      doc.text(`Category: ${m.category}`, 14, 60);
      doc.text(`Tier: ${m.tier}`, 14, 66);
      doc.text(`Spec: ${m.spec}`, 14, 72);
      doc.text(`Mechanism: ${m.mechanism.join(", ")}`, 14, 78);
      doc.text(`Research: ${m.source}`, 14, 84);
    } else if (type === "zone") {
      doc.setFontSize(12);
      doc.text("Zone Map", 14, 42);
      doc.setFontSize(8);
      MODALITIES.forEach((m, i) => doc.text(`${m.zone} — ${m.code} (${m.name})`, 14, 52 + i * 6));
    }
    doc.save(`ZA-MB-Omega_${type}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-primary overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <FirstVisitGate />
      <TopHeader onExport={handleExport} session={!!session} remaining={remaining} nominal={nominal} onSearchSelect={handleSearchSelect} />
      <ModalitySidebar activeCode={activeCode} onSelect={setActiveCode} onOpenDetail={openDetail} />
      <SpecPanel />

      {/* Center scene area */}
      <main
        className="absolute flex flex-col overflow-hidden"
        style={{ top: 60, bottom: 40, left: 280, right: 320, background: "var(--bg-primary)" }}
      >
        <div className="relative flex-1 min-h-0">
          <MedBedScene activeCode={activeCode} view={view} onPickModality={setActiveCode} paused={paused} power={power} />
          <SceneOverlay activeCode={activeCode} onHighlight={setActiveCode} onView={setView} bootStage={bootStage} />
          <TelemetryOverlay active={!!session} power={power} />
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