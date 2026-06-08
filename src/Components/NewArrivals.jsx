import React from 'react';
import { GoldDivider, ProductCard } from './ui/SharedComponents';
import { NEW_ARRIVALS } from './constants';

export default function NewArrivals() {
  return (
    <section id="new-arrivals" className="py-16 lg:py-24 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="font-sans-brand text-[10px] tracking-[0.35em] text-amber-400/70 uppercase mb-2">
            Just In
          </p>
          <h2 className="font-serif-brand text-4xl lg:text-5xl font-light">
            New Arrivals
          </h2>
        </div>
        <a
          href="#all"
          className="hidden sm:flex items-center gap-2 font-sans-brand text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-amber-300 transition-colors border-b border-transparent hover:border-amber-400/40 pb-0.5"
        >
          View All
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {NEW_ARRIVALS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
