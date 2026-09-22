import React, { useState, useEffect } from 'react';
import CelestialVisualizer from '../catalog/CelestialVisualizer';
import { 
  Compass, 
  Orbit, 
  Calculator, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Radio, 
  Layers,
  Globe,
  Calendar,
  Zap,
  Flame,
  ExternalLink,
  Eye,
  Atom,
  Server,
  Database,
  FileText,
  Activity,
  CheckCircle2,
  Sliders,
  ShieldCheck
} from 'lucide-react';

export default function HeroLanding({ 
  objects, 
  onSelectObject, 
  onNavigate, 
  onOpenDictionary,
  onFilterByClass,
  nebulaTheme = 'carina',
  onNebulaThemeChange,
  nebulaIntensity = 'vibrant',
  onNebulaIntensityChange
}) {
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  // Landmark curated discoveries for the interactive spotlight preview
  const spotlightIds = [
    'obj-jades-z14', 
    'obj-m87-star', 
    'obj-51-peg-b', 
    'obj-trappist-1e', 
    'obj-gw150914', 
    'obj-oumuamua', 
    'obj-sn-1987a', 
    'obj-phoenix-a',
    'obj-k2-18b',
    'obj-wasp-76b'
  ];
  const spotlightObjects = objects.filter(o => spotlightIds.includes(o.id));
  const activeSpotlight = spotlightObjects[spotlightIndex] || objects[0];

  // Auto-advance spotlight every 7 seconds
  useEffect(() => {
    if (spotlightObjects.length <= 1) return;
    const timer = setInterval(() => {
      setSpotlightIndex(prev => (prev + 1) % spotlightObjects.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [spotlightObjects.length]);

  // Compute live counts per classification
  const classCounts = {
    exoplanet: objects.filter(o => o.class === 'exoplanet').length,
    black_hole: objects.filter(o => o.class === 'black_hole').length,
    nebula: objects.filter(o => o.class === 'nebula').length,
    galaxy: objects.filter(o => o.class === 'galaxy').length,
    gravitational_wave: objects.filter(o => o.class === 'gravitational_wave').length,
    interstellar_object: objects.filter(o => o.class === 'interstellar_object').length
  };

  const themeOptions = [
    { id: 'carina', label: 'Carina & Veil', colors: ['bg-cyan-400', 'bg-rose-500'] },
    { id: 'orion', label: 'Orion Molecular', colors: ['bg-purple-500', 'bg-blue-500'] },
    { id: 'pillars', label: 'Pillars of Creation', colors: ['bg-amber-400', 'bg-emerald-400'] },
    { id: 'supernova', label: 'Crab Supernova', colors: ['bg-red-500', 'bg-cyan-400'] },
    { id: 'abyss', label: 'Cosmic Abyss', colors: ['bg-slate-400', 'bg-slate-700'] }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 py-4 sm:py-8">
      
      {/* 1. WIDE CINEMATIC HERO SECTION */}
      <section className="relative rounded-3xl border border-cyan-500/25 bg-black/65 backdrop-blur-xl overflow-hidden p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="hud-scanline"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column: Vision & Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-hud-cyan text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-hud-emerald animate-ping"></span>
              <span>DEEP SKY OBSERVATORY & ASTROPHYSICS ENGINE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.12]">
              Mapping the <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-hud-cyan via-indigo-200 to-hud-violet">
                Discovered Universe.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-2xl font-light">
              An open, interactive astronomical observatory cataloging humanity's greatest cosmic discoveries—from habitable exoplanets and cosmic dawn galaxies to gravitational wave collisions and spacetime singularities.
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
              <button
                onClick={() => onNavigate('catalog')}
                className="px-6 py-3 rounded-xl bg-hud-cyan hover:bg-cyan-400 text-black font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition flex items-center space-x-2"
              >
                <Layers className="w-4 h-4" />
                <span>Explore {objects.length} Discoveries</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('simulator')}
                className="px-5 py-3 rounded-xl bg-black/80 border border-slate-800 hover:border-slate-600 text-slate-200 hover:text-white transition flex items-center space-x-2"
              >
                <Orbit className="w-4 h-4 text-hud-cyan" />
                <span>Gravity Simulator</span>
              </button>

              <button
                onClick={onOpenDictionary}
                className="px-5 py-3 rounded-xl bg-black/80 border border-slate-800 hover:border-hud-cyan text-slate-300 hover:text-hud-cyan transition flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4 text-hud-cyan" />
                <span>Data Dictionary</span>
              </button>
            </div>

            {/* Quick Feature Tags */}
            <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-hud-cyan"></span>
                <span>NASA / ESA Peer-Reviewed Data</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-hud-emerald"></span>
                <span>Interactive 3D Visual Models</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-hud-amber"></span>
                <span>Real-Time Orbital Physics</span>
              </div>
            </div>

            {/* NEBULA ATMOSPHERE CONTROLLER HUD */}
            <div className="pt-4 mt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center space-x-2 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-hud-cyan animate-pulse" />
                <span className="font-bold uppercase tracking-wider text-[11px] text-hud-cyan">Nebula Theme:</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-1.5">
                {themeOptions.map(t => (
                  <button
                    key={t.id}
                    onClick={() => onNebulaThemeChange?.(t.id)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] flex items-center space-x-1.5 transition ${
                      nebulaTheme === t.id 
                        ? 'bg-cyan-950/90 border-cyan-400 text-hud-cyan shadow-sm shadow-cyan-500/30 font-bold' 
                        : 'bg-black/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span className="flex space-x-0.5">
                      {t.colors.map((c, i) => (
                        <span key={i} className={`w-1.5 h-1.5 rounded-full ${c}`}></span>
                      ))}
                    </span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-1 text-[11px]">
                <span className="text-slate-500 mr-1">Density:</span>
                {['vibrant', 'balanced', 'subtle'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => onNebulaIntensityChange?.(lvl)}
                    className={`px-1.5 py-0.5 rounded capitalize ${
                      nebulaIntensity === lvl
                        ? 'bg-cyan-500/30 text-hud-cyan font-bold border border-cyan-500/50'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Ethereal Discovery Spotlight Preview (5 cols) */}
          {activeSpotlight && (
            <div className="lg:col-span-5">
              <div className="hud-bracket-card p-6 rounded-2xl bg-black/85 border border-cyan-500/30 shadow-2xl relative overflow-hidden group">
                <div className="hud-scanline"></div>

                {/* Spotlight Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-hud-cyan animate-pulse"></span>
                    <span className="text-hud-cyan uppercase font-bold tracking-wider text-[11px]">DISCOVERY SPOTLIGHT</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setSpotlightIndex((spotlightIndex - 1 + spotlightObjects.length) % spotlightObjects.length)}
                      className="p-1 rounded bg-cosmic-950 border border-slate-800 hover:text-white text-slate-400"
                      title="Previous Target"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-slate-500 px-1 font-mono">
                      {spotlightIndex + 1}/{spotlightObjects.length}
                    </span>
                    <button
                      onClick={() => setSpotlightIndex((spotlightIndex + 1) % spotlightObjects.length)}
                      className="p-1 rounded bg-cosmic-950 border border-slate-800 hover:text-white text-slate-400"
                      title="Next Target"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Spotlight Body: 3D Model + Metadata */}
                <div className="py-5 flex flex-col sm:flex-row items-center gap-5">
                  
                  {/* Procedural Visualizer Model */}
                  <div 
                    onClick={() => onSelectObject(activeSpotlight)}
                    className="w-36 h-36 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                    title={`Click to inspect ${activeSpotlight.name}`}
                  >
                    <CelestialVisualizer 
                      object={activeSpotlight} 
                      size={144} 
                      className="w-36 h-36"
                    />
                  </div>

                  {/* Information */}
                  <div className="space-y-1.5 flex-1 min-w-0 text-left">
                    <div className="flex items-center space-x-2 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-hud-cyan border border-cyan-800 uppercase font-bold">
                        {activeSpotlight.subType}
                      </span>
                      <span className="text-slate-500">{activeSpotlight.discoveryYear}</span>
                    </div>

                    <h3 
                      onClick={() => onSelectObject(activeSpotlight)}
                      className="text-xl font-bold text-white font-sans truncate hover:text-hud-cyan cursor-pointer transition"
                    >
                      {activeSpotlight.name}
                    </h3>

                    <div className="text-xs font-mono text-slate-400 truncate">
                      {activeSpotlight.constellation} &bull; {activeSpotlight.discoveryMission}
                    </div>

                    <p className="text-[11px] text-slate-300 font-sans line-clamp-2 leading-relaxed pt-1">
                      {activeSpotlight.keyDiscoveries[0]}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
                  <span className="text-[11px] text-hud-emerald">
                    {activeSpotlight.distance.lightTravelTime || activeSpotlight.distance.lightYears || `${activeSpotlight.distance.astronomicalUnits || 'N/A'}`}
                  </span>

                  <button
                    onClick={() => onSelectObject(activeSpotlight)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-hud-cyan border border-cyan-500/40 text-xs font-bold transition flex items-center space-x-1"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

      </section>

      {/* 2. WHAT DATA IS CONTAINED ON THE LANDING PAGE & OBSERVATORY ARCHITECTURE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <div className="text-xs font-mono text-hud-cyan uppercase font-bold tracking-wider mb-1 flex items-center space-x-2">
              <Database className="w-3.5 h-3.5 text-hud-cyan" />
              <span>ASTROPHYSICAL DATA ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">
              Data Contained in the Observatory
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-lg leading-relaxed">
            The DarkMatter landing page provides a real-time astrophysical telemetry hub aggregating astrometric coordinates, physical parameters, spectroscopic lines, and orbital dynamics from confirmed peer-reviewed publications.
          </p>
        </div>

        {/* 4 Core Data Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="hud-bracket-card p-5 rounded-xl bg-black/75 border border-cyan-500/20 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-800 text-hud-cyan flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">1. Astrometry & Horizons</h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Epoch J2000 Right Ascension (RA) and Declination (Dec), cosmological redshift (<span className="text-hud-amber font-mono">z</span>), light travel time, and stellar host constellation coordinates.
            </p>
          </div>

          <div className="hud-bracket-card p-5 rounded-xl bg-black/75 border border-amber-500/20 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-800 text-hud-amber flex items-center justify-center">
              <Orbit className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">2. Physical & Orbital Metrics</h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Solar & Earth mass ratios (<span className="text-hud-amber font-mono">M☉</span>, <span className="text-hud-amber font-mono">M⊕</span>), radii, surface equilibrium temperatures in Kelvin, orbital period, and semi-major axes.
            </p>
          </div>

          <div className="hud-bracket-card p-5 rounded-xl bg-black/75 border border-purple-500/20 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-400 flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">3. Spectroscopic Profiles</h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Emission lines (Hα, [O-III], [N-II]), atmospheric signatures (<span className="text-hud-cyan font-mono">CO₂</span>, <span className="text-hud-cyan font-mono">CH₄</span>, <span className="text-hud-cyan font-mono">H₂O</span>), bolometric luminosity, and spectral classification.
            </p>
          </div>

          <div className="hud-bracket-card p-5 rounded-xl bg-black/75 border border-emerald-500/20 space-y-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800 text-hud-emerald flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">4. Research Provenance</h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Peer-reviewed academic paper citations (NASA ADS, Nature, ApJ), discovery mission sensors (JWST NIRCam, HST, Chandra, Kepler, EHT), and open science DOI references.
            </p>
          </div>

        </div>

        {/* Interactive Classification Data Badges */}
        <div className="hud-bracket-card p-4 rounded-2xl bg-black/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="text-slate-400 flex items-center space-x-2">
            <span className="text-hud-cyan font-bold">CATALOGED DOMAINS:</span>
            <span>Jump directly to verified discovery records:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onFilterByClass ? onFilterByClass('exoplanet') : onNavigate('catalog')}
              className="px-3 py-1 rounded-lg bg-cosmic-900 hover:bg-cyan-950/80 border border-slate-700 hover:border-hud-cyan text-slate-300 hover:text-hud-cyan transition flex items-center space-x-1.5"
            >
              <span>🪐 Exoplanets</span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-hud-cyan font-bold text-[10px]">{classCounts.exoplanet || 0}</span>
            </button>

            <button
              onClick={() => onFilterByClass ? onFilterByClass('black_hole') : onNavigate('catalog')}
              className="px-3 py-1 rounded-lg bg-cosmic-900 hover:bg-violet-950/80 border border-slate-700 hover:border-purple-400 text-slate-300 hover:text-purple-300 transition flex items-center space-x-1.5"
            >
              <span>🕳️ Black Holes</span>
              <span className="px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 font-bold text-[10px]">{classCounts.black_hole || 0}</span>
            </button>

            <button
              onClick={() => onFilterByClass ? onFilterByClass('nebula') : onNavigate('catalog')}
              className="px-3 py-1 rounded-lg bg-cosmic-900 hover:bg-rose-950/80 border border-slate-700 hover:border-rose-400 text-slate-300 hover:text-rose-300 transition flex items-center space-x-1.5"
            >
              <span>🌌 Nebulae</span>
              <span className="px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 font-bold text-[10px]">{classCounts.nebula || 0}</span>
            </button>

            <button
              onClick={() => onFilterByClass ? onFilterByClass('galaxy') : onNavigate('catalog')}
              className="px-3 py-1 rounded-lg bg-cosmic-900 hover:bg-amber-950/80 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 transition flex items-center space-x-1.5"
            >
              <span>🔭 Galaxies</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 font-bold text-[10px]">{classCounts.galaxy || 0}</span>
            </button>

            <button
              onClick={() => onFilterByClass ? onFilterByClass('gravitational_wave') : onNavigate('catalog')}
              className="px-3 py-1 rounded-lg bg-cosmic-900 hover:bg-emerald-950/80 border border-slate-700 hover:border-emerald-400 text-slate-300 hover:text-emerald-300 transition flex items-center space-x-1.5"
            >
              <span>🌊 Grav Waves</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-bold text-[10px]">{classCounts.gravitational_wave || 0}</span>
            </button>

            <button
              onClick={() => onFilterByClass ? onFilterByClass('interstellar_object') : onNavigate('catalog')}
              className="px-3 py-1 rounded-lg bg-cosmic-900 hover:bg-blue-950/80 border border-slate-700 hover:border-blue-400 text-slate-300 hover:text-blue-300 transition flex items-center space-x-1.5"
            >
              <span>☄️ Interstellar</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 font-bold text-[10px]">{classCounts.interstellar_object || 0}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. OBSERVATORY SECTORS / GATEWAYS */}
      <section className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <div className="text-xs font-mono text-hud-cyan uppercase font-bold tracking-wider mb-1">
              OBSERVATORY SUITE
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">
              Interactive Space Exploration Tools
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-md">
            Select a sector below to browse verified discovery archives, run orbital collision physics, calculate relativistic metrics, or consult the astronomical dictionary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: All-Sky Discovery Catalog */}
          <div 
            onClick={() => onNavigate('catalog')}
            className="hud-bracket-card p-6 rounded-2xl cursor-pointer group bg-black/75 hover:border-cyan-500/50 hover:bg-cyan-950/10 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800 text-hud-cyan flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-hud-cyan transition">
                Celestial Discoveries Archive
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Browse {objects.length} landmark discoveries including habitable exoplanets, Kerr black holes, early cosmic dawn galaxies, and interstellar visitors with animated procedural 3D visual models.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-hud-cyan">
              <span>Enter Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Orbit & Gravity Simulator */}
          <div 
            onClick={() => onNavigate('simulator')}
            className="hud-bracket-card p-6 rounded-2xl cursor-pointer group bg-black/75 hover:border-cyan-500/50 hover:bg-cyan-950/10 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800 text-hud-cyan flex items-center justify-center group-hover:scale-110 transition-transform">
                <Orbit className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-hud-cyan transition">
                Gravity & Collision Simulator
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Launch orbiting bodies with precise velocities, simulate gravitational attractions, test orbital decay, and trigger high-energy planetary impacts calculated in Megatons of TNT with debris rings.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-hud-cyan">
              <span>Launch Simulator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Space Research Calculators */}
          <div 
            onClick={() => onNavigate('calculators')}
            className="hud-bracket-card p-6 rounded-2xl cursor-pointer group bg-black/75 hover:border-amber-500/50 hover:bg-amber-950/10 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800 text-hud-amber flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-hud-amber transition">
                Space Research Calculators
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                High-precision astrodynamics suite: calculate orbital velocity, escape velocity, Schwarzschild radius, relativistic time dilation, gravitational attraction, and stellar Stefan-Boltzmann luminosity.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-hud-amber">
              <span>Open Calculators</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Astronomical Data Dictionary */}
          <div 
            onClick={onOpenDictionary}
            className="hud-bracket-card p-6 rounded-2xl cursor-pointer group bg-black/75 hover:border-emerald-500/50 hover:bg-emerald-950/10 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800 text-hud-emerald flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-hud-emerald transition">
                Astronomical Data Dictionary
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Comprehensive reference compendium explaining astrophysical terminology, units, coordinate systems (RA/Dec), and spectral classifications with instant search and catalog filter links.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-hud-emerald">
              <span>Open Dictionary (Alt+D)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: All-Sky Celestial Radar */}
          <div 
            onClick={() => onNavigate('radar')}
            className="hud-bracket-card p-6 rounded-2xl cursor-pointer group bg-black/75 hover:border-violet-500/50 hover:bg-violet-950/10 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition">
                Sky Coordinate Radar
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Interactive equatorial celestial sphere radar projecting targets by Right Ascension (0h - 24h) and Declination (-90° to +90°) with interactive target locking and polar grid sweep animations.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-purple-400">
              <span>View Sky Radar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Discovery Timeline */}
          <div 
            onClick={() => onNavigate('timeline')}
            className="hud-bracket-card p-6 rounded-2xl cursor-pointer group bg-black/75 hover:border-rose-500/50 hover:bg-rose-950/10 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition">
                Cosmic Discovery Timeline
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Chronological journey across human space exploration: trace landmark discoveries from ancient Crab Supernova (1054) to contemporary JWST Cosmic Dawn deep field detections.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-rose-400">
              <span>Open Timeline</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </section>

      {/* 4. KEY COSMIC HORIZON METRICS */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        
        <div className="hud-bracket-card p-4 rounded-xl bg-black/80 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 uppercase">CATALOGED TARGETS</div>
          <div className="text-2xl font-bold text-hud-emerald">{objects.length} Verified</div>
          <div className="text-[10px] text-slate-400">Peer-reviewed literature</div>
        </div>

        <div className="hud-bracket-card p-4 rounded-xl bg-black/80 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 uppercase">DEEPEST HORIZON</div>
          <div className="text-2xl font-bold text-hud-amber">z = 14.32</div>
          <div className="text-[10px] text-slate-400">JADES-GS-z14-0 (JWST)</div>
        </div>

        <div className="hud-bracket-card p-4 rounded-xl bg-black/80 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 uppercase">NEAREST EXOPLANET</div>
          <div className="text-2xl font-bold text-hud-cyan">4.24 ly</div>
          <div className="text-[10px] text-slate-400">Proxima Centauri b (HZ)</div>
        </div>

        <div className="hud-bracket-card p-4 rounded-xl bg-black/80 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 uppercase">LARGEST SINGULARITY</div>
          <div className="text-2xl font-bold text-hud-violet">100 Billion M☉</div>
          <div className="text-[10px] text-slate-400">Phoenix A / TON 618</div>
        </div>

      </section>

    </div>
  );
}
