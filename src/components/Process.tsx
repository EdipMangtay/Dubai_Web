import { PROCESS_STEPS } from '@/lib/constants';
import Reveal from './ui/Reveal';

export default function Process() {
  return (
    <section id="process" className="section-space bg-[#0b1513]" aria-labelledby="process-title">
      <div className="container-wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8"><p className="eyebrow">05 · Yolculuğun akışı</p><h2 id="process-title" className="display title-lg mt-7">Siz hayal edin.<br /><em className="text-sand-light">Biz kusursuzlaştıralım.</em></h2></Reveal>
          <Reveal delay={.12} className="lg:col-span-4"><p className="body-lead text-ivory/58">İlk mesajdan Dubai’deki son ana kadar tek ekip, tek akış, açık iletişim.</p></Reveal>
        </div>
        <ol className="mt-14 grid border-t border-white/15 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => <li key={step.step} className="relative border-b border-white/15 py-9 md:px-7 md:odd:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"><Reveal delay={index * .07}><span className="font-serif text-5xl text-sand/55">0{step.step}</span><h3 className="mt-8 font-serif text-3xl">{step.title}</h3><p className="mt-4 text-sm leading-7 text-ivory/55">{step.description}</p></Reveal></li>)}
        </ol>
      </div>
    </section>
  );
}
