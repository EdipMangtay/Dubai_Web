'use client';

import { useCallback, useEffect, useState } from 'react';

export const INTRO_KEY = 'travia-cinematic-intro-seen';
export const REPLAY_EVENT = 'travia:replay-intro';
let seenInDocument = false;

/** Developer helper to replay the cinematic intro from console or tests. */
export function replayCinematicIntro() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(REPLAY_EVENT));
  }
}

export function useIntroGate(pathname: string) {
  const [active, setActive] = useState(false);

  const finish = useCallback(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.removeAttribute('data-travia-intro');
    }
    setActive(false);
  }, []);

  useEffect(() => {
    let failSafe: ReturnType<typeof setTimeout> | undefined;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');

    const start = (replay = false) => {
      let seen = seenInDocument;
      try {
        seen = seen || sessionStorage.getItem(INTRO_KEY) === '1';
      } catch {
        // Storage restricted / private browsing fallback
      }

      if (pathname !== '/' || preference.matches || (!replay && (seen || location.hash || window.scrollY > 0))) {
        finish();
        return;
      }

      seenInDocument = true;
      try {
        sessionStorage.setItem(INTRO_KEY, '1');
      } catch {
        // Storage failure fallback
      }

      document.documentElement.setAttribute('data-travia-intro', 'pending');
      setActive(true);
      failSafe = setTimeout(finish, 18000);
    };

    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) start();
    });

    const replay = () => start(true);
    const onMotionChange = () => {
      if (preference.matches) finish();
    };

    window.addEventListener(REPLAY_EVENT, replay);
    preference.addEventListener('change', onMotionChange);

    return () => {
      cancelled = true;
      if (failSafe) clearTimeout(failSafe);
      window.removeEventListener(REPLAY_EVENT, replay);
      preference.removeEventListener('change', onMotionChange);
      document.documentElement.removeAttribute('data-travia-intro');
    };
  }, [pathname, finish]);

  return { active, finish };
}
