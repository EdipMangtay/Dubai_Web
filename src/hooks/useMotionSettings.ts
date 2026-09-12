'use client';

import { useSyncExternalStore } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { MOTION } from '@/lib/motion';

const query = '(max-width: 767px), (pointer: coarse)';
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;

export function useMotionSettings() {
  const reduced = useReducedMotion();
  const compact = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return {
    reduced, compact,
    duration: (token: keyof typeof MOTION.duration) => reduced ? MOTION.duration.reduced : MOTION.duration[token] * (compact ? MOTION.mobileFactor : 1),
    stagger: reduced ? 0 : MOTION.stagger * (compact ? .5 : 1),
  };
}
