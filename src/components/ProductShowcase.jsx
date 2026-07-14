import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { FiStar, FiShoppingBag, FiArrowLeft, FiArrowRight, FiCpu } from 'react-icons/fi';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

export default function ProductShowcase({ onProductSelect }) {
  // Track active slide index to update global section background
  const [activeSlide, setActiveSlide] = useState(0);

  // Swiper instance state
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Refs for custom navigation buttons
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  // Bind Swiper navigation natively after DOM mounts and refs are set
  useEffect(() => {
    if (swiperInstance && prevBtnRef.current && nextBtnRef.current) {
      swiperInstance.params.navigation.prevEl = prevBtnRef.current;
      swiperInstance.params.navigation.nextEl = nextBtnRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  // Individual shoe configurations
  const [shoes, setShoes] = useState([
    {
      id: 'alpha',
      name: 'SprintX Alpha',
      price: '$180',
      rating: 4.9,
      reviews: '235 reviews',
      tag: 'SPEED & PROPULSION',
      features: ['Nitro-Boost Foam', 'Carbon Fiber Inlay', '3D Knit Upper'],
      specs: [
        { label: 'RESPONSIVENESS', value: '92%', progress: 92 },
        { label: 'WEIGHT EFFICIENCY', value: '210g', progress: 90 },
        { label: 'IMPACT ABSORPTION', value: '88%', progress: 88 },
        { label: 'TRACTION INDEX', value: '94%', progress: 94 }
      ],
      quickTech: [
        { label: 'OFFSET', value: '8mm' },
        { label: 'STACK HEIGHT', value: '32mm' },
        { label: 'PLATE TECH', value: 'S-Curve Carbon' }
      ],
      colors: [
        { name: 'Neon Green', hex: '#7CFF5B', filterClass: 'hue-rotate-0' },
        { name: 'Electric Cyan', hex: '#00F0FF', filterClass: 'hue-rotate-[110deg] saturate-[1.6]' },
        { name: 'Volt Yellow', hex: '#DFFF00', filterClass: 'hue-rotate-[45deg] saturate-[1.8]' }
      ],
      activeColorIdx: 0,
      baseBg: 'rgba(124, 255, 91, 0.06)'
    },
    {
      id: 'aero',
      name: 'SprintX Aero',
      price: '$195',
      rating: 4.8,
      reviews: '148 reviews',
      tag: 'LIGHTWEIGHT RACING',
      features: ['Lightweight Air-Mesh', 'Active Flex Carbon', 'Reactive Cushion'],
      specs: [
        { label: 'RESPONSIVENESS', value: '85%', progress: 85 },
        { label: 'WEIGHT EFFICIENCY', value: '185g', progress: 98 },
        { label: 'IMPACT ABSORPTION', value: '91%', progress: 91 },
        { label: 'TRACTION INDEX', value: '89%', progress: 89 }
      ],
      quickTech: [
        { label: 'OFFSET', value: '6mm' },
        { label: 'STACK HEIGHT', value: '28mm' },
        { label: 'PLATE TECH', value: 'Carbon Shank' }
      ],
      colors: [
        { name: 'Electric Blue', hex: '#0066FF', filterClass: 'hue-rotate-[155deg] saturate-[1.5]' },
        { name: 'Cyber Purple', hex: '#B800FF', filterClass: 'hue-rotate-[220deg] saturate-[1.6]' },
        { name: 'Crimson Red', hex: '#FF0055', filterClass: 'hue-rotate-[290deg] saturate-[1.8]' }
      ],
      activeColorIdx: 0,
      baseBg: 'rgba(0, 102, 255, 0.06)'
    },
    {
      id: 'vector',
      name: 'SprintX Vector',
      price: '$210',
      rating: 5.0,
      reviews: '92 reviews',
      tag: 'MAX COMFORT & GRIP',
      features: ['Hyper Grip Outsole', 'Explosive Launch Shank', 'Pro Comfort Cushion'],
      specs: [
        { label: 'RESPONSIVENESS', value: '98%', progress: 98 },
        { label: 'WEIGHT EFFICIENCY', value: '235g', progress: 72 },
        { label: 'IMPACT ABSORPTION', value: '96%', progress: 96 },
        { label: 'TRACTION INDEX', value: '99%', progress: 99 }
      ],
      quickTech: [
        { label: 'OFFSET', value: '10mm' },
        { label: 'STACK HEIGHT', value: '36mm' },
        { label: 'PLATE TECH', value: 'Dual Carbon Matrix' }
      ],
      colors: [
        { name: 'Hot Crimson', hex: '#FF3300', filterClass: 'hue-rotate-[315deg] saturate-[2]' },
        { name: 'Fusion Orange', hex: '#FF9900', filterClass: 'hue-rotate-[15deg] saturate-[2.2]' },
        { name: 'Carbon Black', hex: '#111111', filterClass: 'contrast-[1.2] brightness-[0.7]' }
      ],
      activeColorIdx: 0,
      baseBg: 'rgba(255, 51, 0, 0.06)'
    }
  ]);

  const handleColorChange = (shoeIdx, colorIdx) => {
    setShoes(prevShoes => {
      const newShoes = [...prevShoes];
      newShoes[shoeIdx].activeColorIdx = colorIdx;
      return newShoes;
    });
  };

  // Background color calculated by active slide and its active color hex/rgba
  const getSectionBg = () => {
    const currentShoe = shoes[activeSlide];
    if (!currentShoe) return '#050505';
    return currentShoe.baseBg;
  };

  return (
    <section 
      className="overcome-limits relative z-10 w-full py-24 transition-colors duration-1000 select-none bg-[#050505]"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${getSectionBg()} 0%, #050505 80%)`
      }}
      id="showcase"
    >
      {/* Grid background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center mb-16 pointer-events-none section-heading">
          <span className="text-[10px] font-black tracking-widest text-accent uppercase">
            EXPLORE THE RANGE
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-none tracking-tight text-secondary">
            SELECT YOUR <span className="text-accent">SHOES</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-grayMuted">
            Each model is custom engineered for specific running styles. Find your fit and crush your limits.
          </p>
        </div>

        {/* Swiper Premium Carousel Container */}
        <div className="relative py-8 px-4 md:px-12">
          
          {/* Custom Navigation Button Left */}
          <div 
            ref={prevBtnRef}
            className="custom-prev-btn absolute left-0 md:left-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/5 bg-[#090909]/80 backdrop-blur-md flex items-center justify-center text-secondary hover:text-accent hover:border-accent/40 hover:shadow-glow cursor-pointer transition-all duration-300 z-50 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"
          >
            <FiArrowLeft className="text-lg" />
          </div>

          {/* Custom Navigation Button Right */}
          <div 
            ref={nextBtnRef}
            className="custom-next-btn absolute right-0 md:right-2 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/5 bg-[#090909]/80 backdrop-blur-md flex items-center justify-center text-secondary hover:text-accent hover:border-accent/40 hover:shadow-glow cursor-pointer transition-all duration-300 z-50 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"
          >
            <FiArrowRight className="text-lg" />
          </div>

          <Swiper
            modules={[EffectCoverflow, Navigation]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            spaceBetween={10}
            coverflowEffect={{
              rotate: 10,
              stretch: -20,
              depth: 120,
              modifier: 1,
              slideShadows: false,
            }}
            navigation={{
              prevEl: prevBtnRef.current,
              nextEl: nextBtnRef.current,
            }}
            loop={true}
            loopedSlides={3}
            watchSlidesProgress={true}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex % 3)}
            className="product-swiper"
          >
            {[...shoes, ...shoes].map((shoe, shoeIdx) => {
              const activeColor = shoe.colors[shoe.activeColorIdx];
              const isCurrentActive = activeSlide === (shoeIdx % 3);

              return (
                <SwiperSlide key={`${shoe.id}-${shoeIdx}`} className="px-4 py-8 !w-[290px] sm:!w-[340px]">
                  <div 
                    onClick={(e) => {
                      console.log("ProductShowcase slide clicked, event target:", e.target);
                      if (e.target.closest('button')) {
                        console.log("Ignored showcase card click because button was clicked");
                        return;
                      }
                      console.log("Calling onProductSelect with id:", shoe.id);
                      if (onProductSelect) onProductSelect(shoe.id);
                    }}
                    className={`group/card relative flex flex-col border-2 rounded-3xl p-6 transition-all duration-700 bg-[#090909]/60 backdrop-blur-xl w-full mx-auto cursor-pointer ${
                      isCurrentActive
                        ? 'border-accent/30 shadow-[0_15px_40px_rgba(0,0,0,0.65),0_0_30px_rgba(124,255,91,0.15)]'
                        : 'border-white/5 opacity-50 scale-95'
                    }`}
                  >
                    
                    {/* Floating Product Code Header */}
                    <div className="flex justify-between items-center text-[10px] font-black tracking-widest text-white/30 font-mono mb-6">
                      <span className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${isCurrentActive ? 'bg-accent animate-ping' : 'bg-white/20'}`} />
                        MODEL SERIES // 0{(shoeIdx % 3) + 1}
                      </span>
                      <span className="flex items-center gap-1.5 border border-white/5 px-2 py-0.5 rounded-full bg-white/[0.01]">
                        <FiStar className="fill-accent text-accent h-3 w-3" />
                        <span className="text-secondary">{shoe.rating}</span>
                      </span>
                    </div>

                    {/* Shoe Visual Showcase with rotation and shadow */}
                    <div className="relative h-[200px] w-full flex items-center justify-center mb-6 overflow-hidden select-none">
                      <div className="absolute inset-0 bg-radial-gradient from-accent/5 to-transparent blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                      
                      {/* Interactive Hue-rotated shoe image */}
                      <img
                        src="/assets/sprintx_alpha_main.png"
                        alt={shoe.name}
                        className={`h-full w-full object-contain transform transition-all duration-700 ease-out group-hover/card:scale-105 group-hover/card:-rotate-3 ${activeColor.filterClass}`}
                      />
                    </div>

                    {/* Shoe Details */}
                    <div className="mb-2">
                      <span className="text-[8px] font-black tracking-widest text-accent/80 uppercase font-mono block mb-0.5">
                        {shoe.tag}
                      </span>
                      <h3 className="text-2xl font-black italic uppercase text-secondary tracking-wide leading-none">
                        {shoe.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-white/5">
                      <span className="text-xl font-black text-accent">{shoe.price}</span>
                      <span className="text-[10px] text-grayMuted font-light">{shoe.reviews}</span>
                    </div>

                    {/* Live Tech Specs Telemetry Bars */}
                    <div className="flex flex-col gap-3.5 mb-6">
                      <h4 className="text-[9px] font-black tracking-widest text-white/30 uppercase font-mono flex items-center gap-1">
                        <FiCpu className="text-xs" /> PERFORMANCE SPECIFICATIONS
                      </h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {shoe.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex flex-col gap-1">
                            <div className="flex justify-between items-baseline text-[7px] font-bold text-white/40 tracking-wider">
                              <span>{spec.label}</span>
                              <span className="text-secondary font-mono">{spec.value}</span>
                            </div>
                            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                              <div 
                                style={{ width: isCurrentActive ? `${spec.progress}%` : '0%' }}
                                className="h-full bg-accent transition-all duration-1000 ease-out" 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bullet Specs Row */}
                    <div className="grid grid-cols-3 gap-2 border-t border-b border-white/5 py-3.5 mb-6 text-center">
                      {shoe.quickTech.map((qt, qIdx) => (
                        <div key={qIdx} className="flex flex-col gap-0.5">
                          <span className="text-[6.5px] font-bold text-white/30 tracking-wider font-mono uppercase">
                            {qt.label}
                          </span>
                          <span className="text-[10px] font-black text-secondary tracking-wide uppercase font-mono">
                            {qt.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Color Selector & CTA Button */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      
                      {/* Interactive Target Configurator Circles */}
                      <div className="flex gap-2">
                        {shoe.colors.map((color, colorIdx) => {
                          const isColorActive = shoe.activeColorIdx === colorIdx;
                          return (
                            <button
                              key={colorIdx}
                              onClick={() => handleColorChange(shoeIdx % 3, colorIdx)}
                              className="relative flex items-center justify-center h-7 w-7 transition-all duration-300 focus:outline-none"
                              title={color.name}
                            >
                              <span 
                                style={{ backgroundColor: color.hex }} 
                                className={`h-4.5 w-4.5 rounded-full transition-all duration-300 ${
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

                      {/* Buy CTA */}
                      <button 
                        onClick={() => {
                          console.log("ProductShowcase CTA button clicked, calling onProductSelect with id:", shoe.id);
                          if (onProductSelect) onProductSelect(shoe.id);
                        }}
                        className="group/btn relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary shadow-glow transition-all duration-500 hover:w-28 hover:bg-secondary"
                      >
                        <FiShoppingBag className="h-4 w-4" />
                        <span className="absolute overflow-hidden whitespace-nowrap opacity-0 group-hover/btn:opacity-100 group-hover/btn:relative group-hover/btn:ml-1 text-[10px] font-bold uppercase tracking-widest transition-opacity duration-300">
                          Configure
                        </span>
                      </button>

                    </div>

                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* View All Products CTA */}
        <div className="flex justify-center mt-12 view-all-cta">
          <a
            href="#bestsellers"
            className="group relative inline-flex items-center justify-center rounded-full border-2 border-accent px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-secondary transition-all duration-300 hover:bg-accent hover:text-primary hover:shadow-glow hover:scale-105"
          >
            View All Products
          </a>
        </div>

      </div>
    </section>
  );
}
