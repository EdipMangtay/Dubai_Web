'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type RevealProps = { id?: string; children: ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'none'; variant?: 'body' | 'editorial' | 'image' };

export default function Reveal({ children, className = '', delay = 0, direction = 'up', variant = 'body', id }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || !('IntersectionObserver' in window)) return;
    // Server-rendered content and the first viewport remain readable immediately.
    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight || element.contains(document.activeElement)) return;
    element.dataset.reveal = 'pending';
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.reveal = 'visible';
      observer.disconnect();
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    observer.observe(element);
    const onFocus = () => { element.dataset.reveal = 'visible'; observer.disconnect(); };
    element.addEventListener('focusin', onFocus);
    return () => { observer.disconnect(); element.removeEventListener('focusin', onFocus); delete element.dataset.reveal; };
  }, [reduced]);
  return <div id={id} tabIndex={id ? -1 : undefined} ref={ref} className={`reveal ${className}`} data-direction={direction} data-variant={variant}
    style={{ '--reveal-delay': `${delay}s` } as CSSProperties}>{children}</div>;
}
