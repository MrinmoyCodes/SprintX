import React, { useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiInfo } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const shoeContainerRef = useRef(null);
  const shoeImgRef = useRef(null);
  const hudCircleRef = useRef(null);

  // Tech label references
  const label1Ref = useRef(null);
  const label2Ref = useRef(null);
  const label3Ref = useRef(null);
  const label4Ref = useRef(null);

  // Radar hotspots references
  const hotspot1Ref = useRef(null);
  const hotspot2Ref = useRef(null);
  const hotspot3Ref = useRef(null);
  const hotspot4Ref = useRef(null);

  // SVG Connector line references
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);

  // Stats text counters
  const stat1ValRef = useRef(null);
  const stat2ValRef = useRef(null);
  const stat3ValRef = useRef(null);

  // Hover states to trigger highlights
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animations
      const tl = gsap.timeline();
      
      tl.fromTo([title1Ref.current, title2Ref.current], 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
      );
      
      tl.fromTo(descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.7'
      );
      
      tl.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.5'
      );

      // Rotating background HUD circle
      gsap.to(hudCircleRef.current, {
        rotate: 360,
        duration: 25,
        repeat: -1,
        ease: 'none'
      });

      // Idle float for shoe container
      gsap.to(shoeContainerRef.current, {
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 2. Exploded View ScrollTrigger Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=160%',
          scrub: 1.5,
          pin: true,
          anticipatePin: 1
        }
      });

      // Scale up HUD Circle
      scrollTl.to(hudCircleRef.current, {
        scale: 1.2,
        opacity: 0.2,
        duration: 2,
        ease: 'power1.inOut'
      }, 'explode');

      // Tilt and scale the intact shoe
      scrollTl.to(shoeImgRef.current, {
        scale: 1.08,
        rotate: -8,
        x: 10,
        duration: 2,
        ease: 'power1.inOut'
      }, 'explode');

      // Set up drawing of connector lines (strokeDashoffset animation)
      const lineRefs = [line1Ref, line2Ref, line3Ref, line4Ref];
      lineRefs.forEach((ref) => {
        if (!ref.current) return;
        const length = ref.current.getTotalLength();
        gsap.set(ref.current, { strokeDasharray: length, strokeDashoffset: length });
        scrollTl.to(ref.current, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power1.inOut'
        }, 'explode+=0.2');
      });

      // Fade-in of circular hotspots
      scrollTl.to([
        hotspot1Ref.current,
        hotspot2Ref.current,
        hotspot3Ref.current,
        hotspot4Ref.current
      ], {
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 1.2,
        ease: 'back.out(1.7)'
      }, 'explode+=0.3');

      // Staggered fade-in of external labels
      scrollTl.to([
        label1Ref.current, 
        label2Ref.current, 
        label3Ref.current, 
        label4Ref.current
      ], {
        opacity: 1,
        scale: 1,
        x: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: 'power3.out'
      }, 'explode+=0.4');

      // Scroll-triggered telemetry number counters
      const animateStat = (ref, target) => {
        scrollTl.fromTo(ref.current, 
          { textContent: 0 },
          { 
            textContent: target, 
            snap: { textContent: 1 }, 
            duration: 1.5,
            ease: 'power2.out'
          }, 
          'explode+=0.3'
        );
      };

      animateStat(stat1ValRef, 180);
      animateStat(stat2ValRef, 89);
      animateStat(stat3ValRef, 4);

      // Section color transition to dark lab green
      scrollTl.to(containerRef.current, {
        backgroundColor: '#040803',
        duration: 2.2,
        ease: 'power2.inOut'
      }, 'explode');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-bgDark pt-20"
      id="hero"
    >
      {/* Background Neon Gradients */}
      <div className="absolute top-1/4 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[180px]" />
      <div className="absolute bottom-10 left-10 -z-10 h-[300px] w-[300px] rounded-full bg-white/5 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-7xl px-6 md:px-8 grid-cols-1 md:grid-cols-12 items-center gap-12 py-12">
        
        {/* Left: Campaign Copy & Telemetry Readout */}
        <div className="z-10 md:col-span-6 text-left flex flex-col justify-center">
          <div className="overflow-hidden mb-1">
            <h1 
              ref={title1Ref} 
              className="text-6xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl text-secondary"
            >
              SPEED REFINED.
            </h1>
          </div>
          <div className="overflow-hidden mb-6">
            <h1 
              ref={title2Ref} 
              className="text-6xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl text-accent"
            >
              POWER UNLEASHED.
            </h1>
          </div>
          
          <p 
            ref={descRef} 
            className="max-w-md text-sm leading-relaxed text-grayMuted sm:text-base mb-8 font-light"
          >
            Introducing the <span className="text-secondary font-semibold">SprintX Alpha</span>. 
            Engineered with a responsive active carbon propulsion plate, 3D knitted breathable shield mesh, 
            and reactive nitrogen-infused cushioning. Built for runners who demand velocity.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <a
              href="#bestsellers"
              className="group relative inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:bg-secondary hover:text-primary hover:shadow-glow-strong"
            >
              Pre-Order Now
              <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Micro Telemetry Panel */}
            <div className="flex gap-6 border-l border-white/10 pl-6">
              <div>
                <div className="font-heading text-lg text-secondary flex items-baseline">
                  <span ref={stat1ValRef}>0</span><span className="text-accent text-xs ml-0.5">g</span>
                </div>
                <span className="text-[9px] font-bold text-grayMuted uppercase tracking-wider">Weight</span>
              </div>
              <div>
                <div className="font-heading text-lg text-secondary flex items-baseline">
                  <span ref={stat2ValRef}>0</span><span className="text-accent text-xs ml-0.5">%</span>
                </div>
                <span className="text-[9px] font-bold text-grayMuted uppercase tracking-wider">Energy Return</span>
              </div>
              <div>
                <div className="font-heading text-lg text-secondary flex items-baseline">
                  <span ref={stat3ValRef}>0</span><span className="text-accent text-xs ml-0.5">N</span>
                </div>
                <span className="text-[9px] font-bold text-grayMuted uppercase tracking-wider">Propulsion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Exploding Product Visualizer & HUD Overlay */}
        <div className="relative md:col-span-6 flex h-[400px] md:h-[600px] w-full items-center justify-center">
          
          {/* Rotating Vector HUD Circle behind shoe */}
          <svg 
            ref={hudCircleRef}
            className="absolute h-[350px] w-[350px] sm:h-[480px] sm:w-[480px] text-accent/15 pointer-events-none select-none z-0"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
            <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.3" />
            <path d="M 10,100 L 20,100 M 180,100 L 190,100 M 100,10 L 100,20 M 100,180 L 100,190" stroke="currentColor" strokeWidth="0.5" />
            <text x="100" y="32" fontSize="5" fill="currentColor" textAnchor="middle" letterSpacing="1" className="font-bold">TELEMETRY SYSTEM V.1</text>
          </svg>

          {/* Main Shoe Exploded Elements Container */}
          <div ref={shoeContainerRef} className="relative w-[320px] h-[200px] sm:w-[460px] sm:h-[287px] z-10 flex items-center justify-center">
            
            {/* The Intact Shoe Image */}
            <div 
              ref={shoeImgRef}
              className="relative w-full h-full select-none transition-all duration-500 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.55)]"
            >
              <img 
                src="/assets/sprintx_alpha_main_clean.png" 
                alt="SprintX Alpha Elite" 
                className="h-full w-full object-contain"
              />
            </div>

            {/* Pulsing circular hotspots over key tech spots (rendered above SVG overlay) */}
            {/* Hotspot 1: Upper (Mesh) */}
            <div 
              ref={hotspot1Ref}
              onMouseEnter={() => setActiveFeature('upper')}
              onMouseLeave={() => setActiveFeature(null)}
              className="absolute top-[45%] left-[32%] h-5 w-5 rounded-full bg-accent flex items-center justify-center opacity-0 scale-50 transition-all duration-300 cursor-pointer z-40 pointer-events-auto"
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping pointer-events-none" />
              <div className="h-2 w-2 rounded-full bg-primary pointer-events-none" />
            </div>

            {/* Hotspot 2: Carbon Inlay */}
            <div 
              ref={hotspot2Ref}
              onMouseEnter={() => setActiveFeature('carbon')}
              onMouseLeave={() => setActiveFeature(null)}
              className="absolute top-[58%] left-[52%] h-5 w-5 rounded-full bg-accent flex items-center justify-center opacity-0 scale-50 transition-all duration-300 cursor-pointer z-40 pointer-events-auto"
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping pointer-events-none" />
              <div className="h-2 w-2 rounded-full bg-primary pointer-events-none" />
            </div>

            {/* Hotspot 3: Cushioning */}
            <div 
              ref={hotspot3Ref}
              onMouseEnter={() => setActiveFeature('midsole')}
              onMouseLeave={() => setActiveFeature(null)}
              className="absolute top-[48%] left-[72%] h-5 w-5 rounded-full bg-accent flex items-center justify-center opacity-0 scale-50 transition-all duration-300 cursor-pointer z-40 pointer-events-auto"
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping pointer-events-none" />
              <div className="h-2 w-2 rounded-full bg-primary pointer-events-none" />
            </div>

            {/* Hotspot 4: Outsole Tread */}
            <div 
              ref={hotspot4Ref}
              onMouseEnter={() => setActiveFeature('outsole')}
              onMouseLeave={() => setActiveFeature(null)}
              className="absolute top-[80%] left-[48%] h-5 w-5 rounded-full bg-accent flex items-center justify-center opacity-0 scale-50 transition-all duration-300 cursor-pointer z-40 pointer-events-auto"
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping pointer-events-none" />
              <div className="h-2 w-2 rounded-full bg-primary pointer-events-none" />
            </div>

            {/* --- Vector SVG Connector Lines Overlay --- */}
            <svg 
              className="absolute inset-0 h-full w-full pointer-events-none z-30" 
              viewBox="0 0 460 287"
            >
              {/* Path 1: Upper (Top-Left) -> (100,45) to Hotspot 1 Edge (154, 133) */}
              <path 
                ref={line1Ref} 
                d="M 100,45 L 154,133" 
                stroke={activeFeature === 'upper' ? '#7CFF5B' : 'rgba(124,255,91,0.5)'} 
                strokeWidth={activeFeature === 'upper' ? 2 : 1} 
                fill="none" 
                className="transition-all duration-300"
              />
              {/* Path 2: Carbon (Bottom-Left) -> (100,240) to Hotspot 2 Edge (243, 178) */}
              <path 
                ref={line2Ref} 
                d="M 100,240 L 243,178" 
                stroke={activeFeature === 'carbon' ? '#7CFF5B' : 'rgba(124,255,91,0.5)'} 
                strokeWidth={activeFeature === 'carbon' ? 2 : 1} 
                fill="none"
                className="transition-all duration-300"
              />
              {/* Path 3: Midsole (Top-Right) -> (360,45) to Hotspot 3 Edge (342, 142) */}
              <path 
                ref={line3Ref} 
                d="M 360,45 L 342,142" 
                stroke={activeFeature === 'midsole' ? '#7CFF5B' : 'rgba(124,255,91,0.5)'} 
                strokeWidth={activeFeature === 'midsole' ? 2 : 1} 
                fill="none"
                className="transition-all duration-300"
              />
              {/* Path 4: Tread (Bottom-Right) -> (360,240) to Hotspot 4 Edge (237, 240) */}
              <path 
                ref={line4Ref} 
                d="M 360,240 L 237,240" 
                stroke={activeFeature === 'outsole' ? '#7CFF5B' : 'rgba(124,255,91,0.5)'} 
                strokeWidth={activeFeature === 'outsole' ? 2 : 1} 
                fill="none"
                className="transition-all duration-300"
              />
            </svg>

            {/* --- Technical Callout Hoverable Labels (External) --- */}
            
            {/* Label 1: Breathable Mesh (Upper) - TOP LEFT */}
            <div 
              ref={label1Ref}
              onMouseEnter={() => setActiveFeature('upper')}
              onMouseLeave={() => setActiveFeature(null)}
              className="absolute top-[10px] left-[20px] z-40 flex flex-col items-center opacity-0 scale-90 transition-all duration-300 cursor-pointer"
            >
              <div className={`rounded-lg border-2 bg-[#050505]/95 px-3 py-1.5 backdrop-blur-md transition-colors duration-300 ${
                activeFeature === 'upper' ? 'border-accent shadow-glow' : 'border-white/10'
              }`}>
                <p className="text-[9px] font-black uppercase tracking-wider text-accent flex items-center gap-1">
                  <FiInfo /> 01 // Shield Knit
                </p>
                <p className="text-[11px] font-medium text-secondary">3D Breathable Mesh</p>
              </div>
            </div>

            {/* Label 2: Carbon Fiber Plate (Midsole) - BOTTOM LEFT */}
            <div 
              ref={label2Ref}
              onMouseEnter={() => setActiveFeature('carbon')}
              onMouseLeave={() => setActiveFeature(null)}
              className="absolute bottom-[15px] left-[20px] z-40 flex items-center opacity-0 scale-90 transition-all duration-300 cursor-pointer"
            >
              <div className={`rounded-lg border-2 bg-[#050505]/95 px-3 py-1.5 backdrop-blur-md transition-colors duration-300 ${
                activeFeature === 'carbon' ? 'border-accent shadow-glow' : 'border-white/10'
              }`}>
                <p className="text-[9px] font-black uppercase tracking-wider text-accent flex items-center gap-1">
                  <FiInfo /> 02 // Propulsion
                </p>
                <p className="text-[11px] font-medium text-secondary">Carbon Fiber Inlay</p>
              </div>
            </div>

            {/* Label 3: Fluid Cushioning (Midsole) - TOP RIGHT */}
            <div 
              ref={label3Ref}
              onMouseEnter={() => setActiveFeature('midsole')}
              onMouseLeave={() => setActiveFeature(null)}
              className="absolute top-[10px] right-[20px] z-40 flex flex-col items-center opacity-0 scale-90 transition-all duration-300 cursor-pointer"
            >
              <div className={`rounded-lg border-2 bg-[#050505]/95 px-3 py-1.5 backdrop-blur-md transition-colors duration-300 ${
                activeFeature === 'midsole' ? 'border-accent shadow-glow' : 'border-white/10'
              }`}>
                <p className="text-[9px] font-black uppercase tracking-wider text-accent flex items-center gap-1">
                  <FiInfo /> 03 // Absorption
                </p>
                <p className="text-[11px] font-medium text-secondary">Nitro-Boost Midsole</p>
              </div>
            </div>

            {/* Label 4: Tread Grip (Outsole) - BOTTOM RIGHT */}
            <div 
              ref={label4Ref}
              onMouseEnter={() => setActiveFeature('outsole')}
              onMouseLeave={() => setActiveFeature(null)}
              className="absolute bottom-[15px] right-[20px] z-40 flex items-center opacity-0 scale-90 transition-all duration-300 cursor-pointer"
            >
              <div className={`rounded-lg border-2 bg-[#050505]/95 px-3 py-1.5 backdrop-blur-md transition-colors duration-300 ${
                activeFeature === 'outsole' ? 'border-accent shadow-glow' : 'border-white/10'
              }`}>
                <p className="text-[9px] font-black uppercase tracking-wider text-accent flex items-center gap-1">
                  <FiInfo /> 04 // Traction
                </p>
                <p className="text-[11px] font-medium text-secondary">Octa-Grip Tread</p>
              </div>
            </div>

          </div>

        </div>

      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 select-none">
        <span className="text-[9px] font-bold uppercase tracking-widest text-grayMuted">Scroll Down</span>
        <div className="h-6 w-4 rounded-full border border-white/20 p-1 flex justify-center">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="h-1.5 w-1 rounded-full bg-accent"
          />
        </div>
      </div>
    </section>
  );
}
