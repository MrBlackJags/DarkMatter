import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ObjectCatalog from './components/ObjectCatalog';
import SkyCoordinateRadar from './components/SkyCoordinateRadar';
import DiscoveryTimeline from './components/DiscoveryTimeline';
import ObjectDetailModal from './components/ObjectDetailModal';
import CompareObjectsDrawer from './components/CompareObjectsDrawer';
import CustomObjectLogger from './components/CustomObjectLogger';
import { DISCOVERED_OBJECTS } from './data/discoveredObjects';
import { OBSERVATORY_MISSIONS } from './data/observatoryMissions';
import { Telescope, Compass, Radio, Sparkles, Database, ExternalLink, Globe } from 'lucide-react';

export default function App() {
  const [objects, setObjects] = useState(() => {
    const saved = localStorage.getItem('darkmatter_catalog_objects');
    return saved ? JSON.parse(saved) : DISCOVERED_OBJECTS;
  });

  const [selectedObject, setSelectedObject] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('catalog'); // 'catalog', 'radar', 'timeline'
  const [toastMessage, setToastMessage] = useState(null);

  // Sync objects to localStorage
  useEffect(() => {
    localStorage.setItem('darkmatter_catalog_objects', JSON.stringify(objects));
  }, [objects]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleToggleCompare = (obj) => {
    const exists = compareList.some(c => c.id === obj.id);
    if (exists) {
      setCompareList(compareList.filter(c => c.id !== obj.id));
      triggerToast(`Removed ${obj.name} from comparative analysis`);
    } else {
      if (compareList.length >= 4) {
        triggerToast('Maximum 4 targets can be compared simultaneously');
        return;
      }
      setCompareList([...compareList, obj]);
      triggerToast(`Added ${obj.name} to comparative analysis`);
    }
  };

  const handleAddCustomObject = (newObj) => {
    setObjects([newObj, ...objects]);
    triggerToast(`Archived discovery: ${newObj.name} in all-sky catalog`);
  };

  return (
    <div className="min-h-screen bg-cosmic-950 text-slate-100 flex flex-col relative hud-grid-pattern">
      
      {/* NAVBAR */}
      <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        compareList={compareList}
        setIsCompareOpen={setIsCompareOpen}
        setIsLogModalOpen={setIsLogModalOpen}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* HERO OBSERVATORY BANNER */}
      <section className="relative border-b border-cyan-500/20 bg-cosmic-950/70 overflow-hidden py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-hud-cyan text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-hud-emerald animate-ping"></span>
                <span>DEEP SKY OBSERVATORY HUD & DISCOVERY ARCHIVE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
                Cataloging the Discovered Cosmos. <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-hud-cyan via-indigo-300 to-hud-violet">
                  From Habitable Worlds to Cosmic Dawn.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed">
                Empirical research dossiers, astrometric J2000 coordinates, physical properties, and peer-reviewed discovery publications for confirmed celestial objects across space and time.
              </p>
            </div>

            {/* Quick Observatory Telemetry Metrics */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs w-full lg:w-auto">
              <div className="hud-bracket-card p-3 rounded-lg bg-cosmic-900/90 border border-slate-800">
                <div className="text-[10px] text-slate-500">DEEPEST GALAXY</div>
                <div className="text-sm font-bold text-hud-amber mt-0.5">JADES-GS-z14-0</div>
                <div className="text-[10px] text-slate-400">z = 14.32 (290M yr Big Bang)</div>
              </div>

              <div className="hud-bracket-card p-3 rounded-lg bg-cosmic-900/90 border border-slate-800">
                <div className="text-[10px] text-slate-500">NEAREST EXOPLANET</div>
                <div className="text-sm font-bold text-hud-cyan mt-0.5">Proxima Cen b</div>
                <div className="text-[10px] text-slate-400">4.24 light-years (HZ)</div>
              </div>

              <div className="hud-bracket-card p-3 rounded-lg bg-cosmic-900/90 border border-slate-800">
                <div className="text-[10px] text-slate-500">LARGEST SINGULARITY</div>
                <div className="text-sm font-bold text-hud-violet mt-0.5">M87* Black Hole</div>
                <div className="text-[10px] text-slate-400">6.5 Billion M☉</div>
              </div>

              <div className="hud-bracket-card p-3 rounded-lg bg-cosmic-900/90 border border-slate-800">
                <div className="text-[10px] text-slate-500">TOTAL DISCOVERIES</div>
                <div className="text-sm font-bold text-hud-emerald mt-0.5">{objects.length} Objects</div>
                <div className="text-[10px] text-slate-400">Verified & Referenced</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* MAIN VIEWPORT CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeView === 'catalog' && (
          <ObjectCatalog 
            objects={objects}
            onSelectObject={setSelectedObject}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
            searchQuery={searchQuery}
          />
        )}

        {activeView === 'radar' && (
          <SkyCoordinateRadar 
            objects={objects}
            onSelectObject={setSelectedObject}
          />
        )}

        {activeView === 'timeline' && (
          <DiscoveryTimeline 
            objects={objects}
            onSelectObject={setSelectedObject}
          />
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-cosmic-950 py-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">DARKMATTER OBSERVATORY</span>
            <span>•</span>
            <span>All-Sky Astronomical Discovery Engine</span>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <a href="https://webb.nasa.gov/" target="_blank" rel="noreferrer" className="hover:text-hud-cyan transition flex items-center space-x-1">
              <span>NASA JWST</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://eventhorizontelescope.org/" target="_blank" rel="noreferrer" className="hover:text-hud-cyan transition flex items-center space-x-1">
              <span>EHT Collaboration</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noreferrer" className="hover:text-hud-cyan transition flex items-center space-x-1">
              <span>NASA Exoplanet Archive</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            Data sourced under NASA, ESA & Caltech Open Science Policy.
          </div>
        </div>
      </footer>

      {/* MODAL 1: OBJECT DETAIL DOSSIER */}
      <ObjectDetailModal 
        object={selectedObject}
        onClose={() => setSelectedObject(null)}
        onToggleCompare={handleToggleCompare}
        isCompared={selectedObject ? compareList.some(c => c.id === selectedObject.id) : false}
      />

      {/* MODAL 2: COMPARATIVE ANALYSIS DRAWER */}
      <CompareObjectsDrawer 
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        onRemove={(id) => setCompareList(compareList.filter(c => c.id !== id))}
        onClear={() => setCompareList([])}
        onSelectObject={setSelectedObject}
      />

      {/* MODAL 3: LOG CUSTOM CELESTIAL DISCOVERY */}
      <CustomObjectLogger 
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onAddObject={handleAddCustomObject}
      />

      {/* FLOATING TOAST FEEDBACK */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-cosmic-900 border border-hud-cyan/50 text-hud-cyan font-mono text-xs shadow-2xl flex items-center space-x-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-hud-cyan"></span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
