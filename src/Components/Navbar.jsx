"use client";
import React, { useState, useEffect, useRef } from "react";
import { NAV_LINKS } from "./constants";

/* ─────────────────────────────────────────────────────────────────────────────
   All responsive behaviour is controlled here via CSS media queries.
   This avoids the inline-style vs Tailwind class conflict where
   `style={{ display: "none" }}` always overrides className visibility.
───────────────────────────────────────────────────────────────────────────── */
const STYLES = `
  @keyframes bfm-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes bfm-slide-down {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bfm-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── Nav link gold underline ── */
  .bfm-nav-link {
    position: relative;
    font-size: 10.5px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    padding-bottom: 2px;
    transition: color 0.25s;
  }
  .bfm-nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 1px;
    background: linear-gradient(90deg, #B8960C, #F0CC60, #B8960C);
    transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .bfm-nav-link:hover::after { width: 100%; }
  .bfm-nav-link:hover        { color: #F0CC60 !important; }

  /* ── Icon button ── */
  .bfm-icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px; height: 36px;
    padding: 0;
    background: none;
    border: 1px solid transparent;
    border-radius: 2px;
    cursor: pointer;
    color: #5A5450;
    transition: color 0.2s, background 0.2s, border-color 0.2s;
    flex-shrink: 0;
  }
  .bfm-icon-btn:hover {
    color: #C0B090;
    background: rgba(255,255,255,0.04);
  }
  .bfm-icon-btn.active {
    color: #D4A843;
    background: rgba(184,150,12,0.1);
    border-color: rgba(184,150,12,0.2);
  }

  /* ── Responsive visibility ──────────────────────────────────────────────── */
  /* Desktop: show nav links, hide hamburger */
  .bfm-desktop-nav  { display: flex; align-items: center; gap: 28px; }
  .bfm-hamburger    { display: none; }
  /* sm+: show wishlist/account */
  .bfm-hide-mobile  { display: flex; }
  /* Mobile menu bottom row */
  .bfm-mobile-actions { display: none; }

  /* ── Tablet / small desktop (max 1023px) ── */
  @media (max-width: 1023px) {
    .bfm-desktop-nav { display: none; }
    .bfm-hamburger   { display: flex; align-items: center; justify-content: center; }
  }

  /* ── Mobile (max 639px) ── */
  @media (max-width: 639px) {
    .bfm-hide-mobile    { display: none; }
    .bfm-mobile-actions { display: flex; }
  }
`;

export default function Navbar({ cartCount = 2 }) {
  const [scrolled, setScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const accountRef = useRef(null);

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Focus search input when panel opens */
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  }, [searchOpen]);

  /* Close account dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    if (accountOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [accountOpen]);

  /* Auto-close mobile menu on desktop resize */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Prevent body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <style>{STYLES}</style>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          transition: "background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
          background: scrolled ? "rgba(8,7,6,0.97)" : "rgba(8,7,6,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(184,150,12,0.2)"
            : "1px solid rgba(255,255,255,0.05)",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.6)" : "none",
          fontFamily: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {/* ══════════════════════════════════════════════════════
            ANNOUNCEMENT BAR
        ══════════════════════════════════════════════════════ */}
        {announcementVisible && (
          <div
            style={{
              background: "linear-gradient(90deg, transparent, rgba(184,150,12,0.06), transparent)",
              borderBottom: "1px solid rgba(184,150,12,0.12)",
              padding: "7px 0",
              animation: "bfm-fade-in 0.4s ease",
            }}
          >
            <div
              style={{
                maxWidth: 1280,
                margin: "0 auto",
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {/* Balance spacer */}
              <div style={{ width: 28, flexShrink: 0 }} />

              {/* Message — wraps gracefully on small screens */}
              <p
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 10.5,
                  letterSpacing: "0.16em",
                  color: "#7A7672",
                  textTransform: "uppercase",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Free shipping on orders above{" "}
                <span style={{ color: "#D4A843" }}>₹5,000</span>
                {"  ·  "}
                Code{" "}
                <span
                  style={{
                    color: "#D4A843",
                    fontWeight: 600,
                    border: "1px solid rgba(212,168,67,0.3)",
                    padding: "1px 6px",
                    borderRadius: 1,
                  }}
                >
                  LUXE10
                </span>{" "}
                for 10% off
              </p>

              {/* Close */}
              <button
                onClick={() => setAnnouncementVisible(false)}
                aria-label="Dismiss announcement"
                style={{
                  width: 28,
                  height: 28,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#5A5550",
                  padding: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#8A8480")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5A5550")}
              >
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            MAIN NAV ROW — CSS Grid 3-column: [nav | logo | icons]
            Each column is isolated → logo CANNOT overlap nav items.
        ══════════════════════════════════════════════════════ */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              height: 64,
            }}
          >
            {/* ── LEFT: Desktop nav links OR mobile hamburger ── */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Desktop nav */}
              <nav className="bfm-desktop-nav" aria-label="Primary navigation">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="bfm-nav-link"
                    style={{ color: link === "New Arrivals" ? "#D4A843" : "#7A7470" }}
                  >
                    {link}
                  </a>
                ))}
              </nav>

              {/* Mobile hamburger — shown via CSS class, no inline display conflict */}
              <button
                className="bfm-hamburger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                style={{
                  width: 36,
                  height: 36,
                  padding: 0,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: mobileMenuOpen ? "#D4A843" : "#6A6460",
                  transition: "color 0.2s",
                }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      mobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                    }
                  />
                </svg>
              </button>
            </div>

            {/* ── CENTER: Logo ── */}
            <a
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textDecoration: "none",
                userSelect: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 24,
                  fontWeight: 300,
                  letterSpacing: "0.38em",
                  background:
                    "linear-gradient(90deg, #8A6A10 0%, #D4A843 30%, #F5E07A 55%, #D4A843 75%, #8A6A10 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "bfm-shimmer 4s linear infinite",
                  lineHeight: 1,
                }}
              >
                BFM
              </span>
              <span
                style={{
                  fontSize: 7,
                  letterSpacing: "0.45em",
                  color: "#4A4440",
                  textTransform: "uppercase",
                  marginTop: 3,
                  fontWeight: 500,
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Universe
              </span>
            </a>

            {/* ── RIGHT: Action icons ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              {/* Search — always visible */}
              <button
                className={`bfm-icon-btn${searchOpen ? " active" : ""}`}
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  setAccountOpen(false);
                }}
                aria-label="Search"
              >
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Wishlist — hidden on xs via CSS class */}
              <button className="bfm-icon-btn bfm-hide-mobile" aria-label="Wishlist">
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>

              {/* Account — hidden on xs via CSS class */}
              <div
                ref={accountRef}
                className="bfm-hide-mobile"
                style={{ position: "relative" }}
              >
                <button
                  className={`bfm-icon-btn${accountOpen ? " active" : ""}`}
                  onClick={() => {
                    setAccountOpen(!accountOpen);
                    setSearchOpen(false);
                  }}
                  aria-label="Account"
                  aria-expanded={accountOpen}
                >
                  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </button>

                {/* Account dropdown */}
                {accountOpen && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 12px)",
                      width: 200,
                      background: "rgba(14,12,10,0.98)",
                      border: "1px solid rgba(184,150,12,0.18)",
                      borderRadius: 2,
                      boxShadow: "0 16px 48px rgba(0,0,0,0.7)",
                      overflow: "hidden",
                      animation: "bfm-slide-down 0.2s ease",
                      zIndex: 60,
                    }}
                  >
                    <div
                      style={{
                        height: 1,
                        background:
                          "linear-gradient(90deg, transparent, rgba(212,168,67,0.6), transparent)",
                      }}
                    />
                    {["My Account", "Orders", "Wishlist", "Addresses", "Sign Out"].map((item, i) => (
                      <button
                        key={item}
                        onClick={() => setAccountOpen(false)}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: "11px 20px",
                          fontSize: 10.5,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: i === 4 ? "#8A7468" : "#6A6460",
                          background: "none",
                          border: "none",
                          borderBottom:
                            i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none",
                          cursor: "pointer",
                          transition: "color 0.2s, background 0.2s",
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 500,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#D4A843";
                          e.currentTarget.style.background = "rgba(184,150,12,0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = i === 4 ? "#8A7468" : "#6A6460";
                          e.currentTarget.style.background = "none";
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart — always visible */}
              <div style={{ position: "relative" }}>
                <button
                  className="bfm-icon-btn"
                  aria-label={`Cart, ${cartCount} items`}
                >
                  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </button>
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      minWidth: 15,
                      height: 15,
                      background: "#D4A843",
                      color: "#0A0804",
                      fontSize: 8.5,
                      fontWeight: 700,
                      borderRadius: 999,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 3px",
                      lineHeight: 1,
                      fontFamily: "'Montserrat', sans-serif",
                      pointerEvents: "none",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            SEARCH PANEL — smooth max-height transition
        ══════════════════════════════════════════════════════ */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: searchOpen ? 140 : 0,
            transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
            borderTop: searchOpen
              ? "1px solid rgba(184,150,12,0.1)"
              : "1px solid transparent",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 16px 20px" }}>
            {/* Search input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                border: "1px solid rgba(184,150,12,0.25)",
                borderRadius: 1,
                padding: "10px 14px",
                background: "rgba(255,255,255,0.02)",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "rgba(212,168,67,0.5)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "rgba(184,150,12,0.25)")
              }
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#5A5450" strokeWidth={1.5} style={{ flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                placeholder="Search styles, brands, products…"
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontSize: 13,
                  color: "#E8E4DF",
                  letterSpacing: "0.04em",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#5A5450",
                    padding: 0,
                    display: "flex",
                    flexShrink: 0,
                  }}
                  aria-label="Clear"
                >
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Quick-search tags */}
            <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
              {["T-Shirts", "Slim Trousers", "Leather Shoes", "Linen Shirts"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  style={{
                    fontSize: 9.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#5A5450",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    transition: "color 0.2s, border-color 0.2s",
                    borderRadius: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#D4A843";
                    e.currentTarget.style.borderColor = "rgba(212,168,67,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#5A5450";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            MOBILE MENU — smooth max-height slide down
        ══════════════════════════════════════════════════════ */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: mobileMenuOpen ? 500 : 0,
            transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
            borderTop: mobileMenuOpen
              ? "1px solid rgba(184,150,12,0.08)"
              : "1px solid transparent",
          }}
        >
          <nav style={{ padding: "8px 16px 20px" }} aria-label="Mobile navigation">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: link === "New Arrivals" ? "#D4A843" : "#6A6460",
                  textDecoration: "none",
                  borderBottom:
                    i < NAV_LINKS.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (link !== "New Arrivals") e.currentTarget.style.color = "#C0B090";
                }}
                onMouseLeave={(e) => {
                  if (link !== "New Arrivals") e.currentTarget.style.color = "#6A6460";
                }}
              >
                {link}
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  style={{ opacity: 0.3, flexShrink: 0 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            ))}

            {/* Mobile-only: Wishlist + Account shortcuts (hidden on sm+ via CSS) */}
            <div
              className="bfm-mobile-actions"
              style={{ gap: 8, paddingTop: 14 }}
            >
              <button
                style={{
                  flex: 1,
                  padding: "11px 8px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "none",
                  cursor: "pointer",
                  color: "#6A6460",
                  fontSize: 9.5,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  borderRadius: 1,
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#D4A843";
                  e.currentTarget.style.borderColor = "rgba(212,168,67,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6A6460";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                Wishlist
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "11px 8px",
                  border: "1px solid rgba(212,168,67,0.25)",
                  background: "none",
                  cursor: "pointer",
                  color: "#D4A843",
                  fontSize: 9.5,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  borderRadius: 1,
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#F5D870";
                  e.currentTarget.style.borderColor = "rgba(245,216,112,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#D4A843";
                  e.currentTarget.style.borderColor = "rgba(212,168,67,0.25)";
                }}
              >
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Account
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
