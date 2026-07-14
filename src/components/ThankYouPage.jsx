import React from 'react';
import { FiCheckCircle, FiCpu, FiHome, FiShoppingBag, FiTruck } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ThankYouPage({ order, onHome }) {
  // Graceful fallback for undefined orders
  const details = order || {
    orderNumber: 'SX-000000',
    name: 'Guest Runner',
    email: 'runner@sprintx.com',
    phone: '+1 234 567 890',
    address: '100 Speed Way',
    zip: '90001',
    state: 'California',
    paymentMethod: 'Credit Card',
    total: 0
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] pt-36 pb-20 relative z-30 select-none text-left">
      
      {/* Spotlight gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[200px] pointer-events-none" />

      <div className="mx-auto max-w-2xl px-6 md:px-8">
        
        {/* Success header animation card */}
        <div className="bg-[#090909]/40 border border-accent/25 rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center shadow-glow bg-accent/[0.005] mb-8">
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-accent mb-6"
          >
            <FiCheckCircle className="h-16 w-16 stroke-[1.5] filter drop-shadow-[0_0_15px_rgba(124,255,91,0.5)] animate-[pulse_2s_infinite]" />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase text-secondary tracking-tight mb-2">
            MISSION ACCOMPLISHED
          </h1>
          <p className="text-xs text-grayMuted font-light uppercase tracking-wider font-mono">
            Order Dispatched to Telemetry Hub
          </p>

          <div className="h-[1px] w-full bg-white/5 my-6" />

          <p className="text-xs sm:text-sm text-grayMuted font-light leading-relaxed max-w-md">
            Thank you for your order, <span className="text-secondary font-bold">{details.name}</span>! 
            Your transaction has been finalized and a digital receipt has been sent to <span className="text-accent font-medium font-mono">{details.email}</span>.
          </p>
        </div>

        {/* Detailed receipt card */}
        <div className="bg-[#090909]/40 border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <FiCpu className="text-accent h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary font-mono">
                TELEMETRY RECEIPT
              </span>
            </div>
            <span className="text-[9px] font-bold text-accent font-mono bg-accent/10 border border-accent/20 px-2.5 py-0.5 rounded-full uppercase">
              Paid
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-[10px] text-grayMuted">
            {/* Order number */}
            <div className="flex flex-col gap-1">
              <span>ORDER NUMBER</span>
              <span className="text-secondary font-bold text-xs">{details.orderNumber}</span>
            </div>

            {/* Estimated delivery */}
            <div className="flex flex-col gap-1">
              <span>DELIVERY TIMELINE</span>
              <span className="text-secondary font-bold text-xs flex items-center gap-1.5">
                <FiTruck className="text-accent h-3.5 w-3.5" />
                3 - 5 BUSINESS DAYS
              </span>
            </div>

            {/* Delivery address */}
            <div className="flex flex-col gap-1 sm:col-span-2">
              <span>SHIPPING ADDRESS</span>
              <span className="text-secondary font-bold text-xs uppercase leading-relaxed">
                {details.address}, {details.state} {details.zip}
              </span>
            </div>

            {/* Payment method */}
            <div className="flex flex-col gap-1">
              <span>PAYMENT METHOD</span>
              <span className="text-secondary font-bold text-xs uppercase">{details.paymentMethod}</span>
            </div>

            {/* Total */}
            <div className="flex flex-col gap-1">
              <span>TOTAL VALUE</span>
              <span className="text-accent font-bold text-xs">${details.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 mt-2 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onHome}
              className="flex-1 flex items-center justify-center gap-2.5 rounded-full bg-accent py-4 text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:bg-secondary"
            >
              <FiHome className="h-4 w-4" />
              Return to Catalog
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
