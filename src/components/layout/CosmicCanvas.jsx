import React, { useRef, useEffect } from 'react';

export default function CosmicCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // Mouse state for interaction
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Resize handler
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

      // Init Stars (200)
      for (let i = 0; i < 200; i++) {
        const isBright = Math.random() < 0.08;
        const size = isBright ? 1.2 + Math.random() * 0.8 : 0.3 + Math.random() * 0.9;
        
        let color = '#ffffff';
        const colorRand = Math.random();
        if (colorRand > 0.8) color = '#fff5e6'; // warm white
        else if (colorRand > 0.6) color = '#e0eaff'; // cool blue-white

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          baseAlpha: 0.2 + Math.random() * 0.6,
          twinkleSpeed: 0.005 + Math.random() * 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          color,
          isBright
        });
      }

      // Init Particles (40)
      for (let i = 0; i < 40; i++) {
        let colorObj = { r: 255, g: 255, b: 255 };
        const cRand = Math.random();
        if (cRand > 0.66) colorObj = { r: 255, g: 160, b: 60 }; // warm orange
        else if (cRand > 0.33) colorObj = { r: 100, g: 150, b: 255 }; // cool blue

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.5 + Math.random() * 1.0,
          vy: -(0.05 + Math.random() * 0.15), // upward drift
          baseAlpha: 0.15 + Math.random() * 0.35,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.01 + Math.random() * 0.02,
          wobblePhase: Math.random() * Math.PI * 2,
          wobbleAmount: 0.2 + Math.random() * 0.5,
          color: colorObj,
          originalX: Math.random() * width
        });
        particles[i].originalX = particles[i].x;
      }
    };

    // Draw Atmosphere Gradients
    const drawAtmosphere = (ctx, time) => {
      ctx.globalCompositeOperation = 'screen';

      // Warm orange glow
      const orangeX = width * 0.25 + Math.sin(time * 0.0005) * 50;
      const orangeY = height * 0.60 + Math.cos(time * 0.0004) * 50;
      const grad1 = ctx.createRadialGradient(orangeX, orangeY, 0, orangeX, orangeY, Math.max(width, height) * 0.5);
      grad1.addColorStop(0, 'rgba(255, 140, 50, 0.06)');
      grad1.addColorStop(1, 'rgba(255, 140, 50, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Cool blue glow
      const blueX = width * 0.75 + Math.cos(time * 0.0006) * 60;
      const blueY = height * 0.35 + Math.sin(time * 0.0005) * 60;
      const grad2 = ctx.createRadialGradient(blueX, blueY, 0, blueX, blueY, Math.max(width, height) * 0.6);
      grad2.addColorStop(0, 'rgba(40, 100, 255, 0.08)');
      grad2.addColorStop(1, 'rgba(40, 100, 255, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Faint white/silver glow
      const whiteX = width * 0.5 + Math.sin(time * 0.0003) * 40;
      const whiteY = height * 0.2 + Math.cos(time * 0.0003) * 40;
      const grad3 = ctx.createRadialGradient(whiteX, whiteY, 0, whiteX, whiteY, Math.max(width, height) * 0.4);
      grad3.addColorStop(0, 'rgba(200, 200, 220, 0.04)');
      grad3.addColorStop(1, 'rgba(200, 200, 220, 0)');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'source-over';
    };

    const render = () => {
      // Base: Pure black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      drawAtmosphere(ctx, time);

      // Draw Stars
      for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const currentAlpha = star.baseAlpha + Math.sin(star.twinklePhase + time * star.twinkleSpeed) * 0.2;
        const safeAlpha = Math.max(0, Math.min(1, currentAlpha));

        // Bright star halo
        if (star.isBright) {
          const haloGrad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 6);
          haloGrad.addColorStop(0, `rgba(255, 255, 255, ${safeAlpha * 0.3})`);
          haloGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(star.x, star.y, 6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = star.color;
        ctx.globalAlpha = safeAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Draw Particles
      for (const p of particles) {
        p.originalX += (Math.random() - 0.5) * 0.05; // extremely subtle drift of the center axis
        
        // Wobble and drift
        p.x = p.originalX + Math.sin(p.wobblePhase + time * p.wobbleSpeed) * p.wobbleAmount;
        p.y += p.vy;

        // Antigravity mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x += (dx / dist) * force * 2.0;
          p.y += (dy / dist) * force * 2.0;
          p.originalX = p.x; // Sync originalX to prevent snapping back
        }

        // Wrap vertically and horizontally
        if (p.y < -10) {
          p.y = height + 10;
          p.originalX = Math.random() * width;
          p.x = p.originalX;
        }
        if (p.x < 0) p.originalX = width;
        if (p.x > width) p.originalX = 0;

        const currentAlpha = p.baseAlpha + Math.sin(p.pulsePhase + time * p.pulseSpeed) * 0.15;
        const safeAlpha = Math.max(0, Math.min(1, currentAlpha));

        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${safeAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    // Initialize and start animation
    resizeCanvas();
    render();

    // Cleanup
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
      className="fixed inset-0 w-full h-full z-0"
      style={{ background: '#000' }}
    />
  );
}
