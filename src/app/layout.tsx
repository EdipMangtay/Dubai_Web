import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Toaster as TravelToaster } from "@/components/ui/sonner";
import RouteTransition from "@/components/RouteTransition";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap", weight: ["400", "500", "600"] });
const body = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.travia.com"),
  title: "Travia Dubai | Size Özel Dubai Deneyimleri",
  description: "Özel araç ve Türkçe rehberli Dubai turları, vize danışmanlığı, çöl safarisi ve yat deneyimleri.",
  keywords: ["Dubai tur", "Dubai vize", "VIP tur Dubai", "Dubai özel tur", "Travia Dubai"],
  openGraph: { title: "Travia Dubai | Size Özel Dubai Deneyimleri", description: "Dubai'yi kendi ritminizde, size özel planlanan ayrıcalıklı deneyimlerle keşfedin.", url: "https://www.travia.com", siteName: "Travia Dubai", locale: "tr_TR", type: "website", images: [{ url: "/images/hero-dubai-enhanced.jpg", width: 1376, height: 768, alt: "Dubai şehir silüeti" }] },
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
    <html suppressHydrationWarning lang="tr" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(!location.hash&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-travia-intro','pending');setTimeout(function(){document.documentElement.removeAttribute('data-travia-intro')},4000)}}catch(e){}})();` }} />
      </head>
      <body>
        <RouteTransition>
          {children}
        </RouteTransition>
        <TravelToaster />
      </body>
    </html>
  );
}
