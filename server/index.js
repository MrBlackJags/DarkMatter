import express from 'express';
import cors from 'cors';
import { dbRun, dbAll, dbGet, initDatabase } from './db.js';
import { pipelineInstance } from './pipeline.js';
import { DISCOVERED_OBJECTS } from '../src/data/discoveredObjects.js';
import { queryStellarDiscoveries, STELLAR_SURVEYS, TOTAL_STELLAR_DISCOVERIES_COUNT } from '../src/data/stellarSurveys.js';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString().slice(11, 19);
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Helper to deserialize an object row from database
function formatObjectRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    designation: row.designation,
    class: row.class,
    subType: row.sub_type,
    discoveryYear: row.discovery_year,
    discoveryMission: row.discovery_mission,
    discoveryInstrument: row.discovery_instrument,
    discoveryMethod: row.discovery_method,
    constellation: row.constellation,
    coordinates: {
      ra: row.ra,
      dec: row.dec,
      raDeg: row.ra_deg,
      decDeg: row.dec_deg
    },
    distance: row.distance_json ? JSON.parse(row.distance_json) : {},
    physics: row.physics_json ? JSON.parse(row.physics_json) : {},
    spectralBands: row.spectral_bands_json ? JSON.parse(row.spectral_bands_json) : {},
    spectralLines: row.spectral_lines_json ? JSON.parse(row.spectral_lines_json) : [],
    keyDiscoveries: row.key_discoveries_json ? JSON.parse(row.key_discoveries_json) : [],
    researchPapers: row.research_papers_json ? JSON.parse(row.research_papers_json) : [],
    image: row.image_url || row.image || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

// ----------------------------------------------------
// Health & Diagnostics
// ----------------------------------------------------
app.get('/api/health', async (req, res) => {
  try {
    const objCount = await dbGet('SELECT COUNT(*) as count FROM objects');
    res.json({
      status: 'ONLINE',
      system: 'DARKMATTER Telemetry Ingestion Node',
      timestamp: new Date().toISOString(),
      database: 'Connected (SQLite3)',
      activeObjects: objCount ? objCount.count : 0
    });
  } catch (err) {
    res.status(500).json({ status: 'DEGRADED', error: err.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const totalRow = await dbGet('SELECT COUNT(*) as count FROM objects');
    const classRows = await dbAll('SELECT class, COUNT(*) as count FROM objects GROUP BY class');
    const missionRows = await dbAll('SELECT discovery_mission, COUNT(*) as count FROM objects GROUP BY discovery_mission ORDER BY count DESC LIMIT 6');
    const jobRows = await dbAll('SELECT * FROM pipeline_jobs ORDER BY started_at DESC LIMIT 5');

    res.json({
      totalObjects: totalRow ? totalRow.count : 0,
      totalStellarDiscoveries: TOTAL_STELLAR_DISCOVERIES_COUNT,
      stellarSurveys: STELLAR_SURVEYS,
      byClass: classRows,
      topMissions: missionRows,
      recentJobs: jobRows.map(j => ({
        ...j,
        log_messages: j.log_messages ? JSON.parse(j.log_messages) : []
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// All-Sky Stellar Discoveries API (Millions of Stars)
// ----------------------------------------------------
app.get('/api/stellar-surveys', (req, res) => {
  try {
    const { 
      search, 
      spectralClass = 'all', 
      constellation = 'all', 
      survey = 'all', 
      distanceRange = 'all',
      sortBy = 'distance-asc', 
      page = 1, 
      pageSize = 24 
    } = req.query;

    const result = queryStellarDiscoveries({
      searchQuery: search || '',
      spectralClass,
      constellation,
      survey,
      distanceRange,
      sortBy,
      page: Number(page) || 1,
      pageSize: Number(pageSize) || 24
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stellar-surveys/overview', (req, res) => {
  res.json({
    totalIndexedStars: TOTAL_STELLAR_DISCOVERIES_COUNT,
    surveys: STELLAR_SURVEYS,
    status: 'ONLINE',
    description: 'All-Sky high-cadence stellar astrometry & photometric database'
  });
});


// ----------------------------------------------------
// Catalog Objects API
// ----------------------------------------------------
app.get('/api/objects', async (req, res) => {
  try {
    const { class: cls, mission, search, sortBy } = req.query;
    let sql = 'SELECT * FROM objects WHERE 1=1';
    const params = [];

    if (cls && cls !== 'all') {
      sql += ' AND class = ?';
      params.push(cls);
    }
    if (mission && mission !== 'all') {
      sql += ' AND discovery_mission = ?';
      params.push(mission);
    }
    if (search) {
      sql += ' AND (name LIKE ? OR designation LIKE ? OR constellation LIKE ? OR discovery_mission LIKE ? OR sub_type LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s, s, s);
    }

    if (sortBy === 'year-asc') {
      sql += ' ORDER BY discovery_year ASC';
    } else if (sortBy === 'name') {
      sql += ' ORDER BY name ASC';
    } else {
      sql += ' ORDER BY discovery_year DESC';
    }

    const rows = await dbAll(sql, params);
    res.json({
      count: rows.length,
      objects: rows.map(formatObjectRow)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/objects/:id', async (req, res) => {
  try {
    const row = await dbGet('SELECT * FROM objects WHERE id = ?', [req.params.id]);
    if (!row) return res.status(404).json({ error: 'Celestial object not found in catalog' });
    res.json(formatObjectRow(row));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/objects', async (req, res) => {
  try {
    const obj = req.body;
    if (!obj.name) return res.status(400).json({ error: 'Object name is required' });

    const id = obj.id || `custom-${Date.now()}`;
    await dbRun(`
      INSERT INTO objects (
        id, name, designation, class, sub_type, discovery_year, discovery_mission,
        discovery_instrument, discovery_method, constellation, ra, dec, ra_deg, dec_deg,
        distance_json, physics_json, spectral_bands_json, spectral_lines_json,
        key_discoveries_json, research_papers_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      id,
      obj.name,
      obj.designation || obj.name,
      obj.class || 'exoplanet',
      obj.subType || 'User Discovery Target',
      obj.discoveryYear || new Date().getFullYear(),
      obj.discoveryMission || 'Independent Observatory Survey',
      obj.discoveryInstrument || 'Optical/Infrared Spectrometer',
      obj.discoveryMethod || 'Transit Photometry',
      obj.constellation || 'Unspecified',
      obj.coordinates?.ra || '00h 00m 00s',
      obj.coordinates?.dec || '+00° 00′ 00″',
      obj.coordinates?.raDeg ?? (Math.random() * 360),
      obj.coordinates?.decDeg ?? ((Math.random() - 0.5) * 160),
      JSON.stringify(obj.distance || {}),
      JSON.stringify(obj.physics || {}),
      JSON.stringify(obj.spectralBands || { radio: 10, infrared: 50, optical: 50, ultraviolet: 10, xray: 0, gamma: 0, gravitational: 0 }),
      JSON.stringify(obj.spectralLines || []),
      JSON.stringify(obj.keyDiscoveries || ['Cataloged into darkmatter observatory archive.']),
      JSON.stringify(obj.researchPapers || [])
    ]);

    const created = await dbGet('SELECT * FROM objects WHERE id = ?', [id]);
    res.status(201).json(formatObjectRow(created));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/objects/:id', async (req, res) => {
  try {
    const result = await dbRun('DELETE FROM objects WHERE id = ?', [req.params.id]);
    if (result.changes === 0) return res.status(404).json({ error: 'Object not found' });
    res.json({ message: `Object ${req.params.id} removed from catalog` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Data Pipelining API
// ----------------------------------------------------
app.get('/api/pipeline/status', async (req, res) => {
  try {
    const latestJob = await dbGet('SELECT * FROM pipeline_jobs ORDER BY started_at DESC LIMIT 1');
    res.json({
      active: pipelineInstance.activeJob,
      latestJob: latestJob ? {
        ...latestJob,
        log_messages: latestJob.log_messages ? JSON.parse(latestJob.log_messages) : []
      } : null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/pipeline/run', async (req, res) => {
  try {
    const { candidates, mode } = req.body;
    let targets = candidates;

    // If no custom candidates provided, run ingestion check using the master curated list
    if (!targets || targets.length === 0) {
      targets = DISCOVERED_OBJECTS;
    }

    const jobResult = await pipelineInstance.runPipeline(targets);
    res.json(jobResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Calculators API (History & Calculation Logs)
// ----------------------------------------------------
app.get('/api/calculators/history', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM calculation_history ORDER BY created_at DESC LIMIT 50');
    res.json(rows.map(r => ({
      id: r.id,
      category: r.category,
      calculatorId: r.calculator_id,
      calculatorName: r.calculator_name,
      inputs: JSON.parse(r.inputs_json),
      outputs: JSON.parse(r.outputs_json),
      createdAt: r.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/calculators/history', async (req, res) => {
  try {
    const { category, calculatorId, calculatorName, inputs, outputs } = req.body;
    const id = randomUUID();
    await dbRun(`
      INSERT INTO calculation_history (id, category, calculator_id, calculator_name, inputs_json, outputs_json)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [id, category || 'Astrophysics', calculatorId || 'calc', calculatorName || 'Space Calculator', JSON.stringify(inputs || {}), JSON.stringify(outputs || {})]);

    res.status(201).json({ id, message: 'Calculation saved to observatory logs' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Simulation State & Presets API
// ----------------------------------------------------
app.get('/api/simulation/presets', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM simulation_presets ORDER BY created_at DESC');
    res.json(rows.map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      config: JSON.parse(r.config_json),
      createdAt: r.created_at
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/simulation/save', async (req, res) => {
  try {
    const { name, description, config } = req.body;
    const id = randomUUID();
    await dbRun(`
      INSERT INTO simulation_presets (id, name, description, config_json)
      VALUES (?, ?, ?, ?)
    `, [id, name || 'Custom Orbit Simulation', description || '', JSON.stringify(config || {})]);

    res.status(201).json({ id, message: 'Orbital simulation state saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// Static Frontend Serving (Enables launch on :3001)
// ----------------------------------------------------
const distPath = path.resolve(__dirname, '../dist');
const rootPath = path.resolve(__dirname, '..');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.use(express.static(rootPath));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
    res.sendFile(path.join(rootPath, 'index.html'));
  });
}

// Start Server & Initialize Database
async function startServer() {
  try {
    await initDatabase(DISCOVERED_OBJECTS);
    app.listen(PORT, () => {
      console.log(`[+] DARKMATTER Observatory API Server listening on port ${PORT}`);
      console.log(`[+] API Endpoints available at http://localhost:${PORT}/api/`);
    });
  } catch (err) {
    console.error('[-] Fatal error starting server:', err);
  }
}

startServer();
