'use client';

import { MotionConfig, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { MOTION } from '@/lib/motion';
import BurjMotif from './ui/BurjMotif';

type Destination = { href: string; scroll?: boolean; replace?: boolean };
type Phase = 'idle' | 'cover' | 'reveal';
const NavigationContext = createContext<((destination: Destination) => void) | null>(null);
export const useRouteNavigation = () => useContext(NavigationContext);

export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const visited = useRef(new Set<string>());
  const previous = useRef<string | null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const phaseRef = useRef<Phase>('idle');
  const pending = useRef<Destination | null>(null);
  const committed = useRef(false);
  const covered = useRef(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const changePhase = useCallback((next: Phase) => { phaseRef.current = next; setPhase(next); }, []);
  const dispatchNavigation = useCallback(() => {
    const destination = pending.current;
    pending.current = null;
    if (destination) router[destination.replace ? 'replace' : 'push'](destination.href, { scroll: destination.scroll });
  }, [router]);
  const begin = useCallback((destination: Destination | null) => {
    clearTimeout(timeout.current);
    pending.current = destination;
    committed.current = false;
    covered.current = false;
    changePhase('cover');
    // Release even if a route fails, is slow, or animation completion is interrupted.
    timeout.current = setTimeout(() => {
      dispatchNavigation();
      changePhase('reveal');
    }, 1400);
  }, [changePhase, dispatchNavigation]);
  const navigate = useCallback((destination: Destination) => begin(destination), [begin]);

  useEffect(() => {
    if (previous.current === pathname) return;
    if (ref.current) ref.current.dataset.returning = String(visited.current.has(pathname));
    visited.current.add(pathname);
    previous.current = pathname;
    if (phaseRef.current === 'cover') {
      committed.current = true;
      if (covered.current) queueMicrotask(() => changePhase('reveal'));
    }
  }, [pathname, changePhase]);

  useEffect(() => {
    const onPopState = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.location.pathname === previous.current) return;
      begin(null);
    };
    window.addEventListener('popstate', onPopState);
    return () => { window.removeEventListener('popstate', onPopState); clearTimeout(timeout.current); };
  }, [begin]);

  return (
    <NavigationContext.Provider value={navigate}>
      <MotionConfig reducedMotion="user" transition={{ ease: MOTION.ease, duration: MOTION.duration.medium }}>
        <div ref={ref} key={pathname} className="route-content">{children}</div>
        {phase !== 'idle' && <motion.div className="route-curtain" aria-hidden="true" data-phase={phase}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: phase === 'cover' ? 'inset(0% 0 0 0)' : 'inset(0% 0 100% 0)' }}
          transition={{ duration: phase === 'cover' ? MOTION.route.cover : MOTION.route.reveal, ease: MOTION.ease }}
          onAnimationComplete={() => {
            if (phaseRef.current === 'cover') {
              covered.current = true;
              dispatchNavigation();
              if (committed.current) changePhase('reveal');
            } else {
              clearTimeout(timeout.current);
              changePhase('idle');
            }
          }}>
          <div className="route-motif"><BurjMotif /><span>DUBAI</span></div>
        </motion.div>}
      </MotionConfig>
    </NavigationContext.Provider>
  );
}
