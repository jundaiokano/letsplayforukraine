import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import StorySection from '@/components/sections/StorySection';
import ProjectSection from '@/components/sections/ProjectSection';
import ImpactSection from '@/components/sections/ImpactSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';

/*
 * DESIGN SYSTEM: "Hiroshima Dawn" - Poetic Naturalism
 * 
 * This website tells the story of Let's Pray / Play for Peace,
 * a charity concert series founded by young musicians from Hiroshima.
 * 
 * Visual Theme:
 * - Dawn gradient (pale pink to soft blue) symbolizing hope
 * - Warm stone and forest tones for grounding
 * - Soft gold accents representing the eternal flame
 * - Generous whitespace and elegant typography
 * 
 * Typography:
 * - Headlines: Shippori Mincho (JP) / Libre Baskerville (EN)
 * - Body: Noto Sans JP
 */

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <StorySection />
        <ProjectSection />
        <ImpactSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
