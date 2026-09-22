import React, { useState, useEffect } from 'react';

export default function Landing({ onDiscover }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4">
      <div 
        className={`flex flex-col items-center transition-all duration-[1500ms] ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {/* TITLE BLOCK */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] tracking-[0.35em] text-white/40 mb-6 uppercase font-mono">
            DEEP SPACE OBSERVATORY
          </span>
          <h1 
            className="text-6xl sm:text-7xl lg:text-8xl font-extralight tracking-tight text-white"
            style={{ 
              textShadow: '0 0 40px rgba(255,140,50,0.15), 0 0 80px rgba(40,100,255,0.1), 0 0 120px rgba(255,255,255,0.05)'
            }}
          >
            Darkmatter
          </h1>
          <p className="text-sm text-white/30 font-light tracking-wide mt-4">
            Where ideas defy gravity
          </p>
        </div>

        {/* DISCOVER BUTTON */}
        <button
          onClick={onDiscover}
          className="mt-12 px-8 py-3 rounded-full border border-white/20 text-white/70 text-sm tracking-widest uppercase font-light transition-all duration-500 hover:border-white/40 hover:text-white hover:bg-white/5 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] flex items-center gap-3 group"
        >
          Discover
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="transition-transform duration-500 group-hover:translate-y-0.5"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 flex justify-center w-full">
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
