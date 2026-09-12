import MagneticLink from '../ui/MagneticLink';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function HeroContent() {
  return (
    <div className="hero-copy container-wide">
      <p className="eyebrow hero-enter" style={{ animationDelay: '.1s' }}>Olağanüstü bir şehir. Size özel bir yolculuk.</p>
      <h1 id="hero-title" className="display hero-title">
        <span className="hero-line"><span className="hero-title-enter" style={{ animationDelay: '.14s' }}>Şehrin ötesinde,</span></span>
        <span className="hero-line"><em className="hero-title-enter" style={{ animationDelay: '.23s' }}>size ait bir Dubai.</em></span>
      </h1>
      <div>
        <p className="hero-description hero-enter" style={{ animationDelay: '.38s' }}>Şehrin enerjisi, çölün sessizliği, denizin özgürlüğü.<br className="hidden sm:block" /> Her anı sizin için düşünülmüş bir yolculuk.</p>
        <div className="hero-actions hero-enter" style={{ animationDelay: '.5s' }}>
          <MagneticLink href="#gallery" className="btn-primary">Dubai’yi keşfedin <ArrowUpRight className="size-4" /></MagneticLink>
          <a href="#trip-planner" className="hero-text-link">Yolculuğunuzu tasarlayın <ArrowDown className="size-4" /></a>
        </div>
      </div>
    </div>
  );
}
