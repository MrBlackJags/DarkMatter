/**
 * DARKMATTER OBSERVATORY - Astronomical Data Dictionary & Parameter Glossary
 * Curated reference for all telemetry fields, astrometric units, and astrophysical parameters
 */

export const DICTIONARY_CATEGORIES = [
  { id: 'all', label: 'All Parameters' },
  { id: 'astrometry', label: 'Astrometry & Coordinates' },
  { id: 'distance', label: 'Distance & Cosmology' },
  { id: 'stellar_exoplanet', label: 'Exoplanets & Stellar' },
  { id: 'blackhole_relativity', label: 'Black Holes & Relativity' },
  { id: 'transients', label: 'Transients & Magnetars' },
  { id: 'mechanics', label: 'Orbital Mechanics' },
  { id: 'spectra', label: 'Spectroscopy & Flux' }
];

export const DATA_DICTIONARY = [
  // 1. ASTROMETRY & COORDINATES
  {
    id: 'ra',
    term: 'Right Ascension (RA, α)',
    symbol: 'α / RA',
    category: 'astrometry',
    unit: 'Hours, Minutes, Seconds (e.g. 19h 45m 00s) or Degrees (0° - 360°)',
    shortDef: 'The celestial equivalent of terrestrial longitude, measured eastward along the celestial equator from the vernal equinox.',
    fullDef: 'Right ascension specifies the celestial longitude of an astronomical body on the celestial sphere. 24 hours of RA correspond to a full 360-degree rotation of Earth. In our catalog, it is provided in standard sexagesimal format and decimal degrees for J2000.0 epoch astrometry.',
    formula: '1h = 15° | 1m = 15′ | 1s = 15″',
    usedIn: 'Coordinates, Sky Coordinate Radar, Object Dossiers',
    filterClass: null
  },
  {
    id: 'dec',
    term: 'Declination (Dec, δ)',
    symbol: 'δ / Dec',
    category: 'astrometry',
    unit: 'Degrees, Arcminutes, Arcseconds (e.g. +42° 15′ 00″, range -90° to +90°)',
    shortDef: 'The celestial equivalent of terrestrial latitude, measuring angular distance north (+) or south (-) of the celestial equator.',
    fullDef: 'Declination measures the angle between the celestial equator and an object. The North Celestial Pole corresponds to +90°, while the South Celestial Pole corresponds to -90°. Combined with Right Ascension, RA/Dec uniquely pins every celestial object in the sky.',
    formula: 'δ ∈ [-90°, +90°]',
    usedIn: 'Coordinates, Sky Coordinate Radar',
    filterClass: null
  },
  {
    id: 'j2000',
    term: 'J2000.0 Astrometric Epoch',
    symbol: 'J2000.0',
    category: 'astrometry',
    unit: 'Standard Astronomical Epoch (January 1, 2000, 12:00 TT)',
    shortDef: 'The internationally agreed standard reference epoch accounting for the precession and nutation of Earth’s rotational axis.',
    fullDef: 'Because Earth undergoes axial precession over a 25,772-year cycle, celestial coordinates slowly shift over time. Astronomical surveys standardize coordinates to J2000.0 to ensure consistent all-sky cross-matching.',
    formula: 'Julian Date: 2451545.0 TT',
    usedIn: 'Astrometric Coordinates',
    filterClass: null
  },

  // 2. DISTANCE & COSMOLOGY
  {
    id: 'redshift',
    term: 'Cosmological Redshift (z)',
    symbol: 'z',
    category: 'distance',
    unit: 'Dimensionless ratio (z)',
    shortDef: 'The stretching of photon wavelengths caused by the cosmological expansion of space between emission and detection.',
    fullDef: 'As photons travel across the expanding universe, their wavelength is stretched. High-z objects (such as JADES-GS-z14-0 at z=14.32 or GN-z11 at z=10.6) are seen as they existed when the universe was only a few hundred million years old. Relates directly to cosmic scale factor a = 1 / (1 + z).',
    formula: 'z = (λ_observed - λ_emitted) / λ_emitted',
    usedIn: 'Deep Galaxies, Quasars, Supernovae',
    filterClass: 'galaxy'
  },
  {
    id: 'parsec',
    term: 'Parsec (pc) & Megaparsec (Mpc)',
    symbol: 'pc / Mpc / Gpc',
    category: 'distance',
    unit: '1 pc = 3.26156 light-years = 3.0857 × 10¹⁶ meters = 206,265 AU',
    shortDef: 'The fundamental unit of astronomical distance, defined as the distance at which 1 AU subtends a parallax angle of one arcsecond.',
    fullDef: 'Astronomers use parsecs rather than light-years in scientific literature because it is directly derived from stellar parallax trigonometry. 1 kpc = 1,000 pc (Milky Way scale), 1 Mpc = 1 million pc (extragalactic scale), 1 Gpc = 1 billion pc (cosmological horizon).',
    formula: 'd (pc) = 1 / p (arcseconds)',
    usedIn: 'Distance Dossiers, Cosmology',
    filterClass: null
  },
  {
    id: 'au',
    term: 'Astronomical Unit (AU)',
    symbol: 'AU',
    category: 'distance',
    unit: 'Exactly 149,597,870,700 meters (~150 million km)',
    shortDef: 'The mean distance from the center of the Earth to the center of the Sun.',
    fullDef: 'The standard distance metric for solar system bodies, Kuiper Belt objects, exoplanetary orbital semi-major axes, and black hole event horizon diameters.',
    formula: '1 AU ≈ 8.317 light-minutes',
    usedIn: 'Exoplanets, Kuiper Belt, Black Hole Shadows',
    filterClass: 'interstellar'
  },
  {
    id: 'light_year',
    term: 'Light-Year (ly)',
    symbol: 'ly',
    category: 'distance',
    unit: '9.4607 × 10¹⁵ meters (~9.46 trillion km)',
    shortDef: 'The distance traversed by a photon in a vacuum during one Julian calendar year (365.25 days).',
    fullDef: 'While the public standard for stellar distances, professional astrophysicists prefer parsecs for trigonometric parallax observations. Proxima Centauri b is the closest exoplanet at 4.24 light-years.',
    formula: '1 ly = c × 1 Julian Year',
    usedIn: 'Distance Matrix',
    filterClass: null
  },

  // 3. STELLAR & EXOPLANETARY
  {
    id: 'earth_mass',
    term: 'Earth Mass (M⊕)',
    symbol: 'M⊕',
    category: 'stellar_exoplanet',
    unit: '5.9722 × 10²⁴ kg',
    shortDef: 'The standard mass unit used to describe terrestrial exoplanets and super-Earths.',
    fullDef: 'Exoplanet masses are typically reported in Earth masses (M⊕) for terrestrial planets (e.g., TRAPPIST-1e at 0.69 M⊕, Proxima b at 1.17 M⊕) or Jupiter masses (M_J ≈ 317.8 M⊕) for gas giants.',
    formula: '1 M⊕ = 5.9722 × 10²⁴ kg',
    usedIn: 'Physical Properties, Exoplanet Catalog',
    filterClass: 'exoplanet'
  },
  {
    id: 'earth_radius',
    term: 'Earth Radius (R⊕)',
    symbol: 'R⊕',
    category: 'stellar_exoplanet',
    unit: '6,371.0 km (Mean volumetric radius)',
    shortDef: 'The standard length unit used to quantify the physical size of exoplanetary candidates.',
    fullDef: 'Determined primarily via transit photometry dips ΔF/F = (Rp/R*)². Planets with radius R < 1.6 R⊕ are predominantly rocky, while R > 1.8 R⊕ usually retain volatile hydrogen/helium gaseous envelopes.',
    formula: '1 R⊕ = 6,371 km',
    usedIn: 'Exoplanet Dossiers, Transit Calculator',
    filterClass: 'exoplanet'
  },
  {
    id: 'transit_depth',
    term: 'Transit Depth & Photometry (ppm)',
    symbol: 'ΔF / F',
    category: 'stellar_exoplanet',
    unit: 'Parts per million (ppm) or Percentage (%)',
    shortDef: 'The fraction of stellar light blocked when an orbiting planet transits in front of its parent star.',
    fullDef: 'Measures the planet-to-star area ratio: ΔF/F = (Rp / R*)². For Earth transiting the Sun, the transit depth is approximately 84 ppm (0.0084%), requiring high-precision space photometers like Kepler, TESS, or JWST.',
    formula: 'ΔF / F = (R_p / R_*)²',
    usedIn: 'Discovery Methods, Exoplanet Transit Calculator',
    filterClass: 'exoplanet'
  },
  {
    id: 'habitable_zone',
    term: 'Circumstellar Habitable Zone (HZ)',
    symbol: 'HZ',
    category: 'stellar_exoplanet',
    unit: 'Astronomical Units (AU)',
    shortDef: 'The circumstellar orbital shell around a star where ambient planetary surface temperatures permit liquid water oceans.',
    fullDef: 'Defined between the inner runaway greenhouse boundary and outer maximum greenhouse condensation boundary. TRAPPIST-1e and Proxima Centauri b orbit firmly within the conservative habitable zones of their host red dwarfs.',
    formula: 'r_HZ ∝ √(L_star / L_sun)',
    usedIn: 'Exoplanet Dossiers, Space Calculators',
    filterClass: 'exoplanet'
  },
  {
    id: 'esi',
    term: 'Earth Similarity Index (ESI)',
    symbol: 'ESI',
    category: 'stellar_exoplanet',
    unit: 'Dimensionless score from 0.00 to 1.00 (Earth = 1.00)',
    shortDef: 'A weighted geometric mean measuring how closely a planet’s radius, density, escape velocity, and temperature match Earth.',
    fullDef: 'Planets with ESI > 0.8 are considered Earth-like rocky candidates (e.g. TRAPPIST-1e has ESI ≈ 0.85). Calculated across mean radius, bulk density, escape velocity, and surface equilibrium temperature.',
    formula: 'ESI = ∏ (1 - |x - x_0| / (x + x_0))^w',
    usedIn: 'Exoplanet Habitability Analysis',
    filterClass: 'exoplanet'
  },
  {
    id: 'hycean',
    term: 'Hycean World Archetype',
    symbol: 'Hycean',
    category: 'stellar_exoplanet',
    unit: 'Planetary Classification',
    shortDef: 'A theoretical class of habitable planets characterized by a massive global water ocean beneath a hydrogen-rich atmosphere.',
    fullDef: 'Coined for sub-Neptune planets like K2-18 b, which feature atmospheric methane (CH4) and carbon dioxide (CO2) without detectable ammonia (NH3), consistent with a deep ocean acting as a chemical ammonia sink.',
    formula: 'Hydrogen (Hy) + Ocean (cean)',
    usedIn: 'K2-18 b Dossier',
    filterClass: 'exoplanet'
  },

  // 4. BLACK HOLES & RELATIVITY
  {
    id: 'solar_mass',
    term: 'Solar Mass (M☉)',
    symbol: 'M☉',
    category: 'blackhole_relativity',
    unit: '1.98847 × 10³⁰ kg (~333,000 Earth masses)',
    shortDef: 'The standard astrophysical unit of mass for stars, black holes, nebulae, and entire galaxies.',
    fullDef: 'Used universally to express mass across astrophysics. Sagittarius A* is 4.15 million M☉, M87* is 6.5 billion M☉, and TON 618 is 66 billion M☉.',
    formula: '1 M☉ = 1.98847 × 10³⁰ kg',
    usedIn: 'Physical Properties, Black Hole Calculators',
    filterClass: 'blackhole'
  },
  {
    id: 'schwarzschild_radius',
    term: 'Schwarzschild Radius (Rs)',
    symbol: 'R_s',
    category: 'blackhole_relativity',
    unit: 'Meters / Kilometers / AU',
    shortDef: 'The radius defining the event horizon of a non-rotating, spherically symmetric black hole.',
    fullDef: 'The critical boundary where the gravitational escape velocity equals the speed of light. Inside Rs, spacetime is bent so steeply that all future light cones point inwards toward the central singularity.',
    formula: 'R_s = 2GM / c²',
    usedIn: 'Black Hole Dossiers, Space Calculators',
    filterClass: 'blackhole'
  },
  {
    id: 'kerr_spin',
    term: 'Kerr Black Hole Spin (a*)',
    symbol: 'a*',
    category: 'blackhole_relativity',
    unit: 'Dimensionless parameter between -1.0 and +1.0',
    shortDef: 'The normalized angular momentum parameter of a rotating Kerr black hole.',
    fullDef: 'Astrophysical black holes are described by the Kerr metric. A spin a* ≈ 0 represents a static Schwarzschild black hole, while a* → 1 represents an extreme maximally rotating black hole whose event horizon contracts to GM/c².',
    formula: 'a* = Jc / (GM²)',
    usedIn: 'M87*, Sgr A*, Cygnus X-1 Dossiers',
    filterClass: 'blackhole'
  },
  {
    id: 'photon_sphere',
    term: 'Photon Sphere & Shadow Diameter',
    symbol: 'R_ph / θ_shadow',
    category: 'blackhole_relativity',
    unit: 'Kilometers / microarcseconds (μas)',
    shortDef: 'The spherical boundary where gravity forces massless photons to travel in unstable circular orbits around a black hole.',
    fullDef: 'For a non-spinning black hole, the photon sphere sits at 1.5 Rs. The apparent visual shadow seen by the Event Horizon Telescope is magnified by gravitational lensing to θ = 3√3 Rs / D (~42 μas for M87*, ~52 μas for Sgr A*).',
    formula: 'R_ph = 1.5 R_s | θ = √27 R_s / D',
    usedIn: 'EHT Discoveries, Astrophysics Calculators',
    filterClass: 'blackhole'
  },
  {
    id: 'isco',
    term: 'Innermost Stable Circular Orbit (ISCO)',
    symbol: 'R_isco',
    category: 'blackhole_relativity',
    unit: 'Kilometers / AU',
    shortDef: 'The innermost boundary where matter in an accretion disk can orbit stably without plunging into the event horizon.',
    fullDef: 'For a non-rotating black hole, ISCO = 3 Rs (6 GM/c²). Inside the ISCO, gas rapidly plunges inward along dynamic trajectories, releasing intense X-ray and relativistic flare radiation.',
    formula: 'R_isco = 3 R_s (Schwarzschild)',
    usedIn: 'Accretion Disk Physics, Space Calculators',
    filterClass: 'blackhole'
  },
  {
    id: 'time_dilation',
    term: 'Gravitational Time Dilation',
    symbol: 'Δt_proper',
    category: 'blackhole_relativity',
    unit: 'Ratio / Time Seconds',
    shortDef: 'The slowing of time experienced by clocks located deep within intense gravitational potential wells.',
    fullDef: 'Predicted by Einstein’s General Relativity and verified to extreme precision. An observer near a black hole event horizon ages substantially slower than an observer resting in distant flat spacetime.',
    formula: 'Δt_proper = Δt_coord × √(1 - R_s / r)',
    usedIn: 'Space Calculators, Relativistic Physics',
    filterClass: 'blackhole'
  },

  // 5. TRANSIENTS & MAGNETARS
  {
    id: 'frb',
    term: 'Fast Radio Burst (FRB)',
    symbol: 'FRB',
    category: 'transients',
    unit: 'Megajansky-milliseconds (Fluence)',
    shortDef: 'Extremely intense, millisecond-duration bursts of coherent radio emission originating from cosmic distances.',
    fullDef: 'Discovered in 2007. In 2020, CHIME and STARE2 observed FRB 200428 coincident with a hard X-ray flare from galactic magnetar SGR 1935+2154, proving magnetars are engines of at least some fast radio bursts.',
    formula: 'Δt ~ 1 millisecond | E ~ 10²⁸ Joules',
    usedIn: 'SGR 1935+2154 Dossier',
    filterClass: 'pulsar'
  },
  {
    id: 'magnetar',
    term: 'Magnetar & Soft Gamma Repeater (SGR)',
    symbol: 'B_crit',
    category: 'transients',
    unit: 'Gauss (G) or Tesla (T), typically 10¹⁴ - 10¹⁵ Gauss',
    shortDef: 'An isolated neutron star with an ultra-strong magnetic field exceeding the quantum electrodynamic critical limit.',
    fullDef: 'Magnetic fields of 10¹⁴ Gauss (10 trillion times Earth’s magnetic field) exceed the QED critical limit B_QED = 4.41 × 10¹³ G, causing crustal starquakes, magnetic reconnection, and explosive gamma/X-ray outbursts.',
    formula: 'B ~ 10¹⁴ - 10¹⁵ G (10-100 GT)',
    usedIn: 'SGR 1935+2154, Pulsars',
    filterClass: 'pulsar'
  },
  {
    id: 'kilonova',
    term: 'Kilonova (Macronova / r-process)',
    symbol: 'r-process',
    category: 'transients',
    unit: 'Absolute Magnitude / Optical-IR Luminosity',
    shortDef: 'A transient radioactive explosion powered by rapid neutron capture (r-process) nucleosynthesis during a neutron star merger.',
    fullDef: 'Confirmed by GW170817 / AT2017gfo. Produces vast quantities of heavy elements including gold, platinum, and neodymium, whose high lanthanide opacity causes the emission to shift rapidly from optical to infrared over days.',
    formula: 'M_ejecta ~ 0.05 M☉ of heavy elements',
    usedIn: 'GW170817 Merger Dossier',
    filterClass: 'blackhole'
  },

  // 6. ORBITAL MECHANICS
  {
    id: 'eccentricity',
    term: 'Orbital Eccentricity (e)',
    symbol: 'e',
    category: 'mechanics',
    unit: 'Dimensionless ratio (e ≥ 0)',
    shortDef: 'A parameter determining the circularity or elongation of a gravitational Keplerian orbit.',
    fullDef: 'e = 0: Circular orbit; 0 < e < 1: Elliptical orbit; e = 1: Parabolic escape trajectory; e > 1: Hyperbolic unbound flyby. Interstellar objects like 1I/‘Oumuamua (e = 1.20) and 2I/Borisov (e = 3.36) are distinguished by extreme hyperbolic eccentricity.',
    formula: 'e = √(1 - b² / a²)',
    usedIn: 'Orbit Simulator, Interstellar Interlopers',
    filterClass: 'interstellar'
  },
  {
    id: 'semi_major_axis',
    term: 'Semi-Major Axis (a)',
    symbol: 'a',
    category: 'mechanics',
    unit: 'Kilometers or Astronomical Units (AU)',
    shortDef: 'Half of the longest diameter of an elliptical orbit, representing the average orbital distance from the focus.',
    fullDef: 'In Kepler’s Third Law T² ∝ a³, the semi-major axis governs the orbital period of any celestial body orbiting a central gravitational mass.',
    formula: 'T² = 4π²a³ / (GM)',
    usedIn: 'Orbital Velocity Calculator, Dossiers',
    filterClass: 'exoplanet'
  },
  {
    id: 'roche_limit',
    term: 'Roche Limit',
    symbol: 'd_roche',
    category: 'mechanics',
    unit: 'Kilometers (km)',
    shortDef: 'The minimum distance a celestial body held together only by gravity can approach a primary body before tidal forces rip it apart.',
    fullDef: 'Within the Roche limit, differential gravitational tidal forces exceed the self-gravity of the satellite, turning Moons or comets into planetary debris rings (such as Saturn’s rings).',
    formula: 'd = 2.44 × R_M × (ρ_M / ρ_m)¹/³',
    usedIn: 'Space Calculators, Roche Calculator',
    filterClass: null
  },
  {
    id: 'hill_sphere',
    term: 'Hill Sphere Radius',
    symbol: 'r_H',
    category: 'mechanics',
    unit: 'Kilometers or AU',
    shortDef: 'The region around an astronomical body where its gravitational attraction dominates over perturbations from a heavier body.',
    fullDef: 'An orbiting body can only retain natural satellites (like Earth retaining the Moon) within its Hill sphere radius.',
    formula: 'r_H ≈ a × ∛(m / 3M)',
    usedIn: 'Space Calculators, Celestial Dynamics',
    filterClass: null
  },
  {
    id: 'delta_v',
    term: 'Delta-v (Δv) & Specific Impulse (Isp)',
    symbol: 'Δv / I_sp',
    category: 'mechanics',
    unit: 'Δv in km/s or m/s; Isp in seconds (s)',
    shortDef: 'A measure of the total velocity impulse needed to execute an orbital maneuver or transfer.',
    fullDef: 'Calculated via Tsiolkovsky’s Rocket Equation Δv = Isp × g0 × ln(m0 / mf). Governs Hohmann transfer burns, orbital plane changes, and escape maneuvers.',
    formula: 'Δv = I_sp × g_0 × ln(m_0 / m_f)',
    usedIn: 'Hohmann Calculator, Rocket Equation',
    filterClass: null
  },

  // 7. SPECTROSCOPY & FLUX
  {
    id: 'lyman_break',
    term: 'Lyman-Break Spectroscopic Drop',
    symbol: 'Ly-α Break',
    category: 'spectra',
    unit: 'Wavelength (Rest-frame 912 Å / 1216 Å)',
    shortDef: 'A sharp drop in flux caused by photoelectric absorption of ultraviolet photons by neutral hydrogen gas.',
    fullDef: 'The primary technique used by JWST NIRCam/NIRSpec to detect the earliest cosmic dawn galaxies (such as JADES-GS-z14-0). Because the rest-frame UV light is redshifted into the infrared, the galaxy appears bright in long-wavelength IR filters but completely vanishes ("drops out") in shorter wavelengths.',
    formula: 'λ_observed = (1 + z) × 1216 Å',
    usedIn: 'JWST Galaxies, JADES-GS-z14-0',
    filterClass: 'galaxy'
  },
  {
    id: 'vlbi',
    term: 'Very Long Baseline Interferometry (VLBI)',
    symbol: 'VLBI',
    category: 'spectra',
    unit: 'Microarcseconds (μas) Angular Resolution',
    shortDef: 'An astronomical method where radio signals from globally distributed telescopes are combined to synthesize an Earth-sized aperture.',
    fullDef: 'By synchronizing radio dishes worldwide using hydrogen maser atomic clocks, the Event Horizon Telescope (EHT) achieves 20 microarcsecond resolution at 1.3 mm, resolving black hole shadows across tens of millions of light-years.',
    formula: 'θ ≈ λ / D_earth',
    usedIn: 'EHT M87*, Sgr A* Discoveries',
    filterClass: 'blackhole'
  }
];
