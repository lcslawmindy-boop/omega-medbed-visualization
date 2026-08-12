import React from "react";
import IdentityHeader from "@/components/medbed/spec/IdentityHeader";
import SpecTable from "@/components/medbed/spec/SpecTable";
import BfacDashboard from "@/components/medbed/spec/BfacDashboard";
import PowerAllocation from "@/components/medbed/spec/PowerAllocation";
import RegulatoryBlock from "@/components/medbed/spec/RegulatoryBlock";

export default function SpecPanel() {
  return (
    <aside
      className="fixed right-0 top-[60px] z-50 overflow-y-auto scroll-dark bg-panel border-l border-soft"
      style={{
        width: 320,
        bottom: 40,
        borderColor: "var(--border)",
      }}
    >
      <IdentityHeader />
      <SpecTable />
      <BfacDashboard />
      <PowerAllocation />
      <RegulatoryBlock />
    </aside>
  );
}