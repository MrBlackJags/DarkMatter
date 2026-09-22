import React from 'react';
import { Calendar, Telescope, Sparkles, ArrowRight, Eye } from 'lucide-react';

export default function DiscoveryTimeline({ objects, onSelectObject }) {
  // Sort objects chronologically
  const timelineObjects = [...objects].sort((a, b) => a.discoveryYear - b.discoveryYear);

  return (
    <div className="space-y-6">
      
      <div className="bg-cosmic-900/60 p-4 rounded-xl border border-slate-800 text-xs font-mono">
        <div className="text-hud-cyan font-bold text-sm flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-hud-cyan" />
          <span>CHRONOLOGICAL DISCOVERY TIMELINE</span>
        </div>
        <p className="text-slate-400 text-[11px] mt-0.5">
          Tracing observational breakthroughs from early orbital surveys to the latest JWST deep-field discoveries.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-10 space-y-8 before:content-[''] before:absolute before:left-3 sm:before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-hud-cyan before:via-hud-violet before:to-hud-emerald">
        {timelineObjects.map((obj, i) => (
          <div key={obj.id} className="relative group">
            
            {/* Timeline Node Dot */}
            <div className="absolute -left-6 sm:-left-10 top-1.5 w-6 h-6 rounded-full bg-cosmic-950 border-2 border-hud-cyan flex items-center justify-center shadow-lg shadow-hud-cyan/30 group-hover:scale-125 transition-transform">
              <span className="w-2 h-2 rounded-full bg-hud-cyan animate-ping"></span>
            </div>

            <div className="hud-bracket-card p-5 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-bold font-mono text-hud-cyan">
                    {obj.discoveryYear}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-slate-100 group-hover:text-hud-cyan cursor-pointer transition" onClick={() => onSelectObject(obj)}>
                      {obj.name}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">{obj.subType}</span>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                  <Telescope className="w-3.5 h-3.5 text-hud-amber" />
                  <span>{obj.discoveryMission}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono mb-3 text-slate-300">
                <div className="p-2 rounded bg-cosmic-950/80 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">DETECTION METHOD</span>
                  <span className="text-hud-amber">{obj.discoveryMethod}</span>
                </div>
                <div className="p-2 rounded bg-cosmic-950/80 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">DISTANCE</span>
                  <span className="text-hud-emerald">
                    {obj.distance.lightTravelTime || obj.distance.lightYears || obj.distance.astronomicalUnits || 'N/A'}
                  </span>
                </div>
                <div className="p-2 rounded bg-cosmic-950/80 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">COORDINATES</span>
                  <span className="text-slate-200">{obj.coordinates.ra}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{obj.keyDiscoveries[0]}"
              </p>

              <div className="pt-3 mt-3 border-t border-slate-800/80 flex justify-end">
                <button 
                  onClick={() => onSelectObject(obj)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-cyan-500/15 hover:bg-cyan-500/30 text-hud-cyan border border-cyan-500/40 text-xs font-mono transition"
                >
                  <span>Open Dossier & Papers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
