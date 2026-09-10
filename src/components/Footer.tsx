import { ArrowUpRight } from 'lucide-react';
import { CONTACT, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-white/15 bg-canvas">
      <div className="container-wide py-12 sm:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5"><a href="#hero" className="font-serif text-4xl tracking-[.08em]">TRAVIA</a><p className="mt-4 max-w-sm text-sm leading-7 text-ivory/45">Premium access to extraordinary Dubai experiences.</p></div>
          <nav className="md:col-span-3" aria-label="Alt navigasyon"><p className="mb-5 text-[.6rem] font-bold uppercase tracking-[.17em] text-sand">Keşfet</p><ul className="space-y-3">{NAV_LINKS.slice(1).map(link => <li key={link.href}><a href={`/${link.href}`} className="text-sm text-ivory/55 transition-colors hover:text-ivory">{link.label}</a></li>)}</ul></nav>
          <div className="md:col-span-4"><p className="mb-5 text-[.6rem] font-bold uppercase tracking-[.17em] text-sand">Dubai concierge</p><a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-white/20 pb-3 font-serif text-2xl">{CONTACT.phone}<ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a><a href={`mailto:${CONTACT.email}`} className="mt-4 block break-all text-xs text-ivory/48">{CONTACT.email}</a></div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-[.58rem] font-semibold uppercase tracking-[.14em] text-ivory/35 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Travia Dubai</p><p>Dubai · United Arab Emirates</p></div>
      </div>
    </footer>
  );
}
