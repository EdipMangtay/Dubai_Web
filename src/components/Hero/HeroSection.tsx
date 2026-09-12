'use client';

import Image from 'next/image';
import Link from '@/components/ui/TransitionLink';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useMotionSettings } from '@/hooks/useMotionSettings';
import { MOTION } from '@/lib/motion';
import HeroContent from './HeroContent';

const scenes = [
  { category: 'CITY', label: 'Şehrin ritmi', location: 'Downtown Dubai', src: '/images/burj-khalifa-night.webp', alt: 'Gece ışıkları ve palmiyeler arasında aşağıdan görülen Burj Khalifa', position: 'center 28%', href: '/experiences/helicopter-tour' },
  { category: 'DESERT', label: 'Çölün sessizliği', location: 'Arabian Desert', src: '/images/dubai-desert.webp', alt: 'Arabistan çölünde sıcak ışıklarla aydınlanan kızıl kum tepeleri', position: 'center 64%', href: '/experiences/desert-safari' },
  { category: 'COAST', label: 'Denizin özgürlüğü', location: 'Jumeirah Coast', src: '/images/dubai-coast.webp', alt: 'Dubai kıyılarının turkuaz denizi ve Burj Al Arab', position: 'center', href: '/experiences/yacht-sunset' },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [hasChanged, setHasChanged] = useState(false);
  const { reduced, compact, duration } = useMotionSettings();
  const loaded = useRef(new Set<number>());
  const selectScene = (index: number) => { setHasChanged(true); setActive(index); if (loaded.current.has(index)) setDisplayed(index); };
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, MOTION.distance.parallax]);
  const scene = scenes[displayed];
  return (
    <section ref={ref} id="hero" className="hero-section" aria-labelledby="hero-title">
      <motion.div className="hero-media" style={{ y: reduced || compact ? 0 : y }}>
        <AnimatePresence initial={false}>
          {scenes.map((item, index) => (index === active || index === displayed) && (
            <motion.div key={item.src} className="hero-scene-media absolute inset-0" aria-hidden={index !== displayed}
              initial={{ opacity: 0, scale: reduced ? 1 : MOTION.scale.scene }}
              animate={{ opacity: index === displayed ? 1 : 0, scale: index === displayed || reduced ? 1 : MOTION.scale.scene }}
              exit={{ opacity: 0, scale: reduced ? 1 : MOTION.scale.exit }}
              transition={{ duration: duration('hero'), ease: MOTION.ease }}>
              <picture className="absolute inset-0">{index === 0 && <source media="(max-width: 767px)" srcSet="/images/burj-khalifa-night-mobile.webp" />}<Image src={item.src} alt={item.alt} fill sizes="100vw" quality={85}
                unoptimized={index === 0} fetchPriority={index === 0 ? 'high' : undefined} loading="eager"
                onLoad={() => { loaded.current.add(index); if (index === active) setDisplayed(index); }}
                className={`object-cover ${index === 0 ? 'hero-city-image' : ''} ${index === 0 && !hasChanged ? 'hero-initial-image' : ''}`} style={index === 0 ? undefined : { objectPosition: item.position }} /></picture>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="hero-shade" />
      <motion.div className="hero-tone" aria-hidden="true" initial={false}
        animate={{ backgroundColor: ['rgba(22,42,58,0)', 'rgba(98,55,22,.15)', 'rgba(5,70,75,.12)'][displayed] }}
        transition={{ duration: duration('hero'), ease: MOTION.ease }} />
      <div className="hero-unveil" aria-hidden="true" />
      <div className="hero-topline container-wide" aria-hidden="true"><span>PRIVATE TRAVEL, PERSONALLY CURATED</span><span>25°12′ N &nbsp; 55°16′ E</span></div>
      <HeroContent />
      <div className="hero-bottom container-wide">
        <div className="hero-scenes" style={{ '--scene-index': displayed } as React.CSSProperties} role="group" aria-label="Dubai manzarası seçin">
          <span className="hero-scene-indicator" aria-hidden="true" />
          {scenes.map((item, index) => (
            <button key={item.label} type="button" onClick={() => selectScene(index)} aria-pressed={displayed === index} aria-busy={active === index && displayed !== index}
              className={`hero-scene ${displayed === index ? 'is-active' : ''}`}>
              <span className="hero-scene-number">0{index + 1} / {item.category}</span>
              <span>{item.label}</span><ArrowDownRight className="size-4" aria-hidden="true" />
            </button>
          ))}
        </div>
        <Link href={scene.href} className="hero-location" aria-live="polite">
          <span><small>Şu an keşfettiğiniz</small><span className="scene-location-mask"><AnimatePresence initial={false} mode="popLayout"><motion.span key={scene.location}
            initial={{ opacity: 0, y: reduced ? 0 : '110%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : '-110%' }}
            transition={{ duration: duration('reveal'), ease: MOTION.ease }}>{scene.location}</motion.span></AnimatePresence></span></span><ArrowUpRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
