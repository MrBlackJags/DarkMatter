import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Orbit,
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

const G_SIM = 1.0;

export const PLANET_PRESETS = [
  {
    name: 'Earth Analog (Terra)',
    mass: 1200,
    radius: 70,
    atmosphereRadius: 105,
    color: '#00f0ff',
    atmosphereColor: 'rgba(0, 240, 255, 0.16)',
    desc: 'Dense atmosphere, balanced surface gravity (g = 9.8 m/s²)',
    type: 'terrestrial'
  },
  {
    name: 'Mars Analog (Ares)',
    mass: 480,
    radius: 52,
    atmosphereRadius: 72,
    color: '#ff5533',
    atmosphereColor: 'rgba(255, 85, 51, 0.12)',
    desc: 'Low mass, thin atmosphere, shallow gravitational well',
    type: 'terrestrial'
  },
  {
    name: 'Gas Giant Core (Jovian)',
    mass: 3600,
    radius: 105,
    atmosphereRadius: 155,
    color: '#ffaa00',
    atmosphereColor: 'rgba(255, 170, 0, 0.22)',
    desc: 'Deep gravity well with dense turbulent atmospheric drag',
    type: 'gas_giant'
  },
  {
    name: 'Solar Class G Star',
    mass: 5500,
    radius: 80,
    atmosphereRadius: 125,
    color: '#ffcc33',
    atmosphereColor: 'rgba(255, 204, 51, 0.22)',
    desc: 'Luminous main-sequence star with coronal solar envelope',
    type: 'star'
  },
  {
    name: 'Dense Neutron Star',
    mass: 7500,
    radius: 32,
    atmosphereRadius: 42,
    color: '#a855f7',
    atmosphereColor: 'rgba(168, 85, 247, 0.25)',
    desc: 'Intense gravitational spacetime curvature',
    type: 'neutron'
  },
  {
    name: 'Kerr Singularity (Black Hole)',
    mass: 11000,
    radius: 28,
    atmosphereRadius: 75,
    color: '#ff6600',
    atmosphereColor: 'rgba(255, 100, 20, 0.25)',
    desc: 'Relativistic event horizon with photon sphere and accretion disk',
    type: 'blackhole'
  }
];

export const BODY_TYPES = [
  { id: 'probe', name: 'Science Satellite', mass: 1, radius: 5, color: '#00ff88', desc: 'Lightweight orbital probe' },
  { id: 'asteroid', name: 'Near-Earth Asteroid', mass: 50, radius: 7, color: '#ffaa00', desc: 'Porous rocky asteroid' },
  { id: 'chx_asteroid', name: 'Chicxulub Impactor', mass: 400, radius: 10, color: '#ff3366', desc: 'Massive extinction-level impactor' },
  { id: 'moon', name: 'Lunar Body', mass: 180, radius: 8, color: '#e2e8f0', desc: 'Natural solid satellite' },
  { id: 'comet', name: 'Volatile Ice Comet', mass: 20, radius: 5, color: '#38bdf8', desc: 'Outgassing frozen volatiles' }
];

export default function OrbitSimulator({ initialStar = null }) {
  const canvasRef = useRef(null);
  
  // State
  const [planet, setPlanet] = useState(() => {
    if (initialStar) {
      const massVal = Math.min(12000, Math.max(400, Math.round((Number(initialStar.massSolar) || 1.0) * 1200)));
      const radiusVal = Math.min(110, Math.max(30, Math.round(Math.pow(Number(initialStar.radiusSolar) || 1.0, 0.4) * 45)));
      const starColor = initialStar.spectralClass === 'O' ? '#6699ff' : (initialStar.spectralClass === 'M' ? '#ff4433' : '#ffcc33');
      return {
        name: initialStar.name,
        mass: massVal,
        radius: radiusVal,
        atmosphereRadius: Math.round(radiusVal * 1.55),
        color: starColor,
        atmosphereColor: 'rgba(255, 180, 50, 0.22)',
        desc: `${initialStar.subType || 'Survey Star'} (${initialStar.temperatureK || 5500} K)`,
        type: 'star'
      };
    }
    return PLANET_PRESETS[0];
  });

  const [selectedBodyType, setSelectedBodyType] = useState(BODY_TYPES[0]);
  const [activeScenario, setActiveScenario] = useState('circular_leo');
  const [isRunning, setIsRunning] = useState(true);
  const [timeStep, setTimeStep] = useState(1.0);
  const [showGravityGrid, setShowGravityGrid] = useState(true);
  const [showPredictedOrbit, setShowPredictedOrbit] = useState(true);
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  const [launchSpeedMultiplier, setLaunchSpeedMultiplier] = useState(1.0);

  // Slingshot Aim (using ref to prevent destroying 60fps loop on mousemove)
  const [isAiming, setIsAiming] = useState(false);
  const aimRef = useRef({
    isAiming: false,
    start: { x: 0, y: 0 },
    current: { x: 0, y: 0 }
  });

  // Physics arrays & loop throttling
  const bodiesRef = useRef([]);
  const impactParticlesRef = useRef([]);
  const cratersRef = useRef([]);
  const shockwavesRef = useRef([]);
  const frameCountRef = useRef(0);

  // Telemetry
  const [telemetry, setTelemetry] = useState({
    activeBodies: 0,
    speed: 0,
    altitude: 0,
    eccentricity: 0,
    status: 'READY / INJECTION ACTIVE',
    lastImpact: null
  });

  const getCanvasCoords = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 500, y: 300 };
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return { x: 500, y: 300 };
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const getCenter = () => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 500, y: 300 };
    return { x: canvas.width / 2, y: canvas.height / 2 };
  };

  // Scenario presets
  const loadScenario = useCallback((scenarioKey) => {
    setActiveScenario(scenarioKey);
    const center = getCenter();
    impactParticlesRef.current = [];
    cratersRef.current = [];
    shockwavesRef.current = [];

    if (scenarioKey === 'circular_leo') {
      setPlanet(PLANET_PRESETS[0]); // Terra
      const r = 170;
      const v = Math.sqrt((G_SIM * PLANET_PRESETS[0].mass) / r);
      bodiesRef.current = [
        {
          id: 'probe-1',
          name: 'Orbiter Alpha (LEO)',
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
      const r = 130;
      const v = Math.sqrt((G_SIM * PLANET_PRESETS[0].mass) / r) * 1.25;
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
          y: center.y - 180,
          vx: 2.85,
          vy: 1.45,
          mass: 400,
          radius: 10,
          color: '#ff3366',
          trail: []
        }
      ];
    } else if (scenarioKey === 'aerobraking') {
      setPlanet(PLANET_PRESETS[0]);
      const r = 98;
      const v = Math.sqrt((G_SIM * PLANET_PRESETS[0].mass) / r) * 0.96;
      bodiesRef.current = [
        {
          id: 'probe-decay',
          name: 'Re-entry Capsule',
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
      const r1 = 180;
      const v1 = Math.sqrt((G_SIM * PLANET_PRESETS[2].mass) / r1);
      const r2 = 280;
      const v2 = Math.sqrt((G_SIM * PLANET_PRESETS[2].mass) / r2);
      bodiesRef.current = [
        {
          id: 'moon-inner',
          name: 'Inner Moonlet (Io Analog)',
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
          name: 'Outer Moonlet (Europa Analog)',
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
    } else if (scenarioKey === 'solar_system') {
      setPlanet(PLANET_PRESETS[3]); // Solar Star
      const bodies = [
        { name: 'Mercury Analog', r: 125, color: '#94a3b8', mass: 10, radius: 4.5 },
        { name: 'Venus Analog', r: 175, color: '#f59e0b', mass: 20, radius: 5.5 },
        { name: 'Earth Analog', r: 240, color: '#38bdf8', mass: 25, radius: 6 },
        { name: 'Mars Analog', r: 310, color: '#ef4444', mass: 15, radius: 5 }
      ];
      bodiesRef.current = bodies.map((b, idx) => {
        const v = Math.sqrt((G_SIM * PLANET_PRESETS[3].mass) / b.r);
        return {
          id: `solar-body-${idx}`,
          name: b.name,
          type: 'probe',
          x: center.x,
          y: center.y - b.r,
          vx: v,
          vy: 0,
          mass: b.mass,
          radius: b.radius,
          color: b.color,
          trail: []
        };
      });
    } else if (scenarioKey === 'blackhole_geodesic') {
      setPlanet(PLANET_PRESETS[5]); // Black Hole
      bodiesRef.current = [
        {
          id: 'probe-bh',
          name: 'Relativistic Probe (Sgr A*)',
          type: 'probe',
          x: center.x - 240,
          y: center.y - 120,
          vx: 3.8,
          vy: -2.1,
          mass: 5,
          radius: 5,
          color: '#38bdf8',
          trail: []
        }
      ];
    }
  }, []);

  useEffect(() => {
    loadScenario('circular_leo');
  }, [loadScenario]);

  // Mouse & Touch aiming handlers (do not trigger re-render on move)
  const handleStart = (clientX, clientY) => {
    const coords = getCanvasCoords(clientX, clientY);
    aimRef.current = {
      isAiming: true,
      start: coords,
      current: coords
    };
    setIsAiming(true);
  };

  const handleMove = (clientX, clientY) => {
    if (!aimRef.current.isAiming) return;
    aimRef.current.current = getCanvasCoords(clientX, clientY);
  };

  const handleEnd = () => {
    if (!aimRef.current.isAiming) return;
    const { start, current } = aimRef.current;
    aimRef.current.isAiming = false;
    setIsAiming(false);

    const dx = start.x - current.x;
    const dy = start.y - current.y;
    const dragDist = Math.hypot(dx, dy);

    let vx = dx * 0.045 * launchSpeedMultiplier;
    let vy = dy * 0.045 * launchSpeedMultiplier;

    const cx = canvasRef.current ? canvasRef.current.width / 2 : 500;
    const cy = canvasRef.current ? canvasRef.current.height / 2 : 300;

    // If tapped or clicked without dragging, provide stable orbital injection tangent
    if (dragDist < 6) {
      const distFromCenter = Math.hypot(start.x - cx, start.y - cy);
      const orbitSpeed = Math.sqrt((G_SIM * planet.mass) / Math.max(distFromCenter, 60));
      const nx = -(start.y - cy) / distFromCenter;
      const ny = (start.x - cx) / distFromCenter;
      vx = nx * orbitSpeed * launchSpeedMultiplier;
      vy = ny * orbitSpeed * launchSpeedMultiplier;
    }

    // Ensure spawn is outside the planet surface
    const distFromCenter = Math.hypot(start.x - cx, start.y - cy);
    if (distFromCenter < planet.radius + 15) {
      const ang = Math.atan2(start.y - cy, start.x - cx);
      start.x = cx + Math.cos(ang) * (planet.radius + 20);
      start.y = cy + Math.sin(ang) * (planet.radius + 20);
    }

    bodiesRef.current.push({
      id: `body-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: `${selectedBodyType.name} #${bodiesRef.current.length + 1}`,
      type: selectedBodyType.id,
      x: start.x,
      y: start.y,
      vx,
      vy,
      mass: selectedBodyType.mass,
      radius: selectedBodyType.radius,
      color: selectedBodyType.color,
      trail: []
    });
  };

  // Quick 1-click orbital injection
  const handleQuickLaunchOrbit = () => {
    const center = getCenter();
    const r = planet.radius + 105;
    const v = Math.sqrt((G_SIM * planet.mass) / r) * launchSpeedMultiplier;
    bodiesRef.current.push({
      id: `body-quick-orbit-${Date.now()}`,
      name: `${selectedBodyType.name} (Orbital)`,
      type: selectedBodyType.id,
      x: center.x,
      y: center.y - r,
      vx: v,
      vy: 0,
      mass: selectedBodyType.mass,
      radius: selectedBodyType.radius,
      color: selectedBodyType.color,
      trail: []
    });
  };

  // Quick 1-click direct planetary impact
  const handleQuickLaunchImpact = () => {
    const center = getCenter();
    const spawnX = center.x - 320;
    const spawnY = center.y - 170;
    const targetAngle = Math.atan2(center.y - spawnY, center.x - spawnX);
    const speed = 3.2 * launchSpeedMultiplier;

    bodiesRef.current.push({
      id: `body-quick-impact-${Date.now()}`,
      name: `${selectedBodyType.name} (Impactor)`,
      type: selectedBodyType.id,
      x: spawnX,
      y: spawnY,
      vx: Math.cos(targetAngle) * speed,
      vy: Math.sin(targetAngle) * speed,
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
          const dt = (1.0 * timeStep) / steps;

          for (let s = 0; s < steps; s++) {
            const dx = cx - b.x;
            const dy = cy - b.y;
            const dist = Math.hypot(dx, dy);

            if (dist <= planet.radius + b.radius * 0.7) {
              triggerCollision(b, cx, cy, planet);
              b.collided = true;
              break;
            }

            const force = (G_SIM * planet.mass) / Math.max(dist * dist, 100);
            const ax = (dx / dist) * force;
            const ay = (dy / dist) * force;

            let dragX = 0;
            let dragY = 0;
            if (dist < planet.atmosphereRadius && dist > planet.radius) {
              const altRatio = (dist - planet.radius) / (planet.atmosphereRadius - planet.radius);
              const density = Math.exp(-3 * altRatio) * 0.0016;
              const speed = Math.hypot(b.vx, b.vy);
              dragX = -0.5 * density * speed * b.vx;
              dragY = -0.5 * density * speed * b.vy;

              if (speed > 1.2 && Math.random() < 0.3) {
                impactParticlesRef.current.push({
                  x: b.x + (Math.random() - 0.5) * 4,
                  y: b.y + (Math.random() - 0.5) * 4,
                  vx: -b.vx * 0.2 + (Math.random() - 0.5),
                  vy: -b.vy * 0.2 + (Math.random() - 0.5),
                  life: 1.0,
                  decay: 0.06,
                  color: '#ffaa00',
                  size: 2
                });
              }
            }

            b.vx += (ax + dragX) * dt;
            b.vy += (ay + dragY) * dt;
            b.x += b.vx * dt;
            b.y += b.vy * dt;
          }
        }

        if (!b.collided) {
          const distFromCenter = Math.hypot(cx - b.x, cy - b.y);
          // Cull if escaped too far (> 2800 px) to prevent memory leak
          if (distFromCenter > 2800) {
            continue;
          }

          b.trail.push({ x: b.x, y: b.y });
          if (b.trail.length > 220) b.trail.shift();

          drawTrail(ctx, b);
          drawBody(ctx, b);
          if (b.type === 'comet') drawCometTail(ctx, b, cx, cy);

          surviving.push(b);
        }
      }

      bodiesRef.current = surviving;

      // 6. Kepler orbit prediction (live preview during aim, or tracks active body)
      if (showPredictedOrbit) {
        if (aimRef.current.isAiming) {
          const { start, current } = aimRef.current;
          const dx = start.x - current.x;
          const dy = start.y - current.y;
          const dragDist = Math.hypot(dx, dy);
          let vx = dx * 0.045 * launchSpeedMultiplier;
          let vy = dy * 0.045 * launchSpeedMultiplier;
          if (dragDist < 6) {
            const distFromCenter = Math.hypot(start.x - cx, start.y - cy);
            const orbitSpeed = Math.sqrt((G_SIM * planet.mass) / Math.max(distFromCenter, 60));
            vx = -(start.y - cy) / distFromCenter * orbitSpeed * launchSpeedMultiplier;
            vy = (start.x - cx) / distFromCenter * orbitSpeed * launchSpeedMultiplier;
          }
          const aimingBody = { x: start.x, y: start.y, vx, vy, radius: selectedBodyType.radius };
          drawOrbitPrediction(ctx, aimingBody, cx, cy, planet, true);
        } else if (surviving.length > 0) {
          drawOrbitPrediction(ctx, surviving[surviving.length - 1], cx, cy, planet, false);
        }
      }

      // 7. Impact particles
      updateAndDrawParticles(ctx, impactParticlesRef.current);

      // 8. Slingshot guide (drawn smoothly from aimRef)
      if (aimRef.current.isAiming) {
        drawAimGuide(ctx, aimRef.current.start, aimRef.current.current, selectedBodyType, launchSpeedMultiplier);
      }

      // Update HUD telemetry throttled every 6 frames (~10Hz) to prevent React state churn
      frameCountRef.current++;
      if (frameCountRef.current % 6 === 0) {
        if (surviving.length > 0) {
          const lead = surviving[surviving.length - 1];
          const dx = cx - lead.x;
          const dy = cy - lead.y;
          const dist = Math.hypot(dx, dy);
          const altitude = Math.max(0, dist - planet.radius);
          const speed = Math.hypot(lead.vx, lead.vy);

          const mu = G_SIM * planet.mass;
          const rVec = { x: lead.x - cx, y: lead.y - cy };
          const vVec = { x: lead.vx, y: lead.vy };
          const energy = (speed * speed) / 2 - mu / dist;
          const h = rVec.x * vVec.y - rVec.y * vVec.x;
          const eTerm = 1 + (2 * energy * h * h) / (mu * mu);
          const ecc = eTerm >= 0 ? Math.sqrt(eTerm) : 1;

          let statusText = 'STABLE ORBIT';
          if (dist < planet.atmosphereRadius) statusText = 'ATMOSPHERIC DECAY';
          if (ecc >= 1.08) statusText = 'HYPERBOLIC ESCAPE';
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
            status: 'READY / INJECTION ACTIVE'
          }));
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, timeStep, showGravityGrid, showPredictedOrbit, showAtmosphere, selectedBodyType, launchSpeedMultiplier, planet]);

  const triggerCollision = (body, cx, cy, planetState) => {
    const speed = Math.hypot(body.vx, body.vy);
    const impactSpeedKms = (speed * 11.2).toFixed(1);
    const massTons = body.mass * 1e5;
    const kineticEnergyJoules = 0.5 * massTons * 1000 * Math.pow(Number(impactSpeedKms) * 1000, 2);
    const megatonsTnt = kineticEnergyJoules / 4.184e15;
    const craterDiameterKm = (Math.pow(Math.max(megatonsTnt, 0.1), 0.294) * 2.2).toFixed(1);

    const angle = Math.atan2(body.y - cy, body.x - cx);
    const impactX = cx + Math.cos(angle) * planetState.radius;
    const impactY = cy + Math.sin(angle) * planetState.radius;

    cratersRef.current.push({
      x: impactX,
      y: impactY,
      radius: Math.max(6, Math.min(26, body.radius * 1.8)),
      createdAt: Date.now()
    });

    shockwavesRef.current.push({
      x: impactX,
      y: impactY,
      radius: 4,
      maxRadius: Math.min(150, body.radius * 10),
      alpha: 1.0
    });

    const particleCount = Math.min(90, body.radius * 10);
    for (let i = 0; i < particleCount; i++) {
      const pAngle = angle + Math.PI + (Math.random() - 0.5) * 2.2;
      const pSpeed = Math.random() * 5 + 1.5;
      impactParticlesRef.current.push({
        x: impactX,
        y: impactY,
        vx: Math.cos(pAngle) * pSpeed,
        vy: Math.sin(pAngle) * pSpeed,
        life: 1.0,
        decay: Math.random() * 0.025 + 0.02,
        color: i % 2 === 0 ? '#ff3366' : '#ffaa00',
        size: Math.random() * 3 + 1.5
      });
    }

    setTelemetry(prev => ({
      ...prev,
      lastImpact: {
        bodyName: body.name,
        speedKms: impactSpeedKms,
        megatonsTnt: Math.round(megatonsTnt).toLocaleString(),
        craterDiameterKm: craterDiameterKm,
        time: new Date().toLocaleTimeString()
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* SIMULATOR HEADER & PRESET BAR */}
      <div className="bg-black/80 border border-slate-800 rounded-2xl p-5 sm:p-6 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
            <Orbit className="w-4 h-4 text-cyan-400" />
            <span>ORBITAL GRAVITY & RELATIVISTIC IMPACT SIMULATOR</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            Simulate Orbits, Gravity Wells & Planetary Collisions
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-sans mt-0.5">
            Click &amp; drag on the canvas to slingshot any projectile. Watch orbital mechanics, atmospheric drag, and high-energy cratering in real time.
          </p>
        </div>

        {/* Scenario Presets */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {[
            { id: 'circular_leo', label: 'LEO Circular' },
            { id: 'elliptical', label: 'Molniya Ellipse' },
            { id: 'collision', label: 'Meteor Impact', alert: true },
            { id: 'aerobraking', label: 'Atmospheric Decay', warn: true },
            { id: 'binary_moons', label: 'Jovian Moons' },
            { id: 'solar_system', label: 'Solar System' },
            { id: 'blackhole_geodesic', label: 'Sgr A* Singularity' }
          ].map((sc) => (
            <button
              key={sc.id}
              onClick={() => loadScenario(sc.id)}
              className={`px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                activeScenario === sc.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                  : sc.alert
                  ? 'bg-rose-950/60 border-rose-700/60 text-rose-300 hover:bg-rose-900 font-bold'
                  : sc.warn
                  ? 'bg-black border-slate-800 hover:border-amber-400 text-slate-300 hover:text-amber-400'
                  : 'bg-black border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-cyan-300'
              }`}
            >
              {sc.label}
            </button>
          ))}
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
              onMouseLeave={handleEnd}
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
            <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 flex items-center space-x-2.5 pointer-events-none">
              <Crosshair className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>
                <strong>Click &amp; drag</strong> to slingshot, or click <strong>Direct Impact</strong>
              </span>
            </div>

            {/* In-Canvas Status Alert Banner */}
            <div className="absolute top-3 right-3 flex items-center space-x-2">
              <span className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold border backdrop-blur-md ${
                telemetry.status.includes('COLLISION') || telemetry.status.includes('DECAY')
                  ? 'bg-rose-950/85 border-rose-600 text-rose-300 animate-pulse'
                  : 'bg-black/80 border-slate-800 text-cyan-400'
              }`}>
                {telemetry.status}
              </span>
            </div>

            {/* Bottom In-Canvas Controls */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition cursor-pointer ${
                    isRunning ? 'bg-amber-500 text-black' : 'bg-cyan-400 text-black'
                  }`}
                >
                  {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isRunning ? 'Pause' : 'Resume'}</span>
                </button>

                <button
                  onClick={() => { bodiesRef.current = []; cratersRef.current = []; shockwavesRef.current = []; }}
                  className="px-2.5 py-1.5 rounded-lg bg-black border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  Clear Screen
                </button>

                <button
                  onClick={() => loadScenario(activeScenario)}
                  className="p-1.5 rounded-lg bg-black border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                  title="Reset scenario"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Time Warp Slider */}
              <div className="flex items-center space-x-2 text-slate-400">
                <span>WARP: {timeStep.toFixed(1)}x</span>
                <input 
                  type="range" 
                  min="0.25" 
                  max="3.0" 
                  step="0.25" 
                  value={timeStep} 
                  onChange={e => setTimeStep(Number(e.target.value))}
                  className="w-24 accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center space-x-3 text-[11px] text-slate-300">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showPredictedOrbit} 
                    onChange={e => setShowPredictedOrbit(e.target.checked)}
                    className="accent-cyan-400"
                  />
                  <span>Orbit Ray</span>
                </label>

                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showGravityGrid} 
                    onChange={e => setShowGravityGrid(e.target.checked)}
                    className="accent-cyan-400"
                  />
                  <span>Gravity Rings</span>
                </label>

                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showAtmosphere} 
                    onChange={e => setShowAtmosphere(e.target.checked)}
                    className="accent-cyan-400"
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
              <div className="text-base sm:text-lg font-bold text-cyan-300 mt-0.5">
                {(telemetry.speed * 4.2).toFixed(2)} km/s
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">ALTITUDE</div>
              <div className="text-base sm:text-lg font-bold text-emerald-400 mt-0.5">
                {Math.round(telemetry.altitude * 6.5).toLocaleString()} km
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">ECCENTRICITY (e)</div>
              <div className="text-base sm:text-lg font-bold text-amber-400 mt-0.5">
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
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Projectile Type</span>
            </h3>

            <div className="space-y-1.5">
              {BODY_TYPES.map(body => {
                const isSelected = selectedBodyType.id === body.id;
                return (
                  <button
                    key={body.id}
                    onClick={() => setSelectedBodyType(body)}
                    className={`w-full p-2 rounded-lg border text-left flex items-center justify-between transition cursor-pointer ${
                      isSelected 
                        ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold' 
                        : 'bg-black border-slate-800 text-slate-400 hover:border-slate-700'
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
                <span className="text-cyan-400 font-bold">{launchSpeedMultiplier.toFixed(1)}x</span>
              </div>
              <input 
                type="range" 
                min="0.4" 
                max="2.5" 
                step="0.1" 
                value={launchSpeedMultiplier} 
                onChange={e => setLaunchSpeedMultiplier(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Quick Action Launchers */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <div className="text-[10px] text-slate-500 uppercase font-mono mb-1">Instant Injection</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleQuickLaunchOrbit}
                  className="px-2.5 py-2 rounded-lg bg-emerald-950/60 border border-emerald-600/50 hover:bg-emerald-900 text-emerald-300 font-bold flex items-center justify-center gap-1.5 transition text-[11px] cursor-pointer"
                  title="Inject into circular orbit around current planet"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Launch Orbit</span>
                </button>
                <button
                  onClick={handleQuickLaunchImpact}
                  className="px-2.5 py-2 rounded-lg bg-rose-950/60 border border-rose-600/50 hover:bg-rose-900 text-rose-300 font-bold flex items-center justify-center gap-1.5 transition text-[11px] cursor-pointer"
                  title="Launch direct high-speed asteroid collision into planet"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Direct Impact</span>
                </button>
              </div>
            </div>
          </div>

          {/* Central Planet Preset */}
          <div className="p-4 rounded-xl bg-black border border-slate-800 space-y-3 font-mono text-xs">
            <h3 className="font-bold text-white uppercase text-xs flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
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
                    className={`w-full p-2 rounded-lg border text-left transition cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold'
                        : 'bg-black border-slate-800 text-slate-400 hover:border-slate-700'
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
              <Flame className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
              <span>Last Collision Dossier</span>
            </h3>

            {telemetry.lastImpact ? (
              <div className="space-y-1 text-[11px] bg-black p-2.5 rounded-lg border border-rose-900/60 text-slate-300">
                <div>TARGET: <strong className="text-white">{telemetry.lastImpact.bodyName}</strong></div>
                <div>IMPACT SPEED: <strong className="text-amber-400">{telemetry.lastImpact.speedKms} km/s</strong></div>
                <div>ENERGY YIELD: <strong className="text-rose-400">{telemetry.lastImpact.megatonsTnt} MT TNT</strong></div>
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

  // Black hole accretion disk
  if (planet.type === 'blackhole') {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.ellipse(0, -planet.radius * 0.35, planet.radius * 2.8, planet.radius * 0.9, 0, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 140, 30, 0.6)';
    ctx.lineWidth = planet.radius * 0.35;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, planet.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#010206';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, planet.radius * 1.05, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 230, 180, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(0, planet.radius * 0.2, planet.radius * 2.9, planet.radius * 0.7, 0, 0, Math.PI);
    ctx.strokeStyle = 'rgba(255, 120, 30, 0.85)';
    ctx.lineWidth = planet.radius * 0.45;
    ctx.stroke();
    ctx.restore();
    return;
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

function drawOrbitPrediction(ctx, body, cx, cy, planet, isAiming = false) {
  let px = body.x;
  let py = body.y;
  let pvx = body.vx;
  let pvy = body.vy;
  const dt = 1.0;
  const points = [];

  for (let step = 0; step < 420; step++) {
    const dx = cx - px;
    const dy = cy - py;
    const dist = Math.hypot(dx, dy);

    if (dist <= planet.radius) {
      points.push({ x: px, y: py, hit: true });
      break;
    }

    const force = (G_SIM * planet.mass) / Math.max(dist * dist, 100);
    const ax = (dx / dist) * force;
    const ay = (dy / dist) * force;

    pvx += ax * dt;
    pvy += ay * dt;
    px += pvx * dt;
    py += pvy * dt;

    points.push({ x: px, y: py, hit: false });
  }

  if (points.length < 2) return;

  ctx.strokeStyle = isAiming ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 240, 255, 0.45)';
  ctx.setLineDash(isAiming ? [5, 3] : [4, 4]);
  ctx.lineWidth = isAiming ? 2 : 1.5;
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
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(last.x, last.y, 9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#ff3366';
    ctx.font = 'bold 10px monospace';
    ctx.fillText('⚡ IMPACT', last.x + 13, last.y + 4);
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
  const vx = dx * 0.045 * speedMul;
  const vy = dy * 0.045 * speedMul;

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 4]);
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(start.x + vx * 25, start.y + vy * 25);
  ctx.stroke();
  ctx.setLineDash([]);
}
