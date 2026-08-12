import React from "react";
import "@/styles/brightsteps.css";
import { CRISES } from "@/data/crisisData";
import HomeHero from "@/components/home/HomeHero";
import FeatureVideos from "@/components/home/FeatureVideos";
import AppNav from "@/components/nav/AppNav";
import CrisisCard from "@/components/home/CrisisCard";
import SolutionSection from "@/components/home/SolutionSection";
import JourneyLink from "@/components/home/JourneyLink";
import CampaignEarth from "@/components/brightsteps/campaign/earth/CampaignEarth";
import CampaignTechnology from "@/components/brightsteps/campaign/CampaignTechnology";
import CampaignDonate from "@/components/brightsteps/campaign/CampaignDonate";

function Divider({ id, n, label, color = "var(--sky)" }) {
  return (
    <div id={id} className="flex items-center gap-2 pt-3">
      <span className="font-display" style={{ fontSize: 9.5, color, letterSpacing: "0.18em" }}>{n} — {label}</span>
      <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

export default function Home() {
  return (
    <div className="bs-root fixed inset-0 overflow-y-auto bs-scroll">
      <AppNav />
      <div className="mx-auto p-3 space-y-3" style={{ maxWidth: 1100 }}>
        <HomeHero />

        <Divider id="films" n="01" label="FEATURED FILMS" color="var(--gold)" />
        <FeatureVideos />

        {CRISES.map((c) => (
          <CrisisCard key={c.id} c={c} />
        ))}

        <Divider id="timeline" n="05" label="TWO FUTURES — DARK AND LIGHT TIMELINE" color="var(--gold)" />
        <CampaignEarth />

        <SolutionSection />

        <Divider id="devices" n="07" label="THE DEVICES" />
        <CampaignTechnology />

        <Divider id="donate" n="08" label="DONATE TO THE MISSION" color="var(--teal)" />
        <CampaignDonate />

        <Divider id="showcases" n="09" label="LIVE SHOWCASE SIMULATIONS" color="var(--violet)" />
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <JourneyLink
            to="/omega"
            tag="09A — OMEGA MEDBED ZA-MB-Ω"
            title="OMEGA MEDBED SHOWCASE SIMULATION"
            body="Explore the adult regeneration chamber in real-time 3D — 18 modalities, hover-labelled subsystems, protocol builder and live telemetry."
            cta="ENTER OMEGA SIMULATION"
            color="var(--gold)"
          />
          <JourneyLink
            to="/brightsteps"
            tag="09B — BRIGHTSTEPS BS-ATP-Ω"
            title="BRIGHTSTEPS SHOWCASE SIMULATION"
            body="The pediatric ASD therapy pod: 12 modalities under BFAC+ACE closed-loop control, clinician / parent / technical modes and biometric response modelling."
            cta="ENTER BRIGHTSTEPS SIMULATION"
          />
        </div>

        <Divider id="campaign" n="10" label="CAPITAL FUNDING CAMPAIGN" color="var(--gold)" />
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <JourneyLink
            to="/campaign-dashboard"
            tag="10A — CAPITAL RAISE"
            title="THE FUNDING CAMPAIGN"
            body="Use of funds, phase budgets, milestones, P&L modelling and reward tiers for the prototype, trial and deployment phases."
            cta="OPEN CAMPAIGN DASHBOARD"
            color="var(--gold)"
          />
          <JourneyLink
            to="/investor-portal"
            tag="10B — ACCREDITED PARTNERS"
            title="INVESTOR PORTAL"
            body="Partner tiers, diligence materials and the IP position for accredited investors evaluating the Aethon Apex portfolio."
            cta="OPEN INVESTOR PORTAL"
            color="var(--teal)"
          />
        </div>

        <Divider id="docs" n="11" label="ENGINEERING SPECS AND DOCUMENTS" color="var(--sky)" />
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <JourneyLink
            to="/engineering"
            tag="11A — DOCUMENT PACKAGE"
            title="ENGINEERING PDF SPECS & DOCS"
            body="PRD, BOM, SOW, test matrices and regulatory pathway documents — downloadable as individual PDFs or the full package."
            cta="OPEN ENGINEERING DOCS"
          />
          <JourneyLink
            to="/hardware-gallery"
            tag="11B — REFERENCE SHEETS"
            title="HARDWARE SHOWCASE GALLERY"
            body="Every engineering reference sheet across both platforms, filterable by group with single-sheet or investor-package PDF export."
            cta="OPEN HARDWARE GALLERY"
            color="var(--violet)"
          />
        </div>

        <div className="font-mono text-center py-4" style={{ fontSize: 8, color: "var(--text-muted)", lineHeight: 1.7 }}>
          CONCEPT — NOT A MEDICAL DEVICE · NOT FOR MANUFACTURE · NOT MEDICAL ADVICE<br />
          © 2026 Aethon Apex IP Holdings LLC
        </div>
      </div>
    </div>
  );
}