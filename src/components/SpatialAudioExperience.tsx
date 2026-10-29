"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Disc, Radio, Sliders, Sparkles, Volume2, Waves } from "lucide-react";

interface AudioMode {
  id: string;
  name: string;
  badge: string;
  description: string;
  bassGain: number;
  midGain: number;
  trebleGain: number;
  spatialSpread: number;
}

const AUDIO_MODES: AudioMode[] = [
  {
    id: "cinema",
    name: "Spatial Audio — Cinema",
    badge: "3D IMMERSION",
    description:
      "Simulates a multi-channel cinema room with head-tracking spatialization and enhanced low-frequency theatrical impact.",
    bassGain: 1.4,
    midGain: 1.0,
    trebleGain: 1.2,
    spatialSpread: 1.8,
  },
  {
    id: "concert",
    name: "Spatial Audio — Concert",
    badge: "ACOUSTIC HALL",
    description:
      "Emulates the acoustic reverb and natural resonance of a premier concert auditorium. Ideal for live performances and orchestral arrangements.",
    bassGain: 1.1,
    midGain: 1.3,
    trebleGain: 1.4,
    spatialSpread: 1.5,
  },
  {
    id: "hi-res",
    name: "Hi-Res Reference (LDAC)",
    badge: "STUDIO MASTER",
    description:
      "Pure, uncolored audiophile reference curve decoding up to 990 kbps at 24-bit/96kHz. Every micro-detail rendered exactly as intended.",
    bassGain: 1.0,
    midGain: 1.0,
    trebleGain: 1.0,
    spatialSpread: 1.0,
  },
  {
    id: "bass-boost",
    name: "Ultra Bass Dynamic",
    badge: "LOW-END PUNCH",
    description:
      "Leverages the custom 40mm driver's oversized copper coil for deep, authoritative sub-bass without masking mid-range vocals.",
    bassGain: 1.7,
    midGain: 0.9,
    trebleGain: 1.1,
    spatialSpread: 1.1,
  },
];

export default function SpatialAudioExperience() {
  const [activeModeId, setActiveModeId] = useState<string>("cinema");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeMode = AUDIO_MODES.find((m) => m.id === activeModeId) || AUDIO_MODES[0];

  // Frequency wave animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      phase += 0.04;
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = "#0A0A0C";
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw audio bars
      const barCount = 48;
      const barWidth = (width - 40) / barCount;

      for (let i = 0; i < barCount; i++) {
        const norm = i / barCount;
        // Frequency weighting
        let multiplier = 1;
        if (norm < 0.3) multiplier = activeMode.bassGain;
        else if (norm < 0.7) multiplier = activeMode.midGain;
        else multiplier = activeMode.trebleGain;

        const sinWave = Math.sin(norm * Math.PI * 4 + phase);
        const cosWave = Math.cos(norm * Math.PI * 2 - phase * 0.8);
        const dynamicH =
          (Math.abs(sinWave * 0.6 + cosWave * 0.4) * (height * 0.65) * multiplier * 0.7) + 10;

        const x = 20 + i * barWidth;
        const y = height / 2 - dynamicH / 2;

        // Gradient styling
        const grad = ctx.createLinearGradient(0, y, 0, y + dynamicH);
        if (norm < 0.35) {
          grad.addColorStop(0, "#FF5A1F");
          grad.addColorStop(1, "rgba(255, 90, 31, 0.3)");
        } else if (norm > 0.7) {
          grad.addColorStop(0, "#A9D4C9");
          grad.addColorStop(1, "rgba(169, 212, 201, 0.3)");
        } else {
          grad.addColorStop(0, "#FFFFFF");
          grad.addColorStop(1, "rgba(255, 255, 255, 0.2)");
        }

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth - 3, dynamicH);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeMode]);

  return (
    <section className="relative py-28 px-5 sm:px-8 bg-[#0A0A0C] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
              <Waves className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FF5A1F] font-semibold">
                ACOUSTIC LAB & SPATIAL ENGINE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Cinema sound in your ears.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-md font-light leading-relaxed">
            Experience spatial depth tailored for high-resolution audio. Switch listening modes to preview the acoustic soundstage.
          </p>
        </div>

        {/* Interactive Audio Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Mode Selectors (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {AUDIO_MODES.map((mode) => {
              const isActive = activeModeId === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveModeId(mode.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all ${
                    isActive
                      ? "bg-[#111214] border-[#FF5A1F] shadow-[0_4px_25px_rgba(255,90,31,0.2)]"
                      : "bg-[#111214]/50 border-white/[0.06] hover:border-white/15 hover:bg-[#111214]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-sm text-white">{mode.name}</span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded tracking-wider ${
                        isActive
                          ? "bg-[#FF5A1F]/20 text-[#FF5A1F] font-bold"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      {mode.badge}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">{mode.description}</p>
                </button>
              );
            })}
          </div>

          {/* Visual Frequency Canvas (7 Cols) */}
          <div className="lg:col-span-7 bg-[#111214] border border-white/[0.08] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A9D4C9] animate-pulse" />
                <span className="font-mono text-xs text-white/70 uppercase tracking-wider">
                  REAL-TIME FREQUENCY SPECTRUM
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#FF5A1F] font-bold uppercase">
                {activeMode.name}
              </span>
            </div>

            {/* Spectrum Canvas */}
            <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0A0A0C]">
              <canvas
                ref={canvasRef}
                width={700}
                height={260}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 inset-x-4 flex justify-between text-[10px] font-mono text-white/30 pointer-events-none">
                <span>20 Hz (SUB-BASS)</span>
                <span>1 kHz (VOCALS)</span>
                <span>40 kHz (HI-RES AIR)</span>
              </div>
            </div>

            {/* Acoustic Metric Readouts */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/[0.06] text-center font-mono">
              <div className="p-2 rounded bg-black/30 border border-white/5">
                <span className="text-[10px] text-white/40 block">BASS EXTENSION</span>
                <span className="text-xs text-[#FF5A1F] font-bold">
                  {(activeMode.bassGain * 12).toFixed(1)} dB
                </span>
              </div>
              <div className="p-2 rounded bg-black/30 border border-white/5">
                <span className="text-[10px] text-white/40 block">SPATIAL WIDTH</span>
                <span className="text-xs text-[#A9D4C9] font-bold">
                  {(activeMode.spatialSpread * 180).toFixed(0)}° STAGE
                </span>
              </div>
              <div className="p-2 rounded bg-black/30 border border-white/5">
                <span className="text-[10px] text-white/40 block">SAMPLING DEPTH</span>
                <span className="text-xs text-white font-bold">24-BIT / 96kHz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
