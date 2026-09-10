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
    duration: 3.88,
    convergeStart: 0.42,
    convergeEnd: 1.62,
    traceStart: 1.54,
    traceEnd: 2.4,
    brandStart: 2.3,
    brandEnd: 2.98,
    revealStart: 2.68,
    cityStart: 2.72,
    cityEnd: 3.84,
  },
  mobile: {
    duration: 3.52,
    convergeStart: 0.36,
    convergeEnd: 1.46,
    traceStart: 1.4,
    traceEnd: 2.18,
    brandStart: 2.1,
    brandEnd: 2.74,
    revealStart: 2.46,
    cityStart: 2.5,
    cityEnd: 3.48,
  },
} as const;

export const TRANSITION_TIMING = {
  duration: 1.4,
  convergeStart: 0.1,
  convergeEnd: 0.6,
  traceStart: 0.5,
  traceEnd: 0.9,
  brandStart: 0.7,
  brandEnd: 1.1,
  revealStart: 0.8,
  cityStart: 0.9,
  cityEnd: 1.4,
} as const;
