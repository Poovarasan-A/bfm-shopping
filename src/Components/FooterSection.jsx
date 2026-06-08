// FooterSection.jsx
"use client";

import React from "react";
import { NAV_LINKS } from "./constants";

export default function FooterSection() {
  return (
    <footer className="bg-[#0A0A0A] text-zinc-400 py-16 border-t border-white/[0.04] font-sans-brand">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
        {/* Brand & description */}
        <div className="flex flex-col gap-4">
          <a href="#" className="flex flex-col items-start self-start">
            <span className="text-xl lg:text-2xl font-serif-brand font-light tracking-[0.3em] gold-text">
              BFM
            </span>
            <span className="text-[7px] tracking-[0.45em] text-zinc-600 uppercase mt-0.5 font-light">
              Universe
            </span>
          </a>
          <p className="text-[12px] font-light text-zinc-500 leading-relaxed max-w-sm">
            Curating bespoke tailoring, Egyptian cotton essentials, and
            handcrafted leather footwear for the contemporary gentleman.
          </p>
        </div>
        {/* Navigation links */}
        <div>
          <h4 className="text-[10px] tracking-[0.25em] text-white uppercase font-semibold mb-6">
            Explore
          </h4>
          <ul className="space-y-3">
            {NAV_LINKS.map((link, idx) => (
              <li key={idx}>
                <a
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="text-[11px] tracking-[0.15em] text-zinc-500 hover:text-white uppercase transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Social / Contact */}
        <div>
          <h4 className="text-[10px] tracking-[0.25em] text-white uppercase font-semibold mb-6">
            Connect
          </h4>
          <p className="text-[12px] font-light text-zinc-500 mb-3">
            Email:{" "}
            <a
              href="mailto:info@eliteUniverse.com"
              className="text-zinc-400 hover:text-amber-300 transition-colors"
            >
              concierge@eliteUniverse.com
            </a>
          </p>
          <p className="text-[12px] font-light text-zinc-500">
            Phone:{" "}
            <a
              href="tel:+18001234567"
              className="text-zinc-400 hover:text-amber-300 transition-colors"
            >
              +1 800 123 4567
            </a>
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] tracking-wider text-zinc-600">
          © {new Date().getFullYear()} BFM Universe. All rights reserved.
        </p>
        <p className="text-[9px] tracking-[0.3em] text-zinc-700 uppercase">
          Crafted for Excellence
        </p>
      </div>
    </footer>
  );
}
