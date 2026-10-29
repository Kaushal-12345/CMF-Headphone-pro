"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";

const TOTAL_FRAMES = 120;
const FRAME_PATH = (index: number) =>
  `/images/cmf-headphone-pro/frame-${String(index + 1).padStart(3, "0")}.webp`;

export default function ScrollytellingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [initialReady, setInitialReady] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Smooth lerp ref for 60fps rendering
  const renderStateRef = useRef({
    currentFrame: 0,
    targetFrame: 0,
    animating: false,
  });

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
          if (imagesRef.current[0]) {
            imagesRef.current[index] = imagesRef.current[0];
          }
          resolve(img);
        };
      });
    };

    const loadPriority = async () => {
      const priorityPromises: Promise<any>[] = [];
      for (let i = 0; i < Math.min(15, TOTAL_FRAMES); i++) {
        priorityPromises.push(loadImage(i));
      }
      await Promise.all(priorityPromises);

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

  // Draw frame with responsive mobile/desktop scaling & seamless background
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

    // Subtle atmospheric studio spotlight
    const radGlow = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      width * 0.05,
      width * 0.5,
      height * 0.5,
      width * 0.65
    );
    radGlow.addColorStop(0, "rgba(25, 27, 32, 0.4)");
    radGlow.addColorStop(0.6, "rgba(10, 11, 14, 0.15)");
    radGlow.addColorStop(1, "rgba(5, 5, 5, 0)");
    ctx.fillStyle = radGlow;
    ctx.fillRect(0, 0, width, height);

    const imgRatio = 1920 / 1080;
    const canvasRatio = width / height;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    if (canvasRatio > imgRatio) {
      // Wide desktop screens
      drawH = height * 0.95;
      drawW = drawH * imgRatio;
      drawX = (width - drawW) / 2;
      drawY = (height - drawH) / 2;
    } else {
      // Mobile / Portrait screens: scale up product so it has majestic presence
      // and isn't a tiny shrunken strip
      const scaleMultiplier = width < 640 ? 1.45 : 1.15;
      drawW = width * scaleMultiplier;
      drawH = drawW / imgRatio;
      drawX = (width - drawW) / 2;
      drawY = (height - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Feather edges seamlessly into #050505
    const edgeVignette = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      Math.min(width, height) * 0.38,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * 0.72
    );
    edgeVignette.addColorStop(0, "rgba(5, 5, 5, 0)");
    edgeVignette.addColorStop(1, "rgba(5, 5, 5, 0.98)");
    ctx.fillStyle = edgeVignette;
    ctx.fillRect(0, 0, width, height);
  }, []);

  // DPR resize handler
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

  // RequestAnimationFrame loop
  const startAnimationLoop = useCallback(() => {
    if (renderStateRef.current.animating) return;
    renderStateRef.current.animating = true;

    const tick = () => {
      const state = renderStateRef.current;
      const diff = state.targetFrame - state.currentFrame;

      if (Math.abs(diff) > 0.05) {
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

  // Scroll handler mapped to pinned section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(progress);

      const targetIdx = Math.round(progress * (TOTAL_FRAMES - 1));
      renderStateRef.current.targetFrame = targetIdx;
      startAnimationLoop();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startAnimationLoop]);

  // Active Act
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

  const jumpToAct = (act: number) => {
    if (!containerRef.current) return;
    const progressMap = [0, 0.04, 0.25, 0.46, 0.7, 0.85, 0.98];
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
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        />

        {/* Minimal Initial Loader */}
        {!initialReady && (
          <div className="absolute inset-0 z-30 bg-[#050505] flex flex-col items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-ping" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">
              CMF HEADPHONE PRO
            </span>
          </div>
        )}

        {/* =============================================================== */}
        {/* EDITORIAL NARRATIVE OVERLAYS (No Boxy Cards - Pure Restraint)   */}
        {/* =============================================================== */}

        {/* ACT I: HERO (0% - 15%) */}
        <AnimatePresence>
          {currentAct === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-12 lg:p-20 z-20"
            >
              <div className="pt-20 sm:pt-24 max-w-xl">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#FF5A1F] block mb-2 sm:mb-3">
                  CMF BY NOTHING PRESENTS
                </span>
                <h1 className="text-3xl sm:text-6xl font-bold tracking-tight text-white mb-2">
                  CMF Headphone Pro
                </h1>
                <p className="text-lg sm:text-2xl font-light text-[#A9D4C9] mb-3">
                  Sound, remixed.
                </p>
                <p className="text-xs sm:text-sm text-white/60 font-light max-w-sm leading-relaxed">
                  Expressive design. Powerful sound. Control that feels natural.
                </p>
              </div>

              {/* Bottom Cue */}
              <div className="pointer-events-auto flex items-center justify-between pb-6 sm:pb-8">
                <div className="flex items-center gap-3">
                  <a
                    href="#preorder"
                    className="bg-[#FF5A1F] hover:bg-[#e04e17] text-white text-xs font-medium px-5 py-2.5 rounded-full transition-all"
                  >
                    Explore Headphone Pro
                  </a>
                  <button
                    onClick={() => jumpToAct(2)}
                    className="text-xs text-white/50 hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    Discover details ↓
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/40 uppercase">
                  <span>Scroll to explore</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#FF5A1F] animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACT II: DESIGN, REIMAGINED (15% - 35%) */}
        <AnimatePresence>
          {currentAct === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 pointer-events-none flex flex-col justify-between sm:justify-center p-6 sm:p-12 lg:p-20 z-20"
              id="design"
            >
              <div className="pt-20 sm:pt-0 max-w-md">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF5A1F] block mb-2 font-medium">
                  02 / ARCHITECTURE
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                  Designed to be different.
                </h2>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-light mb-4">
                  Every curve, surface, and connection has a purpose. Made for everyday listening.
                </p>
                <div className="space-y-1.5 text-xs text-white/70 font-light">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#FF5A1F]" />
                    <span>Distinctive, comfortable over-ear silhouette.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#FF5A1F]" />
                    <span>Interchangeable twist-off ear cushions.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#FF5A1F]" />
                    <span>Adjustable stainless steel sliders.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACT III: CONTROL THE QUIET (35% - 58%) */}
        <AnimatePresence>
          {currentAct === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 pointer-events-none flex flex-col justify-between sm:justify-center sm:items-end p-6 sm:p-12 lg:p-20 z-20"
              id="noise-cancelling"
            >
              <div className="pt-20 sm:pt-0 max-w-md sm:text-right">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A9D4C9] block mb-2 font-medium">
                  03 / HYBRID ADAPTIVE ANC
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                  Less noise. More you.
                </h2>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-light mb-4">
                  Hybrid Adaptive ANC continuously measures ambient sounds, adjusting noise control so you stay immersed.
                </p>
                <div className="space-y-1.5 text-xs text-white/70 font-light sm:flex sm:flex-col sm:items-end">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#A9D4C9]" />
                    <span>Up to 45 dB noise attenuation.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#A9D4C9]" />
                    <span>Transparency Mode for instant awareness.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACT IV: SOUND WITH SUBSTANCE (58% - 80%) */}
        <AnimatePresence>
          {currentAct === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 pointer-events-none flex flex-col justify-between sm:justify-center p-6 sm:p-12 lg:p-20 z-20"
              id="sound"
            >
              <div className="pt-20 sm:pt-0 max-w-md">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF5A1F] block mb-2 font-medium">
                  04 / ACOUSTIC DRIVER
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                  Feel every frequency.
                </h2>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-light mb-4">
                  Custom 40 mm dynamic drivers with nickel-plated diaphragms and an oversized copper voice coil.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px] text-white/70">
                  <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
                    40MM DRIVERS
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
                    LDAC & HI-RES
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
                    SPATIAL AUDIO
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACT V: MADE TO MOVE WITH YOU (80% - 90%) */}
        <AnimatePresence>
          {currentAct === 5 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 pointer-events-none flex flex-col justify-between sm:justify-center sm:items-end p-6 sm:p-12 lg:p-20 z-20"
            >
              <div className="pt-20 sm:pt-0 max-w-md sm:text-right">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#FF5A1F] block mb-2 font-medium">
                  05 / TACTILE CONTROLS
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                  Your music. Your controls.
                </h2>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-light mb-4">
                  Roll for volume. Slide to tune bass and treble. Press to take control.
                </p>
                <div className="pointer-events-auto">
                  <a
                    href="#controls"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF5A1F] hover:text-[#ff7847]"
                  >
                    <span>Test controls below ↓</span>
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
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-20 pointer-events-none"
            >
              <div className="max-w-lg pointer-events-auto">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF5A1F] block mb-2 font-medium">
                  CMF HEADPHONE PRO
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
                  Your world. Your sound.
                </h2>
                <p className="text-xs sm:text-sm text-white/60 mb-6 font-light max-w-sm mx-auto">
                  Expressive by design. Made for every day.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <a
                    href="#preorder"
                    className="bg-[#FF5A1F] hover:bg-[#e04e17] text-white text-xs font-medium px-6 py-3 rounded-full transition-all shadow-[0_2px_20px_rgba(255,90,31,0.3)]"
                  >
                    Explore Headphone Pro
                  </a>
                  <a
                    href="#specs"
                    className="text-xs text-white/50 hover:text-white px-4 py-3 font-mono transition-colors"
                  >
                    Specs ↓
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MINIMAL BOTTOM HUD (Subtle, uncluttered progress indicator) */}
        <div className="absolute bottom-5 inset-x-0 z-30 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
          {/* Act indicator */}
          <div className="pointer-events-auto flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/40">
              ACT 0{currentAct} <span className="text-white/20">/</span> 06
            </span>
          </div>

          {/* Minimal hairline progress scrubber */}
          <div className="pointer-events-auto flex items-center gap-3 w-40 sm:w-56">
            <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF5A1F] transition-all duration-75"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-white/40 w-8 text-right">
              {String(currentFrame + 1).padStart(3, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
