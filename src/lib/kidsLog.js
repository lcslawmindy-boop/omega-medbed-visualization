import { base44 } from "@/api/base44Client";

const QUEUE_KEY = "kidsos_queue";
const SESSION_ID = `s-${Date.now().toString(36)}`;

const readQueue = () => {
  try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]"); } catch { return []; }
};
const writeQueue = (q) => {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
  window.dispatchEvent(new CustomEvent("kidsos-queue", { detail: q.length }));
};

export const getQueueLength = () => readQueue().length;

/** Queue an event, then try to push everything upstream. */
export function logEvent(event) {
  const q = readQueue();
  q.push({
    ...event,
    session_id: SESSION_ID,
    device: "kids-tablet",
    occurred_at: new Date().toISOString(),
    synced_offline: !navigator.onLine,
  });
  writeQueue(q);
  flushQueue();
}

let flushing = false;
export async function flushQueue() {
  if (flushing || !navigator.onLine) return;
  const q = readQueue();
  if (!q.length) return;
  flushing = true;
  try {
    await base44.entities.KidsEvent.bulkCreate(q);
    const remaining = readQueue().slice(q.length);
    writeQueue(remaining);
    window.dispatchEvent(new CustomEvent("kidsos-synced", { detail: q.length }));
  } catch {
    // stays queued — retried on the next event or when the connection returns
  } finally {
    flushing = false;
  }
}

/** Subscribe to online/offline + queue changes. cb({ online, queued }) */
export function subscribeSync(cb) {
  const emit = () => cb({ online: navigator.onLine, queued: getQueueLength() });
  const onOnline = () => { flushQueue(); emit(); };
  window.addEventListener("online", onOnline);
  window.addEventListener("offline", emit);
  window.addEventListener("kidsos-queue", emit);
  window.addEventListener("kidsos-synced", emit);
  emit();
  return () => {
    window.removeEventListener("online", onOnline);
    window.removeEventListener("offline", emit);
    window.removeEventListener("kidsos-queue", emit);
    window.removeEventListener("kidsos-synced", emit);
  };
}