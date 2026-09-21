import React, { useState, useEffect } from 'react';
import { Search, Compass, SlidersHorizontal, Scale, PlusCircle, Radio } from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  compareList, 
  setIsCompareOpen, 
  setIsLogModalOpen,
  activeView,
  setActiveView
}) {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-cosmic-950/90 backdrop-blur-md border-b border-cyan-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Observatory Callout */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cosmic-900 border border-cyan-500/40 shadow-inner group cursor-pointer" onClick={() => setActiveView('catalog')}>
            <div className="absolute inset-0 rounded-lg bg-cyan-500/10 animate-pulse"></div>
            <Compass className="w-5 h-5 text-hud-cyan group-hover:rotate-90 transition-transform duration-500" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-hud-emerald animate-ping"></span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-widest text-base font-mono text-slate-100">
                DARK<span className="text-hud-cyan">MATTER</span>
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-hud-cyan border border-cyan-800 tracking-tighter">
                OBSERVATORY HUD
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
              <span className="flex items-center space-x-1 text-hud-emerald">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                <span>ALL-SKY DISCOVERY ARCHIVE</span>
              </span>
              <span>•</span>
              <span className="text-slate-300">{utcTime}</span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="hidden md:flex items-center space-x-1 bg-cosmic-900/90 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          <button 
            onClick={() => setActiveView('catalog')}
            className={`px-3 py-1.5 rounded-md transition ${activeView === 'catalog' ? 'bg-cyan-500/20 text-hud-cyan border border-cyan-500/40 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Discovery Catalog
          </button>
          <button 
            onClick={() => setActiveView('radar')}
            className={`px-3 py-1.5 rounded-md transition ${activeView === 'radar' ? 'bg-cyan-500/20 text-hud-cyan border border-cyan-500/40 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Celestial Radar (RA/Dec)
          </button>
          <button 
            onClick={() => setActiveView('timeline')}
            className={`px-3 py-1.5 rounded-md transition ${activeView === 'timeline' ? 'bg-cyan-500/20 text-hud-cyan border border-cyan-500/40 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Discovery Timeline
          </button>
        </div>

        {/* Search Bar & Actions */}
        <div className="flex items-center space-x-3">
          <div className="relative w-44 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search target, mission, RA/Dec..."
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono rounded-lg bg-cosmic-900/90 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-hud-cyan focus:ring-1 focus:ring-hud-cyan transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-2 text-[10px] font-mono text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>

          {/* Compare Drawer Toggle */}
          <button 
            onClick={() => setIsCompareOpen(true)}
            className="relative p-2 rounded-lg bg-cosmic-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-hud-cyan transition"
            title="Compare Discovered Objects"
          >
            <Scale className="w-4 h-4" />
            {compareList.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-hud-cyan text-cosmic-950 font-mono font-bold text-[9px] flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Submit Observation CTA */}
          <button 
            onClick={() => setIsLogModalOpen(true)}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-cosmic-950 font-bold text-xs font-mono shadow-lg shadow-cyan-500/20 transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Log Discovery</span>
          </button>
        </div>

      </div>
    </header>
  );
}
