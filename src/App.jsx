import React, { useState, useEffect, useCallback } from 'react';
import { DISCOVERED_OBJECTS } from './data/discoveredObjects';
import { fetchCatalogObjects, createCatalogObject } from './services/api';

// Components
import CosmicCanvas from './components/layout/CosmicCanvas';
import ObservatoryNav from './components/layout/ObservatoryNav';
import Landing from './components/layout/Landing';
import DataCards from './components/catalog/DataCards';
import ObjectDetail from './components/catalog/ObjectDetail';
import CompareObjectsDrawer from './components/catalog/CompareObjectsDrawer';
import CustomObjectLogger from './components/catalog/CustomObjectLogger';
import SpaceCalculators from './components/observatory/SpaceCalculators';
import OrbitSimulator from './components/observatory/OrbitSimulator';
import DataPipelineDashboard from './components/reference/DataPipelineDashboard';
import DataDictionaryBar from './components/reference/DataDictionaryBar';
import CosmicLoadingScreen from './components/layout/CosmicLoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [objects, setObjects] = useState(() => {
    try {
      const saved = localStorage.getItem('darkmatter_catalog_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= DISCOVERED_OBJECTS.length) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return DISCOVERED_OBJECTS;
  });

  const getInitialView = () => {
    try {
      const fullHash = window.location.hash.replace('#', '').toLowerCase();
      const baseHash = fullHash.split('?')[0];
      if (['landing', 'explore', 'calculators', 'simulation', 'pipeline'].includes(baseHash)) {
        return baseHash;
      }
    } catch (e) {}
    return 'landing';
  };

  const [view, setView] = useState(getInitialView); // 'landing' | 'explore' | 'calculators' | 'simulation' | 'pipeline'
  const [selectedObject, setSelectedObject] = useState(null);
  const [simulationStar, setSimulationStar] = useState(null);

  // New research tools states
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);

  // Sync hash changes (browser Back/Forward) & deep link queries
  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '');
      const [hashView, queryString] = fullHash.split('?');
      const v = hashView ? hashView.toLowerCase() : 'landing';
      if (['landing', 'explore', 'calculators', 'simulation', 'pipeline'].includes(v)) {
        setView(v);
      } else if (!hashView) {
        setView('landing');
      }

      if (queryString) {
        const params = new URLSearchParams(queryString);
        const objId = params.get('id');
        if (objId && objects.length > 0) {
          const found = objects.find(o => o.id === objId);
          if (found) setSelectedObject(found);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [objects]);

  // Load objects from backend API with fallback
  const refreshCatalog = useCallback(async () => {
    try {
      const res = await fetchCatalogObjects();
      if (res && res.objects && res.objects.length > 0) {
        setObjects(res.objects);
      }
    } catch (err) {
      console.warn('API sync:', err.message);
    }
  }, []);

  useEffect(() => {
    refreshCatalog();
  }, [refreshCatalog]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('darkmatter_catalog_v2', JSON.stringify(objects));
    } catch (e) {}
  }, [objects]);

  // Compare handlers
  const handleToggleCompare = (obj) => {
    setCompareList(prev => {
      const exists = prev.some(item => item.id === obj.id);
      if (exists) {
        return prev.filter(item => item.id !== obj.id);
      } else {
        if (prev.length >= 4) {
          alert('Comparison queue maximum reached (up to 4 celestial objects).');
          return prev;
        }
        return [...prev, obj];
      }
    });
  };

  const handleRemoveCompare = (id) => {
    setCompareList(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // Custom Object Logger handler
  const handleAddCustomObject = async (newObj) => {
    setObjects(prev => [newObj, ...prev]);
    try {
      await createCatalogObject(newObj);
    } catch (err) {
      console.warn('Failed saving candidate to backend:', err);
    }
  };

  // Instant snappy navigation between pages
  const handleNavigate = (targetView) => {
    if (view === targetView) return;
    if (window.location.hash.replace('#', '') !== targetView) {
      window.location.hash = targetView;
    }
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation: Escape key closes modal or returns to landing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedObject) {
          setSelectedObject(null);
        } else if (isCompareOpen) {
          setIsCompareOpen(false);
        } else if (isDictionaryOpen) {
          setIsDictionaryOpen(false);
        } else if (isLoggerOpen) {
          setIsLoggerOpen(false);
        } else if (view !== 'landing') {
          handleNavigate('landing');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedObject, isCompareOpen, isDictionaryOpen, isLoggerOpen, view]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Sci-Fi Observatory Loading Screen */}
      {isLoading && (
        <CosmicLoadingScreen 
          onComplete={() => setIsLoading(false)} 
          minDuration={1400} 
        />
      )}

      {/* Immersive cosmic background canvas (ONLY on landing view to guarantee zero scroll lag when browsing) */}
      {view === 'landing' && <CosmicCanvas />}

      {/* Persistent Glassmorphic Observatory Header (when viewing content) */}
      {view !== 'landing' && (
        <ObservatoryNav 
          activeView={view} 
          onNavigate={handleNavigate} 
          totalObjects={objects.length} 
          compareCount={compareList.length}
          onOpenCompare={() => setIsCompareOpen(true)}
          onOpenDictionary={() => setIsDictionaryOpen(true)}
        />
      )}

      {/* Views */}
      {view === 'landing' && (
        <Landing 
          onDiscover={() => handleNavigate('explore')} 
        />
      )}

      {view === 'explore' && (
        <DataCards 
          objects={objects}
          onSelectObject={setSelectedObject}
          onBack={() => handleNavigate('landing')}
          onNavigateToSimulator={(star) => {
            setSimulationStar(star);
            handleNavigate('simulation');
          }}
          compareList={compareList}
          onToggleCompare={handleToggleCompare}
          onOpenCompare={() => setIsCompareOpen(true)}
          onOpenLogger={() => setIsLoggerOpen(true)}
          onOpenDictionary={() => setIsDictionaryOpen(true)}
        />
      )}

      {view === 'calculators' && (
        <main className="relative z-10 min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 transition-opacity duration-700">
          <SpaceCalculators 
            onLaunchInSimulator={(simConfig) => {
              setSimulationStar(simConfig);
              handleNavigate('simulation');
            }}
          />
        </main>
      )}

      {view === 'simulation' && (
        <main className="relative z-10 min-h-screen w-full px-2 sm:px-4 lg:px-6 pt-16 pb-6 transition-opacity duration-700">
          <OrbitSimulator initialStar={simulationStar} />
        </main>
      )}

      {view === 'pipeline' && (
        <main className="relative z-10 min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 transition-opacity duration-700">
          <DataPipelineDashboard 
            onRefreshCatalog={refreshCatalog} 
            totalObjects={objects.length} 
          />
        </main>
      )}

      {/* Object detail dossier modal */}
      <ObjectDetail 
        object={selectedObject}
        onClose={() => setSelectedObject(null)}
        onSimulate={(star) => {
          setSimulationStar(star);
          handleNavigate('simulation');
        }}
        onCompare={handleToggleCompare}
        isCompared={selectedObject ? compareList.some(c => c.id === selectedObject.id) : false}
        onOpenCalculators={() => handleNavigate('calculators')}
      />

      {/* Comparative Analysis Drawer */}
      <CompareObjectsDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        onRemove={handleRemoveCompare}
        onClear={handleClearCompare}
        onSelectObject={(obj) => {
          setIsCompareOpen(false);
          setSelectedObject(obj);
        }}
      />

      {/* Custom Discovery Candidate Logger Modal */}
      <CustomObjectLogger
        isOpen={isLoggerOpen}
        onClose={() => setIsLoggerOpen(false)}
        onAddObject={handleAddCustomObject}
      />

      {/* Astronomical Glossary / Data Dictionary Drawer */}
      <DataDictionaryBar
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
        onFilterCatalogByClass={(cls) => {
          setIsDictionaryOpen(false);
          handleNavigate('explore');
        }}
      />
    </div>
  );
}
