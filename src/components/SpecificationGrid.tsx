"use client";

import React from "react";
import { ArrowUpRight, BatteryCharging, Cpu, Sliders, Volume2, ShieldCheck, Sparkles } from "lucide-react";

interface SpecGroup {
  category: string;
  items: {
    label: string;
    value: string;
    detail?: string;
  }[];
}

const SPEC_GROUPS: SpecGroup[] = [
  {
    category: "Acoustic & Sound",
    items: [
      {
        label: "Driver Architecture",
        value: "40 mm Custom Dynamic Drivers",
        detail: "Custom composite diaphragms with nickel plating and high-flux neodymium magnets.",
      },
      {
        label: "High-Resolution Audio",
        value: "Hi-Res Audio Certified & LDAC Support",
        detail: "Lossless Bluetooth streaming up to 990 kbps at 24-bit / 96 kHz.",
      },
      {
        label: "Spatial Audio",
        value: "Cinema & Concert Modes",
        detail: "Spatialized soundstage algorithms with 3D immersion profiling.",
      },
      {
        label: "Sound Personalisation",
        value: "Personal Sound Profile via Nothing X",
        detail: "Hearing test compensation tailored to individual auditory thresholds.",
      },
    ],
  },
  {
    category: "Noise Control & Microphones",
    items: [
      {
        label: "Active Noise Cancellation",
        value: "Hybrid Adaptive ANC",
        detail: "Continually samples ambient noise and adjusts attenuation depth in real time.",
      },
      {
        label: "Transparency Mode",
        value: "Natural Acoustic Pass-Through",
        detail: "Allows surrounding voices and environmental awareness without taking off the headphones.",
      },
      {
        label: "Microphone Array",
        value: "Multi-Mic Clear Voice Technology",
        detail: "Beamforming microphone array for crisp calls and wind-noise reduction.",
      },
    ],
  },
  {
    category: "Battery & Power",
    items: [
      {
        label: "Playback Duration (ANC Off)",
        value: "Up to 100 Hours*",
        detail: "Manufacturer-rated maximum playback duration under controlled test conditions.",
      },
      {
        label: "Playback Duration (ANC On)",
        value: "Up to 50 Hours*",
        detail: "Continuous playback with Hybrid Adaptive ANC enabled.",
      },
      {
        label: "Fast Charging",
        value: "10 min Charge = 10 Hours Playback",
        detail: "Rapid USB-C power delivery for immediate listening convenience.",
      },
      {
        label: "Charging Interface",
        value: "Universal USB-C Port",
        detail: "Recharge with any standard USB-C cable or power adapter.",
      },
    ],
  },
  {
    category: "Hardware Controls & Ergonomics",
    items: [
      {
        label: "Multifunction Roller",
        value: "Anodized Aluminum Roller",
        detail: "Physical steppers for volume adjustment, play, pause, and track skip.",
      },
      {
        label: "Energy Slider",
        value: "Mechanical Bass / Treble Slider",
        detail: "Instant tactile tonal adjustments without opening companion apps.",
      },
      {
        label: "Custom Action Button",
        value: "Tactile Physical Button",
        detail: "Configurable via Nothing X app for ANC toggles or voice assistant.",
      },
      {
        label: "Modularity & Comfort",
        value: "Interchangeable Twist-Off Cushions",
        detail: "Ergonomic memory foam cushions engineered for extended listening sessions.",
      },
    ],
  },
];

export default function SpecificationGrid() {
  return (
    <section id="specs" className="relative py-28 px-5 sm:px-8 bg-[#0A0A0C] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FF5A1F] font-semibold">
                TECHNICAL BENCHMARKS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Engineered to perform.
            </h2>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs font-mono text-white/40 block mb-1">PRODUCT SPECIFICATION</span>
            <span className="text-sm font-semibold text-white">CMF Headphone Pro by Nothing</span>
          </div>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {SPEC_GROUPS.map((group) => (
            <div
              key={group.category}
              className="bg-[#111214] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                <h3 className="font-mono text-xs text-[#FF5A1F] font-bold uppercase tracking-widest">
                  {group.category}
                </h3>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>

              <div className="divide-y divide-white/[0.06]">
                {group.items.map((item) => (
                  <div key={item.label} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <span className="text-xs font-mono text-white/50 tracking-wide uppercase">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-white">{item.value}</span>
                    </div>
                    {item.detail && (
                      <p className="text-xs text-white/60 leading-relaxed font-light mt-0.5">
                        {item.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Battery Disclosure & App Links */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] text-white/40 leading-relaxed max-w-2xl">
            * Battery playback duration figures are manufacturer-rated maximum playback estimates tested with AAC playback at 50% volume. Actual battery life varies depending on device settings, environment, usage patterns, and other factors. LDAC playback requires compatible playback source devices.
          </p>
          <a
            href="https://cmf.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A9D4C9] hover:text-white transition-colors border-b border-[#A9D4C9]/40 pb-0.5 flex-shrink-0"
          >
            <span>Official Nothing X App</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
