'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MOTION } from '@/lib/motion';
import type { ReactNode } from 'react';

type RevealProps = { children: ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'none' };

export default function Reveal({ children, className, delay = 0, direction = 'up' }: RevealProps) {
  const reduced = useReducedMotion();
  const offset = direction === 'none' ? { x: 0, y: 0 } : direction === 'left' ? { x: -28, y: 0 } : direction === 'right' ? { x: 28, y: 0 } : { x: 0, y: 28 };
  const classes = ['motion-reduce-transform', className].filter(Boolean).join(' ');
  return <motion.div className={classes} initial={{ opacity: 1, ...offset }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reduced ? 0.15 : MOTION.duration.reveal, delay: reduced ? 0 : delay, ease: MOTION.ease }}>{children}</motion.div>;
}
