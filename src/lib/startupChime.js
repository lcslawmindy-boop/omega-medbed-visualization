// Gentle ascending power-up chime for session start (Web Audio, no assets).
let ctx = null;

export function playStartupChime({ warm = true } = {}) {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.5, now + 0.08);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

    // Warm pediatric chime vs. clinical engineering tone
    const notes = warm ? [392.0, 523.25, 659.25, 783.99] : [261.63, 329.63, 392.0, 523.25];

    notes.forEach((f, i) => {
      const t = now + i * 0.16;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = warm ? "sine" : "triangle";
      osc.frequency.setValueAtTime(f, t);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.22, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.5);
      osc.connect(gain);
      gain.connect(master);
      osc.start(t);
      osc.stop(t + 1.6);
    });

    // Low swell underneath
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = "sine";
    sub.frequency.setValueAtTime(warm ? 98 : 65.4, now);
    subGain.gain.setValueAtTime(0.0001, now);
    subGain.gain.exponentialRampToValueAtTime(0.16, now + 0.5);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
    sub.connect(subGain);
    subGain.connect(master);
    sub.start(now);
    sub.stop(now + 2.5);
  } catch {
    /* audio unavailable — silent */
  }
}