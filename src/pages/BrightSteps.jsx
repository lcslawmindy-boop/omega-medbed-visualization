import React, { useState, useEffect } from "react";
import "@/styles/brightsteps.css";
import BsHeader from "@/components/brightsteps/BsHeader";
import BsFooter from "@/components/brightsteps/BsFooter";
import BsSidebar from "@/components/brightsteps/BsSidebar";
import BsSpecPanel from "@/components/brightsteps/BsSpecPanel";
import BsScene from "@/components/brightsteps/BsScene";
import BsSceneOverlay from "@/components/brightsteps/BsSceneOverlay";
import BsSystemCards from "@/components/brightsteps/BsSystemCards";
import BsEcosystem from "@/components/brightsteps/BsEcosystem";
import BsSessionLogModal from "@/components/brightsteps/BsSessionLogModal";
import BsSystemDetailModal from "@/components/brightsteps/detail/BsSystemDetailModal";
import BsProtocolBuilder from "@/components/brightsteps/protocol/BsProtocolBuilder";
import ParentSystemCards from "@/components/brightsteps/parent/ParentSystemCards";
import ParentFaq from "@/components/brightsteps/parent/ParentFaq";
import ParentTimeline from "@/components/brightsteps/parent/ParentTimeline";
import ParentEmergency from "@/components/brightsteps/parent/ParentEmergency";
import { BS_NAV_SYSTEMS } from "@/data/brightstepsNav";
import { POD_MODES } from "@/data/brightsteps";
import { generateBsPackage } from "@/lib/bsSpecReport";

export default function BrightSteps() {
  const [mode, setMode] = useState("clinician");
  const [activeCode, setActiveCode] = useState("BIO");
  const [view, setView] = useState("reset");
  const [podModeIdx, setPodModeIdx] = useState(0);
  const [logOpen, setLogOpen] = useState(false);
  const [detailCode, setDetailCode] = useState(null);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [remaining, setRemaining] = useState(0);

  const handleHighlight = (code) => {
    setActiveCode(code);
    const el = document.getElementById(`bs-card-${code}`);
    if (el) el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  const cycleDetail = (dir) => {
    const i = BS_NAV_SYSTEMS.findIndex((s) => s.code === detailCode);
    setDetailCode(BS_NAV_SYSTEMS[(i + dir + BS_NAV_SYSTEMS.length) % BS_NAV_SYSTEMS.length].code);
  };

  const startSession = (cfg) => {
    setSession(cfg);
    setRemaining(cfg.dur * 60);
    setBuilderOpen(false);
  };

  // Countdown + sequential system activation (0.8s each)
  useEffect(() => {
    if (!session) return;
    let i = 0;
    setActiveCode(session.codes[0]);
    const seq = setInterval(() => {
      i += 1;
      setActiveCode(session.codes[i % session.codes.length]);
    }, 800);
    const tick = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { clearInterval(seq); setSession(null); return 0; }
        return r - 1;
      });
    }, 1000);
    return () => { clearInterval(seq); clearInterval(tick); };
  }, [session]);

  return (
    <div className="bs-root fixed inset-0 overflow-hidden">
      <BsHeader
        mode={mode}
        onMode={setMode}
        onSessionLog={() => setLogOpen(true)}
        onExport={generateBsPackage}
        onProtocol={() => setBuilderOpen(true)}
        session={!!session}
        remaining={remaining}
      />
      <BsSidebar activeCode={activeCode} onSelect={handleHighlight} onDetails={setDetailCode} />
      <BsSpecPanel mode={mode} />

      <main className="bs-main flex flex-col overflow-hidden">
        {/* 3D scene */}
        <div className="relative flex-none no-select" style={{ height: "48%", minHeight: 260 }}>
          <BsScene activeCode={activeCode} view={view} modeColor={session ? session.color : POD_MODES[podModeIdx].color} />
          <BsSceneOverlay
            activeCode={activeCode}
            onHighlight={handleHighlight}
            onView={setView}
            podModeIdx={podModeIdx}
            onPodMode={setPodModeIdx}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto bs-scroll p-3 space-y-4" style={{ borderTop: "1px solid var(--border)" }}>
          {mode === "parent" && <ParentEmergency />}
          {mode === "parent" && (
            <div className="bs-card p-3" style={{ background: "var(--bg-card)", borderLeft: "3px solid var(--teal)" }}>
              <div className="font-kid font-bold" style={{ fontSize: 13, color: "var(--text-primary)" }}>What to expect 💙</div>
              <p className="font-kid" style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6, margin: "4px 0 0" }}>
                Your child sits in a cozy glowing pod for 15–25 minutes. The pod plays gentle sounds, soft vibrations, warm light and calming colors — all watched over every moment by KIDS-OS, the pod's caring safety brain. Nothing hurts, nothing is loud, and your child can stop anytime.
              </p>
            </div>
          )}
          {mode === "technical" && (
            <div className="bs-card p-3 font-mono" style={{ background: "var(--bg-card)", fontSize: 9, color: "var(--text-muted)", lineHeight: 1.7 }}>
              <span style={{ color: "var(--sky)" }}>AATCS-P1 SPEC SUMMARY</span> — Dimensions 1600(D)×1500(W)×1700(H)mm · Weight 210kg · Input 100–240VAC 50/60Hz · Max draw 1.2kW · Operating 18–28°C · Compute: Raspberry Pi 5 main + 3× Pi Zero 2W sub-controllers · BFAC safety engine + ACE adaptive engine · Compliance target: FDA (Class II), CE, IEC 60601, UL
            </div>
          )}
          <div>
            <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
              {mode === "parent" ? "HOW EACH SYSTEM HELPS" : mode === "technical" ? "MODALITY ENGINEERING DATA" : "THERAPY SYSTEM CLINICAL OVERVIEW"}
            </div>
            {mode === "parent" ? (
              <ParentSystemCards activeCode={activeCode} onSelect={setActiveCode} />
            ) : (
              <BsSystemCards mode={mode} activeCode={activeCode} onSelect={setActiveCode} />
            )}
          </div>
          {mode === "parent" && (
            <>
              <ParentFaq />
              <ParentTimeline />
            </>
          )}
          <BsEcosystem />
          <div className="font-mono text-center py-2" style={{ fontSize: 8, color: "var(--text-muted)", lineHeight: 1.6 }}>
            CONCEPT — NOT A MEDICAL DEVICE · NOT FOR MANUFACTURE<br />© 2026 Aethon Apex IP Holdings LLC
          </div>
        </div>
      </main>

      <BsSessionLogModal open={logOpen} onClose={() => setLogOpen(false)} />
      <BsProtocolBuilder open={builderOpen} onClose={() => setBuilderOpen(false)} onStart={startSession} />
      {detailCode && (
        <BsSystemDetailModal code={detailCode} onClose={() => setDetailCode(null)} onCycle={cycleDetail} />
      )}
      <BsFooter />
    </div>
  );
}