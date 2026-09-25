import React, { useState, useEffect, useRef } from 'react';
import CelestialVisual from './CelestialVisual';

/**
 * AntigravityCard
 * Implements interactive 3D zero-G tilt, fluid levitation,
 * and directional cosmic glow on hover.
 */
function AntigravityCard({ object, index, onSelect }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Antigravity micro-tilt (subtle and elegant, max 8 deg)
    setTilt({ x: -y * 8, y: x * 8 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const getCategoryTheme = (cls) => {
    const c = (cls || '').toLowerCase();
    if (['blackhole'].includes(c)) {
      return {
        badge: 'text-blue-400/80 border-blue-500/20 bg-blue-500/5',
        dot: 'bg-blue-400',
        glow: 'rgba(59, 130, 246, 0.12)'
      };
    }
    if (['exoplanet', 'interstellar'].includes(c)) {
      return {
        badge: 'text-emerald-400/80 border-emerald-500/20 bg-emerald-500/5',
        dot: 'bg-emerald-400',
        glow: 'rgba(52, 211, 153, 0.12)'
      };
    }
    // Stars, pulsars, supernovae, galaxies
    return {
      badge: 'text-amber-400/80 border-amber-500/20 bg-amber-500/5',
      dot: 'bg-amber-400',
      glow: 'rgba(251, 146, 60, 0.12)'
    };
  };

  const theme = getCategoryTheme(object.class);

  // Concise key metric extraction
  const getPrimaryMetric = () => {
    const p = object.physics || {};
    const d = object.distance || {};

    if (object.class === 'blackhole') {
      if (p.mass) return { label: 'Mass', value: p.mass.split('(')[0].trim() };
      if (p.schwarzschildRadius) return { label: 'Horizon Radius', value: p.schwarzschildRadius };
    }
    if (object.class === 'exoplanet') {
      if (p.equilibriumTemp) return { label: 'Equilibrium Temp', value: p.equilibriumTemp };
      if (p.orbitalPeriod) return { label: 'Orbital Period', value: p.orbitalPeriod };
    }
    if (object.class === 'star') {
      if (p.radius) return { label: 'Radius', value: p.radius.split('(')[0].trim() };
      if (p.luminosity) return { label: 'Luminosity', value: p.luminosity.split('(')[0].trim() };
      if (p.mass) return { label: 'Stellar Mass', value: p.mass.split('(')[0].trim() };
      if (p.temperature) return { label: 'Surface Temp', value: p.temperature.split('(')[0].trim() };
    }
    if (p.stellarMass) return { label: 'Stellar Mass', value: p.stellarMass };
    if (d.lightTravelTime) return { label: 'Lookback Time', value: d.lightTravelTime };
    if (d.lightYears) return { label: 'Distance', value: `${d.lightYears} LY` };
    if (d.redshift) return { label: 'Redshift', value: `z = ${d.redshift}` };

    return { label: 'Observatory', value: object.discoveryMission || 'Surveyed' };
  };

  const metric = getPrimaryMetric();

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(object)}
      className="group relative cursor-pointer rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-500 ease-out will-change-transform flex flex-col justify-between"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? '-8px' : '0px'})`,
        boxShadow: isHovered
          ? `0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px ${theme.glow}, 0 0 1px rgba(255, 255, 255, 0.2)`
          : '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        borderColor: isHovered ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.07)'
      }}
    >
      <div>
        {/* CELESTIAL VISUAL (Model or Image) */}
        <div className="mb-4 overflow-hidden rounded-xl">
          <CelestialVisual object={object} isHovered={isHovered} size="card" />
        </div>

        {/* CLASSIFICATION BADGE & CONSTELLATION */}
        <div className="flex items-center justify-between gap-2">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono tracking-wider uppercase ${theme.badge}`}>
            <span className={`w-1 h-1 rounded-full ${theme.dot}`} />
            {object.subType?.split(' ')[0] || object.class}
          </div>
          {object.constellation && (
            <span className="text-[11px] font-light text-white/30 truncate">
              {object.constellation}
            </span>
          )}
        </div>

        {/* OBJECT TITLE & DESIGNATION */}
        <h3 className="mt-3 text-lg font-light tracking-tight text-white transition-colors duration-300 group-hover:text-white/95">
          {object.name}
        </h3>
        {object.designation && object.designation !== object.name && (
          <p className="mt-0.5 text-xs font-light text-white/30 truncate">
            {object.designation}
          </p>
        )}

        {/* CONCISE PRIMARY FACT */}
        <div className="mt-5 rounded-lg border border-white/[0.04] bg-white/[0.015] p-3">
          <div className="text-[10px] uppercase tracking-wider text-white/35 font-mono">
            {metric.label}
          </div>
          <div className="mt-0.5 text-xl font-extralight tracking-tight text-white/90">
            {metric.value}
          </div>
        </div>

        {/* 1-SENTENCE KEY DISCOVERY SUMMARY */}
        {object.keyDiscoveries && object.keyDiscoveries.length > 0 && (
          <p className="mt-3 text-xs leading-relaxed font-light text-white/40 line-clamp-2">
            {object.keyDiscoveries[0]}
          </p>
        )}
      </div>

      {/* FOOTER: DISTANCE & VIEW LINK */}
      <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-3.5 text-[11px] font-light text-white/30">
        <span>
          {object.distance?.lightYears ? `${object.distance.lightYears} LY away` : (object.discoveryMission || 'Deep Sky')}
        </span>
        <span className="flex items-center gap-1 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-white/70">
          Inspect
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </article>
  );
}

/**
 * DataCards
 * Organizes celestial objects into the 3 requested databases:
 * Stars, Black Holes, and Planets.
 */
export default function DataCards({ objects = [], onSelectObject, onBack }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'stars' | 'blackholes' | 'planets'
  const [searchQuery, setSearchQuery] = useState('');
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  // Filter objects by the requested Databases
  const isStarObject = (cls) => ['star', 'galaxy', 'pulsar', 'supernova'].includes(cls);
  const isBlackHoleObject = (cls) => cls === 'blackhole';
  const isPlanetObject = (cls) => ['exoplanet', 'interstellar'].includes(cls);

  const starCount = objects.filter(o => isStarObject(o.class)).length;
  const blackHoleCount = objects.filter(o => isBlackHoleObject(o.class)).length;
  const planetCount = objects.filter(o => isPlanetObject(o.class)).length;

  const filteredObjects = objects.filter(obj => {
    // Database filter
    if (activeTab === 'stars' && !isStarObject(obj.class)) return false;
    if (activeTab === 'blackholes' && !isBlackHoleObject(obj.class)) return false;
    if (activeTab === 'planets' && !isPlanetObject(obj.class)) return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (obj.name || '').toLowerCase().includes(q);
      const matchDesig = (obj.designation || '').toLowerCase().includes(q);
      const matchConst = (obj.constellation || '').toLowerCase().includes(q);
      const matchSub = (obj.subType || '').toLowerCase().includes(q);
      return matchName || matchDesig || matchConst || matchSub;
    }

    return true;
  });

  return (
    <section className="relative z-10 min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 transition-opacity duration-700 ease-out">
      {/* MINIMALIST TOP NAV BAR */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-8">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 w-fit focus:outline-none"
          aria-label="Return to landing page"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          <span className="text-sm font-light tracking-wide">Darkmatter</span>
        </button>

        {/* SEARCH INPUT */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search celestial catalog..."
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-1.5 pl-9 text-xs font-light text-white placeholder-white/30 focus:outline-none focus:border-white/25 focus:bg-white/[0.05] transition-all"
          />
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </header>

      {/* DATABASE CATEGORY SELECTORS */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 mb-10 flex-wrap">
        {[
          { id: 'all', label: 'All Databases', count: objects.length },
          { id: 'stars', label: 'Stars', count: starCount },
          { id: 'blackholes', label: 'Black Holes', count: blackHoleCount },
          { id: 'planets', label: 'Planets', count: planetCount }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-light tracking-wide transition-all duration-300 focus:outline-none ${
                isActive
                  ? 'border border-white/30 bg-white/[0.08] text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]'
                  : 'border border-transparent text-white/40 hover:text-white/70 hover:bg-white/[0.02]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-white/30'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* CARDS GRID */}
      {filteredObjects.length === 0 ? (
        <div className="text-center py-24 text-white/30 font-light">
          <p className="text-base">No celestial bodies match your criteria.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
            className="mt-4 text-xs font-mono text-white/50 underline underline-offset-4 hover:text-white"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredObjects.map((obj, index) => (
            <AntigravityCard
              key={obj.id}
              object={obj}
              index={index}
              onSelect={onSelectObject}
            />
          ))}
        </div>
      )}
    </section>
  );
}
