import React, { useState, useEffect, useCallback } from 'react';
import { DISCOVERED_OBJECTS } from './data/discoveredObjects';
import { fetchCatalogObjects } from './services/api';

// Minimalist cosmic components
import CosmicCanvas from './components/layout/CosmicCanvas';
import Landing from './components/layout/Landing';
import DataCards from './components/catalog/DataCards';
import ObjectDetail from './components/catalog/ObjectDetail';

export default function App() {
  const [objects, setObjects] = useState(() => {
    try {
      const saved = localStorage.getItem('darkmatter_catalog_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return DISCOVERED_OBJECTS;
  });

  const [view, setView] = useState('landing'); // 'landing' | 'explore'
  const [selectedObject, setSelectedObject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // Smooth weightless transition from landing to explore
  const handleDiscover = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setView('explore');
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 500);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setView('landing');
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 400);
  };

  // Keyboard navigation: Escape key closes modal or returns to landing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedObject) {
          setSelectedObject(null);
        } else if (view === 'explore') {
          handleBack();
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
          isTransitioning ? 'opacity-100 duration-400' : 'opacity-0 duration-600'
        }`}
      />

      {/* Views */}
      {view === 'landing' && (
        <Landing onDiscover={handleDiscover} />
      )}

      {view === 'explore' && (
        <DataCards 
          objects={objects}
          onSelectObject={setSelectedObject}
          onBack={handleBack}
        />
      )}

      {/* Object detail dossier modal */}
      <ObjectDetail 
        object={selectedObject}
        onClose={() => setSelectedObject(null)}
      />
    </div>
  );
}
