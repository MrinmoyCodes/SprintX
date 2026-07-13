import React from 'react';

export default function OfferMarquee() {
  const items = [
    'LIMITED DROP',
    'BUY 1 GET 1',
    'FREE SHIPPING',
    'SUMMER SALE',
    '20% OFF',
    'NEW ARRIVALS',
    'CARBON FIBER SOLE',
    'LIMITED DROP',
    'BUY 1 GET 1',
    'FREE SHIPPING',
    'SUMMER SALE',
    '20% OFF',
    'NEW ARRIVALS',
    'CARBON FIBER SOLE',
  ];

  return (
    <section className="relative z-10 overflow-hidden bg-accent py-4 select-none">
      <div className="flex w-full overflow-hidden">
        {/* Double the list of items to ensure smooth continuous scrolling */}
        <div className="animate-marquee flex gap-12 whitespace-nowrap">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-12 text-primary font-heading text-lg font-black tracking-widest md:text-xl">
              <span>{item}</span>
              <span className="h-2 w-2 rounded-full bg-primary" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
