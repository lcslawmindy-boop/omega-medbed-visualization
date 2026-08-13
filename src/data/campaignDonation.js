// Section 11/12 — donation engine + investor portal content
export const FUNDING = {
  phase1Goal: 480000,
  phase1Raised: 96400,
  donors: 214,
  daysRemaining: 47,
  missionGoal: 31700000,
  missionRaised: 96400,
  countries: 19,
};

export const DONATION_TIERS = [
  {
    id: "seedling",
    name: "SEEDLING",
    amount: "ANY AMOUNT",
    cta: "DONATE ANY AMOUNT →",
    value: 0,
    color: "var(--border)",
    style: "ghost",
    blurb:
      "Even $5 matters. Every contribution adds to the momentum and sends a signal to the world that humanity is waking up.",
    perks: [
      "Aethon Apex Mission Supporter certificate",
      "Campaign updates via email",
      "Name on Digital Supporter Wall",
    ],
  },
  {
    id: "beacon",
    name: "BEACON",
    amount: "$25+",
    cta: "DONATE $25",
    value: 25,
    color: "var(--sky)",
    style: "sky",
    blurb:
      "Cover one component in the BOM. A $25 contribution covers resistors, capacitors, and passive components for one ZA-PRI prototype board.",
    perks: [
      "Everything in Seedling",
      'Digital "Beacon of Light" badge',
      "Quarterly mission briefing access",
      "Name on Phase 1 Supporter wall",
    ],
  },
  {
    id: "builder",
    name: "BUILDER",
    amount: "$100+",
    cta: "DONATE $100",
    value: 100,
    color: "var(--teal)",
    style: "teal",
    blurb:
      "Cover meaningful BOM components — a DDS oscillator module, a coil assembly, or PCB fabrication. This is where real prototype work happens.",
    perks: [
      "Everything in Beacon",
      '"Mission Builder" credential',
      "Access to Phase 1 Progress Reports",
      "Early access to research publications",
      "Bi-monthly video updates from Mindy Moore",
    ],
  },
  {
    id: "healer",
    name: "HEALER",
    amount: "$500+",
    cta: "DONATE $500",
    value: 500,
    color: "var(--violet)",
    style: "violet",
    blurb:
      "$500 covers a ZA-PRI plasma tube assembly, or 4 coil pair assemblies for the cranial research headset prototype.",
    perks: [
      "Everything in Builder",
      '"Device Healer" patron recognition',
      "Full BOM and engineering documentation access",
      "Live Q&A session with engineering team",
      "Credit in first peer-reviewed publication",
      "Invitation to Phase 1 prototype reveal event",
    ],
  },
  {
    id: "pioneer",
    name: "PIONEER",
    amount: "$2,500+",
    cta: "DONATE $2,500",
    value: 2500,
    color: "var(--gold)",
    style: "gold",
    glow: true,
    blurb:
      "$2,500 funds one complete ZA-PRI bench prototype — the research unit used for characterisation and instrumentation studies.",
    perks: [
      "Everything in Healer",
      "Named device plaque on your funded prototype",
      "Direct briefing from Mindy Moore (1 hour)",
      "IP portfolio access (NDA required)",
      "Founding Pioneer recognition — permanent",
      "Priority campaign updates",
    ],
  },
  {
    id: "architect",
    name: "CIVILIZATION ARCHITECT",
    amount: "$10,000+",
    cta: "CONTACT FOR $10K+ PARTNERSHIP",
    value: 10000,
    color: "var(--gold)",
    style: "gold",
    glow: true,
    wide: true,
    partner: true,
    blurb:
      "At $10,000+ you are funding multiple bench prototypes, patent filing and research preparation.",
    perks: [
      "Everything in Pioneer",
      "Advisory board consideration",
      "All IP documents under NDA",
      "Full 5-year financial model access",
      "Co-inventor consideration on relevant claims",
      "Direct line to Aethon Apex executive team",
      "Lifetime recognition on all materials",
    ],
  },
];

export const PRESETS = [10, 25, 50, 100, 250, 500];
export const FREQUENCIES = ["ONE TIME", "MONTHLY", "QUARTERLY", "ANNUAL"];

// Impact thresholds — highest matching threshold wins
export const IMPACT = [
  { min: 25, text: "Covers passive BOM components for 1 prototype circuit board" },
  { min: 100, text: "Funds PCB fabrication for 1 ZA-PRI control board" },
  { min: 340, text: "Funds 1 complete plasma tube assembly" },
  { min: 500, text: "Funds 4 toroidal coil pairs for the cranial research headset" },
  { min: 1200, text: "Funds 1 complete VPO Anenergy Pump prototype" },
  { min: 2400, text: "Funds 1 complete ZA-PRI bench prototype — fully built" },
  { min: 3800, text: "Funds 1 cranial field research headset" },
  { min: 10000, text: "Funds all 3 therapy device prototypes + provisional patent" },
];

export const CRYPTO = [
  { label: "Bitcoin (BTC)", addr: "bc1q9aethonapexlighttimeline0x7f2v4mq8ke3" },
  { label: "Ethereum (ETH)", addr: "0x7F2A4C9e13Bd8aE05C4f61aeB3Dc90AF17e42B55" },
  { label: "USDC (ERC-20)", addr: "0x7F2A4C9e13Bd8aE05C4f61aeB3Dc90AF17e42B55" },
];

export const LEGAL_NOTE =
  "Aethon Apex IP Holdings LLC is a private company. Contributions are voluntary donations to fund research and development. This page is not an offer to sell, or a solicitation of an offer to buy, any security, and no equity, revenue share, profit, return or future financial interest of any kind is offered or implied. Donations are not investments and are not tax-deductible. Donations do not fund, and are not payment for, any medical treatment or device.";

export const SUPPORTERS = [
  { name: "M. Ellison", loc: "Austin, TX · USA", tier: "PIONEER" },
  { name: "Anonymous Beacon", loc: "USA", tier: "BEACON" },
  { name: "K. Nakamura", loc: "Osaka · Japan", tier: "BUILDER" },
  { name: "R. Okonkwo", loc: "Lagos · Nigeria", tier: "HEALER" },
  { name: "S. Lindqvist", loc: "Malmö · Sweden", tier: "BEACON" },
  { name: "Anonymous Architect", loc: "Switzerland", tier: "ARCHITECT" },
  { name: "D. Alvarez", loc: "Bogotá · Colombia", tier: "SEEDLING" },
  { name: "T. Whitfield", loc: "Manchester · UK", tier: "BUILDER" },
  { name: "P. Raman", loc: "Bengaluru · India", tier: "HEALER" },
  { name: "Anonymous Beacon", loc: "Canada", tier: "BEACON" },
  { name: "J. Moreau", loc: "Lyon · France", tier: "BUILDER" },
  { name: "L. Petrova", loc: "Tallinn · Estonia", tier: "SEEDLING" },
];

export const PARTNER_TYPES = [
  {
    id: "investor",
    kicker: "INTRODUCTION | Information request only",
    title: "PROFESSIONAL INQUIRY",
    color: "var(--gold)",
    body:
      "For professional parties who want to understand the research and IP portfolio. Informational only — no securities are offered or sold through this site.",
    minimum: "Information request — no capital commitment",
    gets: [
      "Company and research overview (NDA required)",
      "Roadmap and cost breakdown",
      "IP portfolio documentation",
      "Patent claim drafts (Claims 1–10)",
      "Technical sessions with the engineering team",
    ],
    cta: "REQUEST INFORMATION PACK",
  },
  {
    id: "strategic",
    kicker: "PARTNER | Manufacturing / Distribution",
    title: "STRATEGIC PARTNER",
    color: "var(--sky)",
    body:
      "For device manufacturers and contract labs who can help take these concepts from drawing to validated bench prototype.",
    minimum: "Capability-based — no capital minimum",
    gets: [
      "Technical integration package",
      "BOM, EVT matrix and assembly documentation",
      "Co-development and licensing terms",
      "Regulatory pathway alignment (FDA / CE)",
      "Joint roadmap planning sessions",
    ],
    cta: "START PARTNERSHIP DISCUSSION",
  },
  {
    id: "institutional",
    kicker: "FUND | Grants / Research Institutions",
    title: "INSTITUTIONAL & GRANT",
    color: "var(--teal)",
    body:
      "For universities, IRB-affiliated labs, foundations and grant bodies funding frontier biomedical research.",
    minimum: "Grant / sponsored research",
    gets: [
      "IRB trial protocol and endpoints",
      "Peer-review and publication plan",
      "Sponsored research agreement template",
      "Lab partnership and equipment scope",
      "Named recognition on published work",
    ],
    cta: "REQUEST RESEARCH PACKET",
  },
];

export const INVESTOR_CONTACT = "aethonapexip@gmail.com";