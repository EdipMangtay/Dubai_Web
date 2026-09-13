/** Shared seconds, distances and easing; CSS counterparts live on :root. */
export const MOTION = {
  ease: [0.16, 1, 0.3, 1] as const,
  easeCss: 'cubic-bezier(0.16, 1, 0.3, 1)',
  duration: { reduced: .15, short: .28, medium: .48, reveal: .95, hero: 1.3, page: .55 },
  intro: {
    duration: 5.1, handoff: 4.15, maximum: 5.4, mobileFactor: .88, reducedDuration: 1.25,
    lights: .42, attraction: 1, attractionDuration: 1.15,
    structure: .95, structureDuration: 1.5,
    photograph: 1.25, photoReveal: 3.05, cameraDuration: 3.05,
    apex: 2.55, apexDuration: .3,
    wordmark: 2.6, wordmarkDuration: .52, wordmarkDepart: 4.1,
    dispersion: 3.2, dispersionDuration: .85,
  },
  route: { cover: .18, reveal: .3 },
  stagger: .075,
  mobileFactor: .72,
  distance: { body: 18, step: 20, parallax: 20, magnetic: 4 },
  scale: { hero: 1.08, scene: 1.06, exit: 1.025, reveal: 1.12 },
  spring: { type: 'spring', stiffness: 170, damping: 24, mass: .4 } as const,
} as const;
