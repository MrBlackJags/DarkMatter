import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Flame, 
  Globe, 
  Sparkles, 
  Zap, 
  Compass, 
  Crosshair, 
  Radio, 
  Layers,
  ChevronDown,
  Info,
  Maximize2
} from 'lucide-react';

const G_SIM = 1000;

const PLANET_PRESETS = [
  {
    name: 'Earth Analog (Terra)',
    mass: 60000,
    radius: 70,
    atmosphereRadius: 110,
    color: '#00f0ff',
    atmosphereColor: 'rgba(0, 240, 255, 0.16)',
    desc: 'Dense atmosphere, balanced surface gravity (g = 9.8 m/s²)'
  },
  {
    name: 'Mars Analog (Ares)',
    mass: 22000,
    radius: 52,
    atmosphereRadius: 70,
    color: '#ff5533',
    atmosphereColor: 'rgba(255, 85, 51, 0.12)',
    desc: 'Low mass, thin atmosphere, shallow gravitational well'
  },
  {
    name: 'Gas Giant Core (Jovian)',
    mass: 220000,
    radius: 115,
    atmosphereRadius: 175,
    color: '#ffaa00',
    atmosphereColor: 'rgba(255, 170, 0, 0.22)',
    desc: 'Deep gravity well with dense turbulent atmospheric drag'
  },
  {
    name: 'Dense Neutron Star',
    mass: 420000,
    radius: 32,
    atmosphereRadius: 40,
    color: '#a855f7',
    atmosphereColor: 'rgba(168, 85, 247, 0.25)',
    desc: 'Intense gravitational spacetime curvature'
  }
];

const BODY_TYPES = [
  { id: 'probe', name: 'Science Satellite', mass: 1, radius: 4, color: '#00ff88', desc: 'Lightweight orbital probe' },
  { id: 'asteroid', name: 'Near-Earth Asteroid', mass: 50, radius: 6, color: '#ffaa00', desc: 'Porous rocky asteroid' },
  { id: 'chx_asteroid', name: 'Chicxulub Impactor', mass: 400, radius: 10, color: '#ff3366', desc: 'Massive extinction-level impactor' },
  { id: 'moon', name: 'Lunar Body', mass: 180, radius: 8, color: '#e2e8f0', desc: 'Natural solid satellite' },
  { id: 'comet', name: 'Volatile Ice Comet', mass: 20, radius: 5, color: '#38bdf8', desc: 'Outgassing frozen volatiles' }
];

export default function OrbitSimulator() {
  const canvasRef = useRef(null);
  
  // State
  const [planet, setPlanet] = useState(PLANET_PRESETS[0]);
  const [selectedBodyType, setSelectedBodyType] = useState(BODY_TYPES[0]);
  const [isRunning, setIsRunning] = useState(true);
  const [timeStep, setTimeStep] = useState(1.0);
  const [showGravityGrid, setShowGravityGrid] = useState(true);
  const [showPredictedOrbit, setShowPredictedOrbit] = useState(true);
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  const [launchSpeedMultiplier, setLaunchSpeedMultiplier] = useState(1.0);

  // Slingshot Aim
  const [isAiming, setIsAiming] = useState(false);
  const [aimStart, setAimStart] = useState({ x: 0, y: 0 });
  const [aimCurrent, setAimCurrent] = useState({ x: 0, y: 0 });

  // Physics arrays
  const bodiesRef = useRef([]);
  const impactParticlesRef = useRef([]);
  const cratersRef = useRef([]);
  const shockwavesRef = useRef([]);

  // Telemetry
  const [telemetry, setTelemetry] = useState({
    activeBodies: 0,
    speed: 0,
    altitude: 0,
    eccentricity: 0,
    status: 'READY',
    lastImpact: null
  });

  const getCanvasCoords = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const getCenter = () => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 500, y: 320 };
    return { x: canvas.width / 2, y: canvas.height / 2 };
  };

  // Scenario presets
  const loadScenario = useCallback((scenarioKey) => {
    const center = getCenter();
    impactParticlesRef.current = [];
    cratersRef.current = [];
    shockwavesRef.current = [];

    if (scenarioKey === 'circular_leo') {
      setPlanet(PLANET_PRESETS[0]);
      const r = 165;
      const v = Math.sqrt((G_SIM * PLANET_PRESETS[0].mass) / r);
      bodiesRef.current = [
        {
          id: 'probe-1',
          name: 'Orbiter Alpha',
          type: 'probe',
          x: center.x,
          y: center.y - r,
          vx: v,
          vy: 0,
          mass: 1,
          radius: 5,
          color: '#00ff88',
          trail: []
        }
      ];
    } else if (scenarioKey === 'elliptical') {
      setPlanet(PLANET_PRESETS[0]);
      const r = 135;
      const v = Math.sqrt((G_SIM * PLANET_PRESETS[0].mass) / r) * 1.22;
      bodiesRef.current = [
        {
          id: 'probe-elliptical',
          name: 'Molniya Surveyor',
          type: 'probe',
          x: center.x,
          y: center.y - r,
          vx: v,
          vy: 0,
          mass: 2,
          radius: 5,
          color: '#00f0ff',
          trail: []
        }
      ];
    } else if (scenarioKey === 'collision') {
      setPlanet(PLANET_PRESETS[0]);
      bodiesRef.current = [
        {
          id: 'impactor-1',
          name: 'Chicxulub Asteroid (2026-DM)',
          type: 'chx_asteroid',
          x: center.x - 340,
          y: center.y - 190,
          vx: 6.5,
          vy: 3.8,
          mass: 500,
          radius: 11,
          color: '#ff3366',
          trail: []
        }
      ];
    } else if (scenarioKey === 'aerobraking') {
      setPlanet(PLANET_PRESETS[0]);
      const r = 135;
      const v = Math.sqrt((G_SIM * PLANET_PRESETS[0].mass) / r) * 0.90;
      bodiesRef.current = [
        {
          id: 'probe-decay',
          name: 'Re-entry Probe',
          type: 'probe',
          x: center.x,
          y: center.y - r,
          vx: v,
          vy: 0,
          mass: 2,
          radius: 5,
          color: '#ffaa00',
          trail: []
        }
      ];
    } else if (scenarioKey === 'binary_moons') {
      setPlanet(PLANET_PRESETS[2]); // Jovian
      const r1 = 185;
      const v1 = Math.sqrt((G_SIM * PLANET_PRESETS[2].mass) / r1);
      const r2 = 280;
      const v2 = Math.sqrt((G_SIM * PLANET_PRESETS[2].mass) / r2);
      bodiesRef.current = [
        {
          id: 'moon-inner',
          name: 'Inner Moonlet',
          type: 'moon',
          x: center.x,
          y: center.y - r1,
          vx: v1,
          vy: 0,
          mass: 120,
          radius: 8,
          color: '#ffaa00',
          trail: []
        },
        {
          id: 'moon-outer',
          name: 'Outer Moonlet',
          type: 'moon',
          x: center.x,
          y: center.y + r2,
          vx: -v2,
          vy: 0,
          mass: 160,
          radius: 9,
          color: '#e2e8f0',
          trail: []
        }
      ];
    }
  }, []);

  useEffect(() => {
    loadScenario('circular_leo');
  }, [loadScenario]);

  // Mouse & Touch aiming handlers
  const handleStart = (clientX, clientY) => {
    const coords = getCanvasCoords(clientX, clientY);
    setIsAiming(true);
    setAimStart(coords);
    setAimCurrent(coords);
  };

  const handleMove = (clientX, clientY) => {
    if (!isAiming) return;
    setAimCurrent(getCanvasCoords(clientX, clientY));
  };

  const handleEnd = () => {
    if (!isAiming) return;
    setIsAiming(false);

    const dx = aimStart.x - aimCurrent.x;
    const dy = aimStart.y - aimCurrent.y;
    const power = 0.085 * launchSpeedMultiplier;
    const vx = dx * power;
    const vy = dy * power;

    bodiesRef.current.push({
      id: `body-${Date.now()}`,
      name: `${selectedBodyType.name} #${bodiesRef.current.length + 1}`,
      type: selectedBodyType.id,
      x: aimStart.x,
      y: aimStart.y,
      vx,
      vy,
      mass: selectedBodyType.mass,
      radius: selectedBodyType.radius,
      color: selectedBodyType.color,
      trail: []
    });
  };

  // 60FPS physics loop
  useEffect(() => {
    let animationFrameId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      // Pure deep space background
      ctx.fillStyle = '#01040a';
      ctx.fillRect(0, 0, width, height);

      // 1. Spacetime gravity grid
      if (showGravityGrid) {
        drawGravityGrid(ctx, width, height, cx, cy, planet);
      }

      // 2. Planet & Atmosphere
      drawPlanet(ctx, cx, cy, planet, showAtmosphere);

      // 3. Craters
      drawCraters(ctx, cratersRef.current);

      // 4. Shockwaves
      drawShockwaves(ctx, shockwavesRef.current);

      // 5. Update bodies
      const bodies = bodiesRef.current;
      const surviving = [];

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];

        if (isRunning) {
          const steps = 4;
          const dt = (0.016 * timeStep) / steps;

          for (let s = 0; s < steps; s++) {
            const dx = cx - b.x;
            const dy = cy - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= planet.radius + b.radius * 0.7) {
              triggerCollision(b, cx, cy, planet);
              b.collided = true;
              break;
            }

            const force = (G_SIM * planet.mass) / Math.max(dist * dist, 120);
            const ax = (dx / dist) * force;
            const ay = (dy / dist) * force;

            let dragX = 0;
            let dragY = 0;
            if (dist < planet.atmosphereRadius) {
              const altRatio = (dist - planet.radius) / (planet.atmosphereRadius - planet.radius);
              const density = Math.exp(-3 * altRatio) * 0.0028;
              const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
              dragX = -0.5 * density * speed * b.vx;
              dragY = -0.5 * density * speed * b.vy;

              if (speed > 2.0 && Math.random() < 0.3) {
                impactParticlesRef.current.push({
                  x: b.x + (Math.random() - 0.5) * 4,
                  y: b.y + (Math.random() - 0.5) * 4,
                  vx: -b.vx * 0.2 + (Math.random() - 0.5),
                  vy: -b.vy * 0.2 + (Math.random() - 0.5),
                  life: 1.0,
                  decay: 0.08,
                  color: '#ffaa00',
                  size: 2
                });
              }
            }

            b.vx += (ax + dragX) * dt;
            b.vy += (ay + dragY) * dt;
            b.x += b.vx * dt * 60;
            b.y += b.vy * dt * 60;
          }
        }

        if (!b.collided) {
          b.trail.push({ x: b.x, y: b.y });
          if (b.trail.length > 220) b.trail.shift();

          drawTrail(ctx, b);
          drawBody(ctx, b);
          if (b.type === 'comet') drawCometTail(ctx, b, cx, cy);

          surviving.push(b);
        }
      }

      bodiesRef.current = surviving;

      // 6. Kepler orbit prediction
      if (showPredictedOrbit && surviving.length > 0) {
        drawOrbitPrediction(ctx, surviving[0], cx, cy, planet);
      }

      // 7. Impact particles
      updateAndDrawParticles(ctx, impactParticlesRef.current);

      // 8. Slingshot guide
      if (isAiming) {
        drawAimGuide(ctx, aimStart, aimCurrent, selectedBodyType, launchSpeedMultiplier);
      }

      // Update HUD telemetry
      if (surviving.length > 0) {
        const lead = surviving[0];
        const dx = cx - lead.x;
        const dy = cy - lead.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const altitude = Math.max(0, dist - planet.radius);
        const speed = Math.sqrt(lead.vx * lead.vx + lead.vy * lead.vy);

        const mu = G_SIM * planet.mass;
        const rVec = { x: lead.x - cx, y: lead.y - cy };
        const vVec = { x: lead.vx, y: lead.vy };
        const energy = (speed * speed) / 2 - mu / dist;
        const h = rVec.x * vVec.y - rVec.y * vVec.x;
        const eTerm = 1 + (2 * energy * h * h) / (mu * mu);
        const ecc = eTerm >= 0 ? Math.sqrt(eTerm) : 1;

        let statusText = 'STABLE ORBIT';
        if (dist < planet.atmosphereRadius) statusText = 'ATMOSPHERIC DECAY';
        if (ecc >= 1) statusText = 'HYPERBOLIC ESCAPE';
        if (dist < planet.radius + 15) statusText = 'COLLISION COURSE';

        setTelemetry(prev => ({
          ...prev,
          activeBodies: surviving.length,
          speed,
          altitude,
          eccentricity: ecc,
          status: statusText
        }));
      } else {
        setTelemetry(prev => ({
          ...prev,
          activeBodies: 0,
          speed: 0,
          altitude: 0,
          eccentricity: 0,
          status: 'READY / AWAITING LAUNCH'
        }));
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, timeStep, showGravityGrid, showPredictedOrbit, showAtmosphere, isAiming, aimStart, aimCurrent, selectedBodyType, launchSpeedMultiplier, planet]);

  const triggerCollision = (body, cx, cy, planetState) => {
    const speed = Math.sqrt(body.vx * body.vx + body.vy * body.vy);
    const impactSpeedKms = speed * 4.2;
    const massTons = body.mass * 1e5;
    const kineticEnergyJoules = 0.5 * massTons * 1000 * Math.pow(impactSpeedKms * 1000, 2);
    const megatonsTnt = kineticEnergyJoules / 4.184e15;
    const craterDiameterKm = Math.pow(megatonsTnt, 0.294) * 1.8;

    const angle = Math.atan2(body.y - cy, body.x - cx);
    const impactX = cx + Math.cos(angle) * planetState.radius;
    const impactY = cy + Math.sin(angle) * planetState.radius;

    cratersRef.current.push({
      x: impactX,
      y: impactY,
      radius: Math.max(5, Math.min(24, body.radius * 1.6)),
      createdAt: Date.now()
    });

    shockwavesRef.current.push({
      x: impactX,
      y: impactY,
      radius: 4,
      maxRadius: Math.min(130, body.radius * 9),
      alpha: 1.0
    });

    const particleCount = Math.min(110, body.radius * 12);
    for (let i = 0; i < particleCount; i++) {
      const pAngle = angle + Math.PI + (Math.random() - 0.5) * 2.2;
      const pSpeed = Math.random() * 8 + 2;
      impactParticlesRef.current.push({
        x: impactX,
        y: impactY,
        vx: Math.cos(pAngle) * pSpeed,
        vy: Math.sin(pAngle) * pSpeed,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015,
        color: i % 2 === 0 ? '#ff3366' : '#ffaa00',
        size: Math.random() * 3 + 1.5
      });
    }

    setTelemetry(prev => ({
      ...prev,
      lastImpact: {
        bodyName: body.name,
        speedKms: impactSpeedKms.toFixed(1),
        megatonsTnt: megatonsTnt.toLocaleString(undefined, { maximumFractionDigits: 1 }),
        craterDiameterKm: craterDiameterKm.toFixed(1),
        time: new Date().toLocaleTimeString()
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* SIMULATOR HEADER & PRESET BAR */}
      <div className="bg-black/80 border border-slate-800 rounded-2xl p-5 sm:p-6 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-hud-cyan mb-1">
            <Orbit className="w-4 h-4 text-hud-cyan" />
            <span>ORBITAL GRAVITY & IMPACT PHYSICS SIMULATOR</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            Simulate Orbits, Gravity Wells & Planetary Collisions
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-sans mt-0.5">
            Click & drag on the canvas to slingshot any projectile. Watch orbital mechanics, atmospheric drag, and high-energy cratering in real time.
          </p>
        </div>

        {/* Quick Scenario Buttons */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <button
            onClick={() => loadScenario('circular_leo')}
            className="px-3 py-1.5 rounded-lg bg-black border border-slate-800 hover:border-hud-cyan text-slate-300 hover:text-hud-cyan transition"
          >
            LEO Circular
          </button>
          <button
            onClick={() => loadScenario('elliptical')}
            className="px-3 py-1.5 rounded-lg bg-black border border-slate-800 hover:border-hud-cyan text-slate-300 hover:text-hud-cyan transition"
          >
            Molniya Ellipse
          </button>
          <button
            onClick={() => loadScenario('collision')}
            className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-700/60 text-rose-300 hover:bg-rose-900 transition font-bold"
          >
            Meteor Impact
          </button>
          <button
            onClick={() => loadScenario('aerobraking')}
            className="px-3 py-1.5 rounded-lg bg-black border border-slate-800 hover:border-amber-400 text-slate-300 hover:text-amber-400 transition"
          >
            Atmospheric Decay
          </button>
          <button
            onClick={() => loadScenario('binary_moons')}
            className="px-3 py-1.5 rounded-lg bg-black border border-slate-800 hover:border-hud-violet text-slate-300 hover:text-hud-violet transition"
          >
            Jovian Moons
          </button>
        </div>
      </div>

      {/* MAIN VIEWPORT & CONTROLS */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* CANVAS VIEWPORT (3 COLS) */}
        <div className="xl:col-span-3 space-y-4">
          
          <div className="relative rounded-2xl bg-black border border-slate-800 overflow-hidden shadow-2xl">
            
            {/* Real-time Canvas with proper coordinate scaling and touch support */}
            <canvas 
              ref={canvasRef} 
              width={1000} 
              height={600} 
              onMouseDown={e => handleStart(e.clientX, e.clientY)}
              onMouseMove={e => handleMove(e.clientX, e.clientY)}
              onMouseUp={handleEnd}
              onTouchStart={e => {
                if (e.touches[0]) handleStart(e.touches[0].clientX, e.touches[0].clientY);
              }}
              onTouchMove={e => {
                if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
              }}
              onTouchEnd={handleEnd}
              className="w-full h-[480px] sm:h-[580px] cursor-crosshair block touch-none"
            />

            {/* In-Canvas Instruction Overlay */}
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center space-x-2 pointer-events-none">
              <Crosshair className="w-3.5 h-3.5 text-hud-cyan animate-pulse" />
              <span>Click & drag anywhere to launch <strong>{selectedBodyType.name}</strong></span>
            </div>

            {/* In-Canvas Status Alert Banner */}
            <div className="absolute top-3 right-3 flex items-center space-x-2">
              <span className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold border backdrop-blur-md ${
                telemetry.status.includes('COLLISION') || telemetry.status.includes('DECAY')
                  ? 'bg-rose-950/85 border-rose-600 text-rose-300 animate-pulse'
                  : 'bg-black/80 border-slate-800 text-hud-cyan'
              }`}>
                {telemetry.status}
              </span>
            </div>

            {/* Bottom In-Canvas Controls */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition ${
                    isRunning ? 'bg-amber-500 text-black' : 'bg-hud-cyan text-black'
                  }`}
                >
                  {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isRunning ? 'Pause' : 'Resume'}</span>
                </button>

                <button
                  onClick={() => { bodiesRef.current = []; cratersRef.current = []; shockwavesRef.current = []; }}
                  className="px-2.5 py-1.5 rounded-lg bg-cosmic-950 border border-slate-800 text-slate-300 hover:text-white transition"
                >
                  Clear Screen
                </button>

                <button
                  onClick={() => loadScenario('circular_leo')}
                  className="p-1.5 rounded-lg bg-cosmic-950 border border-slate-800 text-slate-300 hover:text-white transition"
                  title="Reset scenario"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Time Warp Slider */}
              <div className="flex items-center space-x-2 text-slate-400">
                <span>WARP: {timeStep}x</span>
                <input 
                  type="range" 
                  min="0.25" 
                  max="3.0" 
                  step="0.25" 
                  value={timeStep} 
                  onChange={e => setTimeStep(Number(e.target.value))}
                  className="w-24 accent-hud-cyan cursor-pointer"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center space-x-3 text-[11px] text-slate-300">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showPredictedOrbit} 
                    onChange={e => setShowPredictedOrbit(e.target.checked)}
                    className="accent-hud-cyan"
                  />
                  <span>Orbit Line</span>
                </label>

                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showGravityGrid} 
                    onChange={e => setShowGravityGrid(e.target.checked)}
                    className="accent-hud-cyan"
                  />
                  <span>Gravity Rings</span>
                </label>

                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showAtmosphere} 
                    onChange={e => setShowAtmosphere(e.target.checked)}
                    className="accent-hud-cyan"
                  />
                  <span>Atmosphere</span>
                </label>
              </div>

            </div>

          </div>

          {/* TELEMETRY STRIP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-black border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">ORBITAL SPEED</div>
              <div className="text-base sm:text-lg font-bold text-hud-cyan mt-0.5">
                {(telemetry.speed * 4.2).toFixed(2)} km/s
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">ALTITUDE</div>
              <div className="text-base sm:text-lg font-bold text-hud-emerald mt-0.5">
                {Math.round(telemetry.altitude * 6.5).toLocaleString()} km
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">ECCENTRICITY (e)</div>
              <div className="text-base sm:text-lg font-bold text-hud-amber mt-0.5">
                {telemetry.eccentricity.toFixed(3)}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">ACTIVE BODIES</div>
              <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                {telemetry.activeBodies} In Flight
              </div>
            </div>
          </div>

        </div>

        {/* SIDEBAR CONFIGURATION (1 COL) */}
        <div className="space-y-4">
          
          {/* Projectile Body Selector */}
          <div className="p-4 rounded-xl bg-black border border-slate-800 space-y-3 font-mono text-xs">
            <h3 className="font-bold text-white uppercase text-xs flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-hud-cyan" />
              <span>Projectile Type</span>
            </h3>

            <div className="space-y-1.5">
              {BODY_TYPES.map(body => {
                const isSelected = selectedBodyType.id === body.id;
                return (
                  <button
                    key={body.id}
                    onClick={() => setSelectedBodyType(body)}
                    className={`w-full p-2 rounded-lg border text-left flex items-center justify-between transition ${
                      isSelected 
                        ? 'bg-cyan-500/20 border-hud-cyan text-white font-bold' 
                        : 'bg-cosmic-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: body.color }}></span>
                      <span>{body.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">M={body.mass}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>LAUNCH VELOCITY POWER</span>
                <span className="text-hud-cyan font-bold">{launchSpeedMultiplier.toFixed(1)}x</span>
              </div>
              <input 
                type="range" 
                min="0.4" 
                max="2.5" 
                step="0.1" 
                value={launchSpeedMultiplier} 
                onChange={e => setLaunchSpeedMultiplier(Number(e.target.value))}
                className="w-full accent-hud-cyan cursor-pointer"
              />
            </div>
          </div>

          {/* Central Planet Preset */}
          <div className="p-4 rounded-xl bg-black border border-slate-800 space-y-3 font-mono text-xs">
            <h3 className="font-bold text-white uppercase text-xs flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-hud-emerald" />
              <span>Central Celestial Body</span>
            </h3>

            <div className="space-y-1.5">
              {PLANET_PRESETS.map((p, idx) => {
                const isCurrent = planet.name === p.name;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setPlanet(p);
                      cratersRef.current = [];
                    }}
                    className={`w-full p-2 rounded-lg border text-left transition ${
                      isCurrent
                        ? 'bg-emerald-500/20 border-hud-emerald text-white font-bold'
                        : 'bg-cosmic-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-100">{p.name}</span>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{p.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Impact Record */}
          <div className="p-4 rounded-xl bg-black border border-rose-500/30 space-y-2 font-mono text-xs">
            <h3 className="font-bold text-rose-300 uppercase text-xs flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-hud-rose animate-bounce" />
              <span>Last Collision Dossier</span>
            </h3>

            {telemetry.lastImpact ? (
              <div className="space-y-1 text-[11px] bg-cosmic-950 p-2.5 rounded-lg border border-rose-900/60 text-slate-300">
                <div>TARGET: <strong className="text-white">{telemetry.lastImpact.bodyName}</strong></div>
                <div>IMPACT SPEED: <strong className="text-hud-amber">{telemetry.lastImpact.speedKms} km/s</strong></div>
                <div>ENERGY YIELD: <strong className="text-hud-rose">{telemetry.lastImpact.megatonsTnt} MT TNT</strong></div>
                <div>CRATER ESTIMATE: <strong className="text-slate-100">{telemetry.lastImpact.craterDiameterKm} km</strong></div>
                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">TIME: {telemetry.lastImpact.time}</div>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 py-2 text-center">
                No impact recorded. Launch a projectile directly at the planet to trigger cratering.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

// Canvas rendering helpers
function drawGravityGrid(ctx, width, height, cx, cy, planet) {
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
  ctx.lineWidth = 1;

  for (let r = 80; r < Math.max(width, height); r += 65) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawPlanet(ctx, cx, cy, planet, showAtmosphere) {
  // Atmosphere glow
  if (showAtmosphere && planet.atmosphereRadius > planet.radius) {
    const grad = ctx.createRadialGradient(cx, cy, planet.radius, cx, cy, planet.atmosphereRadius);
    grad.addColorStop(0, planet.atmosphereColor);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, planet.atmosphereRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.arc(cx, cy, planet.atmosphereRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Planet body
  const pGrad = ctx.createRadialGradient(cx - planet.radius * 0.3, cy - planet.radius * 0.3, planet.radius * 0.1, cx, cy, planet.radius);
  pGrad.addColorStop(0, '#ffffff');
  pGrad.addColorStop(0.35, planet.color);
  pGrad.addColorStop(1, '#020510');

  ctx.fillStyle = pGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, planet.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = planet.color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawCraters(ctx, craters) {
  for (const c of craters) {
    ctx.fillStyle = '#060a16';
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 51, 102, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

function drawShockwaves(ctx, shockwaves) {
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const s = shockwaves[i];
    s.radius += 2.5;
    s.alpha -= 0.02;

    if (s.alpha <= 0 || s.radius >= s.maxRadius) {
      shockwaves.splice(i, 1);
      continue;
    }

    ctx.strokeStyle = `rgba(255, 170, 0, ${s.alpha})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawTrail(ctx, body) {
  if (body.trail.length < 2) return;
  ctx.strokeStyle = body.color;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let i = 0; i < body.trail.length; i++) {
    const p = body.trail[i];
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.globalAlpha = 0.45;
  ctx.stroke();
  ctx.globalAlpha = 1.0;
}

function drawBody(ctx, body) {
  ctx.fillStyle = body.color;
  ctx.beginPath();
  ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '9px monospace';
  ctx.fillText(body.name, body.x + body.radius + 4, body.y - body.radius);
}

function drawCometTail(ctx, body, cx, cy) {
  const dx = body.x - cx;
  const dy = body.y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return;

  const tailLen = Math.min(70, (1400 / dist) * 20);
  const tailX = body.x + (dx / dist) * tailLen;
  const tailY = body.y + (dy / dist) * tailLen;

  const grad = ctx.createLinearGradient(body.x, body.y, tailX, tailY);
  grad.addColorStop(0, 'rgba(56, 189, 248, 0.8)');
  grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

  ctx.strokeStyle = grad;
  ctx.lineWidth = body.radius * 1.5;
  ctx.beginPath();
  ctx.moveTo(body.x, body.y);
  ctx.lineTo(tailX, tailY);
  ctx.stroke();
}

function drawOrbitPrediction(ctx, body, cx, cy, planet) {
  let px = body.x;
  let py = body.y;
  let pvx = body.vx;
  let pvy = body.vy;
  const dt = 0.08;
  const points = [];

  for (let step = 0; step < 180; step++) {
    const dx = cx - px;
    const dy = cy - py;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= planet.radius) {
      points.push({ x: px, y: py, hit: true });
      break;
    }

    const force = (G_SIM * planet.mass) / Math.max(dist * dist, 120);
    const ax = (dx / dist) * force;
    const ay = (dy / dist) * force;

    pvx += ax * dt;
    pvy += ay * dt;
    px += pvx * dt * 60;
    py += pvy * dt * 60;

    points.push({ x: px, y: py, hit: false });
  }

  if (points.length < 2) return;

  ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  const last = points[points.length - 1];
  if (last.hit) {
    ctx.strokeStyle = '#ff3366';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(last.x, last.y, 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#ff3366';
    ctx.font = '9px monospace';
    ctx.fillText('IMPACT', last.x + 12, last.y + 3);
  }
}

function updateAndDrawParticles(ctx, particles) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.97;
    p.vy *= 0.97;
    p.life -= p.decay;

    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }

    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.life;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }
}

function drawAimGuide(ctx, start, current, bodyType, speedMul) {
  ctx.strokeStyle = bodyType.color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(current.x, current.y);
  ctx.stroke();

  ctx.fillStyle = bodyType.color;
  ctx.beginPath();
  ctx.arc(start.x, start.y, bodyType.radius, 0, Math.PI * 2);
  ctx.fill();

  const dx = start.x - current.x;
  const dy = start.y - current.y;
  const vx = dx * 0.085 * speedMul;
  const vy = dy * 0.085 * speedMul;

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([2, 4]);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(start.x + vx * 20, start.y + vy * 20);
  ctx.stroke();
  ctx.setLineDash([]);
}
