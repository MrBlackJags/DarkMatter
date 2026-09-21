import React, { useState } from 'react';
import { 
  X, 
  Compass, 
  Telescope, 
  FileText, 
  Activity, 
  Radio, 
  ExternalLink, 
  Scale, 
  BookOpen, 
  Layers,
  Sparkles,
  Share2
} from 'lucide-react';

export default function ObjectDetailModal({ 
  object, 
  onClose, 
  onToggleCompare, 
  isCompared 
}) {
  if (!object) return null;

  const [activeTab, setActiveTab] = useState('physics'); // 'physics', 'spectra', 'papers'
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}#${object.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-cosmic-950/85 backdrop-blur-md overflow-y-auto">
      <div className="hud-bracket-card w-full max-w-4xl bg-cosmic-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* MODAL HEADER WITH TECHNICAL HUD TELEMETRY */}
        <div className="p-5 sm:p-6 bg-cosmic-950 border-b border-cyan-500/30 flex items-start justify-between relative">
          <div className="hud-scanline"></div>

          <div>
            <div className="flex items-center space-x-2 text-xs font-mono mb-1.5">
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-hud-cyan border border-cyan-800 uppercase font-bold tracking-wider">
                {object.subType}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-hud-emerald flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>DISCOVERY YEAR: {object.discoveryYear}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide flex items-center space-x-3">
              <span>{object.name}</span>
              <span className="text-xs font-mono font-normal text-slate-400 px-2 py-0.5 rounded bg-cosmic-900 border border-slate-800">
                {object.constellation}
              </span>
            </h2>
            <div className="text-xs font-mono text-slate-400 mt-1">
              Catalog Designation: <span className="text-slate-200">{object.designation}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={handleShare}
              className="p-2 rounded-lg bg-cosmic-900 border border-slate-800 hover:border-hud-cyan text-slate-400 hover:text-hud-cyan text-xs font-mono transition flex items-center space-x-1"
              title="Share / Copy Target Link"
            >
              <Share2 className="w-4 h-4" />
              {copied && <span className="text-[10px] text-hud-cyan">Copied!</span>}
            </button>

            <button 
              onClick={onClose}
              className="p-2 rounded-lg bg-cosmic-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ASTROMETRIC COORDINATES BAR */}
        <div className="px-6 py-2.5 bg-cosmic-950/90 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">RIGHT ASCENSION</span>
            <span className="text-hud-cyan font-bold">{object.coordinates.ra}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">DECLINATION</span>
            <span className="text-hud-cyan font-bold">{object.coordinates.dec}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">DISCOVERY MISSION</span>
            <span className="text-slate-200 truncate block" title={object.discoveryMission}>{object.discoveryMission}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">DETECTION METHOD</span>
            <span className="text-hud-amber truncate block">{object.discoveryMethod}</span>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex border-b border-slate-800 bg-cosmic-950/60 px-6 pt-3 space-x-6 text-xs font-mono">
          <button 
            onClick={() => setActiveTab('physics')}
            className={`pb-3 border-b-2 flex items-center space-x-1.5 transition ${
              activeTab === 'physics' 
                ? 'border-hud-cyan text-hud-cyan font-bold' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Physical Properties & Discoveries</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('spectra')}
            className={`pb-3 border-b-2 flex items-center space-x-1.5 transition ${
              activeTab === 'spectra' 
                ? 'border-hud-cyan text-hud-cyan font-bold' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Multi-Wavelength Profile & Lines</span>
          </button>

          <button 
            onClick={() => setActiveTab('papers')}
            className={`pb-3 border-b-2 flex items-center space-x-1.5 transition ${
              activeTab === 'papers' 
                ? 'border-hud-cyan text-hud-cyan font-bold' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Research Papers ({object.researchPapers.length})</span>
          </button>
        </div>

        {/* MODAL BODY CONTENT */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: PHYSICAL PROPERTIES & DISCOVERIES */}
          {activeTab === 'physics' && (
            <div className="space-y-6">
              
              {/* Distance Matrix */}
              <div className="p-4 rounded-xl bg-cosmic-950/70 border border-slate-800 font-mono text-xs">
                <div className="text-hud-cyan font-bold uppercase text-[11px] mb-3 flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Astrometric Distance & Spacetime Coordinates</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
                  {Object.entries(object.distance).map(([key, val]) => (
                    <div key={key} className="p-2.5 rounded bg-cosmic-900 border border-slate-800/80">
                      <span className="text-slate-500 block text-[10px] uppercase">{formatParamKey(key)}</span>
                      <span className="text-slate-100 font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Physical Parameters Grid */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-300 mb-3 flex items-center space-x-1.5">
                  <Activity className="w-3.5 h-3.5 text-hud-emerald" />
                  <span>Verified Physical Properties</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {Object.entries(object.physics).map(([k, v]) => (
                    <div key={k} className="p-3 rounded-lg bg-cosmic-950/80 border border-slate-800/80 flex items-center justify-between">
                      <span className="text-slate-400 text-[11px] uppercase">{formatParamKey(k)}:</span>
                      <span className="text-hud-cyan font-semibold text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Scientific Breakthroughs */}
              <div className="p-4 rounded-xl bg-cosmic-950/70 border border-cyan-500/20">
                <h4 className="text-xs font-mono font-bold uppercase text-hud-cyan mb-3 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Astronomical Breakthroughs & Research Significance</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                  {object.keyDiscoveries.map((disc, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-hud-cyan font-mono font-bold">[{idx + 1}]</span>
                      <span>{disc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* TAB 2: MULTI-WAVELENGTH & SPECTRA */}
          {activeTab === 'spectra' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                  Electromagnetic & Gravitational Detection Profile
                </h4>
                <p className="text-xs text-slate-400 font-mono mb-4">
                  Relative observational intensity across cosmic frequency bands (0 - 100 scale).
                </p>

                <div className="space-y-3 font-mono text-xs">
                  {Object.entries(object.spectralBands).map(([band, val]) => (
                    <div key={band} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="uppercase text-slate-400">{band} Band</span>
                        <span className="text-hud-cyan font-bold">{val}% Flux</span>
                      </div>
                      <div className="h-2.5 w-full bg-cosmic-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ${getSpectralColor(band)}`}
                          style={{ width: `${val}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spectral Absorption / Emission Lines */}
              {object.spectralLines && (
                <div className="p-4 rounded-xl bg-cosmic-950/70 border border-slate-800">
                  <h4 className="text-xs font-mono font-bold uppercase text-hud-emerald mb-2">
                    Key Spectroscopic Signatures & Chemical Transitions
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {object.spectralLines.map((line, i) => (
                      <span key={i} className="px-3 py-1.5 rounded bg-cosmic-900 border border-slate-700 text-xs font-mono text-slate-200 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-hud-emerald"></span>
                        <span>{line}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RESEARCH PAPERS & CITATIONS */}
          {activeTab === 'papers' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400 font-mono mb-2">
                Peer-reviewed foundational literature and discovery publications archived on NASA ADS and arXiv:
              </div>

              {object.researchPapers.map((paper, i) => (
                <div key={i} className="p-4 rounded-xl bg-cosmic-950/90 border border-slate-800 hover:border-slate-700 transition space-y-3 font-mono text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="font-bold text-slate-100 text-sm font-sans leading-snug">
                      {paper.title}
                    </h5>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-hud-cyan border border-cyan-800 text-[10px] font-bold">
                      {paper.year}
                    </span>
                  </div>

                  <div className="text-slate-400 text-xs">
                    Authors: <span className="text-slate-300">{paper.authors}</span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                    <div>Journal: <strong className="text-slate-300">{paper.journal}</strong></div>
                    <div>DOI: <strong className="text-slate-300">{paper.doi}</strong></div>
                    <div>Bibcode: <strong className="text-slate-300">{paper.bibcode}</strong></div>
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <a 
                      href={paper.openAccessUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-hud-cyan border border-cyan-500/40 text-xs font-bold transition"
                    >
                      <span>Access Full Research Paper</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 bg-cosmic-950 border-t border-slate-800 flex items-center justify-between">
          <button 
            onClick={() => onToggleCompare(object)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition border ${
              isCompared 
                ? 'bg-hud-cyan text-cosmic-950 border-hud-cyan' 
                : 'bg-cosmic-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{isCompared ? 'Remove from Comparison' : 'Add to Comparative Analysis'}</span>
          </button>

          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
}

function formatParamKey(key) {
  return key.replace(/([A-Z])/g, ' $1').trim();
}

function getSpectralColor(band) {
  switch (band) {
    case 'radio': return 'bg-rose-500 shadow-sm shadow-rose-500/50';
    case 'infrared': return 'bg-amber-500 shadow-sm shadow-amber-500/50';
    case 'optical': return 'bg-emerald-400 shadow-sm shadow-emerald-400/50';
    case 'ultraviolet': return 'bg-cyan-400 shadow-sm shadow-cyan-400/50';
    case 'xray': return 'bg-blue-500 shadow-sm shadow-blue-500/50';
    case 'gamma': return 'bg-purple-500 shadow-sm shadow-purple-500/50';
    case 'gravitational': return 'bg-hud-cyan shadow-sm shadow-hud-cyan/50';
    default: return 'bg-slate-400';
  }
}
