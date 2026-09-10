import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

// Resolve before rendering: no client-side probing or delayed LCP image swap.
const heroImage = [
  "/images/travia-dubai-hero-4k.webp",
  "/images/travia-dubai-hero-4k.jpg",
].find((asset) => existsSync(join(__dirname, "public", asset)))
  ?? "/images/travia-hero-v3.jpg";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_TRAVIA_HERO_IMAGE: heroImage },
  images: { qualities: [75, 85] },
};

export default nextConfig;
