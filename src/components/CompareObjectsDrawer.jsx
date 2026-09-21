import React from 'react';
import { X, Scale, Trash2, Eye } from 'lucide-react';

export default function CompareObjectsDrawer({ 
  isOpen, 
  onClose, 
  compareList, 
  onRemove, 
  onClear,
  onSelectObject 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-cosmic-950/70 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-cosmic-950 border-l border-cyan-500/30 h-full overflow-y-auto flex flex-col p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-hud-cyan" />
            <h3 className="text-lg font-bold font-mono text-white">
              COMPARATIVE ASTROPHYSICAL ANALYSIS
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-hud-cyan border border-cyan-800">
              {compareList.length} Selected
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {compareList.length > 0 && (
              <button 
                onClick={onClear}
                className="text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg bg-cosmic-900 border border-slate-800 hover:text-white text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {compareList.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 font-mono text-xs text-slate-400">
            <Scale className="w-12 h-12 text-slate-600 mb-3" />
            <p className="text-sm font-semibold text-slate-200">NO TARGETS IN COMPARISON QUEUE</p>
            <p className="text-slate-500 mt-1 max-w-sm">
              Click the "Compare" button on any object in the catalog to evaluate physical properties side-by-side.
            </p>
          </div>
        ) : (
          <div className="flex-1 py-6 space-y-6">
            
            {/* Comparison Grid Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="p-3 text-slate-500 w-36 uppercase text-[10px]">Parameter</th>
                    {compareList.map(obj => (
                      <th key={obj.id} className="p-3 min-w-[200px]">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-hud-cyan text-sm">{obj.name}</span>
                          <button 
                            onClick={() => onRemove(obj.id)}
                            className="text-slate-500 hover:text-rose-400 text-xs"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal">{obj.subType}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  
                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Discovery Year</td>
                    {compareList.map(obj => (
                      <td key={obj.id} className="p-3 text-hud-emerald font-bold">{obj.discoveryYear}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Discovery Mission</td>
                    {compareList.map(obj => (
                      <td key={obj.id} className="p-3">{obj.discoveryMission}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Detection Method</td>
                    {compareList.map(obj => (
                      <td key={obj.id} className="p-3 text-hud-amber">{obj.discoveryMethod}</td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Coordinates (RA / Dec)</td>
                    {compareList.map(obj => (
                      <td key={obj.id} className="p-3 text-hud-cyan text-[11px]">
                        {obj.coordinates.ra} <br />
                        {obj.coordinates.dec}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Distance / Epoch</td>
                    {compareList.map(obj => (
                      <td key={obj.id} className="p-3">
                        {obj.distance.lightTravelTime || obj.distance.lightYears || obj.distance.astronomicalUnits || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Mass / Magnitude</td>
                    {compareList.map(obj => (
                      <td key={obj.id} className="p-3 text-slate-100">
                        {obj.physics.mass || obj.physics.stellarMass || obj.physics.minimumMass || obj.physics.componentMasses || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Dimensions / Radius</td>
                    {compareList.map(obj => (
                      <td key={obj.id} className="p-3">
                        {obj.physics.radius || obj.physics.schwarzschildRadius || obj.physics.dimensions || obj.physics.intrinsicSize || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Key Spectroscopic Signatures</td>
                    {compareList.map(obj => (
                      <td key={obj.id} className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {obj.spectralLines?.map((l, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-cosmic-900 border border-slate-800 text-[10px] text-slate-300">
                              {l}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-3 text-slate-500 font-semibold">Actions</td>
                    {compareList.map(obj => (
                      <td key={obj.id} className="p-3">
                        <button 
                          onClick={() => {
                            onClose();
                            onSelectObject(obj);
                          }}
                          className="px-3 py-1 rounded bg-cyan-500/20 text-hud-cyan border border-cyan-500/40 hover:bg-cyan-500/40 text-[11px] font-bold transition flex items-center space-x-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect Full Dossier</span>
                        </button>
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
