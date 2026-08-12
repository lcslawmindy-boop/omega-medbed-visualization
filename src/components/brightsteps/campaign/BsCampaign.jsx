import React, { useState } from "react";
import { CAMPAIGN, TIERS } from "@/data/brightstepsCampaign";
import { generateEngDocument } from "@/lib/docPackageReport";
import CampaignFunding from "./CampaignFunding";
import CampaignTiers from "./CampaignTiers";
import CampaignFaq from "./CampaignFaq";
import CampaignTechnology from "./CampaignTechnology";
import CampaignMission from "./CampaignMission";
import CampaignRoadmap from "./CampaignRoadmap";
import CampaignFinancials from "./CampaignFinancials";
import CampaignDonate from "./CampaignDonate";
import InvestorPortal from "./InvestorPortal";

export default function BsCampaign() {
  const [tier, setTier] = useState(null);

  return (
    <div className="space-y-3">
      <div className="bs-card p-3" style={{ background: "var(--bg-card)", borderLeft: "3px solid var(--sky)" }}>
        <div className="font-display" style={{ fontSize: 10, color: "var(--sky)", letterSpacing: "0.14em" }}>
          CROWDFUNDING CAMPAIGN — CAPITAL RAISE
        </div>
        <div className="font-display mt-1" style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.35 }}>
          {CAMPAIGN.title}
        </div>
        <div className="font-kid" style={{ fontSize: 11, color: "var(--sky)" }}>{CAMPAIGN.tagline}</div>
        <p className="font-body" style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.65, margin: "8px 0 0" }}>
          {CAMPAIGN.summary}
        </p>
        <button
          onClick={() => generateEngDocument("bs-campaign")}
          className="font-display rounded mt-3"
          style={{ fontSize: 9, padding: "9px 12px", minHeight: 38, background: "var(--sky)", color: "#04121F", letterSpacing: "0.07em" }}
        >
          ⬇ DOWNLOAD CAMPAIGN BRIEF PDF
        </button>
      </div>

      <CampaignFunding />
      <CampaignTechnology />
      <CampaignMission onJoin={() => setTier(TIERS[0])} />
      <CampaignRoadmap />
      <CampaignFinancials />
      <CampaignTiers onPledge={setTier} />
      <CampaignDonate />
      <InvestorPortal />

      {tier && (
        <div className="bs-card p-3" style={{ background: "var(--bg-card)", borderLeft: "3px solid var(--teal)" }}>
          <div className="font-body" style={{ fontSize: 11, color: "var(--text-primary)" }}>
            Selected: <strong>{tier.name}</strong> — ${tier.amount.toLocaleString()}
          </div>
          <div className="font-body mt-1" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.6 }}>
            The campaign is not live yet. Pledges open at launch; this selection is a planning reference only. No payment is taken and no equity or financial return is offered.
          </div>
        </div>
      )}

      <CampaignFaq />
    </div>
  );
}