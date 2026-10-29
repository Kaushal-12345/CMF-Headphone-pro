"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Colourway {
  id: string;
  name: string;
  subtitle: string;
  hex: string;
  imageSrc: string;
  description: string;
}

const COLOURWAYS: Colourway[] = [
  {
    id: "dark-grey",
    name: "Dark Grey",
    subtitle: "Matte industrial graphite with chrome sliders",
    hex: "#242528",
    imageSrc: "/images/cmf-dark-grey.webp",
    description: "Deep, architectural, and timeless. Accented with subtle dark chrome adjustment stems.",
  },
  {
    id: "light-grey",
    name: "Light Grey",
    subtitle: "Warm off-white with brushed aluminum",
    hex: "#D6D5CF",
    imageSrc: "/images/cmf-light-grey.webp",
    description: "Architectural and restrained. Accentuates the distinctive circular earcups and tactile orange accents.",
  },
  {
    id: "light-green",
    name: "Light Green",
    subtitle: "CMF signature mint pastel",
    hex: "#A9D4C9",
    imageSrc: "/images/cmf-light-green.webp",
    description: "Playful yet sophisticated. Soft sage tones paired with brushed metal adjustment hardware.",
  },
];

export default function ProductColourSelector() {
  const [selectedId, setSelectedId] = useState<string>("dark-grey");
  const selectedColour = COLOURWAYS.find((c) => c.id === selectedId) || COLOURWAYS[0];

  return (
    <section id="colours" className="relative py-24 sm:py-32 px-5 sm:px-8 bg-[#050505] border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Minimal Section Header */}
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF5A1F] block mb-2 font-medium">
          COLOURWAYS
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
          Choose your expression.
        </h2>
        <p className="text-xs sm:text-sm text-white/50 font-light max-w-md mb-10">
          Precision matte surface treatments with interchangeable twist-off cushions.
        </p>

        {/* Minimalist Centered Product Stage */}
        <div className="relative w-full max-w-2xl aspect-[16/9] flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedColour.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src={selectedColour.imageSrc}
                alt={`CMF Headphone Pro in ${selectedColour.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 750px"
                className="object-contain pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimalist Colourway Swatch Switcher */}
        <div className="flex items-center gap-4 mb-4">
          {COLOURWAYS.map((colour) => {
            const isSelected = selectedId === colour.id;
            return (
              <button
                key={colour.id}
                onClick={() => setSelectedId(colour.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border ${
                  isSelected
                    ? "border-[#FF5A1F] bg-white/[0.06]"
                    : "border-white/10 hover:border-white/20 bg-transparent"
                }`}
                aria-label={`Select ${colour.name}`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                  style={{ backgroundColor: colour.hex }}
                />
                <span className="text-xs font-medium text-white/90">{colour.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Microcopy */}
        <p className="text-xs text-white/45 font-light max-w-md">
          {selectedColour.subtitle}
        </p>
      </div>
    </section>
  );
}
