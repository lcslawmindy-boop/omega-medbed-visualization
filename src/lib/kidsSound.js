// Gentle Web Audio cues. All output capped at 70% of device volume.
let ctx = null;
const MAX_GAIN = 0.7 * 0.22;

const getCtx = () => {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

function tone(freq, start, dur, peak = 1, type = "sine") {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t0 = c.currentTime + start;
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(MAX_GAIN * peak, t0 + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

const SEQUENCES = {
  login: [[587, 0, 0.4], [740, 0.12, 0.4], [880, 0.24, 0.5], [1175, 0.36, 0.6]], // D major arpeggio
  task: [[784, 0, 0.25], [988, 0.1, 0.25], [1319, 0.2, 0.4]],
  star: [[1568, 0, 0.18, 0.7], [2093, 0.07, 0.22, 0.5]],
  emotion: [[659, 0, 0.3, 0.6]],
  help: [[523, 0, 0.5, 0.7], [523, 0.55, 0.5, 0.7]],
  lesson: [[659, 0, 0.2], [784, 0.12, 0.2], [988, 0.24, 0.2], [1319, 0.36, 0.5]],
  calm: [[392, 0, 1.6, 0.45]],
  gentle: [[330, 0, 0.45, 0.5]],
};

export function playCue(name, enabled = true) {
  if (!enabled || !SEQUENCES[name]) return;
  try {
    SEQUENCES[name].forEach(([f, s, d, p = 1]) => tone(f, s, d, p));
  } catch {
    // audio unavailable — silent by design
  }
}