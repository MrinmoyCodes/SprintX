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
      <section className="relative z-10 w-full bg-[#050505] py-20 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-white/5 bg-[#0A0A0A] md:grid-cols-12">
            
            {/* Left Content */}
            <div className="flex flex-col justify-between p-8 sm:p-12 md:col-span-7 md:p-16">
              <div>
                <span className="text-[10px] font-black tracking-widest text-accent uppercase">
                  LIMITED TIME OFFER
                </span>
                
                <h2 className="mt-4 text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl text-secondary">
                  RUN FASTER.<br />
                  <span className="text-accent">SAVE BIGGER.</span>
                </h2>
                
                <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-grayMuted">
                  Unlock unmatched speed and comfort. Order within the next hours to secure a 
                  <span className="text-secondary font-semibold"> 20% discount</span> and free priority shipping.
                </p>
              </div>

              {/* Countdown & CTA */}
              <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                
                {/* Countdown display */}
                <div className="flex gap-4">
                  {[
                    { label: 'HR', val: timeLeft.hours },
                    { label: 'MIN', val: timeLeft.minutes },
                    { label: 'SEC', val: timeLeft.seconds },
                  ].map((unit, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 font-heading text-2xl font-black text-secondary border border-white/5 shadow-inner">
                        {String(unit.val).padStart(2, '0')}
                      </div>
                      <span className="mt-1.5 text-[9px] font-black tracking-wider text-grayMuted">{unit.label}</span>
                    </div>
                  ))}
                </div>

                {/* Shop Now CTA */}
                <a
                  href="#bestsellers"
                  className="group relative flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:bg-secondary hover:shadow-glow-strong"
                >
                  Shop Now
                  <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

              </div>
            </div>

            {/* Right Lifestyle Image with slow-zoom hover */}
            <div className="relative min-h-[300px] overflow-hidden md:col-span-5 select-none">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent z-10 pointer-events-none" />
              <img
                src="/assets/sprintx_lifestyle.png"
                alt="SprintX Lifestyle Stride"
                className="h-full w-full object-cover transition-transform duration-1000 scale-105 hover:scale-110"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Loop 6 — CTA Section (Parallax Running Track) */}
      <section 
        ref={parallaxSectionRef}
        className="relative z-10 flex h-[60vh] min-h-[450px] w-full items-center justify-center overflow-hidden border-b border-white/5 bg-primary"
      >
        {/* Parallax Background Image */}
        <div 
          ref={parallaxBgRef}
          className="absolute inset-0 -z-10 h-[130%] w-full select-none"
        >
          <div className="absolute inset-0 bg-black/75 z-10" />
          <img
            src="/assets/sprintx_lifestyle.png"
            alt="Parallax background track"
            className="h-full w-full object-cover filter brightness-[0.7] saturate-[0.8]"
          />
        </div>

        {/* Foreground Content */}
        <div ref={ctaTextRef} className="z-10 text-center px-6 max-w-4xl flex flex-col items-center">
          <span className="text-[10px] font-black tracking-widest text-accent uppercase mb-4">
            UNLEASH YOUR POTENTIAL
          </span>
          <h2 className="text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl text-secondary select-none">
            YOUR NEXT RUN<br />
            STARTS <span className="text-accent">TODAY.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-grayMuted sm:text-base">
            Don't run behind change. Lead it. Engineered to adapt to your style and push boundaries.
          </p>
          <a
            href="#showcase"
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-accent shadow-glow transition-all duration-300 hover:border-accent hover:bg-accent hover:text-primary hover:shadow-glow-strong"
          >
            Explore Collection
            <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </>
  );
}
