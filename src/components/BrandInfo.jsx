import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiZap, FiTarget, FiActivity } from 'react-icons/fi';

const brandPillars = [
  {
    icon: <FiZap className="h-6 w-6 text-accent" />,
    title: "Supercritical Cushioning",
    tag: "CHEMISTRY & LABS",
    desc: "By infusing raw materials with supercritical nitrogen gas at extreme pressures, we create a cell structure that is 35% lighter and delivers 94% energy return—dramatically reducing muscle fatigue during long-distance endurance runs.",
    stats: "94% Energy Return"
  },
  {
    icon: <FiTarget className="h-6 w-6 text-accent" />,
    title: "Mechanical Propulsion",
    tag: "S-CURVE CARBON PLATES",
    desc: "An aerospace-grade carbon fiber plate is sandwiched between dual layers of nitrogen foam. Specially curved to align with foot flex points, it acts as a mechanical spring that catapults you forward with every toe-off.",
    stats: "Aerospace Grade Plates"
  },
  {
    icon: <FiCpu className="h-6 w-6 text-accent" />,
    title: "Integrated Telemetry",
    tag: "BIO-SENSOR CORE",
    desc: "Every pair houses a waterproof micro-sensor chip under the arch. Syncing seamlessly with our mobile hub, it measures real-time stride cadence, pronation angles, and landing impact forces without adding detectable weight.",
    stats: "Real-time Stride Tracking"
  }
];

export default function BrandInfo() {
  return (
    <section className="relative z-10 w-full bg-[#050505] py-24 border-b border-white/5 overflow-hidden">
      
      {/* Dynamic glow spotlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[200px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-white/[0.01] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-black tracking-widest text-accent uppercase block font-mono mb-3">
            // OUR ENGINEERING MANIFESTO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tight uppercase leading-none text-secondary mb-3">
            THE SCIENCE <span className="text-accent not-italic">OF SPEED</span>
          </h2>
          <div className="w-16 h-[2px] bg-accent mx-auto mb-3" />
          <p className="text-sm font-light text-grayMuted max-w-md mx-auto">
            At SprintX, we don't just design footwear—we engineer high-performance human propulsion systems.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {brandPillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative flex flex-col bg-[#090909]/40 border border-white/5 rounded-3xl p-8 hover:border-accent/25 hover:shadow-[0_0_40px_rgba(210,253,9,0.03)] transition-all duration-500 text-left"
            >
              {/* Icon / Top row */}
              <div className="flex items-center justify-between mb-8">
                <div className="h-12 w-12 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:text-primary">
                  {pillar.icon}
                </div>
                <span className="text-[9px] font-black text-accent font-mono bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full uppercase">
                  {pillar.stats}
                </span>
              </div>

              {/* Title & Tag */}
              <div className="mb-4">
                <span className="text-[8px] font-black tracking-widest text-white/30 uppercase font-mono block mb-1">
                  {pillar.tag}
                </span>
                <h3 className="text-xl font-black uppercase text-secondary group-hover:text-accent transition-colors duration-300">
                  {pillar.title}
                </h3>
              </div>

              {/* Desc */}
              <p className="text-xs font-light leading-relaxed text-grayMuted">
                {pillar.desc}
              </p>

              {/* Bottom design accent */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2">
                <FiActivity className="h-4.5 w-4.5 text-white/10 group-hover:text-accent/30 transition-colors" />
                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest font-mono group-hover:text-white/40">
                  SprintX Labs verified
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
