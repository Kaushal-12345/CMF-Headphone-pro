"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.08] pt-20 pb-12 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Brand Statement */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-sm uppercase tracking-[0.25em] text-[#FF5A1F] font-bold">
                CMF
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs uppercase tracking-widest text-white/50">
                BY NOTHING
              </span>
            </div>
            <p className="text-sm text-white/60 font-light leading-relaxed mb-6 max-w-sm">
              Color, Material, Finish. We believe great industrial design shouldn't be reserved for the luxury few. Thoughtful engineering, tactile controls, and expressive sound made for everyone.
            </p>
            <div className="font-mono text-xs text-[#A9D4C9]">
              Sound, remixed.
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block mb-4">
                EXPLORE
              </span>
              <ul className="space-y-2.5 text-xs text-white/70">
                <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
                <li><a href="#design" className="hover:text-white transition-colors">Design Story</a></li>
                <li><a href="#noise-cancelling" className="hover:text-white transition-colors">Adaptive ANC</a></li>
                <li><a href="#sound" className="hover:text-white transition-colors">40mm Drivers</a></li>
                <li><a href="#controls" className="hover:text-white transition-colors">Tactile Controls</a></li>
                <li><a href="#specs" className="hover:text-white transition-colors">Full Specifications</a></li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block mb-4">
                ECOSYSTEM
              </span>
              <ul className="space-y-2.5 text-xs text-white/70">
                <li>
                  <a
                    href="https://nothing.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>Nothing Tech</span>
                    <ArrowUpRight className="w-3 h-3 text-white/40" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://cmf.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <span>CMF Ecosystem</span>
                    <ArrowUpRight className="w-3 h-3 text-white/40" />
                  </a>
                </li>
                <li>
                  <span className="text-white/40">Nothing X App (iOS & Android)</span>
                </li>
                <li>
                  <span className="text-white/40">Nothing OS Audio Widget</span>
                </li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block mb-4">
                SUPPORT
              </span>
              <ul className="space-y-2.5 text-xs text-white/70">
                <li><span className="hover:text-white transition-colors cursor-pointer">Warranty & Service</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Ear Cushion Replacement</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Firmware Updates</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Audio Manual & Safety</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-[11px] text-white/40 font-mono">
            © 2026 CMF by Nothing. All rights reserved. CMF, Nothing, and the CMF logo are trademarks of Nothing Technology Limited.
          </p>

          <button
            onClick={scrollToTop}
            className="text-xs font-mono text-white/50 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Back to top ↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
