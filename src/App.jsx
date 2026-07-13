import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import OfferMarquee from './components/OfferMarquee';
import FeatureStory from './components/FeatureStory';
import OfferBanner from './components/OfferBanner';
import ProductShowcase from './components/ProductShowcase';
import BestSellers from './components/BestSellers';
import FooterAndFaq from './components/FooterAndFaq';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const glowRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Momentum Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Mouse-Following Glow Cursor Light (60 FPS hardware accelerated)
    const handleMouseMove = (e) => {
      if (!glowRef.current) return;
      gsap.to(glowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3. Accessibility Check: Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreference = (e) => {
      if (e.matches) {
        // Disable ScrollTrigger animations for accessibility
        ScrollTrigger.getAll().forEach((trigger) => trigger.disable());
      } else {
        ScrollTrigger.getAll().forEach((trigger) => trigger.enable());
      }
    };

    // Run initially
    handleMotionPreference(prefersReducedMotion);
    prefersReducedMotion.addEventListener('change', handleMotionPreference);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
      prefersReducedMotion.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-primary overflow-x-hidden selection:bg-accent selection:text-primary">
      {/* 1. Global Subtle Noise Grain Overlay */}
      <div className="grain-overlay" />

      {/* 2. Global Mouse-Following Glow Spot */}
      <div 
        ref={glowRef}
        className="pointer-events-none fixed -left-32 -top-32 z-50 h-64 w-64 rounded-full bg-accent/[0.04] blur-[80px]"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />

      {/* 3. Global Futuristic Background Grid Overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 4. Page Layout Sections (Loops 1 - 13) */}
      <Navbar />
      <Hero />
      <TrustBar />
      <OfferMarquee />
      <FeatureStory />
      <OfferBanner />
      <ProductShowcase />
      <BestSellers />
      <FooterAndFaq />
    </div>
  );
}
