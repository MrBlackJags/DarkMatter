import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle, Telescope } from 'lucide-react';

export default function CustomObjectLogger({ isOpen, onClose, onAddObject }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    class: 'exoplanet',
    subType: 'Terrestrial Habitable-Zone Planet',
    discoveryYear: new Date().getFullYear(),
    discoveryMission: 'James Webb Space Telescope (JWST)',
    discoveryMethod: 'Transit Photometry',
    constellation: 'Cygnus',
    ra: '19h 45m 00s',
    dec: '+42° 15′ 00″',
    distanceText: '120 Light Years',
    mass: '1.2 M⊕',
    radius: '1.1 R⊕',
    keyDiscovery: '',
    paperTitle: '',
    paperDoi: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse approximate RA and Dec degrees
    const raDeg = Math.random() * 360;
    const decDeg = (Math.random() - 0.5) * 160;

    const newObj = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      designation: formData.designation || formData.name,
      class: formData.class,
      subType: formData.subType,
      discoveryYear: parseInt(formData.discoveryYear, 10),
      discoveryMission: formData.discoveryMission,
      discoveryInstrument: 'Observatory Spectrometer Array',
      discoveryMethod: formData.discoveryMethod,
      constellation: formData.constellation,
      coordinates: {
        ra: formData.ra,
        dec: formData.dec,
        raDeg,
        decDeg
      },
      distance: {
        lightYears: formData.distanceText
      },
      physics: {
        mass: formData.mass,
        radius: formData.radius
      },
      spectralBands: {
        radio: 20,
        infrared: 85,
        optical: 60,
        ultraviolet: 20,
        xray: 10,
        gamma: 0,
        gravitational: 0
      },
      keyDiscoveries: [
        formData.keyDiscovery || 'Newly logged celestial discovery awaiting follow-up confirmation spectroscopy.'
      ],
      researchPapers: formData.paperTitle ? [
        {
          title: formData.paperTitle,
          authors: 'Observatory Research Group',
          journal: 'Astrophysical Journal Discovery Letters',
          year: formData.discoveryYear,
          doi: formData.paperDoi || '10.3847/astrodk.2026.01',
          bibcode: '2026ApJ...000..000A',
          openAccessUrl: 'https://arxiv.org/'
        }
      ] : [
        {
          title: `Discovery Report: ${formData.name}`,
          authors: 'Astronomical Community Survey',
          journal: 'Observatory Briefs',
          year: formData.discoveryYear,
          doi: '10.1038/s41550-astro-disc',
          bibcode: '2026Astro...000...01A',
          openAccessUrl: 'https://arxiv.org/'
        }
      ],
      spectralLines: ['Continuum flux calibrated']
    };

    onAddObject(newObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-950/80 backdrop-blur-md overflow-y-auto">
      <div className="hud-bracket-card w-full max-w-2xl bg-cosmic-900 border border-cyan-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 relative my-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-cosmic-950 border border-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs font-mono text-hud-cyan font-bold uppercase mb-1 flex items-center space-x-1.5">
          <Telescope className="w-4 h-4" />
          <span>Astrometric Target Submission</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
          Log New Celestial Discovery
        </h3>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Add newly confirmed exoplanets, high-redshift structures, or astrophysical transients into the observatory archive.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-mono text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 block mb-1">Target Name *</label>
              <input 
                required
                type="text"
                placeholder="e.g. Gliese 12 b"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 rounded bg-cosmic-950 border border-slate-800 text-slate-100 focus:border-hud-cyan focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">Catalog Designation</label>
              <input 
                type="text"
                placeholder="e.g. TOI-6255.01"
                value={formData.designation}
                onChange={e => setFormData({...formData, designation: e.target.value})}
                className="w-full px-3 py-2 rounded bg-cosmic-950 border border-slate-800 text-slate-100 focus:border-hud-cyan focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-300 block mb-1">Celestial Class *</label>
              <select 
                value={formData.class}
                onChange={e => setFormData({...formData, class: e.target.value})}
                className="w-full px-3 py-2 rounded bg-cosmic-950 border border-slate-800 text-slate-100 focus:border-hud-cyan focus:outline-none"
              >
                <option value="exoplanet">Exoplanet</option>
                <option value="blackhole">Black Hole / GW Merger</option>
                <option value="galaxy">Cosmic Dawn Galaxy</option>
                <option value="pulsar">Pulsar / Magnetar / FRB</option>
                <option value="interstellar">Interstellar / KBO</option>
                <option value="supernova">Supernova / Transient</option>
              </select>
            </div>
            <div>
              <label className="text-slate-300 block mb-1">Subtype Specification</label>
              <input 
                type="text"
                placeholder="e.g. Sub-Neptune / Hycean"
                value={formData.subType}
                onChange={e => setFormData({...formData, subType: e.target.value})}
                className="w-full px-3 py-2 rounded bg-cosmic-950 border border-slate-800 text-slate-100 focus:border-hud-cyan focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">Discovery Year *</label>
              <input 
                required
                type="number"
                value={formData.discoveryYear}
                onChange={e => setFormData({...formData, discoveryYear: e.target.value})}
                className="w-full px-3 py-2 rounded bg-cosmic-950 border border-slate-800 text-slate-100 focus:border-hud-cyan focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 block mb-1">Observatory / Mission *</label>
              <input 
                required
                type="text"
                placeholder="e.g. James Webb Space Telescope"
                value={formData.discoveryMission}
                onChange={e => setFormData({...formData, discoveryMission: e.target.value})}
                className="w-full px-3 py-2 rounded bg-cosmic-950 border border-slate-800 text-slate-100 focus:border-hud-cyan focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">Detection Method *</label>
              <input 
                required
                type="text"
                placeholder="e.g. Transit Photometry, Radial Velocity"
                value={formData.discoveryMethod}
                onChange={e => setFormData({...formData, discoveryMethod: e.target.value})}
                className="w-full px-3 py-2 rounded bg-cosmic-950 border border-slate-800 text-slate-100 focus:border-hud-cyan focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-300 block mb-1">RA (Right Ascension)</label>
              <input 
                type="text"
                placeholder="19h 45m 00s"
                value={formData.ra}
                onChange={e => setFormData({...formData, ra: e.target.value})}
                className="w-full px-3 py-2 rounded bg-cosmic-950 border border-slate-800 text-slate-100 focus:border-hud-cyan focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">Dec (Declination)</label>
              <input 
                type="text"
                placeholder="+42° 15′ 00″"
                value={formData.dec}
                onChange={e => setFormData({...formData, dec: e.target.value})}
                className="w-full px-3 py-2 rounded bg-cosmic-950 border border-slate-800 text-slate-100 focus:border-hud-cyan focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">Distance</label>
              <input 
                type="text"
                placeholder="e.g. 40 Light Years"
                value={formData.distanceText}
                onChange={e => setFormData({...formData, distanceText: e.target.value})}
                className="w-full px-3 py-2 rounded bg-cosmic-950 border border-slate-800 text-slate-100 focus:border-hud-cyan focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Primary Scientific Discovery / Findings *</label>
            <textarea 
              required
              rows="3"
              placeholder="Detail the significance of this discovery, atmospheric detections, or physical characteristics..."
              value={formData.keyDiscovery}
              onChange={e => setFormData({...formData, keyDiscovery: e.target.value})}
              className="w-full px-3 py-2 rounded bg-cosmic-950 border border-slate-800 text-slate-100 focus:border-hud-cyan focus:outline-none"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-cosmic-950 border border-slate-800 text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-5 py-2 rounded bg-hud-cyan hover:bg-cyan-400 text-cosmic-950 font-bold shadow-lg shadow-cyan-500/25 transition flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Archive Discovery</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
