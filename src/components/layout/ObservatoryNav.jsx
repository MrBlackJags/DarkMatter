import React, { useState, useEffect } from 'react';

export default function ObservatoryNav({ activeView, onNavigate, totalObjects = 88 }) {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'explore', label: 'Stellar Discoveries', badge: '2.4M+' },
    { id: 'calculators', label: 'Space Calculators', badge: '14+' },
    { id: 'simulation', label: 'Gravity & Collisions', badge: 'N-BODY' },
    { id: 'pipeline', label: 'Telemetry Pipeline', badge: 'LIVE' }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* BRAND BUTTON */}
        <button
          onClick={() => onNavigate('landing')}
          className="group flex items-center gap-2.5 text-white/70 hover:text-white transition-all focus:outline-none cursor-pointer"
          aria-label="Return to Darkmatter home"
        >
          <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center bg-white/[0.03] group-hover:border-white/50 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-all">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-sm font-extralight tracking-wider text-white">Darkmatter</span>
        </button>

        {/* NAVIGATION PILLS */}
        <nav className="flex items-center gap-1 sm:gap-2 p-1 rounded-full border border-white/[0.06] bg-white/[0.02]">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 sm:px-4 py-1 rounded-full text-xs font-light tracking-wide transition-all duration-300 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/[0.1] border border-white/25 shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                    : 'text-white/45 hover:text-white/80 border border-transparent hover:bg-white/[0.03]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT TELEMETRY STATUS */}
        <div className="hidden md:flex items-center gap-3 text-[11px] font-mono text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400/90 font-light">ONLINE</span>
          </div>
          <span>•</span>
          <span className="text-white/50">{utcTime}</span>
        </div>

      </div>
    </header>
  );
}
