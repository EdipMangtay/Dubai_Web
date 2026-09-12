'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMotionSettings } from '@/hooks/useMotionSettings';
import { MOTION } from '@/lib/motion';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/constants';
import Reveal from './ui/Reveal';
import TextLines from './ui/TextLines';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { duration } = useMotionSettings();
  return (
    <section id="faq" className="paper-section section-space" aria-labelledby="faq-title">
      <div className="container-wide grid gap-12 lg:grid-cols-12">
        <Reveal variant="editorial" className="lg:col-span-4"><p className="eyebrow">06 · Merak edilenler</p><h2 id="faq-title" className="display title-md mt-7"><TextLines lines={['Yola çıkmadan', <em key="second" className="text-[#80673f]">önce.</em>]} /></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#0b1513]/58">Vize, araçlar, süre ve deneyimler hakkında en sık aldığımız sorular.</p></Reveal>
        <div className="lg:col-span-8">
          {FAQ_ITEMS.map((item, index) => { const active = open === index; return <Reveal key={item.question} delay={index * .035}><div className="border-t border-[#0b1513]/18 last:border-b"><h3><button type="button" className="flex min-h-20 w-full items-center justify-between gap-6 py-5 text-left font-serif text-xl sm:text-2xl" id={`faq-trigger-${index}`} onClick={() => setOpen(active ? null : index)} aria-expanded={active} aria-controls={`faq-${index}`}><span><span className="mr-5 font-sans text-[.58rem] font-bold text-[#80673f]">0{index + 1}</span>{item.question}</span><span className="grid size-10 shrink-0 place-items-center border border-[#0b1513]/20"><motion.span animate={{ rotate: active ? 45 : 0 }} transition={{ duration: duration('short'), ease: MOTION.ease }}><Plus className="size-4" /></motion.span></span></button></h3><AnimatePresence initial={false} mode="wait">{active ? <motion.div id={`faq-${index}`} role="region" aria-labelledby={`faq-trigger-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: duration('medium'), ease: MOTION.ease }} className="overflow-hidden"><p className="max-w-2xl pb-8 pl-0 text-sm leading-7 text-[#0b1513]/62 sm:pl-12">{item.answer}</p></motion.div> : null}</AnimatePresence></div></Reveal>; })}
        </div>
      </div>
    </section>
  );
}
