import React from 'react';
import { motion } from 'framer-motion';

const collections = [
  {
    id: 'speed',
    tag: 'Elite Performance',
    title: 'Bestseller',
    desc: 'Footwear engineered with responsive carbon fiber plates and active nitrogen foam cushioning. The ultimate choice for setting new personal records on the road.',
    bgImage: '/assets/sprintx_card_bestseller.png',
    bgPosition: 'center center',
    categoryFilter: 'Speed'
  },
  {
    id: 'cushion',
    tag: 'Daily mileage',
    title: 'Casual & Cushion',
    desc: 'Designed for daily comfort, active recovery, and low-impact running. Thick protective foam padding that cushions every step of your daily run.',
    bgImage: '/assets/sprintx_card_casual.png',
    bgPosition: 'center center',
    categoryFilter: 'Cushion'
  },
  {
    id: 'trail',
    tag: 'Off-Road Armor',
    title: 'Trail & Outdoor',
    desc: 'Deep lug channel grips and water-resistant knit uppers designed for slippery mountain trails, gravel terrain, and rugged outdoor adventures.',
    bgImage: '/assets/sprintx_card_trail.png',
    bgPosition: 'center center',
    categoryFilter: 'Trail'
  }
];

export default function CategoriesShowcase({ onOpenListing }) {
  const handleCollectionClick = (category) => {
    if (onOpenListing) {
      onOpenListing(category);
    }
  };

  return (
    <section className="relative z-10 w-full bg-[#050505] py-20 border-b border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Grid Container matching the screenshot layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {collections.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/5 hover:border-accent/25 hover:shadow-[0_0_30px_rgba(210,253,9,0.03)] transition-all duration-500 flex flex-col justify-end p-8"
            >
              
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 scale-102 group-hover:scale-105"
                style={{ 
                  backgroundImage: `url(${item.bgImage})`,
                  backgroundPosition: item.bgPosition
                }}
              />
              
              {/* Dual Overlay: Ambient color and solid text backer */}
              <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/50 z-10" />
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/85 to-transparent z-10" />

              {/* Card Content */}
              <div className="relative z-20 flex flex-col items-start text-left mt-auto">
                <span className="text-[10px] font-black tracking-widest text-accent uppercase font-mono mb-1">
                  {item.tag}
                </span>
                <h3 className="text-2xl font-black uppercase text-secondary tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs font-light leading-relaxed text-grayMuted mb-5 line-clamp-3">
                  {item.desc}
                </p>

                {/* Show More Pill Button */}
                <button
                  onClick={() => handleCollectionClick(item.categoryFilter)}
                  className="rounded-full bg-accent px-6 py-2.5 text-[10px] font-black uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:bg-secondary hover:shadow-glow-strong select-none"
                >
                  Show more
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
