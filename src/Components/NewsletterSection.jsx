// NewsletterSection.jsx
"use client";

import React, { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="font-sans-brand text-[10px] tracking-[0.35em] text-amber-400/70 uppercase mb-3">
          Newsletter
        </p>
        <h2 className="font-serif-brand text-4xl lg:text-5xl font-light text-white mb-4">
          Join the BFM Circle
        </h2>
        <div className="flex items-center gap-4 justify-center my-3 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-300/40" />
          <div className="w-1 h-1 bg-amber-400 rotate-45" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-300/40" />
        </div>
        <p className="font-sans-brand text-xs lg:text-sm font-light text-zinc-400 tracking-wider max-w-lg mx-auto mb-10 leading-relaxed">
          Subscribe to receive private collection previews, exclusive sizing
          notifications, and seasonal drops.
        </p>
        {submitted ? (
          <p className="font-sans-brand text-sm text-amber-300 tracking-[0.2em] uppercase font-semibold animate-pulse">
            Welcome to the Circle.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="ENTER YOUR EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-4 bg-white/[0.02] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400/50 transition-all font-sans-brand text-[10px] tracking-[0.15em] uppercase rounded-none"
            />
            <button
              type="submit"
              className="btn-gold px-8 py-4 text-stone-900 font-sans-brand text-[10px] tracking-[0.2em] font-semibold uppercase hover:bg-opacity-90 transition-all rounded-none"
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
