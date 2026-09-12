import Navbar from '@/components/Navbar';
import HeroSection from '@/components/Hero/HeroSection';
import BrandStats from '@/components/BrandStats';
import About from '@/components/About';
import Services from '@/components/Services';
import TripPlannerWizard from '@/components/planner/TripPlannerWizard';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import Gallery from '@/components/Gallery';
import VisualInterlude from '@/components/VisualInterlude';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import SmoothScroll from '@/components/ui/SmoothScroll';

export default function Home() {
  return (
    <div className="site-shell min-h-screen">
      <SmoothScroll />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <BrandStats />
        <About />
        <Gallery />
        <Services />
        <VisualInterlude />
        <TripPlannerWizard />
        <Process />
        <FAQ />
        <Contact />
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}
