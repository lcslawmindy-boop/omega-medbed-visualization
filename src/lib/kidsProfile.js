const KEY = "kidsos_profile";

export const DEFAULT_PROFILE = {
  setupComplete: false,
  name: "",
  avatar: "🦊",
  birthday: "",
  ageGroup: "7-9",
  communication: [],
  sensitivities: [],
  trustedAdults: [],
  loginMethod: "PIN",
  mascotName: "Starr",
  notifyHelp: true,
  notifyHighEmotion: true,
  notifyDaily: true,
};

export function loadProfile() {
  try { return { ...DEFAULT_PROFILE, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; }
  catch { return { ...DEFAULT_PROFILE }; }
}

export function saveProfile(p) {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function ageGroupFor(birthday) {
  if (!birthday) return "7-9";
  const age = Math.floor((Date.now() - new Date(birthday).getTime()) / 31557600000);
  if (age <= 6) return "4-6";
  if (age <= 9) return "7-9";
  if (age <= 13) return "10-13";
  return "14-17";
}