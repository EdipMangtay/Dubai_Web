'use client';

import { useRef, type AnchorHTMLAttributes } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMotionSettings } from '@/hooks/useMotionSettings';
import { MOTION } from '@/lib/motion';

export default function MagneticLink({ children, className, href }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { reduced, compact } = useMotionSettings();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, MOTION.spring);
  const springY = useSpring(y, MOTION.spring);
  const reset = () => { x.set(0); y.set(0); };
  return <motion.a ref={ref} href={href} className={className} style={{ x: reduced || compact ? 0 : springX, y: reduced || compact ? 0 : springY }}
    onPointerMove={event => {
      if (reduced || compact || event.pointerType !== 'mouse' || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const clamp = (value: number) => Math.max(-MOTION.distance.magnetic, Math.min(MOTION.distance.magnetic, value));
      x.set(clamp((event.clientX - rect.left - rect.width / 2) * .045));
      y.set(clamp((event.clientY - rect.top - rect.height / 2) * .1));
    }} onPointerLeave={reset} onBlur={reset}>{children}</motion.a>;
}
