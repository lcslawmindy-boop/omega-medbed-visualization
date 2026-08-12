import { useEffect } from "react";

/**
 * Switch-access scanning: a highlight steps automatically through the tappable
 * items on screen; any switch press (Space / Enter / screen tap) activates.
 */
export default function useSwitchScan({ enabled, intervalMs = 1500, holdMs = 100, sound = false, onStep }) {
  useEffect(() => {
    if (!enabled) return;
    let index = 0;

    const items = () => Array.from(document.querySelectorAll(".kids-tap:not([disabled])"))
      .filter((el) => el.offsetParent !== null);

    const paint = () => {
      document.querySelectorAll(".kids-scan-on").forEach((el) => el.classList.remove("kids-scan-on"));
      const list = items();
      if (!list.length) return null;
      index = index % list.length;
      const el = list[index];
      el.classList.add("kids-scan-on");
      el.scrollIntoView({ block: "nearest" });
      if (sound && onStep) onStep();
      return el;
    };

    paint();
    const timer = setInterval(() => { index += 1; paint(); }, intervalMs);

    const activate = (e) => {
      if (e.type === "keydown" && e.key !== " " && e.key !== "Enter") return;
      const el = document.querySelector(".kids-scan-on");
      if (!el) return;
      e.preventDefault();
      el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      setTimeout(() => el.dispatchEvent(new PointerEvent("pointerup", { bubbles: true })), holdMs + 60);
      index = 0;
    };

    window.addEventListener("keydown", activate);
    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", activate);
      document.querySelectorAll(".kids-scan-on").forEach((el) => el.classList.remove("kids-scan-on"));
    };
  }, [enabled, intervalMs, holdMs, sound, onStep]);
}