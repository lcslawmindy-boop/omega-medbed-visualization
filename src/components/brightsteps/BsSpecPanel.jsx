import React from "react";
import DeviceIdentity from "./spec/DeviceIdentity";
import SpecTable from "./spec/SpecTable";
import KidsOsDashboard from "./spec/KidsOsDashboard";
import PowerAllocation from "./spec/PowerAllocation";
import TargetOutcomes from "./spec/TargetOutcomes";
import RegulatoryBlock from "./spec/RegulatoryBlock";

export default function BsSpecPanel({ mode, mobile }) {
  const content = (
    <>
      <DeviceIdentity />
      <SpecTable />
      <KidsOsDashboard />
      <PowerAllocation />
      <TargetOutcomes mode={mode} />
      <RegulatoryBlock />
    </>
  );

  if (mobile) return <div className="bs-scroll">{content}</div>;

  return (
    <aside
      className="bs-edges fixed right-0 z-[90] hidden lg:flex flex-col overflow-y-auto bs-scroll no-select"
      style={{ width: 320, background: "var(--bg-panel)", borderLeft: "1px solid var(--border)" }}
    >
      {content}
    </aside>
  );
}