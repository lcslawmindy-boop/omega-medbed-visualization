export const CHILD = { name: "Ellie", avatar: "🦊" };

export const ROUTINE = {
  id: "morning",
  title: "My Morning",
  tasks: [
    { id: "wake", label: "Wake up", icon: "🌞" },
    { id: "dress", label: "Get dressed", icon: "👕" },
    { id: "teeth", label: "Brush teeth", icon: "🪥" },
    { id: "eat", label: "Eat breakfast", icon: "🥣" },
    { id: "bag", label: "Pack my bag", icon: "🎒" },
    { id: "shoes", label: "Shoes on", icon: "👟" },
  ],
};

export const EMOTIONS = [
  { id: "happy", label: "Happy", icon: "😊", color: "#FACC15" },
  { id: "calm", label: "Calm", icon: "😌", color: "#34D399" },
  { id: "okay", label: "Okay", icon: "🙂", color: "#38BDF8" },
  { id: "tired", label: "Tired", icon: "🥱", color: "#A78BFA" },
  { id: "sad", label: "Sad", icon: "😢", color: "#60A5FA" },
  { id: "frustrated", label: "Frustrated", icon: "😤", color: "#FB923C" },
  { id: "angry", label: "Angry", icon: "😠", color: "#F87171" },
  { id: "scared", label: "Scared", icon: "😨", color: "#C084FC" },
];

export const CALM_TOOLS = [
  { id: "breathing", label: "Breathe with me", icon: "🫧", hint: "In… and out… slow and soft." },
  { id: "look_find", label: "Look & find", icon: "🔍", hint: "Find 5 things you can see." },
  { id: "squeeze_relax", label: "Squeeze & relax", icon: "🤲", hint: "Squeeze tight… then let go." },
  { id: "sensory", label: "Quiet colours", icon: "🌈", hint: "Watch the colours move slowly." },
];

export const HELP_CATEGORIES = [
  { id: "hurt", label: "I am hurt", icon: "🩹" },
  { id: "scared", label: "I feel scared", icon: "😨" },
  { id: "stop", label: "Please stop", icon: "✋" },
  { id: "need_adult", label: "I need a grown-up", icon: "🧑‍🤝‍🧑" },
];

export const TRUSTED_ADULTS = ["Mum", "Dad", "Grandma", "Miss Ana (teacher)"];

export const RESPONSE_CARDS = [
  "Calm hands, offer a break",
  "Identify the source of frustration",
  "Use a communication card",
  "Explain a boundary calmly",
  "Contact the parent",
  "Offer preferred sensory tool",
  "Move to a quieter space",
  "Give processing time without pressure",
];

export const LEGAL_TEXT = `BrightSteps is a child support and communication platform.

BrightSteps does NOT:
• Diagnose autism or any condition
• Replace licensed therapists, educators, or medical professionals
• Guarantee any educational or medical outcomes
• Independently determine that abuse, injury, or a clinical event occurred
• Record audio or conduct ambient monitoring

All AI-assisted summaries are generated from records entered into the platform only. They are assistive information — not clinical conclusions.

Content in Safe Play and body awareness modules has been reviewed by qualified professionals. All clinical, educational, and safety content must be approved by you and your care team.

All data is encrypted and protected. You control who sees your child's information.`;