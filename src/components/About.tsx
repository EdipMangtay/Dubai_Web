import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import { CONTACT } from '@/lib/constants';

export default function About() {
  return (
    <section id="about" className="paper-section section-space" aria-labelledby="about-title">
      <div className="container-wide grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5 lg:pt-12">
          <Reveal><p className="eyebrow">01 · Travia yaklaşımı</p></Reveal>
          <Reveal delay={.08}><h2 id="about-title" className="display title-lg mt-7">Bir tur değil.<br /><em className="text-[#80673f]">Size ait bir ritim.</em></h2></Reveal>
          <Reveal delay={.16} className="mt-9 max-w-lg border-t border-[#0b1513]/20 pt-7">
            <p className="body-lead text-[#0b1513]/72">Travia Dubai, Türk kurucular tarafından Birleşik Arap Emirlikleri’nde kurulmuş butik bir VIP seyahat markasıdır. Her programı misafirinin zamanı, beklentileri ve merakı etrafında şekillendirir.</p>
            <p className="mt-5 text-sm leading-7 text-[#0b1513]/60">Özel araçtan Türkçe rehberliğe, vize sürecinden seçkin deneyimlere kadar yolculuğun her temas noktası tek bir ekip tarafından koordine edilir.</p>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-[#0b1513] pb-2 text-[.7rem] font-bold uppercase tracking-[.13em]">Bizi tanıyın, yolculuğu anlatın <ArrowUpRight className="size-4" /></a>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7 lg:pl-16">
          <Reveal direction="right" className="image-frame aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image src="/images/visa-concierge.jpg" alt="Dubai manzarasına bakan concierge çalışma masası" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-center" />
          </Reveal>
          <Reveal delay={.2} className="relative -mt-20 ml-auto w-[82%] bg-[#0b1513] p-7 text-ivory sm:-mt-28 sm:w-[66%] sm:p-10 lg:absolute lg:-bottom-10 lg:-left-2 lg:w-[55%]">
            <p className="font-serif text-2xl leading-tight sm:text-3xl">“Şehri görmekten fazlası: ona nasıl eriştiğinizi tasarlıyoruz.”</p>
            <div className="mt-7 flex items-center justify-between border-t border-white/18 pt-4 text-[.58rem] font-bold uppercase tracking-[.16em] text-sand"><span>Local knowledge</span><span>Turkish hospitality</span></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
