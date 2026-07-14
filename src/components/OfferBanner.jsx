import React, { useState, useEffect, useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OfferBanner() {
  // 1. Countdown Timer Logic (24-hour countdown rolling forward)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to 24h if it reaches zero
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 2. GSAP Parallax Logic for Loop 6 (CTA Section)
  const parallaxBgRef = useRef(null);
  const parallaxSectionRef = useRef(null);
  const ctaTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background scroll
      gsap.fromTo(parallaxBgRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // Text reveal on scroll
      gsap.fromTo(ctaTextRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: parallaxSectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, parallaxSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Loop 5 — Offer Banner */}
      <section className="relative z-10 w-full bg-[#050505] py-24 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mobile-reverse grid grid-cols-1 overflow-hidden rounded-3xl border border-white/5 bg-[#090909]/60 backdrop-blur-xl md:grid-cols-12 hover:border-accent/20 transition-all duration-700 shadow-2xl relative">
            
            {/* Left Content */}
            <div className="flex flex-col justify-between p-8 sm:p-12 md:col-span-7 md:p-16 relative z-20 offer-texts">
              <div>
                <span className="text-[10px] font-black tracking-widest text-accent uppercase block font-mono">
                  // SPECIAL EVENT PROMOTION
                </span>
                
                <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-none tracking-tight text-secondary">
                  RUN FASTER.<br />
                  <span className="text-accent drop-shadow-[0_0_15px_rgba(210,253,9,0.25)]">SAVE BIGGER.</span>
                </h2>
                
                <p className="mt-6 max-w-md text-xs sm:text-sm font-light leading-relaxed text-grayMuted">
                  Unlock unmatched speed and comfort. Order within the next hours to secure a 
                  <span className="text-secondary font-semibold"> 20% discount</span> and free priority shipping.
                </p>
              </div>

              {/* Countdown & CTA */}
              <div className="mt-12 flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-8 items-start">
                
                {/* Countdown display resembling a race-telemetry timer */}
                <div className="flex items-center gap-3">
                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 font-mono text-2xl font-black text-secondary border border-white/5 shadow-inner">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <span className="mt-2 text-[8px] font-black tracking-widest text-grayMuted uppercase font-mono">HR</span>
                  </div>
                  
                  {/* Blinking colon */}
                  <div className="flex flex-col items-center mb-6">
                    <span className="text-2xl font-black text-accent animate-pulse">:</span>
                  </div>

                  {/* Minutes */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 font-mono text-2xl font-black text-secondary border border-white/5 shadow-inner">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <span className="mt-2 text-[8px] font-black tracking-widest text-grayMuted uppercase font-mono">MIN</span>
                  </div>

                  {/* Blinking colon */}
                  <div className="flex flex-col items-center mb-6">
                    <span className="text-2xl font-black text-accent animate-pulse">:</span>
                  </div>

                  {/* Seconds (Highlighted in brand color to emphasize ticking) */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#090909] font-mono text-2xl font-black text-accent border border-accent/20 shadow-[0_0_15px_rgba(210,253,9,0.05)]">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <span className="mt-2 text-[8px] font-black tracking-widest text-grayMuted uppercase font-mono">SEC</span>
                  </div>
                </div>

                {/* Shop Now CTA */}
                <a
                  href="#bestsellers"
                  className="group relative flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:bg-secondary hover:shadow-glow-strong w-fit"
                >
                  Shop Now
                  <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

              </div>
            </div>

            {/* Right Lifestyle Image with slow-zoom hover and seamless directional gradients */}
            <div className="relative min-h-[350px] md:min-h-full overflow-hidden md:col-span-5 select-none z-10">
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#090909] via-[#090909]/40 to-transparent z-20 pointer-events-none" />
              <img
                src="/assets/sprintx_lifestyle.png"
                alt="SprintX Lifestyle Stride"
                className="h-full w-full object-cover transition-transform duration-1000 scale-105 hover:scale-110 relative z-10"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Loop 6 — CTA Section (Parallax Running Track) */}
      <section 
        ref={parallaxSectionRef}
        className="overcome-limits relative z-10 w-full flex items-center justify-center overflow-hidden border-b border-white/5 bg-[#050505] py-24 md:py-32"
      >
        {/* Parallax Background Image */}
        <div 
          ref={parallaxBgRef}
          className="absolute inset-0 -z-10 h-[130%] w-full select-none"
        >
          <div className="absolute inset-0 bg-black/80 z-10" />
          <img
            src="/assets/sprintx_lifestyle.png"
            alt="Parallax background track"
            className="h-full w-full object-cover filter brightness-[0.6] saturate-[0.8]"
          />
        </div>

        {/* Foreground Glassmorphism Content Card */}
        <div 
          ref={ctaTextRef} 
          className="z-10 text-center px-8 py-12 md:py-16 rounded-3xl border border-white/5 bg-[#090909]/45 backdrop-blur-xl max-w-3xl mx-6 flex flex-col items-center shadow-2xl relative"
        >
          {/* Subtle brand color accent background glow */}
          <div className="absolute inset-0 bg-accent/[0.01] rounded-3xl pointer-events-none" />

          <span className="text-[10px] font-black tracking-widest text-accent uppercase mb-4 block font-mono">
            // OVERCOME LIMITS
          </span>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl text-secondary select-none">
            YOUR NEXT RUN<br />
            STARTS <span className="text-accent drop-shadow-[0_0_15px_rgba(210,253,9,0.25)]">TODAY.</span>
          </h2>
          <p className="mt-6 max-w-md text-xs sm:text-sm font-light leading-relaxed text-grayMuted">
            Don't run behind change. Lead it. Engineered to adapt to your running style and push your limits beyond.
          </p>
          <a
            href="#showcase"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:bg-secondary hover:shadow-glow-strong"
          >
            Explore Collection
            <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </>
  );
}
