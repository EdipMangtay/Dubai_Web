import Link from '@/components/ui/TransitionLink';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT, NAV_LINKS } from '@/lib/constants';
import BrandMark from './ui/BrandMark';
import Reveal from './ui/Reveal';

export default function Footer() {
  return (
    <footer className="site-footer border-t border-white/15 bg-canvas">
      <div className="container-wide pt-14 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5"><p className="eyebrow">Her yolculuk bir hikâye.</p><p className="mt-5 max-w-sm font-serif text-3xl leading-tight text-ivory/85">Sizinkini birlikte<br /><em>yazalım.</em></p></div>
          <nav className="md:col-span-3" aria-label="Alt navigasyon"><p className="mb-5 text-[.6rem] font-bold uppercase tracking-[.17em] text-sand">Keşfet</p><ul className="space-y-3">{NAV_LINKS.slice(1).map(link => <li key={link.href}><Link href={`/${link.href}`} className="text-sm text-ivory/65 transition-colors hover:text-ivory">{link.label}</Link></li>)}</ul></nav>
          <div className="md:col-span-4"><p className="mb-5 text-[.6rem] font-bold uppercase tracking-[.17em] text-sand">Kişisel seyahat danışmanınız</p><Link href={CONTACT.contactHref} className="group flex items-center justify-between border-b border-white/20 pb-3 font-serif text-2xl">{CONTACT.phone}<ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link><p className="mt-4 text-xs text-ivory/55">Örnek numara · İletişim formunu kullanın.</p>{CONTACT.email && <a href={`mailto:${CONTACT.email}`} className="mt-4 block break-all text-xs text-ivory/65">{CONTACT.email}</a>}</div>
        </div>
        <Reveal variant="editorial"><Link href="/#hero" aria-label="DUBAI ana sayfa" className="footer-wordmark"><span className="text-mask"><span className="text-mask-inner"><BrandMark /></span></span></Link></Reveal>
        <div className="flex flex-col gap-3 border-t border-white/15 py-6 text-[.58rem] font-semibold uppercase tracking-[.14em] text-ivory/55 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} DUBAI</p><p>Özenle planlandı. Sizin için.</p><p>United Arab Emirates</p></div>
      </div>
    </footer>
  );
}
