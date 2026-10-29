"use client";

import React, { useState, useEffect, useRef } from "react";

interface AudioMode {
  id: string;
  name: string;
  badge: string;
  desc: string;
  bassGain: number;
  midGain: number;
  trebleGain: number;
}

const AUDIO_MODES: AudioMode[] = [
  {
    id: "cinema",
    name: "Spatial Cinema",
    badge: "3D",
    desc: "Multi-channel spatialized soundstage with sub-bass depth.",
    bassGain: 1.4,
    midGain: 1.0,
    trebleGain: 1.2,
  },
  {
    id: "concert",
    name: "Spatial Concert",
    badge: "ACOUSTIC",
    desc: "Acoustic concert hall resonance for expansive live staging.",
    bassGain: 1.1,
    midGain: 1.3,
    trebleGain: 1.35,
  },
  {
    id: "hi-res",
    name: "Hi-Res LDAC",
    badge: "LOSSLESS",
    desc: "Pure reference studio mastering curve up to 990 kbps at 24-bit/96kHz.",
    bassGain: 1.0,
    midGain: 1.0,
    trebleGain: 1.0,
  },
  {
    id: "bass",
    name: "Ultra Bass",
    badge: "DYNAMIC",
    desc: "Deep, punchy low-frequency resonance without vocal bleed.",
    bassGain: 1.6,
    midGain: 0.95,
    trebleGain: 1.1,
  },
];

export default function SpatialAudioExperience() {
  const [activeModeId, setActiveModeId] = useState<string>("cinema");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeMode = AUDIO_MODES.find((m) => m.id === activeModeId) || AUDIO_MODES[0];

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

      ctx.fillStyle = "#070709";
      ctx.fillRect(0, 0, width, height);

      const barCount = 36;
      const barWidth = width / barCount;

      for (let i = 0; i < barCount; i++) {
        const norm = i / barCount;
        let mult = 1;
        if (norm < 0.35) mult = activeMode.bassGain;
        else if (norm < 0.7) mult = activeMode.midGain;
        else mult = activeMode.trebleGain;

        const sinWave = Math.sin(norm * Math.PI * 3 + phase);
        const cosWave = Math.cos(norm * Math.PI * 2 - phase * 0.7);
        const barH = (Math.abs(sinWave * 0.6 + cosWave * 0.4) * (height * 0.6) * mult * 0.7) + 6;

        const x = i * barWidth + barWidth * 0.15;
        const y = height / 2 - barH / 2;

        ctx.fillStyle = norm < 0.35 ? "#FF5A1F" : norm > 0.7 ? "#A9D4C9" : "#FFFFFF";
        ctx.globalAlpha = 0.8;
        ctx.fillRect(x, y, barWidth * 0.7, barH);
        ctx.globalAlpha = 1.0;
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeMode]);

  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8 bg-[#070709] border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Minimal Section Header */}
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF5A1F] block mb-2 font-medium">
          SPATIAL AUDIO & LDAC
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
          Feel every frequency.
        </h2>
        <p className="text-xs sm:text-sm text-white/50 font-light max-w-md mb-8">
          Custom 40 mm drivers paired with Spatial Audio Cinema and Concert modes.
        </p>

        {/* Minimal Pill Mode Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {AUDIO_MODES.map((mode) => {
            const isActive = activeModeId === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveModeId(mode.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                  isActive
                    ? "bg-[#FF5A1F]/15 border-[#FF5A1F] text-[#FF5A1F] font-semibold"
                    : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white"
                }`}
              >
                {mode.name}
              </button>
            );
          })}
        </div>

        {/* Clean Spectrum Canvas */}
        <div className="w-full max-w-xl h-28 sm:h-36 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#070709] relative mb-3">
          <canvas ref={canvasRef} width={600} height={150} className="w-full h-full object-cover" />
        </div>

        {/* Dynamic Mode Caption */}
        <p className="text-xs text-white/45 font-mono max-w-md">
          {activeMode.desc}
        </p>
      </div>
    </section>
  );
}
