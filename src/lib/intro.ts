import { MOTION } from './motion';

// Every full document load gets a bounded, hydration-independent opening. The canvas
// owns no React state and its geometry is measured once against the hero crop.
export const INTRO_BOOTSTRAP = `(() => {
  const root = document.documentElement;
  const timeline = ${JSON.stringify(MOTION.intro)};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compact = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
  const modest = navigator.hardwareConcurrency <= 4 || navigator.connection?.saveData;
  const minimal = reduced.matches;
  const tempo = minimal ? 1 : compact ? timeline.mobileFactor : 1;
  root.dataset.intro = 'pending';
  root.dataset.introSequence = 'true';
  root.dataset.introMotion = minimal ? 'reduced' : 'full';
  root.dataset.heroReady = 'false';
  root.style.setProperty('--intro-tempo', String(tempo));
  const preload = document.createElement('link');
  preload.rel = 'preload'; preload.as = 'image'; preload.fetchPriority = 'high';
  preload.href = window.matchMedia('(max-width: 767px)').matches
    ? '/images/burj-khalifa-night-mobile.webp' : '/images/burj-khalifa-night.webp';
  document.head.appendChild(preload);
  let ended = false, handoff, timeout, raf, canvas, context, started;
  let lastFrame = 0, slowFrames = 0, count = 0;
  let stars = [], sprites = [];
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
  const out = value => 1 - Math.pow(1 - clamp(value), 3);

  function lights() {
    canvas = document.getElementById('intro-lights');
    const photo = document.querySelector('.intro-image');
    if (!canvas || !photo || !canvas.getContext) return;
    context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    const width = window.innerWidth, height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, compact || modest ? 1.5 : 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    context.scale(dpr, dpr);
    // Project the photograph's real spire coordinate through object-fit: cover.
    // This keeps the peak and architecture aligned on portrait and short screens.
    const style = getComputedStyle(photo);
    const photoHeight = photo.offsetHeight;
    const position = style.backgroundPosition.split(' ').map(parseFloat);
    const fit = Math.max(width / 1800, photoHeight / 2400);
    const renderedWidth = 1800 * fit, renderedHeight = 2400 * fit;
    const apexX = (width - renderedWidth) * position[0] / 100 + renderedWidth * .551;
    const apexY = (parseFloat(style.top) || 0) + (photoHeight - renderedHeight) * position[1] / 100 + renderedHeight * .308;
    const buildingHeight = Math.max(120, height * .9 - apexY);
    root.style.setProperty('--burj-x', apexX + 'px');
    root.style.setProperty('--burj-y', apexY + 'px');
    root.style.setProperty('--burj-height', buildingHeight + 'px');
    root.style.setProperty('--burj-width', Math.min(width * .09, renderedWidth * .08) + 'px');
    count = modest ? 32 : compact ? 40 : 96;
    let seed = 4817;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    // Cached, tiny bokeh sprites give depth without per-frame blur or gradients.
    sprites = ['232,235,233', '234,227,214'].map(color => {
      const sprite = document.createElement('canvas'); sprite.width = 24; sprite.height = 24;
      const ctx = sprite.getContext('2d');
      if (!ctx) return sprite;
      const glow = ctx.createRadialGradient(12, 12, 0, 12, 12, 12);
      glow.addColorStop(0, 'rgba(' + color + ',.8)');
      glow.addColorStop(.25, 'rgba(' + color + ',.36)');
      glow.addColorStop(1, 'rgba(' + color + ',0)');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, 24, 24); return sprite;
    });
    stars = Array.from({ length: count }, (_, index) => {
      const level = random();
      const spread = renderedWidth * (.003 + Math.pow(level, 1.7) * .1);
      return { x: random() * width, y: height * (index % 4 === 0 ? .65 + random() * .3 : random() * .8),
        tx: apexX + (random() - .5) * spread, ty: apexY + level * buildingHeight,
        dx: (random() - .5) * (compact ? 65 : 135), dy: -30 - random() * 80,
        delay: random() * .28, phase: random() * Math.PI * 2,
        radius: .4 + random() * .7, alpha: .14 + random() * .38,
        soft: index % 6 === 0, ambient: index % 7 === 0, color: index % 2,
        velocity: .5 + random() * .7, glint: (random() - .5) * 12 };
    });
    function frame(now) {
      if (ended) return;
      if (!canvas.isConnected) { finish(); return; }
      const elapsed = (now - started) / (1000 * tempo);
      if (lastFrame && now - lastFrame > 40) slowFrames++;
      if (slowFrames > 5) count = Math.min(count, 32);
      lastFrame = now;
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < count; i++) {
        const star = stars[i];
        const appear = out((elapsed - timeline.lights - star.delay) / .65);
        const gather = star.ambient ? 0 : ease((elapsed - timeline.attraction - star.delay) / timeline.attractionDuration);
        const windows = ease((elapsed - 2.5) / .35) * (1 - ease((elapsed - 3.3) / .35));
        const release = ease((elapsed - timeline.dispersion - star.delay * .4) / timeline.dispersionDuration);
        const drift = Math.sin(elapsed * star.velocity + star.phase) * 3 * (1 - gather);
        const x = star.x + (star.tx - star.x) * gather + star.dx * release + drift + star.glint * windows * gather;
        const y = star.y + (star.ty - star.y) * gather + star.dy * release;
        const ambientFade = star.ambient ? 1 - ease((elapsed - 1.8) / 1.4) : 1;
        const alpha = star.alpha * appear * (1 - release) * ambientFade * (.65 + gather * .35);
        const radius = star.radius * (1 - release * .45);
        context.globalAlpha = alpha;
        if (star.soft) {
          const size = radius * (4 - gather * 1.5);
          context.drawImage(sprites[star.color], x - size, y - size, size * 2, size * 2);
        } else {
          context.fillStyle = star.color ? '#eae3d6' : '#e8ebe9';
          context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fill();
        }
      }
      // One small 300 ms architectural highlight, with no lens flare or rays.
      const peakProgress = (elapsed - timeline.apex) / timeline.apexDuration;
      if (peakProgress > 0 && peakProgress < 1) {
        const strength = Math.sin(peakProgress * Math.PI);
        context.globalAlpha = strength * .55;
        context.drawImage(sprites[0], apexX - 6, apexY - 6, 12, 12);
        context.globalAlpha = strength * .75;
        context.strokeStyle = '#ecece3'; context.lineWidth = .6;
        context.beginPath(); context.moveTo(apexX, apexY - 3); context.lineTo(apexX, apexY + 4); context.stroke();
      }
      context.globalAlpha = 1;
      if (elapsed < timeline.dispersion + timeline.dispersionDuration + .15) raf = requestAnimationFrame(frame);
      else releaseCanvas();
    }
    raf = requestAnimationFrame(frame);
  }
  function releaseCanvas() {
    cancelAnimationFrame(raf);
    if (canvas) { canvas.width = 1; canvas.height = 1; canvas.dataset.complete = 'true'; }
    for (const sprite of sprites) { sprite.width = 1; sprite.height = 1; }
    sprites = []; stars = [];
  }
  function finish() {
    if (ended) return;
    ended = true; root.dataset.intro = 'done'; root.dataset.heroReady = 'true';
    clearTimeout(handoff); clearTimeout(timeout); releaseCanvas();
    window.removeEventListener('orientationchange', finish);
    document.removeEventListener('DOMContentLoaded', play);
    document.removeEventListener('pointerdown', pointer, true);
    document.removeEventListener('keydown', keyboard, true);
    document.removeEventListener('wheel', finish, true);
    document.removeEventListener('touchmove', finish, true);
    document.removeEventListener('animationend', animationEnd);
    document.removeEventListener('visibilitychange', visibility);
    reduced.removeEventListener('change', preference);
    window.removeEventListener('pagehide', finish);
  }
  function play() {
    if (ended) return;
    root.dataset.intro = 'playing'; started = performance.now();
    if (!minimal) lights();
    handoff = setTimeout(() => { root.dataset.heroReady = 'true'; }, (minimal ? .8 : timeline.handoff * tempo) * 1000);
  }
  function pointer(event) { if (event.target instanceof Element && event.target.closest('#brand-intro')) finish(); }
  function keyboard(event) { if (!['Shift','Control','Alt','Meta'].includes(event.key)) finish(); }
  function preference() { if (reduced.matches) finish(); }
  function visibility() { if (document.hidden) finish(); }
  function animationEnd(event) {
    if (['intro-depart', 'intro-reduced-depart'].includes(event.animationName) && event.target.id === 'brand-intro') finish();
  }
  document.addEventListener('pointerdown', pointer, true);
  document.addEventListener('keydown', keyboard, true);
  document.addEventListener('wheel', finish, { capture: true, passive: true });
  document.addEventListener('touchmove', finish, { capture: true, passive: true });
  document.addEventListener('animationend', animationEnd);
  document.addEventListener('visibilitychange', visibility);
  reduced.addEventListener('change', preference);
  window.addEventListener('pagehide', finish);
  window.addEventListener('orientationchange', finish, { once: true });
  timeout = setTimeout(finish, (minimal ? timeline.reducedDuration + .15 : timeline.maximum * tempo) * 1000);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', play, { once: true });
  else play();
})();`;
