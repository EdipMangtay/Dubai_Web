'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { BrandReveal, DubaiStage, HERO_IMAGE, PhoneStage, SceneImage } from './Stages';
import styles from './intro.module.css';

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const skipAction = useRef<() => void>(() => onComplete());

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;

    document.documentElement.setAttribute('data-travia-intro', 'active');
    const select = gsap.utils.selector(element);
    const yacht = select('[data-yacht]')[0] as HTMLElement | undefined;
    const slot = yacht?.parentElement;
    const previousFocus = document.activeElement as HTMLElement | null;

    let disposed = false;
    let exiting = false;
    let timeline: gsap.core.Timeline;

    const stopScroll = (event: Event) => event.preventDefault();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') skipAction.current();
      if (event.key === 'Tab') {
        event.preventDefault();
        skip.current?.focus();
      }
      if (
        ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key) &&
        event.target !== skip.current
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', stopScroll, { passive: false });
    window.addEventListener('touchmove', stopScroll, { passive: false });
    window.addEventListener('keydown', keyboard);
    skip.current?.focus({ preventScroll: true });

    const context = gsap.context(() => {
      timeline = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.inOut' },
        onComplete,
      });

      // ==========================================
      // STAGE 1: DUBAI OPENING (0.0s - 1.8s)
      // ==========================================
      timeline
        .addLabel('dubai', 0)
        .fromTo('[data-dubai]', { opacity: 0 }, { opacity: 1, duration: 1.3 }, 0)
        .fromTo(
          '[data-city]',
          { scale: 1.025, xPercent: -0.5, yPercent: 0 },
          { scale: 1.085, xPercent: 0.5, yPercent: -1.2, duration: 4.6, ease: 'none' },
          0
        )
        .fromTo(
          '[data-atmosphere]',
          { xPercent: -8, opacity: 0.25 },
          { xPercent: 6, opacity: 0.75, duration: 4.6 },
          0
        )
        .fromTo(
          '[data-city-caption]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.5
        )
        .to('[data-city-caption]', { opacity: 0, y: -10, duration: 0.5 }, 1.75);

      // ==========================================
      // STAGE 2: PHONE REVEAL (1.65s - 3.2s)
      // ==========================================
      timeline
        .addLabel('phone', 1.65)
        .fromTo(
          '[data-phone-position]',
          { opacity: 0, y: 85 },
          { opacity: 1, y: 0, duration: 1.15, ease: 'power3.out' },
          1.65
        )
        .fromTo(
          '[data-phone]',
          { rotationY: -16, rotationX: 8, rotationZ: -4 },
          { rotationY: 0, rotationX: 0, rotationZ: 0, duration: 1.6, ease: 'power2.out' },
          1.65
        )
        .to('[data-dubai]', { filter: 'brightness(.42)', duration: 1.1 }, 1.7)
        .fromTo(
          '[data-selection]',
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 0.35 },
          3.15
        );

      // ==========================================
      // STAGE 3: YACHT SHARED-ELEMENT PORTAL (3.65s - 4.8s)
      // ==========================================
      timeline
        .addLabel('portal', 3.65)
        .call(() => {
          if (!yacht) return;
          const bounds = yacht.getBoundingClientRect();
          element.appendChild(yacht);
          gsap.set(yacht, {
            position: 'absolute',
            left: 0,
            top: 0,
            width: element.clientWidth,
            height: element.clientHeight,
            zIndex: 5,
            clipPath: `inset(${bounds.top}px ${element.clientWidth - bounds.right}px ${element.clientHeight - bounds.bottom}px ${bounds.left}px round 10px)`,
          });
          const img = yacht.querySelector('img');
          if (img) {
            gsap.set(img, {
              width: bounds.width,
              height: bounds.height,
              maxWidth: 'none',
              x: bounds.left,
              y: bounds.top,
            });
          }
          gsap.set(yacht.querySelector('[data-card-label]'), { opacity: 0 });
          gsap.set(yacht.querySelector('[data-selection]'), { opacity: 0 });
        }, [], 3.65)
        .to(
          '[data-yacht]',
          {
            borderRadius: 0,
            clipPath: 'inset(0px 0px 0px 0px round 0px)',
            duration: 1.15,
            ease: 'power3.inOut',
          },
          3.65
        )
        .to(
          '[data-yacht] img',
          {
            width: '100%',
            height: '100%',
            x: 0,
            y: 0,
            duration: 1.15,
            ease: 'power3.inOut',
          },
          3.65
        )
        .to(
          '[data-phone-position]',
          { opacity: 0, scale: 1.1, duration: 0.65, ease: 'power2.in' },
          3.75
        );

      // ==========================================
      // STAGE 4: YACHT FULLSCREEN (4.75s - 5.8s)
      // ==========================================
      timeline
        .addLabel('yacht', 4.75)
        .to('[data-yacht] img', { scale: 1.04, duration: 1.6, ease: 'none' }, 4.75)
        .fromTo(
          '[data-water]',
          { opacity: 0, xPercent: -45 },
          { opacity: 0.35, xPercent: 35, duration: 1.7 },
          4.55
        )
        .fromTo(
          '[data-yacht-caption]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          4.7
        )
        .to('[data-yacht-caption]', { opacity: 0, duration: 0.35 }, 5.65);

      // ==========================================
      // STAGE 5: YACHT TO DESERT TRANSITION (5.8s - 6.8s)
      // ==========================================
      timeline
        .addLabel('desert', 5.8)
        .fromTo(
          '[data-desert]',
          { maskPosition: '0% 0%', webkitMaskPosition: '0% 0%' },
          { maskPosition: '0% 100%', webkitMaskPosition: '0% 100%', duration: 1.15, ease: 'power2.inOut' },
          5.8
        )
        .fromTo(
          '[data-bridge]',
          { yPercent: 110, opacity: 0 },
          { yPercent: -110, opacity: 0.55, duration: 1.15, ease: 'power2.inOut' },
          5.8
        )
        .to('[data-bridge]', { opacity: 0, duration: 0.3 }, 6.65)
        .fromTo(
          '[data-desert] img',
          { scale: 1.055, xPercent: -1 },
          { scale: 1.015, xPercent: 0, duration: 2.3, ease: 'none' },
          5.8
        )
        // ==========================================
        // STAGE 6: DESERT SAFARI (6.8s - 7.5s)
        // ==========================================
        .fromTo(
          '[data-desert-caption]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          6.6
        )
        .to('[data-desert-caption]', { opacity: 0, duration: 0.4 }, 7.25);

      // ==========================================
      // STAGE 7: FINAL LUXURY CRESCENDO (7.45s - 8.45s)
      // ==========================================
      timeline
        .addLabel('chauffeur', 7.45)
        .fromTo(
          '[data-chauffeur]',
          { clipPath: 'inset(0 100% 0 0)', webkitClipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', webkitClipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut' },
          7.45
        )
        .fromTo(
          '[data-chauffeur] img',
          { scale: 1.045 },
          { scale: 1, duration: 1.65, ease: 'none' },
          7.45
        );

      // ==========================================
      // STAGE 8: TRAVIA DUBAI BRAND REVEAL (8.45s - 9.8s)
      // ==========================================
      timeline
        .addLabel('brand', 8.45)
        .to('[data-black]', { opacity: 1, duration: 0.7 }, 8.45)
        .fromTo(
          '[data-brand-aura]',
          { opacity: 0, scale: 0.85 },
          { opacity: 0.85, scale: 1.12, duration: 1.2 },
          8.65
        )
        .fromTo(
          '[data-wordmark]',
          { opacity: 0, y: 12, letterSpacing: '.24em' },
          { opacity: 1, y: 0, letterSpacing: '.18em', duration: 0.8, ease: 'power2.out' },
          8.8
        )
        .fromTo(
          '[data-brand-city]',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.65 },
          9.1
        );

      // ==========================================
      // STAGE 9: HOMEPAGE HANDOFF (9.8s - 10.6s)
      // ==========================================
      timeline
        .addLabel('handoff', 9.8)
        .to('[data-handoff]', { opacity: 1, duration: 0.85 }, 9.8)
        .to('[data-brand]', { opacity: 0, y: -8, duration: 0.65 }, 10.1)
        .to(element, { opacity: 0, duration: 0.85 }, 10.55);

      // Skip action implementation
      skipAction.current = () => {
        if (exiting) return;
        exiting = true;
        timeline.kill();
        timeline = gsap.timeline({ onComplete });
        timeline
          .to('[data-handoff]', { opacity: 1, duration: 0.3 })
          .to(element, { opacity: 0, duration: 0.45 });
      };
    }, element);

    // Preload & decode images before playing
    const images = Array.from(element.querySelectorAll('img'));
    const ready = Promise.allSettled(images.map((img) => img.decode()));
    const timeout = window.setTimeout(() => skipAction.current(), 3500);

    ready.then(() => {
      if (disposed || exiting) return;
      clearTimeout(timeout);
      timeline.play();
    });

    const failSafe = window.setTimeout(onComplete, 16000);

    // Development-only frame inspection event
    const inspect = (event: Event) =>
      timeline.pause((event as CustomEvent<number>).detail, false);
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('travia:intro-frame', inspect);
    }

    const resize = () => skipAction.current();
    window.addEventListener('resize', resize);

    return () => {
      disposed = true;
      clearTimeout(timeout);
      clearTimeout(failSafe);
      timeline?.kill();
      context.revert();
      if (yacht && slot && !slot.contains(yacht)) {
        slot.appendChild(yacht);
      }
      if (process.env.NODE_ENV === 'development') {
        window.removeEventListener('travia:intro-frame', inspect);
      }
      window.removeEventListener('resize', resize);
      window.removeEventListener('wheel', stopScroll);
      window.removeEventListener('touchmove', stopScroll);
      window.removeEventListener('keydown', keyboard);
      if (previousFocus?.isConnected && previousFocus !== document.body) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [onComplete]);

  return (
    <div
      ref={root}
      className={styles.intro}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to TRAVIA Dubai"
      lang="en"
      data-lenis-prevent
    >
      <div aria-hidden="true">
        <DubaiStage />
        <PhoneStage />
        <div className={styles.water} data-water />
        <div className={styles.sceneCaption} data-yacht-caption>
          <small>01 / THE ARABIAN GULF</small>
          <p>Time, untethered.</p>
        </div>
        <div className={`${styles.scene} ${styles.desert}`} data-desert>
          <SceneImage src="/images/desert-safari.jpg" />
          <div className={styles.vignette} />
        </div>
        <div className={styles.bridge} data-bridge />
        <div className={styles.sceneCaption} data-desert-caption>
          <small>02 / BEYOND THE CITY</small>
          <p>Into the stillness.</p>
        </div>
        <div className={`${styles.scene} ${styles.chauffeur}`} data-chauffeur>
          <SceneImage src="/images/vip-chauffeur.jpg" />
          <div className={styles.vignette} />
        </div>
        <div className={styles.black} data-black />
        <div className={styles.handoff} data-handoff>
          <SceneImage src={HERO_IMAGE} hero />
          <div className={styles.heroShade} />
        </div>
        <BrandReveal />
        <div className={styles.grain} />
        <span className={styles.corner}>
          TRAVIA <i> / </i> DUBAI
        </span>
      </div>
      <button
        ref={skip}
        type="button"
        className={styles.skip}
        onClick={() => skipAction.current()}
      >
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
