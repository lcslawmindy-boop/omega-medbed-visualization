export const DEVICES = [
  {
    code: "ZA-PRI-001",
    key: "priore",
    name: "RESEARCH CONCEPT ZA-PRI — MULTICHANNEL EM PLATFORM",
    accent: "#9B30FF",
    classified: false,
    story:
      "A mid-century European research program explored multichannel electromagnetic exposure in laboratory animal studies. The historical results are referenced here as published research history only — not as outcomes we claim or promise. We are designing a modern bench platform to study the same architecture under contemporary standards.",
    specs: [
      ["Architecture", "Multichannel EM (ZA-PRI)"],
      ["Modulation", "DDS 3-layer S'/S''/S'''"],
      ["Plasma Source", "Mercury-argon rotating tube"],
      ["Modern Version", "FPGA/DDS precision control"],
      ["Est. Build Cost", "$2,400 (bench prototype)"],
    ],
    impacts: [
      "Research question: reproducibility of historical laboratory reports",
      "Bench characterisation of field uniformity",
      "Instrumentation and dosimetry validation",
      "No therapeutic outcome is claimed or implied",
    ],
  },
  {
    code: "ZA-BRH-002",
    key: "helmet",
    name: "CRANIAL FIELD RESEARCH HEADSET",
    accent: "#38BDF8",
    story:
      "The Schumann resonance of 7.83 Hz is a naturally occurring electromagnetic band in Earth's atmosphere. This bench headset is a research instrument designed to generate a uniform, low-intensity field at cranial position using 8 toroidal coils in octagonal symmetry, alongside EEG instrumentation, so the relationship can be studied under controlled conditions.",
    specs: [
      ["Frequency", "7.83 Hz + 10 Hz alpha"],
      ["Coil Array", "8-coil toroidal crown"],
      ["EEG Feedback", "19-channel 10-20 system"],
      ["Phase Reference", "Quartz crystal array"],
      ["Est. Build Cost", "$3,800"],
    ],
    impacts: [
      "Research instrument for EEG and HRV signal studies",
      "Controlled, low-intensity field generation",
      "Design target: HRV coherence measurement within 200ms",
      "No diagnosis, treatment or clinical benefit is claimed",
    ],
  },
  {
    code: "ZA-VPO-003",
    key: "vpo",
    name: "VPO OSCILLATOR RESEARCH UNIT",
    accent: "#C9A84C",
    classified: false,
    story:
      "An experimental oscillator concept drawn from early 20th-century laboratory literature. This unit is a bench instrument built to characterise the circuit's behaviour and measure its output honestly. Historical energy claims associated with the concept are unverified and are not asserted here.",
    specs: [
      ["Circuit", "VPO (Vacuum Potential Oscillator)"],
      ["Coupling", "Phi-ratio field geometry"],
      ["Study Target", "Enzyme resonance bench models"],
      ["Measurement", "Independent metrology required"],
      ["Est. Build Cost", "$1,200"],
    ],
    impacts: [
      "Bench characterisation of circuit output",
      "Independent measurement protocol",
      "Open publication of negative results",
      "No health or energy-gain claim is made",
    ],
  },
  {
    code: "ZA-GRD-004",
    key: "grid",
    name: "FIELD NODE RESEARCH PLATFORM",
    accent: "#0D9488",
    classified: false,
    story:
      "An experimental node platform for studying resonant power-transfer concepts on a laboratory bench. Performance figures are engineering design targets for study — not demonstrated results, and not an energy product offered for sale or deployment.",
    specs: [
      ["Type", "Experimental resonant node"],
      ["Output", "Phase conjugate standing wave"],
      ["Design Target", "Bench efficiency study"],
      ["Scale", "Laboratory bench only"],
      ["Est. Build Cost", "$48,000"],
    ],
    impacts: [
      "Design targets, not demonstrated performance",
      "Bench-scale study only",
      "Independent verification required",
      "No commercial energy claim is made",
    ],
  },
];

export const RESEARCH_DISCLAIMER =
  "All historical third-party results referenced on this site are published research history and do not constitute medical, therapeutic, energy or performance claims by this company. Nothing here is medical advice — consult a licensed physician for medical decisions. All devices described are pre-regulatory research concepts and bench prototypes, are not FDA cleared or approved, and are not offered for sale, treatment or human use. Attribution: all third-party works remain the copyright of their respective authors or estates; referenced under Fair Use (17 U.S.C. § 107).";

export const POPULATIONS = [
  {
    icon: "🧒",
    color: "#38BDF8",
    title: "CHILDREN WITH ASD",
    body: "1 in 36 children are now diagnosed with ASD. BrightSteps is a research and support concept exploring structured routines, sensory tools and learning software for these families.",
    stat: "Millions of children globally live with neurodevelopmental conditions",
    link: "Learn about BrightSteps →",
  },
  {
    icon: "🎖️",
    color: "#C9A84C",
    title: "VETERANS & PTSD",
    body: "Veteran suicide remains a national public-health emergency. Our research interest is in non-pharmacological, measurable approaches studied under proper oversight.",
    stat: "3.5M US veterans live with PTSD",
    link: "Veterans research interest →",
  },
  {
    icon: "🧬",
    color: "#10B981",
    title: "SERIOUS ILLNESS",
    body: "Historical electromagnetic research literature remains largely unreplicated. Our interest is in whether it can be studied rigorously and published openly.",
    stat: "$248B in US cancer treatment costs annually",
  },
  {
    icon: "💠",
    color: "#9B30FF",
    title: "CHRONIC ILLNESS COMMUNITY",
    body: "Autoimmune disease, chronic fatigue and fibromyalgia remain poorly served by existing options. We are interested in open, measurable research — not promises.",
    stat: "Autoimmune diagnoses continue to rise year over year",
  },
  {
    icon: "👨‍👩‍👧",
    color: "#F59E0B",
    title: "SPECIAL EDUCATION FAMILIES",
    body: "Special education systems are strained by rising demand. BrightSteps software aims to give families practical daily structure and progress visibility.",
    stat: "$70B+ annual special education cost, growing at 8% per year",
  },
  {
    icon: "🌍",
    color: "#C9A84C",
    title: "EVERYONE",
    body: "Environmental and health pressures are shared. Our work is early-stage engineering research, published openly so others can check it.",
    stat: "A shared problem set, approached as open engineering",
    wide: true,
  },
];

export const MISSION_STATEMENT = [
  "AETHON APEX IP HOLDINGS LLC is a private technology research and IP company.",
  "We document, design and bench-test early-stage engineering concepts.",
  "Nothing we build is approved for medical use, and nothing here is a promise of results.",
  "What we need is resources to build bench prototypes, publish honest data, and file patents.",
  "If the research holds up, we will say so. If it doesn't, we will say that too.",
];