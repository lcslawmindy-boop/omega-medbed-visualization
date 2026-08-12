import React, { useState } from "react";
import { DONATION_TIERS } from "@/data/campaignDonation";
import FundingProgress from "./donate/FundingProgress";
import DonationTierCard from "./donate/DonationTierCard";
import DonationWidget from "./donate/DonationWidget";
import DonationModal from "./donate/DonationModal";
import SupporterWall from "./donate/SupporterWall";

export default function CampaignDonate() {
  const [amount, setAmount] = useState("");
  const [freq, setFreq] = useState("ONE TIME");
  const [modal, setModal] = useState(false);

  const pickTier = (tier) => {
    if (tier.partner) {
      document.getElementById("bs-investor-portal")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (tier.value) setAmount(String(tier.value));
    setModal(true);
  };

  return (
    <div className="space-y-3">
      <FundingProgress />

      <div>
        <div className="font-display mb-1.5" style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.14em" }}>
          DONATION TIERS — IMPACT LEVELS
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {DONATION_TIERS.map((t) => (
            <DonationTierCard key={t.id} tier={t} onSelect={pickTier} />
          ))}
        </div>
      </div>

      <DonationWidget
        amount={amount}
        onAmount={setAmount}
        freq={freq}
        onFreq={setFreq}
        onFund={() => setModal(true)}
      />

      <SupporterWall />

      {modal && (
        <DonationModal key={`${amount}-${freq}`} open amount={amount} freq={freq} onClose={() => setModal(false)} />
      )}
    </div>
  );
}