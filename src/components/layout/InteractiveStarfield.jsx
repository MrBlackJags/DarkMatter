import React, { useEffect, useRef } from 'react';

/**
 * THEMES FOR COSMIC NEBULAE & UNIVERSE CANVAS
 */
const NEBULA_THEMES = {
  carina: {
    name: 'Carina & Veil',
    bgFill: '#02040c',
    clouds: [
      // Vibrant Oxygen-III Cyan Filament (Top Left)
      { xRel: 0.20, yRel: 0.22, rRel: 0.42, vx: 0.03, vy: 0.015, pulse: 0.005, color: [0, 240, 255], alpha: 0.28 },
      // Hydrogen-Alpha Magenta/Crimson Emission (Top Right)
      { xRel: 0.78, yRel: 0.28, rRel: 0.46, vx: -0.025, vy: 0.02, pulse: 0.004, color: [244, 63, 94], alpha: 0.24 },
      // Deep Violet / Starburst Nursery (Center Right)
      { xRel: 0.65, yRel: 0.55, rRel: 0.38, vx: -0.015, vy: -0.02, pulse: 0.006, color: [168, 85, 247], alpha: 0.22 },
      // Warm Amber / Infrared Stardust Core (Center Left)
      { xRel: 0.35, yRel: 0.60, rRel: 0.40, vx: 0.02, vy: -0.015, pulse: 0.005, color: [245, 158, 11], alpha: 0.18 },
      // Deep Lagoon Teal Ridge (Bottom Center)
      { xRel: 0.50, yRel: 0.85, rRel: 0.44, vx: 0.01, vy: -0.025, pulse: 0.003, color: [6, 182, 212], alpha: 0.22 },
      // Electric Indigo Secondary Veil (Far Right)
      { xRel: 0.88, yRel: 0.78, rRel: 0.36, vx: -0.02, vy: -0.015, pulse: 0.004, color: [99, 102, 241], alpha: 0.20 },
      // Soft Rose Ionization (Far Left)
      { xRel: 0.10, yRel: 0.70, rRel: 0.34, vx: 0.025, vy: 0.02, pulse: 0.005, color: [236, 72, 153], alpha: 0.18 }
    ],
    dustVeins: [
      { xRel: 0.45, yRel: 0.45, rRel: 0.28, vx: 0.008, vy: 0.005 },
      { xRel: 0.70, yRel: 0.40, rRel: 0.22, vx: -0.006, vy: 0.004 }
    ]
  },
  orion: {
    name: 'Orion Molecular',
    bgFill: '#03030e',
    clouds: [
      { xRel: 0.25, yRel: 0.30, rRel: 0.48, vx: 0.02, vy: 0.015, pulse: 0.004, color: [168, 85, 247], alpha: 0.32 },
      { xRel: 0.75, yRel: 0.25, rRel: 0.44, vx: -0.02, vy: 0.02, pulse: 0.005, color: [59, 130, 246], alpha: 0.28 },
      { xRel: 0.50, yRel: 0.65, rRel: 0.50, vx: 0.015, vy: -0.02, pulse: 0.006, color: [217, 70, 239], alpha: 0.25 },
      { xRel: 0.82, yRel: 0.75, rRel: 0.38, vx: -0.025, vy: -0.015, pulse: 0.003, color: [96, 165, 250], alpha: 0.22 },
      { xRel: 0.15, yRel: 0.78, rRel: 0.36, vx: 0.02, vy: -0.01, pulse: 0.005, color: [147, 51, 234], alpha: 0.26 }
    ],
    dustVeins: [
      { xRel: 0.48, yRel: 0.50, rRel: 0.25, vx: 0.005, vy: 0.005 }
    ]
  },
  pillars: {
    name: 'Pillars of Creation',
    bgFill: '#040306',
    clouds: [
      { xRel: 0.30, yRel: 0.35, rRel: 0.45, vx: 0.015, vy: 0.02, pulse: 0.004, color: [245, 158, 11], alpha: 0.30 },
      { xRel: 0.68, yRel: 0.30, rRel: 0.42, vx: -0.02, vy: 0.015, pulse: 0.005, color: [20, 184, 166], alpha: 0.26 },
      { xRel: 0.45, yRel: 0.70, rRel: 0.50, vx: 0.01, vy: -0.02, pulse: 0.006, color: [234, 88, 12], alpha: 0.26 },
      { xRel: 0.80, yRel: 0.72, rRel: 0.36, vx: -0.02, vy: -0.02, pulse: 0.004, color: [217, 119, 6], alpha: 0.22 },
      { xRel: 0.18, yRel: 0.75, rRel: 0.38, vx: 0.02, vy: -0.015, pulse: 0.003, color: [13, 148, 136], alpha: 0.22 }
    ],
    dustVeins: [
      { xRel: 0.38, yRel: 0.45, rRel: 0.22, vx: 0.006, vy: 0.004 },
      { xRel: 0.52, yRel: 0.55, rRel: 0.26, vx: -0.005, vy: 0.006 }
    ]
  },
  supernova: {
    name: 'Crab Supernova',
    bgFill: '#04020a',
    clouds: [
      { xRel: 0.50, yRel: 0.45, rRel: 0.50, vx: 0.00, vy: 0.00, pulse: 0.008, color: [34, 211, 238], alpha: 0.34 },
      { xRel: 0.30, yRel: 0.30, rRel: 0.40, vx: 0.02, vy: 0.02, pulse: 0.005, color: [239, 68, 68], alpha: 0.28 },
      { xRel: 0.72, yRel: 0.32, rRel: 0.42, vx: -0.02, vy: 0.015, pulse: 0.006, color: [217, 70, 239], alpha: 0.26 },
      { xRel: 0.65, yRel: 0.70, rRel: 0.44, vx: -0.015, vy: -0.02, pulse: 0.004, color: [244, 63, 94], alpha: 0.24 },
      { xRel: 0.25, yRel: 0.68, rRel: 0.38, vx: 0.02, vy: -0.015, pulse: 0.005, color: [6, 182, 212], alpha: 0.25 }
    ],
    dustVeins: [
      { xRel: 0.50, yRel: 0.48, rRel: 0.18, vx: 0.002, vy: 0.002 }
    ]
  },
  abyss: {
    name: 'Deep Cosmic Abyss',
    bgFill: '#010206',
    clouds: [
      { xRel: 0.35, yRel: 0.35, rRel: 0.42, vx: 0.01, vy: 0.01, pulse: 0.003, color: [30, 27, 75], alpha: 0.18 },
      { xRel: 0.70, yRel: 0.60, rRel: 0.46, vx: -0.01, vy: -0.01, pulse: 0.003, color: [56, 189, 248], alpha: 0.12 }
    ],
    dustVeins: []
  }
};

/**
 * HIGH-FIDELITY INTERACTIVE COSMIC NEBULA & STARFIELD ENGINE
 */
export default function InteractiveStarfield({ theme = 'carina', intensity = 'vibrant' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Multiplier for nebula vibrancy
    const intensityMultiplier = intensity === 'vibrant' ? 1.35 : intensity === 'subtle' ? 0.7 : 1.0;

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNebulaClouds();
      initStardust();
    };
    window.addEventListener('resize', handleResize);

    // Interactive mouse coordinates
    const mouse = { x: -2000, y: -2000, radius: 180, isMoving: false, timer: null };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isMoving = true;
      clearTimeout(mouse.timer);
      mouse.timer = setTimeout(() => {
        mouse.isMoving = false;
      }, 300);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ----------------------------------------------------
    // 1. NEBULA CLUSTER INSTANCES (Dynamic Drifting Gas)
    // ----------------------------------------------------
    const themeConfig = NEBULA_THEMES[theme] || NEBULA_THEMES.carina;
    let liveClouds = [];
    let liveDustVeins = [];

    const initNebulaClouds = () => {
      liveClouds = themeConfig.clouds.map(c => ({
        x: c.xRel * width,
        y: c.yRel * height,
        baseX: c.xRel * width,
        baseY: c.yRel * height,
        baseRadius: Math.max(width, height) * c.rRel,
        vx: c.vx,
        vy: c.vy,
        pulseSpeed: c.pulse,
        phase: Math.random() * Math.PI * 2,
        r: c.color[0],
        g: c.color[1],
        b: c.color[2],
        targetAlpha: c.alpha * intensityMultiplier
      }));

      liveDustVeins = (themeConfig.dustVeins || []).map(d => ({
        x: d.xRel * width,
        y: d.yRel * height,
        baseRadius: Math.max(width, height) * d.rRel,
        vx: d.vx,
        vy: d.vy,
        phase: Math.random() * Math.PI * 2
      }));
    };
    initNebulaClouds();

    // ----------------------------------------------------
    // 2. FLOATING COSMIC STARDUST MOTES (Micro-particulates)
    // ----------------------------------------------------
    const STARDUST_COUNT = 75;
    let stardust = [];

    const initStardust = () => {
      stardust = [];
      for (let i = 0; i < STARDUST_COUNT; i++) {
        stardust.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.2 + 0.6,
          baseAlpha: Math.random() * 0.45 + 0.15,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.005,
          color: Math.random() > 0.6 ? 'rgba(0, 240, 255,' : Math.random() > 0.5 ? 'rgba(236, 72, 153,' : 'rgba(255, 255, 255,'
        });
      }
    };
    initStardust();

    // ----------------------------------------------------
    // 3. MULTI-PLANE STELLAR POPULATION (420+ Stars)
    // ----------------------------------------------------
    const STAR_COUNT = 440;
    const stars = [];
    const spectralPalettes = [
      '#ffffff', // Class A: Radiant White
      '#e0f2fe', // Class B: Blue-White
      '#93c5fd', // Class O: Hot Electric Blue
      '#00f0ff', // Vivid Cyan Ionized Star
      '#fde047', // Class G: Solar Gold
      '#fb923c', // Class K: Orange Giant
      '#fca5a5', // Class M: Red Dwarf
      '#c084fc'  // Starburst Violet
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      const depth = Math.random(); // 0 (far distant) to 1 (near foreground)
      const isLuminous = depth > 0.88;
      const hasDiffractionSpikes = depth > 0.93;

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        depth: depth,
        size: isLuminous ? Math.random() * 1.8 + 1.2 : Math.random() * 1.1 + 0.35,
        isLuminous: isLuminous,
        hasSpikes: hasDiffractionSpikes,
        baseAlpha: Math.random() * 0.65 + 0.2,
        twinkleSpeed: Math.random() * 0.035 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * (0.03 + depth * 0.08),
        vy: (Math.random() - 0.5) * (0.03 + depth * 0.08),
        color: spectralPalettes[Math.floor(Math.random() * spectralPalettes.length)],
        coronaRadius: isLuminous ? Math.random() * 8 + 6 : 0
      });
    }

    // ----------------------------------------------------
    // 4. METEORS / HIGH-ENERGY IONIZATION TRAILS
    // ----------------------------------------------------
    const meteors = [];
    const spawnMeteor = () => {
      const fromTop = Math.random() > 0.5;
      const startX = fromTop ? Math.random() * width : 0;
      const startY = fromTop ? 0 : Math.random() * (height * 0.6);
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.35;
      const speed = Math.random() * 12 + 16;

      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 120 + 80,
        thickness: Math.random() * 1.8 + 1.2,
        alpha: 1.0,
        fadeSpeed: Math.random() * 0.018 + 0.012,
        color: Math.random() > 0.5 ? '#00f0ff' : Math.random() > 0.3 ? '#ec4899' : '#ffffff'
      });
    };

    let meteorTimer = 0;
    let nextMeteorInterval = Math.floor(Math.random() * 200 + 160);

    // ----------------------------------------------------
    // 5. DEEP SPACE COSMIC PULSAR BEACON (Slow Harmonic Glow)
    // ----------------------------------------------------
    let cosmicPulseTimer = 0;
    let cosmicPulseAlpha = 0;

    // ----------------------------------------------------
    // RENDER LOOP
    // ----------------------------------------------------
    let frame = 0;

    const render = () => {
      frame++;

      // 1. Fill base dark cosmos canvas
      ctx.fillStyle = themeConfig.bgFill || '#02040c';
      ctx.fillRect(0, 0, width, height);

      // 2. Cosmic Pulsar Atmosphere Flash (every ~14 seconds)
      cosmicPulseTimer++;
      if (cosmicPulseTimer > 850) {
        cosmicPulseTimer = 0;
      }
      if (cosmicPulseTimer < 60) {
        cosmicPulseAlpha = Math.sin((cosmicPulseTimer / 60) * Math.PI) * 0.06;
        ctx.fillStyle = `rgba(0, 240, 255, ${cosmicPulseAlpha})`;
        ctx.fillRect(0, 0, width, height);
      }

      // ----------------------------------------------------
      // 3. RENDER NEBULA GAS CLOUDS (High-Energy Ionization)
      // ----------------------------------------------------
      // Using 'screen' composite mode produces brilliant Hubble-style glowing emission
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < liveClouds.length; i++) {
        const neb = liveClouds[i];

        // Smooth organic drift
        neb.x += neb.vx;
        neb.y += neb.vy;

        const margin = neb.baseRadius * 0.6;
        if (neb.x < -margin) neb.x = width + margin;
        if (neb.x > width + margin) neb.x = -margin;
        if (neb.y < -margin) neb.y = height + margin;
        if (neb.y > height + margin) neb.y = -margin;

        // Breathing pulsation
        const pulse = Math.sin(frame * neb.pulseSpeed + neb.phase);
        const radius = neb.baseRadius * (1 + pulse * 0.12);
        const currentAlpha = neb.targetAlpha * (1 + pulse * 0.15);

        // Core glow gradient with multi-tier spectral falloff
        const grad = ctx.createRadialGradient(
          neb.x, neb.y, radius * 0.04,
          neb.x, neb.y, radius
        );
        grad.addColorStop(0, `rgba(${neb.r}, ${neb.g}, ${neb.b}, ${currentAlpha})`);
        grad.addColorStop(0.35, `rgba(${neb.r}, ${neb.g}, ${neb.b}, ${currentAlpha * 0.55})`);
        grad.addColorStop(0.70, `rgba(${neb.r}, ${neb.g}, ${neb.b}, ${currentAlpha * 0.20})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(neb.x, neb.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // ----------------------------------------------------
      // 4. DARK INTERSTELLAR ABSORPTION VEINS (Bok Dust Lanes)
      // ----------------------------------------------------
      if (liveDustVeins.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        for (let i = 0; i < liveDustVeins.length; i++) {
          const dust = liveDustVeins[i];
          dust.x += dust.vx;
          dust.y += dust.vy;

          const dPulse = Math.sin(frame * 0.003 + dust.phase);
          const dRad = dust.baseRadius * (1 + dPulse * 0.08);

          const dGrad = ctx.createRadialGradient(
            dust.x, dust.y, dRad * 0.05,
            dust.x, dust.y, dRad
          );
          dGrad.addColorStop(0, 'rgba(2, 4, 10, 0.70)');
          dGrad.addColorStop(0.6, 'rgba(2, 4, 10, 0.35)');
          dGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = dGrad;
          ctx.beginPath();
          ctx.arc(dust.x, dust.y, dRad, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // ----------------------------------------------------
      // 5. STARDUST PARTICLES (Floating Micro-Gas Shimmer)
      // ----------------------------------------------------
      for (let i = 0; i < stardust.length; i++) {
        const d = stardust[i];
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        const dAlpha = d.baseAlpha + Math.sin(frame * d.speed + d.phase) * 0.15;
        ctx.fillStyle = `${d.color} ${Math.max(0.05, Math.min(1.0, dAlpha))})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ----------------------------------------------------
      // 6. STELLAR POPULATION (Stars + Diffraction Spikes + Constellations)
      // ----------------------------------------------------
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Parallax stellar drift
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Twinkle calculation
        const alpha = Math.max(0.12, Math.min(1.0, s.baseAlpha + Math.sin(frame * s.twinkleSpeed + s.twinklePhase) * 0.40));

        // Interactive mouse gravity repulsion & lensing
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let drawX = s.x;
        let drawY = s.y;
        let drawSize = s.size;
        let extraAlpha = 0;

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          drawX += (dx / dist) * force * 20;
          drawY += (dy / dist) * force * 20;
          extraAlpha = force * 0.5;
          drawSize += force * 1.2;
        }

        // Render Star Corona Glow for luminous foreground stars
        if (s.isLuminous && alpha > 0.45) {
          const coronaGrad = ctx.createRadialGradient(
            drawX, drawY, 0,
            drawX, drawY, s.coronaRadius + drawSize * 2
          );
          coronaGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.4})`);
          coronaGrad.addColorStop(0.4, s.color === '#00f0ff' ? `rgba(0, 240, 255, ${alpha * 0.25})` : `rgba(168, 85, 247, ${alpha * 0.25})`);
          coronaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = coronaGrad;
          ctx.beginPath();
          ctx.arc(drawX, drawY, s.coronaRadius + drawSize * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star Core Disc
        ctx.globalAlpha = Math.min(1.0, alpha + extraAlpha);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(drawX, drawY, drawSize, 0, Math.PI * 2);
        ctx.fill();

        // 4-Point Diffraction Spikes (Telescope J2000 Optics)
        if (s.hasSpikes && alpha > 0.50) {
          ctx.save();
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.75;
          const spikeLen = drawSize * 4.5;

          ctx.beginPath();
          // Horizontal axis
          ctx.moveTo(drawX - spikeLen, drawY);
          ctx.lineTo(drawX + spikeLen, drawY);
          // Vertical axis
          ctx.moveTo(drawX, drawY - spikeLen);
          ctx.lineTo(drawX, drawY + spikeLen);
          ctx.stroke();

          // Subtle secondary 45-degree micro spikes
          ctx.lineWidth = 0.4;
          const microLen = spikeLen * 0.45;
          ctx.beginPath();
          ctx.moveTo(drawX - microLen, drawY - microLen);
          ctx.lineTo(drawX + microLen, drawY + microLen);
          ctx.moveTo(drawX + microLen, drawY - microLen);
          ctx.lineTo(drawX - microLen, drawY + microLen);
          ctx.stroke();
          ctx.restore();
        }

        // Interactive Constellation Web around Mouse
        if (dist < mouse.radius * 0.85) {
          for (let j = i + 1; j < stars.length; j++) {
            const s2 = stars[j];
            const d2x = s2.x - s.x;
            const d2y = s2.y - s.y;
            const dBetween = Math.sqrt(d2x * d2x + d2y * d2y);

            if (dBetween < 80) {
              const lineAlpha = (1 - dBetween / 80) * 0.28;
              ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(drawX, drawY);
              ctx.lineTo(s2.x, s2.y);
              ctx.stroke();
            }
          }
        }
      }

      // ----------------------------------------------------
      // 7. SHOOTING STARS / METEORS
      // ----------------------------------------------------
      meteorTimer++;
      if (meteorTimer >= nextMeteorInterval) {
        spawnMeteor();
        meteorTimer = 0;
        nextMeteorInterval = Math.floor(Math.random() * 240 + 140);
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= m.fadeSpeed;

        if (m.alpha <= 0 || m.x > width + 150 || m.y > height + 150) {
          meteors.splice(i, 1);
          continue;
        }

        ctx.save();
        const headX = m.x;
        const headY = m.y;
        const mag = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
        const tailX = m.x - (m.vx / mag) * m.length;
        const tailY = m.y - (m.vy / mag) * m.length;

        const meteorGrad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        meteorGrad.addColorStop(0.25, m.color === '#00f0ff' ? `rgba(0, 240, 255, ${m.alpha * 0.85})` : `rgba(236, 72, 153, ${m.alpha * 0.85})`);
        meteorGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.25)');
        meteorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = m.thickness;
        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Incandescent Meteor Head
        ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
        ctx.beginPath();
        ctx.arc(headX, headY, m.thickness * 1.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouse.timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, intensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
      style={{ background: '#02040c' }}
    />
  );
}
