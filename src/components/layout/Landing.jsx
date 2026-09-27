import React, { useState, useEffect } from 'react';

/**
 * Landing Page
 * Minimalist, futuristic, and weightless.
 * Contains ONLY the title "Darkmatter" centered in sleek typography with subtle glow,
 * and a single "Discover" button that transitions into the catalog and observatory suite.
 */
export default function Landing({ onDiscover, onNavigate }) {
  const [isVisible, setIsVisible] = useState(true);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Weightless mouse parallax inertia
  useEffect(() => {
    let frameId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 18;
      targetY = (e.clientY / innerHeight - 0.5) * 18;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMouseOffset({ x: currentX, y: currentY });
      frameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-6 select-none overflow-hidden">
      <div
        className={`flex flex-col items-center transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          willChange: 'transform'
        }}
      >
        {/* Subtle breathing aura behind title */}
        <div
          className="absolute -inset-16 pointer-events-none rounded-full blur-[100px] opacity-40 transition-opacity duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,50,0.12) 0%, rgba(60,120,255,0.1) 45%, rgba(255,255,255,0.04) 75%, transparent 100%)'
          }}
        />

        {/* TITLE: "Darkmatter" centered in sleek typography with subtle glow */}
        <h1
          className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-[-0.04em] text-white relative transition-all duration-700 ease-out"
          style={{
            textShadow: `
              0 0 25px rgba(255, 255, 255, 0.25),
              0 0 50px rgba(255, 140, 50, 0.18),
              0 0 90px rgba(60, 130, 255, 0.16)
            `
          }}
        >
          Darkmatter
        </h1>

        {/* Sleek Subtitle */}
        <p className="mt-3 text-xs sm:text-sm font-light tracking-[0.3em] uppercase text-white/40 text-center max-w-lg">
          Deep Sky Observatory &amp; Astrodynamics Research Engine
        </p>

        {/* PRIMARY "Discover" BUTTON */}
        <button
          onClick={onDiscover}
          className="mt-10 sm:mt-12 group relative inline-flex items-center gap-3 px-9 py-3.5 rounded-full border border-white/20 bg-white/[0.02] text-white/80 text-xs sm:text-sm font-light tracking-[0.25em] uppercase backdrop-blur-md transition-all duration-500 hover:text-white hover:border-white/50 hover:bg-white/[0.08] hover:shadow-[0_0_35px_rgba(255,255,255,0.15),0_0_15px_rgba(255,140,50,0.1)] active:scale-95 focus:outline-none cursor-pointer"
          aria-label="Discover space catalog"
        >
          <span>Discover Archive</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 ease-out group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>

        {/* QUICK JUMP INSTRUMENT SHORTCUTS */}
        {onNavigate && (
          <div className="mt-12 sm:mt-14 flex items-center justify-center gap-2 sm:gap-3 flex-wrap max-w-2xl px-4">
            <button
              onClick={() => onNavigate('simulation')}
              className="px-3.5 py-1.5 rounded-full border border-white/[0.08] hover:border-amber-400/40 bg-white/[0.015] hover:bg-amber-400/10 text-white/50 hover:text-amber-300 text-[11px] font-mono tracking-wider transition-all cursor-pointer backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              🪐 N-Body Gravity Simulator
            </button>
            <button
              onClick={() => onNavigate('calculators')}
              className="px-3.5 py-1.5 rounded-full border border-white/[0.08] hover:border-violet-400/40 bg-white/[0.015] hover:bg-violet-400/10 text-white/50 hover:text-violet-300 text-[11px] font-mono tracking-wider transition-all cursor-pointer backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              🧮 Space Calculators Suite
            </button>
            <button
              onClick={() => onNavigate('pipeline')}
              className="px-3.5 py-1.5 rounded-full border border-white/[0.08] hover:border-emerald-400/40 bg-white/[0.015] hover:bg-emerald-400/10 text-white/50 hover:text-emerald-300 text-[11px] font-mono tracking-wider transition-all cursor-pointer backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              📡 Telemetry Ingestion Node
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
