import Image from 'next/image';
import styles from './intro.module.css';

export const HERO_IMAGE = process.env.NEXT_PUBLIC_TRAVIA_HERO_IMAGE ?? '/images/travia-hero-v3.jpg';

export function SceneImage({ src, hero = false }: { src: string; hero?: boolean }) {
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes={hero ? '(min-width: 2560px) 2560px, (min-width: 1920px) 1920px, (min-width: 1280px) 1440px, 100vw' : '100vw'}
      quality={hero ? 85 : 75}
      loading="eager"
      className={styles.image}
    />
  );
}

export function DubaiStage() {
  return (
    <div className={styles.dubai} data-dubai>
      <div className={styles.layer} data-city>
        <SceneImage src={HERO_IMAGE} hero />
      </div>
      <div className={styles.atmosphere} data-atmosphere />
      <div className={styles.vignette} />
      <div className={styles.caption} data-city-caption>
        <small>25.2048° N · 55.2708° E</small>
        <p>A world apart.</p>
      </div>
    </div>
  );
}

export function PhoneStage() {
  return (
    <div className={styles.phonePosition} data-phone-position>
      <div className={styles.phone} data-phone>
        <div className={styles.screen}>
          <div className={styles.island} />
          <div className={styles.phoneHeader}>
            <span>TRAVIA</span>
            <span>✳</span>
          </div>
          <small className={styles.phoneEyebrow}>YOUR PRIVATE TRAVEL STUDIO</small>
          <h2>
            Discover<br />
            <em>Dubai.</em>
          </h2>
          <div className={styles.yachtSlot} data-yacht-slot>
            <div className={styles.yacht} data-yacht>
              <SceneImage src="/images/luxury-yacht.jpg" />
              <div className={styles.cardLabel} data-card-label>
                <small>THE ARABIAN GULF</small>
                <span>
                  Private yacht <b>↗</b>
                </span>
              </div>
              <span className={styles.selection} data-selection />
            </div>
          </div>
          <div className={styles.miniRow}>
            <div>
              <Image src="/images/desert-safari.jpg" alt="" fill sizes="160px" />
              <span>Desert Safari</span>
            </div>
            <div>
              <Image src="/images/vip-chauffeur.jpg" alt="" fill sizes="160px" />
              <span>VIP Chauffeur</span>
            </div>
          </div>
          <div className={styles.phoneFooter}>
            <span>Experiences</span>
            <span>Concierge ↗</span>
          </div>
          <div className={styles.homeIndicator} />
        </div>
      </div>
    </div>
  );
}

export function BrandReveal() {
  return (
    <div className={styles.brand} data-brand>
      <div className={styles.aura} data-brand-aura />
      <div className={styles.wordmark} data-wordmark>TRAVIA</div>
      <span className={styles.city} data-brand-city>DUBAI</span>
    </div>
  );
}
