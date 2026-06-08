import React from "react";
import { GoldDivider } from "./ui/SharedComponents";
import { FEATURED_CATEGORIES } from "./constants";

export default function FeaturedCategories() {
  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <p className="font-sans-brand text-[10px] tracking-[0.35em] text-amber-400/70 uppercase mb-3">
          Explore
        </p>
        <h2 className="font-serif-brand text-4xl lg:text-5xl font-light">
          Shop by Category
        </h2>
        <GoldDivider />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURED_CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={cat.href}
            className="group relative aspect-[3/4] overflow-hidden cursor-pointer block"
          >
            <img
              src={cat.img}
              alt={cat.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-7">
              <p className="font-sans-brand text-[10px] tracking-[0.25em] text-amber-300/80 uppercase mb-2">
                {cat.sub}
              </p>
              <h3 className="font-serif-brand text-2xl lg:text-3xl font-light text-white mb-4">
                {cat.label}
              </h3>
              <span className="inline-flex items-center gap-2 font-sans-brand text-[11px] tracking-[0.2em] text-white/70 uppercase group-hover:text-amber-300 transition-colors">
                {cat.tag}
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </span>
            </div>
            {/* Gold corner accent */}
            <div className="absolute top-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 left-0 w-8 h-px bg-amber-400" />
              <div className="absolute top-0 left-0 h-8 w-px bg-amber-400" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
