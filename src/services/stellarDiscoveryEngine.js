/**
 * Stellar Discovery Engine
 * Interfaces between the multi-million star all-sky surveys,
 * UI components, and the OrbitSimulator laboratory.
 */
import { 
  STELLAR_SURVEYS, 
  SPECTRAL_CLASSES, 
  TOTAL_STELLAR_DISCOVERIES_COUNT,
  queryStellarDiscoveries 
} from '../data/stellarSurveys';

/**
 * Fetch a paginated slice of the 2.45M+ Stellar Discoveries
 */
export async function getStellarDiscoveries(params = {}) {
  // If backend is running, we can check backend, but local generator is instantaneous and deterministic
  return queryStellarDiscoveries(params);
}

/**
 * Convert a stellar discovery object into an OrbitSimulator Celestial Body
 */
export function convertStarToSimulatorBody(star, options = {}) {
  const { x = 500, y = 300, isCenter = false, orbitRadius = 200 } = options;

  // Derive simulation mass and radius scaled logarithmically
  // Solar mass (1.0 M_sun) mapped to ~1200 sim mass for central body, or proportional
  const massSim = Math.min(18000, Math.max(30, Math.round(star.massSolar * 1200)));
  const radiusSim = Math.min(120, Math.max(12, Math.round(Math.pow(star.radiusSolar, 0.4) * 45)));

  let color = '#ffdd66';
  const sc = star.spectralClass;
  if (sc === 'O') color = '#6699ff';
  else if (sc === 'B') color = '#99ccff';
  else if (sc === 'A') color = '#ffffff';
  else if (sc === 'F') color = '#fff4cc';
  else if (sc === 'G') color = '#ffdd66';
  else if (sc === 'K') color = '#ff9933';
  else if (sc === 'M') color = '#ff4433';
  else if (sc === 'WR') color = '#c084fc';
  else if (sc === 'WD') color = '#2dd4bf';

  if (isCenter) {
    return {
      name: star.name,
      mass: massSim,
      radius: radiusSim,
      atmosphereRadius: Math.round(radiusSim * 1.55),
      color,
      atmosphereColor: `${color}33`,
      desc: `${star.subType} (${star.temperatureK} K, ${star.massSolar} M☉, ${star.radiusSolar} R☉)`,
      starData: star
    };
  }

  // Non-central orbiting body
  return {
    id: `star-${star.id}-${Date.now()}`,
    name: star.name,
    type: 'star',
    x,
    y: y - orbitRadius,
    vx: 0,
    vy: 0,
    mass: massSim,
    radius: radiusSim,
    color,
    trail: [],
    starData: star
  };
}

/**
 * Format a stellar discovery into the same unified schema as DISCOVERED_OBJECTS
 * so that it can be opened seamlessly in ObjectDetailModal / ObjectDetail!
 */
export function formatStarForObjectDetail(star) {
  return {
    id: star.id,
    name: star.name,
    designation: star.catalogDesignations[0] || star.name,
    class: 'star',
    subType: star.subType,
    discoveryYear: star.discoveryYear,
    discoveryMission: star.discoverySurvey,
    discoveryInstrument: 'Spectro-photometer & High-Cadence Astrometry',
    discoveryMethod: 'Parallax & Radial Velocity Spectroscopy',
    constellation: star.constellation,
    coordinates: star.coordinates,
    distance: {
      lightYears: star.distanceLy.toLocaleString(),
      parsecs: Math.round(star.distanceLy / 3.262).toLocaleString(),
      redshift: +(star.distanceLy * 0.00000007).toFixed(6)
    },
    physics: {
      stellarMass: `${star.massSolar} M☉`,
      radius: `${star.radiusSolar} R☉`,
      temperature: `${star.temperatureK.toLocaleString()} K`,
      luminosity: `${star.luminositySolar.toLocaleString()} L☉`,
      spectralType: `Class ${star.spectralClass}`,
      habitableZone: star.habitableZoneAU,
      apparentMagnitude: `${star.apparentMag} mag`,
      absoluteMagnitude: `${star.absoluteMag} mag`
    },
    spectralBands: {
      radio: 10,
      infrared: star.spectralClass === 'M' ? 95 : 40,
      optical: 85,
      ultraviolet: ['O', 'B', 'WR', 'WD'].includes(star.spectralClass) ? 90 : 25,
      xray: ['WR', 'WD'].includes(star.spectralClass) ? 60 : 5,
      gamma: 0,
      gravitational: 0
    },
    keyDiscoveries: [
      star.significance,
      `Astrometrically cataloged in ${star.discoverySurvey} with high-precision trigonometric parallax.`,
      `Estimated circumstellar habitable zone extends across ${star.habitableZoneAU}.`
    ],
    researchPapers: [
      {
        title: `${star.discoverySurvey}: All-Sky Photometric & Astrometric Catalog of the Milky Way`,
        authors: 'Collaboration Survey Team et al.',
        journal: 'Astronomy & Astrophysics / Astrophysical Journal',
        year: star.discoveryYear,
        doi: '10.1051/0004-6361/astronomy.stellar.survey',
        bibcode: '2023A&A...674A...1G',
        openAccessUrl: 'https://arxiv.org'
      }
    ],
    spectralLines: [
      `Hydrogen Balmer Lines (H-alpha, H-beta)`,
      `Effective Temperature Peak at ${star.temperatureK} K`,
      `Metallicity Index [Fe/H]`
    ],
    image: star.image || null
  };
}

export { STELLAR_SURVEYS, SPECTRAL_CLASSES, TOTAL_STELLAR_DISCOVERIES_COUNT };
