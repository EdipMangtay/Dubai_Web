import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import TextLines from './ui/TextLines';
import { CONTACT } from '@/lib/constants';

export default function About() {
  return (
    <section id="about" className="paper-section section-space" aria-labelledby="about-title">
      <div className="container-wide about-layout">
        <div>
          <Reveal variant="editorial"><p className="eyebrow">01 · DUBAI yaklaşımı</p><h2 id="about-title" className="display title-lg mt-7"><TextLines lines={['Bir şehri değil,', <em key="second" className="text-[#80673f]">bir hissi keşfedin.</em>]} /></h2></Reveal>
          <Reveal delay={.1} className="mt-8 max-w-lg">
            <p className="body-lead text-[#0b1513]/75">Sabah denize karşı bir kahve. Gün batımında kumların sessizliği. Gece, hiç tanımadığınız bir şehrin büyüsü.</p>
            <p className="mt-5 text-sm leading-7 text-[#0b1513]/65">DUBAI, yolculuğunuzu ilgi alanlarınız ve kendi ritminiz etrafında tasarlar. Özel araç, Türkçe rehberlik, seçkin konaklamalar ve kişisel deneyimler; her detay tek bir ekip tarafından özenle planlanır.</p>
            <a href={CONTACT.contactHref} className="mt-7 inline-flex min-h-11 items-center gap-6 border-b border-[#0b1513]/60 pb-2 text-[.68rem] font-semibold uppercase tracking-[.1em]">Sizi tanıyarak başlayalım <ArrowUpRight className="size-4" /></a>
            <div className="about-note"><span>“</span><p>En güzel yolculuklar, ne görmek istediğiniz kadar<br className="hidden lg:block" /> nasıl hissetmek istediğinizle başlar.</p></div>
          </Reveal>
        </div>
        <div>
          <Reveal variant="image" direction="left" className="image-frame about-image"><Image src="/images/dubai-resort.webp" alt="Palmiyeler ve turkuaz suyla çevrili Burj Al Arab manzarası" fill sizes="(max-width: 767px) 100vw, 48vw" className="object-cover" /></Reveal>
          <div className="about-caption"><span>Jumeirah, Dubai</span><span>Bir şehrin başka yüzü</span></div>
        </div>
      </div>
    </section>
  );
}
