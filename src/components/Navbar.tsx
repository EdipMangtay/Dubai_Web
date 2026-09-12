'use client';

import Link from '@/components/ui/TransitionLink';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { useMotionSettings } from '@/hooks/useMotionSettings';
import { MOTION } from '@/lib/motion';
import BrandMark from './ui/BrandMark';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { reduced, duration, stagger } = useMotionSettings();
  const { scrollY, scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const href = (hash: string) => pathname === '/' ? hash : `/${hash}`;

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('dubai:menu', { detail: true }));
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = previous;
      window.dispatchEvent(new CustomEvent('dubai:menu', { detail: false }));
      desktop.removeEventListener('change', onResize);
    };
  }, [open]);

  return (
    <>
      <header className="site-header"><motion.div className="header-backdrop" style={{ opacity: headerOpacity }} aria-hidden="true" />
        <nav className="container-wide nav-inner" aria-label="Ana navigasyon">
          <Link href={href('#hero')} className="brand-link" aria-label="DUBAI ana sayfa"><BrandMark /></Link>
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.slice(1).map(link => <Link key={link.href} href={href(link.href)} className="nav-link">{link.label}</Link>)}
          </div>
          <Link href={href('#trip-planner')} className="nav-booking hidden lg:inline-flex">Seyahatinizi planlayın <ArrowUpRight className="size-4" /></Link>
          <button type="button" onClick={() => setOpen(true)} className="menu-trigger lg:hidden" aria-label="Menüyü aç" aria-expanded={open} aria-controls="mobile-menu"><Menu className="size-5" /></button>
        </nav>
        <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      </header>
      <dialog ref={dialogRef} id="mobile-menu" className="mobile-dialog" data-open={open} aria-label="Mobil menü" data-lenis-prevent
        onKeyDown={event => {
          if (event.key !== 'Tab') return;
          const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}
        onCancel={event => { event.preventDefault(); setOpen(false); }}>
        <AnimatePresence onExitComplete={() => dialogRef.current?.close()}>
          {open && <motion.div className="mobile-menu-content" initial={{ opacity: 0, clipPath: reduced ? 'inset(0)' : 'inset(0 0 100% 0)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0, clipPath: reduced ? 'inset(0)' : 'inset(0 0 8% 0)' }} transition={{ duration: duration('medium'), ease: MOTION.ease }}>
            <div className="container-wide nav-inner border-b border-white/15"><BrandMark /><button type="button" onClick={() => setOpen(false)} className="menu-trigger" aria-label="Menüyü kapat" autoFocus><X className="size-5" /></button></div>
            <div className="container-wide mobile-menu-body">
              <p className="eyebrow">Dubai’yi kendi ritminizde keşfedin</p>
              <nav aria-label="Mobil navigasyon">
                {NAV_LINKS.map((link, index) => <div className="mobile-link-mask" key={link.href}><motion.div initial={{ opacity: 0, y: reduced ? 0 : '100%' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: duration('medium'), delay: reduced ? 0 : MOTION.duration.short / 2 + index * stagger, ease: MOTION.ease }}>
                  <Link href={href(link.href)} onClick={() => { setOpen(false); window.dispatchEvent(new CustomEvent('dubai:menu', { detail: false })); }} className="mobile-nav-link"><span className="mobile-nav-number">0{index + 1}</span><span>{link.label}</span><ArrowUpRight className="size-5" /></Link>
                </motion.div></div>)}
              </nav>
              <motion.div initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: duration('medium'), delay: reduced ? 0 : MOTION.duration.short / 2 + NAV_LINKS.length * stagger, ease: MOTION.ease }}><Link href={href('#trip-planner')} onClick={() => setOpen(false)} className="btn-primary mt-8 w-full">Yolculuğunuzu tasarlayın <ArrowUpRight className="size-4" /></Link></motion.div>
              <p className="mt-8 text-[.6rem] uppercase tracking-[.2em] text-ivory/50">Dubai, United Arab Emirates</p>
            </div>
          </motion.div>}
        </AnimatePresence>
      </dialog>
    </>
  );
}
