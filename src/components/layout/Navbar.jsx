import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Compass, 
  Scale, 
  PlusCircle, 
  Radio, 
  Calculator, 
  Orbit, 
  Server, 
  Database,
  Calendar,
  Layers,
  Menu,
  X,
  BookOpen,
  Globe
} from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  compareList, 
  setIsCompareOpen, 
  setIsLogModalOpen,
  setIsDictionaryOpen,
  activeView,
  setActiveView
}) {
  const [utcTime, setUtcTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Globe },
    { id: 'catalog', label: 'Discoveries', icon: Layers },
    { id: 'radar', label: 'Celestial Radar', icon: Compass },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'calculators', label: 'Space Calculators', icon: Calculator },
    { id: 'simulator', label: 'Gravity & Collision Sim', icon: Orbit }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-md border-b border-cyan-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Observatory Callout */}
        <div className="flex items-center space-x-3">
          <div 
            className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-black border border-cyan-500/40 shadow-inner group cursor-pointer" 
            onClick={() => setActiveView('home')}
          >
            <div className="absolute inset-0 rounded-lg bg-cyan-500/10 animate-pulse"></div>
            <Compass className="w-5 h-5 text-hud-cyan group-hover:rotate-90 transition-transform duration-500" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-hud-emerald animate-ping"></span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-widest text-base font-mono text-white">
                DARK<span className="text-hud-cyan">MATTER</span>
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-hud-cyan border border-cyan-800 tracking-tighter">
                SPACE HUD
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
              <span className="flex items-center space-x-1 text-hud-emerald">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                <span>ALL-SKY ENGINE</span>
              </span>
              <span>•</span>
              <span className="text-slate-300">{utcTime}</span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs (Desktop) */}
        <nav className="hidden xl:flex items-center space-x-1 bg-black/80 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`px-3 py-1.5 rounded-md transition flex items-center space-x-1.5 ${
                  isActive 
                    ? 'bg-cyan-500/20 text-hud-cyan border border-cyan-500/40 font-semibold shadow-sm shadow-cyan-500/20' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* View Switcher Dropdown (Medium screens) */}
        <div className="hidden md:flex xl:hidden items-center space-x-1 bg-black/80 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          {navItems.slice(0, 4).map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`px-2.5 py-1.5 rounded-md transition flex items-center space-x-1 ${
                  isActive 
                    ? 'bg-cyan-500/20 text-hud-cyan border border-cyan-500/40 font-semibold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="relative group">
            <button className="px-2.5 py-1.5 rounded-md text-slate-400 hover:text-white flex items-center space-x-1">
              <span>More ▾</span>
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-black border border-slate-800 rounded-lg shadow-xl p-1 hidden group-hover:block z-50">
              {navItems.slice(4).map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-cosmic-900 text-slate-300 hover:text-hud-cyan flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search Bar & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          
          {/* Quick Data Dictionary Trigger */}
          <button
            onClick={() => setIsDictionaryOpen(true)}
            className="px-2.5 py-1.5 rounded-lg bg-cosmic-950 border border-cyan-500/40 hover:border-hud-cyan text-hud-cyan text-xs font-mono transition flex items-center space-x-1.5 shadow-sm shadow-cyan-500/10"
            title="Open Astronomical Data Dictionary"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-semibold">Dictionary</span>
          </button>

          {/* Search Input */}
          <div className="relative w-32 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5 pointer-events-none" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono rounded-lg bg-black/90 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-hud-cyan focus:ring-1 focus:ring-hud-cyan transition"
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
            className="relative p-2 rounded-lg bg-black border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-hud-cyan transition"
            title="Compare Discovered Objects"
          >
            <Scale className="w-4 h-4" />
            {compareList.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-hud-cyan text-black font-mono font-bold text-[9px] flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Submit Observation CTA */}
          <button 
            onClick={() => setIsLogModalOpen(true)}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono shadow-lg shadow-cyan-500/20 transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Log Target</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-black border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-black p-4 space-y-2 font-mono text-xs">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full p-2.5 rounded-lg text-left flex items-center space-x-2.5 transition ${
                  isActive ? 'bg-cyan-500/20 text-hud-cyan font-bold border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex flex-col space-y-2">
            <button
              onClick={() => { setIsDictionaryOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-2 rounded-lg bg-cosmic-900 border border-cyan-500/40 text-hud-cyan font-bold flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Open Astronomical Dictionary</span>
            </button>
            <button
              onClick={() => { setIsLogModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-2 rounded-lg bg-cyan-500 text-black font-bold text-center"
            >
              + Log New Discovery
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
