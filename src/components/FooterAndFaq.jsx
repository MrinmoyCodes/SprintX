import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiMail, FiInstagram, FiTwitter, FiYoutube, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      <section className="relative z-10 w-full bg-[#080808] py-24 border-b border-white/5" id="about">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Mission Story */}
            <div className="md:col-span-6">
              <span className="text-[10px] font-black tracking-widest text-accent uppercase">
                OUR MISSION
              </span>
              <h2 className="mt-4 text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl text-secondary">
                ENGINEERED FOR<br />
                <span className="text-accent">PURE MOMENTUM.</span>
              </h2>
              <p className="mt-6 text-sm font-light leading-relaxed text-grayMuted">
                SprintX started in a high-tech sports biomechanics lab with a simple question: How can we eliminate 
                energy loss in the transition phase of a stride? 
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed text-grayMuted">
                By fusing aerospace-grade carbon fiber structures with nitrogen gas infusions, we created footwear that 
                doesn’t just cushion impact—it converts it into active forward speed.
              </p>
            </div>

            {/* Right Column: Key Stats Counters */}
            <div className="md:col-span-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { ref: c1Ref, target: 100, label: 'Customers', suffix: 'K+' },
                { ref: c2Ref, target: 40, label: 'Countries', suffix: '+' },
                { ref: c3Ref, target: 500, label: 'Retail Stores', suffix: '+' },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-primary/45 p-6 text-center shadow-lg">
                  <div className="flex font-heading text-4xl font-black text-secondary">
                    <span ref={stat.ref}>0</span>
                    <span className="text-accent">{stat.suffix}</span>
                  </div>
                  <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-grayMuted">
                    {stat.label}
                  </span>
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

      {/* Loop 13 — Footer */}
      <footer className="relative z-10 w-full bg-[#020202] pt-20 pb-8 text-left border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          
          {/* Logo & Info */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <a href="#" className="flex items-center">
              <img src="/assets/sprintx_logo.png" alt="SprintX" className="h-12 w-auto object-contain" />
            </a>
            <p className="max-w-xs text-xs font-light leading-relaxed text-grayMuted">
              Aerospace-grade performance footwear. Built to stabilize, cushion, and propel runners worldwide.
            </p>
            {/* Socials */}
            <div className="flex gap-4">
              {[
                { icon: FiInstagram, href: '#' },
                { icon: FiTwitter, href: '#' },
                { icon: FiYoutube, href: '#' }
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-grayMuted transition-all duration-300 hover:bg-accent hover:text-primary hover:shadow-glow"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Collections links */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h5 className="text-xs font-black uppercase tracking-widest text-secondary">Collections</h5>
            <div className="flex flex-col gap-2.5 text-xs font-semibold text-grayMuted">
              <a href="#showcase" className="hover:text-accent transition-colors">SprintX Alpha</a>
              <a href="#showcase" className="hover:text-accent transition-colors">SprintX Aero</a>
              <a href="#showcase" className="hover:text-accent transition-colors">SprintX Vector</a>
              <a href="#showcase" className="hover:text-accent transition-colors">Limited Drop</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h5 className="text-xs font-black uppercase tracking-widest text-secondary">Quick Links</h5>
            <div className="flex flex-col gap-2.5 text-xs font-semibold text-grayMuted">
              <a href="#features" className="hover:text-accent transition-colors">Technology Specs</a>
              <a href="#about" className="hover:text-accent transition-colors">Our Mission</a>
              <a href="#testimonials" className="hover:text-accent transition-colors">User Reviews</a>
              <a href="#faq" className="hover:text-accent transition-colors">Help Center</a>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h5 className="text-xs font-black uppercase tracking-widest text-secondary">Newsletter</h5>
            <p className="text-xs font-light text-grayMuted leading-relaxed">
              Subscribe to get exclusive first-access to limited shoe drops and performance articles.
            </p>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border border-white/10 bg-[#090909] px-5 py-3.5 pr-12 text-xs font-light text-secondary outline-none transition-all duration-300 focus:border-accent/60 focus:bg-[#0c0c0c] placeholder:text-grayMuted"
              />
              <button
                type="submit"
                className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-primary transition-all duration-300 hover:bg-secondary"
              >
                <FiMail className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="mx-auto max-w-7xl px-6 md:px-8 border-t border-white/5 pt-8 flex flex-col md:flex-row md:justify-between items-center gap-4 text-center">
          <p className="text-[10px] text-grayMuted font-light">
            © {new Date().getFullYear()} SPRINTX PERFORMANCE INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] text-grayMuted font-semibold uppercase tracking-wider">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </>
  );
}
