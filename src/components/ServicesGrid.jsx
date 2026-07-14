import React from 'react';
import { motion } from 'framer-motion';
import { FiTruck, FiRotateCcw, FiShield, FiSliders } from 'react-icons/fi';

const services = [
  {
    icon: <FiTruck className="h-6 w-6 text-accent" />,
    title: "Priority Telemetry Shipping",
    desc: "Every order over $150 receives free expedited priority shipping. Dispatched from our central hubs with real-time route telemetry tracking."
  },
  {
    icon: <FiRotateCcw className="h-6 w-6 text-accent" />,
    title: "30-Day Speed Trial",
    desc: "Take them to the track, road, or trail. If our shoes don't help you crush your personal records within 30 days, send them back for a full refund."
  },
  {
    icon: <FiShield className="h-6 w-6 text-accent" />,
    title: "Sensor Chip Warranty",
    desc: "The built-in telemetry arch microchip is covered under a lifetime replacement warranty. Track your stride stats with complete peace of mind."
  },
  {
    icon: <FiSliders className="h-6 w-6 text-accent" />,
    title: "Stride Analysis Booking",
    desc: "Unlock a free 1-on-1 virtual consultation with our biomechanics experts to analyze your shoe's telemetry log data and optimize your running form."
  }
];

export default function ServicesGrid() {
  return (
    <section className="relative z-10 w-full bg-[#050505] py-20 border-b border-white/5 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[450px] w-[450px] rounded-full bg-accent/5 blur-[180px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-black tracking-widest text-accent uppercase block font-mono mb-3">
            // SPRINTX BENEFITS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tight uppercase leading-none text-secondary mb-3">
            PREMIUM <span className="text-accent not-italic">SERVICES</span>
          </h2>
          <div className="w-16 h-[2px] bg-accent mx-auto mb-3" />
          <p className="text-sm font-light text-grayMuted max-w-md mx-auto">
            We support your quest for speed with industry-leading buyer guarantees and runner analysis services.
          </p>
        </div>

        {/* 2x2 or 4-Column Grid View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative flex flex-col bg-[#090909]/30 border border-white/5 rounded-3xl p-6 hover:border-accent/20 hover:bg-[#0c0c0c]/50 transition-all duration-300 text-left"
            >
              {/* Icon Container */}
              <div className="h-11 w-11 rounded-2xl bg-accent/5 border border-accent/15 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-accent group-hover:text-primary">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-sm font-black uppercase text-secondary tracking-tight mb-2 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-[11px] font-light leading-relaxed text-grayMuted">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
