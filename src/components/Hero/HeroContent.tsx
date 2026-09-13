import MagneticLink from '../ui/MagneticLink';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function HeroContent() {
  return (
    <div className="hero-copy container-wide">
      <p className="eyebrow hero-enter" style={{ animationDelay: '.1s' }}>
        PRIVATE DUBAI · PERSONALLY CURATED
      </p>
      <h1 id="hero-title" className="display hero-title">
        <span className="hero-line">
          <span className="hero-title-enter" style={{ animationDelay: '.14s' }}>Dubai’yi görmeyin.</span>
        </span>
        <span className="hero-line">
          <em className="hero-title-enter" style={{ animationDelay: '.23s' }}>Onu yaşayın.</em>
        </span>
      </h1>
      <div>
        <p className="hero-description hero-enter" style={{ animationDelay: '.38s' }}>
          Şehrin enerjisinden çölün sessizliğine, denizin özgürlüğünden gecenin ışıklarına.
          <br className="hidden sm:block" /> Sıradan bir rota değil; yalnızca size ait bir Dubai kurgusu.
        </p>
        <div className="hero-actions hero-enter" style={{ animationDelay: '.5s' }}>
          <MagneticLink href="#gallery" className="btn-primary">
            Deneyime girin <ArrowUpRight className="size-4" />
          </MagneticLink>
          <a href="#trip-planner" className="hero-text-link">
            Yolculuğunuzu tasarlayın <ArrowDown className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
