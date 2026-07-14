import React, { useState } from 'react';
import { FiArrowLeft, FiCheck, FiCpu, FiCreditCard, FiDollarSign } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutPage({ cart, setCart, onBack, onHome, onSuccess }) {
  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    state: '',
    paymentMethod: 'card', // card | cod
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Checkout sequence state
  const [checkoutStep, setCheckoutStep] = useState('idle'); // idle | processing | success
  const [orderNumber, setOrderNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleValidation = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Shipping address is required';
    if (!formData.zip.trim()) errors.zip = 'Zip code is required';
    if (!formData.state.trim()) errors.state = 'State is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) {
        errors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, ''))) {
        errors.cardNumber = 'Must be 16 digits';
      }
      if (!formData.cardExpiry.trim()) {
        errors.cardExpiry = 'Expiry is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        errors.cardExpiry = 'Must be MM/YY';
      }
      if (!formData.cardCvv.trim()) {
        errors.cardCvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cardCvv)) {
        errors.cardCvv = 'Must be 3 or 4 digits';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    setCheckoutStep('processing');
    
    // Simulate transaction authorization
    setTimeout(() => {
      const randOrder = 'SX-' + Math.floor(100000 + Math.random() * 900000);
      setCheckoutStep('idle');
      if (onSuccess) {
        onSuccess({
          orderNumber: randOrder,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          zip: formData.zip,
          state: formData.state,
          paymentMethod: formData.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery (COD)',
          total: total
        });
      }
    }, 2500);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  // Apply SPRINT20 default discount if applied previously, or default to 0
  const discount = 0; 
  const shipping = subtotal >= 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen w-full bg-[#050505] pt-36 pb-16 relative z-30 select-none">
      
      {/* Dynamic glow spotlights */}
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-white/5 blur-[180px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 border-b border-white/5 pb-6 mb-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-secondary transition-all duration-300 hover:border-accent hover:text-accent w-fit"
          >
            <FiArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Cart
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Details */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-[#090909]/40 border border-white/5 rounded-3xl p-6 sm:p-8 text-left">
              
              <div>
                <h2 className="text-xl font-black uppercase text-secondary mb-1">Shipping Details</h2>
                <p className="text-[10px] text-grayMuted uppercase font-mono tracking-wider">Please input delivery coordinates</p>
              </div>

              {/* Form Input fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold text-grayMuted uppercase tracking-wider font-mono">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs text-secondary tracking-wide focus:outline-none focus:border-accent"
                  />
                  {formErrors.name && <span className="text-[9px] text-red-500 font-bold uppercase font-mono">{formErrors.name}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold text-grayMuted uppercase tracking-wider font-mono">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs text-secondary tracking-wide focus:outline-none focus:border-accent"
                  />
                  {formErrors.email && <span className="text-[9px] text-red-500 font-bold uppercase font-mono">{formErrors.email}</span>}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold text-grayMuted uppercase tracking-wider font-mono">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs text-secondary tracking-wide focus:outline-none focus:border-accent"
                  />
                  {formErrors.phone && <span className="text-[9px] text-red-500 font-bold uppercase font-mono">{formErrors.phone}</span>}
                </div>

                {/* Address */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-[9px] font-bold text-grayMuted uppercase tracking-wider font-mono">Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter street address"
                    className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs text-secondary tracking-wide focus:outline-none focus:border-accent"
                  />
                  {formErrors.address && <span className="text-[9px] text-red-500 font-bold uppercase font-mono">{formErrors.address}</span>}
                </div>

                {/* State */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold text-grayMuted uppercase tracking-wider font-mono">State / Region</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs text-secondary tracking-wide focus:outline-none focus:border-accent"
                  />
                  {formErrors.state && <span className="text-[9px] text-red-500 font-bold uppercase font-mono">{formErrors.state}</span>}
                </div>

                {/* Zip */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold text-grayMuted uppercase tracking-wider font-mono">Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="Enter zip code"
                    className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs text-secondary tracking-wide focus:outline-none focus:border-accent"
                  />
                  {formErrors.zip && <span className="text-[9px] text-red-500 font-bold uppercase font-mono">{formErrors.zip}</span>}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="border-t border-white/5 pt-8 mt-4">
                <h3 className="text-sm font-black uppercase text-secondary mb-4">Payment Method</h3>
                
                {/* Method Toggles */}
                <div className="flex gap-4 mb-6">
                  {/* Credit Card radio */}
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'card' }))}
                    className={`flex-1 flex items-center justify-center gap-3 border rounded-2xl py-4 transition-all duration-300 font-bold uppercase text-[10px] tracking-wider ${
                      formData.paymentMethod === 'card'
                        ? 'border-accent bg-accent/5 text-accent shadow-glow'
                        : 'border-white/10 text-grayMuted hover:border-accent/40'
                    }`}
                  >
                    <FiCreditCard className="h-4 w-4" />
                    Credit Card
                  </button>

                  {/* COD radio */}
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'cod' }))}
                    className={`flex-1 flex items-center justify-center gap-3 border rounded-2xl py-4 transition-all duration-300 font-bold uppercase text-[10px] tracking-wider ${
                      formData.paymentMethod === 'cod'
                        ? 'border-accent bg-accent/5 text-accent shadow-glow'
                        : 'border-white/10 text-grayMuted hover:border-accent/40'
                    }`}
                  >
                    <FiDollarSign className="h-4 w-4" />
                    Cash On Delivery
                  </button>
                </div>

                {/* Conditional Fields */}
                <AnimatePresence mode="wait">
                  {formData.paymentMethod === 'card' ? (
                    <motion.div
                      key="card-inputs"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col gap-6"
                    >
                      {/* Card Number */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] font-bold text-grayMuted uppercase tracking-wider font-mono">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="0000 0000 0000 0000"
                          className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs text-secondary tracking-wide focus:outline-none focus:border-accent font-mono"
                        />
                        {formErrors.cardNumber && <span className="text-[9px] text-red-500 font-bold uppercase font-mono">{formErrors.cardNumber}</span>}
                      </div>

                      {/* Expiry & CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-bold text-grayMuted uppercase tracking-wider font-mono">Expiry Date</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs text-secondary tracking-wide focus:outline-none focus:border-accent font-mono"
                          />
                          {formErrors.cardExpiry && <span className="text-[9px] text-red-500 font-bold uppercase font-mono">{formErrors.cardExpiry}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-[9px] font-bold text-grayMuted uppercase tracking-wider font-mono">Security Code (CVV)</label>
                          <input
                            type="password"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleChange}
                            placeholder="***"
                            className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-xs text-secondary tracking-wide focus:outline-none focus:border-accent font-mono"
                          />
                          {formErrors.cardCvv && <span className="text-[9px] text-red-500 font-bold uppercase font-mono">{formErrors.cardCvv}</span>}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cod-message"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-[#090909] border border-white/10 rounded-2xl p-5"
                    >
                      <h4 className="text-xs font-bold text-secondary uppercase mb-2">Cash On Delivery Terms</h4>
                      <p className="text-xs text-grayMuted font-light leading-relaxed">
                        No advance telemetry payment is required. You will complete payment with the courier agent in cash or scanning a telemetry mobile payment code upon arrival.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Checkout button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 rounded-full bg-accent py-4 text-xs font-bold uppercase tracking-wider text-primary shadow-glow transition-all duration-300 hover:bg-secondary mt-4"
              >
                <FiCheck className="h-4 w-4" />
                Submit and Complete Order
              </button>

            </form>
          </div>

          {/* Right Column: Summarized Order Review */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#090909]/40 border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col text-left">
              <h3 className="text-base font-black uppercase text-secondary mb-6 tracking-wide">
                Order Review
              </h3>

              {/* Minimal itemized list */}
              <div className="flex flex-col gap-4 border-b border-white/5 pb-6 mb-6 max-h-[220px] overflow-y-auto pr-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-mono">
                    <div className="flex flex-col">
                      <span className="text-secondary font-bold uppercase">{item.name}</span>
                      <span className="text-[9px] text-grayMuted">QTY: {item.qty} | SIZE: {item.size}</span>
                    </div>
                    <span className="text-secondary font-semibold">${item.price * item.qty}.00</span>
                  </div>
                ))}
              </div>

              {/* Costs review */}
              <div className="flex flex-col gap-4 border-b border-white/5 pb-6 font-mono text-xs text-grayMuted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-secondary font-semibold">${subtotal}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-secondary font-semibold">
                    {shipping === 0 ? 'FREE' : `$${shipping}.00`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (8%)</span>
                  <span className="text-secondary font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-baseline py-6">
                <span className="text-sm font-black uppercase text-secondary">Total</span>
                <span className="text-2xl font-black text-accent font-mono">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Modal Sequences */}
      <AnimatePresence>
        {checkoutStep === 'processing' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* processing view */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#090909] border border-white/5 rounded-3xl p-8 max-w-sm w-full text-center relative z-10 flex flex-col items-center gap-6 shadow-2xl"
            >
              <div className="h-16 w-16 rounded-full border border-dashed border-accent border-t-transparent animate-spin flex items-center justify-center" />
              <div>
                <h3 className="text-lg font-black uppercase text-secondary tracking-wider mb-2">
                  Processing Transaction
                </h3>
                <p className="text-[10px] text-grayMuted font-mono uppercase tracking-widest">
                  SYNCING TELEMETRY ACCOUNT...
                </p>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
