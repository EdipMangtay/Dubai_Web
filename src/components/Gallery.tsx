import Image from 'next/image';
import Link from '@/components/ui/TransitionLink';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import TextLines from './ui/TextLines';

const moments = [
  { src: '/images/dubai-city.webp', title: 'Şehrin üzerinde.', category: 'CITY', meta: 'Panoramik şehir turu', href: '/experiences/helicopter-tour', alt: 'Gün batımı ışığında Burj Khalifa ve Downtown Dubai', copy: 'İkonik mimariyi ve hiç görmediğiniz ufukları farklı bir açıdan keşfedin.' },
  { src: '/images/dubai-desert.webp', title: 'Zamanın dışında.', category: 'DESERT', meta: 'Özel çöl deneyimi', href: '/experiences/desert-safari', alt: 'Güneşin sıcak ışıklarıyla aydınlanan kızıl kum tepeleri', copy: 'Şehrin sesini geride bırakın. Kumların üzerinde yalnızca size ait bir gün batımı.' },
  { src: '/images/dubai-marina.webp', title: 'Mavinin içinde.', category: 'COAST', meta: 'Özel yat seyri', href: '/experiences/yacht-sunset', alt: 'Dubai Marina silüeti önünde seyreden yatlar', copy: 'Marina’dan açık denize uzanan, rotasını sizin belirlediğiniz bir yolculuk.' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="paper-section section-space border-t border-[#0b1513]/15" aria-labelledby="gallery-title">
      <div className="container-wide">
        <Reveal variant="editorial" className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div><p className="eyebrow">02 · Üç atmosfer, tek Dubai</p><h2 id="gallery-title" className="display title-lg mt-7"><TextLines lines={['Sizi hangi', <em key="second" className="text-[#80673f]">Dubai çağırıyor?</em>]} /></h2></div>
          <p className="max-w-xs text-sm leading-7 text-[#0b1513]/65">Şehrin heyecanı, çölün dinginliği ya da denizin özgürlüğü. Yolculuğunuzun ilk sayfasını seçin.</p>
        </Reveal>
        <div className="experience-grid">
          {moments.map((moment, index) => (
            <Reveal variant="editorial" key={moment.category} delay={index * .08}>
              <Link href={moment.href} className="experience-link group">
                <div className="image-frame image-mask experience-image"><Image src={moment.src} alt={moment.alt} fill sizes="(max-width: 767px) 100vw, 35vw" className="object-cover" /><span className="experience-arrow"><ArrowUpRight className="size-4" /></span></div>
                <div className="experience-meta"><span>0{index + 1} / {moment.category}</span><span>{moment.meta}</span></div>
                <h3><TextLines lines={[moment.title]} /></h3><p>{moment.copy}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
