import express from 'express';
import cors from 'cors';
import { dbRun, dbAll, dbGet, initDatabase, getDatabaseMetrics, closeDatabase } from './db.js';
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
const startTime = Date.now();
let requestCount = 0;

// Simple in-memory TTL cache for high-cadence read endpoints
const apiCache = new Map();
function getCached(key, ttlMs = 10000) {
  const item = apiCache.get(key);
  if (!item) return null;
  if (Date.now() - item.time > ttlMs) {
    apiCache.delete(key);
    return null;
  }
  return item.data;
}
function setCached(key, data) {
  apiCache.set(key, { data, time: Date.now() });
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Request logging & metrics middleware
app.use((req, res, next) => {
  requestCount++;
  const timestamp = new Date().toISOString().slice(11, 19);
  console.log(`[${timestamp}] #${requestCount} ${req.method} ${req.originalUrl}`);
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
app.get('/api', async (req, res) => {
  const uptimeSec = Math.floor((Date.now() - startTime) / 1000);
  const dbMetrics = await getDatabaseMetrics().catch(() => ({}));
  res.json({
    name: 'DARKMATTER Observatory API Engine',
    version: '2.5.0',
    status: 'ONLINE',
    uptimeSeconds: uptimeSec,
    requestsProcessed: requestCount,
    curatedCatalogCount: dbMetrics?.tables?.objects || DISCOVERED_OBJECTS.length,
    stellarSurveyCount: TOTAL_STELLAR_DISCOVERIES_COUNT,
    endpoints: [
      { path: '/api/health', method: 'GET', description: 'System health check' },
      { path: '/api/system/metrics', method: 'GET', description: 'Telemetry and server performance metrics' },
      { path: '/api/stats', method: 'GET', description: 'Catalog and mission distribution statistics' },
      { path: '/api/objects', method: 'GET', description: 'Curated deep-sky object catalog with search, filter, pagination' },
      { path: '/api/objects/export', method: 'GET', description: 'Export full deep-space catalog data in JSON' },
      { path: '/api/discoveries/missions', method: 'GET', description: 'Discovery breakdown by space telescopes (Kepler, TESS, etc.)' },
      { path: '/api/discoveries/exoplanets', method: 'GET', description: 'Specialized exoplanetary discoveries catalog' },
      { path: '/api/stellar-surveys', method: 'GET', description: 'Query 2.4M+ stars from Gaia DR3, Kepler KIC, TESS TIC' },
      { path: '/api/search', method: 'GET', description: 'Unified all-sky search across all catalogs' },
      { path: '/api/calculators/history', method: 'GET/POST', description: 'Astrophysical calculator execution logs' },
      { path: '/api/simulation/presets', method: 'GET/POST', description: 'Gravity simulator saved orbits and states' },
      { path: '/api/pipeline/status', method: 'GET/POST', description: 'Telemetry pipeline ingestion orchestrator' }
    ]
  });
});

app.get('/api/health', async (req, res) => {
  try {
    const objCount = await dbGet('SELECT COUNT(*) as count FROM objects');
    const uptimeSec = Math.floor((Date.now() - startTime) / 1000);
    res.json({
      status: 'ONLINE',
      system: 'DARKMATTER Telemetry Ingestion Node v2.5',
      uptimeSeconds: uptimeSec,
      requestsServed: requestCount,
      timestamp: new Date().toISOString(),
      database: 'Connected (SQLite3 WAL-mode)',
      activeObjects: objCount ? objCount.count : 0
    });
  } catch (err) {
    res.status(500).json({ status: 'DEGRADED', error: err.message });
  }
});

app.get('/api/system/metrics', async (req, res) => {
  try {
    const memory = process.memoryUsage();
    const dbMetrics = await getDatabaseMetrics().catch(() => ({}));
    const uptimeSec = Math.floor((Date.now() - startTime) / 1000);

    res.json({
      process: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        pid: process.pid,
        uptimeSeconds: uptimeSec,
        totalRequests: requestCount
      },
      memory: {
        rssMb: Math.round(memory.rss / (1024 * 1024) * 100) / 100,
        heapUsedMb: Math.round(memory.heapUsed / (1024 * 1024) * 100) / 100,
        heapTotalMb: Math.round(memory.heapTotal / (1024 * 1024) * 100) / 100,
        externalMb: Math.round(memory.external / (1024 * 1024) * 100) / 100
      },
      database: dbMetrics,
      cacheSize: apiCache.size
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const cacheKey = 'stats_overview';
    const cached = getCached(cacheKey, 15000);
    if (cached) return res.json(cached);

    const totalRow = await dbGet('SELECT COUNT(*) as count FROM objects');
    const classRows = await dbAll('SELECT class, COUNT(*) as count FROM objects GROUP BY class ORDER BY count DESC');
    const missionRows = await dbAll('SELECT discovery_mission, COUNT(*) as count FROM objects GROUP BY discovery_mission ORDER BY count DESC LIMIT 10');
    const yearRows = await dbAll('SELECT discovery_year, COUNT(*) as count FROM objects WHERE discovery_year IS NOT NULL GROUP BY discovery_year ORDER BY discovery_year DESC LIMIT 15');
    const jobRows = await dbAll('SELECT * FROM pipeline_jobs ORDER BY started_at DESC LIMIT 5');

    const result = {
      totalObjects: totalRow ? totalRow.count : 0,
      totalStellarDiscoveries: TOTAL_STELLAR_DISCOVERIES_COUNT,
      stellarSurveys: STELLAR_SURVEYS,
      byClass: classRows,
      topMissions: missionRows,
      byYear: yearRows,
      recentJobs: jobRows.map(j => ({
        ...j,
        log_messages: j.log_messages ? JSON.parse(j.log_messages) : []
      }))
    };

    setCached(cacheKey, result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Specialized Mission Breakdown API
app.get('/api/discoveries/missions', async (req, res) => {
  try {
    const rows = await dbAll(`
      SELECT 
        discovery_mission as mission,
        COUNT(*) as count,
        MIN(discovery_year) as earliestYear,
        MAX(discovery_year) as latestYear
      FROM objects 
      GROUP BY discovery_mission 
      ORDER BY count DESC
    `);

    // Group by major telescope categories
    const categories = {
      kepler: rows.filter(r => /kepler/i.test(r.mission)),
      tess: rows.filter(r => /tess/i.test(r.mission)),
      jwst: rows.filter(r => /jwst|webb/i.test(r.mission)),
      hubble: rows.filter(r => /hubble|hst/i.test(r.mission)),
      corot: rows.filter(r => /corot/i.test(r.mission)),
      ligoVirgo: rows.filter(r => /ligo|virgo/i.test(r.mission)),
      groundObservatories: rows.filter(r => !/kepler|tess|jwst|webb|hubble|hst|corot|ligo|virgo/i.test(r.mission))
    };

    res.json({
      summary: {
        totalMissionsIndexed: rows.length,
        keplerCount: categories.kepler.reduce((sum, r) => sum + r.count, 0),
        tessCount: categories.tess.reduce((sum, r) => sum + r.count, 0),
        jwstCount: categories.jwst.reduce((sum, r) => sum + r.count, 0),
        corotCount: categories.corot.reduce((sum, r) => sum + r.count, 0)
      },
      categories,
      allMissions: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Specialized Exoplanetary Science API
app.get('/api/discoveries/exoplanets', async (req, res) => {
  try {
    const rows = await dbAll(`SELECT * FROM objects WHERE class = 'exoplanet' ORDER BY discovery_year DESC`);
    const formatted = rows.map(formatObjectRow);

    const habitableZone = formatted.filter(o => 
      /habitable/i.test(o.subType) || 
      /habitable/i.test(o.keyDiscoveries?.join(' ') || '')
    );

    const rocky = formatted.filter(o => 
      /rocky|earth|super-earth|lava|mercury/i.test(o.subType)
    );

    const gasGiants = formatted.filter(o => 
      /jupiter|saturn|gas|chthonian/i.test(o.subType)
    );

    res.json({
      count: formatted.length,
      breakdown: {
        habitableZoneCandidateCount: habitableZone.length,
        rockyTerrestrialCount: rocky.length,
        gasGiantHotJupiterCount: gasGiants.length
      },
      habitableZonePlanets: habitableZone.map(p => ({
        id: p.id,
        name: p.name,
        designation: p.designation,
        mission: p.discoveryMission,
        year: p.discoveryYear,
        distance: p.distance,
        physics: p.physics
      })),
      allExoplanets: formatted
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
// Catalog Objects API (Advanced Search, Filtering, Pagination)
// ----------------------------------------------------
app.get('/api/objects', async (req, res) => {
  try {
    const { 
      class: cls, 
      mission, 
      constellation,
      yearFrom,
      yearTo,
      search, 
      sortBy = 'year-desc',
      page,
      limit,
      pageSize
    } = req.query;

    let sql = 'SELECT * FROM objects WHERE 1=1';
    let countSql = 'SELECT COUNT(*) as count FROM objects WHERE 1=1';
    const params = [];
    const countParams = [];

    if (cls && cls !== 'all') {
      sql += ' AND class = ?';
      countSql += ' AND class = ?';
      params.push(cls);
      countParams.push(cls);
    }
    if (mission && mission !== 'all') {
      sql += ' AND discovery_mission LIKE ?';
      countSql += ' AND discovery_mission LIKE ?';
      const m = `%${mission}%`;
      params.push(m);
      countParams.push(m);
    }
    if (constellation && constellation !== 'all') {
      sql += ' AND constellation = ?';
      countSql += ' AND constellation = ?';
      params.push(constellation);
      countParams.push(constellation);
    }
    if (yearFrom) {
      sql += ' AND discovery_year >= ?';
      countSql += ' AND discovery_year >= ?';
      params.push(Number(yearFrom));
      countParams.push(Number(yearFrom));
    }
    if (yearTo) {
      sql += ' AND discovery_year <= ?';
      countSql += ' AND discovery_year <= ?';
      params.push(Number(yearTo));
      countParams.push(Number(yearTo));
    }

    if (search && search.trim()) {
      const terms = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
      for (const term of terms) {
        const pattern = `%${term}%`;
        const clause = ' AND (name LIKE ? OR designation LIKE ? OR constellation LIKE ? OR discovery_mission LIKE ? OR sub_type LIKE ? OR key_discoveries_json LIKE ?)';
        sql += clause;
        countSql += clause;
        params.push(pattern, pattern, pattern, pattern, pattern, pattern);
        countParams.push(pattern, pattern, pattern, pattern, pattern, pattern);
      }
    }

    // Sorting
    switch (sortBy) {
      case 'year-asc':
        sql += ' ORDER BY discovery_year ASC';
        break;
      case 'name-asc':
      case 'name':
        sql += ' ORDER BY name ASC';
        break;
      case 'name-desc':
        sql += ' ORDER BY name DESC';
        break;
      case 'class':
        sql += ' ORDER BY class ASC, discovery_year DESC';
        break;
      case 'year-desc':
      default:
        sql += ' ORDER BY discovery_year DESC';
        break;
    }

    // Pagination if requested
    const take = Number(limit || pageSize);
    const p = Number(page);

    if (p > 0 && take > 0) {
      const totalRow = await dbGet(countSql, countParams);
      const total = totalRow ? totalRow.count : 0;
      const offset = (p - 1) * take;

      sql += ' LIMIT ? OFFSET ?';
      params.push(take, offset);

      const rows = await dbAll(sql, params);
      return res.json({
        total,
        page: p,
        pageSize: take,
        totalPages: Math.ceil(total / take) || 1,
        count: rows.length,
        objects: rows.map(formatObjectRow)
      });
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

// Full Catalog JSON Export Endpoint
app.get('/api/objects/export', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM objects ORDER BY discovery_year DESC');
    const objects = rows.map(formatObjectRow);
    const payload = {
      archive: 'DARKMATTER DEEP SPACE OBSERVATORY CATALOG',
      version: '2.5.0',
      exportedAt: new Date().toISOString(),
      totalRecords: objects.length,
      objects
    };

    if (req.query.download === 'true') {
      res.setHeader('Content-Disposition', 'attachment; filename="darkmatter_catalog_export.json"');
      res.setHeader('Content-Type', 'application/json');
    }
    res.json(payload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unified All-Sky Universal Search across curated & surveys
app.get('/api/search', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) {
      return res.json({ query: '', curated: [], surveys: [] });
    }

    const pattern = `%${q}%`;
    const curatedRows = await dbAll(`
      SELECT * FROM objects 
      WHERE name LIKE ? OR designation LIKE ? OR sub_type LIKE ? OR discovery_mission LIKE ? OR constellation LIKE ?
      ORDER BY discovery_year DESC LIMIT 12
    `, [pattern, pattern, pattern, pattern, pattern]);

    const surveyResults = queryStellarDiscoveries({
      searchQuery: q,
      page: 1,
      pageSize: 12
    });

    res.json({
      query: q,
      totalMatches: curatedRows.length + surveyResults.totalMatching,
      curated: curatedRows.map(formatObjectRow),
      stellarSurveys: surveyResults.items
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
let server;
async function startServer() {
  try {
    await initDatabase(DISCOVERED_OBJECTS);
    server = app.listen(PORT, () => {
      console.log(`[+] DARKMATTER Observatory API Server v2.5 listening on port ${PORT}`);
      console.log(`[+] API Endpoints available at http://localhost:${PORT}/api/`);
      console.log(`[+] Database: ${DISCOVERED_OBJECTS.length} curated objects + 2.4M stellar survey index active`);
    });
  } catch (err) {
    console.error('[-] Fatal error starting server:', err);
  }
}

// Graceful Shutdown
async function handleShutdown(signal) {
  console.log(`\n[!] Received ${signal}. Shutting down DARKMATTER server gracefully...`);
  if (server) {
    server.close(async () => {
      await closeDatabase();
      console.log('[+] Server terminated cleanly.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

startServer();
