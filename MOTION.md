# DUBAI motion system

The existing DUBAI typography, photography, routes and responsive composition are preserved. Motion uses the existing Framer Motion installation, CSS and IntersectionObserver; no application dependency was added.

- `src/lib/motion.ts`: 280 ms interactions, 480 ms UI transitions, 950 ms reveals, 1,300 ms hero transitions and a 550 ms page entrance. Internal routes use a 180 ms cover and a 300 ms reveal. Shared easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- `src/hooks/useMotionSettings.ts`: shorter timing on small/touch devices; reduced motion uses a 150 ms opacity fallback.
- `src/components/ui/Reveal.tsx` and `TextLines.tsx`: once-only editorial line masks and two controlled image masks. Content remains readable without JavaScript; keyboard focus immediately exposes its reveal boundary.
- `HeroSection.tsx`: load-aware City / Desert / Coast crossfades, restrained image scale, tonal overlays, location text transitions and a moving selection indicator. Hero entrance does not block navigation and does not replay when returning to the home route.
- `ParallaxMedia.tsx`: at most 20 px of vertical movement. Disabled on small/touch devices and with reduced motion.
- `MagneticLink.tsx`: one primary CTA, at most 4 px of pointer movement, disabled on touch/reduced motion. Hover fills and arrows share the same timing scale.
- `Navbar.tsx`: scroll-linked header opacity, 1 px progress, native dialog with a panel mask, staggered links, focus containment, Escape and body scroll lock.
- Contact and planner: focus feedback, loading state, animated success/error feedback, step transitions and progress. Request payloads and pricing calculations are unchanged.
- Experience routes: image mask, naturally wrapping word reveals, metadata and itinerary entrances, booking panel reveal.

The 500+ guest statistic counts up once in a fixed-width span. Service durations and availability figures remain static. No custom cursor or continuous decorative particle animation is mounted. The opening canvas runs once and releases its frame loop and backing buffer after the sequence.

## Verification

Run `npm run lint`, `npx tsc --noEmit`, `npm run build`, then `npm run dev`.

The production browser run passed 92 checks at 1440, 1280, 1024, 768, 430 and 390 px, with no horizontal overflow, broken images or runtime errors. The desktop and mobile scroll samples measured approximately 60 FPS and CLS 0.

Browser checks and screenshots are in `artifacts/motion-qa/`. Form checks intercept the request locally and do not contact the CRM. Frame timings describe the local browser session, not a guarantee for every device.


## Cinematic opening

The existing layout is retained. `BrandIntro.tsx`, `BurjMotif.tsx` and the pre-paint gate in `src/lib/intro.ts` provide a 2.6 second opening (2.8 second absolute release limit):

- 0–200 ms: near-black frame.
- 200–1,400 ms: a seeded canvas field gathers into a slender architectural axis. Desktop uses 108 lights; touch/mobile uses 48. Low core count, data saving or consistently slow frames reduces this to 32. DPR is capped at 2 on desktop and 1.5 on mobile.
- 650–1,900 ms: a thin Burj outline resolves into an upward photographic mask; the image settles from 1.08 to 1.
- 1,400 ms: individual DUBAI letters rise 18 px and settle from wider spacing, using transforms instead of layout animation.
- 1,700–2,300 ms: the lights drift gently out and fade.
- 1,550–2,750 ms: the header, heading, description and CTA unfold as the opening blends into the same photograph and crop used by the City hero.

The animation does not wait on image decoding or hydration. Wheel, touch movement, a key press or the small explore control releases it immediately. Reduced motion and direct section links bypass it. Missing images, slow requests and unavailable storage cannot trap the visitor behind the opening. At completion the RAF, temporary listeners and timers are removed and the canvas buffer is reduced to 1×1.

The first full opening is saved once per tab in `sessionStorage`. Internal routes and refreshes do not repeat it. To replay during development, run this in the site's browser console:

```js
sessionStorage.removeItem('dubai:intro-seen:v1');
location.pathname === '/' && !location.hash ? location.reload() : location.assign('/');
```

## Route motif and contact behavior

`TransitionLink.tsx` preserves Next.js prefetch, modified clicks, new tabs and same-page anchors. For a different pathname, `RouteTransition.tsx` briefly covers the viewport with the thin Burj/DUBAI motif, then reveals the committed route. Browser back/forward uses the same short motif. A bounded release timer prevents a stalled route from leaving an overlay on screen. Reduced motion uses normal navigation.

City / Desert / Coast retain load-aware crossfades (outgoing 1→1.025, incoming 1.06→1), shared easing and subtle tone changes. The existing visual break now features Burj Khalifa with the established 20 px desktop parallax; touch and reduced motion remain static.

All published phone labels and phone field examples are `000 000 00 00`, centralized in `src/lib/constants.ts`. The floating contact panel retains its design and carries the visitor's message to the local contact form, including across experience routes. No telephone or WhatsApp external destination is configured. Form submission still uses the existing server API.

## Photograph

Real Burj Khalifa photography by [Nejc Soklič on Unsplash](https://unsplash.com/photos/burj-khalifa-skyscraper-at-night-with-palm-trees-Cokckb0OSeA), available under the Unsplash license. Local WebP files are 1,800×2,400 (361 KB) and 900×1,200 (91 KB). Source attribution is recorded in `public/images/SOURCES.json`.

The intro browser run passed 73 checks across the six target widths. It verified star convergence/count, responsive matching crops, approximately 2.6–2.7 second completion, buffer cleanup, refresh and history behavior, contact draft transfer and fallback behavior. Results and sequence frames are in `artifacts/intro-qa/`. Runtime/hydration errors, failed asset requests and horizontal overflow were zero in normal browser runs; image failures were intentionally simulated only in the fallback test.

Nine final polish checks also passed: short portrait/landscape crops, a 4× CPU slowdown with 32 lights, and a measured 527 ms route transition. See `artifacts/intro-qa/final-polish.json`.
