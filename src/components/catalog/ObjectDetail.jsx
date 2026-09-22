import React, { useEffect, useState } from 'react';

const camelToTitle = (str) => {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export default function ObjectDetail({ object, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (object) {
      // Small delay to trigger transition
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [object]);

  if (!object) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out transition
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getClassColor = (cls) => {
    const c = (cls || '').toLowerCase();
    if (['galaxy', 'pulsar', 'supernova'].includes(c)) return 'bg-orange-400/60';
    if (['blackhole', 'black hole'].includes(c)) return 'bg-blue-400/60';
    if (['exoplanet', 'interstellar'].includes(c)) return 'bg-emerald-400/60';
    return 'bg-white/40';
  };

  const SectionLabel = ({ children }) => (
    <div className="text-[10px] text-white/15 uppercase tracking-[0.3em] mb-4">
      {children}
    </div>
  );

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-md transition-opacity duration-300 overflow-y-auto ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleBackdropClick}
    >
      <div className="max-w-3xl mx-auto py-16 px-6 min-h-screen relative flex flex-col pointer-events-none">
        <div className="pointer-events-auto">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-white/30 hover:text-white/60 text-2xl cursor-pointer transition select-none z-10"
            aria-label="Close"
          >
            &#x2715;
          </button>

          <header>
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${getClassColor(object.class)}`} />
              <span className="text-[11px] text-white/30 uppercase tracking-widest">
                {object.subType || object.class}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extralight text-white mt-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              {object.name}
            </h1>
            {object.designation && (
              <p className="text-sm text-white/20 font-light mt-2">
                {object.designation}
              </p>
            )}
          </header>

          {(object.discoveryYear || object.discoveryMission || object.constellation || object.discoveryMethod) && (
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {object.discoveryYear && (
                <div>
                  <div className="text-[10px] text-white/20 uppercase tracking-wider">Discovered</div>
                  <div className="text-sm text-white/50 mt-0.5">{object.discoveryYear}</div>
                </div>
              )}
              {object.discoveryMission && (
                <div>
                  <div className="text-[10px] text-white/20 uppercase tracking-wider">Mission</div>
                  <div className="text-sm text-white/50 mt-0.5">{object.discoveryMission}</div>
                </div>
              )}
              {object.constellation && (
                <div>
                  <div className="text-[10px] text-white/20 uppercase tracking-wider">Constellation</div>
                  <div className="text-sm text-white/50 mt-0.5">{object.constellation}</div>
                </div>
              )}
              {object.discoveryMethod && (
                <div>
                  <div className="text-[10px] text-white/20 uppercase tracking-wider">Method</div>
                  <div className="text-sm text-white/50 mt-0.5">{object.discoveryMethod}</div>
                </div>
              )}
            </div>
          )}

          {object.physics && Object.keys(object.physics).length > 0 && (
            <section className="mt-10">
              <SectionLabel>Physical Properties</SectionLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(object.physics).map(([key, value]) => {
                  if (value == null) return null;
                  return (
                    <div key={key} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="text-lg font-extralight text-white/70">{value}</div>
                      <div className="text-[10px] text-white/20 uppercase tracking-wider mt-1">
                        {camelToTitle(key)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section className="mt-10">
            <SectionLabel>Distance & Position</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {object.distance && Object.entries(object.distance).map(([key, value]) => {
                if (value == null) return null;
                return (
                  <div key={key} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="text-lg font-extralight text-white/70">{value}</div>
                    <div className="text-[10px] text-white/20 uppercase tracking-wider mt-1">
                      {camelToTitle(key)}
                    </div>
                  </div>
                );
              })}
              {object.coordinates && object.coordinates.ra && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-lg font-extralight text-white/70">{object.coordinates.ra}</div>
                  <div className="text-[10px] text-white/20 uppercase tracking-wider mt-1">Right Ascension</div>
                </div>
              )}
              {object.coordinates && object.coordinates.dec && (
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-lg font-extralight text-white/70">{object.coordinates.dec}</div>
                  <div className="text-[10px] text-white/20 uppercase tracking-wider mt-1">Declination</div>
                </div>
              )}
            </div>
          </section>

          {object.keyDiscoveries && object.keyDiscoveries.length > 0 && (
            <section className="mt-10">
              <SectionLabel>Key Discoveries</SectionLabel>
              <ol className="list-none m-0 p-0">
                {object.keyDiscoveries.map((discovery, idx) => (
                  <li key={idx} className="text-sm text-white/40 leading-relaxed mb-3 font-light">
                    <span className="text-white/15 mr-2">{idx + 1}.</span>
                    {discovery}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {object.spectralBands && (
            <section className="mt-10">
              <SectionLabel>Spectral Signature</SectionLabel>
              <div className="space-y-2">
                {Object.entries(object.spectralBands).map(([band, val]) => {
                  if (val == null) return null;
                  const percentage = Math.min(Math.max(Number(val) || 0, 0), 100);
                  return (
                    <div key={band} className="flex items-center gap-3 mb-2">
                      <div className="text-[10px] text-white/20 uppercase w-20 shrink-0">
                        {band}
                      </div>
                      <div className="flex-1 bg-white/[0.02] h-1 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-white/10 to-white/30 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {object.spectralLines && object.spectralLines.length > 0 && (
                <div className="mt-4 text-xs text-white/20 font-light">
                  Spectral Lines: {object.spectralLines.join(', ')}
                </div>
              )}
            </section>
          )}

          {object.researchPapers && object.researchPapers.length > 0 && (
            <section className="mt-10">
              <SectionLabel>Research Papers</SectionLabel>
              <div>
                {object.researchPapers.map((paper, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-3">
                    <div className="text-sm text-white/50 font-light">{paper.title}</div>
                    {paper.authors && (
                      <div className="text-xs text-white/20 mt-1 truncate">
                        {paper.authors}
                      </div>
                    )}
                    {(paper.journal || paper.year) && (
                      <div className="text-xs text-white/30 mt-1">
                        {paper.journal}{paper.journal && paper.year ? ' • ' : ''}{paper.year}
                      </div>
                    )}
                    {paper.doi && (
                      <a 
                        href={paper.openAccessUrl || `https://doi.org/${paper.doi}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="block mt-2 text-[11px] text-white/20 hover:text-white/50 transition"
                      >
                        {paper.openAccessUrl ? 'Open Access ↗' : `DOI: ${paper.doi} ↗`}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="pb-16" />
        </div>
      </div>
    </div>
  );
}
