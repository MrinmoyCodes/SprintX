import React from 'react';
import { FiMail, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

export default function Footer({ onNavigateHome }) {
  return (
    <footer className="relative z-10 w-full bg-[#020202] pt-20 pb-8 text-left border-t border-white/5 select-none">
      <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
        
        {/* Logo & Info */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <a 
            href="#" 
            className="flex items-center col-start-1"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
            }}
          >
            <img src="/assets/sprintx_logo.png" alt="SprintX" className="h-28 w-auto object-contain" />
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
            <a 
              href="#showcase" 
              onClick={() => onNavigateHome && onNavigateHome()} 
              className="hover:text-accent transition-colors"
            >
              SprintX Alpha
            </a>
            <a 
              href="#showcase" 
              onClick={() => onNavigateHome && onNavigateHome()} 
              className="hover:text-accent transition-colors"
            >
              SprintX Aero
            </a>
            <a 
              href="#showcase" 
              onClick={() => onNavigateHome && onNavigateHome()} 
              className="hover:text-accent transition-colors"
            >
              SprintX Vector
            </a>
            <a 
              href="#showcase" 
              onClick={() => onNavigateHome && onNavigateHome()} 
              className="hover:text-accent transition-colors"
            >
              Limited Drop
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h5 className="text-xs font-black uppercase tracking-widest text-secondary">Quick Links</h5>
          <div className="flex flex-col gap-2.5 text-xs font-semibold text-grayMuted">
            <a 
              href="#features" 
              onClick={() => onNavigateHome && onNavigateHome()} 
              className="hover:text-accent transition-colors"
            >
              Technology Specs
            </a>
            <a 
              href="#about" 
              onClick={() => onNavigateHome && onNavigateHome()} 
              className="hover:text-accent transition-colors"
            >
              Our Mission
            </a>
            <a 
              href="#testimonials" 
              onClick={() => onNavigateHome && onNavigateHome()} 
              className="hover:text-accent transition-colors"
            >
              User Reviews
            </a>
            <a 
              href="#faq" 
              onClick={() => onNavigateHome && onNavigateHome()} 
              className="hover:text-accent transition-colors"
            >
              Help Center
            </a>
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
  );
}
