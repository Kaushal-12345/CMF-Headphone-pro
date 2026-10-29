"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Palette, Shield } from "lucide-react";

interface Colourway {
  id: string;
  name: string;
  subtitle: string;
  hex: string;
  swatchBorder: string;
  imageSrc: string;
  finish: string;
  sliders: string;
  cushions: string;
  description: string;
}

const COLOURWAYS: Colourway[] = [
  {
    id: "dark-grey",
    name: "Dark Grey",
    subtitle: "The Signature Cinematic Edition",
    hex: "#222326",
    swatchBorder: "rgba(255,255,255,0.25)",
    imageSrc: "/images/cmf-dark-grey.webp",
    finish: "Matte industrial graphite with anti-fingerprint coating",
    sliders: "Polished dark chrome stainless steel adjustment stems",
    cushions: "Charcoal acoustic memory foam with protein leatherette",
    description:
      "Deep, architectural, and timeless. Dark Grey highlights the precision machining and subtle highlights of the CMF Headphone Pro silhouette.",
  },
  {
    id: "light-grey",
    name: "Light Grey",
    subtitle: "Architectural & Minimalist",
    hex: "#D8D7D2",
    swatchBorder: "rgba(255,255,255,0.4)",
    imageSrc: "/images/cmf-light-grey.webp",
    finish: "Matte warm off-white stone finish with tactile texture",
    sliders: "Brushed aircraft-grade silver aluminum sliders",
    cushions: "Light stone memory foam with breathable micro-perforations",
    description:
      "Clean, tactile, and restrained. Light Grey accentuates the distinctive circular earcups and signature CMF orange tactile accents.",
  },
  {
    id: "light-green",
    name: "Light Green",
    subtitle: "CMF Playful Expression",
    hex: "#A9D4C9",
    swatchBorder: "rgba(169,212,201,0.5)",
    imageSrc: "/images/cmf-light-green.webp",
    finish: "Matte soft sage / mint pastel with UV protective layer",
    sliders: "Brushed satin metal adjustment hardware",
    cushions: "Soft mint ergonomic cushions with twist-off modular lock",
    description:
      "Playful yet sophisticated. Light Green embodies CMF by Nothing's ethos of bringing expressive, joyous color to everyday consumer technology.",
  },
];

export default function ProductColourSelector() {
  const [selectedId, setSelectedId] = useState<string>("dark-grey");
  const selectedColour = COLOURWAYS.find((c) => c.id === selectedId) || COLOURWAYS[0];

  return (
    <section id="colours" className="relative py-28 px-5 sm:px-8 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
            <Palette className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FF5A1F] font-semibold">
              COLOURWAYS & FINISHES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Choose your expression.
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light">
            Individually rendered finishes engineered with bespoke surface treatments and tactile textures.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Display (8 Cols) */}
          <div className="lg:col-span-8 relative bg-[#0A0A0C] border border-white/[0.08] rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center min-h-[480px] sm:min-h-[580px] overflow-hidden shadow-2xl">
            {/* Subtle radial floor ambient light */}
            <div className="absolute inset-0 bg-radial from-white/[0.03] via-transparent to-transparent pointer-events-none" />

            {/* Product Image Stage with Crossfade Transition */}
            <div className="relative w-full max-w-2xl aspect-[16/9] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColour.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={selectedColour.imageSrc}
                    alt={`CMF Headphone Pro in ${selectedColour.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-contain pointer-events-none"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Live Model Badge */}
            <div className="absolute bottom-6 left-6 sm:left-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
              <span className="font-mono text-xs text-white/70 tracking-widest uppercase">
                {selectedColour.name}
              </span>
            </div>

            {/* Twist-off Cushion Note */}
            <div className="absolute bottom-6 right-6 sm:right-10 hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-white/40">
              <Sparkles className="w-3.5 h-3.5 text-[#A9D4C9]" />
              <span>TWIST-OFF CUSHIONS COMPATIBLE</span>
            </div>
          </div>

          {/* Details & Selector Controls (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            {/* Tactile Colour Swatch Selector */}
            <div className="bg-[#111214] border border-white/[0.08] rounded-3xl p-6 shadow-xl">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5A1F] font-bold block mb-3">
                SELECT COLOURWAY
              </span>

              <div className="flex items-center gap-3 mb-6">
                {COLOURWAYS.map((colour) => {
                  const isSelected = selectedId === colour.id;
                  return (
                    <button
                      key={colour.id}
                      onClick={() => setSelectedId(colour.id)}
                      className={`relative flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all border ${
                        isSelected
                          ? "bg-white/10 border-[#FF5A1F] shadow-[0_0_15px_rgba(255,90,31,0.3)]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border shadow-inner flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: colour.hex,
                          borderColor: colour.swatchBorder,
                        }}
                      >
                        {isSelected && <Check className="w-3 h-3 text-[#FF5A1F] stroke-[3]" />}
                      </span>
                      <span className="text-xs font-medium text-white">{colour.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Colorway Description */}
              <div className="pt-4 border-t border-white/[0.08]">
                <h3 className="text-lg font-bold text-white mb-1">{selectedColour.name}</h3>
                <p className="text-xs font-mono text-[#A9D4C9] mb-3">{selectedColour.subtitle}</p>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  {selectedColour.description}
                </p>

                {/* Material breakdown specs */}
                <div className="space-y-3 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-white/40 block mb-0.5">SURFACE FINISH</span>
                    <span className="text-white/90">{selectedColour.finish}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-white/40 block mb-0.5">ADJUSTMENT SLIDERS</span>
                    <span className="text-white/90">{selectedColour.sliders}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-white/40 block mb-0.5">EAR CUSHIONS</span>
                    <span className="text-white/90">{selectedColour.cushions}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modular Customisation Pill */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-xs text-[#FF5A1F] font-bold">CMF</span>
              </div>
              <div className="text-xs">
                <span className="text-white font-medium block">Mix & Match Cushions</span>
                <span className="text-white/50 text-[11px]">
                  Ear cushions can be swapped across all three colourways.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
