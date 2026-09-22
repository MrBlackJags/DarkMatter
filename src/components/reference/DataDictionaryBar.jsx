import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  X, 
  Copy, 
  Check, 
  ChevronRight, 
  Sparkles, 
  ExternalLink, 
  Filter, 
  Pin, 
  Layers,
  Compass,
  ArrowRight
} from 'lucide-react';
import { DATA_DICTIONARY, DICTIONARY_CATEGORIES } from '../../data/astronomicalDictionary';

export default function DataDictionaryBar({ 
  isOpen, 
  onClose, 
  onFilterCatalogByClass 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState(DATA_DICTIONARY[0]);
  const [copiedId, setCopiedId] = useState(null);

  const filteredTerms = useMemo(() => {
    return DATA_DICTIONARY.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery = !query || 
        item.term.toLowerCase().includes(query) ||
        item.symbol.toLowerCase().includes(query) ||
        item.shortDef.toLowerCase().includes(query) ||
        item.unit.toLowerCase().includes(query);
      return matchCategory && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopy = (item) => {
    const text = `${item.term} (${item.symbol}): ${item.shortDef} | Unit: ${item.unit} | Formula: ${item.formula || 'N/A'}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-black border-l border-cyan-500/30 h-full flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Subtle top scanline */}
        <div className="hud-scanline"></div>

        {/* BAR HEADER */}
        <div className="p-5 border-b border-slate-800/90 bg-cosmic-950/90 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-700 flex items-center justify-center text-hud-cyan">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold font-mono text-white tracking-wide">
                  ASTRONOMICAL DATA DICTIONARY
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-hud-cyan border border-cyan-800">
                  {DATA_DICTIONARY.length} Parameters
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Interactive glossary of telemetry metrics, astrometric units & formulas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-cosmic-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
            title="Close Dictionary Bar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SEARCH & CATEGORY SELECTOR */}
        <div className="p-4 border-b border-slate-800/80 bg-cosmic-950/50 space-y-3">
          
          {/* Search Field */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search parameters, symbols, units (e.g. Redshift, Rs, AU, ESI)..."
              className="w-full pl-9 pr-8 py-2 text-xs font-mono rounded-lg bg-cosmic-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-hud-cyan focus:ring-1 focus:ring-hud-cyan transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-xs text-slate-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] font-mono scrollbar-none">
            {DICTIONARY_CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap transition border ${
                    isActive
                      ? 'bg-hud-cyan/20 border-hud-cyan text-hud-cyan font-bold'
                      : 'bg-cosmic-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* SPLIT VIEWPORT: LIST + DETAILED EXPANDED CARD */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-16 text-slate-500 font-mono text-xs">
              No astronomical parameters found matching "{searchQuery}".
            </div>
          ) : (
            filteredTerms.map(item => {
              const isSelected = selectedTerm?.id === item.id;
              return (
                <div
                  key={item.id}
                  className={`hud-bracket-card p-4 rounded-xl transition border cursor-pointer ${
                    isSelected
                      ? 'bg-cosmic-900 border-hud-cyan/60 shadow-lg shadow-cyan-500/10'
                      : 'bg-cosmic-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                  onClick={() => setSelectedTerm(item)}
                >
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white font-mono">
                          {item.term}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-hud-cyan text-[10px] font-mono border border-cyan-800 font-bold">
                          {item.symbol}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        UNIT: <span className="text-slate-300">{item.unit}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopy(item); }}
                      className="p-1.5 rounded-lg bg-cosmic-950 border border-slate-800 text-slate-400 hover:text-hud-cyan transition"
                      title="Copy definition"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-hud-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                    {item.shortDef}
                  </p>

                  {/* Detailed Description & Formula when expanded */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-800/90 space-y-2.5 text-xs font-mono animate-fadeIn">
                      <p className="text-slate-400 text-xs font-sans leading-relaxed">
                        {item.fullDef}
                      </p>

                      {item.formula && (
                        <div className="p-2.5 rounded-lg bg-black border border-cyan-500/30 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-slate-500 block">MATHEMATICAL FORMULATION</span>
                            <span className="text-hud-cyan font-bold font-mono">{item.formula}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="text-[11px] text-slate-400">
                          Used in: <strong className="text-slate-200">{item.usedIn}</strong>
                        </div>

                        {item.filterClass && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onFilterCatalogByClass(item.filterClass);
                              onClose();
                            }}
                            className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-hud-cyan border border-cyan-500/40 text-[11px] font-bold transition flex items-center space-x-1"
                          >
                            <span>Browse {item.filterClass} Discoveries</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

        {/* BOTTOM QUICK FOOTER */}
        <div className="p-3 bg-cosmic-950 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <div>Standard reference: IAU / NASA ADS / CODATA 2024</div>
          <div className="text-slate-400">Press <kbd className="px-1.5 py-0.5 bg-cosmic-900 border border-slate-800 rounded text-hud-cyan">Esc</kbd> to close</div>
        </div>

      </div>
    </div>
  );
}
