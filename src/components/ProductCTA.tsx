"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ProductCTA() {
  const [selectedColor, setSelectedColor] = useState<"dark-grey" | "light-grey" | "light-green">("dark-grey");
  const [ordered, setOrdered] = useState(false);

  const colors = {
    "dark-grey": { name: "Dark Grey", img: "/images/cmf-dark-grey.webp", hex: "#242528" },
    "light-grey": { name: "Light Grey", img: "/images/cmf-light-grey.webp", hex: "#D6D5CF" },
    "light-green": { name: "Light Green", img: "/images/cmf-light-green.webp", hex: "#A9D4C9" },
  };

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => setOrdered(false), 3500);
  };

  return (
    <section id="preorder" className="relative py-24 sm:py-32 px-5 sm:px-8 bg-[#070709] border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Product Visual */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            <Image
              src={colors[selectedColor].img}
              alt={`CMF Headphone Pro in ${colors[selectedColor].name}`}
              fill
              sizes="(max-width: 768px) 256px, 320px"
              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            />
          </div>
          <div className="flex items-center gap-3 mt-4">
            {(["dark-grey", "light-grey", "light-green"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor === c ? "border-[#FF5A1F] scale-125" : "border-white/20"
                }`}
                style={{ backgroundColor: colors[c].hex }}
                aria-label={`Select ${colors[c].name}`}
              />
            ))}
          </div>
        </div>

        {/* Purchase Info */}
        <div className="w-full md:w-1/2 max-w-md">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF5A1F] block mb-2 font-medium">
            CMF HEADPHONE PRO
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Sound, remixed.
          </h2>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">£149</span>
            <span className="text-xs font-mono text-white/40">/ $179 / €169</span>
          </div>

          <p className="text-xs text-white/60 font-light leading-relaxed mb-6">
            40 mm custom dynamic drivers. Hybrid Adaptive ANC. Tactile Energy Slider and physical roller. Up to 100 hours playback.
          </p>

          {ordered ? (
            <div className="py-3 px-4 rounded-full bg-[#FF5A1F]/15 border border-[#FF5A1F] text-center mb-4">
              <span className="text-xs font-mono text-white font-medium">Order reserved. Redirecting to checkout...</span>
            </div>
          ) : (
            <button
              onClick={handleOrder}
              className="w-full bg-[#FF5A1F] hover:bg-[#e04e17] text-white text-xs font-semibold py-3.5 px-6 rounded-full transition-all flex items-center justify-center gap-2 mb-4 shadow-[0_2px_20px_rgba(255,90,31,0.3)]"
            >
              <span>Pre-Order CMF Headphone Pro</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="flex justify-between text-[10px] font-mono text-white/35">
            <span>Free Shipping</span>
            <span>30-Day Returns</span>
            <span>2-Year Warranty</span>
          </div>
        </div>
      </div>
    </section>
  );
}
