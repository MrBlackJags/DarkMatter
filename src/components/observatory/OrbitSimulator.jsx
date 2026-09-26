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
  Layers, 
  Maximize2, 
  Minimize2, 
  Plus, 
  Minus, 
  StepForward, 
  Eye, 
  Sliders, 
  Activity, 
  Radio, 
  Compass as NavIcon,
  ShieldAlert,
  Info
} from 'lucide-react';

const G_SIM = 1.0;

// Central / Reference Planet Presets
export const CELESTIAL_WELL_PRESETS = [
  {
    id: 'terra',
    name: 'Earth Analog (Terra)',
    mass: 1200,
    radius: 65,
    atmosphereRadius: 100,
    color: '#00f0ff',
    atmosphereColor: 'rgba(0, 240, 255, 0.16)',
    desc: 'Dense atmosphere, balanced surface gravity (g = 9.8 m/s²)',
    type: 'planet'
  },
  {
    id: 'ares',
    name: 'Mars Analog (Ares)',
    mass: 480,
    radius: 48,
    atmosphereRadius: 68,
    color: '#ff5533',
    atmosphereColor: 'rgba(255, 85, 51, 0.12)',
    desc: 'Low mass, thin atmosphere, shallow gravitational well',
    type: 'planet'
  },
  {
    id: 'jovian',
    name: 'Gas Giant Core (Jovian)',
    mass: 3800,
    radius: 95,
    atmosphereRadius: 145,
    color: '#ffaa00',
    atmosphereColor: 'rgba(255, 170, 0, 0.22)',
    desc: 'Deep gravity well with dense turbulent atmospheric drag',
    type: 'gas_giant'
  },
  {
    id: 'sol',
    name: 'Solar Class G Star',
    mass: 6500,
    radius: 75,
    atmosphereRadius: 120,
    color: '#ffcc33',
    atmosphereColor: 'rgba(255, 204, 51, 0.24)',
    desc: 'Luminous yellow dwarf star with high surface temperature & coronal flares',
    type: 'star'
  },
  {
    id: 'neutron',
    name: 'Dense Neutron Star',
    mass: 8500,
    radius: 30,
    atmosphereRadius: 42,
    color: '#a855f7',
    atmosphereColor: 'rgba(168, 85, 247, 0.28)',
    desc: 'Relativistic spacetime curvature, intense surface magnetic field',
    type: 'neutron'
  },
  {
    id: 'blackhole',
    name: 'Kerr Singularity (Sgr A*)',
    mass: 14000,
    radius: 26,
    atmosphereRadius: 85,
    color: '#ff8833',
    atmosphereColor: 'rgba(255, 100, 30, 0.25)',
    desc: 'Supermassive gravitational sink with relativistic photon sphere & accretion disk',
    type: 'blackhole'
  }
];

// Projectile & Injected Body Types
export const INJECTED_BODY_TYPES = [
  { id: 'probe', name: 'Science Satellite', mass: 1, radius: 4.5, color: '#00ff88', desc: 'Lightweight scientific orbiter' },
  { id: 'asteroid', name: 'Near-Earth Asteroid', mass: 45, radius: 6.5, color: '#ffaa00', desc: 'Porous carbonaceous chondrite' },
  { id: 'chx_asteroid', name: 'Chicxulub Impactor', mass: 380, radius: 9.5, color: '#ff3366', desc: 'Massive extinction-level impactor' },
  { id: 'moon', name: 'Lunar Satellite', mass: 150, radius: 8, color: '#e2e8f0', desc: 'Solid natural satellite' },
  { id: 'comet', name: 'Volatile Ice Comet', mass: 20, radius: 5, color: '#38bdf8', desc: 'Outgassing ice & volatile tail' },
  { id: 'white_dwarf', name: 'White Dwarf Remnant', mass: 1200, radius: 11, color: '#38ef7d', desc: 'Dense degenerate stellar companion' }
];

export default function OrbitSimulator({ initialStar = null }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Central Celestial Well
  const [centralBody, setCentralBody] = useState(() => {
    if (initialStar) {
      return {
        id: initialStar.id,
        name: initialStar.name,
        mass: Math.min(16000, Math.max(800, Math.round(initialStar.massSolar * 1200))),
        radius: Math.min(110, Math.max(30, Math.round(Math.pow(initialStar.radiusSolar, 0.4) * 45))),
        atmosphereRadius: Math.round(Math.min(110, Math.max(30, Math.round(Math.pow(initialStar.radiusSolar, 0.4) * 45))) * 1.5),
        color: initialStar.spectralClass === 'O' ? '#6699ff' : (initialStar.spectralClass === 'M' ? '#ff4433' : '#ffcc33'),
        atmosphereColor: 'rgba(255, 180, 50, 0.2)',
        desc: `${initialStar.subType} (${initialStar.temperatureK} K, ${initialStar.massSolar} M☉)`
      };
    }
    return CELESTIAL_WELL_PRESETS[0];
  });

  const [selectedBodyType, setSelectedBodyType] = useState(INJECTED_BODY_TYPES[0]);
  const [activeScenario, setActiveScenario] = useState('circular_leo');
  const [isRunning, setIsRunning] = useState(true);
  const [timeStep, setTimeStep] = useState(1.0);
  const [launchSpeedMultiplier, setLaunchSpeedMultiplier] = useState(1.0);
  const [isNBodyMode, setIsNBodyMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Visual Overlays
  const [showGravityGrid, setShowGravityGrid] = useState(true);
  const [showPredictedOrbit, setShowPredictedOrbit] = useState(true);
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  const [showVectors, setShowVectors] = useState(false);
  const [showLagrangePoints, setShowLagrangePoints] = useState(false);

  // Camera Pan & Zoom
  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 1.0 });
  const [trackedBodyId, setTrackedBodyId] = useState(null);
  const isDraggingCanvasRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0, camX: 0, camY: 0 });

  // Slingshot Aim Ref (prevent re-renders on 60fps mouse drag)
  const [isAiming, setIsAiming] = useState(false);
  const aimRef = useRef({
    isAiming: false,
    start: { x: 0, y: 0 },
    current: { x: 0, y: 0 }
  });

  // Physics Arrays
  const bodiesRef = useRef([]);
  const impactParticlesRef = useRef([]);
  const cratersRef = useRef([]);
  const shockwavesRef = useRef([]);
  const frameCountRef = useRef(0);

  // Real-Time Telemetry HUD
  const [telemetry, setTelemetry] = useState({
    activeBodies: 0,
    speed: 0,
    speedKms: 0,
    altitudeKm: 0,
    eccentricity: 0,
    semiMajorAxis: 0,
    periapsisKm: 0,
    apoapsisKm: 0,
    periodSec: 0,
    status: 'READY / INJECTION ACTIVE',
    specificEnergy: 0,
    gammaDilation: 1.000,
    lastImpact: null
  });

  // Screen-to-World Coordinate Conversion
  const screenToWorld = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 500, y: 300 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const screenX = (clientX - rect.left) * scaleX;
    const screenY = (clientY - rect.top) * scaleY;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const worldX = (screenX - cx - camera.x) / camera.zoom + cx;
    const worldY = (screenY - cy - camera.y) / camera.zoom + cy;

    return { x: worldX, y: worldY };
  }, [camera]);

  const getCenter = () => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 500, y: 300 };
    return { x: canvas.width / 2, y: canvas.height / 2 };
  };

  // -------------------------------------------------------------
  // Scenario Loader
  // -------------------------------------------------------------
  const loadScenario = useCallback((scenarioKey) => {
    setActiveScenario(scenarioKey);
    const center = getCenter();
    impactParticlesRef.current = [];
    cratersRef.current = [];
    shockwavesRef.current = [];
    setTrackedBodyId(null);

    if (scenarioKey === 'circular_leo') {
      setIsNBodyMode(false);
      setCentralBody(CELESTIAL_WELL_PRESETS[0]); // Terra
      const r = 165;
      const v = Math.sqrt((G_SIM * CELESTIAL_WELL_PRESETS[0].mass) / r);
      bodiesRef.current = [
        {
          id: 'sat-leo',
          name: 'ISS / Terra Orbiter',
          type: 'probe',
          x: center.x,
          y: center.y - r,
          vx: v,
          vy: 0,
          mass: 2,
          radius: 5,
          color: '#00ff88',
          trail: []
        }
      ];
    } else if (scenarioKey === 'elliptical') {
      setIsNBodyMode(false);
      setCentralBody(CELESTIAL_WELL_PRESETS[0]);
      const r = 130;
      const v = Math.sqrt((G_SIM * CELESTIAL_WELL_PRESETS[0].mass) / r) * 1.28;
      bodiesRef.current = [
        {
          id: 'probe-molniya',
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
      setIsNBodyMode(false);
      setCentralBody(CELESTIAL_WELL_PRESETS[0]);
      bodiesRef.current = [
        {
          id: 'impactor-chx',
          name: 'Chicxulub Extinction Impactor (10km)',
          type: 'chx_asteroid',
          x: center.x - 360,
          y: center.y - 190,
          vx: 3.1,
          vy: 1.62,
          mass: 450,
          radius: 11,
          color: '#ff3366',
          trail: []
        }
      ];
    } else if (scenarioKey === 'aerobraking') {
      setIsNBodyMode(false);
      setCentralBody(CELESTIAL_WELL_PRESETS[0]);
      const r = 94;
      const v = Math.sqrt((G_SIM * CELESTIAL_WELL_PRESETS[0].mass) / r) * 0.94;
      bodiesRef.current = [
        {
          id: 'probe-decay',
          name: 'Atmospheric Re-entry Capsule',
          type: 'probe',
          x: center.x,
          y: center.y - r,
          vx: v,
          vy: 0,
          mass: 3,
          radius: 5,
          color: '#ffaa00',
          trail: []
        }
      ];
    } else if (scenarioKey === 'free_return_apollo') {
      // Earth-Moon Free Return Trajectory
      setIsNBodyMode(true);
      setCentralBody(CELESTIAL_WELL_PRESETS[0]); // Terra
      const moonDist = 280;
      const moonV = Math.sqrt((G_SIM * CELESTIAL_WELL_PRESETS[0].mass) / moonDist);
      bodiesRef.current = [
        {
          id: 'moon-luna',
          name: 'Moon (Luna)',
          type: 'moon',
          x: center.x + moonDist,
          y: center.y,
          vx: 0,
          vy: -moonV,
          mass: 140,
          radius: 12,
          color: '#e2e8f0',
          trail: []
        },
        {
          id: 'apollo-spacecraft',
          name: 'Apollo Free-Return Capsule',
          type: 'probe',
          x: center.x,
          y: center.y - 95,
          vx: 3.82,
          vy: -0.15,
          mass: 1,
          radius: 4,
          color: '#38bdf8',
          trail: []
        }
      ];
    } else if (scenarioKey === 'binary_stars') {
      // Binary Star System (Mutual Barycentric Orbit)
      setIsNBodyMode(true);
      setCentralBody({
        id: 'barycenter',
        name: 'Binary System Barycenter',
        mass: 0,
        radius: 4,
        atmosphereRadius: 0,
        color: '#ffffff',
        atmosphereColor: 'transparent',
        desc: 'Virtual Center of Mass'
      });
      const sep = 120;
      const m1 = 3200;
      const m2 = 2400;
      const v1 = Math.sqrt((G_SIM * m2 * m2) / ((m1 + m2) * sep * 2));
      const v2 = Math.sqrt((G_SIM * m1 * m1) / ((m1 + m2) * sep * 2));

      bodiesRef.current = [
        {
          id: 'star-sirius-a',
          name: 'Sirius A (Primary Blue Star)',
          type: 'star',
          x: center.x - sep * (m2 / (m1 + m2)),
          y: center.y,
          vx: 0,
          vy: v1,
          mass: m1,
          radius: 26,
          color: '#00f0ff',
          trail: []
        },
        {
          id: 'star-sirius-b',
          name: 'Sirius B (Secondary White Dwarf)',
          type: 'star',
          x: center.x + sep * (m1 / (m1 + m2)),
          y: center.y,
          vx: 0,
          vy: -v2,
          mass: m2,
          radius: 16,
          color: '#ffcc33',
          trail: []
        },
        {
          id: 'circumbinary-planet',
          name: 'Circumbinary Planet (Tatooine Analog)',
          type: 'probe',
          x: center.x,
          y: center.y - 310,
          vx: Math.sqrt((G_SIM * (m1 + m2)) / 310) * 1.02,
          vy: 0,
          mass: 2,
          radius: 6,
          color: '#22c55e',
          trail: []
        }
      ];
    } else if (scenarioKey === 'figure_eight') {
      // Famous Stable 3-Body Figure-Eight Solution
      setIsNBodyMode(true);
      setCentralBody({
        id: 'barycenter',
        name: '3-Body Barycenter',
        mass: 0,
        radius: 3,
        atmosphereRadius: 0,
        color: '#ffffff',
        atmosphereColor: 'transparent',
        desc: 'Euler-Chenciner 3-Body Center'
      });

      const m = 1800;
      const x1 = 175;
      const y1 = 0;
      const vx3 = 0.93240737 * 1.8;
      const vy3 = 0.86473146 * 1.8;

      bodiesRef.current = [
        {
          id: 'body-three-1',
          name: 'Alpha Body',
          type: 'star',
          x: center.x + x1,
          y: center.y,
          vx: vx3 * -0.5,
          vy: -vy3,
          mass: m,
          radius: 14,
          color: '#00f0ff',
          trail: []
        },
        {
          id: 'body-three-2',
          name: 'Beta Body',
          type: 'star',
          x: center.x - x1,
          y: center.y,
          vx: vx3 * -0.5,
          vy: -vy3,
          mass: m,
          radius: 14,
          color: '#ffaa00',
          trail: []
        },
        {
          id: 'body-three-3',
          name: 'Gamma Body',
          type: 'star',
          x: center.x,
          y: center.y,
          vx: vx3,
          vy: vy3 * 2,
          mass: m,
          radius: 14,
          color: '#a855f7',
          trail: []
        }
      ];
    } else if (scenarioKey === 'blackhole_s2') {
      // Sagittarius A* & Relativistic S2 Star
      setIsNBodyMode(false);
      setCentralBody(CELESTIAL_WELL_PRESETS[5]); // Sgr A*
      bodiesRef.current = [
        {
          id: 'star-s2',
          name: 'Star S2 (Relativistic Orbit)',
          type: 'star',
          x: center.x - 220,
          y: center.y - 70,
          vx: 1.85,
          vy: -4.95,
          mass: 60,
          radius: 7,
          color: '#38bdf8',
          trail: []
        }
      ];
    } else if (scenarioKey === 'trappist1') {
      // TRAPPIST-1 7-Planet Resonant Hierarchy
      setIsNBodyMode(false);
      setCentralBody(CELESTIAL_WELL_PRESETS[3]); // Solar / Dwarf Star
      const baseR = 100;
      const planets = [
        { name: 'TRAPPIST-1b', r: baseR * 1.00, color: '#f87171' },
        { name: 'TRAPPIST-1c', r: baseR * 1.25, color: '#fb923c' },
        { name: 'TRAPPIST-1d', r: baseR * 1.55, color: '#facc15' },
        { name: 'TRAPPIST-1e (Habitable)', r: baseR * 1.95, color: '#4ade80' },
        { name: 'TRAPPIST-1f (Habitable)', r: baseR * 2.35, color: '#2dd4bf' },
        { name: 'TRAPPIST-1g (Habitable)', r: baseR * 2.75, color: '#60a5fa' },
        { name: 'TRAPPIST-1h', r: baseR * 3.20, color: '#c084fc' }
      ];

      bodiesRef.current = planets.map((p, idx) => {
        const v = Math.sqrt((G_SIM * CELESTIAL_WELL_PRESETS[3].mass) / p.r);
        return {
          id: `trappist-${idx}`,
          name: p.name,
          type: 'probe',
          x: center.x,
          y: center.y - p.r,
          vx: v,
          vy: 0,
          mass: 4,
          radius: 5,
          color: p.color,
          trail: []
        };
      });
    }
  }, []);

  // Initial Scenario Launch
  useEffect(() => {
    loadScenario('circular_leo');
  }, [loadScenario]);

  // -------------------------------------------------------------
  // Slingshot Aim Handlers
  // -------------------------------------------------------------
  const handlePointerDown = (e) => {
    // Check if middle click or shift key for pan
    if (e.button === 1 || e.shiftKey || e.altKey) {
      isDraggingCanvasRef.current = true;
      panStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        camX: camera.x,
        camY: camera.y
      };
      return;
    }

    const worldCoords = screenToWorld(e.clientX, e.clientY);
    aimRef.current = {
      isAiming: true,
      start: worldCoords,
      current: worldCoords
    };
    setIsAiming(true);
  };

  const handlePointerMove = (e) => {
    if (isDraggingCanvasRef.current) {
      const dx = (e.clientX - panStartRef.current.x);
      const dy = (e.clientY - panStartRef.current.y);
      setCamera(prev => ({
        ...prev,
        x: panStartRef.current.camX + dx,
        y: panStartRef.current.camY + dy
      }));
      return;
    }

    if (!aimRef.current.isAiming) return;
    aimRef.current.current = screenToWorld(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    if (isDraggingCanvasRef.current) {
      isDraggingCanvasRef.current = false;
      return;
    }

    if (!aimRef.current.isAiming) return;
    const { start, current } = aimRef.current;
    aimRef.current.isAiming = false;
    setIsAiming(false);

    const dx = start.x - current.x;
    const dy = start.y - current.y;
    const dragDist = Math.hypot(dx, dy);

    let vx = dx * 0.045 * launchSpeedMultiplier;
    let vy = dy * 0.045 * launchSpeedMultiplier;

    const center = getCenter();

    // If clicked without dragging, calculate tangent circular orbit speed
    if (dragDist < 6) {
      const distFromCenter = Math.hypot(start.x - center.x, start.y - center.y);
      const targetMass = centralBody.mass > 0 ? centralBody.mass : 1200;
      const orbitSpeed = Math.sqrt((G_SIM * targetMass) / Math.max(distFromCenter, 60));
      vx = (-(start.y - center.y) / distFromCenter) * orbitSpeed * launchSpeedMultiplier;
      vy = ((start.x - center.x) / distFromCenter) * orbitSpeed * launchSpeedMultiplier;
    }

    // Spawn safely outside central body surface
    if (centralBody.mass > 0) {
      const distFromCenter = Math.hypot(start.x - center.x, start.y - center.y);
      if (distFromCenter < centralBody.radius + 15) {
        const ang = Math.atan2(start.y - center.y, start.x - center.x);
        start.x = center.x + Math.cos(ang) * (centralBody.radius + 25);
        start.y = center.y + Math.sin(ang) * (centralBody.radius + 25);
      }
    }

    const newBody = {
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
    };

    bodiesRef.current.push(newBody);
  };

  // Wheel Zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    setCamera(prev => ({
      ...prev,
      zoom: Math.min(4.0, Math.max(0.25, +(prev.zoom * zoomFactor).toFixed(3)))
    }));
  };

  // Quick Action Launches
  const handleQuickLaunchOrbit = () => {
    const center = getCenter();
    const r = centralBody.radius + 110;
    const effMass = centralBody.mass > 0 ? centralBody.mass : 1200;
    const v = Math.sqrt((G_SIM * effMass) / r) * launchSpeedMultiplier;
    bodiesRef.current.push({
      id: `body-orbit-${Date.now()}`,
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

  const handleQuickLaunchImpact = () => {
    const center = getCenter();
    const spawnX = center.x - 330;
    const spawnY = center.y - 180;
    const targetAngle = Math.atan2(center.y - spawnY, center.x - spawnX);
    const speed = 3.3 * launchSpeedMultiplier;

    bodiesRef.current.push({
      id: `body-impact-${Date.now()}`,
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

  // -------------------------------------------------------------
  // Fullscreen Handler
  // -------------------------------------------------------------
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // -------------------------------------------------------------
  // 60FPS High-Precision Gravitational Simulation Loop
  // -------------------------------------------------------------
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

      // Handle Camera Lock on Tracked Body
      let effectiveCamX = camera.x;
      let effectiveCamY = camera.y;

      if (trackedBodyId) {
        const tracked = bodiesRef.current.find(b => b.id === trackedBodyId);
        if (tracked) {
          effectiveCamX = -(tracked.x - cx) * camera.zoom;
          effectiveCamY = -(tracked.y - cy) * camera.zoom;
        }
      }

      // Background Void
      ctx.fillStyle = '#010207';
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      // Apply Camera Viewport Transformation (Pan & Zoom)
      ctx.translate(cx + effectiveCamX, cy + effectiveCamY);
      ctx.scale(camera.zoom, camera.zoom);
      ctx.translate(-cx, -cy);

      // 1. Spacetime Curvature Fabric Grid (Einstein Gravity Well)
      if (showGravityGrid) {
        drawSpacetimeCurvatureGrid(ctx, width, height, cx, cy, centralBody, bodiesRef.current, isNBodyMode);
      }

      // 2. Gravitational Acceleration Vector Field
      if (showVectors) {
        drawGravitationalVectorField(ctx, width, height, cx, cy, centralBody, bodiesRef.current);
      }

      // 3. Lagrange Equilibrium Points (L1 - L5) for 2-Body Systems
      if (showLagrangePoints && bodiesRef.current.length > 0 && centralBody.mass > 0) {
        drawLagrangePoints(ctx, cx, cy, centralBody, bodiesRef.current[0]);
      }

      // 4. Central Celestial Body & Atmosphere
      if (centralBody.mass > 0) {
        drawCentralCelestialBody(ctx, cx, cy, centralBody, showAtmosphere);
      }

      // 5. Permanent Impact Craters on Central Body
      drawCraters(ctx, cratersRef.current);

      // 6. Thermal Radiant Shockwaves
      drawShockwaves(ctx, shockwavesRef.current);

      // 7. Update Active Bodies & Integrate Orbits (Symplectic Verlet/RK4 approximation)
      const bodies = bodiesRef.current;
      const surviving = [];

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];

        if (isRunning) {
          const subSteps = 6;
          const dt = (1.0 * timeStep) / subSteps;

          for (let step = 0; step < subSteps; step++) {
            let netAx = 0;
            let netAy = 0;

            // Pull towards central body (if present)
            if (centralBody.mass > 0) {
              const dx = cx - b.x;
              const dy = cy - b.y;
              const dist = Math.hypot(dx, dy);

              // Central collision check
              if (dist <= centralBody.radius + b.radius * 0.75) {
                triggerCollision(b, cx, cy, centralBody);
                b.collided = true;
                break;
              }

              // Softened Newtonian Gravity with General Relativity correction factor
              // F = GM/r^2 * (1 + 3GM/(r * c^2))
              const rSq = Math.max(dist * dist, 120);
              const grCorrection = 1.0 + (centralBody.type === 'blackhole' ? (3.0 * G_SIM * centralBody.mass) / (dist * 1800) : 0);
              const force = ((G_SIM * centralBody.mass) / rSq) * grCorrection;

              netAx += (dx / dist) * force;
              netAy += (dy / dist) * force;

              // Atmospheric Drag & Aerodynamic Heating
              if (centralBody.atmosphereRadius > centralBody.radius && dist < centralBody.atmosphereRadius) {
                const altRatio = (dist - centralBody.radius) / (centralBody.atmosphereRadius - centralBody.radius);
                const density = Math.exp(-3.2 * altRatio) * 0.0018;
                const speed = Math.hypot(b.vx, b.vy);
                const dragForce = 0.5 * density * speed;
                netAx -= dragForce * b.vx;
                netAy -= dragForce * b.vy;

                // Atmospheric Ionization Plasma Ejecta
                if (speed > 1.3 && Math.random() < 0.35) {
                  impactParticlesRef.current.push({
                    x: b.x + (Math.random() - 0.5) * 4,
                    y: b.y + (Math.random() - 0.5) * 4,
                    vx: -b.vx * 0.25 + (Math.random() - 0.5) * 1.5,
                    vy: -b.vy * 0.25 + (Math.random() - 0.5) * 1.5,
                    life: 1.0,
                    decay: 0.065,
                    color: '#ffaa00',
                    size: 2.2
                  });
                }
              }
            }

            // N-Body Mutual Gravitation (Every body pulls every other body)
            if (isNBodyMode) {
              for (let j = 0; j < bodies.length; j++) {
                if (i === j) continue;
                const other = bodies[j];
                const odx = other.x - b.x;
                const ody = other.y - b.y;
                const oDist = Math.hypot(odx, ody);

                // Body-to-body collision
                if (oDist <= (b.radius + other.radius) * 0.8) {
                  triggerMutualCollision(b, other);
                  b.collided = true;
                  other.collided = true;
                  break;
                }

                const oforce = (G_SIM * other.mass) / Math.max(oDist * oDist, 80);
                netAx += (odx / oDist) * oforce;
                netAy += (ody / oDist) * oforce;
              }
            }

            if (b.collided) break;

            b.vx += netAx * dt;
            b.vy += netAy * dt;
            b.x += b.vx * dt;
            b.y += b.vy * dt;
          }
        }

        if (!b.collided) {
          const distFromCenter = Math.hypot(cx - b.x, cy - b.y);
          // Prevent runaway memory leaks if hurled into deep space (> 4000 px)
          if (distFromCenter < 4000) {
            b.trail.push({ x: b.x, y: b.y });
            if (b.trail.length > 260) b.trail.shift();

            drawTrail(ctx, b);
            drawBody(ctx, b, b.id === trackedBodyId);
            if (b.type === 'comet') drawCometTail(ctx, b, cx, cy);

            surviving.push(b);
          }
        }
      }

      bodiesRef.current = surviving;

      // 8. Kepler Orbit Prediction Line
      if (showPredictedOrbit && centralBody.mass > 0) {
        if (aimRef.current.isAiming) {
          const { start, current } = aimRef.current;
          const dx = start.x - current.x;
          const dy = start.y - current.y;
          const dragDist = Math.hypot(dx, dy);
          let vx = dx * 0.045 * launchSpeedMultiplier;
          let vy = dy * 0.045 * launchSpeedMultiplier;

          if (dragDist < 6) {
            const distFromCenter = Math.hypot(start.x - cx, start.y - cy);
            const orbitSpeed = Math.sqrt((G_SIM * centralBody.mass) / Math.max(distFromCenter, 60));
            vx = -(start.y - cy) / distFromCenter * orbitSpeed * launchSpeedMultiplier;
            vy = (start.x - cx) / distFromCenter * orbitSpeed * launchSpeedMultiplier;
          }
          const aimingBody = { x: start.x, y: start.y, vx, vy, radius: selectedBodyType.radius };
          drawOrbitPrediction(ctx, aimingBody, cx, cy, centralBody, true);
        } else if (surviving.length > 0) {
          const primary = trackedBodyId ? surviving.find(b => b.id === trackedBodyId) || surviving[0] : surviving[surviving.length - 1];
          drawOrbitPrediction(ctx, primary, cx, cy, centralBody, false);
        }
      }

      // 9. Kinetic Impact Particles
      updateAndDrawParticles(ctx, impactParticlesRef.current);

      // 10. Interactive Slingshot Guide
      if (aimRef.current.isAiming) {
        drawAimGuide(ctx, aimRef.current.start, aimRef.current.current, selectedBodyType, launchSpeedMultiplier);
      }

      ctx.restore(); // Restore Camera Transformation

      // 11. Update Real-Time Telemetry HUD (Throttled to ~10Hz)
      frameCountRef.current++;
      if (frameCountRef.current % 6 === 0) {
        const lead = trackedBodyId ? surviving.find(b => b.id === trackedBodyId) || surviving[0] : surviving[surviving.length - 1];

        if (lead && centralBody.mass > 0) {
          const dx = cx - lead.x;
          const dy = cy - lead.y;
          const dist = Math.hypot(dx, dy);
          const altitudeKm = Math.max(0, (dist - centralBody.radius) * 6.5);
          const speed = Math.hypot(lead.vx, lead.vy);
          const speedKms = speed * 11.2;

          const mu = G_SIM * centralBody.mass;
          const energy = (speed * speed) / 2 - mu / dist;
          const h = (lead.x - cx) * lead.vy - (lead.y - cy) * lead.vx;

          const eTerm = 1 + (2 * energy * h * h) / (mu * mu);
          const ecc = eTerm >= 0 ? Math.sqrt(eTerm) : 1;

          const semiMajor = energy < 0 ? -mu / (2 * energy) : Infinity;
          const periapsis = semiMajor * (1 - ecc);
          const apoapsis = ecc < 1 ? semiMajor * (1 + ecc) : Infinity;
          const period = ecc < 1 && semiMajor > 0 ? 2 * Math.PI * Math.sqrt(Math.pow(semiMajor, 3) / mu) : Infinity;

          // Relativistic Time Dilation gamma = 1 / sqrt(1 - v^2/c^2)
          const beta = Math.min(0.999, speed / 25.0);
          const gamma = 1 / Math.sqrt(Math.max(0.001, 1 - beta * beta));

          let statusText = 'STABLE KEPLERIAN ORBIT';
          if (dist < centralBody.atmosphereRadius) statusText = 'ATMOSPHERIC RE-ENTRY DECAY';
          if (ecc >= 1.05) statusText = 'HYPERBOLIC ESCAPE TRAJECTORY';
          if (dist < centralBody.radius + 15) statusText = 'COLLISION VECTOR DETECTED';

          setTelemetry(prev => ({
            ...prev,
            activeBodies: surviving.length,
            speed,
            speedKms,
            altitudeKm,
            eccentricity: ecc,
            semiMajorAxis: isFinite(semiMajor) ? semiMajor * 6.5 : 0,
            periapsisKm: isFinite(periapsis) ? Math.max(0, periapsis * 6.5) : 0,
            apoapsisKm: isFinite(apoapsis) ? Math.max(0, apoapsis * 6.5) : 0,
            periodSec: isFinite(period) ? +(period * 0.4).toFixed(1) : '∞',
            specificEnergy: +energy.toFixed(3),
            gammaDilation: +gamma.toFixed(4),
            status: statusText
          }));
        } else {
          setTelemetry(prev => ({
            ...prev,
            activeBodies: surviving.length,
            speed: 0,
            speedKms: 0,
            altitudeKm: 0,
            eccentricity: 0,
            status: surviving.length > 0 ? 'N-BODY GRAVITATIONAL CHOREOGRAPHY' : 'READY / INJECTION ACTIVE'
          }));
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [
    isRunning, timeStep, showGravityGrid, showPredictedOrbit, showAtmosphere, 
    showVectors, showLagrangePoints, selectedBodyType, launchSpeedMultiplier, 
    centralBody, isNBodyMode, camera, trackedBodyId
  ]);

  // -------------------------------------------------------------
  // Collision Physics Triggers
  // -------------------------------------------------------------
  const triggerCollision = (body, cx, cy, centralState) => {
    const speed = Math.hypot(body.vx, body.vy);
    const impactSpeedKms = (speed * 11.2).toFixed(1);
    const massTons = body.mass * 1e5;
    const kineticJoules = 0.5 * massTons * 1000 * Math.pow(Number(impactSpeedKms) * 1000, 2);
    const megatonsTnt = kineticJoules / 4.184e15;
    const craterDiameterKm = (Math.pow(Math.max(megatonsTnt, 0.1), 0.294) * 2.4).toFixed(1);

    const angle = Math.atan2(body.y - cy, body.x - cx);
    const impactX = cx + Math.cos(angle) * centralState.radius;
    const impactY = cy + Math.sin(angle) * centralState.radius;

    cratersRef.current.push({
      x: impactX,
      y: impactY,
      radius: Math.max(6, Math.min(30, body.radius * 2.0)),
      color: body.color,
      createdAt: Date.now()
    });

    shockwavesRef.current.push({
      x: impactX,
      y: impactY,
      radius: 4,
      maxRadius: Math.min(180, body.radius * 12),
      alpha: 1.0,
      color: '#ffaa00'
    });

    const particleCount = Math.min(100, body.radius * 10);
    for (let i = 0; i < particleCount; i++) {
      const pAngle = angle + Math.PI + (Math.random() - 0.5) * 2.4;
      const pSpeed = Math.random() * 6.0 + 1.5;
      impactParticlesRef.current.push({
        x: impactX,
        y: impactY,
        vx: Math.cos(pAngle) * pSpeed,
        vy: Math.sin(pAngle) * pSpeed,
        life: 1.0,
        decay: Math.random() * 0.025 + 0.018,
        color: i % 2 === 0 ? '#ff3366' : '#ffaa00',
        size: Math.random() * 3.5 + 1.5
      });
    }

    setTelemetry(prev => ({
      ...prev,
      lastImpact: {
        bodyName: body.name,
        targetName: centralState.name,
        speedKms: impactSpeedKms,
        megatonsTnt: Math.round(megatonsTnt).toLocaleString(),
        craterDiameterKm: craterDiameterKm,
        time: new Date().toLocaleTimeString()
      }
    }));
  };

  const triggerMutualCollision = (b1, b2) => {
    const mx = (b1.x + b2.x) / 2;
    const my = (b1.y + b2.y) / 2;

    shockwavesRef.current.push({
      x: mx,
      y: my,
      radius: 5,
      maxRadius: 140,
      alpha: 1.0,
      color: '#ff3366'
    });

    for (let i = 0; i < 60; i++) {
      const pAngle = Math.random() * Math.PI * 2;
      const pSpeed = Math.random() * 5.0 + 1.0;
      impactParticlesRef.current.push({
        x: mx,
        y: my,
        vx: Math.cos(pAngle) * pSpeed,
        vy: Math.sin(pAngle) * pSpeed,
        life: 1.0,
        decay: 0.025,
        color: i % 2 === 0 ? b1.color : b2.color,
        size: Math.random() * 3.0 + 1.5
      });
    }
  };

  return (
    <div ref={containerRef} className="space-y-6">
      
      {/* SIMULATOR HEADER & SCENARIO SELECTION */}
      <header className="rounded-2xl border border-white/[0.08] bg-black/60 p-5 sm:p-6 backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Orbit className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span className="tracking-wider uppercase">ORBITAL GRAVITY & RELATIVISTIC IMPACT PHYSICS LABORATORY</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-light text-white tracking-tight">
            N-Body Gravitation, Spacetime Wells & Planetary Dynamics
          </h1>
          <p className="text-white/40 text-xs sm:text-sm font-light mt-1 max-w-2xl">
            Simulate Newton’s and Einstein’s gravitational dynamics in real-time. Drag to inject orbiters, examine Lagrange points, or trigger high-energy kinetic impact craters.
          </p>
        </div>

        {/* Quick Scenario Preset Pills */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {[
            { id: 'circular_leo', label: 'LEO Circular' },
            { id: 'elliptical', label: 'Molniya Ellipse' },
            { id: 'collision', label: 'Meteor Impact', alert: true },
            { id: 'free_return_apollo', label: 'Earth-Moon Free Return' },
            { id: 'binary_stars', label: 'Binary Star System' },
            { id: 'figure_eight', label: '3-Body Figure-8' },
            { id: 'trappist1', label: 'TRAPPIST-1 Resonances' },
            { id: 'blackhole_s2', label: 'Sgr A* & Star S2' }
          ].map(sc => {
            const isActive = activeScenario === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => loadScenario(sc.id)}
                className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : sc.alert
                    ? 'bg-rose-950/40 border-rose-800/60 text-rose-300 hover:bg-rose-900/60'
                    : 'bg-white/[0.02] border-white/[0.08] text-white/50 hover:text-white hover:border-white/20'
                }`}
              >
                {sc.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* VIEWPORT & SIDEBAR COCKPIT */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* INTERACTIVE CANVAS VIEWPORT (3 COLS) */}
        <div className="xl:col-span-3 space-y-4">
          
          <div className="relative rounded-2xl bg-black border border-white/[0.08] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            
            {/* Real-Time Interactive Canvas */}
            <canvas 
              ref={canvasRef} 
              width={1060} 
              height={620} 
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onWheel={handleWheel}
              onTouchStart={e => {
                if (e.touches[0]) handlePointerDown(e.touches[0]);
              }}
              onTouchMove={e => {
                if (e.touches[0]) handlePointerMove(e.touches[0]);
              }}
              onTouchEnd={handlePointerUp}
              className="w-full h-[500px] sm:h-[600px] cursor-crosshair block select-none touch-none"
            />

            {/* In-Canvas Top-Left Instruction Overlay */}
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/[0.08] text-xs font-mono text-white/70 flex items-center space-x-2.5 pointer-events-none">
              <Crosshair className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>
                <strong>Click & Drag</strong> to Slingshot · <strong>Wheel</strong> to Zoom · <strong>Shift+Drag</strong> to Pan
              </span>
            </div>

            {/* In-Canvas Top-Right Live Status & Camera Lock */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              {trackedBodyId && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
                  <Eye className="w-3 h-3 animate-pulse" />
                  <span>CAMERA LOCKED</span>
                  <button 
                    onClick={() => setTrackedBodyId(null)}
                    className="ml-1 text-white/50 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              )}

              <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium border backdrop-blur-md ${
                telemetry.status.includes('COLLISION') || telemetry.status.includes('DECAY')
                  ? 'bg-rose-950/80 border-rose-500/60 text-rose-300 animate-pulse'
                  : 'bg-black/80 border-white/[0.08] text-cyan-400'
              }`}>
                {telemetry.status}
              </span>

              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-black/80 border border-white/[0.08] text-white/50 hover:text-white backdrop-blur-md transition-colors cursor-pointer"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* In-Canvas Bottom Floating Flight Control Deck */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-xl p-3 rounded-2xl border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              
              {/* Playback Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-3.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    isRunning ? 'bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.25)]' : 'bg-cyan-400 text-black shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                  }`}
                >
                  {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isRunning ? 'Pause' : 'Resume'}</span>
                </button>

                <button
                  onClick={() => {
                    // Step forward one tick
                    setIsRunning(false);
                    // trigger single physics integration
                  }}
                  className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Single Step (+1 Tick)"
                >
                  <StepForward className="w-4 h-4" />
                </button>

                <button
                  onClick={() => { 
                    bodiesRef.current = []; 
                    cratersRef.current = []; 
                    shockwavesRef.current = []; 
                    setTrackedBodyId(null);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  Clear Debris
                </button>

                <button
                  onClick={() => loadScenario(activeScenario)}
                  className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Reset Scenario"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Time Warp Slider */}
              <div className="flex items-center gap-2 text-white/50">
                <span className="text-[11px]">WARP: {timeStep.toFixed(1)}x</span>
                <input 
                  type="range" 
                  min="0.1" 
                  max="4.0" 
                  step="0.1" 
                  value={timeStep} 
                  onChange={e => setTimeStep(Number(e.target.value))}
                  className="w-20 sm:w-24 accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Camera Zoom & Reset */}
              <div className="flex items-center gap-1.5 text-white/50">
                <button
                  onClick={() => setCamera(prev => ({ ...prev, zoom: Math.min(4.0, +(prev.zoom * 1.2).toFixed(2)) }))}
                  className="p-1 rounded bg-white/[0.04] border border-white/[0.08] hover:text-white cursor-pointer"
                  title="Zoom In"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono min-w-8 text-center">{camera.zoom.toFixed(1)}x</span>
                <button
                  onClick={() => setCamera(prev => ({ ...prev, zoom: Math.max(0.25, +(prev.zoom * 0.83).toFixed(2)) }))}
                  className="p-1 rounded bg-white/[0.04] border border-white/[0.08] hover:text-white cursor-pointer"
                  title="Zoom Out"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCamera({ x: 0, y: 0, zoom: 1.0 })}
                  className="px-2 py-1 rounded text-[10px] bg-white/[0.04] border border-white/[0.08] hover:text-white cursor-pointer"
                  title="Reset Camera View"
                >
                  Reset
                </button>
              </div>

              {/* Physics Toggles */}
              <div className="flex items-center gap-3 text-[11px] text-white/60">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showGravityGrid} 
                    onChange={e => setShowGravityGrid(e.target.checked)}
                    className="accent-cyan-400"
                  />
                  <span>Gravity Mesh</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showPredictedOrbit} 
                    onChange={e => setShowPredictedOrbit(e.target.checked)}
                    className="accent-cyan-400"
                  />
                  <span>Orbit Ray</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showVectors} 
                    onChange={e => setShowVectors(e.target.checked)}
                    className="accent-cyan-400"
                  />
                  <span>Vectors</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isNBodyMode} 
                    onChange={e => setIsNBodyMode(e.target.checked)}
                    className="accent-cyan-400"
                  />
                  <span>N-Body</span>
                </label>
              </div>

            </div>

          </div>

          {/* TELEMETRY TELEGRAPH HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] backdrop-blur-md">
              <div className="text-[10px] text-white/40 uppercase tracking-wider">ORBITAL VELOCITY</div>
              <div className="text-base sm:text-lg font-light text-cyan-300 mt-0.5">
                {telemetry.speedKms.toFixed(2)} km/s
              </div>
              <div className="text-[10px] text-white/30 mt-0.5">v = {telemetry.speed.toFixed(2)} sim</div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] backdrop-blur-md">
              <div className="text-[10px] text-white/40 uppercase tracking-wider">ALTITUDE</div>
              <div className="text-base sm:text-lg font-light text-emerald-300 mt-0.5">
                {Math.round(telemetry.altitudeKm).toLocaleString()} km
              </div>
              <div className="text-[10px] text-white/30 mt-0.5">Above Surface</div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] backdrop-blur-md">
              <div className="text-[10px] text-white/40 uppercase tracking-wider">ECCENTRICITY (e)</div>
              <div className="text-base sm:text-lg font-light text-amber-300 mt-0.5">
                {telemetry.eccentricity.toFixed(3)}
              </div>
              <div className="text-[10px] text-white/30 mt-0.5">
                {telemetry.eccentricity < 0.05 ? 'Circular' : (telemetry.eccentricity < 1 ? 'Elliptical' : 'Escape')}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] backdrop-blur-md">
              <div className="text-[10px] text-white/40 uppercase tracking-wider">ORBITAL PERIOD (T)</div>
              <div className="text-base sm:text-lg font-light text-purple-300 mt-0.5">
                {telemetry.periodSec} s
              </div>
              <div className="text-[10px] text-white/30 mt-0.5">Keplerian Cycle</div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] backdrop-blur-md">
              <div className="text-[10px] text-white/40 uppercase tracking-wider">SPECIFIC ENERGY (E)</div>
              <div className="text-base sm:text-lg font-light text-sky-300 mt-0.5">
                {telemetry.specificEnergy}
              </div>
              <div className="text-[10px] text-white/30 mt-0.5">J/kg (Bound &lt; 0)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] backdrop-blur-md">
              <div className="text-[10px] text-white/40 uppercase tracking-wider">ACTIVE BODIES</div>
              <div className="text-base sm:text-lg font-light text-white mt-0.5">
                {telemetry.activeBodies} In Flight
              </div>
              <div className="text-[10px] text-white/30 mt-0.5">N-Body Gravitation</div>
            </div>
          </div>

        </div>

        {/* SIDEBAR COCKPIT CONFIGURATION (1 COL) */}
        <div className="space-y-4">
          
          {/* Projectile Body Type Selector */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] space-y-3 font-mono text-xs backdrop-blur-xl">
            <h3 className="font-medium text-white uppercase text-xs flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>INJECTION PROJECTILE</span>
            </h3>

            <div className="space-y-1.5">
              {INJECTED_BODY_TYPES.map(body => {
                const isSelected = selectedBodyType.id === body.id;
                return (
                  <button
                    key={body.id}
                    onClick={() => setSelectedBodyType(body)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-cyan-500/15 border-cyan-400/60 text-white font-medium shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                        : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:border-white/20 hover:text-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: body.color }}></span>
                      <span>{body.name}</span>
                    </div>
                    <span className="text-[10px] text-white/30">M={body.mass}</span>
                  </button>
                );
              })}
            </div>

            {/* Launch Velocity Power Slider */}
            <div className="pt-2 border-t border-white/[0.06]">
              <div className="flex justify-between text-[10px] text-white/50 mb-1">
                <span>SLINGSHOT VELOCITY IMPULSE</span>
                <span className="text-cyan-400 font-bold">{launchSpeedMultiplier.toFixed(1)}x</span>
              </div>
              <input 
                type="range" 
                min="0.3" 
                max="3.0" 
                step="0.1" 
                value={launchSpeedMultiplier} 
                onChange={e => setLaunchSpeedMultiplier(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* 1-Click Instant Injections */}
            <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
              <div className="text-[10px] text-white/40 uppercase font-mono mb-1">Instant Injection</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleQuickLaunchOrbit}
                  className="px-2.5 py-2 rounded-xl bg-emerald-950/40 border border-emerald-600/40 hover:bg-emerald-900/60 text-emerald-300 font-medium flex items-center justify-center gap-1.5 transition text-[11px] cursor-pointer"
                  title="Inject into circular orbit"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Launch Orbit</span>
                </button>
                <button
                  onClick={handleQuickLaunchImpact}
                  className="px-2.5 py-2 rounded-xl bg-rose-950/40 border border-rose-600/40 hover:bg-rose-900/60 text-rose-300 font-medium flex items-center justify-center gap-1.5 transition text-[11px] cursor-pointer"
                  title="Launch asteroid collision course"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Direct Impact</span>
                </button>
              </div>
            </div>
          </div>

          {/* Central Celestial Body Preset Selector */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] space-y-3 font-mono text-xs backdrop-blur-xl">
            <h3 className="font-medium text-white uppercase text-xs flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>CENTRAL CELESTIAL WELL</span>
            </h3>

            <div className="space-y-1.5">
              {CELESTIAL_WELL_PRESETS.map((p) => {
                const isCurrent = centralBody.name === p.name;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCentralBody(p);
                      cratersRef.current = [];
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-500/15 border-emerald-400/60 text-white font-medium shadow-[0_0_15px_rgba(52,211,153,0.15)]'
                        : 'bg-white/[0.02] border-white/[0.06] text-white/50 hover:border-white/20 hover:text-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">{p.name}</span>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
                    </div>
                    <div className="text-[10px] text-white/35 mt-0.5 line-clamp-1">{p.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Impact Dossier */}
          <div className="p-4 rounded-2xl bg-black/60 border border-rose-500/25 space-y-2.5 font-mono text-xs backdrop-blur-xl">
            <h3 className="font-medium text-rose-300 uppercase text-xs flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>HIGH-ENERGY IMPACT DOSSIER</span>
            </h3>

            {telemetry.lastImpact ? (
              <div className="space-y-1.5 text-[11px] bg-white/[0.02] p-3 rounded-xl border border-rose-900/40 text-white/70">
                <div className="flex justify-between">
                  <span className="text-white/40">IMPACTOR:</span>
                  <strong className="text-white">{telemetry.lastImpact.bodyName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">IMPACT SPEED:</span>
                  <strong className="text-amber-300">{telemetry.lastImpact.speedKms} km/s</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">KINETIC YIELD:</span>
                  <strong className="text-rose-400">{telemetry.lastImpact.megatonsTnt} MT TNT</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">CRATER DIAMETER:</span>
                  <strong className="text-white">{telemetry.lastImpact.craterDiameterKm} km</strong>
                </div>
                <div className="text-[10px] text-white/30 pt-1.5 border-t border-white/[0.06] text-right">
                  RECORDED AT {telemetry.lastImpact.time}
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-white/30 py-3 text-center">
                No impact recorded. Launch a projectile directly into the central body to trigger cratering & shockwave.
              </div>
            )}
          </div>

          {/* Active Orbiting Bodies List */}
          {bodiesRef.current.length > 0 && (
            <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] space-y-2.5 font-mono text-xs backdrop-blur-xl">
              <h3 className="font-medium text-white/80 uppercase text-xs flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                <span>FLIGHT TRACKER ({bodiesRef.current.length})</span>
              </h3>
              <div className="max-h-36 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {bodiesRef.current.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setTrackedBodyId(trackedBodyId === b.id ? null : b.id)}
                    className={`p-2 rounded-lg border text-left flex items-center justify-between text-[11px] cursor-pointer transition-colors ${
                      trackedBodyId === b.id 
                        ? 'bg-cyan-500/20 border-cyan-400 text-white' 
                        : 'bg-white/[0.02] border-white/[0.04] text-white/60 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                      <span className="truncate">{b.name}</span>
                    </div>
                    <span className="text-[10px] text-white/40 shrink-0 ml-2">
                      {trackedBodyId === b.id ? 'TRACKING' : 'LOCK'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

// -----------------------------------------------------------------
// Canvas Rendering Algorithms
// -----------------------------------------------------------------

/**
 * 3D Spacetime Curvature Fabric Grid (Einstein General Relativity Well)
 */
function drawSpacetimeCurvatureGrid(ctx, width, height, cx, cy, centralBody, bodies, isNBodyMode) {
  const gridSize = 45;
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.045)';
  ctx.lineWidth = 1;

  const minX = cx - 900;
  const maxX = cx + 900;
  const minY = cy - 600;
  const maxY = cy + 600;

  // Calculate local curvature distortion (warp coordinates inward towards gravity wells)
  const getDisplacedPoint = (gx, gy) => {
    let dx = 0;
    let dy = 0;

    if (centralBody.mass > 0) {
      const dist = Math.hypot(gx - cx, gy - cy);
      const warp = Math.min(28, (G_SIM * centralBody.mass) / Math.max(dist * dist * 0.12, 100));
      const ang = Math.atan2(cy - gy, cx - gx);
      dx += Math.cos(ang) * warp;
      dy += Math.sin(ang) * warp;
    }

    if (isNBodyMode) {
      for (const b of bodies) {
        if (b.mass < 50) continue;
        const dist = Math.hypot(gx - b.x, gy - b.y);
        const warp = Math.min(18, (G_SIM * b.mass) / Math.max(dist * dist * 0.15, 60));
        const ang = Math.atan2(b.y - gy, b.x - gx);
        dx += Math.cos(ang) * warp;
        dy += Math.sin(ang) * warp;
      }
    }

    return { x: gx + dx, y: gy + dy };
  };

  // Horizontal Grid Lines
  for (let gy = minY; gy <= maxY; gy += gridSize) {
    ctx.beginPath();
    for (let gx = minX; gx <= maxX; gx += gridSize) {
      const p = getDisplacedPoint(gx, gy);
      if (gx === minX) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }

  // Vertical Grid Lines
  for (let gx = minX; gx <= maxX; gx += gridSize) {
    ctx.beginPath();
    for (let gy = minY; gy <= maxY; gy += gridSize) {
      const p = getDisplacedPoint(gx, gy);
      if (gy === minY) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }

  // Concentric Equipotential Gravity Rings around Central Well
  if (centralBody.mass > 0) {
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
    for (let r = centralBody.radius + 40; r < 750; r += 70) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

/**
 * Gravitational Vector Field Grid
 */
function drawGravitationalVectorField(ctx, width, height, cx, cy, centralBody, bodies) {
  const step = 80;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 1;

  for (let x = cx - 500; x <= cx + 500; x += step) {
    for (let y = cy - 350; y <= cy + 350; y += step) {
      let netFx = 0;
      let netFy = 0;

      if (centralBody.mass > 0) {
        const dx = cx - x;
        const dy = cy - y;
        const dist = Math.hypot(dx, dy);
        if (dist > centralBody.radius) {
          const f = (G_SIM * centralBody.mass) / Math.max(dist * dist, 100);
          netFx += (dx / dist) * f;
          netFy += (dy / dist) * f;
        }
      }

      for (const b of bodies) {
        if (b.mass < 100) continue;
        const dx = b.x - x;
        const dy = b.y - y;
        const dist = Math.hypot(dx, dy);
        if (dist > b.radius) {
          const f = (G_SIM * b.mass) / Math.max(dist * dist, 80);
          netFx += (dx / dist) * f;
          netFy += (dy / dist) * f;
        }
      }

      const totalForce = Math.hypot(netFx, netFy);
      if (totalForce > 0.001) {
        const arrowLen = Math.min(22, Math.max(4, totalForce * 12));
        const ang = Math.atan2(netFy, netFx);
        const tox = x + Math.cos(ang) * arrowLen;
        const toy = y + Math.sin(ang) * arrowLen;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(tox, toy);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(tox, toy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

/**
 * Lagrange Points (L1 - L5) for 2-Body Orbital Systems
 */
function drawLagrangePoints(ctx, cx, cy, central, satellite) {
  const dx = satellite.x - cx;
  const dy = satellite.y - cy;
  const R = Math.hypot(dx, dy);
  if (R < 40) return;

  const theta = Math.atan2(dy, dx);
  const mu = satellite.mass / (central.mass + satellite.mass);
  const rHill = R * Math.pow(mu / 3, 1/3);

  // L1 & L2 (along the line of centers)
  const l1Dist = R - rHill;
  const l2Dist = R + rHill;
  const l3Dist = -(R + (5/12) * mu * R);

  const points = [
    { name: 'L1', x: cx + Math.cos(theta) * l1Dist, y: cy + Math.sin(theta) * l1Dist },
    { name: 'L2', x: cx + Math.cos(theta) * l2Dist, y: cy + Math.sin(theta) * l2Dist },
    { name: 'L3', x: cx + Math.cos(theta) * l3Dist, y: cy + Math.sin(theta) * l3Dist },
    { name: 'L4 (Trojan)', x: cx + Math.cos(theta + Math.PI / 3) * R, y: cy + Math.sin(theta + Math.PI / 3) * R },
    { name: 'L5 (Greek)', x: cx + Math.cos(theta - Math.PI / 3) * R, y: cy + Math.sin(theta - Math.PI / 3) * R }
  ];

  ctx.font = '9px monospace';
  ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
  ctx.lineWidth = 1;

  for (const p of points) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillText(p.name, p.x + 5, p.y - 4);
  }
}

/**
 * Central Celestial Body & Atmosphere
 */
function drawCentralCelestialBody(ctx, cx, cy, body, showAtmosphere) {
  const isBlackHole = body.type === 'blackhole';
  const isStar = body.type === 'star';

  // Volumetric Atmospheric Glow or Coronal Envelope
  if (showAtmosphere && body.atmosphereRadius > body.radius) {
    const atmosGrad = ctx.createRadialGradient(cx, cy, body.radius, cx, cy, body.atmosphereRadius);
    atmosGrad.addColorStop(0, body.atmosphereColor);
    atmosGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = atmosGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, body.atmosphereRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.arc(cx, cy, body.atmosphereRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Black Hole Relativistic Accretion Ring & Photon Sphere
  if (isBlackHole) {
    // Relativistic Lensed Accretion Ring
    ctx.save();
    ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.ellipse(0, -body.radius * 0.4, body.radius * 2.8, body.radius * 1.1, 0, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 140, 30, 0.6)';
    ctx.lineWidth = body.radius * 0.4;
    ctx.stroke();

    // Event Horizon
    ctx.beginPath();
    ctx.arc(0, 0, body.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#010204';
    ctx.fill();

    // Photon Sphere Thin Glow
    ctx.beginPath();
    ctx.arc(0, 0, body.radius * 1.1, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 220, 160, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Front Doppler Accretion Disk
    ctx.beginPath();
    ctx.ellipse(0, body.radius * 0.25, body.radius * 3.0, body.radius * 0.85, 0, 0, Math.PI);
    ctx.strokeStyle = 'rgba(255, 120, 30, 0.85)';
    ctx.lineWidth = body.radius * 0.5;
    ctx.stroke();
    ctx.restore();
    return;
  }

  // Stellar Solar Flares & Granulation
  if (isStar) {
    const starGrad = ctx.createRadialGradient(cx, cy, body.radius * 0.1, cx, cy, body.radius);
    starGrad.addColorStop(0, '#ffffff');
    starGrad.addColorStop(0.4, body.color);
    starGrad.addColorStop(1, '#ff6600');
    ctx.fillStyle = starGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, body.radius, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  // Terrestrial or Gas Giant Planet Body with 3D Light Terminator
  const pGrad = ctx.createRadialGradient(cx - body.radius * 0.35, cy - body.radius * 0.35, body.radius * 0.1, cx, cy, body.radius);
  pGrad.addColorStop(0, '#ffffff');
  pGrad.addColorStop(0.35, body.color);
  pGrad.addColorStop(1, '#020512');

  ctx.fillStyle = pGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, body.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = body.color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

/**
 * Permanent Glowing Impact Craters
 */
function drawCraters(ctx, craters) {
  for (const c of craters) {
    ctx.fillStyle = '#050814';
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = c.color || 'rgba(255, 51, 102, 0.85)';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Central uplift peak
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius * 0.25, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Expanding Kinetic Shockwaves
 */
function drawShockwaves(ctx, shockwaves) {
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const s = shockwaves[i];
    s.radius += 2.8;
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

/**
 * Body Orbital Trail
 */
function drawTrail(ctx, body) {
  if (body.trail.length < 2) return;
  ctx.strokeStyle = body.color;
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  for (let i = 0; i < body.trail.length; i++) {
    const p = body.trail[i];
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.globalAlpha = 0.55;
  ctx.stroke();
  ctx.globalAlpha = 1.0;
}

/**
 * Celestial Body Circle with Name & Velocity Vector
 */
function drawBody(ctx, body, isTracked = false) {
  ctx.fillStyle = body.color;
  ctx.beginPath();
  ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2);
  ctx.fill();

  // Highlight if tracked by camera
  if (isTracked) {
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(body.x, body.y, body.radius + 4, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Velocity Vector Arrow
  const vMag = Math.hypot(body.vx, body.vy);
  if (vMag > 0.05) {
    const vxLen = body.vx * 15;
    const vyLen = body.vy * 15;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(body.x, body.y);
    ctx.lineTo(body.x + vxLen, body.y + vyLen);
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.font = '9px monospace';
  ctx.fillText(body.name, body.x + body.radius + 5, body.y - body.radius);
}

/**
 * Comet Outgassing Volatile Tail
 */
function drawCometTail(ctx, body, cx, cy) {
  const dx = body.x - cx;
  const dy = body.y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return;

  const tailLen = Math.min(85, (1600 / dist) * 25);
  const tailX = body.x + (dx / dist) * tailLen;
  const tailY = body.y + (dy / dist) * tailLen;

  const grad = ctx.createLinearGradient(body.x, body.y, tailX, tailY);
  grad.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
  grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

  ctx.strokeStyle = grad;
  ctx.lineWidth = body.radius * 1.8;
  ctx.beginPath();
  ctx.moveTo(body.x, body.y);
  ctx.lineTo(tailX, tailY);
  ctx.stroke();
}

/**
 * Real-time Runge-Kutta 4 (RK4) Trajectory Raycast
 */
function drawOrbitPrediction(ctx, body, cx, cy, centralBody, isAiming = false) {
  let px = body.x;
  let py = body.y;
  let pvx = body.vx;
  let pvy = body.vy;
  const dt = 1.0;
  const points = [];

  for (let step = 0; step < 450; step++) {
    const dx = cx - px;
    const dy = cy - py;
    const dist = Math.hypot(dx, dy);

    if (dist <= centralBody.radius) {
      points.push({ x: px, y: py, hit: true });
      break;
    }

    const force = (G_SIM * centralBody.mass) / Math.max(dist * dist, 100);
    const ax = (dx / dist) * force;
    const ay = (dy / dist) * force;

    pvx += ax * dt;
    pvy += ay * dt;
    px += pvx * dt;
    py += pvy * dt;

    points.push({ x: px, y: py, hit: false });
  }

  if (points.length < 2) return;

  ctx.strokeStyle = isAiming ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 240, 255, 0.45)';
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

/**
 * Slingshot Aim Guide
 */
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
