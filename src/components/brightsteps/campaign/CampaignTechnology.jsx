import React from "react";
import { DEVICES, RESEARCH_DISCLAIMER } from "@/data/campaignDevices";
import DeviceCard from "./DeviceCard";

export default function CampaignTechnology() {
  return (
    <section className="rounded-2xl p-3" style={{ background: "#05080F", border: "1px solid var(--border)" }}>
      <div className="text-center">
        <div className="font-display" style={{ fontSize: 10, color: "var(--gold, #C9A84C)", letterSpacing: "0.16em" }}>
          THE TECHNOLOGY EXISTS TODAY
        </div>
        <h2 className="font-display" style={{ fontSize: 22, color: "#fff", lineHeight: 1.25, margin: "6px 0 0" }}>
          Four Devices. Four Documented Scientific Lineages. One Mission.
        </h2>
        <p className="font-body mx-auto" style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.75, maxWidth: 720, margin: "10px auto 0" }}>
          Antoine Prioré cured terminal cancer in the 1960s. T. Henry Moray demonstrated 50kW of cold radiant energy in the 1920s.
          T.E. Bearden documented the scalar EM physics in the 1980s. Every device in this portfolio is buildable today with
          off-the-shelf components and documented 1960s-1980s physics. None of this is new. What's new is integration,
          engineering, and deployment.
        </p>
      </div>

      <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
        {DEVICES.map((d) => <DeviceCard key={d.code} d={d} />)}
      </div>

      <div
        className="rounded mt-3 p-2.5 font-body"
        style={{ fontSize: 9, lineHeight: 1.7, color: "var(--text-muted)", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.3)" }}
      >
        {RESEARCH_DISCLAIMER}
      </div>
    </section>
  );
}