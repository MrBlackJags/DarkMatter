import React, { useState, useEffect, useCallback } from 'react';
import { DISCOVERED_OBJECTS } from './data/discoveredObjects';
import { fetchCatalogObjects } from './services/api';

// New minimalist components
import CosmicCanvas from './components/layout/CosmicCanvas';
import Landing from './components/layout/Landing';
import DataCards from './components/catalog/DataCards';
import ObjectDetail from './components/catalog/ObjectDetail';

export default function App() {
  const [objects, setObjects] = useState(() => {
    const saved = localStorage.getItem('darkmatter_catalog_objects');
    return saved ? JSON.parse(saved) : DISCOVERED_OBJECTS;
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
    localStorage.setItem('darkmatter_catalog_objects', JSON.stringify(objects));
  }, [objects]);

  // Smooth transition from landing to explore
  const handleDiscover = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setView('explore');
      setIsTransitioning(false);
    }, 600);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setView('landing');
      setIsTransitioning(false);
    }, 400);
  };

  // Escape key to close detail
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

      {/* Page transition overlay */}
      <div 
        className={`fixed inset-0 z-30 bg-black pointer-events-none transition-opacity ${
          isTransitioning ? 'opacity-100 duration-300' : 'opacity-0 duration-500'
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

      {/* Object detail overlay */}
      <ObjectDetail 
        object={selectedObject}
        onClose={() => setSelectedObject(null)}
      />
    </div>
  );
}
