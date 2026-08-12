import React from "react";
import useCountUp from "@/hooks/useCountUp";

// Animated numeric spec value: counts up on mount, keeps prefix/suffix static.
export default function CountUpValue({ target, duration, delay, decimals = 0, suffix = "" }) {
  const v = useCountUp(target, duration, delay, decimals);
  return <>{v}{suffix}</>;
}