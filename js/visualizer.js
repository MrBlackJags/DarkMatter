/**
 * DARKMATTER - Interactive Cosmic Sandbox & Dark Matter N-body Simulator
 * Visualizes Cosmic Web Filaments, Galaxy Rotation Curves, and Gravitational Lensing
 */

class CosmicVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.mode = 'galaxy'; // 'galaxy', 'filaments', 'lensing'
    this.darkMatterEnabled = true;
    this.particleCount = 550;
    this.particles = [];
    this.animationFrameId = null;
    this.isRunning = true;
    this.time = 0;

    this.mouse = {
      x: null,
      y: null,
      isDown: false,
      radius: 120
    };

    this.initCanvasSize();
    this.setupEventListeners();
    this.initParticles();
    this.animate();
  }

  initCanvasSize() {
    const parent = this.canvas.parentElement;
    const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth, height: 500 };
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || 520;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.initCanvasSize();
      this.initParticles();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
      this.mouse.isDown = false;
    });

    this.canvas.addEventListener('mousedown', () => {
      this.mouse.isDown = true;
    });

    this.canvas.addEventListener('mouseup', () => {
      this.mouse.isDown = false;
    });

    // Touch support for mobile
    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.touches[0].clientX - rect.left;
        this.mouse.y = e.touches[0].clientY - rect.top;
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  setMode(newMode) {
    this.mode = newMode;
    this.initParticles();
  }

  setDarkMatter(enabled) {
    this.darkMatterEnabled = enabled;
  }

  setParticleCount(count) {
    this.particleCount = parseInt(count, 10);
    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    if (this.mode === 'galaxy') {
      // Spiral Galaxy with arms and halo
      const arms = 2;
      const armSpread = 0.5;

      for (let i = 0; i < this.particleCount; i++) {
        const isCore = Math.random() < 0.15;
        const isDarkMatterParticle = Math.random() < 0.25;
        const armIndex = i % arms;
        const armOffset = (armIndex * (2 * Math.PI / arms));

        let distance, angle, size, color, speed;

        if (isCore) {
          distance = Math.random() * (Math.min(this.width, this.height) * 0.08);
          angle = Math.random() * Math.PI * 2;
          size = Math.random() * 2 + 1.2;
          color = 'rgba(255, 235, 180, 0.9)';
          speed = 0.025;
        } else if (isDarkMatterParticle) {
          // Spherical Dark Matter Halo particles (subtle bluish purple)
          distance = Math.random() * (Math.min(this.width, this.height) * 0.42);
          angle = Math.random() * Math.PI * 2;
          size = Math.random() * 1.5 + 0.5;
          color = 'rgba(129, 140, 248, 0.45)';
          speed = 0.008;
        } else {
          // Spiral Arm stars
          const rFrac = Math.pow(Math.random(), 0.85);
          distance = 25 + rFrac * (Math.min(this.width, this.height) * 0.38);
          const spiralAngle = distance * 0.035;
          angle = armOffset + spiralAngle + (Math.random() - 0.5) * armSpread;
          size = Math.random() * 1.8 + 0.8;
          color = Math.random() > 0.4 ? 'rgba(56, 189, 248, 0.85)' : 'rgba(238, 242, 255, 0.9)';
          speed = 0.012;
        }

        this.particles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          distance,
          angle,
          speed,
          size,
          color,
          isCore,
          isDarkMatterParticle
        });
      }
    } else if (this.mode === 'filaments') {
      // Cosmic Web - Filamentary structure
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 2 + 0.6,
          mass: Math.random() * 2 + 1,
          color: Math.random() > 0.3 ? 'rgba(168, 85, 247, 0.75)' : 'rgba(6, 182, 212, 0.85)'
        });
      }
    } else if (this.mode === 'lensing') {
      // Background star grid being lensed by central black hole
      const cols = 26;
      const rows = 18;
      const spacingX = this.width / cols;
      const spacingY = this.height / rows;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          this.particles.push({
            origX: (c + 0.5) * spacingX + (Math.random() - 0.5) * 8,
            origY: (r + 0.5) * spacingY + (Math.random() - 0.5) * 8,
            x: (c + 0.5) * spacingX,
            y: (r + 0.5) * spacingY,
            size: Math.random() * 1.8 + 1,
            color: Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.8)' : 'rgba(186, 230, 253, 0.8)'
          });
        }
      }
    }
  }

  animate() {
    if (!this.isRunning) return;
    this.time += 0.016;

    this.ctx.fillStyle = 'rgba(6, 7, 13, 0.28)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    const centerX = this.width / 2;
    const centerY = this.height / 2;

    if (this.mode === 'galaxy') {
      this.renderGalaxyMode(centerX, centerY);
    } else if (this.mode === 'filaments') {
      this.renderFilamentsMode(centerX, centerY);
    } else if (this.mode === 'lensing') {
      this.renderLensingMode(centerX, centerY);
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  renderGalaxyMode(centerX, centerY) {
    // Galactic Core Glow
    const coreGrad = this.ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 70);
    coreGrad.addColorStop(0, 'rgba(254, 240, 138, 0.8)');
    coreGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.35)');
    coreGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.1)');
    coreGrad.addColorStop(1, 'rgba(6, 7, 13, 0)');
    this.ctx.fillStyle = coreGrad;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
    this.ctx.fill();

    // Dark Matter Halo visualizer boundary
    if (this.darkMatterEnabled) {
      this.ctx.save();
      this.ctx.strokeStyle = 'rgba(99, 102, 241, 0.12)';
      this.ctx.lineWidth = 1.5;
      this.ctx.setLineDash([4, 6]);
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, Math.min(this.width, this.height) * 0.4, 0, Math.PI * 2);
      this.ctx.stroke();

      this.ctx.fillStyle = 'rgba(129, 140, 248, 0.6)';
      this.ctx.font = '11px monospace';
      this.ctx.fillText('EXTENDED DARK MATTER HALO (FLAT v ≈ const)', centerX - 130, centerY - (Math.min(this.width, this.height) * 0.4) - 8);
      this.ctx.restore();
    } else {
      this.ctx.save();
      this.ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
      this.ctx.font = '11px monospace';
      this.ctx.fillText('KEPLERIAN REGIME (NO DARK MATTER: v ∝ 1/√r)', centerX - 120, centerY - (Math.min(this.width, this.height) * 0.4) - 8);
      this.ctx.restore();
    }

    for (let p of this.particles) {
      // Rotation velocity physics:
      // With Dark Matter: Flat rotation curve (v ≈ const => angular velocity w = v / r => 1/r)
      // Without Dark Matter: Keplerian falloff (v ∝ 1 / sqrt(r) => angular velocity w = v / r => 1 / r^1.5)
      let orbitalSpeed;
      if (this.darkMatterEnabled) {
        orbitalSpeed = 1.8 / (p.distance + 40);
      } else {
        orbitalSpeed = 7.5 / Math.pow(p.distance + 20, 1.45);
      }

      p.angle += orbitalSpeed * 0.45;

      // Mouse interaction (Gravitational pull / disturbance)
      let posX = centerX + Math.cos(p.angle) * p.distance;
      let posY = centerY + Math.sin(p.angle) * p.distance;

      if (this.mouse.x !== null) {
        const dx = posX - this.mouse.x;
        const dy = posY - this.mouse.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distToMouse < this.mouse.radius && distToMouse > 0) {
          const force = (1 - distToMouse / this.mouse.radius) * 15;
          posX += (dx / distToMouse) * force;
          posY += (dy / distToMouse) * force;
        }
      }

      this.ctx.beginPath();
      this.ctx.arc(posX, posY, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
    }
  }

  renderFilamentsMode(centerX, centerY) {
    const maxLinkDist = 80;
    const attractorX = this.mouse.x !== null ? this.mouse.x : centerX;
    const attractorY = this.mouse.y !== null ? this.mouse.y : centerY;

    // Draw Attractor indicator
    this.ctx.beginPath();
    this.ctx.arc(attractorX, attractorY, 12, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    this.ctx.stroke();

    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];

      // Gravitational pull to cosmic attractor
      const dx = attractorX - p.x;
      const dy = attractorY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 40;
      const force = (this.darkMatterEnabled ? 120 : 30) / (dist * dist);

      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;

      // Damping
      p.vx *= 0.985;
      p.vy *= 0.985;

      p.x += p.vx;
      p.y += p.vy;

      // Boundary wraps
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();

      // Connect filaments to nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        let p2 = this.particles[j];
        const fdx = p.x - p2.x;
        const fdy = p.y - p2.y;
        const fdist = Math.sqrt(fdx * fdx + fdy * fdy);

        if (fdist < maxLinkDist) {
          const alpha = (1 - fdist / maxLinkDist) * 0.28;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(147, 51, 234, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }
  }

  renderLensingMode(centerX, centerY) {
    const lensX = this.mouse.x !== null ? this.mouse.x : centerX;
    const lensY = this.mouse.y !== null ? this.mouse.y : centerY;
    const einsteinRadius = 75; // Einstein ring radius
    const schwarzschildRadius = 24;

    // Einstein Ring guide
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([3, 4]);
    this.ctx.beginPath();
    this.ctx.arc(lensX, lensY, einsteinRadius, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();

    for (let p of this.particles) {
      const dx = p.origX - lensX;
      const dy = p.origY - lensY;
      const r = Math.sqrt(dx * dx + dy * dy);

      let lensedX = p.origX;
      let lensedY = p.origY;
      let brightness = 1.0;

      if (r > 1) {
        // Gravitational deflection angle: alpha = 4GM / (c^2 r) = theta_E^2 / r
        const deflection = (einsteinRadius * einsteinRadius) / (r + 15);
        lensedX = lensX + (dx / r) * (r + deflection);
        lensedY = lensY + (dy / r) * (r + deflection);

        // Magnification near Einstein radius
        const dr = Math.abs(r - einsteinRadius);
        if (dr < 30) {
          brightness = 1.0 + (1 - dr / 30) * 1.5;
        }
      }

      this.ctx.beginPath();
      this.ctx.arc(lensedX, lensedY, p.size * (brightness > 1.2 ? 1.4 : 1.0), 0, Math.PI * 2);
      this.ctx.fillStyle = brightness > 1.2 ? 'rgba(255, 255, 255, 0.95)' : p.color;
      this.ctx.fill();
    }

    // Black Hole Event Horizon & Photon Ring
    const bhGrad = this.ctx.createRadialGradient(lensX, lensY, 0, lensX, lensY, schwarzschildRadius * 1.8);
    bhGrad.addColorStop(0, '#000000');
    bhGrad.addColorStop(0.6, '#000000');
    bhGrad.addColorStop(0.85, 'rgba(251, 146, 60, 0.85)');
    bhGrad.addColorStop(1, 'rgba(244, 63, 94, 0)');

    this.ctx.fillStyle = bhGrad;
    this.ctx.beginPath();
    this.ctx.arc(lensX, lensY, schwarzschildRadius * 1.8, 0, Math.PI * 2);
    this.ctx.fill();

    // Central Singularity shadow
    this.ctx.fillStyle = '#000000';
    this.ctx.beginPath();
    this.ctx.arc(lensX, lensY, schwarzschildRadius, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.fillStyle = '#38bdf8';
    this.ctx.font = '10px monospace';
    this.ctx.fillText('PHOTON SPHERE (r = 1.5 Rs)', lensX - 70, lensY + schwarzschildRadius + 18);
  }

  togglePlay(play) {
    this.isRunning = play !== undefined ? play : !this.isRunning;
    if (this.isRunning) this.animate();
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

if (typeof window !== 'undefined') {
  window.CosmicVisualizer = CosmicVisualizer;
}
