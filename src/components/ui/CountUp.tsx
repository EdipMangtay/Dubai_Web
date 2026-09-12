'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
import { useMotionSettings } from '@/hooks/useMotionSettings';
import { MOTION } from '@/lib/motion';

export default function CountUp({ value, suffix = '', className = '' }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reduced, compact } = useMotionSettings();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;
    let stop: (() => void) | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const controls = animate(Math.round(value * .85), value, {
        duration: MOTION.duration.reveal * (compact ? MOTION.mobileFactor : 1), ease: MOTION.ease,
        onUpdate: current => { element.textContent = String(Math.round(current)); },
      });
      stop = () => controls.stop();
    }, { threshold: .5 });
    observer.observe(element);
    return () => { observer.disconnect(); stop?.(); element.textContent = String(value); };
  }, [value, reduced, compact]);
  return <span className={className} aria-label={`${value}${suffix}`}><span aria-hidden="true" className="stat-counter"><span className="invisible">{value}</span><span ref={ref} className="absolute inset-0">{value}</span></span><span aria-hidden="true">{suffix}</span></span>;
}
