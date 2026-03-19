"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, suffix = "", duration = 2, className = "" }: AnimatedCounterProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    bounce: 0,
    duration: duration * 1000,
  });

  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    }
  }, [inView, hasAnimated, springValue, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}
