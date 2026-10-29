"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sliders, Volume2, Disc, Play, ShieldAlert, Sparkles, Check } from "lucide-react";

export default function HardwareControlsShowcase() {
  // Interactive Energy Slider state (-6dB to +6dB)
  const [energyLevel, setEnergyLevel] = useState(2); // Bass/Treble balance
  // Interactive Roller volume state (0 to 100)
  const [rollerAngle, setRollerAngle] = useState(45);
  const [volume, setVolume] = useState(72);
  // Interactive Action Button state
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
    <section id="controls" className="relative py-28 px-5 sm:px-8 bg-[#0A0A0C] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FF5A1F] font-semibold">
                TACTILE HARDWARE CONTROLS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Roll. Slide. Press.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md font-light leading-relaxed">
            Physical controls designed with authentic mechanical feedback. Tune your sound and navigate your day without looking at a screen.
          </p>
        </div>

        {/* 3 Interactive Hardware Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CONTROL 1: MULTIFUNCTION ROLLER */}
          <div className="bg-[#111214] border border-white/[0.08] rounded-3xl p-7 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#FF5A1F] tracking-widest font-semibold">
                  01 / PHYSICAL ROLLER
                </span>
                <span className="text-xs font-mono text-white/40">ANODIZED ALUMINUM</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Multifunction Roller</h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6">
                Engineered with micro-stepped haptic resistance. Rotate smoothly to dial volume with exact precision, or click to play, pause, and skip tracks.
              </p>
            </div>

            {/* Interactive Roller Simulation */}
            <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-4">
                <span className="text-[11px] font-mono text-white/50">OUTPUT LEVEL</span>
                <span className="text-xs font-mono text-[#FF5A1F] font-bold">{volume}%</span>
              </div>

              {/* Roller Wheel Visualizer */}
              <div className="relative w-40 h-20 overflow-hidden flex items-center justify-center cursor-ew-resize select-none">
                {/* Knurled Roller Barrel */}
                <div
                  className="w-32 h-14 bg-gradient-to-r from-[#1c1d22] via-[#2f3138] to-[#1c1d22] rounded-lg border border-white/20 shadow-[inset_0_2px_8px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.6)] flex items-center justify-center relative overflow-hidden"
                  onWheel={(e) => handleRollerDrag(e.deltaY > 0 ? -4 : 4)}
                >
                  {/* Textured knurling ridges */}
                  <div
                    className="absolute inset-0 flex justify-between px-1 pointer-events-none transition-transform duration-75"
                    style={{ transform: `translateX(${(rollerAngle % 20) - 10}px)` }}
                  >
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div key={i} className="w-[1.5px] h-full bg-black/40 border-r border-white/10" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-white/80 font-bold tracking-widest uppercase z-10 bg-[#111214]/80 px-2 py-0.5 rounded border border-white/10">
                    ROLLER
                  </span>
                </div>
              </div>

              {/* Quick Click Adjusters */}
              <div className="flex items-center gap-2 mt-4 w-full">
                <button
                  onClick={() => handleRollerDrag(-5)}
                  className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 rounded-lg text-xs font-mono transition-colors border border-white/5"
                >
                  - Vol
                </button>
                <button
                  onClick={() => handleRollerDrag(5)}
                  className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 rounded-lg text-xs font-mono transition-colors border border-white/5"
                >
                  + Vol
                </button>
              </div>
              <span className="font-mono text-[10px] text-white/30 mt-3 text-center">
                Scroll on the barrel or tap buttons to rotate
              </span>
            </div>
          </div>

          {/* CONTROL 2: DEDICATED ENERGY SLIDER */}
          <div className="bg-[#111214] border border-white/[0.08] rounded-3xl p-7 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#FF5A1F] tracking-widest font-semibold">
                  02 / SIGNATURE CONTROL
                </span>
                <span className="text-xs font-mono text-white/40">MECHANICAL SLIDER</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Dedicated Energy Slider</h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6">
                A physical slider tailored for real-time bass and treble modulation. Slide upward for heightened punch and energy, slide downward for vocal clarity.
              </p>
            </div>

            {/* Interactive Energy Slider Simulation */}
            <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-white/50">TONAL PROFILE</span>
                <span className="text-xs font-mono text-[#A9D4C9] font-bold">
                  {energyLevel > 0
                    ? `BASS ENERGY +${energyLevel * 1.5} dB`
                    : energyLevel < 0
                    ? `ACOUSTIC CLARITY ${energyLevel * 1.5} dB`
                    : "NEUTRAL REFERENCE"}
                </span>
              </div>

              {/* Animated EQ Waveform Preview */}
              <div className="h-16 w-full flex items-end justify-between gap-1 mb-4 bg-white/[0.02] p-2 rounded-lg border border-white/5">
                {[-3, -2, -1, 0, 1, 2, 3, 4, 3, 2, 1, 0].map((baseH, i) => {
                  const dynamicH = Math.max(15, Math.min(95, 40 + baseH * 6 + (i < 6 ? energyLevel * 8 : -energyLevel * 4)));
                  return (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t transition-all duration-200"
                      style={{
                        height: `${dynamicH}%`,
                        backgroundColor: i < 6 ? "#FF5A1F" : "#A9D4C9",
                        opacity: 0.75,
                      }}
                    />
                  );
                })}
              </div>

              {/* Slider Component */}
              <div className="relative flex items-center">
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF5A1F]"
                  aria-label="Energy Slider Bass and Treble Control"
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-white/40 mt-2">
                <span>Vocal Clarity (-6dB)</span>
                <span>Reference (0dB)</span>
                <span>Sub-Bass (+6dB)</span>
              </div>
            </div>
          </div>

          {/* CONTROL 3: CUSTOMISABLE ACTION BUTTON */}
          <div className="bg-[#111214] border border-white/[0.08] rounded-3xl p-7 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#FF5A1F] tracking-widest font-semibold">
                  03 / ACTION BUTTON
                </span>
                <span className="text-xs font-mono text-white/40">USER PROGRAMMABLE</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Customisable Button</h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6">
                Assign single, double, or long press actions via Nothing X app. Switch between ANC profiles, summon voice assistant, or trigger low-lag gaming mode.
              </p>
            </div>

            {/* Interactive Action Button Simulation */}
            <div className="bg-[#050505] border border-white/[0.08] rounded-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-white/50">ACTIVE MODE</span>
                <span className="text-xs font-mono text-[#FF5A1F] font-bold uppercase">
                  {actionState.replace("_", " ")}
                </span>
              </div>

              {/* Tactile Button Visualizer */}
              <div className="flex items-center justify-center py-4">
                <button
                  onClick={cycleAction}
                  className="relative group/btn active:scale-95 transition-transform"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#222329] to-[#121316] border-2 border-white/20 flex flex-col items-center justify-center p-3 shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)] group-hover/btn:border-[#FF5A1F]/60 transition-colors">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] mb-1.5 shadow-[0_0_8px_#FF5A1F]" />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/80 font-bold">
                      PRESS
                    </span>
                  </div>
                </button>
              </div>

              {/* Status Pills */}
              <div className="grid grid-cols-3 gap-1.5 mt-2">
                {[
                  { id: "adaptive", label: "Adaptive ANC" },
                  { id: "transparency", label: "Transparency" },
                  { id: "anc_off", label: "ANC Off" },
                ].map((mode) => (
                  <div
                    key={mode.id}
                    className={`py-1.5 px-2 rounded text-center text-[10px] font-mono transition-all ${
                      actionState === mode.id
                        ? "bg-[#FF5A1F]/20 text-[#FF5A1F] border border-[#FF5A1F]/40 font-bold"
                        : "bg-white/[0.02] text-white/40 border border-transparent"
                    }`}
                  >
                    {mode.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
