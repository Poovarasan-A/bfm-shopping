// TestimonialsSection.jsx
"use client";

import React from "react";
import { TESTIMONIALS } from "./constants";
import { StarRating, TagBadge } from "./ui/SharedComponents";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-sans-brand text-[10px] tracking-[0.35em] text-amber-400/70 uppercase mb-3">
            Reviews
          </p>
          <h2 className="font-serif-brand text-4xl lg:text-5xl font-light text-white">
            Voices of Élite
          </h2>
          <div className="flex items-center gap-4 justify-center my-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-300/40" />
            <div className="w-1 h-1 bg-amber-400 rotate-45" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-300/40" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="glass-card p-8 rounded-none border border-white/[0.06] hover:border-amber-400/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 flex flex-col justify-between relative">
              <span className="absolute top-4 right-6 text-6xl font-serif text-white/[0.03] select-none pointer-events-none">“</span>
              <p className="font-sans-brand text-[13px] font-light text-zinc-400 leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 mt-auto">
                <div>
                  <p className="font-sans-brand text-[11px] tracking-[0.15em] font-medium text-white uppercase">{t.name}</p>
                  <p className="font-sans-brand text-[10px] tracking-wide text-zinc-500 mt-0.5">{t.city}</p>
                </div>
                <StarRating count={t.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
