import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Play, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Terminal, 
  Server, 
  Activity, 
  Layers, 
  FileText, 
  ArrowDownCircle, 
  Radio, 
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import { fetchPipelineStatus, triggerPipeline, fetchSystemHealth } from '../../services/api';

export default function DataPipelineDashboard({ onRefreshCatalog, totalObjects }) {
  const [pipelineState, setPipelineState] = useState(null);
  const [healthState, setHealthState] = useState(null);
  const [isTriggering, setIsTriggering] = useState(false);
  const [logs, setLogs] = useState([]);
  const [pipelineFilter, setPipelineFilter] = useState('ALL');

  const loadPipelineTelemetry = async () => {
    try {
      const [status, health] = await Promise.all([
        fetchPipelineStatus(),
        fetchSystemHealth()
      ]);
      setPipelineState(status);
      setHealthState(health);
      if (status?.latestJob?.log_messages) {
        setLogs(status.latestJob.log_messages);
      }
    } catch (err) {
      console.warn('Failed to fetch pipeline telemetry:', err);
    }
  };

  useEffect(() => {
    loadPipelineTelemetry();
    const timer = setInterval(loadPipelineTelemetry, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleRunPipeline = async () => {
    setIsTriggering(true);
    try {
      const res = await triggerPipeline();
      if (res && res.logs) {
        setLogs(res.logs);
      }
      await loadPipelineTelemetry();
      if (onRefreshCatalog) onRefreshCatalog();
    } catch (e) {
      console.error(e);
    } finally {
      setIsTriggering(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER BANNER */}
      <div className="bg-cosmic-900/80 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-md relative overflow-hidden">
        <div className="hud-scanline"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-hud-emerald mb-1">
              <Server className="w-4 h-4 text-hud-emerald" />
              <span>OBSERVATORY BACKEND, DATABASE & DATA INGESTION PIPELINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Astrophysical Ingestion & Database Telemetry
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-sans mt-1 max-w-2xl">
              Real-time multi-stage ingestion pipeline, automated coordinate sanity validation, spectroscopic SED normalization, and persistent SQLite catalog storage.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleRunPipeline}
              disabled={isTriggering}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition flex items-center space-x-2 ${
                isTriggering
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-hud-cyan hover:bg-cyan-400 text-cosmic-950 shadow-lg shadow-cyan-500/20'
              }`}
            >
              {isTriggering ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Ingesting Telemetry...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Execute Pipeline Job</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* SYSTEM STATUS TELEMETRY TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        
        <div className="hud-bracket-card p-4 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px]">
            <span>NODE HEALTH</span>
            <span className="w-2 h-2 rounded-full bg-hud-emerald animate-ping"></span>
          </div>
          <div className="text-base font-bold text-hud-emerald">
            {healthState?.status || 'ONLINE'}
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            {healthState?.system || 'DARKMATTER Node'}
          </div>
        </div>

        <div className="hud-bracket-card p-4 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px]">
            <span>DATABASE ENGINE</span>
            <HardDrive className="w-3.5 h-3.5 text-hud-cyan" />
          </div>
          <div className="text-base font-bold text-white">
            {healthState?.database || 'SQLite3 (darkmatter.db)'}
          </div>
          <div className="text-[10px] text-slate-400">
            Persistent Disk Storage
          </div>
        </div>

        <div className="hud-bracket-card p-4 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px]">
            <span>ALL-SKY STELLAR INDEX</span>
            <Database className="w-3.5 h-3.5 text-hud-amber" />
          </div>
          <div className="text-base font-bold text-hud-amber">
            2,450,812 Discoveries
          </div>
          <div className="text-[10px] text-slate-400">
            Gaia DR3 & All-Sky Stream
          </div>
        </div>

        <div className="hud-bracket-card p-4 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px]">
            <span>PIPELINE ENGINE</span>
            <Activity className="w-3.5 h-3.5 text-hud-violet" />
          </div>
          <div className="text-base font-bold text-hud-violet">
            {pipelineState?.latestJob?.status || 'ACTIVE'}
          </div>
          <div className="text-[10px] text-slate-400">
            Processed: {pipelineState?.latestJob?.processed_count || totalObjects} targets
          </div>
        </div>

      </div>

      {/* PIPELINE ARCHITECTURE FLOW & LIVE LOG VIEWER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
        
        {/* PIPELINE STAGES OVERVIEW (1 COL) */}
        <div className="space-y-4">
          <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase flex items-center space-x-2">
              <Layers className="w-4 h-4 text-hud-cyan" />
              <span>Pipeline Architecture</span>
            </h3>

            <div className="space-y-3 text-xs">
              
              <div className="p-3 rounded-lg bg-cosmic-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-hud-cyan">
                  <span>STAGE 1: INGESTION</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-hud-cyan border border-cyan-800">SOURCE</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Pulls raw astrometric telemetry, light curves, and transit parameters from simulated NASA Exoplanet Archive, MAST & ADS endpoints.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-cosmic-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-hud-amber">
                  <span>STAGE 2: VALIDATION</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-hud-amber border border-amber-800">CHECKS</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Rigorous bounded checking of J2000 Right Ascension (0-360°) & Declination (-90 to +90°), physical density sanity, and energy conservation.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-cosmic-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-hud-violet">
                  <span>STAGE 3: ENRICHMENT</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-950 text-hud-violet border border-purple-800">NORMALIZER</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Cross-references literature DOIs, normalizes multi-wavelength spectral flux distributions, and computes astrophysical classifications.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-cosmic-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-hud-emerald">
                  <span>STAGE 4: PERSISTENCE</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-hud-emerald border border-emerald-800">SQLITE3</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Atomic transactional commit into local SQLite database tables with indexed search triggers.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* LIVE INGESTION LOG STREAM (2 COLS) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="hud-bracket-card p-5 rounded-xl bg-cosmic-900/90 border border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-hud-emerald" />
                <span>Live Pipeline Execution Log Stream</span>
              </h3>

              <button
                onClick={loadPipelineTelemetry}
                className="p-1.5 rounded-lg bg-cosmic-950 border border-slate-800 hover:border-hud-cyan text-slate-400 hover:text-hud-cyan text-xs flex items-center space-x-1"
                title="Refresh log stream"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="h-96 rounded-xl bg-cosmic-950 border border-slate-800 p-4 font-mono text-[11px] overflow-y-auto space-y-1 text-slate-300">
              {logs.length === 0 ? (
                <div className="text-slate-500 py-16 text-center">
                  Waiting for pipeline triggers. Click "Execute Pipeline Job" above to process candidate feeds.
                </div>
              ) : (
                logs.map((line, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <span className="text-slate-600 select-none">›</span>
                    <span className={
                      line.includes('[REJECTED]') || line.includes('[ERROR]') 
                        ? 'text-rose-400' 
                        : line.includes('[INSERT]') 
                        ? 'text-hud-emerald' 
                        : line.includes('[UPDATE]') 
                        ? 'text-hud-cyan' 
                        : 'text-slate-300'
                    }>
                      {line}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800">
              <div>Telemetry Node: <strong className="text-slate-400">127.0.0.1:3001</strong></div>
              <div>Database File: <strong className="text-slate-400">D:\DarkMatter\darkmatter.db</strong></div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
