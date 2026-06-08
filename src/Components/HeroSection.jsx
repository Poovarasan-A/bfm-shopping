import React from "react";
import { GoldDivider } from "./ui/SharedComponents";

export default function HeroSection({ heroRef }) {
  return (
    <section
      ref={heroRef}
      className="relative h-[92vh] min-h-[600px] overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&q=85"
        alt="Bespoke menswear campaign"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-[8s] ease-out"
        style={{ transformOrigin: "center center" }}
      />
      <div className="hero-overlay absolute inset-0" />
      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 lg:pb-24 px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Season label */}
        <div className="anim-1 mb-6">
          <GoldDivider />
          <p className="font-sans-brand text-[11px] tracking-[0.35em] text-amber-300/80 uppercase mt-2">
            Menswear Collection 2025
          </p>
        </div>
        {/* Headline */}
        <h1 className="anim-2 font-serif-brand font-light text-5xl sm:text-6xl lg:text-8xl leading-[1.05] mb-4 max-w-3xl">
          BFM
          <em className="italic block">Universe</em>
        </h1>
        {/* Subtext */}
        <p className="anim-3 font-sans-brand text-sm lg:text-base text-zinc-400 font-light tracking-wider max-w-xl mb-10 leading-relaxed">
          Discover a curated collection of premium t-shirts, shirts, bottoms,
          and handcrafted footwear.
        </p>
        {/* CTA Buttons */}
        <div className="anim-4 flex flex-wrap gap-3">
          <a
            href="#t-shirts"
            className="btn-gold px-8 py-3.5 text-stone-900 text-[11px] tracking-[0.2em] uppercase font-sans-brand font-semibold rounded-none shadow-lg shadow-amber-900/30 text-center inline-block"
          >
            Shop Apparel
          </a>
          <a
            href="#shoes"
            className="px-8 py-3.5 border border-white/30 text-white text-[11px] tracking-[0.2em] uppercase font-sans-brand font-medium hover:bg-white/10 hover:border-white/60 transition-all text-center inline-block"
          >
            Shop Shoes
          </a>
          <a
            href="#new-arrivals"
            className="px-8 py-3.5 border border-white/10 text-zinc-400 text-[11px] tracking-[0.2em] uppercase font-sans-brand font-medium hover:text-white hover:border-white/30 transition-all text-center inline-block"
          >
            New Arrivals
          </a>
        </div>
        {/* Scroll indicator */}
        <div className="anim-5 absolute bottom-8 right-8 lg:right-16 flex flex-col items-center gap-2 opacity-50">
          <span className="font-sans-brand text-[9px] tracking-[0.3em] text-zinc-500 uppercase rotate-90 origin-center mb-8">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </div>
      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 glass-card border-t border-white/[0.06] hidden lg:block">
        <div className="max-w-7xl mx-auto px-16 py-4 flex items-center divide-x divide-white/[0.06]">
          {[
            { val: "2,400+", label: "Products" },
            { val: "38", label: "Countries" },
            { val: "4.9★", label: "Rating" },
            { val: "Free", label: "Returns" },
          ].map((s) => (
            <div key={s.label} className="flex-1 text-center px-6">
              <p className="font-serif-brand text-xl text-amber-300 font-light">
                {s.val}
              </p>
              <p className="font-sans-brand text-[9px] text-zinc-600 tracking-[0.2em] uppercase mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
