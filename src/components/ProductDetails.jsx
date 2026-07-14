import React, { useState } from 'react';
import { FiArrowLeft, FiStar, FiShoppingBag, FiPlus, FiMinus, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

const productsData = {
  alpha: {
    id: 'alpha',
    name: 'SprintX Alpha',
    price: 180,
    rating: '4.9',
    reviewsCount: 235,
    tag: 'SPEED & PROPULSION',
    desc: 'Introducing the SprintX Alpha. Engineered with a responsive active carbon propulsion plate, 3D knitted breathable mesh, and reactive nitrogen-infused cushioning. Built for runners who demand velocity.',
    colors: [
      { name: 'Neon Green', hex: '#7CFF5B', filterClass: 'hue-rotate-0' },
      { name: 'Electric Cyan', hex: '#00F0FF', filterClass: 'hue-rotate-[110deg] saturate-[1.6]' },
      { name: 'Volt Yellow', hex: '#DFFF00', filterClass: 'hue-rotate-[45deg] saturate-[1.8]' }
    ],
    specs: [
      { label: 'Weight', value: '210g' },
      { label: 'Energy Return', value: '92%' },
      { label: 'Stack Height', value: '32mm' },
      { label: 'Offset', value: '8mm' }
    ]
  },
  aero: {
    id: 'aero',
    name: 'SprintX Aero',
    price: 195,
    rating: '4.8',
    reviewsCount: 148,
    tag: 'LIGHTWEIGHT RACING',
    desc: 'The ultimate featherweight racer. The SprintX Aero features an ultralight mesh upper combined with flex-optimized carbon plates to deliver maximum pacing performance over short to mid distances.',
    colors: [
      { name: 'Electric Blue', hex: '#0066FF', filterClass: 'hue-rotate-[155deg] saturate-[1.5]' },
      { name: 'Cyber Purple', hex: '#B800FF', filterClass: 'hue-rotate-[220deg] saturate-[1.6]' },
      { name: 'Crimson Red', hex: '#FF0055', filterClass: 'hue-rotate-[290deg] saturate-[1.8]' }
    ],
    specs: [
      { label: 'Weight', value: '185g' },
      { label: 'Energy Return', value: '85%' },
      { label: 'Stack Height', value: '28mm' },
      { label: 'Offset', value: '6mm' }
    ]
  },
  vector: {
    id: 'vector',
    name: 'SprintX Vector',
    price: 210,
    rating: '5.0',
    reviewsCount: 92,
    tag: 'MAX COMFORT & GRIP',
    desc: 'Designed for stability and endurance. The SprintX Vector features a thick protective nitrogen foam cushioning system that absorbs high impacts, paired with a dual-compound outsole for maximum surface grip.',
    colors: [
      { name: 'Neon Green', hex: '#7CFF5B', filterClass: 'hue-rotate-0' },
      { name: 'Volt Yellow', hex: '#DFFF00', filterClass: 'hue-rotate-[45deg] saturate-[1.8]' }
    ],
    specs: [
      { label: 'Weight', value: '235g' },
      { label: 'Energy Return', value: '98%' },
      { label: 'Stack Height', value: '36mm' },
      { label: 'Offset', value: '10mm' }
    ]
  },
  pro: {
    id: 'pro',
    name: 'SprintX Pro-Strike',
    price: 160,
    rating: '4.8',
    reviewsCount: 180,
    tag: 'TRACK & FIELD',
    desc: 'Ideal for track events and short sprints. Features structured TPU support wraps, micro-spikes compatibility, and a stiff launch plate for explosive acceleration out of the blocks.',
    colors: [
      { name: 'Hot Crimson', hex: '#FF3366', filterClass: 'hue-rotate-[280deg]' },
      { name: 'Electric Cyan', hex: '#00F0FF', filterClass: 'hue-rotate-[190deg] saturate-[1.5]' }
    ],
    specs: [
      { label: 'Weight', value: '175g' },
      { label: 'Energy Return', value: '88%' },
      { label: 'Stack Height', value: '24mm' },
      { label: 'Offset', value: '4mm' }
    ]
  },
  cloud: {
    id: 'cloud',
    name: 'SprintX Cloud-Run',
    price: 175,
    rating: '4.9',
    reviewsCount: 310,
    tag: 'MARATHON COMFORT',
    desc: 'Nitrogen foam optimized for marathon comfort. Reduces leg muscle fatigue over long hours while maintaining highly reactive energy returns with every stride.',
    colors: [
      { name: 'Electric Cyan', hex: '#00F0FF', filterClass: 'hue-rotate-[190deg] saturate-[1.5]' },
      { name: 'Volt Yellow', hex: '#DFFF00', filterClass: 'hue-rotate-[45deg] saturate-[1.8]' }
    ],
    specs: [
      { label: 'Weight', value: '220g' },
      { label: 'Energy Return', value: '94%' },
      { label: 'Stack Height', value: '35mm' },
      { label: 'Offset', value: '9mm' }
    ]
  },
  apex: {
    id: 'apex',
    name: 'SprintX Apex-Velocity',
    price: 230,
    rating: '5.0',
    reviewsCount: 84,
    tag: 'ELITE COMPETITION',
    desc: 'Premium elite racer with a custom carbon fiber shell, nitrogen propulsion core, and specialized low-drag upper to slice through air currents during peak performance runs.',
    colors: [
      { name: 'Volt Yellow', hex: '#DFFF00', filterClass: 'hue-rotate-[80deg] saturate-[1.6]' },
      { name: 'Electric Cyan', hex: '#00F0FF', filterClass: 'hue-rotate-[190deg] saturate-[1.5]' }
    ],
    specs: [
      { label: 'Weight', value: '190g' },
      { label: 'Energy Return', value: '96%' },
      { label: 'Stack Height', value: '38mm' },
      { label: 'Offset', value: '8mm' }
    ]
  },
  hydro: {
    id: 'hydro',
    name: 'SprintX Hydro-Stealth',
    price: 190,
    rating: '4.7',
    reviewsCount: 115,
    tag: 'ALL-WEATHER SHIELD',
    desc: 'All-weather water resistant woven knit upper that repels rain and dew without trapping moisture. Features deep lug traction channels to ensure stability on slippery streets.',
    colors: [
      { name: 'Neon Green', hex: '#7CFF5B', filterClass: 'hue-rotate-[40deg] brightness-[0.8] contrast-[1.4]' },
      { name: 'Electric Blue', hex: '#0066FF', filterClass: 'hue-rotate-[150deg]' }
    ],
    specs: [
      { label: 'Weight', value: '230g' },
      { label: 'Energy Return', value: '89%' },
      { label: 'Stack Height', value: '30mm' },
      { label: 'Offset', value: '7mm' }
    ]
  }
};

const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];

export default function ProductDetails({ productId, onBack, onAddToCart }) {
  const product = productsData[productId] || productsData.alpha;

  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('9'); // Default size Men's 9
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

  const activeColor = product.colors[activeColorIdx];

  const handleAddClick = () => {
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        color: activeColor.name,
        size: selectedSize,
        qty: quantity,
      });
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] pt-36 pb-16 relative z-30 select-none">
      
      {/* Background radial glow */}
      <div 
        style={{ backgroundColor: activeColor.hex }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full opacity-5 blur-[180px] transition-all duration-500" 
      />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Top Navigation Bar / Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-secondary transition-all duration-300 hover:border-accent hover:text-accent w-fit"
          >
            <FiArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Catalog
          </button>
          
          <div className="text-[10px] font-bold text-grayMuted uppercase tracking-widest font-mono">
            Catalog / Shoes / <span className="text-secondary">{product.name}</span>
          </div>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Visualizer */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative bg-[#090909]/40 border border-white/5 rounded-3xl p-8 aspect-square overflow-hidden">
            
            {/* Spinning Radar circles */}
            <div className="absolute h-96 w-96 rounded-full border border-white/[0.02] flex items-center justify-center animate-[spin_40s_linear_infinite]">
              <div className="h-72 w-72 rounded-full border border-dashed border-white/[0.04] flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]" />
            </div>

            {/* Glowing spot matching color */}
            <div 
              style={{ backgroundColor: activeColor.hex }}
              className="absolute h-40 w-40 rounded-full opacity-10 blur-2xl transition-all duration-500" 
            />

            {/* Interactive Image */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full h-full max-w-[400px] flex items-center justify-center z-10"
            >
              <img 
                src="/assets/sprintx_alpha_main.png" 
                alt={product.name} 
                className={`h-full w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] transition-all duration-700 ${activeColor.filterClass}`}
              />
            </motion.div>
          </div>

          {/* Right Column: Configurator & Data Sheet */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Tag & Ratings */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[9px] font-black tracking-widest text-accent uppercase font-mono bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
                {product.tag}
              </span>
              <div className="flex items-center gap-1">
                <FiStar className="fill-accent text-accent h-3.5 w-3.5" />
                <span className="text-xs font-bold text-secondary">{product.rating}</span>
                <span className="text-[10px] text-grayMuted font-light">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-secondary tracking-tight mb-2">
              {product.name}
            </h1>
            
            {/* Pricing */}
            <div className="text-3xl font-black text-secondary mb-6">${product.price}.00</div>

            {/* Description */}
            <p className="text-xs sm:text-sm font-light leading-relaxed text-grayMuted mb-8">
              {product.desc}
            </p>

            <div className="border-t border-white/5 pt-8 flex flex-col gap-8">
              
              {/* Color Selector */}
              <div>
                <h4 className="text-[9px] font-black tracking-widest text-white/40 uppercase font-mono mb-3">
                  Select Colorway: <span className="text-secondary font-bold">{activeColor.name}</span>
                </h4>
                <div className="flex gap-3">
                  {product.colors.map((color, colorIdx) => {
                    const isColorActive = activeColorIdx === colorIdx;
                    return (
                      <button
                        key={colorIdx}
                        onClick={() => setActiveColorIdx(colorIdx)}
                        className="relative flex items-center justify-center h-8 w-8 transition-all duration-300 focus:outline-none"
                        title={color.name}
                      >
                        <span 
                          style={{ backgroundColor: color.hex }} 
                          className={`h-5 w-5 rounded-full transition-all duration-300 ${
                            isColorActive ? 'scale-100 shadow-glow' : 'scale-90 hover:scale-105'
                          }`}
                        />
                        {isColorActive && (
                          <>
                            <span 
                              style={{ borderColor: color.hex }} 
                              className="absolute inset-0 rounded-full border border-current opacity-40 animate-ping duration-1000" 
                            />
                            <span 
                              style={{ borderColor: color.hex }} 
                              className="absolute inset-0.5 rounded-full border-2 opacity-80"
                            />
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <h4 className="text-[9px] font-black tracking-widest text-white/40 uppercase font-mono mb-3">
                  Select Size (US Men's):
                </h4>
                <div className="grid grid-cols-6 gap-2 max-w-sm">
                  {sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 text-xs font-bold font-mono rounded-lg border transition-all duration-300 ${
                          isSelected 
                            ? 'bg-accent border-accent text-primary shadow-glow' 
                            : 'border-white/10 hover:border-accent/40 text-secondary bg-[#090909]/40 hover:bg-[#0c0c0c]/80'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector & CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                
                {/* Quantity Editor */}
                <div className="flex items-center border border-white/10 bg-[#090909]/40 rounded-full px-2 py-1 flex-shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-secondary hover:text-accent transition-colors"
                  >
                    <FiMinus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-secondary font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-secondary hover:text-accent transition-colors"
                  >
                    <FiPlus className="h-3 w-3" />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddClick}
                  disabled={isAdded}
                  className={`relative flex items-center justify-center gap-3 rounded-full py-3.5 text-xs font-bold uppercase tracking-wider text-primary transition-all duration-300 w-full sm:w-[220px] shadow-glow ${
                    isAdded ? 'bg-secondary text-primary' : 'bg-accent hover:bg-secondary'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <FiCheck className="h-4 w-4 animate-bounce" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <FiShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Specifications, Features, and Reviews Tabs */}
        <div className="mt-20 border-t border-white/5 pt-12">
          {/* Tab Headers */}
          <div className="flex gap-8 border-b border-white/5 pb-4 mb-8">
            {['specs', 'features', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-black uppercase tracking-widest transition-all duration-300 relative pb-4 -mb-5 ${
                  activeTab === tab ? 'text-accent' : 'text-grayMuted hover:text-secondary'
                }`}
              >
                {tab === 'specs' ? 'Tech Specs' : tab === 'features' ? 'Features' : 'Reviews'}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent shadow-glow" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="min-h-[200px]">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#090909]/40 border border-white/5 rounded-3xl p-6 sm:p-8 text-left">
                {product.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex flex-col">
                    <span className="text-[9px] font-black text-white/30 tracking-wider font-mono uppercase mb-1">
                      {spec.label}
                    </span>
                    <span className="text-sm font-black text-secondary tracking-wide uppercase font-mono">
                      {spec.value}
                    </span>
                  </div>
                ))}
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-white/30 tracking-wider font-mono uppercase mb-1">
                    Terrain
                  </span>
                  <span className="text-sm font-black text-secondary tracking-wide uppercase font-mono">
                    Road / Track
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-white/30 tracking-wider font-mono uppercase mb-1">
                    Arch Support
                  </span>
                  <span className="text-sm font-black text-secondary tracking-wide uppercase font-mono">
                    Neutral
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-white/30 tracking-wider font-mono uppercase mb-1">
                    Cushioning
                  </span>
                  <span className="text-sm font-black text-secondary tracking-wide uppercase font-mono">
                    Max Response
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-white/30 tracking-wider font-mono uppercase mb-1">
                    Closure
                  </span>
                  <span className="text-sm font-black text-secondary tracking-wide uppercase font-mono">
                    Futuristic Lace Wrap
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-[#090909]/40 border border-white/5 rounded-3xl p-6 flex flex-col gap-3">
                  <span className="text-accent text-[9px] font-black tracking-widest font-mono uppercase">// CARBON COMPOSITE</span>
                  <h4 className="text-sm font-black uppercase text-secondary">Propulsion Shield</h4>
                  <p className="text-xs text-grayMuted font-light leading-relaxed">
                    S-Curve carbon fiber plate runs the full length of the shoe. Optimizes mechanical leverage to snap forward at high velocities.
                  </p>
                </div>
                <div className="bg-[#090909]/40 border border-white/5 rounded-3xl p-6 flex flex-col gap-3">
                  <span className="text-accent text-[9px] font-black tracking-widest font-mono uppercase">// SUPERCRITICAL FOAM</span>
                  <h4 className="text-sm font-black uppercase text-secondary">Nitrogen Core</h4>
                  <p className="text-xs text-grayMuted font-light leading-relaxed">
                    Midsole is infused with nitrogen under supercritical pressure, producing microscopic gas bubbles that deliver maximum energy return.
                  </p>
                </div>
                <div className="bg-[#090909]/40 border border-white/5 rounded-3xl p-6 flex flex-col gap-3">
                  <span className="text-accent text-[9px] font-black tracking-widest font-mono uppercase">// ENGINEERED KNIT</span>
                  <h4 className="text-sm font-black uppercase text-secondary">3D Breathe Upper</h4>
                  <p className="text-xs text-grayMuted font-light leading-relaxed">
                    Woven with precision tensile yarns to lock down your midfoot while maintaining complete circular airflow to prevent hot spots.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="flex flex-col md:flex-row gap-8">
                {/* Rating summary */}
                <div className="bg-[#090909]/40 border border-white/5 rounded-3xl p-6 w-full md:max-w-[240px] flex flex-col items-center justify-center text-center">
                  <div className="text-5xl font-black text-secondary font-mono mb-2">{product.rating}</div>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar key={star} className="fill-accent text-accent h-4 w-4" />
                    ))}
                  </div>
                  <span className="text-[10px] text-grayMuted font-medium uppercase tracking-wider font-mono">
                    Based on {product.reviewsCount} reviews
                  </span>
                </div>

                {/* Individual reviews */}
                <div className="flex-1 flex flex-col gap-4">
                  {[
                    { name: 'Marcus Vance', rating: 5.0, text: 'Pre-ordered the Volt colorway. Ran a personal best on my first 10K. Incredibly responsive carbon plate.' },
                    { name: 'Elena Rostova', rating: 5.0, text: 'The nitrogen foam absorbs high impact. Fits like a glove. Highly recommended for long distance.' },
                    { name: 'Dave Chen', rating: 4.8, text: 'Top-tier speed and styling. Looks futuristic and performs even better. The traction is superb on wet pavement.' }
                  ].map((rev, rIdx) => (
                    <div key={rIdx} className="bg-[#090909]/30 border border-white/5 rounded-2xl p-5 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-secondary">{rev.name}</span>
                        <div className="flex items-center gap-1">
                          <FiStar className="fill-accent text-accent h-3 w-3" />
                          <span className="text-[10px] font-bold text-secondary font-mono">{rev.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-grayMuted font-light leading-relaxed text-left">{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
