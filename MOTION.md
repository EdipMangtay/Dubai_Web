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

The 500+ guest statistic counts up once in a fixed-width span. Service durations and availability figures remain static. No custom cursor or continuous decorative particle animation is mounted. The opening canvas runs only during each document’s entrance and releases its frame loop and backing buffer after the sequence.

## Verification

Run `npm run lint`, `npx tsc --noEmit`, `npm run build`, then `npm run dev`.

The production browser run passed 92 checks at 1440, 1280, 1024, 768, 430 and 390 px, with no horizontal overflow, broken images or runtime errors. The desktop and mobile scroll samples measured approximately 60 FPS and CLS 0.

Browser checks and screenshots are in `artifacts/motion-qa/`. Form checks intercept the request locally and do not contact the CRM. Frame timings describe the local browser session, not a guarantee for every device.


## Architectural opening

The existing layout, local fonts, optimized photography and conversion flows are retained. `BrandIntro.tsx` and the pre-paint gate in `src/lib/intro.ts` share the timeline in `src/lib/motion.ts`. The short internal-route motif remains separate.

The full opening is 5.1 seconds on desktop and 4.49 seconds on touch/mobile (12% shorter). Hero content finishes its stagger immediately after the overlay releases. A 5.4 second desktop / 4.75 second mobile absolute timer prevents an unavailable asset or delayed hydration from holding the page.

- 0–420 ms: midnight atmosphere with a faint trace of the same photograph.
- 420–1,350 ms: distant lights emerge at different depths. Two small cached canvas sprites provide soft focus without per-frame blur.
- 1,000–2,430 ms: most lights approach the architectural axis; a small distant group stays nearly still and fades. Seeded delays, drift and acceleration vary their trajectories.
- 950–2,450 ms: one vertical hairline traces the building’s axis.
- 1,250–2,900 ms: a vertical slit grows upward, then opens into a narrow photographic aperture around Burj Khalifa. Its camera settles from scale 1.055 and 8 px vertical offset.
- 2,550–2,850 ms: one restrained 300 ms highlight marks the spire, projected through the responsive photograph crop.
- 2,600–3,200 ms: centered DUBAI letters rise 16 px and settle from wider tracking. The complete wordmark holds until 4,100 ms, with a fine signature rule beneath it.
- 2,900–3,500 ms: the portrait aperture holds with a fine edge, while the photograph settles.
- 3,200–4,200 ms: lights disperse and fade; the canvas frame loop and backing buffers are released.
- 3,500–4,300 ms: the aperture opens to the exact full-screen hero crop, and the edge vignette disappears.
- 4,150–5,220 ms: the same image blends into the hero as the navbar, eyebrow, headline, subtitle, CTA and secondary UI unfold.

Desktop uses 96 lights; touch/mobile uses 40. Low core count, data saving or consistently slow frames reduces this to 32. DPR is capped at 2 on desktop and 1.5 on touch/mobile. No sound, extra animation library, WebGL or persistent decorative particle loop is added.

Reduced motion receives a 1.25 second photograph/wordmark fade, with no canvas, aperture, attraction or camera movement. Wheel, touch movement, a key press, the explore control, orientation change, a hidden document or removal of the canvas releases the full opening immediately. Scroll remains under the visitor's control. Temporary listeners, timers, sprites and RAF are cleaned up; image loading and storage availability never gate the release.

The opening replays on **every full document load and refresh**, including URLs with a section hash. It does not read or write an intro session flag; flags left by previous versions cannot suppress the opening. Native scroll restoration and section hashes are preserved. Internal SPA navigation and history changes retain the existing short route motif and do not replay the full opening. No-JavaScript visitors see the page directly.

## Route motif and contact behavior

`TransitionLink.tsx` preserves Next.js prefetch, modified clicks, new tabs and same-page anchors. For a different pathname, `RouteTransition.tsx` briefly covers the viewport with the thin Burj/DUBAI motif, then reveals the committed route. Browser back/forward uses the same short motif. A bounded release timer prevents a stalled route from leaving an overlay on screen. Reduced motion uses normal navigation.

City / Desert / Coast retain load-aware crossfades (outgoing 1→1.025, incoming 1.06→1), shared easing and subtle tone changes. The existing visual break now features Burj Khalifa with the established 20 px desktop parallax; touch and reduced motion remain static.

All published phone labels and phone field examples are `000 000 00 00`, centralized in `src/lib/constants.ts`. The floating contact panel retains its design and carries the visitor's message to the local contact form, including across experience routes. No telephone or WhatsApp external destination is configured. Form submission still uses the existing server API.

## Photograph

Real Burj Khalifa photography by [Nejc Soklič on Unsplash](https://unsplash.com/photos/burj-khalifa-skyscraper-at-night-with-palm-trees-Cokckb0OSeA), available under the Unsplash license. Local WebP files are 1,800×2,400 (361 KB) and 900×1,200 (91 KB). Source attribution is recorded in `public/images/SOURCES.json`.

The previous site-wide production run passed 92 checks; those results describe the preserved page and contact flows. Current opening reports and sequence frames are generated locally in `artifacts/luxury-intro-qa/` (ignored by Git).
