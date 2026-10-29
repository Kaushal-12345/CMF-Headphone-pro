"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HardwareControlsShowcase() {
  const [energyLevel, setEnergyLevel] = useState(2);
  const [rollerAngle, setRollerAngle] = useState(45);
  const [volume, setVolume] = useState(70);
  const [actionState, setActionState] = useState<"adaptive" | "transparency" | "anc_off">("adaptive");

  const cycleAction = () => {
    if (actionState === "adaptive") setActionState("transparency");
    else if (actionState === "transparency") setActionState("anc_off");
    else setActionState("adaptive");
  };

  const handleRollerDrag = (delta: number) => {
    setRollerAngle((prev) => (prev + delta) % 360);
    setVolume((prev) => Math.max(0, Math.min(100, Math.round(prev + delta * 0.2))));
  };

  return (
    <section id="controls" className="relative py-24 sm:py-32 px-5 sm:px-8 bg-[#070709] border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        {/* Minimal Section Header */}
        <div className="max-w-md mb-16 sm:mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF5A1F] block mb-2 font-medium">
            TACTILE CONTROLS
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Roll. Slide. Press.
          </h2>
          <p className="text-xs sm:text-sm text-white/55 font-light leading-relaxed">
            Physical controls with tactile feedback. No need to look at a screen.
          </p>
        </div>

        {/* 3 Clean Minimal Interactive Units */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* 01: ROLLER */}
          <div className="flex flex-col justify-between space-y-6 pt-4 border-t border-white/[0.08]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-[#FF5A1F] uppercase tracking-wider">
                  01 / ROLLER
                </span>
                <span className="font-mono text-[10px] text-white/40">{volume}% VOL</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1.5">Multifunction Roller</h3>
              <p className="text-xs text-white/50 font-light leading-relaxed">
                Micro-stepped resistance for continuous volume dialing and media track navigation.
              </p>
            </div>

            {/* Interactive Roller Element */}
            <div className="py-4 flex flex-col items-center">
              <div
                className="w-full h-12 bg-white/[0.03] hover:bg-white/[0.05] rounded-xl border border-white/10 flex items-center justify-center cursor-ew-resize relative overflow-hidden transition-colors"
                onWheel={(e) => handleRollerDrag(e.deltaY > 0 ? -4 : 4)}
              >
                <div
                  className="absolute inset-0 flex justify-between px-2 pointer-events-none transition-transform duration-75"
                  style={{ transform: `translateX(${(rollerAngle % 16) - 8}px)` }}
                >
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="w-[1px] h-full bg-white/10" />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest z-10">
                  SCROLL OR DRAG
                </span>
              </div>

              <div className="flex items-center justify-between w-full mt-2.5">
                <button
                  onClick={() => handleRollerDrag(-5)}
                  className="text-[10px] font-mono text-white/40 hover:text-white px-2 py-1 rounded bg-white/[0.02]"
                >
                  - Vol
                </button>
                <span className="text-[10px] font-mono text-white/30">LEVEL {volume}</span>
                <button
                  onClick={() => handleRollerDrag(5)}
                  className="text-[10px] font-mono text-white/40 hover:text-white px-2 py-1 rounded bg-white/[0.02]"
                >
                  + Vol
                </button>
              </div>
            </div>
          </div>

          {/* 02: ENERGY SLIDER */}
          <div className="flex flex-col justify-between space-y-6 pt-4 border-t border-white/[0.08]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-[#FF5A1F] uppercase tracking-wider">
                  02 / SLIDER
                </span>
                <span className="font-mono text-[10px] text-[#A9D4C9]">
                  {energyLevel > 0 ? `+${energyLevel * 1.5} dB BASS` : energyLevel < 0 ? `${energyLevel * 1.5} dB CLARITY` : "0 dB REF"}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1.5">Dedicated Energy Slider</h3>
              <p className="text-xs text-white/50 font-light leading-relaxed">
                Dedicated hardware slider for direct low and high frequency modulation on the fly.
              </p>
            </div>

            {/* Interactive Slider Element */}
            <div className="py-4 space-y-3">
              <input
                type="range"
                min="-4"
                max="4"
                step="1"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#FF5A1F]"
                aria-label="Energy Slider Bass and Treble Control"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/35">
                <span>Vocal (-6dB)</span>
                <span>Ref (0dB)</span>
                <span>Bass (+6dB)</span>
              </div>
            </div>
          </div>

          {/* 03: ACTION BUTTON */}
          <div className="flex flex-col justify-between space-y-6 pt-4 border-t border-white/[0.08]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-[#FF5A1F] uppercase tracking-wider">
                  03 / BUTTON
                </span>
                <span className="font-mono text-[10px] text-white/40 uppercase">
                  {actionState.replace("_", " ")}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1.5">Custom Action Button</h3>
              <p className="text-xs text-white/50 font-light leading-relaxed">
                Single or double tap to cycle noise control or trigger voice commands.
              </p>
            </div>

            {/* Interactive Button Element */}
            <div className="py-4">
              <button
                onClick={cycleAction}
                className="w-full py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-xs font-mono text-white/80 flex items-center justify-between transition-all active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                  <span>TAP TO CYCLE MODE</span>
                </span>
                <span className="text-[10px] text-white/40 uppercase font-bold">
                  {actionState === "adaptive" ? "ANC" : actionState === "transparency" ? "TRANSPARENCY" : "OFF"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
