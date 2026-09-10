'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback, useRef, type ReactNode, Component } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { INTRO_TIMING, TRANSITION_TIMING } from '@/lib/motion';

const ParticleScene = dynamic(() => import('./Hero/ParticleScene'), {
  ssr: false,
  loading: () => null,
});

function phase(time: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (time - start) / (end - start)));
  return t * t * (3 - 2 * t);
}

class IntroErrorBoundary extends Component<{
  children: ReactNode;
  onFailure: () => void;
}, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!context) return false;
    context.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

let playedInDocument = false;

export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [timing, setTiming] = useState<{
    duration: number;
    convergeStart: number;
    convergeEnd: number;
    traceStart: number;
    traceEnd: number;
    brandStart: number;
    brandEnd: number;
    revealStart: number;
    cityStart: number;
    cityEnd: number;
  } | null>(null);
  const [mode, setMode] = useState<'intro' | 'transition'>('intro');
  const [lastPathname, setLastPathname] = useState(pathname);
  
  const overlayRef = useRef<HTMLDivElement>(null);

  const complete = useCallback(() => {
    setActive(false);
    setReady(false);
  }, []);

  const markReady = useCallback(() => setReady(true), []);

  const progress = useCallback((time: number) => {
    const element = overlayRef.current;
    if (!element || !timing) return;
    
    if (mode === 'intro') {
      element.style.setProperty('--intro-lower', String(1 - phase(time, timing.revealStart, timing.cityEnd - 0.32)));
      element.style.setProperty('--intro-upper', String(1 - phase(time, timing.revealStart + 0.16, timing.cityEnd - 0.12)));
      element.style.setProperty('--intro-brand', String(phase(time, timing.brandStart, timing.brandStart + 0.2) * (1 - phase(time, timing.brandEnd - 0.24, timing.brandEnd))));
    } else {
      // Fast transition: 
      // veil comes down, brand flashes, veil lifts.
      const fadeIn = phase(time, 0, timing.convergeEnd * 0.5);
      const fadeOut = 1 - phase(time, timing.revealStart, timing.duration);
      const alpha = Math.max(fadeIn, fadeOut);
      
      element.style.setProperty('--intro-lower', String(alpha));
      element.style.setProperty('--intro-upper', String(alpha));
      
      const brandAlpha = phase(time, timing.brandStart, timing.brandStart + 0.2) * (1 - phase(time, timing.brandEnd - 0.2, timing.brandEnd));
      element.style.setProperty('--intro-brand', String(brandAlpha));
    }
  }, [timing, mode]);

  useEffect(() => {
    if (reduced || !supportsWebGL()) return;
    
    if (!playedInDocument) {
      playedInDocument = true;
      if (document.hidden || window.scrollY > window.innerHeight) return;
      const t = window.innerWidth < 768 ? INTRO_TIMING.mobile : INTRO_TIMING.desktop;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTiming(t);
       
      setMode('intro');
       
      setActive(true);
    } else if (pathname !== lastPathname) {
      // Trigger route transition
       
      setLastPathname(pathname);
      // Wait for navigation? The pathname has changed, the new page is rendering.
      // Next.js starts rendering the new page immediately. 
      // We overlay the transition.
      const anchorRegex = /#/;
      if (anchorRegex.test(pathname) || window.location.hash) {
          // Do not play on hash changes
          return;
      }
       
      setTiming(TRANSITION_TIMING);
       
      setMode('transition');
       
      setActive(true);
    }
  }, [pathname, reduced, lastPathname]);

  useEffect(() => {
    if (!active || !timing) return;
    const failSafe = window.setTimeout(complete, ready ? (timing.duration + 0.7) * 1000 : 2200);
    const hide = () => { if (document.hidden) setActive(false); };
    document.addEventListener('visibilitychange', hide);
    return () => {
      window.clearTimeout(failSafe);
      document.removeEventListener('visibilitychange', hide);
    };
  }, [active, ready, complete, timing]);

  return (
    <>
      {children}
      {(!reduced && active && timing) && (
        <div ref={overlayRef} className={`travia-intro${ready ? ' travia-intro--ready' : ''} ${mode === 'transition' ? 'travia-intro--transition' : ''}`} aria-hidden="true" style={{ position: 'fixed' }}>
          <div className="travia-intro__veil travia-intro__veil--upper" />
          <div className="travia-intro__veil travia-intro__veil--lower" />
          <IntroErrorBoundary onFailure={complete}>
            <ParticleScene onReady={markReady} onComplete={complete} onFailure={complete} onProgress={progress} timing={timing} />
          </IntroErrorBoundary>
          <div className="travia-intro__brand">
            <span className="travia-intro__wordmark">TRAVIA</span>
            {mode === 'intro' && <span className="travia-intro__coordinates">25.2048° N&nbsp;&nbsp; 55.2708° E</span>}
          </div>
        </div>
      )}
    </>
  );
}
