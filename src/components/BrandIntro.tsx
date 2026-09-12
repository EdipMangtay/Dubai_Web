import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MOTION } from '@/lib/motion';
import BurjMotif from './ui/BurjMotif';

export default function BrandIntro() {
  return (
    <section id="brand-intro" className="brand-intro" aria-label="DUBAI karşılama"
      style={{ '--intro-duration': `${MOTION.intro.duration}s` } as CSSProperties}>
      <div className="intro-image-mask" aria-hidden="true"><div className="intro-image" /></div>
      <div className="intro-shade" aria-hidden="true" />
      <BurjMotif className="intro-burj-edge" />
      <canvas suppressHydrationWarning id="intro-lights" className="intro-lights" aria-hidden="true" />
      <div className="intro-bottom">
        <div className="intro-wordmark-mask">
          <span className="intro-wordmark" aria-label="DUBAI">{'DUBAI'.split('').map((letter, index) => <span key={index} aria-hidden="true" style={{ '--letter-index': index, '--letter-offset': index - 2 } as CSSProperties}>{letter}</span>)}</span>
        </div>
        <button type="button" className="intro-skip" aria-label="İntroyu geç">Keşfet <ArrowUpRight className="size-4" aria-hidden="true" /></button>
      </div>
    </section>
  );
}
