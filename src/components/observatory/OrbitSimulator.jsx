import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { 
  Orbit, Play, Pause, RotateCcw, Flame, Globe, Sparkles, Zap, Compass, 
  Crosshair, Radio, Layers, ChevronDown, Info, Maximize2, Minimize2,
  Sliders, Volume2, VolumeX, Eye, ShieldAlert, Activity, ArrowRight,
  Target, FastForward, SkipForward, RefreshCw, ZoomIn, ZoomOut, Move,
  Anchor, Trash2, Plus, MousePointer, ShieldCheck, HelpCircle, X, Camera
} from 'lucide-react';

// =========================================================================
// CELESTIAL CATALOG: CALIBRATED RELATIVE TO EARTH (1.0 R⊕, 1.0 M⊕)
// =========================================================================
export const CELESTIAL_CATALOG = [
  // 1. Singularities & High-Density Remnants
  {
    id: 'blackhole',
    category: 'Singularities',
    name: 'Kerr Singularity',
    type: 'blackhole',
    mass: 48000,
    radius: 22,
    baseRadius: 22,
    compactRadius: 18,
    color: '#ff6600',
    earthRadiusRatio: 4.6,
    earthMassRatio: 1300000,
    desc: 'Supermassive Kerr black hole with dynamic event horizon, reactive accretion disk, relativistic polar jets & gravitational lensing.',
    defaultCore: true,
    isLarge: true
  },
  {
    id: 'pulsar',
    category: 'Singularities',
    name: 'Pulsar Neutron Star',
    type: 'pulsar',
    mass: 16000,
    radius: 1.8,
    compactRadius: 3.0,
    color: '#c084fc',
    earthRadiusRatio: 0.002,
    earthMassRatio: 460000,
    desc: 'Ultra-dense 12km degenerate stellar remnant with sweeping relativistic synchrotron radiation beams.',
    defaultCore: true,
    isLarge: true
  },
  {
    id: 'whitedwarf',
    category: 'Singularities',
    name: 'Sirius B White Dwarf',
    type: 'white_dwarf',
    mass: 8500,
    radius: 3.0,
    compactRadius: 4.0,
    color: '#e0f2fe',
    earthRadiusRatio: 0.84,
    earthMassRatio: 330000,
    desc: 'Earth-sized electron-degenerate carbon-oxygen core with intense surface gravity and quantum glow.',
    defaultCore: true,
    isLarge: true
  },

  // 2. Luminous Stars (Colossal True Scale: Betelgeuse 380px vs Earth 3.5px)
  {
    id: 'hypergiant',
    category: 'Stars',
    name: 'Red Hypergiant (Betelgeuse)',
    type: 'hypergiant',
    mass: 45000,
    radius: 380,
    compactRadius: 110,
    color: '#ea580c',
    earthRadiusRatio: 880.0,
    earthMassRatio: 5500000,
    desc: 'Colossal 880 Earth-radii convective envelope (380px titan) with boiling supergranules & explosive mass-loss.',
    defaultCore: true,
    isLarge: true
  },
  {
    id: 'star_blue',
    category: 'Stars',
    name: 'Class O Blue Supergiant',
    type: 'star_blue',
    mass: 28000,
    radius: 210,
    compactRadius: 65,
    color: '#60a5fa',
    earthRadiusRatio: 240.0,
    earthMassRatio: 7500000,
    desc: 'Blazing 240 Earth-radii luminous blue supergiant radiating extreme ionizing ultraviolet flux and stellar winds.',
    defaultCore: true,
    isLarge: true
  },
  {
    id: 'star_yellow',
    category: 'Stars',
    name: 'Class G Yellow Star (Sun)',
    type: 'star_yellow',
    mass: 14000,
    radius: 125,
    compactRadius: 42,
    color: '#facc15',
    earthRadiusRatio: 109.0,
    earthMassRatio: 333000,
    desc: 'Standard main-sequence thermonuclear star (109 Earth-radii) with boiling granulation cells & coronal flares.',
    defaultCore: true,
    isLarge: true
  },
  {
    id: 'star_red',
    category: 'Stars',
    name: 'Red Dwarf (Proxima Centauri)',
    type: 'star_red',
    mass: 2400,
    radius: 46,
    compactRadius: 26,
    color: '#f87171',
    earthRadiusRatio: 15.4,
    earthMassRatio: 40000,
    desc: 'Ultra-stable low-mass convective red dwarf with intermittent magnetic flare eruptions.',
    defaultCore: true,
    isLarge: true
  },

  // 3. Gas & Ice Giants
  {
    id: 'jovian_giant',
    category: 'Gas Giants',
    name: 'Turbulent Jovian Giant',
    type: 'jovian_giant',
    mass: 650,
    radius: 36,
    compactRadius: 22,
    color: '#d97706',
    earthRadiusRatio: 11.2,
    earthMassRatio: 317.8,
    desc: '11.2x Earth radius gas giant with swirling equatorial jet streams & Great Red Spot cyclonic storm.',
    defaultCore: false,
    isLarge: false
  },
  {
    id: 'saturn_giant',
    category: 'Gas Giants',
    name: 'Ringed Gas Giant (Kronos)',
    type: 'ringed_giant',
    mass: 220,
    radius: 28,
    compactRadius: 18,
    color: '#fbbf24',
    earthRadiusRatio: 9.45,
    earthMassRatio: 95.2,
    desc: 'Banded giant surrounded by majestic reflective particulate ice rings spanning 2.4 planetary radii.',
    defaultCore: false,
    isLarge: false
  },
  {
    id: 'ice_giant',
    category: 'Gas Giants',
    name: 'Cyan Ice Giant (Neptunian)',
    type: 'ice_giant',
    mass: 80,
    radius: 13,
    compactRadius: 11,
    color: '#06b6d4',
    earthRadiusRatio: 3.88,
    earthMassRatio: 17.1,
    desc: 'Super-critical volatile methane mantle with supersonic equatorial jet stream winds.',
    defaultCore: false,
    isLarge: false
  },

  // 4. Terrestrial & Exotic Worlds (Standard Base: Terra = 1.0 R⊕ = 3.5px)
  {
    id: 'terra',
    category: 'Terrestrial',
    name: 'Habitable Ocean World (Terra)',
    type: 'terra',
    mass: 6,
    radius: 3.5,
    compactRadius: 4.5,
    color: '#38bdf8',
    earthRadiusRatio: 1.0,
    earthMassRatio: 1.0,
    desc: 'Standard base benchmark (1.0 R⊕ = 3.5px, 1.0 M⊕): Liquid oceans, continents, atmosphere & life.',
    defaultCore: false,
    isLarge: false
  },
  {
    id: 'lava_world',
    category: 'Terrestrial',
    name: 'Volcanic Magma World',
    type: 'lava_world',
    mass: 8,
    radius: 4.2,
    compactRadius: 4.8,
    color: '#ef4444',
    earthRadiusRatio: 1.10,
    earthMassRatio: 1.4,
    desc: 'Tidally heated super-Earth covered in molten silicate magma oceans and volcanic rifts.',
    defaultCore: false,
    isLarge: false
  },
  {
    id: 'ice_world',
    category: 'Terrestrial',
    name: 'Glaciated Cryo Super-Earth',
    type: 'ice_world',
    mass: 14,
    radius: 5.0,
    compactRadius: 5.2,
    color: '#bae6fd',
    earthRadiusRatio: 1.35,
    earthMassRatio: 2.4,
    desc: 'Sub-surface global ocean sealed beneath thick cracked crystalline nitrogen ice sheet.',
    defaultCore: false,
    isLarge: false
  },
  {
    id: 'mars_world',
    category: 'Terrestrial',
    name: 'Arid Desert Planet (Ares)',
    type: 'mars_world',
    mass: 2.5,
    radius: 1.9,
    compactRadius: 3.0,
    color: '#f97316',
    earthRadiusRatio: 0.53,
    earthMassRatio: 0.11,
    desc: '0.53 Earth radius planet with iron-oxide red dust plains, massive shield volcanoes & polar dry ice.',
    defaultCore: false,
    isLarge: false
  },

  // 5. Moons, Minor Bodies & Artifacts
  {
    id: 'luna',
    category: 'Moons & Debris',
    name: 'Cratered Lunar Moon',
    type: 'luna',
    mass: 0.4,
    radius: 1.1,
    compactRadius: 2.0,
    color: '#cbd5e1',
    earthRadiusRatio: 0.27,
    earthMassRatio: 0.012,
    desc: '0.27 Earth radius tidally locked silicate body scarred with ancient impact basins and regolith.',
    defaultCore: false,
    isLarge: false
  },
  {
    id: 'comet',
    category: 'Moons & Debris',
    name: 'Volatile Ice Comet',
    type: 'comet',
    mass: 0.02,
    radius: 0.7,
    compactRadius: 1.4,
    color: '#67e8f9',
    earthRadiusRatio: 0.05,
    earthMassRatio: 0.00001,
    desc: 'Sublimating porous ice nucleus trailing a luminescent ion tail away from stellar radiation.',
    defaultCore: false,
    isLarge: false
  },
  {
    id: 'asteroid',
    category: 'Moons & Debris',
    name: 'Carbonaceous Asteroid',
    type: 'asteroid',
    mass: 0.05,
    radius: 0.8,
    compactRadius: 1.4,
    color: '#94a3b8',
    earthRadiusRatio: 0.08,
    earthMassRatio: 0.00015,
    desc: 'Tumbling carbonaceous chondrite asteroid with irregular faceted cratered geometry.',
    defaultCore: false,
    isLarge: false
  },
  {
    id: 'satellite',
    category: 'Moons & Debris',
    name: 'Orbital Slingshot Probe',
    type: 'satellite',
    mass: 0.005,
    radius: 0.5,
    compactRadius: 1.0,
    color: '#00ff88',
    earthRadiusRatio: 0.02,
    earthMassRatio: 0.0000001,
    desc: 'Micro-probe equipped with ion thruster calibrated for gravity assist slingshot maneuvers.',
    defaultCore: false,
    isLarge: false
  },
  {
    id: 'antimatter',
    category: 'Moons & Debris',
    name: 'Antimatter Annihilator',
    type: 'antimatter',
    mass: 1.0,
    radius: 1.5,
    compactRadius: 1.8,
    color: '#f43f5e',
    earthRadiusRatio: 0.10,
    earthMassRatio: 0.05,
    desc: 'Magnetic confinement capsule of positronium triggering instant gamma annihilation on impact.',
    defaultCore: false,
    isLarge: false
  }
];

// Space Area Visual Styles
export const SPACE_STYLES = [
  { id: 'void', name: 'Deep Space Void', desc: 'Infinite vacuum, vacuum quantum fluctuations & distant galaxies' },
  { id: 'nebula', name: 'Orion Emission Nebula', desc: 'Vibrant luminous interstellar hydrogen-alpha clouds' },
  { id: 'galactic_core', name: 'Galactic Core', desc: 'Intense golden star cluster bulge & dark dust lanes' },
  { id: 'supernova', name: 'Supernova Remnant', desc: 'Expanding synchrotron shock fronts & ionized gas arcs' },
  { id: 'cosmic_web', name: 'Dark Matter Web', desc: 'Large-scale cosmic filaments connecting galaxy clusters' },
  { id: 'blueprint', name: 'Observatory Radar HUD', desc: 'Tactical holographic telemetry grid & coordinate reticles' }
];

// Sandbox Quick Scenarios
export const SANDBOX_PRESETS = [
  { id: 'blank', label: 'Empty Free Ground', desc: 'Zero bodies — complete creative freedom' },
  { id: 'solar', label: 'Solar & Inner Worlds', desc: 'Yellow Sun with Earth, Mars, Comets & Belt Rocks' },
  { id: 'blackhole', label: 'Tidal Disruption (TDE)', desc: 'Star experiencing tidal spaghettification & Kerr black hole infall' },
  { id: 'binary', label: 'Binary Star Dance', desc: 'Dual stars orbiting a mutual barycenter' },
  { id: 'trojan', label: 'Lagrange L4/L5 Swarms', desc: 'Sun, Jovian giant, and stable Trojan asteroid clusters' },
  { id: 'roche', label: 'Tidal Roche Disruption', desc: 'Dense giant disintegrating a fragile moon into rings' },
  { id: 'three_body', label: 'Chaotic 3-Body Problem', desc: 'Gravitational 3-body dance' },
  { id: 'asteroid_belt', label: 'Asteroid Belt Swarm', desc: 'Central star with dense orbiting ring of rocks' }
];

export default function OrbitSimulator({ initialStar = null }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // --- Active Tool Mode ---
  // 'spawn' (click/drag to place body) | 'slingshot' (drag to fling any body) | 'pan' (drag canvas) | 'core' (click body to toggle core anchor) | 'delete' (click body to erase) | 'inspect' (click body to inspect)
  const [activeTool, setActiveTool] = useState('spawn');
  const [selectedCatalogItem, setSelectedCatalogItem] = useState(CELESTIAL_CATALOG[0]);
  const [spawnAsCore, setSpawnAsCore] = useState(false);
  const [spawnVelocityMode, setSpawnVelocityMode] = useState('drag'); // 'drag' | 'rest' | 'orbit'

  // --- Space Environment Theme ---
  const [spaceStyle, setSpaceStyle] = useState('nebula'); // 'void' | 'nebula' | 'galactic_core' | 'supernova' | 'cosmic_web' | 'blueprint'

  // --- Physics & Engine Settings ---
  const [isRunning, setIsRunning] = useState(true);
  const [timeStep, setTimeStep] = useState(1.0);
  const [gravityG, setGravityG] = useState(1.0);
  const [collisionBehavior, setCollisionBehavior] = useState('merge'); // 'merge' | 'shatter' | 'bounce'
  const [gridStyle, setGridStyle] = useState('curvature'); // 'curvature' | 'rings' | 'off'
  const [showVectors, setShowVectors] = useState(false);
  const [showTrails, setShowTrails] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scaleMode, setScaleMode] = useState('true_astronomical'); // 'true_astronomical' | 'compact_viewport'

  // Custom Mass / Size Multipliers for spawner
  const [massScale, setMassScale] = useState(1.0);
  const [sizeScale, setSizeScale] = useState(1.0);
  const [launchPower, setLaunchPower] = useState(1.0);

  // --- Camera View (Pan & Zoom) ---
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [followId, setFollowId] = useState(null);
  const [selectedBodyId, setSelectedBodyId] = useState(null);

  // UI Drawer states
  const [activeDrawer, setActiveDrawer] = useState('catalog'); // 'catalog' | 'environment' | 'inspector' | 'none'
  const [catalogCategory, setCatalogCategory] = useState('All');

  // Refs for animation loop
  const zoomRef = useRef(1.0);
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);

  const panRef = useRef({ x: 0, y: 0 });
  useEffect(() => { panRef.current = pan; }, [pan]);

  const bodiesRef = useRef([]);
  const particlesRef = useRef([]);
  const shockwavesRef = useRef([]);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const fpsRef = useRef(60);

  const aimRef = useRef({ isAiming: false, isSlingshot: false, start: { x: 0, y: 0 }, current: { x: 0, y: 0 }, targetBody: null });
  const panStartRef = useRef({ x: 0, y: 0, isPanning: false });
  const slingshotTargetRef = useRef(null);

  // Telemetry state
  const [telemetry, setTelemetry] = useState({
    totalBodies: 0,
    coresCount: 0,
    totalSystemMass: 0,
    fps: 60,
    lastEvent: 'READY / FREE GROUND ACTIVE'
  });

  // Synthesized Audio FX
  const audioCtxRef = useRef(null);
  const playAudio = useCallback((type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (!ctx || ctx.state === 'suspended') ctx?.resume();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'spawn') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'slingshot') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'merge') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.45);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      } else if (type === 'shatter') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(380, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'gw_chirp') {
        // Gravitational Wave Chirp (LIGO-style inspiral frequency rise)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.65);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
        osc.start();
        osc.stop(ctx.currentTime + 0.7);
      } else if (type === 'supernova') {
        // Massive Core-Collapse Supernova Detonation
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(28, ctx.currentTime + 0.9);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.9);
        osc.start();
        osc.stop(ctx.currentTime + 0.9);
      } else if (type === 'flare') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'energy_charge') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'swell') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(130, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.28, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch (e) {}
  }, [soundEnabled]);

  // Background stars memo
  const bgStars = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 220; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 4500,
        y: (Math.random() - 0.5) * 4500,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.7 + 0.2
      });
    }
    return stars;
  }, []);

  const getCanvasCenter = () => {
    const canvas = canvasRef.current;
    return canvas ? { x: canvas.width / 2, y: canvas.height / 2 } : { x: 500, y: 350 };
  };

  // Convert screen coordinates to universe space taking pan & zoom into account
  const screenToWorld = (screenX, screenY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const rawX = (screenX - rect.left) * (canvas.width / rect.width);
    const rawY = (screenY - rect.top) * (canvas.height / rect.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const z = zoomRef.current || 1.0;
    const p = panRef.current || { x: 0, y: 0 };

    return {
      x: cx + (rawX - cx - p.x) / z,
      y: cy + (rawY - cy - p.y) / z
    };
  };

  // Load Preset Scenarios
  const loadScenario = useCallback((scenarioId) => {
    const center = getCanvasCenter();
    particlesRef.current = [];
    shockwavesRef.current = [];
    setPan({ x: 0, y: 0 });
    setFollowId(null);
    setSelectedBodyId(null);

    if (scenarioId === 'blank') {
      bodiesRef.current = [];
    } else if (scenarioId === 'solar') {
      const sun = CELESTIAL_CATALOG.find(c => c.id === 'star_yellow');
      const terra = CELESTIAL_CATALOG.find(c => c.id === 'terra');
      const ares = CELESTIAL_CATALOG.find(c => c.id === 'mars_world');
      const comet = CELESTIAL_CATALOG.find(c => c.id === 'comet');
      const asteroid = CELESTIAL_CATALOG.find(c => c.id === 'asteroid');

      const vTerra = Math.sqrt((1.0 * sun.mass) / 220);
      const vAres = Math.sqrt((1.0 * sun.mass) / 320);
      const vAst = Math.sqrt((1.0 * sun.mass) / 270);

      bodiesRef.current = [
        {
          id: 'sun',
          name: sun.name,
          type: sun.type,
          x: center.x,
          y: center.y,
          vx: 0, vy: 0, ax: 0, ay: 0,
          mass: sun.mass,
          radius: sun.radius,
          color: sun.color,
          isCore: true,
          isLarge: true,
          earthRadiusRatio: sun.earthRadiusRatio,
          earthMassRatio: sun.earthMassRatio,
          trail: []
        },
        {
          id: 'terra-1',
          name: terra.name,
          type: terra.type,
          x: center.x,
          y: center.y - 220,
          vx: vTerra, vy: 0, ax: 0, ay: 0,
          mass: terra.mass,
          radius: terra.radius,
          color: terra.color,
          isCore: false,
          isLarge: false,
          earthRadiusRatio: 1.0,
          earthMassRatio: 1.0,
          trail: []
        },
        {
          id: 'ares-1',
          name: ares.name,
          type: ares.type,
          x: center.x,
          y: center.y + 320,
          vx: -vAres, vy: 0, ax: 0, ay: 0,
          mass: ares.mass,
          radius: ares.radius,
          color: ares.color,
          isCore: false,
          isLarge: false,
          earthRadiusRatio: ares.earthRadiusRatio,
          earthMassRatio: ares.earthMassRatio,
          trail: []
        },
        {
          id: 'asteroid-1',
          name: 'Main Belt Asteroid (Ceres)',
          type: asteroid.type,
          x: center.x + 270,
          y: center.y,
          vx: 0, vy: vAst, ax: 0, ay: 0,
          mass: asteroid.mass,
          radius: asteroid.radius,
          color: asteroid.color,
          isCore: false,
          isLarge: false,
          earthRadiusRatio: asteroid.earthRadiusRatio,
          earthMassRatio: asteroid.earthMassRatio,
          trail: []
        },
        {
          id: 'comet-1',
          name: comet.name,
          type: comet.type,
          x: center.x - 440,
          y: center.y - 190,
          vx: 4.8, vy: -1.8, ax: 0, ay: 0,
          mass: comet.mass,
          radius: comet.radius,
          color: comet.color,
          isCore: false,
          isLarge: false,
          earthRadiusRatio: comet.earthRadiusRatio,
          earthMassRatio: comet.earthMassRatio,
          trail: []
        }
      ];
    } else if (scenarioId === 'binary') {
      const star1 = CELESTIAL_CATALOG.find(c => c.id === 'star_blue');
      const star2 = CELESTIAL_CATALOG.find(c => c.id === 'star_yellow');
      const terra = CELESTIAL_CATALOG.find(c => c.id === 'terra');
      const dist = 140;
      const v = 4.8;

      bodiesRef.current = [
        {
          id: 'star-alpha',
          name: 'Alpha Core (Class O Blue)',
          type: star1.type,
          x: center.x - dist,
          y: center.y,
          vx: 0, vy: v, ax: 0, ay: 0,
          mass: 16000,
          radius: 46,
          color: star1.color,
          isCore: false,
          isLarge: false,
          trail: []
        },
        {
          id: 'star-beta',
          name: 'Beta Core (Class G Yellow)',
          type: star2.type,
          x: center.x + dist,
          y: center.y,
          vx: 0, vy: -v, ax: 0, ay: 0,
          mass: 12000,
          radius: 36,
          color: star2.color,
          isCore: false,
          isLarge: false,
          trail: []
        },
        {
          id: 'circumbinary-world',
          name: 'Circumbinary Habitable World',
          type: terra.type,
          x: center.x,
          y: center.y - 360,
          vx: Math.sqrt((1.0 * 28000) / 360), vy: 0, ax: 0, ay: 0,
          mass: terra.mass,
          radius: terra.radius,
          color: terra.color,
          isCore: false,
          isLarge: false,
          earthRadiusRatio: 1.0,
          trail: []
        }
      ];
    } else if (scenarioId === 'blackhole') {
      const bh = CELESTIAL_CATALOG.find(c => c.id === 'blackhole');
      const star = CELESTIAL_CATALOG.find(c => c.id === 'star_yellow');
      
      bodiesRef.current = [
        {
          id: 'singularity-prime',
          name: 'Supermassive Kerr Singularity',
          type: bh.type,
          x: center.x,
          y: center.y,
          vx: 0, vy: 0, ax: 0, ay: 0,
          mass: bh.mass,
          radius: bh.radius,
          color: bh.color,
          isCore: true,
          isLarge: true,
          earthRadiusRatio: bh.earthRadiusRatio,
          earthMassRatio: bh.earthMassRatio,
          accretionFlare: 0.25,
          trail: []
        },
        {
          id: 'infalling-star',
          name: 'Infalling Class G Star (TDE Target)',
          type: star.type,
          x: center.x + 300,
          y: center.y - 150,
          vx: -3.8,
          vy: 8.4,
          ax: 0, ay: 0,
          mass: 6500,
          radius: 26,
          color: star.color,
          isCore: false,
          isLarge: false,
          trail: []
        }
      ];
      // Add relativistic debris stream inside accretion disk
      for (let i = 0; i < 4; i++) {
        const rad = 75 + i * 32;
        const vel = Math.sqrt((1.0 * bh.mass) / rad);
        bodiesRef.current.push({
          id: `infall-${i}`,
          name: `Accretion Clump #${i+1}`,
          type: 'asteroid',
          x: center.x,
          y: center.y - rad,
          vx: vel,
          vy: 0, ax: 0, ay: 0,
          mass: 0.05,
          radius: 1.4,
          color: '#fbbf24',
          isCore: false,
          isLarge: false,
          trail: []
        });
      }
    } else if (scenarioId === 'three_body') {
      const m = 8000;
      const v = 3.6;
      const d = 170;
      bodiesRef.current = [
        { id: 'body-1', name: 'Triad Alpha (Blue)', type: 'star_blue', x: center.x - d, y: center.y - d * 0.5, vx: v * 0.7, vy: -v, ax: 0, ay: 0, mass: m, radius: 28, color: '#38bdf8', isCore: false, isLarge: false, trail: [] },
        { id: 'body-2', name: 'Triad Beta (Yellow)', type: 'star_yellow', x: center.x + d, y: center.y - d * 0.5, vx: -v * 0.7, vy: v, ax: 0, ay: 0, mass: m, radius: 28, color: '#facc15', isCore: false, isLarge: false, trail: [] },
        { id: 'body-3', name: 'Triad Gamma (Red)', type: 'star_red', x: center.x, y: center.y + d, vx: v, vy: 0, ax: 0, ay: 0, mass: m, radius: 24, color: '#f87171', isCore: false, isLarge: false, trail: [] }
      ];
    } else if (scenarioId === 'asteroid_belt') {
      const sun = CELESTIAL_CATALOG.find(c => c.id === 'star_yellow');
      bodiesRef.current = [
        {
          id: 'belt-star',
          name: 'Helios Anchor',
          type: sun.type,
          x: center.x,
          y: center.y,
          vx: 0, vy: 0, ax: 0, ay: 0,
          mass: sun.mass,
          radius: sun.radius,
          color: sun.color,
          isCore: true,
          isLarge: true,
          trail: []
        }
      ];
      // Generate realistic asteroid belt
      for (let i = 0; i < 35; i++) {
        const ang = (i / 35) * Math.PI * 2;
        const r = 240 + (Math.random() - 0.5) * 80;
        const speed = Math.sqrt((1.0 * sun.mass) / r);
        bodiesRef.current.push({
          id: `belt-ast-${i}`,
          name: `Asteroid #${i+1}`,
          type: 'asteroid',
          x: center.x + Math.cos(ang) * r,
          y: center.y + Math.sin(ang) * r,
          vx: -Math.sin(ang) * speed,
          vy: Math.cos(ang) * speed,
          ax: 0, ay: 0,
          mass: 0.05 + Math.random() * 0.05,
          radius: 1.4 + Math.random() * 0.5,
          color: '#94a3b8',
          isCore: false,
          isLarge: false,
          trail: []
        });
      }
    } else if (scenarioId === 'trojan') {
      const sun = CELESTIAL_CATALOG.find(c => c.id === 'star_yellow');
      const jupiter = CELESTIAL_CATALOG.find(c => c.id === 'jovian_giant');
      const rJup = 360;
      const vJup = Math.sqrt((1.0 * sun.mass) / rJup);
      bodiesRef.current = [
        {
          id: 'sun',
          name: 'Solar Prime',
          type: sun.type,
          x: center.x,
          y: center.y,
          vx: 0, vy: 0, ax: 0, ay: 0,
          mass: sun.mass,
          radius: sun.radius,
          color: sun.color,
          isCore: true,
          isLarge: true,
          trail: []
        },
        {
          id: 'jupiter',
          name: 'Jovian Giant',
          type: jupiter.type,
          x: center.x + rJup,
          y: center.y,
          vx: 0, vy: vJup, ax: 0, ay: 0,
          mass: jupiter.mass,
          radius: jupiter.radius,
          color: jupiter.color,
          isCore: false,
          isLarge: false,
          earthRadiusRatio: jupiter.earthRadiusRatio,
          trail: []
        }
      ];
      // Add L4 (+60 deg) and L5 (-60 deg) Trojans
      [Math.PI / 3, -Math.PI / 3].forEach((baseAngle, clusterIdx) => {
        for (let i = 0; i < 9; i++) {
          const ang = baseAngle + (Math.random() - 0.5) * 0.16;
          const r = rJup + (Math.random() - 0.5) * 20;
          const speed = Math.sqrt((1.0 * sun.mass) / r);
          bodiesRef.current.push({
            id: `trojan-${clusterIdx}-${i}`,
            name: `Trojan Asteroid ${clusterIdx === 0 ? 'L4' : 'L5'}-${i+1}`,
            type: 'asteroid',
            x: center.x + Math.cos(ang) * r,
            y: center.y + Math.sin(ang) * r,
            vx: -Math.sin(ang) * speed,
            vy: Math.cos(ang) * speed,
            ax: 0, ay: 0,
            mass: 0.05,
            radius: 1.4,
            color: clusterIdx === 0 ? '#38bdf8' : '#a855f7',
            isCore: false,
            isLarge: false,
            trail: []
          });
        }
      });
    } else if (scenarioId === 'roche') {
      const giant = CELESTIAL_CATALOG.find(c => c.id === 'jovian_giant');
      const moon = CELESTIAL_CATALOG.find(c => c.id === 'luna');
      const r = 110;
      const v = Math.sqrt((1.0 * 2400) / r);
      bodiesRef.current = [
        {
          id: 'giant',
          name: 'Super-Jovian Giant',
          type: giant.type,
          x: center.x,
          y: center.y,
          vx: 0, vy: 0, ax: 0, ay: 0,
          mass: 2400,
          radius: 28,
          color: giant.color,
          isCore: true,
          isLarge: true,
          trail: []
        },
        {
          id: 'fragile-moon',
          name: 'Fragile Ice Moon',
          type: moon.type,
          x: center.x + r,
          y: center.y,
          vx: 0, vy: v, ax: 0, ay: 0,
          mass: 0.4,
          radius: 2.2,
          color: '#cbd5e1',
          isCore: false,
          isLarge: false,
          trail: []
        }
      ];
      for (let i = 0; i < 14; i++) {
        const ang = 0.14 * (i + 1);
        const fragR = r - i * 2.2;
        const spd = Math.sqrt((1.0 * 2400) / fragR);
        bodiesRef.current.push({
          id: `roche-frag-${i}`,
          name: `Ring Shard #${i+1}`,
          type: 'asteroid',
          x: center.x + Math.cos(ang) * fragR,
          y: center.y + Math.sin(ang) * fragR,
          vx: -Math.sin(ang) * spd,
          vy: Math.cos(ang) * spd,
          ax: 0, ay: 0,
          mass: 0.05,
          radius: 1.4,
          color: '#94a3b8',
          isCore: false,
          isLarge: false,
          trail: []
        });
      }
    }
  }, []);

  // Snapshot / Frame Export
  const handleSnapshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `darkmatter-telemetry-${Date.now()}.png`;
      a.click();
    } catch (e) {
      console.warn('Canvas export error:', e);
    }
  }, []);

  useEffect(() => {
    if (initialStar) {
      const center = getCanvasCenter();
      particlesRef.current = [];
      shockwavesRef.current = [];
      setPan({ x: 0, y: 0 });

      if (initialStar.type === 'calculator_launch') {
        const centralMass = initialStar.centralMassKg ? Math.min(Math.max(initialStar.centralMassKg / 1e22, 1200), 18000) : 12000;
        const rad = 230;
        const calcSpeed = initialStar.satelliteSpeed ? Math.min(Math.max(initialStar.satelliteSpeed * 0.45, 1.5), 14) : Math.sqrt((1.0 * centralMass) / rad);

        bodiesRef.current = [
          {
            id: 'calc-core',
            name: `${initialStar.calculatorName || 'Orbital'} Center`,
            type: 'star_yellow',
            x: center.x,
            y: center.y,
            vx: 0, vy: 0, ax: 0, ay: 0,
            mass: centralMass,
            radius: 40,
            color: '#facc15',
            isCore: true,
            isLarge: true,
            trail: []
          },
          {
            id: 'calc-probe',
            name: `Scientific Probe (${(initialStar.satelliteSpeed || calcSpeed).toFixed(1)} km/s)`,
            type: 'satellite',
            x: center.x,
            y: center.y - rad,
            vx: calcSpeed, vy: 0, ax: 0, ay: 0,
            mass: 0.05,
            radius: 2.0,
            color: '#38bdf8',
            isCore: false,
            isLarge: false,
            trail: []
          }
        ];
        return;
      }

      // If a celestial catalog object was passed
      const objClass = (initialStar.class || '').toLowerCase();
      let coreCatalog = CELESTIAL_CATALOG.find(c => c.id === 'star_yellow');
      if (objClass === 'blackhole') {
        coreCatalog = CELESTIAL_CATALOG.find(c => c.id === 'blackhole') || coreCatalog;
      } else if (objClass === 'pulsar') {
        coreCatalog = CELESTIAL_CATALOG.find(c => c.id === 'pulsar') || coreCatalog;
      } else if (objClass === 'exoplanet') {
        coreCatalog = CELESTIAL_CATALOG.find(c => c.id === 'terra') || coreCatalog;
      }

      const orbRadius = 240;
      const orbSpeed = Math.sqrt((1.0 * coreCatalog.mass) / orbRadius);

      bodiesRef.current = [
        {
          id: `core-${initialStar.id || 'target'}`,
          name: initialStar.name || coreCatalog.name,
          type: coreCatalog.type,
          x: center.x,
          y: center.y,
          vx: 0, vy: 0, ax: 0, ay: 0,
          mass: coreCatalog.mass,
          radius: coreCatalog.radius,
          color: coreCatalog.color,
          isCore: true,
          isLarge: coreCatalog.isLarge,
          trail: []
        },
        {
          id: 'orbital-probe',
          name: 'Research Probe',
          type: 'satellite',
          x: center.x,
          y: center.y - orbRadius,
          vx: orbSpeed, vy: 0, ax: 0, ay: 0,
          mass: 0.05,
          radius: 2.0,
          color: '#34d399',
          isCore: false,
          isLarge: false,
          trail: []
        }
      ];
    } else {
      loadScenario('solar');
    }
  }, [initialStar, loadScenario]);

  // Any celestial object can be anchored as a fixed position core, or dynamic to be slingshotted/orbited
  const isStationary = useCallback((b) => Boolean(b && b.isCore), []);

  // --- N-Body Gravitational Physics Solver ---
  const computeGravitation = useCallback((bodies, G) => {
    // Reset accelerations
    bodies.forEach(b => {
      b.ax = 0;
      b.ay = 0;
    });

    const len = bodies.length;
    for (let i = 0; i < len; i++) {
      const b1 = bodies[i];
      for (let j = i + 1; j < len; j++) {
        const b2 = bodies[j];
        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist > 4) {
          // Relativistic Post-Newtonian orbital correction near black holes:
          let relFactor = 1.0;
          if (b1.type === 'blackhole' || b2.type === 'blackhole') {
            relFactor = 1.0 + Math.min(2.8, 22.0 / Math.max(10, dist));
          }

          const force = (G * b1.mass * b2.mass * relFactor) / (distSq + 25); // softening factor

          // Non-stationary bodies experience gravitational acceleration; large objects remain stationary anchors
          if (!isStationary(b1)) {
            b1.ax += (dx / dist) * (force / b1.mass);
            b1.ay += (dy / dist) * (force / b1.mass);
          }
          if (!isStationary(b2)) {
            b2.ax -= (dx / dist) * (force / b2.mass);
            b2.ay -= (dy / dist) * (force / b2.mass);
          }
        }
      }
    }
  }, [isStationary]);

  // --- Pointer Down (Launch / Pan / Core / Delete / Inspect) ---
  const handlePointerDown = (e) => {
    // Middle click or space/shift defaults to panning
    if (e.button === 1 || e.shiftKey || activeTool === 'pan') {
      panStartRef.current = {
        isPanning: true,
        x: e.clientX - pan.x,
        y: e.clientY - pan.y
      };
      return;
    }

    if (e.button !== 0) return; // primary left click only

    const worldCoords = screenToWorld(e.clientX, e.clientY);

    // 1. Tool: Delete Body
    if (activeTool === 'delete') {
      const clicked = bodiesRef.current.find(b => Math.hypot(b.x - worldCoords.x, b.y - worldCoords.y) <= b.radius + 10);
      if (clicked) {
        triggerExplosion(clicked.x, clicked.y, clicked.radius * 2, '#ff3366');
        bodiesRef.current = bodiesRef.current.filter(b => b.id !== clicked.id);
        if (selectedBodyId === clicked.id) setSelectedBodyId(null);
      }
      return;
    }

    // 2. Tool: Toggle Core Anchor (Fixed Position vs Dynamic / Slingshot Ready)
    if (activeTool === 'core') {
      const clicked = bodiesRef.current.find(b => Math.hypot(b.x - worldCoords.x, b.y - worldCoords.y) <= b.radius + 16);
      if (clicked) {
        clicked.isCore = !clicked.isCore;
        if (clicked.isCore) {
          clicked.vx = 0;
          clicked.vy = 0;
          shockwavesRef.current.push({
            x: clicked.x, y: clicked.y,
            r: clicked.radius * 0.8, maxR: clicked.radius * 2.8,
            alpha: 1.0, color: '#facc15'
          });
        } else {
          shockwavesRef.current.push({
            x: clicked.x, y: clicked.y,
            r: clicked.radius * 0.8, maxR: clicked.radius * 2.8,
            alpha: 1.0, color: '#38bdf8'
          });
        }
        playAudio('spawn');
        setTelemetry(prev => ({
          ...prev,
          lastEvent: clicked.isCore 
            ? `ANCHORED ${clicked.name.toUpperCase()} (FIXED IN POSITION)`
            : `RELEASED ${clicked.name.toUpperCase()} (FREE TO MOVE / SLINGSHOT)`
        }));
      }
      return;
    }

    // 3. Tool: Inspect Body
    if (activeTool === 'inspect') {
      const clicked = bodiesRef.current.find(b => Math.hypot(b.x - worldCoords.x, b.y - worldCoords.y) <= b.radius + 12);
      if (clicked) {
        setSelectedBodyId(clicked.id);
        setActiveDrawer('inspector');
      }
      return;
    }

    // 4. Tool: Inject Stellar Energy
    if (activeTool === 'energy') {
      const clicked = bodiesRef.current.find(b => Math.hypot(b.x - worldCoords.x, b.y - worldCoords.y) <= b.radius + 18);
      if (clicked) {
        handleInjectEnergy(clicked, 0.25);
      }
      return;
    }

    // 5. Tool: Slingshot Body Across Space
    if (activeTool === 'slingshot') {
      let target = bodiesRef.current.find(b => Math.hypot(b.x - worldCoords.x, b.y - worldCoords.y) <= b.radius + 18);
      if (!target) {
        let minDist = 80;
        for (const b of bodiesRef.current) {
          const d = Math.hypot(b.x - worldCoords.x, b.y - worldCoords.y);
          if (d < minDist) {
            minDist = d;
            target = b;
          }
        }
      }

      if (target) {
        slingshotTargetRef.current = target;
        aimRef.current = {
          isAiming: true,
          isSlingshot: true,
          start: { x: target.x, y: target.y },
          current: worldCoords,
          targetBody: target
        };
      }
      return;
    }

    // 5. Tool: Spawn Anything
    if (activeTool === 'spawn') {
      aimRef.current = {
        isAiming: true,
        isSlingshot: false,
        start: worldCoords,
        current: worldCoords,
        targetBody: null
      };
    }
  };

  const handlePointerMove = (e) => {
    if (panStartRef.current.isPanning) {
      setPan({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y
      });
      return;
    }

    if (aimRef.current.isAiming) {
      aimRef.current.current = screenToWorld(e.clientX, e.clientY);
      if (aimRef.current.targetBody) {
        aimRef.current.start = { x: aimRef.current.targetBody.x, y: aimRef.current.targetBody.y };
      }
    }
  };

  const handlePointerUp = () => {
    if (panStartRef.current.isPanning) {
      panStartRef.current.isPanning = false;
      return;
    }

    if (!aimRef.current.isAiming) return;
    const { start, current, isSlingshot, targetBody } = aimRef.current;
    aimRef.current.isAiming = false;

    const dx = start.x - current.x;
    const dy = start.y - current.y;
    const dragDist = Math.hypot(dx, dy);

    // Handle Active Slingshot Fling (Applies to ANY celestial object: asteroid, planet, star, hypergiant, black hole)
    if (isSlingshot && targetBody) {
      if (dragDist > 6) {
        const impulseFactor = 0.052 * launchPower;
        targetBody.vx += dx * impulseFactor;
        targetBody.vy += dy * impulseFactor;
        // Release fixed position anchor so ANY object can be slingshotted across space
        targetBody.isCore = false;
        targetBody.isLarge = false;

        playAudio('slingshot');

        shockwavesRef.current.push({
          x: targetBody.x, y: targetBody.y,
          r: targetBody.radius, maxR: targetBody.radius * 4.2,
          alpha: 1.0, color: '#38bdf8'
        });
        for (let i = 0; i < 24; i++) {
          const ang = Math.random() * Math.PI * 2;
          const spd = Math.random() * 5 + 1.5;
          particlesRef.current.push({
            x: targetBody.x, y: targetBody.y,
            vx: Math.cos(ang) * spd + dx * impulseFactor * 0.25,
            vy: Math.sin(ang) * spd + dy * impulseFactor * 0.25,
            life: 1.0, decay: 0.035,
            color: '#00f0ff', size: 2.2
          });
        }

        setTelemetry(prev => ({
          ...prev,
          lastEvent: `SLINGSHOTTED ${targetBody.name.toUpperCase()} (VELOCITY: ${Math.hypot(targetBody.vx, targetBody.vy).toFixed(1)} km/s)`
        }));
      }
      slingshotTargetRef.current = null;
      return;
    }

    let vx = 0;
    let vy = 0;

    if (spawnVelocityMode === 'drag') {
      vx = dx * 0.045 * launchPower;
      vy = dy * 0.045 * launchPower;
    } else if (spawnVelocityMode === 'orbit') {
      // Find nearest Core or most massive body to orbit around
      const cores = bodiesRef.current.filter(b => b.isCore || b.mass >= 1200);
      const attractor = cores.length > 0 ? cores[0] : (bodiesRef.current[0] || null);

      if (attractor) {
        const dX = start.x - attractor.x;
        const dY = start.y - attractor.y;
        const r = Math.max(Math.hypot(dX, dY), 50);
        const vOrbit = Math.sqrt((gravityG * attractor.mass) / r) * launchPower;
        vx = -(dY / r) * vOrbit;
        vy = (dX / r) * vOrbit;
      }
    }

    const baseCatalogRadius = scaleMode === 'true_astronomical'
      ? selectedCatalogItem.radius
      : (selectedCatalogItem.compactRadius || selectedCatalogItem.radius);
    const scaledMass = Math.max(0.05, Number((selectedCatalogItem.mass * massScale).toFixed(2)));
    const scaledRadius = Math.max(0.8, Number((baseCatalogRadius * sizeScale).toFixed(1)));

    const shouldAnchor = Boolean(spawnAsCore);

    const newBody = {
      id: `body-${Date.now()}`,
      name: `${selectedCatalogItem.name} #${bodiesRef.current.length + 1}`,
      type: selectedCatalogItem.type,
      x: start.x,
      y: start.y,
      vx: shouldAnchor ? 0 : vx,
      vy: shouldAnchor ? 0 : vy,
      ax: 0,
      ay: 0,
      mass: scaledMass,
      radius: scaledRadius,
      baseRadius: scaledRadius,
      color: selectedCatalogItem.color,
      isCore: shouldAnchor,
      isLarge: selectedCatalogItem.isLarge || false,
      earthRadiusRatio: selectedCatalogItem.earthRadiusRatio,
      earthMassRatio: selectedCatalogItem.earthMassRatio,
      stellarEnergy: (selectedCatalogItem.type.startsWith('star_') || selectedCatalogItem.type === 'hypergiant') ? 0.25 : 0,
      feedingTimer: selectedCatalogItem.type === 'blackhole' ? 120 : 0,
      accretionFlare: selectedCatalogItem.type === 'blackhole' ? 0.6 : 0,
      trail: []
    };

    bodiesRef.current.push(newBody);
    playAudio('spawn');
    setTelemetry(prev => ({
      ...prev,
      lastEvent: `SPAWNED ${newBody.name.toUpperCase()} (${shouldAnchor ? 'ANCHORED FIXED' : 'DYNAMIC / SLINGSHOT LAUNCHED'})`
    }));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    setZoom(prev => Math.min(5.0, Math.max(0.15, Number((prev * factor).toFixed(2)))));
  };

  // Explosion Particle Spawner
  // Explosion Particle Spawner
  const triggerExplosion = (x, y, radius, color) => {
    playAudio('shatter');
    shockwavesRef.current.push({ x, y, r: 4, maxR: radius * 3.5, alpha: 1.0, color });
    for (let i = 0; i < 40; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = Math.random() * 5 + 1.5;
      particlesRef.current.push({
        x, y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        life: 1.0,
        decay: Math.random() * 0.03 + 0.02,
        color: i % 2 === 0 ? color : '#ffaa00',
        size: Math.random() * 3 + 1.5
      });
    }
  };

  // --- Probabilistic Stellar Energy Consequence System ---
  const triggerStellarConsequence = useCallback((star, forcedType = null) => {
    if (!star || star.dead) return;

    // Consequence weights:
    // 1. Coronal Flare Superstorm: 35% (roll < 35)
    // 2. Photosphere Red Giant Swell: 25% (35 <= roll < 60)
    // 3. Core-Collapse Supernova: 20% (60 <= roll < 80)
    // 4. Wolf-Rayet Envelope Stripping: 12% (80 <= roll < 92)
    // 5. Cepheid Variable Pulsation: 8% (roll >= 92)
    const roll = forcedType ? 0 : Math.random() * 100;
    const type = forcedType || (
      roll < 35 ? 'flare_storm' :
      roll < 60 ? 'red_giant_swell' :
      roll < 80 ? 'supernova' :
      roll < 92 ? 'wolf_rayet' :
      'cepheid_pulsation'
    );

    if (type === 'flare_storm') {
      star.flareStormTimer = 360; // 6 seconds of magnetic coronal eruption
      star.accretionFlare = 1.0;
      playAudio('flare');

      // Radiate multiple coronal shock fronts
      shockwavesRef.current.push({ x: star.x, y: star.y, r: star.radius, maxR: star.radius * 3.8, alpha: 1.0, color: '#f59e0b' });
      shockwavesRef.current.push({ x: star.x, y: star.y, r: star.radius * 0.8, maxR: star.radius * 2.5, alpha: 0.9, color: '#ef4444' });

      // Coronal mass ejection plasma burst
      for (let i = 0; i < 70; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 8 + 3;
        particlesRef.current.push({
          x: star.x, y: star.y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          life: 1.2,
          decay: 0.02,
          color: i % 2 === 0 ? '#ffea75' : '#f97316',
          size: Math.random() * 3.5 + 1.5
        });
      }

      // Relativistic solar wind impulse pushes non-stationary bodies outward
      bodiesRef.current.forEach(other => {
        if (other.id !== star.id && !isStationary(other)) {
          const dx = other.x - star.x;
          const dy = other.y - star.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 800 && dist > 10) {
            const push = ((800 - dist) / 800) * 6.5;
            other.vx += (dx / dist) * push;
            other.vy += (dy / dist) * push;
          }
        }
      });

      star.stellarEnergy = 0.35;
      setTelemetry(prev => ({
        ...prev,
        lastEvent: `[35% PROB] CORONAL FLARE SUPERSTORM - CME DETONATED ON ${star.name.toUpperCase()}`
      }));

    } else if (type === 'red_giant_swell') {
      star.isSwelling = true;
      star.targetRadius = Math.min(480, star.radius * 2.2);
      star.color = '#ef4444'; // Cools to deep glowing ruby red
      star.name = `${star.name.replace(/ \(.*\)/, '')} (Red Giant Swell)`;
      playAudio('swell');

      shockwavesRef.current.push({ x: star.x, y: star.y, r: star.radius, maxR: star.targetRadius * 1.5, alpha: 0.85, color: '#ef4444' });

      // Engulf & vaporize any inner orbiting bodies swallowed inside the expanded photosphere!
      bodiesRef.current.forEach(other => {
        if (other.id !== star.id && !isStationary(other)) {
          const dist = Math.hypot(other.x - star.x, other.y - star.y);
          if (dist <= star.targetRadius) {
            other.dead = true;
            triggerSolarProminence(star, other);
          }
        }
      });

      star.stellarEnergy = 0.4;
      setTelemetry(prev => ({
        ...prev,
        lastEvent: `[25% PROB] PHOTOSPHERE SWELLS TO ${(star.targetRadius).toFixed(0)}px (RED GIANT)`
      }));

    } else if (type === 'supernova') {
      star.dead = true;
      playAudio('supernova');

      // Multi-ring shockwaves spanning massive cosmic distances
      shockwavesRef.current.push({ x: star.x, y: star.y, r: 10, maxR: 850, alpha: 1.0, color: '#38bdf8' });
      shockwavesRef.current.push({ x: star.x, y: star.y, r: 25, maxR: 700, alpha: 0.95, color: '#facc15' });
      shockwavesRef.current.push({ x: star.x, y: star.y, r: 40, maxR: 600, alpha: 0.9, color: '#ec4899' });
      shockwavesRef.current.push({ x: star.x, y: star.y, r: 5, maxR: 450, alpha: 1.0, color: '#ffffff' });

      // 160 relativistic blast particles
      for (let i = 0; i < 160; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 12 + 4;
        particlesRef.current.push({
          x: star.x, y: star.y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          life: 1.6,
          decay: 0.015,
          color: ['#ffffff', '#38bdf8', '#fbbf24', '#f43f5e', '#a855f7'][i % 5],
          size: Math.random() * 4 + 2
        });
      }

      // Vaporize or violently propel nearby bodies
      bodiesRef.current.forEach(other => {
        if (other.id !== star.id && !isStationary(other)) {
          const dx = other.x - star.x;
          const dy = other.y - star.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 280) {
            other.dead = true;
          } else if (dist < 850) {
            const push = ((850 - dist) / 850) * 14.0;
            other.vx += (dx / dist) * push;
            other.vy += (dy / dist) * push;
          }
        }
      });

      // Core Collapse into Remnant: 60% Kerr Black Hole, 40% Pulsar
      const spawnBH = Math.random() < 0.6;
      const remnant = spawnBH ? {
        id: `singularity-remnant-${Date.now()}`,
        name: `Newborn Kerr Singularity (Remnant)`,
        type: 'blackhole',
        x: star.x,
        y: star.y,
        vx: 0, vy: 0, ax: 0, ay: 0,
        mass: 52000,
        radius: 26,
        baseRadius: 26,
        color: '#ff6600',
        isCore: true,
        isLarge: true,
        feedingTimer: 360,
        accretionFlare: 1.0,
        earthRadiusRatio: 4.6,
        earthMassRatio: 1300000,
        trail: []
      } : {
        id: `pulsar-remnant-${Date.now()}`,
        name: `Newborn Relativistic Pulsar`,
        type: 'pulsar',
        x: star.x,
        y: star.y,
        vx: 0, vy: 0, ax: 0, ay: 0,
        mass: 18000,
        radius: 2.2,
        color: '#c084fc',
        isCore: true,
        isLarge: true,
        earthRadiusRatio: 0.002,
        earthMassRatio: 500000,
        trail: []
      };

      bodiesRef.current.push(remnant);
      if (selectedBodyId === star.id) setSelectedBodyId(remnant.id);

      setTelemetry(prev => ({
        ...prev,
        lastEvent: `[20% PROB] CORE-COLLAPSE SUPERNOVA -> COLLAPSED INTO ${spawnBH ? 'KERR BLACK HOLE' : 'PULSAR'}!`
      }));

    } else if (type === 'wolf_rayet') {
      // Supersonic stellar wind envelope ejection
      playAudio('flare');
      shockwavesRef.current.push({ x: star.x, y: star.y, r: star.radius, maxR: star.radius * 4.8, alpha: 0.9, color: '#06b6d4' });
      shockwavesRef.current.push({ x: star.x, y: star.y, r: star.radius * 0.5, maxR: star.radius * 3.2, alpha: 0.8, color: '#38bdf8' });

      for (let i = 0; i < 50; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 5 + 2;
        particlesRef.current.push({
          x: star.x, y: star.y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          life: 1.3,
          decay: 0.02,
          color: '#67e8f9',
          size: Math.random() * 3 + 1.2
        });
      }

      star.radius = Math.max(18, star.radius * 0.45);
      star.color = '#38bdf8'; // Electric cyan stripped core
      star.name = `${star.name.replace(/ \(.*\)/, '')} (Wolf-Rayet Core)`;
      star.stellarEnergy = 0.25;

      setTelemetry(prev => ({
        ...prev,
        lastEvent: `[12% PROB] WOLF-RAYET ENVELOPE STRIPPING - EXPOSED HELIUM/CARBON CORE`
      }));

    } else if (type === 'cepheid_pulsation') {
      star.isPulsating = true;
      star.baseRadius = star.baseRadius || star.radius;
      star.name = `${star.name.replace(/ \(.*\)/, '')} (Cepheid Variable)`;
      playAudio('flare');

      shockwavesRef.current.push({ x: star.x, y: star.y, r: star.radius * 0.9, maxR: star.radius * 2.2, alpha: 0.8, color: '#fbbf24' });

      star.stellarEnergy = 0.5;
      setTelemetry(prev => ({
        ...prev,
        lastEvent: `[8% PROB] CEPHEID VARIABLE RADIAL PULSATION ACTIVATED (±28% RADIUS)`
      }));
    }
  }, [playAudio, isStationary, selectedBodyId]);

  // Inject Stellar Energy into Core
  const handleInjectEnergy = useCallback((star, amount = 0.25) => {
    if (!star) return;
    star.stellarEnergy = Math.min(2.0, (star.stellarEnergy || 0.2) + amount);
    playAudio('energy_charge');

    shockwavesRef.current.push({
      x: star.x, y: star.y,
      r: star.radius * 0.4,
      maxR: star.radius * 1.8,
      alpha: 0.95,
      color: '#facc15'
    });

    for (let i = 0; i < 24; i++) {
      const ang = Math.random() * Math.PI * 2;
      const dist = star.radius * 2.0;
      const spd = Math.random() * 4 + 2;
      particlesRef.current.push({
        x: star.x + Math.cos(ang) * dist,
        y: star.y + Math.sin(ang) * dist,
        vx: -Math.cos(ang) * spd,
        vy: -Math.sin(ang) * spd,
        life: 0.8,
        decay: 0.04,
        color: i % 2 === 0 ? '#38bdf8' : '#facc15',
        size: Math.random() * 3 + 1.5
      });
    }

    setTelemetry(prev => ({
      ...prev,
      lastEvent: `ENERGY INJECTED INTO ${star.name.toUpperCase()} (CORE AT ${Math.round(star.stellarEnergy * 100)}%)`
    }));

    if (star.stellarEnergy >= 1.0) {
      triggerStellarConsequence(star);
    }
  }, [playAudio, triggerStellarConsequence]);

  // Black Hole Relativistic Swallow & Accretion Burst
  const triggerBlackHoleSwallow = (bh, swallowed) => {
    // 4 Expanding Gravitational wave spacetime ripple shockwaves
    shockwavesRef.current.push({
      x: bh.x, y: bh.y,
      r: bh.radius * 1.0,
      maxR: bh.radius * 7.5,
      alpha: 1.0,
      color: '#38bdf8'
    });
    shockwavesRef.current.push({
      x: bh.x, y: bh.y,
      r: bh.radius * 0.7,
      maxR: bh.radius * 5.2,
      alpha: 0.95,
      color: '#06b6d4'
    });
    shockwavesRef.current.push({
      x: bh.x, y: bh.y,
      r: bh.radius * 0.4,
      maxR: bh.radius * 3.8,
      alpha: 0.9,
      color: '#ff6600'
    });
    shockwavesRef.current.push({
      x: bh.x, y: bh.y,
      r: 4,
      maxR: bh.radius * 2.2,
      alpha: 1.0,
      color: '#ffffff'
    });

    // Intense relativistic accretion flare particles
    for (let i = 0; i < 55; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = Math.random() * 8 + 2.5;
      particlesRef.current.push({
        x: bh.x, y: bh.y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        life: 1.2,
        decay: Math.random() * 0.025 + 0.015,
        color: i % 3 === 0 ? '#ffffff' : (i % 3 === 1 ? '#ffeedd' : (swallowed.color || '#ff8800')),
        size: Math.random() * 3.2 + 1.2
      });
    }

    // Collimated relativistic polar particle jets (magnetic dynamo along spin axis)
    for (let j = 0; j < 36; j++) {
      const dir = j % 2 === 0 ? 1 : -1;
      const jetVy = dir * (Math.random() * 14 + 6);
      const jetVx = (Math.random() - 0.5) * 1.8;
      particlesRef.current.push({
        x: bh.x, y: bh.y,
        vx: jetVx,
        vy: jetVy,
        life: 1.5,
        decay: 0.018,
        color: j % 3 === 0 ? '#c084fc' : '#67e8f9',
        size: Math.random() * 3.5 + 1.5
      });
    }

    setTelemetry(prev => ({
      ...prev,
      lastEvent: `SINGULARITY DEVOURS ${swallowed.name.toUpperCase()} (r_s = ${bh.radius.toFixed(1)}px, M = ${bh.mass.toFixed(0)})`
    }));
  };

  // Solar Prominence Vaporization (Asteroid / Small Body into Star)
  const triggerSolarProminence = (star, object) => {
    shockwavesRef.current.push({
      x: object.x, y: object.y,
      r: 2,
      maxR: star.radius * 1.2,
      alpha: 0.85,
      color: '#fde047'
    });
    for (let i = 0; i < 16; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = Math.random() * 3.5 + 1.2;
      particlesRef.current.push({
        x: object.x, y: object.y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        life: 0.8,
        decay: 0.045,
        color: '#ffea75',
        size: Math.random() * 2 + 1
      });
    }
  };

  // --- Main Simulation Render Loop ---
  useEffect(() => {
    let animationFrameId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;
      if (delta > 0) fpsRef.current = Math.round(1000 / delta);

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      // Follow Camera Lock
      if (followId) {
        const target = bodiesRef.current.find(b => b.id === followId);
        if (target) {
          const targetPanX = (cx - target.x) * zoomRef.current;
          const targetPanY = (cy - target.y) * zoomRef.current;
          panRef.current.x += (targetPanX - panRef.current.x) * 0.12;
          panRef.current.y += (targetPanY - panRef.current.y) * 0.12;
        }
      }

      // 1. Draw Space Environment (Multi-Style Space Area)
      drawSpaceEnvironment(ctx, width, height, spaceStyle, frameCountRef.current, panRef.current, zoomRef.current, bgStars);

      // 3. Apply Camera View Transform (Pan & Zoom)
      ctx.save();
      ctx.translate(cx + panRef.current.x, cy + panRef.current.y);
      ctx.scale(zoomRef.current, zoomRef.current);
      ctx.translate(-cx, -cy);

      // 4. Spacetime Grid
      if (gridStyle !== 'off') {
        drawSpacetimeGrid(ctx, width, height, cx, cy, bodiesRef.current, gridStyle);
      }

      // --- Numerical Integration & Collisions ---
      let bodies = bodiesRef.current;
      if (isRunning) {
        const steps = 4;
        const dt = (1.0 * timeStep) / steps;

        for (let s = 0; s < steps; s++) {
          computeGravitation(bodies, gravityG);

          // Reset tidal deformation flags on first substep
          if (s === 0) {
            bodies.forEach(b => {
              b.isTidallyDisrupted = false;
              b.tidalStretch = 1.0;
            });
          }

          // Position updates
          bodies.forEach(b => {
            if (isStationary(b)) {
              b.vx = 0;
              b.vy = 0;
              b.ax = 0;
              b.ay = 0;
              return; // Large celestial bodies remain stationary anchors
            }
            b.vx += 0.5 * b.ax * dt;
            b.vy += 0.5 * b.ay * dt;
            b.x += b.vx * dt;
            b.y += b.vy * dt;
          });

          const len = bodies.length;

          // 1. Tidal Disruption Event (TDE) & Relativistic Spaghettification Solver
          // Governs the astrophysical interaction when a star or body approaches a Black Hole
          for (let i = 0; i < len; i++) {
            const b1 = bodies[i];
            if (b1.dead) continue;

            for (let j = i + 1; j < len; j++) {
              const b2 = bodies[j];
              if (b2.dead) continue;

              const isBH1 = b1.type === 'blackhole';
              const isBH2 = b2.type === 'blackhole';

              if (isBH1 || isBH2) {
                const bh = isBH1 ? b1 : b2;
                const other = isBH1 ? b2 : b1;

                if (other.type !== 'blackhole') {
                  const dx = bh.x - other.x;
                  const dy = bh.y - other.y;
                  const dist = Math.hypot(dx, dy);

                  // Roche Tidal Radius: R_T = R_other * (2.44 * (M_bh / M_other)^(1/3))
                  const massRatio = Math.max(1, bh.mass / Math.max(0.1, other.mass));
                  const rocheLimit = Math.min(360, other.radius * 2.44 * Math.cbrt(massRatio));

                  if (dist < rocheLimit) {
                    // Spaghettification Active!
                    other.isTidallyDisrupted = true;
                    other.tidalAngle = Math.atan2(bh.y - other.y, bh.x - other.x);
                    const proximity = Math.min(1.0, (rocheLimit - dist) / rocheLimit);
                    other.tidalStretch = Math.min(4.5, 1.0 + proximity * 3.2);

                    // Continuous mass stripping into black hole accretion disk
                    const strip = Math.min(other.mass * 0.016 + 0.04, other.mass);
                    other.mass = Math.max(0, other.mass - strip);
                    other.radius = Math.max(1.5, other.radius * 0.995);
                    bh.mass += strip * 0.85;
                    bh.accretionFlare = Math.min(1.0, (bh.accretionFlare || 0) + 0.06);

                    // Emit glowing relativistic plasma stream curving into accretion disk
                    if (Math.random() < 0.6) {
                      const dirX = (bh.x - other.x) / (dist || 1);
                      const dirY = (bh.y - other.y) / (dist || 1);
                      particlesRef.current.push({
                        x: other.x + dirX * other.radius * 0.8,
                        y: other.y + dirY * other.radius * 0.8,
                        vx: other.vx * 0.4 + dirX * 3.2 - dirY * 1.8,
                        vy: other.vy * 0.4 + dirY * 3.2 + dirX * 1.8,
                        life: 1.0,
                        decay: 0.035,
                        color: other.color || '#ffeedd',
                        size: Math.random() * 2.2 + 1.2
                      });
                    }

                    // Crossing Event Horizon / Innermost Stable Circular Orbit (ISCO)
                    if (dist <= bh.radius * 1.45 + other.radius * 0.25 || other.mass <= 0.05) {
                      other.dead = true;
                      bh.mass += other.mass;
                      const baseR = bh.baseRadius || 22;
                      bh.radius = Math.min(140, Math.max(baseR, baseR * Math.cbrt(bh.mass / 48000)));
                      bh.accretionFlare = 1.0;
                      bh.feedingTimer = 260; // Active feeding duration with continuous polar jet eruption
                      triggerBlackHoleSwallow(bh, other);
                      playAudio('gw_chirp');
                      continue;
                    }
                  }
                }
              }
            }
          }

          // 2. Physical Direct Impact Collisions
          for (let i = 0; i < len; i++) {
            const b1 = bodies[i];
            if (b1.dead) continue;

            for (let j = i + 1; j < len; j++) {
              const b2 = bodies[j];
              if (b2.dead) continue;

              const dx = b2.x - b1.x;
              const dy = b2.y - b1.y;
              const dist = Math.hypot(dx, dy);

              if (dist <= (b1.radius + b2.radius) * 0.85) {
                // Collision Reaction
                if (b1.type === 'blackhole' || b2.type === 'blackhole') {
                  // A Black Hole ALWAYS absorbs infalling mass and NEVER shatters!
                  const [bh, other] = b1.type === 'blackhole' ? [b1, b2] : [b2, b1];
                  other.dead = true;
                  bh.mass += other.mass;
                  const baseR = bh.baseRadius || 22;
                  bh.radius = Math.min(140, Math.max(baseR, baseR * Math.cbrt(bh.mass / 48000)));
                  bh.accretionFlare = 1.0;
                  bh.feedingTimer = 260;
                  triggerBlackHoleSwallow(bh, other);
                  playAudio('gw_chirp');
                } else if ((b1.type.startsWith('star_') || b1.type === 'hypergiant') && 
                           (b2.type === 'asteroid' || b2.type === 'comet' || b2.type === 'satellite' || b2.type === 'antimatter')) {
                  b2.dead = true;
                  b1.mass += b2.mass;
                  if (b2.type === 'antimatter') {
                    handleInjectEnergy(b1, 0.5);
                  } else {
                    handleInjectEnergy(b1, 0.08);
                    triggerSolarProminence(b1, b2);
                  }
                } else if ((b2.type.startsWith('star_') || b2.type === 'hypergiant') && 
                           (b1.type === 'asteroid' || b1.type === 'comet' || b1.type === 'satellite' || b1.type === 'antimatter')) {
                  b1.dead = true;
                  b2.mass += b1.mass;
                  if (b1.type === 'antimatter') {
                    handleInjectEnergy(b2, 0.5);
                  } else {
                    handleInjectEnergy(b2, 0.08);
                    triggerSolarProminence(b2, b1);
                  }
                } else if (collisionBehavior === 'merge') {
                  // Merge smaller into larger
                  const [larger, smaller] = b1.mass >= b2.mass ? [b1, b2] : [b2, b1];
                  smaller.dead = true;

                  // Conserve momentum (stationary anchors do not move)
                  if (!isStationary(larger)) {
                    larger.vx = (larger.vx * larger.mass + smaller.vx * smaller.mass) / (larger.mass + smaller.mass);
                    larger.vy = (larger.vy * larger.mass + smaller.vy * smaller.mass) / (larger.mass + smaller.mass);
                  } else {
                    larger.vx = 0;
                    larger.vy = 0;
                  }
                  larger.mass += smaller.mass;
                  larger.radius = Math.min(85, Math.pow(Math.pow(larger.radius, 3) + Math.pow(smaller.radius, 3), 1/3));

                  triggerExplosion(larger.x, larger.y, larger.radius, larger.color);
                  playAudio('merge');
                } else if (collisionBehavior === 'shatter') {
                  // Shatter both into fragments
                  b1.dead = true;
                  b2.dead = true;
                  triggerExplosion((b1.x + b2.x) / 2, (b1.y + b2.y) / 2, Math.max(b1.radius, b2.radius) * 2, '#ff3366');
                  playAudio('shatter');
                } else if (collisionBehavior === 'bounce') {
                  // Elastic rebound
                  const nx = dx / dist;
                  const ny = dy / dist;
                  const kx = b1.vx - b2.vx;
                  const ky = b1.vy - b2.vy;
                  const p = 2 * (nx * kx + ny * ky) / (b1.mass + b2.mass);
                  if (!isStationary(b1)) { b1.vx -= p * b2.mass * nx; b1.vy -= p * b2.mass * ny; }
                  if (!isStationary(b2)) { b2.vx += p * b1.mass * nx; b2.vy += p * b1.mass * ny; }
                }
              }
            }
          }

          bodies = bodies.filter(b => !b.dead);
          computeGravitation(bodies, gravityG);

          bodies.forEach(b => {
            if (isStationary(b)) {
              b.vx = 0;
              b.vy = 0;
              return;
            }
            b.vx += 0.5 * b.ax * dt;
            b.vy += 0.5 * b.ay * dt;
          });
        }
      }

      // 5. Draw Bodies & Visual Models
      const surviving = [];
      let totalMass = 0;
      let coresCount = 0;

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (Math.hypot(b.x - cx, b.y - cy) > 12000) continue; // cull far-lost bodies

        if (showTrails && !isStationary(b)) {
          b.trail.push({ x: b.x, y: b.y, v: Math.hypot(b.vx, b.vy) });
          if (b.trail.length > 220) b.trail.shift();
          drawTrail(ctx, b);
        }

        // Continuous dynamics for feeding black holes and active stars
        if (b.type === 'blackhole') {
          if (b.feedingTimer && b.feedingTimer > 0) {
            b.feedingTimer--;
            b.accretionFlare = Math.max(b.accretionFlare || 0.8, 0.7);
            if (b.feedingTimer % 45 === 0) {
              shockwavesRef.current.push({
                x: b.x, y: b.y,
                r: b.radius * 1.1,
                maxR: b.radius * 4.8,
                alpha: 0.85,
                color: '#38bdf8'
              });
            }
          }
        } else if (b.type.startsWith('star_') || b.type === 'hypergiant') {
          if (b.isSwelling && b.targetRadius && b.radius < b.targetRadius) {
            b.radius += (b.targetRadius - b.radius) * 0.04;
          }
          if (b.isPulsating && b.baseRadius) {
            b.radius = b.baseRadius * (1.0 + 0.28 * Math.sin(frameCountRef.current * 0.06));
          }
          if (b.flareStormTimer && b.flareStormTimer > 0) {
            b.flareStormTimer--;
            if (frameCountRef.current % 15 === 0) {
              const ang = Math.random() * Math.PI * 2;
              particlesRef.current.push({
                x: b.x + Math.cos(ang) * b.radius,
                y: b.y + Math.sin(ang) * b.radius,
                vx: Math.cos(ang) * 4.5,
                vy: Math.sin(ang) * 4.5,
                life: 0.8,
                decay: 0.04,
                color: '#ffea75',
                size: 2.2
              });
            }
          }
        }

        drawCelestialBody(ctx, b, frameCountRef.current, selectedBodyId === b.id);

        if (showVectors && !isStationary(b)) {
          drawVelocityVector(ctx, b);
        }

        if (isStationary(b)) coresCount++;
        totalMass += b.mass;
        surviving.push(b);
      }
      bodiesRef.current = surviving;

      // 6. Draw Shockwaves & Particles
      drawShockwaves(ctx, shockwavesRef.current);
      drawParticles(ctx, particlesRef.current);

      // 7. Aim Trajectory Ray & Gravitational Slingshot Prediction
      if (aimRef.current.isAiming) {
        const itemToDraw = aimRef.current.targetBody || selectedCatalogItem;
        drawAimTrajectory(
          ctx,
          aimRef.current.start,
          aimRef.current.current,
          itemToDraw,
          launchPower,
          bodiesRef.current,
          gravityG,
          aimRef.current.isSlingshot
        );
      }

      ctx.restore();

      // Telemetry update
      frameCountRef.current++;
      if (frameCountRef.current % 6 === 0) {
        setTelemetry({
          totalBodies: surviving.length,
          coresCount,
          totalSystemMass: Math.round(totalMass),
          fps: fpsRef.current,
          lastEvent: surviving.length === 0 ? 'EMPTY CANVAS' : `${coresCount} Anchor(s) Stationary`
        });
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [
    isRunning, timeStep, gravityG, collisionBehavior, gridStyle, 
    showVectors, showTrails, followId, selectedBodyId, 
    computeGravitation, bgStars, selectedCatalogItem, launchPower,
    spaceStyle, isStationary
  ]);

  // Filter Catalog by Category
  const filteredCatalog = useMemo(() => {
    if (catalogCategory === 'All') return CELESTIAL_CATALOG;
    return CELESTIAL_CATALOG.filter(item => item.category === catalogCategory);
  }, [catalogCategory]);

  const inspectedBody = bodiesRef.current.find(b => b.id === selectedBodyId) || null;

  return (
    <div ref={containerRef} className="relative w-full h-[84vh] min-h-[640px] rounded-3xl overflow-hidden border border-cyan-500/30 bg-black shadow-2xl select-none font-sans text-white">
      
      {/* 1. INTERACTIVE FULL-GROUND CANVAS */}
      <canvas
        ref={canvasRef}
        width={1400}
        height={850}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onWheel={handleWheel}
        className={`w-full h-full block touch-none ${
          activeTool === 'pan' ? 'cursor-grab active:cursor-grabbing' :
          activeTool === 'delete' ? 'cursor-not-allowed' :
          activeTool === 'core' ? 'cursor-pointer' :
          'cursor-crosshair'
        }`}
      />

      {/* 2. TOP FLOATING COMMAND BAR (PRIMARY ACTIONS & TOOLS) */}
      <header className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none z-20">
        
        {/* Left: Brand Badge & Active Tool Selector */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-cyan-500/30 shadow-2xl pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1 border-r border-slate-800">
            <Orbit className="w-5 h-5 text-cyan-400 animate-[spin_10s_linear_infinite]" />
            <span className="font-extrabold text-sm tracking-wider uppercase text-white font-mono">
              Gravity Sandbox
            </span>
          </div>

          {/* Tools: Spawn, Slingshot, Energy, Pan, Core, Delete, Inspect */}
          <div className="flex items-center gap-1 font-mono text-xs">
            {[
              { id: 'spawn', label: 'Spawn', icon: Plus, title: 'Click & Drag to Spawn Any Body with Trajectory' },
              { id: 'slingshot', label: 'Slingshot', icon: Target, title: 'Click & Drag Any Body to Slingshot Across Space' },
              { id: 'energy', label: 'Energy', icon: Flame, title: 'Click Star to Inject Fusion Energy & Trigger Consequences' },
              { id: 'pan', label: 'Pan', icon: Move, title: 'Drag to Move Canvas' },
              { id: 'core', label: 'Anchor Core', icon: Anchor, title: 'Click Any Body to Make Core / Anchor' },
              { id: 'delete', label: 'Obliterate', icon: Trash2, title: 'Click Any Body to Delete' },
              { id: 'inspect', label: 'Inspect', icon: Eye, title: 'Click Body to Inspect Telemetry' }
            ].map(tool => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  title={tool.title}
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer ${
                    isActive 
                      ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(0,240,255,0.25)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{tool.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center/Right: Master Playback & Sandbox Presets */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-slate-800 shadow-2xl pointer-events-auto font-mono text-xs">
          
          {/* Scale Mode Toggle: True Astronomical (Betelgeuse 380px) vs Compact */}
          <button
            onClick={() => {
              const nextMode = scaleMode === 'true_astronomical' ? 'compact_viewport' : 'true_astronomical';
              setScaleMode(nextMode);
              bodiesRef.current.forEach(b => {
                const cat = CELESTIAL_CATALOG.find(c => c.type === b.type || c.id === b.type);
                if (cat) {
                  b.radius = nextMode === 'true_astronomical' ? cat.radius : (cat.compactRadius || cat.radius);
                  b.baseRadius = b.radius;
                }
              });
            }}
            className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition cursor-pointer text-[11px] ${
              scaleMode === 'true_astronomical'
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 font-bold'
                : 'bg-black border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle between True Proportional Scale (Betelgeuse 380px) and Compact Viewport Scale"
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">{scaleMode === 'true_astronomical' ? 'Scale: True (Betelgeuse 380px)' : 'Scale: Compact'}</span>
            <span className="lg:hidden">{scaleMode === 'true_astronomical' ? 'True Scale' : 'Compact'}</span>
          </button>

          {/* Space Area Visual Style Selector */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-900 border border-slate-700/80">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <select
              value={spaceStyle}
              onChange={e => setSpaceStyle(e.target.value)}
              className="bg-transparent text-cyan-300 text-[11px] focus:outline-none cursor-pointer font-mono"
              title="Change Space Area Visual Theme"
            >
              {SPACE_STYLES.map(s => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                  Area: {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Play / Pause */}
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md ${
              isRunning ? 'bg-amber-400 text-black hover:bg-amber-300' : 'bg-cyan-400 text-black hover:bg-cyan-300'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause' : 'Run'}</span>
          </button>

          {/* Time Warp Slider */}
          <div className="hidden sm:flex items-center gap-2 px-2 text-slate-300">
            <FastForward className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px]">{timeStep.toFixed(1)}×</span>
            <input
              type="range"
              min="0.1"
              max="4.0"
              step="0.1"
              value={timeStep}
              onChange={e => setTimeStep(Number(e.target.value))}
              className="w-16 accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Clear & Reset */}
          <button
            onClick={() => { bodiesRef.current = []; particlesRef.current = []; shockwavesRef.current = []; setSelectedBodyId(null); }}
            className="px-2.5 py-1.5 rounded-xl bg-black border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition cursor-pointer text-[11px]"
            title="Wipe canvas clean"
          >
            Clear
          </button>

          {/* Preset Selector Dropdown */}
          <select
            onChange={e => loadScenario(e.target.value)}
            defaultValue="solar"
            className="px-2.5 py-1.5 rounded-xl bg-black border border-slate-800 text-cyan-300 text-[11px] focus:outline-none cursor-pointer"
          >
            {SANDBOX_PRESETS.map(p => (
              <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                {p.label}
              </option>
            ))}
          </select>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-xl border transition cursor-pointer ${
              soundEnabled ? 'bg-cyan-950 border-cyan-500/50 text-cyan-400' : 'bg-black border-slate-800 text-slate-500'
            }`}
            title={soundEnabled ? 'Sound Enabled' : 'Sound Muted'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Frame Snapshot Export */}
          <button
            onClick={handleSnapshot}
            className="p-1.5 rounded-xl border border-slate-800 bg-black hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition cursor-pointer"
            title="Export Telemetry Frame (PNG)"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>

          {/* Reset Zoom & Pan */}
          {(zoom !== 1.0 || pan.x !== 0 || pan.y !== 0) && (
            <button
              onClick={() => { setZoom(1.0); setPan({ x: 0, y: 0 }); setFollowId(null); }}
              className="px-2 py-1 rounded-lg bg-cyan-950/60 border border-cyan-800 text-cyan-300 text-[10px] cursor-pointer"
            >
              Reset Cam ({zoom.toFixed(2)}×)
            </button>
          )}

        </div>

      </header>

      {/* 3. BOTTOM FLOATING CELESTIAL SPAWNER DOCK ("SPAWN ANYTHING & CORE ANYTHING") */}
      <footer className="absolute bottom-4 inset-x-4 flex flex-col items-center gap-2 pointer-events-none z-20">
        
        {/* Quick Spawn Bar */}
        <div className="w-full max-w-4xl p-2.5 rounded-2xl bg-black/90 backdrop-blur-xl border border-cyan-500/30 shadow-2xl pointer-events-auto space-y-2">
          
          {/* Top category tabs & Mode Options */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2 text-xs font-mono">
            <div className="flex items-center gap-1">
              <span className="text-cyan-400 font-bold mr-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                SPAWN CELESTIAL BODY:
              </span>
              {['All', 'Stars', 'Singularities', 'Gas Giants', 'Terrestrial', 'Moons & Debris'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCatalogCategory(cat)}
                  className={`px-2 py-1 rounded-lg transition cursor-pointer text-[10px] ${
                    catalogCategory === cat 
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Core Anchor & Velocity Toggles */}
            <div className="flex items-center gap-2 text-[11px]">
              <label className="flex items-center gap-1.5 cursor-pointer text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-800/50">
                <input
                  type="checkbox"
                  checked={spawnAsCore}
                  onChange={e => setSpawnAsCore(e.target.checked)}
                  className="accent-amber-400"
                />
                <Anchor className="w-3 h-3 text-amber-400" />
                <span>Make as Core Anchor</span>
              </label>

              <select
                value={spawnVelocityMode}
                onChange={e => setSpawnVelocityMode(e.target.value)}
                className="bg-black border border-slate-800 text-slate-300 rounded-lg px-2 py-0.5 text-[10px] focus:outline-none"
              >
                <option value="drag">Velocity: Slingshot Drag</option>
                <option value="rest">Velocity: Zero / Static</option>
                <option value="orbit">Velocity: Auto Orbit Core</option>
              </select>
            </div>
          </div>

          {/* Horizontal Scrollable Celestial Body Palette */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {filteredCatalog.map(item => {
              const isSelected = selectedCatalogItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedCatalogItem(item);
                    setActiveTool('spawn');
                  }}
                  className={`px-3 py-2 rounded-xl border flex items-center gap-2.5 shrink-0 transition cursor-pointer text-left ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-black/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
                  <div className="text-xs">
                    <div className="font-semibold text-white leading-tight">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                      <span className="text-cyan-400 font-bold">{item.earthRadiusRatio ? `${item.earthRadiusRatio} R⊕` : `${item.radius}px`}</span>
                      <span>•</span>
                      <span className="text-amber-400 font-bold">{item.earthMassRatio ? `${item.earthMassRatio >= 1000 ? `${(item.earthMassRatio/1000).toFixed(0)}k` : item.earthMassRatio} M⊕` : `M=${item.mass}`}</span>
                      {item.isLarge && <span className="text-[9px] px-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">Anchor</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Live Bottom Telemetry Banner */}
        <div className="inline-flex items-center gap-4 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-400 pointer-events-auto">
          <span>Active Bodies: <strong className="text-cyan-400">{telemetry.totalBodies}</strong></span>
          <span className="text-slate-700">|</span>
          <span>Anchored Cores: <strong className="text-amber-400">{telemetry.coresCount}</strong></span>
          <span className="text-slate-700">|</span>
          <span>System Mass: <strong className="text-emerald-400">{telemetry.totalSystemMass}</strong></span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-500">{telemetry.lastEvent}</span>
        </div>

      </footer>

      {/* 4. FLOATING RIGHT INSPECTOR & SETTINGS DRAWER */}
      {selectedBodyId && inspectedBody && (
        <aside className="absolute top-20 right-4 w-72 rounded-2xl bg-black/90 backdrop-blur-xl border border-cyan-500/30 p-4 shadow-2xl font-mono text-xs z-30 space-y-3 pointer-events-auto animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: inspectedBody.color }} />
              <strong className="text-white text-sm truncate">{inspectedBody.name}</strong>
            </div>
            <button
              onClick={() => setSelectedBodyId(null)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-slate-300 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">CLASSIFICATION:</span>
              <span className="text-cyan-400 uppercase">{inspectedBody.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">STATUS:</span>
              <span className={inspectedBody.isCore ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                {inspectedBody.isCore ? 'ANCHORED CORE' : 'ORBITING BODY'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">MASS (M⊕):</span>
              <span className="text-amber-400 font-bold">
                {inspectedBody.earthMassRatio ? `${inspectedBody.earthMassRatio >= 1000 ? `${(inspectedBody.earthMassRatio / 1000).toFixed(0)}k` : inspectedBody.earthMassRatio} M⊕` : `${(inspectedBody.mass / 6).toFixed(2)} M⊕`}
                <span className="text-slate-500 text-[10px] ml-1">({inspectedBody.mass})</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">RADIUS (R⊕):</span>
              <span className="text-cyan-400 font-bold">
                {inspectedBody.earthRadiusRatio ? `${inspectedBody.earthRadiusRatio} R⊕` : `${(inspectedBody.radius / 5.0).toFixed(2)} R⊕`}
                <span className="text-slate-500 text-[10px] ml-1">({inspectedBody.radius} px)</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">VELOCITY:</span>
              <span className="text-emerald-400">
                {(Math.hypot(inspectedBody.vx, inspectedBody.vy) * 4.2).toFixed(2)} km/s
              </span>
            </div>
          </div>

          {/* Specialized Controls for Stars: Stellar Energy Injection & Probabilistic Consequence Matrix */}
          {(inspectedBody.type.startsWith('star_') || inspectedBody.type === 'hypergiant') && (
            <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  STELLAR CORE ENERGY:
                </span>
                <span className="text-amber-200">
                  {Math.round((inspectedBody.stellarEnergy || 0.25) * 100)}%
                </span>
              </div>

              {/* Energy Gauge Bar */}
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-700/80">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((inspectedBody.stellarEnergy || 0.25) * 100))}%` }}
                />
              </div>

              {/* Injection Action Buttons */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  onClick={() => handleInjectEnergy(inspectedBody, 0.25)}
                  className="py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-200 text-[10px] font-bold transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  +25% Energy
                </button>
                <button
                  onClick={() => {
                    inspectedBody.stellarEnergy = 1.0;
                    triggerStellarConsequence(inspectedBody);
                  }}
                  className="py-1.5 px-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-200 text-[10px] font-bold transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <Flame className="w-3 h-3 text-rose-400" />
                  Overdrive Infall
                </button>
              </div>

              {/* Consequence Probabilities Breakdown */}
              <div className="pt-1.5 border-t border-amber-900/40 text-[10px] space-y-1 text-slate-300">
                <div className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Astrophysical Probabilities:</div>
                <div className="flex justify-between items-center hover:text-white cursor-pointer" onClick={() => triggerStellarConsequence(inspectedBody, 'flare_storm')}>
                  <span>🌪️ Coronal Flare Superstorm</span>
                  <span className="text-amber-400 font-bold">35%</span>
                </div>
                <div className="flex justify-between items-center hover:text-white cursor-pointer" onClick={() => triggerStellarConsequence(inspectedBody, 'red_giant_swell')}>
                  <span>🔴 Photosphere Red Giant Swell</span>
                  <span className="text-rose-400 font-bold">25%</span>
                </div>
                <div className="flex justify-between items-center hover:text-white cursor-pointer" onClick={() => triggerStellarConsequence(inspectedBody, 'supernova')}>
                  <span>💥 Core-Collapse Supernova</span>
                  <span className="text-cyan-400 font-bold">20%</span>
                </div>
                <div className="flex justify-between items-center hover:text-white cursor-pointer" onClick={() => triggerStellarConsequence(inspectedBody, 'wolf_rayet')}>
                  <span>🌀 Wolf-Rayet Envelope Strip</span>
                  <span className="text-emerald-400 font-bold">12%</span>
                </div>
                <div className="flex justify-between items-center hover:text-white cursor-pointer" onClick={() => triggerStellarConsequence(inspectedBody, 'cepheid_pulsation')}>
                  <span>💓 Cepheid Radial Pulsation</span>
                  <span className="text-purple-400 font-bold">8%</span>
                </div>
              </div>
            </div>
          )}

          {/* Specialized Controls for Black Holes */}
          {inspectedBody.type === 'blackhole' && (
            <div className="p-2.5 rounded-xl bg-orange-950/25 border border-orange-500/40 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-orange-300">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  KERR SINGULARITY TELEMETRY:
                </span>
                <span className={inspectedBody.feedingTimer > 0 ? 'text-cyan-300 animate-pulse' : 'text-slate-400'}>
                  {inspectedBody.feedingTimer > 0 ? 'FEEDING JETS ACTIVE' : 'QUIESCENT HORIZON'}
                </span>
              </div>
              <div className="text-[10px] text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">SCHWARZSCHILD RADIUS (rs):</span>
                  <span className="text-orange-400 font-bold">{inspectedBody.radius.toFixed(1)} px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">FEEDING TIME REMAINING:</span>
                  <span className="text-cyan-400 font-bold">{inspectedBody.feedingTimer || 0} frames</span>
                </div>
              </div>

              {/* Feed Black Hole Button */}
              <button
                onClick={() => {
                  inspectedBody.mass += 6000;
                  const baseR = inspectedBody.baseRadius || 22;
                  inspectedBody.radius = Math.min(140, Math.max(baseR, baseR * Math.cbrt(inspectedBody.mass / 48000)));
                  inspectedBody.accretionFlare = 1.0;
                  inspectedBody.feedingTimer = 280;
                  triggerBlackHoleSwallow(inspectedBody, { name: 'Relativistic Infall Stream', color: '#ff8800' });
                  playAudio('gw_chirp');
                }}
                className="w-full py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 text-orange-200 text-[10px] font-bold transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3 h-3 text-orange-400" />
                Feed Infalling Plasma Stream
              </button>
            </div>
          )}

          {/* Quick Body Commands */}
          <div className="pt-2 border-t border-slate-800 space-y-1.5">
            {/* Quick Slingshot Button */}
            <button
              onClick={() => {
                setActiveTool('slingshot');
              }}
              className="w-full py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/50 hover:bg-cyan-900 text-cyan-300 font-bold transition cursor-pointer text-xs flex items-center justify-center gap-1.5"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Arm Slingshot Aim on Body</span>
            </button>

            {/* Direct Slingshot Impulse Fling (+8.5 km/s) */}
            <button
              onClick={() => {
                inspectedBody.isCore = false;
                const angle = Math.random() * Math.PI * 2;
                const boost = 8.5;
                inspectedBody.vx += Math.cos(angle) * boost;
                inspectedBody.vy += Math.sin(angle) * boost;
                playAudio('slingshot');
                shockwavesRef.current.push({
                  x: inspectedBody.x, y: inspectedBody.y,
                  r: inspectedBody.radius, maxR: inspectedBody.radius * 4.2,
                  alpha: 1.0, color: '#38bdf8'
                });
                for (let i = 0; i < 20; i++) {
                  const pAng = Math.random() * Math.PI * 2;
                  particlesRef.current.push({
                    x: inspectedBody.x, y: inspectedBody.y,
                    vx: Math.cos(pAng) * 4 + inspectedBody.vx * 0.2,
                    vy: Math.sin(pAng) * 4 + inspectedBody.vy * 0.2,
                    life: 0.9, decay: 0.035,
                    color: '#38bdf8', size: 2.2
                  });
                }
                setTelemetry(prev => ({
                  ...prev,
                  lastEvent: `SLINGSHOT FLING BOOST ON ${inspectedBody.name.toUpperCase()} (+8.5 km/s)`
                }));
              }}
              className="w-full py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/50 hover:bg-purple-900 text-purple-200 font-bold transition cursor-pointer text-xs flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>Instant Slingshot Fling (+8.5 km/s)</span>
            </button>

            {/* Toggle Core Anchor Button */}
            <button
              onClick={() => {
                inspectedBody.isCore = !inspectedBody.isCore;
                if (inspectedBody.isCore) {
                  inspectedBody.vx = 0;
                  inspectedBody.vy = 0;
                  shockwavesRef.current.push({
                    x: inspectedBody.x, y: inspectedBody.y,
                    r: inspectedBody.radius * 0.8, maxR: inspectedBody.radius * 3.0,
                    alpha: 1.0, color: '#facc15'
                  });
                } else {
                  shockwavesRef.current.push({
                    x: inspectedBody.x, y: inspectedBody.y,
                    r: inspectedBody.radius * 0.8, maxR: inspectedBody.radius * 3.0,
                    alpha: 1.0, color: '#38bdf8'
                  });
                }
                playAudio('spawn');
                setTelemetry(prev => ({
                  ...prev,
                  lastEvent: inspectedBody.isCore 
                    ? `ANCHORED ${inspectedBody.name.toUpperCase()} (FIXED IN POSITION)`
                    : `RELEASED ${inspectedBody.name.toUpperCase()} (FREE TO MOVE / SLINGSHOT)`
                }));
              }}
              className={`w-full py-2 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition cursor-pointer text-xs ${
                inspectedBody.isCore 
                  ? 'bg-amber-950/60 border-amber-600 text-amber-300' 
                  : 'bg-black border-slate-800 hover:border-amber-400 text-slate-300'
              }`}
            >
              <Anchor className="w-3.5 h-3.5" />
              <span>{inspectedBody.isCore ? 'Release Fixed Anchor (Enable Motion)' : 'Fix Position (Anchor As Core)'}</span>
            </button>

            {/* Follow Camera Button */}
            <button
              onClick={() => setFollowId(followId === inspectedBody.id ? null : inspectedBody.id)}
              className={`w-full py-2 rounded-xl border flex items-center justify-center gap-1.5 transition cursor-pointer text-xs ${
                followId === inspectedBody.id 
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold' 
                  : 'bg-black border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{followId === inspectedBody.id ? 'Unlock Camera' : 'Lock Camera on Target'}</span>
            </button>

            {/* Delete Body */}
            <button
              onClick={() => {
                triggerExplosion(inspectedBody.x, inspectedBody.y, inspectedBody.radius * 2, inspectedBody.color);
                bodiesRef.current = bodiesRef.current.filter(b => b.id !== inspectedBody.id);
                setSelectedBodyId(null);
              }}
              className="w-full py-1.5 rounded-xl bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900 text-rose-300 transition cursor-pointer text-xs flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Obliterate Body</span>
            </button>
          </div>
        </aside>
      )}

      {/* 5. ENVIRONMENT & PHYSICS DRAWER (COLLAPSIBLE BUTTON ON LEFT) */}
      <div className="absolute top-20 left-4 z-20 pointer-events-auto">
        {activeDrawer !== 'environment' ? (
          <button
            onClick={() => setActiveDrawer('environment')}
            className="p-2.5 rounded-2xl bg-black/85 backdrop-blur-xl border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 shadow-2xl transition cursor-pointer flex items-center gap-2 font-mono text-xs"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Physics &amp; Environment</span>
          </button>
        ) : (
          <aside className="w-72 rounded-2xl bg-black/90 backdrop-blur-xl border border-cyan-500/30 p-4 shadow-2xl font-mono text-xs space-y-3.5 animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Physics Environment</span>
              </h4>
              <button
                onClick={() => setActiveDrawer('none')}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Space Area Visual Theme */}
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">SPACE AREA THEME</label>
              <div className="grid grid-cols-2 gap-1">
                {SPACE_STYLES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSpaceStyle(s.id)}
                    className={`py-1 px-1.5 rounded-lg border text-left transition cursor-pointer text-[10px] truncate ${
                      spaceStyle === s.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-black border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Gravity G Slider */}
            <div>
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>GRAVITY CONSTANT (G)</span>
                <span className="text-cyan-400 font-bold">{gravityG.toFixed(2)}×</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={gravityG}
                onChange={e => setGravityG(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Collision Dynamics */}
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">COLLISION BEHAVIOR</label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'merge', label: 'Merge' },
                  { id: 'shatter', label: 'Shatter' },
                  { id: 'bounce', label: 'Bounce' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setCollisionBehavior(mode.id)}
                    className={`py-1 rounded-lg border text-center transition cursor-pointer text-[10px] ${
                      collisionBehavior === mode.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-black border-slate-800 text-slate-400'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Spacetime Grid */}
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">SPACETIME CURVATURE GRID</label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'curvature', label: '3D Well' },
                  { id: 'rings', label: 'Rings' },
                  { id: 'off', label: 'Void' }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setGridStyle(s.id)}
                    className={`py-1 rounded-lg border text-center transition cursor-pointer text-[10px] ${
                      gridStyle === s.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-black border-slate-800 text-slate-400'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTrails}
                  onChange={e => setShowTrails(e.target.checked)}
                  className="accent-cyan-400"
                />
                <span>Orbital Motion Trails</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showVectors}
                  onChange={e => setShowVectors(e.target.checked)}
                  className="accent-cyan-400"
                />
                <span>Velocity Vectors</span>
              </label>
            </div>
          </aside>
        )}
      </div>

    </div>
  );
}

// =========================================================================
// HIGH-FIDELITY PROCEDURAL VISUAL MODELS & SHADERS
// =========================================================================

function drawCelestialBody(ctx, b, frameCount, isSelected) {
  ctx.save();
  ctx.translate(b.x, b.y);

  // If body is anchored as a Core, render an ethereal gravitational focal halo and anchor badge
  if (b.isCore) {
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.7)';
    ctx.lineWidth = 2.0;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(0, 0, b.radius + 14 + Math.sin(frameCount * 0.06) * 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Anchor badge
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 9px monospace';
    ctx.fillText('⚓ ANCHORED', -25, -b.radius - 8);
  }

  // Selection outline
  if (isSelected) {
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(0, 0, b.radius + 6, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Visual model rendering by archetype
  switch (b.type) {
    case 'blackhole': {
      const flare = b.accretionFlare || 0;
      if (b.accretionFlare > 0) {
        b.accretionFlare *= 0.985; // smooth relaxation
      }

      // 1. Spacetime Gravitational Lensing Halo (Einstein distortion ring)
      const lensR = b.radius * (4.2 + flare * 1.5);
      const lensGrad = ctx.createRadialGradient(0, 0, b.radius * 0.9, 0, 0, lensR);
      lensGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      lensGrad.addColorStop(0.25, 'rgba(255, 140, 20, 0.28)');
      lensGrad.addColorStop(0.65, 'rgba(56, 189, 248, 0.12)');
      lensGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = lensGrad;
      ctx.beginPath();
      ctx.arc(0, 0, lensR, 0, Math.PI * 2);
      ctx.fill();

      // 2. Gravitationally Lensed Upper Halo Arch (light bent from behind the singularity over the top)
      ctx.save();
      ctx.rotate(frameCount * 0.02);
      ctx.beginPath();
      ctx.ellipse(0, -b.radius * 0.85, b.radius * 3.6, b.radius * 2.0, 0, Math.PI * 0.95, Math.PI * 2.05);
      ctx.strokeStyle = flare > 0.1 ? `rgba(255, 255, 230, ${0.75 + flare * 0.25})` : 'rgba(255, 160, 40, 0.6)';
      ctx.lineWidth = b.radius * (0.45 + flare * 0.35);
      ctx.stroke();

      // Lensed Lower Halo Arch
      ctx.beginPath();
      ctx.ellipse(0, b.radius * 0.85, b.radius * 3.6, b.radius * 2.0, 0, 0, Math.PI * 1.05);
      ctx.strokeStyle = flare > 0.1 ? `rgba(255, 255, 230, ${0.75 + flare * 0.25})` : 'rgba(255, 120, 20, 0.45)';
      ctx.lineWidth = b.radius * (0.35 + flare * 0.25);
      ctx.stroke();
      ctx.restore();

      // 3. Main Relativistic Accretion Disk (Equatorial plane)
      ctx.save();
      ctx.rotate(frameCount * 0.04);
      // Full disk ellipse
      ctx.beginPath();
      ctx.ellipse(0, 0, b.radius * 4.0, b.radius * 1.05, 0, 0, Math.PI * 2);
      ctx.strokeStyle = flare > 0.1 ? `rgba(255, 240, 200, ${0.85 + flare * 0.15})` : 'rgba(255, 110, 20, 0.85)';
      ctx.lineWidth = b.radius * (0.65 + flare * 0.45);
      ctx.stroke();

      // Relativistic Doppler Beaming (approaching side is blazing bright white-blue; receding side is dimmer red)
      ctx.beginPath();
      ctx.ellipse(0, 0, b.radius * 4.0, b.radius * 1.05, 0, Math.PI * 0.55, Math.PI * 1.6);
      ctx.strokeStyle = flare > 0.1 ? '#ffffff' : 'rgba(255, 250, 210, 0.98)';
      ctx.lineWidth = b.radius * (0.8 + flare * 0.55);
      ctx.stroke();
      ctx.restore();

      // 4. Polar Relativistic Particle Jets (Active when feeding / flared)
      const isFeeding = (b.feedingTimer && b.feedingTimer > 0) || flare > 0.03;
      if (isFeeding) {
        const jetIntensity = Math.min(1.0, (flare || 0.6) + (b.feedingTimer ? 0.4 : 0));
        const jetLen = b.radius * (5.5 + jetIntensity * 7.0);
        const jetW = b.radius * 0.38;
        // North jet
        const jGradN = ctx.createLinearGradient(0, 0, 0, -jetLen);
        jGradN.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
        jGradN.addColorStop(0.25, 'rgba(192, 132, 252, 0.9)');
        jGradN.addColorStop(0.7, 'rgba(56, 189, 248, 0.5)');
        jGradN.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = jGradN;
        ctx.beginPath();
        ctx.moveTo(-jetW, 0);
        ctx.lineTo(0, -jetLen);
        ctx.lineTo(jetW, 0);
        ctx.closePath();
        ctx.fill();

        // Pulsating shock nodes inside North jet
        const pulse = (Math.sin(frameCount * 0.2) + 1) * 0.5;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(0, -jetLen * 0.45, jetW * 0.55, jetLen * 0.12 * (0.8 + 0.4 * pulse), 0, 0, Math.PI * 2);
        ctx.fill();

        // South jet
        const jGradS = ctx.createLinearGradient(0, 0, 0, jetLen);
        jGradS.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
        jGradS.addColorStop(0.25, 'rgba(192, 132, 252, 0.9)');
        jGradS.addColorStop(0.7, 'rgba(56, 189, 248, 0.5)');
        jGradS.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = jGradS;
        ctx.beginPath();
        ctx.moveTo(-jetW, 0);
        ctx.lineTo(0, jetLen);
        ctx.lineTo(jetW, 0);
        ctx.closePath();
        ctx.fill();

        // Pulsating shock nodes inside South jet
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(0, jetLen * 0.45, jetW * 0.55, jetLen * 0.12 * (0.8 + 0.4 * pulse), 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. The Event Horizon (Pure pitch black void)
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      ctx.fill();

      // 6. Photon Sphere Ring (1.5 * r_s)
      ctx.strokeStyle = flare > 0.1 ? '#ffffff' : 'rgba(255, 235, 180, 0.95)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, b.radius * 1.05, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }

    case 'pulsar': {
      // Sweeping Relativistic Synchrotron Radiation Cones
      ctx.rotate(frameCount * 0.25);
      const grad = ctx.createLinearGradient(-b.radius * 7.0, 0, b.radius * 7.0, 0);
      grad.addColorStop(0, 'rgba(192, 132, 252, 0)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(1, 'rgba(192, 132, 252, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(-b.radius * 7.0, -2, b.radius * 14.0, 4);
      ctx.rotate(-frameCount * 0.25);

      // Ultra-dense pinpoint core (4.5px)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2.0;
      ctx.stroke();
      break;
    }

    case 'white_dwarf': {
      // Blinding quantum degenerate point with diffraction spike
      const wdGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, b.radius * 2.2);
      wdGrad.addColorStop(0, '#ffffff');
      wdGrad.addColorStop(0.4, '#e0f2fe');
      wdGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = wdGrad;
      ctx.beginPath();
      ctx.arc(0, 0, b.radius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'star_yellow':
    case 'star_blue':
    case 'star_red':
    case 'hypergiant': {
      const isStretched = b.isTidallyDisrupted && b.tidalStretch > 1.05;
      const stretch = isStretched ? b.tidalStretch : 1.0;
      const compress = 1.0 / Math.sqrt(stretch);

      ctx.save();
      if (isStretched && b.tidalAngle !== undefined) {
        ctx.rotate(b.tidalAngle);
      }

      // Photosphere with dynamic coronal flares (when not tidally stripped)
      if (!isStretched) {
        const isFlareStorm = b.flareStormTimer && b.flareStormTimer > 0;
        const flareCount = isFlareStorm ? 20 : (b.type === 'hypergiant' ? 14 : 8);
        for (let i = 0; i < flareCount; i++) {
          const angle = (i * Math.PI * 2 / flareCount) + (frameCount * (isFlareStorm ? 0.04 : 0.012));
          const extraLen = isFlareStorm ? 28 : (b.type === 'hypergiant' ? 16 : 8);
          const len = b.radius + extraLen + Math.sin(frameCount * 0.1 + i) * (isFlareStorm ? 12 : 6);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * len, Math.sin(angle) * len);
          ctx.strokeStyle = isFlareStorm ? (i % 2 === 0 ? '#ffea75' : '#f97316') : b.color;
          ctx.lineWidth = isFlareStorm ? 4.5 : (b.type === 'hypergiant' ? 4.5 : 2.5);
          ctx.stroke();
        }

        // If star has elevated stellar energy, draw active thermonuclear core aura
        if (b.stellarEnergy && b.stellarEnergy > 0.4) {
          ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
          ctx.lineWidth = 2.0;
          ctx.setLineDash([3, 5]);
          ctx.beginPath();
          ctx.arc(0, 0, b.radius + 6 + Math.sin(frameCount * 0.1) * 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // If Cepheid pulsating, draw expanding pulsation waves
        if (b.isPulsating) {
          const waveR = b.radius * (1.1 + ((frameCount * 0.03) % 1) * 0.6);
          const waveAlpha = Math.max(0, 0.6 - ((frameCount * 0.03) % 1) * 0.6);
          ctx.strokeStyle = `rgba(251, 191, 36, ${waveAlpha})`;
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(0, 0, waveR, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw star body: if tidally disrupted, render as elongated tear-drop prolate ellipsoid!
      ctx.beginPath();
      if (isStretched) {
        ctx.ellipse(0, 0, b.radius * stretch, b.radius * compress, 0, 0, Math.PI * 2);
      } else {
        ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      }

      const pGrad = ctx.createRadialGradient(
        isStretched ? -b.radius * 0.3 * stretch : 0,
        0,
        0,
        0,
        0,
        b.radius * stretch
      );
      pGrad.addColorStop(0, '#ffffff');
      pGrad.addColorStop(0.35, b.color);
      pGrad.addColorStop(0.85, b.type === 'hypergiant' ? '#7c2d12' : '#000000');
      pGrad.addColorStop(1, '#000000');
      ctx.fillStyle = pGrad;
      ctx.fill();

      // If tidally disrupted, draw incandescent stripped plasma peeling off the apex toward the singularity
      if (isStretched) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(b.radius * stretch * 0.75, 0);
        ctx.lineTo(b.radius * stretch * 1.5, 0);
        ctx.strokeStyle = '#ffeeaa';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      ctx.restore();
      break;
    }

    case 'jovian_giant': {
      // Atmospheric belts and Great Red Spot cyclonic storm
      const pGrad = ctx.createRadialGradient(-b.radius * 0.3, -b.radius * 0.3, b.radius * 0.1, 0, 0, b.radius);
      pGrad.addColorStop(0, '#fde68a');
      pGrad.addColorStop(0.4, b.color);
      pGrad.addColorStop(0.8, '#92400e');
      pGrad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      ctx.fill();

      // Great Red Spot
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.ellipse(b.radius * 0.35, b.radius * 0.3, b.radius * 0.28, b.radius * 0.18, -0.2, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'ringed_giant': {
      // 3D Angled Ringed Gas Giant (Back half of ring)
      ctx.beginPath();
      ctx.ellipse(0, 0, b.radius * 2.4, b.radius * 0.75, 0.35, Math.PI, 0);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
      ctx.lineWidth = b.radius * 0.35;
      ctx.stroke();

      // Giant Sphere with atmospheric bands
      const pGrad = ctx.createRadialGradient(-b.radius * 0.35, -b.radius * 0.35, b.radius * 0.1, 0, 0, b.radius);
      pGrad.addColorStop(0, '#fef08a');
      pGrad.addColorStop(0.5, b.color);
      pGrad.addColorStop(1, '#78350f');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      ctx.fill();

      // Front half of ring
      ctx.beginPath();
      ctx.ellipse(0, 0, b.radius * 2.4, b.radius * 0.75, 0.35, 0, Math.PI);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.75)';
      ctx.lineWidth = b.radius * 0.35;
      ctx.stroke();
      break;
    }

    case 'asteroid': {
      // Realistic irregular tumbling space rock polygon
      ctx.save();
      ctx.rotate((b.x * 0.05 + b.y * 0.05) + frameCount * 0.03);
      ctx.beginPath();
      const pts = 7;
      for (let i = 0; i < pts; i++) {
        const ang = (i * Math.PI * 2) / pts;
        const rVar = b.radius * (0.8 + 0.35 * Math.sin(i * 2.3 + 1));
        const px = Math.cos(ang) * rVar;
        const py = Math.sin(ang) * rVar;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = b.color || '#94a3b8';
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
      break;
    }

    case 'terra': {
      // Habitable World: Deep Blue Ocean, Continents & Atmospheric Rim
      const pGrad = ctx.createRadialGradient(-b.radius * 0.35, -b.radius * 0.35, b.radius * 0.1, 0, 0, b.radius);
      pGrad.addColorStop(0, '#60a5fa');
      pGrad.addColorStop(0.35, '#0284c7');
      pGrad.addColorStop(0.7, '#0f766e');
      pGrad.addColorStop(1, '#020617');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric Rayleigh Rim
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      break;
    }

    case 'lava_world': {
      // Molten magma crust
      const pGrad = ctx.createRadialGradient(-b.radius * 0.3, -b.radius * 0.3, b.radius * 0.1, 0, 0, b.radius);
      pGrad.addColorStop(0, '#fef08a');
      pGrad.addColorStop(0.3, '#f97316');
      pGrad.addColorStop(0.7, '#7f1d1d');
      pGrad.addColorStop(1, '#180202');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'comet': {
      // Ice Comet with dynamic Ion Tail
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      ctx.fill();

      // Tail trailing velocity
      const spd = Math.hypot(b.vx, b.vy);
      if (spd > 0.1) {
        const tx = -b.vx * 15;
        const ty = -b.vy * 15;
        const grad = ctx.createLinearGradient(0, 0, tx, ty);
        grad.addColorStop(0, 'rgba(103, 232, 249, 0.95)');
        grad.addColorStop(1, 'rgba(103, 232, 249, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = b.radius * 2.2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
      break;
    }

    default: {
      // Generic spherical celestial body
      const pGrad = ctx.createRadialGradient(-b.radius * 0.35, -b.radius * 0.35, b.radius * 0.1, 0, 0, b.radius);
      pGrad.addColorStop(0, '#ffffff');
      pGrad.addColorStop(0.4, b.color);
      pGrad.addColorStop(1, '#090d16');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  // Name Tag
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '9px monospace';
  ctx.fillText(b.name, b.radius + 6, 3);

  ctx.restore();
}

function drawTrail(ctx, b) {
  if (b.trail.length < 2) return;
  for (let i = 1; i < b.trail.length; i++) {
    const p1 = b.trail[i - 1];
    const p2 = b.trail[i];
    const progress = i / b.trail.length;
    ctx.strokeStyle = b.color;
    ctx.globalAlpha = progress * 0.55;
    ctx.lineWidth = 1.0 + progress * 0.6;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1.0;
}

function drawVelocityVector(ctx, b) {
  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(b.x, b.y);
  ctx.lineTo(b.x + b.vx * 16, b.y + b.vy * 16);
  ctx.stroke();
}

function drawSpacetimeGrid(ctx, width, height, cx, cy, bodies, style) {
  const cores = bodies.filter(b => b.isCore || b.mass > 1000);
  if (cores.length === 0) return;

  ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
  ctx.lineWidth = 0.8;

  cores.forEach(c => {
    const maxR = Math.min(800, c.radius * 16);
    for (let r = c.radius + 15; r < maxR; r *= 1.35) {
      const alpha = Math.max(0.02, 0.18 - (r / maxR) * 0.16);
      ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
}

function drawParticles(ctx, particles) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
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

function drawShockwaves(ctx, shockwaves) {
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const s = shockwaves[i];
    s.r += 3.5;
    s.alpha -= 0.02;
    if (s.alpha <= 0 || s.r >= s.maxR) {
      shockwaves.splice(i, 1);
      continue;
    }
    ctx.strokeStyle = s.color || '#ff3366';
    ctx.globalAlpha = s.alpha;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1.0;
  }
}

function drawSpaceEnvironment(ctx, width, height, style, frameCount, pan, zoom, bgStars) {
  const cx = width / 2;
  const cy = height / 2;

  switch (style) {
    case 'nebula': {
      // Base deep space
      ctx.fillStyle = '#020308';
      ctx.fillRect(0, 0, width, height);

      // Parallax offset for clouds
      const px = pan.x * 0.05;
      const py = pan.y * 0.05;

      // 1. Hot Hydrogen-Alpha emission gas cloud (magenta / crimson)
      const gradH = ctx.createRadialGradient(cx + px + 120, cy + py - 60, 60, cx + px + 120, cy + py - 60, 520);
      gradH.addColorStop(0, 'rgba(225, 29, 72, 0.18)');
      gradH.addColorStop(0.4, 'rgba(162, 28, 175, 0.12)');
      gradH.addColorStop(0.8, 'rgba(88, 28, 135, 0.06)');
      gradH.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradH;
      ctx.fillRect(0, 0, width, height);

      // 2. Ionized Oxygen-III gas cloud (cyan / turquoise)
      const gradO = ctx.createRadialGradient(cx + px - 200, cy + py + 140, 40, cx + px - 200, cy + py + 140, 460);
      gradO.addColorStop(0, 'rgba(6, 182, 212, 0.16)');
      gradO.addColorStop(0.5, 'rgba(14, 165, 233, 0.10)');
      gradO.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradO;
      ctx.fillRect(0, 0, width, height);

      // 3. Violet molecular dust band
      const gradV = ctx.createRadialGradient(cx + px, cy + py, 100, cx + px, cy + py, 680);
      gradV.addColorStop(0, 'rgba(126, 34, 206, 0.12)');
      gradV.addColorStop(0.7, 'rgba(15, 23, 42, 0.04)');
      gradV.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradV;
      ctx.fillRect(0, 0, width, height);
      break;
    }

    case 'galactic_core': {
      ctx.fillStyle = '#030205';
      ctx.fillRect(0, 0, width, height);

      const px = pan.x * 0.04;
      const py = pan.y * 0.04;

      // Vast golden central bulge
      const gradBulge = ctx.createRadialGradient(cx + px, cy + py, 20, cx + px, cy + py, 650);
      gradBulge.addColorStop(0, 'rgba(254, 240, 138, 0.32)');
      gradBulge.addColorStop(0.2, 'rgba(245, 158, 11, 0.22)');
      gradBulge.addColorStop(0.5, 'rgba(180, 83, 9, 0.14)');
      gradBulge.addColorStop(0.8, 'rgba(69, 26, 3, 0.08)');
      gradBulge.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradBulge;
      ctx.fillRect(0, 0, width, height);

      // Galactic plane tilt & dark dust lane
      ctx.save();
      ctx.translate(cx + px, cy + py);
      ctx.rotate(-0.4);
      const dustGrad = ctx.createLinearGradient(0, -35, 0, 35);
      dustGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      dustGrad.addColorStop(0.5, 'rgba(15, 5, 2, 0.65)');
      dustGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = dustGrad;
      ctx.fillRect(-700, -35, 1400, 70);
      ctx.restore();
      break;
    }

    case 'supernova': {
      ctx.fillStyle = '#020406';
      ctx.fillRect(0, 0, width, height);

      const px = pan.x * 0.05;
      const py = pan.y * 0.05;

      // Cassiopeia Remnant: Expanding Ionized Synchrotron Shells
      const gradShock = ctx.createRadialGradient(cx + px, cy + py, 80, cx + px, cy + py, 480);
      gradShock.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
      gradShock.addColorStop(0.4, 'rgba(168, 85, 247, 0.18)');
      gradShock.addColorStop(0.7, 'rgba(56, 189, 248, 0.12)');
      gradShock.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradShock;
      ctx.fillRect(0, 0, width, height);

      // Ionized shock ring arcs
      ctx.save();
      ctx.translate(cx + px, cy + py);
      ctx.rotate(frameCount * 0.003);
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.22)';
      ctx.lineWidth = 14;
      ctx.setLineDash([25, 35]);
      ctx.beginPath();
      ctx.arc(0, 0, 260, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(192, 132, 252, 0.25)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(0, 0, 380, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
      break;
    }

    case 'cosmic_web': {
      ctx.fillStyle = '#010206';
      ctx.fillRect(0, 0, width, height);

      const px = pan.x * 0.03;
      const py = pan.y * 0.03;

      // Dark Matter large-scale filaments connecting virtual galaxy clusters
      ctx.save();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.12)';
      ctx.lineWidth = 1.6;
      const webNodes = [
        { x: cx + px - 350, y: cy + py - 200 },
        { x: cx + px - 100, y: cy + py - 120 },
        { x: cx + px + 250, y: cy + py - 180 },
        { x: cx + px - 280, y: cy + py + 160 },
        { x: cx + px + 80,  y: cy + py + 100 },
        { x: cx + px + 380, y: cy + py + 220 },
        { x: cx + px,       y: cy + py }
      ];

      for (let i = 0; i < webNodes.length; i++) {
        for (let j = i + 1; j < webNodes.length; j++) {
          const d = Math.hypot(webNodes[i].x - webNodes[j].x, webNodes[i].y - webNodes[j].y);
          if (d < 450) {
            ctx.beginPath();
            ctx.moveTo(webNodes[i].x, webNodes[i].y);
            ctx.lineTo(webNodes[j].x, webNodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Glowing galaxy cluster vertices
      webNodes.forEach(node => {
        const nodeGrad = ctx.createRadialGradient(node.x, node.y, 2, node.x, node.y, 45);
        nodeGrad.addColorStop(0, 'rgba(165, 180, 252, 0.45)');
        nodeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 45, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
      break;
    }

    case 'blueprint': {
      // Observatory Radar HUD / Holographic Grid
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      const px = pan.x * 0.05;
      const py = pan.y * 0.05;

      ctx.save();
      ctx.translate(cx + px, cy + py);

      // Radar range rings (radii: 120, 240, 360, 480, 640)
      [120, 240, 360, 480, 640].forEach((r, idx) => {
        ctx.strokeStyle = idx % 2 === 0 ? 'rgba(0, 240, 255, 0.14)' : 'rgba(0, 240, 255, 0.07)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
        ctx.font = '8px monospace';
        ctx.fillText(`RANGE: ${(r * 12).toLocaleString()} AU`, r + 6, -4);
      });
      ctx.setLineDash([]);

      // Cardinal axes
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-800, 0); ctx.lineTo(800, 0);
      ctx.moveTo(0, -800); ctx.lineTo(0, 800);
      ctx.stroke();

      // Heading indicators (N, E, S, W)
      ctx.fillStyle = 'rgba(0, 240, 255, 0.65)';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('000° [N]', -18, -490);
      ctx.fillText('090° [E]', 490, 4);
      ctx.fillText('180° [S]', -18, 505);
      ctx.fillText('270° [W]', -540, 4);

      // Tactical corner reticles
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.strokeRect(-cx + 25, -cy + 25, 30, 30);
      ctx.strokeRect(cx - 55, -cy + 25, 30, 30);
      ctx.strokeRect(-cx + 25, cy - 55, 30, 30);
      ctx.strokeRect(cx - 55, cy - 55, 30, 30);

      ctx.restore();
      break;
    }

    default: // 'void'
      ctx.fillStyle = '#01030a';
      ctx.fillRect(0, 0, width, height);

      // Gentle vacuum vignette
      const vGrad = ctx.createRadialGradient(cx, cy, 100, cx, cy, Math.max(width, height) * 0.7);
      vGrad.addColorStop(0, 'rgba(15, 23, 42, 0.35)');
      vGrad.addColorStop(1, 'rgba(1, 3, 10, 0.95)');
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, width, height);
      break;
  }

  // Background Parallax Twinkling Stars
  if (style !== 'blueprint') {
    ctx.fillStyle = '#ffffff';
    bgStars.forEach(s => {
      const px = cx + (s.x + pan.x * 0.04);
      const py = cy + (s.y + pan.y * 0.04);
      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        ctx.globalAlpha = s.alpha * (0.8 + 0.2 * Math.sin(frameCount * 0.05 + s.x));
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.globalAlpha = 1.0;
  }
}

function drawAimTrajectory(ctx, start, current, item, power, bodies, G, isSlingshot) {
  // 1. Slingshot Elastic Pull Band
  ctx.strokeStyle = isSlingshot ? '#38bdf8' : (item.color || '#facc15');
  ctx.lineWidth = isSlingshot ? 2.5 : 2.0;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(current.x, current.y);
  ctx.stroke();

  // Anchor dot at start
  ctx.fillStyle = item.color || '#38bdf8';
  ctx.beginPath();
  ctx.arc(start.x, start.y, Math.max(3, item.radius || 4), 0, Math.PI * 2);
  ctx.fill();

  // Drag handle bead
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(current.x, current.y, 5, 0, Math.PI * 2);
  ctx.stroke();

  // 2. Initial velocity impulse
  const vx0 = (start.x - current.x) * 0.048 * power;
  const vy0 = (start.y - current.y) * 0.048 * power;
  const spd = Math.hypot(vx0, vy0);

  // 3. Multi-step numerical trajectory curve under gravitational fields
  const trajSteps = 100;
  const dtTraj = 1.4;
  let simX = start.x;
  let simY = start.y;
  let simVx = (item.vx || 0) + vx0;
  let simVy = (item.vy || 0) + vy0;

  const stationaryBodies = (bodies || []).filter(b => b.isCore || b.isLarge || b.mass >= 1200);

  ctx.beginPath();
  ctx.moveTo(simX, simY);

  for (let s = 0; s < trajSteps; s++) {
    let ax = 0;
    let ay = 0;
    for (let b of stationaryBodies) {
      if (b.id === item.id) continue;
      const dx = b.x - simX;
      const dy = b.y - simY;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);
      if (dist > 8) {
        let rel = b.type === 'blackhole' ? 1.0 + Math.min(2.8, 22.0 / dist) : 1.0;
        const f = (G * b.mass * rel) / (distSq + 25);
        ax += (dx / dist) * f;
        ay += (dy / dist) * f;
      }
    }

    simVx += ax * dtTraj;
    simVy += ay * dtTraj;
    simX += simVx * dtTraj;
    simY += simVy * dtTraj;

    ctx.lineTo(simX, simY);
  }

  ctx.strokeStyle = isSlingshot ? '#38bdf8' : 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 1.8;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Terminal bead
  ctx.fillStyle = '#00f0ff';
  ctx.beginPath();
  ctx.arc(simX, simY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Telemetry readout
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px monospace';
  const label = isSlingshot ? '⚡ SLINGSHOT IMPULSE' : '🚀 TRAJECTORY';
  ctx.fillText(`${label}: ${(spd * 4.2).toFixed(1)} km/s`, start.x + 14, start.y - 12);
}

// Fallback compatibility
function drawAimVector(ctx, start, current, item, power) {
  drawAimTrajectory(ctx, start, current, item, power, [], 1.0, false);
}

