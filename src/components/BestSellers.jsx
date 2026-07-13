import React, { useEffect, useRef, useState } from 'react';
import { FiStar, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BestSellers() {
  const particleContainerRef = useRef(null);

  // 1. Generate floating vector particles on Ad Banner load
  useEffect(() => {
    const container = particleContainerRef.current;
    if (!container) return;

    const count = 25;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute h-1.5 w-1.5 rounded-full bg-accent/40 pointer-events-none';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      particles.push(particle);

      // Animate each particle floating slowly
      gsap.to(particle, {
        x: () => (Math.random() - 0.5) * 200,
        y: () => (Math.random() - 0.5) * 200,
        opacity: () => Math.random() * 0.8 + 0.2,
        duration: () => Math.random() * 6 + 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      if (container) container.innerHTML = '';
    };
  }, []);

  // 2. Best seller items list
  const bestSellers = [
    {
      id: 'pro',
      name: 'SprintX Pro-Strike',
      price: '$160',
      rating: '4.8',
      filterClass: 'hue-rotate-[280deg]', // Color change on hover
      desc: 'Ideal for track events and short sprints.'
    },
    {
      id: 'cloud',
      name: 'SprintX Cloud-Run',
      price: '$175',
      rating: '4.9',
      filterClass: 'hue-rotate-[190deg] saturate-[1.5]',
      desc: 'Nitrogen foam optimized for marathon comfort.'
    },
    {
      id: 'apex',
      name: 'SprintX Apex-Velocity',
      price: '$230',
      rating: '5.0',
      filterClass: 'hue-rotate-[80deg] saturate-[1.6]',
      desc: 'Premium elite racer with carbon fiber shell.'
    },
    {
      id: 'hydro',
      name: 'SprintX Hydro-Stealth',
      price: '$190',
      rating: '4.7',
      filterClass: 'hue-rotate-[40deg] brightness-[0.8] contrast-[1.4]',
      desc: 'All-weather water resistant woven knit upper.'
    }
  ];

  return (
    <>
      {/* Loop 8 — Advertisement Banner */}
      <section className="relative z-10 w-full overflow-hidden bg-primary border-b border-white/5 py-32">
        <div ref={particleContainerRef} className="absolute inset-0 z-0 pointer-events-none" />
        
        {/* Cinematic Background Athlete overlay */}
        <div className="absolute inset-0 -z-10 select-none">
          <div className="absolute inset-0 bg-[#050505]/85 z-10" />
          <img
            src="/assets/sprintx_lifestyle.png"
            alt="Built for Champions lifestyle background"
            className="h-full w-full object-cover filter brightness-[0.5] contrast-[1.1] scale-105"
          />
        </div>

        {/* Text Details */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center md:px-8">
          <span className="text-[10px] font-black tracking-widest text-accent uppercase mb-4 block">
            CAMPAIGN // SPRINTX ELITE
          </span>
          <h2 className="text-6xl font-black uppercase leading-none tracking-tight sm:text-8xl lg:text-9xl text-secondary select-none">
            BUILT FOR<br />
            <span className="text-accent">CHAMPIONS.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-grayMuted sm:text-base">
            Every fiber, every groove, every millisecond matters. Explore the science behind the shoes.
          </p>
          <a
            href="#features"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-secondary px-8 py-4 text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:bg-accent hover:text-primary hover:shadow-glow-strong"
          >
            Discover Technology
          </a>
        </div>
      </section>

      {/* Loop 9 — Best Seller Section */}
      <section className="relative z-10 w-full py-24 bg-[#080808]" id="bestsellers">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-[10px] font-black tracking-widest text-accent uppercase">
                COMMUNITY FAVORITES
              </span>
              <h2 className="mt-4 text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl text-secondary">
                BEST <span className="text-accent">SELLERS</span>
              </h2>
            </div>
            <p className="max-w-xs text-xs font-light leading-relaxed text-grayMuted mt-4 md:mt-0">
              Tried, tested, and rated 5 stars by thousands of professional runners and athletes.
            </p>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((item) => (
              <div
                key={item.id}
                className="group/item relative flex flex-col border border-white/5 bg-primary rounded-3xl p-5 transition-all duration-500 hover:border-accent/40 hover:bg-accent/[0.01] hover:shadow-[0_15px_35px_rgba(124,255,91,0.1)] hover:-translate-y-1"
              >
                
                {/* Floating Badge */}
                <div className="flex justify-between items-center text-[10px] font-bold text-grayMuted mb-4">
                  <span className="uppercase tracking-widest">PROPULSION // CO-03</span>
                  <span className="flex items-center gap-1">
                    <FiStar className="fill-accent text-accent h-3 w-3" />
                    <span className="text-secondary">{item.rating}</span>
                  </span>
                </div>

                {/* Interactive Product Image (Applies secondary filter on card hover) */}
                <div className="relative h-[180px] w-full flex items-center justify-center mb-6 overflow-hidden select-none">
                  {/* Base Image */}
                  <img
                    src="/assets/sprintx_alpha_main.png"
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-contain transition-all duration-700 ease-out group-hover/item:opacity-0 group-hover/item:scale-95"
                  />
                  {/* Secondary Image Color (Hue-rotated version) */}
                  <img
                    src="/assets/sprintx_alpha_main.png"
                    alt={item.name}
                    className={`absolute inset-0 h-full w-full object-contain opacity-0 scale-95 transition-all duration-700 ease-out group-hover/item:opacity-100 group-hover/item:scale-105 ${item.filterClass}`}
                  />
                </div>

                {/* Name & Pricing */}
                <div className="mb-2">
                  <h4 className="text-lg font-black uppercase text-secondary group-hover/item:text-accent transition-colors duration-300">
                    {item.name}
                  </h4>
                  <p className="text-xs text-grayMuted font-light mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-lg font-black text-secondary">{item.price}</span>
                  
                  {/* Quick Add Button sliding in on hover */}
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-secondary transition-all duration-300 hover:bg-accent hover:border-accent hover:text-primary group-hover/item:bg-accent group-hover/item:border-accent group-hover/item:text-primary group-hover/item:shadow-glow">
                    <FiPlus className="h-5 w-5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
