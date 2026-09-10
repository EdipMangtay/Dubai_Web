import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './ui/Reveal';

const moments = [
  { src: '/images/luxury-yacht.jpg', title: 'Marina’dan açık denize', meta: 'Özel yat · Gün batımı', href: '/experiences/yacht-sunset', className: 'md:col-span-7 md:row-span-2' },
  { src: '/images/desert-safari.jpg', title: 'Kızıl kumlarda sessizlik', meta: 'Lahbab · Özel Majlis', href: '/experiences/desert-safari', className: 'md:col-span-5' },
  { src: '/images/hero-skyline.jpg', title: 'Şehrin ışıkları üstünden', meta: 'Downtown · Gece', href: '/experiences/helicopter-tour', className: 'md:col-span-5' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="paper-section section-space" aria-labelledby="gallery-title">
      <div className="container-wide">
        <Reveal className="flex flex-col gap-7 border-b border-[#0b1513]/18 pb-9 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow">03 · Signature moments</p><h2 id="gallery-title" className="display title-lg mt-7">Bir başka<br /><em className="text-[#80673f]">Dubai.</em></h2></div><p className="max-w-sm text-sm leading-7 text-[#0b1513]/62">Şehrin ihtişamından çölün sessizliğine uzanan, yalnızca size ait anlar.</p></Reveal>
        <div className="mt-8 grid auto-rows-[19rem] gap-4 md:grid-cols-12 md:auto-rows-[21rem]">
          {moments.map((moment, index) => (
            <Reveal key={moment.title} delay={index * .08} className={`${moment.className} min-h-0`}>
              <Link href={moment.href} className="group image-frame block h-full text-ivory">
                <Image src={moment.src} alt={moment.title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8"><div><p className="text-[.6rem] font-bold uppercase tracking-[.17em] text-sand-light">{moment.meta}</p><h3 className="mt-2 font-serif text-2xl sm:text-3xl">{moment.title}</h3></div><span className="grid size-11 place-items-center border border-white/40 transition-colors duration-200 group-hover:bg-ivory group-hover:text-ink"><ArrowUpRight className="size-4" /></span></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
