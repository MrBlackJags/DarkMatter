/**
 * DARKMATTER OBSERVATORY - Deep Sky Object Discovery Catalog
 * Curated scientific telemetry, astrometry, physical properties, and peer-reviewed papers
 */

export const CELESTIAL_CLASSES = [
  { id: 'all', label: 'All Discovered Objects', badge: 'ALL' },
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
];
