import React, { useState, useEffect } from 'react';
import { Orbit, Sparkles, Compass, Database, ArrowRight } from 'lucide-react';

/**
 * Landing Page
 * Minimalist, futuristic, and weightless.
 * Displays the Darkmatter observatory portal with real-time all-sky telemetry status,
 * access to 2.45M+ stellar discoveries, and the updated relativistic gravity simulator.
 */
export default function Landing({ onDiscover, onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Weightless mouse parallax inertia
  useEffect(() => {
    let frameId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 16;
      targetY = (e.clientY / innerHeight - 0.5) * 16;
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
        {/* Top All-Sky Telemetry Pill */}
        <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.03] backdrop-blur-md text-[11px] font-mono text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="tracking-widest uppercase">2,450,000+ STELLAR DISCOVERIES INDEXED · ALL-SKY GAIA DR3 ARCHIVE</span>
        </div>

        {/* Subtle breathing aura behind title */}
        <div
          className="absolute -inset-16 pointer-events-none rounded-full blur-[100px] opacity-40 transition-opacity duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,50,0.14) 0%, rgba(60,120,255,0.12) 45%, rgba(255,255,255,0.05) 75%, transparent 100%)'
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

        <p className="mt-4 text-sm sm:text-base font-light text-white/50 tracking-wide text-center max-w-lg">
          Astrophysical deep space telemetry, all-sky stellar exploration, and relativistic N-body gravity laboratory.
        </p>

        {/* PRIMARY "Discover" BUTTON */}
        <div className="mt-10 sm:mt-12 flex items-center gap-4 flex-wrap justify-center">
          <button
            onClick={onDiscover}
            className="group relative inline-flex items-center gap-3 px-9 py-3.5 rounded-full border border-cyan-400/40 bg-cyan-500/10 text-cyan-200 text-xs sm:text-sm font-light tracking-[0.25em] uppercase backdrop-blur-md transition-all duration-500 hover:text-white hover:border-cyan-300 hover:bg-cyan-500/25 hover:shadow-[0_0_35px_rgba(6,182,212,0.3),0_0_15px_rgba(255,140,50,0.15)] active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Discover stellar discoveries"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>Explore 2.4M+ Discoveries</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 ease-out group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => onNavigate && onNavigate('simulation')}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/20 bg-white/[0.03] text-white/80 text-xs sm:text-sm font-light tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-500 hover:text-white hover:border-white/50 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Launch gravity simulator"
          >
            <Orbit className="w-4 h-4 text-amber-400" />
            <span>Gravity Lab</span>
          </button>
        </div>

        {/* SUITE NAVIGATION PILLS */}
        <div className="mt-10 flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
          <button
            onClick={() => onNavigate && onNavigate('calculators')}
            className="px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/30 text-white/50 hover:text-white text-xs font-mono tracking-wider transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            Space Calculators (14+)
          </button>
          <button
            onClick={() => onNavigate && onNavigate('simulation')}
            className="px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/30 text-white/50 hover:text-white text-xs font-mono tracking-wider transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            N-Body Gravitation &amp; Wells
          </button>
          <button
            onClick={() => onNavigate && onNavigate('pipeline')}
            className="px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/30 text-white/50 hover:text-white text-xs font-mono tracking-wider transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            Telemetry Ingestion Engine
          </button>
        </div>

        {/* LIVE STATS STRIP */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 border-t border-white/[0.06] pt-6 font-mono text-center">
          <div>
            <div className="text-xl sm:text-2xl font-light text-white tracking-tight">2,450,812</div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Stellar Discoveries</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-light text-cyan-300 tracking-tight">1.81 Billion</div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Gaia DR3 Sources</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-light text-amber-300 tracking-tight">10 Classes</div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">H-R Sequence (O–M)</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-light text-emerald-300 tracking-tight">N-Body RK4</div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Relativistic Gravity</div>
          </div>
        </div>

      </div>
    </main>
  );
}
