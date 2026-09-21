/**
 * DARKMATTER OBSERVATORY - Deep Sky Object Discovery Catalog
 * Curated scientific telemetry, astrometry, physical properties, and research papers
 */

export const CELESTIAL_CLASSES = [
  { id: 'all', label: 'All Discovered Objects', badge: 'ALL' },
  { id: 'exoplanet', label: 'Exoplanets & Habitable Worlds', badge: 'EXO', color: 'text-hud-cyan border-hud-cyan/40 bg-hud-cyan/10' },
  { id: 'blackhole', label: 'Black Holes & GW Mergers', badge: 'BH/GW', color: 'text-hud-violet border-hud-violet/40 bg-hud-violet/10' },
  { id: 'galaxy', label: 'Cosmic Dawn & Deep Galaxies', badge: 'GAL', color: 'text-hud-amber border-hud-amber/40 bg-hud-amber/10' },
  { id: 'pulsar', label: 'Pulsars, Magnetars & FRBs', badge: 'PSR/FRB', color: 'text-hud-emerald border-hud-emerald/40 bg-hud-emerald/10' },
  { id: 'interstellar', label: 'Interstellar Interlopers & KBOs', badge: 'INT/KBO', color: 'text-hud-rose border-hud-rose/40 bg-hud-rose/10' },
  { id: 'supernova', label: 'Supernovae & Relativistic Transients', badge: 'SN/TR', color: 'text-amber-400 border-amber-400/40 bg-amber-400/10' }
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
      uvLuminosity: '-20.8 M_UV (Intrinsically Luminous)'
    },
    spectralBands: {
      radio: 5,
      infrared: 98,
      optical: 12,
      ultraviolet: 85,
      xray: 4,
      gamma: 0,
      gravitational: 0
    },
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
    discoveryInstrument: 'Global 1.3mm VLBI Array (ALMA, APEX, IRAM 30m, SMA, JCMT, LMT, SMT, SPT)',
    discoveryMethod: 'Very Long Baseline Radio Interferometry (VLBI)',
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
      mass: '6.5 ± 0.7 × 10⁹ M☉ (Billion Suns)',
      schwarzschildRadius: '19.2 Billion km (128 AU)',
      shadowDiameter: '42 ± 3 microarcseconds',
      spinParameter: 'a* ≈ 0.90 ± 0.05 (Rapid Prograde Spin)',
      jetLength: '5,000 Light Years (Relativistic 0.99c)'
    },
    spectralBands: {
      radio: 100,
      infrared: 45,
      optical: 30,
      ultraviolet: 25,
      xray: 75,
      gamma: 60,
      gravitational: 15
    },
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
    spectralLines: ['Synchrotron emission at 230 GHz (1.3 mm)', 'Iron K-alpha X-ray fluorescence', 'Synchrotron self-Compton gamma flux']
  },

  // 3. TRAPPIST-1e
  {
    id: 'obj-trappist-1e',
    name: 'TRAPPIST-1e',
    designation: '2MASS J23062928-0502285 e',
    class: 'exoplanet',
    subType: 'Terrestrial Habitable-Zone Exoplanet',
    discoveryYear: 2017,
    discoveryMission: 'TRAPPIST-South / Spitzer Space Telescope / Kepler (K2)',
    discoveryInstrument: 'Photometric CCD & IRAC IR Camera',
    discoveryMethod: 'High-Precision Transit Photometry & TTV',
    constellation: 'Aquarius',
    coordinates: {
      ra: '23h 06m 29.37s',
      dec: '-05° 02′ 29.0″',
      raDeg: 346.6224,
      decDeg: -5.0414
    },
    distance: {
      lightYears: '39.46 Light Years',
      parsecs: '12.10 pc'
    },
    physics: {
      mass: '0.692 ± 0.022 M⊕ (Earth Masses)',
      radius: '0.920 ± 0.008 R⊕',
      density: '5.65 g/cm³ (High iron-nickel core fraction)',
      surfaceGravity: '0.93 g',
      equilibriumTemp: '251.3 K (-22 °C without greenhouse)',
      orbitalPeriod: '6.099615 days',
      semiMajorAxis: '0.02928 AU'
    },
    spectralBands: {
      radio: 0,
      infrared: 92,
      optical: 40,
      ultraviolet: 10,
      xray: 0,
      gamma: 0,
      gravitational: 0
    },
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
    distance: {
      lightYears: '124.3 Light Years',
      parsecs: '38.1 pc'
    },
    physics: {
      mass: '8.63 ± 1.35 M⊕',
      radius: '2.61 ± 0.09 R⊕',
      density: '2.67 g/cm³',
      surfaceGravity: '1.27 g',
      equilibriumTemp: '255 ± 12 K',
      orbitalPeriod: '32.9396 days',
      semiMajorAxis: '0.1429 AU'
    },
    spectralBands: {
      radio: 0,
      infrared: 95,
      optical: 35,
      ultraviolet: 5,
      xray: 0,
      gamma: 0,
      gravitational: 0
    },
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
    spectralLines: ['CH4 absorption at 1.6 & 2.3 µm', 'CO2 absorption at 4.3 µm', 'DMS candidate line at 3.4 µm']
  },

  // 5. GW170817 Binary Neutron Star Merger
  {
    id: 'obj-gw170817',
    name: 'GW170817 / AT2017gfo',
    designation: 'Binary Neutron Star Inspiral & Kilonova',
    class: 'blackhole',
    subType: 'Binary Neutron Star Merger & Kilonova',
    discoveryYear: 2017,
    discoveryMission: 'LIGO-Virgo / Fermi-GBM / INTEGRAL / Swope Telescope',
    discoveryInstrument: 'Laser Interferometer Gravitational-Wave Observatories & Gamma/Optical',
    discoveryMethod: 'Gravitational-Wave Strain & Multi-Messenger EM Counterpart',
    constellation: 'Hydra (Host galaxy NGC 4993)',
    coordinates: {
      ra: '13h 09m 48.08s',
      dec: '-23° 22′ 53.3″',
      raDeg: 197.4503,
      decDeg: -23.3815
    },
    distance: {
      lightYears: '130.4 Million Light Years',
      parsecs: '40.0 Mpc',
      redshift: 0.0097
    },
    physics: {
      componentMasses: 'M1 = 1.36-1.60 M☉, M2 = 1.17-1.36 M☉',
      chirpMass: '1.188 M☉',
      ejectedMass: '0.05 M☉ of heavy r-process lanthanides (Gold, Platinum, Uranium)',
      speedOfGravity: '|v_gw - c| / c < 3 × 10⁻¹⁵',
      peakLuminosityGW: '10⁴⁹ Watts (surpassed all stars in visible universe combined)'
    },
    spectralBands: {
      radio: 70,
      infrared: 88,
      optical: 82,
      ultraviolet: 65,
      xray: 78,
      gamma: 95,
      gravitational: 100
    },
    keyDiscoveries: [
      'Inaugurated the era of multi-messenger astrophysics: simultaneous gravitational wave, gamma-ray burst (GRB 170817A), and optical kilonova.',
      'Proved that binary neutron star collisions are the primary cosmic forge of heavy r-process elements (gold, platinum, neodymium).',
      'Constrained the speed of gravity to equal the speed of light to 15 decimal places.'
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
    spectralLines: ['Gravitational chirp strain (24 Hz to 2048 Hz)', 'Lanthanide opacity absorption at 1.0 - 2.5 µm', 'Non-thermal synchrotron X-ray jet']
  },

  // 6. 1I/'Oumuamua Interstellar Interloper
  {
    id: 'obj-oumuamua',
    name: "1I/'Oumuamua",
    designation: '1I/2017 U1',
    class: 'interstellar',
    subType: 'Interstellar Asteroid / Nitrogen Ice Shard',
    discoveryYear: 2017,
    discoveryMission: 'Pan-STARRS 1 Survey Telescope',
    discoveryInstrument: 'GigaPixel Camera 1 (GPC1)',
    discoveryMethod: 'Wide-Field Optical Survey Astrometry',
    constellation: 'Lyra (Direction of origin: Vega apex)',
    coordinates: {
      ra: '18h 40m 00s',
      dec: '+34° 00′ 00″',
      raDeg: 280.00,
      decDeg: 34.00
    },
    distance: {
      hyperbolicExcessSpeed: '26.33 km/s (Hyperbolic orbit e = 1.20)',
      closestToEarth: '0.16 AU (24 Million km)',
      currentDistance: '> 40 AU (Beyond Neptune into interstellar void)'
    },
    physics: {
      dimensions: '400 m × 40 m × 40 m (Extreme 10:1 elongation ratio)',
      rotationPeriod: '8.14 hours (Tumbling chaotic rotation)',
      albedo: '0.04 - 0.10 (Dark reddish carbon-rich tholins)',
      nonGravitationalAcceleration: 'a_ng = 4.92 × 10⁻⁶ m/s² (Outgassing thrust without visible dust tail)'
    },
    spectralBands: {
      radio: 5,
      infrared: 40,
      optical: 90,
      ultraviolet: 10,
      xray: 0,
      gamma: 0,
      gravitational: 0
    },
    keyDiscoveries: [
      'First confirmed macroscopic interstellar object to visit the inner Solar System from another star system.',
      'Extreme light curve variation (2.5 magnitudes) demonstrated an unprecedented cigar-like or pancake-like geometry.',
      'Unresolved non-gravitational acceleration sparked hypotheses ranging from molecular hydrogen/nitrogen outgassing to solar radiation pressure sail.'
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
    spectralLines: ['Neutral optical reflectance slope', 'Lack of CN / C2 emission bands']
  },

  // 7. SGR 1935+2154 Galactic Magnetar (FRB Source)
  {
    id: 'obj-sgr-1935',
    name: 'SGR 1935+2154',
    designation: 'Soft Gamma Repeater 1935+2154',
    class: 'pulsar',
    subType: 'Ultra-Magnetic Neutron Star (Magnetar)',
    discoveryYear: 2020,
    discoveryMission: 'CHIME / STARE2 / Swift / NICER / Insight-HXMT',
    discoveryInstrument: 'Radio Interferometers & X-Ray Telescopes',
    discoveryMethod: 'Simultaneous Millisecond Radio Burst & Hard X-Ray Flare',
    constellation: 'Vulpecula',
    coordinates: {
      ra: '19h 34m 55.60s',
      dec: '+21° 53′ 47.7″',
      raDeg: 293.7317,
      decDeg: 21.8966
    },
    distance: {
      lightYears: '30,000 Light Years',
      parsecs: '9,000 pc'
    },
    physics: {
      magneticFieldB: '2.2 × 10¹⁴ Gauss (22 Teratesla)',
      spinPeriod: '3.245 seconds',
      burstEnergyRadio: '10²⁸ Joules in 1 millisecond',
      burstFluence: '1.5 Megajansky-milliseconds'
    },
    spectralBands: {
      radio: 95,
      infrared: 15,
      optical: 10,
      ultraviolet: 20,
      xray: 95,
      gamma: 85,
      gravitational: 5
    },
    keyDiscoveries: [
      'Discovered the first Fast Radio Burst (FRB 200428) originating within the Milky Way.',
      'Definitively confirmed that magnetar crustal starquakes and magnetic reconnection events produce Fast Radio Bursts.',
      'First simultaneous multi-wavelength detection of an FRB in radio and hard X-rays.'
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

  // 8. Sagittarius A* (Milky Way Supermassive Black Hole)
  {
    id: 'obj-sgra-star',
    name: 'Sagittarius A*',
    designation: 'Sgr A* Central Singularity',
    class: 'blackhole',
    subType: 'Galactic Center Supermassive Black Hole',
    discoveryYear: 2022,
    discoveryMission: 'Event Horizon Telescope (EHT)',
    discoveryInstrument: 'Global 1.3mm Interferometer Array',
    discoveryMethod: 'Sub-millimeter VLBI Imaging & Stellar Orbits (S2)',
    constellation: 'Sagittarius',
    coordinates: {
      ra: '17h 45m 40.04s',
      dec: '-29° 00′ 28.1″',
      raDeg: 266.4168,
      decDeg: -29.0078
    },
    distance: {
      lightYears: '26,673 Light Years',
      parsecs: '8,178 pc'
    },
    physics: {
      mass: '4.154 ± 0.014 × 10⁶ M☉ (4.15 Million Suns)',
      schwarzschildRadius: '12.3 Million km (0.08 AU)',
      shadowDiameter: '51.8 ± 2.3 microarcseconds',
      orbitalTimeScale: '3 to 10 minutes (Extreme rapid turbulence)',
      accretionRate: '10⁻⁸ M☉ / year (Radiatively Inefficient)'
    },
    spectralBands: {
      radio: 98,
      infrared: 80,
      optical: 5, // Heavily dust-obscured
      ultraviolet: 5,
      xray: 70,
      gamma: 40,
      gravitational: 10
    },
    keyDiscoveries: [
      'First direct horizon-scale image of our own galaxy’s supermassive black hole.',
      'Proved universality of Kerr metric across 3 orders of magnitude in mass between M87* and Sgr A*.',
      'Observed relativistic magnetic flares orbiting the innermost stable circular orbit (ISCO) at 30% speed of light.'
    ],
    researchPapers: [
      {
        title: 'First Sagittarius A* Event Horizon Telescope Results. I. The Shadow of the Supermassive Black Hole in the Center of the Milky Way',
        authors: 'The Event Horizon Telescope Collaboration (Akiyama, K., et al.)',
        journal: 'The Astrophysical Journal Letters',
        year: 2022,
        doi: '10.3847/2041-8213/ac6674',
        bibcode: '2022ApJ...930L..12E',
        openAccessUrl: 'https://iopscience.iop.org/article/10.3847/2041-8213/ac6674'
      }
    ],
    spectralLines: ['1.3 mm synchrotron continuum', 'Near-infrared synchrotron flares at 2.2 µm', 'Chandra X-ray flaring episodes']
  },

  // 9. Proxima Centauri b
  {
    id: 'obj-proxima-b',
    name: 'Proxima Centauri b',
    designation: 'Alpha Centauri C b',
    class: 'exoplanet',
    subType: 'Nearest Terrestrial Exoplanet',
    discoveryYear: 2016,
    discoveryMission: 'European Southern Observatory (ESO)',
    discoveryInstrument: 'HARPS & UVES Spectrographs on 3.6m Telescope at La Silla',
    discoveryMethod: 'Doppler High-Resolution Radial Velocity',
    constellation: 'Centaurus',
    coordinates: {
      ra: '14h 29m 42.95s',
      dec: '-62° 40′ 46.1″',
      raDeg: 217.4290,
      decDeg: -62.6795
    },
    distance: {
      lightYears: '4.2465 Light Years',
      parsecs: '1.302 pc'
    },
    physics: {
      minimumMass: '1.173 ± 0.086 M⊕',
      estimatedRadius: '1.07 R⊕',
      equilibriumTemp: '234 K (-39 °C)',
      orbitalPeriod: '11.186 days',
      semiMajorAxis: '0.0485 AU',
      stellarIrradiation: '65% of Earth flux'
    },
    spectralBands: {
      radio: 0,
      infrared: 80,
      optical: 50,
      ultraviolet: 25,
      xray: 0,
      gamma: 0,
      gravitational: 0
    },
    keyDiscoveries: [
      'The closest known exoplanet to our Solar System, located inside the liquid water habitable zone.',
      'Subject to severe stellar flares and coronal mass ejections from active host red dwarf Proxima Centauri.',
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
    spectralLines: ['1.4 m/s stellar Doppler wobble reflex', 'ESPRESSO VLT radial velocity verification']
  },

  // 10. 486958 Arrokoth (Ultima Thule)
  {
    id: 'obj-arrokoth',
    name: '486958 Arrokoth',
    designation: '2014 MU69',
    class: 'interstellar',
    subType: 'Cold Classical Kuiper Belt Contact Binary',
    discoveryYear: 2014,
    discoveryMission: 'Hubble Space Telescope / NASA New Horizons',
    discoveryInstrument: 'Wide Field Camera 3 (HST) / LORRI & Ralph (New Horizons)',
    discoveryMethod: 'HST Dedicated Target Search & Flyby Imaging (Jan 1, 2019)',
    constellation: 'Sagittarius',
    coordinates: {
      ra: '19h 17m 30s',
      dec: '-20° 40′ 00″',
      raDeg: 289.37,
      decDeg: -20.66
    },
    distance: {
      lightYears: '0.0007 Light Years (44.6 AU)',
      astronomicalUnits: '44.6 AU (6.67 Billion km)'
    },
    physics: {
      dimensions: '36 km × 20 km × 10 km (Bi-lobed contact binary)',
      lobeRatio: 'Large lobe (Ultima) 21 km, Small lobe (Thule) 15 km',
      surfaceTemp: '42 K (-231 °C)',
      composition: 'Methanol ice, water ice, complex tholin organics',
      orbitalPeriod: '298 Earth Years'
    },
    spectralBands: {
      radio: 0,
      infrared: 70,
      optical: 85,
      ultraviolet: 15,
      xray: 0,
      gamma: 0,
      gravitational: 0
    },
    keyDiscoveries: [
      'The most distant and primitive solar system object ever explored in situ by a spacecraft.',
      'Flattish pancake-like lobes joined at a narrow neck prove gentle, low-velocity aerodynamic cloud pebble accretion (~meters per second), rejecting chaotic violent collision models.',
      'Completely unperturbed pristine relic preserved from the primordial proto-planetary disk 4.5 billion years ago.'
    ],
    researchPapers: [
      {
        title: 'The initial results from the New Horizons exploration of 2014 MU69, a small Kuiper Belt object',
        authors: 'Stern, S. A., Weaver, H. A., Spencer, J. R., et al.',
        journal: 'Science',
        year: 2019,
        doi: '10.1126/science.aaw9771',
        bibcode: '2019Sci...364.9771S',
        openAccessUrl: 'https://science.sciencemag.org/content/364/6441/eaaw9771'
      }
    ],
    spectralLines: ['CH3OH (methanol) absorption at 2.27 µm', 'Deep red optical color gradient']
  }
];
