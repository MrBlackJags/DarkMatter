import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Orbit, 
  Compass, 
  Zap, 
  Rocket, 
  Globe, 
  Clock, 
  Layers, 
  Bookmark, 
  Save, 
  History, 
  CheckCircle, 
  HelpCircle, 
  Copy, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { saveCalculationRecord, fetchCalculationHistory } from '../../services/api';

// Universal Constants
const G = 6.67430e-11; // m^3 kg^-1 s^-2
const c = 299792458; // m/s
const hbar = 1.054571817e-34; // J s
const kB = 1.380649e-23; // J/K
const M_sun = 1.98847e30; // kg
const M_earth = 5.9722e24; // kg
const R_earth = 6.371e6; // m
const R_sun = 6.9634e8; // m
const AU = 1.495978707e11; // m
const H0 = 70.0; // km/s/Mpc

const CELESTIAL_PRESETS = [
  { name: 'Earth', mass: 5.9722e24, radius: 6371000, density: 5515 },
  { name: 'Moon', mass: 7.342e22, radius: 1737400, density: 3344 },
  { name: 'Mars', mass: 6.4171e23, radius: 3389500, density: 3933 },
  { name: 'Jupiter', mass: 1.8982e27, radius: 69911000, density: 1326 },
  { name: 'Sun', mass: 1.98847e30, radius: 696340000, density: 1408 },
  { name: 'Sagittarius A*', mass: 4.154e6 * 1.98847e30, radius: 12.3e9, density: 1e9 },
  { name: 'M87* Black Hole', mass: 6.5e9 * 1.98847e30, radius: 1.92e13, density: 1e9 }
];

export default function SpaceCalculators({ onLaunchInSimulator }) {
  const [activeCategory, setActiveCategory] = useState('orbital'); // 'orbital', 'blackholes', 'exoplanets', 'relativity'
  const [selectedPreset, setSelectedPreset] = useState('');
  const [historyList, setHistoryList] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Load calculation history
  useEffect(() => {
    fetchCalculationHistory().then(data => {
      if (Array.isArray(data)) setHistoryList(data);
    });
  }, []);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveCalculation = async (category, calculatorId, calculatorName, inputs, outputs) => {
    try {
      const record = { category, calculatorId, calculatorName, inputs, outputs };
      await saveCalculationRecord(record);
      setHistoryList(prev => [record, ...prev]);
      notify(`Saved ${calculatorName} calculation to observatory database`);
    } catch (e) {
      notify('Saved locally');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER BANNER */}
      <div className="bg-cosmic-900/80 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-md relative overflow-hidden">
        <div className="hud-scanline"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-hud-cyan mb-1">
              <Calculator className="w-4 h-4" />
              <span>ASTRODYNAMICS & ASTROPHYSICAL COMPUTATION SUITE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Space Research & Celestial Mechanics Calculators
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-sans mt-1 max-w-2xl">
              High-precision scientific calculators for orbital velocity, escape trajectories, Hohmann transfers, relativistic time dilation, Schwarzschild event horizons, and exoplanet habitability.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="px-3.5 py-2 rounded-lg bg-cosmic-950 border border-slate-800 hover:border-cyan-500 text-xs font-mono text-slate-300 hover:text-hud-cyan transition flex items-center space-x-2"
            >
              <History className="w-4 h-4 text-hud-cyan" />
              <span>Calculation History ({historyList.length})</span>
            </button>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveCategory('orbital')}
            className={`px-3.5 py-2 rounded-lg transition border flex items-center space-x-2 ${
              activeCategory === 'orbital'
                ? 'bg-hud-cyan/20 border-hud-cyan text-hud-cyan font-bold shadow-sm shadow-hud-cyan/20'
                : 'bg-cosmic-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Orbit className="w-4 h-4" />
            <span>Orbital Mechanics & Trajectories</span>
          </button>

          <button
            onClick={() => setActiveCategory('blackholes')}
            className={`px-3.5 py-2 rounded-lg transition border flex items-center space-x-2 ${
              activeCategory === 'blackholes'
                ? 'bg-hud-violet/20 border-hud-violet text-hud-violet font-bold shadow-sm shadow-hud-violet/20'
                : 'bg-cosmic-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Black Holes & Relativity</span>
          </button>

          <button
            onClick={() => setActiveCategory('exoplanets')}
            className={`px-3.5 py-2 rounded-lg transition border flex items-center space-x-2 ${
              activeCategory === 'exoplanets'
                ? 'bg-hud-emerald/20 border-hud-emerald text-hud-emerald font-bold shadow-sm shadow-hud-emerald/20'
                : 'bg-cosmic-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Exoplanets & Habitability</span>
          </button>

          <button
            onClick={() => setActiveCategory('relativity')}
            className={`px-3.5 py-2 rounded-lg transition border flex items-center space-x-2 ${
              activeCategory === 'relativity'
                ? 'bg-hud-amber/20 border-hud-amber text-hud-amber font-bold shadow-sm shadow-hud-amber/20'
                : 'bg-cosmic-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>Cosmology & Rocket Propulsion</span>
          </button>
        </div>
      </div>

      {/* CALCULATOR PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeCategory === 'orbital' && (
          <>
            <OrbitalVelocityCalculator onSave={handleSaveCalculation} onLaunchInSimulator={onLaunchInSimulator} />
            <HohmannTransferCalculator onSave={handleSaveCalculation} onLaunchInSimulator={onLaunchInSimulator} />
            <EscapeVelocityCalculator onSave={handleSaveCalculation} onLaunchInSimulator={onLaunchInSimulator} />
            <RocheHillSphereCalculator onSave={handleSaveCalculation} />
          </>
        )}

        {activeCategory === 'blackholes' && (
          <>
            <SchwarzschildCalculator onSave={handleSaveCalculation} />
            <GravitationalTimeDilationCalculator onSave={handleSaveCalculation} />
            <HawkingRadiationCalculator onSave={handleSaveCalculation} />
            <GravitationalRedshiftCalculator onSave={handleSaveCalculation} />
          </>
        )}

        {activeCategory === 'exoplanets' && (
          <>
            <ExoplanetTransitCalculator onSave={handleSaveCalculation} />
            <HabitableZoneCalculator onSave={handleSaveCalculation} />
            <EarthSimilarityIndexCalculator onSave={handleSaveCalculation} />
            <PlanetSurfaceGravityCalculator onSave={handleSaveCalculation} />
          </>
        )}

        {activeCategory === 'relativity' && (
          <>
            <TsiolkovskyRocketCalculator onSave={handleSaveCalculation} />
            <LorentzRelativityCalculator onSave={handleSaveCalculation} />
            <CosmologicalRedshiftCalculator onSave={handleSaveCalculation} />
            <InterstellarTravelTimeCalculator onSave={handleSaveCalculation} />
          </>
        )}
      </div>

      {/* CALCULATION HISTORY DRAWER */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-cosmic-950/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-cosmic-950 border-l border-cyan-500/30 h-full overflow-y-auto flex flex-col p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <History className="w-5 h-5 text-hud-cyan" />
                <h3 className="text-base font-bold font-mono text-white">CALCULATION LOGS & HISTORY</h3>
              </div>
              <button 
                onClick={() => setIsHistoryOpen(false)}
                className="p-1.5 rounded-lg bg-cosmic-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 py-4 space-y-3 overflow-y-auto">
              {historyList.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-mono text-xs">
                  No calculations logged yet. Use the "Log Result" button on any calculator.
                </div>
              ) : (
                historyList.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-cosmic-900/90 border border-slate-800 text-xs font-mono space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-hud-cyan font-bold">{item.calculatorName}</span>
                      <span className="text-[10px] text-slate-500">{item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Recent'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800/80">
                      <div>
                        <span className="text-slate-500 block text-[10px]">INPUTS</span>
                        {Object.entries(item.inputs || {}).map(([k, v]) => (
                          <div key={k} className="text-slate-300 truncate">{k}: <strong className="text-slate-100">{String(v)}</strong></div>
                        ))}
                      </div>
                      <div>
                        <span className="text-hud-emerald block text-[10px]">OUTPUT RESULTS</span>
                        {Object.entries(item.outputs || {}).map(([k, v]) => (
                          <div key={k} className="text-slate-300 truncate">{k}: <strong className="text-hud-emerald">{String(v)}</strong></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-cosmic-900 border border-hud-cyan/50 text-hud-cyan font-mono text-xs shadow-2xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-hud-emerald" />
          <span>{toast}</span>
        </div>
      )}

    </div>
  );
}

// ----------------------------------------------------
// 1. KEPLERIAN ORBITAL VELOCITY & PERIOD CALCULATOR
function OrbitalVelocityCalculator({ onSave, onLaunchInSimulator }) {
  const [massExp, setMassExp] = useState(24);
  const [massVal, setMassVal] = useState(5.972); // 5.972e24 (Earth)
  const [altitudeKm, setAltitudeKm] = useState(400); // 400 km (ISS orbit)
  const [radiusKm, setRadiusKm] = useState(6371); // Earth radius

  const totalRadiusM = (Number(radiusKm) + Number(altitudeKm)) * 1000;
  const centralMassKg = Number(massVal) * Math.pow(10, Number(massExp));

  // v = sqrt(GM / r)
  const velocityMs = Math.sqrt((G * centralMassKg) / totalRadiusM);
  const velocityKms = velocityMs / 1000;

  // Period T = 2 * pi * sqrt(r^3 / GM)
  const periodSeconds = 2 * Math.PI * Math.sqrt(Math.pow(totalRadiusM, 3) / (G * centralMassKg));
  const periodMinutes = periodSeconds / 60;
  const periodHours = periodMinutes / 60;

  const loadBody = (body) => {
    setMassVal(Number((body.mass / Math.pow(10, Math.floor(Math.log10(body.mass)))).toFixed(3)));
    setMassExp(Math.floor(Math.log10(body.mass)));
    setRadiusKm(Math.round(body.radius / 1000));
  };

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Orbit className="w-4 h-4 text-hud-cyan" />
          <h3 className="font-mono text-sm font-bold text-white">Orbital Velocity & Period (Kepler)</h3>
        </div>
        <button 
          onClick={() => onSave('Orbital Mechanics', 'kepler_orbit', 'Keplerian Orbital Velocity & Period', {
            'Central Mass': `${massVal}e${massExp} kg`,
            'Orbit Altitude': `${altitudeKm} km`,
            'Body Radius': `${radiusKm} km`
          }, {
            'Orbital Speed': `${velocityKms.toFixed(2)} km/s`,
            'Orbital Period': `${periodMinutes.toFixed(1)} min (${periodHours.toFixed(2)} h)`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
          title="Log to database"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 bg-cosmic-950 p-2 rounded border border-slate-800">
        Formula: <span className="text-hud-cyan">v = √(GM / r)</span> &bull; <span className="text-hud-cyan">T = 2π√(r³ / GM)</span>
      </div>

      {/* Body Presets */}
      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] font-mono text-slate-500">Presets:</span>
        {CELESTIAL_PRESETS.slice(0, 5).map(b => (
          <button
            key={b.name}
            onClick={() => loadBody(b)}
            className="px-2 py-0.5 rounded bg-cosmic-950 border border-slate-800 text-[10px] font-mono text-slate-300 hover:border-hud-cyan hover:text-hud-cyan transition"
          >
            {b.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <label className="text-slate-400 block text-[10px]">CENTRAL MASS (M × 10^exp kg)</label>
          <div className="flex space-x-1 mt-1">
            <input 
              type="number" 
              step="0.01" 
              value={massVal} 
              onChange={e => setMassVal(e.target.value)}
              className="w-full bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-cyan font-bold"
            />
            <input 
              type="number" 
              value={massExp} 
              onChange={e => setMassExp(e.target.value)}
              className="w-16 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-300"
              title="Power of 10"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-400 block text-[10px]">BODY RADIUS (km)</label>
          <input 
            type="number" 
            value={radiusKm} 
            onChange={e => setRadiusKm(e.target.value)}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200"
          />
        </div>

        <div className="col-span-2">
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>ORBITAL ALTITUDE: {altitudeKm} km</span>
            <span>Radius r = {Math.round(totalRadiusM / 1000)} km</span>
          </div>
          <input 
            type="range" 
            min="100" 
            max="40000" 
            step="50" 
            value={altitudeKm} 
            onChange={e => setAltitudeKm(e.target.value)}
            className="w-full accent-hud-cyan cursor-pointer mt-1"
          />
        </div>
      </div>

      {/* Results */}
      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-cyan-500/30 grid grid-cols-2 gap-3 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">ORBITAL VELOCITY</div>
          <div className="text-lg font-bold text-hud-cyan">{velocityKms.toFixed(3)} km/s</div>
          <div className="text-[10px] text-slate-400">{(velocityMs).toFixed(1)} m/s</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">ORBITAL PERIOD</div>
          <div className="text-lg font-bold text-hud-emerald">{periodMinutes.toFixed(1)} min</div>
          <div className="text-[10px] text-slate-400">({periodHours.toFixed(2)} hours)</div>
        </div>
      </div>

      {onLaunchInSimulator && (
        <button
          onClick={() => onLaunchInSimulator({
            type: 'calculator_launch',
            calculatorName: 'Kepler Orbit',
            satelliteSpeed: velocityKms,
            orbitRadiusKm: totalRadiusM / 1000,
            centralMassKg: centralMassKg
          })}
          className="w-full py-2 px-3 rounded-lg border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.12)]"
        >
          <Orbit className="w-3.5 h-3.5" />
          <span>Launch Orbit in Gravity Simulator</span>
        </button>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 2. HOHMANN TRANSFER ORBIT CALCULATOR
function HohmannTransferCalculator({ onSave, onLaunchInSimulator }) {
  const [r1Km, setR1Km] = useState(6771); // LEO 400km above Earth (6371+400)
  const [r2Km, setR2Km] = useState(42164); // GEO radius (35,786 + 6371)
  const [centralMass, setCentralMass] = useState(5.972e24); // Earth mass

  const r1 = r1Km * 1000;
  const r2 = r2Km * 1000;
  const mu = G * centralMass;

  // v1 = sqrt(mu / r1)
  const v1 = Math.sqrt(mu / r1);
  // v_transfer_1 = sqrt(mu / r1) * sqrt(2*r2 / (r1 + r2))
  const v_tx1 = Math.sqrt(mu / r1) * Math.sqrt((2 * r2) / (r1 + r2));
  const deltaV1 = Math.abs(v_tx1 - v1);

  // v2 = sqrt(mu / r2)
  const v2 = Math.sqrt(mu / r2);
  // v_transfer_2 = sqrt(mu / r2) * sqrt(2*r1 / (r1 + r2))
  const v_tx2 = Math.sqrt(mu / r2) * Math.sqrt((2 * r1) / (r1 + r2));
  const deltaV2 = Math.abs(v2 - v_tx2);

  const totalDeltaV = deltaV1 + deltaV2;

  // Transfer Time tau = pi * sqrt((r1 + r2)^3 / (8 * mu))
  const transferTimeSeconds = Math.PI * Math.sqrt(Math.pow(r1 + r2, 3) / (8 * mu));
  const transferHours = transferTimeSeconds / 3600;

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Rocket className="w-4 h-4 text-hud-amber" />
          <h3 className="font-mono text-sm font-bold text-white">Hohmann Transfer Orbit (Δv Budget)</h3>
        </div>
        <button 
          onClick={() => onSave('Orbital Mechanics', 'hohmann_transfer', 'Hohmann Transfer Orbit Δv', {
            'Initial Orbit r1': `${r1Km} km`,
            'Target Orbit r2': `${r2Km} km`
          }, {
            'Departure Burn Δv1': `${(deltaV1 / 1000).toFixed(3)} km/s`,
            'Arrival Burn Δv2': `${(deltaV2 / 1000).toFixed(3)} km/s`,
            'Total Δv': `${(totalDeltaV / 1000).toFixed(3)} km/s`,
            'Transfer Duration': `${transferHours.toFixed(2)} hours`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 bg-cosmic-950 p-2 rounded border border-slate-800">
        Formula: <span className="text-hud-amber">Δv_total = Δv₁ + Δv₂</span> &bull; <span className="text-hud-amber">τ = π√((r₁ + r₂)³ / 8μ)</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <label className="text-slate-400 block text-[10px]">INITIAL ORBIT RADIUS r1 (km)</label>
          <input 
            type="number" 
            value={r1Km} 
            onChange={e => setR1Km(e.target.value)}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-cyan font-bold"
          />
          <span className="text-[10px] text-slate-500">e.g. LEO: 6,771 km</span>
        </div>

        <div>
          <label className="text-slate-400 block text-[10px]">TARGET ORBIT RADIUS r2 (km)</label>
          <input 
            type="number" 
            value={r2Km} 
            onChange={e => setR2Km(e.target.value)}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-amber font-bold"
          />
          <span className="text-[10px] text-slate-500">e.g. GEO: 42,164 km</span>
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-amber-500/30 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">BURN 1 (Δv₁)</div>
          <div className="text-base font-bold text-slate-100">{(deltaV1 / 1000).toFixed(3)} km/s</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">BURN 2 (Δv₂)</div>
          <div className="text-base font-bold text-slate-100">{(deltaV2 / 1000).toFixed(3)} km/s</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">TOTAL Δv</div>
          <div className="text-base font-bold text-hud-amber">{(totalDeltaV / 1000).toFixed(3)} km/s</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">TRANSFER TIME</div>
          <div className="text-base font-bold text-hud-emerald">{transferHours.toFixed(2)} h</div>
        </div>
      </div>

      {onLaunchInSimulator && (
        <button
          onClick={() => onLaunchInSimulator({
            type: 'calculator_launch',
            calculatorName: 'Hohmann Transfer',
            satelliteSpeed: deltaV1 / 1000,
            orbitRadiusKm: r1 / 1000,
            targetRadiusKm: r2 / 1000,
            centralMassKg: centralMass
          })}
          className="w-full py-2 px-3 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.12)]"
        >
          <Orbit className="w-3.5 h-3.5" />
          <span>Simulate Transfer in Gravity Simulator</span>
        </button>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 3. ESCAPE VELOCITY CALCULATOR
function EscapeVelocityCalculator({ onSave, onLaunchInSimulator }) {
  const [massKg, setMassKg] = useState(5.9722e24);
  const [radiusKm, setRadiusKm] = useState(6371);

  const radiusM = radiusKm * 1000;
  // v_esc = sqrt(2GM / R)
  const v_esc_ms = Math.sqrt((2 * G * massKg) / radiusM);
  const v_esc_kms = v_esc_ms / 1000;

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-hud-emerald" />
          <h3 className="font-mono text-sm font-bold text-white">Gravitational Escape Velocity</h3>
        </div>
        <button 
          onClick={() => onSave('Orbital Mechanics', 'escape_vel', 'Escape Velocity', {
            'Mass': `${massKg} kg`,
            'Radius': `${radiusKm} km`
          }, {
            'Escape Speed': `${v_esc_kms.toFixed(2)} km/s`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 bg-cosmic-950 p-2 rounded border border-slate-800">
        Formula: <span className="text-hud-emerald">v_esc = √(2GM / R)</span>
      </div>

      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] font-mono text-slate-500">Presets:</span>
        {CELESTIAL_PRESETS.map(b => (
          <button
            key={b.name}
            onClick={() => { setMassKg(b.mass); setRadiusKm(Math.round(b.radius / 1000)); }}
            className="px-2 py-0.5 rounded bg-cosmic-950 border border-slate-800 text-[10px] font-mono text-slate-300 hover:border-hud-emerald hover:text-hud-emerald transition"
          >
            {b.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <label className="text-slate-400 block text-[10px]">MASS (kg)</label>
          <input 
            type="text" 
            value={massKg} 
            onChange={e => setMassKg(Number(e.target.value) || massKg)}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-emerald font-bold"
          />
        </div>
        <div>
          <label className="text-slate-400 block text-[10px]">RADIUS (km)</label>
          <input 
            type="number" 
            value={radiusKm} 
            onChange={e => setRadiusKm(Number(e.target.value))}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200"
          />
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-emerald-500/30 flex items-center justify-between font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">ESCAPE VELOCITY (v_esc)</div>
          <div className="text-xl font-bold text-hud-emerald">{v_esc_kms.toFixed(2)} km/s</div>
          <div className="text-[10px] text-slate-400">({(v_esc_kms * 3600).toLocaleString()} km/h)</div>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          <div>Speed of Light Fraction:</div>
          <div className="text-hud-cyan font-bold">{((v_esc_ms / c) * 100).toExponential(3)}% c</div>
        </div>
      </div>

      {onLaunchInSimulator && (
        <button
          onClick={() => onLaunchInSimulator({
            type: 'calculator_launch',
            calculatorName: 'Escape Velocity',
            satelliteSpeed: v_esc_kms,
            orbitRadiusKm: radiusM / 1000,
            centralMassKg: massKg
          })}
          className="w-full py-2 px-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.12)]"
        >
          <Orbit className="w-3.5 h-3.5" />
          <span>Simulate Escape Vector in Gravity Simulator</span>
        </button>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 4. ROCHE LIMIT & HILL SPHERE CALCULATOR
// ----------------------------------------------------
function RocheHillSphereCalculator({ onSave }) {
  const [primaryMassKg, setPrimaryMassKg] = useState(5.972e24); // Earth
  const [primaryRadiusKm, setPrimaryRadiusKm] = useState(6371);
  const [primaryDensity, setPrimaryDensity] = useState(5515); // kg/m^3
  const [satelliteDensity, setSatelliteDensity] = useState(3344); // Moon
  const [semiMajorAxisAu, setSemiMajorAxisAu] = useState(1.0); // 1 AU for Sun-Earth
  const [hostStarMassKg, setHostStarMassKg] = useState(1.989e30);

  // Rigid Roche Limit d = R * (2 * rho_M / rho_m)^(1/3)
  const d_rigid_km = primaryRadiusKm * Math.pow((2 * primaryDensity) / satelliteDensity, 1 / 3);
  // Fluid Roche Limit d = 2.44 * R * (rho_M / rho_m)^(1/3)
  const d_fluid_km = 2.44 * primaryRadiusKm * Math.pow(primaryDensity / satelliteDensity, 1 / 3);

  // Hill Sphere: r_H = a * (m / (3 * M))^(1/3)
  const a_m = semiMajorAxisAu * AU;
  const hillSphereM = a_m * Math.pow(primaryMassKg / (3 * hostStarMassKg), 1 / 3);
  const hillSphereKm = hillSphereM / 1000;

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-hud-rose" />
          <h3 className="font-mono text-sm font-bold text-white">Roche Limit & Hill Sphere</h3>
        </div>
        <button 
          onClick={() => onSave('Orbital Mechanics', 'roche_hill', 'Roche Limit & Hill Sphere', {
            'Primary Radius': `${primaryRadiusKm} km`,
            'Primary Density': `${primaryDensity} kg/m³`,
            'Satellite Density': `${satelliteDensity} kg/m³`
          }, {
            'Rigid Roche Limit': `${d_rigid_km.toFixed(0)} km`,
            'Fluid Roche Limit': `${d_fluid_km.toFixed(0)} km`,
            'Hill Sphere Radius': `${hillSphereKm.toFixed(0)} km`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 bg-cosmic-950 p-2 rounded border border-slate-800">
        Tidal Disruption: <span className="text-hud-rose">d_fluid = 2.44 R (ρ_M / ρ_m)¹/³</span> &bull; <span className="text-hud-rose">r_H = a ∛(m / 3M)</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <label className="text-slate-400 block text-[10px]">PRIMARY DENSITY (kg/m³)</label>
          <input 
            type="number" 
            value={primaryDensity} 
            onChange={e => setPrimaryDensity(Number(e.target.value))}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200"
          />
        </div>
        <div>
          <label className="text-slate-400 block text-[10px]">SATELLITE DENSITY (kg/m³)</label>
          <input 
            type="number" 
            value={satelliteDensity} 
            onChange={e => setSatelliteDensity(Number(e.target.value))}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200"
          />
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-rose-500/30 grid grid-cols-3 gap-2 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">RIGID ROCHE</div>
          <div className="text-base font-bold text-white">{Math.round(d_rigid_km).toLocaleString()} km</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">FLUID ROCHE</div>
          <div className="text-base font-bold text-hud-rose">{Math.round(d_fluid_km).toLocaleString()} km</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">HILL SPHERE</div>
          <div className="text-base font-bold text-hud-cyan">{Math.round(hillSphereKm).toLocaleString()} km</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 5. SCHWARZSCHILD RADIUS & PHOTON SPHERE
// ----------------------------------------------------
function SchwarzschildCalculator({ onSave }) {
  const [massSolar, setMassSolar] = useState(4.154e6); // Sgr A* 4.154M solar

  const massKg = massSolar * M_sun;
  // Rs = 2GM / c^2
  const rsM = (2 * G * massKg) / (c * c);
  const rsKm = rsM / 1000;
  const rsAu = rsM / AU;
  // Photon sphere = 1.5 * Rs
  const photonSphereKm = rsKm * 1.5;
  // ISCO = 3 * Rs (Schwarzschild non-spinning)
  const iscoKm = rsKm * 3;

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-hud-violet" />
          <h3 className="font-mono text-sm font-bold text-white">Schwarzschild Event Horizon & ISCO</h3>
        </div>
        <button 
          onClick={() => onSave('Black Holes', 'schwarzschild_rad', 'Schwarzschild Event Horizon', {
            'Black Hole Mass': `${massSolar} M☉`
          }, {
            'Schwarzschild Radius (Rs)': `${rsKm.toFixed(2)} km (${rsAu.toFixed(4)} AU)`,
            'Photon Sphere (1.5 Rs)': `${photonSphereKm.toFixed(2)} km`,
            'ISCO Orbit (3 Rs)': `${iscoKm.toFixed(2)} km`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 bg-cosmic-950 p-2 rounded border border-slate-800">
        Formula: <span className="text-hud-violet">R_s = 2GM / c²</span> &bull; <span className="text-hud-violet">R_photon = 1.5 R_s</span> &bull; <span className="text-hud-violet">R_isco = 3 R_s</span>
      </div>

      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] font-mono text-slate-500">Presets:</span>
        <button onClick={() => setMassSolar(10)} className="px-2 py-0.5 rounded bg-cosmic-950 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-hud-violet">10 M☉ (Stellar)</button>
        <button onClick={() => setMassSolar(4.154e6)} className="px-2 py-0.5 rounded bg-cosmic-950 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-hud-violet">Sgr A* (4.15M M☉)</button>
        <button onClick={() => setMassSolar(6.5e9)} className="px-2 py-0.5 rounded bg-cosmic-950 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-hud-violet">M87* (6.5B M☉)</button>
        <button onClick={() => setMassSolar(6.6e10)} className="px-2 py-0.5 rounded bg-cosmic-950 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-hud-violet">TON 618 (66B M☉)</button>
      </div>

      <div className="text-xs font-mono">
        <label className="text-slate-400 block text-[10px]">BLACK HOLE MASS (Solar Masses M☉)</label>
        <input 
          type="number" 
          value={massSolar} 
          onChange={e => setMassSolar(Number(e.target.value))}
          className="w-full mt-1 bg-cosmic-950 px-3 py-1.5 rounded border border-slate-800 text-hud-violet font-bold"
        />
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-purple-500/30 grid grid-cols-3 gap-2 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">EVENT HORIZON (Rs)</div>
          <div className="text-sm font-bold text-hud-violet">{rsKm < 1e6 ? `${rsKm.toFixed(2)} km` : `${rsAu.toFixed(3)} AU`}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">PHOTON SPHERE</div>
          <div className="text-sm font-bold text-slate-100">{photonSphereKm < 1e6 ? `${photonSphereKm.toFixed(1)} km` : `${(photonSphereKm / (AU / 1000)).toFixed(3)} AU`}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">ISCO STABLE ORBIT</div>
          <div className="text-sm font-bold text-hud-cyan">{iscoKm < 1e6 ? `${iscoKm.toFixed(1)} km` : `${(iscoKm / (AU / 1000)).toFixed(3)} AU`}</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 6. GRAVITATIONAL TIME DILATION
// ----------------------------------------------------
function GravitationalTimeDilationCalculator({ onSave }) {
  const [massSolar, setMassSolar] = useState(4.154e6); // Sgr A*
  const [distanceKm, setDistanceKm] = useState(30000000); // 30 million km

  const massKg = massSolar * M_sun;
  const rsM = (2 * G * massKg) / (c * c);
  const rM = distanceKm * 1000;

  // t' = t * sqrt(1 - rs / r)
  let timeFactor = 1.0;
  if (rM > rsM) {
    timeFactor = Math.sqrt(1 - (rsM / rM));
  } else {
    timeFactor = 0;
  }

  // 1 hour on Earth = X hours near black hole
  const dilationRatio = timeFactor > 0 ? (1 / timeFactor) : Infinity;

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-hud-cyan" />
          <h3 className="font-mono text-sm font-bold text-white">Gravitational Time Dilation</h3>
        </div>
        <button 
          onClick={() => onSave('Black Holes', 'grav_time_dilation', 'Gravitational Time Dilation', {
            'Mass': `${massSolar} M☉`,
            'Observer Distance': `${distanceKm} km`
          }, {
            'Dilation Factor': `${timeFactor.toFixed(6)}`,
            '1 hr at infinity equals': `${(dilationRatio).toFixed(3)} hr at target`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 bg-cosmic-950 p-2 rounded border border-slate-800">
        Formula: <span className="text-hud-cyan">Δt_proper = Δt_coord √(1 - R_s / r)</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <label className="text-slate-400 block text-[10px]">OBJECT MASS (M☉)</label>
          <input 
            type="number" 
            value={massSolar} 
            onChange={e => setMassSolar(Number(e.target.value))}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-cyan font-bold"
          />
        </div>
        <div>
          <label className="text-slate-400 block text-[10px]">DISTANCE FROM CENTER (km)</label>
          <input 
            type="number" 
            value={distanceKm} 
            onChange={e => setDistanceKm(Number(e.target.value))}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200"
          />
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-cyan-500/30 grid grid-cols-2 gap-3 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">PROPER TIME COEFFICIENT</div>
          <div className="text-lg font-bold text-hud-cyan">{timeFactor.toFixed(6)}</div>
          <div className="text-[10px] text-slate-400">{timeFactor === 0 ? 'Inside Horizon' : 'Relativistic Dilation'}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">1 HOUR DEEP WELL TIME</div>
          <div className="text-lg font-bold text-hud-emerald">{dilationRatio === Infinity ? 'Infinite' : `${dilationRatio.toFixed(2)} h`}</div>
          <div className="text-[10px] text-slate-400">elapsed for distant observer</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 7. HAWKING RADIATION CALCULATOR
// ----------------------------------------------------
function HawkingRadiationCalculator({ onSave }) {
  const [massSolar, setMassSolar] = useState(5.0); // 5 solar masses

  const massKg = massSolar * M_sun;
  // T_H = (hbar * c^3) / (8 * pi * G * M * kB)
  const T_H = (hbar * Math.pow(c, 3)) / (8 * Math.PI * G * massKg * kB);

  // Lifetime t_evap = (5120 * pi * G^2 * M^3) / (hbar * c^4)
  const t_evap_sec = (5120 * Math.PI * G * G * Math.pow(massKg, 3)) / (hbar * Math.pow(c, 4));
  const t_evap_yr = t_evap_sec / (365.25 * 86400);

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-hud-violet" />
          <h3 className="font-mono text-sm font-bold text-white">Hawking Radiation & Lifetime</h3>
        </div>
        <button 
          onClick={() => onSave('Black Holes', 'hawking_rad', 'Hawking Radiation & Evaporation', {
            'Mass': `${massSolar} M☉`
          }, {
            'Temperature T_H': `${T_H.toExponential(4)} K`,
            'Evaporation Lifetime': `${t_evap_yr.toExponential(3)} Years`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 bg-cosmic-950 p-2 rounded border border-slate-800">
        Formula: <span className="text-hud-violet">T_H = ℏc³ / (8πGMk_B)</span> &bull; <span className="text-hud-violet">t_evap ∝ M³</span>
      </div>

      <div className="text-xs font-mono">
        <label className="text-slate-400 block text-[10px]">BLACK HOLE MASS (M☉)</label>
        <input 
          type="number" 
          value={massSolar} 
          onChange={e => setMassSolar(Number(e.target.value))}
          className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-violet font-bold"
        />
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-purple-500/30 grid grid-cols-2 gap-3 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">HAWKING TEMPERATURE</div>
          <div className="text-base font-bold text-hud-violet">{T_H.toExponential(3)} K</div>
          <div className="text-[10px] text-slate-400">Far colder than 2.7K CMB</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">EVAPORATION TIME</div>
          <div className="text-base font-bold text-hud-cyan">{t_evap_yr.toExponential(2)} yr</div>
          <div className="text-[10px] text-slate-400">Far exceeds Universe age (13.8 Gyr)</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 8. GRAVITATIONAL REDSHIFT CALCULATOR
// ----------------------------------------------------
function GravitationalRedshiftCalculator({ onSave }) {
  const [massSolar, setMassSolar] = useState(1.4); // 1.4 M☉ Neutron star
  const [radiusKm, setRadiusKm] = useState(12); // 12 km neutron star radius

  const massKg = massSolar * M_sun;
  const radiusM = radiusKm * 1000;
  const rsM = (2 * G * massKg) / (c * c);

  // z_g = (1 - 2GM / Rc^2)^(-1/2) - 1
  let z_g = 0;
  if (radiusM > rsM) {
    z_g = (1 / Math.sqrt(1 - (rsM / radiusM))) - 1;
  }

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-hud-amber" />
          <h3 className="font-mono text-sm font-bold text-white">Gravitational Redshift (z_g)</h3>
        </div>
        <button 
          onClick={() => onSave('Black Holes', 'grav_redshift', 'Gravitational Spectral Redshift', {
            'Mass': `${massSolar} M☉`,
            'Emission Radius': `${radiusKm} km`
          }, {
            'Gravitational Redshift z_g': `${z_g.toFixed(5)}`,
            'Photon Energy Loss': `${((1 - 1 / (1 + z_g)) * 100).toFixed(2)}%`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 bg-cosmic-950 p-2 rounded border border-slate-800">
        Formula: <span className="text-hud-amber">1 + z_g = (1 - R_s / R)^(-1/2)</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <label className="text-slate-400 block text-[10px]">MASS (M☉)</label>
          <input 
            type="number" 
            value={massSolar} 
            onChange={e => setMassSolar(Number(e.target.value))}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-amber font-bold"
          />
        </div>
        <div>
          <label className="text-slate-400 block text-[10px]">EMISSION RADIUS (km)</label>
          <input 
            type="number" 
            value={radiusKm} 
            onChange={e => setRadiusKm(Number(e.target.value))}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200"
          />
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-amber-500/30 grid grid-cols-2 gap-3 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">REDSHIFT FACTOR z_g</div>
          <div className="text-lg font-bold text-hud-amber">{z_g.toFixed(4)}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">PHOTON ENERGY RETENTION</div>
          <div className="text-lg font-bold text-slate-100">{((1 / (1 + z_g)) * 100).toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 9. EXOPLANET TRANSIT DEPTH CALCULATOR
// ----------------------------------------------------
function ExoplanetTransitCalculator({ onSave }) {
  const [rpEarth, setRpEarth] = useState(1.0); // 1.0 R_earth
  const [rStarSolar, setRStarSolar] = useState(1.0); // 1.0 R_sun

  const rpM = rpEarth * R_earth;
  const rStarM = rStarSolar * R_sun;

  // Transit depth delta = (Rp / R*)^2
  const depthFraction = Math.pow(rpM / rStarM, 2);
  const depthPpm = depthFraction * 1e6; // parts per million
  const depthPercent = depthFraction * 100;

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-hud-cyan" />
          <h3 className="font-mono text-sm font-bold text-white">Transit Photometry Depth (ppm)</h3>
        </div>
        <button 
          onClick={() => onSave('Exoplanets', 'transit_depth', 'Exoplanet Transit Photometry', {
            'Planet Radius': `${rpEarth} R⊕`,
            'Star Radius': `${rStarSolar} R☉`
          }, {
            'Transit Depth': `${depthPpm.toFixed(1)} ppm (${depthPercent.toFixed(4)}%)`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 bg-cosmic-950 p-2 rounded border border-slate-800">
        Formula: <span className="text-hud-cyan">ΔF / F = (R_p / R_*)²</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <label className="text-slate-400 block text-[10px]">PLANET RADIUS (R⊕ Earth Radii)</label>
          <input 
            type="number" 
            step="0.1" 
            value={rpEarth} 
            onChange={e => setRpEarth(Number(e.target.value))}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-cyan font-bold"
          />
        </div>
        <div>
          <label className="text-slate-400 block text-[10px]">STAR RADIUS (R☉ Solar Radii)</label>
          <input 
            type="number" 
            step="0.05" 
            value={rStarSolar} 
            onChange={e => setRStarSolar(Number(e.target.value))}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200"
          />
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-cyan-500/30 grid grid-cols-2 gap-3 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">TRANSIT DEPTH (PPM)</div>
          <div className="text-xl font-bold text-hud-cyan">{Math.round(depthPpm).toLocaleString()} ppm</div>
          <div className="text-[10px] text-slate-400">{depthPercent.toFixed(4)}% Flux Dip</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">DETECTION SENSITIVITY</div>
          <div className="text-xs font-bold text-slate-200 mt-1">
            {depthPpm < 30 ? 'Requires JWST/PLATO' : depthPpm < 150 ? 'Kepler / TESS detectable' : 'Easily Ground Detectable'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 10. HABITABLE ZONE & EQUILIBRIUM TEMP CALCULATOR
// ----------------------------------------------------
function HabitableZoneCalculator({ onSave }) {
  const [starTempK, setStarTempK] = useState(5778); // Sun
  const [starLuminosity, setStarLuminosity] = useState(1.0); // 1 L_sun
  const [semiMajorAxisAu, setSemiMajorAxisAu] = useState(1.0);
  const [albedo, setAlbedo] = useState(0.3); // 0.3 Earth

  // T_eq = T_star * sqrt(R_star / 2a) * (1 - A)^(1/4)
  // Or approx: T_eq = 278.5 * (L / a^2)^(1/4) * (1 - A)^(1/4)
  const Teq = 278.5 * Math.pow(starLuminosity / (semiMajorAxisAu * semiMajorAxisAu), 0.25) * Math.pow(1 - albedo, 0.25);
  const TeqC = Teq - 273.15;

  // Habitable Zone boundaries approx:
  // r_inner ~ sqrt(L / 1.1)
  // r_outer ~ sqrt(L / 0.53)
  const hzInnerAu = Math.sqrt(starLuminosity / 1.1);
  const hzOuterAu = Math.sqrt(starLuminosity / 0.53);

  const isInsideHz = semiMajorAxisAu >= hzInnerAu && semiMajorAxisAu <= hzOuterAu;

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-hud-emerald" />
          <h3 className="font-mono text-sm font-bold text-white">Equilibrium Temperature & Habitable Zone</h3>
        </div>
        <button 
          onClick={() => onSave('Exoplanets', 'habitable_zone', 'Habitable Zone & Teq', {
            'Star Luminosity': `${starLuminosity} L☉`,
            'Semi-Major Axis': `${semiMajorAxisAu} AU`,
            'Albedo': `${albedo}`
          }, {
            'Equilibrium Temp (Teq)': `${Teq.toFixed(1)} K (${TeqC.toFixed(1)} °C)`,
            'HZ Boundaries': `${hzInnerAu.toFixed(2)} - ${hzOuterAu.toFixed(2)} AU`,
            'In Habitable Zone': isInsideHz ? 'YES' : 'NO'
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 bg-cosmic-950 p-2 rounded border border-slate-800">
        Formula: <span className="text-hud-emerald">T_eq = 278.5 K × (L / a²)¹/⁴ × (1 - A)¹/⁴</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <label className="text-slate-400 block text-[10px]">STAR LUMINOSITY (L☉ Solar Units)</label>
          <input 
            type="number" 
            step="0.01" 
            value={starLuminosity} 
            onChange={e => setStarLuminosity(Number(e.target.value))}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-emerald font-bold"
          />
        </div>
        <div>
          <label className="text-slate-400 block text-[10px]">ORBIT DISTANCE a (AU)</label>
          <input 
            type="number" 
            step="0.05" 
            value={semiMajorAxisAu} 
            onChange={e => setSemiMajorAxisAu(Number(e.target.value))}
            className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200"
          />
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-emerald-500/30 grid grid-cols-2 gap-3 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">EQUILIBRIUM TEMP (T_eq)</div>
          <div className="text-lg font-bold text-hud-emerald">{Teq.toFixed(1)} K ({TeqC.toFixed(0)} °C)</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">HABITABLE ZONE (HZ)</div>
          <div className="text-sm font-bold text-white">{hzInnerAu.toFixed(2)} - {hzOuterAu.toFixed(2)} AU</div>
          <span className={`inline-block px-2 py-0.5 mt-1 rounded text-[10px] font-bold ${isInsideHz ? 'bg-hud-emerald/20 text-hud-emerald' : 'bg-rose-950 text-rose-300'}`}>
            {isInsideHz ? '✓ WITHIN HABITABLE ZONE' : '✗ OUTSIDE HABITABLE ZONE'}
          </span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 11. EARTH SIMILARITY INDEX (ESI) CALCULATOR
// ----------------------------------------------------
function EarthSimilarityIndexCalculator({ onSave }) {
  const [radiusR, setRadiusR] = useState(1.0); // 1.0 R_earth
  const [densityRho, setDensityRho] = useState(1.0); // 1.0 rho_earth
  const [vesc, setVesc] = useState(1.0); // 1.0 v_esc_earth
  const [tempK, setTempK] = useState(288); // 288 K Earth surface

  // Weights standard formulation:
  // ESI = prod( (1 - abs((x - x0)/(x + x0)))^(w/n) )
  const s_r = Math.pow(1 - Math.abs((radiusR - 1) / (radiusR + 1)), 0.57);
  const s_d = Math.pow(1 - Math.abs((densityRho - 1) / (densityRho + 1)), 1.07);
  const s_v = Math.pow(1 - Math.abs((vesc - 1) / (vesc + 1)), 0.70);
  const s_t = Math.pow(1 - Math.abs((tempK - 288) / (tempK + 288)), 5.58);

  const esi = s_r * s_d * s_v * s_t;

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bookmark className="w-4 h-4 text-hud-emerald" />
          <h3 className="font-mono text-sm font-bold text-white">Earth Similarity Index (ESI)</h3>
        </div>
        <button 
          onClick={() => onSave('Exoplanets', 'esi_index', 'Earth Similarity Index', {
            'Radius': `${radiusR} R⊕`,
            'Density': `${densityRho} ρ⊕`,
            'Escape Vel': `${vesc} v_e⊕`,
            'Temp': `${tempK} K`
          }, {
            'ESI Score': `${esi.toFixed(3)}`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        <div>
          <label className="text-[10px] text-slate-400">RADIUS (R⊕)</label>
          <input type="number" step="0.05" value={radiusR} onChange={e => setRadiusR(Number(e.target.value))} className="w-full bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200" />
        </div>
        <div>
          <label className="text-[10px] text-slate-400">DENSITY (ρ⊕)</label>
          <input type="number" step="0.05" value={densityRho} onChange={e => setDensityRho(Number(e.target.value))} className="w-full bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200" />
        </div>
        <div>
          <label className="text-[10px] text-slate-400">ESCAPE V (v⊕)</label>
          <input type="number" step="0.05" value={vesc} onChange={e => setVesc(Number(e.target.value))} className="w-full bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200" />
        </div>
        <div>
          <label className="text-[10px] text-slate-400">TEMP (K)</label>
          <input type="number" value={tempK} onChange={e => setTempK(Number(e.target.value))} className="w-full bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200" />
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-emerald-500/30 flex items-center justify-between font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">COMPUTED ESI METRIC</div>
          <div className="text-2xl font-bold text-hud-emerald">{isNaN(esi) ? '0.000' : esi.toFixed(3)}</div>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          <div>Earth Benchmark = 1.000</div>
          <div className="text-hud-cyan font-bold">{esi >= 0.8 ? 'Earth-like Candidate' : esi >= 0.6 ? 'Sub-terrestrial / Mars-like' : 'Non-Earth Analog'}</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 12. PLANET SURFACE GRAVITY CALCULATOR
// ----------------------------------------------------
function PlanetSurfaceGravityCalculator({ onSave }) {
  const [massEarth, setMassEarth] = useState(1.0);
  const [radiusEarth, setRadiusEarth] = useState(1.0);

  // g = g_earth * (M / R^2)
  const g_earth = 9.80665;
  const g = g_earth * (massEarth / (radiusEarth * radiusEarth));
  const g_ratio = g / g_earth;

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-hud-cyan" />
          <h3 className="font-mono text-sm font-bold text-white">Surface Gravity & Acceleration (g)</h3>
        </div>
        <button 
          onClick={() => onSave('Exoplanets', 'surface_gravity', 'Surface Gravity & Acceleration', {
            'Mass': `${massEarth} M⊕`,
            'Radius': `${radiusEarth} R⊕`
          }, {
            'Surface Acceleration g': `${g.toFixed(2)} m/s² (${g_ratio.toFixed(2)} g)`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <label className="text-slate-400 block text-[10px]">MASS (M⊕ Earth Masses)</label>
          <input type="number" step="0.1" value={massEarth} onChange={e => setMassEarth(Number(e.target.value))} className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-cyan font-bold" />
        </div>
        <div>
          <label className="text-slate-400 block text-[10px]">RADIUS (R⊕ Earth Radii)</label>
          <input type="number" step="0.1" value={radiusEarth} onChange={e => setRadiusEarth(Number(e.target.value))} className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200" />
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-cyan-500/30 grid grid-cols-2 gap-3 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">SURFACE GRAVITY</div>
          <div className="text-xl font-bold text-hud-cyan">{g.toFixed(2)} m/s²</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">IN EARTH G-UNITS</div>
          <div className="text-xl font-bold text-hud-emerald">{g_ratio.toFixed(2)} g</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 13. TSIOLKOVSKY ROCKET EQUATION
// ----------------------------------------------------
function TsiolkovskyRocketCalculator({ onSave }) {
  const [isp, setIsp] = useState(450); // Hydrolox 450s
  const [mInitial, setMInitial] = useState(500000); // 500 tons
  const [mDry, setMDry] = useState(50000); // 50 tons

  const g0 = 9.80665;
  // deltaV = Isp * g0 * ln(m0 / mf)
  const massRatio = mInitial / mDry;
  const deltaV = isp * g0 * Math.log(massRatio);
  const deltaVKms = deltaV / 1000;

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Rocket className="w-4 h-4 text-hud-amber" />
          <h3 className="font-mono text-sm font-bold text-white">Tsiolkovsky Rocket Equation</h3>
        </div>
        <button 
          onClick={() => onSave('Relativity & Rockets', 'rocket_equation', 'Tsiolkovsky Rocket Equation', {
            'Specific Impulse (Isp)': `${isp} s`,
            'Initial Mass m0': `${mInitial} kg`,
            'Dry Mass mf': `${mDry} kg`
          }, {
            'Total Velocity Increment Δv': `${deltaVKms.toFixed(3)} km/s`,
            'Mass Ratio m0/mf': `${massRatio.toFixed(2)}`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 bg-cosmic-950 p-2 rounded border border-slate-800">
        Formula: <span className="text-hud-amber">Δv = I_sp × g₀ × ln(m₀ / m_f)</span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs font-mono">
        <div>
          <label className="text-[10px] text-slate-400">SPECIFIC IMPULSE (s)</label>
          <input type="number" value={isp} onChange={e => setIsp(Number(e.target.value))} className="w-full bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-amber font-bold" />
        </div>
        <div>
          <label className="text-[10px] text-slate-400">INITIAL WET MASS (kg)</label>
          <input type="number" value={mInitial} onChange={e => setMInitial(Number(e.target.value))} className="w-full bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200" />
        </div>
        <div>
          <label className="text-[10px] text-slate-400">DRY FINAL MASS (kg)</label>
          <input type="number" value={mDry} onChange={e => setMDry(Number(e.target.value))} className="w-full bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200" />
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-amber-500/30 grid grid-cols-2 gap-3 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">AVAILABLE DELTA-V (Δv)</div>
          <div className="text-xl font-bold text-hud-amber">{deltaVKms.toFixed(3)} km/s</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">MASS RATIO (m₀ / m_f)</div>
          <div className="text-xl font-bold text-slate-100">{massRatio.toFixed(2)} : 1</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 14. LORENTZ RELATIVITY CALCULATOR
// ----------------------------------------------------
function LorentzRelativityCalculator({ onSave }) {
  const [velocityPercentC, setVelocityPercentC] = useState(86.6); // 0.866c gives gamma=2

  const beta = velocityPercentC / 100;
  // gamma = 1 / sqrt(1 - beta^2)
  const gamma = beta < 1 ? 1 / Math.sqrt(1 - beta * beta) : Infinity;

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-hud-rose" />
          <h3 className="font-mono text-sm font-bold text-white">Special Relativistic Lorentz Factor (γ)</h3>
        </div>
        <button 
          onClick={() => onSave('Relativity & Rockets', 'lorentz_factor', 'Special Relativity Lorentz Factor', {
            'Velocity': `${velocityPercentC}% c`
          }, {
            'Lorentz Gamma (γ)': `${gamma.toFixed(4)}`,
            'Time Dilation Factor': `${gamma.toFixed(3)}×`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-[11px] font-mono text-slate-400 bg-cosmic-950 p-2 rounded border border-slate-800">
        Formula: <span className="text-hud-rose">γ = 1 / √(1 - v² / c²)</span>
      </div>

      <div className="text-xs font-mono">
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>VELOCITY: {velocityPercentC}% c</span>
          <span>v = {(beta * 299792).toFixed(0)} km/s</span>
        </div>
        <input 
          type="range" 
          min="1" 
          max="99.9" 
          step="0.1" 
          value={velocityPercentC} 
          onChange={e => setVelocityPercentC(Number(e.target.value))}
          className="w-full accent-hud-rose cursor-pointer mt-1"
        />
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-rose-500/30 grid grid-cols-2 gap-3 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">LORENTZ FACTOR (γ)</div>
          <div className="text-xl font-bold text-hud-rose">{gamma.toFixed(3)}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">TIME DILATION & LENGTH CONTRACTION</div>
          <div className="text-sm font-bold text-slate-100">1 yr travel = {(gamma).toFixed(2)} yr Earth</div>
          <div className="text-[10px] text-slate-400">Length contracted to {(100 / gamma).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 15. COSMOLOGICAL REDSHIFT & RECESSION
// ----------------------------------------------------
function CosmologicalRedshiftCalculator({ onSave }) {
  const [z, setZ] = useState(14.32); // JADES-GS-z14-0

  // Relativistic recession velocity v / c = ((1+z)^2 - 1) / ((1+z)^2 + 1)
  const z1_sq = Math.pow(1 + z, 2);
  const v_rel_c = (z1_sq - 1) / (z1_sq + 1);
  const v_kms = v_rel_c * 299792.458;

  // Scale factor a = 1 / (1 + z)
  const a = 1 / (1 + z);

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-hud-cyan" />
          <h3 className="font-mono text-sm font-bold text-white">Cosmological Redshift & Scale Factor</h3>
        </div>
        <button 
          onClick={() => onSave('Cosmology', 'cosmo_redshift', 'Cosmological Redshift & Scale Factor', {
            'Redshift z': `${z}`
          }, {
            'Recession Velocity': `${v_kms.toFixed(1)} km/s (${(v_rel_c * 100).toFixed(2)}% c)`,
            'Cosmic Scale Factor a': `${a.toFixed(5)}`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="text-xs font-mono">
        <label className="text-slate-400 block text-[10px]">SPECTROSCOPIC REDSHIFT (z)</label>
        <input 
          type="number" 
          step="0.1" 
          value={z} 
          onChange={e => setZ(Number(e.target.value))}
          className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-cyan font-bold"
        />
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-cyan-500/30 grid grid-cols-2 gap-3 font-mono text-xs">
        <div>
          <div className="text-[10px] text-slate-500 uppercase">RECESSION VELOCITY</div>
          <div className="text-base font-bold text-hud-cyan">{(v_rel_c * 100).toFixed(2)}% c</div>
          <div className="text-[10px] text-slate-400">{Math.round(v_kms).toLocaleString()} km/s</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 uppercase">COSMIC SCALE FACTOR a</div>
          <div className="text-base font-bold text-hud-emerald">{a.toFixed(4)}</div>
          <div className="text-[10px] text-slate-400">Universe was {((1 - a) * 100).toFixed(1)}% smaller</div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 16. INTERSTELLAR TRAVEL TIME CALCULATOR
// ----------------------------------------------------
function InterstellarTravelTimeCalculator({ onSave }) {
  const [distanceLy, setDistanceLy] = useState(4.24); // Proxima Centauri
  const [speedKms, setSpeedKms] = useState(60); // Parker Solar Probe speed ~60 km/s

  const lyKm = 9.461e12;
  const totalDistKm = distanceLy * lyKm;
  const timeSeconds = totalDistKm / speedKms;
  const timeYears = timeSeconds / (365.25 * 86400);

  return (
    <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Rocket className="w-4 h-4 text-hud-emerald" />
          <h3 className="font-mono text-sm font-bold text-white">Interstellar Transit Duration</h3>
        </div>
        <button 
          onClick={() => onSave('Cosmology', 'interstellar_time', 'Interstellar Transit Duration', {
            'Target Distance': `${distanceLy} Light Years`,
            'Spacecraft Velocity': `${speedKms} km/s`
          }, {
            'Transit Time': `${Math.round(timeYears).toLocaleString()} Years`
          })}
          className="p-1 text-slate-400 hover:text-hud-cyan transition"
        >
          <Save className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div>
          <label className="text-slate-400 block text-[10px]">DISTANCE (Light Years)</label>
          <input type="number" step="0.1" value={distanceLy} onChange={e => setDistanceLy(Number(e.target.value))} className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-slate-200" />
        </div>
        <div>
          <label className="text-slate-400 block text-[10px]">PROBE SPEED (km/s)</label>
          <input type="number" value={speedKms} onChange={e => setSpeedKms(Number(e.target.value))} className="w-full mt-1 bg-cosmic-950 px-2 py-1 rounded border border-slate-800 text-hud-emerald font-bold" />
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-cosmic-950 border border-emerald-500/30 font-mono text-xs">
        <div className="text-[10px] text-slate-500 uppercase">CRUISE TRANSIT TIME</div>
        <div className="text-xl font-bold text-hud-emerald">{Math.round(timeYears).toLocaleString()} Earth Years</div>
        <div className="text-[10px] text-slate-400">At {(speedKms / 299792 * 100).toFixed(4)}% the speed of light</div>
      </div>
    </div>
  );
}
