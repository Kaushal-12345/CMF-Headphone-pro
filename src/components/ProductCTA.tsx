"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Shield, Truck, RotateCcw, Sparkles } from "lucide-react";

export default function ProductCTA() {
  const [selectedColor, setSelectedColor] = useState<"dark-grey" | "light-grey" | "light-green">("dark-grey");
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const colorData = {
    "dark-grey": {
      name: "Dark Grey",
      img: "/images/cmf-dark-grey.webp",
      hex: "#222326",
    },
    "light-grey": {
      name: "Light Grey",
      img: "/images/cmf-light-grey.webp",
      hex: "#D8D7D2",
    },
    "light-green": {
      name: "Light Green",
      img: "/images/cmf-light-green.webp",
      hex: "#A9D4C9",
    },
  };

  const handlePreOrder = () => {
    setOrderSubmitted(true);
    setTimeout(() => {
      setOrderSubmitted(false);
    }, 4000);
  };

  return (
    <section id="preorder" className="relative py-28 px-5 sm:px-8 bg-[#050505] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5A1F]/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-[#0A0A0C] border border-white/[0.08] rounded-3xl p-8 sm:p-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Headphone Showcase (6 Cols) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-md flex items-center justify-center">
                <Image
                  src={colorData[selectedColor].img}
                  alt={`CMF Headphone Pro in ${colorData[selectedColor].name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-contain transition-all duration-300 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* Quick Color Selector */}
              <div className="flex items-center gap-3 mt-4">
                {(["dark-grey", "light-grey", "light-green"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      selectedColor === c
                        ? "border-[#FF5A1F] scale-110 shadow-[0_0_12px_rgba(255,90,31,0.5)]"
                        : "border-white/20 hover:border-white/40"
                    }`}
                    style={{ backgroundColor: colorData[c].hex }}
                    aria-label={`Select ${colorData[c].name}`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-white/50 mt-2">
                Colourway: <span className="text-white font-medium">{colorData[selectedColor].name}</span>
              </span>
            </div>

            {/* Purchase Details (6 Cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#FF5A1F] font-semibold">
                    OFFICIAL LAUNCH EDITION
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
                  CMF Headphone Pro
                </h3>
                <p className="text-sm text-white/60 mb-6 font-light">
                  Expressive design. Powerful sound. Control that feels natural.
                </p>

                {/* Pricing & Availability */}
                <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-white/[0.08]">
                  <span className="text-4xl font-bold text-white tracking-tight">£149</span>
                  <span className="text-sm font-mono text-white/40">/ $179 / €169</span>
                  <span className="ml-auto text-xs font-mono text-[#A9D4C9] bg-[#A9D4C9]/10 px-2.5 py-1 rounded border border-[#A9D4C9]/20">
                    IN STOCK & READY TO SHIP
                  </span>
                </div>

                {/* Key Features Quick Check */}
                <div className="grid grid-cols-2 gap-3 mb-8 text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF5A1F]" />
                    <span>40 mm Custom Dynamic Drivers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF5A1F]" />
                    <span>Hybrid Adaptive ANC (45 dB)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF5A1F]" />
                    <span>Up to 100 Hours Playback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF5A1F]" />
                    <span>Dedicated Energy Slider & Roller</span>
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div>
                {orderSubmitted ? (
                  <div className="p-4 rounded-2xl bg-[#FF5A1F]/15 border border-[#FF5A1F] text-center mb-4">
                    <span className="text-xs font-mono text-white font-bold block mb-1">
                      ORDER RESERVED SUCCESSFULLY
                    </span>
                    <span className="text-[11px] text-white/70">
                      Redirecting to secure Nothing checkout in your region...
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={handlePreOrder}
                    className="w-full bg-[#FF5A1F] hover:bg-[#e04e17] text-white font-semibold py-4 px-6 rounded-full text-sm tracking-wide transition-all shadow-[0_4px_30px_rgba(255,90,31,0.45)] hover:shadow-[0_6px_40px_rgba(255,90,31,0.6)] active:scale-98 flex items-center justify-center gap-2 mb-4"
                  >
                    <span>Pre-Order CMF Headphone Pro</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}

                {/* Guarantee Badges */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-white/40 pt-2">
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-white/60" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5 text-white/60" />
                    <span>30-Day Returns</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-white/60" />
                    <span>2-Year Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
