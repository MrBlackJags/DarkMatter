import React, { useState, useEffect, useCallback } from 'react';
import { DISCOVERED_OBJECTS } from './data/discoveredObjects';
import { fetchCatalogObjects } from './services/api';

// Components
import CosmicCanvas from './components/layout/CosmicCanvas';
import ObservatoryNav from './components/layout/ObservatoryNav';
import Landing from './components/layout/Landing';
import DataCards from './components/catalog/DataCards';
import ObjectDetail from './components/catalog/ObjectDetail';
import SpaceCalculators from './components/observatory/SpaceCalculators';
import OrbitSimulator from './components/observatory/OrbitSimulator';
import DataPipelineDashboard from './components/reference/DataPipelineDashboard';

export default function App() {
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
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['landing', 'explore', 'calculators', 'simulation', 'pipeline'].includes(hash)) {
        return hash;
      }
    } catch (e) {}
    return 'landing';
  };

  const [view, setView] = useState(getInitialView); // 'landing' | 'explore' | 'calculators' | 'simulation' | 'pipeline'
  const [selectedObject, setSelectedObject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync hash changes (browser Back/Forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['landing', 'explore', 'calculators', 'simulation', 'pipeline'].includes(hash)) {
        setView(hash);
      } else if (!hash) {
        setView('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

  // Smooth weightless transition between pages
  const handleNavigate = (targetView) => {
    if (view === targetView) return;
    if (window.location.hash.replace('#', '') !== targetView) {
      window.location.hash = targetView;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setView(targetView);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 350);
  };

  // Keyboard navigation: Escape key closes modal or returns to landing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedObject) {
          setSelectedObject(null);
        } else if (view !== 'landing') {
          handleNavigate('landing');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedObject, view]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Immersive cosmic background canvas */}
      <CosmicCanvas />

      {/* Cinematic weightless transition overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-black pointer-events-none transition-opacity ease-in-out ${
          isTransitioning ? 'opacity-100 duration-300' : 'opacity-0 duration-500'
        }`}
      />

      {/* Persistent Glassmorphic Observatory Header (when viewing content) */}
      {view !== 'landing' && (
        <ObservatoryNav 
          activeView={view} 
          onNavigate={handleNavigate} 
          totalObjects={objects.length} 
        />
      )}

      {/* Views */}
      {view === 'landing' && (
        <Landing 
          onDiscover={() => handleNavigate('explore')} 
          onNavigate={handleNavigate}
        />
      )}

      {view === 'explore' && (
        <DataCards 
          objects={objects}
          onSelectObject={setSelectedObject}
          onBack={() => handleNavigate('landing')}
        />
      )}

      {view === 'calculators' && (
        <main className="relative z-10 min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 transition-opacity duration-700">
          <SpaceCalculators />
        </main>
      )}

      {view === 'simulation' && (
        <main className="relative z-10 min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 transition-opacity duration-700">
          <OrbitSimulator />
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
      />
    </div>
  );
}
