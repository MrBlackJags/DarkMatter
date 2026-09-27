import React, { useRef, useEffect } from 'react';

/**
 * CosmicCanvas
 * Weightless cosmic canvas with black base, volumetric gradients of orange,
 * blue, and white, multi-depth star drift, and zero-G antigravity particles.
 */
export default function CosmicCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speedFactor = prefersReduced ? 0.2 : 1.0;

    // Mouse state with smooth inertia
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    const parallax = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      parallax.targetX = (e.clientX / width - 0.5) * 30;
      parallax.targetY = (e.clientY / height - 0.5) * 30;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      parallax.targetX = 0;
      parallax.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initEntities();
    };

    window.addEventListener('resize', resizeCanvas);

    // Entities
    let stars = [];
    let particles = [];
    let time = 0;

    const initEntities = () => {
      stars = [];
      particles = [];

      // 3 Layers of Stars for deep zero-G parallax
      // Layer 1: Distant background pinpricks (180 stars)
      for (let i = 0; i < 180; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.4 + Math.random() * 0.6,
          baseAlpha: 0.15 + Math.random() * 0.4,
          twinkleSpeed: 0.003 + Math.random() * 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.03,
          vy: -0.02 - Math.random() * 0.03,
          depth: 0.2, // moves least with parallax
          color: '#ffffff'
        });
      }

      // Layer 2: Midground stars (80 stars)
      for (let i = 0; i < 80; i++) {
        const rand = Math.random();
        let color = '#ffffff';
        if (rand > 0.7) color = '#ffe8d6'; // subtle orange-white
        else if (rand > 0.4) color = '#dbeafe'; // subtle blue-white

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.8 + Math.random() * 0.8,
          baseAlpha: 0.3 + Math.random() * 0.5,
          twinkleSpeed: 0.006 + Math.random() * 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.05,
          vy: -0.04 - Math.random() * 0.04,
          depth: 0.5,
          color
        });
      }

      // Layer 3: Foreground luminous beacons (18 stars)
      for (let i = 0; i < 18; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 1.4 + Math.random() * 1.0,
          baseAlpha: 0.6 + Math.random() * 0.3,
          twinkleSpeed: 0.01 + Math.random() * 0.02,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.08,
          vy: -0.06 - Math.random() * 0.05,
          depth: 0.9,
          isBeacon: true,
          color: Math.random() > 0.5 ? '#fff4eb' : '#eff6ff'
        });
      }

      // Antigravity Floating Particles (50 particles)
      for (let i = 0; i < 50; i++) {
        let rgb = { r: 255, g: 255, b: 255 };
        const cRand = Math.random();
        if (cRand > 0.6) rgb = { r: 255, g: 150, b: 65 }; // Cosmic orange
        else if (cRand > 0.3) rgb = { r: 80, g: 145, b: 255 }; // Cosmic blue

        const px = Math.random() * width;
        const py = Math.random() * height;

        particles.push({
          x: px,
          y: py,
          baseX: px,
          size: 0.8 + Math.random() * 1.6,
          vy: -(0.06 + Math.random() * 0.18), // weightless upward drift
          wobbleSpeed: 0.008 + Math.random() * 0.015,
          wobbleAmp: 15 + Math.random() * 35,
          wobblePhase: Math.random() * Math.PI * 2,
          baseAlpha: 0.12 + Math.random() * 0.35,
          pulseSpeed: 0.008 + Math.random() * 0.015,
          pulsePhase: Math.random() * Math.PI * 2,
          color: rgb,
          vxImpulse: 0,
          vyImpulse: 0
        });
      }
    };

    // Draw smooth, soft volumetric cosmic gradients (Orange, Blue, White)
    const drawAtmosphere = (ctx, t) => {
      ctx.globalCompositeOperation = 'screen';

      // Accretion Orange Glow (Left/Lower quadrant)
      const orangeX = width * 0.22 + Math.sin(t * 0.0004) * 60 - parallax.x * 0.4;
      const orangeY = height * 0.68 + Math.cos(t * 0.0003) * 50 - parallax.y * 0.4;
      const orangeRadius = Math.max(width, height) * 0.55;
      const gradOrange = ctx.createRadialGradient(orangeX, orangeY, 0, orangeX, orangeY, orangeRadius);
      gradOrange.addColorStop(0, 'rgba(255, 130, 45, 0.08)');
      gradOrange.addColorStop(0.4, 'rgba(255, 110, 30, 0.035)');
      gradOrange.addColorStop(1, 'rgba(255, 110, 30, 0)');
      ctx.fillStyle = gradOrange;
      ctx.fillRect(0, 0, width, height);

      // Deep Cosmic Starlight Blue Glow (Right/Upper quadrant)
      const blueX = width * 0.78 + Math.cos(t * 0.0004) * 60 - parallax.x * 0.5;
      const blueY = height * 0.28 + Math.sin(t * 0.0003) * 50 - parallax.y * 0.5;
      const blueRadius = Math.max(width, height) * 0.65;
      const gradBlue = ctx.createRadialGradient(blueX, blueY, 0, blueX, blueY, blueRadius);
      gradBlue.addColorStop(0, 'rgba(45, 105, 255, 0.09)');
      gradBlue.addColorStop(0.45, 'rgba(30, 80, 220, 0.04)');
      gradBlue.addColorStop(1, 'rgba(30, 80, 220, 0)');
      ctx.fillStyle = gradBlue;
      ctx.fillRect(0, 0, width, height);

      // Center Subtle Silver/White Luminous Depth (Core)
      const whiteX = width * 0.5 + Math.sin(t * 0.0002) * 40 - parallax.x * 0.3;
      const whiteY = height * 0.48 + Math.cos(t * 0.0002) * 40 - parallax.y * 0.3;
      const whiteRadius = Math.max(width, height) * 0.45;
      const gradWhite = ctx.createRadialGradient(whiteX, whiteY, 0, whiteX, whiteY, whiteRadius);
      gradWhite.addColorStop(0, 'rgba(240, 245, 255, 0.05)');
      gradWhite.addColorStop(0.5, 'rgba(220, 230, 255, 0.015)');
      gradWhite.addColorStop(1, 'rgba(220, 230, 255, 0)');
      ctx.fillStyle = gradWhite;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'source-over';
    };

    const render = () => {
      // Smooth mouse & parallax inertia
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      parallax.x += (parallax.targetX - parallax.x) * 0.05;
      parallax.y += (parallax.targetY - parallax.y) * 0.05;

      // Base: Pure deep space black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Cosmic Depth Gradients
      drawAtmosphere(ctx, time);

      // Render Star Drift with depth parallax
      for (const s of stars) {
        s.x += s.vx * speedFactor;
        s.y += s.vy * speedFactor;

        // Wrap around boundaries smoothly
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const px = s.x - parallax.x * s.depth;
        const py = s.y - parallax.y * s.depth;

        const twinkle = Math.sin(s.twinklePhase + time * s.twinkleSpeed) * 0.22;
        const alpha = Math.max(0.08, Math.min(1, s.baseAlpha + twinkle));

        // Beacon halo
        if (s.isBeacon) {
          const halo = ctx.createRadialGradient(px, py, 0, px, py, 7);
          halo.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.35})`);
          halo.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Render Antigravity Floating Particles
      for (const p of particles) {
        // Zero-G harmonic wobble
        p.baseX += (Math.random() - 0.5) * 0.04;
        const wobble = Math.sin(p.wobblePhase + time * p.wobbleSpeed) * p.wobbleAmp;
        
        // Dissipate impulse gently
        p.vxImpulse *= 0.94;
        p.vyImpulse *= 0.94;

        p.x = p.baseX + wobble + p.vxImpulse;
        p.y += p.vy + p.vyImpulse;

        // Antigravity cursor deflection (matter smoothly deflects in zero-G)
        if (mouse.x > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 140;

          if (dist < influenceRadius && dist > 1) {
            const force = (influenceRadius - dist) / influenceRadius;
            p.vxImpulse += (dx / dist) * force * 0.7;
            p.vyImpulse += (dy / dist) * force * 0.7;
          }
        }

        // Screen wrap
        if (p.y < -15) {
          p.y = height + 15;
          p.baseX = Math.random() * width;
          p.x = p.baseX;
          p.vxImpulse = 0;
          p.vyImpulse = 0;
        }
        if (p.x < -20) {
          p.baseX = width + 10;
          p.x = p.baseX;
        }
        if (p.x > width + 20) {
          p.baseX = -10;
          p.x = p.baseX;
        }

        const pulse = Math.sin(p.pulsePhase + time * p.pulseSpeed) * 0.15;
        const alpha = Math.max(0.05, Math.min(0.85, p.baseAlpha + pulse));

        const px = p.x - parallax.x * 0.7;
        const py = p.y - parallax.y * 0.7;

        // Soft particle glow
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 1 * speedFactor;
      animationFrameId = requestAnimationFrame(render);
    };

    resizeCanvas();
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ background: '#000000' }}
    />
  );
}
