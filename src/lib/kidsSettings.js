const KEY = "kidsos_settings";

export const DEFAULT_SETTINGS = {
  textSize: "default", // default | large | xlarge
  highContrast: false,
  lowStim: false,
  sound: true,
  touchHoldMs: 100, // 100 | 300 | 500 | 1000
  pin: "1234",
  summaryTime: "16:00",
};

export function loadSettings() {
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; }
  catch { return { ...DEFAULT_SETTINGS }; }
}

export function saveSettings(s) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

/** Root class list driving text scale, contrast and low-stimulation mode. */
export function rootClasses(s) {
  return [
    "kids-root",
    `kids-text-${s.textSize}`,
    s.highContrast ? "kids-contrast" : "",
    s.lowStim ? "kids-lowstim" : "",
  ].filter(Boolean).join(" ");
}