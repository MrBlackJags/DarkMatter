import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Prefer database located in server/data/darkmatter.db, fallback to root darkmatter.db
const DB_PATH = fs.existsSync(path.join(DATA_DIR, 'darkmatter.db'))
  ? path.join(DATA_DIR, 'darkmatter.db')
  : (fs.existsSync(path.join(__dirname, '..', 'darkmatter.db'))
      ? path.join(__dirname, '..', 'darkmatter.db')
      : path.join(DATA_DIR, 'darkmatter.db'));

export const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('[-] Error connecting to SQLite database:', err.message);
  } else {
    console.log('[+] Connected to SQLite database at:', DB_PATH);
    // Apply high-performance pragmas for telemetry workloads
    db.serialize(() => {
      db.run('PRAGMA journal_mode = WAL;');
      db.run('PRAGMA synchronous = NORMAL;');
      db.run('PRAGMA cache_size = -64000;'); // 64MB cache
      db.run('PRAGMA temp_store = MEMORY;');
    });
  }
});

// Helper for promise-based queries
export function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

export function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// Initialize tables
export async function initDatabase(initialObjects = []) {
  await dbRun(`
    CREATE TABLE IF NOT EXISTS objects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      designation TEXT,
      class TEXT NOT NULL,
      sub_type TEXT,
      discovery_year INTEGER,
      discovery_mission TEXT,
      discovery_instrument TEXT,
      discovery_method TEXT,
      constellation TEXT,
      ra TEXT,
      dec TEXT,
      ra_deg REAL,
      dec_deg REAL,
      distance_json TEXT,
      physics_json TEXT,
      spectral_bands_json TEXT,
      spectral_lines_json TEXT,
      key_discoveries_json TEXT,
      research_papers_json TEXT,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Ensure image column exists for existing SQLite database
  try {
    await dbRun(`ALTER TABLE objects ADD COLUMN image TEXT`);
  } catch (e) {
    // Column already exists or error ignored
  }

  await dbRun(`
    CREATE TABLE IF NOT EXISTS pipeline_jobs (
      id TEXT PRIMARY KEY,
      pipeline_name TEXT NOT NULL,
      status TEXT NOT NULL,
      target_count INTEGER DEFAULT 0,
      processed_count INTEGER DEFAULT 0,
      log_messages TEXT,
      started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME
    )
  `);

  await dbRun(`
    CREATE TABLE IF NOT EXISTS calculation_history (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      calculator_id TEXT NOT NULL,
      calculator_name TEXT NOT NULL,
      inputs_json TEXT NOT NULL,
      outputs_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await dbRun(`
    CREATE TABLE IF NOT EXISTS simulation_presets (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      config_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Performance Indexes for high-cadence search & filtering
  await dbRun(`CREATE INDEX IF NOT EXISTS idx_objects_class ON objects(class)`);
  await dbRun(`CREATE INDEX IF NOT EXISTS idx_objects_year ON objects(discovery_year)`);
  await dbRun(`CREATE INDEX IF NOT EXISTS idx_objects_mission ON objects(discovery_mission)`);
  await dbRun(`CREATE INDEX IF NOT EXISTS idx_objects_constellation ON objects(constellation)`);
  await dbRun(`CREATE INDEX IF NOT EXISTS idx_objects_name ON objects(name)`);
  await dbRun(`CREATE INDEX IF NOT EXISTS idx_calc_history_created ON calculation_history(created_at)`);

  // Sync/upsert curated discoveries to ensure full archive coverage
  if (initialObjects.length > 0) {
    for (const obj of initialObjects) {
      await dbRun(`
        INSERT OR REPLACE INTO objects (
          id, name, designation, class, sub_type, discovery_year, discovery_mission,
          discovery_instrument, discovery_method, constellation, ra, dec, ra_deg, dec_deg,
          distance_json, physics_json, spectral_bands_json, spectral_lines_json,
          key_discoveries_json, research_papers_json, image
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        obj.id,
        obj.name,
        obj.designation || obj.name,
        obj.class,
        obj.subType || '',
        obj.discoveryYear || null,
        obj.discoveryMission || '',
        obj.discoveryInstrument || '',
        obj.discoveryMethod || '',
        obj.constellation || '',
        obj.coordinates?.ra || '',
        obj.coordinates?.dec || '',
        obj.coordinates?.raDeg || null,
        obj.coordinates?.decDeg || null,
        JSON.stringify(obj.distance || {}),
        JSON.stringify(obj.physics || {}),
        JSON.stringify(obj.spectralBands || {}),
        JSON.stringify(obj.spectralLines || []),
        JSON.stringify(obj.keyDiscoveries || []),
        JSON.stringify(obj.researchPapers || []),
        obj.image || ''
      ]);
    }
    console.log(`[+] Seeded/verified ${initialObjects.length} discovery database objects successfully.`);
  }
}

// Telemetry & metrics about database file
export async function getDatabaseMetrics() {
  let fileSizeKb = 0;
  try {
    if (fs.existsSync(DB_PATH)) {
      const stats = fs.statSync(DB_PATH);
      fileSizeKb = Math.round(stats.size / 1024);
    }
  } catch (e) {}

  const [objects, jobs, calculations, presets] = await Promise.all([
    dbGet('SELECT COUNT(*) as count FROM objects'),
    dbGet('SELECT COUNT(*) as count FROM pipeline_jobs'),
    dbGet('SELECT COUNT(*) as count FROM calculation_history'),
    dbGet('SELECT COUNT(*) as count FROM simulation_presets')
  ]);

  return {
    path: DB_PATH,
    sizeKb: fileSizeKb,
    tables: {
      objects: objects?.count || 0,
      pipelineJobs: jobs?.count || 0,
      calculations: calculations?.count || 0,
      simulationPresets: presets?.count || 0
    }
  };
}

export function closeDatabase() {
  return new Promise((resolve) => {
    db.close((err) => {
      if (err) console.error('[-] Error closing database:', err.message);
      else console.log('[+] Database connection closed cleanly.');
      resolve();
    });
  });
}
