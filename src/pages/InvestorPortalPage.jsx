import React from "react";
import PageShell from "@/components/shell/PageShell";
import CampaignFunding from "@/components/brightsteps/campaign/CampaignFunding";
import CampaignRoadmap from "@/components/brightsteps/campaign/CampaignRoadmap";
import BsDocPackagePanel from "@/components/brightsteps/docs/BsDocPackagePanel";

export default function InvestorPortalPage() {
  return (
    <PageShell title="INVESTOR PORTAL" subtitle="Campaign progress · roadmap · PRD / BOM / SOW documentation">
      <CampaignFunding />
      <CampaignRoadmap />
      <BsDocPackagePanel />
      <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)", lineHeight: 1.7 }}>
        Figures are conceptual planning references. Nothing here is an offer to sell securities, and no equity or financial return is offered.
      </div>
    </PageShell>
  );
}