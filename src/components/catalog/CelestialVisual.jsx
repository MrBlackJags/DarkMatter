import React, { useRef, useEffect, useState } from 'react';

/**
 * CelestialVisual
 * Renders either a real scientific image or a fluid, dynamic, interactive
 * procedural celestial model (Black Hole, Star/Pulsar, Planet, or Galaxy)
 * with antigravity zero-G floating animation.
 */
export default function CelestialVisual({ object, isHovered = false, size = 'card' }) {
  const canvasRef = useRef(null);
  const [viewMode, setViewMode] = useState(object?.image ? 'both' : 'model');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setViewMode(object?.image ? 'both' : 'model');
    setImgError(false);
  }, [object?.image, object?.id, object?.name]);

  const isDetail = size === 'detail';
  const canvasHeight = isDetail ? 280 : 160;

  useEffect(() => {
    if (viewMode === 'image') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let time = Math.random() * 100;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();

    const objClass = (object?.class || '').toLowerCase();
    const subType = (object?.subType || '').toLowerCase();
    const name = (object?.name || '').toLowerCase();

    const isBlackHole = objClass === 'blackhole';
    const isPulsar = objClass === 'pulsar' || subType.includes('pulsar') || subType.includes('magnetar');
    const isGalaxy = objClass === 'galaxy';
    const isSupernova = objClass === 'supernova';
    const isPlanet = objClass === 'exoplanet' || objClass === 'interstellar';

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      // Zero-G subtle floating harmonic oscillation
      const floatY = Math.sin(time * 0.02) * (isHovered ? 4 : 2);
      const cy = h / 2 + floatY;

      time += isHovered ? 1.5 : 0.8;

      if (isBlackHole) {
        drawBlackHole(ctx, cx, cy, w, h, time, isHovered, name);
      } else if (isPulsar) {
        drawPulsar(ctx, cx, cy, w, h, time, isHovered);
      } else if (isGalaxy) {
        drawGalaxy(ctx, cx, cy, w, h, time, isHovered);
      } else if (isSupernova) {
        drawSupernova(ctx, cx, cy, w, h, time, isHovered);
      } else if (isPlanet) {
        drawPlanet(ctx, cx, cy, w, h, time, isHovered, subType, name);
      } else {
        drawStar(ctx, cx, cy, w, h, time, isHovered, subType, name);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [viewMode, isHovered, object, isDetail]);

  // DRAW BLACK HOLE (Relativistic Accretion Disk, Doppler Beaming, Event Horizon)
  const drawBlackHole = (ctx, cx, cy, w, h, time, hovered, name) => {
    const radius = isDetail ? 38 : 24;
    const isSgrA = name.includes('sagittarius') || name.includes('sgra');

    // Primary Accretion Glow (Atmosphere)
    const glowColor = isSgrA ? 'rgba(255, 140, 40, ' : 'rgba(240, 160, 60, ';
    const outerGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 3.5);
    outerGrad.addColorStop(0, glowColor + (hovered ? '0.25)' : '0.15)'));
    outerGrad.addColorStop(0.5, glowColor + '0.05)');
    outerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = outerGrad;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(cx, cy);

    // Accretion disk tilt
    const tilt = 0.32;
    const rot = time * 0.015;

    // Draw Back Photon Ring (Gravitationally lensed upward)
    ctx.beginPath();
    ctx.ellipse(0, -radius * 0.45, radius * 2.2, radius * 0.9, 0, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = `rgba(255, 180, 80, ${hovered ? 0.6 : 0.4})`;
    ctx.lineWidth = radius * 0.25;
    ctx.stroke();

    // Secondary blue gravitational fringe
    ctx.beginPath();
    ctx.ellipse(0, -radius * 0.45, radius * 2.0, radius * 0.75, 0, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(100, 160, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dark Event Horizon
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#010206';
    ctx.fill();

    // Thin photon sphere ring right at horizon boundary
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.05, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 230, 180, 0.5)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Front Accretion Disk (Doppler brightening on left approaching side)
    const diskGrad = ctx.createLinearGradient(-radius * 2.6, 0, radius * 2.6, 0);
    diskGrad.addColorStop(0, 'rgba(255, 220, 140, 0.85)'); // Approaching, blueshifted/brighter
    diskGrad.addColorStop(0.4, 'rgba(255, 120, 30, 0.75)');
    diskGrad.addColorStop(0.7, 'rgba(200, 60, 20, 0.4)');
    diskGrad.addColorStop(1, 'rgba(120, 30, 10, 0.15)'); // Receding, dimmer

    ctx.beginPath();
    ctx.ellipse(0, radius * 0.25, radius * 2.5, radius * 0.75, 0, 0, Math.PI);
    ctx.strokeStyle = diskGrad;
    ctx.lineWidth = radius * 0.45;
    ctx.stroke();

    // Orbiting hot matter clumps in zero-G
    for (let i = 0; i < 6; i++) {
      const angle = rot + (i * Math.PI) / 3;
      const rx = Math.cos(angle) * radius * 2.0;
      const ry = Math.sin(angle) * radius * 0.6 + radius * 0.2;
      const alpha = ry > 0 ? 0.7 : 0.2; // Dim when behind
      ctx.beginPath();
      ctx.arc(rx, ry, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 240, 200, ${alpha})`;
      ctx.fill();
    }

    ctx.restore();
  };

  // DRAW PULSAR / MAGNETAR (Rotating relativistic synchrotron jet beams)
  const drawPulsar = (ctx, cx, cy, w, h, time, hovered) => {
    const radius = isDetail ? 20 : 14;
    const rot = time * 0.04;

    ctx.save();
    ctx.translate(cx, cy);

    // Relativistic Jet Beams
    const beamLength = w * 0.42;
    const beamAngle = rot;

    [beamAngle, beamAngle + Math.PI].forEach(angle => {
      ctx.save();
      ctx.rotate(angle);

      const beamGrad = ctx.createLinearGradient(0, 0, beamLength, 0);
      beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      beamGrad.addColorStop(0.2, 'rgba(100, 210, 255, 0.7)');
      beamGrad.addColorStop(0.7, 'rgba(160, 100, 255, 0.2)');
      beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(beamLength, -12);
      ctx.lineTo(beamLength, 12);
      ctx.closePath();
      ctx.fillStyle = beamGrad;
      ctx.fill();
      ctx.restore();
    });

    // Magnetar Atmospheric Wave Ring
    ctx.beginPath();
    ctx.arc(0, 0, radius * (2.2 + Math.sin(time * 0.08) * 0.3), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(130, 200, 255, ${hovered ? 0.4 : 0.2})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Neutron Core
    const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.5, '#b0e5ff');
    coreGrad.addColorStop(0.8, '#4facfe');
    coreGrad.addColorStop(1, 'rgba(0, 100, 255, 0)');

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = coreGrad;
    ctx.fill();

    ctx.restore();
  };

  // DRAW STAR (Dynamic Spectral Corona, Convective Granulation & Flares)
  const drawStar = (ctx, cx, cy, w, h, time, hovered, subType = '', name = '') => {
    const s = (subType + ' ' + name).toLowerCase();
    const isBlue = s.includes('blue') || s.includes('wolf-rayet') || s.includes('o-type') || s.includes('b-type') || s.includes('wo') || s.includes('wn') || s.includes('rigel') || s.includes('spica');
    const isRed = s.includes('red') || s.includes('m-dwarf') || s.includes('m-type') || s.includes('supergiant') || s.includes('hypergiant') || s.includes('garnet') || s.includes('betelgeuse') || s.includes('antares');
    const isWhiteDwarf = s.includes('white dwarf') || s.includes('sirius b');

    const radius = isWhiteDwarf ? (isDetail ? 18 : 12) : (isDetail ? 36 : 24);

    // Dynamic Corona Gradient based on stellar spectral type
    const corona = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius * 2.8);
    if (isBlue) {
      corona.addColorStop(0, hovered ? 'rgba(100, 200, 255, 0.6)' : 'rgba(70, 160, 255, 0.4)');
      corona.addColorStop(0.6, 'rgba(30, 100, 255, 0.15)');
      corona.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (isRed) {
      corona.addColorStop(0, hovered ? 'rgba(255, 90, 40, 0.55)' : 'rgba(230, 60, 30, 0.35)');
      corona.addColorStop(0.6, 'rgba(200, 30, 10, 0.12)');
      corona.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (isWhiteDwarf) {
      corona.addColorStop(0, hovered ? 'rgba(220, 240, 255, 0.7)' : 'rgba(200, 230, 255, 0.5)');
      corona.addColorStop(0.6, 'rgba(120, 180, 255, 0.2)');
      corona.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      corona.addColorStop(0, hovered ? 'rgba(255, 200, 120, 0.5)' : 'rgba(255, 170, 80, 0.35)');
      corona.addColorStop(0.6, 'rgba(255, 120, 40, 0.1)');
      corona.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }

    ctx.fillStyle = corona;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Stellar Body Core
    const bodyGrad = ctx.createRadialGradient(
      cx - radius * 0.3,
      cy - radius * 0.3,
      radius * 0.1,
      cx,
      cy,
      radius
    );
    if (isBlue) {
      bodyGrad.addColorStop(0, '#ffffff');
      bodyGrad.addColorStop(0.4, '#cce6ff');
      bodyGrad.addColorStop(0.8, '#3399ff');
      bodyGrad.addColorStop(1, '#0055cc');
    } else if (isRed) {
      bodyGrad.addColorStop(0, '#fff0e6');
      bodyGrad.addColorStop(0.4, '#ff7733');
      bodyGrad.addColorStop(0.8, '#cc2200');
      bodyGrad.addColorStop(1, '#770000');
    } else if (isWhiteDwarf) {
      bodyGrad.addColorStop(0, '#ffffff');
      bodyGrad.addColorStop(0.5, '#e6f2ff');
      bodyGrad.addColorStop(0.9, '#99ccff');
      bodyGrad.addColorStop(1, '#4477bb');
    } else {
      bodyGrad.addColorStop(0, '#ffffff');
      bodyGrad.addColorStop(0.4, '#fff2cc');
      bodyGrad.addColorStop(0.8, '#ff9933');
      bodyGrad.addColorStop(1, '#e65100');
    }

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Granulation pulses & flares
    ctx.save();
    ctx.translate(cx, cy);
    const flareCount = isBlue ? 8 : (isRed ? 5 : 6);
    const flareColor = isBlue ? 'rgba(180, 220, 255, 0.7)' : (isRed ? 'rgba(255, 120, 80, 0.7)' : 'rgba(255, 230, 180, 0.6)');
    for (let i = 0; i < flareCount; i++) {
      const angle = (i * Math.PI * 2) / flareCount + time * 0.01;
      const flareLen = radius * (1.15 + Math.sin(time * 0.05 + i) * 0.15);
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * flareLen, Math.sin(angle) * flareLen, isDetail ? 2.5 : 1.8, 0, Math.PI * 2);
      ctx.fillStyle = flareColor;
      ctx.fill();
    }
    ctx.restore();
  };

  // DRAW GALAXY (Lyman Break / Spiral Nebula)
  const drawGalaxy = (ctx, cx, cy, w, h, time, hovered) => {
    ctx.save();
    ctx.translate(cx, cy);
    const rot = time * 0.008;
    ctx.rotate(rot);

    // Galactic Core
    const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, isDetail ? 25 : 16);
    coreGrad.addColorStop(0, 'rgba(255, 250, 240, 0.9)');
    coreGrad.addColorStop(0.3, 'rgba(255, 180, 100, 0.6)');
    coreGrad.addColorStop(0.7, 'rgba(180, 80, 255, 0.2)');
    coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(0, 0, isDetail ? 25 : 16, 0, Math.PI * 2);
    ctx.fill();

    // Spiral Arms
    const numArms = 2;
    const armPts = 45;
    for (let a = 0; a < numArms; a++) {
      const armOffset = a * Math.PI;
      for (let p = 0; p < armPts; p++) {
        const theta = (p / armPts) * Math.PI * 2.5 + armOffset;
        const r = (p / armPts) * (isDetail ? 75 : 48);
        const x = Math.cos(theta) * r;
        const y = Math.sin(theta) * r * 0.55; // Elliptical perspective
        const alpha = (1 - p / armPts) * (hovered ? 0.7 : 0.45);

        ctx.beginPath();
        ctx.arc(x, y, 1.2 + Math.random() * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = p % 2 === 0 
          ? `rgba(255, 170, 90, ${alpha})` 
          : `rgba(120, 180, 255, ${alpha})`;
        ctx.fill();
      }
    }

    ctx.restore();
  };

  // DRAW SUPERNOVA (Expanding Remnant Shockwave Shell)
  const drawSupernova = (ctx, cx, cy, w, h, time, hovered) => {
    const pulse = Math.sin(time * 0.03) * 4;
    const baseR = (isDetail ? 42 : 28) + pulse;

    // Diffuse Shockwave Shell
    const shockGrad = ctx.createRadialGradient(cx, cy, baseR * 0.3, cx, cy, baseR * 1.5);
    shockGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    shockGrad.addColorStop(0.3, 'rgba(255, 140, 50, 0.5)');
    shockGrad.addColorStop(0.6, 'rgba(140, 60, 255, 0.25)');
    shockGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = shockGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, baseR * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Central compact remnant
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  };

  // DRAW PLANET (Shaded sphere, atmospheric rim, cloud bands / surface features, rings)
  const drawPlanet = (ctx, cx, cy, w, h, time, hovered, subType, name) => {
    const radius = isDetail ? 36 : 24;
    const isRinged = name.includes('saturn') || name.includes('kepler-16') || subType.includes('saturn');
    const isLava = subType.includes('lava') || subType.includes('ultra-hot');
    const isHycean = subType.includes('hycean') || subType.includes('sub-neptune') || subType.includes('water');
    const isTerrestrial = subType.includes('terrestrial') || subType.includes('habitable') || subType.includes('earth');

    ctx.save();
    ctx.translate(cx, cy);

    // Planet Atmospheric Rayleigh Backglow
    let glowColor = 'rgba(100, 180, 255, ';
    if (isLava) glowColor = 'rgba(255, 100, 40, ';
    else if (isHycean) glowColor = 'rgba(64, 224, 208, ';
    else if (isTerrestrial) glowColor = 'rgba(80, 200, 160, ';

    const atmosGrad = ctx.createRadialGradient(0, 0, radius * 0.8, 0, 0, radius * 1.6);
    atmosGrad.addColorStop(0, glowColor + (hovered ? '0.35)' : '0.2)'));
    atmosGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = atmosGrad;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.6, 0, Math.PI * 2);
    ctx.fill();

    // Draw Back half of Ring (if ringed)
    if (isRinged) {
      ctx.save();
      ctx.rotate(-0.35);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 2.4, radius * 0.65, 0, Math.PI, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(220, 200, 160, 0.45)';
      ctx.lineWidth = radius * 0.35;
      ctx.stroke();
      ctx.restore();
    }

    // Clip to planetary sphere
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.clip();

    // Surface Base Gradient
    const baseGrad = ctx.createLinearGradient(-radius, -radius, radius, radius);
    if (isLava) {
      baseGrad.addColorStop(0, '#5a1100');
      baseGrad.addColorStop(0.5, '#992200');
      baseGrad.addColorStop(1, '#ff5500');
    } else if (isHycean) {
      baseGrad.addColorStop(0, '#002b40');
      baseGrad.addColorStop(0.5, '#006680');
      baseGrad.addColorStop(1, '#20b2aa');
    } else if (isTerrestrial) {
      baseGrad.addColorStop(0, '#0b2038');
      baseGrad.addColorStop(0.5, '#1e485e');
      baseGrad.addColorStop(1, '#487c68');
    } else {
      // Gas Giant / Hot Jupiter
      baseGrad.addColorStop(0, '#2e1909');
      baseGrad.addColorStop(0.5, '#73411b');
      baseGrad.addColorStop(1, '#d4883f');
    }
    ctx.fillStyle = baseGrad;
    ctx.fillRect(-radius, -radius, radius * 2, radius * 2);

    // Drifting atmospheric / cloud bands
    const bandOffset = (time * 0.2) % (radius * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let b = -2; b <= 2; b++) {
      const y = b * (radius * 0.4) + Math.sin(time * 0.02 + b) * 2;
      ctx.fillRect(-radius, y, radius * 2, radius * 0.15);
    }

    // 3D Spherical Light Terminator (Day / Night boundary)
    const lightGrad = ctx.createRadialGradient(
      -radius * 0.35,
      -radius * 0.35,
      radius * 0.1,
      0,
      0,
      radius
    );
    lightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    lightGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
    lightGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.55)');
    lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
    ctx.fillStyle = lightGrad;
    ctx.fillRect(-radius, -radius, radius * 2, radius * 2);

    ctx.restore(); // unclip sphere

    // Draw Front half of Ring (if ringed)
    if (isRinged) {
      ctx.save();
      ctx.rotate(-0.35);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 2.4, radius * 0.65, 0, 0, Math.PI);
      ctx.strokeStyle = 'rgba(220, 200, 160, 0.65)';
      ctx.lineWidth = radius * 0.35;
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  };

  const hasImage = Boolean(object?.image && !imgError);

  return (
    <div className={`group/visual relative w-full overflow-hidden rounded-xl bg-black/60 border border-white/[0.08] hover:border-white/20 transition-colors flex items-center justify-center ${isDetail ? 'h-72' : 'h-44'}`}>
      {/* Background Starfield ambient for model */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/90 pointer-events-none" />

      {/* Render Dual (Both), Image, or Model */}
      {viewMode === 'both' && hasImage ? (
        <div className="relative w-full h-full flex flex-row items-center justify-between overflow-hidden">
          {/* Left: Real Astronomical Telescope Imagery */}
          <div className="relative w-1/2 h-full bg-black overflow-hidden flex items-center justify-center border-r border-white/10">
            <img
              src={object.image}
              alt={object.name}
              onError={() => {
                setImgError(true);
                setViewMode('model');
              }}
              className="w-full h-full object-cover filter brightness-95 contrast-105 transition-transform duration-700 ease-out group-hover/visual:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-1.5 left-2 z-10 px-1.5 py-0.5 rounded bg-black/80 border border-white/15 text-[8px] font-mono tracking-wider text-emerald-300">
              PHOTO
            </div>
          </div>

          {/* Right: Interactive 3D Physics Simulation Canvas */}
          <div className="relative w-1/2 h-full flex items-center justify-center bg-black/40">
            <canvas
              ref={canvasRef}
              className="w-full h-full relative z-10 block pointer-events-none"
            />
            <div className="absolute bottom-1.5 right-2 z-10 px-1.5 py-0.5 rounded bg-black/80 border border-white/15 text-[8px] font-mono tracking-wider text-cyan-300">
              3D MODEL
            </div>
          </div>
        </div>
      ) : viewMode === 'image' && hasImage ? (
        <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
          <img
            src={object.image}
            alt={object.name}
            onError={() => {
              setImgError(true);
              setViewMode('model');
            }}
            className="w-full h-full object-cover filter brightness-95 contrast-105 transition-transform duration-700 ease-out group-hover/visual:scale-105"
            loading="lazy"
          />
          {/* Subtle vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20 pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full relative z-10 block pointer-events-none"
        />
      )}

      {/* Mode Switcher pill if image is present */}
      {hasImage && (
        <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1 rounded-lg border border-white/15 bg-black/85 p-0.5 backdrop-blur-md shadow-lg">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewMode('both');
            }}
            className={`px-1.5 py-0.5 text-[9px] font-mono rounded transition-all cursor-pointer ${
              viewMode === 'both' ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 font-semibold' : 'text-white/50 hover:text-white'
            }`}
            title="Show BOTH Imagery & 3D Model side-by-side"
          >
            BOTH
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewMode('image');
            }}
            className={`px-1.5 py-0.5 text-[9px] font-mono rounded transition-all cursor-pointer ${
              viewMode === 'image' ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 font-semibold' : 'text-white/50 hover:text-white'
            }`}
            title="Show Full Telescope Photo"
          >
            PHOTO
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewMode('model');
            }}
            className={`px-1.5 py-0.5 text-[9px] font-mono rounded transition-all cursor-pointer ${
              viewMode === 'model' ? 'bg-purple-500/30 text-purple-300 border border-purple-400/40 font-semibold' : 'text-white/50 hover:text-white'
            }`}
            title="Show Full 3D Physics Simulation"
          >
            3D
          </button>
        </div>
      )}

      {/* Scientific Telemetry & Status Indicator */}
      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/75 border border-white/10 backdrop-blur-md pointer-events-none">
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
          viewMode === 'both' ? 'bg-amber-400 shadow-[0_0_6px_#fbbf24]' :
          viewMode === 'image' ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' :
          'bg-cyan-400 shadow-[0_0_6px_#22d3ee]'
        }`} />
        <span className="text-[9px] font-mono tracking-widest text-white/70 uppercase">
          {viewMode === 'both' ? 'IMAGERY + 3D MODEL' :
           viewMode === 'image' ? 'TELESCOPE IMAGERY' : '3D SIMULATION'}
        </span>
      </div>
    </div>
  );
}
