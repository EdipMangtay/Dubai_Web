'use client';

import { useEffect, useState } from 'react';

export type PerformanceTier = 'high' | 'medium' | 'low';

function getInitialTier(): PerformanceTier {
  if (typeof window === 'undefined') return 'high';
  const width = window.innerWidth;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const memory = nav.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 4;

  if (width < 768 || memory <= 2 || cores <= 2) {
    return 'low';
  } else if (width < 1024 || memory <= 4 || cores <= 4) {
    return 'medium';
  }
  return 'high';
}

export function useDevicePerformance(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>(getInitialTier);

  useEffect(() => {
    const handleResize = () => setTier(getInitialTier());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return tier;
}

export function getParticleCount(tier: PerformanceTier): number {
  switch (tier) {
    case 'high':
      return 3000;
    case 'medium':
      return 1200;
    case 'low':
      return 500;
  }
}
