"use client";

import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedCategories from "../components/FeaturedCategories";
import NewArrivals from "../components/NewArrivals";
import EditorialDrops from "../components/EditorialDrops";
import TestimonialsSection from "../components/TestimonialsSection";
import NewsletterSection from "../components/NewsletterSection";
import FooterSection from "../components/FooterSection";
import BrandPromise from "@/Components/BrandPromise";

export default function Home() {
  const [cartCount, setCartCount] = useState(2);
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter antialiased">
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-sans-brand { font-family: 'Inter', sans-serif; }
        .font-serif-brand { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .gold-text { background: linear-gradient(135deg, #C9A96E 0%, #F0D080 50%, #C9A96E 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-overlay { background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.85) 100%); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        .anim-1 { animation: fadeUp 0.9s ease forwards; }
        .anim-2 { animation: fadeUp 0.9s 0.2s ease both; }
        .anim-3 { animation: fadeUp 0.9s 0.4s ease both; }
        .anim-4 { animation: fadeUp 0.9s 0.6s ease both; }
        .anim-5 { animation: fadeUp 0.9s 0.8s ease both; }
        .nav-underline::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:1px; background: #C9A96E; transition: width 0.3s ease; }
        .nav-underline:hover::after { width: 100%; }
        .glass-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); }
        .btn-gold { background: linear-gradient(135deg, #C9A96E, #F0D080, #C9A96E); background-size: 200%; transition: background-position 0.4s ease, transform 0.2s ease; }
        .btn-gold:hover { background-position: right; transform: translateY(-1px); }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0A0A0A; } ::-webkit-scrollbar-thumb { background: #C9A96E55; border-radius: 2px; }
      `}</style>
      <Navbar cartCount={cartCount} />
      <HeroSection heroRef={heroRef} />
      <FeaturedCategories />
      <NewArrivals />
      <EditorialDrops />
      <BrandPromise />
      <TestimonialsSection />
      <NewsletterSection />
      <FooterSection />
    </div>
  );
}
