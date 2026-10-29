"use client";

import React from "react";

export default function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.04] py-16 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40 font-light">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5A1F] font-bold">
            CMF
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[11px] uppercase tracking-wider text-white/60">
            BY NOTHING
          </span>
        </div>

        <p className="text-[11px] font-mono text-center sm:text-left">
          © 2026 CMF by Nothing. All rights reserved.
        </p>

        <button
          onClick={scrollToTop}
          className="font-mono text-[11px] text-white/50 hover:text-white transition-colors"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
