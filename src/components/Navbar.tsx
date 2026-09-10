'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { CONTACT, NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); trigger?.focus(); };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${scrolled ? 'border-b border-white/10 bg-[#07100f]/92 backdrop-blur-xl' : 'bg-transparent'}`}>
      <nav className="container-wide flex h-[76px] items-center justify-between" aria-label="Ana navigasyon">
        <a href="#hero" onClick={(e) => { e.preventDefault(); go('#hero'); }} className="relative z-50 flex min-h-11 items-center gap-3" aria-label="Travia Dubai ana sayfa">
          <span className="font-serif text-[1.65rem] leading-none tracking-[.12em]">TRAVIA</span>
          <span className="h-5 w-px bg-sand/60" aria-hidden="true" />
          <span className="text-[.58rem] font-bold tracking-[.28em] text-sand">DUBAI</span>
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.slice(1).map((link) => <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); go(link.href); }} className="group relative py-3 text-[.67rem] font-semibold uppercase tracking-[.15em] text-ivory/70 transition-colors duration-200 hover:text-ivory"><span>{link.label}</span><span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-sand transition-transform duration-300 group-hover:scale-x-100" /></a>)}
        </div>

        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-quiet !hidden lg:!inline-flex">Seyahati planla <ArrowUpRight className="size-4" /></a>
        <button ref={triggerRef} type="button" onClick={() => setOpen(true)} className="relative z-50 grid size-11 place-items-center border border-white/25 lg:hidden" aria-label="Menüyü aç" aria-expanded={open}><Menu className="size-5" /></button>
      </nav>

      <AnimatePresence mode="wait">
        {open ? (
          <motion.div key="menu" className="fixed inset-0 z-[60] bg-[#07100f]" role="dialog" aria-modal="true" aria-label="Mobil menü" initial={{ clipPath: reduced ? 'inset(0)' : 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0)' }} exit={{ clipPath: reduced ? 'inset(0)' : 'inset(0 0 100% 0)' }} transition={{ duration: reduced ? .1 : .65, ease: [0.76, 0, 0.24, 1] }}>
            <div className="container-wide flex h-[76px] items-center justify-between border-b border-white/10">
              <span className="font-serif text-[1.65rem] tracking-[.12em]">TRAVIA</span>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="grid size-11 place-items-center" aria-label="Menüyü kapat"><X className="size-5" /></button>
            </div>
            <div className="container-wide flex min-h-[calc(100svh-76px)] flex-col justify-between py-12">
              <nav className="flex flex-col" aria-label="Mobil navigasyon">
                {NAV_LINKS.map((link, index) => <motion.a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); go(link.href); }} className="flex items-baseline justify-between border-b border-white/12 py-4 font-serif text-[clamp(2.5rem,12vw,4.5rem)] leading-none" initial={{ opacity: 0, y: reduced ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : .18 + index * .06 }}><span>{link.label}</span><span className="font-sans text-[.62rem] text-sand">0{index + 1}</span></motion.a>)}
              </nav>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-10 w-full">WhatsApp concierge <ArrowUpRight className="size-4" /></a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
