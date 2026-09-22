# DARKMATTER // Deep Sky Observatory & Astrodynamics Research Engine

An advanced astrophysical research platform, discovery archive, and astrodynamics simulation engine built with **React 18**, **Vite**, **Express**, **SQLite3**, and **Tailwind CSS**.

Featuring a **Deep Sky Observatory HUD** design system, DARKMATTER catalogs confirmed celestial discoveries across space and time, provides a complete suite of space research calculators, operates a data ingestion pipeline with persistent SQLite database storage, and simulates orbital gravity wells and planetary impact collisions in real time.

---

## 🔭 Architectural Highlights

- **Full-Stack Architecture**:
  - **Frontend**: Vite + React 18 + Tailwind CSS with high-contrast HUD design, responsive grid layouts, and interactive HTML5 Canvas physics.
  - **Backend**: Node.js + Express REST API (`/api/objects`, `/api/pipeline`, `/api/calculators`, `/api/simulation`, `/api/health`).
  - **Database**: SQLite3 (`darkmatter.db`) with schema for catalog objects, ingestion jobs, calculation history, and simulation states.
  - **Data Pipelining Engine**: Multi-stage ingestion, J2000 astrometric coordinate validation, physical parameter sanity bounds checking, and DOI cross-referencing.
- **Deep Sky Discovery Archive**:
  - 24+ peer-reviewed landmark discoveries across 6 celestial classifications: Exoplanets, Black Holes & GW Mergers, Cosmic Dawn Galaxies, Pulsars/Magnetars, Interstellar Interlopers, and Supernovae/Transients.
  - Scientific dossiers with distance matrices, verified physical properties, multi-wavelength SED intensity flux, spectral absorption/emission lines, and direct open-access paper links.
- **Space Research Calculators Suite**:
  - **Orbital Mechanics**: Keplerian Orbital Velocity & Period, Hohmann Transfer Orbit $\Delta v$ Budget, Escape Velocity, Roche Disruption Limit & Hill Sphere.
  - **Astrophysics & Black Holes**: Schwarzschild Event Horizon & ISCO, Gravitational Time Dilation, Hawking Radiation Temperature & Lifetime, Gravitational Redshift.
  - **Exoplanets & Habitability**: Transit Photometry Depth ($\text{ppm}$), Habitable Zone Boundaries & Equilibrium Temperature ($T_{eq}$), Earth Similarity Index (ESI), Surface Gravity ($g$).
  - **Cosmology & Rocket Propulsion**: Tsiolkovsky Rocket Equation, Special Relativistic Lorentz Factor ($\gamma$), Cosmological Redshift ($z$) & Scale Factor ($a$), Interstellar Cruise Transit Time.
  - Calculation history logger with SQLite database persistence.
- **Gravity, Orbit & Planetary Collision Simulator**:
  - Interactive Newtonian N-body and central gravity well physics sandbox.
  - Interactive slingshot vector aiming and launching.
  - Central planet customization (Earth, Mars, Jovian Gas Giant, Dense Neutron Star) with atmospheric drag ($F_d = \frac{1}{2}\rho v^2 C_d A$) and aerobraking re-entry.
  - Real-time planetary collision detection ($r \le R_{planet}$) with impact kinetic energy yield in Megatons of TNT, impact crater scaling, shockwave propagation, and 60+ fragmentation ejecta particles.
  - Real-time Keplerian orbit trajectory projection (osculating ellipse/hyperbola) and spacetime curvature gravity grid.
  - Live astrometric telemetry HUD: speed, altitude, orbital eccentricity ($e$), and collision status.
- **All-Sky Celestial Radar**:
  - Interactive 2D astrometric equatorial projection ($0\text{h}-24\text{h}$ RA, $-90^\circ$ to $+90^\circ$ Dec) with targeting reticle and coordinate crosshairs.
- **Discovery Timeline**:
  - Chronological breakdown of human observational breakthroughs from 1957 to 2024.
- **Comparative Analysis Engine**:
  - Multi-target side-by-side comparative parameter evaluation.

---

## 🌌 Discovered Celestial Objects Cataloged

1. **JADES-GS-z14-0** (*Lyman-Break Galaxy*): $z = 14.32$, 290 Myr post-Big Bang (JWST NIRCam/NIRSpec).
2. **M87* (Pōwehi)** (*Supermassive Black Hole*): $6.5 \times 10^9 M_\odot$, first imaged photon shadow (EHT).
3. **TRAPPIST-1e** (*Habitable-Zone Terrestrial Exoplanet*): $0.92 R_\oplus$ rocky world in liquid water zone.
4. **K2-18 b** (*Hycean Sub-Neptune*): $\text{CH}_4$ and $\text{CO}_2$ detected over global water ocean (JWST).
5. **GW170817 / AT2017gfo** (*Binary Neutron Star Merger*): Gravitational wave chirp and optical kilonova.
6. **1I/'Oumuamua** (*Interstellar Asteroid*): Hyperbolic interloper ($e = 1.20$) with 10:1 elongation.
7. **SGR 1935+2154** (*Galactic Magnetar*): $B = 2.2 \times 10^{14}\text{ G}$, origin of Fast Radio Bursts (FRB 200428).
8. **Sagittarius A*** (*Milky Way Black Hole*): $4.15 \times 10^6 M_\odot$ galactic center singularity (EHT).
9. **Proxima Centauri b** (*Nearest Exoplanet*): $1.17 M_\oplus$ in habitable zone at 4.24 light-years.
10. **486958 Arrokoth** (*Kuiper Belt Contact Binary*): Pristine primordial pebble accretion relic (New Horizons).
11. **Kepler-452b** (*Super-Earth*): Earth's cousin orbiting a G2 solar twin in a 385-day orbit.
12. **TOI-700 d** (*Earth-Sized Habitable Planet*): First Earth-sized HZ planet discovered by TESS.
13. **WASP-96 b** (*Hot Saturn*): Benchmark cloud and water vapor transmission spectra from JWST NIRISS.
14. **LHS 475 b** (*Rocky Exoplanet*): 99% Earth-sized terrestrial planet confirmed by JWST NIRSpec.
15. **GN-z11** (*Ultra-High Redshift Galaxy*): $z = 10.603$, 400 Myr post-Big Bang with early supermassive AGN.
16. **UHZ1** (*Outsized Supermassive Black Hole*): Earliest X-ray detected black hole ($z = 10.1$) proving heavy-seed origin.
17. **TON 618** (*Ultramassive Black Hole*): 66 Billion $M_\odot$ singularity powering a hyperluminous quasar.
18. **Cygnus X-1** (*Stellar Black Hole*): 21.2 $M_\odot$ compact object orbiting O-supergiant companion.
19. **PSR B1913+16 (Hulse-Taylor)** (*Binary Pulsar*): 1993 Nobel-winning empirical proof of gravitational radiation.
20. **2I/Borisov** (*Interstellar Comet*): Unbound hyperbolic comet ($e = 3.36$) enriched in primordial carbon monoxide.
21. **C/2014 UN271 (Bernardinelli-Bernstein)** (*Mega-Comet*): Largest comet nucleus ever measured (~137 km).
22. **Supernova 1987A** (*Core-Collapse Supernova*): Extra-solar neutrino burst and newborn neutron star.
23. **GRB 221009A ("The B.O.A.T.")** (*Brightest Of All Time GRB*): 18 TeV photons from a 1-in-10,000-year burst.
24. **AT2021lwx ("Scary Barbie")** (*Giant Black Hole Accretion Flare*): Largest energy release recorded ($10^{53}\text{ ergs}$).

---

## 📁 Repository Architecture & Directory Structure

```
DarkMatter/
├── src/                               # Active frontend application
│   ├── components/                    # Modular UI & Scientific Instruments
│   │   ├── layout/                    # Shell, Navbar, Hero, Ambient Starfield Canvas
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroLanding.jsx
│   │   │   └── InteractiveStarfield.jsx
│   │   ├── catalog/                   # Celestial objects catalog & procedural models
│   │   │   ├── ObjectCatalog.jsx
│   │   │   ├── ObjectDetailModal.jsx
│   │   │   ├── CompareObjectsDrawer.jsx
│   │   │   ├── CustomObjectLogger.jsx
│   │   │   └── CelestialVisualizer.jsx
│   │   ├── observatory/               # Real-time simulation & calculation tools
│   │   │   ├── OrbitSimulator.jsx
│   │   │   ├── SpaceCalculators.jsx
│   │   │   ├── SkyCoordinateRadar.jsx
│   │   │   └── DiscoveryTimeline.jsx
│   │   ├── reference/                 # Data dictionary & telemetry ingestion
│   │   │   ├── DataDictionaryBar.jsx
│   │   │   └── DataPipelineDashboard.jsx
│   │   └── index.js                   # Unified barrel export index
│   ├── data/                          # Reference astrophysics dataset & dictionary
│   │   ├── discoveredObjects.js
│   │   ├── astronomicalDictionary.js
│   │   └── observatoryMissions.js
│   ├── services/                      # REST API client & backend communications
│   │   └── api.js
│   ├── App.jsx                        # Primary application controller
│   ├── index.css                      # Tailwind styling & HUD design system
│   └── main.jsx                       # Vite React root mounting
├── server/                            # Node.js + Express backend service
│   ├── data/                          # Isolated persistent SQLite storage
│   │   └── darkmatter.db
│   ├── db.js                          # SQLite database connector & migrations
│   ├── index.js                       # Express REST endpoints
│   └── pipeline.js                    # Telemetry ingestion job runner
├── archive/                           # Preserved historical prototypes
│   └── legacy-vanilla/                # Early static HTML/CSS/JS experiments
├── dist/                              # Vite production build output
├── assets/                            # Synced production bundles for Live Server
├── index.html                         # Single-page application entry
├── vite.config.js                     # Vite build configuration & bundle synchronizer
├── tailwind.config.js                 # Tailwind HUD design token extensions
└── package.json                       # Dependencies and npm script targets
```

---

## 🚀 Getting Started

### 1. Run Frontend Development Server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 2. Run Backend API Server:
```bash
npm run server
```
Runs the Express API on `http://localhost:3001` connected to `darkmatter.db`.

### 3. Production Build:
```bash
npm run build
```
Compiles production-ready bundle to `dist/` and syncs ready-to-run assets to `assets/`.

### 4. Run directly via VS Code "Go Live" (Live Server):
- Simply click **"Go Live"** in the VS Code bottom status bar, or right-click `index.html` and select **"Open with Live Server"**.
- Opens at `http://127.0.0.1:5500/` without needing a terminal.
- The app operates fully in standalone mode with built-in astrophysical data fallbacks, or seamlessly connects to the backend API if `npm run server` is active.


---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Node health, system status, active database object count |
| `GET` | `/api/stats` | Telemetry breakdown by celestial class, missions, and recent jobs |
| `GET` | `/api/objects` | Query catalog objects with filters (`class`, `mission`, `search`, `sortBy`) |
| `GET` | `/api/objects/:id` | Fetch single celestial object research dossier |
| `POST` | `/api/objects` | Log and persist new discovery candidate to SQLite |
| `DELETE`| `/api/objects/:id` | Remove object from database |
| `GET` | `/api/pipeline/status` | Current pipeline state, target counts, and execution logs |
| `POST` | `/api/pipeline/run` | Execute ingestion pipeline across all-sky survey targets |
| `GET` | `/api/calculators/history` | Retrieve saved space calculation history |
| `POST` | `/api/calculators/history` | Save calculation inputs and computed outputs |
| `GET` | `/api/simulation/presets` | Retrieve saved orbital simulation configurations |
| `POST` | `/api/simulation/save` | Save custom orbital simulation state |

---

## 📜 Open Science & Attribution
Data and research literature referenced under NASA, ESA, and Caltech Open Science Policies. Citations cross-indexed with the NASA Astrophysics Data System (ADS) and arXiv.
