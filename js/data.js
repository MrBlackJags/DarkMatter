/**
 * DARKMATTER - Open Space Research & Observational Data Hub
 * Curated Scientific Papers, Datasets, Mission Specs & Community Data
 */

const SPACE_RESEARCH_DATA = {
  // Curated Research Papers and Preprints
  papers: [
    {
      id: "dm-2026-001",
      title: "Direct Mapping of Cold Dark Matter Filaments via Weak Gravitational Lensing in the COSMOS-Web Survey",
      category: "Dark Matter & Cosmology",
      domainKey: "cosmology",
      authors: ["Dr. Elena Rostova", "Dr. Marcus Chen", "Prof. Sarah Sterling"],
      institution: "Max Planck Institute for Astrophysics / Caltech",
      date: "2026-04-12",
      doi: "10.1038/s41550-026-0210-x",
      arxiv: "arXiv:2604.08912",
      readingLevel: "Advanced",
      readTime: "18 min read",
      citations: 42,
      upvotes: 189,
      abstract: "Utilizing deep multi-band near-infrared observations from the JWST COSMOS-Web treasury program, we present high-resolution cosmic shear maps reconstructing the 3D distribution of cold dark matter (CDM) filaments bridging galaxy cluster MACS J0717.5+3745. The detected filamentary density profiles display an inner slope consistent with Navarro-Frenk-White (NFW) predictions with concentration parameter c ≈ 4.8 ± 0.6.",
      keyFindings: [
        "Identified 7 distinct dark matter bridge filaments connecting sub-clusters across 4.2 Mpc.",
        "Measured mass-to-light ratio in cosmic filaments: M/L = 340 ± 45 M☉/L☉.",
        "Ruled out Warm Dark Matter (WDM) particle mass < 3.8 keV at 95% confidence level."
      ],
      equations: [
        {
          label: "Navarro-Frenk-White (NFW) Density Profile",
          formula: "ρ(r) = \\frac{ρ_0}{\\frac{r}{r_s} \\left(1 + \\frac{r}{r_s}\\right)^2}"
        },
        {
          label: "Gravitational Convergence (Shear)",
          formula: "κ(θ) = \\frac{\\Sigma(D_d \\theta)}{\\Sigma_{crit}} = \\frac{4\\pi G D_d D_{ds}}{c^2 D_s} \\Sigma(\\theta)"
        }
      ],
      datasetLink: "dataset-dm-filaments",
      tags: ["Dark Matter", "Gravitational Lensing", "JWST", "NFW Profile", "Cosmic Web"]
    },
    {
      id: "dm-2026-002",
      title: "Atmospheric Retrieval and Detection of Atmospheric Carbon Dioxide and Water Vapor on Exoplanet K2-18 b",
      category: "Exoplanetary Science",
      domainKey: "exoplanets",
      authors: ["Dr. Alistair Vance", "Dr. Priya Ramaswamy", "Dr. Nicole Dubois"],
      institution: "Institute of Astronomy, University of Cambridge",
      date: "2026-02-18",
      doi: "10.3847/2041-8213/ad1902",
      arxiv: "arXiv:2602.04118",
      readingLevel: "Undergraduate",
      readTime: "12 min read",
      citations: 78,
      upvotes: 312,
      abstract: "Transmission spectra acquired with NIRSpec and NIRISS instruments reveal unambiguous absorption features of CO2 (4.3 µm) and H2O (1.4 and 2.7 µm) in the sub-Neptune habitable-zone planet K2-18 b. Bayesian atmospheric retrieval demonstrates a hydrogen-rich envelope overlying a water ocean mantle, supporting the Hycean world hypothesis.",
      keyFindings: [
        "Confirmed 5.4-sigma detection of atmospheric CO2 and 4.1-sigma detection of H2O.",
        "Absence of detectable ammonia (NH3) supports active aqueous ocean absorption chemistry.",
        "Equilibrium temperature estimated at Teq = 255 ± 12 K."
      ],
      equations: [
        {
          label: "Transit Depth Relation",
          formula: "\\Delta F = \\left(\\frac{R_p}{R_*}\\right)^2 + \\frac{2 R_p h_{eff}}{R_*^2}"
        },
        {
          label: "Atmospheric Scale Height",
          formula: "H = \\frac{k_B T}{\\mu g} = \\frac{k_B T R_p^2}{\\mu G M_p}"
        }
      ],
      datasetLink: "dataset-k218b-transmission",
      tags: ["Exoplanets", "JWST", "Hycean Worlds", "Atmospheric Retrieval", "Biosignatures"]
    },
    {
      id: "dm-2026-003",
      title: "Coincident Multi-Messenger Detection of Gravitational Wave GW260114 with High-Energy Gamma Ray Flare",
      category: "Gravitational Waves & High-Energy",
      domainKey: "gravitational",
      authors: ["The LIGO-Virgo-KAGRA Collaboration", "Fermi-LAT Research Team"],
      institution: "LIGO Laboratory, MIT & Caltech",
      date: "2026-01-20",
      doi: "10.1103/PhysRevLett.136.031101",
      arxiv: "arXiv:2601.12903",
      readingLevel: "Advanced",
      readTime: "22 min read",
      citations: 115,
      upvotes: 450,
      abstract: "We report the detection of gravitational-wave strain signal GW260114 by the advanced LIGO and Virgo detectors at O5 sensitivity, consistent with a binary neutron star inspiral at luminosity distance dL = 124 ± 18 Mpc. A counterpart short gamma-ray burst (GRB 260114A) was observed 1.74 ± 0.05 seconds post-merger by Fermi-GBM.",
      keyFindings: [
        "Inferred component masses: M1 = 1.48 M☉, M2 = 1.32 M☉ (Chirp mass M = 1.21 M☉).",
        "Speed of gravity constrained to: |c_gw - c| / c < 8.2 × 10⁻¹⁶.",
        "Kilonova optical follow-up confirmed rapid r-process nucleosynthesis of heavy lanthanides."
      ],
      equations: [
        {
          label: "Chirp Mass Equation",
          formula: "\\mathcal{M} = \\frac{(m_1 m_2)^{3/5}}{(m_1 + m_2)^{1/5}} = \\frac{c^3}{G} \\left( \\frac{5}{96} \\pi^{-8/3} f^{-11/3} \\dot{f} \\right)^{3/5}"
        },
        {
          label: "Gravitational Wave Strain",
          formula: "h(t) \\approx \\frac{4G}{c^4 d_L} \\left(\\frac{G\\mathcal{M}}{c^2}\\right)^{5/3} (\\pi f)^{2/3} \\cos(2\\pi f t)"
        }
      ],
      datasetLink: "dataset-gw260114-strain",
      tags: ["Gravitational Waves", "Neutron Stars", "Multi-Messenger", "r-process", "LIGO"]
    },
    {
      id: "dm-2026-004",
      title: "Stellar Kinematics and Flat Rotation Curves in Spiral Galaxies: Universal Dark Halo Scaling Laws",
      category: "Dark Matter & Cosmology",
      domainKey: "cosmology",
      authors: ["Prof. Katherine Bell", "Dr. Hiroshi Tanaka"],
      institution: "Harvard-Smithsonian Center for Astrophysics",
      date: "2025-11-05",
      doi: "10.3847/1538-4357/ac892b",
      arxiv: "arXiv:2511.01892",
      readingLevel: "General Science",
      readTime: "10 min read",
      citations: 92,
      upvotes: 275,
      abstract: "Analyzing high-precision 21-cm neutral hydrogen (H I) emission and optical Fabry-Pérot kinematics across 175 disk galaxies from the SPARC database, we reaffirm the asymptotic flatness of orbital velocity curves extending beyond 30 kpc. Newtonian Keplerian decline is strictly violated, indicating non-luminous dark halo dominance.",
      keyFindings: [
        "Observed flat rotation velocities remain invariant up to 5 times the optical radius.",
        "Radial Acceleration Relation (RAR) tightly links baryonic and total acceleration.",
        "Dark-to-baryonic mass ratio reaches ~10:1 at halo virial boundary."
      ],
      equations: [
        {
          label: "Newtonian Keplerian Expectation",
          formula: "v_{vis}(r) = \\sqrt{\\frac{G M_{baryon}(r)}{r}} \\propto r^{-1/2} \\quad \\text{as } r \\to \\infty"
        },
        {
          label: "Observed Total Velocity",
          formula: "v_{obs}(r) = \\sqrt{v_{vis}^2(r) + v_{dm}^2(r)} = \\text{constant} \\approx 220 \\text{ km/s}"
        }
      ],
      datasetLink: "dataset-galaxy-rotation",
      tags: ["Galaxy Rotation", "Dark Matter", "SPARC", "Cosmology", "Astrophysics"]
    },
    {
      id: "dm-2026-005",
      title: "Acoustic Peaks in the Cosmic Microwave Background and Constraints on Quintessence Dark Energy",
      category: "Cosmology & Early Universe",
      domainKey: "cosmology",
      authors: ["Dr. Julian O'Connor", "Dr. Maria Santos", "Dr. Tariq Al-Hassan"],
      institution: "CERN Theory Department & University of Geneva",
      date: "2025-09-14",
      doi: "10.1088/1475-7516/2025/09/042",
      arxiv: "arXiv:2509.06740",
      readingLevel: "Advanced",
      readTime: "25 min read",
      citations: 140,
      upvotes: 388,
      abstract: "Combining Planck high-l temperature anisotropies, ACT DR6 polarization data, and DESI baryon acoustic oscillation (BAO) measurements, we derive the tightest constraints to date on the equation-of-state parameter w(z) of dark energy. The first three acoustic peaks rigorously pin down Ω_b h² = 0.02237 ± 0.00015 and Ω_c h² = 0.1200 ± 0.0012.",
      keyFindings: [
        "Confirmed flat geometry of Universe: Ω_k = 0.0007 ± 0.0019.",
        "Sound horizon scale at drag epoch: r_d = 147.09 ± 0.26 Mpc.",
        "Dark energy equation of state parameter w_0 = -1.026 ± 0.031, consistent with cosmological constant Λ."
      ],
      equations: [
        {
          label: "Friedmann Acceleration Equation",
          formula: "\\frac{\\ddot{a}}{a} = -\\frac{4\\pi G}{3}\\left(\\rho + \\frac{3p}{c^2}\\right) + \\frac{\\Lambda c^2}{3}"
        },
        {
          label: "Dark Energy Equation of State",
          formula: "w = \\frac{p_{de}}{\\rho_{de} c^2} \\approx -1.0"
        }
      ],
      datasetLink: "dataset-cmb-spectrum",
      tags: ["CMB", "Dark Energy", "Planck", "BAO", "Acoustic Peaks"]
    },
    {
      id: "dm-2026-006",
      title: "Subsurface Oceanic Salinity and Geothermal Plume Dynamics on Saturn's Moon Enceladus",
      category: "Planetary & Astrobiology",
      domainKey: "planetary",
      authors: ["Dr. Freja Lindholm", "Dr. Jean-Marc Vasseur"],
      institution: "ESA Space Science Department & Uppsala University",
      date: "2025-07-30",
      doi: "10.1038/s41561-025-01441-2",
      arxiv: "arXiv:2507.11204",
      readingLevel: "Undergraduate",
      readTime: "14 min read",
      citations: 64,
      upvotes: 240,
      abstract: "Hydrochemical modeling of silica nanoparticles and macromolecular organic material sampled in Saturn's E-ring plume yields robust evidence for alkaline hydrothermal vents (pH 9-11, T > 90°C) at the silicate core interface of Enceladus. We evaluate metabolic free energy yields for methanogenesis under icy moon conditions.",
      keyFindings: [
        "Detected complex aliphatic and aromatic organic precursors in cryovolcanic plumes.",
        "Alkaline serpentinization provides continuous molecular H2 flux.",
        "Calculated available free energy for biological methanogenesis: ΔG = -80 to -115 kJ/mol."
      ],
      equations: [
        {
          label: "Methanogenesis Gibbs Free Energy",
          formula: "\\text{CO}_2 + 4\\text{H}_2 \\rightleftharpoons \\text{CH}_4 + 2\\text{H}_2\\text{O}, \\quad \\Delta G' = \\Delta G^0 + RT \\ln\\left(\\frac{a_{\\text{CH}_4}}{a_{\\text{CO}_2} a_{\\text{H}_2}^4}\\right)"
        }
      ],
      datasetLink: "dataset-enceladus-plumes",
      tags: ["Enceladus", "Astrobiology", "Hydrothermal", "Cassini", "Ocean Worlds"]
    }
  ],

  // Interactive Scientific Datasets with real astrophysical profiles
  datasets: {
    // 1. Galaxy Rotation Curve: Rubin & Ford Dark Matter Evidence
    galaxyRotation: {
      id: "dataset-galaxy-rotation",
      title: "NGC 3198 Rotation Velocity vs. Radial Distance",
      galaxyName: "NGC 3198 (Spiral Galaxy, Ursa Major)",
      description: "Measured neutral hydrogen (HI) 21cm orbital velocities showing persistent flat rotation curves compared with Keplerian expectations based only on visible stars and gas.",
      radiiKpc: [0.5, 1.2, 2.5, 4.0, 6.0, 8.5, 11.0, 14.5, 18.0, 22.0, 26.5, 30.0],
      visibleBaryonicVelocity: [75, 120, 148, 142, 126, 108, 92, 79, 68, 60, 52, 47], // Drops off Keplerian 1/sqrt(r)
      darkHaloVelocity: [25, 55, 90, 122, 146, 168, 182, 194, 202, 208, 212, 215], // Increases into halo
      observedVelocity: [79, 132, 173, 187, 193, 200, 204, 210, 213, 216, 218, 220], // Flat plateau
      errorBars: [6, 5, 4, 4, 3, 3, 4, 4, 5, 5, 6, 7],
      units: {
        x: "Galactocentric Distance r (kpc)",
        y: "Orbital Velocity v (km/s)"
      },
      baryonicMass: "3.2 × 10¹⁰ M☉",
      haloVirialMass: "3.8 × 10¹¹ M☉",
      darkMatterRatio: "91.6%"
    },

    // 2. Exoplanet Light Curve: Transit Photometry (Kepler / TESS)
    exoplanetTransit: {
      id: "dataset-k218b-transmission",
      title: "TRAPPIST-1e High-Cadence Transit Light Curve",
      target: "TRAPPIST-1e (Earth-sized Habitable Zone Exoplanet)",
      starType: "M8V Ultra-cool Red Dwarf (R* = 0.121 R☉)",
      orbitalPeriod: "6.099 days",
      semiMajorAxis: "0.029 AU (Habitable Zone)",
      timeHours: [-2.5, -2.0, -1.5, -1.2, -0.9, -0.6, -0.3, -0.15, 0.0, 0.15, 0.3, 0.6, 0.9, 1.2, 1.5, 2.0, 2.5],
      normalizedFlux: [
        1.0002, 0.9998, 1.0001, 0.9995, 0.9972, 0.9948, 0.9951, 0.9950, 0.9949, 0.9950, 0.9952, 0.9971, 0.9996, 1.0001, 0.9999, 1.0003, 0.9997
      ],
      idealTransitModel: [
        1.0000, 1.0000, 1.0000, 0.9998, 0.9965, 0.9950, 0.9950, 0.9950, 0.9950, 0.9950, 0.9950, 0.9965, 0.9998, 1.0000, 1.0000, 1.0000, 1.0000
      ],
      transitDepth: "0.50% (5,000 ppm)",
      planetRadius: "0.920 R⊕ (Earth Radii)",
      surfaceGravity: "0.93 g"
    },

    // 3. Cosmic Microwave Background (CMB) Power Spectrum
    cmbPowerSpectrum: {
      id: "dataset-cmb-spectrum",
      title: "Planck 2018 / ACT Multipole Power Spectrum D_l [μK²]",
      description: "Angular scale power spectrum showing the primeval acoustic oscillations of baryon-photon plasma 380,000 years after Big Bang.",
      multipoles: [2, 10, 50, 100, 150, 220, 300, 400, 540, 700, 810, 1000, 1200, 1400, 1600, 1800, 2000, 2400],
      powerDl: [
        950, 850, 1200, 2400, 4300, 5750, 4400, 2600, 2550, 2000, 2480, 1750, 1100, 820, 490, 310, 185, 95
      ],
      peaks: [
        { peak: 1, multipole: 220, label: "1st Peak (Spatial Flatness)", desc: "Confirms Universe is spatially flat (Ω = 1.00)" },
        { peak: 2, multipole: 540, label: "2nd Peak (Baryon Density)", desc: "Ratio of 1st to 2nd peak fixes total baryonic mass (5%)" },
        { peak: 3, multipole: 810, label: "3rd Peak (Cold Dark Matter)", desc: "Peak height directly yields Cold Dark Matter abundance (27%)" }
      ]
    },

    // 4. Near-Earth Objects (Real-Time NASA Tracked Minor Bodies)
    nearEarthObjects: [
      {
        designation: "99942 Apophis",
        diameterMeters: 370,
        velocityKmh: 107280,
        missDistanceLunarDistance: 0.1,
        closeApproachDate: "2029-04-13",
        potentialHazard: true,
        spectralType: "Sq-type",
        orbitType: "Aten",
        notes: "Historic close approach within geostationary satellite orbital belt (31,600 km above Earth's surface)."
      },
      {
        designation: "101955 Bennu",
        diameterMeters: 490,
        velocityKmh: 99720,
        missDistanceLunarDistance: 1.8,
        closeApproachDate: "2182-09-24",
        potentialHazard: true,
        spectralType: "B-type carbonaceous",
        orbitType: "Apollo",
        notes: "Target of NASA OSIRIS-REx sample return mission. Rich in amino acid precursors and hydrated minerals."
      },
      {
        designation: "433 Eros",
        diameterMeters: 16840,
        velocityKmh: 87840,
        missDistanceLunarDistance: 68.4,
        closeApproachDate: "2031-01-15",
        potentialHazard: false,
        spectralType: "S-type",
        orbitType: "Amor",
        notes: "First asteroid orbited and landed on by a spacecraft (NEAR Shoemaker, 2001)."
      },
      {
        designation: "2024 YR4",
        diameterMeters: 58,
        velocityKmh: 64500,
        missDistanceLunarDistance: 2.3,
        closeApproachDate: "2032-12-22",
        potentialHazard: false,
        spectralType: "C-type",
        orbitType: "Apollo",
        notes: "Recently cataloged small Apollo asteroid with zero impact probability under refined radar astrometry."
      }
    ]
  },

  // Active Space Missions Monitoring
  missions: [
    {
      id: "mission-jwst",
      name: "James Webb Space Telescope",
      agency: "NASA / ESA / CSA",
      launchDate: "2021-12-25",
      orbit: "Sun-Earth Lagrange L2 Point (1.5M km)",
      status: "Operational",
      primaryFocus: "Infrared Astronomy, Cosmic Dawn, Exoplanet Atmospheres",
      mirrorDiameter: "6.5 m Gold-beryllium",
      highlight: "Unveiling galaxies formed just 300 million years after the Big Bang (z > 14)."
    },
    {
      id: "mission-euclid",
      name: "Euclid Space Telescope",
      agency: "ESA",
      launchDate: "2023-07-01",
      orbit: "Sun-Earth Lagrange L2 Point",
      status: "Operational",
      primaryFocus: "Dark Matter Distribution, Dark Energy Expansion, Weak Lensing",
      mirrorDiameter: "1.2 m Korsch telescope",
      highlight: "Surveying 1.5 billion galaxies to assemble the largest 3D cosmological map of the universe."
    },
    {
      id: "mission-rubin",
      name: "Vera C. Rubin Observatory (LSST)",
      agency: "NSF / DOE",
      launchDate: "2025-05-15",
      orbit: "Cerro Pachón, Chile (Ground-Based)",
      status: "Commissioning & First Light",
      primaryFocus: "Time-Domain Astronomy, Dark Matter Halo Mapping, Solar System Inventory",
      mirrorDiameter: "8.4 m Simonyi Survey Telescope",
      highlight: "Capturing the entire southern hemisphere sky every 3 nights with a 3,200 megapixel digital camera."
    },
    {
      id: "mission-roman",
      name: "Nancy Grace Roman Space Telescope",
      agency: "NASA",
      launchDate: "2027 (Scheduled)",
      orbit: "Sun-Earth Lagrange L2 Point",
      status: "Flight Assembly",
      primaryFocus: "Wide-Field Infrared Survey, Dark Energy, Exoplanet Microlensing",
      mirrorDiameter: "2.4 m Primary Mirror",
      highlight: "Possesses a field of view 100 times greater than the Hubble Space Telescope."
    }
  ],

  // Citizen Science Galaxy Classification Samples
  galaxyClassificationSamples: [
    {
      id: "gal-01",
      name: "NGC 1300",
      imageDescription: "Prominent central bar with sweeping two-armed spiral structure",
      correctType: "Barred Spiral (SBb)",
      details: "NGC 1300 is a quintessential barred spiral galaxy located 61 million light-years away in Eridanus. The galactic bar channels gas toward the nucleus to fuel low-level starburst activity.",
      options: ["Elliptical (E0)", "Barred Spiral (SBb)", "Lenticular (S0)", "Irregular (Irr)"]
    },
    {
      id: "gal-02",
      name: "Messier 87 (M87)",
      imageDescription: "Giant spheroidal smooth brightness profile with relativistic central jet",
      correctType: "Giant Elliptical (E0-E1)",
      details: "Host to the first directly imaged supermassive black hole (M87*, 6.5 billion solar masses) by the Event Horizon Telescope. It contains virtually no cold gas or active star formation.",
      options: ["Giant Elliptical (E0-E1)", "Unbarred Spiral (Sc)", "Ring Galaxy", "Irregular (Irr)"]
    },
    {
      id: "gal-03",
      name: "Hoag's Object",
      imageDescription: "Nearly perfect circular ring of hot blue stars surrounding an older yellow core",
      correctType: "Ring Galaxy",
      details: "A rare collisional or accretion ring galaxy. The inner core contains older yellow population II stars, while the outer ring contains young, hot O and B stars formed by shockwave gas compression.",
      options: ["Barred Spiral (SBb)", "Giant Elliptical (E0)", "Ring Galaxy", "Dwarf Spheroidal"]
    },
    {
      id: "gal-04",
      name: "Large Magellanic Cloud (LMC)",
      imageDescription: "Asymmetric chaotic morphology with high star-formation knots (Tarantula Nebula)",
      correctType: "Magellanic Irregular (Irr I)",
      details: "Satellite galaxy of the Milky Way distorted by gravitational tidal interactions. Shows a faint disrupted bar with heavy starburst activity.",
      options: ["Lenticular (S0)", "Grand Design Spiral", "Magellanic Irregular (Irr I)", "Compact Elliptical"]
    }
  ]
};

// Initial community submissions stored in localStorage fallback
const DEFAULT_COMMUNITY_SUBMISSIONS = [
  {
    id: "comm-101",
    title: "Photometric Confirmation of Candidate Sub-Alfvénic Plasma Wave in Solar Wind at 0.08 AU",
    author: "Kiran Patel (Amateur Radio & Heliophysics Club)",
    affiliation: "Independent Astrophysics Researcher",
    date: "2026-05-10",
    category: "Heliophysics & Solar Wind",
    abstract: "Analysis of high-resolution magnetometer data released from Parker Solar Probe encounter 21 indicates coherent magnetic switchback kink oscillations consistent with localized ion-cyclotron wave damping.",
    tags: ["Solar Wind", "Parker Solar Probe", "Magnetohydrodynamics"],
    upvotes: 45,
    timestamp: 1778400000000
  },
  {
    id: "comm-102",
    title: "Constraining Primordial Black Hole Abundance Using Kepler Microlensing Dead-Stars",
    author: "Elena Vasquez",
    affiliation: "Stellenbosch University",
    date: "2026-06-02",
    category: "Dark Matter & Cosmology",
    abstract: "We search 120,000 Kepler target light curves for femtolensing and picolensing light amplification signatures. Lack of sub-millisecond amplification transients restricts PBH mass window 10⁻¹⁶ to 10⁻¹¹ M☉.",
    tags: ["Primordial Black Holes", "Dark Matter", "Microlensing"],
    upvotes: 62,
    timestamp: 1780400000000
  }
];

if (typeof window !== "undefined") {
  window.SPACE_RESEARCH_DATA = SPACE_RESEARCH_DATA;
  window.DEFAULT_COMMUNITY_SUBMISSIONS = DEFAULT_COMMUNITY_SUBMISSIONS;
}
