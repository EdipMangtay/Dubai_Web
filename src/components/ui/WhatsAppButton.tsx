'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Merhaba, Dubai seyahatim için bilgi almak istiyorum.');
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); trigger?.focus(); };
  }, [open]);

  const send = () => {
    window.open(`${CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <AnimatePresence mode="wait">
        {open ? <motion.div role="dialog" aria-modal="false" aria-labelledby="whatsapp-title" className="absolute bottom-16 right-0 mb-2 w-[min(21rem,calc(100vw-2rem))] border border-white/18 bg-[#0b1513] p-5 shadow-2xl" initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : 8 }} transition={{ duration: reduced ? .01 : .25 }}>
          <div className="flex items-start justify-between gap-5 border-b border-white/15 pb-4"><div><p className="text-[.58rem] font-bold uppercase tracking-[.16em] text-sand">Direct line</p><h2 id="whatsapp-title" className="mt-1 font-serif text-2xl">Travia concierge</h2></div><button ref={closeRef} type="button" onClick={() => setOpen(false)} className="grid size-10 place-items-center" aria-label="WhatsApp penceresini kapat"><X className="size-4" /></button></div>
          <label className="mt-5 block"><span className="sr-only">WhatsApp mesajınız</span><textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} className="field min-h-24 resize-none text-sm" /></label>
          <button type="button" onClick={send} className="btn-primary mt-4 w-full">WhatsApp’ta aç <Send className="size-4" /></button>
        </motion.div> : null}
      </AnimatePresence>
      <button ref={triggerRef} type="button" onClick={() => setOpen(value => !value)} className="grid size-13 place-items-center border border-sand/60 bg-[#0b1513] text-sand shadow-xl transition-[background-color,color,transform] duration-200 hover:-translate-y-1 hover:bg-sand hover:text-ink" aria-label="WhatsApp concierge" aria-expanded={open}><MessageCircle className="size-5" /></button>
    </div>
  );
}
