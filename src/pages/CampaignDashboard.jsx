import React from "react";
import PageShell from "@/components/shell/PageShell";
import SectionCard from "@/components/shell/SectionCard";
import CampaignFunding from "@/components/brightsteps/campaign/CampaignFunding";
import BsDocPackagePanel from "@/components/brightsteps/docs/BsDocPackagePanel";

const DONOR_MILESTONES = [
  { when: "2 days ago", who: "Anonymous", amount: "$25,000", note: "Unlocked the PBM optical bench build" },
  { when: "5 days ago", who: "R. Vasquez", amount: "$10,000", note: "Founding Partner tier — pod #003 reserved" },
  { when: "1 week ago", who: "Helix Family Trust", amount: "$50,000", note: "Funds full KIDS-OS safety certification cycle" },
  { when: "2 weeks ago", who: "M. Okonkwo", amount: "$5,000", note: "Sponsored 4 pediatric trial seats" },
  { when: "3 weeks ago", who: "Anonymous", amount: "$1,000", note: "First 100 backers milestone reached" },
];

export default function CampaignDashboard() {
  return (
    <PageShell title="CAMPAIGN DASHBOARD" subtitle="Crowdfunding progress · donor milestones · engineering packages">
      <CampaignFunding />

      <SectionCard title="RECENT DONOR MILESTONES" accent="var(--teal, #2DD4BF)" note="Illustrative — the campaign is not live yet.">
        <div className="space-y-1.5">
          {DONOR_MILESTONES.map((d) => (
            <div key={d.note} className="bs-card px-3 py-2" style={{ background: "var(--bg-panel)" }}>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-display" style={{ fontSize: 12, color: "var(--teal, #2DD4BF)" }}>{d.amount}</span>
                <span className="font-body flex-1" style={{ fontSize: 11, color: "var(--text-primary)" }}>{d.who}</span>
                <span className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{d.when}</span>
              </div>
              <div className="font-body mt-0.5" style={{ fontSize: 9.5, color: "var(--text-muted)" }}>{d.note}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <BsDocPackagePanel />
    </PageShell>
  );
}