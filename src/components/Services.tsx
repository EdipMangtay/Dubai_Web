import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';
import Reveal from './ui/Reveal';
import { CONTACT } from '@/lib/constants';

const services = [
  { number: '01', label: 'Şehir', title: 'VIP şehir & gece turları', copy: '10 saat boyunca size ayrılan lüks araç ve Türkçe rehberle, programınızı günün akışına göre özgürce şekillendirin.', image: '/images/vip-chauffeur.jpg', alt: 'Dubai gecesinde özel şoförlü lüks araç', points: ['10 saat özel araç ve rehber', 'Mercedes S-Class, Audi A6 ve grup araçları', 'Esnek, kişiye özel rota'] },
  { number: '02', label: 'Vize', title: 'Dubai vize danışmanlığı', copy: 'Bordo pasaport sahipleri için evrak hazırlığından başvuru takibine kadar süreci açık ve düzenli biçimde yönetiyoruz.', image: '/images/visa-concierge.jpg', alt: 'Dubai vize danışmanlığı için hazırlanmış pasaport ve evraklar', points: ['Evrak hazırlık desteği', 'Online başvuru yönetimi', 'Süreç boyunca bilgilendirme'] },
  { number: '03', label: 'Deneyim', title: 'Çöl, deniz ve gökyüzü', copy: 'Özel yatlardan kızıl kumlarda gün batımına, fine-dining’den helikopter turlarına uzanan deneyimler tek bir seyahat içinde buluşur.', image: '/images/desert-safari.jpg', alt: 'Gün batımında özel çöl kampı ve safari aracı', points: ['Özel çöl ve yat seçenekleri', 'Seçkin restoran rezervasyonları', 'Uçuş ve aktivite koordinasyonu'] },
];

export default function Services() {
  return (
    <section id="services" className="section-space bg-canvas" aria-labelledby="services-title">
      <div className="container-wide">
        <div className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8"><p className="eyebrow">02 · Seçkin hizmetler</p><h2 id="services-title" className="display title-lg mt-7">Dubai’nin kapıları,<br /><em className="text-sand-light">sizin için açılır.</em></h2></Reveal>
          <Reveal delay={.12} className="lg:col-span-4"><p className="body-lead text-ivory/60">Her ayrıntıyı tek tek seçin ya da tüm yolculuğu bize bırakın. Program daima size ait.</p></Reveal>
        </div>

        <div>
          {services.map((service, index) => (
            <article key={service.number} className="grid gap-8 border-b border-white/15 py-12 lg:grid-cols-12 lg:items-center lg:py-20">
              <Reveal direction={index % 2 ? 'right' : 'left'} className={`image-frame aspect-[16/11] lg:col-span-7 lg:aspect-[16/10] ${index % 2 ? 'lg:order-2' : ''}`}>
                <Image src={service.image} alt={service.alt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 ease-out hover:scale-[1.025]" />
                <span className="absolute left-5 top-5 border border-white/25 bg-black/30 px-3 py-2 text-[.58rem] font-bold uppercase tracking-[.17em] backdrop-blur-md">{service.label}</span>
              </Reveal>
              <Reveal delay={.12} className={`lg:col-span-5 ${index % 2 ? 'lg:order-1 lg:pr-14' : 'lg:pl-14'}`}>
                <div className="flex items-center gap-4 text-[.62rem] font-bold uppercase tracking-[.18em] text-sand"><span>{service.number}</span><span className="h-px flex-1 bg-white/15" /></div>
                <h3 className="display mt-7 text-[clamp(2.4rem,4vw,4.5rem)] leading-[.95]">{service.title}</h3>
                <p className="mt-6 text-sm leading-7 text-ivory/62 sm:text-base">{service.copy}</p>
                <ul className="mt-7 space-y-3 border-t border-white/15 pt-6">{service.points.map(point => <li key={point} className="flex gap-3 text-sm text-ivory/75"><Check className="mt-1 size-3.5 shrink-0 text-sand" />{point}</li>)}</ul>
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-sand pb-2 text-[.68rem] font-bold uppercase tracking-[.14em] text-sand">Bunu planıma ekle <ArrowUpRight className="size-4" /></a>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
