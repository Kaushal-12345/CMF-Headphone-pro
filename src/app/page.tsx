"use client";

import React from "react";
import ProductNavbar from "@/components/ProductNavbar";
import ScrollytellingCanvas from "@/components/ScrollytellingCanvas";
import HardwareControlsShowcase from "@/components/HardwareControlsShowcase";
import SpatialAudioExperience from "@/components/SpatialAudioExperience";
import ProductColourSelector from "@/components/ProductColourSelector";
import SpecificationGrid from "@/components/SpecificationGrid";
import ProductCTA from "@/components/ProductCTA";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#FF5A1F] selection:text-white">
      {/* Dynamic Product Navigation */}
      <ProductNavbar />

      {/* Primary Cinematic 120-Frame Scrollytelling Showcase */}
      <ScrollytellingCanvas />

      {/* Tactile Hardware Controls Deep Dive (Roller, Energy Slider, Action Button) */}
      <HardwareControlsShowcase />

      {/* Acoustic Lab & Spatial Audio Immersion */}
      <SpatialAudioExperience />

      {/* Interactive Colour Customisation Selector */}
      <ProductColourSelector />

      {/* Verified Technical Specifications Editorial Grid */}
      <SpecificationGrid />

      {/* Closing Pre-Order & Commercial Hero */}
      <ProductCTA />

      {/* Brand Editorial Footer */}
      <SiteFooter />
    </main>
  );
}
