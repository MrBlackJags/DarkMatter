/**
 * DARKMATTER OBSERVATORY - Deep Sky Object Discovery Catalog
 * Curated scientific telemetry, astrometry, physical properties, and peer-reviewed papers
 */

export const CELESTIAL_CLASSES = [
  { id: 'all', label: 'All Discovered Objects', badge: 'ALL' },
  { id: 'star', label: 'Stars & Stellar Systems', badge: 'STAR', color: 'text-amber-300 border-amber-300/40 bg-amber-300/10' },
  { id: 'exoplanet', label: 'Exoplanets & Habitable Worlds', badge: 'EXO', color: 'text-hud-cyan border-hud-cyan/40 bg-hud-cyan/10' },
  { id: 'blackhole', label: 'Black Holes & GW Mergers', badge: 'BH/GW', color: 'text-hud-violet border-hud-violet/40 bg-hud-violet/10' },
  { id: 'galaxy', label: 'Cosmic Dawn & Deep Galaxies', badge: 'GAL', color: 'text-hud-amber border-hud-amber/40 bg-hud-amber/10' },
  { id: 'pulsar', label: 'Pulsars, Magnetars & FRBs', badge: 'PSR/FRB', color: 'text-hud-emerald border-hud-emerald/40 bg-hud-emerald/10' },
  { id: 'interstellar', label: 'Interstellar & Asteroids', badge: 'INT/AST', color: 'text-hud-rose border-hud-rose/40 bg-hud-rose/10' },
  { id: 'supernova', label: 'Supernovae & Transients', badge: 'SN/TR', color: 'text-amber-400 border-amber-400/40 bg-amber-400/10' }
];

export const DISCOVERED_OBJECTS = [
  // 1. JWST JADES-GS-z14-0
  {
    id: 'obj-jades-z14',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/JADES-GS-z14-0_NIRCam.jpg/800px-JADES-GS-z14-0_NIRCam.jpg',
    name: 'JADES-GS-z14-0',
    designation: 'JADES-GS-z14-0 (COSMOS Dawn)',
    class: 'galaxy',
    subType: 'Lyman-Break High-Redshift Galaxy',
    discoveryYear: 2024,
    discoveryMission: 'James Webb Space Telescope (JWST)',
    discoveryInstrument: 'NIRCam & NIRSpec',
    discoveryMethod: 'Near-Infrared Spectroscopic Lyman Break',
    constellation: 'Fornax',
    coordinates: {
      ra: '03h 32m 38.78s',
      dec: '-27° 46′ 34.6″',
      raDeg: 53.1616,
      decDeg: -27.7763
    },
    distance: {
      redshift: 14.32,
      lightTravelTime: '13.52 Billion Light Years',
      properDistanceMpc: 10450,
      epochPostBigBang: '290 Million Years'
    },
    physics: {
      stellarMass: '5.0 × 10⁸ M☉',
      intrinsicSize: '260 pc (850 ly radius)',
      starFormationRate: '20 M☉ / yr',
      metallicity: '0.1 Z☉ (Oxygen detected)',
      uvLuminosity: '-20.8 M_UV'
    },
    spectralBands: { radio: 5, infrared: 98, optical: 12, ultraviolet: 85, xray: 4, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'Confirmed as the most distant known galaxy in the observable universe (z = 14.32).',
      'Defies pure primordial hydrogen-helium models: unambiguous detection of ionized oxygen ([O III] 5007Å) proves rapid early nucleosynthesis.',
      'Extremely compact yet luminous, indicating a massive burst of first-generation Population II/III stars.'
    ],
    researchPapers: [
      {
        title: 'A luminous galaxy at a redshift of z = 14.32 in the JWST Advanced Deep Extragalactic Survey',
        authors: 'Carniani, S., Hainline, K. N., Witstok, J., et al.',
        journal: 'Nature',
        year: 2024,
        doi: '10.1038/s41586-024-07680-5',
        bibcode: '2024Natur.633..318C',
        openAccessUrl: 'https://arxiv.org/abs/2405.18485'
      }
    ],
    spectralLines: ['Ly-alpha break at 1.86 µm', '[O III] 5007Å at 7.67 µm', 'Rest-frame UV Continuum']
  },

  // 2. M87* Supermassive Black Hole
  {
    id: 'obj-m87-star',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg',
    name: 'M87* (Pōwehi)',
    designation: 'Messier 87 Central Supermassive Black Hole',
    class: 'blackhole',
    subType: 'Kerr Supermassive Black Hole',
    discoveryYear: 2019,
    discoveryMission: 'Event Horizon Telescope (EHT)',
    discoveryInstrument: 'Global 1.3mm VLBI Array',
    discoveryMethod: 'Sub-millimeter Radio Interferometry (VLBI)',
    constellation: 'Virgo',
    coordinates: {
      ra: '12h 30m 49.42s',
      dec: '+12° 23′ 28.0″',
      raDeg: 187.7059,
      decDeg: 12.3911
    },
    distance: {
      lightYears: '53.5 Million Light Years',
      parsecs: '16.4 Mpc',
      redshift: 0.00428
    },
    physics: {
      mass: '6.5 ± 0.7 × 10⁹ M☉ (6.5 Billion Suns)',
      schwarzschildRadius: '19.2 Billion km (128 AU)',
      shadowDiameter: '42 ± 3 microarcseconds',
      spinParameter: 'a* ≈ 0.90 ± 0.05',
      jetLength: '5,000 Light Years (Relativistic 0.99c)'
    },
    spectralBands: { radio: 100, infrared: 45, optical: 30, ultraviolet: 25, xray: 75, gamma: 60, gravitational: 15 },
    keyDiscoveries: [
      'First direct image of a black hole shadow and surrounding photon accretion ring.',
      'Linear polarization maps in 2021 revealed magnetically arrested accretion disk (MAD state) powering the relativistic jet.',
      'Confirmed General Relativity shadow diameter prediction θ = 3√3 Rs / D to within 17% precision.'
    ],
    researchPapers: [
      {
        title: 'First M87 Event Horizon Telescope Results. I. The Shadow of the Supermassive Black Hole',
        authors: 'The Event Horizon Telescope Collaboration (Akiyama, K., et al.)',
        journal: 'The Astrophysical Journal Letters',
        year: 2019,
        doi: '10.3847/2041-8213/ab0ec7',
        bibcode: '2019ApJ...875L...1E',
        openAccessUrl: 'https://iopscience.iop.org/article/10.3847/2041-8213/ab0ec7'
      }
    ],
    spectralLines: ['Synchrotron emission at 230 GHz (1.3 mm)', 'Iron K-alpha X-ray fluorescence']
  },

  // 3. TRAPPIST-1e
  {
    id: 'obj-trappist-1e',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/PIA21422_-_TRAPPIST-1e_artist_concept_2018.jpg/800px-PIA21422_-_TRAPPIST-1e_artist_concept_2018.jpg',
    name: 'TRAPPIST-1e',
    designation: '2MASS J23062928-0502285 e',
    class: 'exoplanet',
    subType: 'Terrestrial Habitable-Zone Exoplanet',
    discoveryYear: 2017,
    discoveryMission: 'TRAPPIST-South / Spitzer / Kepler',
    discoveryInstrument: 'Photometric CCD & IRAC IR Camera',
    discoveryMethod: 'Transit Photometry & TTV',
    constellation: 'Aquarius',
    coordinates: {
      ra: '23h 06m 29.37s',
      dec: '-05° 02′ 29.0″',
      raDeg: 346.6224,
      decDeg: -5.0414
    },
    distance: { lightYears: '39.46 Light Years', parsecs: '12.10 pc' },
    physics: {
      mass: '0.692 ± 0.022 M⊕',
      radius: '0.920 ± 0.008 R⊕',
      density: '5.65 g/cm³',
      surfaceGravity: '0.93 g',
      equilibriumTemp: '251.3 K (-22 °C)',
      orbitalPeriod: '6.099615 days',
      semiMajorAxis: '0.02928 AU'
    },
    spectralBands: { radio: 0, infrared: 92, optical: 40, ultraviolet: 10, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'Located squarely in the conservative circumstellar liquid water habitable zone of an ultra-cool M8V dwarf.',
      'Density measurements rule out a thick hydrogen-helium envelope; supports a rocky composition with potential surface water oceans.',
      'JWST MIRI and NIRSpec transmission observations actively testing secondary atmospheric retention.'
    ],
    researchPapers: [
      {
        title: 'Seven temperate terrestrial planets around the nearby ultracool dwarf star TRAPPIST-1',
        authors: 'Gillon, M., Triaud, A. H. M. J., Demory, B.-O., et al.',
        journal: 'Nature',
        year: 2017,
        doi: '10.1038/nature21360',
        bibcode: '2017Natur.544..456G',
        openAccessUrl: 'https://www.nature.com/articles/nature21360'
      }
    ],
    spectralLines: ['CO2 transit threshold constraint at 4.3 µm', 'H2O atmospheric band search at 1.4 µm']
  },

  // 4. K2-18 b
  {
    id: 'obj-k2-18b',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Artist%E2%80%99s_impression_of_the_exoplanet_K2-18b.jpg/800px-Artist%E2%80%99s_impression_of_the_exoplanet_K2-18b.jpg',
    name: 'K2-18 b',
    designation: 'EPIC 201912552 b',
    class: 'exoplanet',
    subType: 'Hycean Habitable-Zone Sub-Neptune',
    discoveryYear: 2015,
    discoveryMission: 'Kepler Space Telescope (K2) / JWST',
    discoveryInstrument: 'Kepler Photometer / JWST NIRISS & NIRSpec',
    discoveryMethod: 'Transit Photometry & Transmission Spectroscopy',
    constellation: 'Leo',
    coordinates: {
      ra: '11h 30m 14.52s',
      dec: '+07° 35′ 18.2″',
      raDeg: 172.5605,
      decDeg: 7.5884
    },
    distance: { lightYears: '124.3 Light Years', parsecs: '38.1 pc' },
    physics: {
      mass: '8.63 ± 1.35 M⊕',
      radius: '2.61 ± 0.09 R⊕',
      density: '2.67 g/cm³',
      surfaceGravity: '1.27 g',
      equilibriumTemp: '255 ± 12 K',
      orbitalPeriod: '32.9396 days',
      semiMajorAxis: '0.1429 AU'
    },
    spectralBands: { radio: 0, infrared: 95, optical: 35, ultraviolet: 5, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'JWST confirmed detection of carbon dioxide (CO2) and methane (CH4) with severe non-detection of ammonia (NH3).',
      'Chemical profile strongly supports the "Hycean world" archetype: a hydrogen-rich atmosphere over a global water ocean.',
      'Tentative spectroscopic indication of dimethyl sulfide (DMS) is under active high-SNR verification by JWST Cycle 3.'
    ],
    researchPapers: [
      {
        title: 'Carbon-bearing Molecules in a Possible Hycean Atmosphere on the Habitable-zone Exoplanet K2-18 b',
        authors: 'Madhusudhan, N., Sarkar, S., Constantinou, S., et al.',
        journal: 'The Astrophysical Journal Letters',
        year: 2023,
        doi: '10.3847/2041-8213/acf577',
        bibcode: '2023ApJ...956L..13M',
        openAccessUrl: 'https://arxiv.org/abs/2309.05566'
      }
    ],
    spectralLines: ['CH4 absorption at 1.6 & 2.3 µm', 'CO2 absorption at 4.3 µm']
  },

  // 5. 51 Pegasi b (Dimidium) - Historic first exoplanet around solar twin
  {
    id: 'obj-51-peg-b',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Artist%E2%80%99s_impression_of_the_planet_51_Pegasi_b.jpg/800px-Artist%E2%80%99s_impression_of_the_planet_51_Pegasi_b.jpg',
    name: '51 Pegasi b (Dimidium)',
    designation: 'HD 217014 b',
    class: 'exoplanet',
    subType: 'Hot Jupiter (First Exoplanet Around Sun-like Star)',
    discoveryYear: 1995,
    discoveryMission: 'Haute-Provence Observatory (ELODIE Spectrograph)',
    discoveryInstrument: 'ELODIE High-Resolution Echelle Spectrograph',
    discoveryMethod: 'Precision Doppler Radial Velocity',
    constellation: 'Pegasus',
    coordinates: {
      ra: '22h 57m 27.98s',
      dec: '+20° 46′ 07.8″',
      raDeg: 344.3666,
      decDeg: 20.7688
    },
    distance: { lightYears: '50.45 Light Years', parsecs: '15.47 pc' },
    physics: {
      minimumMass: '0.472 ± 0.039 M_J (150 M⊕)',
      estimatedRadius: '1.9 ± 0.3 R_J',
      orbitalPeriod: '4.230785 days',
      semiMajorAxis: '0.0527 AU',
      surfaceTemp: '1,284 K (1,011 °C)'
    },
    spectralBands: { radio: 0, infrared: 75, optical: 85, ultraviolet: 15, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'The landmark discovery that founded modern exoplanetology, earning Michel Mayor and Didier Queloz the 2019 Nobel Prize in Physics.',
      'Challenged planetary formation models by proving giant gas planets can migrate inward to orbit within days of their host stars.',
      'Direct optical reflected starlight detected via high-resolution VLT spectrographs.'
    ],
    researchPapers: [
      {
        title: 'A Jupiter-mass companion to a solar-type star',
        authors: 'Mayor, M., & Queloz, D.',
        journal: 'Nature',
        year: 1995,
        doi: '10.1038/378355a0',
        bibcode: '1995Natur.378..355M',
        openAccessUrl: 'https://www.nature.com/articles/378355a0'
      }
    ],
    spectralLines: ['59 m/s stellar Doppler wobble reflex', 'Reflected stellar sodium Na D absorption']
  },

  // 6. PSR B1257+12 b (Draugr) - First exoplanet ever discovered
  {
    id: 'obj-draugr',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/PSR_B1257%2B12_system.jpg/640px-PSR_B1257%2B12_system.jpg',
    name: 'PSR B1257+12 b (Draugr)',
    designation: 'PSR B1257+12 b',
    class: 'exoplanet',
    subType: 'Pulsar Planet (First Confirmed Exoplanet)',
    discoveryYear: 1992,
    discoveryMission: 'Arecibo Radio Observatory',
    discoveryInstrument: 'Arecibo 305m Radio Telescope',
    discoveryMethod: 'Millisecond Pulsar Timing Variations',
    constellation: 'Virgo',
    coordinates: {
      ra: '13h 00m 03.58s',
      dec: '+12° 40′ 56.5″',
      raDeg: 195.0149,
      decDeg: 12.6824
    },
    distance: { lightYears: '2,300 Light Years', parsecs: '710 pc' },
    physics: {
      mass: '0.020 ± 0.002 M⊕ (Twice Moon mass)',
      orbitalPeriod: '25.262 days',
      semiMajorAxis: '0.19 AU',
      hostObject: '6.22 millisecond pulsar spinning 161 times/second'
    },
    spectralBands: { radio: 95, infrared: 5, optical: 0, ultraviolet: 0, xray: 40, gamma: 10, gravitational: 0 },
    keyDiscoveries: [
      'The first confirmed extrasolar planet ever detected in human history, announced in January 1992 by Aleksander Wolszczan & Dale Frail.',
      'Remains the lowest mass exoplanet known (only ~1.63 Lunar masses).',
      'Orbits in a supernova debris disk, bombarded by lethal relativistic particle winds and X-rays.'
    ],
    researchPapers: [
      {
        title: 'A planetary system around the millisecond pulsar PSR1257 + 12',
        authors: 'Wolszczan, A., & Frail, D. A.',
        journal: 'Nature',
        year: 1992,
        doi: '10.1038/355145a0',
        bibcode: '1992Natur.355..145W',
        openAccessUrl: 'https://www.nature.com/articles/355145a0'
      }
    ],
    spectralLines: ['Microsecond pulse arrival time oscillations']
  },

  // 7. HD 209458 b (Osiris) - First transiting exoplanet
  {
    id: 'obj-hd-209458b',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Osiris_artist_concept.jpg/640px-Osiris_artist_concept.jpg',
    name: 'HD 209458 b (Osiris)',
    designation: 'HD 209458 b',
    class: 'exoplanet',
    subType: 'Transiting Hot Jupiter with Escaping Atmosphere',
    discoveryYear: 1999,
    discoveryMission: 'STARE / Keck / Hubble Space Telescope',
    discoveryInstrument: 'HST STIS Spectrograph & Keck HIRES',
    discoveryMethod: 'Transit Photometry Confirmation',
    constellation: 'Pegasus',
    coordinates: {
      ra: '22h 03m 10.77s',
      dec: '+18° 53′ 03.5″',
      raDeg: 330.7949,
      decDeg: 18.8843
    },
    distance: { lightYears: '159 Light Years', parsecs: '48.7 pc' },
    physics: {
      mass: '0.69 M_J',
      radius: '1.38 R_J',
      density: '0.37 g/cm³',
      orbitalPeriod: '3.52474859 days',
      massLossRate: '10,000 tons of gas per second'
    },
    spectralBands: { radio: 0, infrared: 85, optical: 90, ultraviolet: 60, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'First exoplanet confirmed via the transit method (1999), proving transit geometry works across interstellar space.',
      'Hubble STIS detected the first atmospheric constituents of any exoplanet: sodium, carbon, oxygen, and hydrogen.',
      'First observation of atmospheric evaporation and hydrodynamic escape forming an extended comet-like hydrogen tail.'
    ],
    researchPapers: [
      {
        title: 'Detection of an Extrasolar Planet Atmosphere',
        authors: 'Charbonneau, D., Brown, T. M., Noyes, R. W., & Gilliland, R. L.',
        journal: 'The Astrophysical Journal',
        year: 2002,
        doi: '10.1086/338770',
        bibcode: '2002ApJ...568..377C',
        openAccessUrl: 'https://iopscience.iop.org/article/10.1086/338770'
      }
    ],
    spectralLines: ['Sodium (Na I) doublet absorption at 589.3 nm', 'Lyman-alpha atmospheric absorption']
  },

  // 8. 55 Cancri e (Janssen) - Lava Ocean Super-Earth
  {
    id: 'obj-55-cnc-e',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/55_Cancri_e_artist_impression.jpg/640px-55_Cancri_e_artist_impression.jpg',
    name: '55 Cancri e (Janssen)',
    designation: '55 Cnc e',
    class: 'exoplanet',
    subType: 'Ultra-Short Period Lava Ocean Super-Earth',
    discoveryYear: 2004,
    discoveryMission: 'HET / Spitzer / JWST',
    discoveryInstrument: 'JWST NIRCam & MIRI',
    discoveryMethod: 'Radial Velocity & Thermal Emission Spectroscopy',
    constellation: 'Cancer',
    coordinates: {
      ra: '08h 52m 35.81s',
      dec: '+28° 19′ 50.9″',
      raDeg: 133.1492,
      decDeg: 28.3308
    },
    distance: { lightYears: '41.06 Light Years', parsecs: '12.59 pc' },
    physics: {
      mass: '8.0 M⊕',
      radius: '1.95 R⊕',
      density: '5.9 g/cm³',
      orbitalPeriod: '17.7 hours (0.7365 days)',
      daySideTemp: '2,700 K (2,427 °C - Melts rocks to molten lava)'
    },
    spectralBands: { radio: 0, infrared: 98, optical: 65, ultraviolet: 10, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'In 2024, JWST MIRI detected the first unambiguous secondary carbon monoxide / carbon dioxide atmosphere on a rocky super-Earth.',
      'Surface is dominated by dynamic molten magma oceans continuously bubbling out volatile mineral gases.',
      'Orbits so close to its star that its "year" lasts under 18 hours.'
    ],
    researchPapers: [
      {
        title: 'A secondary atmosphere on the rocky exoplanet 55 Cancri e',
        authors: 'Hu, R., Bello-Arufe, A., Zhang, M., et al.',
        journal: 'Nature',
        year: 2024,
        doi: '10.1038/s41586-024-07432-x',
        bibcode: '2024Natur.630..609H',
        openAccessUrl: 'https://www.nature.com/articles/s41586-024-07432-x'
      }
    ],
    spectralLines: ['CO and CO2 thermal emission absorption at 4-5 µm']
  },

  // 9. WASP-76 b (Iron Rain Hot Jupiter)
  {
    id: 'obj-wasp-76b',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Artist%E2%80%99s_impression_of_the_ultra-hot_giant_exoplanet_WASP-76b.jpg/640px-Artist%E2%80%99s_impression_of_the_ultra-hot_giant_exoplanet_WASP-76b.jpg',
    name: 'WASP-76 b',
    designation: 'WASP-76 b',
    class: 'exoplanet',
    subType: 'Ultra-Hot Jupiter with Gaseous Iron Rain',
    discoveryYear: 2013,
    discoveryMission: 'WASP Survey / ESPRESSO on VLT',
    discoveryInstrument: 'ESPRESSO Ultra-Stable Spectrograph',
    discoveryMethod: 'High-Resolution Transit Spectroscopy',
    constellation: 'Pisces',
    coordinates: {
      ra: '01h 46m 31.86s',
      dec: '+02° 42′ 02.0″',
      raDeg: 26.6328,
      decDeg: 2.7006
    },
    distance: { lightYears: '634 Light Years', parsecs: '194 pc' },
    physics: {
      mass: '0.92 M_J',
      radius: '1.83 R_J',
      daySideTemp: '2,600 K (Vaporizes iron atoms)',
      nightSideTemp: '1,800 K (Iron condenses to liquid droplets)',
      orbitalPeriod: '1.809886 days'
    },
    spectralBands: { radio: 0, infrared: 92, optical: 90, ultraviolet: 20, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'VLT ESPRESSO high-resolution spectra revealed asymmetric iron (Fe) absorption: vaporized neutral iron is carried by 18,000 km/h winds across the terminator to condense and fall as iron rain on the night hemisphere.',
      'Extreme atmospheric asymmetry between morning and evening terminators.'
    ],
    researchPapers: [
      {
        title: 'Nightside condensation of iron on the ultra-hot giant exoplanet WASP-76b',
        authors: 'Ehrenreich, D., Lovis, C., Allart, R., et al.',
        journal: 'Nature',
        year: 2020,
        doi: '10.1038/s41586-020-2107-1',
        bibcode: '2020Natur.580..597E',
        openAccessUrl: 'https://www.nature.com/articles/s41586-020-2107-1'
      }
    ],
    spectralLines: ['Neutral Iron (Fe I) Doppler blueshifted lines at 370-780 nm']
  },

  // 10. Kepler-16b (First Circumbinary Planet - Tatooine)
  {
    id: 'obj-kepler-16b',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Kepler16_transit.jpg/800px-Kepler16_transit.jpg',
    name: 'Kepler-16b (Tatooine)',
    designation: 'Kepler-16(AB) b',
    class: 'exoplanet',
    subType: 'Circumbinary Saturn-mass Planet',
    discoveryYear: 2011,
    discoveryMission: 'Kepler Space Telescope',
    discoveryInstrument: 'Kepler Photometer',
    discoveryMethod: 'Circumbinary Transit Timing Photometry',
    constellation: 'Cygnus',
    coordinates: {
      ra: '19h 16m 18.17s',
      dec: '+51° 45′ 26.8″',
      raDeg: 289.0757,
      decDeg: 51.7574
    },
    distance: { lightYears: '245 Light Years', parsecs: '75 pc' },
    physics: {
      mass: '0.333 M_J (Saturn-like)',
      radius: '0.754 R_J',
      orbitalPeriod: '228.776 days',
      hostStars: 'Binary system: K-dwarf (0.69 M☉) & M-dwarf (0.20 M☉)'
    },
    spectralBands: { radio: 0, infrared: 70, optical: 85, ultraviolet: 10, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'First definitive detection of a circumbinary planet orbiting around two stars simultaneously (resembling the fictional planet Tatooine).',
      'Proved that planets can form and maintain stable long-term orbits in chaotic binary stellar systems.'
    ],
    researchPapers: [
      {
        title: 'Kepler-16: A Transiting Circumbinary Planet',
        authors: 'Doyle, L. R., Carter, J. A., Fabrycky, D. C., et al.',
        journal: 'Science',
        year: 2011,
        doi: '10.1126/science.1210923',
        bibcode: '2011Sci...333.1602D',
        openAccessUrl: 'https://www.science.org/doi/10.1126/science.1210923'
      }
    ],
    spectralLines: ['Complex primary and secondary transit light curves']
  },

  // 11. GW150914 - First direct detection of gravitational waves
  {
    id: 'obj-gw150914',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/LIGO_and_Virgo_detect_neutron_star_merger_-_artist%27s_impression.jpg/800px-LIGO_and_Virgo_detect_neutron_star_merger_-_artist%27s_impression.jpg',
    name: 'GW150914',
    designation: 'First Gravitational-Wave Detection',
    class: 'blackhole',
    subType: 'Binary Black Hole Merger',
    discoveryYear: 2015,
    discoveryMission: 'Advanced LIGO (Hanford & Livingston)',
    discoveryInstrument: 'Dual 4-km Laser Interferometers',
    discoveryMethod: 'Laser Interferometric Spacetime Strain',
    constellation: 'Hydrus / Eridanus',
    coordinates: {
      ra: '07h 18m 00s',
      dec: '-70° 00′ 00″',
      raDeg: 109.5,
      decDeg: -70.0
    },
    distance: { lightYears: '1.3 Billion Light Years', parsecs: '410 Mpc', redshift: 0.09 },
    physics: {
      initialMasses: 'M1 = 36 ± 5 M☉, M2 = 29 ± 4 M☉',
      finalMass: '62 ± 4 M☉',
      energyRadiatedInGW: '3.0 M☉ converted to pure gravitational energy in 0.2 s',
      peakLuminosity: '3.6 × 10⁴⁹ Watts (Exceeded all stars in visible universe combined)'
    },
    spectralBands: { radio: 0, infrared: 0, optical: 0, ultraviolet: 0, xray: 0, gamma: 0, gravitational: 100 },
    keyDiscoveries: [
      'The historic first direct detection of gravitational waves, confirming Einstein’s 1915 prediction exactly 100 years later (2017 Nobel Prize in Physics).',
      'First empirical proof that stellar-mass binary black holes exist and merge in the universe.',
      'Chirp signal matched General Relativity waveforms with a statistical significance exceeding 5.1 sigma.'
    ],
    researchPapers: [
      {
        title: 'Observation of Gravitational Waves from a Binary Black Hole Merger',
        authors: 'Abbott, B. P., et al. (LIGO Scientific Collaboration and Virgo Collaboration)',
        journal: 'Physical Review Letters',
        year: 2016,
        doi: '10.1103/PhysRevLett.116.061102',
        bibcode: '2016PhRvL.116f1102A',
        openAccessUrl: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.116.061102'
      }
    ],
    spectralLines: ['35 Hz to 250 Hz gravitational chirp waveform strain']
  },

  // 12. Phoenix A - Ultra-Massive Black Hole
  {
    id: 'obj-phoenix-a',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Phoenix_cluster_by_Chandra.jpg/640px-Phoenix_cluster_by_Chandra.jpg',
    name: 'Phoenix A',
    designation: 'Phoenix Cluster Central Singularity',
    class: 'blackhole',
    subType: 'Ultramassive Black Hole',
    discoveryYear: 2010,
    discoveryMission: 'South Pole Telescope (SPT) / Chandra',
    discoveryInstrument: 'Sub-millimeter Receiver & Chandra ACIS',
    discoveryMethod: 'Sunyaev-Zel’dovich Effect & Accretion Power Scaling',
    constellation: 'Phoenix',
    coordinates: {
      ra: '23h 44m 43.9s',
      dec: '-42° 43′ 12″',
      raDeg: 356.1829,
      decDeg: -42.7200
    },
    distance: { lightYears: '5.8 Billion Light Years', redshift: 0.596 },
    physics: {
      mass: '1.0 × 10¹¹ M☉ (100 Billion Solar Masses)',
      schwarzschildRadius: '2,000 AU (300 Billion km - 66× Pluto orbit)',
      starburstRate: '800 M☉ / yr in host galaxy',
      bolometricLuminosity: '10⁴⁷ erg/s'
    },
    spectralBands: { radio: 85, infrared: 70, optical: 80, ultraviolet: 75, xray: 95, gamma: 20, gravitational: 0 },
    keyDiscoveries: [
      'One of the most massive known black holes in the universe at ~100 billion solar masses.',
      'Accretion energy blows colossal relativistic bubbles in the intra-cluster plasma.',
      'Defies conventional quenching: host galaxy produces stars at an extraordinary rate of 800 M☉/yr.'
    ],
    researchPapers: [
      {
        title: 'A massive, cooling-flow-induced starburst in the Phoenix cluster',
        authors: 'McDonald, M., Bayliss, M., Benson, B. A., et al.',
        journal: 'Nature',
        year: 2012,
        doi: '10.1038/nature11379',
        bibcode: '2012Natur.488..349M',
        openAccessUrl: 'https://www.nature.com/articles/nature11379'
      }
    ],
    spectralLines: ['Chandra diffuse X-ray cavity emission', 'CO line molecular gas cooling flows']
  },

  // 13. Crab Pulsar (PSR B0531+21)
  {
    id: 'obj-crab-pulsar',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/800px-Crab_Nebula.jpg',
    name: 'Crab Pulsar (PSR B0531+21)',
    designation: 'PSR J0534+2200',
    class: 'pulsar',
    subType: 'Young Energetic Pulsar & PWN Engine',
    discoveryYear: 1968,
    discoveryMission: 'Arecibo Radio Observatory',
    discoveryInstrument: 'Arecibo 305m Dish',
    discoveryMethod: 'High-Speed Radio Pulse Timing (33 ms)',
    constellation: 'Taurus',
    coordinates: {
      ra: '05h 34m 31.97s',
      dec: '+22° 00′ 52.1″',
      raDeg: 83.6332,
      decDeg: 22.0145
    },
    distance: { lightYears: '6,500 Light Years', parsecs: '2,000 pc' },
    physics: {
      rotationPeriod: '33.5 milliseconds (30 rotations/second)',
      spinDownPower: '4.5 × 10³¹ Watts (100,000× Sun luminosity)',
      magneticFieldB: '3.8 × 10¹² Gauss',
      age: '972 Years (Remnant of historical SN 1054)'
    },
    spectralBands: { radio: 95, infrared: 70, optical: 85, ultraviolet: 80, xray: 95, gamma: 90, gravitational: 15 },
    keyDiscoveries: [
      'Directly linked neutron stars and pulsars to supernova remnants (SN 1054 recorded by Chinese and Arab astronomers in 1054 CE).',
      'One of the very few pulsars observed pulsating simultaneously in radio, optical, X-ray, and gamma-ray bands.',
      'Powers the dynamic expanding Crab Nebula through a relativistic electron-positron wind.'
    ],
    researchPapers: [
      {
        title: 'Pulsed radio emission from the Crab Nebula',
        authors: 'Staelin, D. H., & Reifenstein, E. C.',
        journal: 'Science',
        year: 1968,
        doi: '10.1126/science.162.3861.1481',
        bibcode: '1968Sci...162.1481S',
        openAccessUrl: 'https://www.science.org/doi/10.1126/science.162.3861.1481'
      }
    ],
    spectralLines: ['33 ms multi-wavelength pulse profile', 'PeV gamma-ray synchrotron cutoff']
  },

  // 14. FRB 121102 - First Repeating Fast Radio Burst
  {
    id: 'obj-frb-121102',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Arecibo_Observatory_Aerial_View.jpg/640px-Arecibo_Observatory_Aerial_View.jpg',
    name: 'FRB 121102',
    designation: 'FRB 121102 (The Repeater)',
    class: 'pulsar',
    subType: 'Repeating Fast Radio Burst in Magnetized Plasma',
    discoveryYear: 2014,
    discoveryMission: 'Arecibo Observatory / VLA / EVN',
    discoveryInstrument: 'Arecibo ALFA Receiver & Karl G. Jansky VLA',
    discoveryMethod: 'High-Cadence Millisecond Pulse Dedispersion',
    constellation: 'Auriga',
    coordinates: {
      ra: '05h 31m 58.70s',
      dec: '+33° 08′ 52.5″',
      raDeg: 82.9946,
      decDeg: 33.1479
    },
    distance: { lightYears: '3.0 Billion Light Years', redshift: 0.193 },
    physics: {
      burstDuration: '3 milliseconds',
      rotationMeasureRM: '10⁵ rad/m² (Extreme magnetized environment)',
      dispersionMeasureDM: '557 pc/cm³'
    },
    spectralBands: { radio: 100, infrared: 20, optical: 20, ultraviolet: 10, xray: 30, gamma: 10, gravitational: 0 },
    keyDiscoveries: [
      'The first Fast Radio Burst definitively confirmed to repeat, overturning theories that FRBs are strictly one-off cataclysmic explosions.',
      'Precise VLA sub-arcsecond interferometric localization pinpointed its host galaxy to a low-metallicity dwarf star-forming region 3 billion light-years away.',
      'Enormous Faraday rotation measure proved the source resides in a dense, highly magnetized relativistic plasma near a black hole or young magnetar.'
    ],
    researchPapers: [
      {
        title: 'A repeating fast radio burst',
        authors: 'Spitler, L. G., Scholz, P., Hessels, J. W. T., et al.',
        journal: 'Nature',
        year: 2016,
        doi: '10.1038/nature17168',
        bibcode: '2016Natur.531..202S',
        openAccessUrl: 'https://www.nature.com/articles/nature17168'
      }
    ],
    spectralLines: ['1.4 GHz to 8 GHz drifting frequency sub-bursts']
  },

  // 15. GLASS-z12 - Cosmic Dawn Galaxy
  {
    id: 'obj-glass-z12',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/GLASS-z12_NIRCam.png/640px-GLASS-z12_NIRCam.png',
    name: 'GLASS-z12',
    designation: 'GL-z12',
    class: 'galaxy',
    subType: 'High-Redshift Cosmic Dawn Galaxy',
    discoveryYear: 2022,
    discoveryMission: 'James Webb Space Telescope (JWST)',
    discoveryInstrument: 'NIRCam & NIRSpec',
    discoveryMethod: 'Near-Infrared Lyman-Break Photometry & Spectroscopy',
    constellation: 'Sculptor',
    coordinates: {
      ra: '00h 13m 59.76s',
      dec: '-30° 22′ 44.7″',
      raDeg: 3.4990,
      decDeg: -30.3791
    },
    distance: { redshift: 12.11, lightTravelTime: '13.46 Billion Light Years', epochPostBigBang: '350 Million Years' },
    physics: {
      stellarMass: '1.0 × 10⁹ M☉',
      radius: '160 pc (520 ly)',
      uvLuminosity: '-20.6 M_UV'
    },
    spectralBands: { radio: 5, infrared: 98, optical: 10, ultraviolet: 80, xray: 5, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'Discovered in the inaugural July 2022 JWST science observations, establishing that bright luminous galaxies existed far earlier than standard cosmological simulations predicted.',
      'Confirmed at z = 12.11 with NIRSpec in 2023, revealing rapid star formation in the first 350 million years.'
    ],
    researchPapers: [
      {
        title: 'Two Remarkably Luminous Galaxy Candidates at z ≈ 10–12 Revealed by JWST',
        authors: 'Castellano, M., Fontana, A., Treu, T., et al.',
        journal: 'The Astrophysical Journal Letters',
        year: 2022,
        doi: '10.3847/2041-8213/ac9451',
        bibcode: '2022ApJ...938L..15C',
        openAccessUrl: 'https://iopscience.iop.org/article/10.3847/2041-8213/ac9451'
      }
    ],
    spectralLines: ['Lyman break dropout between F150W and F200W filters']
  },

  // 16. 101955 Bennu - Pristine Carbonaceous Asteroid
  {
    id: 'obj-bennu',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Asteroid_101955_Bennu_mosaic.png/800px-Asteroid_101955_Bennu_mosaic.png',
    name: '101955 Bennu',
    designation: '1999 RQ36',
    class: 'interstellar',
    subType: 'Carbonaceous Rubble-Pile Near-Earth Asteroid',
    discoveryYear: 1999,
    discoveryMission: 'LINEAR / NASA OSIRIS-REx',
    discoveryInstrument: 'OSIRIS-REx Camera Suite (OCAMS) & TAGSAM',
    discoveryMethod: 'Ground Optical Survey & Spacecraft Sample Return',
    constellation: 'Equatorial Asteroid',
    coordinates: { ra: '15h 20m 00s', dec: '-10° 15′ 00″', raDeg: 230.0, decDeg: -10.25 },
    distance: { semiMajorAxis: '1.126 AU', closestToEarth: '0.002 AU (Hazard Potential)' },
    physics: {
      diameter: '490 m (Spinning top geometry)',
      mass: '7.329 × 10¹⁰ kg',
      bulkDensity: '1.19 g/cm³ (High microporosity)',
      rotationPeriod: '4.297 hours'
    },
    spectralBands: { radio: 0, infrared: 85, optical: 90, ultraviolet: 20, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'Sample return spacecraft OSIRIS-REx collected 121.6 grams of pristine carbonaceous material and delivered it to Earth in September 2023.',
      'Discovered hydrated clay minerals, carbon-rich organic compounds, amino acids, and water-altered magnesium phosphate.',
      'Surface behaves like a fluid fluid-like microgravity granular ball pit rather than solid rock.'
    ],
    researchPapers: [
      {
        title: 'The unexpected surface of asteroid (101955) Bennu as revealed by OSIRIS-REx',
        authors: 'Lauretta, D. S., Dellagiustina, D. N., Bennett, C. A., et al.',
        journal: 'Nature',
        year: 2019,
        doi: '10.1038/s41586-019-1033-6',
        bibcode: '2019Natur.568...55L',
        openAccessUrl: 'https://www.nature.com/articles/s41586-019-1033-6'
      }
    ],
    spectralLines: ['2.7 µm hydrated phyllosilicate absorption', 'Carbonate absorption at 3.4 µm']
  },

  // 17. 67P/Churyumov–Gerasimenko
  {
    id: 'obj-rosetta-67p',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Comet_67P_on_19_September_2014_NavCam_mosaic.jpg/800px-Comet_67P_on_19_September_2014_NavCam_mosaic.jpg',
    name: '67P/Churyumov–Gerasimenko',
    designation: '67P/C-G',
    class: 'interstellar',
    subType: 'Jupiter-family Bi-lobed Comet',
    discoveryYear: 1969,
    discoveryMission: 'Alma-Ata Astrophysical Institute / ESA Rosetta & Philae',
    discoveryInstrument: 'Rosetta OSIRIS, ROSINA Mass Spectrometer & Philae Lander',
    discoveryMethod: 'Photographic Plate Discovery & Spacecraft Orbital Rendezvous',
    constellation: 'Taurus',
    coordinates: { ra: '04h 15m 00s', dec: '+18° 30′ 00″', raDeg: 63.75, decDeg: 18.5 },
    distance: { perihelion: '1.243 AU', aphelion: '5.68 AU', orbitalPeriod: '6.44 Earth Years' },
    physics: {
      dimensions: '4.1 km × 3.3 km × 1.8 km (Rubber duck bi-lobed binary)',
      mass: '1.0 × 10¹³ kg',
      density: '0.533 g/cm³',
      dToHRatio: '3× higher than Earth ocean water (Rules out comets as sole Earth ocean source)'
    },
    spectralBands: { radio: 5, infrared: 75, optical: 85, ultraviolet: 25, xray: 5, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'First comet in history orbited by a spacecraft (Rosetta) and first to have a robotic lander (Philae) touch down on its nucleus in 2014.',
      'Deuterium-to-hydrogen (D/H) isotopic ratio was three times higher than Earth’s oceans, showing comets like 67P did not deliver Earth’s primary water.',
      'Detected glycine (the simplest amino acid) and phosphorus in the coma dust.'
    ],
    researchPapers: [
      {
        title: '67P/Churyumov-Gerasimenko, a Jupiter family comet with a high D/H ratio',
        authors: 'Altwegg, K., Balsiger, H., Bar-Nun, A., et al.',
        journal: 'Science',
        year: 2015,
        doi: '10.1126/science.1261952',
        bibcode: '2015Sci...347A.387A',
        openAccessUrl: 'https://www.science.org/doi/10.1126/science.1261952'
      }
    ],
    spectralLines: ['Water H2O / HDO isotopic vapor lines', 'Abundant molecular oxygen (O2) in coma']
  },

  // 18. SN 1054 (Historical Supernova of the Crab Nebula)
  {
    id: 'obj-sn-1054',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/800px-Crab_Nebula.jpg',
    name: 'Supernova 1054',
    designation: 'SN 1054 / Chinese Guest Star',
    class: 'supernova',
    subType: 'Historical Core-Collapse Supernova Type II',
    discoveryYear: 1054,
    discoveryMission: 'Song Dynasty Imperial Astronomers / Abbasid Caliphate Astronomers',
    discoveryInstrument: 'Naked-Eye Visual Astrometry',
    discoveryMethod: 'Daylight Visual Transient Breakout',
    constellation: 'Taurus',
    coordinates: { ra: '05h 34m 32s', dec: '+22° 00′ 52″', raDeg: 83.633, decDeg: 22.014 },
    distance: { lightYears: '6,500 Light Years', parsecs: '2,000 pc' },
    physics: {
      peakApparentMagnitude: '-6.0 (Brighter than Venus, cast shadows at night)',
      daylightVisibility: 'Visible in broad daylight for 23 consecutive days',
      nightVisibility: 'Remained visible to the naked eye for 653 days'
    },
    spectralBands: { radio: 85, infrared: 70, optical: 100, ultraviolet: 70, xray: 90, gamma: 75, gravitational: 20 },
    keyDiscoveries: [
      'Documented in detail by Chinese imperial court court records in 1054 CE as a "guest star" that appeared on July 4, 1054.',
      'Its remnant was identified in the 20th century as the Crab Nebula (Messier 1) harboring the Crab Pulsar.',
      'One of the cleanest historical benchmarks linking ancient civilizational astronomical records to modern pulsar physics.'
    ],
    researchPapers: [
      {
        title: 'The Historical Supernovae',
        authors: 'Clark, D. H., & Stephenson, F. R.',
        journal: 'Pergamon Press',
        year: 1977,
        doi: '10.1016/C2013-0-03204-1',
        bibcode: '1977hisu.book.....C',
        openAccessUrl: 'https://ui.adsabs.harvard.edu/abs/1977hisu.book.....C'
      }
    ],
    spectralLines: ['Optical synchrotron continuum', 'Expanding filamentary forbidden oxygen [O III]']
  },

  // 19. Kepler-452b
  {
    id: 'obj-kepler-452b',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Artist%27s_concept_of_Kepler-452b.jpg/800px-Artist%27s_concept_of_Kepler-452b.jpg',
    name: 'Kepler-452b',
    designation: 'KOI-7016.01',
    class: 'exoplanet',
    subType: 'Super-Earth in Solar-Twin Habitable Zone',
    discoveryYear: 2015,
    discoveryMission: 'Kepler Space Telescope',
    discoveryInstrument: 'Kepler Optical Photometer',
    discoveryMethod: 'High-Precision Transit Photometry',
    constellation: 'Cygnus',
    coordinates: { ra: '19h 44m 00.89s', dec: '+44° 16′ 39.2″', raDeg: 296.0037, decDeg: 44.2776 },
    distance: { lightYears: '1,780 Light Years', parsecs: '546 pc' },
    physics: {
      mass: '5.0 ± 2.0 M⊕',
      radius: '1.63 ± 0.13 R⊕',
      orbitalPeriod: '384.84 days',
      semiMajorAxis: '1.046 AU',
      hostStar: 'G2V Solar Analog (1.04 M☉)',
      equilibriumTemp: '265 ± 15 K (-8 °C)'
    },
    spectralBands: { radio: 0, infrared: 88, optical: 92, ultraviolet: 18, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'First near-Earth-sized world discovered orbiting in the habitable zone of a G2-type solar twin.',
      'Orbital period of 385 days closely mirrors Earth’s 365-day year.',
      'Represents an archetype of the long-term planetary evolution of terrestrial biospheres.'
    ],
    researchPapers: [
      {
        title: 'Discovery and Validation of Kepler-452b: A 1.6 R⊕ Super Earth Exoplanet in the Habitable Zone of a G2 Star',
        authors: 'Jenkins, J. M., Twicken, J. D., Batalha, N. M., et al.',
        journal: 'The Astronomical Journal',
        year: 2015,
        doi: '10.1088/0004-6256/150/2/56',
        bibcode: '2015AJ....150...56J',
        openAccessUrl: 'https://iopscience.iop.org/article/10.1088/0004-6256/150/2/56'
      }
    ],
    spectralLines: ['Transit dip depth of 203 ppm']
  },

  // 20. TOI-700 d
  {
    id: 'obj-toi-700d',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Exoplanet_TOI_700_d_illustration.jpg/640px-Exoplanet_TOI_700_d_illustration.jpg',
    name: 'TOI-700 d',
    designation: '2MASS J06282325-6534456 d',
    class: 'exoplanet',
    subType: 'Earth-Sized Habitable-Zone Terrestrial World',
    discoveryYear: 2020,
    discoveryMission: 'TESS / Spitzer',
    discoveryInstrument: 'TESS Wide-Field Cameras & Spitzer IRAC',
    discoveryMethod: 'Multi-Sector Transit Photometry',
    constellation: 'Dorado',
    coordinates: { ra: '06h 28m 22.97s', dec: '-65° 34′ 43.0″', raDeg: 97.0957, decDeg: -65.5786 },
    distance: { lightYears: '101.4 Light Years', parsecs: '31.1 pc' },
    physics: {
      mass: '1.72 ± 0.63 M⊕',
      radius: '1.144 ± 0.062 R⊕',
      density: '5.8 g/cm³',
      equilibriumTemp: '269 K (-4 °C)',
      orbitalPeriod: '37.426 days',
      stellarInsolation: '86% of Solar Constant'
    },
    spectralBands: { radio: 0, infrared: 90, optical: 75, ultraviolet: 12, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'The first Earth-sized habitable-zone planet discovered by NASA’s TESS mission.',
      'Host star TOI-700 is an exceptionally quiet M dwarf showing zero detectable optical flaring.',
      'Climate modeling indicates stable temperate liquid surface water can survive under varied atmospheric compositions.'
    ],
    researchPapers: [
      {
        title: 'The First Habitable-zone Earth-sized Planet from TESS. I. Validation of the TOI-700 System',
        authors: 'Gilbert, E. A., Barclay, T., Quintana, E. V., et al.',
        journal: 'The Astronomical Journal',
        year: 2020,
        doi: '10.3847/1538-3881/aba4b2',
        bibcode: '2020AJ....160..116G',
        openAccessUrl: 'https://iopscience.iop.org/article/10.3847/1538-3881/aba4b2'
      }
    ],
    spectralLines: ['1,050 ppm transit depth across TESS optical and Spitzer 4.5 µm channels']
  },

  // 21. WASP-96 b
  {
    id: 'obj-wasp-96b',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Webb_Captures_Detailed_Atmospheric_Profile_of_Exoplanet_WASP-96_b.png/640px-Webb_Captures_Detailed_Atmospheric_Profile_of_Exoplanet_WASP-96_b.png',
    name: 'WASP-96 b',
    designation: 'WASP-96 b',
    class: 'exoplanet',
    subType: 'Hot Saturn with Clear Atmospheric Water Spectra',
    discoveryYear: 2014,
    discoveryMission: 'WASP Survey / JWST',
    discoveryInstrument: 'NIRISS Single Object Slitless Spectroscopy',
    discoveryMethod: 'Transmission Infrared Spectroscopy',
    constellation: 'Phoenix',
    coordinates: { ra: '00h 04m 11.12s', dec: '-47° 21′ 38.3″', raDeg: 1.0463, decDeg: -47.3606 },
    distance: { lightYears: '1,120 Light Years', parsecs: '343 pc' },
    physics: {
      mass: '0.48 ± 0.03 M_J',
      radius: '1.20 ± 0.06 R_J',
      surfaceTemp: '1,285 K',
      orbitalPeriod: '3.425 days'
    },
    spectralBands: { radio: 0, infrared: 99, optical: 55, ultraviolet: 10, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'Featured in the inaugural JWST science release revealing unambiguous chemical signatures of atmospheric water vapor.',
      'First definitive detection of hazy cloud layers in a gas giant atmosphere previously classified as completely cloud-free.'
    ],
    researchPapers: [
      {
        title: 'JWST NIRISS Reveals the Atmospheric Transmission Spectrum of the Gas Giant WASP-96 b',
        authors: 'Radica, M., Welbanks, L., Coulombe, L.-P., et al.',
        journal: 'Monthly Notices of the Royal Astronomical Society',
        year: 2023,
        doi: '10.1093/mnras/stad2180',
        bibcode: '2023MNRAS.524..835R',
        openAccessUrl: 'https://arxiv.org/abs/2304.14442'
      }
    ],
    spectralLines: ['H2O absorption features at 1.15, 1.4, and 1.9 µm']
  },

  // 22. LHS 475 b
  {
    id: 'obj-lhs-475b',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/LHS_475_b_artist_concept.jpg/640px-LHS_475_b_artist_concept.jpg',
    name: 'LHS 475 b',
    designation: 'GJ 9304 b',
    class: 'exoplanet',
    subType: 'Terrestrial Rocky Exoplanet',
    discoveryYear: 2023,
    discoveryMission: 'James Webb Space Telescope (JWST)',
    discoveryInstrument: 'NIRSpec Prism (0.6 - 5.3 µm)',
    discoveryMethod: 'High-Precision Transmission Spectroscopy',
    constellation: 'Octans',
    coordinates: { ra: '19h 20m 54.38s', dec: '-82° 33′ 16.6″', raDeg: 290.2266, decDeg: -82.5546 },
    distance: { lightYears: '40.7 Light Years', parsecs: '12.48 pc' },
    physics: {
      mass: '0.914 ± 0.05 M⊕',
      radius: '0.991 ± 0.025 R⊕ (99% Earth Size)',
      density: '5.2 g/cm³',
      equilibriumTemp: '586 K (313 °C)',
      orbitalPeriod: '2.029088 days'
    },
    spectralBands: { radio: 0, infrared: 96, optical: 50, ultraviolet: 8, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'First exoplanet confirmed as an original discovery milestone by the James Webb Space Telescope.',
      'Matches Earth’s radius to 99% precision, providing the cleanest terrestrial transmission spectrum ever acquired.',
      'Ruled out a methane-dominated atmosphere; consistent with a bare rock or pure carbon dioxide envelope.'
    ],
    researchPapers: [
      {
        title: 'A temperate Earth-sized planet with a pure CO2 or atmosphere-less surface confirmed by JWST',
        authors: 'Lustig-Yaeger, J., Fu, G., Moran, S. E., et al.',
        journal: 'Nature Astronomy',
        year: 2023,
        doi: '10.1038/s41550-023-02064-x',
        bibcode: '2023NatAs...7.1317L',
        openAccessUrl: 'https://arxiv.org/abs/2301.04191'
      }
    ],
    spectralLines: ['Flat transmission baseline across 0.6–5.3 µm']
  },

  // 23. GN-z11
  {
    id: 'obj-gn-z11',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/GN-z11.jpg/800px-GN-z11.jpg',
    name: 'GN-z11',
    designation: 'GOODS-N-z11',
    class: 'galaxy',
    subType: 'Ultra-High Redshift Starburst Galaxy',
    discoveryYear: 2016,
    discoveryMission: 'Hubble Space Telescope / JWST',
    discoveryInstrument: 'HST WFC3 & JWST NIRSpec',
    discoveryMethod: 'Grism Spectroscopy & Lyman Continuum Break',
    constellation: 'Ursa Major',
    coordinates: { ra: '12h 36m 25.46s', dec: '+62° 14′ 31.4″', raDeg: 189.1061, decDeg: 62.2421 },
    distance: { redshift: 10.603, lightTravelTime: '13.39 Billion Light Years', epochPostBigBang: '400 Million Years' },
    physics: { stellarMass: '1.0 × 10⁹ M☉', starFormationRate: '25 M☉ / yr', sizeRadius: '150 pc' },
    spectralBands: { radio: 10, infrared: 98, optical: 15, ultraviolet: 80, xray: 35, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'Held the world record as the most distant confirmed galaxy from 2016 until the launch of JWST in 2022.',
      'JWST NIRSpec detected an active galactic nucleus (AGN) supermassive black hole accreting at super-Eddington rates.',
      'Pristine helium gas clump detected without metal contamination, hinting at Population III stars.'
    ],
    researchPapers: [
      {
        title: 'A Remarkably Luminous Galaxy at z=11.1 Measured with Hubble Space Telescope Grism Spectroscopy',
        authors: 'Oesch, P. A., Brammer, G., van Dokkum, P. G., et al.',
        journal: 'The Astrophysical Journal',
        year: 2016,
        doi: '10.3847/0004-637X/819/2/129',
        bibcode: '2016ApJ...819..129O',
        openAccessUrl: 'https://iopscience.iop.org/article/10.3847/0004-637X/819/2/129'
      }
    ],
    spectralLines: ['Ly-alpha resonant line at 1.41 µm', 'N IV] 1486Å & C IV 1549Å high ionization AGN lines']
  },

  // 24. UHZ1
  {
    id: 'obj-uhz1',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/UHZ1_JWST_Chandra.png/640px-UHZ1_JWST_Chandra.png',
    name: 'UHZ1',
    designation: 'UHZ1 (Heavy Seed Black Hole)',
    class: 'blackhole',
    subType: 'Early Universe Outsized Supermassive Black Hole',
    discoveryYear: 2023,
    discoveryMission: 'JWST / Chandra X-ray Observatory',
    discoveryInstrument: 'NIRCam (JWST) & ACIS (Chandra)',
    discoveryMethod: 'Gravitational Lensing & X-ray Detection',
    constellation: 'Sculptor',
    coordinates: { ra: '00h 14m 15.35s', dec: '-30° 22′ 47.9″', raDeg: 3.5639, decDeg: -30.3799 },
    distance: { redshift: 10.1, lightTravelTime: '13.25 Billion Light Years', epochPostBigBang: '470 Million Years' },
    physics: {
      blackHoleMass: '1.0 - 4.0 × 10⁷ M☉',
      hostStellarMass: '1.4 × 10⁷ M☉',
      massRatioBHToHost: '~100% (Outsized Black Hole)'
    },
    spectralBands: { radio: 15, infrared: 92, optical: 5, ultraviolet: 40, xray: 98, gamma: 10, gravitational: 5 },
    keyDiscoveries: [
      'The earliest and most distant X-ray detected supermassive black hole known in astronomy.',
      'Black hole mass equals the entire stellar mass of its host galaxy, proving the "Direct Collapse Heavy Seed" hypothesis.'
    ],
    researchPapers: [
      {
        title: 'Evidence for heavy-seed origin of early supermassive black holes from a z ≈ 10.1 quasar candidate',
        authors: 'Bogdán, Á., Goulding, A. D., Natarajan, P., et al.',
        journal: 'Nature Astronomy',
        year: 2024,
        doi: '10.1038/s41550-023-02111-9',
        bibcode: '2024NatAs...8..126B',
        openAccessUrl: 'https://arxiv.org/abs/2305.15458'
      }
    ],
    spectralLines: ['Chandra 2-7 keV rest-frame hard X-ray flux']
  },

  // 25. TON 618
  {
    id: 'obj-ton-618',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Quasar_3C_273.jpg/640px-Quasar_3C_273.jpg',
    name: 'TON 618',
    designation: 'Tonantzintla 618',
    class: 'blackhole',
    subType: 'Ultramassive Black Hole & Hyperluminous Quasar',
    discoveryYear: 1957,
    discoveryMission: 'Tonantzintla Observatory / SDSS',
    discoveryInstrument: 'Schmidt Camera & Optical Spectrographs',
    discoveryMethod: 'Faint Blue Optical Survey & Broad Emission Lines',
    constellation: 'Canes Venatici',
    coordinates: { ra: '12h 28m 24.97s', dec: '+31° 28′ 37.7″', raDeg: 187.1040, decDeg: 31.4771 },
    distance: { redshift: 2.219, lightYears: '10.8 Billion Light Years' },
    physics: {
      mass: '6.6 × 10¹⁰ M☉ (66 Billion Solar Masses)',
      schwarzschildRadius: '1,300 AU (195 Billion km - 40× Pluto orbit)',
      bolometricLuminosity: '4.0 × 10⁴⁰ Watts (140 Trillion times our Sun)'
    },
    spectralBands: { radio: 40, infrared: 75, optical: 95, ultraviolet: 90, xray: 80, gamma: 30, gravitational: 0 },
    keyDiscoveries: [
      'Contains the single most massive known black hole in the cataloged universe at 66 billion M☉.',
      'Accretion disk shines brighter than 100 average galaxies combined.'
    ],
    researchPapers: [
      {
        title: 'The Black Hole Mass of TON 618 from SDSS Broad Emission Line Spectra',
        authors: 'Shemmer, O., Netzer, H., Maiolino, R., et al.',
        journal: 'The Astrophysical Journal',
        year: 2004,
        doi: '10.1086/423607',
        bibcode: '2004ApJ...614..547S',
        openAccessUrl: 'https://iopscience.iop.org/article/10.1086/423607'
      }
    ],
    spectralLines: ['Broad H-beta emission at 4861Å', 'C IV 1549Å velocity dispersion at 7,000 km/s']
  },

  // 26. Cygnus X-1
  {
    id: 'obj-cygnus-x1',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Cygnus_X-1_artist_concept.jpg/800px-Cygnus_X-1_artist_concept.jpg',
    name: 'Cygnus X-1',
    designation: 'HDE 226868',
    class: 'blackhole',
    subType: 'High-Mass X-ray Binary Stellar Black Hole',
    discoveryYear: 1964,
    discoveryMission: 'Aerobee Suborbital Rocket / Uhuru',
    discoveryInstrument: 'Geiger-Müller Proportional Counters',
    discoveryMethod: 'X-ray Timing & Binary Radial Velocity',
    constellation: 'Cygnus',
    coordinates: { ra: '19h 58m 21.68s', dec: '+35° 12′ 05.8″', raDeg: 299.5903, decDeg: 35.2016 },
    distance: { lightYears: '7,200 Light Years', parsecs: '2,220 pc' },
    physics: {
      blackHoleMass: '21.2 ± 2.2 M☉',
      companionMass: '40.6 M☉',
      spinParameter: 'a* > 0.96',
      orbitalPeriod: '5.599829 days'
    },
    spectralBands: { radio: 65, infrared: 50, optical: 70, ultraviolet: 75, xray: 100, gamma: 60, gravitational: 10 },
    keyDiscoveries: [
      'The first celestial X-ray source widely accepted to be a black hole.',
      'Subject of the famous 1974 wager between Stephen Hawking and Kip Thorne.',
      'Revised mass of 21.2 M☉ challenged stellar wind mass-loss theories.'
    ],
    researchPapers: [
      {
        title: 'Cygnus X-1 contains a 21-solar mass black hole',
        authors: 'Miller-Jones, J. C. A., Bahramian, A., Orosz, J. A., et al.',
        journal: 'Science',
        year: 2021,
        doi: '10.1126/science.abb3363',
        bibcode: '2021Sci...371.1046M',
        openAccessUrl: 'https://www.science.org/doi/10.1126/science.abb3363'
      }
    ],
    spectralLines: ['Iron K-alpha relativistic broad line at 6.4 keV']
  },

  // 27. Sagittarius A*
  {
    id: 'obj-sgra-star',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/First_image_of_Sagittarius_A%2A.jpg',
    name: 'Sagittarius A*',
    designation: 'Sgr A* Central Singularity',
    class: 'blackhole',
    subType: 'Galactic Center Supermassive Black Hole',
    discoveryYear: 2022,
    discoveryMission: 'Event Horizon Telescope (EHT)',
    discoveryInstrument: 'Global 1.3mm Interferometer Array',
    discoveryMethod: 'VLBI Sub-millimeter Imaging & S-star Orbits',
    constellation: 'Sagittarius',
    coordinates: { ra: '17h 45m 40.04s', dec: '-29° 00′ 28.1″', raDeg: 266.4168, decDeg: -29.0078 },
    distance: { lightYears: '26,673 Light Years', parsecs: '8,178 pc' },
    physics: {
      mass: '4.154 ± 0.014 × 10⁶ M☉ (4.15 Million Suns)',
      schwarzschildRadius: '12.3 Million km (0.08 AU)',
      shadowDiameter: '51.8 ± 2.3 microarcseconds'
    },
    spectralBands: { radio: 98, infrared: 80, optical: 5, ultraviolet: 5, xray: 70, gamma: 40, gravitational: 10 },
    keyDiscoveries: [
      'First direct horizon-scale image of our own galaxy’s supermassive black hole.',
      'Proved universality of Kerr metric across 3 orders of magnitude in mass between M87* and Sgr A*.',
      'Observed magnetic flares orbiting the ISCO at 30% speed of light.'
    ],
    researchPapers: [
      {
        title: 'First Sagittarius A* Event Horizon Telescope Results. I. The Shadow of the Supermassive Black Hole',
        authors: 'The Event Horizon Telescope Collaboration (Akiyama, K., et al.)',
        journal: 'The Astrophysical Journal Letters',
        year: 2022,
        doi: '10.3847/2041-8213/ac6674',
        bibcode: '2022ApJ...930L..12E',
        openAccessUrl: 'https://iopscience.iop.org/article/10.3847/2041-8213/ac6674'
      }
    ],
    spectralLines: ['1.3 mm synchrotron continuum', 'Near-infrared flares at 2.2 µm']
  },

  // 28. Proxima Centauri b
  {
    id: 'obj-proxima-b',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Artist%27s_impression_of_Proxima_Centauri_b_shown_hypothetically_as_an_arid_rocky_planet.jpg/640px-Artist%27s_impression_of_Proxima_Centauri_b_shown_hypothetically_as_an_arid_rocky_planet.jpg',
    name: 'Proxima Centauri b',
    designation: 'Alpha Centauri C b',
    class: 'exoplanet',
    subType: 'Nearest Terrestrial Exoplanet',
    discoveryYear: 2016,
    discoveryMission: 'European Southern Observatory (ESO)',
    discoveryInstrument: 'HARPS & UVES Spectrographs',
    discoveryMethod: 'Doppler High-Resolution Radial Velocity',
    constellation: 'Centaurus',
    coordinates: { ra: '14h 29m 42.95s', dec: '-62° 40′ 46.1″', raDeg: 217.4290, decDeg: -62.6795 },
    distance: { lightYears: '4.2465 Light Years', parsecs: '1.302 pc' },
    physics: {
      minimumMass: '1.173 ± 0.086 M⊕',
      estimatedRadius: '1.07 R⊕',
      equilibriumTemp: '234 K (-39 °C)',
      orbitalPeriod: '11.186 days',
      semiMajorAxis: '0.0485 AU'
    },
    spectralBands: { radio: 0, infrared: 80, optical: 50, ultraviolet: 25, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'The closest known exoplanet to our Solar System, located inside the liquid water habitable zone.',
      'Primary interstellar flyby target for the Breakthrough Starshot laser nanocraft initiative.'
    ],
    researchPapers: [
      {
        title: 'A terrestrial planet candidate in a temperate orbit around Proxima Centauri',
        authors: 'Anglada-Escudé, G., Amado, P. J., Barnes, J., et al.',
        journal: 'Nature',
        year: 2016,
        doi: '10.1038/nature19106',
        bibcode: '2016Natur.536..437A',
        openAccessUrl: 'https://www.nature.com/articles/nature19106'
      }
    ],
    spectralLines: ['1.4 m/s stellar Doppler reflex wobble']
  },

  // 29. 1I/'Oumuamua
  {
    id: 'obj-oumuamua',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/1I-2017_U1_ESO.jpg/800px-1I-2017_U1_ESO.jpg',
    name: "1I/'Oumuamua",
    designation: '1I/2017 U1',
    class: 'interstellar',
    subType: 'Interstellar Asteroid / Shard',
    discoveryYear: 2017,
    discoveryMission: 'Pan-STARRS 1 Survey Telescope',
    discoveryInstrument: 'GigaPixel Camera 1 (GPC1)',
    discoveryMethod: 'Wide-Field Optical Survey Astrometry',
    constellation: 'Lyra',
    coordinates: { ra: '18h 40m 00s', dec: '+34° 00′ 00″', raDeg: 280.00, decDeg: 34.00 },
    distance: { hyperbolicEccentricity: 'e = 1.20', hyperbolicSpeed: '26.33 km/s' },
    physics: {
      dimensions: '400 m × 40 m × 40 m (Extreme 10:1 aspect ratio)',
      rotationPeriod: '8.14 hours',
      nonGravitationalAccel: 'a_ng = 4.92 × 10⁻⁶ m/s²'
    },
    spectralBands: { radio: 5, infrared: 40, optical: 90, ultraviolet: 10, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'First confirmed macroscopic interstellar object to visit the inner Solar System from another star system.',
      'Extreme light curve variation (2.5 magnitudes) demonstrated an unprecedented elongated cigar/pancake geometry.',
      'Unresolved non-gravitational acceleration sparked hypotheses from nitrogen ice outgassing to radiation sails.'
    ],
    researchPapers: [
      {
        title: "A brief visit from a red and extremely elongated interstellar asteroid",
        authors: 'Meech, K. J., Weryk, R., Micheli, M., et al.',
        journal: 'Nature',
        year: 2017,
        doi: '10.1038/nature25020',
        bibcode: '2017Natur.552..378M',
        openAccessUrl: 'https://www.nature.com/articles/nature25020'
      }
    ],
    spectralLines: ['Neutral optical reflectance slope']
  },

  // 30. 2I/Borisov
  {
    id: 'obj-2i-borisov',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Hubble_image_of_interstellar_comet_2I_Borisov.jpg/640px-Hubble_image_of_interstellar_comet_2I_Borisov.jpg',
    name: '2I/Borisov',
    designation: 'C/2019 Q4 (Borisov)',
    class: 'interstellar',
    subType: 'Interstellar Volatile Comet',
    discoveryYear: 2019,
    discoveryMission: 'Crimean Astrophysical Obs / HST / VLT',
    discoveryInstrument: 'Custom 0.65m Reflector & VLT FORS2',
    discoveryMethod: 'Astrometric Motion Detection & Hyperbolic Orbit Fitting',
    constellation: 'Cassiopeia',
    coordinates: { ra: '09h 42m 00s', dec: '-17° 15′ 00″', raDeg: 145.50, decDeg: -17.25 },
    distance: { hyperbolicEccentricity: 'e = 3.36', hyperbolicExcessSpeed: '32.2 km/s' },
    physics: {
      nucleusRadius: '0.4 - 1.0 km',
      coWaterRatio: 'CO/H2O > 150% (Extreme CO enrichment)'
    },
    spectralBands: { radio: 10, infrared: 50, optical: 95, ultraviolet: 35, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'First unambiguous interstellar comet ever observed in human history.',
      'Extreme orbital eccentricity of e = 3.36 proved indisputable unbound trajectory from outside our solar system.',
      'ALMA sub-millimeter spectroscopy revealed high carbon monoxide abundance.'
    ],
    researchPapers: [
      {
        title: 'The pristine interior of interstellar comet 2I/Borisov',
        authors: 'Bagnulo, S., Cellino, A., Kolokolova, L., et al.',
        journal: 'Nature Communications',
        year: 2021,
        doi: '10.1038/s41467-021-22000-x',
        bibcode: '2021NatCo..12.1797B',
        openAccessUrl: 'https://www.nature.com/articles/s41467-021-22000-x'
      }
    ],
    spectralLines: ['CN emission band at 3880Å', 'CO rotational lines at 230 GHz']
  },

  // 31. 486958 Arrokoth
  {
    id: 'obj-arrokoth',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/UltimaThule_CA04_color_20190101.png/800px-UltimaThule_CA04_color_20190101.png',
    name: '486958 Arrokoth',
    designation: '2014 MU69',
    class: 'interstellar',
    subType: 'Cold Classical Kuiper Belt Contact Binary',
    discoveryYear: 2014,
    discoveryMission: 'Hubble / NASA New Horizons',
    discoveryInstrument: 'HST WFC3 / LORRI & Ralph',
    discoveryMethod: 'HST Dedicated Search & Spacecraft Flyby',
    constellation: 'Sagittarius',
    coordinates: { ra: '19h 17m 30s', dec: '-20° 40′ 00″', raDeg: 289.37, decDeg: -20.66 },
    distance: { astronomicalUnits: '44.6 AU (6.67 Billion km)' },
    physics: {
      dimensions: '36 km × 20 km × 10 km (Bi-lobed contact binary)',
      surfaceTemp: '42 K (-231 °C)',
      composition: 'Methanol ice, water ice, tholins'
    },
    spectralBands: { radio: 0, infrared: 70, optical: 85, ultraviolet: 15, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'The most distant and primitive solar system object ever explored in situ by a spacecraft.',
      'Pancake lobes joined at a narrow neck prove gentle pebble cloud accretion, rejecting violent impact models.'
    ],
    researchPapers: [
      {
        title: 'The initial results from the New Horizons exploration of 2014 MU69',
        authors: 'Stern, S. A., Weaver, H. A., Spencer, J. R., et al.',
        journal: 'Science',
        year: 2019,
        doi: '10.1126/science.aaw9771',
        bibcode: '2019Sci...364.9771S',
        openAccessUrl: 'https://science.sciencemag.org/content/364/6441/eaaw9771'
      }
    ],
    spectralLines: ['CH3OH (methanol) absorption at 2.27 µm']
  },

  // 32. C/2014 UN271 (Bernardinelli-Bernstein)
  {
    id: 'obj-bernardinelli-bernstein',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Bernardinelli-Bernstein_Hubble_composite.jpg/640px-Bernardinelli-Bernstein_Hubble_composite.jpg',
    name: 'C/2014 UN271 (Bernardinelli-Bernstein)',
    designation: 'C/2014 UN271 (Mega-Comet)',
    class: 'interstellar',
    subType: 'Giant Oort Cloud Mega-Comet',
    discoveryYear: 2021,
    discoveryMission: 'Dark Energy Survey (DES) / Hubble',
    discoveryInstrument: 'DECam on Blanco 4m & HST WFC3',
    discoveryMethod: 'Multi-Epoch Deep Survey Astrometry',
    constellation: 'Horologium',
    coordinates: { ra: '06h 00m 05s', dec: '-48° 42′ 00″', raDeg: 90.02, decDeg: -48.70 },
    distance: { aphelionDistance: '55,000 AU (0.87 Light-Years, Oort Cloud)', perihelion: '10.97 AU (Saturn orbit in 2031)' },
    physics: {
      nucleusDiameter: '137 ± 17 km (Largest comet nucleus measured)',
      nucleusMass: '5 × 10¹⁷ kg',
      albedo: '0.033'
    },
    spectralBands: { radio: 5, infrared: 65, optical: 85, ultraviolet: 10, xray: 0, gamma: 0, gravitational: 0 },
    keyDiscoveries: [
      'The largest comet nucleus ever discovered in human history, over double the size of Comet Hale-Bopp.',
      'Active dust coma detected at an unprecedented distance beyond 29 AU.'
    ],
    researchPapers: [
      {
        title: 'Hubble Space Telescope Detection of the Nucleus of the Giant Comet C/2014 UN271',
        authors: 'Hui, M.-T., Jewitt, D., Yu, L.-L., & Mutchler, M. J.',
        journal: 'The Astrophysical Journal Letters',
        year: 2022,
        doi: '10.3847/2041-8213/ac6268',
        bibcode: '2022ApJ...929L..12H',
        openAccessUrl: 'https://iopscience.iop.org/article/10.3847/2041-8213/ac6268'
      }
    ],
    spectralLines: ['CO gas desorption coma lines at 29 AU']
  },

  // 33. Supernova 1987A
  {
    id: 'obj-sn-1987a',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Supernova_1987A.jpg/800px-Supernova_1987A.jpg',
    name: 'Supernova 1987A',
    designation: 'SN 1987A',
    class: 'supernova',
    subType: 'Type II-P Core-Collapse Supernova Remnant',
    discoveryYear: 1987,
    discoveryMission: 'Las Campanas / Kamiokande II / JWST',
    discoveryInstrument: 'Cherenkov Detectors & JWST NIRCam/MIRI',
    discoveryMethod: 'Visual Flash & Core-Collapse Neutrino Burst',
    constellation: 'Dorado (LMC)',
    coordinates: { ra: '05h 35m 27.99s', dec: '-69° 16′ 11.1″', raDeg: 83.8666, decDeg: -69.2698 },
    distance: { lightYears: '168,000 Light Years', parsecs: '51,400 pc' },
    physics: {
      explosionEnergy: '1.4 × 10⁴⁴ Joules',
      neutrinoEnergy: '3 × 10⁴⁶ Joules (99% of gravitational binding energy)',
      progenitorStar: 'Blue Supergiant Sanduleak -69° 202 (18 M☉)'
    },
    spectralBands: { radio: 80, infrared: 95, optical: 90, ultraviolet: 70, xray: 85, gamma: 80, gravitational: 25 },
    keyDiscoveries: [
      'First simultaneous detection of extra-solar neutrinos from a collapsing star (24 neutrinos detected 3 hours prior to optical breakout).',
      'JWST in 2024 definitively confirmed the central newborn neutron star via narrow ionized argon [Ar II] and sulfur [S III] lines.'
    ],
    researchPapers: [
      {
        title: 'Emission lines due to ionizing radiation from a compact object in the remnant of Supernova 1987A',
        authors: 'Fransson, C., Larsson, J., Spyromilio, J., et al.',
        journal: 'Science',
        year: 2024,
        doi: '10.1126/science.adj5770',
        bibcode: '2024Sci...383..898F',
        openAccessUrl: 'https://www.science.org/doi/10.1126/science.adj5770'
      }
    ],
    spectralLines: ['[Ar II] at 6.98 µm (Neutron star ionization)', '[S III] at 18.7 µm']
  },

  // 34. GRB 221009A ("The B.O.A.T.")
  {
    id: 'obj-grb-221009a',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Swift_X-ray_Telescope_image_of_GRB_221009A.jpg/640px-Swift_X-ray_Telescope_image_of_GRB_221009A.jpg',
    name: 'GRB 221009A (The B.O.A.T.)',
    designation: 'GRB 221009A (Brightest Of All Time)',
    class: 'supernova',
    subType: 'Long-Duration Gamma-Ray Burst',
    discoveryYear: 2022,
    discoveryMission: 'Fermi / Swift / LHAASO / JWST',
    discoveryInstrument: 'Fermi-LAT, Swift BAT/XRT, LHAASO Cherenkov',
    discoveryMethod: 'Extreme High-Energy Trigger & All-Sky Saturation',
    constellation: 'Sagitta',
    coordinates: { ra: '19h 13m 03.48s', dec: '+19° 46′ 24.6″', raDeg: 288.2645, decDeg: 19.7735 },
    distance: { redshift: 0.151, lightYears: '2.4 Billion Light Years' },
    physics: {
      isotropicEnergyE_iso: '1.2 × 10⁵⁵ ergs',
      maxPhotonEnergy: '18 TeV (Highest energy photon from any GRB)',
      statisticalProbability: '1-in-10,000-year event'
    },
    spectralBands: { radio: 85, infrared: 90, optical: 95, ultraviolet: 80, xray: 100, gamma: 100, gravitational: 10 },
    keyDiscoveries: [
      'The brightest gamma-ray burst recorded in human civilizational history.',
      'Disrupted Earth’s upper ionosphere at 500 km altitude, measurable in global VLF radio waveguides.',
      'Detected photons up to 18 TeV, challenging extragalactic background light models.'
    ],
    researchPapers: [
      {
        title: 'A trillion-electronvolt afterglow from a narrow jet in an extreme gamma-ray burst',
        authors: 'LHAASO Collaboration (Cao, Z., et al.)',
        journal: 'Science',
        year: 2023,
        doi: '10.1126/science.adg9528',
        bibcode: '2023Sci...380.1390L',
        openAccessUrl: 'https://www.science.org/doi/10.1126/science.adg9528'
      }
    ],
    spectralLines: ['18 TeV PeVatron photon signature', '0.511 MeV electron-positron line']
  },

  // 35. AT2021lwx ("Scary Barbie")
  {
    id: 'obj-at2021lwx',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/AT2021lwx_ZTF_discovery_image.png/640px-AT2021lwx_ZTF_discovery_image.png',
    name: 'AT2021lwx',
    designation: 'ZTF20abrbeie ("Scary Barbie")',
    class: 'supernova',
    subType: 'Supermassive Black Hole Giant Accretion Flare',
    discoveryYear: 2021,
    discoveryMission: 'ZTF / Swift / VLT',
    discoveryInstrument: 'ZTF 48-inch Schmidt & Swift XRT',
    discoveryMethod: 'Automated Optical Survey Transient Filter',
    constellation: 'Vulpecula',
    coordinates: { ra: '20h 30m 30.63s', dec: '+23° 21′ 49.3″', raDeg: 307.6276, decDeg: 23.3637 },
    distance: { redshift: 0.995, lightYears: '8.0 Billion Light Years' },
    physics: {
      totalRadiatedEnergy: '10⁵³ ergs (Over 10× more than any standard supernova)',
      peakLuminosity: '7 × 10⁴⁵ erg/s (3 Trillion times brighter than Sun)',
      accretedMass: '> 100 M☉ giant gas cloud'
    },
    spectralBands: { radio: 30, infrared: 70, optical: 100, ultraviolet: 95, xray: 85, gamma: 10, gravitational: 0 },
    keyDiscoveries: [
      'The highest total radiated energy explosion ever detected, sustaining near-peak luminosity for 3+ years.',
      'Attributed to a 100-solar-mass giant gas cloud disrupted and swallowed by a 100-million-solar-mass black hole.'
    ],
    researchPapers: [
      {
        title: 'AT2021lwx: the largest energy release from a non-quasarlike optical transient',
        authors: 'Wiseman, P., Wang, Y., Hönig, S., et al.',
        journal: 'Monthly Notices of the Royal Astronomical Society',
        year: 2023,
        doi: '10.1093/mnras/stad1000',
        bibcode: '2023MNRAS.522.3992W',
        openAccessUrl: 'https://arxiv.org/abs/2303.04412'
      }
    ],
    spectralLines: ['Extremely broad C IV and semi-forbidden C III] emission lines']
  },

  // 36. SGR 1935+2154 (Milky Way Magnetar / FRB source)
  {
    id: 'obj-sgr-1935',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Chandra_X-ray_image_of_SGR_1935%2B2154.jpg/640px-Chandra_X-ray_image_of_SGR_1935%2B2154.jpg',
    name: 'SGR 1935+2154',
    designation: 'Soft Gamma Repeater 1935+2154',
    class: 'pulsar',
    subType: 'Ultra-Magnetic Neutron Star (Magnetar)',
    discoveryYear: 2020,
    discoveryMission: 'CHIME / STARE2 / Swift / NICER',
    discoveryInstrument: 'Radio Interferometers & X-Ray Telescopes',
    discoveryMethod: 'Simultaneous Millisecond Radio Burst & Hard X-Ray Flare',
    constellation: 'Vulpecula',
    coordinates: { ra: '19h 34m 55.60s', dec: '+21° 53′ 47.7″', raDeg: 293.7317, decDeg: 21.8966 },
    distance: { lightYears: '30,000 Light Years', parsecs: '9,000 pc' },
    physics: {
      magneticFieldB: '2.2 × 10¹⁴ Gauss (22 Teratesla)',
      spinPeriod: '3.245 seconds',
      burstEnergyRadio: '10²⁸ Joules in 1 millisecond'
    },
    spectralBands: { radio: 95, infrared: 15, optical: 10, ultraviolet: 20, xray: 95, gamma: 85, gravitational: 5 },
    keyDiscoveries: [
      'Discovered the first Fast Radio Burst (FRB 200428) originating within the Milky Way.',
      'Definitively confirmed that magnetar crustal starquakes produce Fast Radio Bursts.'
    ],
    researchPapers: [
      {
        title: 'A bright millisecond-duration radio burst from a Galactic magnetar',
        authors: 'The CHIME/FRB Collaboration (Andersen, B. C., et al.)',
        journal: 'Nature',
        year: 2020,
        doi: '10.1038/s41586-020-2863-y',
        bibcode: '2020Natur.587...54C',
        openAccessUrl: 'https://www.nature.com/articles/s41586-020-2863-y'
      }
    ],
    spectralLines: ['400-800 MHz millisecond radio pulse', '20-200 keV magnetar storm burst']
  },

  // 37. Hulse-Taylor Binary Pulsar (PSR B1913+16)
  {
    id: 'obj-hulse-taylor',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Arecibo_Radio_Telescope.jpg/640px-Arecibo_Radio_Telescope.jpg',
    name: 'PSR B1913+16 (Hulse-Taylor)',
    designation: 'PSR J1915+1606',
    class: 'pulsar',
    subType: 'Relativistic Binary Neutron Star System',
    discoveryYear: 1974,
    discoveryMission: 'Arecibo Radio Observatory',
    discoveryInstrument: 'Arecibo 305m Spherical Radio Reflector',
    discoveryMethod: 'Precision Radio Pulsar Timing & Doppler Shift',
    constellation: 'Aquila',
    coordinates: { ra: '19h 15m 28.00s', dec: '+16° 06′ 24.4″', raDeg: 288.8667, decDeg: 16.1068 },
    distance: { lightYears: '21,000 Light Years', parsecs: '6,400 pc' },
    physics: {
      pulsarMass: '1.4398 M☉',
      companionMass: '1.3886 M☉',
      orbitalPeriod: '7.7519387 hours',
      eccentricity: '0.6171334',
      orbitalDecayRate: 'Pb_dot = -2.423 × 10⁻¹² s/s'
    },
    spectralBands: { radio: 100, infrared: 5, optical: 5, ultraviolet: 5, xray: 20, gamma: 15, gravitational: 80 },
    keyDiscoveries: [
      'First empirical confirmation of gravitational radiation, earning the 1993 Nobel Prize in Physics.',
      'Orbital decay matches General Relativity quadrupole formula predictions to within 0.2% accuracy.'
    ],
    researchPapers: [
      {
        title: 'Discovery of a pulsar in a binary system',
        authors: 'Hulse, R. A., & Taylor, J. H.',
        journal: 'The Astrophysical Journal Letters',
        year: 1975,
        doi: '10.1086/181708',
        bibcode: '1975ApJ...195L..51H',
        openAccessUrl: 'https://adsabs.harvard.edu/full/1975ApJ...195L..51H'
      }
    ],
    spectralLines: ['59 millisecond radio pulse train at 430 MHz and 1400 MHz']
  },

  // 38. GW170817 Binary Neutron Star Merger
  {
    id: 'obj-gw170817',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Hubble_and_Chandra_views_of_GW170817.jpg/640px-Hubble_and_Chandra_views_of_GW170817.jpg',
    name: 'GW170817 / AT2017gfo',
    designation: 'Binary Neutron Star Inspiral & Kilonova',
    class: 'blackhole',
    subType: 'Binary Neutron Star Merger & Kilonova',
    discoveryYear: 2017,
    discoveryMission: 'LIGO-Virgo / Fermi / INTEGRAL',
    discoveryInstrument: 'Laser Interferometers & Gamma/Optical',
    discoveryMethod: 'Gravitational-Wave Strain & EM Multi-Messenger',
    constellation: 'Hydra',
    coordinates: { ra: '13h 09m 48.08s', dec: '-23° 22′ 53.3″', raDeg: 197.4503, decDeg: -23.3815 },
    distance: { lightYears: '130.4 Million Light Years', parsecs: '40.0 Mpc' },
    physics: {
      chirpMass: '1.188 M☉',
      ejectedMass: '0.05 M☉ of heavy r-process lanthanides (Gold, Platinum)',
      speedOfGravity: '|v_gw - c| / c < 3 × 10⁻¹⁵'
    },
    spectralBands: { radio: 70, infrared: 88, optical: 82, ultraviolet: 65, xray: 78, gamma: 95, gravitational: 100 },
    keyDiscoveries: [
      'Inaugurated multi-messenger astrophysics: simultaneous gravitational wave, gamma-ray burst, and optical kilonova.',
      'Proved that neutron star collisions are the primary cosmic forge of gold and platinum.'
    ],
    researchPapers: [
      {
        title: 'GW170817: Observation of Gravitational Waves from a Binary Neutron Star Inspiral',
        authors: 'The LIGO Scientific Collaboration & The Virgo Collaboration',
        journal: 'Physical Review Letters',
        year: 2017,
        doi: '10.1103/PhysRevLett.119.161101',
        bibcode: '2017PhRvL.119p1101A',
        openAccessUrl: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.119.161101'
      }
    ],
    spectralLines: ['Gravitational chirp strain (24 Hz to 2048 Hz)', 'Lanthanide opacity absorption at 1.0 - 2.5 µm']
  }
,

  // 39. Stephenson 2-18
  {
    "id": "obj-stephenson-2-18",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Stephenson_2-18_size_comparison.png/800px-Stephenson_2-18_size_comparison.png",
    "name": "Stephenson 2-18",
    "designation": "Stephenson 2 DFK 1 / RSGC2-18",
    "class": "star",
    "subType": "Extreme Red Hypergiant",
    "discoveryYear": 1990,
    "discoveryMission": "Charles Bruce Stephenson Deep Sky Survey & 2MASS",
    "discoveryInstrument": "Warner & Swasey 0.6m Schmidt & 2MASS Survey",
    "discoveryMethod": "Infrared Astrometry & Spectral Classification",
    "constellation": "Scutum",
    "coordinates": {
      "ra": "18h 39m 02.37s",
      "dec": "-06° 05′ 10.5″",
      "raDeg": 279.7599,
      "decDeg": -6.0863
    },
    "distance": {
      "lightYears": "18,900 Light Years",
      "parsecs": "5,800 pc",
      "redshift": 0.00038
    },
    "physics": {
      "radius": "2,150 R☉ (~10 AU / Reaches Saturn orbit)",
      "luminosity": "440,000 L☉",
      "mass": "30 - 50 M☉",
      "temperature": "3,200 K",
      "spectralType": "M6 0-Ia",
      "volume": "10 Billion times the Sun"
    },
    "spectralBands": {
      "radio": 25,
      "infrared": 98,
      "optical": 35,
      "ultraviolet": 5,
      "xray": 2,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Holds the record as the largest known star by volume in the observable universe (~2,150 solar radii).",
      "Placed at the center of the massive Stephenson 2 open cluster, enveloped by an enormous detached circumstellar dust shell.",
      "Operates near the theoretical upper limit of stellar radius (Humphreys-Davidson limit) before catastrophic mass shedding."
    ],
    "researchPapers": [
      {
        "title": "A massive star member of the open cluster Stephenson 2 with extreme radius",
        "authors": "Fok, T. K. T., Nakashima, J. I., Yung, B. H. K., et al.",
        "journal": "The Astrophysical Journal",
        "year": 2012,
        "doi": "10.1088/0004-637X/760/1/65",
        "bibcode": "2012ApJ...760...65F",
        "openAccessUrl": "https://arxiv.org/abs/1209.6427"
      }
    ],
    "spectralLines": [
      "TiO molecular absorption bands",
      "CO first overtone bands at 2.3 µm",
      "H-alpha emission"
    ]
  },

  // 40. UY Scuti
  {
    "id": "obj-uy-scuti",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/UY_Scuti_size_comparison.png/800px-UY_Scuti_size_comparison.png",
    "name": "UY Scuti",
    "designation": "BD-12°5055 / IRC -10422",
    "class": "star",
    "subType": "Pulsating Red Supergiant",
    "discoveryYear": 1860,
    "discoveryMission": "Bonn Observatory (Bonner Durchmusterung)",
    "discoveryInstrument": "Fraunhofer Visual Refractor & VLTI AMBER",
    "discoveryMethod": "Trigonometric Parallax & Optical Interferometry",
    "constellation": "Scutum",
    "coordinates": {
      "ra": "18h 27m 36.53s",
      "dec": "-12° 27′ 58.9″",
      "raDeg": 276.9022,
      "decDeg": -12.4664
    },
    "distance": {
      "lightYears": "5,100 Light Years",
      "parsecs": "1,560 pc",
      "redshift": 0.00006
    },
    "physics": {
      "radius": "1,708 ± 192 R☉ (7.94 AU)",
      "luminosity": "340,000 L☉",
      "mass": "7 - 10 M☉",
      "temperature": "3,365 K",
      "pulsationPeriod": "740 Days",
      "spectralType": "M2-M4Ia-Iab"
    },
    "spectralBands": {
      "radio": 20,
      "infrared": 95,
      "optical": 42,
      "ultraviolet": 8,
      "xray": 2,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "One of the largest known pulsating supergiants with an expansive circumstellar gas envelope spanning 400 AU.",
      "Losing mass at an extreme rate of ~5.8 × 10⁻⁵ M☉ per year via dust-driven stellar winds.",
      "Interferometrically measured by ESO VLTI/AMBER, confirming extreme photospheric pulsation dynamics."
    ],
    "researchPapers": [
      {
        "title": "The atmospheric structure and fundamental parameters of the red supergiants AH Scorpii, UY Scuti, and KW Sagittarii",
        "authors": "Arroyo-Torres, B., Wittkowski, M., Marcaide, J. M., et al.",
        "journal": "Astronomy & Astrophysics",
        "year": 2013,
        "doi": "10.1051/0004-6361/201220920",
        "bibcode": "2013A&A...554A..76A",
        "openAccessUrl": "https://arxiv.org/abs/1305.6179"
      }
    ],
    "spectralLines": [
      "Water vapor H2O absorption at 1.4 µm",
      "CO bandheads",
      "SiO maser lines"
    ]
  },

  // 41. VY Canis Majoris
  {
    "id": "obj-vy-cma",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Hubble_traces_the_complex_envelope_of_the_hypergiant_star_VY_Canis_Majoris.jpg/800px-Hubble_traces_the_complex_envelope_of_the_hypergiant_star_VY_Canis_Majoris.jpg",
    "name": "VY Canis Majoris",
    "designation": "HD 58061 / HIP 35793",
    "class": "star",
    "subType": "Oxygen-Rich Red Hypergiant",
    "discoveryYear": 1801,
    "discoveryMission": "Jérôme Lalande Star Catalog / Hubble Space Telescope",
    "discoveryInstrument": "Lalande Quadrant & HST Wide Field Camera 3",
    "discoveryMethod": "High-Resolution Polarimetric Hubble Imaging",
    "constellation": "Canis Major",
    "coordinates": {
      "ra": "07h 22m 58.33s",
      "dec": "-25° 46′ 03.2″",
      "raDeg": 110.743,
      "decDeg": -25.7676
    },
    "distance": {
      "lightYears": "3,900 Light Years",
      "parsecs": "1,200 pc",
      "redshift": 0.00014
    },
    "physics": {
      "radius": "1,420 ± 120 R☉ (6.6 AU)",
      "luminosity": "270,000 L☉",
      "mass": "17 ± 8 M☉ (Initial: 25 - 32 M☉)",
      "temperature": "3,490 K",
      "spectralType": "M5eIa",
      "massLossRate": "2 × 10⁻⁴ M☉ / yr"
    },
    "spectralBands": {
      "radio": 45,
      "infrared": 96,
      "optical": 30,
      "ultraviolet": 10,
      "xray": 4,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Surrounded by a giant multi-arc asymmetric circumstellar nebula produced by localized episodic hyper-eruptions.",
      "One of the most intense natural astronomical maser emitters known, radiating strongly in OH, H2O, and SiO bands.",
      "Hubble polarimetric reconstruction proves the giant knots and arcs were ejected over the past 1,000 years by massive magnetic convective cells."
    ],
    "researchPapers": [
      {
        "title": "The Structure and Kinematics of the Circumstellar Envelope of VY Canis Majoris",
        "authors": "Humphreys, R. M., Helton, L. A., Jones, T. J.",
        "journal": "The Astronomical Journal",
        "year": 2007,
        "doi": "10.1086/511718",
        "bibcode": "2007AJ....133.1534H",
        "openAccessUrl": "https://arxiv.org/abs/astro-ph/0612586"
      }
    ],
    "spectralLines": [
      "1612 MHz OH maser",
      "22 GHz H2O maser",
      "TiO & VO optical absorption"
    ]
  },

  // 42. R136a1
  {
    "id": "obj-r136a1",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/R136a1.jpg/800px-R136a1.jpg",
    "name": "R136a1",
    "designation": "BAT99 108 / RMC 136a1",
    "class": "star",
    "subType": "Wolf-Rayet Star (Most Massive Known Star)",
    "discoveryYear": 1982,
    "discoveryMission": "European Southern Observatory (VLT / SINFONI) & Hubble",
    "discoveryInstrument": "VLT SINFONI & HST STIS",
    "discoveryMethod": "Adaptive Optics Near-IR Spectroscopy",
    "constellation": "Dorado (Large Magellanic Cloud)",
    "coordinates": {
      "ra": "05h 38m 42.43s",
      "dec": "-69° 06′ 02.9″",
      "raDeg": 84.6768,
      "decDeg": -69.1008
    },
    "distance": {
      "lightYears": "163,000 Light Years",
      "parsecs": "49,970 pc",
      "redshift": 0.0009
    },
    "physics": {
      "mass": "196 - 250 M☉ (Birth Mass ~280 - 315 M☉)",
      "luminosity": "4,677,000 L☉",
      "radius": "42.7 R☉",
      "temperature": "46,000 K",
      "spectralType": "WN5h",
      "massLossRate": "5.1 × 10⁻⁵ M☉ / yr via 2,600 km/s stellar wind"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 40,
      "optical": 85,
      "ultraviolet": 100,
      "xray": 35,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Holds the record as the most massive and luminous star discovered in the Universe.",
      "Disproved the longstanding theoretical 150 M☉ stellar upper mass limit for star formation.",
      "Likely future candidate for a pair-instability supernova or direct collapse hypernova with no remnant."
    ],
    "researchPapers": [
      {
        "title": "The R136 star cluster dissected with Hubble Space Telescope/STIS. I. Far-ultraviolet spectroscopic census and a revised mass for R136a1",
        "authors": "Crowther, P. A., Caballero-Nieves, S. M., Bostroem, K. A., et al.",
        "journal": "Monthly Notices of the Royal Astronomical Society",
        "year": 2016,
        "doi": "10.1093/mnras/stw273",
        "bibcode": "2016MNRAS.458..624C",
        "openAccessUrl": "https://arxiv.org/abs/1603.04994"
      }
    ],
    "spectralLines": [
      "He II 4686 Å emission",
      "N IV 4058 Å",
      "Broad Doppler-broadened wind emission"
    ]
  },

  // 43. Betelgeuse
  {
    "id": "obj-betelgeuse",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Betelgeuse_pulsating.gif/800px-Betelgeuse_pulsating.gif",
    "name": "Betelgeuse",
    "designation": "Alpha Orionis / 58 Orionis / HD 39801",
    "class": "star",
    "subType": "Red Supergiant & Supernova Progenitor",
    "discoveryYear": 1603,
    "discoveryMission": "VLT SPHERE & Hubble Space Telescope",
    "discoveryInstrument": "VLT SPHERE Adaptive Optics & HST STIS",
    "discoveryMethod": "Direct Interferometric Photospheric Surface Imaging",
    "constellation": "Orion",
    "coordinates": {
      "ra": "05h 55m 10.31s",
      "dec": "+07° 24′ 25.4″",
      "raDeg": 88.7929,
      "decDeg": 7.4071
    },
    "distance": {
      "lightYears": "642.5 Light Years",
      "parsecs": "197 pc",
      "redshift": 0.00007
    },
    "physics": {
      "radius": "764 - 1,021 R☉ (3.5 - 4.7 AU)",
      "luminosity": "126,000 L☉",
      "mass": "16.5 - 19 M☉",
      "temperature": "3,600 K",
      "spectralType": "M1-2 Ia-ab",
      "supernovaWindow": "Within next 100,000 years (Core Type IIP SN)"
    },
    "spectralBands": {
      "radio": 30,
      "infrared": 98,
      "optical": 75,
      "ultraviolet": 20,
      "xray": 5,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Directly resolved convective surface granulations and giant convective boiling cells imaged by ESO VLT.",
      "The Great Dimming of 2019-2020 was proven to be caused by a massive surface mass ejection condensing into an obscuring dust cloud.",
      "Close enough that when it collapses into a core-collapse supernova, it will outshine the full Moon in daylight."
    ],
    "researchPapers": [
      {
        "title": "A dusty veil shading Betelgeuse during its Great Dimming",
        "authors": "Montargès, M., Cannon, E., Lagadec, E., et al.",
        "journal": "Nature",
        "year": 2021,
        "doi": "10.1038/s41586-021-03546-8",
        "bibcode": "2021Natur.594..365M",
        "openAccessUrl": "https://arxiv.org/abs/2106.11059"
      }
    ],
    "spectralLines": [
      "TiO bands (alpha & gamma systems)",
      "H-alpha absorption / wind emission",
      "Fe I absorption"
    ]
  },

  // 44. Rigel
  {
    "id": "obj-rigel",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rigel_star_-_Hubble_2020.jpg/800px-Rigel_star_-_Hubble_2020.jpg",
    "name": "Rigel",
    "designation": "Beta Orionis / 19 Orionis / HD 34085",
    "class": "star",
    "subType": "Blue-White Supergiant Multiple System",
    "discoveryYear": 1831,
    "discoveryMission": "Hipparcos & Gaia Satellite Astrometric Surveys",
    "discoveryInstrument": "ESA Gaia / Hipparcos Astrometry & CHARA Array",
    "discoveryMethod": "Trigonometric Parallax & High-Resolution Spectroscopy",
    "constellation": "Orion",
    "coordinates": {
      "ra": "05h 14m 32.27s",
      "dec": "-08° 12′ 05.9″",
      "raDeg": 78.6345,
      "decDeg": -8.2016
    },
    "distance": {
      "lightYears": "860 Light Years",
      "parsecs": "260 pc",
      "redshift": 0.00007
    },
    "physics": {
      "radius": "78.9 R☉",
      "luminosity": "120,000 L☉",
      "mass": "21 ± 3 M☉",
      "temperature": "12,100 K",
      "spectralType": "B8 Ia",
      "systemConfiguration": "Rigel A (Supergiant) + Rigel Ba/Bb/C (Spectroscopic triplet)"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 40,
      "optical": 95,
      "ultraviolet": 90,
      "xray": 15,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The brightest star in Orion and the 7th brightest star in the entire night sky despite being 860 light-years away.",
      "Illuminates the Witch Head Reflection Nebula (IC 2118) located 40 light-years away through its intense ultraviolet flux.",
      "Pulsates irregularly with dozens of simultaneous non-radial gravity and pressure oscillation modes."
    ],
    "researchPapers": [
      {
        "title": "Rigel: An enigmatic pulsating blue supergiant",
        "authors": "Moravveji, E., Moya, A., Guinan, E. F.",
        "journal": "The Astrophysical Journal",
        "year": 2012,
        "doi": "10.1088/0004-637X/749/1/74",
        "bibcode": "2012ApJ...749...74M",
        "openAccessUrl": "https://arxiv.org/abs/1202.1388"
      }
    ],
    "spectralLines": [
      "Balmer series H-alpha through H-delta",
      "He I 5876 Å and 6678 Å",
      "C II, N II, Fe II lines"
    ]
  },

  // 45. Sirius (Alpha Canis Majoris)
  {
    "id": "obj-sirius",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Hubble_eyes_Sirius_A_and_B.jpg/800px-Hubble_eyes_Sirius_A_and_B.jpg",
    "name": "Sirius (Alpha Canis Majoris)",
    "designation": "HD 48915 / HIP 32349",
    "class": "star",
    "subType": "Main-Sequence & White Dwarf Binary",
    "discoveryYear": 1862,
    "discoveryMission": "Dearborn Observatory 18.5-inch & Hubble Space Telescope",
    "discoveryInstrument": "Alvan Clark Refractor & HST Space Telescope Imaging Spectrograph (STIS)",
    "discoveryMethod": "Binary Astrometric Wobble & Gravitational Redshift Verification",
    "constellation": "Canis Major",
    "coordinates": {
      "ra": "06h 45m 08.92s",
      "dec": "-16° 42′ 58.0″",
      "raDeg": 101.2872,
      "decDeg": -16.7161
    },
    "distance": {
      "lightYears": "8.60 Light Years",
      "parsecs": "2.64 pc",
      "redshift": -0.00002
    },
    "physics": {
      "mass": "Sirius A: 2.063 M☉ | Sirius B (The Pup): 1.018 M☉",
      "radius": "Sirius A: 1.71 R☉ | Sirius B: 0.0084 R☉ (0.92 R_Earth)",
      "luminosity": "Sirius A: 25.4 L☉ | Sirius B: 0.056 L☉",
      "temperature": "Sirius A: 9,940 K | Sirius B: 25,200 K",
      "spectralType": "A1V + DA2",
      "surfaceGravity": "Sirius B: log g = 8.56 (350,000× Earth gravity)"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 50,
      "optical": 100,
      "ultraviolet": 85,
      "xray": 40,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The brightest star in Earth's night sky (apparent visual magnitude -1.46).",
      "Sirius B is the first discovered white dwarf star; its gravitational redshift (89 km/s) provided one of the earliest experimental tests of General Relativity.",
      "Sirius B packs the entire mass of the Sun into a sphere slightly smaller than Earth, supported solely by electron degeneracy pressure."
    ],
    "researchPapers": [
      {
        "title": "Hubble Space Telescope STIS Observations of the Gravitational Redshift of Sirius B",
        "authors": "Barstow, M. A., Bond, H. E., Holberg, J. B., et al.",
        "journal": "Monthly Notices of the Royal Astronomical Society",
        "year": 2005,
        "doi": "10.1111/j.1365-2966.2005.09359.x",
        "bibcode": "2005MNRAS.362.1134B",
        "openAccessUrl": "https://arxiv.org/abs/astro-ph/0506600"
      }
    ],
    "spectralLines": [
      "Deep Balmer H-beta line with gravitational redshift of +89.1 km/s",
      "He I 4471 Å",
      "Metallic lines"
    ]
  },

  // 46. Vega
  {
    "id": "obj-vega",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Vega_Spitzer.jpg/800px-Vega_Spitzer.jpg",
    "name": "Vega",
    "designation": "Alpha Lyrae / 3 Lyrae / HD 172167",
    "class": "star",
    "subType": "Rapidly Rotating A-type Star with Debris Disk",
    "discoveryYear": 1850,
    "discoveryMission": "Harvard College Observatory (First Photographed Star) & Spitzer Space Telescope",
    "discoveryInstrument": "15-inch Great Refractor & Spitzer Multiband Imaging Photometer (MIPS)",
    "discoveryMethod": "Astrophotometry & Thermal Infrared Circumstellar Disk Imaging",
    "constellation": "Lyra",
    "coordinates": {
      "ra": "18h 36m 56.34s",
      "dec": "+38° 47′ 01.3″",
      "raDeg": 279.2347,
      "decDeg": 38.7837
    },
    "distance": {
      "lightYears": "25.04 Light Years",
      "parsecs": "7.68 pc",
      "redshift": -0.00004
    },
    "physics": {
      "radius": "2.362 × 2.818 R☉ (Extreme rotational oblateness)",
      "luminosity": "40.12 L☉",
      "mass": "2.135 M☉",
      "temperature": "9,602 K (Pole) - 7,900 K (Equator via gravity darkening)",
      "rotationVelocity": "236.2 km/s (Rotates every 12.5 hours / 90% of breakup speed)",
      "spectralType": "A0Va"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 88,
      "optical": 95,
      "ultraviolet": 80,
      "xray": 10,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Served as the baseline standard zero-point (magnitude 0.00) for the astronomical photometric UBV system.",
      "The first star besides the Sun discovered to possess a circumstellar debris disk (discovered by IRAS in 1983).",
      "Rotates so rapidly that centrifugal force makes its equatorial diameter 19% wider than its polar diameter."
    ],
    "researchPapers": [
      {
        "title": "First Results from the CHARA Array. I. An Asterometric and Photometric Study of Vega",
        "authors": "Aufdenberg, J. P., Mérand, A., Coudé du Foresto, V., et al.",
        "journal": "The Astrophysical Journal",
        "year": 2006,
        "doi": "10.1086/504149",
        "bibcode": "2006ApJ...645..664A",
        "openAccessUrl": "https://arxiv.org/abs/astro-ph/0603327"
      }
    ],
    "spectralLines": [
      "Pure hydrogen Balmer absorption series",
      "Far-infrared silicate dust continuum (24 - 160 µm)"
    ]
  },

  // 47. Polaris (North Star)
  {
    "id": "obj-polaris",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Polaris_system.jpg/800px-Polaris_system.jpg",
    "name": "Polaris (North Star)",
    "designation": "Alpha Ursae Minoris / 1 Ursae Minoris / HD 8890",
    "class": "star",
    "subType": "Classical Cepheid Variable Triple System",
    "discoveryYear": 1779,
    "discoveryMission": "William Herschel Discovery & Hubble Space Telescope",
    "discoveryInstrument": "Herschel 7-foot Reflector & HST Advanced Camera for Surveys (ACS)",
    "discoveryMethod": "Cepheid Pulsation Timing & High-Resolution Space Astrometry",
    "constellation": "Ursa Minor",
    "coordinates": {
      "ra": "02h 31m 49.09s",
      "dec": "+89° 15′ 50.8″",
      "raDeg": 37.9546,
      "decDeg": 89.2641
    },
    "distance": {
      "lightYears": "447.6 Light Years",
      "parsecs": "137.2 pc",
      "redshift": -0.00005
    },
    "physics": {
      "mass": "5.4 M☉ (Polaris Aa)",
      "radius": "37.5 R☉",
      "luminosity": "1,260 L☉",
      "period": "3.97 Days (Period increasing by ~4.5 seconds per year)",
      "temperature": "6,015 K",
      "spectralType": "F7Ib"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 55,
      "optical": 92,
      "ultraviolet": 60,
      "xray": 18,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The closest classical Cepheid variable star to Earth, serving as the benchmark standard candle for cosmic distance ladders.",
      "Directly resolved into a close triple star system by the Hubble Space Telescope (Polaris Aa, Ab, and B).",
      "Undergoing rapid evolutionary change: its pulsation amplitude dropped dramatically in the 1990s and is now surging back."
    ],
    "researchPapers": [
      {
        "title": "The Mass and Distance of the Classical Cepheid Polaris",
        "authors": "Evans, N. R., Sasselov, D. D., Shortci, C. I.",
        "journal": "The Astrophysical Journal",
        "year": 2008,
        "doi": "10.1086/590396",
        "bibcode": "2008ApJ...685..414E",
        "openAccessUrl": "https://arxiv.org/abs/0805.4206"
      }
    ],
    "spectralLines": [
      "Ca II H and K absorption lines",
      "Fe I & Fe II diagnostic pulsation lines",
      "H-alpha profile variations"
    ]
  },

  // 48. Proxima Centauri
  {
    "id": "obj-proxima-centauri-star",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/New_shot_of_Proxima_Centauri%2C_our_nearest_neighbour.jpg/800px-New_shot_of_Proxima_Centauri%2C_our_nearest_neighbour.jpg",
    "name": "Proxima Centauri",
    "designation": "Alpha Centauri C / V645 Centauri / HIP 70890",
    "class": "star",
    "subType": "Flare Star Red Dwarf (Closest Star)",
    "discoveryYear": 1915,
    "discoveryMission": "Union Observatory (Robert Innes) & ESO HARPS / ESPRESSO",
    "discoveryInstrument": "9-inch Grubb Refractor & VLT ESPRESSO Echelle Spectrograph",
    "discoveryMethod": "High Proper Motion Astrometry & Radial Velocity Monitoring",
    "constellation": "Centaurus",
    "coordinates": {
      "ra": "14h 29m 42.95s",
      "dec": "-62° 40′ 46.1″",
      "raDeg": 217.4289,
      "decDeg": -62.6795
    },
    "distance": {
      "lightYears": "4.2465 Light Years",
      "parsecs": "1.3020 pc",
      "redshift": -0.00007
    },
    "physics": {
      "mass": "0.1221 M☉ (12.2% solar mass)",
      "radius": "0.1542 R☉ (1.54× Jupiter radius)",
      "luminosity": "0.0017 L☉",
      "temperature": "3,042 K",
      "spectralType": "M5.5Ve",
      "magneticField": "600 Gauss mean surface field"
    },
    "spectralBands": {
      "radio": 35,
      "infrared": 90,
      "optical": 60,
      "ultraviolet": 70,
      "xray": 80,
      "gamma": 5,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The closest known star to our Solar System at 4.2465 light-years away.",
      "Hosts at least two confirmed exoplanets: Proxima b (habitable zone terrestrial world) and Proxima d (sub-Earth world).",
      "Produces monster superflares: in 2019, an extreme magnetic reconnection flare increased its ultraviolet flux by a factor of 14,000 in seconds."
    ],
    "researchPapers": [
      {
        "title": "A terrestrial planet candidate in a temperate orbit around Proxima Centauri",
        "authors": "Anglada-Escudé, G., Amado, P. J., Barnes, J., et al.",
        "journal": "Nature",
        "year": 2016,
        "doi": "10.1038/nature19332",
        "bibcode": "2016Natur.536..437A",
        "openAccessUrl": "https://arxiv.org/abs/1609.03449"
      }
    ],
    "spectralLines": [
      "H-alpha emission in flare state",
      "TiO molecular bands",
      "Ca II infrared triplet emission"
    ]
  },

  // 49. Alpha Centauri AB (Rigil Kentaurus & Toliman)
  {
    "id": "obj-alpha-centauri-ab",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Alpha_Centauri_system.jpg/800px-Alpha_Centauri_system.jpg",
    "name": "Alpha Centauri AB (Rigil Kentaurus & Toliman)",
    "designation": "HD 128620 + HD 128621 / HIP 71683",
    "class": "star",
    "subType": "Solar-Analog Binary Star System",
    "discoveryYear": 1689,
    "discoveryMission": "Pondicherry Jesuit Observatory (Jean Richaud) & ESO VLT NACO",
    "discoveryInstrument": "12-foot Refractor & VLT NACO Adaptive Optics",
    "discoveryMethod": "Visual Double Astrometry & Astroseismology",
    "constellation": "Centaurus",
    "coordinates": {
      "ra": "14h 39m 36.50s",
      "dec": "-60° 50′ 02.3″",
      "raDeg": 219.9021,
      "decDeg": -60.834
    },
    "distance": {
      "lightYears": "4.37 Light Years",
      "parsecs": "1.34 pc",
      "redshift": -0.00007
    },
    "physics": {
      "mass": "Alpha Cen A: 1.100 M☉ | Alpha Cen B: 0.907 M☉",
      "radius": "Alpha Cen A: 1.223 R☉ | Alpha Cen B: 0.863 R☉",
      "luminosity": "Alpha Cen A: 1.519 L☉ | Alpha Cen B: 0.500 L☉",
      "temperature": "Alpha Cen A: 5,790 K | Alpha Cen B: 5,260 K",
      "orbitalPeriod": "79.91 Years",
      "spectralType": "G2V + K1V"
    },
    "spectralBands": {
      "radio": 10,
      "infrared": 65,
      "optical": 98,
      "ultraviolet": 40,
      "xray": 20,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The closest Sun-like star system to Earth, sharing nearly identical metallicity and age (~5.3 billion years).",
      "The primary target for the Breakthrough Starshot interstellar laser-sail nanocraft exploration initiative.",
      "High-precision asteroseismology has accurately mapped the internal sound speed profile and core convection boundaries of both stars."
    ],
    "researchPapers": [
      {
        "title": "Solar-like oscillations in Alpha Centauri A and B",
        "authors": "Bazan, G., Bedding, T. R., Butler, R. P., et al.",
        "journal": "The Astrophysical Journal",
        "year": 2004,
        "doi": "10.1086/424855",
        "bibcode": "2004ApJ...614..380B",
        "openAccessUrl": "https://arxiv.org/abs/astro-ph/0406560"
      }
    ],
    "spectralLines": [
      "Sodium D doublets (5890 Å, 5896 Å)",
      "Fe I & Fe II solar-metallicity lines",
      "Balmer H-beta"
    ]
  },

  // 50. TRAPPIST-1 (Star)
  {
    "id": "obj-trappist-1-star",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/PIA21421_-_TRAPPIST-1_Artist%27s_Concept.jpg/800px-PIA21421_-_TRAPPIST-1_Artist%27s_Concept.jpg",
    "name": "TRAPPIST-1 (Star)",
    "designation": "2MASS J23062928-0502285",
    "class": "star",
    "subType": "Ultra-Cool M-Dwarf Planetary Host",
    "discoveryYear": 1999,
    "discoveryMission": "TRAPPIST-South & Spitzer Space Telescope",
    "discoveryInstrument": "TRAPPIST 0.6m & Spitzer Infrared Array Camera (IRAC)",
    "discoveryMethod": "High-Cadence Infrared Transit Photometry",
    "constellation": "Aquarius",
    "coordinates": {
      "ra": "23h 06m 29.38s",
      "dec": "-05° 02′ 28.6″",
      "raDeg": 346.6224,
      "decDeg": -5.0413
    },
    "distance": {
      "lightYears": "40.66 Light Years",
      "parsecs": "12.47 pc",
      "redshift": -0.00019
    },
    "physics": {
      "mass": "0.0898 M☉ (Only ~93 Jupiter masses)",
      "radius": "0.121 R☉ (Comparable to Jupiter)",
      "luminosity": "0.000553 L☉ (1/1800th Sun)",
      "temperature": "2,566 K",
      "age": "7.6 ± 2.2 Billion Years",
      "spectralType": "M8V"
    },
    "spectralBands": {
      "radio": 15,
      "infrared": 98,
      "optical": 35,
      "ultraviolet": 30,
      "xray": 45,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Hosts the largest known resonant chain of Earth-sized planets (7 terrestrial planets, with 3-4 in the habitable zone).",
      "A fully convective red dwarf, meaning it will steadily burn hydrogen for nearly 12 trillion years—1,000 times longer than the current age of the Universe.",
      "Intensively scrutinized by JWST NIRSpec and MIRI for secondary planetary atmospheres and biosignature precursors."
    ],
    "researchPapers": [
      {
        "title": "Seven temperate terrestrial planets around the nearby ultracool dwarf star TRAPPIST-1",
        "authors": "Gillon, M., Triaud, A. H. M. J., Demory, B. O., et al.",
        "journal": "Nature",
        "year": 2017,
        "doi": "10.1038/nature21360",
        "bibcode": "2017Natur.542..456G",
        "openAccessUrl": "https://arxiv.org/abs/1703.01424"
      }
    ],
    "spectralLines": [
      "Water vapor H2O and CO2 infrared bands",
      "FeH Wing-Ford band at 9900 Å",
      "TiO & VO absorption"
    ]
  },

  // 51. Eta Carinae
  {
    "id": "obj-eta-carinae",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Eta_Carinae_Hubble_2019.jpg/800px-Eta_Carinae_Hubble_2019.jpg",
    "name": "Eta Carinae",
    "designation": "HD 93308 / HR 4210",
    "class": "star",
    "subType": "Luminous Blue Variable Colliding-Wind Binary",
    "discoveryYear": 1677,
    "discoveryMission": "Edmond Halley Observation / Hubble Space Telescope WFC3",
    "discoveryInstrument": "HST WFC3 & Chandra X-ray Observatory ACIS",
    "discoveryMethod": "Multi-Wavelength High-Resolution Nebula & Spectroscopic Mapping",
    "constellation": "Carina",
    "coordinates": {
      "ra": "10h 45m 03.59s",
      "dec": "-59° 41′ 04.3″",
      "raDeg": 161.265,
      "decDeg": -59.6845
    },
    "distance": {
      "lightYears": "7,500 Light Years",
      "parsecs": "2,300 pc",
      "redshift": -0.00008
    },
    "physics": {
      "mass": "Primary: ~100 M☉ | Secondary: ~30-40 M☉",
      "luminosity": "5,000,000 L☉",
      "radius": "Primary: 60 - 100 R☉",
      "temperature": "Primary: 15,000 - 30,000 K | Secondary: 37,200 K",
      "orbitalPeriod": "5.54 Years (2,024 Days)",
      "spectralType": "LBV + O-type"
    },
    "spectralBands": {
      "radio": 40,
      "infrared": 98,
      "optical": 85,
      "ultraviolet": 92,
      "xray": 90,
      "gamma": 65,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Site of the Great Eruption of 1843, when it ejected 10-40 solar masses of gas to form the iconic bipolar Homunculus Nebula.",
      "The colliding stellar winds generate intense X-ray and high-energy gamma radiation detected by NASA's Fermi-LAT telescope.",
      "The primary star is unstable and predicted to explode as an ultra-energetic core-collapse hypernova within the next astronomical instant."
    ],
    "researchPapers": [
      {
        "title": "The Great Eruption of Eta Carinae and its light echoes",
        "authors": "Rest, A., Prieto, J. L., Walborn, N. R., et al.",
        "journal": "Nature",
        "year": 2012,
        "doi": "10.1038/nature10775",
        "bibcode": "2012Natur.482..375R",
        "openAccessUrl": "https://arxiv.org/abs/1202.4808"
      }
    ],
    "spectralLines": [
      "[Fe II] forbidden emission lines",
      "H-alpha P-Cygni profile",
      "He II 4686 Å colliding-wind emission"
    ]
  },

  // 52. Pistol Star
  {
    "id": "obj-pistol-star",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Pistol_Star_and_Nebula.jpg/800px-Pistol_Star_and_Nebula.jpg",
    "name": "Pistol Star",
    "designation": "V4647 Sagittarii / qF362",
    "class": "star",
    "subType": "Galactic Center Luminous Blue Hypergiant",
    "discoveryYear": 1990,
    "discoveryMission": "Hubble Space Telescope (NICMOS)",
    "discoveryInstrument": "Near Infrared Camera and Multi-Object Spectrometer (NICMOS)",
    "discoveryMethod": "Near-Infrared Penetration of Galactic Center Dust Obscuration",
    "constellation": "Sagittarius",
    "coordinates": {
      "ra": "17h 46m 15.24s",
      "dec": "-28° 50′ 03.6″",
      "raDeg": 266.5635,
      "decDeg": -28.8343
    },
    "distance": {
      "lightYears": "25,000 Light Years",
      "parsecs": "7,700 pc",
      "redshift": 0.00043
    },
    "physics": {
      "luminosity": "1,600,000 - 3,300,000 L☉",
      "radius": "306 - 420 R☉ (1.4 - 2.0 AU)",
      "mass": "80 - 150 M☉ (Initial mass ~200 M☉)",
      "temperature": "11,800 K",
      "spectralType": "LBV",
      "ejectedNebulaMass": "Over 10 solar masses in Pistol Nebula"
    },
    "spectralBands": {
      "radio": 20,
      "infrared": 98,
      "optical": 10,
      "ultraviolet": 60,
      "xray": 35,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Radiates as much energy in 20 seconds as the Sun produces in an entire year.",
      "Located within the dense Quintuplet Cluster near the supermassive black hole Sagittarius A*.",
      "Created the 4-light-year-wide Pistol Nebula by shedding massive shells during giant episodic eruptions ~4,000 and ~6,000 years ago."
    ],
    "researchPapers": [
      {
        "title": "The Pistol Star",
        "authors": "Figer, D. F., Najarro, F., Morris, M., et al.",
        "journal": "The Astrophysical Journal",
        "year": 1998,
        "doi": "10.1086/306275",
        "bibcode": "1998ApJ...506..384F",
        "openAccessUrl": "https://arxiv.org/abs/astro-ph/9805331"
      }
    ],
    "spectralLines": [
      "Paschen-alpha 1.875 µm emission",
      "Brackett-gamma 2.166 µm",
      "He I 2.058 µm"
    ]
  },

  // 53. WR 102
  {
    "id": "obj-wr-102",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/WR102_in_its_nebula_G2.4%2B1.4.png/800px-WR102_in_its_nebula_G2.4%2B1.4.png",
    "name": "WR 102",
    "designation": "Sand 4 / V3893 Sagittarii",
    "class": "star",
    "subType": "Oxygen Wolf-Rayet Star (Hottest Known Star)",
    "discoveryYear": 1971,
    "discoveryMission": "Cerro Tololo Inter-American Observatory (Nicholas Sanduleak)",
    "discoveryInstrument": "CTIO 0.9m Schmidt & VLT X-shooter",
    "discoveryMethod": "Objective Prism Emission Spectrophotometry",
    "constellation": "Sagittarius",
    "coordinates": {
      "ra": "17h 45m 47.01s",
      "dec": "-26° 10′ 26.8″",
      "raDeg": 266.4459,
      "decDeg": -26.1741
    },
    "distance": {
      "lightYears": "9,400 Light Years",
      "parsecs": "2,900 pc",
      "redshift": 0.00019
    },
    "physics": {
      "temperature": "210,000 K (Hottest known stellar surface)",
      "luminosity": "282,000 L☉",
      "radius": "0.52 R☉ (Half the radius of the Sun)",
      "mass": "16.7 M☉",
      "windVelocity": "5,000 km/s",
      "spectralType": "WO2",
      "remainingLifetime": "< 1,500 Years until core collapse (Type Ic / GRB)"
    },
    "spectralBands": {
      "radio": 10,
      "infrared": 30,
      "optical": 75,
      "ultraviolet": 100,
      "xray": 90,
      "gamma": 10,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The hottest known star in the universe with a surface temperature exceeding 210,000 K (36 times hotter than the Sun).",
      "In the final carbon/oxygen burning phase; it has stripped all of its hydrogen and helium envelopes.",
      "Astrophysically calculated to be within 1,500 years of collapsing into a Type Ic supernova and potential gamma-ray burst."
    ],
    "researchPapers": [
      {
        "title": "The WO Wolf-Rayet stars: Mass loss, stellar winds, and supernova progenitors",
        "authors": "Tramper, F., Straal, S. M., Sanyal, D., et al.",
        "journal": "Astronomy & Astrophysics",
        "year": 2015,
        "doi": "10.1051/0004-6361/201526107",
        "bibcode": "2015A&A...581A.110T",
        "openAccessUrl": "https://arxiv.org/abs/1507.00839"
      }
    ],
    "spectralLines": [
      "Intense O VI 3811 - 3834 Å emission",
      "C IV 5801 Å",
      "He II 4686 Å"
    ]
  },

  // 54. Methuselah Star (HD 140283)
  {
    "id": "obj-methuselah-star",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Methuselah_star_HD_140283.jpg/800px-Methuselah_star_HD_140283.jpg",
    "name": "Methuselah Star (HD 140283)",
    "designation": "HD 140283 / BD+00°3498 / HIP 76976",
    "class": "star",
    "subType": "Ancient Metal-Poor Subgiant (Oldest Known Star)",
    "discoveryYear": 1912,
    "discoveryMission": "Hubble Space Telescope Fine Guidance Sensors (FGS)",
    "discoveryInstrument": "HST FGS & Keck Observatory HIRES",
    "discoveryMethod": "High-Precision Trigonometric Parallax & Isochrone Fitting",
    "constellation": "Libra",
    "coordinates": {
      "ra": "15h 43m 03.10s",
      "dec": "-10° 56′ 00.6″",
      "raDeg": 235.7629,
      "decDeg": -10.9335
    },
    "distance": {
      "lightYears": "202.4 Light Years",
      "parsecs": "62.06 pc",
      "redshift": -0.00057
    },
    "physics": {
      "age": "13.7 ± 0.7 Billion Years (Formed ~200-400 Myr post-Big Bang)",
      "metallicity": "[Fe/H] = -2.40 (Less than 0.4% solar iron)",
      "mass": "0.805 M☉",
      "radius": "2.04 R☉",
      "luminosity": "4.83 L☉",
      "temperature": "5,787 K",
      "spectralType": "sdF3"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 60,
      "optical": 95,
      "ultraviolet": 45,
      "xray": 5,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The oldest known star in the universe with a direct parallax-calibrated age determination (~13.7 billion years).",
      "Formed from pristine gas enriched by only the first generation of Population III stars.",
      "Travels through the Milky Way halo on a high-velocity retrograde orbit exceeding 1.3 million km/h."
    ],
    "researchPapers": [
      {
        "title": "HD 140283: A Star in the Solar Neighborhood that Formed Shortly After the Big Bang",
        "authors": "Bond, H. E., Nelan, E. P., VandenBerg, D. A., et al.",
        "journal": "The Astrophysical Journal Letters",
        "year": 2013,
        "doi": "10.1088/2041-8205/765/1/L12",
        "bibcode": "2013ApJ...765L..12B",
        "openAccessUrl": "https://arxiv.org/abs/1302.3180"
      }
    ],
    "spectralLines": [
      "Weak Fe I and Fe II lines",
      "Oxygen abundance [O/Fe] = +0.6",
      "CH G-band"
    ]
  },

  // 55. Boyajian's Star (Tabby's Star)
  {
    "id": "obj-boyajians-star",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Artist%E2%80%99s_impression_of_Boyajian%27s_star.jpg/800px-Artist%E2%80%99s_impression_of_Boyajian%27s_star.jpg",
    "name": "Boyajian's Star (Tabby's Star)",
    "designation": "KIC 8462852 / TYC 3162-665-1",
    "class": "star",
    "subType": "F-type Star with Anomalous Irregular Dips",
    "discoveryYear": 2015,
    "discoveryMission": "Kepler Space Telescope & Planet Hunters Citizen Science",
    "discoveryInstrument": "Kepler 0.95m Space Photometer",
    "discoveryMethod": "Ultra-High Cadence Spaceborne Transit Photometry",
    "constellation": "Cygnus",
    "coordinates": {
      "ra": "20h 06m 15.46s",
      "dec": "+44° 27′ 24.8″",
      "raDeg": 301.5644,
      "decDeg": 44.4569
    },
    "distance": {
      "lightYears": "1,470 Light Years",
      "parsecs": "450 pc",
      "redshift": 0.00001
    },
    "physics": {
      "mass": "1.43 M☉",
      "radius": "1.58 R☉",
      "luminosity": "4.68 L☉",
      "temperature": "6,750 K",
      "maxDipDepth": "Up to 22% aperiodic optical flux drop",
      "spectralType": "F3V"
    },
    "spectralBands": {
      "radio": 15,
      "infrared": 70,
      "optical": 95,
      "ultraviolet": 40,
      "xray": 10,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Exhibits massive, irregular, non-periodic dips in brightness of up to 22%, defying standard planetary transit models.",
      "Multicolor photometric observations show greater dimming in blue light than infrared, confirming circumstellar dust rather than solid megastructures.",
      "The leading scientific explanation involves a swarm of disintegrating exocomets or pulverized planetesimal debris."
    ],
    "researchPapers": [
      {
        "title": "Planet Hunters IX. KIC 8462852 - Where's the flux?",
        "authors": "Boyajian, T. S., LaCourse, D. M., Rappaport, S. A., et al.",
        "journal": "Monthly Notices of the Royal Astronomical Society",
        "year": 2016,
        "doi": "10.1093/mnras/stw218",
        "bibcode": "2016MNRAS.457.3988B",
        "openAccessUrl": "https://arxiv.org/abs/1509.03622"
      }
    ],
    "spectralLines": [
      "Standard F3V stellar absorption spectrum",
      "Absence of strong infrared dust excess at < 24 µm",
      "Interstellar sodium D lines"
    ]
  },

  // 56. Mira (The Wonderful)
  {
    "id": "obj-mira",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Mira_tail_GALEX.jpg/800px-Mira_tail_GALEX.jpg",
    "name": "Mira (The Wonderful)",
    "designation": "Omicron Ceti / 68 Ceti / HD 14386",
    "class": "star",
    "subType": "Pulsating Red Giant with 13-LY Comet Tail",
    "discoveryYear": 1596,
    "discoveryMission": "David Fabricius Observation & GALEX Space Telescope",
    "discoveryInstrument": "GALEX Far-UV/Near-UV Imager & HST FOC",
    "discoveryMethod": "Spaceborne Ultraviolet Bow Shock & Tail Mapping",
    "constellation": "Cetus",
    "coordinates": {
      "ra": "02h 19m 20.79s",
      "dec": "-02° 58′ 39.5″",
      "raDeg": 34.8366,
      "decDeg": -2.9776
    },
    "distance": {
      "lightYears": "299 Light Years",
      "parsecs": "92 pc",
      "redshift": 0.00021
    },
    "physics": {
      "pulsationPeriod": "332 Days (Magnitude varies from 2.0 to 10.1)",
      "tailLength": "13 Light Years (Sheared in UV by interstellar medium)",
      "velocity": "130 km/s supersonic space velocity",
      "radius": "332 - 402 R☉",
      "mass": "1.18 M☉ (Binary with white dwarf Mira B)",
      "temperature": "2,900 - 3,200 K",
      "spectralType": "M7 IIIe"
    },
    "spectralBands": {
      "radio": 25,
      "infrared": 95,
      "optical": 65,
      "ultraviolet": 85,
      "xray": 35,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Prototype for all Mira-type pulsating variable stars, known for over four centuries.",
      "NASA's GALEX revealed an astonishing 13-light-year-long comet-like tail glowing in ultraviolet light, shed over 30,000 years.",
      "Drives a supersonic bow shock through interstellar space at 130 km/s, transferring enriched heavy elements to the galaxy."
    ],
    "researchPapers": [
      {
        "title": "A turbulent wake of a moving giant star",
        "authors": "Martin, D. C., Seibert, M., Neill, J. D., et al.",
        "journal": "Nature",
        "year": 2007,
        "doi": "10.1038/nature06003",
        "bibcode": "2007Natur.448..780M",
        "openAccessUrl": "https://arxiv.org/abs/0708.2724"
      }
    ],
    "spectralLines": [
      "Hydrogen emission lines H-delta and H-gamma",
      "TiO absorption bands",
      "SiO masers"
    ]
  },

  // 57. Antares (Cor Scorpii)
  {
    "id": "obj-antares",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Antares_VLTI.jpg/800px-Antares_VLTI.jpg",
    "name": "Antares (Cor Scorpii)",
    "designation": "Alpha Scorpii / 21 Scorpii / HD 148478",
    "class": "star",
    "subType": "Red Supergiant & Circumstellar Emission Cloud",
    "discoveryYear": 1846,
    "discoveryMission": "ESO Very Large Telescope Interferometer (VLTI)",
    "discoveryInstrument": "VLTI AMBER & GRAVITY Interferometers",
    "discoveryMethod": "Near-Infrared Two-Dimensional Photospheric Velocity Interferometry",
    "constellation": "Scorpius",
    "coordinates": {
      "ra": "16h 29m 24.46s",
      "dec": "-26° 25′ 55.2″",
      "raDeg": 247.3519,
      "decDeg": -26.432
    },
    "distance": {
      "lightYears": "550 Light Years",
      "parsecs": "170 pc",
      "redshift": -0.00001
    },
    "physics": {
      "radius": "680 R☉ (3.16 AU)",
      "luminosity": "75,900 L☉",
      "mass": "11 - 14 M☉",
      "temperature": "3,660 K",
      "companion": "Antares B (B2.5V main sequence blue companion)",
      "spectralType": "M1.5Iab-Ib"
    },
    "spectralBands": {
      "radio": 30,
      "infrared": 98,
      "optical": 85,
      "ultraviolet": 35,
      "xray": 15,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The first 2D velocity map of motions in any stellar atmosphere outside our Solar System was mapped on Antares using ESO VLTI.",
      "Revealed unexpectedly vigorous, non-magnetic convective gas churning extending 1.7 stellar radii into space.",
      "Illuminates the vast Rho Ophiuchi and Antares reflection and emission nebular cloud complex."
    ],
    "researchPapers": [
      {
        "title": "Dynamical atmospheric mapping of the red supergiant Antares with VLTI/AMBER",
        "authors": "Ohnaka, K., Weigelt, G., Hofmann, K. H.",
        "journal": "Nature",
        "year": 2017,
        "doi": "10.1038/nature23445",
        "bibcode": "2017Natur.548..310O",
        "openAccessUrl": "https://arxiv.org/abs/1708.05342"
      }
    ],
    "spectralLines": [
      "CO 2.3 µm bandhead lines in atmosphere",
      "Fe I lines",
      "Circumstellar [Fe II] nebular emission"
    ]
  },

  // 58. Arcturus
  {
    "id": "obj-arcturus",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Arcturus_HST.jpg/800px-Arcturus_HST.jpg",
    "name": "Arcturus",
    "designation": "Alpha Boötis / 16 Boötis / HD 124897",
    "class": "star",
    "subType": "High-Velocity Galactic Stream Orange Giant",
    "discoveryYear": 1718,
    "discoveryMission": "Edmond Halley Proper Motion Discovery & Gaia Satellite",
    "discoveryInstrument": "Transit Circle Telescopes & Gaia Astrometry",
    "discoveryMethod": "Trigonometric Parallax & Galactic Kinematic Reconstruction",
    "constellation": "Boötes",
    "coordinates": {
      "ra": "14h 15m 39.67s",
      "dec": "+19° 10′ 56.7″",
      "raDeg": 213.9153,
      "decDeg": 19.1824
    },
    "distance": {
      "lightYears": "36.7 Light Years",
      "parsecs": "11.26 pc",
      "redshift": -0.00002
    },
    "physics": {
      "radius": "25.4 R☉",
      "luminosity": "170 L☉",
      "mass": "1.08 M☉",
      "properMotion": "2.28 arcsec / yr (122 km/s space velocity)",
      "temperature": "4,286 K",
      "metallicity": "[Fe/H] = -0.52 (One-third solar)",
      "spectralType": "K0 III"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 88,
      "optical": 98,
      "ultraviolet": 30,
      "xray": 5,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The brightest star in the northern celestial hemisphere and the 4th brightest star in the entire sky.",
      "Led Edmond Halley in 1718 to discover that stars are not fixed in space, pioneering stellar proper motion.",
      "Member of the Arcturus Stream, an ancient stellar group originating from an ancient dwarf galaxy consumed by the Milky Way billions of years ago."
    ],
    "researchPapers": [
      {
        "title": "Fundamental parameters and atmospheric kinematics of the red giant Arcturus",
        "authors": "Ramírez, I., Prieto, C. A.",
        "journal": "The Astrophysical Journal",
        "year": 2011,
        "doi": "10.1088/0004-637X/743/2/135",
        "bibcode": "2011ApJ...743..135R",
        "openAccessUrl": "https://arxiv.org/abs/1109.4425"
      }
    ],
    "spectralLines": [
      "Ca II H & K lines with chromospheric reversal",
      "Mg I triplet",
      "CN and OH molecular absorption"
    ]
  },

  // 59. Canopus
  {
    "id": "obj-canopus",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Canopus_ESO.jpg/800px-Canopus_ESO.jpg",
    "name": "Canopus",
    "designation": "Alpha Carinae / HD 45348 / HIP 30438",
    "class": "star",
    "subType": "Bright Supergiant Navigational Standard",
    "discoveryYear": 1847,
    "discoveryMission": "Hipparcos Astrometry & Spacecraft Attitude Control Systems",
    "discoveryInstrument": "Spacecraft Star Trackers (Apollo, Voyager, Cassini, New Horizons)",
    "discoveryMethod": "High-Precision Photoelectric Astrometry & Stellar Navigation",
    "constellation": "Carina",
    "coordinates": {
      "ra": "06h 23m 57.11s",
      "dec": "-52° 41′ 44.4″",
      "raDeg": 95.9879,
      "decDeg": -52.6957
    },
    "distance": {
      "lightYears": "310 Light Years",
      "parsecs": "95 pc",
      "redshift": 0.00007
    },
    "physics": {
      "luminosity": "10,700 L☉",
      "radius": "71 R☉",
      "mass": "8.0 M☉",
      "temperature": "7,400 K",
      "spectralType": "A9 II"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 55,
      "optical": 100,
      "ultraviolet": 75,
      "xray": 35,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The second brightest star in the night sky (visual magnitude -0.74).",
      "The cornerstone navigational beacon for interplanetary spacecraft: Mariner, Voyager, and Cassini used dedicated Canopus Star Trackers for attitude orientation.",
      "Possesses an anomalous X-ray-emitting corona heated to millions of degrees, rare for intermediate-mass supergiants."
    ],
    "researchPapers": [
      {
        "title": "Fundamental parameters of the bright supergiant Canopus",
        "authors": "Cruzalebes, P., Jorissen, A., Rabbia, C., et al.",
        "journal": "Monthly Notices of the Royal Astronomical Society",
        "year": 2013,
        "doi": "10.1093/mnras/stt1109",
        "bibcode": "2013MNRAS.434..437C",
        "openAccessUrl": "https://arxiv.org/abs/1306.4024"
      }
    ],
    "spectralLines": [
      "Balmer series H-alpha through H-epsilon",
      "Strong ionized Fe II and Ti II lines",
      "Ca II infrared triplet"
    ]
  },

  // 60. Deneb
  {
    "id": "obj-deneb",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Deneb.jpg/800px-Deneb.jpg",
    "name": "Deneb",
    "designation": "Alpha Cygni / 50 Cygni / HD 197345",
    "class": "star",
    "subType": "Extremely Luminous Blue-White Supergiant",
    "discoveryYear": 1838,
    "discoveryMission": "Hipparcos & Gaia Satellite Astrometric Surveys",
    "discoveryInstrument": "ESA Gaia Early Data Release 3 & CHARA Array",
    "discoveryMethod": "Parallax & Optical Long-Baseline Interferometry",
    "constellation": "Cygnus",
    "coordinates": {
      "ra": "20h 41m 25.92s",
      "dec": "+45° 16′ 49.2″",
      "raDeg": 310.3579,
      "decDeg": 45.2803
    },
    "distance": {
      "lightYears": "2,615 Light Years",
      "parsecs": "802 pc",
      "redshift": -0.00002
    },
    "physics": {
      "luminosity": "196,000 L☉ (Produces more light in 1 day than Sun in 500 years)",
      "radius": "203 R☉ (Nearly 1 AU radius)",
      "mass": "19 ± 4 M☉",
      "temperature": "8,525 K",
      "spectralType": "A2 Ia",
      "pulsationPeriod": "Multiple non-radial periods (Alpha Cygni prototype)"
    },
    "spectralBands": {
      "radio": 10,
      "infrared": 50,
      "optical": 98,
      "ultraviolet": 85,
      "xray": 15,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The most distant first-magnitude star visible to the naked eye from Earth (~2,600 light-years).",
      "The archetype prototype for Alpha Cygni variable stars, undergoing continuous non-radial pulsations across its vast photosphere.",
      "Anchors the iconic Summer Triangle asterism alongside Vega and Altair."
    ],
    "researchPapers": [
      {
        "title": "The fundamental parameters of the luminous supergiant Deneb",
        "authors": "Schiller, F., Przybilla, N.",
        "journal": "Astronomy & Astrophysics",
        "year": 2008,
        "doi": "10.1051/0004-6361:20078590",
        "bibcode": "2008A&A...479..849S",
        "openAccessUrl": "https://arxiv.org/abs/0712.0040"
      }
    ],
    "spectralLines": [
      "Intense H-alpha P-Cygni profile indicating massive wind",
      "N I & N II enrichment",
      "Mg II 4481 Å"
    ]
  },

  // 61. Aldebaran (Eye of the Bull)
  {
    "id": "obj-aldebaran",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Aldebaran_ESO.jpg/800px-Aldebaran_ESO.jpg",
    "name": "Aldebaran (Eye of the Bull)",
    "designation": "Alpha Tauri / 87 Tauri / HD 29139",
    "class": "star",
    "subType": "Orange Giant with Sub-Stellar Companion",
    "discoveryYear": 1993,
    "discoveryMission": "Lick Observatory Radial Velocity Search & CHARA Array",
    "discoveryInstrument": "Hamilton Echelle Spectrograph & CHARA Interferometer",
    "discoveryMethod": "Precise Doppler Radial Velocity & Optical Interferometry",
    "constellation": "Taurus",
    "coordinates": {
      "ra": "04h 35m 55.24s",
      "dec": "+16° 30′ 33.5″",
      "raDeg": 68.9802,
      "decDeg": 16.5093
    },
    "distance": {
      "lightYears": "65.3 Light Years",
      "parsecs": "20.0 pc",
      "redshift": 0.00018
    },
    "physics": {
      "radius": "44.13 R☉ (Encompasses Mercury's orbit)",
      "luminosity": "439 L☉",
      "mass": "1.16 M☉",
      "temperature": "3,900 K",
      "companionPlanet": "Aldebaran b (6.47 M_Jup, 628-day orbital period)",
      "spectralType": "K5+ III"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 92,
      "optical": 95,
      "ultraviolet": 20,
      "xray": 5,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The brightest star in the zodiac constellation Taurus, marking the fiery red eye of the Bull.",
      "Hosts confirmed giant gas exoplanet Aldebaran b, providing vital data on planet survival during host star red giant expansion.",
      "NASA's Pioneer 10 spacecraft is currently coasting toward Aldebaran, scheduled to make its closest pass in 2 million years."
    ],
    "researchPapers": [
      {
        "title": "Precise radial velocities of giant stars. IX. A prospective planet candidate orbiting the K-giant Aldebaran",
        "authors": "Hatzes, A. P., Doellinger, M., Guenther, E. W., et al.",
        "journal": "Astronomy & Astrophysics",
        "year": 2015,
        "doi": "10.1051/0004-6361/201525580",
        "bibcode": "2015A&A...580A..31H",
        "openAccessUrl": "https://arxiv.org/abs/1505.03454"
      }
    ],
    "spectralLines": [
      "Deep neutral metal absorption (Fe I, Ca I)",
      "Strong TiO absorption bandheads",
      "H-alpha absorption"
    ]
  },

  // 62. Barnard's Star
  {
    "id": "obj-barnards-star",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Barnard%27s_Star_ESO.jpg/800px-Barnard%27s_Star_ESO.jpg",
    "name": "Barnard's Star",
    "designation": "Gliese 699 / BD+04°3561a / HIP 87937",
    "class": "star",
    "subType": "Ultra-High Proper Motion Red Dwarf",
    "discoveryYear": 1916,
    "discoveryMission": "Yerkes Observatory (E. E. Barnard) & VLT ESPRESSO",
    "discoveryInstrument": "40-inch Great Yerkes Refractor & VLT ESPRESSO",
    "discoveryMethod": "Multi-Epoch Photographic Astrometric Comparison",
    "constellation": "Ophiuchus",
    "coordinates": {
      "ra": "17h 57m 48.50s",
      "dec": "+04° 41′ 36.2″",
      "raDeg": 269.4521,
      "decDeg": 4.6934
    },
    "distance": {
      "lightYears": "5.96 Light Years",
      "parsecs": "1.828 pc",
      "redshift": -0.00037
    },
    "physics": {
      "properMotion": "10.37 arcseconds/yr (Fastest of any known star)",
      "mass": "0.144 M☉",
      "radius": "0.178 R☉",
      "luminosity": "0.0035 L☉",
      "temperature": "3,278 K",
      "age": "10 Billion Years",
      "spectralType": "M4.0V"
    },
    "spectralBands": {
      "radio": 10,
      "infrared": 92,
      "optical": 65,
      "ultraviolet": 20,
      "xray": 30,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Has the highest known proper motion of any star in the sky, traversing the width of the full Moon every 180 years.",
      "The second closest star system to the Sun after the Alpha Centauri system (5.96 light-years).",
      "In 2024, ESPRESSO confirmed a sub-Earth planet orbiting every 3.15 days, showing red dwarfs readily assemble planetary systems."
    ],
    "researchPapers": [
      {
        "title": "A sub-Earth planet orbiting Barnard's star candidate from ESPRESSO",
        "authors": "González Hernández, J. I., Silva, A. M., Zapatero Osorio, M. R., et al.",
        "journal": "Astronomy & Astrophysics",
        "year": 2024,
        "doi": "10.1051/0004-6361/202451311",
        "bibcode": "2024A&A...690A..79G",
        "openAccessUrl": "https://arxiv.org/abs/2409.19747"
      }
    ],
    "spectralLines": [
      "CaH and TiO molecular absorption bands",
      "FeH bandheads at 9900 Å",
      "Chromospheric Ca II emission"
    ]
  },

  // 63. WR 140
  {
    "id": "obj-wr-140",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/WR_140_NIRCam_MIRI_composite.png/800px-WR_140_NIRCam_MIRI_composite.png",
    "name": "WR 140",
    "designation": "HD 193793 / V1687 Cygni",
    "class": "star",
    "subType": "Colliding-Wind Binary with Nested Dust Shells",
    "discoveryYear": 1977,
    "discoveryMission": "James Webb Space Telescope (JWST) & UKIRT",
    "discoveryInstrument": "JWST Mid-Infrared Instrument (MIRI) & NIRCam",
    "discoveryMethod": "Mid-Infrared High-Contrast Coronagraphic Imaging",
    "constellation": "Cygnus",
    "coordinates": {
      "ra": "20h 20m 27.98s",
      "dec": "+43° 51′ 16.3″",
      "raDeg": 305.1166,
      "decDeg": 43.8545
    },
    "distance": {
      "lightYears": "5,600 Light Years",
      "parsecs": "1,700 pc",
      "redshift": 0.00004
    },
    "physics": {
      "binaryComponents": "WC7 (Carbon Wolf-Rayet) + O5.5fc (Blue Giant)",
      "orbitalPeriod": "7.94 Years (2,899 Days)",
      "eccentricity": "e = 0.88 (Highly eccentric orbit)",
      "nestedRings": "Over 17 Concentric geometric smoke shells imaged by JWST",
      "luminosity": "Combined > 1,000,000 L☉",
      "spectralType": "WC7 + O5.5fc"
    },
    "spectralBands": {
      "radio": 75,
      "infrared": 100,
      "optical": 60,
      "ultraviolet": 80,
      "xray": 90,
      "gamma": 25,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "JWST MIRI imaged over 17 astonishing concentric, geometric nested dust rings spanning light-years.",
      "Each ring corresponds to a periodic periastron passage occurring once every 7.94 years when the two stellar winds collide.",
      "Acts as a massive cosmic dust factory, synthesizing carbonaceous grains that seed future stellar and planetary systems."
    ],
    "researchPapers": [
      {
        "title": "Nested dust shells around the Wolf-Rayet binary WR 140 observed with JWST",
        "authors": "Lau, R. M., Hankins, M. J., Han, Y., et al.",
        "journal": "Nature Astronomy",
        "year": 2022,
        "doi": "10.1038/s41550-022-01812-x",
        "bibcode": "2022NatAs...6.1308L",
        "openAccessUrl": "https://arxiv.org/abs/2210.04895"
      }
    ],
    "spectralLines": [
      "Strong C III 5696 Å and C IV 5808 Å emission",
      "Thermal dust emission from 7.7 to 21 µm",
      "X-ray colliding-wind continuum"
    ]
  },

  // 64. S2 (S0-2)
  {
    "id": "obj-s2-star",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Orbit_of_S2_around_Milky_Way%27s_Central_Black_Hole.jpg/800px-Orbit_of_S2_around_Milky_Way%27s_Central_Black_Hole.jpg",
    "name": "S2 (S0-2)",
    "designation": "2MASS J17454002-2820033",
    "class": "star",
    "subType": "Relativistic S-Cluster Star Orbiting Sgr A*",
    "discoveryYear": 1997,
    "discoveryMission": "ESO Very Large Telescope (GRAVITY Collaboration)",
    "discoveryInstrument": "VLTI GRAVITY Near-Infrared Beam-Combiner & NACO",
    "discoveryMethod": "Adaptive Optics Astrometric Tracking around Galactic Singularity",
    "constellation": "Sagittarius",
    "coordinates": {
      "ra": "17h 45m 40.04s",
      "dec": "-29° 00′ 28″",
      "raDeg": 266.4168,
      "decDeg": -29.0078
    },
    "distance": {
      "lightYears": "26,670 Light Years",
      "parsecs": "8,178 pc",
      "redshift": 0
    },
    "physics": {
      "periastronSpeed": "7,700 km/s (2.57% the speed of light)",
      "periastronDistance": "17 Light Hours (120 AU / 1,400 Schwarzschild radii)",
      "orbitalPeriod": "16.05 Years",
      "mass": "13.6 M☉",
      "eccentricity": "e = 0.884",
      "generalRelativityConfirmation": "Gravitational Redshift (z_grav = 200 km/s) & Schwarzschild Precession (12 arcmin/orbit)",
      "spectralType": "B0-2 V"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 100,
      "optical": 10,
      "ultraviolet": 40,
      "xray": 15,
      "gamma": 0,
      "gravitational": 20
    },
    "keyDiscoveries": [
      "Executed a close periastron flyby of Sagittarius A* in May 2018, providing the ultimate verification of Einstein's General Relativity in a strong-field gravitational regime.",
      "Confirmed the relativistic gravitational redshift of light climbing out of the 4-million-solar-mass black hole's gravity well.",
      "Detected Schwarzschild orbital precession (rosette orbit), ruling out alternative extended dark-matter mass distributions."
    ],
    "researchPapers": [
      {
        "title": "Detection of the gravitational redshift in the orbit of the star S2 near the Galactic centre massive black hole",
        "authors": "GRAVITY Collaboration, Abuter, R., Amorim, A., et al.",
        "journal": "Astronomy & Astrophysics",
        "year": 2018,
        "doi": "10.1051/0004-6361/201833718",
        "bibcode": "2018A&A...615L..15G",
        "openAccessUrl": "https://arxiv.org/abs/1807.09409"
      }
    ],
    "spectralLines": [
      "Brackett-gamma 2.166 µm absorption",
      "He I 2.112 µm absorption line shifts"
    ]
  },

  // 65. S4714
  {
    "id": "obj-s4714",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Artist_impression_of_S-stars_orbiting_Sgr_A%2A.jpg/800px-Artist_impression_of_S-stars_orbiting_Sgr_A%2A.jpg",
    "name": "S4714",
    "designation": "S-Star 4714",
    "class": "star",
    "subType": "Extreme Relativistic S-Star (8% Speed of Light)",
    "discoveryYear": 2020,
    "discoveryMission": "ESO Very Large Telescope (Florian Peißker et al.)",
    "discoveryInstrument": "VLT SINFONI & NACO High-Angular Resolution Spectrometers",
    "discoveryMethod": "Near-Infrared Integral Field Spectroscopic Orbit Inversion",
    "constellation": "Sagittarius",
    "coordinates": {
      "ra": "17h 45m 40.05s",
      "dec": "-29° 00′ 28″",
      "raDeg": 266.4169,
      "decDeg": -29.0078
    },
    "distance": {
      "lightYears": "26,670 Light Years",
      "parsecs": "8,178 pc",
      "redshift": 0
    },
    "physics": {
      "periastronSpeed": "24,000 km/s (~8.0% the speed of light)",
      "periastronDistance": "12.6 AU (~1.9 Billion km / Only 150 Schwarzschild radii from singularity)",
      "orbitalPeriod": "12.0 Years",
      "eccentricity": "e = 0.985 (Extreme razor-thin orbit)",
      "mass": "2.0 M☉",
      "lorentzFactor": "γ = 1.0032",
      "spectralType": "B-type Squirter Candidate"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 100,
      "optical": 5,
      "ultraviolet": 35,
      "xray": 20,
      "gamma": 0,
      "gravitational": 30
    },
    "keyDiscoveries": [
      "Holds the record as the fastest orbiting star discovered in the universe, reaching 24,000 km/s (8% light speed) at periastron.",
      "Skims within 12.6 AU of the Sagittarius A* event horizon, enduring tidal compression that heats the stellar interior.",
      "First verified candidate for a \"squirter star\", where tidal friction causes intense cyclical mass loss during periastron passage."
    ],
    "researchPapers": [
      {
        "title": "S62 and S4711-S4715: Fast stars closely orbiting the supermassive black hole Sgr A*",
        "authors": "Peißker, F., Eckart, A., Zajaček, M., et al.",
        "journal": "The Astrophysical Journal",
        "year": 2020,
        "doi": "10.3847/1538-4357/ab9c1c",
        "bibcode": "2020ApJ...899...50P",
        "openAccessUrl": "https://arxiv.org/abs/2008.04764"
      }
    ],
    "spectralLines": [
      "Relativistically Doppler-shifted Brackett-gamma",
      "He I 2.058 µm line shifts"
    ]
  },

  // 66. Scholz's Star
  {
    "id": "obj-scholzs-star",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Scholz%27s_star_closest_approach_artist_concept.jpg/800px-Scholz%27s_star_closest_approach_artist_concept.jpg",
    "name": "Scholz's Star",
    "designation": "WISE J072003.20-084651.2",
    "class": "star",
    "subType": "Low-Mass Binary Solar System Intruder",
    "discoveryYear": 2013,
    "discoveryMission": "WISE (Wide-field Infrared Survey Explorer) & SALT",
    "discoveryInstrument": "WISE All-Sky Infrared Space Telescope & Southern African Large Telescope",
    "discoveryMethod": "Parallax & Radial Velocity Orbital Retro-Reconstruction",
    "constellation": "Monoceros",
    "coordinates": {
      "ra": "07h 20m 03.25s",
      "dec": "-08° 46′ 49.9″",
      "raDeg": 110.0135,
      "decDeg": -8.7805
    },
    "distance": {
      "lightYears": "22.2 Light Years",
      "parsecs": "6.80 pc",
      "redshift": 0.00028
    },
    "physics": {
      "closestSolarFlyby": "0.82 Light Years (52,000 AU / Plunged through Outer Oort Cloud)",
      "flybyEpoch": "70,000 Years Ago (Witnessed by early Homo sapiens & Neanderthals)",
      "systemMass": "0.15 M☉ (Primary: 0.086 M☉ red dwarf + Secondary: 0.065 M☉ brown dwarf)",
      "temperature": "Primary: 2,700 K | Secondary: 1,300 K",
      "spectralType": "M9.5 + T5"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 95,
      "optical": 40,
      "ultraviolet": 10,
      "xray": 15,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Confirmed to have passed directly through the Solar System's outer Oort cloud approximately 70,000 years ago.",
      "The closest known stellar encounter with the Sun in recorded astronomical history.",
      "During its closest approach, magnetic flares may have illuminated the night sky of prehistoric humans as a dim reddish star."
    ],
    "researchPapers": [
      {
        "title": "The closest known flyby of a star to the solar system",
        "authors": "Mamajek, E. E., Barenfeld, S. A., Ivanov, V. D., et al.",
        "journal": "The Astrophysical Journal Letters",
        "year": 2015,
        "doi": "10.1088/2041-8205/800/1/L17",
        "bibcode": "2015ApJ...800L..17M",
        "openAccessUrl": "https://arxiv.org/abs/1502.04655"
      }
    ],
    "spectralLines": [
      "Methane CH4 and water vapor bands in brown dwarf companion",
      "TiO absorption in primary"
    ]
  },

  // 67. Teegarden's Star
  {
    "id": "obj-teegardens-star",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Teegarden%27s_star_system.jpg/800px-Teegarden%27s_star_system.jpg",
    "name": "Teegarden's Star",
    "designation": "SO J025300.5+165258",
    "class": "star",
    "subType": "Ultra-Cool M-Dwarf with Habitable Worlds",
    "discoveryYear": 2003,
    "discoveryMission": "NEAT (Near-Earth Asteroid Tracking) & CARMENES",
    "discoveryInstrument": "Palomar 1.2m Oschin Schmidt & Calar Alto CARMENES Echelle Spectrograph",
    "discoveryMethod": "High Proper Motion Filtering & Radial Velocity Monitoring",
    "constellation": "Aries",
    "coordinates": {
      "ra": "02h 53m 00.89s",
      "dec": "+16° 52′ 53.3″",
      "raDeg": 43.2537,
      "decDeg": 16.8815
    },
    "distance": {
      "lightYears": "12.50 Light Years",
      "parsecs": "3.831 pc",
      "redshift": 0.00023
    },
    "physics": {
      "mass": "0.089 M☉ (8% solar mass)",
      "radius": "0.107 R☉",
      "luminosity": "0.00073 L☉",
      "temperature": "2,904 K",
      "habitableExoplanets": "Teegarden b (1.05 M⊕, Earth Similarity Index 0.95) & Teegarden c (1.11 M⊕)",
      "spectralType": "M7.0V"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 95,
      "optical": 50,
      "ultraviolet": 15,
      "xray": 20,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "One of the nearest known stars to Earth at 12.5 light-years, completely overlooked until 2003 due to its faintness.",
      "Hosts Teegarden b, which has one of the highest Earth Similarity Index ratings (0.95) ever recorded.",
      "Unlike active flare stars, Teegarden's Star is magnetically quiet, providing a stable radiation environment for its planets."
    ],
    "researchPapers": [
      {
        "title": "The CARMENES search for exoplanets around M dwarfs. Two temperate Earth-mass planet candidates around Teegarden's Star",
        "authors": "Zechmeister, M., Dreizler, S., Ribas, I., et al.",
        "journal": "Astronomy & Astrophysics",
        "year": 2019,
        "doi": "10.1051/0004-6361/201935460",
        "bibcode": "2019A&A...627A..49Z",
        "openAccessUrl": "https://arxiv.org/abs/1906.07196"
      }
    ],
    "spectralLines": [
      "Low-activity H-alpha absorption profile",
      "Deep TiO & VO molecular absorption"
    ]
  },

  // 68. Wolf 359
  {
    "id": "obj-wolf-359",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Wolf_359_artist_impression.jpg/800px-Wolf_359_artist_impression.jpg",
    "name": "Wolf 359",
    "designation": "CN Leonis / Gliese 406 / HIP 53767",
    "class": "star",
    "subType": "Prototypical Flare Star Red Dwarf",
    "discoveryYear": 1917,
    "discoveryMission": "Heidelberg-Königstuhl State Observatory (Max Wolf) & Kepler K2",
    "discoveryInstrument": "Bruce Double Astrograph & Kepler Space Telescope",
    "discoveryMethod": "Astrophotographic Proper Motion & High-Cadence Kepler Flare Monitoring",
    "constellation": "Leo",
    "coordinates": {
      "ra": "10h 56m 28.99s",
      "dec": "+07° 00′ 52.8″",
      "raDeg": 164.1208,
      "decDeg": 7.0147
    },
    "distance": {
      "lightYears": "7.86 Light Years",
      "parsecs": "2.41 pc",
      "redshift": 0.00006
    },
    "physics": {
      "mass": "0.09 M☉",
      "radius": "0.16 R☉",
      "luminosity": "0.0014 L☉",
      "temperature": "2,800 K",
      "flareEnergy": "Produces magnetic reconnection flares up to 10³² ergs in minutes",
      "spectralType": "M6.0V"
    },
    "spectralBands": {
      "radio": 25,
      "infrared": 92,
      "optical": 60,
      "ultraviolet": 75,
      "xray": 85,
      "gamma": 10,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The 5th closest individual star to our Sun (7.86 light-years).",
      "The classical prototype of UV Ceti-type flare stars, undergoing spontaneous bursts in brightness due to intense tangled magnetic fields.",
      "Emits violent coronal mass ejections and soft X-ray radiation observed by Chandra and XMM-Newton."
    ],
    "researchPapers": [
      {
        "title": "Flares and rotational modulation on Wolf 359 observed by Kepler K2",
        "authors": "Lin, C. L., Chen, W. P., Ip, W. H.",
        "journal": "The Astronomical Journal",
        "year": 2019,
        "doi": "10.3847/1538-3881/ab0f32",
        "bibcode": "2019AJ....157..169L",
        "openAccessUrl": "https://arxiv.org/abs/1903.04753"
      }
    ],
    "spectralLines": [
      "Intense chromospheric H-alpha emission",
      "Ca II H & K flares",
      "FeH bands"
    ]
  },

  // 69. EBLM J0555-57Ab
  {
    "id": "obj-eblm-j0555-57ab",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/EBLM_J0555-57Ab_size_comparison.jpg/800px-EBLM_J0555-57Ab_size_comparison.jpg",
    "name": "EBLM J0555-57Ab",
    "designation": "EBLM J0555-57 B",
    "class": "star",
    "subType": "Hydrogen-Burning Minimum Mass Star",
    "discoveryYear": 2017,
    "discoveryMission": "WASP (Wide Angle Search for Planets) & CORALIE",
    "discoveryInstrument": "Euler 1.2m Swiss Telescope / CORALIE Spectrograph",
    "discoveryMethod": "Eclipsing Binary Photometry & Precise Doppler Radii",
    "constellation": "Pictor",
    "coordinates": {
      "ra": "05h 55m 32.69s",
      "dec": "-57° 17′ 26.1″",
      "raDeg": 88.8862,
      "decDeg": -57.2906
    },
    "distance": {
      "lightYears": "670 Light Years",
      "parsecs": "205 pc",
      "redshift": 0.00007
    },
    "physics": {
      "radius": "0.084 R☉ (59,000 km / Smaller than Saturn)",
      "mass": "0.081 M☉ (85 Jupiter masses / At the hydrogen fusion threshold)",
      "surfaceGravity": "log g = 5.50 (280 times Earth gravity)",
      "density": "188 g/cm³ (Denser than metallic osmium)",
      "spectralType": "M8V"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 92,
      "optical": 35,
      "ultraviolet": 10,
      "xray": 15,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The smallest known star by radius in the universe that still sustains core hydrogen fusion.",
      "Slightly smaller than Saturn, demonstrating that stars can be physically smaller than giant gas planets while being 85 times more massive.",
      "Demarcates the precise empirical borderline between true hydrogen-fusing stars and sub-stellar brown dwarfs."
    ],
    "researchPapers": [
      {
        "title": "The EBLM project. III. A Saturn-size low-mass star at the hydrogen-burning limit",
        "authors": "von Boetticher, A., Triaud, A. H. M. J., Queloz, D., et al.",
        "journal": "Astronomy & Astrophysics",
        "year": 2017,
        "doi": "10.1051/0004-6361/201731107",
        "bibcode": "2017A&A...604L...6V",
        "openAccessUrl": "https://arxiv.org/abs/1706.08781"
      }
    ],
    "spectralLines": [
      "High surface gravity pressure-broadened sodium Na I and potassium K I absorption lines"
    ]
  },

  // 70. Mu Cephei (The Garnet Star)
  {
    "id": "obj-mu-cephei",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Herschel%27s_Garnet_Star_Mu_Cephei.jpg/800px-Herschel%27s_Garnet_Star_Mu_Cephei.jpg",
    "name": "Mu Cephei (The Garnet Star)",
    "designation": "HD 206936 / HR 8316 / HIP 107259",
    "class": "star",
    "subType": "Red Supergiant Prototype",
    "discoveryYear": 1783,
    "discoveryMission": "William Herschel Reflecting Telescope Survey & ISO",
    "discoveryInstrument": "Herschel 40-foot Reflector & Infrared Space Observatory (ISO)",
    "discoveryMethod": "Visual Deep Garnet Color Classification & Mid-IR Space Spectroscopy",
    "constellation": "Cepheus",
    "coordinates": {
      "ra": "21h 43m 30.46s",
      "dec": "+58° 46′ 48.2″",
      "raDeg": 325.8769,
      "decDeg": 58.7801
    },
    "distance": {
      "lightYears": "2,840 Light Years",
      "parsecs": "870 pc",
      "redshift": 0.00006
    },
    "physics": {
      "radius": "972 - 1,260 R☉ (4.5 - 5.8 AU)",
      "luminosity": "269,000 L☉",
      "mass": "19.2 M☉",
      "temperature": "3,750 K",
      "spectralType": "M2-Ia",
      "colorIndex": "B-V = +2.35 (One of the reddest naked-eye stars)"
    },
    "spectralBands": {
      "radio": 25,
      "infrared": 98,
      "optical": 70,
      "ultraviolet": 10,
      "xray": 5,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Described by William Herschel as having \"a most magnificent deep garnet colour\", serving as the prototype for garnet supergiants.",
      "Surrounded by a giant circumstellar shell of water vapor, alumina dust, and silicates stretching to thousands of AU.",
      "Entering late-stage carbon burning, positioned to collapse into a Type II supernova within a few hundred thousand years."
    ],
    "researchPapers": [
      {
        "title": "The fundamental parameters and circumstellar environment of the red supergiant Mu Cephei",
        "authors": "Perrin, G., Ridgway, S. T., Coudé du Foresto, V., et al.",
        "journal": "Astronomy & Astrophysics",
        "year": 2005,
        "doi": "10.1051/0004-6361:20042490",
        "bibcode": "2005A&A...436..317P",
        "openAccessUrl": "https://arxiv.org/abs/astro-ph/0502415"
      }
    ],
    "spectralLines": [
      "Water vapor absorption at 2.7 µm",
      "Silicate dust feature at 9.7 µm",
      "H2O maser emission at 22 GHz"
    ]
  },

  // 71. Westerlund 1-26
  {
    "id": "obj-westerlund-1-26",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Westerlund_1_cluster_with_W26.jpg/800px-Westerlund_1_cluster_with_W26.jpg",
    "name": "Westerlund 1-26",
    "designation": "W26 / 2MASS J16470540-4550367",
    "class": "star",
    "subType": "Extreme Red Hypergiant in Super Star Cluster",
    "discoveryYear": 1961,
    "discoveryMission": "Bengt Westerlund Discovery / ESO VLT X-shooter",
    "discoveryInstrument": "VLT X-shooter & ALMA Submillimeter Array",
    "discoveryMethod": "Near-Infrared Deep Super-Cluster Spectroscopy",
    "constellation": "Ara",
    "coordinates": {
      "ra": "16h 47m 05.40s",
      "dec": "-45° 50′ 36.8″",
      "raDeg": 251.7725,
      "decDeg": -45.8436
    },
    "distance": {
      "lightYears": "11,700 Light Years",
      "parsecs": "3,600 pc",
      "redshift": 0.00012
    },
    "physics": {
      "radius": "1,530 - 2,540 R☉ (Up to 11.8 AU / Beyond Saturn)",
      "luminosity": "380,000 L☉",
      "mass": "18 - 35 M☉",
      "temperature": "3,000 - 3,600 K",
      "spectralType": "M2-M5Ia+",
      "ionizedNebulaSpan": "0.1 parsecs across"
    },
    "spectralBands": {
      "radio": 50,
      "infrared": 98,
      "optical": 20,
      "ultraviolet": 10,
      "xray": 15,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Enclosed within an ionized ring nebula discovered by VLT, proving massive episodic mass ejections.",
      "One of the largest candidate stars known, situated within the massive young Westerlund 1 super star cluster.",
      "Displays dramatic spectral variability from M2 to M5, signaling intense photospheric pulsation."
    ],
    "researchPapers": [
      {
        "title": "An ionized nebula surrounding the red supergiant W26 in Westerlund 1",
        "authors": "Wright, N. J., Wesson, R., Drew, J. E., et al.",
        "journal": "Monthly Notices of the Royal Astronomical Society: Letters",
        "year": 2014,
        "doi": "10.1093/mnrasl/slt127",
        "bibcode": "2014MNRAS.437L...1W",
        "openAccessUrl": "https://arxiv.org/abs/1309.4086"
      }
    ],
    "spectralLines": [
      "[N II] 6584 Å nebular emission",
      "SiO masers",
      "Broad infrared CO bands"
    ]
  },

  // 72. HL Tauri
  {
    "id": "obj-hl-tauri",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/HL_Tau_protoplanetary_disk.jpg/800px-HL_Tau_protoplanetary_disk.jpg",
    "name": "HL Tauri",
    "designation": "HL Tau / HBC 78",
    "class": "star",
    "subType": "T Tauri Protostar with Ringed Protoplanetary Disk",
    "discoveryYear": 1975,
    "discoveryMission": "ALMA (Atacama Large Millimeter/submillimeter Array)",
    "discoveryInstrument": "ALMA 15-km Baseline Submillimeter Synthesis Array",
    "discoveryMethod": "High-Resolution Submillimeter Dust Continuum Interferometry",
    "constellation": "Taurus",
    "coordinates": {
      "ra": "04h 31m 38.44s",
      "dec": "+18° 13′ 57.6″",
      "raDeg": 67.9102,
      "decDeg": 18.2327
    },
    "distance": {
      "lightYears": "450 Light Years",
      "parsecs": "140 pc",
      "redshift": 0.00005
    },
    "physics": {
      "age": "< 1 Million Years (Infant protostar)",
      "mass": "1.3 M☉",
      "radius": "3.0 R☉",
      "diskRadius": "100 AU with multiple concentric planet-cleared rings",
      "luminosity": "11 L☉",
      "spectralType": "K5V"
    },
    "spectralBands": {
      "radio": 100,
      "infrared": 95,
      "optical": 30,
      "ultraviolet": 10,
      "xray": 35,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "ALMA's iconic 2014 image provided the first revolutionary high-resolution view of planet formation occurring in concentric rings.",
      "Proved that gas giant planets begin accreting mass much faster than previously theorized (< 1 million years after star birth).",
      "The multi-ringed gaps directly match dynamical simulations of infant protoplanets sweeping clear orbital paths."
    ],
    "researchPapers": [
      {
        "title": "The 2014 ALMA Long Baseline Campaign: First Results from High Angular Resolution Observations of HL Tau",
        "authors": "ALMA Partnership, Brogan, C. L., Pérez, L. M., et al.",
        "journal": "The Astrophysical Journal Letters",
        "year": 2015,
        "doi": "10.1088/2041-8205/808/1/L3",
        "bibcode": "2015ApJ...808L...3A",
        "openAccessUrl": "https://arxiv.org/abs/1503.02649"
      }
    ],
    "spectralLines": [
      "CO J=1-0 rotational transition at 115 GHz",
      "HCO+ submillimeter emission",
      "Infrared silicate ice bands"
    ]
  },

  // 73. SMSS J031300.36-670839.3
  {
    "id": "obj-smss-j0313",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/SkyMapper_telescope_night.jpg/800px-SkyMapper_telescope_night.jpg",
    "name": "SMSS J031300.36-670839.3",
    "designation": "SM0313",
    "class": "star",
    "subType": "Ultra Metal-Poor Population II Star",
    "discoveryYear": 2014,
    "discoveryMission": "SkyMapper Southern Sky Survey & Magellan Telescopes",
    "discoveryInstrument": "1.35m SkyMapper & Magellan MIKE High-Resolution Spectrograph",
    "discoveryMethod": "Narrow-Band UV/Optical Filter Metallicity Survey",
    "constellation": "Hydrus",
    "coordinates": {
      "ra": "03h 13m 00.36s",
      "dec": "-67° 08′ 39.3″",
      "raDeg": 48.2515,
      "decDeg": -67.1443
    },
    "distance": {
      "lightYears": "6,000 Light Years",
      "parsecs": "1,840 pc",
      "redshift": 0.00096
    },
    "physics": {
      "ironAbundance": "[Fe/H] < -7.1 (Less than 1 ten-millionth of solar iron)",
      "age": "13.6 Billion Years",
      "carbonAbundance": "[C/H] = -2.6 (Strong carbon enrichment)",
      "mass": "0.8 M☉",
      "temperature": "5,125 K",
      "spectralType": "K-type Subgiant"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 50,
      "optical": 95,
      "ultraviolet": 30,
      "xray": 5,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Holds the record for the lowest iron abundance ever measured in any celestial star ([Fe/H] < -7.1).",
      "Directly formed from the ejecta of a single primordial Population III supernova of ~60 solar masses.",
      "Proves that low-energy \"fallback\" supernovae from first-generation stars seeded the earliest Population II star formation."
    ],
    "researchPapers": [
      {
        "title": "A single low-energy, iron-poor supernova as the source of elements in the oldest known star",
        "authors": "Keller, S. C., Bessell, M. S., Frebel, A., et al.",
        "journal": "Nature",
        "year": 2014,
        "doi": "10.1038/nature12990",
        "bibcode": "2014Natur.506..463K",
        "openAccessUrl": "https://arxiv.org/abs/1402.1517"
      }
    ],
    "spectralLines": [
      "Complete absence of detectable Fe I 3719 Å and 3859 Å lines",
      "Prominent CH molecular band at 4300 Å"
    ]
  },

  // 74. HV 2112
  {
    "id": "obj-hv-2112",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Artist%27s_impression_of_a_Thorne-%C5%BBytkow_object.jpg/800px-Artist%27s_impression_of_a_Thorne-%C5%BBytkow_object.jpg",
    "name": "HV 2112",
    "designation": "HV 2112 / PMMR 37",
    "class": "star",
    "subType": "Thorne-Żytkow Object (TŻO) Candidate",
    "discoveryYear": 2014,
    "discoveryMission": "Magellan Telescopes (Emily Levesque et al.)",
    "discoveryInstrument": "Magellan Clay 6.5m MIKE Echelle Spectrograph",
    "discoveryMethod": "High-Resolution Heavy Element Chemical Abundance Analysis",
    "constellation": "Tucana (Small Magellanic Cloud)",
    "coordinates": {
      "ra": "01h 10m 03.88s",
      "dec": "-72° 36′ 52.6″",
      "raDeg": 17.5162,
      "decDeg": -72.6146
    },
    "distance": {
      "lightYears": "200,000 Light Years",
      "parsecs": "61,000 pc",
      "redshift": 0.00053
    },
    "physics": {
      "coreStructure": "Neutron Star Core embedded in Red Supergiant Envelope",
      "radius": "1,400 R☉",
      "luminosity": "100,000 L☉",
      "mass": "15 M☉",
      "peculiarAbundances": "[Rb/Fe] > +1.2, [Li/Fe] > +0.7, [Mo/Fe] > +1.0",
      "spectralType": "M5-M7.5e"
    },
    "spectralBands": {
      "radio": 15,
      "infrared": 95,
      "optical": 60,
      "ultraviolet": 10,
      "xray": 45,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The leading candidate for a Thorne-Żytkow Object (a hybrid star containing a degenerate neutron star inside a red supergiant).",
      "Displays extreme overabundances of rubidium, lithium, and molybdenum matching theoretical rp-process nuclear predictions.",
      "Powered by exotic convective nuclear burning occurring at the relativistic boundary layer of the neutron star core."
    ],
    "researchPapers": [
      {
        "title": "Discovery of a Thorne-Żytkow object candidate in the Small Magellanic Cloud",
        "authors": "Levesque, E. M., Massey, P., Żytkow, A. N., Morrell, N.",
        "journal": "Monthly Notices of the Royal Astronomical Society: Letters",
        "year": 2014,
        "doi": "10.1093/mnrasl/slu080",
        "bibcode": "2014MNRAS.443L..94L",
        "openAccessUrl": "https://arxiv.org/abs/1406.0001"
      }
    ],
    "spectralLines": [
      "Rb I 7800 Å and 7948 Å absorption",
      "Li I 6708 Å line",
      "Heavy s-process transitions"
    ]
  },

  // 75. V1309 Scorpii
  {
    "id": "obj-v1309-sco",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Light_echo_around_star_V838_Monocerotis_Hubble.jpg/800px-Light_echo_around_star_V838_Monocerotis_Hubble.jpg",
    "name": "V1309 Scorpii",
    "designation": "Nova Scorpii 2008 / OGLE-2008-BLG-099",
    "class": "star",
    "subType": "Directly Observed Contact Binary Stellar Merger",
    "discoveryYear": 2008,
    "discoveryMission": "OGLE (Optical Gravitational Lensing Experiment)",
    "discoveryInstrument": "1.3m Warsaw University Telescope at Las Campanas Observatory",
    "discoveryMethod": "Decade-Long Contact Binary Period Decay & Red Nova Photometry",
    "constellation": "Scorpius",
    "coordinates": {
      "ra": "17h 57m 32.93s",
      "dec": "-30° 43′ 10.1″",
      "raDeg": 269.3872,
      "decDeg": -30.7195
    },
    "distance": {
      "lightYears": "9,800 Light Years",
      "parsecs": "3,000 pc",
      "redshift": 0.00011
    },
    "physics": {
      "progenitor": "Contact binary undergoing runaway orbital period decay (1.4 days)",
      "mergerPeakLuminosity": "30,000 L☉ (Outburst reached magnitude 8 in Sept 2008)",
      "remnant": "Single rapidly rotating B-type supergiant surrounded by dense dust envelope",
      "spectralType": "Luminous Red Nova Remnant"
    },
    "spectralBands": {
      "radio": 20,
      "infrared": 95,
      "optical": 75,
      "ultraviolet": 20,
      "xray": 15,
      "gamma": 0,
      "gravitational": 10
    },
    "keyDiscoveries": [
      "The first time in human history that astronomers recorded the orbital decay and subsequent merger of two stars into one.",
      "OGLE archival photometry tracked the 1.4-day orbital period shrinking exponentially over six years until full coalescence.",
      "Confirmed the theoretical mechanism linking contact binaries directly to luminous red nova eruptions."
    ],
    "researchPapers": [
      {
        "title": "V1309 Scorpii: A stellar merger witnessed in the act",
        "authors": "Tylenda, R., Hajduk, M., Kamiński, T., et al.",
        "journal": "Astronomy & Astrophysics",
        "year": 2011,
        "doi": "10.1051/0004-6361/201016221",
        "bibcode": "2011A&A...528A.114T",
        "openAccessUrl": "https://arxiv.org/abs/1012.0163"
      }
    ],
    "spectralLines": [
      "CO molecular bandhead emission in remnant disk",
      "TiO absorption",
      "H-alpha emission"
    ]
  },

  // 76. Fomalhaut
  {
    "id": "obj-fomalhaut",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Fomalhaut_debris_ring_JWST_MIRI.jpg/800px-Fomalhaut_debris_ring_JWST_MIRI.jpg",
    "name": "Fomalhaut",
    "designation": "Alpha Piscis Austrini / 24 Piscis Austrini / HD 216956",
    "class": "star",
    "subType": "Young A-type Star with Multi-Tier Debris Belts",
    "discoveryYear": 1838,
    "discoveryMission": "Hubble Space Telescope & JWST (MIRI)",
    "discoveryInstrument": "JWST Mid-Infrared Instrument (MIRI) Coronagraph",
    "discoveryMethod": "Resolved Thermal Infrared Planetesimal Belt Coronagraphy",
    "constellation": "Piscis Austrinus",
    "coordinates": {
      "ra": "22h 57m 39.05s",
      "dec": "-29° 37′ 20.1″",
      "raDeg": 344.4127,
      "decDeg": -29.6222
    },
    "distance": {
      "lightYears": "25.13 Light Years",
      "parsecs": "7.70 pc",
      "redshift": 0.00002
    },
    "physics": {
      "mass": "1.92 M☉",
      "radius": "1.84 R☉",
      "luminosity": "16.63 L☉",
      "age": "440 Million Years",
      "beltStructure": "Three concentric debris rings extending from 10 AU to 133 AU",
      "spectralType": "A3V"
    },
    "spectralBands": {
      "radio": 30,
      "infrared": 100,
      "optical": 95,
      "ultraviolet": 75,
      "xray": 10,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "JWST MIRI resolved three nested debris belts around Fomalhaut, revealing an intricate planetary architecture shaped by unseen planets.",
      "Contains an intermediate asteroid belt never before detected from ground or Hubble observations.",
      "The \"Great Dust Cloud\" observed by Hubble was identified as the catastrophic collision of two 200-km planetesimals."
    ],
    "researchPapers": [
      {
        "title": "Spatially resolved imaging of the inner Fomalhaut disk using JWST/MIRI",
        "authors": "Gáspár, A., Wolff, S. G., Rieke, G. H., et al.",
        "journal": "Nature Astronomy",
        "year": 2023,
        "doi": "10.1038/s41550-023-01962-6",
        "bibcode": "2023NatAs...7..790G",
        "openAccessUrl": "https://arxiv.org/abs/2305.03789"
      }
    ],
    "spectralLines": [
      "Infrared dust excess from 15.5 to 25.5 µm",
      "Balmer hydrogen absorption series"
    ]
  },

  // 77. Cygnus OB2-12
  {
    "id": "obj-cygnus-ob2-12",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Cygnus_OB2_association.jpg/800px-Cygnus_OB2_association.jpg",
    "name": "Cygnus OB2-12",
    "designation": "Schulte 12 / HIP 101364",
    "class": "star",
    "subType": "Extremely Luminous Blue Hypergiant",
    "discoveryYear": 1954,
    "discoveryMission": "Palomar Observatory Sky Survey & Spitzer / Gaia",
    "discoveryInstrument": "Samuel Oschin 48-inch Schmidt & Spitzer Space Telescope",
    "discoveryMethod": "Infrared Multi-Band Penetration of Extreme Interstellar Extinction",
    "constellation": "Cygnus",
    "coordinates": {
      "ra": "20h 32m 40.96s",
      "dec": "+41° 14′ 29.3″",
      "raDeg": 308.1707,
      "decDeg": 41.2415
    },
    "distance": {
      "lightYears": "5,200 Light Years",
      "parsecs": "1,600 pc",
      "redshift": -0.00004
    },
    "physics": {
      "luminosity": "1,660,000 L☉",
      "radius": "246 R☉",
      "mass": "110 M☉",
      "temperature": "13,700 K",
      "visualExtinction": "A_V = 10.2 Magnitudes (Dimmed by a factor of 10,000 by dust)",
      "spectralType": "B3-4Ia+"
    },
    "spectralBands": {
      "radio": 25,
      "infrared": 98,
      "optical": 40,
      "ultraviolet": 70,
      "xray": 45,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "One of the most luminous stars in the entire Milky Way (~1.66 million L☉), anchoring the Cygnus OB2 association.",
      "Obscured by over 10 magnitudes of dense dust; without this interstellar fog, it would shine in Earth's sky as brightly as Sirius.",
      "Sheds mass at 3 × 10⁻⁶ M☉ per year via dense colliding stellar winds detected in radio and X-rays."
    ],
    "researchPapers": [
      {
        "title": "The fundamental parameters and distance of the blue hypergiant Cygnus OB2 #12",
        "authors": "Clark, J. S., Najarro, F., Negueruela, I., et al.",
        "journal": "Astronomy & Astrophysics",
        "year": 2012,
        "doi": "10.1051/0004-6361/201118604",
        "bibcode": "2012A&A...541A.145C",
        "openAccessUrl": "https://arxiv.org/abs/1202.3991"
      }
    ],
    "spectralLines": [
      "Intense H-alpha emission",
      "Diffuse Interstellar Bands (DIBs)",
      "He I 2.058 µm wind line"
    ]
  },

  // 78. Przybylski's Star
  {
    "id": "obj-przybylski-star",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Alpha_Centauri_system.jpg/800px-Alpha_Centauri_system.jpg",
    "name": "Przybylski's Star",
    "designation": "HD 101065 / HIP 56641",
    "class": "star",
    "subType": "Chemically Peculiar Rapidly Oscillating Ap Star",
    "discoveryYear": 1961,
    "discoveryMission": "Mount Stromlo Observatory (Antoni Przybylski) & VLT UVES",
    "discoveryInstrument": "74-inch Reflector Echelle Spectrograph & VLT UVES",
    "discoveryMethod": "Ultra-High Resolution Chemical Abundance Spectroscopy",
    "constellation": "Centaurus",
    "coordinates": {
      "ra": "11h 37m 37.04s",
      "dec": "-46° 42′ 34.9″",
      "raDeg": 174.4043,
      "decDeg": -46.7097
    },
    "distance": {
      "lightYears": "356 Light Years",
      "parsecs": "109.1 pc",
      "redshift": 0.00008
    },
    "physics": {
      "anomaly": "Unprecedented overabundance of lanthanides & short-lived radioactive actinides",
      "pulsationPeriod": "12.15 Minutes (Rapidly oscillating roAp star)",
      "magneticField": "-2,200 Gauss dipole field",
      "temperature": "6,600 K",
      "mass": "1.5 M☉",
      "spectralType": "Ap (roAp)"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 55,
      "optical": 98,
      "ultraviolet": 40,
      "xray": 10,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The most chemically peculiar star known: displays lines of radioactive elements with no stable isotopes, including Promethium, Technetium, and Californium.",
      "The archetype for rapidly oscillating Ap (roAp) stars, pulsating magnetically every 12.15 minutes.",
      "The anomalous actinide presence is theorized to stem from magnetic levitation of heavy cosmic ray debris or local spallation reactions."
    ],
    "researchPapers": [
      {
        "title": "Abundance analysis of the enigmatic roAp star HD 101065 (Przybylski's star)",
        "authors": "Cowley, C. R., Ryabchikova, T., Kupka, F., et al.",
        "journal": "Astronomy & Astrophysics",
        "year": 2000,
        "doi": "10.1051/aas:2000282",
        "bibcode": "2000A&AS..146..269C",
        "openAccessUrl": "https://arxiv.org/abs/astro-ph/0009088"
      }
    ],
    "spectralLines": [
      "Unprecedented Promethium (Pm I & Pm II) lines",
      "Praseodymium (Pr III)",
      "Neodymium (Nd III)"
    ]
  },

  // 79. HD 222925
  {
    "id": "obj-hd-222925",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/LIGO_and_Virgo_detect_neutron_star_merger_-_artist%27s_impression.jpg/800px-LIGO_and_Virgo_detect_neutron_star_merger_-_artist%27s_impression.jpg",
    "name": "HD 222925",
    "designation": "CD-60°8628 / HIP 117216",
    "class": "star",
    "subType": "Metal-Poor Halo Star with 65 R-Process Elements",
    "discoveryYear": 2018,
    "discoveryMission": "Hubble Space Telescope (STIS) & Magellan Telescopes",
    "discoveryInstrument": "HST Space Telescope Imaging Spectrograph (STIS) & Magellan MIKE",
    "discoveryMethod": "Near-Ultraviolet High-Resolution Space Spectroscopy",
    "constellation": "Tucana",
    "coordinates": {
      "ra": "23h 45m 43.83s",
      "dec": "-59° 44′ 48.9″",
      "raDeg": 356.4326,
      "decDeg": -59.7469
    },
    "distance": {
      "lightYears": "1,440 Light Years",
      "parsecs": "442 pc",
      "redshift": -0.0001
    },
    "physics": {
      "detectedElements": "65 Heavy Elements (including Gold, Platinum, Uranium, Thorium)",
      "rProcessPurity": "Single neutron star merger nucleosynthesis signature",
      "metallicity": "[Fe/H] = -1.46",
      "temperature": "5,636 K",
      "mass": "0.85 M☉",
      "spectralType": "G5 III"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 50,
      "optical": 95,
      "ultraviolet": 85,
      "xray": 5,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Holds the record for the most chemical elements identified in any object outside our Solar System (65 elements).",
      "Contains 42 neutron-capture elements produced in rapid succession by an ancient binary neutron star merger kilonova.",
      "Serves as the empirical \"gold standard\" template for calibrating all r-process nuclear physics models."
    ],
    "researchPapers": [
      {
        "title": "The R-process Alliance: A Comprehensive Abundance Analysis of HD 222925, a Metal-poor Star with the Most Diverse Chemical Inventory Beyond the Solar System",
        "authors": "Roederer, I. U., Cowan, J. J., Pignatari, M., et al.",
        "journal": "The Astrophysical Journal Supplement Series",
        "year": 2022,
        "doi": "10.3847/1538-4365/ac580a",
        "bibcode": "2022ApJS..260...27R",
        "openAccessUrl": "https://arxiv.org/abs/2205.03426"
      }
    ],
    "spectralLines": [
      "Gold Au I 2675 Å line in UV",
      "Platinum Pt I lines",
      "Thorium Th II and Uranium U II"
    ]
  },

  // 80. WR 104
  {
    "id": "obj-wr-104",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Keck_WR104_pinwheel.jpg/800px-Keck_WR104_pinwheel.jpg",
    "name": "WR 104",
    "designation": "V5097 Sagittarii / MR 80",
    "class": "star",
    "subType": "Wolf-Rayet Colliding-Wind Pinwheel System",
    "discoveryYear": 1998,
    "discoveryMission": "W. M. Keck Observatory (Peter Tuthill et al.)",
    "discoveryInstrument": "Keck I 10m Aperture Masking Near-Infrared Interferometer",
    "discoveryMethod": "Diffraction-Limited Aperture Masking Interferometry",
    "constellation": "Sagittarius",
    "coordinates": {
      "ra": "18h 02m 04.07s",
      "dec": "-23° 37′ 41.2″",
      "raDeg": 270.517,
      "decDeg": -23.6281
    },
    "distance": {
      "lightYears": "8,400 Light Years",
      "parsecs": "2,580 pc",
      "redshift": 0.0001
    },
    "physics": {
      "morphology": "Archimedean spiraling dust plume rotating every 241.5 days",
      "outflowVelocity": "2,000 km/s stellar wind expansion speed",
      "inclination": "Orbital pole tilted only ~12° from Earth sightline",
      "components": "WC9 Wolf-Rayet + OB Supergiant binary",
      "luminosity": "Combined ~200,000 L☉",
      "spectralType": "WC9d + B0.5V"
    },
    "spectralBands": {
      "radio": 40,
      "infrared": 100,
      "optical": 60,
      "ultraviolet": 75,
      "xray": 60,
      "gamma": 10,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Keck aperture masking revealed a textbook Archimedean spiral \"pinwheel\" of carbon dust curling across 160 AU.",
      "The binary system rotates every 241.5 days, continuously blowing newly condensed smoke into a spiraling lawn-sprinkler pattern.",
      "Studied as a candidate for a future core-collapse gamma-ray burst aligned closely with Earth's line of sight."
    ],
    "researchPapers": [
      {
        "title": "The spiral carbon pinwheel around the Wolf-Rayet binary WR 104",
        "authors": "Tuthill, P. G., Monnier, J. D., Danchi, W. C.",
        "journal": "Nature",
        "year": 1999,
        "doi": "10.1038/19323",
        "bibcode": "1999Natur.398..487T",
        "openAccessUrl": "https://arxiv.org/abs/astro-ph/9904090"
      }
    ],
    "spectralLines": [
      "C II and C III carbon-rich emission lines",
      "Hot amorphous carbon dust continuum at 2.2 µm"
    ]
  },

  // 81. Algol (The Demon Star)
  {
    "id": "obj-algol",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Algol_system_rendering.jpg/800px-Algol_system_rendering.jpg",
    "name": "Algol (The Demon Star)",
    "designation": "Beta Persei / 26 Persei / HD 19356",
    "class": "star",
    "subType": "Eclipsing Binary & Mass-Transfer Prototype",
    "discoveryYear": 1782,
    "discoveryMission": "John Goodricke Visual Observation & CHARA Array",
    "discoveryInstrument": "Visual Clocked Photometry & CHARA Optical Interferometer",
    "discoveryMethod": "Eclipsing Light Curve Decomposition & Doppler Tomography",
    "constellation": "Perseus",
    "coordinates": {
      "ra": "03h 08m 10.13s",
      "dec": "+40° 57′ 20.3″",
      "raDeg": 47.0422,
      "decDeg": 40.9556
    },
    "distance": {
      "lightYears": "92.8 Light Years",
      "parsecs": "28.5 pc",
      "redshift": 0.00001
    },
    "physics": {
      "orbitalPeriod": "2.8673 Days (68.8 Hours)",
      "systemComponents": "Algol Aa1 (3.17 M☉ B8V) + Algol Aa2 (0.70 M☉ K0IV subgiant)",
      "paradoxResolution": "Mass transfer via Roche lobe overflow reversed stellar mass hierarchy",
      "separation": "0.062 AU (9.3 Million km)",
      "temperature": "Primary: 13,000 K | Secondary: 4,500 K",
      "spectralType": "B8V + K0IV + F1V"
    },
    "spectralBands": {
      "radio": 50,
      "infrared": 70,
      "optical": 98,
      "ultraviolet": 75,
      "xray": 60,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The historical prototype for eclipsing binary systems, dipping in brightness every 2.87 days.",
      "Solved the celebrated \"Algol Paradox\" in stellar evolution: the less massive star is more evolved because it transferred mass to its companion via Roche lobe overflow.",
      "Produces intense radio flares and coronal X-ray outbursts driven by magnetic interaction between the binary components."
    ],
    "researchPapers": [
      {
        "title": "Imaging the Algol Triple System in the H Band with the CHARA Array",
        "authors": "Baron, F., Monnier, J. D., Pedretti, E., et al.",
        "journal": "The Astrophysical Journal",
        "year": 2012,
        "doi": "10.1088/0004-637X/752/1/20",
        "bibcode": "2012ApJ...752...20B",
        "openAccessUrl": "https://arxiv.org/abs/1205.0754"
      }
    ],
    "spectralLines": [
      "Hydrogen Balmer lines exhibiting orbital Doppler velocity shifts of ±200 km/s",
      "He I 4471 Å"
    ]
  },

  // 82. V838 Monocerotis
  {
    "id": "obj-v838-mon",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Light_echo_around_star_V838_Monocerotis_Hubble.jpg/800px-Light_echo_around_star_V838_Monocerotis_Hubble.jpg",
    "name": "V838 Monocerotis",
    "designation": "Nova Monocerotis 2002",
    "class": "star",
    "subType": "Luminous Red Nova with Expanding Light Echo",
    "discoveryYear": 2002,
    "discoveryMission": "Hubble Space Telescope (ACS)",
    "discoveryInstrument": "HST Advanced Camera for Surveys (ACS)",
    "discoveryMethod": "Multi-Epoch Polarimetric & High-Resolution Optical Imaging",
    "constellation": "Monoceros",
    "coordinates": {
      "ra": "07h 04m 04.85s",
      "dec": "-03° 50′ 51.1″",
      "raDeg": 106.0202,
      "decDeg": -3.8475
    },
    "distance": {
      "lightYears": "20,000 Light Years",
      "parsecs": "6,100 pc",
      "redshift": 0.00018
    },
    "physics": {
      "lightEchoDiameter": "Over 6 Light Years across in illuminated dust",
      "peakLuminosity": "600,000 L☉ (Briefly one of the most luminous stars in Milky Way)",
      "nature": "Binary stellar merger (contact binary coalescence)",
      "coolingEvolution": "Cooled from an energetic O/B fireball into a super-cool M/L-type supergiant",
      "spectralType": "M10I / L-type Red Nova Remnant"
    },
    "spectralBands": {
      "radio": 20,
      "infrared": 98,
      "optical": 85,
      "ultraviolet": 30,
      "xray": 15,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Hubble's multi-year observations captured the most spectacular expanding \"light echo\" in history, illuminating concentric dust sheets.",
      "The apparent superluminal expansion of the illuminated dust rings provided a direct geometric measurement of interstellar matter geometry.",
      "The outburst was confirmed to be a rare \"Luminous Red Nova\" created by the catastrophic merger of two massive main-sequence stars."
    ],
    "researchPapers": [
      {
        "title": "A light echo from the unusual transient V838 Monocerotis",
        "authors": "Bond, H. E., Henden, A., Levay, Z. G., et al.",
        "journal": "Nature",
        "year": 2003,
        "doi": "10.1038/nature01508",
        "bibcode": "2003Natur.422..405B",
        "openAccessUrl": "https://arxiv.org/abs/astro-ph/0303513"
      }
    ],
    "spectralLines": [
      "Intense CO and H2O absorption in cooled supergiant state",
      "P-Cygni optical profiles during outburst"
    ]
  },

  // 83. Capella
  {
    "id": "obj-capella",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Capella_star_system.jpg/800px-Capella_star_system.jpg",
    "name": "Capella",
    "designation": "Alpha Aurigae / 13 Aurigae / HD 34029",
    "class": "star",
    "subType": "Quadruple System Dominated by Yellow Giants",
    "discoveryYear": 1899,
    "discoveryMission": "William Wallace Campbell Spectroscopic Discovery & CHARA Array",
    "discoveryInstrument": "Mills Spectrograph & CHARA Optical Interferometer",
    "discoveryMethod": "Long-Baseline Optical Interferometry & Astroseismology",
    "constellation": "Auriga",
    "coordinates": {
      "ra": "05h 16m 41.36s",
      "dec": "+45° 59′ 52.8″",
      "raDeg": 79.1723,
      "decDeg": 45.998
    },
    "distance": {
      "lightYears": "42.9 Light Years",
      "parsecs": "13.16 pc",
      "redshift": 0.0001
    },
    "physics": {
      "mass": "Capella Aa: 2.57 M☉ | Capella Ab: 2.48 M☉",
      "radius": "Capella Aa: 11.98 R☉ | Capella Ab: 8.83 R☉",
      "luminosity": "Capella Aa: 78.5 L☉ | Capella Ab: 72.7 L☉",
      "orbitalPeriod": "104.02 Days (Circular orbit)",
      "companions": "Faint distant binary red dwarfs Capella H & Capella L (M1V + M5V)",
      "spectralType": "G3III + G1III"
    },
    "spectralBands": {
      "radio": 20,
      "infrared": 70,
      "optical": 98,
      "ultraviolet": 65,
      "xray": 80,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The 6th brightest star in the night sky, appearing as a single golden beacon but actually consisting of four stars in two pairs.",
      "The primary pair consists of two giant yellow stars rapidly spinning and driving fierce magnetic dynamos.",
      "One of the brightest stellar sources of soft X-rays in the sky, producing coronal emission 10,000 times stronger than the Sun."
    ],
    "researchPapers": [
      {
        "title": "The Capella dynamical system: Orbit and masses from CHARA and COAST interferometry",
        "authors": "Torres, G., Claret, A., Pavlovski, K., et al.",
        "journal": "The Astrophysical Journal",
        "year": 2015,
        "doi": "10.1088/0004-637X/807/1/26",
        "bibcode": "2015ApJ...807...26T",
        "openAccessUrl": "https://arxiv.org/abs/1505.07461"
      }
    ],
    "spectralLines": [
      "Composite G-type absorption lines with 104-day Doppler shifts",
      "High-temperature coronal Fe XVII and O VIII X-ray lines"
    ]
  },

  // 84. Spica
  {
    "id": "obj-spica",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Spica_binary_artist_concept.jpg/800px-Spica_binary_artist_concept.jpg",
    "name": "Spica",
    "designation": "Alpha Virginis / 67 Virginis / HD 116658",
    "class": "star",
    "subType": "Rotating Ellipsoidal Variable & Massive Binary",
    "discoveryYear": 1890,
    "discoveryMission": "Potsdam Observatory (Hermann Carl Vogel) & Narrabri Interferometer",
    "discoveryInstrument": "Photographic Spectrograph & Stellar Intensity Interferometer",
    "discoveryMethod": "Intensity Interferometry & Ellipsoidal Modulation Photometry",
    "constellation": "Virgo",
    "coordinates": {
      "ra": "13h 25m 11.58s",
      "dec": "-11° 09′ 40.8″",
      "raDeg": 201.2982,
      "decDeg": -11.1613
    },
    "distance": {
      "lightYears": "250 Light Years",
      "parsecs": "77 pc",
      "redshift": 0
    },
    "physics": {
      "mass": "Primary: 11.43 M☉ | Secondary: 7.21 M☉",
      "radius": "Primary: 7.47 R☉ | Secondary: 3.74 R☉",
      "luminosity": "Primary: 20,500 L☉ | Secondary: 2,250 L☉",
      "orbitalPeriod": "4.0145 Days",
      "tidalDistortion": "Tidally distorted into prolate ellipsoids (egg-shaped)",
      "spectralType": "B1III-IV + B2V"
    },
    "spectralBands": {
      "radio": 10,
      "infrared": 40,
      "optical": 98,
      "ultraviolet": 95,
      "xray": 35,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The brightest star in Virgo, consisting of two massive hot blue stars orbiting only 0.12 AU apart.",
      "Gravity has distorted both stars into egg-shaped ellipsoids; their changing projected area causes brightness variations without mutual eclipses.",
      "The primary star is a Beta Cephei variable undergoing rapid pulsations and is massive enough to explode as a supernova."
    ],
    "researchPapers": [
      {
        "title": "Tidal interactions and stellar pulsation in the massive binary system Spica",
        "authors": "Tkachenko, A., Matthews, J. M., Aerts, C., et al.",
        "journal": "Monthly Notices of the Royal Astronomical Society",
        "year": 2016,
        "doi": "10.1093/mnras/stw255",
        "bibcode": "2016MNRAS.458.1964T",
        "openAccessUrl": "https://arxiv.org/abs/1601.08069"
      }
    ],
    "spectralLines": [
      "Balmer series H-alpha through H-gamma",
      "He I 4026 Å and 4471 Å lines with 4-day orbital velocity shifts"
    ]
  },

  // 85. Castor
  {
    "id": "obj-castor",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Castor_system_diagram.jpg/800px-Castor_system_diagram.jpg",
    "name": "Castor",
    "designation": "Alpha Geminorum / 66 Geminorum / HD 60178",
    "class": "star",
    "subType": "Complex Sextuple Star System",
    "discoveryYear": 1718,
    "discoveryMission": "James Pound Binary Discovery & Mount Wilson Observatory",
    "discoveryInstrument": "100-inch Hooker Telescope & High-Resolution Spectrographs",
    "discoveryMethod": "Multi-Epoch Astrometric Orbit & Spectroscopic Binary Resolution",
    "constellation": "Gemini",
    "coordinates": {
      "ra": "07h 34m 35.87s",
      "dec": "+31° 53′ 17.8″",
      "raDeg": 113.6495,
      "decDeg": 31.8883
    },
    "distance": {
      "lightYears": "51.6 Light Years",
      "parsecs": "15.8 pc",
      "redshift": 0.00002
    },
    "physics": {
      "systemArchitecture": "Three binary pairs: Castor A (A1V+dM), Castor B (Am+dM), Castor C/YY Gem (dM1e+dM1e)",
      "totalStars": "6 gravitationally bound stars",
      "luminosity": "Combined ~52.4 L☉",
      "mass": "Combined ~5.8 M☉",
      "orbitalPeriods": "A-B Orbit: 467 Years | Inner A: 9.2 Days | Inner B: 2.9 Days | Castor C: 0.81 Days",
      "spectralType": "A1V + A2Vm + M1Ve"
    },
    "spectralBands": {
      "radio": 25,
      "infrared": 60,
      "optical": 98,
      "ultraviolet": 70,
      "xray": 75,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "One of the most famous multiple star systems in the sky: six distinct stars arranged in three hierarchical binary pairs.",
      "The outermost pair (Castor C / YY Geminorum) is an eclipsing pair of active red dwarfs that produce frequent superflares.",
      "A primary astrophysical benchmark for testing theories of multi-star gravitational formation and orbital stability."
    ],
    "researchPapers": [
      {
        "title": "The Castor System: An Astrometric and Spectroscopic Investigation of a Sextuple System",
        "authors": "Torres, G., Ribas, I.",
        "journal": "The Astrophysical Journal",
        "year": 2002,
        "doi": "10.1086/338592",
        "bibcode": "2002ApJ...567.1140T",
        "openAccessUrl": "https://arxiv.org/abs/astro-ph/0111160"
      }
    ],
    "spectralLines": [
      "Strong metallic lines in Am star Castor B",
      "Balmer absorption lines in Castor A",
      "Flaring emission lines in YY Gem"
    ]
  },

  // 86. Pollux
  {
    "id": "obj-pollux",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Pollux_and_its_planet.jpg/800px-Pollux_and_its_planet.jpg",
    "name": "Pollux",
    "designation": "Beta Geminorum / 78 Geminorum / HD 62509",
    "class": "star",
    "subType": "Giant Star Hosting Exoplanet Thestias",
    "discoveryYear": 1993,
    "discoveryMission": "McDonald Observatory Planet Search (Artie Hatzes et al.)",
    "discoveryInstrument": "2.7m Harlan J. Smith Telescope & Coude Spectrometer",
    "discoveryMethod": "High-Precision Radial Velocity Exoplanet Confirmation",
    "constellation": "Gemini",
    "coordinates": {
      "ra": "07h 45m 18.95s",
      "dec": "+28° 01′ 34.3″",
      "raDeg": 116.3289,
      "decDeg": 28.0262
    },
    "distance": {
      "lightYears": "33.78 Light Years",
      "parsecs": "10.36 pc",
      "redshift": 0.00001
    },
    "physics": {
      "mass": "1.91 M☉",
      "radius": "9.06 R☉",
      "luminosity": "32.7 L☉",
      "temperature": "4,666 K",
      "exoplanet": "Thestias (Pollux b: 2.3 M_Jup, 590-day orbital period at 1.64 AU)",
      "spectralType": "K0 IIIb"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 85,
      "optical": 98,
      "ultraviolet": 30,
      "xray": 15,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The brightest star in Gemini and the closest giant star to the Sun (33.8 light-years away).",
      "The first giant star confirmed to host an exoplanet (Thestias / Pollux b), officially confirmed in 2006.",
      "Possesses a weak surface magnetic field detected via spectropolarimetry, confirming dynamo generation in evolved giants."
    ],
    "researchPapers": [
      {
        "title": "Confirmation of the planet hypothesis for the long-period radial velocity variations of beta Geminorum",
        "authors": "Hatzes, A. P., Cochran, W. D., Endl, M., et al.",
        "journal": "Astronomy & Astrophysics",
        "year": 2006,
        "doi": "10.1051/0004-6361:20065445",
        "bibcode": "2006A&A...457..335H",
        "openAccessUrl": "https://arxiv.org/abs/astro-ph/0606517"
      }
    ],
    "spectralLines": [
      "Neutral iron Fe I lines with periodic radial velocity shift",
      "Strong Ca II H & K lines"
    ]
  },

  // 87. Caffau's Star (SDSS J102915+172927)
  {
    "id": "obj-caffau-star",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/VLT_antennas_night.jpg/800px-VLT_antennas_night.jpg",
    "name": "Caffau's Star (SDSS J102915+172927)",
    "designation": "SDSS J102915+172927",
    "class": "star",
    "subType": "Ultra-Metal-Poor Population II Subgiant",
    "discoveryYear": 2011,
    "discoveryMission": "Sloan Digital Sky Survey (SDSS) & ESO VLT X-shooter",
    "discoveryInstrument": "VLT X-shooter & UVES High-Resolution Spectrographs",
    "discoveryMethod": "Extremely Metal-Deficient Spectrophotometric Candidate Search",
    "constellation": "Leo",
    "coordinates": {
      "ra": "10h 29m 15.15s",
      "dec": "+17° 29′ 28.0″",
      "raDeg": 157.3131,
      "decDeg": 17.4911
    },
    "distance": {
      "lightYears": "4,370 Light Years",
      "parsecs": "1,340 pc",
      "redshift": 0.0001
    },
    "physics": {
      "metallicity": "[Fe/H] = -4.99 (Less than 1/100,000th of solar metallicity)",
      "carbonNitrogenOxygen": "No enhanced CNO cooling elements—defied low-mass star formation theories",
      "age": "> 13 Billion Years",
      "mass": "< 0.8 M☉",
      "temperature": "5,811 K",
      "spectralType": "Subgiant F/G"
    },
    "spectralBands": {
      "radio": 5,
      "infrared": 45,
      "optical": 95,
      "ultraviolet": 30,
      "xray": 5,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "Dubbed \"the star that should not exist\" because it lacks the carbon and oxygen cooling elements previously deemed necessary to form low-mass stars.",
      "Has a metallicity less than 4 × 10⁻⁵ of the solar value, formed directly from nearly pristine Big Bang nucleosynthesis gas.",
      "One of the oldest surviving low-mass stars in the galactic halo (>13 billion years old)."
    ],
    "researchPapers": [
      {
        "title": "An extremely primitive star in the Galactic halo",
        "authors": "Caffau, E., Bonifacio, P., François, P., et al.",
        "journal": "Nature",
        "year": 2011,
        "doi": "10.1038/nature10377",
        "bibcode": "2011Natur.477...67C",
        "openAccessUrl": "https://arxiv.org/abs/1109.0774"
      }
    ],
    "spectralLines": [
      "Ca II K line at 3933 Å (sole detectable metal absorption feature)",
      "Bare Balmer H-alpha profile"
    ]
  },

  // 88. Alcyone
  {
    "id": "obj-alcyone",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pleiades_large.jpg/800px-Pleiades_large.jpg",
    "name": "Alcyone",
    "designation": "Eta Tauri / 25 Tauri / HD 23630",
    "class": "star",
    "subType": "Brightest Star in the Pleiades Cluster",
    "discoveryYear": 1846,
    "discoveryMission": "Hipparcos & Gaia Pleiades Parallax Surveys",
    "discoveryInstrument": "ESA Gaia Astrometric Space Telescope & CHARA Array",
    "discoveryMethod": "Open Cluster Kinematics & High-Resolution Interferometry",
    "constellation": "Taurus",
    "coordinates": {
      "ra": "03h 47m 29.08s",
      "dec": "+24° 06′ 18.5″",
      "raDeg": 56.8711,
      "decDeg": 24.1051
    },
    "distance": {
      "lightYears": "440 Light Years",
      "parsecs": "135 pc",
      "redshift": 0.00003
    },
    "physics": {
      "luminosity": "2,400 L☉",
      "radius": "9.3 R☉",
      "mass": "6.0 M☉",
      "rotationVelocity": "149 km/s (Surrounded by circumstellar gas emission disk)",
      "temperature": "12,300 K",
      "spectralType": "B7IIIe"
    },
    "spectralBands": {
      "radio": 15,
      "infrared": 75,
      "optical": 98,
      "ultraviolet": 88,
      "xray": 30,
      "gamma": 0,
      "gravitational": 0
    },
    "keyDiscoveries": [
      "The brightest jewel of the Pleiades (Seven Sisters) open star cluster (M45).",
      "Classified as a Be star: its rapid rotation expels a flattened, glowing gaseous decretion disk around its equator.",
      "Illuminates the vibrant blue reflection nebulosity of the Pleiades reflection nebula."
    ],
    "researchPapers": [
      {
        "title": "The Pleiades open cluster: Fundamental parameters and rotation of the Be star Alcyone",
        "authors": "van Leeuwen, F.",
        "journal": "Astronomy & Astrophysics",
        "year": 2009,
        "doi": "10.1051/0004-6361/200911762",
        "bibcode": "2009A&A...497..209V",
        "openAccessUrl": "https://arxiv.org/abs/0902.1039"
      }
    ],
    "spectralLines": [
      "Prominent H-alpha emission with central absorption reversal",
      "He I 4471 Å",
      "Mg II 4481 Å"
    ]
  },

  // 89. Cassiopeia A (Cas A Supernova Remnant)
  {
    "id": "obj-cas-a",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Cassiopeia_A_by_JWST.jpg/800px-Cassiopeia_A_by_JWST.jpg",
    "name": "Cassiopeia A (Cas A)",
    "designation": "3C 461 / G111.7-2.1 (Youngest Milky Way Supernova)",
    "class": "supernova",
    "subType": "Type IIb Core-Collapse Supernova Remnant",
    "discoveryYear": 1948,
    "discoveryMission": "Chandra / JWST / VLA",
    "discoveryInstrument": "NIRCam & Chandra X-ray ACIS",
    "discoveryMethod": "Multi-Wavelength Radio, X-ray & Infrared Imaging",
    "constellation": "Cassiopeia",
    "coordinates": {
      "ra": "23h 23m 27.77s",
      "dec": "+58° 48′ 42.4″",
      "raDeg": 350.8657,
      "decDeg": 58.8118
    },
    "distance": {
      "lightYears": "11,000 Light Years",
      "parsecs": "3,400 pc",
      "redshift": -0.0001
    },
    "physics": {
      "mass": "Progenitor ~16 M☉ (Collapsing to 1.4 M☉ Neutron Star)",
      "expansionVelocity": "4,000 – 6,000 km/s",
      "angularSize": "5 arcminutes (10 Light-Year diameter)",
      "remnantAge": "Approx. 345 Years (Exploded ~1680 AD)",
      "temperature": "10 – 30 Million Kelvin (X-ray emitting shock)"
    },
    "spectralBands": { "radio": 98, "infrared": 95, "optical": 75, "ultraviolet": 40, "xray": 99, "gamma": 45, "gravitational": 0 },
    "keyDiscoveries": [
      "The youngest confirmed core-collapse supernova remnant in the Milky Way galaxy.",
      "JWST NIRCam revealed the enigmatic 'Green Monster' loop of pristine shocked ejecta in the central cavity.",
      "Chandra X-ray identified the isolated central compact object (CCO): an ultra-dense neutron star with a carbon atmosphere."
    ],
    "researchPapers": [
      {
        "title": "A high-resolution infrared view of the Cassiopeia A supernova remnant with JWST",
        "authors": "Milisavljevic, D., et al.",
        "journal": "The Astrophysical Journal",
        "year": 2024,
        "doi": "10.3847/1538-4357/ad1a07",
        "bibcode": "2024ApJ...965...27M",
        "openAccessUrl": "https://arxiv.org/abs/2311.08488"
      }
    ],
    "spectralLines": ["[Ar II] 6.98 µm", "[Fe II] 25.99 µm", "Si XIII He-like triplet", "S XV X-ray complex"]
  },

  // 90. Tycho's Supernova (SN 1572)
  {
    "id": "obj-sn-1572-tycho",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Tycho_supernova_remnant_Chandra.jpg/800px-Tycho_supernova_remnant_Chandra.jpg",
    "name": "Tycho's Supernova (SN 1572)",
    "designation": "SN 1572 / B Cassiopeiae / 3C 10",
    "class": "supernova",
    "subType": "Historical Type Ia Thermonuclear Supernova Remnant",
    "discoveryYear": 1572,
    "discoveryMission": "Tycho Brahe (1572) // Chandra / Hubble",
    "discoveryInstrument": "Naked-Eye Astrometry // Chandra X-ray Observatory",
    "discoveryMethod": "Historical Optical Transient & X-ray Imaging",
    "constellation": "Cassiopeia",
    "coordinates": {
      "ra": "00h 25m 19.9s",
      "dec": "+64° 08′ 14″",
      "raDeg": 6.3329,
      "decDeg": 64.1372
    },
    "distance": {
      "lightYears": "8,000 – 9,800 Light Years",
      "parsecs": "2,800 pc",
      "redshift": 0.00002
    },
    "physics": {
      "peakMagnitude": "-4.0 (Visible in broad daylight for 2 weeks in Nov 1572)",
      "shockVelocity": "4,700 km/s",
      "remnantRadius": "28 Light Years (3.7 arcmin angular radius)",
      "mechanism": "Single/Double Degenerate Carbon-Oxygen White Dwarf Deflagration"
    },
    "spectralBands": { "radio": 85, "infrared": 70, "optical": 65, "ultraviolet": 30, "xray": 96, "gamma": 20, "gravitational": 0 },
    "keyDiscoveries": [
      "Observed by Tycho Brahe in November 1572, overthrowing the Aristotelian dogma of immutable celestial heavens.",
      "Modern optical light echo spectroscopy confirmed it as a normal Type Ia thermonuclear runaway.",
      "Chandra revealed intricate turbulent synchrotron stripes tracing cosmic-ray proton acceleration."
    ],
    "researchPapers": [
      {
        "title": "Tycho Brahe's 1572 supernova as a standard type Ia as revealed by its light-echo spectrum",
        "authors": "Krause, O., Tanaka, M., Usuda, T., et al.",
        "journal": "Nature",
        "year": 2008,
        "doi": "10.1038/nature07608",
        "bibcode": "2008Natur.456..617K",
        "openAccessUrl": "https://arxiv.org/abs/0812.0632"
      }
    ],
    "spectralLines": ["Fe K-alpha 6.4 keV", "Si XIII K-shell emission", "S XV 2.46 keV"]
  },

  // 91. Kepler's Supernova (SN 1604)
  {
    "id": "obj-sn-1604-kepler",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Kepler%27s_supernova.jpg/800px-Kepler%27s_supernova.jpg",
    "name": "Kepler's Supernova (SN 1604)",
    "designation": "SN 1604 / De Stella Nova / 3C 358",
    "class": "supernova",
    "subType": "Historical Type Ia Supernova in Circumstellar Medium",
    "discoveryYear": 1604,
    "discoveryMission": "Johannes Kepler (1604) // NASA Great Observatories",
    "discoveryInstrument": "Naked Eye / Chandra / Hubble / Spitzer",
    "discoveryMethod": "Historical Optical Transient & Multi-Wavelength Synthesis",
    "constellation": "Ophiuchus",
    "coordinates": {
      "ra": "17h 30m 42.0s",
      "dec": "-21° 29′ 00″",
      "raDeg": 262.675,
      "decDeg": -21.4833
    },
    "distance": {
      "lightYears": "16,600 – 20,000 Light Years",
      "parsecs": "5,000 pc",
      "redshift": 0.00004
    },
    "physics": {
      "peakMagnitude": "-2.5 (Brighter than Jupiter at maximum)",
      "expansionSpeed": "5,400 km/s",
      "historicalDuration": "Naked-eye visible for over 18 months",
      "interaction": "Strong shock collision with massive nitrogen-rich progenitor circumstellar shell"
    },
    "spectralBands": { "radio": 80, "infrared": 85, "optical": 82, "ultraviolet": 40, "xray": 95, "gamma": 15, "gravitational": 0 },
    "keyDiscoveries": [
      "The last supernova indisputably witnessed with the naked eye in our Milky Way galaxy (October 1604).",
      "Detailed in Johannes Kepler's seminal treatise 'De Stella Nova in Pede Serpentarii'.",
      "Spitzer and Chandra revealed interaction with a massive circumstellar shell, proving a massive asymptotic giant branch (AGB) companion star."
    ],
    "researchPapers": [
      {
        "title": "Chandra observations of the Kepler Supernova Remnant: A Type Ia with circumstellar interaction",
        "authors": "Reynolds, S. P., et al.",
        "journal": "The Astrophysical Journal Letters",
        "year": 2007,
        "doi": "10.1086/522830",
        "bibcode": "2007ApJ...668L.135R",
        "openAccessUrl": "https://arxiv.org/abs/0708.3858"
      }
    ],
    "spectralLines": ["Fe K-alpha 6.7 keV", "Si He-alpha 1.86 keV", "H-alpha 6563 Å"]
  },

  // 92. GW190521 (Heaviest Intermediate-Mass Black Hole Merger)
  {
    "id": "obj-gw190521",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/LIGO-Virgo_GW190521_Numerical_Relativity_Simulation.jpg/800px-LIGO-Virgo_GW190521_Numerical_Relativity_Simulation.jpg",
    "name": "GW190521 (IMBH Merger)",
    "designation": "GW190521 (Pair-Instability Mass Gap Collision)",
    "class": "blackhole",
    "subType": "Binary Black Hole Gravitational Wave Merger Event",
    "discoveryYear": 2020,
    "discoveryMission": "LIGO Scientific Collaboration & Virgo Collaboration",
    "discoveryInstrument": "Advanced LIGO (Hanford/Livingston) & Advanced Virgo",
    "discoveryMethod": "Coherent Gravitational Wave Matched-Filter Interferometry",
    "constellation": "Coma Berenices",
    "coordinates": {
      "ra": "12h 49m 42s",
      "dec": "-34° 49′ 12″",
      "raDeg": 192.425,
      "decDeg": -34.82
    },
    "distance": {
      "lightYears": "17.1 Billion Light Years (Luminosity Distance)",
      "parsecs": "5,300 Mpc",
      "redshift": 0.82
    },
    "physics": {
      "primaryMass": "85 +21/-14 M☉ (In forbidden pair-instability mass gap)",
      "secondaryMass": "66 +17/-18 M☉",
      "finalRemnantMass": "142 +28/-16 M☉ (First directly detected IMBH)",
      "radiatedEnergy": "8.0 M☉ c² in pure gravitational waves in ~0.1 seconds",
      "remnantSpin": "0.72 (Kerr dimensionless spin parameter)"
    },
    "spectralBands": { "radio": 0, "infrared": 0, "optical": 10, "ultraviolet": 0, "xray": 0, "gamma": 0, "gravitational": 100 },
    "keyDiscoveries": [
      "First direct, unambiguous observational proof of an Intermediate-Mass Black Hole (100–100,000 M☉).",
      "Component black holes defy stellar evolution: 85 M☉ falls directly into the pair-instability supernova gap where stars are completely obliterated.",
      "Radiated 8 solar masses of pure gravitational energy within 0.1 seconds, briefly outshining all stars in the observable universe."
    ],
    "researchPapers": [
      {
        "title": "GW190521: A Binary Black Hole Merger with a Total Mass of 150 M☉",
        "authors": "Abbott, R., et al. (LIGO Scientific Collaboration and Virgo Collaboration)",
        "journal": "Physical Review Letters",
        "year": 2020,
        "doi": "10.1103/PhysRevLett.125.101102",
        "bibcode": "2020PhRvL.125j1102A",
        "openAccessUrl": "https://arxiv.org/abs/2009.01075"
      }
    ],
    "spectralLines": ["Gravitational Wave Ringdown 66 Hz", "Inspiral Chirp Strain 1.0e-21"]
  },

  // 93. AT2018cow ("The Cow" Fast Blue Optical Transient)
  {
    "id": "obj-at2018cow",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/AT2018cow_Hubble.jpg/800px-AT2018cow_Hubble.jpg",
    "name": "AT2018cow ('The Cow')",
    "designation": "ATLAS18qqn / SN 2018cow (Fast Blue Optical Transient)",
    "class": "supernova",
    "subType": "Relativistic Fast Blue Optical Transient (FBOT)",
    "discoveryYear": 2018,
    "discoveryMission": "Asteroid Terrestrial-impact Last Alert System (ATLAS)",
    "discoveryInstrument": "ATLAS Haleakala & Mauna Loa Telescopes",
    "discoveryMethod": "Wide-Field Robotic Sky Transient Survey",
    "constellation": "Hercules",
    "coordinates": {
      "ra": "16h 16m 00.22s",
      "dec": "+22° 16′ 04.9″",
      "raDeg": 244.0009,
      "decDeg": 22.268
    },
    "distance": {
      "lightYears": "200 Million Light Years",
      "parsecs": "60 Mpc",
      "redshift": 0.0141
    },
    "physics": {
      "riseTime": "Just 2.5 days to peak luminosity (10–100x faster than normal supernova)",
      "peakLuminosity": "4 × 10⁴⁴ erg/s (400 Billion Suns)",
      "ejectaVelocity": "Over 30,000 km/s (0.1c relativistic blast)",
      "centralEngine": "Birth of a rapidly spinning magnetar or accreting micro-black hole"
    },
    "spectralBands": { "radio": 92, "infrared": 60, "optical": 96, "ultraviolet": 95, "xray": 98, "gamma": 10, "gravitational": 0 },
    "keyDiscoveries": [
      "The founding prototype of the enigmatic Fast Blue Optical Transient (FBOT) class.",
      "Outshone ordinary core-collapse supernovae by two orders of magnitude within 48 hours of explosion.",
      "Persistent hard X-ray pulsations detected by NuSTAR revealed an active, surviving central compact engine."
    ],
    "researchPapers": [
      {
        "title": "An energetic stellar explosion in a dense circumstellar medium: The fast blue optical transient AT 2018cow",
        "authors": "Prentice, S. J., Maguire, K., Smartt, S. J., et al.",
        "journal": "The Astrophysical Journal Letters",
        "year": 2018,
        "doi": "10.3847/2041-8213/aae52b",
        "bibcode": "2018ApJ...865L...3P",
        "openAccessUrl": "https://arxiv.org/abs/1807.05965"
      }
    ],
    "spectralLines": ["Broad featureless optical continuum", "He I 5876 Å with high velocity", "High-frequency X-ray QPO 224 Hz"]
  }
];
