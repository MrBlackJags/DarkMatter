/**
 * DARKMATTER OBSERVATORY - Space Missions & Discovery Telescopes
 */

export const OBSERVATORY_MISSIONS = [
  {
    id: 'jwst',
    name: 'James Webb Space Telescope (JWST)',
    agency: 'NASA / ESA / CSA',
    wavelengths: ['Near-Infrared (NIR)', 'Mid-Infrared (MIR)'],
    orbit: 'Sun-Earth L2 Lagrange (1.5M km)',
    mirrorAperture: '6.5 m Beryllium Gold',
    launchYear: 2021,
    primaryDiscoveries: ['JADES-GS-z14-0 (z = 14.32)', 'K2-18 b Carbon Molecules', 'WASP-96 b Water Profile', 'LHS 475 b Terrestrial Confirmation']
  },
  {
    id: 'eht',
    name: 'Event Horizon Telescope (EHT)',
    agency: 'International Global Consortium',
    wavelengths: ['Sub-millimeter Radio (1.3 mm, 230 GHz)'],
    orbit: 'Global Earth-Sized VLBI Array',
    mirrorAperture: 'Virtual Earth Diameter (~12,740 km)',
    launchYear: 2017,
    primaryDiscoveries: ['M87* Black Hole Shadow', 'Sgr A* Milky Way Horizon', 'Polarized Jet Magnetic Fields']
  },
  {
    id: 'ligo',
    name: 'LIGO-Virgo-KAGRA Collaboration',
    agency: 'NSF / INFN / CNRS / NAOJ',
    wavelengths: ['Gravitational-Wave Strain (10 Hz - 2 kHz)'],
    orbit: 'Ground-based Laser Interferometer (Hanford, Livingston, Cascina, Kamioka)',
    mirrorAperture: '4 km Fabry-Pérot Arm Cavities',
    launchYear: 2015,
    primaryDiscoveries: ['GW150914 (First GW Detection)', 'GW170817 (Neutron Star Merger & Kilonova)', '90+ Compact Mergers']
  },
  {
    id: 'kepler-tess',
    name: 'Kepler & TESS Exoplanet Surveyors',
    agency: 'NASA Ames / MIT',
    wavelengths: ['High-Cadence Optical Photometry'],
    orbit: 'Heliocentric & P/2 High Earth Lunar Resonance',
    mirrorAperture: '0.95 m (Kepler) / 4×10.5 cm (TESS)',
    launchYear: 2009,
    primaryDiscoveries: ['TRAPPIST-1 System', 'Kepler-452b', 'TOI-700 d', 'Over 5,500 Confirmed Exoplanets']
  },
  {
    id: 'hst',
    name: 'Hubble Space Telescope (HST)',
    agency: 'NASA / ESA',
    wavelengths: ['Ultraviolet, Visible, Near-Infrared (115–1700 nm)'],
    orbit: 'Low Earth Orbit (~540 km)',
    mirrorAperture: '2.4 m Ritchey-Chrétien Cassegrain',
    launchYear: 1990,
    primaryDiscoveries: ['GN-z11 Ultra-Distant Galaxy', 'Arrokoth KBO Scouting', 'Cosmic Expansion Acceleration']
  },
  {
    id: 'chandra-fermi',
    name: 'Chandra & Fermi High-Energy Observatories',
    agency: 'NASA / DOE',
    wavelengths: ['X-ray (0.1–10 keV) & Gamma-ray (20 MeV–300 GeV)'],
    orbit: 'High Elliptical Orbit & LEO',
    mirrorAperture: 'Grazing Incidence Iridium Mirrors & Large Area Telescope',
    launchYear: 1999,
    primaryDiscoveries: ['UHZ1 Early Heavy-Seed Black Hole', 'GRB 221009A The BOAT', 'Galactic Center Sgr A* Flares']
  },
  {
    id: 'panstarrs-des',
    name: 'Pan-STARRS & Dark Energy Survey (DES)',
    agency: 'University of Hawaii / NOIRLab / Fermilab',
    wavelengths: ['Optical & Near-Infrared Wide-Field Astrometry'],
    orbit: 'Ground-based (Haleakalā & Cerro Tololo Inter-American)',
    mirrorAperture: '1.8 m (Pan-STARRS) / 4.0 m Blanco Telescope (DES)',
    launchYear: 2010,
    primaryDiscoveries: ["1I/'Oumuamua Interstellar Interloper", 'Mega-Comet Bernardinelli-Bernstein', 'Thousands of Supernovae']
  },
  {
    id: 'eso-vlt',
    name: 'European Southern Observatory (ESO / VLT / HARPS)',
    agency: 'ESO (16 Member Nations)',
    wavelengths: ['Optical & Infrared Interferometry, Ultra-Stable Doppler Spectrographs'],
    orbit: 'Ground-based (Cerro Paranal & La Silla, Atacama Desert)',
    mirrorAperture: '4 × 8.2 m Unit Telescopes (VLT) & 3.6 m (La Silla)',
    launchYear: 1998,
    primaryDiscoveries: ['Proxima Centauri b', '2I/Borisov Composition', 'Milky Way S-stars Orbiting Sgr A*']
  }
];

export const DISCOVERY_METHODS = [
  {
    id: 'transit',
    name: 'Transit Photometry',
    description: 'Measures minute dips in stellar luminosity as an orbiting planet transits its parent star. Yields planetary radius Rp = R* √(ΔF).',
    accuracy: 'Up to 10 parts-per-million (ppm)',
    topMissions: ['Kepler', 'TESS', 'JWST', 'Cheops']
  },
  {
    id: 'radial_velocity',
    name: 'Doppler Radial Velocity',
    description: 'Detects periodic Doppler shifts in stellar spectral absorption lines caused by gravitational reflex wobble around system barycenter.',
    accuracy: 'Down to ~10 cm/s (ESPRESSO on VLT)',
    topMissions: ['HARPS', 'ESPRESSO', 'HIRES / Keck']
  },
  {
    id: 'vlbi',
    name: 'Sub-millimeter VLBI Interferometry',
    description: 'Synthesizes an Earth-sized telescope aperture using atomic clock synchronization across continents to achieve microarcsecond resolution.',
    accuracy: '20 microarcseconds (sufficient to read a newspaper in Paris from New York)',
    topMissions: ['Event Horizon Telescope (EHT)', 'ngEHT']
  },
  {
    id: 'gw_strain',
    name: 'Laser Interferometric Strain Detection',
    description: 'Measures quadrupolar spacetime distortions ΔL/L ~ 10⁻²¹ using suspended test masses and multi-kilometer Fabry-Pérot laser cavities.',
    accuracy: '1/10,000th the diameter of a proton over 4 km',
    topMissions: ['Advanced LIGO', 'Advanced Virgo', 'LISA (Upcoming Space GW)']
  },
  {
    id: 'spectroscopy',
    name: 'Slit & Slitless Infrared Transmission Spectroscopy',
    description: 'Passes filtered starlight through an exoplanet’s upper atmosphere or high-redshift Lyman continuum filter to reveal chemical elements and redshifts.',
    accuracy: 'Spectral resolution R ~ 100 to 20,000 across 0.6–28 µm',
    topMissions: ['JWST NIRSpec/MIRI', 'Hubble WFC3']
  }
];
