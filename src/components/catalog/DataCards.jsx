import React, { useState, useEffect } from 'react';

export default function DataCards({ objects = [], onSelectObject, onBack }) {
  const [activeTab, setActiveTab] = useState('stars');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const filteredObjects = objects.filter(obj => {
    if (activeTab === 'stars') return ['galaxy', 'pulsar', 'supernova'].includes(obj.class);
    if (activeTab === 'blackholes') return obj.class === 'blackhole';
    if (activeTab === 'planets') return ['exoplanet', 'interstellar'].includes(obj.class);
    return false;
  });

  const getStat = (obj) => {
    const { class: objClass, physics = {}, distance = {}, discoveryMission } = obj;
    if (objClass === 'exoplanet' || objClass === 'interstellar') {
      if (physics.equilibriumTemp) return { value: physics.equilibriumTemp, label: 'Equilibrium Temp' };
      if (physics.orbitalPeriod) return { value: physics.orbitalPeriod, label: 'Orbital Period' };
      if (distance.lightYears) return { value: distance.lightYears, label: 'Distance (LY)' };
    } else if (objClass === 'blackhole') {
      if (physics.mass) return { value: physics.mass, label: 'Mass' };
      if (physics.schwarzschildRadius) return { value: physics.schwarzschildRadius, label: 'Schwarzschild Radius' };
    } else if (objClass === 'galaxy') {
      if (distance.lightTravelTime) return { value: distance.lightTravelTime, label: 'Light Travel Time' };
      if (distance.redshift) return { value: `z = ${distance.redshift}`, label: 'Redshift' };
    }
    
    if (distance.lightYears) return { value: distance.lightYears, label: 'Distance (LY)' };
    if (discoveryMission) return { value: discoveryMission, label: 'Discovery Mission' };
    
    return { value: 'N/A', label: 'Data Unavailable' };
  };

  const getDotColor = (objClass) => {
    if (['galaxy', 'pulsar', 'supernova'].includes(objClass)) return 'bg-orange-400/60';
    if (objClass === 'blackhole') return 'bg-blue-400/60';
    if (['exoplanet', 'interstellar'].includes(objClass)) return 'bg-emerald-400/60';
    return 'bg-white/40';
  };

  const getTabTitle = () => {
    if (activeTab === 'stars') return 'Stars & Galaxies';
    if (activeTab === 'blackholes') return 'Black Holes';
    if (activeTab === 'planets') return 'Planets';
    return '';
  };

  return (
    <section className="min-h-screen w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10">
      {/* HEADER BAR */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        <button 
          onClick={onBack} 
          className="flex items-center text-white/50 hover:text-white/80 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
          <span className="text-sm font-light">Darkmatter</span>
        </button>
        <div className="text-sm font-light text-white/80">
          {getTabTitle()}
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex justify-center items-center gap-2 sm:gap-4 mb-8 flex-wrap">
        {[
          { id: 'stars', label: 'Stars & Galaxies' },
          { id: 'blackholes', label: 'Black Holes' },
          { id: 'planets', label: 'Planets' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-sm px-6 py-2 rounded-full cursor-pointer transition-all duration-300 ${
              activeTab === tab.id 
                ? 'text-white bg-white/8 border border-white/15' 
                : 'text-white/40 hover:text-white/60 border border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OBJECT CARDS OR EMPTY STATE */}
      {filteredObjects.length === 0 ? (
        <div className="text-center mt-20 text-white/20 font-light">
          No objects found in this category
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredObjects.map((obj, index) => {
            const stat = getStat(obj);
            
            return (
              <div
                key={obj.id}
                onClick={() => onSelectObject && onSelectObject(obj)}
                className={`
                  p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm
                  hover:scale-[1.02] hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-black/20
                  transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between h-full
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full ${getDotColor(obj.class)}`} />
                    <span className="text-[11px] text-white/30 uppercase tracking-wider">
                      {obj.subType || obj.class}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-light text-white mt-3">
                    {obj.name || obj.designation}
                  </h3>
                  
                  <div className="text-xs text-white/25 mt-1">
                    {obj.discoveryYear} · {obj.constellation}
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-2xl font-extralight text-white/80">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-white/20 uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                  
                  {obj.keyDiscoveries && obj.keyDiscoveries.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/5 text-xs text-white/30 leading-relaxed line-clamp-2">
                      {obj.keyDiscoveries[0]}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 flex justify-between items-center">
                  <div className="text-[11px] text-white/20">
                    {obj.distance?.lightYears ? `${obj.distance.lightYears} LY away` : ''}
                  </div>
                  <div 
                    className="text-[11px] text-white/30 hover:text-white/60 transition flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectObject) onSelectObject(obj);
                    }}
                  >
                    View 
                    <span className="text-[10px]">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
