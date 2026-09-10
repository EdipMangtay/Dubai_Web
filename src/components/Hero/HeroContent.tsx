'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { CONTACT } from '@/lib/constants';
import { MOTION } from '@/lib/motion';

export default function HeroContent() {
  const reduced = useReducedMotion();
  const transition = (delay: number) => ({ duration: reduced ? .12 : .95, delay: reduced ? 0 : delay, ease: MOTION.ease });
  const scroll = () => document.querySelector('#services')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });

  return (
    <div className="container-wide relative z-10 flex h-full min-h-[720px] flex-col justify-end pb-8 pt-28 md:pb-10">
      <div className="max-w-[68rem] md:pl-10">
        <motion.p className="eyebrow motion-reduce-transform mb-6" initial={{ y: 14 }} animate={{ y: 0 }} transition={transition(.25)}>Private travel studio · Dubai</motion.p>
        <h1 id="hero-title" className="display title-xl max-w-[9ch] text-ivory">
          <span className="block overflow-hidden"><motion.span className="motion-reduce-transform block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={transition(.4)}>Dubai,</motion.span></span>
          <span className="block overflow-hidden"><motion.span className="motion-reduce-transform block italic text-sand-light" initial={{ y: '110%' }} animate={{ y: 0 }} transition={transition(.54)}>sizin ritminizde.</motion.span></span>
        </h1>
      </div>

      <motion.div className="motion-reduce-transform mt-8 grid items-end gap-7 border-t border-white/20 pt-6 md:ml-10 md:grid-cols-[1fr_auto_auto]" initial={{ y: 20 }} animate={{ y: 0 }} transition={transition(.9)}>
        <p className="max-w-xl text-sm leading-7 text-ivory/70 md:text-base">Özel araç, Türkçe rehber ve özenle seçilmiş deneyimlerle Dubai’yi kalabalığın dışında yaşayın.</p>
        <div className="flex flex-col gap-3 sm:flex-row md:justify-self-end">
          <button type="button" onClick={scroll} className="btn-primary">Deneyimleri keşfet <ArrowDown className="size-4" /></button>
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-quiet">Concierge’e yazın <ArrowUpRight className="size-4" /></a>
        </div>
        <p className="hidden text-right text-[.62rem] font-semibold uppercase leading-5 tracking-[.17em] text-ivory/45 xl:block">25.2048° N<br />55.2708° E</p>
      </motion.div>
    </div>
  );
}
