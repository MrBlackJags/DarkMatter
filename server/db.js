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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

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

  // Sync/upsert curated discoveries to ensure full archive coverage
  if (initialObjects.length > 0) {
    for (const obj of initialObjects) {
      await dbRun(`
        INSERT OR REPLACE INTO objects (
          id, name, designation, class, sub_type, discovery_year, discovery_mission,
          discovery_instrument, discovery_method, constellation, ra, dec, ra_deg, dec_deg,
          distance_json, physics_json, spectral_bands_json, spectral_lines_json,
          key_discoveries_json, research_papers_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        JSON.stringify(obj.researchPapers || [])
      ]);
    }
    console.log(`[+] Seeded/verified ${initialObjects.length} discovery database objects successfully.`);
  }
}
