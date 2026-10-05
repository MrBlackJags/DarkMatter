import React, { useState, useEffect } from 'react';

/**
 * Landing Page
 * Minimalist, futuristic, and weightless.
 * Contains ONLY the title "Darkmatter" centered in sleek typography with subtle glow,
 * and a single "Discover" button that transitions into the catalog and observatory suite.
 */
export default function Landing({ onDiscover }) {
  const [isVisible, setIsVisible] = useState(true);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);

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

  // Detect scroll/wheel activity to make the title & button slightly transparent while looking around
  useEffect(() => {
    let scrollTimer = null;

    const handleScrollActivity = () => {
      setIsScrolling(true);
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 550);
    };

    window.addEventListener('wheel', handleScrollActivity, { passive: true });
    window.addEventListener('scroll', handleScrollActivity, { passive: true });
    window.addEventListener('touchmove', handleScrollActivity, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleScrollActivity);
      window.removeEventListener('scroll', handleScrollActivity);
      window.removeEventListener('touchmove', handleScrollActivity);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-6 select-none overflow-hidden pointer-events-none">
      <div
        className={`flex flex-col items-center transition-all duration-[600ms] cubic-bezier(0.16, 1, 0.3, 1) ${
          isVisible ? (isScrolling ? 'opacity-30 scale-[0.99]' : 'opacity-100 scale-100') : 'opacity-0 scale-95'
        }`}
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
          willChange: 'transform, opacity'
        }}
      >
        {/* TITLE: "Darkmatter" centered in sleek typography with subtle starlight radiance */}
        <h1
          className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-[-0.04em] text-white relative transition-all duration-700 ease-out"
          style={{
            textShadow: `
              0 0 20px rgba(255, 255, 255, 0.35),
              0 0 45px rgba(255, 255, 255, 0.15),
              0 0 80px rgba(255, 255, 255, 0.05)
            `
          }}
        >
          Darkmatter
        </h1>

        {/* Sleek Subtitle */}
        <p className="mt-3 text-xs sm:text-sm font-light tracking-[0.3em] uppercase text-white/40 text-center max-w-lg transition-opacity duration-500">
          Deep Sky Observatory &amp; Astrodynamics Research Engine
        </p>

        {/* PRIMARY "Discover" BUTTON */}
        <button
          onClick={onDiscover}
          className="mt-10 sm:mt-12 group relative inline-flex items-center gap-3 px-9 py-3.5 rounded-full border border-white/20 bg-white/[0.02] text-white/80 text-xs sm:text-sm font-light tracking-[0.25em] uppercase backdrop-blur-md transition-all duration-500 hover:text-white hover:border-white/50 hover:bg-white/[0.08] hover:shadow-[0_0_35px_rgba(255,255,255,0.15),0_0_15px_rgba(255,140,50,0.1)] active:scale-95 focus:outline-none cursor-pointer pointer-events-auto"
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
      </div>
    </main>
  );
}
