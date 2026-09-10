export const MOTION = {
  ease: [0.16, 1, 0.3, 1] as const,
  easeCss: 'cubic-bezier(0.16, 1, 0.3, 1)',
  duration: {
    short: 0.18,
    medium: 0.42,
    reveal: 0.8,
  },
  stagger: 0.06,
} as const;

export const INTRO_TIMING = {
  desktop: {
    duration: 5.2,
    convergeStart: 0.45,
    convergeEnd: 2.15,
    traceStart: 2.05,
    traceEnd: 3.15,
    brandStart: 3.05,
    brandEnd: 4.25,
    revealStart: 4.1,
    cityStart: 4.15,
    cityEnd: 5.15,
  },
  mobile: {
    duration: 4.7,
    convergeStart: 0.4,
    convergeEnd: 1.95,
    traceStart: 1.85,
    traceEnd: 2.85,
    brandStart: 2.75,
    brandEnd: 3.85,
    revealStart: 3.7,
    cityStart: 3.75,
    cityEnd: 4.65,
  },
} as const;

export const TRANSITION_TIMING = {
  duration: 1.6,
  convergeStart: 0.05,
  convergeEnd: 0.6,
  traceStart: 0.5,
  traceEnd: 0.95,
  brandStart: 0.85,
  brandEnd: 1.25,
  revealStart: 1.15,
  cityStart: 1.2,
  cityEnd: 1.6,
} as const;
