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
  const [transitionId, setTransitionId] = useState(0);
  const [mode, setMode] = useState<'intro' | 'transition'>('intro');
  const [lastPathname, setLastPathname] = useState(pathname);
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

  const overlayRef = useRef<HTMLDivElement>(null);

  const complete = useCallback(() => {
    setActive(false);
    setReady(false);
    document.documentElement.removeAttribute('data-travia-intro');
  }, []);

  const markReady = useCallback(() => setReady(true), []);

  const progress = useCallback((time: number) => {
    const element = overlayRef.current;
    if (!element || !timing) return;

    if (mode === 'intro') {
      // 1. Veils
      element.style.setProperty('--intro-lower', String(1 - phase(time, timing.revealStart, timing.cityEnd - 0.32)));
      element.style.setProperty('--intro-upper', String(1 - phase(time, timing.revealStart + 0.16, timing.cityEnd - 0.12)));

      // 2. Ekran kararması: Burj Khalifa tamamlanırken ekran kararır
      const blackout = phase(time, timing.traceEnd - 0.35, timing.brandStart);
      element.style.setProperty('--intro-blackout', String(blackout));

      // 3. TRAVIA DUBAI yazısı kararan ekranda parıldar
      const brandIn = phase(time, timing.brandStart, timing.brandStart + 0.22);
      const brandOut = 1 - phase(time, timing.brandEnd - 0.15, timing.brandEnd + 0.08);
      const brandAlpha = brandIn * brandOut;
      const brandY = (1 - brandIn) * 14;
      element.style.setProperty('--intro-brand-opacity', String(brandAlpha));
      element.style.setProperty('--intro-brand-y', `${brandY}px`);

      // 4. Siteye yumuşak geçiş
      const rootAlpha = 1 - phase(time, timing.brandEnd - 0.05, timing.duration);
      element.style.setProperty('--intro-root-opacity', String(rootAlpha));
    } else {
      // Sayfa geçiş modu (route transition)
      // 1. Veils
      const fadeIn = phase(time, 0, timing.convergeEnd * 0.4);
      const fadeOut = 1 - phase(time, timing.revealStart, timing.duration);
      const alpha = Math.max(fadeIn, fadeOut);
      element.style.setProperty('--intro-lower', String(alpha));
      element.style.setProperty('--intro-upper', String(alpha));

      // 2. Kararma
      const blackout = phase(time, timing.traceStart, timing.brandStart);
      element.style.setProperty('--intro-blackout', String(blackout));

      // 3. TRAVIA DUBAI yazısı
      const brandIn = phase(time, timing.brandStart, timing.brandStart + 0.18);
      const brandOut = 1 - phase(time, timing.brandEnd - 0.15, timing.brandEnd + 0.05);
      const brandAlpha = brandIn * brandOut;
      const brandY = (1 - brandIn) * 10;
      element.style.setProperty('--intro-brand-opacity', String(brandAlpha));
      element.style.setProperty('--intro-brand-y', `${brandY}px`);

      // 4. Yeni sayfayı açma
      const rootAlpha = 1 - phase(time, timing.revealStart, timing.duration);
      element.style.setProperty('--intro-root-opacity', String(rootAlpha));
    }
  }, [timing, mode]);

  // Initial intro and page transitions
  useEffect(() => {
    if (reduced || !supportsWebGL()) {
      document.documentElement.removeAttribute('data-travia-intro');
      return;
    }

    if (!playedInDocument) {
      playedInDocument = true;
      if (document.hidden || window.scrollY > window.innerHeight) {
        document.documentElement.removeAttribute('data-travia-intro');
        return;
      }
      const t = window.innerWidth < 768 ? INTRO_TIMING.mobile : INTRO_TIMING.desktop;
      setTiming(t);
      setMode('intro');
      setTransitionId(prev => prev + 1);
      setActive(true);
    } else if (pathname !== lastPathname) {
      setLastPathname(pathname);
      if (pathname.includes('#') || window.location.hash) return;
      setTiming(TRANSITION_TIMING);
      setMode('transition');
      setTransitionId(prev => prev + 1);
      setActive(true);
    }
  }, [pathname, reduced, lastPathname]);

  // Escape key skip
  useEffect(() => {
    if (!active) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') complete();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, complete]);

  // Failsafe timeout
  useEffect(() => {
    if (!active || !timing) return;
    const failSafe = window.setTimeout(complete, ready ? (timing.duration + 0.8) * 1000 : 2500);
    const hide = () => { if (document.hidden) complete(); };
    document.addEventListener('visibilitychange', hide);
    return () => {
      window.clearTimeout(failSafe);
      document.removeEventListener('visibilitychange', hide);
    };
  }, [active, ready, complete, timing]);

  return (
    <>
      <div data-travia-page inert={active}>{children}</div>
      {!reduced && active && timing && (
        <div
          ref={overlayRef}
          className="travia-intro"
          role="dialog"
          aria-modal="true"
          aria-label="Travia Dubai"
        >
          <div className="travia-intro__veil travia-intro__veil--upper" />
          <div className="travia-intro__veil travia-intro__veil--lower" />
          <div className="travia-intro__blackout" />
          <IntroErrorBoundary onFailure={complete}>
            <ParticleScene
              key={transitionId}
              onReady={markReady}
              onComplete={complete}
              onFailure={complete}
              onProgress={progress}
              timing={timing}
            />
          </IntroErrorBoundary>
          <div className="travia-intro__brand">
            <div className="travia-intro__wordmark">TRAVIA</div>
            <span className="travia-intro__city">DUBAI</span>
          </div>
          {mode === 'intro' && (
            <button
              type="button"
              onClick={complete}
              className="travia-intro__skip"
              aria-label="Geçişi atla"
            >
              Skip intro <span>↗</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
