import Image from 'next/image';
import ParallaxMedia from './ui/ParallaxMedia';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import TextLines from './ui/TextLines';

export default function VisualInterlude() {
  return (
    <section className="visual-interlude burj-interlude" aria-labelledby="interlude-title">
      <Reveal variant="image" className="absolute inset-0"><ParallaxMedia><Image src="/images/burj-khalifa-night.webp" alt="Palmiyelerin arasından aşağıdan yukarıya yükselen, gece ışıklarıyla Burj Khalifa" fill sizes="100vw" className="object-cover burj-interlude-image" /></ParallaxMedia></Reveal>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,16,15,.78),rgba(7,16,15,.15)_90%)]" />
      <div className="container-wide"><Reveal variant="editorial"><span className="eyebrow text-ivory">Burj Khalifa · Şehrin imzası</span><h2 id="interlude-title" className="display"><TextLines lines={['Bazı anlar', <em key="second">size özel kalmalı.</em>]} /></h2><p>Geriye dönüp baktığınızda yalnızca bir seyahati değil, nasıl hissettiğinizi hatırlayın.</p><a href="#trip-planner" className="btn-quiet mt-8">O anları birlikte planlayalım <ArrowUpRight className="size-4" /></a></Reveal></div>
    </section>
  );
}
