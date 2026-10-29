"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sliders,
  Volume2,
  Disc3,
  ShieldCheck,
  ChevronDown,
  Layers,
  Sparkles,
  RotateCcw,
  Zap,
} from "lucide-react";

const TOTAL_FRAMES = 120;
const FRAME_PATH = (index: number) =>
  `/images/cmf-headphone-pro/frame-${String(index + 1).padStart(3, "0")}.webp`;

interface TechnicalPin {
  id: string;
  act: number;
  label: string;
  techSpec: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  description: string;
}

const TECHNICAL_PINS: TechnicalPin[] = [
  {
    id: "pin-cushion",
    act: 2,
    label: "01 / MODULAR CUSHION",
    techSpec: "Twist-Lock Mechanism",
    xPercent: 24,
    yPercent: 62,
    description: "Replaceable high-density memory foam ear cushions with acoustic seal rings.",
  },
  {
    id: "pin-slider",
    act: 2,
    label: "02 / STAINLESS SLIDER",
    techSpec: "Dual-Rail Extrusion",
    xPercent: 68,
    yPercent: 32,
    description: "Continuous micro-stepping sliders engineered for uniform headband clamping pressure.",
  },
  {
    id: "pin-anc-mic",
    act: 3,
    label: "03 / DUAL FEEDFORWARD MICS",
    techSpec: "Hybrid Adaptive ANC",
    xPercent: 78,
    yPercent: 48,
    description: "Multi-microphone array constantly samples ambient environmental frequencies.",
  },
  {
    id: "pin-driver",
    act: 4,
    label: "04 / 40MM CUSTOM DRIVER",
    techSpec: "Nickel-Plated Diaphragm",
    xPercent: 52,
    yPercent: 52,
    description: "Ultra-low distortion composite diaphragm with oversized pure copper voice coil.",
  },
  {
    id: "pin-pcb",
    act: 4,
    label: "05 / ACOUSTIC PROCESSOR",
    techSpec: "LDAC & Hi-Res Certified",
    xPercent: 22,
    yPercent: 48,
    description: "High-throughput audio DSP engine decoding lossless 24-bit/96kHz streams.",
  },
  {
    id: "pin-roller",
    act: 5,
    label: "06 / MULTIFUNCTION ROLLER",
    techSpec: "Tactile Stepper",
    xPercent: 18,
    yPercent: 50,
    description: "Smooth aluminum-knurled roller for organic volume sweeps and media control.",
  },
];

export default function ScrollytellingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [initialReady, setInitialReady] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePin, setActivePin] = useState<TechnicalPin | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isManualScrubbing, setIsManualScrubbing] = useState(false);

  // Smooth lerp ref for 60fps rendering
  const renderStateRef = useRef({
    currentFrame: 0,
    targetFrame: 0,
    animating: false,
  });

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Preloading engine: priority for first 15 frames, then progressive background loading
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const loadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]) {
          return resolve(imagesRef.current[index]!);
        }
        const img = new Image();
        img.src = FRAME_PATH(index);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            loadedCount++;
            setImagesLoaded(loadedCount);
            if (index === 0 || loadedCount >= 8) {
              setInitialReady(true);
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          // Graceful fallback to first frame if a frame fails
          if (imagesRef.current[0]) {
            imagesRef.current[index] = imagesRef.current[0];
          }
          resolve(img);
        };
      });
    };

    // Priority chunk: frames 0 to 15
    const loadPriority = async () => {
      const priorityPromises: Promise<any>[] = [];
      for (let i = 0; i < Math.min(15, TOTAL_FRAMES); i++) {
        priorityPromises.push(loadImage(i));
      }
      await Promise.all(priorityPromises);

      // Progressive batch loading remaining frames
      for (let i = 15; i < TOTAL_FRAMES; i++) {
        if (isCancelled) break;
        await loadImage(i);
      }
    };

    loadPriority();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw frame onto canvas with proper aspect ratio containment & seamless background
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIdx] || imagesRef.current[0];
    if (!img) return;

    const width = canvas.width;
    const height = canvas.height;

    // Master deep background
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, width, height);

    // Subtle atmospheric studio spotlight behind the headphone
    const radGlow = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      width * 0.05,
      width * 0.5,
      height * 0.5,
      width * 0.6
    );
    radGlow.addColorStop(0, "rgba(22, 24, 28, 0.45)");
    radGlow.addColorStop(0.5, "rgba(10, 11, 14, 0.25)");
    radGlow.addColorStop(1, "rgba(5, 5, 5, 0)");
    ctx.fillStyle = radGlow;
    ctx.fillRect(0, 0, width, height);

    // Calculate containment scaling preserving aspect ratio (1920:1080 = 16:9)
    const imgRatio = img.naturalWidth / img.naturalHeight || 16 / 9;
    const canvasRatio = width / height;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (canvasRatio > imgRatio) {
      // Screen is wider than 16:9
      drawH = height;
      drawW = height * imgRatio;
      drawX = (width - drawW) / 2;
      drawY = 0;
    } else {
      // Screen is taller than 16:9 (mobile / tablet)
      drawW = width;
      drawH = width / imgRatio;
      drawX = 0;
      drawY = (height - drawH) / 2;
    }

    // Render headphone frame
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Edge feathering overlay to guarantee 100% seamless continuity with #050505
    const edgeVignette = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      Math.min(width, height) * 0.45,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * 0.75
    );
    edgeVignette.addColorStop(0, "rgba(5, 5, 5, 0)");
    edgeVignette.addColorStop(1, "rgba(5, 5, 5, 0.95)");
    ctx.fillStyle = edgeVignette;
    ctx.fillRect(0, 0, width, height);
  }, []);

  // Window resize handler with DPR scaling
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(renderStateRef.current.currentFrame);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // RequestAnimationFrame animation render loop
  const startAnimationLoop = useCallback(() => {
    if (renderStateRef.current.animating) return;
    renderStateRef.current.animating = true;

    const tick = () => {
      const state = renderStateRef.current;
      const diff = state.targetFrame - state.currentFrame;

      if (Math.abs(diff) > 0.05) {
        // Smooth lerp easing
        state.currentFrame += diff * 0.22;
        const rounded = Math.round(state.currentFrame);
        const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, rounded));
        drawFrame(clamped);
        setCurrentFrame(clamped);
        requestAnimationFrame(tick);
      } else {
        state.currentFrame = state.targetFrame;
        const rounded = Math.round(state.currentFrame);
        const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, rounded));
        drawFrame(clamped);
        setCurrentFrame(clamped);
        state.animating = false;
      }
    };

    requestAnimationFrame(tick);
  }, [drawFrame]);

  // Scroll handler mapped to pinned 400vh section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isManualScrubbing) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Calculate progress 0 to 1
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(progress);

      const targetIdx = Math.round(progress * (TOTAL_FRAMES - 1));
      renderStateRef.current.targetFrame = targetIdx;
      startAnimationLoop();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startAnimationLoop, isManualScrubbing]);

  // Manual scrub handler
  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualScrubbing(true);
    const value = parseFloat(e.target.value);
    setScrollProgress(value);
    const targetIdx = Math.round(value * (TOTAL_FRAMES - 1));
    renderStateRef.current.targetFrame = targetIdx;
    renderStateRef.current.currentFrame = targetIdx;
    drawFrame(targetIdx);
    setCurrentFrame(targetIdx);

    // Synchronize page scroll to match scrubbed position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const targetScrollY = window.scrollY + rect.top + value * totalScrollable;
      window.scrollTo({ top: targetScrollY, behavior: "instant" as ScrollBehavior });
    }
  };

  const handleScrubEnd = () => {
    setIsManualScrubbing(false);
  };

  // Determine current active storytelling Act (1 to 6)
  const currentAct =
    scrollProgress < 0.15
      ? 1
      : scrollProgress < 0.35
      ? 2
      : scrollProgress < 0.58
      ? 3
      : scrollProgress < 0.8
      ? 4
      : scrollProgress < 0.9
      ? 5
      : 6;

  // Jump to specific Act
  const jumpToAct = (act: number) => {
    if (!containerRef.current) return;
    const progressMap = [0, 0.05, 0.25, 0.45, 0.7, 0.85, 0.98];
    const targetProgress = progressMap[act];
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const targetScrollY = window.scrollY + rect.top + targetProgress * totalScrollable;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#050505]"
      style={{ height: "420vh" }}
      id="overview"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* HTML5 Canvas Renderer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        />

        {/* Initial Loading Overlay */}
        {!initialReady && (
          <div className="absolute inset-0 z-30 bg-[#050505] flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] animate-ping" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/70">
                CMF BY NOTHING
              </span>
            </div>
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF5A1F] transition-all duration-300"
                style={{ width: `${Math.round((imagesLoaded / 15) * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-white/40">
              Initializing 120-Frame Cinematic Pipeline...
            </span>
          </div>
        )}

        {/* Interactive Engineering Callout Pins (Rendered on Canvas during Acts 2, 3, 4, 5) */}
        <div className="absolute inset-0 pointer-events-none">
          {TECHNICAL_PINS.filter((pin) => pin.act === currentAct).map((pin) => (
            <div
              key={pin.id}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
              onClick={() => setActivePin(activePin?.id === pin.id ? null : pin)}
            >
              {/* Pulsing CMF Orange Hotspot */}
              <div className="relative flex items-center justify-center">
                <span className="absolute w-6 h-6 rounded-full bg-[#FF5A1F]/30 animate-ping" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#FF5A1F] border-2 border-[#050505] shadow-[0_0_12px_#FF5A1F] flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-white" />
                </span>
              </div>

              {/* Leader Line & Label */}
              <div className="absolute left-5 top-1/2 -translate-y-1/2 pl-2 hidden md:block whitespace-nowrap">
                <div className="flex items-center gap-2 bg-[#0A0A0C]/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded shadow-xl group-hover:border-[#FF5A1F]/60 transition-colors">
                  <span className="font-mono text-[10px] text-[#FF5A1F] font-semibold tracking-wider">
                    {pin.label}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="text-[11px] text-white/70">{pin.techSpec}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Pin Popover Modal */}
        <AnimatePresence>
          {activePin && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute z-40 max-w-sm bottom-28 left-6 sm:left-12 bg-[#0A0A0C]/95 backdrop-blur-xl border border-white/15 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] text-[#FF5A1F] uppercase tracking-widest font-bold">
                  {activePin.label}
                </span>
                <button
                  onClick={() => setActivePin(null)}
                  className="text-white/40 hover:text-white text-xs font-mono px-2 py-0.5 rounded bg-white/5"
                >
                  ✕
                </button>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1.5">{activePin.techSpec}</h4>
              <p className="text-xs text-white/70 leading-relaxed">{activePin.description}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STORY OVERLAYS (Choreographed to Scroll Progress) */}

        {/* ACT I: THE FIRST IMPRESSION (0% - 15%) */}
        <AnimatePresence>
          {currentAct === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-12 lg:p-16 z-20"
            >
              <div className="pt-16 sm:pt-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/60">
                    CMF BY NOTHING PRESENTS
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2 max-w-2xl">
                  CMF Headphone Pro
                </h1>
                <p className="text-xl sm:text-2xl font-light tracking-wide text-[#A9D4C9] mb-4">
                  Sound, remixed.
                </p>
                <p className="text-sm sm:text-base text-white/60 max-w-md font-normal leading-relaxed">
                  Expressive design. Powerful sound. Control that feels natural.
                </p>
              </div>

              {/* CTAs & Scroll Cue */}
              <div className="pointer-events-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8">
                <div className="flex items-center gap-4">
                  <a
                    href="#preorder"
                    className="bg-[#FF5A1F] hover:bg-[#e04e17] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all shadow-[0_4px_25px_rgba(255,90,31,0.4)]"
                  >
                    Explore Headphone Pro
                  </a>
                  <button
                    onClick={() => jumpToAct(2)}
                    className="text-xs text-white/60 hover:text-white transition-colors border-b border-white/20 pb-0.5"
                  >
                    Discover the details ↓
                  </button>
                </div>

                <div className="flex items-center gap-3 text-white/40 font-mono text-[11px] tracking-widest uppercase">
                  <span className="animate-bounce">
                    <ChevronDown className="w-4 h-4 text-[#FF5A1F]" />
                  </span>
                  <span>Scroll to disassemble</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACT II: DESIGN, REIMAGINED (15% - 35%) */}
        <AnimatePresence>
          {currentAct === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 p-6 sm:p-12 lg:p-16 flex flex-col justify-center max-w-xl z-20 pointer-events-none"
              id="design"
            >
              <div className="bg-[#050505]/60 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/[0.06]">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF5A1F] font-bold mb-2">
                  ACT II / INDUSTRIAL ARCHITECTURE
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                  Designed to be different.
                </h2>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  Every curve, surface, and connection has a purpose. Headphone Pro brings expressive CMF design to a form made for everyday listening.
                </p>
                <ul className="space-y-3">
                  {[
                    "A distinctive, comfortable over-ear silhouette.",
                    "Interchangeable ear cushions for a look that is yours.",
                    "A lightweight, adjustable structure designed for long listening sessions.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-white/80">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#FF5A1F] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                    TAP HOTSPOTS ON CANVASES FOR DETAILS
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACT III: CONTROL THE QUIET (35% - 58%) */}
        <AnimatePresence>
          {currentAct === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-y-0 right-0 p-6 sm:p-12 lg:p-16 flex flex-col justify-center max-w-xl z-20 pointer-events-none"
              id="noise-cancelling"
            >
              <div className="bg-[#050505]/60 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/[0.06]">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5A1F] font-bold">
                    HYBRID ADAPTIVE ANC
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                  Less noise. More you.
                </h2>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  Hybrid Adaptive ANC helps reduce distractions, adjusting noise control to your surroundings so you can stay immersed in what matters.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    "Hybrid Adaptive Active Noise Cancellation.",
                    "Transparency Mode when you want to reconnect with your surroundings.",
                    "Environmental noise reduction for a more focused listening experience.",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs text-white/80">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#A9D4C9] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-white/[0.03] rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-white/40">NOISE REDUCTION DEPTH</span>
                  <span className="text-[#A9D4C9] font-bold">UP TO 45 dB</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACT IV: SOUND WITH SUBSTANCE (58% - 80%) */}
        <AnimatePresence>
          {currentAct === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 p-6 sm:p-12 lg:p-16 flex flex-col justify-center max-w-xl z-20 pointer-events-none"
              id="sound"
            >
              <div className="bg-[#050505]/60 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/[0.06]">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF5A1F] font-bold mb-2">
                  ACT IV / ACOUSTIC ENGINEERING
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
                  Feel every frequency.
                </h2>
                <p className="text-sm text-white/70 leading-relaxed mb-5">
                  Custom 40 mm drivers, nickel-plated diaphragms, and a large copper voice coil bring power, clarity, and texture to your listening experience.
                </p>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {[
                    "40 MM CUSTOM DRIVERS",
                    "HI-RES AUDIO + LDAC",
                    "PERSONAL SOUND",
                    "SPATIAL AUDIO",
                  ].map((badge, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-center"
                    >
                      <span className="font-mono text-[10px] text-white/90 font-medium tracking-wide">
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {[
                    "40 mm custom dynamic drivers.",
                    "LDAC and Hi-Res Audio support.",
                    "Personal Sound profiling for an experience tailored to how you hear.",
                    "Spatial Audio with Cinema and Concert listening modes.",
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-white/70">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#FF5A1F] flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACT V: MADE TO MOVE WITH YOU (80% - 90%) */}
        <AnimatePresence>
          {currentAct === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-y-0 right-0 p-6 sm:p-12 lg:p-16 flex flex-col justify-center max-w-xl z-20 pointer-events-none"
            >
              <div className="bg-[#050505]/60 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/[0.06]">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF5A1F] font-bold mb-2">
                  ACT V / TACTILE MASTERY
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
                  Your music. Your controls.
                </h2>
                <p className="text-sm text-white/80 font-medium mb-4">
                  Roll for volume. Slide to tune your sound. Press to take control.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    {
                      title: "Multifunction roller",
                      desc: "For everyday playback and noise-control operations.",
                    },
                    {
                      title: "Energy Slider",
                      desc: "For bass and treble adjustments in real time.",
                    },
                    {
                      title: "Customisable action button",
                      desc: "For supported shortcuts and quick toggles.",
                    },
                  ].map((ctrl, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]"
                    >
                      <div className="text-xs font-semibold text-white mb-0.5">{ctrl.title}</div>
                      <div className="text-[11px] text-white/60">{ctrl.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="pointer-events-auto">
                  <a
                    href="#controls"
                    className="inline-flex items-center gap-2 text-xs font-mono text-[#FF5A1F] hover:text-[#ff7847] border-b border-[#FF5A1F]/40 pb-0.5"
                  >
                    <span>Test interactive controls simulator ↓</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACT VI: BACK TO YOUR WORLD (90% - 100%) */}
        <AnimatePresence>
          {currentAct === 6 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-12 z-20 pointer-events-none"
            >
              <div className="max-w-2xl bg-[#050505]/70 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/[0.08] pointer-events-auto shadow-2xl">
                <div className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-[#FF5A1F] font-bold mb-3">
                  COMPLETE REASSEMBLY
                </div>
                <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-3">
                  Your world. Your sound.
                </h2>
                <p className="text-base sm:text-xl font-light text-white/80 mb-6">
                  CMF Headphone Pro. Expressive by design. Made for every day.
                </p>
                <p className="text-xs sm:text-sm text-white/50 max-w-md mx-auto mb-8">
                  Powerful sound. Personal control. A design that stands apart.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="#preorder"
                    className="w-full sm:w-auto bg-[#FF5A1F] hover:bg-[#e04e17] text-white text-xs font-semibold px-8 py-3.5 rounded-full transition-all shadow-[0_4px_30px_rgba(255,90,31,0.5)]"
                  >
                    Explore Headphone Pro
                  </a>
                  <a
                    href="#specs"
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white text-xs font-medium px-6 py-3.5 rounded-full border border-white/10 transition-colors"
                  >
                    View full specifications
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM HUD / SCROLL SCRUBBER & ACT INDICATOR */}
        <div className="absolute bottom-6 inset-x-0 z-30 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
          {/* Act indicator pills */}
          <div className="pointer-events-auto hidden md:flex items-center gap-1.5 bg-[#0A0A0C]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
            {[1, 2, 3, 4, 5, 6].map((act) => (
              <button
                key={act}
                onClick={() => jumpToAct(act)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                  currentAct === act
                    ? "bg-[#FF5A1F] text-white font-bold shadow-[0_0_10px_rgba(255,90,31,0.6)]"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                ACT 0{act}
              </button>
            ))}
          </div>

          {/* Interactive Scrub Slider */}
          <div className="pointer-events-auto flex items-center gap-3 bg-[#0A0A0C]/85 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full w-full max-w-xs sm:max-w-md ml-auto">
            <span className="font-mono text-[10px] text-white/50 tracking-wider">SCRUB</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.002"
              value={scrollProgress}
              onChange={handleScrub}
              onMouseUp={handleScrubEnd}
              onTouchEnd={handleScrubEnd}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-ew-resize accent-[#FF5A1F]"
              aria-label="Scrub product frame sequence"
            />
            <span className="font-mono text-[11px] text-[#FF5A1F] font-bold w-14 text-right">
              {String(currentFrame + 1).padStart(3, "0")} / 120
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
