'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Ember {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  pulsingSpeed: number;
  hue: number;
}

export default function AmbientGoldenDust() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for subtle wind effect
    let mouseX = width / 2;
    let targetWindX = 0;
    let windX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetWindX = ((e.clientX - mouseX) / width) * 0.5;
      mouseX = e.clientX;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Generate embers
    const count = Math.min(65, Math.floor(width / 25));
    const embers: Ember[] = [];

    for (let i = 0; i < count; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -(Math.random() * 0.45 + 0.15), // Float upwards
        opacity: Math.random() * 0.7 + 0.1,
        maxOpacity: Math.random() * 0.6 + 0.3,
        pulsingSpeed: Math.random() * 0.02 + 0.008,
        hue: Math.random() > 0.4 ? 42 : 38, // Warm gold hue variations
      });
    }

    let scrollY = window.scrollY;
    let lastScrollY = scrollY;
    let scrollDelta = 0;

    const handleScroll = () => {
      scrollY = window.scrollY;
      scrollDelta = scrollY - lastScrollY;
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth wind decay
      windX += (targetWindX - windX) * 0.05;
      targetWindX *= 0.95;

      const scrollBoost = Math.max(-2, Math.min(2, scrollDelta * 0.05));
      scrollDelta *= 0.9;

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];

        // Move
        e.y += e.speedY - scrollBoost;
        e.x += e.speedX + windX + Math.sin(time + i) * 0.25;

        // Wrap around bounds
        if (e.y < -10) e.y = height + 10;
        if (e.y > height + 10) e.y = -10;
        if (e.x < -10) e.x = width + 10;
        if (e.x > width + 10) e.x = -10;

        // Pulsing glow
        const currentOpacity = e.maxOpacity * (0.6 + 0.4 * Math.sin(time * 3 + i));

        // Draw glowing ember
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 2.5);
        gradient.addColorStop(0, `hsla(${e.hue}, 85%, 72%, ${currentOpacity})`);
        gradient.addColorStop(0.5, `hsla(${e.hue}, 80%, 55%, ${currentOpacity * 0.4})`);
        gradient.addColorStop(1, `hsla(${e.hue}, 70%, 40%, 0)`);

        ctx.fillStyle = gradient;
        ctx.arc(e.x, e.y, e.size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Hot bright core
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 248, 220, ${currentOpacity * 0.9})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 h-full w-full opacity-70 mix-blend-screen"
    />
  );
}
