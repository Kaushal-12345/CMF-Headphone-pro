"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Volume2, Sparkles } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Overview", href: "#overview" },
  { name: "Design", href: "#design" },
  { name: "Noise Cancelling", href: "#noise-cancelling" },
  { name: "Sound", href: "#sound" },
  { name: "Controls", href: "#controls" },
  { name: "Colours", href: "#colours" },
  { name: "Specs", href: "#specs" },
];

export default function ProductNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Section spy
      const sections = ["overview", "design", "noise-cancelling", "sound", "controls", "colours", "specs"];
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            const found = navItems.find((item) => item.href === `#${sectionId}`);
            if (found) {
              setActiveSection(found.name);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0C]/85 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#overview");
            }}
            className="flex items-center gap-3 group"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF5A1F] font-bold">
                CMF
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                BY NOTHING
              </span>
            </div>
            <div className="h-3 w-[1px] bg-white/20" />
            <span className="text-sm font-medium tracking-tight text-white flex items-center gap-1.5">
              Headphone Pro
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all rounded-full ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/90 hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#controls")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase text-white/60 hover:text-white transition-colors border border-white/10 rounded-full hover:border-white/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>Interactive 3D</span>
            </button>

            <a
              href="#preorder"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#preorder");
              }}
              className="inline-flex items-center gap-2 bg-[#FF5A1F] hover:bg-[#e04e17] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 shadow-[0_2px_15px_rgba(255,90,31,0.35)] hover:shadow-[0_4px_25px_rgba(255,90,31,0.5)] active:scale-95"
            >
              <span>Explore Headphone Pro</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Global Micro Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/[0.04]">
          <div
            className="h-full bg-gradient-to-r from-[#FF5A1F] via-[#FF8540] to-[#A9D4C9] transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-[#0A0A0C]/98 backdrop-blur-2xl border-b border-white/10 p-6 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#FF5A1F] mb-1">
                Navigation
              </div>
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  className="flex items-center justify-between text-left py-2.5 px-3 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>{item.name}</span>
                  {activeSection === item.name && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                  )}
                </button>
              ))}
              <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/40">CMF by Nothing</span>
                <span className="font-mono text-xs text-[#A9D4C9]">£149 / $179</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
