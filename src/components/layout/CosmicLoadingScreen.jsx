import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Radio, Orbit } from 'lucide-react';

const TELEMETRY_STEPS = [
  { text: 'ESTABLISHING DEEP-SPACE TELEMETRY LINK', progress: 18, coord: 'RA: 03h 32m 38s • DEC: -27° 46′' },
  { text: 'SYNCHRONIZING KEPLER, TESS & GAIA ARCHIVES', progress: 42, coord: 'RA: 19h 54m 36s • DEC: +43° 57′' },
  { text: 'CALIBRATING SPECTRAL FLUX & SED MATRICES', progress: 68, coord: 'RA: 12h 30m 49s • DEC: +12° 23′' },
  { text: 'RESOLVING 2.4M+ STELLAR ASTROMETRY FEEDS', progress: 88, coord: 'RA: 23h 06m 29s • DEC: -05° 02′' },
  { text: 'ALL SYSTEMS NOMINAL • ALL-SKY MATRIX READY', progress: 100, coord: 'RA: 17h 45m 40s • DEC: -29° 00′' }
];

export default function CosmicLoadingScreen({ onComplete, minDuration = 1400 }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      setProgress(rawPct);

      if (rawPct < 25) setStepIndex(0);
      else if (rawPct < 50) setStepIndex(1);
      else if (rawPct < 75) setStepIndex(2);
      else if (rawPct < 95) setStepIndex(3);
      else setStepIndex(4);

      if (elapsed >= minDuration) {
        clearInterval(interval);
        setProgress(100);
        setStepIndex(4);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete && onComplete();
          }, 450);
        }, 250);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete && onComplete();
    }, 250);
  };

  const currentStep = TELEMETRY_STEPS[stepIndex] || TELEMETRY_STEPS[0];

  return (
    <div 
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 bg-black text-white cursor-pointer select-none overflow-hidden transition-all duration-500 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Starscape & Radial Cosmic Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-cosmic-breathe" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_80%)]" />
        <div className="hud-scanline" />
      </div>

      {/* TOP HEADER: Observatory Status Pill */}
      <div className="relative z-10 w-full flex items-center justify-between font-mono text-[11px] text-white/40">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="tracking-widest text-cyan-300/80">OBSERVATORY CALIBRATION</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-3 text-white/30 text-[10px]">
          <span>GRID: ALL-SKY 360°</span>
          <span>•</span>
          <span>BUFFER: ACTIVE</span>
        </div>

        <button 
          onClick={handleSkip}
          className="text-[10px] tracking-wider text-white/40 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 px-2.5 py-1 rounded-full transition-all bg-white/[0.02]"
        >
          SKIP ➔
        </button>
      </div>

      {/* CENTERPIECE: Gyroscopic Orbital Singularity Core */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
          
          {/* Outer Dashed Orbit Ring */}
          <div 
            className="absolute inset-0 rounded-full border border-dashed border-cyan-400/30 animate-orbit-spin"
            style={{ animationDuration: '14s' }}
          />

          {/* Secondary Counter-Rotating Ring */}
          <div 
            className="absolute inset-3 sm:inset-4 rounded-full border border-purple-400/25 animate-orbit-spin"
            style={{ animationDuration: '9s', animationDirection: 'reverse' }}
          >
            {/* Orbital Satellite Node */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.9)]" />
          </div>

          {/* Third Tilted Golden/Amber Ring */}
          <div 
            className="absolute inset-8 sm:inset-10 rounded-full border border-amber-400/30 animate-orbit-spin"
            style={{ animationDuration: '6s' }}
          >
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(255,180,0,0.8)]" />
          </div>

          {/* Glowing Luminous Event Horizon Singularity */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-[0_0_50px_rgba(0,200,255,0.4)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full animate-pulse" />
              <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-300 animate-spin" style={{ animationDuration: '24s' }} />
            </div>
          </div>

        </div>

        {/* Brand Callout */}
        <div className="mt-8 text-center">
          <h1 className="text-xl sm:text-2xl font-light tracking-[0.25em] text-white">
            DARK<span className="font-semibold text-cyan-400">MATTER</span>
          </h1>
          <p className="mt-1 text-[10px] sm:text-xs font-mono tracking-widest text-white/40 uppercase">
            Deep-Space Observatory & Astrometry Engine
          </p>
        </div>
      </div>

      {/* BOTTOM TELEMETRY BAR & PROGRESS */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col gap-3 font-mono">
        
        {/* Live Step Readout & Percentage */}
        <div className="flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-2 truncate pr-2">
            <Radio className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
            <span className="text-[11px] text-cyan-300 font-medium tracking-wider truncate">
              {currentStep.text}
            </span>
          </div>
          <span className="text-white text-xs font-bold tabular-nums shrink-0">
            {progress}%
          </span>
        </div>

        {/* Sleek Neon Gradient Progress Bar */}
        <div className="relative w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden border border-white/10">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_15px_rgba(0,200,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Coordinate & Subsystem Telemetry */}
        <div className="flex items-center justify-between text-[10px] text-white/30 pt-0.5">
          <span className="tabular-nums">{currentStep.coord}</span>
          <span className="hidden sm:inline">KEPLER • TESS • JWST • GAIA DR3</span>
          <span className="text-cyan-400/60">NODE: ONLINE</span>
        </div>
      </div>

    </div>
  );
}