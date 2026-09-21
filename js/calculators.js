/**
 * DARKMATTER - Astrophysics & Cosmology Interactive Calculators
 * High-precision scientific computational utilities
 */

const ASTRO_CONSTANTS = {
  G: 6.67430e-11,       // m^3 kg^-1 s^-2
  c: 299792458,         // m/s
  h_bar: 1.054571817e-34, // J s
  k_B: 1.380649e-23,    // J/K
  M_sun: 1.98847e30,    // kg
  M_earth: 5.9722e24,   // kg
  R_sun: 6.9634e8,      // m
  AU: 1.495978707e11,   // m
  H0: 70.0,             // km/s / Mpc
  Mpc_to_km: 3.085677581e19 // km in 1 Mpc
};

const AstroCalculators = {
  // 1. Cosmological Redshift & Expansion Velocity
  calcRedshift: function(zVal) {
    const z = parseFloat(zVal);
    if (isNaN(z) || z < 0) return null;

    // Relativistic recession velocity: v/c = ((1+z)^2 - 1) / ((1+z)^2 + 1)
    const zFactor = Math.pow(1 + z, 2);
    const beta = (zFactor - 1) / (zFactor + 1);
    const v_kms = beta * (ASTRO_CONSTANTS.c / 1000);

    // Approximate Hubble distance (for low/moderate z, Hubble's law)
    const distMpc = v_kms / ASTRO_CONSTANTS.H0;
    const distGly = distMpc * 3.26156e-3; // Billion light years

    // Approximate Lookback time in Gyr: t = t_0 * (1 - (1+z)^(-3/2)) roughly for flat matter-dominated
    const ageOfUniverseGyr = 13.787;
    const lookbackGyr = ageOfUniverseGyr * (1 - Math.pow(1 + z, -1.15));

    return {
      z: z.toFixed(4),
      velocityKms: Math.round(v_kms).toLocaleString(),
      beta: (beta * 100).toFixed(2) + '% c',
      distanceMpc: distMpc.toFixed(1),
      distanceGly: distGly.toFixed(2),
      lookbackGyr: Math.min(lookbackGyr, 13.6).toFixed(2)
    };
  },

  // 2. Schwarzschild Radius (Black Hole Horizon)
  calcSchwarzschild: function(massValue, massUnit) {
    let massKg = parseFloat(massValue);
    if (isNaN(massKg) || massKg <= 0) return null;

    if (massUnit === 'solar') {
      massKg *= ASTRO_CONSTANTS.M_sun;
    } else if (massUnit === 'earth') {
      massKg *= ASTRO_CONSTANTS.M_earth;
    }

    // Rs = 2GM / c^2
    const Rs_m = (2 * ASTRO_CONSTANTS.G * massKg) / Math.pow(ASTRO_CONSTANTS.c, 2);
    const Rs_km = Rs_m / 1000;

    // Hawking Radiation Temperature: T_H = hbar c^3 / (8 pi G M kB)
    const T_H = (ASTRO_CONSTANTS.h_bar * Math.pow(ASTRO_CONSTANTS.c, 3)) / 
                (8 * Math.PI * ASTRO_CONSTANTS.G * massKg * ASTRO_CONSTANTS.k_B);

    // Photon sphere: 1.5 Rs
    const photonSphereKm = Rs_km * 1.5;

    return {
      radiusKm: Rs_km < 0.01 ? (Rs_km * 1000).toFixed(2) + ' meters' : Rs_km.toFixed(3) + ' km',
      photonSphereKm: photonSphereKm.toFixed(3) + ' km',
      hawkingTempKelvin: T_H < 1e-4 ? T_H.toExponential(4) + ' K' : T_H.toFixed(4) + ' K',
      massKg: massKg.toExponential(3) + ' kg'
    };
  },

  // 3. Exoplanet Equilibrium Temperature & Habitable Zone
  calcExoplanetTemp: function(starTempK, starRadiusSolar, semiMajorAxisAU, albedo = 0.3) {
    const T_star = parseFloat(starTempK);
    const R_star_sun = parseFloat(starRadiusSolar);
    const d_AU = parseFloat(semiMajorAxisAU);
    const A = parseFloat(albedo);

    if (isNaN(T_star) || isNaN(R_star_sun) || isNaN(d_AU) || isNaN(A)) return null;

    // Convert to meters
    const R_star_m = R_star_sun * ASTRO_CONSTANTS.R_sun;
    const d_m = d_AU * ASTRO_CONSTANTS.AU;

    // Teq = T_star * (1 - A)^(1/4) * sqrt(R_star / (2 * d))
    const Teq = T_star * Math.pow(1 - A, 0.25) * Math.sqrt(R_star_m / (2 * d_m));
    const Teq_C = Teq - 273.15;

    let habitabilityVerdict = '';
    let verdictColor = '';

    if (Teq >= 260 && Teq <= 320) {
      habitabilityVerdict = 'Prime Habitable Zone (Liquid Water Stable)';
      verdictColor = '#4ade80'; // emerald
    } else if (Teq > 320 && Teq <= 390) {
      habitabilityVerdict = 'Warm / Potential Runaway Moist Greenhouse';
      verdictColor = '#f59e0b'; // amber
    } else if (Teq > 390) {
      habitabilityVerdict = 'Hyper-thermal / Super-Venusian Scorched';
      verdictColor = '#f87171'; // red
    } else if (Teq >= 180 && Teq < 260) {
      habitabilityVerdict = 'Cold / Glaciated (Sub-surface Oceans Possible)';
      verdictColor = '#38bdf8'; // sky
    } else {
      habitabilityVerdict = 'Deep Cryogenic Freeze';
      verdictColor = '#818cf8'; // indigo
    }

    return {
      tempKelvin: Math.round(Teq),
      tempCelsius: Math.round(Teq_C),
      habitabilityVerdict,
      verdictColor
    };
  }
};

if (typeof window !== 'undefined') {
  window.AstroCalculators = AstroCalculators;
}
