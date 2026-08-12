import React from "react";
import PageShell from "@/components/shell/PageShell";
import BsShowcase from "@/components/brightsteps/BsShowcase";

export default function HardwareGallery() {
  return (
    <PageShell title="HARDWARE SHOWCASE" subtitle="Component renderings · hover to inspect engineering specs">
      <BsShowcase />
    </PageShell>
  );
}