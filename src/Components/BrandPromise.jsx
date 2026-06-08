"use client";

import React from "react";

export default function BrandPromise() {
  const promises = [
    {
      title: "Precision Cut",
      desc: "Every seam, hem, and silhouette is meticulously designed to offer a flawless drape, structuring a sharp and contemporary profile.",
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        </svg>
      )
    },
    {
      title: "Noble Materials",
      desc: "Sourced with uncompromising standards. We craft exclusively with Egyptian Pima cotton, authentic pure linen, and top-tier Italian suedes.",
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      )
    },
    {
      title: "Impeccable Craft",
      desc: "Our garments and footwear are built to endure, utilizing reinforced stitching, premium linings, and finished detailing that speak quiet luxury.",
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-sans-brand text-[10px] tracking-[0.35em] text-amber-400/70 uppercase mb-3">
            Philosophy
          </p>
          <h2 className="font-serif-brand text-4xl lg:text-5xl font-light text-white">
            The Élite Standard
          </h2>
          <div className="flex items-center gap-4 justify-center my-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-300/40" />
            <div className="w-1 h-1 bg-amber-400 rotate-45" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-300/40" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {promises.map((p, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mb-6 transition-all duration-300 group-hover:border-amber-400/30 group-hover:bg-amber-400/5">
                {p.icon}
              </div>
              <h3 className="font-serif-brand text-2xl font-light text-white mb-3 tracking-wide">
                {p.title}
              </h3>
              <p className="font-sans-brand text-[13px] font-light text-zinc-400 leading-relaxed max-w-sm">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
