import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster as TravelToaster } from "@/components/ui/sonner";
import BrandIntro from "@/components/BrandIntro";
import { INTRO_BOOTSTRAP } from "@/lib/intro";
import RouteTransition from "@/components/RouteTransition";
import "./globals.css";

const display = localFont({
  src: [
    { path: './fonts/cormorant-normal-latin.woff2', weight: '300 700', style: 'normal' },
    { path: './fonts/cormorant-italic-latin.woff2', weight: '300 700', style: 'italic' },
  ], variable: '--font-display', display: 'swap', adjustFontFallback: false,
});
const displayExtended = localFont({
  src: [
    { path: './fonts/cormorant-normal-latin-ext.woff2', weight: '300 700', style: 'normal' },
    { path: './fonts/cormorant-italic-latin-ext.woff2', weight: '300 700', style: 'italic' },
  ], variable: '--font-display-ext', display: 'swap', adjustFontFallback: false,
});
const body = localFont({ src: './fonts/manrope-normal-latin.woff2', weight: '200 800', variable: '--font-body', display: 'swap', adjustFontFallback: false });
const bodyExtended = localFont({ src: './fonts/manrope-normal-latin-ext.woff2', weight: '200 800', variable: '--font-body-ext', display: 'swap', adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000"),
  title: "DUBAI | Size Özel Dubai Deneyimleri",
  description: "Özel araç ve Türkçe rehberli Dubai turları, vize danışmanlığı, çöl safarisi ve yat deneyimleri.",
  keywords: ["Dubai tur", "Dubai vize", "VIP tur Dubai", "Dubai özel tur", "DUBAI"],
  openGraph: { title: "DUBAI | Size Özel Dubai Deneyimleri", description: "Dubai'yi kendi ritminizde, size özel planlanan ayrıcalıklı deneyimlerle keşfedin.", siteName: "DUBAI", locale: "tr_TR", type: "website", images: [{ url: "/images/dubai-downtown.webp", width: 2400, height: 1706, alt: "Dubai şehir silüeti" }] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07100f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning lang="tr" className={`${display.variable} ${displayExtended.variable} ${body.variable} ${bodyExtended.variable}`}>
      <head><script id="dubai-intro-gate" dangerouslySetInnerHTML={{ __html: INTRO_BOOTSTRAP }} /></head>
      <body>
        <BrandIntro />
        <a href="#main-content" className="skip-link">İçeriğe geç</a>
        <RouteTransition>
          {children}
        </RouteTransition>
        <TravelToaster />
      </body>
    </html>
  );
}
