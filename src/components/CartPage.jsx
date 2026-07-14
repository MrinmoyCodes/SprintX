import React, { useState } from 'react';
import { FiArrowLeft, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiCheck, FiCpu, FiCreditCard } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to match colors to appropriate hue filters for accurate previews
const getFilterClass = (colorName) => {
  if (!colorName) return '';
  const name = colorName.toLowerCase();
  if (name.includes('cyan') || name.includes('blue')) {
    return 'hue-rotate-[190deg] saturate-[1.5]';
  }
  if (name.includes('pink') || name.includes('crimson') || name.includes('purple') || name.includes('hot')) {
    return 'hue-rotate-[280deg]';
  }
  if (name.includes('yellow')) {
    return 'hue-rotate-[60deg] saturate-[1.6]';
  }
  return ''; // default Volt Green
};

export default function CartPage({ cart, setCart, onBack, onCheckout, onOpenListing }) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleQtyChange = (idx, amount) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const newQty = newCart[idx].qty + amount;
      if (newQty < 1) return prevCart;
      newCart[idx] = { ...newCart[idx], qty: newQty };
      return newCart;
    });
  };

  const handleRemoveItem = (idx) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== idx));
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    
    if (promoCode.trim().toUpperCase() === 'SPRINT20') {
      setDiscountPercent(20);
      setPromoSuccess('Promo SPRINT20 applied! 20% discount added.');
    } else {
      setPromoError('Invalid promo code. Try SPRINT20');
    }
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discount = (subtotal * discountPercent) / 100;
  const discountedSubtotal = subtotal - discount;
  
  // Shipping: free above $150
  const shipping = subtotal === 0 ? 0 : (discountedSubtotal >= 150 ? 0 : 15);
  const tax = discountedSubtotal * 0.08; // 8% sales tax
  const total = discountedSubtotal + shipping + tax;

  const isCartEmpty = cart.length === 0;

  return (
    <div className="min-h-screen w-full bg-[#050505] pt-36 pb-16 relative z-30 select-none">
      
      {/* Dynamic glow spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[180px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Top Header / Back navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-secondary transition-all duration-300 hover:border-accent hover:text-accent w-fit"
          >
            <FiArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Continue Shopping
          </button>
          
          <div className="text-[10px] font-bold text-grayMuted uppercase tracking-widest font-mono">
            Cart / Checkout Summary
          </div>
        </div>

        {isCartEmpty ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center text-center py-20 bg-[#090909]/40 border border-white/5 rounded-3xl p-8 max-w-xl mx-auto">
            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-6">
              <FiShoppingBag className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-black uppercase text-secondary mb-2">Your Cart is Empty</h2>
            <p className="text-xs text-grayMuted font-light leading-relaxed max-w-xs mb-8">
              Looks like you haven't added any high-performance runners yet. Explore our latest models to get started.
            </p>
            <button
              onClick={onOpenListing || onBack}
              className="rounded-full bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:bg-secondary"
            >
              Discover Shoes
            </button>
          </div>
        ) : (
          /* Cart Main Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {cart.map((item, idx) => (
                <div 
                  key={`${item.id}-${item.color}-${item.size}-${idx}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-[#090909]/40 border border-white/5 rounded-3xl p-5 text-left"
                >
                  {/* Thumbnail Preview and Item details side-by-side on mobile */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Thumbnail Preview */}
                    <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-[#090909] border border-white/5 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      <img 
                        src="/assets/sprintx_alpha_main.png" 
                        alt={item.name} 
                        className={`h-16 w-16 sm:h-20 sm:w-20 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] ${getFilterClass(item.color)}`}
                      />
                    </div>

                    {/* Metadata description (Mobile) */}
                    <div className="flex-1 sm:hidden">
                      <h3 className="text-base font-black uppercase text-secondary">{item.name}</h3>
                      <div className="flex flex-col gap-0.5 mt-1 text-[9px] font-bold text-grayMuted uppercase font-mono">
                        <span>Color: <span className="text-secondary">{item.color}</span></span>
                        <span>Size: <span className="text-secondary">{item.size}</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata description (Desktop/Tablet) */}
                  <div className="hidden sm:block flex-1">
                    <h3 className="text-lg font-black uppercase text-secondary">{item.name}</h3>
                    <div className="flex gap-4 mt-1 text-[10px] font-bold text-grayMuted uppercase font-mono">
                      <span>Color: <span className="text-secondary">{item.color}</span></span>
                      <span>Size: <span className="text-secondary">{item.size}</span></span>
                    </div>
                  </div>

                  {/* Pricing and Adjusters Row (Full width on mobile, self-aligned on desktop) */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t border-white/5 sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                    
                    {/* Qty edit buttons */}
                    <div className="flex items-center border border-white/10 bg-[#090909] rounded-full px-2 py-1 flex-shrink-0">
                      <button
                        onClick={() => handleQtyChange(idx, -1)}
                        className="p-1.5 text-secondary hover:text-accent transition-colors"
                      >
                        <FiMinus className="h-2.5 w-2.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-secondary font-mono">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => handleQtyChange(idx, 1)}
                        className="p-1.5 text-secondary hover:text-accent transition-colors"
                      >
                        <FiPlus className="h-2.5 w-2.5" />
                      </button>
                    </div>

                    {/* Cost item subtotal */}
                    <div className="w-20 text-right text-sm font-black text-secondary font-mono">
                      ${item.price * item.qty}.00
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="p-2.5 rounded-full bg-white/5 border border-white/5 text-grayMuted hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/5 transition-all duration-300"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-[#090909]/40 border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col">
                <h3 className="text-base font-black uppercase text-secondary mb-6 tracking-wide">
                  Order Summary
                </h3>

                {/* Costs breakdown */}
                <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
                  <div className="flex justify-between text-xs text-grayMuted">
                    <span>Subtotal</span>
                    <span className="font-mono text-secondary font-semibold">${subtotal}.00</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-xs text-accent">
                      <span>Discount (20% Off)</span>
                      <span className="font-mono font-semibold">-${discount}.00</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs text-grayMuted">
                    <span>Estimated Shipping</span>
                    <span className="font-mono text-secondary font-semibold">
                      {shipping === 0 ? 'FREE' : `$${shipping}.00`}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-grayMuted">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-mono text-secondary font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline py-6 border-b border-white/5 mb-6">
                  <span className="text-sm font-black uppercase text-secondary">Total</span>
                  <span className="text-2xl font-black text-accent font-mono">${total.toFixed(2)}</span>
                </div>

                {/* Promo Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="PROMO CODE"
                    className="flex-1 bg-[#090909]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-secondary font-mono tracking-wider focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="rounded-xl border border-accent bg-accent/10 px-4 text-xs font-bold uppercase tracking-wider text-accent transition-colors duration-300 hover:bg-accent hover:text-primary"
                  >
                    Apply
                  </button>
                </form>

                {/* Promo messages */}
                {promoError && <span className="text-[10px] text-red-500 font-bold block mb-4 text-left">{promoError}</span>}
                {promoSuccess && <span className="text-[10px] text-accent font-bold block mb-4 text-left">{promoSuccess}</span>}

                {/* Checkout CTA */}
                <button
                  onClick={onCheckout}
                  className="w-full flex items-center justify-center gap-3 rounded-full bg-accent py-4 text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:bg-secondary"
                >
                  <FiCreditCard className="h-4 w-4" />
                  Proceed to Checkout
                </button>

              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
