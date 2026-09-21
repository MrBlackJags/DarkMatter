import React, { useState, useRef, useEffect } from 'react';
import { Compass, Crosshair, ZoomIn, ZoomOut, RotateCcw, Target } from 'lucide-react';

export default function SkyCoordinateRadar({ objects, onSelectObject }) {
  const canvasRef = useRef(null);
  const [hoveredObj, setHoveredObj] = useState(null);
  const [cursorCoords, setCursorCoords] = useState({ raH: '12h 00m', decDeg: '+00° 00′' });
  const [radarAngle, setRadarAngle] = useState(0);

  // Radar sweep loop
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setRadarAngle(prev => (prev + 0.5) % 360);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Render Canvas Sky Radar
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear with deep space tint
    ctx.fillStyle = '#040713';
    ctx.fillRect(0, 0, width, height);

    // Draw Astrometric Grid (RA & Dec)
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 1;

    // RA Grid Lines (hours 0h to 24h)
    for (let h = 0; h <= 24; h += 3) {
      const x = (h / 24) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

      ctx.fillStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.font = '9px monospace';
      ctx.fillText(`${h}h`, x + 4, height - 6);
    }

    // Dec Grid Lines (-90 to +90)
    for (let d = -60; d <= 60; d += 30) {
      const y = height / 2 - (d / 90) * (height / 2);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      ctx.fillStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.font = '9px monospace';
      ctx.fillText(`${d > 0 ? '+' : ''}${d}°`, 6, y - 3);
    }

    // Celestial Equator (Dec = 0)
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillText('CELESTIAL EQUATOR (δ = 0°)', width / 2 - 60, height / 2 - 6);

    // Plot Objects
    objects.forEach(obj => {
      // Convert RA (0-360 deg) and Dec (-90 to +90 deg) to canvas x, y
      const x = (obj.coordinates.raDeg / 360) * width;
      const y = height / 2 - (obj.coordinates.decDeg / 90) * (height / 2);

      const isHovered = hoveredObj && hoveredObj.id === obj.id;

      // Outer targeting ring
      ctx.beginPath();
      ctx.arc(x, y, isHovered ? 10 : 5, 0, Math.PI * 2);
      ctx.strokeStyle = getObjectColor(obj.class);
      ctx.lineWidth = isHovered ? 2 : 1.2;
      ctx.stroke();

      // Center glowing pip
      ctx.beginPath();
      ctx.arc(x, y, isHovered ? 4 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? '#ffffff' : getObjectColor(obj.class);
      ctx.fill();

      // Label on hover
      if (isHovered) {
        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(obj.name, x + 12, y - 5);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px monospace';
        ctx.fillText(`${obj.coordinates.ra} | ${obj.coordinates.dec}`, x + 12, y + 8);
      }
    });

  }, [objects, hoveredObj, radarAngle]);

  // Handle Mouse Move over Radar
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    // Convert to RA and Dec
    const raHours = (x / canvas.width) * 24;
    const decVal = (1 - (y / (canvas.height / 2))) * 90;
    setCursorCoords({
      raH: `${Math.floor(raHours)}h ${Math.floor((raHours % 1) * 60)}m`,
      decDeg: `${decVal >= 0 ? '+' : ''}${decVal.toFixed(1)}°`
    });

    // Check collision with objects
    let found = null;
    objects.forEach(obj => {
      const ox = (obj.coordinates.raDeg / 360) * canvas.width;
      const oy = canvas.height / 2 - (obj.coordinates.decDeg / 90) * (canvas.height / 2);
      const dist = Math.sqrt((x - ox) ** 2 + (y - oy) ** 2);
      if (dist < 15) {
        found = obj;
      }
    });
    setHoveredObj(found);
  };

  const handleClick = () => {
    if (hoveredObj) {
      onSelectObject(hoveredObj);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Astrometric Header */}
      <div className="bg-cosmic-900/60 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div>
          <div className="text-hud-cyan font-bold flex items-center space-x-2 text-sm">
            <Crosshair className="w-4 h-4 text-hud-cyan animate-pulse" />
            <span>CELESTIAL EQUATORIAL RADAR PROJECTION (J2000.0)</span>
          </div>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Plotting all {objects.length} verified discoveries across the celestial sphere. Hover over any target crosshair to read coordinates and inspect research.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-cosmic-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <div>
            <span className="text-slate-500 block text-[9px]">CURSOR RA</span>
            <span className="text-hud-cyan font-bold">{cursorCoords.raH}</span>
          </div>
          <div className="h-6 w-px bg-slate-800"></div>
          <div>
            <span className="text-slate-500 block text-[9px]">CURSOR DEC</span>
            <span className="text-hud-cyan font-bold">{cursorCoords.decDeg}</span>
          </div>
        </div>
      </div>

      {/* Interactive Radar Canvas Container */}
      <div className="hud-bracket-card p-2 rounded-xl overflow-hidden relative cursor-crosshair">
        <canvas 
          ref={canvasRef}
          width={1000}
          height={480}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredObj(null)}
          onClick={handleClick}
          className="w-full h-[380px] sm:h-[460px] rounded-lg block"
        />

        {/* Floating Target Inspector Tooltip */}
        {hoveredObj && (
          <div 
            className="absolute top-4 right-4 p-3.5 rounded-lg bg-cosmic-950/95 border border-hud-cyan/50 text-xs font-mono shadow-2xl space-y-1 pointer-events-none max-w-xs animate-fadeIn"
          >
            <div className="flex items-center justify-between">
              <span className="text-hud-cyan font-bold text-sm">{hoveredObj.name}</span>
              <span className="text-[10px] text-slate-400">CLICK TO INSPECT</span>
            </div>
            <div className="text-slate-300 text-[11px]">{hoveredObj.subType}</div>
            <div className="text-slate-400 text-[10px] pt-1 border-t border-slate-800">
              RA: <strong className="text-slate-200">{hoveredObj.coordinates.ra}</strong> | Dec: <strong className="text-slate-200">{hoveredObj.coordinates.dec}</strong>
            </div>
            <div className="text-hud-emerald text-[10px]">
              Mission: {hoveredObj.discoveryMission} ({hoveredObj.discoveryYear})
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="p-3 bg-cosmic-900/40 rounded-xl border border-slate-800 flex flex-wrap gap-4 text-xs font-mono text-slate-400 justify-center">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-hud-cyan"></span>
          <span>Exoplanet</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
          <span>Black Hole / Merger</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>Deep Galaxy</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Pulsar / Magnetar</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span>Interstellar / KBO</span>
        </div>
      </div>

    </div>
  );
}

function getObjectColor(cls) {
  switch (cls) {
    case 'exoplanet': return '#00f0ff';
    case 'blackhole': return '#a855f7';
    case 'galaxy': return '#ffaa00';
    case 'pulsar': return '#00ff88';
    case 'interstellar': return '#ff3366';
    default: return '#cbd5e1';
  }
}
