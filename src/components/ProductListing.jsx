import React, { useState, useMemo } from 'react';
import { FiArrowLeft, FiSearch, FiStar, FiChevronDown, FiGrid, FiList, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// ── Product Catalog ──────────────────────────────────────────────────────────
const allProducts = [
  {
    id: 'alpha',
    name: 'SprintX Alpha',
    price: 180,
    rating: 4.9,
    reviewsCount: 235,
    tag: 'SPEED & PROPULSION',
    category: 'Speed',
    desc: 'Responsive active carbon propulsion plate with 3D knitted breathable mesh and reactive nitrogen-infused cushioning.',
    colors: [
      { name: 'Volt Green', hex: '#d2fd09', filterClass: 'hue-rotate-0' },
      { name: 'Electric Cyan', hex: '#00F0FF', filterClass: 'hue-rotate-[110deg] saturate-[1.6]' },
      { name: 'Volt Yellow', hex: '#DFFF00', filterClass: 'hue-rotate-[45deg] saturate-[1.8]' }
    ],
    weight: '210g',
  },
  {
    id: 'aero',
    name: 'SprintX Aero',
    price: 195,
    rating: 4.8,
    reviewsCount: 148,
    tag: 'LIGHTWEIGHT RACING',
    category: 'Speed',
    desc: 'Ultralight mesh upper with flex-optimized carbon plates for maximum pacing performance.',
    colors: [
      { name: 'Electric Blue', hex: '#0066FF', filterClass: 'hue-rotate-[155deg] saturate-[1.5]' },
      { name: 'Cyber Purple', hex: '#B800FF', filterClass: 'hue-rotate-[220deg] saturate-[1.6]' },
      { name: 'Crimson Red', hex: '#FF0055', filterClass: 'hue-rotate-[290deg] saturate-[1.8]' }
    ],
    weight: '185g',
  },
  {
    id: 'vector',
    name: 'SprintX Vector',
    price: 210,
    rating: 5.0,
    reviewsCount: 92,
    tag: 'MAX COMFORT & GRIP',
    category: 'Cushion',
    desc: 'Thick nitrogen foam cushioning with dual-compound outsole for maximum surface grip.',
    colors: [
      { name: 'Volt Green', hex: '#d2fd09', filterClass: 'hue-rotate-0' },
      { name: 'Volt Yellow', hex: '#DFFF00', filterClass: 'hue-rotate-[45deg] saturate-[1.8]' }
    ],
    weight: '235g',
  },
  {
    id: 'pro',
    name: 'SprintX Pro-Strike',
    price: 160,
    rating: 4.8,
    reviewsCount: 180,
    tag: 'TRACK & FIELD',
    category: 'Speed',
    desc: 'Structured TPU support wraps, micro-spikes compatibility, and a stiff launch plate for explosive acceleration.',
    colors: [
      { name: 'Hot Crimson', hex: '#FF3366', filterClass: 'hue-rotate-[280deg]' },
      { name: 'Electric Cyan', hex: '#00F0FF', filterClass: 'hue-rotate-[190deg] saturate-[1.5]' }
    ],
    weight: '175g',
  },
  {
    id: 'cloud',
    name: 'SprintX Cloud-Run',
    price: 175,
    rating: 4.9,
    reviewsCount: 310,
    tag: 'MARATHON COMFORT',
    category: 'Marathon',
    desc: 'Nitrogen foam optimized for marathon comfort. Reduces fatigue while maintaining reactive energy returns.',
    colors: [
      { name: 'Electric Cyan', hex: '#00F0FF', filterClass: 'hue-rotate-[190deg] saturate-[1.5]' },
      { name: 'Volt Yellow', hex: '#DFFF00', filterClass: 'hue-rotate-[45deg] saturate-[1.8]' }
    ],
    weight: '220g',
  },
  {
    id: 'apex',
    name: 'SprintX Apex-Velocity',
    price: 230,
    rating: 5.0,
    reviewsCount: 84,
    tag: 'ELITE COMPETITION',
    category: 'Speed',
    desc: 'Premium elite racer with carbon fiber shell, nitrogen propulsion core, and low-drag upper.',
    colors: [
      { name: 'Volt Yellow', hex: '#DFFF00', filterClass: 'hue-rotate-[80deg] saturate-[1.6]' },
      { name: 'Electric Cyan', hex: '#00F0FF', filterClass: 'hue-rotate-[190deg] saturate-[1.5]' }
    ],
    weight: '190g',
  },
  {
    id: 'hydro',
    name: 'SprintX Hydro-Stealth',
    price: 190,
    rating: 4.7,
    reviewsCount: 115,
    tag: 'ALL-WEATHER SHIELD',
    category: 'Trail',
    desc: 'Water-resistant woven knit upper with deep lug traction channels for wet weather stability.',
    colors: [
      { name: 'Volt Green', hex: '#d2fd09', filterClass: 'hue-rotate-[40deg] brightness-[0.8] contrast-[1.4]' },
      { name: 'Electric Blue', hex: '#0066FF', filterClass: 'hue-rotate-[150deg]' }
    ],
    weight: '230g',
  },
];

const categories = ['All', 'Speed', 'Cushion', 'Marathon', 'Trail'];

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Most Reviewed', value: 'popular' },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function ProductListing({ onProductSelect, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [sortOpen, setSortOpen] = useState(false);
  const [hoveredColor, setHoveredColor] = useState({}); // { productId: colorIdx }

  // ── Derived filtered + sorted list ─────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    // Category filter
    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
        break;
      case 'popular':
        list.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      default:
        break; // featured = original order
    }

    return list;
  }, [searchQuery, activeCategory, sortBy]);

  const getActiveColorIdx = (productId) => hoveredColor[productId] ?? 0;

  return (
    <div className="min-h-screen w-full bg-[#050505] pt-36 pb-20 relative z-30 select-none">

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[200px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">

        {/* ── Top Navigation Bar ──────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-10">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-secondary transition-all duration-300 hover:border-accent hover:text-accent w-fit"
          >
            <FiArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </button>

          <div className="text-[10px] font-bold text-grayMuted uppercase tracking-widest font-mono">
            Product Catalog — {filteredProducts.length} {filteredProducts.length === 1 ? 'Model' : 'Models'}
          </div>
        </div>

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tight uppercase leading-none text-secondary mb-3">
            ALL <span className="text-accent not-italic">MODELS</span>
          </h1>
          <div className="w-16 h-[2px] bg-accent mx-auto mb-3" />
          <p className="text-sm font-light text-grayMuted max-w-md mx-auto">
            Browse our complete lineup of high-performance running shoes engineered for every stride.
          </p>
        </div>

        {/* ── Controls Row: Search + Category Tabs + Sort ─────────────────── */}
        <div className="flex flex-col gap-6 mb-12">

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-grayMuted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search models, categories, or features..."
              className="w-full rounded-full bg-[#0a0a0a] border border-white/10 py-3.5 pl-11 pr-10 text-xs font-light text-secondary placeholder:text-white/20 outline-none transition-all duration-300 focus:border-accent/40 focus:ring-1 focus:ring-accent/20 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-grayMuted hover:text-accent transition-colors"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Tabs + Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-accent text-primary border-accent shadow-glow'
                      : 'bg-transparent text-grayMuted border-white/10 hover:border-accent/30 hover:text-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0a0a] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-grayMuted transition-all duration-300 hover:border-accent/30 hover:text-secondary font-mono"
              >
                Sort: {sortOptions.find(s => s.value === sortBy)?.label}
                <FiChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 z-50 w-52 rounded-2xl border border-white/10 bg-[#0c0c0c]/95 backdrop-blur-xl py-2 shadow-2xl"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => { setSortBy(option.value); setSortOpen(false); }}
                        className={`w-full text-left px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                          sortBy === option.value
                            ? 'text-accent bg-accent/5'
                            : 'text-grayMuted hover:text-secondary hover:bg-white/5'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Product Grid ────────────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24">
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-6">
              <FiSearch className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-black uppercase text-secondary mb-2">No Models Found</h2>
            <p className="text-xs text-grayMuted font-light max-w-xs mb-6">
              Try adjusting your search query or clearing filters to find more products.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="rounded-full bg-accent px-8 py-3 text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:bg-secondary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const colorIdx = getActiveColorIdx(product.id);
                const activeColor = product.colors[colorIdx];

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => onProductSelect && onProductSelect(product.id)}
                    className="group relative flex flex-col bg-[#090909]/60 border border-white/5 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-accent/20 hover:shadow-[0_0_40px_rgba(124,255,91,0.04)]"
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-square bg-[#070707] flex items-center justify-center overflow-hidden p-6">
                      {/* Ambient color glow */}
                      <div
                        className="absolute inset-0 opacity-[0.06] transition-all duration-500"
                        style={{
                          background: `radial-gradient(circle at 50% 60%, ${activeColor.hex} 0%, transparent 70%)`
                        }}
                      />

                      {/* Category badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-grayMuted font-mono">
                          {product.category}
                        </span>
                      </div>

                      {/* Rating badge */}
                      <div className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2.5 py-1">
                        <FiStar className="h-2.5 w-2.5 text-accent fill-accent" />
                        <span className="text-[9px] font-black text-secondary">{product.rating}</span>
                      </div>

                      {/* Shoe image */}
                      <img
                        src="/assets/sprintx_alpha_main.png"
                        alt={product.name}
                        className={`relative z-10 w-[75%] h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_20px_40px_rgba(124,255,91,0.15)] ${activeColor.filterClass}`}
                      />
                    </div>

                    {/* Info Container */}
                    <div className="flex flex-col gap-3 p-5 pt-4 flex-1">
                      {/* Tag */}
                      <span className="text-[8px] font-black tracking-widest text-accent uppercase font-mono">
                        {product.tag}
                      </span>

                      {/* Name + Price */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-black uppercase text-secondary tracking-tight leading-tight">
                          {product.name}
                        </h3>
                        <span className="text-sm font-black text-accent whitespace-nowrap">
                          ${product.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[10px] font-light leading-relaxed text-grayMuted line-clamp-2">
                        {product.desc}
                      </p>

                      {/* Weight + Reviews */}
                      <div className="flex items-center gap-4 text-[9px] font-mono text-white/30">
                        <span>{product.weight}</span>
                        <span>•</span>
                        <span>{product.reviewsCount} Reviews</span>
                      </div>

                      {/* Color Swatches */}
                      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/5">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-white/20 mr-1">Colors</span>
                        {product.colors.map((color, cIdx) => (
                          <button
                            key={cIdx}
                            onMouseEnter={() => setHoveredColor(prev => ({ ...prev, [product.id]: cIdx }))}
                            onClick={(e) => {
                              e.stopPropagation();
                              setHoveredColor(prev => ({ ...prev, [product.id]: cIdx }));
                            }}
                            className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                              colorIdx === cIdx
                                ? 'border-accent scale-125 shadow-[0_0_8px_rgba(124,255,91,0.4)]'
                                : 'border-white/20 hover:border-white/40'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onProductSelect) onProductSelect(product.id);
                        }}
                        className="mt-2 w-full rounded-full border border-white/10 bg-transparent py-3 text-[10px] font-bold uppercase tracking-wider text-secondary transition-all duration-300 hover:bg-accent hover:text-primary hover:border-accent hover:shadow-glow"
                      >
                        Configure & Buy
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
}
