import React, { useState, useEffect, useCallback } from 'react';
import {
  Navbar,
  HeroLanding,
  InteractiveStarfield,
  ObjectCatalog,
  ObjectDetailModal,
  CompareObjectsDrawer,
  CustomObjectLogger,
  SkyCoordinateRadar,
  DiscoveryTimeline,
  OrbitSimulator,
  SpaceCalculators,
  DataDictionaryBar,
  DataPipelineDashboard
} from './components';
import { DISCOVERED_OBJECTS } from './data/discoveredObjects';
import { fetchCatalogObjects, createCatalogObject } from './services/api';
import { 
  Telescope, 
  Compass, 
  Radio, 
  Sparkles, 
  Database, 
  ExternalLink, 
  Globe, 
  Calculator, 
  Orbit, 
  Server, 
  BookOpen, 
  Scale, 
  PlusCircle, 
  ArrowUp
} from 'lucide-react';

export default function App() {
  const [objects, setObjects] = useState(() => {
    const saved = localStorage.getItem('darkmatter_catalog_objects');
    return saved ? JSON.parse(saved) : DISCOVERED_OBJECTS;
  });

  const [selectedObject, setSelectedObject] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('home'); // 'home', 'catalog', 'radar', 'timeline', 'calculators', 'simulator', 'pipeline'
  const [toastMessage, setToastMessage] = useState(null);
  const [dataSource, setDataSource] = useState('initializing');
  const [selectedCatalogClass, setSelectedCatalogClass] = useState('all');
  const [nebulaTheme, setNebulaTheme] = useState(() => {
    return localStorage.getItem('darkmatter_nebula_theme') || 'carina';
  });
  const [nebulaIntensity, setNebulaIntensity] = useState(() => {
    return localStorage.getItem('darkmatter_nebula_intensity') || 'vibrant';
  });

  const handleNebulaThemeChange = (newTheme) => {
    setNebulaTheme(newTheme);
    localStorage.setItem('darkmatter_nebula_theme', newTheme);
    triggerToast(`Nebula atmosphere configured: ${newTheme.toUpperCase()}`);
  };

  const handleNebulaIntensityChange = (newIntensity) => {
    setNebulaIntensity(newIntensity);
    localStorage.setItem('darkmatter_nebula_intensity', newIntensity);
    triggerToast(`Nebula ionization density: ${newIntensity.toUpperCase()}`);
  };

  // Load objects from backend API with fallback
  const refreshCatalog = useCallback(async () => {
    try {
      const res = await fetchCatalogObjects();
      if (res && res.objects && res.objects.length > 0) {
        setObjects(res.objects);
        setDataSource(res.source);
      }
    } catch (err) {
      console.warn('API sync warning:', err);
    }
  }, []);

  useEffect(() => {
    refreshCatalog();
  }, [refreshCatalog]);

  // Sync objects to localStorage
  useEffect(() => {
    localStorage.setItem('darkmatter_catalog_objects', JSON.stringify(objects));
  }, [objects]);

  // Keyboard shortcut listener (Alt+D or Shift+D for dictionary)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid triggering when focused on input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }
      if ((e.altKey && (e.key === 'd' || e.key === 'D')) || (e.shiftKey && (e.key === 'D' || e.key === 'd'))) {
        e.preventDefault();
        setIsDictionaryOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsDictionaryOpen(false);
        setIsCompareOpen(false);
        setIsLogModalOpen(false);
        setSelectedObject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const handleAddCustomObject = async (newObj) => {
    try {
      await createCatalogObject(newObj);
      setObjects(prev => [newObj, ...prev]);
      triggerToast(`Archived discovery: ${newObj.name} in all-sky catalog`);
    } catch (e) {
      setObjects(prev => [newObj, ...prev]);
      triggerToast(`Archived discovery: ${newObj.name}`);
    }
  };

  const handleFilterCatalogFromDictionary = (cls) => {
    setActiveView('catalog');
    setSelectedCatalogClass(cls || 'all');
    triggerToast(`Filtering catalog by classification: ${cls?.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col relative space-dot-pattern selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* INTERACTIVE DEEP SPACE & NEBULAE UNIVERSE CANVAS */}
      <InteractiveStarfield theme={nebulaTheme} intensity={nebulaIntensity} />

      {/* NAVBAR */}
      <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        compareList={compareList}
        setIsCompareOpen={setIsCompareOpen}
        setIsLogModalOpen={setIsLogModalOpen}
        setIsDictionaryOpen={setIsDictionaryOpen}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* MAIN VIEWPORT CONTENT */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 z-10">
        
        {activeView === 'home' && (
          <HeroLanding 
            objects={objects}
            onSelectObject={setSelectedObject}
            onNavigate={setActiveView}
            onOpenDictionary={() => setIsDictionaryOpen(true)}
            onFilterByClass={handleFilterCatalogFromDictionary}
            nebulaTheme={nebulaTheme}
            onNebulaThemeChange={handleNebulaThemeChange}
            nebulaIntensity={nebulaIntensity}
            onNebulaIntensityChange={handleNebulaIntensityChange}
          />
        )}
        
        {activeView === 'catalog' && (
          <ObjectCatalog 
            objects={objects}
            onSelectObject={setSelectedObject}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
            searchQuery={searchQuery}
            initialClass={selectedCatalogClass}
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

        {activeView === 'calculators' && (
          <SpaceCalculators />
        )}

        {activeView === 'simulator' && (
          <OrbitSimulator />
        )}

        {activeView === 'pipeline' && (
          <DataPipelineDashboard 
            onRefreshCatalog={refreshCatalog}
            totalObjects={objects.length}
          />
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-black/95 py-8 text-xs font-mono text-slate-500 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">DARKMATTER OBSERVATORY</span>
            <span>•</span>
            <span>Deep Space Discovery & Astrodynamics Engine</span>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <a href="https://webb.nasa.gov/" target="_blank" rel="noreferrer" className="hover:text-hud-cyan transition flex items-center space-x-1">
              <span>NASA JWST</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://eventhorizontelescope.org/" target="_blank" rel="noreferrer" className="hover:text-hud-cyan transition flex items-center space-x-1">
              <span>EHT</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noreferrer" className="hover:text-hud-cyan transition flex items-center space-x-1">
              <span>Exoplanet Archive</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://ui.adsabs.harvard.edu/" target="_blank" rel="noreferrer" className="hover:text-hud-cyan transition flex items-center space-x-1">
              <span>NASA ADS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            Data sourced under NASA, ESA & Caltech Open Science Policy.
          </div>
        </div>
      </footer>

      {/* PERSISTENT FLOATING QUICK DOCK (Right Edge) */}
      <div className="fixed right-3 bottom-6 z-40 flex flex-col items-center space-y-2 font-mono">
        <button
          onClick={() => setIsDictionaryOpen(true)}
          className="p-2.5 rounded-xl bg-black/90 border border-cyan-500/50 hover:border-hud-cyan text-hud-cyan shadow-xl shadow-cyan-500/20 hover:scale-105 transition group relative"
          title="Open Data Dictionary (Alt+D)"
        >
          <BookOpen className="w-4 h-4" />
          <span className="absolute right-full mr-2 px-2 py-1 rounded bg-black border border-slate-800 text-[10px] text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Data Dictionary (Alt+D)
          </span>
        </button>

        <button
          onClick={() => setIsCompareOpen(true)}
          className="p-2.5 rounded-xl bg-black/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white shadow-xl hover:scale-105 transition group relative"
          title="Comparative Analysis"
        >
          <Scale className="w-4 h-4" />
          {compareList.length > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-hud-cyan text-black font-bold text-[8px] flex items-center justify-center">
              {compareList.length}
            </span>
          )}
          <span className="absolute right-full mr-2 px-2 py-1 rounded bg-black border border-slate-800 text-[10px] text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Compare ({compareList.length})
          </span>
        </button>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-2 rounded-lg bg-black/80 border border-slate-900 text-slate-500 hover:text-slate-300 transition"
          title="Scroll to Top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SEPARATE BAR: ASTRONOMICAL DATA DICTIONARY */}
      <DataDictionaryBar 
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
        onFilterCatalogByClass={handleFilterCatalogFromDictionary}
      />

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
        <div className="fixed bottom-6 left-6 z-50 px-4 py-2.5 rounded-lg bg-black/95 border border-hud-cyan/50 text-hud-cyan font-mono text-xs shadow-2xl flex items-center space-x-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-hud-cyan"></span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
