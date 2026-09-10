import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

// Resolve before rendering: no client-side probing or delayed LCP image swap.
// Use process.cwd() instead of __dirname for Vercel compatibility.
const projectRoot = process.cwd();
const heroImage = [
  "/images/travia-dubai-hero-4k.webp",
  "/images/travia-dubai-hero-4k.jpg",
].find((asset) => existsSync(join(projectRoot, "public", asset)))
  ?? "/images/travia-hero-v3.jpg";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_TRAVIA_HERO_IMAGE: heroImage },
  images: { qualities: [75, 85] },
  // Vercel deployment optimizations
  output: undefined, // Let Vercel auto-detect
};

export default nextConfig;
