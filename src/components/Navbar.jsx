import React, { useState } from 'react';
import { FiMenu, FiX, FiShoppingBag } from 'react-icons/fi';

export default function Navbar({ cartCount = 0, onNavigateHome, onOpenCart, onOpenListing }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Tech Specs', href: '#features' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Best Sellers', href: '#bestsellers' },
    { name: 'About', href: '#about' },
    { name: 'FAQs', href: '#faq' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/5 bg-[#050505]/40 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-8">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateHome) onNavigateHome();
            }}
          >
            <img src="/assets/sprintx_logo.png" alt="SprintX" className="h-20 w-auto object-contain" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  if (onNavigateHome) onNavigateHome();
                }}
                className="text-xs font-semibold uppercase tracking-wider text-grayMuted transition-colors duration-300 hover:text-accent"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden items-center gap-4 lg:flex">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-secondary hover:text-accent transition-colors"
            >
              <FiShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-black text-primary">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button
              onClick={onOpenListing}
              className="relative inline-flex items-center justify-center rounded-full bg-accent px-6 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-glow-strong"
            >
              Shop Now
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-secondary hover:text-accent"
            >
              <FiShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-black text-primary">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-secondary hover:text-accent focus:outline-none"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer and Backdrop Overlay */}
      {/* Dark blur backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Right side slide-in drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-full max-w-[300px] bg-[#090909]/95 border-l border-white/5 backdrop-blur-xl p-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <a 
              href="#" 
              className="flex items-center" 
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                if (onNavigateHome) onNavigateHome();
              }}
            >
              <img src="/assets/sprintx_logo.png" alt="SprintX" className="h-16 w-auto object-contain" />
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-secondary hover:text-accent focus:outline-none transition-colors"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col gap-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setIsOpen(false);
                  if (onNavigateHome) onNavigateHome();
                }}
                className="text-sm font-bold uppercase tracking-widest text-grayMuted hover:text-accent transition-colors py-2 border-b border-white/[0.02] block text-left"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
          <a
            href="#bestsellers"
            onClick={() => {
              setIsOpen(false);
              if (onNavigateHome) onNavigateHome();
            }}
            className="flex items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-center text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:bg-secondary"
          >
            Shop Now
          </a>
          <span className="text-[8px] text-grayMuted font-mono text-center block">
            © SPRINTX INC // V1.0
          </span>
        </div>
      </div>
    </>
  );
}
