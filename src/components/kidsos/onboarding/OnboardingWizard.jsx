import React, { useState } from "react";
import Starr from "../Starr";
import LegalOverlay from "../LegalOverlay";
import { ChildProfileStep, CommunicationStep, SensitivitiesStep } from "./ProfileSteps";
import { TrustedAdultsStep, LoginMethodStep, NotificationsStep } from "./SetupSteps";
import { playCue } from "@/lib/kidsSound";

export default function OnboardingWizard({ profile, setProfile, settings, setSettings, onFinish }) {
  const [step, setStep] = useState(0);
  const [legalDone, setLegalDone] = useState(() => localStorage.getItem("kidsos_legal") === "true");
  const set = (patch) => setProfile({ ...profile, ...patch });

  if (!legalDone) {
    return <LegalOverlay onAccept={() => { localStorage.setItem("kidsos_legal", "true"); setLegalDone(true); }} />;
  }

  const steps = [
    {
      title: "Welcome",
      body: (
        <div className="text-center py-4">
          <Starr size={92} name={profile.mascotName} />
          <h2 className="k-t-xl font-bold mt-3">Welcome to BrightSteps 💙</h2>
          <p className="k-t-md mt-2" style={{ color: "var(--k-muted)" }}>
            Let's set up {profile.name || "your child"}'s space.
          </p>
        </div>
      ),
      next: "Get Started →",
    },
    { title: "Child profile", body: <ChildProfileStep profile={profile} set={set} />, valid: !!profile.name.trim() },
    { title: "Communication", body: <CommunicationStep profile={profile} set={set} /> },
    { title: "Sensitivities", body: <SensitivitiesStep profile={profile} set={set} /> },
    { title: "Trusted adults", body: <TrustedAdultsStep profile={profile} set={set} />, valid: profile.trustedAdults.length > 0 },
    { title: "Sign in", body: <LoginMethodStep profile={profile} set={set} settings={settings} setSettings={setSettings} />, valid: settings.pin.length === 4 },
    { title: "Notifications", body: <NotificationsStep profile={profile} set={set} settings={settings} setSettings={setSettings} /> },
    {
      title: "Ready",
      body: (
        <div className="text-center py-4 kids-starfield">
          <Starr size={96} mood="cheer" name={profile.mascotName} />
          <h2 className="k-t-xl font-bold mt-3">{profile.name || "Your child"}'s BrightSteps is ready! 🌟</h2>
          <p className="k-t-md mt-2" style={{ color: "var(--k-muted)" }}>{profile.mascotName} is waiting to say hello.</p>
        </div>
      ),
      next: `Hand device to ${profile.name || "your child"} →`,
    },
  ];

  const current = steps[step];
  const last = step === steps.length - 1;
  const canNext = current.valid !== false;

  const advance = () => {
    if (!canNext) return;
    if (last) { playCue("login", settings.sound); onFinish(); return; }
    playCue("emotion", settings.sound);
    setStep(step + 1);
  };

  return (
    <div className="fixed inset-0 z-[190] flex items-center justify-center p-3" style={{ background: "#050C16" }}>
      <div className="kids-card w-full p-4" style={{ maxWidth: 600, maxHeight: "92vh", overflowY: "auto" }}>
        <div className="k-t-sm" style={{ color: "var(--k-sky)" }}>STEP {step + 1} OF {steps.length} — {current.title.toUpperCase()}</div>
        <div className="mt-1 rounded-full overflow-hidden" style={{ height: 6, background: "#0A1826" }}>
          <div style={{ width: `${((step + 1) / steps.length) * 100}%`, height: "100%", background: "var(--k-sky)" }} />
        </div>

        <div className="mt-3">{current.body}</div>

        <div className="flex gap-2 mt-4">
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)} className="kids-tap k-t-md px-4" style={{ minHeight: 54, border: "1px solid var(--k-border)", color: "var(--k-ink)" }}>
              ← Back
            </button>
          )}
          <button
            type="button"
            onClick={advance}
            disabled={!canNext}
            className="kids-tap kids-solid k-t-md font-bold flex-1"
            style={{ background: canNext ? "var(--k-sky)" : "#1B2C42", color: canNext ? "#04121F" : "var(--k-muted)", minHeight: 54 }}
          >
            {current.next || "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}