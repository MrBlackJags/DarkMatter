import React, { useState, useEffect, useRef, useMemo } from 'react';
import CelestialVisual from './CelestialVisual';
import SkyCoordinateRadar from '../observatory/SkyCoordinateRadar';
import DiscoveryTimeline from '../observatory/DiscoveryTimeline';
import { 
  queryStellarDiscoveries, 
  SPECTRAL_CLASSES, 
  CONSTELLATIONS_LIST, 
  STELLAR_SURVEYS, 
  TOTAL_STELLAR_DISCOVERIES_COUNT 
} from '../../data/stellarSurveys';
import { formatStarForObjectDetail } from '../../services/stellarDiscoveryEngine';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
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
  ArrowRight,
  LayoutGrid,
  Crosshair,
  Calendar,
  Scale,
  PlusCircle,
  BookOpen,
  ArrowUpDown,
  Filter,
  Check
} from 'lucide-react';

/**
 * AntigravityCard
 * Implements interactive 3D zero-G tilt, fluid levitation,
 * and directional cosmic glow on hover.
 */
function AntigravityCard({ object, index, onSelect, onSimulate, isCompared = false, onToggleCompare }) {
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

  const getBadgeVariant = (cls) => {
    const c = (cls || '').toLowerCase();
    if (c === 'blackhole') return 'purple';
    if (c === 'exoplanet' || c === 'interstellar') return 'emerald';
    if (c === 'galaxy') return 'cyan';
    if (c === 'pulsar') return 'cyan';
    if (c === 'supernova') return 'amber';
    return 'amber';
  };

  const badgeVariant = getBadgeVariant(object.class);

  return (
    <Card
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(object)}
      className="group relative cursor-pointer overflow-hidden border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80 flex flex-col justify-between"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? '-6px' : '0px'})`,
        boxShadow: isHovered
          ? `0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px ${theme.glow}, 0 0 1px rgba(255, 255, 255, 0.2)`
          : '0 4px 20px -2px rgba(0, 0, 0, 0.4)'
      }}
    >
      <div>
        {/* CELESTIAL VISUAL */}
        <div className="mb-4 overflow-hidden rounded-xl border border-white/5 bg-black/40">
          <CelestialVisual object={object} isHovered={isHovered} size="card" />
        </div>

        {/* CLASSIFICATION BADGE & CONSTELLATION */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant={badgeVariant}>
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
            <span>{object.subType?.split(' ')[0] || object.class}</span>
          </Badge>
          {object.constellation && (
            <span className="text-[11px] font-mono text-slate-400 truncate">
              {object.constellation}
            </span>
          )}
        </div>

        {/* OBJECT TITLE & DESIGNATION */}
        <h3 className="mt-3 text-lg font-medium tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-300">
          {object.name}
        </h3>
        {object.designation && object.designation !== object.name && (
          <p className="mt-0.5 text-xs font-mono text-slate-400 truncate">
            {object.designation}
          </p>
        )}

        {/* PRIMARY METRIC */}
        <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 backdrop-blur-sm">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
            {metric.label}
          </div>
          <div className="mt-0.5 text-lg font-mono font-bold tracking-tight text-cyan-300">
            {metric.value}
          </div>
        </div>

        {/* 1-SENTENCE SUMMARY */}
        {object.keyDiscoveries && object.keyDiscoveries.length > 0 && (
          <p className="mt-3 text-xs leading-relaxed font-sans text-slate-300 line-clamp-2">
            {object.keyDiscoveries[0]}
          </p>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3.5 text-xs font-mono text-slate-400">
        <span className="truncate max-w-[120px] text-[11px]">
          {object.distance?.lightYears ? `${object.distance.lightYears} LY` : (object.discoveryMission || 'Deep Sky')}
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onToggleCompare && (
            <Button
              size="sm"
              variant={isCompared ? "cyan" : "outline"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(object);
              }}
              className="h-7 px-2.5 text-[11px]"
              title={isCompared ? 'Remove from comparison' : 'Add to comparative analysis'}
            >
              <Scale className="w-3 h-3" />
              <span className="hidden sm:inline">{isCompared ? 'Queued' : 'Compare'}</span>
            </Button>
          )}
          {onSimulate && (
            <Button
              size="sm"
              variant="cyan"
              onClick={(e) => {
                e.stopPropagation();
                onSimulate(object);
              }}
              className="h-7 px-2.5 text-[11px]"
              title="Simulate gravitational field in Orbit Simulator"
            >
              <Orbit className="w-3 h-3" />
              <span className="hidden sm:inline">Simulate</span>
            </Button>
          )}
          <span className="flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-1 text-slate-300 group-hover:text-cyan-300 ml-1">
            <span className="hidden sm:inline">Inspect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Card>
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
  const formattedStar = formatStarForObjectDetail(star);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80 flex flex-col justify-between shadow-xl"
    >
      <div>
        {/* Real Telescope Survey Photo Visual Header */}
        <div
          onClick={() => onSelect(formattedStar)}
          className="mb-4 overflow-hidden rounded-xl border border-white/5 bg-black/40 cursor-pointer"
        >
          <CelestialVisual object={{ ...star, class: 'star' }} isHovered={isHovered} size="card" />
        </div>

        {/* Header & Badges */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className={`${badge.color} border px-2.5 py-0.5`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: badge.hex }} />
            <span>{badge.badge}</span>
          </Badge>
          <span className="text-[11px] font-mono text-slate-400">
            {star.constellation}
          </span>
        </div>

        {/* Star Name & Catalog IDs */}
        <h3
          onClick={() => onSelect(formattedStar)}
          className="mt-3 text-lg font-medium text-white tracking-tight group-hover:text-cyan-300 transition-colors cursor-pointer"
        >
          {star.name}
        </h3>
        <p className="text-xs font-mono text-slate-400 truncate mt-0.5">
          {star.catalogDesignations[0]}
        </p>

        {/* Astrophysical Metrics Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Temperature</div>
            <div className="text-sm font-semibold text-slate-100 mt-0.5">
              {star.temperatureK.toLocaleString()} K
            </div>
          </div>
          <div className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Distance</div>
            <div className="text-sm font-semibold text-cyan-300 mt-0.5">
              {star.distanceLy.toLocaleString()} LY
            </div>
          </div>
          <div className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Stellar Mass</div>
            <div className="text-sm font-semibold text-amber-300 mt-0.5">
              {star.massSolar} M☉
            </div>
          </div>
          <div className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Luminosity</div>
            <div className="text-sm font-semibold text-purple-300 mt-0.5">
              {star.luminositySolar > 1000 ? `${(star.luminositySolar / 1000).toFixed(1)}k` : star.luminositySolar} L☉
            </div>
          </div>
        </div>

        {/* Brief description / significance */}
        <p className="mt-3 text-xs leading-relaxed font-sans text-slate-300 line-clamp-2">
          {star.significance}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(formattedStar)}
          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Dossier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <Button
          size="sm"
          variant="cyan"
          onClick={(e) => {
            e.stopPropagation();
            onSimulate && onSimulate(star);
          }}
          className="h-7 px-2.5 text-[11px]"
          title="Load this star directly into the Gravity Simulator"
        >
          <Orbit className="w-3 h-3" />
          <span>Simulate</span>
        </Button>
      </div>
    </Card>
  );
}

/**
 * Main DataCards Component
 */
export default function DataCards({ 
  objects = [], 
  onSelectObject, 
  onBack, 
  onNavigateToSimulator,
  compareList = [],
  onToggleCompare,
  onOpenCompare,
  onOpenLogger,
  onOpenDictionary
}) {
  // Master View: 'curated' | 'stellar_surveys'
  const [catalogMode, setCatalogMode] = useState('curated'); // 'curated' | 'stellar_surveys'
  const [curatedView, setCuratedView] = useState('grid'); // 'grid' | 'radar' | 'timeline'
  
  // Curated Filters & Advanced Sorting
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'stars' | 'blackholes' | 'planets'
  const [searchQuery, setSearchQuery] = useState('');
  const [curatedSortBy, setCuratedSortBy] = useState('discovery-desc'); // 'discovery-desc' | 'discovery-asc' | 'name-asc' | 'name-desc' | 'distance-asc' | 'distance-desc' | 'class'

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

  const parseDistanceNumeric = (obj) => {
    if (!obj.distance) return Infinity;
    if (obj.distance.lightYears) {
      const cleaned = String(obj.distance.lightYears).replace(/,/g, '').toLowerCase();
      if (cleaned.includes('billion')) return parseFloat(cleaned) * 1e9;
      if (cleaned.includes('million')) return parseFloat(cleaned) * 1e6;
      const num = parseFloat(cleaned);
      if (!isNaN(num)) return num;
    }
    if (obj.distance.lightTravelTime) {
      const cleaned = String(obj.distance.lightTravelTime).replace(/,/g, '').toLowerCase();
      if (cleaned.includes('billion')) return parseFloat(cleaned) * 1e9;
      if (cleaned.includes('million')) return parseFloat(cleaned) * 1e6;
      const num = parseFloat(cleaned);
      if (!isNaN(num)) return num;
    }
    if (obj.distance.redshift) {
      return parseFloat(obj.distance.redshift) * 3.26e9; // roughly scale redshift
    }
    return Infinity;
  };

  const filteredCuratedObjects = useMemo(() => {
    let list = objects.filter(obj => {
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

    // Apply rigorous, multi-attribute sorting
    list = [...list].sort((a, b) => {
      if (curatedSortBy === 'discovery-desc') {
        const yA = a.discoveryYear || 0;
        const yB = b.discoveryYear || 0;
        return yB - yA;
      }
      if (curatedSortBy === 'discovery-asc') {
        const yA = a.discoveryYear || 9999;
        const yB = b.discoveryYear || 9999;
        return yA - yB;
      }
      if (curatedSortBy === 'name-asc') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (curatedSortBy === 'name-desc') {
        return (b.name || '').localeCompare(a.name || '');
      }
      if (curatedSortBy === 'distance-asc') {
        return parseDistanceNumeric(a) - parseDistanceNumeric(b);
      }
      if (curatedSortBy === 'distance-desc') {
        return parseDistanceNumeric(b) - parseDistanceNumeric(a);
      }
      if (curatedSortBy === 'class') {
        return (a.class || '').localeCompare(b.class || '');
      }
      return 0;
    });

    return list;
  }, [objects, activeTab, searchQuery, curatedSortBy]);

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

        {/* SEARCH BAR & QUICK ACTIONS */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
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

          {/* Log Discovery Candidate Button */}
          {catalogMode === 'curated' && onOpenLogger && (
            <button
              onClick={onOpenLogger}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-mono transition-all shadow-[0_0_15px_rgba(6,182,212,0.12)] cursor-pointer shrink-0"
              title="Record and persist custom celestial observation to database"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Log Discovery</span>
            </button>
          )}
        </div>

      </header>

      {/* ================================================================= */}
      {/* MODE 1: CURATED ASTROPHYSICAL DOSSIERS (Black Holes, Exoplanets, Galaxies) */}
      {/* ================================================================= */}
      {catalogMode === 'curated' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* TOOLBAR: CATEGORY PILLS & VIEW MODE SWITCHER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-4">
            
            {/* Category Selector Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
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
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-light tracking-wide transition-all cursor-pointer whitespace-nowrap ${
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

            {/* Sorting Dropdown & View Mode Switcher */}
            <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto shrink-0">
              
              {/* Better Sorting Selector for Curated Discoveries */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-slate-950/80 backdrop-blur-md text-xs font-mono text-slate-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-[10px] uppercase text-slate-400 hidden lg:inline">Sort:</span>
                <select
                  value={curatedSortBy}
                  onChange={(e) => setCuratedSortBy(e.target.value)}
                  className="bg-transparent text-slate-200 text-xs font-mono focus:outline-none cursor-pointer pr-1"
                >
                  <option value="discovery-desc" className="bg-slate-900 text-white">Year: Newest First</option>
                  <option value="discovery-asc" className="bg-slate-900 text-white">Year: Historic First</option>
                  <option value="name-asc" className="bg-slate-900 text-white">Name: A → Z</option>
                  <option value="name-desc" className="bg-slate-900 text-white">Name: Z → A</option>
                  <option value="distance-asc" className="bg-slate-900 text-white">Distance: Closest</option>
                  <option value="distance-desc" className="bg-slate-900 text-white">Distance: Deepest</option>
                  <option value="class" className="bg-slate-900 text-white">Class &amp; Category</option>
                </select>
              </div>

              {compareList.length > 0 && onOpenCompare && (
                <button
                  onClick={onOpenCompare}
                  className="px-3 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Compare ({compareList.length})</span>
                </button>
              )}

              <div className="flex items-center p-1 rounded-full border border-white/[0.08] bg-white/[0.02]">
                <button
                  onClick={() => setCuratedView('grid')}
                  className={`p-1.5 px-3 rounded-full text-xs font-light flex items-center gap-1.5 transition-all cursor-pointer ${
                    curatedView === 'grid'
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-white/40 hover:text-white/80'
                  }`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Cards</span>
                </button>
                <button
                  onClick={() => setCuratedView('radar')}
                  className={`p-1.5 px-3 rounded-full text-xs font-light flex items-center gap-1.5 transition-all cursor-pointer ${
                    curatedView === 'radar'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                      : 'text-white/40 hover:text-cyan-300'
                  }`}
                  title="All-Sky Equatorial Radar Projection"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Sky Radar</span>
                </button>
                <button
                  onClick={() => setCuratedView('timeline')}
                  className={`p-1.5 px-3 rounded-full text-xs font-light flex items-center gap-1.5 transition-all cursor-pointer ${
                    curatedView === 'timeline'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                      : 'text-white/40 hover:text-amber-300'
                  }`}
                  title="Chronological Discovery Timeline"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Timeline</span>
                </button>
              </div>
            </div>

          </div>

          {/* VIEW RENDERER */}
          {curatedView === 'radar' && (
            <div className="animate-fade-in">
              <SkyCoordinateRadar 
                objects={filteredCuratedObjects} 
                onSelectObject={onSelectObject} 
              />
            </div>
          )}

          {curatedView === 'timeline' && (
            <div className="animate-fade-in max-w-4xl mx-auto">
              <DiscoveryTimeline 
                objects={filteredCuratedObjects} 
                onSelectObject={onSelectObject} 
              />
            </div>
          )}

          {curatedView === 'grid' && (
            filteredCuratedObjects.length === 0 ? (
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
                    onSimulate={onNavigateToSimulator}
                    isCompared={compareList.some(c => c.id === obj.id)}
                    onToggleCompare={onToggleCompare}
                  />
                ))}
              </div>
            )
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
