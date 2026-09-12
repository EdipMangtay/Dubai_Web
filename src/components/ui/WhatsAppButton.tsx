'use client';

import { useEffect, useRef, useState } from 'react';
import Link from '@/components/ui/TransitionLink';
import { AnimatePresence, motion } from 'framer-motion';
import { useMotionSettings } from '@/hooks/useMotionSettings';
import { MOTION } from '@/lib/motion';
import { MessageCircle, Send, X } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [message, setMessage] = useState('Merhaba, Dubai seyahatim için bilgi almak istiyorum.');
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(true);
  const { reduced, duration } = useMotionSettings();

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); if (returnFocus.current) trigger?.focus(); };
  }, [open]);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const continueInForm = () => {
    returnFocus.current = false;
    try { sessionStorage.setItem('dubai:contact-draft', message); } catch {}
    window.dispatchEvent(new CustomEvent('dubai:contact-draft', { detail: message }));
    setOpen(false);
  };

  return (
    <div className={`whatsapp-dock fixed right-4 z-40 sm:right-6 ${heroVisible ? 'is-over-hero' : ''}`}>
      <AnimatePresence mode="wait">
        {open ? <motion.div role="dialog" aria-modal="false" aria-labelledby="whatsapp-title" className="absolute bottom-16 right-0 mb-2 w-[min(21rem,calc(100vw-2rem))] border border-white/18 bg-[#0b1513] p-5 shadow-2xl" initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : 8 }} transition={{ duration: duration('short'), ease: MOTION.ease }}>
          <div className="flex items-start justify-between gap-5 border-b border-white/15 pb-4"><div><p className="text-[.58rem] font-bold uppercase tracking-[.16em] text-sand">Size özel seyahat</p><h2 id="whatsapp-title" className="mt-1 font-serif text-2xl">DUBAI concierge</h2></div><button ref={closeRef} type="button" onClick={() => setOpen(false)} className="grid size-10 place-items-center" aria-label="Concierge penceresini kapat"><X className="size-4" /></button></div>
          <label className="mt-5 block"><span className="sr-only">Concierge mesajınız</span><textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} className="field min-h-24 resize-none text-sm" /></label>
          <p className="mt-4 text-xs leading-6 text-ivory/55">Telefon: {CONTACT.phone}. Mesajınıza iletişim formunda devam edebilirsiniz.</p><Link href={CONTACT.contactHref} onClick={continueInForm} className="btn-primary mt-4 w-full">Formda devam et <Send className="size-4" /></Link>
        </motion.div> : null}
      </AnimatePresence>
      <button ref={triggerRef} type="button" onClick={() => { returnFocus.current = true; setOpen(value => !value); }} className="grid size-13 place-items-center border border-sand/60 bg-[#0b1513] text-sand shadow-xl transition-[background-color,color,transform] duration-200 hover:-translate-y-1 hover:bg-sand hover:text-ink" aria-label="Concierge mesajı" aria-expanded={open}><MessageCircle className="size-5" /></button>
    </div>
  );
}
