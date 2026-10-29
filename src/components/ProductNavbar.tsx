"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
      setScrolled(scrollY > 40);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

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
            ? "bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.06] py-3"
            : "bg-transparent border-b border-transparent py-4 sm:py-5"
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
            className="flex items-center gap-2 group"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5A1F] font-bold">
              CMF
            </span>
            <span className="text-white/25 text-xs">/</span>
            <span className="text-xs uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">
              HEADPHONE PRO
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  className={`px-3 py-1 text-xs font-medium tracking-wide transition-colors ${
                    isActive ? "text-white" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#preorder"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#preorder");
              }}
              className="bg-[#FF5A1F] hover:bg-[#e04e17] text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-white/60 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.04]">
          <div
            className="h-full bg-[#FF5A1F] transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-0 top-[53px] z-40 bg-[#0A0A0C]/98 backdrop-blur-xl border-b border-white/10 p-5 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollTo(item.href)}
                  className="flex items-center justify-between text-left py-2 px-2 text-xs text-white/70 hover:text-white"
                >
                  <span>{item.name}</span>
                  {activeSection === item.name && (
                    <span className="w-1 h-1 rounded-full bg-[#FF5A1F]" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
