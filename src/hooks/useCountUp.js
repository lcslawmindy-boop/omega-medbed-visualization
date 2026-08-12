import { useEffect, useState } from "react";

// Counts 0 → target over `duration` ms with ease-out, after `delay` ms.
export default function useCountUp(target, duration = 1000, delay = 0, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf;
    let start = null;
    const timer = setTimeout(() => {
      const step = (ts) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Number((target * eased).toFixed(decimals)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [target, duration, delay, decimals]);

  return value.toFixed(decimals);
}