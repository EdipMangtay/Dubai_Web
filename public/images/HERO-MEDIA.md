# Homepage hero source

The available fallback, `hero-dubai-enhanced.jpg`, is 1376 × 768. It is not a 4K master.

Supply one genuine, licensed, sharply focused source at:

- `apps/website/public/images/travia-dubai-hero-4k.webp` (preferred), or
- `apps/website/public/images/travia-dubai-hero-4k.jpg`.

Use at least 3840 × 2160 pixels, sRGB, approximately 16:9. Preserve the existing Downtown Dubai viewpoint: Burj near the horizontal center, pinnacle near the upper edge with some breathing room, skyline and water reflections below. Keep fine facade detail and natural highlights; do not upscale or add sharpening halos. The mobile crop selects 55% horizontally, tablet 52%, desktop 50%.

Restart development or rebuild production after adding the asset. The Next configuration selects WebP first, then JPEG, otherwise the existing fallback. The first HTML render uses the selected source; no placeholder request or client-side asset discovery delays loading. A failed replacement request falls back to the existing image.

Next Image delivers responsive WebP at quality 85, with eager/high-priority loading. The height-aware `sizes` value preserves source detail in portrait cover crops. Other site images retain their default quality 75. Inspect desktop and mobile framing after replacing the source; the intro's existing skyline landmarks assume this composition.
