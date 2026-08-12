// Protocol builder + parent-mode content for BrightSteps BS-ATP-Ω
export const ASD_PROFILES = [
  "Sensory Sensitive", "Hyperaroused", "Hypoaroused", "Non-verbal",
  "Verbal/High-function", "Trauma history", "Sleep issues", "Focus/ADHD overlay",
];

export const BS_PROTOCOLS = [
  { id: "A", icon: "🌊", name: "SENSORY REGULATION", best: "sensory sensitivity, meltdown prevention", systems: ["PBM", "PEMF", "VAT", "CHM", "BIN"], detail: "PBM(gentle) + PEMF + VAT + CHM(blue) + BIN(alpha)", dur: 20, intensity: "GENTLE", color: "#38BDF8" },
  { id: "B", icon: "🧘", name: "DEEP CALM", best: "hyperarousal, anxiety, emotional dysregulation", systems: ["VAT", "FIT", "BIN", "CHM", "NAD"], detail: "VAT + FIT + BIN(delta) + CHM(teal) + NAD", dur: 30, intensity: "GENTLE-MODERATE", color: "#2DD4BF" },
  { id: "C", icon: "🔬", name: "FOCUS BUILDER", best: "attention, task readiness, language sessions", systems: ["PBM", "EEG", "BIN", "CHM", "MCT"], detail: "PBM + EEG + BIN(alpha-theta) + CHM(green) + MCT", dur: 25, intensity: "MODERATE", color: "#34D399" },
  { id: "D", icon: "🌙", name: "SLEEP INDUCTION", best: "sleep onset, circadian regulation, night protocol", systems: ["VAT", "FIT", "BIN", "CHM", "PEMF"], detail: "VAT + FIT + BIN(delta) + CHM(violet) + PEMF", dur: 30, intensity: "GENTLE", color: "#A78BFA" },
  { id: "E", icon: "💪", name: "SOMATIC RELEASE", best: "trauma-held tension, proprioception, body awareness", systems: ["VAT", "FIT", "MCT", "GSC", "NAD"], detail: "VAT(TRE) + FIT + MCT + GSC + NAD", dur: 25, intensity: "MODERATE", color: "#FBBF24" },
  { id: "F", icon: "⚡", name: "CUSTOM PROTOCOL", best: "build your own — clinician recommended", systems: [], detail: "All system toggles shown individually", dur: 25, intensity: "CUSTOM", color: "#FB7185" },
];

export const DEFAULT_ON = ["PBM", "PEMF", "VAT", "FIT", "BIN", "MCT", "CHM", "EEG", "BIO", "NAD"];
export const T3_CODES = ["VOR", "GSC"];

export const PARENT_NAMES = {
  PBM: "Healing Light Therapy",
  PEMF: "Earth Resonance Field",
  VAT: "Calming Vibration",
  FIT: "Warm Infrared Cocoon",
  BIN: "Brain Wave Balancing",
  NAD: "Ancient Sound Healing",
  GSC: "Universal Frequency Alignment",
  MCT: "Gentle Nerve Stimulation",
  VOR: "Structured Water Priming",
  CHM: "Color Light Therapy",
  EEG: "Brain Pattern Training",
  BIO: "Smart AI Safety System",
};

// [experience, working toward, safety]
export const PARENT_CONTENT = {
  PBM: ["A soft, warm glow above them — a bit like sitting in morning sunshine. Nothing bright, nothing in their eyes.", "More energy for brain cells, calmer thinking and steadier attention.", "The light is dimmed for children and shuts off instantly if the pod warms even slightly."],
  PEMF: ["Nothing at all to see or feel — this one is completely invisible and silent.", "A grounded, settled feeling in the body, like being barefoot on grass.", "The field strength is a tiny fraction of children's safety limits and can never be raised."],
  VAT: ["A gentle humming vibration through the seat — most children say it feels like a cat purring.", "A calmer nervous system and better body awareness.", "Volume and strength are child-limited, fade in slowly, and stop the moment your child is startled."],
  FIT: ["A cosy, even warmth around them, like a warm blanket straight from the dryer.", "Relaxed muscles, better circulation and an easier time settling.", "Two separate temperature cut-offs and twelve sensors watch the warmth every fraction of a second."],
  BIN: ["Two soft tones, one in each ear, that blend into a slow, pleasant rhythm.", "A calmer brain rhythm — helpful for settling, focus, or falling asleep.", "Volume is kept well under safe-listening levels for children and sessions are time-limited."],
  NAD: ["Seven gentle singing tones overhead that change very slowly, never suddenly.", "A settled, predictable sound world instead of an unpredictable one.", "Sound always fades in gradually and can be muted instantly."],
  GSC: ["Nothing to see, hear or feel — a small silent unit at the back of the pod.", "This one is research-only and makes no promises.", "It uses less power than a nightlight and never touches your child. You choose whether it is on at all."],
  MCT: ["A current so small it cannot be felt, passing gently between the armrests.", "A little extra energy for the body's own repair work.", "Two independent safety cut-offs, and the current is far below anything your child could sense."],
  VOR: ["A little copper fountain beside the pod that swirls chilled drinking water — most children love watching it.", "Good hydration and a calm, familiar routine before the session starts.", "Ordinary drinking-water safety: food-grade materials and UV sterilisation."],
  CHM: ["The whole pod glows in a soft colour chosen for the session — like sitting inside a gentle sunset.", "A predictable, soothing space that tells your child what part of the session they are in.", "No flashing or strobing ever, and brightness is capped for sensitive eyes."],
  EEG: ["A soft headrest that simply listens — nothing is sent into your child.", "The pod knows the moment your child feels calm, or begins to feel overwhelmed.", "It only listens. It has no way to send anything back."],
  BIO: ["Invisible — this is the pod's caring brain, watching over everything.", "Every other system staying exactly right for your child, moment to moment.", "It can stop everything in under a tenth of a second and alerts you straight away."],
};

export const PARENT_FAQ = [
  ["Is BrightSteps safe for my child?", "BrightSteps is a research concept, not an approved medical device, and it is designed safety-first from the ground up. Every system runs under child-specific limits that cannot be raised, with independent hardware cut-offs and a big red stop button inside and outside the pod. Nothing is used on a child without clinician supervision and your consent."],
  ["Will my child feel anything?", "Mostly gentle, pleasant things: soft warmth, a purring vibration through the seat, quiet tones and a slowly changing colour glow. Several systems cannot be felt at all. Nothing is loud, bright, flashing or sudden."],
  ["How long is each session?", "Between 15 and 45 minutes, and most children start at 20 minutes. Your clinician sets the length for your child's age and comfort, and a session can be ended at any moment."],
  ["How many sessions does my child need?", "There is no fixed number — this is a concept framework, not a prescription. Clinicians typically plan a short series and review how your child responds after each one."],
  ["Can I be in the room with my child?", "Yes. Parents are welcome in the room for every session, and many children do best with you visible nearby. You can also watch the session summary on the companion app."],
  ["What should my child wear?", "Comfortable everyday clothes. No metal jewellery, and bare feet or socks are best for the floor plate. Familiar comfort items are welcome inside the pod."],
  ["What if my child gets upset inside the pod?", "The pod notices first — it reads heart rhythm and skin response and softens itself before distress builds. If your child still wants out, the door opens from the inside, the stop button is within reach, and you or the clinician can end everything instantly."],
];

export const PARENT_TIMELINE = [
  ["📋", "Before", "Intake form + VOR water prep"],
  ["🚶", "Arrival", "Child enters pod comfortably"],
  ["🔵", "First 5 min", "Chromotherapy + VAT calming warm-up"],
  ["🌊", "Mid-session", "All systems active — KIDS-OS adapting in real-time"],
  ["✅", "Final 5 min", "Gentle ramp-down to standby"],
  ["🤗", "Post", "Quiet transition + parent debrief"],
];