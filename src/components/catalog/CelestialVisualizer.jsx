import React, { useEffect, useRef } from 'react';

/**
 * High-performance procedural Canvas Celestial Visualizer
 * Generates custom, scientifically inspired animated models for each celestial class:
 * - blackhole: Event horizon shadow, photon ring, gravitationally lensed Doppler accretion disk, relativistic jets
 * - exoplanet: Rotating sphere with atmospheric limb glow, cloud latitudinal bands, star transit silhouette
 * - galaxy: Clumpy Lyman-break high-z starburst core or spiral arms with nebular ionized glow
 * - pulsar: High-speed spinning neutron star with dipole magnetic field lines and lighthouse beam cones
 * - interstellar: Tumbling irregular asteroid shard with cryogenic outgassing and comet tail
 * - supernova: Expanding multi-shell relativistic blast wave with radioactive ring and central remnant
 */
export default function CelestialVisualizer({ 
  object, 
  size = 180, 
  interactive = false, 
  showControls = false,
  className = ""
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = (canvas.width = size);
    const height = (canvas.height = size);
    const cx = width / 2;
    const cy = height / 2;

    let time = 0;
    const objClass = object?.class || 'exoplanet';
    const objId = object?.id || 'unknown';

    // Unique seed from object id for procedural variations
    let seed = 0;
    for (let i = 0; i < objId.length; i++) seed += objId.charCodeAt(i);

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      if (objClass === 'blackhole') {
        drawBlackHoleModel(ctx, cx, cy, width, height, time, seed, object);
      } else if (objClass === 'galaxy') {
        drawGalaxyModel(ctx, cx, cy, width, height, time, seed, object);
      } else if (objClass === 'pulsar') {
        drawPulsarModel(ctx, cx, cy, width, height, time, seed, object);
      } else if (objClass === 'interstellar') {
        drawInterstellarModel(ctx, cx, cy, width, height, time, seed, object);
      } else if (objClass === 'supernova') {
        drawSupernovaModel(ctx, cx, cy, width, height, time, seed, object);
      } else {
        drawExoplanetModel(ctx, cx, cy, width, height, time, seed, object);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [object, size]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-black/80 border border-slate-800/80 shadow-inner group ${className}`}>
      <canvas 
        ref={canvasRef} 
        width={size} 
        height={size} 
        className="block transition-transform duration-500 group-hover:scale-105"
      />
      {/* Subtle corner badge for model type */}
      <span className="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded bg-black/80 border border-slate-800 text-[8px] font-mono text-slate-400 uppercase tracking-tighter pointer-events-none">
        {object?.subType?.split(' ')[0] || object?.class?.toUpperCase()} MODEL
      </span>
    </div>
  );
}

// ----------------------------------------------------
// PROCEDURAL CELESTIAL RENDERERS
// ----------------------------------------------------

// 1. BLACK HOLE (Kerr Singularity with Doppler boosted accretion disk)
function drawBlackHoleModel(ctx, cx, cy, w, h, time, seed, obj) {
  const rShadow = w * 0.22;

  // Relativistic Jet along poles
  ctx.save();
  ctx.translate(cx, cy);
  const jetGrad = ctx.createLinearGradient(0, -h * 0.45, 0, h * 0.45);
  jetGrad.addColorStop(0, 'rgba(168, 85, 247, 0)');
  jetGrad.addColorStop(0.3, 'rgba(0, 240, 255, 0.4)');
  jetGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
  jetGrad.addColorStop(0.7, 'rgba(0, 240, 255, 0.4)');
  jetGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');
  ctx.fillStyle = jetGrad;
  ctx.fillRect(-2, -h * 0.45, 4, h * 0.9);
  ctx.restore();

  // Outer Lensed Accretion Glow
  const outerGlow = ctx.createRadialGradient(cx, cy, rShadow, cx, cy, w * 0.48);
  outerGlow.addColorStop(0, 'rgba(255, 170, 0, 0.9)');
  outerGlow.addColorStop(0.35, 'rgba(255, 85, 51, 0.4)');
  outerGlow.addColorStop(0.7, 'rgba(168, 85, 247, 0.15)');
  outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = outerGlow;
  ctx.beginPath();
  ctx.arc(cx, cy, w * 0.48, 0, Math.PI * 2);
  ctx.fill();

  // Accretion Disk Ring (Tilted ellipse with Doppler beaming)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-0.35);

  for (let ring = w * 0.35; ring >= rShadow * 1.1; ring -= 3) {
    const rotSpeed = time * 2.5 * (rShadow / ring);
    ctx.strokeStyle = `rgba(255, ${Math.floor(140 + Math.sin(rotSpeed) * 80)}, 0, ${0.45 * (1 - ring / (w * 0.45))})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, ring, ring * 0.35, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // Photon Sphere (Innermost bright photon ring)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(cx, cy, rShadow * 1.05, 0, Math.PI * 2);
  ctx.stroke();

  // Event Horizon Shadow (Pure Black Hole)
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(cx, cy, rShadow, 0, Math.PI * 2);
  ctx.fill();

  // Subtle Doppler boosted crescent on left side
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, rShadow * 1.02, Math.PI * 0.6, Math.PI * 1.4);
  ctx.stroke();
}

// 2. EXOPLANET (Atmosphere, latitudinal clouds, limb lighting)
function drawExoplanetModel(ctx, cx, cy, w, h, time, seed, obj) {
  const rPlanet = w * 0.32;
  const isHycean = obj?.subType?.toLowerCase().includes('hycean');
  const isRocky = obj?.subType?.toLowerCase().includes('terrestrial') || obj?.subType?.toLowerCase().includes('earth');

  // Atmospheric Glow Ring
  const atmoGrad = ctx.createRadialGradient(cx, cy, rPlanet * 0.9, cx, cy, rPlanet * 1.25);
  const atmoColor = isHycean ? 'rgba(56, 189, 248, 0.35)' : isRocky ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 170, 0, 0.25)';
  atmoGrad.addColorStop(0, atmoColor);
  atmoGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = atmoGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, rPlanet * 1.25, 0, Math.PI * 2);
  ctx.fill();

  // Base Planet Sphere with terminator lighting
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, rPlanet, 0, Math.PI * 2);
  ctx.clip();

  // Base Surface Colors
  const baseGrad = ctx.createLinearGradient(cx - rPlanet, cy, cx + rPlanet, cy);
  if (isHycean) {
    baseGrad.addColorStop(0, '#0c4a6e');
    baseGrad.addColorStop(0.5, '#0284c7');
    baseGrad.addColorStop(1, '#082f49');
  } else if (isRocky) {
    baseGrad.addColorStop(0, '#065f46');
    baseGrad.addColorStop(0.4, '#047857');
    baseGrad.addColorStop(0.8, '#1e293b');
    baseGrad.addColorStop(1, '#020617');
  } else {
    baseGrad.addColorStop(0, '#78350f');
    baseGrad.addColorStop(0.5, '#d97706');
    baseGrad.addColorStop(1, '#451a03');
  }
  ctx.fillStyle = baseGrad;
  ctx.fillRect(cx - rPlanet, cy - rPlanet, rPlanet * 2, rPlanet * 2);

  // Rotating Cloud Bands / Surface Texture
  for (let i = -3; i <= 3; i++) {
    const y = cy + i * (rPlanet * 0.26);
    const bandPhase = time * 0.4 + i * 0.5 + seed;
    const bandHeight = rPlanet * 0.18;
    ctx.fillStyle = isHycean ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.14)';
    ctx.beginPath();
    ctx.ellipse(cx + Math.sin(bandPhase) * 12, y, rPlanet * 0.95, bandHeight * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Shadow Terminator (Day / Night hemisphere)
  const shadowGrad = ctx.createRadialGradient(cx - rPlanet * 0.4, cy - rPlanet * 0.4, rPlanet * 0.1, cx, cy, rPlanet * 1.05);
  shadowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
  shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
  shadowGrad.addColorStop(0.85, 'rgba(0, 0, 0, 0.85)');
  shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
  ctx.fillStyle = shadowGrad;
  ctx.fillRect(cx - rPlanet, cy - rPlanet, rPlanet * 2, rPlanet * 2);

  ctx.restore();

  // Crisp illuminated limb arc
  ctx.strokeStyle = isHycean ? 'rgba(56, 189, 248, 0.8)' : 'rgba(0, 240, 255, 0.7)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, rPlanet, -Math.PI * 0.8, Math.PI * 0.2);
  ctx.stroke();
}

// 3. GALAXY (Lyman-Break Cosmic Dawn or Spiral arms)
function drawGalaxyModel(ctx, cx, cy, w, h, time, seed, obj) {
  const isHighZ = (obj?.distance?.redshift || 0) > 6;
  const armCount = isHighZ ? 2 : 3;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(time * 0.3);

  // Central active starburst / AGN core
  const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, w * 0.22);
  if (isHighZ) {
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.2, '#ffaa00');
    coreGrad.addColorStop(0.6, '#ff3366');
    coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.3, '#38bdf8');
    coreGrad.addColorStop(0.7, '#a855f7');
    coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  }
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(0, 0, w * 0.22, 0, Math.PI * 2);
  ctx.fill();

  // Spiral / Clumpy Arms
  for (let arm = 0; arm < armCount; arm++) {
    const baseAngle = (arm * Math.PI * 2) / armCount;
    ctx.beginPath();
    for (let r = 8; r < w * 0.42; r += 3) {
      const theta = baseAngle + r * 0.06;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r * 0.7; // inclined perspective

      const dotAlpha = 0.6 * (1 - r / (w * 0.42));
      ctx.fillStyle = isHighZ 
        ? `rgba(255, 120, 80, ${dotAlpha})` 
        : `rgba(0, 240, 255, ${dotAlpha})`;
      ctx.fillRect(x - 1.2, y - 1.2, 2.4, 2.4);
    }
  }

  ctx.restore();
}

// 4. PULSAR / MAGNETAR (Relativistic magnetic dipole lighthouse beams)
function drawPulsarModel(ctx, cx, cy, w, h, time, seed, obj) {
  const rNeutron = w * 0.12;
  const spinAngle = time * 8; // high-speed spin

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(spinAngle);

  // Lighthouse Cones of Synchrotron Radiation
  const beamLength = w * 0.46;
  const beamWidth = 22;

  // North beam
  const beamGrad1 = ctx.createLinearGradient(0, 0, 0, -beamLength);
  beamGrad1.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  beamGrad1.addColorStop(0.2, 'rgba(0, 255, 136, 0.8)');
  beamGrad1.addColorStop(1, 'rgba(0, 240, 255, 0)');
  ctx.fillStyle = beamGrad1;
  ctx.beginPath();
  ctx.moveTo(-beamWidth * 0.5, -beamLength);
  ctx.lineTo(beamWidth * 0.5, -beamLength);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();

  // South beam
  const beamGrad2 = ctx.createLinearGradient(0, 0, 0, beamLength);
  beamGrad2.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  beamGrad2.addColorStop(0.2, 'rgba(0, 255, 136, 0.8)');
  beamGrad2.addColorStop(1, 'rgba(0, 240, 255, 0)');
  ctx.fillStyle = beamGrad2;
  ctx.beginPath();
  ctx.moveTo(-beamWidth * 0.5, beamLength);
  ctx.lineTo(beamWidth * 0.5, beamLength);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();

  // Magnetic Field Lines (Dipole loops)
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
  ctx.lineWidth = 1;
  for (let s = -1; s <= 1; s += 2) {
    ctx.beginPath();
    ctx.ellipse(s * rNeutron * 1.8, 0, rNeutron * 1.5, rNeutron * 2.5, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Central Neutron Star core (Ultra-dense glowing sphere)
  const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, rNeutron);
  coreGrad.addColorStop(0, '#ffffff');
  coreGrad.addColorStop(0.5, '#00ff88');
  coreGrad.addColorStop(1, '#064e3b');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(0, 0, rNeutron, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// 5. INTERSTELLAR OBJECT & COMET (Tumbling shard with outgassing tail)
function drawInterstellarModel(ctx, cx, cy, w, h, time, seed, obj) {
  const isComet = obj?.name?.includes('Borisov') || obj?.name?.includes('Comet');

  ctx.save();
  ctx.translate(cx, cy);

  // Outgassing tail for comets
  if (isComet) {
    const tailGrad = ctx.createLinearGradient(0, 0, w * 0.45, -h * 0.3);
    tailGrad.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
    tailGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.3)');
    tailGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = tailGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w * 0.45, -h * 0.4);
    ctx.lineTo(w * 0.38, -h * 0.15);
    ctx.closePath();
    ctx.fill();
  }

  // Tumbling irregular geometry
  ctx.rotate(time * 0.6);

  ctx.fillStyle = isComet ? '#38bdf8' : '#e11d48';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.2;

  ctx.beginPath();
  // Elongated cigar / pancake ratio
  const pts = [
    { x: -w * 0.32, y: -h * 0.08 },
    { x: -w * 0.15, y: -h * 0.14 },
    { x: w * 0.22, y: -h * 0.09 },
    { x: w * 0.34, y: 0 },
    { x: w * 0.24, y: h * 0.09 },
    { x: -w * 0.10, y: h * 0.13 },
    { x: -w * 0.28, y: h * 0.06 }
  ];

  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Surface texture craters
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.arc(-w * 0.1, 0, 4, 0, Math.PI * 2);
  ctx.arc(w * 0.1, -2, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// 6. SUPERNOVA / TRANSIENT (Expanding blast wave, glowing ring)
function drawSupernovaModel(ctx, cx, cy, w, h, time, seed, obj) {
  // Expanding multi-shell blast wave
  const waveRadius = (w * 0.18) + (Math.sin(time * 2) * 8 + 12);

  // Outer thermal shockwave
  const outerGrad = ctx.createRadialGradient(cx, cy, waveRadius * 0.4, cx, cy, waveRadius * 1.5);
  outerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  outerGrad.addColorStop(0.25, 'rgba(255, 170, 0, 0.7)');
  outerGrad.addColorStop(0.6, 'rgba(255, 51, 102, 0.4)');
  outerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = outerGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, waveRadius * 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Glowing equatorial ring (like SN 1987A)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(0.3);
  ctx.strokeStyle = 'rgba(255, 220, 100, 0.9)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, w * 0.38, w * 0.16, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Glowing pearls along ring
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
    const px = Math.cos(a) * (w * 0.38);
    const py = Math.sin(a) * (w * 0.16);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Central newborn compact object remnant
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
  ctx.fill();
}
