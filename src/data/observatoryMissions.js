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
    primaryDiscoveries: ['JADES-GS-z14-0 (z = 14.32)', 'K2-18 b Carbon Molecules', 'WASP-96 b Water Profile']
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
    primaryDiscoveries: ['TRAPPIST-1 System', 'Kepler-186f (First Earth-sized HZ)', 'Over 5,500 Confirmed Exoplanets']
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
  }
];
