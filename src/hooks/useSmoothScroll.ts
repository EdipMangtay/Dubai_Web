'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    // Touch devices retain their native momentum and overscroll behavior.
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    const lenis = new Lenis({ duration: .9, smoothWheel: true, syncTouch: false,
      anchors: { offset: -88 }, autoRaf: true, prevent: node => node.hasAttribute('data-lenis-prevent') });
    lenisRef.current = lenis;
    const onMenu = (event: Event) => {
      if ((event as CustomEvent<boolean>).detail) lenis.stop();
      else lenis.start();
    };
    window.addEventListener('dubai:menu', onMenu);
    return () => { window.removeEventListener('dubai:menu', onMenu); lenis.destroy(); lenisRef.current = null; };
  }, [reduced]);
  return lenisRef;
}
