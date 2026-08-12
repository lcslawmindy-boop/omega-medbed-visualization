// BrightSteps BS-ATP-Ω crowdfunding campaign — Kickstarter / GoFundMe style.
export const CAMPAIGN = {
  title: "BrightSteps: Build the First Adaptive Sensory Pod for Autistic Kids",
  tagline: "Calm minds. Stronger futures.",
  goal: 850000,
  raised: 0,
  backers: 0,
  daysLeft: 45,
  summary:
    "We are raising the capital to build the first working BrightSteps BS-ATP-Ω prototype and develop the KIDS-OS software that runs it — a 12-system sensory regulation pod designed with autistic children, their parents and their clinicians in mind. Every dollar goes to hardware, software and safety validation. Nothing is claimed to be a treatment: this is a research prototype, built in the open, documented in public.",
};

export const USE_OF_FUNDS = [
  { label: "Prototype hardware & BOM", amount: 118400, pct: 14, note: "62 BOM lines · 638 components" },
  { label: "Shell tooling & fabrication", amount: 142000, pct: 17, note: "Composite tooling, seat, rim, compute bay" },
  { label: "KIDS-OS & application software", amount: 195000, pct: 23, note: "BFAC firmware, ACE engine, clinician + parent apps" },
  { label: "Engineering labour & integration", amount: 128000, pct: 15, note: "94 h assembly + 38-week engineering program" },
  { label: "EVT / DVT verification", amount: 96000, pct: 11, note: "40 test cases, instrumentation, fixtures" },
  { label: "Safety, EMC & risk file", amount: 74000, pct: 9, note: "IEC 60601 design intent, ISO 14971" },
  { label: "IRB-ready dossier & clinical advisory", amount: 52000, pct: 6, note: "Pediatric protocol review board" },
  { label: "Campaign fees & fulfillment", amount: 44600, pct: 5, note: "Platform fees, backer rewards, shipping" },
];

export const TIERS = [
  { amount: 25, name: "Supporter", limit: null, items: ["Name in the BrightSteps credits", "Monthly build-log email", "Digital thank-you card from the team"] },
  { amount: 75, name: "Early Believer", limit: null, items: ["Everything above", "Digital engineering poster set (11 reference sheets)", "Backer-only livestream Q&A"] },
  { amount: 250, name: "Blueprint Backer", limit: 500, items: ["Everything above", "Full PDF documentation package (PRD/PDR/BOM/SOW/EVT/DVT)", "Printed BS-ATP-Ω cutaway poster"] },
  { amount: 1000, name: "Prototype Partner", limit: 150, items: ["Everything above", "Name etched on the prototype plaque", "Private build-shop video tour", "Quarterly engineering review call"] },
  { amount: 5000, name: "Clinic Founding Circle", limit: 40, items: ["Everything above", "Priority placement on the pilot-site waitlist", "Clinician onboarding workshop seat", "Named in the IRB dossier acknowledgements"] },
  { amount: 25000, name: "Development Sponsor", limit: 10, items: ["Everything above", "Co-development advisory seat", "Logo on the prototype and all campaign materials", "First-look rights on the pilot program results"] },
];

export const CAMPAIGN_MILESTONES = [
  { pct: 25, amount: 212500, label: "BOM Released", detail: "All 62 BOM lines ordered, seven long-lead items expedited." },
  { pct: 45, amount: 382500, label: "Shell Tooling Cut", detail: "Composite tooling complete, fabrication drawings released." },
  { pct: 60, amount: 510000, label: "KIDS-OS Alpha", detail: "BFAC firmware safety loop running on bench hardware." },
  { pct: 80, amount: 680000, label: "Integration Complete", detail: "P0–P13 assembly stack built, power-on and POST passing." },
  { pct: 100, amount: 850000, label: "EVT + DVT Verified", detail: "40 test cases executed, reports issued, IRB dossier compiled." },
  { pct: 125, amount: 1062500, label: "STRETCH — Pilot Sites", detail: "Two additional pods for supervised clinical pilot sites." },
];

export const CAMPAIGN_FAQ = [
  { q: "Is BrightSteps a medical device?", a: "No. It is a research and engineering prototype. It has no FDA clearance and makes no therapeutic claim. Nothing in this campaign is medical advice." },
  { q: "Will a child use the prototype?", a: "Not during this campaign. All verification uses anthropometric manikins. Any human use requires IRB approval and clinician supervision, which comes after DVT exit." },
  { q: "What happens if we do not hit the goal?", a: "Funds are used to complete the deepest milestone reached, and every backer receives the documentation package for the work actually delivered. Progress is published either way." },
  { q: "Who is designing the safety systems?", a: "The BFAC safety engine is independent of the adaptive AI by design — the AI can only reduce intensity, never raise it. Pediatric ceilings are frozen in firmware per age band." },
  { q: "Why crowdfund instead of raising venture capital?", a: "The parents and clinicians who need this should shape it. Crowdfunding keeps the documentation open and the roadmap accountable to the community rather than to an exit timeline." },
];

/* Campaign brief rendered to PDF via the shared document renderer. */
export const CAMPAIGN_DOC = {
  id: "bs-campaign",
  product: "brightsteps",
  kind: "CAMPAIGN",
  code: "BS-CAMPAIGN-BRIEF-001",
  title: "Crowdfunding Campaign Brief",
  subtitle: "BrightSteps BS-ATP-Ω · $850,000 Prototype & Software Development Raise",
  blocks: [
    { h: "1. The Ask" },
    { p: CAMPAIGN.summary },
    { kv: [
      ["Funding Goal", "$850,000 USD"],
      ["Campaign Duration", "45 days"],
      ["Model", "Kickstarter-style rewards + GoFundMe-style open donation"],
      ["Use of Funds", "Prototype hardware, software development, safety validation"],
      ["Program Length", "38 weeks from funding close to prototype acceptance"],
      ["Deliverable", "One (1) functional BS-ATP-Ω prototype + open documentation package"],
    ] },

    { h: "2. Use of Funds" },
    { table: { cols: ["Allocation", "Amount", "%", "Notes"], widths: [175, 70, 35, 235],
      rows: USE_OF_FUNDS.map((u) => [u.label, `$${u.amount.toLocaleString()}`, `${u.pct}%`, u.note]) } },

    { h: "3. Funding Milestones" },
    { table: { cols: ["%", "Amount", "Milestone", "What It Unlocks"], widths: [40, 75, 130, 270],
      rows: CAMPAIGN_MILESTONES.map((m) => [`${m.pct}%`, `$${m.amount.toLocaleString()}`, m.label, m.detail]) } },

    { h: "4. Backer Reward Tiers" },
    { table: { cols: ["Pledge", "Tier", "Limit", "Rewards"], widths: [55, 120, 50, 290],
      rows: TIERS.map((t) => [`$${t.amount.toLocaleString()}`, t.name, t.limit ? String(t.limit) : "—", t.items.join(" · ")]) } },

    { h: "5. Why This Matters" },
    { list: [
      "1 in 31 children in the United States is identified with autism spectrum disorder.",
      "Sensory dysregulation is among the most disruptive daily challenges reported by caregivers.",
      "Existing sensory rooms are static, unmeasured and cannot adapt to the child in the moment.",
      "BS-ATP-Ω closes the loop: 12 coordinated systems, physiological sensing, and an adaptive engine that can only ever reduce intensity.",
      "Every requirement, test case and bill-of-material line is published — no black box, no unverifiable claim.",
    ] },

    { h: "6. Where the Money Goes First" },
    { list: [
      "Week 0–4 — PRD freeze, PDR review, BOM release, long-lead purchase orders.",
      "Week 4–12 — Shell tooling, fabrication drawings, BFAC firmware alpha.",
      "Week 12–20 — Subassembly bench qualification, mechanical integration.",
      "Week 20–28 — Power-on, EVT execution, clinician and parent applications feature complete.",
      "Week 28–38 — DVT execution, reports, risk file, IRB-ready dossier, prototype handover.",
    ] },

    { h: "7. Risks & Challenges" },
    { list: [
      "Long-lead supply risk on shell tooling and the vibroacoustic seat matrix — dual-sourced where possible, 14-week worst case built into the schedule.",
      "Pediatric safety validation is deliberately conservative and may extend DVT; safety schedule is never compressed to hit a date.",
      "Regulatory pathway is long. This campaign funds a research prototype, not a cleared product, and we will not claim otherwise.",
      "Software complexity — KIDS-OS spans firmware, adaptive inference and two applications; scope is fixed by the SOW and changes require written change orders.",
      "If the goal is not met, funds complete the deepest milestone reached and all documentation is still published to backers.",
    ] },

    { h: "8. Accountability Commitments" },
    { list: [
      "Monthly public build log with photographs, test data and schedule variance.",
      "Every EVT and DVT result published, including failures.",
      "Full documentation package (PRD, PDR, BOM, SOW, EVT, DVT) released to backers at tier $250 and above.",
      "No therapeutic claims, no child testing, and no clinical demonstration prior to IRB approval.",
      "Independent clinical advisory review of every pediatric parameter ceiling before EVT entry.",
    ] },
    { p: "RESEARCH PROTOTYPE — PEDIATRIC THERAPEUTIC DEVICE CONCEPT. Not approved by FDA, FCC, or any regulatory authority for clinical, therapeutic, commercial or consumer use with children or any other population. ASD interventions must involve qualified clinical professionals. Not medical advice. Crowdfunding a research prototype does not constitute an offer of securities, and no equity, revenue share or financial return is offered or implied. All figures are engineering targets subject to manufacturer validation and IRB oversight." },
  ],
};