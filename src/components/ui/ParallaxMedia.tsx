'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionSettings } from '@/hooks/useMotionSettings';
import { MOTION } from '@/lib/motion';

export default function ParallaxMedia({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced, compact } = useMotionSettings();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-MOTION.distance.parallax, MOTION.distance.parallax]);
  return <div ref={ref} className="parallax-frame"><motion.div className="parallax-media" style={{ y: reduced || compact ? 0 : y }}>{children}</motion.div></div>;
}
