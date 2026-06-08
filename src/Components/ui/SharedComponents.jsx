import React, { useState } from 'react';

export function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-300/60" />
      <div className="w-1.5 h-1.5 bg-amber-400 rotate-45" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-300/60" />
    </div>
  );
}

export function TagBadge({ label }) {
  const styles = {
    NEW: "bg-stone-900 text-amber-300 border border-amber-400/30",
    SALE: "bg-red-900/80 text-red-200 border border-red-400/30",
    BESTSELLER: "bg-amber-900/60 text-amber-200 border border-amber-400/30",
    TRENDING: "bg-zinc-800 text-zinc-200 border border-zinc-500/30",
  };
  return (
    <span className={`text-[10px] tracking-[0.15em] font-semibold px-2 py-0.5 rounded-sm ${styles[label] || styles.NEW}`}>
      {label}
    </span>
  );
}

export function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">★</span>
      ))}
    </div>
  );
}

export function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative bg-white/[0.02] border border-white/[0.06] rounded-sm overflow-hidden cursor-pointer transition-all duration-500 hover:border-amber-400/20 hover:shadow-2xl hover:shadow-black/40"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-900">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-400 ${hovered ? 'opacity-100' : 'opacity-0'}`} />
        {/* Quick add */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-400 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <button className="w-full bg-white/90 text-stone-900 text-xs tracking-[0.12em] font-semibold py-2.5 hover:bg-amber-400 hover:text-stone-900 transition-colors duration-200">
            QUICK ADD
          </button>
        </div>
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <TagBadge label={product.tag} />
        </div>
        {/* Wishlist */}
        <button onClick={() => setWishlisted(!wishlisted)} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10 rounded-full transition-all hover:bg-black/70">
          <svg className={`w-4 h-4 transition-colors ${wishlisted ? 'fill-amber-400 text-amber-400' : 'text-white'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={wishlisted ? 0 : 1.5} fill={wishlisted ? 'currentColor' : 'none'}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-zinc-500 text-[10px] tracking-[0.15em] uppercase mb-1">
          {product.category}
        </p>
        <h3 className="text-white/90 text-sm font-medium tracking-wide leading-snug mb-3">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-amber-300 text-sm font-semibold tracking-wide">{product.price}</span>
          {product.originalPrice && (
            <span className="text-zinc-600 text-xs line-through">{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}
