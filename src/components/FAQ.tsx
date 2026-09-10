'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/constants';
import Reveal from './ui/Reveal';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  return (
    <section id="faq" className="paper-section section-space" aria-labelledby="faq-title">
      <div className="container-wide grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4"><p className="eyebrow">06 · Merak edilenler</p><h2 id="faq-title" className="display title-md mt-7">Yola çıkmadan<br /><em className="text-[#80673f]">önce.</em></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#0b1513]/58">Vize, araçlar, süre ve deneyimler hakkında en sık aldığımız sorular.</p></Reveal>
        <div className="lg:col-span-8">
          {FAQ_ITEMS.map((item, index) => { const active = open === index; return <Reveal key={item.question} delay={index * .035}><div className="border-t border-[#0b1513]/18 last:border-b"><h3><button type="button" className="flex min-h-20 w-full items-center justify-between gap-6 py-5 text-left font-serif text-xl sm:text-2xl" onClick={() => setOpen(active ? null : index)} aria-expanded={active} aria-controls={`faq-${index}`}><span><span className="mr-5 font-sans text-[.58rem] font-bold text-[#80673f]">0{index + 1}</span>{item.question}</span><motion.span animate={{ rotate: active ? 45 : 0 }} transition={{ duration: reduced ? 0 : .25 }} className="grid size-10 shrink-0 place-items-center border border-[#0b1513]/20"><Plus className="size-4" /></motion.span></button></h3><AnimatePresence initial={false} mode="wait">{active ? <motion.div id={`faq-${index}`} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? .01 : .35, ease: [0.16,1,.3,1] }} className="overflow-hidden"><p className="max-w-2xl pb-8 pl-0 text-sm leading-7 text-[#0b1513]/62 sm:pl-12">{item.answer}</p></motion.div> : null}</AnimatePresence></div></Reveal>; })}
        </div>
      </div>
    </section>
  );
}
