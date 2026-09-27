import React, { useEffect, useState } from 'react';
import CelestialVisual from './CelestialVisual';
import { Orbit, Scale, Calculator } from 'lucide-react';

const camelToTitle = (str) => {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export default function ObjectDetail({ 
  object, 
  onClose, 
  onSimulate, 
  onCompare, 
  isCompared = false, 
  onOpenCalculators 
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (object) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [object]);

  if (!object) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getClassTheme = (cls) => {
    const c = (cls || '').toLowerCase();
    if (c === 'blackhole') return { dot: 'bg-blue-400', label: 'Black Hole Singularity' };
    if (['exoplanet', 'interstellar'].includes(c)) return { dot: 'bg-emerald-400', label: 'Planetary World' };
    return { dot: 'bg-amber-400', label: 'Stellar System' };
  };

  const theme = getClassTheme(object.class);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-xl transition-opacity duration-300 overflow-y-auto ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div className="max-w-3xl mx-auto py-12 px-6 min-h-screen relative flex flex-col pointer-events-none">
        <div className="pointer-events-auto bg-black/40 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {/* CLOSE BUTTON */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${theme.dot}`} />
              <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase">
                {theme.label} · {object.subType || object.class}
              </span>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] text-white/50 hover:text-white hover:border-white/30 hover:bg-white/[0.08] flex items-center justify-center transition-all focus:outline-none"
              aria-label="Close detail view"
            >
              ✕
            </button>
          </div>

          {/* LARGE CELESTIAL VISUAL (Interactive Model or Image) */}
          <div className="mb-8">
            <CelestialVisual object={object} size="detail" isHovered={true} />
          </div>

          {/* OBJECT HEADER */}
          <header className="border-b border-white/[0.06] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extralight tracking-tight text-white">
                {object.name}
              </h1>
              {object.designation && object.designation !== object.name && (
                <p className="text-sm font-mono text-white/40 mt-1">
                  {object.designation}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {onCompare && (
                <button
                  onClick={() => onCompare(object)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                    isCompared
                      ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                      : 'border-white/15 hover:border-white/30 bg-white/[0.03] text-white/70 hover:text-white'
                  }`}
                  title={isCompared ? 'Remove from comparison' : 'Add to side-by-side comparison'}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isCompared ? 'In Compare' : 'Compare'}</span>
                </button>
              )}

              {onOpenCalculators && (
                <button
                  onClick={() => {
                    handleClose();
                    onOpenCalculators();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 text-xs font-mono transition-all cursor-pointer"
                  title="Open Space Calculators with this object"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Calculators</span>
                </button>
              )}

              {onSimulate && (
                <button
                  onClick={() => {
                    handleClose();
                    onSimulate(object);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-300 text-xs font-mono tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-pointer w-fit"
                >
                  <Orbit className="w-3.5 h-3.5" />
                  <span>Simulate Gravity</span>
                </button>
              )}
            </div>
          </header>

          {/* METADATA GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/[0.06]">
            {object.discoveryYear && (
              <div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Discovered</div>
                <div className="text-sm font-light text-white/80 mt-1">{object.discoveryYear}</div>
              </div>
            )}
            {object.discoveryMission && (
              <div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Mission</div>
                <div className="text-sm font-light text-white/80 mt-1 truncate" title={object.discoveryMission}>
                  {object.discoveryMission}
                </div>
              </div>
            )}
            {object.constellation && (
              <div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Constellation</div>
                <div className="text-sm font-light text-white/80 mt-1">{object.constellation}</div>
              </div>
            )}
            {object.distance?.lightYears && (
              <div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Distance</div>
                <div className="text-sm font-light text-white/80 mt-1">{object.distance.lightYears} LY</div>
              </div>
            )}
          </div>

          {/* KEY DISCOVERIES */}
          {object.keyDiscoveries && object.keyDiscoveries.length > 0 && (
            <section className="py-6 border-b border-white/[0.06]">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30 mb-4">
                Scientific Telemetry & Breakthroughs
              </div>
              <ul className="space-y-3">
                {object.keyDiscoveries.map((disc, idx) => (
                  <li key={idx} className="flex gap-3 text-sm font-light text-white/60 leading-relaxed">
                    <span className="text-white/20 font-mono text-xs mt-0.5">0{idx + 1}</span>
                    <span>{disc}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* PHYSICAL PROPERTIES */}
          {object.physics && Object.keys(object.physics).length > 0 && (
            <section className="py-6 border-b border-white/[0.06]">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30 mb-4">
                Physical Properties
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(object.physics).map(([key, val]) => {
                  if (val == null) return null;
                  return (
                    <div key={key} className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.015]">
                      <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
                        {camelToTitle(key)}
                      </div>
                      <div className="text-base font-extralight text-white/90 mt-1">
                        {val}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ASTRONOMICAL COORDINATES */}
          {object.coordinates && (
            <section className="py-6 border-b border-white/[0.06]">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30 mb-4">
                Astrometric Coordinates
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.015]">
                  <div className="text-[10px] font-mono text-white/30 uppercase">Right Ascension (RA)</div>
                  <div className="text-sm font-mono text-white/80 mt-1">{object.coordinates.ra}</div>
                </div>
                <div className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.015]">
                  <div className="text-[10px] font-mono text-white/30 uppercase">Declination (DEC)</div>
                  <div className="text-sm font-mono text-white/80 mt-1">{object.coordinates.dec}</div>
                </div>
              </div>
            </section>
          )}

          {/* RESEARCH CITATIONS */}
          {object.researchPapers && object.researchPapers.length > 0 && (
            <section className="pt-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30 mb-4">
                Peer-Reviewed Research Citations
              </div>
              <div className="space-y-3">
                {object.researchPapers.map((paper, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.015]">
                    <div className="text-sm font-light text-white/80">{paper.title}</div>
                    <div className="text-xs text-white/30 mt-1 font-light">
                      {paper.authors} {paper.journal && `· ${paper.journal}`} {paper.year && `(${paper.year})`}
                    </div>
                    {paper.openAccessUrl && (
                      <a
                        href={paper.openAccessUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white mt-2 transition-colors font-mono"
                      >
                        Read Publication ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
