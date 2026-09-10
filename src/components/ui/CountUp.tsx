'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({ value, suffix = '', duration = 2, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: 'easeOut',
      });

      const unsubscribe = rounded.on('change', (v) => {
        setDisplayValue(v);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, value, duration, motionValue, rounded]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {displayValue}
      {suffix}
    </motion.span>
  );
}
