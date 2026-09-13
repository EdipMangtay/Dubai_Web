import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MOTION } from '@/lib/motion';

export default function BrandIntro() {
  return (
    <section id="brand-intro" className="brand-intro" aria-label="DUBAI karşılama"
      style={Object.fromEntries(Object.entries(MOTION.intro).map(([key, value]) => [`--intro-${key}`, key === 'mobileFactor' ? value : `${value}s`])) as CSSProperties}>
      <div className="intro-atmosphere" aria-hidden="true" />
      <div className="intro-image-mask" aria-hidden="true"><div className="intro-image" /></div>
      <div className="intro-shade" aria-hidden="true" />
      <div className="intro-trace" aria-hidden="true" />
      <div className="intro-aperture-guide" aria-hidden="true" />
      <div className="intro-vignette" aria-hidden="true" />
      <canvas suppressHydrationWarning id="intro-lights" className="intro-lights" aria-hidden="true" />
      <div className="intro-bottom">
        <div className="intro-wordmark-mask">
          <span className="intro-wordmark" aria-label="DUBAI">{'DUBAI'.split('').map((letter, index) => <span key={index} aria-hidden="true" style={{ '--letter-index': index, '--letter-offset': index - 2 } as CSSProperties}>{letter}</span>)}</span>
        </div>
        <span className="intro-signature" aria-hidden="true" />
      </div>
      <span className="intro-location" aria-hidden="true">Burj Khalifa</span>
      <button type="button" className="intro-skip" aria-label="İntroyu geç">Keşfet <ArrowUpRight className="size-3" aria-hidden="true" /></button>
    </section>
  );
}
