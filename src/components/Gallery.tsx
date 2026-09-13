'use client';

import Image from 'next/image';
import Link from '@/components/ui/TransitionLink';
import { ArrowUpRight } from 'lucide-react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const moments = [
  {
    src: '/images/dubai-city.webp',
    title: 'Above the city.',
    category: 'CITY',
    meta: 'Downtown Dubai',
    href: '/experiences/helicopter-tour',
    alt: 'Gün batımı ışığında Burj Khalifa ve Downtown Dubai',
    copy: 'See the city from the perspective reserved for the unforgettable.',
  },
  {
    src: '/images/dubai-desert.webp',
    title: 'Beyond time.',
    category: 'DESERT',
    meta: 'Arabian Desert',
    href: '/experiences/desert-safari',
    alt: 'Güneşin sıcak ışıklarıyla aydınlanan kızıl kum tepeleri',
    copy: 'Leave the skyline behind and enter a landscape that moves at another rhythm.',
  },
  {
    src: '/images/dubai-marina.webp',
    title: 'Into the blue.',
    category: 'COAST',
    meta: 'Dubai Marina',
    href: '/experiences/yacht-sunset',
    alt: 'Dubai Marina silüeti önünde seyreden yatlar',
    copy: 'A private horizon, a changing skyline and a route defined entirely by you.',
  },
  {
    src: '/images/dubai-architecture.webp',
    title: 'Future, built.',
    category: 'DESIGN',
    meta: 'Dubai Architecture',
    href: '/experiences/helicopter-tour',
    alt: 'Dubai modern mimarisi',
    copy: 'Architecture becomes atmosphere when the city itself is part of the experience.',
  },
  {
    src: '/images/dubai-resort.webp',
    title: 'Stay exceptional.',
    category: 'ESCAPE',
    meta: 'Private Dubai',
    href: '/experiences/yacht-sunset',
    alt: 'Dubai lüks resort deneyimi',
    copy: 'Quiet luxury, considered details and a Dubai designed around your pace.',
  },
];

function FlyCard({
  item,
  index,
  progress,
}: {
  item: (typeof moments)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const count = moments.length;
  const center = (index + 0.5) / count;
  const spread = 0.72 / count;

  const z = useTransform(
    progress,
    [center - spread * 2.25, center, center + spread * 2.25],
    [-1050, 30, 720],
  );
  const y = useTransform(
    progress,
    [center - spread * 2.25, center, center + spread * 2.25],
    [170, 0, -120],
  );
  const rotateX = useTransform(
    progress,
    [center - spread * 2.25, center, center + spread * 2.25],
    [13, 0, -7],
  );
  const rotateY = useTransform(
    progress,
    [center - spread * 2.25, center, center + spread * 2.25],
    [index % 2 ? 8 : -8, 0, index % 2 ? -3 : 3],
  );
  const opacity = useTransform(
    progress,
    [center - spread * 2.5, center - spread, center + spread * 1.5, center + spread * 2.5],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    progress,
    [center - spread * 2.25, center, center + spread * 2.25],
    [0.72, 1, 1.12],
  );
  const blur = useTransform(
    progress,
    [center - spread * 2.4, center - spread, center + spread * 1.45, center + spread * 2.4],
    [12, 0, 0, 9],
  );
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.article
      className="absolute left-1/2 top-1/2 w-[min(74vw,900px)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{ z, y, rotateX, rotateY, opacity, scale, filter, transformStyle: 'preserve-3d' }}
    >
      <Link href={item.href} className="group block" aria-label={`${item.title} — ${item.meta}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-[#07100f] shadow-[0_40px_100px_rgba(0,0,0,.48)] ring-1 ring-white/15">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 767px) 88vw, 74vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 md:p-8">
            <div>
              <p className="mb-3 text-[9px] font-semibold tracking-[.28em] text-[#d2b98c] md:text-[10px]">
                0{index + 1} / {item.category} · {item.meta}
              </p>
              <h3 className="font-serif text-[clamp(2.2rem,5vw,5.4rem)] font-normal leading-[.86] tracking-[-.04em] text-[#f4f0e7]">
                {item.title}
              </h3>
            </div>
            <span className="grid size-11 shrink-0 place-items-center border border-white/30 text-white transition-all duration-300 group-hover:border-[#d2b98c] group-hover:bg-[#d2b98c] group-hover:text-[#07100f] md:size-14">
              <ArrowUpRight className="size-4 md:size-5" />
            </span>
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-xl text-center text-xs leading-6 text-white/55 md:text-sm md:leading-7">
          {item.copy}
        </p>
      </Link>
    </motion.article>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.18], [0, -90]);
  const counter = useTransform(scrollYProgress, [0, 1], ['00%', '100%']);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative h-[500vh] bg-[#050908] text-[#f4f0e7]"
      aria-labelledby="gallery-title"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[.17] [background-image:radial-gradient(circle_at_50%_35%,#d2b98c_0,transparent_28%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,8,.35),rgba(5,9,8,.04)_40%,rgba(5,9,8,.62))]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-[var(--gutter)] pt-24 text-[9px] font-semibold tracking-[.25em] text-white/40 md:text-[10px]">
          <span>CURATED DUBAI / 2026</span>
          <motion.span>{counter}</motion.span>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[18vh] z-20 mx-auto max-w-6xl px-[var(--gutter)] text-center"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <p className="mb-6 text-[10px] font-semibold tracking-[.3em] text-[#d2b98c]">SCROLL TO ENTER</p>
          <h2 id="gallery-title" className="font-serif text-[clamp(3.4rem,8vw,8.8rem)] font-normal leading-[.78] tracking-[-.055em]">
            Dubai,
            <br />
            <em className="font-light text-[#d8c7a7]">in motion.</em>
          </h2>
          <p className="mx-auto mt-8 max-w-md text-xs leading-6 text-white/50 md:text-sm">
            Kaydırın. Şehrin, çölün ve kıyının içinden geçin. Yukarı kaydırdığınızda yolculuk geri sarılır.
          </p>
        </motion.div>

        <div
          className="absolute inset-0 [perspective:1500px]"
          style={{ perspectiveOrigin: '50% 48%' }}
          aria-label="Dubai deneyimleri"
        >
          {moments.map((item, index) => (
            <FlyCard key={item.category} item={item} index={index} progress={scrollYProgress} />
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-7 left-[var(--gutter)] z-30 flex items-center gap-4 text-[9px] font-semibold tracking-[.22em] text-white/40">
          <span className="block h-px w-10 bg-white/30" />
          SCROLL / REWIND
        </div>
      </div>
    </section>
  );
}
