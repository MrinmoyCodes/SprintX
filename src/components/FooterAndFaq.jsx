import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiMail, FiInstagram, FiTwitter, FiYoutube, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

// ================= TESTIMONIALS DATA =================
const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Marathon Runner',
    rating: 5,
    text: 'The cushioning in the SprintX Alpha is a game changer. I shaved 4 minutes off my personal best in my last half-marathon. No foot fatigue at all.',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=150&h=150&fit=crop&q=80'
  },
  {
    name: 'Marcus Chen',
    role: 'Triathlete',
    rating: 5,
    text: 'Transitions are seamless, and the carbon plate returns energy like nothing else. It feels like you are being propelled forward with every stride.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80'
  },
  {
    name: 'Elena Rostova',
    role: 'Track & Field Coach',
    rating: 5,
    text: 'My athletes have been training in the Vector and Aero variants. The durability of the tread and the lock-in upper fit is exceptional.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80'
  }
];

// ================= FAQs DATA =================
const faqs = [
  {
    q: 'How does the sizing compare to standard running shoes?',
    a: 'SprintX shoes fit true to size. If you have wider feet, we recommend ordering a half-size up for the best experience, especially in the knit models.'
  },
  {
    q: 'What is the return policy for the SprintX Alpha?',
    a: 'We offer a 30-day wear-test guarantee. You can run in them, train in them, and if you are not 100% satisfied, return them for a full refund.'
  },
  {
    q: 'Does it support orthopedic insoles?',
    a: 'Yes, the stock Nitro foam insoles are fully removable, allowing you to insert custom orthotics or third-party insoles easily.'
  },
  {
    q: 'How long does the carbon fiber plate last?',
    a: 'The carbon propulsion inlay is structural and designed to outlast the cushioning elements, maintaining its elasticity for up to 800 kilometers.'
  },
  {
    q: 'What is the best way to clean my SprintX shoes?',
    a: 'We recommend hand washing with cold water and a mild detergent. Avoid washing machines and tumble dryers, and always air dry them.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, Apple Pay, Google Pay, PayPal, and interest-free installment options via Klarna and Afterpay.'
  }
];

export default function FooterAndFaq() {
  // Counters for About Us
  const c1Ref = useRef(null);
  const c2Ref = useRef(null);
  const c3Ref = useRef(null);

  useEffect(() => {
    const animateCounter = (ref, target) => {
      if (!ref.current) return;
      gsap.fromTo(ref.current,
        { textContent: 0 },
        {
          textContent: target,
          duration: 1.8,
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    };

    animateCounter(c1Ref, 100);
    animateCounter(c2Ref, 40);
    animateCounter(c3Ref, 500);
  }, []);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <>
      {/* Loop 10 — Testimonials (Sticky Card Stacking) */}
      <section className="relative z-10 w-full bg-[#050505] py-24 border-b border-white/5" id="testimonials">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          
          <div className="text-center mb-16">
            <span className="text-[10px] font-black tracking-widest text-accent uppercase">
              ATHLETE CORNER
            </span>
            <h2 className="mt-4 text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl text-secondary">
              TESTIMONIALS
            </h2>
          </div>

          {/* Sticky Stacking Cards Container */}
          <div className="relative flex flex-col gap-10 select-none pb-12">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="sticky top-28 flex flex-col md:flex-row items-center gap-6 rounded-3xl border border-white/5 bg-[#090909]/95 backdrop-blur-md p-8 md:p-10 shadow-2xl transition-all duration-300 hover:border-accent/30"
                style={{
                  // Slight scale decrement to show stacking overlap visually
                  transform: `scale(${1 - (testimonials.length - 1 - idx) * 0.02})`,
                  marginTop: idx > 0 ? '1.5rem' : '0'
                }}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-20 w-20 rounded-full border border-white/10 object-cover"
                />
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FiStar key={i} className="fill-accent text-accent h-4 w-4" />
                    ))}
                  </div>
                  <p className="text-sm font-light leading-relaxed text-grayMuted mb-4 italic">
                    "{t.text}"
                  </p>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-secondary">{t.name}</h4>
                    <span className="text-[10px] text-accent font-semibold uppercase tracking-widest">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Loop 11 — About Us Section (Timeline + Counters) */}
      <section className="relative z-10 w-full bg-[#080808] py-24 md:py-32 border-b border-white/5" id="about">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Mission Story with Floating Biomechanics Midsole */}
            <div className="md:col-span-5 relative">
              {/* Subtle background radial glow */}
              <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
              
              <span className="text-[10px] font-black tracking-widest text-accent uppercase font-mono block">
                // SCIENTIFIC LAB ROOTS
              </span>
              <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-none tracking-tight text-secondary">
                ENGINEERED FOR<br />
                <span className="text-accent drop-shadow-[0_0_15px_rgba(124,255,91,0.25)]">PURE MOMENTUM.</span>
              </h2>
              <p className="mt-6 text-sm font-light leading-relaxed text-grayMuted">
                SprintX started in a high-tech sports biomechanics lab with a simple question: How can we eliminate 
                energy loss in the transition phase of a stride? 
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed text-grayMuted mb-8 md:mb-12">
                By fusing aerospace-grade carbon fiber structures with nitrogen gas infusions, we created footwear that 
                doesn’t just cushion impact—it converts it into active forward speed.
              </p>

              {/* Glowing shoe preview card */}
              <div className="relative h-44 w-full rounded-2xl border border-white/5 bg-[#090909]/60 backdrop-blur-xl p-4 overflow-hidden flex items-center justify-center group/midsole select-none">
                <div className="absolute inset-0 bg-radial-gradient from-accent/10 to-transparent blur-xl opacity-70 group-hover/midsole:opacity-100 transition-opacity duration-500" />
                <img
                  src="/assets/sprintx_alpha_main_clean.png"
                  alt="SprintX Alpha design schematic"
                  className="h-full w-auto object-contain transform transition-all duration-700 ease-out group-hover/midsole:scale-110 group-hover/midsole:-rotate-3"
                />
                <span className="absolute bottom-3 left-4 text-[7px] font-black tracking-widest text-white/30 font-mono uppercase">
                  SPRINTX ALPHA ELITE PROTOTYPE SCHEMATIC // v1.0
                </span>
              </div>
            </div>

            {/* Right Column: Key Stats Counters in Asymmetrical Tech Grid */}
            <div className="md:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { 
                  ref: c1Ref, 
                  target: 100, 
                  label: 'Customers Active', 
                  suffix: 'K+', 
                  desc: 'Athletes and running enthusiasts crushing their daily limits globally.',
                  span: 'sm:col-span-2',
                  tag: 'PROPULSION NETWORK'
                },
                { 
                  ref: c2Ref, 
                  target: 40, 
                  label: 'Countries Reached', 
                  suffix: '+', 
                  desc: 'International shipping hubs.',
                  span: 'sm:col-span-1',
                  tag: 'GLOBAL REACH'
                },
                { 
                  ref: c3Ref, 
                  target: 500, 
                  label: 'Retail Partners', 
                  suffix: '+', 
                  desc: 'Authorized store locations.',
                  span: 'sm:col-span-1',
                  tag: 'RETAIL CENTERS'
                },
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className={`group/stat relative flex flex-col justify-between rounded-3xl border border-white/5 bg-[#090909]/40 backdrop-blur-xl p-8 transition-all duration-500 hover:border-accent/30 hover:bg-accent/[0.005] hover:shadow-[0_15px_35px_rgba(124,255,91,0.05)] ${stat.span}`}
                >
                  {/* Glowing hover dot inside the box */}
                  <div className="absolute top-6 right-6 h-1.5 w-1.5 rounded-full bg-white/10 group-hover/stat:bg-accent group-hover/stat:animate-ping transition-colors duration-300" />
                  
                  <div>
                    <span className="text-[7.5px] font-black tracking-widest text-white/30 font-mono uppercase block mb-4">
                      // {stat.tag}
                    </span>
                    <div className="flex items-baseline font-heading text-5xl font-black text-secondary leading-none tracking-tight">
                      <span ref={stat.ref} className="font-mono">0</span>
                      <span className="text-accent drop-shadow-[0_0_10px_rgba(124,255,91,0.2)]">{stat.suffix}</span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/5 pt-4">
                    <h4 className="text-xs font-black uppercase text-secondary tracking-wider">
                      {stat.label}
                    </h4>
                    <p className="mt-2 text-xs font-light leading-relaxed text-grayMuted">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Loop 12 — FAQ (Accordion) */}
      <section className="relative z-10 w-full bg-[#050505] py-24 border-b border-white/5" id="faq">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          
          <div className="text-center mb-16">
            <span className="text-[10px] font-black tracking-widest text-accent uppercase">
              HAVE QUESTIONS?
            </span>
            <h2 className="mt-4 text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl text-secondary">
              FREQUENTLY ASKED
            </h2>
          </div>

          {/* Accordion List */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-white/5 bg-[#090909] transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-6 text-left hover:bg-white/[0.01]"
                  >
                    <span className="text-sm font-bold uppercase tracking-wider text-secondary">
                      {faq.q}
                    </span>
                    <FiChevronDown
                      className={`h-5 w-5 text-grayMuted transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-accent' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="border-t border-white/5 p-6 text-sm font-light leading-relaxed text-grayMuted bg-[#070707]/30">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
