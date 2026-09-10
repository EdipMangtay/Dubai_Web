import { STATS } from '@/lib/constants';

export default function BrandStats() {
  return (
    <section className="border-y border-white/15 bg-canvas" aria-label="Travia hizmet bilgileri">
      <div className="container-wide grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, index) => (
          <div key={stat.label} className={`relative py-8 md:py-11 ${index % 2 ? 'border-l border-white/15 pl-6' : ''} ${index > 1 ? 'border-t border-white/15 lg:border-t-0' : ''} lg:border-l lg:pl-8 lg:first:border-l-0`}>
            <span className="font-serif text-[clamp(2.2rem,4vw,4rem)] leading-none text-ivory tabular-nums">{stat.value}{stat.suffix}</span>
            <p className="mt-3 text-[.62rem] font-bold uppercase tracking-[.17em] text-mist">{stat.label}</p>
            <span className="absolute right-4 top-4 text-[.55rem] text-sand/70">0{index + 1}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
