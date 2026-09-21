# DARKMATTER // Deep Sky Observatory & Celestial Object Discovery Archive

A modern scientific space observatory platform and astronomical object discovery archive built with **Vite**, **React 18**, and **Tailwind CSS**.

Featuring a **Deep Sky Observatory HUD** design system, this platform catalogs verified astronomical discoveries across space and time—from habitable exoplanets to high-redshift cosmic dawn galaxies and supermassive black holes.

---

## 🔭 Architectural Highlights

- **Build System**: **Vite + React 18 + Tailwind CSS** with instant hot-module replacement (HMR) and optimized production compilation.
- **UI Aesthetic**: **Deep Sky Observatory HUD** with astrometric coordinate grids (J2000.0), scanlines, telemetry status indicators, and live UTC astrometric clock.
- **Scientific Dossier Engine**: Detailed research records for each object featuring verified physical parameters, distance matrices, multi-wavelength spectral intensity bars, spectroscopic absorption/emission lines, and direct links to peer-reviewed discovery papers (DOI & NASA ADS Bibcodes).
- **Celestial Equatorial Radar (RA/Dec)**: Interactive 2D astrometric sky projection plotting targets across Right Ascension ($0\text{h}$ to $24\text{h}$) and Declination ($-90^\circ$ to $+90^\circ$) with live cursor coordinate tracking and targeting crosshairs.
- **Chronological Discovery Timeline**: Trace astronomical breakthroughs from early Kepler and ground-based Doppler discoveries to the latest JWST deep-field observations.
- **Comparative Analysis Engine**: Side-by-side comparative parameter evaluation of up to 4 celestial objects simultaneously.
- **Observatory Logger**: Allows astronomers and users to submit and archive newly confirmed discovery candidates with persistent `localStorage`.

---

## 🌌 Featured Discoveries Cataloged

1. **JADES-GS-z14-0** (*Cosmic Dawn Galaxy*):
   - Redshift $z = 14.32$ (290 million years post-Big Bang), discovered May 2024 by JWST NIRSpec.
   - Oxygen [O III] 5007Å detection defying pure primordial population models.
2. **M87* (Pōwehi)** (*Supermassive Black Hole*):
   - First directly imaged black hole shadow ($6.5 \times 10^9 M_\odot$) by the Event Horizon Telescope (EHT).
   - Relativistic jet at $0.99c$ and polarized magnetically arrested accretion disk.
3. **TRAPPIST-1e** (*Habitable-Zone Terrestrial Exoplanet*):
   - $0.92 R_\oplus$, $0.69 M_\oplus$ orbiting in the conservative liquid water habitable zone at $39.5$ light-years.
4. **K2-18 b** (*Hycean Ocean World Candidate*):
   - Sub-Neptune exoplanet with JWST spectroscopic detections of $\text{CO}_2$ and $\text{CH}_4$, supporting a hydrogen envelope overlying an aqueous mantle.
5. **GW170817 / AT2017gfo** (*Binary Neutron Star Merger & Kilonova*):
   - Historic first multi-messenger gravitational wave and electromagnetic observation. Speed of gravity confirmed $|c_{gw} - c|/c < 3 \times 10^{-15}$.
6. **1I/'Oumuamua** (*First Confirmed Interstellar Interloper*):
   - Discovered 2017 by Pan-STARRS on a hyperbolic trajectory ($e = 1.20$), exhibiting 10:1 elongation ratio.
7. **SGR 1935+2154** (*Galactic Magnetar / Fast Radio Burst Source*):
   - Magnetic field $B = 2.2 \times 10^{14}\text{ G}$; first confirmation linking magnetars to Fast Radio Bursts (FRB 200428).
8. **Sagittarius A*** (*Milky Way Supermassive Black Hole*):
   - $4.15 \times 10^6 M_\odot$ central gravitational anchor imaged by EHT sub-millimeter interferometry.
9. **Proxima Centauri b** (*Closest Known Exoplanet*):
   - $1.17 M_\oplus$ terrestrial exoplanet located $4.24$ light-years away in the Centaurus constellation.
10. **486958 Arrokoth** (*Kuiper Belt Contact Binary*):
    - Most distant and primitive solar system object explored in situ by NASA New Horizons.

---

## 🚀 Running the Project

### Development Server (Hot-Reloading):
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### Production Build:
```bash
npm run build
```
Builds the production-ready bundle into the `dist/` directory.

### Preview Production Build:
```bash
npm run preview
```
Previews the compiled production build locally.
