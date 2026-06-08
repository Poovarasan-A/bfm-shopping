import React from 'react';
import { GoldDivider } from './ui/SharedComponents';
import { EDITORIAL_DROPS } from './constants';

export default function EditorialDrops() {
  return (
    <section className="py-16 lg:py-24 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <p className="font-sans-brand text-[10px] tracking-[0.35em] text-amber-400/70 uppercase mb-3">
          Stories
        </p>
        <h2 className="font-serif-brand text-4xl lg:text-5xl font-light">
          Editorial Drops
        </h2>
        <GoldDivider />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Wide card */}
        <div className="group relative aspect-[4/3] overflow-hidden cursor-pointer">
          <img
            src={EDITORIAL_DROPS[0].img}
            alt={EDITORIAL_DROPS[0].title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="font-serif-brand text-3xl lg:text-4xl font-light mb-2">
              {EDITORIAL_DROPS[0].title}
            </p>
            <p className="font-sans-brand text-sm text-zinc-400 mb-5 font-light">
              {EDITORIAL_DROPS[0].desc}
            </p>
            <button className="btn-gold px-7 py-3 text-stone-900 text-[10px] tracking-[0.2em] uppercase font-sans-brand font-semibold">
              {EDITORIAL_DROPS[0].cta}
            </button>
          </div>
        </div>
        {/* Two stacked cards */}
        <div className="flex flex-col gap-5">
          {EDITORIAL_DROPS.slice(1).map((drop) => (
            <div key={drop.id} className="group relative flex-1 overflow-hidden cursor-pointer min-h-[220px]">
              <img
                src={drop.img}
                alt={drop.title}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-center p-8">
                <p className="font-serif-brand text-2xl font-light mb-1.5">
                  {drop.title}
                </p>
                <p className="font-sans-brand text-sm text-zinc-400 font-light mb-5">
                  {drop.desc}
                </p>
                <button className="self-start text-[10px] tracking-[0.2em] text-amber-300 uppercase font-sans-brand border-b border-amber-400/30 pb-0.5 hover:border-amber-400 transition-colors">
                  {drop.cta} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
