import React, { useState, useEffect, useMemo } from 'react';
import { CELESTIAL_CLASSES } from '../../data/discoveredObjects';
import CelestialVisualizer from './CelestialVisualizer';
import { 
  Eye, 
  Scale, 
  ExternalLink, 
  Compass, 
  Calendar, 
  Telescope, 
  Sparkles, 
  Layers, 
  Table, 
  LayoutGrid,
  Filter,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function ObjectCatalog({ 
  objects, 
  onSelectObject, 
  compareList, 
  onToggleCompare,
  searchQuery,
  initialClass = 'all'
}) {
  const [selectedClass, setSelectedClass] = useState(initialClass);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('year-desc');
  const [selectedMission, setSelectedMission] = useState('all');

  useEffect(() => {
    if (initialClass) setSelectedClass(initialClass);
  }, [initialClass]);

  const missions = useMemo(() => {
    const set = new Set();
    objects.forEach(obj => {
      if (obj.discoveryMission) set.add(obj.discoveryMission);
    });
    return Array.from(set);
  }, [objects]);

  const filteredObjects = useMemo(() => {
    return objects.filter(obj => {
      const matchClass = selectedClass === 'all' || obj.class === selectedClass;
      const matchMission = selectedMission === 'all' || obj.discoveryMission === selectedMission;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        obj.name.toLowerCase().includes(query) ||
        obj.designation.toLowerCase().includes(query) ||
        obj.constellation.toLowerCase().includes(query) ||
        obj.discoveryMission.toLowerCase().includes(query) ||
        obj.subType.toLowerCase().includes(query) ||
        obj.coordinates.ra.toLowerCase().includes(query);

      return matchClass && matchMission && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'year-desc') return b.discoveryYear - a.discoveryYear;
      if (sortBy === 'year-asc') return a.discoveryYear - b.discoveryYear;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [objects, selectedClass, selectedMission, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* SIMPLISTIC MODERN FILTER & CONTROL BAR */}
      <div className="bg-black/80 p-4 sm:p-5 rounded-2xl border border-slate-800 backdrop-blur-md space-y-4">
        
        {/* Classification Pills */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Filter className="w-3.5 h-3.5 text-hud-cyan" />
            <span>CATEGORIES:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CELESTIAL_CLASSES.map(cls => {
              const isActive = selectedClass === cls.id;
              return (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition border ${
                    isActive 
                      ? 'bg-hud-cyan/20 border-hud-cyan text-hud-cyan font-bold shadow-sm shadow-cyan-500/20' 
                      : 'bg-black border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="font-semibold">{cls.badge}</span>: {cls.label.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls: Target Count, Sort & View Mode */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          
          <div className="flex items-center space-x-4">
            <div className="text-slate-400">
              DISCOVERIES CATALOGED: <span className="text-hud-cyan font-bold">{filteredObjects.length}</span>
            </div>

            {/* Mission Selector */}
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-500">Mission:</span>
              <select 
                value={selectedMission}
                onChange={(e) => setSelectedMission(e.target.value)}
                className="bg-black border border-slate-800 rounded px-2 py-1 text-slate-300 focus:outline-none focus:border-hud-cyan text-[11px]"
              >
                <option value="all">All Observatories</option>
                {missions.map(m => (
                  <option key={m} value={m}>{m.length > 25 ? m.substring(0, 25) + '...' : m}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-500">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black border border-slate-800 rounded px-2 py-1 text-slate-300 focus:outline-none focus:border-hud-cyan text-[11px]"
              >
                <option value="year-desc">Year (Newest)</option>
                <option value="year-asc">Year (Oldest)</option>
                <option value="name">Designation (A-Z)</option>
              </select>
            </div>

            <div className="flex items-center bg-black border border-slate-800 rounded p-0.5">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-cyan-500/20 text-hud-cyan' : 'text-slate-500 hover:text-slate-300'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`p-1 rounded ${viewMode === 'table' ? 'bg-cyan-500/20 text-hud-cyan' : 'text-slate-500 hover:text-slate-300'}`}
                title="Table View"
              >
                <Table className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* DISCOVERIES DISPLAY */}
      {filteredObjects.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-black/60 border border-slate-800 font-mono text-xs text-slate-400">
          <Sparkles className="w-8 h-8 text-hud-cyan/50 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-200">NO CELESTIAL OBJECTS MATCH CURRENT PARAMETERS</p>
          <p className="text-slate-500 mt-1">Adjust search query or broaden classification filters.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredObjects.map(obj => {
            const isCompared = compareList.some(c => c.id === obj.id);
            return (
              <div 
                key={obj.id}
                className="hud-bracket-card p-5 rounded-2xl flex flex-col justify-between group bg-black/80 hover:border-cyan-500/40 transition duration-300"
              >
                <div>
                  {/* Top Bar: SubType & Year */}
                  <div className="flex items-center justify-between text-xs mb-2.5 font-mono">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold border tracking-wider ${getClassBadgeStyle(obj.class)}`}>
                      {obj.subType}
                    </span>
                    <span className="flex items-center space-x-1 text-slate-400 text-[11px]">
                      <Calendar className="w-3 h-3 text-hud-cyan" />
                      <span>{obj.discoveryYear}</span>
                    </span>
                  </div>

                  {/* Procedural Celestial Model of the Discovery Data */}
                  <div 
                    onClick={() => onSelectObject(obj)}
                    className="w-full h-32 mb-3 rounded-xl overflow-hidden cursor-pointer hover:border-hud-cyan/50 border border-slate-800/80 transition group/vis relative"
                    title={`Click to inspect ${obj.name} physical model & data dossier`}
                  >
                    <CelestialVisualizer object={obj} size={130} className="w-full h-full" />
                  </div>

                  {/* Title & Constellation */}
                  <h3 
                    onClick={() => onSelectObject(obj)}
                    className="text-lg font-bold text-white group-hover:text-hud-cyan cursor-pointer transition flex items-center justify-between"
                  >
                    <span>{obj.name}</span>
                    <span className="text-[11px] font-mono text-slate-500 font-normal">{obj.constellation}</span>
                  </h3>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5 line-clamp-1">
                    {obj.designation}
                  </div>

                  {/* Coordinates Strip */}
                  <div className="my-3 p-2 rounded-lg bg-black border border-slate-900 font-mono text-xs grid grid-cols-2 gap-2 text-slate-300">
                    <div>
                      <span className="text-slate-500 block text-[9px]">RA</span>
                      <span className="text-hud-cyan text-[11px]">{obj.coordinates.ra}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">DEC</span>
                      <span className="text-hud-cyan text-[11px]">{obj.coordinates.dec}</span>
                    </div>
                  </div>

                  {/* Mission & Distance */}
                  <div className="space-y-1 text-xs text-slate-300 font-mono">
                    <div className="flex justify-between border-b border-slate-900 pb-1">
                      <span className="text-slate-500">Mission:</span>
                      <span className="text-slate-200 text-right truncate max-w-[170px]" title={obj.discoveryMission}>{obj.discoveryMission}</span>
                    </div>
                    <div className="flex justify-between pt-0.5">
                      <span className="text-slate-500">Distance:</span>
                      <span className="text-hud-emerald font-semibold">
                        {obj.distance.lightTravelTime || obj.distance.lightYears || `${obj.distance.astronomicalUnits || 'N/A'}`}
                      </span>
                    </div>
                  </div>

                  {/* Educational Significance Highlight */}
                  <div className="mt-3 p-2.5 rounded-lg bg-black/60 border border-slate-800/80">
                    <div className="text-[9px] font-mono text-hud-cyan uppercase font-bold mb-0.5 flex items-center space-x-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Scientific Significance:</span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed font-sans">
                      {obj.keyDiscoveries[0]}
                    </p>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <button 
                    onClick={() => onToggleCompare(obj)}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition border ${
                      isCompared 
                        ? 'bg-hud-cyan text-black border-hud-cyan font-bold' 
                        : 'bg-black text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                  </button>

                  <button 
                    onClick={() => onSelectObject(obj)}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-hud-cyan border border-cyan-500/40 font-semibold transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Learn More →</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-black/80 rounded-2xl border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-black text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Target / Designation</th>
                <th className="p-3">Class</th>
                <th className="p-3">Coords (RA / Dec)</th>
                <th className="p-3">Discovery Year</th>
                <th className="p-3">Mission / Instrument</th>
                <th className="p-3">Distance</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredObjects.map(obj => {
                const isCompared = compareList.some(c => c.id === obj.id);
                return (
                  <tr key={obj.id} className="hover:bg-cosmic-900/40 transition">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800 cursor-pointer"
                          onClick={() => onSelectObject(obj)}
                        >
                          <CelestialVisualizer object={obj} size={40} className="w-full h-full" />
                        </div>
                        <div>
                          <div className="font-bold text-white hover:text-hud-cyan cursor-pointer" onClick={() => onSelectObject(obj)}>
                            {obj.name}
                          </div>
                          <div className="text-[10px] text-slate-500">{obj.designation}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getClassBadgeStyle(obj.class)}`}>
                        {obj.subType}
                      </span>
                    </td>
                    <td className="p-3 text-hud-cyan text-[11px]">
                      <div>{obj.coordinates.ra}</div>
                      <div className="text-slate-400">{obj.coordinates.dec}</div>
                    </td>
                    <td className="p-3 text-slate-300">{obj.discoveryYear}</td>
                    <td className="p-3">
                      <div className="text-slate-200">{obj.discoveryMission}</div>
                      <div className="text-[10px] text-slate-500">{obj.discoveryMethod}</div>
                    </td>
                    <td className="p-3 text-hud-emerald">
                      {obj.distance.lightTravelTime || obj.distance.lightYears || obj.distance.astronomicalUnits || 'N/A'}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button 
                        onClick={() => onToggleCompare(obj)}
                        className={`p-1.5 rounded-lg border text-[11px] ${
                          isCompared ? 'bg-hud-cyan text-black border-hud-cyan font-bold' : 'bg-black text-slate-400 border-slate-800'
                        }`}
                        title="Compare"
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => onSelectObject(obj)}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-hud-cyan border border-cyan-500/40 hover:bg-cyan-500/40 text-[11px]"
                      >
                        Explore
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

function getClassBadgeStyle(cls) {
  switch (cls) {
    case 'exoplanet': return 'bg-hud-cyan/15 text-hud-cyan border-hud-cyan/40';
    case 'blackhole': return 'bg-purple-500/15 text-purple-300 border-purple-500/40';
    case 'galaxy': return 'bg-amber-500/15 text-amber-300 border-amber-500/40';
    case 'pulsar': return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
    case 'interstellar': return 'bg-rose-500/15 text-rose-300 border-rose-500/40';
    case 'supernova': return 'bg-amber-400/15 text-amber-300 border-amber-400/40';
    default: return 'bg-slate-800 text-slate-300 border-slate-700';
  }
}
