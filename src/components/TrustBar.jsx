import React from 'react';
import { FiTruck, FiRotateCcw, FiShield, FiUsers, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function TrustBar() {
  const items = [
    { icon: FiTruck, title: 'Free Shipping', desc: 'On orders over $150' },
    { icon: FiRotateCcw, title: '30-Day Returns', desc: 'Hassle-free exchanges' },
    { icon: FiShield, title: 'Secure Checkout', desc: '256-bit SSL encryption' },
    { icon: FiUsers, title: '50K+ Customers', desc: 'Trusted by athletes worldwide' },
    { icon: FiStar, title: '4.9★ Rating', desc: 'From 12,000+ reviews' },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative z-10 border-y border-white/5 bg-[#050505] py-8 trust-bar">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-3 md:flex md:flex-wrap md:justify-between md:gap-4"
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex items-center gap-4 text-left"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-accent border border-white/10 shadow-glow transition-all duration-300 hover:bg-accent hover:text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-secondary">{item.title}</h4>
                  <p className="text-xs text-grayMuted mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
