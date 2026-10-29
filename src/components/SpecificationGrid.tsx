"use client";

import React from "react";

const SPECS = [
  {
    group: "AUDIO & ACOUSTICS",
    specs: [
      { label: "Driver", value: "40 mm Custom Dynamic Drivers" },
      { label: "Diaphragm", value: "Nickel-Plated Composite" },
      { label: "Codecs", value: "LDAC, AAC, SBC (Hi-Res Certified)" },
      { label: "Spatial Audio", value: "Cinema & Concert Modes" },
      { label: "Personal Sound", value: "Hearing Profile via Nothing X" },
    ],
  },
  {
    group: "NOISE CONTROL",
    specs: [
      { label: "Active Noise Cancellation", value: "Hybrid Adaptive ANC (up to 45 dB)" },
      { label: "Transparency", value: "Acoustic Pass-Through Mode" },
      { label: "Microphones", value: "5 HD Mics with Clear Voice" },
    ],
  },
  {
    group: "BATTERY & CHARGING",
    specs: [
      { label: "Playback (ANC Off)", value: "Up to 100 Hours*" },
      { label: "Playback (ANC On)", value: "Up to 50 Hours*" },
      { label: "Fast Charge", value: "10 mins = 10 Hours playback" },
      { label: "Port", value: "USB-C" },
    ],
  },
  {
    group: "CONTROLS & BUILD",
    specs: [
      { label: "Hardware Roller", value: "Continuous Volume & Playback" },
      { label: "Energy Slider", value: "Physical Bass / Treble Tuning" },
      { label: "Action Button", value: "Customisable Shortcut Button" },
      { label: "Cushions", value: "Modular Twist-Off Replaceable" },
    ],
  },
];

export default function SpecificationGrid() {
  return (
    <section id="specs" className="relative py-24 sm:py-32 px-5 sm:px-8 bg-[#050505] border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF5A1F] block mb-2 font-medium">
            SPECIFICATIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Technical summary.
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-light">
            Verified hardware and acoustic specifications.
          </p>
        </div>

        {/* Editorial Spec Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {SPECS.map((group) => (
            <div key={group.group} className="space-y-4">
              <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase block pb-2 border-b border-white/[0.08]">
                {group.group}
              </span>
              <div className="space-y-3">
                {group.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between items-baseline gap-4 text-xs">
                    <span className="text-white/50 font-light">{spec.label}</span>
                    <span className="text-white font-medium text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-16 text-[10px] font-mono text-white/30 leading-relaxed max-w-xl">
          * Maximum playback duration based on manufacturer testing with AAC at 50% volume. Actual performance varies with usage, settings, and playback conditions. LDAC requires compatible host devices.
        </p>
      </div>
    </section>
  );
}
