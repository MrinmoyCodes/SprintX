import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiShield, FiZap, FiCloud, FiUser } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function FeatureStory() {
  const containerRef = useRef(null);
  const shoeRef = useRef(null);
  
  const [activeIndex, setActiveIndex] = useState(0);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);
  const line5Ref = useRef(null);
  const line6Ref = useRef(null);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);
  const card6Ref = useRef(null);

  const hotspot1Ref = useRef(null);
  const hotspot2Ref = useRef(null);
  const hotspot3Ref = useRef(null);
  const hotspot4Ref = useRef(null);
  const hotspot5Ref = useRef(null);
  const hotspot6Ref = useRef(null);

  const features = [
    {
      title: 'Ultra Breathable Mesh',
      tag: '01 // UPPER ARCHITECTURE',
      desc: 'Advanced engineered mesh keeps your feet cool, dry, and comfortable.',
      icon: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`w-8 h-8 ${isActive ? 'text-accent' : 'text-white/40'}`}>
          <path d="M4 14h16M4 18h16" />
          <path d="M8 12v8M12 12v8M16 12v8" />
          <path d="M7 10c0-2 2-3 2-5M12 10c0-2 2-3 2-5M17 10c0-2 2-3 2-5" strokeDasharray="2,2" />
          <path d="M9 5l-2 1M14 5l-2 1M19 5l-2 1" />
        </svg>
      )
    },
    {
      title: 'Lightweight Construction',
      tag: '02 // LIGHTWEIGHT SHIELD',
      desc: 'Built with lightweight materials for maximum speed and agility.',
      icon: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`w-8 h-8 ${isActive ? 'text-accent' : 'text-white/40'}`}>
          <path d="M20.24 3.76a6 6 0 0 0-8.49 0L3 13.5V21h7.5l9.74-9.74a6 6 0 0 0 0-8.5zM3 21l3.75-3.75" />
        </svg>
      )
    },
    {
      title: 'Adaptive Fit Technology',
      tag: '03 // CONTOUR SYSTEM',
      desc: 'Smart design that adapts to your foot shape for a secure, locked-in fit.',
      icon: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`w-8 h-8 ${isActive ? 'text-accent' : 'text-white/40'}`}>
          <path d="M4 16c2-1 4-3 5-6s1-5 3-5c2 0 3 2 4 5s3 5 4 6c1 1 0 3-2 3H6c-2 0-3-2-2-3z" />
          <path d="M9 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
      )
    },
    {
      title: 'Air Cushion Midsole',
      tag: '04 // MIDSOLE TECH',
      desc: 'High-performance cushioning absorbs impact and delivers all-day comfort.',
      icon: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`w-8 h-8 ${isActive ? 'text-accent' : 'text-white/40'}`}>
          <path d="M3.5 14.5l3.5-3.5h5l3.5 3.5h5.5l1-1h2" />
          <path d="M3.5 14.5l1.5 3.5h14.5l1.5-3.5" />
          <path d="M6 20c2-1 4-1 6 0M12 20c2-1 4-1 6 0" />
        </svg>
      )
    },
    {
      title: 'Anti-slip Rubber Outsole',
      tag: '05 // TRACTION MATTERS',
      desc: 'Durable rubber outsole with superior grip for all terrains and conditions.',
      icon: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`w-8 h-8 ${isActive ? 'text-accent' : 'text-white/40'}`}>
          <rect x="7" y="3" width="10" height="18" rx="5" />
          <path d="M7 8h10M7 12h10M7 16h10" />
          <path d="M12 3v18" strokeDasharray="2,2" />
        </svg>
      )
    },
    {
      title: 'Energy Return Foam',
      tag: '06 // ENERGY HARVESTING',
      desc: 'High-rebound foam provides exceptional energy return with every stride.',
      icon: (isActive) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`w-8 h-8 ${isActive ? 'text-accent' : 'text-white/40'}`}>
          <path d="M4 10l8-4 8 4-8 4-8-4zM4 15l8-4 8 4-8 4-8-4zM4 20l8-4 8 4-8 4-8-4z" />
          <path d="M12 6V2M12 2L9 5M12 2l3 3" />
        </svg>
      )
    }
  ];

  const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref, card6Ref];
  const lineRefs = [line1Ref, line2Ref, line3Ref, line4Ref, line5Ref, line6Ref];
  const hotspotRefs = [hotspot1Ref, hotspot2Ref, hotspot3Ref, hotspot4Ref, hotspot5Ref, hotspot6Ref];

  // Dynamic container scaling to prevent layout distortion on viewports below 1000px width
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isSimpleLayout, setIsSimpleLayout] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const simple = width < 1000;
      setIsSimpleLayout(simple);
      setIsMobile(width < 768);
      
      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.offsetWidth;
        if (!simple) {
          if (wrapperWidth < 1000) {
            // Apply scale with safety padding
            setScale((wrapperWidth - 32) / 1000);
          } else {
            setScale(1);
          }
        } else {
          setScale(1);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop (1000px and above): Full ScrollTrigger Pinning and animation
    mm.add("(min-width: 1000px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(Math.floor(self.progress * 6), 5);
            setActiveIndex(index);
          }
        }
      });

      // Set initial values
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current, line5Ref.current, line6Ref.current], {
        strokeDasharray: (i, target) => target.getTotalLength(),
        strokeDashoffset: (i, target) => target.getTotalLength()
      });

      gsap.set([card2Ref.current, card3Ref.current, card4Ref.current, card5Ref.current, card6Ref.current], { opacity: 0.1 });
      gsap.set([hotspot2Ref.current, hotspot3Ref.current, hotspot4Ref.current, hotspot5Ref.current, hotspot6Ref.current], { scale: 0.7, opacity: 0.2 });
      
      gsap.set(card1Ref.current, { opacity: 1 });
      gsap.set(hotspot1Ref.current, { scale: 1.2, opacity: 1 });
      if (line1Ref.current) gsap.set(line1Ref.current, { strokeDashoffset: 0 });

      // Step animations
      scrollTl.to(line2Ref.current, { strokeDashoffset: 0, duration: 0.8 }, 0.2)
        .to(card2Ref.current, { opacity: 1, duration: 0.4 }, 0.6)
        .to(hotspot2Ref.current, { scale: 1.2, opacity: 1, duration: 0.4 }, 0.6);

      scrollTl.to(line3Ref.current, { strokeDashoffset: 0, duration: 0.8 }, 1.2)
        .to(card3Ref.current, { opacity: 1, duration: 0.4 }, 1.6)
        .to(hotspot3Ref.current, { scale: 1.2, opacity: 1, duration: 0.4 }, 1.6);

      scrollTl.to(line4Ref.current, { strokeDashoffset: 0, duration: 0.8 }, 2.2)
        .to(card4Ref.current, { opacity: 1, duration: 0.4 }, 2.6)
        .to(hotspot4Ref.current, { scale: 1.2, opacity: 1, duration: 0.4 }, 2.6);

      scrollTl.to(line5Ref.current, { strokeDashoffset: 0, duration: 0.8 }, 3.2)
        .to(card5Ref.current, { opacity: 1, duration: 0.4 }, 3.6)
        .to(hotspot5Ref.current, { scale: 1.2, opacity: 1, duration: 0.4 }, 3.6);

      scrollTl.to(line6Ref.current, { strokeDashoffset: 0, duration: 0.8 }, 4.2)
        .to(card6Ref.current, { opacity: 1, duration: 0.4 }, 4.6)
        .to(hotspot6Ref.current, { scale: 1.2, opacity: 1, duration: 0.4 }, 4.6);
    });

    // Below 1000px: Simple static layout
    mm.add("(max-width: 999px)", () => {
      // Revert active index or set default
      setActiveIndex(0);
    });

    return () => mm.revert();
  }, []);

  // Positions inside the 1000x600 coordinate box
  const cardPositions = [
    { top: "40px", left: "40px" },     // Top-Left (Ultra Breathable Mesh)
    { top: "220px", left: "40px" },    // Mid-Left (Lightweight Construction)
    { top: "400px", left: "40px" },    // Bottom-Left (Adaptive Fit Technology)
    { top: "40px", right: "40px" },    // Top-Right (Air Cushion Midsole)
    { top: "220px", right: "40px" },   // Mid-Right (Anti-slip Rubber Outsole)
    { top: "400px", right: "40px" }    // Bottom-Right (Energy Return Foam)
  ];

  // Self-drawing vector paths inside 1000x600 space
  const linePaths = [
    "M 280,90 L 350,90 L 380,270", // Path 1
    "M 280,270 L 350,270 L 450,210", // Path 2
    "M 280,450 L 320,450 L 345,325", // Path 3
    "M 720,90 L 650,90 L 580,240", // Path 4
    "M 720,270 L 650,270 L 490,360", // Path 5
    "M 720,450 L 650,450 L 535,305"  // Path 6
  ];

  // Hotspot positions on the shoe inside 1000x600 space
  const hotspotPositions = [
    { left: "380px", top: "270px" },
    { left: "450px", top: "210px" },
    { left: "345px", top: "325px" },
    { left: "580px", top: "240px" },
    { left: "490px", top: "360px" },
    { left: "535px", top: "305px" }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative flex min-h-[80vh] lg:min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#080808] py-12 md:py-16 px-4 md:px-8"
      id="features"
    >
      {/* Dynamic Background Radial Glow */}
      <div 
        className="absolute inset-0 -z-10 transition-colors duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${
            activeIndex === 3 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(124, 255, 91, 0.07)'
          } 0%, rgba(5,5,5,0) 65%)`
        }}
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* Main Section Header */}
      <div className="text-center mb-12 pointer-events-none select-none max-w-3xl mx-auto z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tight uppercase leading-none text-secondary">
          ENGINEERED FOR <span className="text-accent not-italic">PEAK PERFORMANCE</span>
        </h2>
        <div className="w-20 h-[2px] bg-accent mx-auto my-3" />
        <p className="text-sm font-light text-grayMuted max-w-lg mx-auto">
          Every detail is crafted to deliver unmatched comfort, stability, and speed.
        </p>
      </div>

      {!isSimpleLayout ? (
        <div 
          ref={wrapperRef} 
          className="w-full flex items-center justify-center overflow-hidden relative"
          style={{ 
            height: `${600 * scale}px` 
          }}
        >
        <div 
          style={!isMobile ? { 
            transform: `translate(-50%, -50%) scale(${scale})`, 
            transformOrigin: 'center center',
            width: '1000px',
            height: '600px',
            position: 'absolute',
            left: '50%',
            top: '50%'
          } : {}}
          className={`relative border border-white/5 bg-[#050505]/40 backdrop-blur-sm rounded-3xl shadow-[inset_0_0_40px_rgba(255,255,255,0.02)] flex items-center justify-center overflow-hidden md:block ${
            isMobile ? 'w-full aspect-[1000/600]' : 'w-[1000px] h-[600px] flex-shrink-0'
          }`}
        >
        
        {/* Centered Holographic Shoe Visualizer */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[320px] md:top-[120px] md:translate-x-0 md:translate-y-0 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] flex items-center justify-center pointer-events-none select-none z-20">
          
          {/* Radar Circles */}
          <div className="absolute h-96 w-96 rounded-full border border-accent/[0.04] flex items-center justify-center animate-[spin_40s_linear_infinite]">
            <div className="h-72 w-72 rounded-full border border-dashed border-accent/[0.08] flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]" />
            <div className="h-48 w-48 rounded-full border border-accent/[0.03]" />
          </div>

          {/* Shoe Image */}
          <img 
            src="/assets/sprintx_alpha_main.png" 
            alt="SprintX Performance" 
            className="h-full w-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)] z-10"
          />

          {/* Interactive Graphic: Airflow Overlay (Point 1: Mesh) */}
          <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            activeIndex === 0 ? 'opacity-100' : 'opacity-0'
          }`}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 340" fill="none">
              <path d="M 60,110 C 100,80 180,90 210,120" stroke="#7CFF5B" strokeWidth="1" strokeDasharray="4,4" className="animate-dash" />
              <path d="M 50,130 C 90,100 170,110 200,140" stroke="#7CFF5B" strokeWidth="0.8" strokeDasharray="3,3" className="animate-dash" style={{ animationDuration: '1.5s' }} />
            </svg>
          </div>

          {/* Interactive Graphic: Bounce waves (Point 4: Air Cushion Midsole) */}
          <div className={`absolute bottom-[18%] left-[25%] right-[25%] transition-opacity duration-500 flex justify-around pointer-events-none ${
            activeIndex === 3 ? 'opacity-100' : 'opacity-0'
          }`}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>
                <svg className="w-3 h-3 text-accent drop-shadow-[0_0_5px_#7CFF5B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>

          {/* Interactive Graphic: Carbon weave highlights (Point 6: Energy Return Foam) */}
          <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            activeIndex === 5 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ clipPath: 'polygon(0% 55%, 100% 55%, 100% 85%, 0% 85%)' }}
          >
            <img 
              src="/assets/sprintx_alpha_main.png" 
              alt="Energy Return Highlight" 
              className="h-full w-full object-contain filter brightness-150 saturate-150 drop-shadow-[0_0_12px_#7CFF5B]"
            />
          </div>

        </div>

        {/* Pulsing Hotspots (Desktop only) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-40">
          {hotspotPositions.map((pos, idx) => {
            const isRevealed = activeIndex >= idx;
            const isActive = activeIndex === idx;

            return (
              <div
                key={idx}
                ref={hotspotRefs[idx]}
                style={{ left: pos.left, top: pos.top }}
                className="absolute h-5 w-5 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 pointer-events-none"
              >
                {isRevealed && (
                  <>
                    <span className={`absolute inline-flex h-full w-full rounded-full bg-accent pointer-events-none ${
                      isActive ? 'animate-ping opacity-75' : 'scale-75 opacity-20'
                    }`} />
                    <div className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                      isActive ? 'bg-accent border border-black' : 'bg-white'
                    }`} />
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Connector Lines (Desktop only) */}
        <svg 
          className="hidden md:block absolute inset-0 h-full w-full pointer-events-none z-30" 
          viewBox="0 0 1000 600"
        >
          {linePaths.map((d, idx) => {
            const isRevealed = activeIndex >= idx;
            const isActive = activeIndex === idx;

            return (
              <path 
                key={idx}
                ref={lineRefs[idx]}
                d={d} 
                stroke={isActive ? '#7CFF5B' : isRevealed ? 'rgba(255,255,255,0.25)' : 'transparent'} 
                strokeWidth={isActive ? 2 : 1} 
                fill="none" 
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* --- 6 Absolute-Positioned Desktop Cards --- */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          {features.map((feature, idx) => {
            const pos = cardPositions[idx];
            const isRevealed = activeIndex >= idx;
            const isActive = activeIndex === idx;

            return (
              <div
                key={idx}
                ref={cardRefs[idx]}
                style={{ 
                  position: "absolute",
                  top: pos.top, 
                  left: pos.left, 
                  right: pos.right,
                  width: "240px",
                  height: "100px"
                }}
                className={`border-2 rounded-2xl bg-[#090909]/95 p-4 transition-all duration-500 select-none flex items-center ${
                  isActive
                    ? 'border-accent shadow-glow bg-accent/[0.01]'
                    : isRevealed
                    ? 'border-white/10 bg-[#090909]/80'
                    : 'border-white/5'
                }`}
              >
                <div className="flex items-center gap-4 w-full">
                  {/* Icon Block */}
                  <div className="flex-shrink-0">
                    {feature.icon(isActive || isRevealed)}
                  </div>
                  {/* Content Block */}
                  <div>
                    <h4 className={`text-[11px] font-black uppercase tracking-wider mb-1 ${
                      isActive ? 'text-secondary font-black' : isRevealed ? 'text-white/80 font-semibold' : 'text-white/30 font-medium'
                    }`}>
                      {feature.title}
                    </h4>
                    <p className={`text-[9.5px] font-light leading-snug ${
                      isActive ? 'text-grayMuted' : isRevealed ? 'text-grayMuted/80' : 'text-white/20'
                    }`}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        </div>
      </div>
      ) : (
        <div className="w-full max-w-4xl px-4 mt-4 flex flex-col items-center gap-10">
          {/* Centered Holographic Shoe Visualizer */}
          <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] flex items-center justify-center pointer-events-none select-none">
            {/* Radar Circles */}
            <div className="absolute h-64 w-64 rounded-full border border-accent/[0.04] flex items-center justify-center animate-[spin_40s_linear_infinite]">
              <div className="h-48 w-48 rounded-full border border-dashed border-accent/[0.08] flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]" />
            </div>
            {/* Shoe Image */}
            <img 
              src="/assets/sprintx_alpha_main.png" 
              alt="SprintX Performance" 
              className="h-full w-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] z-10"
            />
          </div>

          {/* 6 Features Static Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl bg-[#090909]/60 backdrop-blur-md p-5 flex items-center gap-4 transition-all duration-300 hover:border-accent/30 hover:bg-[#0c0c0c]/80 select-none"
              >
                <div className="flex-shrink-0">
                  {feature.icon(true)}
                </div>
                <div className="text-left">
                  <span className="text-[8px] font-black tracking-widest text-accent uppercase font-mono block mb-1">
                    {feature.tag}
                  </span>
                  <h4 className="text-xs font-black uppercase text-secondary mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-[10px] font-light leading-relaxed text-grayMuted">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- BOTTOM SYSTEM FEATURES BAR --- */}
      <div className="w-full max-w-[1000px] grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 md:mt-12 pt-6 md:pt-8 border-t border-white/5 pointer-events-none select-none z-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm filter drop-shadow-[0_0_4px_rgba(124,255,91,0.2)]">
            <FiZap />
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase text-secondary tracking-wider">BUILT FOR SPEED</h5>
            <p className="text-[8px] text-white/40 font-light">Maximize every stride</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm filter drop-shadow-[0_0_4px_rgba(124,255,91,0.2)]">
            <FiShield />
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase text-secondary tracking-wider">ENHANCED STABILITY</h5>
            <p className="text-[8px] text-white/40 font-light">Stay balanced, stay strong</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm filter drop-shadow-[0_0_4px_rgba(124,255,91,0.2)]">
            <FiCloud />
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase text-secondary tracking-wider">ALL-DAY COMFORT</h5>
            <p className="text-[8px] text-white/40 font-light">Comfort that never quits</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm filter drop-shadow-[0_0_4px_rgba(124,255,91,0.2)]">
            <FiUser />
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase text-secondary tracking-wider">PERFORM BEYOND</h5>
            <p className="text-[8px] text-white/40 font-light">Push limits, break barriers</p>
          </div>
        </div>
      </div>

      {/* SVG animation keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-dash {
          animation: dash 2s linear infinite;
        }
      `}} />
    </section>
  );
}
