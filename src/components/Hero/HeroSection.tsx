'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import HeroContent from './HeroContent';

const HERO_SRC = process.env.NEXT_PUBLIC_TRAVIA_HERO_IMAGE ?? '/images/travia-hero-v3.jpg';
const HERO_FALLBACK = '/images/travia-hero-v3.jpg';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroImage, setHeroImage] = useState(HERO_SRC);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '2%']);
  const atmosphereY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '2.5%']);
  const atmosphereOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduced ? 1 : 0.45]);

  return (
    <section ref={heroRef} id="hero" className="relative h-[100svh] min-h-[720px] overflow-hidden bg-canvas" aria-labelledby="hero-title">
      {/* Hero image — no resting scale to preserve pixel-level sharpness */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src={heroImage}
          alt="Akşam ışıklarında Downtown Dubai ve Burj Khalifa"
          fill
          loading="eager"
          fetchPriority="high"
          quality={85}
          sizes="(min-width: 2560px) 2560px, (min-width: 1920px) 1920px, (min-width: 1280px) 1440px, 100vw"
          onError={() => setHeroImage(HERO_FALLBACK)}
          className="object-cover object-[55%_center] md:object-[52%_center] lg:object-center"
        />
      </motion.div>

      {/* Cinematic gradient overlays for text readability */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,9,.22)_0%,rgba(3,10,9,.06)_34%,rgba(3,10,9,.28)_62%,rgba(3,10,9,.78)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,9,.36)_0%,rgba(3,10,9,.12)_65%,transparent_100%)] md:bg-[linear-gradient(90deg,rgba(3,10,9,.78)_0%,rgba(3,10,9,.58)_30%,rgba(3,10,9,.2)_58%,rgba(3,10,9,.05)_100%)]" />

      {/* Subtle atmosphere glow — restored for visual depth */}
      <motion.div
        className="absolute inset-[-4%] hidden bg-[radial-gradient(ellipse_62%_27%_at_58%_61%,rgba(244,240,231,.035)_0%,transparent_72%)] md:block"
        style={{ y: atmosphereY, opacity: atmosphereOpacity }}
        aria-hidden="true"
      />

      <div className="absolute inset-y-0 left-[calc(var(--gutter)+2px)] hidden w-px bg-white/15 md:block" aria-hidden="true" />
      <HeroContent />
    </section>
  );
}
