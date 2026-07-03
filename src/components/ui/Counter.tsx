"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";

export default function Counter({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 55, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString("es-CO"));

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
