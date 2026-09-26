import React, { useState, useEffect, useRef, useMemo } from 'react';
import CelestialVisual from './CelestialVisual';
import { 
  queryStellarDiscoveries, 
  SPECTRAL_CLASSES, 
  CONSTELLATIONS_LIST, 
  STELLAR_SURVEYS, 
  TOTAL_STELLAR_DISCOVERIES_COUNT 
} from '../../data/stellarSurveys';
import { formatStarForObjectDetail } from '../../services/stellarDiscoveryEngine';
import { 
  Orbit, 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  Telescope, 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Zap, 
  Compass, 
  Flame,
  ArrowRight
} from 'lucide-react';

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
    return {
      badge: 'text-amber-400/80 border-amber-500/20 bg-amber-500/5',
      dot: 'bg-amber-400',
      glow: 'rgba(251, 146, 60, 0.12)'
    };
  };

  const theme = getCategoryTheme(object.class);

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
      className="group relative cursor-pointer rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-500 ease-out will-change-transform flex flex-col justify-between"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? '-6px' : '0px'})`,
        boxShadow: isHovered
          ? `0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px ${theme.glow}, 0 0 1px rgba(255, 255, 255, 0.2)`
          : '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        borderColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)'
      }}
    >
      <div>
        {/* CELESTIAL VISUAL */}
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
            <span className="text-[11px] font-light text-white/40 truncate">
              {object.constellation}
            </span>
          )}
        </div>

        {/* OBJECT TITLE & DESIGNATION */}
        <h3 className="mt-3 text-lg font-light tracking-tight text-white transition-colors duration-300 group-hover:text-white/95">
          {object.name}
        </h3>
        {object.designation && object.designation !== object.name && (
          <p className="mt-0.5 text-xs font-mono text-white/30 truncate">
            {object.designation}
          </p>
        )}

        {/* PRIMARY METRIC */}
        <div className="mt-4 rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
          <div className="text-[10px] uppercase tracking-wider text-white/35 font-mono">
            {metric.label}
          </div>
          <div className="mt-0.5 text-xl font-light tracking-tight text-white/90">
            {metric.value}
          </div>
        </div>

        {/* 1-SENTENCE SUMMARY */}
        {object.keyDiscoveries && object.keyDiscoveries.length > 0 && (
          <p className="mt-3 text-xs leading-relaxed font-light text-white/40 line-clamp-2">
            {object.keyDiscoveries[0]}
          </p>
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-3.5 text-[11px] font-light text-white/30">
        <span>
          {object.distance?.lightYears ? `${object.distance.lightYears} LY` : (object.discoveryMission || 'Deep Sky')}
        </span>
        <span className="flex items-center gap-1 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-white/80">
          Inspect
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </article>
  );
}

/**
 * StellarSurveyStarCard
 * Card for exploring stars from the multi-million Gaia & survey archive
 */
function StellarSurveyStarCard({ star, onSelect, onSimulate }) {
  const [isHovered, setIsHovered] = useState(false);

  const getSpectralBadge = (sc) => {
    const found = SPECTRAL_CLASSES.find(s => s.id === sc);
    return found || { badge: `CLASS ${sc}`, color: 'text-amber-300 border-amber-300/40 bg-amber-300/10', hex: '#ffcc33' };
  };

  const badge = getSpectralBadge(star.spectralClass);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between hover:border-white/20 hover:bg-white/[0.035] hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
    >
      <div>
        {/* Header & Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono tracking-wider uppercase ${badge.color}`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: badge.hex }} />
            {badge.badge}
          </div>
          <span className="text-[11px] font-mono text-white/40">
            {star.constellation}
          </span>
        </div>

        {/* Star Name & Catalog IDs */}
        <h3 className="mt-3 text-lg font-light text-white tracking-tight group-hover:text-cyan-300 transition-colors">
          {star.name}
        </h3>
        <p className="text-xs font-mono text-white/35 truncate mt-0.5">
          {star.catalogDesignations[0]}
        </p>

        {/* Astrophysical Metrics Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.015]">
            <div className="text-[9px] uppercase tracking-wider text-white/35">Temperature</div>
            <div className="text-sm font-light text-white/90 mt-0.5">
              {star.temperatureK.toLocaleString()} K
            </div>
          </div>
          <div className="p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.015]">
            <div className="text-[9px] uppercase tracking-wider text-white/35">Distance</div>
            <div className="text-sm font-light text-cyan-300 mt-0.5">
              {star.distanceLy.toLocaleString()} LY
            </div>
          </div>
          <div className="p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.015]">
            <div className="text-[9px] uppercase tracking-wider text-white/35">Stellar Mass</div>
            <div className="text-sm font-light text-amber-300 mt-0.5">
              {star.massSolar} M☉
            </div>
          </div>
          <div className="p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.015]">
            <div className="text-[9px] uppercase tracking-wider text-white/35">Luminosity</div>
            <div className="text-sm font-light text-purple-300 mt-0.5">
              {star.luminositySolar > 1000 ? `${(star.luminositySolar / 1000).toFixed(1)}k` : star.luminositySolar} L☉
            </div>
          </div>
        </div>

        {/* Brief description / significance */}
        <p className="mt-3 text-xs leading-relaxed font-light text-white/40 line-clamp-2">
          {star.significance}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(formatStarForObjectDetail(star))}
          className="text-xs font-light text-white/60 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Dossier</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        <button
          onClick={() => onSimulate && onSimulate(star)}
          className="px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(6,182,212,0.1)] cursor-pointer"
          title="Load this star directly into the Gravity Simulator"
        >
          <Orbit className="w-3 h-3" />
          <span>Simulate</span>
        </button>
      </div>
    </article>
  );
}

/**
 * Main DataCards Component
 */
export default function DataCards({ objects = [], onSelectObject, onBack, onNavigateToSimulator }) {
  // Master View: 'curated' | 'stellar_surveys'
  const [catalogMode, setCatalogMode] = useState('curated'); // 'curated' | 'stellar_surveys'
  
  // Curated Filters
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'stars' | 'blackholes' | 'planets'
  const [searchQuery, setSearchQuery] = useState('');

  // All-Sky Multi-Million Stellar Survey Filters
  const [stellarPage, setStellarPage] = useState(1);
  const [stellarSearch, setStellarSearch] = useState('');
  const [selectedSpectralClass, setSelectedSpectralClass] = useState('all');
  const [selectedConstellation, setSelectedConstellation] = useState('all');
  const [selectedDistanceRange, setSelectedDistanceRange] = useState('all');
  const [selectedSurvey, setSelectedSurvey] = useState('all');
  const [sortBy, setSortBy] = useState('distance-asc');

  // Compute Curated Filtered Objects
  const isStarObject = (cls) => ['star', 'galaxy', 'pulsar', 'supernova'].includes(cls);
  const isBlackHoleObject = (cls) => cls === 'blackhole';
  const isPlanetObject = (cls) => ['exoplanet', 'interstellar'].includes(cls);

  const starCount = objects.filter(o => isStarObject(o.class)).length;
  const blackHoleCount = objects.filter(o => isBlackHoleObject(o.class)).length;
  const planetCount = objects.filter(o => isPlanetObject(o.class)).length;

  const filteredCuratedObjects = objects.filter(obj => {
    if (activeTab === 'stars' && !isStarObject(obj.class)) return false;
    if (activeTab === 'blackholes' && !isBlackHoleObject(obj.class)) return false;
    if (activeTab === 'planets' && !isPlanetObject(obj.class)) return false;

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

  // Query All-Sky Multi-Million Stellar Surveys
  const stellarSurveyData = useMemo(() => {
    return queryStellarDiscoveries({
      searchQuery: stellarSearch,
      spectralClass: selectedSpectralClass,
      constellation: selectedConstellation,
      survey: selectedSurvey,
      distanceRange: selectedDistanceRange,
      sortBy,
      page: stellarPage,
      pageSize: 18
    });
  }, [stellarSearch, selectedSpectralClass, selectedConstellation, selectedSurvey, selectedDistanceRange, sortBy, stellarPage]);

  return (
    <section className="relative z-10 min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 transition-opacity duration-700 ease-out">
      
      {/* TOP OBSERVATORY HEADER & BROWSE MODE TOGGLE */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-white/[0.08] pb-6 mb-8">
        
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 w-fit focus:outline-none cursor-pointer"
            aria-label="Return to landing page"
          >
            <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="text-sm font-light tracking-wide">Darkmatter</span>
          </button>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          {/* Master Mode Switcher (Curated Deep Sky vs. Multi-Million All-Sky Surveys) */}
          <div className="flex items-center gap-1 p-1 rounded-full border border-white/[0.08] bg-white/[0.02]">
            <button
              onClick={() => setCatalogMode('curated')}
              className={`px-4 py-1.5 rounded-full text-xs font-light tracking-wide transition-all cursor-pointer ${
                catalogMode === 'curated'
                  ? 'bg-white/[0.12] text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                  : 'text-white/40 hover:text-white/70 border border-transparent'
              }`}
            >
              Curated Dossiers ({objects.length})
            </button>
            <button
              onClick={() => setCatalogMode('stellar_surveys')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
                catalogMode === 'stellar_surveys'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-bold'
                  : 'text-white/40 hover:text-cyan-300/80 border border-transparent'
              }`}
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>All-Sky Surveys (2.4M+ Stars)</span>
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={catalogMode === 'curated' ? searchQuery : stellarSearch}
            onChange={(e) => {
              if (catalogMode === 'curated') {
                setSearchQuery(e.target.value);
              } else {
                setStellarSearch(e.target.value);
                setStellarPage(1);
              }
            }}
            placeholder={catalogMode === 'curated' ? 'Search deep space catalog...' : 'Search Gaia DR3, KIC, TIC, SDSS, HD...'}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-2 pl-9 text-xs font-light text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.05] transition-all"
          />
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          {((catalogMode === 'curated' && searchQuery) || (catalogMode === 'stellar_surveys' && stellarSearch)) && (
            <button
              onClick={() => {
                if (catalogMode === 'curated') setSearchQuery('');
                else setStellarSearch('');
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

      </header>

      {/* ================================================================= */}
      {/* MODE 1: CURATED ASTROPHYSICAL DOSSIERS (Black Holes, Exoplanets, Galaxies) */}
      {/* ================================================================= */}
      {catalogMode === 'curated' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* CATEGORY SELECTOR PILLS */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap">
            {[
              { id: 'all', label: 'All Databases', count: objects.length },
              { id: 'stars', label: 'Stars & Systems', count: starCount },
              { id: 'blackholes', label: 'Black Holes', count: blackHoleCount },
              { id: 'planets', label: 'Exoplanets & Worlds', count: planetCount }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-light tracking-wide transition-all cursor-pointer ${
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
          {filteredCuratedObjects.length === 0 ? (
            <div className="text-center py-24 text-white/30 font-light">
              <p className="text-base">No celestial bodies match your criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                className="mt-4 text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
              >
                Reset search & filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredCuratedObjects.map((obj, index) => (
                <AntigravityCard
                  key={obj.id}
                  object={obj}
                  index={index}
                  onSelect={onSelectObject}
                />
              ))}
            </div>
          )}

        </div>
      )}

      {/* ================================================================= */}
      {/* MODE 2: ALL-SKY MULTI-MILLION STELLAR SURVEY CATALOG */}
      {/* ================================================================= */}
      {catalogMode === 'stellar_surveys' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* ALL-SKY STATS BANNER */}
          <div className="rounded-2xl border border-white/[0.08] bg-black/60 p-4 sm:p-5 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Globe className="w-3.5 h-3.5" />
                <span>ESA GAIA DR3 & NASA ALL-SKY ASTROMETRY STREAM</span>
              </div>
              <h2 className="text-lg font-light text-white mt-0.5">
                Milky Way Stellar Discoveries & Spectroscopic Surveys
              </h2>
              <p className="text-xs text-white/40 font-light mt-0.5">
                Query across <strong>{TOTAL_STELLAR_DISCOVERIES_COUNT.toLocaleString()}</strong> indexed stellar systems, high-precision parallaxes, and radial velocities.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 sm:gap-6 font-mono text-xs">
              <div>
                <div className="text-[10px] text-white/40 uppercase">INDEXED STARS</div>
                <div className="text-sm font-bold text-cyan-300 mt-0.5">2,450,812</div>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <div className="text-[10px] text-white/40 uppercase">MATCHING QUERY</div>
                <div className="text-sm font-bold text-emerald-300 mt-0.5">
                  {stellarSurveyData.totalMatching.toLocaleString()}
                </div>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div>
                <div className="text-[10px] text-white/40 uppercase">PAGE</div>
                <div className="text-sm font-bold text-white mt-0.5">
                  {stellarPage} / {stellarSurveyData.totalPages}
                </div>
              </div>
            </div>
          </div>

          {/* SPECTRAL CLASS FILTER BAR */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-white/40 flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span>SPECTRAL CLASSIFICATION (HERTZSPRUNG-RUSSELL SEQUENCE):</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {SPECTRAL_CLASSES.map(cls => {
                const isActive = selectedSpectralClass === cls.id;
                return (
                  <button
                    key={cls.id}
                    onClick={() => {
                      setSelectedSpectralClass(cls.id);
                      setStellarPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
                      isActive
                        ? `${cls.color} font-bold shadow-[0_0_12px_rgba(255,255,255,0.15)]`
                        : 'bg-white/[0.02] border-white/[0.06] text-white/40 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span>{cls.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECONDARY FILTER CONTROLS (Constellation, Distance, Survey & Sort) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            {/* Constellation Dropdown */}
            <select
              value={selectedConstellation}
              onChange={(e) => {
                setSelectedConstellation(e.target.value);
                setStellarPage(1);
              }}
              className="bg-black/60 border border-white/[0.08] rounded-xl px-3 py-2 text-white/70 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">All 88 Constellations</option>
              {CONSTELLATIONS_LIST.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Distance Bracket */}
            <select
              value={selectedDistanceRange}
              onChange={(e) => {
                setSelectedDistanceRange(e.target.value);
                setStellarPage(1);
              }}
              className="bg-black/60 border border-white/[0.08] rounded-xl px-3 py-2 text-white/70 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">All Distances</option>
              <option value="nearby">Solar Neighborhood (&lt; 100 LY)</option>
              <option value="medium">Orion-Cygnus Arm (100 - 2,000 LY)</option>
              <option value="deep">Deep Milky Way &gt; 2,000 LY</option>
            </select>

            {/* Mission / Survey */}
            <select
              value={selectedSurvey}
              onChange={(e) => {
                setSelectedSurvey(e.target.value);
                setStellarPage(1);
              }}
              className="bg-black/60 border border-white/[0.08] rounded-xl px-3 py-2 text-white/70 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">All Astronomical Surveys</option>
              <option value="Gaia DR3">ESA Gaia DR3</option>
              <option value="Kepler">NASA Kepler (KIC)</option>
              <option value="TESS">NASA TESS (TIC)</option>
              <option value="SDSS">SDSS / APOGEE</option>
              <option value="LAMOST">LAMOST DR9</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setStellarPage(1);
              }}
              className="bg-black/60 border border-white/[0.08] rounded-xl px-3 py-2 text-white/70 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="distance-asc">Sort: Nearest Distance</option>
              <option value="distance-desc">Sort: Deepest Distance</option>
              <option value="mass-desc">Sort: Highest Stellar Mass</option>
              <option value="temp-desc">Sort: Highest Temperature</option>
              <option value="radius-desc">Sort: Largest Radius</option>
              <option value="luminosity-desc">Sort: Highest Luminosity</option>
              <option value="name">Sort: Star Name</option>
            </select>
          </div>

          {/* STELLAR DISCOVERIES GRID */}
          {stellarSurveyData.items.length === 0 ? (
            <div className="text-center py-24 text-white/30 font-light">
              <p className="text-base">No stellar discoveries matched your filter combination.</p>
              <button
                onClick={() => {
                  setStellarSearch('');
                  setSelectedSpectralClass('all');
                  setSelectedConstellation('all');
                  setSelectedDistanceRange('all');
                  setSelectedSurvey('all');
                  setStellarPage(1);
                }}
                className="mt-4 text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
              >
                Reset all survey filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {stellarSurveyData.items.map((star) => (
                <StellarSurveyStarCard
                  key={star.id}
                  star={star}
                  onSelect={onSelectObject}
                  onSimulate={(s) => {
                    if (onNavigateToSimulator) {
                      onNavigateToSimulator(s);
                    }
                  }}
                />
              ))}
            </div>
          )}

          {/* PAGINATION CONTROLS */}
          {stellarSurveyData.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-white/[0.08] pt-6 font-mono text-xs text-white/50">
              <div>
                Showing page <strong className="text-white">{stellarPage}</strong> of{' '}
                <strong className="text-white">{stellarSurveyData.totalPages}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={stellarPage <= 1}
                  onClick={() => setStellarPage(prev => Math.max(1, prev - 1))}
                  className="px-3.5 py-2 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  disabled={stellarPage >= stellarSurveyData.totalPages}
                  onClick={() => setStellarPage(prev => Math.min(stellarSurveyData.totalPages, prev + 1))}
                  className="px-3.5 py-2 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-white disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </section>
  );
}
