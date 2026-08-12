import React, { useState, useEffect } from "react";
import "@/styles/kidsos.css";
import { loadSettings, saveSettings, rootClasses } from "@/lib/kidsSettings";
import { subscribeSync, flushQueue } from "@/lib/kidsLog";
import KidsHeader from "@/components/kidsos/KidsHeader";
import RoutineCard from "@/components/kidsos/RoutineCard";
import EmotionCheckin from "@/components/kidsos/EmotionCheckin";
import CalmCorner from "@/components/kidsos/CalmCorner";
import HelpFlow from "@/components/kidsos/HelpFlow";
import ParentPanel from "@/components/kidsos/ParentPanel";
import LegalOverlay from "@/components/kidsos/LegalOverlay";

export default function KidsOs() {
  const [settings, setSettings] = useState(loadSettings);
  const [sync, setSync] = useState({ online: true, queued: 0 });
  const [stars, setStars] = useState(() => Number(localStorage.getItem("kidsos_stars") || 0));
  const [helpOpen, setHelpOpen] = useState(false);
  const [parentOpen, setParentOpen] = useState(false);
  const [accepted, setAccepted] = useState(() => localStorage.getItem("kidsos_legal") === "true");

  useEffect(() => { flushQueue(); return subscribeSync(setSync); }, []);

  const updateSettings = (s) => { setSettings(s); saveSettings(s); };
  const addStars = (n) => setStars((s) => { const v = s + n; localStorage.setItem("kidsos_stars", String(v)); return v; });

  if (!accepted) {
    return (
      <div className={`${rootClasses(settings)} fixed inset-0`}>
        <LegalOverlay onAccept={() => { localStorage.setItem("kidsos_legal", "true"); setAccepted(true); }} />
      </div>
    );
  }

  return (
    <div className={`${rootClasses(settings)} fixed inset-0 overflow-y-auto`}>
      <KidsHeader stars={stars} online={sync.online} queued={sync.queued} onParent={() => setParentOpen(true)} />

      <main className="px-4 pb-32 space-y-4 kids-gap" style={{ maxWidth: 900, margin: "0 auto" }}>
        <RoutineCard holdMs={settings.touchHoldMs} onStars={addStars} />
        <EmotionCheckin holdMs={settings.touchHoldMs} />
        <CalmCorner holdMs={settings.touchHoldMs} />
        <p className="k-t-sm text-center" style={{ color: "var(--k-muted)", lineHeight: 1.6 }}>
          BrightSteps is a support platform. Not a medical device. Not a diagnostic tool.<br />© 2026 Aethon Apex IP Holdings LLC
        </p>
      </main>

      {/* I NEED HELP — always reachable, one tap, never hidden */}
      <button
        type="button"
        onClick={() => setHelpOpen(true)}
        className="kids-tap kids-solid fixed left-4 right-4 k-t-lg font-bold"
        style={{ bottom: "calc(16px + env(safe-area-inset-bottom))", maxWidth: 420, margin: "0 auto", background: "var(--k-warn)", color: "#170404", minHeight: 66, zIndex: 40 }}
      >
        ✋ I NEED HELP
      </button>

      {helpOpen && <HelpFlow holdMs={settings.touchHoldMs} onClose={() => setHelpOpen(false)} />}
      {parentOpen && (
        <ParentPanel
          settings={settings}
          onChange={updateSettings}
          online={sync.online}
          queued={sync.queued}
          onClose={() => setParentOpen(false)}
        />
      )}
    </div>
  );
}