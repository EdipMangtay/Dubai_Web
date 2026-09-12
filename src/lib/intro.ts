import { MOTION } from './motion';

export const INTRO_STORAGE_KEY = 'dubai:intro-seen:v1';

// Runs before the body is painted. The timed CSS scene never depends on hydration
// or an image load to release the page. No storage access is required to navigate.
export const INTRO_BOOTSTRAP = `(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let seen = false;
  try { seen = sessionStorage.getItem('${INTRO_STORAGE_KEY}') === '1'; } catch {}
  if (seen || reduced.matches || (location.hash && location.hash !== '#hero')) {
    root.dataset.intro = 'done';
    root.dataset.heroReady = 'true';
    return;
  }
  try { sessionStorage.setItem('${INTRO_STORAGE_KEY}', '1'); } catch {}
  root.dataset.intro = 'pending';
  root.dataset.introSequence = 'true';
  root.dataset.heroReady = 'false';
  const preload = document.createElement('link');
  preload.rel = 'preload'; preload.as = 'image';
  preload.href = window.matchMedia('(max-width: 767px)').matches
    ? '/images/burj-khalifa-night-mobile.webp' : '/images/burj-khalifa-night.webp';
  preload.fetchPriority = 'high';
  document.head.appendChild(preload);
  let ended = false;
  let handoff;
  let timeout;
  let raf;
  let canvas;
  let context;
  let started;
  let lastFrame = 0;
  let slowFrames = 0;
  let stars = [];
  let count = 0;
  const compact = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
  const modest = navigator.hardwareConcurrency <= 4 || navigator.connection?.saveData;
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => 1 - Math.pow(1 - clamp(value), 3);
  function lights() {
    canvas = document.getElementById('intro-lights');
    if (!canvas || !canvas.getContext) return;
    context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    const width = window.innerWidth, height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, compact || modest ? 1.5 : 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    context.scale(dpr, dpr);
    count = modest ? 32 : compact ? 48 : 108;
    let seed = 4817;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    stars = Array.from({ length: count }, (_, index) => {
      const level = index / count;
      const spread = (.003 + Math.pow(level, 2) * .05) * width;
      return { x: random() * width, y: random() * height * .9,
        tx: width * .553 + (random() - .5) * spread, ty: height * (.31 + level * .52),
        dx: (random() - .5) * (compact ? 48 : 100), dy: -35 - random() * 65,
        delay: random() * .13, phase: random() * Math.PI * 2,
        radius: .35 + random() * .65, alpha: .18 + random() * .46 };
    });
    function frame(now) {
      if (ended) return;
      const elapsed = (now - started) / 1000;
      if (lastFrame && now - lastFrame > 40) slowFrames++;
      if (slowFrames > 5) count = Math.min(count, 32);
      lastFrame = now;
      context.clearRect(0, 0, width, height);
      const appear = ease((elapsed - .2) / .35);
      for (let i = 0; i < count; i++) {
        const star = stars[i];
        const gather = ease((elapsed - .45 - star.delay) / .95);
        const release = ease((elapsed - 1.7 - star.delay * .4) / .6);
        const drift = Math.sin(elapsed * .8 + star.phase) * 2 * (1 - gather);
        const x = star.x + (star.tx - star.x) * gather + star.dx * release + drift;
        const y = star.y + (star.ty - star.y) * gather + star.dy * release;
        const alpha = star.alpha * appear * (1 - release) * (.65 + gather * .35);
        context.fillStyle = 'rgba(238,235,223,' + alpha + ')';
        context.beginPath(); context.arc(x, y, star.radius, 0, Math.PI * 2); context.fill();
      }
      if (elapsed < 2.4) raf = requestAnimationFrame(frame);
      else { context.clearRect(0, 0, width, height); canvas.dataset.complete = 'true'; }
    }
    raf = requestAnimationFrame(frame);
  }
  function finish() {
    if (ended) return;
    ended = true;
    root.dataset.intro = 'done';
    root.dataset.heroReady = 'true';
    clearTimeout(handoff); clearTimeout(timeout); cancelAnimationFrame(raf);
    if (canvas) { canvas.width = 1; canvas.height = 1; canvas.dataset.complete = 'true'; }
    stars = [];
    window.removeEventListener('orientationchange', finish);
    document.removeEventListener('DOMContentLoaded', play);
    document.removeEventListener('pointerdown', pointer, true);
    document.removeEventListener('keydown', keyboard, true);
    document.removeEventListener('wheel', finish, true);
    document.removeEventListener('touchmove', finish, true);
    document.removeEventListener('animationend', animationEnd);
    reduced.removeEventListener('change', preference);
    window.removeEventListener('pagehide', finish);
  }
  function play() {
    if (ended) return;
    root.dataset.intro = 'playing';
    started = performance.now();
    lights();
    handoff = setTimeout(() => { root.dataset.heroReady = 'true'; }, ${MOTION.intro.handoff * 1000});
  }
  function pointer(event) { if (event.target.closest('#brand-intro')) finish(); }
  function keyboard(event) { if (!['Shift','Control','Alt','Meta'].includes(event.key)) finish(); }
  function preference() { if (reduced.matches) finish(); }
  function animationEnd(event) { if (event.animationName === 'intro-depart' && event.target.id === 'brand-intro') finish(); }
  document.addEventListener('pointerdown', pointer, true);
  document.addEventListener('keydown', keyboard, true);
  document.addEventListener('wheel', finish, { capture: true, passive: true });
  document.addEventListener('touchmove', finish, { capture: true, passive: true });
  document.addEventListener('animationend', animationEnd);
  reduced.addEventListener('change', preference);
  window.addEventListener('pagehide', finish);
  window.addEventListener('orientationchange', finish, { once: true });
  timeout = setTimeout(finish, ${MOTION.intro.maximum * 1000});
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', play, { once: true });
  else play();
})();`;
