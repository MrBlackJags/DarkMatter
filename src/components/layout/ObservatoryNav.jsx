import React, { useState, useEffect } from 'react';
import { Orbit, Telescope, Calculator, Rocket, Home, BookOpen, Scale } from 'lucide-react';
import { fetchSystemHealth } from '../../services/api';

export default function ObservatoryNav({ 
  activeView, 
  onNavigate, 
  totalObjects = 88,
  compareCount = 0,
  onOpenCompare,
  onOpenDictionary
}) {
  const [utcTime, setUtcTime] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [serverStatus, setServerStatus] = useState('ONLINE');

  useEffect(() => {
    let mounted = true;
    const checkHealth = async () => {
      try {
        const res = await fetchSystemHealth();
        if (mounted) {
          setServerStatus(res.status === 'ONLINE' ? 'ONLINE' : 'STANDALONE');
        }
      } catch (e) {
        if (mounted) setServerStatus('STANDALONE');
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 20000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'explore', label: 'Stellar Discoveries', badge: '2.4M+', icon: Telescope, accentColor: 'cyan' },
    { id: 'calculators', label: 'Space Calculators', badge: '14+', icon: Calculator, accentColor: 'violet' },
    { id: 'simulation', label: 'Gravity & Collisions', badge: 'N-BODY', icon: Orbit, accentColor: 'amber' }
  ];

  const accentStyles = {
    cyan: {
      active: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(0,200,255,0.12)]',
      badge: 'bg-cyan-500/20 text-cyan-300'
    },
    violet: {
      active: 'text-violet-300 bg-violet-500/10 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.12)]',
      badge: 'bg-violet-500/20 text-violet-300'
    },
    amber: {
      active: 'text-amber-300 bg-amber-500/10 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.12)]',
      badge: 'bg-amber-500/20 text-amber-300'
    },
    emerald: {
      active: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.12)]',
      badge: 'bg-emerald-500/20 text-emerald-300'
    }
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
      scrolled 
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
        : 'bg-black/40 backdrop-blur-md border-b border-white/[0.04]'
    }`}>
      {/* Subtle scanline effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hud-scanline" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between relative">
        
        {/* BRAND BUTTON */}
        <button
          onClick={() => onNavigate('landing')}
          className="group flex items-center gap-2.5 text-white/70 hover:text-white transition-all focus:outline-none cursor-pointer"
          aria-label="Return to Darkmatter home"
        >
          <div className="relative w-7 h-7 rounded-full border border-white/20 flex items-center justify-center bg-white/[0.03] group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(0,200,255,0.2)] transition-all duration-500">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 group-hover:scale-150 transition-transform duration-300" />
            {/* Orbital ring around brand icon */}
            <div className="absolute inset-[-3px] rounded-full border border-white/[0.08] group-hover:border-cyan-400/20 animate-orbit-spin" style={{ animationDuration: '12s' }} />
          </div>
          <span className="text-sm font-extralight tracking-wider text-white group-hover:text-glow-cosmic transition-all duration-300">Darkmatter</span>
        </button>

        {/* NAVIGATION PILLS */}
        <nav className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            const Icon = item.icon;
            const styles = accentStyles[item.accentColor];
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-light tracking-wide transition-all duration-300 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                  isActive
                    ? `${styles.active} border font-medium`
                    : 'text-white/40 hover:text-white/80 border border-transparent hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? styles.badge : 'bg-white/5 text-white/25'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT TELEMETRY & RESEARCH TOOLS */}
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] font-mono text-white/40">
          
          {/* Quick Glossary Button */}
          {onOpenDictionary && (
            <button
              onClick={onOpenDictionary}
              className="p-1.5 rounded-lg border border-white/10 hover:border-cyan-400/40 bg-white/[0.02] hover:bg-white/[0.06] text-white/60 hover:text-cyan-300 transition-all cursor-pointer flex items-center gap-1.5"
              title="Open Astrophysical Terminology Glossary"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[10px]">Glossary</span>
            </button>
          )}

          {/* Quick Compare Button */}
          {onOpenCompare && (
            <button
              onClick={onOpenCompare}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                compareCount > 0
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                  : 'border-white/10 hover:border-white/20 bg-white/[0.02] text-white/50 hover:text-white'
              }`}
              title="Open Comparative Analysis Queue"
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[10px]">Compare</span>
              {compareCount > 0 && (
                <span className="px-1.5 py-0.2 bg-cyan-400 text-black font-bold rounded-full text-[9px]">
                  {compareCount}
                </span>
              )}
            </button>
          )}

          {/* Server Connection Status */}
          <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${
                serverStatus === 'ONLINE' ? 'bg-emerald-400' : 'bg-amber-400'
              }`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                serverStatus === 'ONLINE' ? 'bg-emerald-400' : 'bg-amber-400'
              }`} />
            </span>
            <span className={`font-light text-[10px] ${
              serverStatus === 'ONLINE' ? 'text-emerald-400/90' : 'text-amber-400/90'
            }`}>
              {serverStatus === 'ONLINE' ? 'NODE :3001' : 'STANDALONE'}
            </span>
          </div>

          <span className="text-white/15 hidden sm:inline">│</span>
          <span className="text-white/50 tabular-nums hidden sm:inline">{utcTime}</span>
        </div>

      </div>
    </header>
  );
}
