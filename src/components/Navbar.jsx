import React, { useState } from 'react';
import { FiMenu, FiX, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img src="/assets/sprintx_logo.png" alt="SprintX" className="h-10 w-auto object-contain" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-grayMuted transition-colors duration-300 hover:text-accent"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden items-center gap-4 md:flex">
            <button className="relative p-2 text-secondary hover:text-accent transition-colors">
              <FiShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-black text-primary">
                0
              </span>
            </button>
            
            <a
              href="#bestsellers"
              className="relative inline-flex items-center justify-center rounded-full bg-accent px-6 py-2 text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black hover:shadow-glow-strong"
            >
              Shop Now
            </a>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-4 md:hidden">
            <button className="p-2 text-secondary hover:text-accent">
              <FiShoppingBag className="h-5 w-5" />
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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[65px] left-0 z-40 w-full bg-primary/95 border-b border-white/5 backdrop-blur-lg px-6 py-8 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, index) => (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold uppercase tracking-widest text-grayMuted hover:text-accent"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                href="#bestsellers"
                onClick={() => setIsOpen(false)}
                className="mx-auto mt-2 w-full max-w-[200px] rounded-full bg-accent py-3 text-center text-xs font-bold uppercase tracking-wider text-primary shadow-glow"
              >
                Shop Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
