import React, { useRef, useEffect, useState } from 'react';

/**
 * COMPULSORY CONSTELLATIONS & NOTABLE STARS CATALOG
 * Verified astronomical coordinates (Right Ascension & Declination)
 * Converted to 3D celestial spherical coordinates:
 *   theta = (RA_hours / 24) * 2 * PI
 *   phi   = (Dec_degrees / 180) * PI
 */
const CONSTELLATIONS = [
  { id: 'ori', name: 'Orion', latinName: 'The Hunter', anchorStarId: 'betelgeuse' },
  { id: 'uma', name: 'Ursa Major', latinName: 'The Great Bear / Big Dipper', anchorStarId: 'dubhe' },
  { id: 'cas', name: 'Cassiopeia', latinName: 'The Queen', anchorStarId: 'schedar' },
  { id: 'cyg', name: 'Cygnus', latinName: 'The Northern Cross', anchorStarId: 'deneb' },
  { id: 'sco', name: 'Scorpius', latinName: 'The Scorpion', anchorStarId: 'antares' },
  { id: 'cru', name: 'Crux', latinName: 'The Southern Cross', anchorStarId: 'acrux' },
  { id: 'cma', name: 'Canis Major', latinName: 'The Great Dog', anchorStarId: 'sirius' },
  { id: 'tau', name: 'Taurus', latinName: 'The Bull', anchorStarId: 'aldebaran' },
  { id: 'lyr', name: 'Lyra', latinName: 'The Harp', anchorStarId: 'vega' },
  { id: 'boo', name: 'Boötes', latinName: 'The Herdsman', anchorStarId: 'arcturus' },
  { id: 'leo', name: 'Leo', latinName: 'The Lion', anchorStarId: 'regulus' },
  { id: 'peg', name: 'Pegasus', latinName: 'The Winged Horse', anchorStarId: 'markab' },
  { id: 'aql', name: 'Aquila', latinName: 'The Eagle', anchorStarId: 'altair' },
  { id: 'cen', name: 'Centaurus', latinName: 'The Centaur', anchorStarId: 'alpha_centauri' },
  { id: 'umi', name: 'Ursa Minor', latinName: 'The Lesser Bear', anchorStarId: 'polaris' }
];

const COMPULSORY_STARS = [
  // ── 1. URSA MAJOR (Big Dipper Asterism) ──
  {
    id: 'dubhe', name: 'Dubhe', bayer: 'α Ursae Majoris', constellationId: 'uma', constellation: 'Ursa Major',
    raHours: 11.06, decDeg: 61.75, distanceLy: '123 LY', spectralType: 'K0III (Orange Giant)',
    tempK: '4,660 K', massSolar: '3.4 M☉', radiusSolar: '30 R☉', luminositySolar: '316 L☉',
    color: '#fed7aa', glowColor: 'rgba(254, 215, 170, 0.85)', size: 2.8
  },
  {
    id: 'merak', name: 'Merak', bayer: 'β Ursae Majoris', constellationId: 'uma', constellation: 'Ursa Major',
    raHours: 11.03, decDeg: 56.38, distanceLy: '79.7 LY', spectralType: 'A1V (White Subgiant)',
    tempK: '9,355 K', massSolar: '2.7 M☉', radiusSolar: '3.0 R☉', luminositySolar: '63 L☉',
    color: '#e0f2fe', glowColor: 'rgba(224, 242, 254, 0.85)', size: 2.4
  },
  {
    id: 'phecda', name: 'Phecda', bayer: 'γ Ursae Majoris', constellationId: 'uma', constellation: 'Ursa Major',
    raHours: 11.89, decDeg: 53.69, distanceLy: '83.2 LY', spectralType: 'A0Ve (Ae Main-Sequence)',
    tempK: '9,355 K', massSolar: '2.9 M☉', radiusSolar: '3.0 R☉', luminositySolar: '65 L☉',
    color: '#bae6fd', glowColor: 'rgba(186, 230, 253, 0.85)', size: 2.4
  },
  {
    id: 'megrez', name: 'Megrez', bayer: 'δ Ursae Majoris', constellationId: 'uma', constellation: 'Ursa Major',
    raHours: 12.26, decDeg: 57.03, distanceLy: '80.5 LY', spectralType: 'A3V (White Dwarf/Main)',
    tempK: '8,630 K', massSolar: '2.0 M☉', radiusSolar: '1.4 R☉', luminositySolar: '14 L☉',
    color: '#e0f2fe', glowColor: 'rgba(224, 242, 254, 0.8)', size: 2.2
  },
  {
    id: 'alioth', name: 'Alioth', bayer: 'ε Ursae Majoris', constellationId: 'uma', constellation: 'Ursa Major',
    raHours: 12.90, decDeg: 55.96, distanceLy: '82.6 LY', spectralType: 'A1III-IVp (Peculiar Star)',
    tempK: '9,020 K', massSolar: '2.9 M☉', radiusSolar: '4.1 R☉', luminositySolar: '102 L☉',
    color: '#bae6fd', glowColor: 'rgba(186, 230, 253, 0.85)', size: 2.7
  },
  {
    id: 'mizar', name: 'Mizar', bayer: 'ζ Ursae Majoris', constellationId: 'uma', constellation: 'Ursa Major',
    raHours: 13.40, decDeg: 54.92, distanceLy: '82.9 LY', spectralType: 'A2V (Famous Binary with Alcor)',
    tempK: '9,000 K', massSolar: '2.5 M☉', radiusSolar: '2.4 R☉', luminositySolar: '33 L☉',
    color: '#e0f2fe', glowColor: 'rgba(224, 242, 254, 0.85)', size: 2.5
  },
  {
    id: 'alkaid', name: 'Alkaid', bayer: 'η Ursae Majoris', constellationId: 'uma', constellation: 'Ursa Major',
    raHours: 13.79, decDeg: 49.31, distanceLy: '103.9 LY', spectralType: 'B3V (Young Blue Star)',
    tempK: '15,540 K', massSolar: '6.1 M☉', radiusSolar: '3.4 R☉', luminositySolar: '594 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.9)', size: 2.8
  },

  // ── 2. ORION (The Hunter) ──
  {
    id: 'betelgeuse', name: 'Betelgeuse', bayer: 'α Orionis', constellationId: 'ori', constellation: 'Orion',
    raHours: 5.92, decDeg: 7.41, distanceLy: '642.5 LY', spectralType: 'M2Iab (Pulsating Red Supergiant)',
    tempK: '3,600 K', massSolar: '16.5 M☉', radiusSolar: '764 R☉', luminositySolar: '126,000 L☉',
    color: '#fca5a5', glowColor: 'rgba(252, 165, 165, 0.95)', size: 3.2
  },
  {
    id: 'rigel', name: 'Rigel', bayer: 'β Orionis', constellationId: 'ori', constellation: 'Orion',
    raHours: 5.24, decDeg: -8.20, distanceLy: '863 LY', spectralType: 'B8Ia (Luminous Blue Supergiant)',
    tempK: '12,100 K', massSolar: '21.0 M☉', radiusSolar: '78.9 R☉', luminositySolar: '120,000 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.95)', size: 3.2
  },
  {
    id: 'bellatrix', name: 'Bellatrix', bayer: 'γ Orionis', constellationId: 'ori', constellation: 'Orion',
    raHours: 5.42, decDeg: 6.35, distanceLy: '252.5 LY', spectralType: 'B2III (Amazon Star)',
    tempK: '22,000 K', massSolar: '8.6 M☉', radiusSolar: '5.7 R☉', luminositySolar: '9,211 L☉',
    color: '#60a5fa', glowColor: 'rgba(96, 165, 250, 0.9)', size: 2.7
  },
  {
    id: 'saiph', name: 'Saiph', bayer: 'κ Orionis', constellationId: 'ori', constellation: 'Orion',
    raHours: 5.79, decDeg: -9.67, distanceLy: '650 LY', spectralType: 'B0.5Ia (Blue Supergiant)',
    tempK: '26,500 K', massSolar: '15.5 M☉', radiusSolar: '22.2 R☉', luminositySolar: '56,000 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.85)', size: 2.7
  },
  {
    id: 'alnitak', name: 'Alnitak', bayer: 'ζ Orionis', constellationId: 'ori', constellation: 'Orion',
    raHours: 5.68, decDeg: -1.94, distanceLy: '1,260 LY', spectralType: 'O9.5Ib (East Belt Anchor)',
    tempK: '29,500 K', massSolar: '33.0 M☉', radiusSolar: '20.0 R☉', luminositySolar: '250,000 L☉',
    color: '#60a5fa', glowColor: 'rgba(96, 165, 250, 0.9)', size: 2.8
  },
  {
    id: 'alnilam', name: 'Alnilam', bayer: 'ε Orionis', constellationId: 'ori', constellation: 'Orion',
    raHours: 5.60, decDeg: -1.20, distanceLy: '2,000 LY', spectralType: 'B0Ia (Center Belt Pearl)',
    tempK: '27,500 K', massSolar: '64.5 M☉', radiusSolar: '42.0 R☉', luminositySolar: '537,000 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.9)', size: 2.9
  },
  {
    id: 'mintaka', name: 'Mintaka', bayer: 'δ Orionis', constellationId: 'ori', constellation: 'Orion',
    raHours: 5.53, decDeg: -0.30, distanceLy: '1,200 LY', spectralType: 'O9.5II (West Belt Star)',
    tempK: '29,500 K', massSolar: '24.0 M☉', radiusSolar: '16.5 R☉', luminositySolar: '190,000 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.85)', size: 2.6
  },

  // ── 3. CASSIOPEIA (The W Asterism) ──
  {
    id: 'schedar', name: 'Schedar', bayer: 'α Cassiopeiae', constellationId: 'cas', constellation: 'Cassiopeia',
    raHours: 0.67, decDeg: 56.54, distanceLy: '228 LY', spectralType: 'K0IIIa (Orange Giant)',
    tempK: '4,530 K', massSolar: '4.0 M☉', radiusSolar: '45.0 R☉', luminositySolar: '776 L☉',
    color: '#fed7aa', glowColor: 'rgba(254, 215, 170, 0.9)', size: 2.8
  },
  {
    id: 'caph', name: 'Caph', bayer: 'β Cassiopeiae', constellationId: 'cas', constellation: 'Cassiopeia',
    raHours: 0.15, decDeg: 59.15, distanceLy: '54.7 LY', spectralType: 'F2III (Delta Scuti Variable)',
    tempK: '7,079 K', massSolar: '1.9 M☉', radiusSolar: '3.5 R☉', luminositySolar: '27 L☉',
    color: '#fef3c7', glowColor: 'rgba(254, 243, 199, 0.85)', size: 2.5
  },
  {
    id: 'gamma_cas', name: 'Navi (γ Cas)', bayer: 'γ Cassiopeiae', constellationId: 'cas', constellation: 'Cassiopeia',
    raHours: 0.94, decDeg: 60.72, distanceLy: '550 LY', spectralType: 'B0.5IVe (Eruptive Variable)',
    tempK: '25,000 K', massSolar: '13.0 M☉', radiusSolar: '10.0 R☉', luminositySolar: '34,000 L☉',
    color: '#60a5fa', glowColor: 'rgba(96, 165, 250, 0.9)', size: 2.8
  },
  {
    id: 'ruchbah', name: 'Ruchbah', bayer: 'δ Cassiopeiae', constellationId: 'cas', constellation: 'Cassiopeia',
    raHours: 1.43, decDeg: 60.23, distanceLy: '99.4 LY', spectralType: 'A5III-IV (Eclipsing Binary)',
    tempK: '8,400 K', massSolar: '2.5 M☉', radiusSolar: '3.9 R☉', luminositySolar: '63 L☉',
    color: '#e0f2fe', glowColor: 'rgba(224, 242, 254, 0.85)', size: 2.4
  },
  {
    id: 'segin', name: 'Segin', bayer: 'ε Cassiopeiae', constellationId: 'cas', constellation: 'Cassiopeia',
    raHours: 1.90, decDeg: 63.67, distanceLy: '460 LY', spectralType: 'B3III (Bright Blue Giant)',
    tempK: '15,174 K', massSolar: '5.4 M☉', radiusSolar: '6.0 R☉', luminositySolar: '2,500 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.85)', size: 2.3
  },

  // ── 4. CYGNUS (The Northern Cross) ──
  {
    id: 'deneb', name: 'Deneb', bayer: 'α Cygni', constellationId: 'cyg', constellation: 'Cygnus',
    raHours: 20.69, decDeg: 45.28, distanceLy: '2,615 LY', spectralType: 'A2Ia (Alpha Cygni Prototype)',
    tempK: '8,525 K', massSolar: '19.0 M☉', radiusSolar: '203 R☉', luminositySolar: '196,000 L☉',
    color: '#ffffff', glowColor: 'rgba(255, 255, 255, 0.95)', size: 3.2
  },
  {
    id: 'albireo', name: 'Albireo', bayer: 'β Cygni', constellationId: 'cyg', constellation: 'Cygnus',
    raHours: 19.51, decDeg: 27.96, distanceLy: '430 LY', spectralType: 'K3II + B8V (Famous Gold-Blue Double)',
    tempK: '4,270 K', massSolar: '5.2 M☉', radiusSolar: '62 R☉', luminositySolar: '1,200 L☉',
    color: '#fef08a', glowColor: 'rgba(254, 240, 138, 0.9)', size: 2.6
  },
  {
    id: 'sadr', name: 'Sadr', bayer: 'γ Cygni', constellationId: 'cyg', constellation: 'Cygnus',
    raHours: 20.37, decDeg: 40.26, distanceLy: '1,800 LY', spectralType: 'F8Ib (Chest of the Swan)',
    tempK: '5,790 K', massSolar: '12.0 M☉', radiusSolar: '150 R☉', luminositySolar: '33,000 L☉',
    color: '#fef3c7', glowColor: 'rgba(254, 243, 199, 0.9)', size: 2.8
  },
  {
    id: 'gienah_cyg', name: 'Gienah', bayer: 'ε Cygni', constellationId: 'cyg', constellation: 'Cygnus',
    raHours: 20.77, decDeg: 33.97, distanceLy: '73 LY', spectralType: 'K0III (Orange Giant)',
    tempK: '4,710 K', massSolar: '2.0 M☉', radiusSolar: '11 R☉', luminositySolar: '62 L☉',
    color: '#fed7aa', glowColor: 'rgba(254, 215, 170, 0.85)', size: 2.5
  },
  {
    id: 'delta_cyg', name: 'Fawaris', bayer: 'δ Cygni', constellationId: 'cyg', constellation: 'Cygnus',
    raHours: 19.75, decDeg: 45.13, distanceLy: '165 LY', spectralType: 'B9.5IV (Future Pole Star)',
    tempK: '10,500 K', massSolar: '2.9 M☉', radiusSolar: '4.7 R☉', luminositySolar: '180 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.85)', size: 2.4
  },

  // ── 5. SCORPIUS (The Scorpion) ──
  {
    id: 'antares', name: 'Antares', bayer: 'α Scorpii', constellationId: 'sco', constellation: 'Scorpius',
    raHours: 16.49, decDeg: -26.43, distanceLy: '550 LY', spectralType: 'M1.5Iab (Heart of Scorpion)',
    tempK: '3,660 K', massSolar: '14.3 M☉', radiusSolar: '680 R☉', luminositySolar: '75,900 L☉',
    color: '#f87171', glowColor: 'rgba(248, 113, 113, 0.95)', size: 3.2
  },
  {
    id: 'shaula', name: 'Shaula', bayer: 'λ Scorpii', constellationId: 'sco', constellation: 'Scorpius',
    raHours: 17.56, decDeg: -37.10, distanceLy: '570 LY', spectralType: 'B2IV (The Stinger)',
    tempK: '25,000 K', massSolar: '14.5 M☉', radiusSolar: '8.8 R☉', luminositySolar: '36,300 L☉',
    color: '#60a5fa', glowColor: 'rgba(96, 165, 250, 0.9)', size: 2.8
  },
  {
    id: 'sargas', name: 'Sargas', bayer: 'θ Scorpii', constellationId: 'sco', constellation: 'Scorpius',
    raHours: 17.62, decDeg: -42.99, distanceLy: '300 LY', spectralType: 'F0II (Bright Yellow Giant)',
    tempK: '7,268 K', massSolar: '5.7 M☉', radiusSolar: '26 R☉', luminositySolar: '1,834 L☉',
    color: '#fef3c7', glowColor: 'rgba(254, 243, 199, 0.85)', size: 2.6
  },
  {
    id: 'dschubba', name: 'Dschubba', bayer: 'δ Scorpii', constellationId: 'sco', constellation: 'Scorpius',
    raHours: 16.00, decDeg: -22.62, distanceLy: '490 LY', spectralType: 'B0.3IV (Forehead of Scorpion)',
    tempK: '27,400 K', massSolar: '15.0 M☉', radiusSolar: '6.7 R☉', luminositySolar: '38,000 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.85)', size: 2.5
  },
  {
    id: 'acrab', name: 'Acrab', bayer: 'β Scorpii', constellationId: 'sco', constellation: 'Scorpius',
    raHours: 16.09, decDeg: -19.80, distanceLy: '404 LY', spectralType: 'B1V (Multiple Star System)',
    tempK: '28,000 K', massSolar: '15.0 M☉', radiusSolar: '6.3 R☉', luminositySolar: '31,600 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.85)', size: 2.5
  },

  // ── 6. CRUX (The Southern Cross) ──
  {
    id: 'acrux', name: 'Acrux', bayer: 'α Crucis', constellationId: 'cru', constellation: 'Crux',
    raHours: 12.44, decDeg: -63.10, distanceLy: '320 LY', spectralType: 'B0.5IV + B1V (Southern Pole Anchor)',
    tempK: '28,000 K', massSolar: '17.8 M☉', radiusSolar: '7.8 R☉', luminositySolar: '25,000 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.95)', size: 3.0
  },
  {
    id: 'mimosa', name: 'Mimosa', bayer: 'β Crucis', constellationId: 'cru', constellation: 'Crux',
    raHours: 12.79, decDeg: -59.69, distanceLy: '280 LY', spectralType: 'B0.5III (Beta Cephei Variable)',
    tempK: '27,000 K', massSolar: '16.0 M☉', radiusSolar: '8.4 R☉', luminositySolar: '34,000 L☉',
    color: '#60a5fa', glowColor: 'rgba(96, 165, 250, 0.9)', size: 2.9
  },
  {
    id: 'gacrux', name: 'Gacrux', bayer: 'γ Crucis', constellationId: 'cru', constellation: 'Crux',
    raHours: 12.52, decDeg: -57.11, distanceLy: '88.6 LY', spectralType: 'M3.5III (Ruby Southern Anchor)',
    tempK: '3,626 K', massSolar: '1.5 M☉', radiusSolar: '84 R☉', luminositySolar: '1,500 L☉',
    color: '#fca5a5', glowColor: 'rgba(252, 165, 165, 0.9)', size: 2.7
  },
  {
    id: 'imai', name: 'Imai', bayer: 'δ Crucis', constellationId: 'cru', constellation: 'Crux',
    raHours: 12.25, decDeg: -58.75, distanceLy: '345 LY', spectralType: 'B2IV (Subgiant Member)',
    tempK: '22,500 K', massSolar: '8.9 M☉', radiusSolar: '5.4 R☉', luminositySolar: '10,000 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.85)', size: 2.4
  },

  // ── 7. CANIS MAJOR & SIRIUS ──
  {
    id: 'sirius', name: 'Sirius A', bayer: 'α Canis Majoris', constellationId: 'cma', constellation: 'Canis Major',
    raHours: 6.75, decDeg: -16.71, distanceLy: '8.60 LY', spectralType: 'A1V (Brightest Star in Night Sky)',
    tempK: '9,940 K', massSolar: '2.06 M☉', radiusSolar: '1.71 R☉', luminositySolar: '25.4 L☉',
    color: '#ffffff', glowColor: 'rgba(224, 242, 254, 0.95)', size: 3.4
  },
  {
    id: 'adhara', name: 'Adhara', bayer: 'ε Canis Majoris', constellationId: 'cma', constellation: 'Canis Major',
    raHours: 6.98, decDeg: -28.97, distanceLy: '430 LY', spectralType: 'B2II (Brightest EUV Source in Sky)',
    tempK: '22,900 K', massSolar: '12.6 M☉', radiusSolar: '13.9 R☉', luminositySolar: '38,700 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.9)', size: 2.8
  },
  {
    id: 'wezen', name: 'Wezen', bayer: 'δ Canis Majoris', constellationId: 'cma', constellation: 'Canis Major',
    raHours: 7.14, decDeg: -26.39, distanceLy: '1,600 LY', spectralType: 'F8Ia (Yellow Supergiant)',
    tempK: '5,818 K', massSolar: '16.9 M☉', radiusSolar: '215 R☉', luminositySolar: '82,000 L☉',
    color: '#fef3c7', glowColor: 'rgba(254, 243, 199, 0.9)', size: 2.7
  },
  {
    id: 'murzim', name: 'Murzim', bayer: 'β Canis Majoris', constellationId: 'cma', constellation: 'Canis Major',
    raHours: 6.38, decDeg: -17.96, distanceLy: '490 LY', spectralType: 'B1II-III (Herald of Sirius)',
    tempK: '25,800 K', massSolar: '13.5 M☉', radiusSolar: '9.7 R☉', luminositySolar: '34,000 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.85)', size: 2.6
  },

  // ── 8. TAURUS & PLEIADES ──
  {
    id: 'aldebaran', name: 'Aldebaran', bayer: 'α Tauri', constellationId: 'tau', constellation: 'Taurus',
    raHours: 4.60, decDeg: 16.51, distanceLy: '65.3 LY', spectralType: 'K5III (Eye of the Bull)',
    tempK: '3,900 K', massSolar: '1.16 M☉', radiusSolar: '44.1 R☉', luminositySolar: '439 L☉',
    color: '#fdba74', glowColor: 'rgba(253, 186, 116, 0.95)', size: 3.1
  },
  {
    id: 'elnath', name: 'Elnath', bayer: 'β Tauri', constellationId: 'tau', constellation: 'Taurus',
    raHours: 5.44, decDeg: 28.61, distanceLy: '134 LY', spectralType: 'B7III (Horn of the Bull)',
    tempK: '13,820 K', massSolar: '5.0 M☉', radiusSolar: '4.2 R☉', luminositySolar: '700 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.85)', size: 2.6
  },
  {
    id: 'alcyone', name: 'Alcyone (Pleiades)', bayer: 'η Tauri', constellationId: 'tau', constellation: 'Taurus',
    raHours: 3.79, decDeg: 24.10, distanceLy: '440 LY', spectralType: 'B7IIIe (Seven Sisters Queen)',
    tempK: '12,300 K', massSolar: '6.0 M☉', radiusSolar: '10.0 R☉', luminositySolar: '2,400 L☉',
    color: '#bae6fd', glowColor: 'rgba(186, 230, 253, 0.9)', size: 2.7
  },

  // ── 9. LYRA ──
  {
    id: 'vega', name: 'Vega', bayer: 'α Lyrae', constellationId: 'lyr', constellation: 'Lyra',
    raHours: 18.61, decDeg: 38.78, distanceLy: '25.04 LY', spectralType: 'A0V (Photometric Baseline Star)',
    tempK: '9,602 K', massSolar: '2.14 M☉', radiusSolar: '2.36 R☉', luminositySolar: '40.1 L☉',
    color: '#e0f2fe', glowColor: 'rgba(224, 242, 254, 0.95)', size: 3.2
  },
  {
    id: 'sheliak', name: 'Sheliak', bayer: 'β Lyrae', constellationId: 'lyr', constellation: 'Lyra',
    raHours: 18.83, decDeg: 33.36, distanceLy: '960 LY', spectralType: 'B8II-III (Interacting Binary)',
    tempK: '13,300 K', massSolar: '13.0 M☉', radiusSolar: '19.0 R☉', luminositySolar: '6,500 L☉',
    color: '#93c5fd', glowColor: 'rgba(147, 197, 253, 0.85)', size: 2.3
  },
  {
    id: 'sulafat', name: 'Sulafat', bayer: 'γ Lyrae', constellationId: 'lyr', constellation: 'Lyra',
    raHours: 18.98, decDeg: 32.69, distanceLy: '620 LY', spectralType: 'B9III (Bright Giant)',
    tempK: '10,000 K', massSolar: '5.8 M☉', radiusSolar: '15.4 R☉', luminositySolar: '2,100 L☉',
    color: '#bae6fd', glowColor: 'rgba(186, 230, 253, 0.85)', size: 2.3
  },

  // ── 10. BOÖTES ──
  {
    id: 'arcturus', name: 'Arcturus', bayer: 'α Boötis', constellationId: 'boo', constellation: 'Boötes',
    raHours: 14.26, decDeg: 19.18, distanceLy: '36.7 LY', spectralType: 'K1.5III (Ancient Galactic Halo Giant)',
    tempK: '4,286 K', massSolar: '1.08 M☉', radiusSolar: '25.4 R☉', luminositySolar: '170 L☉',
    color: '#fed7aa', glowColor: 'rgba(254, 215, 170, 0.95)', size: 3.2
  },
  {
    id: 'izar', name: 'Izar', bayer: 'ε Boötis', constellationId: 'boo', constellation: 'Boötes',
    raHours: 14.75, decDeg: 27.07, distanceLy: '210 LY', spectralType: 'K0II-III + A2V (Pulcherrima)',
    tempK: '4,550 K', massSolar: '4.6 M☉', radiusSolar: '33 R☉', luminositySolar: '500 L☉',
    color: '#fef08a', glowColor: 'rgba(254, 240, 138, 0.85)', size: 2.5
  },
  {
    id: 'muphrid', name: 'Muphrid', bayer: 'η Boötis', constellationId: 'boo', constellation: 'Boötes',
    raHours: 13.91, decDeg: 18.40, distanceLy: '37.2 LY', spectralType: 'G0IV (Solar-like Subgiant)',
    tempK: '6,100 K', massSolar: '1.7 M☉', radiusSolar: '2.7 R☉', luminositySolar: '8.9 L☉',
    color: '#fef3c7', glowColor: 'rgba(254, 243, 199, 0.85)', size: 2.3
  },

  // ── 11. LEO ──
  {
    id: 'regulus', name: 'Regulus', bayer: 'α Leonis', constellationId: 'leo', constellation: 'Leo',
    raHours: 10.14, decDeg: 11.97, distanceLy: '79.3 LY', spectralType: 'B8IVn (Rapidly Rotating Oblate Star)',
    tempK: '12,460 K', massSolar: '3.8 M☉', radiusSolar: '3.1 R☉', luminositySolar: '288 L☉',
    color: '#bae6fd', glowColor: 'rgba(186, 230, 253, 0.95)', size: 3.0
  },
  {
    id: 'denebola', name: 'Denebola', bayer: 'β Leonis', constellationId: 'leo', constellation: 'Leo',
    raHours: 11.81, decDeg: 14.57, distanceLy: '35.9 LY', spectralType: 'A3V (Debris Disk Host)',
    tempK: '8,500 K', massSolar: '1.78 M☉', radiusSolar: '1.73 R☉', luminositySolar: '15 L☉',
    color: '#e0f2fe', glowColor: 'rgba(224, 242, 254, 0.85)', size: 2.6
  },
  {
    id: 'algieba', name: 'Algieba', bayer: 'γ Leonis', constellationId: 'leo', constellation: 'Leo',
    raHours: 10.33, decDeg: 19.84, distanceLy: '130 LY', spectralType: 'K0III (The Mane / Golden Double)',
    tempK: '4,470 K', massSolar: '1.23 M☉', radiusSolar: '31.9 R☉', luminositySolar: '320 L☉',
    color: '#fef08a', glowColor: 'rgba(254, 240, 138, 0.85)', size: 2.5
  },

  // ── 12. AQUILA & SUMMER TRIANGLE ──
  {
    id: 'altair', name: 'Altair', bayer: 'α Aquilae', constellationId: 'aql', constellation: 'Aquila',
    raHours: 19.85, decDeg: 8.87, distanceLy: '16.73 LY', spectralType: 'A7V (Rapid Rotator 9hr spin)',
    tempK: '7,700 K', massSolar: '1.79 M☉', radiusSolar: '1.79 R☉', luminositySolar: '10.6 L☉',
    color: '#f8fafc', glowColor: 'rgba(248, 250, 252, 0.95)', size: 3.0
  },

  // ── 13. CENTAURUS ──
  {
    id: 'alpha_centauri', name: 'Alpha Centauri A', bayer: 'α Centauri', constellationId: 'cen', constellation: 'Centaurus',
    raHours: 14.66, decDeg: -60.83, distanceLy: '4.37 LY', spectralType: 'G2V (Nearest Solar Twin)',
    tempK: '5,790 K', massSolar: '1.10 M☉', radiusSolar: '1.22 R☉', luminositySolar: '1.52 L☉',
    color: '#fef08a', glowColor: 'rgba(254, 240, 138, 0.95)', size: 3.1
  },
  {
    id: 'hadar', name: 'Hadar', bayer: 'β Centauri', constellationId: 'cen', constellation: 'Centaurus',
    raHours: 14.06, decDeg: -60.37, distanceLy: '390 LY', spectralType: 'B1III (Southern Pointer)',
    tempK: '25,000 K', massSolar: '12.0 M☉', radiusSolar: '8.6 R☉', luminositySolar: '41,700 L☉',
    color: '#60a5fa', glowColor: 'rgba(96, 165, 250, 0.9)', size: 2.8
  },

  // ── 14. URSA MINOR (Pole Star) ──
  {
    id: 'polaris', name: 'Polaris', bayer: 'α Ursae Minoris', constellationId: 'umi', constellation: 'Ursa Minor',
    raHours: 2.53, decDeg: 89.26, distanceLy: '433 LY', spectralType: 'F7Ib (Celestial North Pole Anchor)',
    tempK: '6,015 K', massSolar: '5.4 M☉', radiusSolar: '37.5 R☉', luminositySolar: '1,260 L☉',
    color: '#fef3c7', glowColor: 'rgba(254, 243, 199, 0.95)', size: 2.9
  },

  // ── 15. PEGASUS (Great Square) ──
  {
    id: 'markab', name: 'Markab', bayer: 'α Pegasi', constellationId: 'peg', constellation: 'Pegasus',
    raHours: 23.08, decDeg: 15.21, distanceLy: '133 LY', spectralType: 'B9III (South-West Corner)',
    tempK: '9,765 K', massSolar: '3.5 M☉', radiusSolar: '4.6 R☉', luminositySolar: '160 L☉',
    color: '#bae6fd', glowColor: 'rgba(186, 230, 253, 0.85)', size: 2.6
  },
  {
    id: 'scheat', name: 'Scheat', bayer: 'β Pegasi', constellationId: 'peg', constellation: 'Pegasus',
    raHours: 23.06, decDeg: 28.08, distanceLy: '196 LY', spectralType: 'M2.5II-III (Red Giant Corner)',
    tempK: '3,690 K', massSolar: '2.1 M☉', radiusSolar: '95 R☉', luminositySolar: '1,500 L☉',
    color: '#fca5a5', glowColor: 'rgba(252, 165, 165, 0.85)', size: 2.6
  }
];

/**
 * CONSTELLATION ASTERISM LINES
 * Accurate segment linkages between star identifiers
 */
const CONSTELLATION_LINES = [
  // Ursa Major (The Big Dipper Bowl & Handle)
  ['dubhe', 'merak'], ['merak', 'phecda'], ['phecda', 'megrez'], ['megrez', 'dubhe'],
  ['megrez', 'alioth'], ['alioth', 'mizar'], ['mizar', 'alkaid'],

  // Orion (Hunter Outline & Belt)
  ['betelgeuse', 'bellatrix'], ['bellatrix', 'mintaka'],
  ['mintaka', 'alnilam'], ['alnilam', 'alnitak'],
  ['alnitak', 'saiph'], ['saiph', 'rigel'], ['rigel', 'mintaka'],
  ['betelgeuse', 'alnitak'],

  // Cassiopeia (The 'W')
  ['caph', 'schedar'], ['schedar', 'gamma_cas'], ['gamma_cas', 'ruchbah'], ['ruchbah', 'segin'],

  // Cygnus (The Northern Cross)
  ['albireo', 'sadr'], ['sadr', 'deneb'], ['delta_cyg', 'sadr'], ['sadr', 'gienah_cyg'],

  // Scorpius (The Scorpion's Spine and Hook)
  ['acrab', 'dschubba'], ['dschubba', 'antares'], ['antares', 'sargas'], ['sargas', 'shaula'],

  // Crux (The Southern Cross)
  ['acrux', 'gacrux'], ['mimosa', 'imai'],

  // Canis Major
  ['murzim', 'sirius'], ['sirius', 'wezen'], ['wezen', 'adhara'],

  // Taurus
  ['aldebaran', 'elnath'], ['aldebaran', 'alcyone'],

  // Lyra
  ['vega', 'sheliak'], ['sheliak', 'sulafat'], ['sulafat', 'vega'],

  // Boötes
  ['arcturus', 'muphrid'], ['arcturus', 'izar'],

  // Leo
  ['regulus', 'algieba'], ['algieba', 'denebola'], ['regulus', 'denebola'],

  // Centaurus Pointer
  ['alpha_centauri', 'hadar'],

  // Summer Triangle Navigational Asterism
  ['vega', 'deneb'], ['deneb', 'altair'], ['altair', 'vega'],

  // Pegasus
  ['markab', 'scheat']
];

/**
 * AUTHENTIC PHOTOMETRIC DISCOVERED NEBULAE
 * Rendered with genuine high-resolution filaments, ionization fronts, shockwaves & dust spires.
 * NO BLURRY "CLOUD PATCHES" — Authentic astrophotography structures.
 */
const AUTHENTIC_NEBULAE = [
  // 1. The Great Orion Nebula (Messier 42 / NGC 1976)
  {
    name: 'Messier 42 (Great Orion Nebula)',
    type: 'H II Diffuse Ionization & Trapezium Basin',
    constellation: 'Orion',
    distLy: '1,344 LY',
    raHours: 5.58, decDeg: -5.39,
    dist: 940,
    baseColor: 'rgba(225, 29, 72, 0.08)',
    width: 240, height: 160, tilt: 0.42,
    // Intricate ionization filaments & shock fronts
    filaments: [
      { start: [-90, -40], cp1: [-40, -80], cp2: [40, -70], end: [95, -25], width: 4.5, color: '#f43f5e', alpha: 0.45 },
      { start: [-80, -20], cp1: [-25, -45], cp2: [35, -40], end: [85, -10], width: 2.8, color: '#06b6d4', alpha: 0.65 }, // Bright Ionization Bar
      { start: [-110, 10], cp1: [-50, 45], cp2: [30, 60], end: [110, 30], width: 3.5, color: '#fb7185', alpha: 0.38 }, // South Sweeping Wing
      { start: [-30, -50], cp1: [0, -20], cp2: [10, 20], end: [-15, 60], width: 2.2, color: '#38bdf8', alpha: 0.55 },
      { start: [20, -60], cp1: [60, -30], cp2: [80, 20], end: [70, 70], width: 2.0, color: '#fbbf24', alpha: 0.35 }
    ],
    // Deep absorption Bok globules & "Fish's Mouth" dark gulf
    darkSilhouettes: [
      { x: -10, y: -8, r: 24, elongation: 1.8, angle: 0.6, alpha: 0.72 },
      { x: 35, y: -25, r: 16, elongation: 1.3, angle: -0.4, alpha: 0.58 }
    ],
    // The Trapezium Cluster (Theta-1 Orionis)
    coreCluster: [
      { x: -2, y: -2, size: 2.2, color: '#bae6fd' }, // Theta1 Ori C (O6pe V)
      { x: -8, y: -6, size: 1.8, color: '#ffffff' },
      { x: 5, y: -7, size: 1.6, color: '#93c5fd' },
      { x: 2, y: 4, size: 1.5, color: '#e0f2fe' }
    ]
  },

  // 2. The Carina Nebula (NGC 3372) & Eta Carinae
  {
    name: 'NGC 3372 (Carina Nebula & Keyhole)',
    type: 'Giant Molecular Cloud & LBV Hypergiant',
    constellation: 'Carina',
    distLy: '7,500 LY',
    raHours: 10.75, decDeg: -59.87,
    dist: 960,
    baseColor: 'rgba(244, 63, 94, 0.08)',
    width: 270, height: 180, tilt: -0.35,
    filaments: [
      { start: [-120, -50], cp1: [-60, -90], cp2: [50, -80], end: [115, -35], width: 4.0, color: '#f43f5e', alpha: 0.42 },
      { start: [-100, 20], cp1: [-40, 70], cp2: [60, 60], end: [120, 15], width: 3.8, color: '#fb7185', alpha: 0.38 },
      { start: [-40, -40], cp1: [-10, 0], cp2: [15, 20], end: [35, 50], width: 2.5, color: '#22d3ee', alpha: 0.6 },
      { start: [-15, -20], cp1: [0, -35], cp2: [25, -20], end: [10, 0], width: 3.2, color: '#fbbf24', alpha: 0.65 } // Homunculus
    ],
    darkSilhouettes: [
      { x: 8, y: -12, r: 28, elongation: 2.2, angle: 0.25, alpha: 0.78 } // Keyhole Sanctuary
    ],
    coreCluster: [
      { x: 0, y: 0, size: 2.5, color: '#fef08a' } // Eta Carinae
    ]
  },

  // 3. Pillars of Creation (Messier 16 / Eagle Nebula)
  {
    name: 'Messier 16 (Pillars of Creation)',
    type: 'Sculpted Molecular Gas Columns & EGGs',
    constellation: 'Serpens',
    distLy: '7,000 LY',
    raHours: 18.31, decDeg: -13.84,
    dist: 950,
    baseColor: 'rgba(217, 119, 6, 0.085)',
    width: 210, height: 190, tilt: 0.12,
    filaments: [
      // Towering vertical dust spires with illuminated ionization crests
      { start: [-35, 75], cp1: [-25, 10], cp2: [-20, -40], end: [-18, -75], width: 6.0, color: '#f59e0b', alpha: 0.65 }, // Left Tallest Pillar
      { start: [5, 60], cp1: [12, 15], cp2: [15, -20], end: [16, -45], width: 5.2, color: '#d97706', alpha: 0.6 }, // Middle Pillar
      { start: [35, 45], cp1: [40, 15], cp2: [42, -5], end: [44, -25], width: 4.5, color: '#b45309', alpha: 0.55 }, // Right Spire
      { start: [-60, -30], cp1: [-10, -85], cp2: [40, -75], end: [70, -20], width: 2.0, color: '#06b6d4', alpha: 0.45 } // Ionization Crest
    ],
    darkSilhouettes: [
      { x: -20, y: -20, r: 22, elongation: 3.2, angle: 1.48, alpha: 0.85 },
      { x: 14, y: -5, r: 18, elongation: 2.8, angle: 1.52, alpha: 0.82 },
      { x: 42, y: 5, r: 15, elongation: 2.4, angle: 1.55, alpha: 0.8 }
    ],
    coreCluster: [
      { x: -18, y: -78, size: 1.8, color: '#fef08a' }, // Evaporating Gaseous Globule EGG
      { x: 16, y: -48, size: 1.5, color: '#67e8f9' }
    ]
  },

  // 4. The Veil Nebula (NGC 6960 / Cygnus Loop)
  {
    name: 'NGC 6960 (The Veil Nebula / Witch\'s Broom)',
    type: 'Braided Supernova Remnant Shockwave Filaments',
    constellation: 'Cygnus',
    distLy: '2,400 LY',
    raHours: 20.76, decDeg: 30.71,
    dist: 970,
    baseColor: 'rgba(6, 182, 212, 0.06)',
    width: 260, height: 150, tilt: 0.82,
    filaments: [
      // Delicate woven braided silk filaments of shocked oxygen and hydrogen
      { start: [-110, -55], cp1: [-50, -30], cp2: [30, 20], end: [110, 55], width: 2.2, color: '#22d3ee', alpha: 0.75 },
      { start: [-105, -50], cp1: [-30, -10], cp2: [20, 40], end: [115, 62], width: 1.8, color: '#f43f5e', alpha: 0.7 },
      { start: [-95, -60], cp1: [-45, -45], cp2: [45, 10], end: [90, 45], width: 1.4, color: '#a855f7', alpha: 0.55 },
      { start: [-80, -35], cp1: [-10, -5], cp2: [50, 35], end: [100, 70], width: 1.6, color: '#38bdf8', alpha: 0.65 }
    ],
    darkSilhouettes: [],
    coreCluster: [
      { x: 0, y: 0, size: 2.2, color: '#fef08a' } // 52 Cygni (Foreground star)
    ]
  },

  // 5. The Crab Nebula (Messier 1 / NGC 1952)
  {
    name: 'Messier 1 (Crab Pulsar Remnant)',
    type: 'Historical SN 1054 AD & Synchrotron Nebula',
    constellation: 'Taurus',
    distLy: '6,500 LY',
    raHours: 5.58, decDeg: 22.01,
    dist: 930,
    baseColor: 'rgba(14, 165, 233, 0.08)',
    width: 170, height: 130, tilt: 0.28,
    filaments: [
      // Chaotic tangled synchrotron web
      { start: [-65, -15], cp1: [-35, -50], cp2: [35, -45], end: [65, -10], width: 2.6, color: '#ef4444', alpha: 0.65 },
      { start: [-55, 20], cp1: [-20, 55], cp2: [35, 45], end: [60, 15], width: 2.4, color: '#f59e0b', alpha: 0.6 },
      { start: [-45, -35], cp1: [0, -10], cp2: [25, 25], end: [45, 40], width: 2.0, color: '#06b6d4', alpha: 0.7 },
      { start: [-50, 30], cp1: [-10, 0], cp2: [20, -25], end: [50, -30], width: 1.8, color: '#ec4899', alpha: 0.55 }
    ],
    darkSilhouettes: [],
    coreCluster: [
      { x: 0, y: 0, size: 2.2, color: '#c084fc' } // Crab Pulsar (spinning 30 times/sec)
    ]
  },

  // 6. The Ring Nebula (Messier 57 / NGC 6720)
  {
    name: 'Messier 57 (The Ring Nebula)',
    type: 'Bipolar Planetary Nebula Ring & White Dwarf',
    constellation: 'Lyra',
    distLy: '2,570 LY',
    raHours: 18.89, decDeg: 33.03,
    dist: 980,
    baseColor: 'rgba(16, 185, 129, 0.07)',
    width: 140, height: 110, tilt: 0.15,
    filaments: [
      // Elliptical ring petals of ionized gas
      { start: [-45, 0], cp1: [-45, -35], cp2: [45, -35], end: [45, 0], width: 3.5, color: '#f43f5e', alpha: 0.75 },
      { start: [45, 0], cp1: [45, 35], cp2: [-45, 35], end: [-45, 0], width: 3.5, color: '#f43f5e', alpha: 0.75 },
      { start: [-30, 0], cp1: [-30, -20], cp2: [30, -20], end: [30, 0], width: 2.5, color: '#06b6d4', alpha: 0.8 },
      { start: [30, 0], cp1: [30, 20], cp2: [-30, 20], end: [-30, 0], width: 2.5, color: '#06b6d4', alpha: 0.8 }
    ],
    darkSilhouettes: [],
    coreCluster: [
      { x: 0, y: 0, size: 1.8, color: '#ffffff' } // Central 100,000 K White Dwarf
    ]
  },

  // 7. The Horsehead Nebula (Barnard 33 & IC 434)
  {
    name: 'Barnard 33 (Horsehead Nebula)',
    type: 'Dark Silhouette against IC 434 Ionized Curtain',
    constellation: 'Orion',
    distLy: '1,375 LY',
    raHours: 5.68, decDeg: -2.46,
    dist: 955,
    baseColor: 'rgba(244, 63, 94, 0.09)',
    width: 220, height: 150, tilt: 0.05,
    filaments: [
      // Glowing curtain of IC 434 (Hydrogen-Alpha)
      { start: [-80, -60], cp1: [-20, -55], cp2: [40, -58], end: [90, -60], width: 5.0, color: '#fb7185', alpha: 0.65 },
      { start: [-75, 55], cp1: [-15, 50], cp2: [45, 52], end: [85, 55], width: 4.0, color: '#f43f5e', alpha: 0.55 },
      { start: [-20, -50], cp1: [-15, 0], cp2: [-18, 25], end: [-25, 50], width: 3.0, color: '#fbbf24', alpha: 0.45 }
    ],
    darkSilhouettes: [
      // The iconic horsehead-shaped absorption dust pillar
      { x: -5, y: -2, r: 24, elongation: 2.5, angle: 1.62, alpha: 0.88 },
      { x: 6, y: -16, r: 16, elongation: 1.2, angle: 0.4, alpha: 0.85 } // Equine muzzle
    ],
    coreCluster: [
      { x: -55, y: -30, size: 2.4, color: '#bae6fd' } // Alnitak illuminator
    ]
  }
];

export default function CosmicCanvas() {
  const canvasRef = useRef(null);

  // Active state & Camera Observer location
  const [visitedStar, setVisitedStar] = useState(null);
  const [isWarping, setIsWarping] = useState(false);
  const [warpDistance, setWarpDistance] = useState('');
  const [revealedStar, setRevealedStar] = useState(null);

  // Warp & Camera 3D Observer Reference
  const warpStateRef = useRef({
    active: false,
    progress: 0,
    targetStar: null,
    originCam: { x: 0, y: 0, z: 0 },
    targetCam: { x: 0, y: 0, z: 0 },
    targetYaw: 0,
    targetPitch: 0
  });

  // Camera 3D physical position in space
  const cameraRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speedFactor = prefersReduced ? 0.4 : 1.0;

    // --- 3D Camera Angles ---
    let targetYaw = 0;
    let currentYaw = 0;
    let targetPitch = 0;
    let currentPitch = 0;
    let mouseLookX = 0;
    let mouseLookY = 0;

    // Screen hits registry for click detection
    let screenStarHits = [];

    // Pointer hover tracking for 2-second dot identification reveal
    let currentMouseX = -1000;
    let currentMouseY = -1000;
    let hoverCandidate = null;
    let hoverStartTime = 0;
    const revealedStarRef = { current: null };

    // Scroll & Wheel navigation (turns POV around 360°)
    const handleWheel = (e) => {
      if (warpStateRef.current.active) return;
      targetYaw += e.deltaY * 0.0022;
      targetPitch += (e.deltaX || 0) * 0.0018;
      targetPitch = Math.max(-1.25, Math.min(1.25, targetPitch));
    };

    // Touch gesture navigation
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (warpStateRef.current.active) return;
      if (e.touches.length > 0) {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        targetYaw -= dx * 0.0038;
        targetPitch += dy * 0.0028;
        targetPitch = Math.max(-1.25, Math.min(1.25, targetPitch));
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    // Window scroll support
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (warpStateRef.current.active) return;
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      targetYaw += delta * 0.0025;
    };

    // Drag to turn POV
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragMoved = false;

    const handleMouseDown = (e) => {
      if (e.target && (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('[role="dialog"]'))) {
        return;
      }
      isDragging = true;
      dragMoved = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const handleMouseUp = (e) => {
      isDragging = false;
      if (!dragMoved && e.clientX !== undefined && e.clientY !== undefined) {
        // Did not drag: treat as Click-to-Travel towards clicked star dot!
        handleStarDotClick(e.clientX, e.clientY);
      }
    };

    const handleMouseMove = (e) => {
      currentMouseX = e.clientX;
      currentMouseY = e.clientY;
      if (isDragging) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        if (Math.hypot(dx, dy) > 3) dragMoved = true;
        if (!warpStateRef.current.active) {
          targetYaw -= dx * 0.0032;
          targetPitch += dy * 0.0024;
          targetPitch = Math.max(-1.25, Math.min(1.25, targetPitch));
        }
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      }
      mouseLookX = (e.clientX / width - 0.5) * 0.22;
      mouseLookY = (e.clientY / height - 0.5) * 0.15;
    };

    const handleMouseLeave = () => {
      isDragging = false;
      currentMouseX = -1000;
      currentMouseY = -1000;
      hoverCandidate = null;
      hoverStartTime = 0;
      if (revealedStarRef.current) {
        revealedStarRef.current = null;
        setRevealedStar(null);
      }
      mouseLookX = 0;
      mouseLookY = 0;
    };

    // ── CLICK-TO-WARP TRAVEL ENGINE ──
    // Genuinely relocates the 3D observer position to the star dot!
    const handleStarDotClick = (clickX, clickY) => {
      if (warpStateRef.current.active) return;

      let closest = null;
      let minDistance = 28;

      for (const hit of screenStarHits) {
        const d = Math.hypot(hit.px - clickX, hit.py - clickY);
        const threshold = hit.star.isCompulsory ? 34 : 22;
        if (d < threshold && d < minDistance) {
          minDistance = d;
          closest = hit;
        }
      }

      if (closest) {
        initiateWarpToStar(closest.star);
      }
    };

    const initiateWarpToStar = (star) => {
      const curCam = cameraRef.current;

      // Calculate vector from current camera to target star
      const dx = star.x0 - curCam.x;
      const dy = star.y0 - curCam.y;
      const dz = star.z0 - curCam.z;
      const dist = Math.hypot(dx, dy, dz);

      if (dist < 45) {
        // Already at this star
        setVisitedStar(star);
        return;
      }

      // Unit vector pointing towards target star
      const ux = dx / dist;
      const uy = dy / dist;
      const uz = dz / dist;

      // Destination camera position: stop right in orbital proximity (32 units ahead)
      // so the observer physically resides AT the star's location!
      const destX = star.x0 - ux * 32;
      const destY = star.y0 - uy * 32;
      const destZ = star.z0 - uz * 32;

      // Angles to face directly at the star
      const destYaw = Math.atan2(dx, dz);
      const destPitch = Math.asin(Math.max(-1, Math.min(1, dy / dist)));

      warpStateRef.current = {
        active: true,
        progress: 0,
        targetStar: star,
        originCam: { ...curCam },
        targetCam: { x: destX, y: destY, z: destZ },
        targetYaw: destYaw,
        targetPitch: destPitch
      };

      setIsWarping(true);
      setVisitedStar(star);
      setWarpDistance(`WARP FLIGHT // ${star.distanceLy} // ACCELERATING`);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initCosmos();
    };

    window.addEventListener('resize', resizeCanvas);

    // --- Astronomical Entities Data Model ---
    let stars = [];
    let starLookup = new Map();
    let galacticPlaneDust = [];
    let nebulae = [];
    let galaxies = [];
    let meteors = [];
    let time = 0;

    // Cataclysmic Cosmic Events
    let activeCosmicEvent = null;
    let eventCooldown = 320;
    let eventTypeIndex = 0;

    const initCosmos = () => {
      stars = [];
      starLookup.clear();
      galacticPlaneDust = [];
      nebulae = [];
      galaxies = [];

      const R_BASE = 850;

      // ─── 1. INTEGRATE ALL COMPULSORY CONSTELLATION STARS ───
      for (const cs of COMPULSORY_STARS) {
        const theta = (cs.raHours / 24) * 2 * Math.PI;
        const phi = (cs.decDeg / 180) * Math.PI;
        const cosP = Math.cos(phi);
        const sinP = Math.sin(phi);
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        const starObj = {
          id: cs.id,
          name: cs.name,
          bayer: cs.bayer,
          constellationId: cs.constellationId,
          constellation: cs.constellation,
          distanceLy: cs.distanceLy,
          spectralType: cs.spectralType,
          tempK: cs.tempK,
          massSolar: cs.massSolar,
          radiusSolar: cs.radiusSolar,
          luminositySolar: cs.luminositySolar,
          color: cs.color,
          glowColor: cs.glowColor,
          size: cs.size || 2.8,
          isCompulsory: true,
          isBeacon: true,
          x0: R_BASE * cosP * sinT,
          y0: R_BASE * sinP,
          z0: R_BASE * cosP * cosT,
          baseAlpha: 1.0,
          twinkleSpeed: 0.006,
          twinklePhase: Math.random() * Math.PI * 2
        };

        stars.push(starObj);
        starLookup.set(cs.id, starObj);
      }

      // ─── 2. GENERAL STELLAR POPULATION (9,500 Stars with Milky Way Disk) ───
      const galacticTilt = 0.49;
      const cosG = Math.cos(galacticTilt);
      const sinG = Math.sin(galacticTilt);
      const TOTAL_STARS = 9500;

      for (let i = 0; i < TOTAL_STARS; i++) {
        let theta, phi;
        const isGalacticDisk = Math.random() < 0.70;

        if (isGalacticDisk) {
          theta = Math.random() * Math.PI * 2;
          const u1 = Math.random();
          const u2 = Math.random();
          const gaussian = Math.sqrt(-2.0 * Math.log(Math.max(1e-6, u1))) * Math.cos(2.0 * Math.PI * u2);
          const galacticLat = gaussian * 0.16;

          const xg = Math.cos(galacticLat) * Math.sin(theta);
          const yg = Math.sin(galacticLat);
          const zg = Math.cos(galacticLat) * Math.cos(theta);

          const x0 = xg * cosG - yg * sinG;
          const y0 = xg * sinG + yg * cosG;
          const z0 = zg;

          phi = Math.asin(Math.max(-1, Math.min(1, y0)));
          theta = Math.atan2(x0, z0);
        } else {
          const u = Math.random();
          const v = Math.random();
          theta = u * 2.0 * Math.PI;
          phi = Math.asin(2.0 * v - 1.0);
        }

        const radius = 640 + Math.random() * 1260;
        const magRoll = Math.random();
        let size = 0.35;
        let baseAlpha = 0.35;
        let isBeacon = false;

        if (magRoll > 0.985) {
          size = 1.6 + Math.random() * 0.6;
          baseAlpha = 0.95;
          isBeacon = true;
        } else if (magRoll > 0.92) {
          size = 1.1 + Math.random() * 0.4;
          baseAlpha = 0.75;
        } else if (magRoll > 0.70) {
          size = 0.7 + Math.random() * 0.3;
          baseAlpha = 0.55;
        }

        const colorRoll = Math.random();
        let color = '#e0f2fe';
        let glowColor = 'rgba(224, 242, 254, 0.7)';

        if (colorRoll < 0.28) {
          color = '#bae6fd';
          glowColor = 'rgba(186, 230, 253, 0.75)';
        } else if (colorRoll < 0.52) {
          color = '#ffffff';
          glowColor = 'rgba(255, 255, 255, 0.8)';
        } else if (colorRoll < 0.72) {
          color = '#fef08a';
          glowColor = 'rgba(254, 240, 138, 0.75)';
        } else if (colorRoll < 0.88) {
          color = '#fed7aa';
          glowColor = 'rgba(254, 215, 170, 0.75)';
        } else {
          color = '#fca5a5';
          glowColor = 'rgba(252, 165, 165, 0.75)';
        }

        const cosP = Math.cos(phi);
        const sinP = Math.sin(phi);
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        stars.push({
          x0: radius * cosP * sinT,
          y0: radius * sinP,
          z0: radius * cosP * cosT,
          size,
          baseAlpha,
          twinkleSpeed: 0.003 + Math.random() * 0.012,
          twinklePhase: Math.random() * Math.PI * 2,
          isBeacon,
          isCompulsory: false,
          color,
          glowColor,
          name: `Catalog Star HD-${100000 + i}`,
          spectralType: colorRoll < 0.3 ? 'B/A Class' : (colorRoll < 0.7 ? 'F/G Solar' : 'K/M Dwarf'),
          distanceLy: `${Math.round(radius * 1.8)} LY`,
          tempK: `${Math.round(3000 + (1.0 - colorRoll) * 12000)} K`,
          luminositySolar: `${(Math.random() * 12 + 0.2).toFixed(1)} L☉`
        });
      }

      // ─── 3. MILKY WAY GALACTIC PLANE LUMINESCENCE ───
      const DUST_PARTICLES = 650;
      for (let i = 0; i < DUST_PARTICLES; i++) {
        const theta = Math.random() * Math.PI * 2;
        const u1 = Math.random();
        const u2 = Math.random();
        const gaussian = Math.sqrt(-2.0 * Math.log(Math.max(1e-6, u1))) * Math.cos(2.0 * Math.PI * u2);
        const galacticLat = gaussian * 0.075;

        const xg = Math.cos(galacticLat) * Math.sin(theta);
        const yg = Math.sin(galacticLat);
        const zg = Math.cos(galacticLat) * Math.cos(theta);

        const x0 = xg * cosG - yg * sinG;
        const y0 = xg * sinG + yg * cosG;
        const z0 = zg;

        const radius = 860 + Math.random() * 320;
        const distFromCenter = Math.abs(theta - 2.8);
        const isCore = distFromCenter < 0.85 || distFromCenter > 5.4;

        let color = 'rgba(186, 230, 253, ';
        let alpha = 0.022 + Math.random() * 0.028;
        if (isCore) {
          color = Math.random() > 0.4 ? 'rgba(254, 240, 138, ' : 'rgba(254, 215, 170, ';
          alpha *= 1.6;
        }

        galacticPlaneDust.push({
          x0: radius * x0,
          y0: radius * y0,
          z0: radius * z0,
          radius: 35 + Math.random() * 75,
          color,
          alpha
        });
      }

      // ─── 4. REAL DISCOVERED NEBULAE WITH STRUCTURED FILAMENTS ───
      for (const neb of AUTHENTIC_NEBULAE) {
        const theta = (neb.raHours / 24) * 2 * Math.PI;
        const phi = (neb.decDeg / 180) * Math.PI;
        const cosP = Math.cos(phi);
        const sinP = Math.sin(phi);
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);
        const r = neb.dist;

        nebulae.push({
          ...neb,
          x0: r * cosP * sinT,
          y0: r * sinP,
          z0: r * cosP * cosT
        });
      }

      // ─── 5. DISTANT DEEP-SKY GALAXIES ───
      const DEEP_GALAXIES = [
        { name: 'Andromeda (M31)', theta: 0.18, phi: 0.72, dist: 1350, majorR: 110, minorR: 44, tilt: 0.65, type: 'spiral', diskColor: 'rgba(224, 242, 254, 0.22)', coreColor: '#fef08a' },
        { name: 'Triangulum (M33)', theta: 0.42, phi: 0.54, dist: 1320, majorR: 70, minorR: 52, tilt: 0.35, type: 'spiral', diskColor: 'rgba(186, 230, 253, 0.18)', coreColor: '#bae6fd' },
        { name: 'Sombrero (M104)', theta: 3.32, phi: -0.20, dist: 1380, majorR: 85, minorR: 28, tilt: -0.15, type: 'sombrero', diskColor: 'rgba(254, 243, 199, 0.24)', coreColor: '#ffffff' },
        { name: 'Centaurus A (NGC 5128)', theta: 3.52, phi: -0.75, dist: 1360, majorR: 80, minorR: 62, tilt: 0.52, type: 'centaurus', diskColor: 'rgba(251, 191, 36, 0.19)', coreColor: '#fef3c7' }
      ];

      for (const g of DEEP_GALAXIES) {
        const cosP = Math.cos(g.phi);
        const sinP = Math.sin(g.phi);
        const cosT = Math.cos(g.theta);
        const sinT = Math.sin(g.theta);
        galaxies.push({
          ...g,
          x0: g.dist * cosP * sinT,
          y0: g.dist * sinP,
          z0: g.dist * cosP * cosT
        });
      }
    };

    // Deep Space Meteor Streaks
    const spawnMeteor = () => {
      if (meteors.length >= 2) return;
      const startX = (Math.random() - 0.5) * width;
      const startY = -40;
      const angle = Math.PI * 0.28 + (Math.random() - 0.5) * 0.3;
      const speed = 18 + Math.random() * 14;
      meteors.push({
        x: startX + width / 2,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        life: 1.0,
        decay: 0.024 + Math.random() * 0.02
      });
    };

    // Cosmic Cataclysmic Events
    const triggerSupernova = (theta, phi) => {
      const radius = 980;
      const knots = [];
      for (let i = 0; i < 28; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 0.5 + Math.random() * 1.5;
        knots.push({
          x: Math.cos(ang) * spd,
          y: Math.sin(ang) * spd,
          size: 1.2 + Math.random() * 2.2,
          color: ['#38bdf8', '#facc15', '#ec4899', '#ffffff'][i % 4]
        });
      }
      activeCosmicEvent = {
        type: 'SUPERNOVA',
        x0: radius * Math.cos(phi) * Math.sin(theta),
        y0: radius * Math.sin(phi),
        z0: radius * Math.cos(phi) * Math.cos(theta),
        knots,
        frame: 0,
        maxFrames: 330
      };
    };

    const triggerGRB = (theta, phi) => {
      const radius = 1150;
      activeCosmicEvent = {
        type: 'GRB',
        x0: radius * Math.cos(phi) * Math.sin(theta),
        y0: radius * Math.sin(phi),
        z0: radius * Math.cos(phi) * Math.cos(theta),
        jetAngle: Math.random() * Math.PI * 2,
        frame: 0,
        maxFrames: 270
      };
    };

    const triggerNextCosmicEvent = () => {
      const theta = currentYaw + (Math.random() - 0.5) * 1.8;
      const phi = currentPitch + (Math.random() - 0.5) * 1.0;
      if (eventTypeIndex % 2 === 0) triggerSupernova(theta, phi);
      else triggerGRB(theta, phi);
      eventTypeIndex++;
    };

    // ─── MAIN 3D ASTROPHYSICAL SIMULATION RENDER LOOP ───
    const render = () => {
      const warp = warpStateRef.current;
      const cam = cameraRef.current;

      // ── GENUINE 3D OBSERVER MOTION ENGINE ──
      if (warp.active) {
        warp.progress += 0.012 * speedFactor;

        // Smoothly interpolate physical camera position in 3D space
        // Easing function for smooth acceleration and deceleration
        const t = Math.min(1.0, warp.progress);
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        cam.x = warp.originCam.x + (warp.targetCam.x - warp.originCam.x) * ease;
        cam.y = warp.originCam.y + (warp.targetCam.y - warp.originCam.y) * ease;
        cam.z = warp.originCam.z + (warp.targetCam.z - warp.originCam.z) * ease;

        // Smoothly swivel camera orientation to face destination star
        currentYaw += (warp.targetYaw - currentYaw) * 0.09;
        currentPitch += (warp.targetPitch - currentPitch) * 0.09;
        targetYaw = currentYaw;
        targetPitch = currentPitch;

        // Real-time flight distance readout
        if (warp.progress < 0.85) {
          const rem = Math.max(0.1, (1.0 - warp.progress / 0.85) * 35).toFixed(1);
          setWarpDistance(`WARP FLIGHT // ${rem} AU TO STELLAR ARRIVAL`);
        } else {
          setWarpDistance('ORBITAL INSERTION CONFIRMED // STELLAR PROXIMITY');
        }

        if (warp.progress >= 1.0) {
          warp.progress = 1.0;
          warp.active = false;
          setIsWarping(false);
        }
      } else {
        // Natural camera damping from mouse and scroll
        currentYaw += (targetYaw + mouseLookX - currentYaw) * 0.065;
        currentPitch += (targetPitch + mouseLookY - currentPitch) * 0.065;
      }

      // PURE VACUUM OBSIDIAN VOID (#000000)
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = Math.max(width, height) * 0.74;

      const cosY = Math.cos(currentYaw);
      const sinY = Math.sin(currentYaw);
      const cosP = Math.cos(currentPitch);
      const sinP = Math.sin(currentPitch);

      // Reset hit registry for click hit-testing this frame
      screenStarHits = [];

      // 3D coordinate transformation relative to observer position
      const project3D = (x0, y0, z0) => {
        // Observer offset (GENUINE 3D TRAVEL)
        const rx = x0 - cam.x;
        const ry = y0 - cam.y;
        const rz = z0 - cam.z;

        // Yaw rotation
        const x1 = rx * cosY - rz * sinY;
        const z1 = rx * sinY + rz * cosY;

        // Pitch rotation
        const y2 = ry * cosP - z1 * sinP;
        const z2 = ry * sinP + z1 * cosP;

        return { x1, y2, z2, dist: Math.hypot(rx, ry, rz) };
      };

      // ── 1. RENDER MILKY WAY GALACTIC PLANE GLOW (Screen Blend) ──
      ctx.globalCompositeOperation = 'screen';
      for (const d of galacticPlaneDust) {
        const p = project3D(d.x0, d.y0, d.z0);
        if (p.z2 > 90) {
          const scale = fov / p.z2;
          const px = cx + p.x1 * scale;
          const py = cy + p.y2 * scale;
          const pr = Math.max(0.5, d.radius * scale);

          if (px > -pr && px < width + pr && py > -pr && py < height + pr) {
            const fade = Math.min(1.0, (p.z2 - 90) / 240);
            const grad = ctx.createRadialGradient(px, py, 0, px, py, pr);
            grad.addColorStop(0, `${d.color}${d.alpha * fade})`);
            grad.addColorStop(0.55, `${d.color}${d.alpha * 0.45 * fade})`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(px, py, pr, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // ── 2. RENDER REAL DISCOVERED NEBULAE WITH AUTHENTIC FILAMENTS & SHOCK RIDGES ──
      for (const neb of nebulae) {
        const p = project3D(neb.x0, neb.y0, neb.z0);
        if (p.z2 > 60) {
          const scale = fov / p.z2;
          const nx = cx + p.x1 * scale;
          const ny = cy + p.y2 * scale;
          const nW = Math.max(1.0, neb.width * scale);
          const nH = Math.max(1.0, neb.height * scale);

          if (nx > -nW * 2 && nx < width + nW * 2 && ny > -nH * 2 && ny < height + nH * 2) {
            const fade = Math.min(1.0, (p.z2 - 60) / 220);

            ctx.save();
            ctx.translate(nx, ny);
            ctx.rotate(neb.tilt);

            // Layer A: Anisotropic Elliptical Diffuse Ionization Envelope
            const envGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, nW);
            envGrad.addColorStop(0, neb.baseColor.replace(/[\d\.]+\)$/, `${0.22 * fade})`));
            envGrad.addColorStop(0.45, neb.baseColor.replace(/[\d\.]+\)$/, `${0.08 * fade})`));
            envGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.scale(1.0, nH / nW);
            ctx.fillStyle = envGrad;
            ctx.beginPath();
            ctx.arc(0, 0, nW, 0, Math.PI * 2);
            ctx.fill();
            ctx.scale(1.0, nW / nH);



            // Layer C: Towering Dark Molecular Dust Pillars & Silhouettes (e.g. Horsehead, Pillars)
            if (neb.darkSilhouettes && neb.darkSilhouettes.length > 0) {
              ctx.globalCompositeOperation = 'destination-out';
              for (const ds of neb.darkSilhouettes) {
                const dx = ds.x * scale;
                const dy = ds.y * scale;
                const dr = Math.max(1.0, ds.r * scale);

                ctx.save();
                ctx.translate(dx, dy);
                ctx.rotate(ds.angle || 0);
                ctx.scale(1.0, ds.elongation || 1.0);

                const dGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, dr);
                dGrad.addColorStop(0, `rgba(0, 0, 0, ${ds.alpha * fade * 0.85})`);
                dGrad.addColorStop(0.7, `rgba(0, 0, 0, ${ds.alpha * fade * 0.4})`);
                dGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = dGrad;
                ctx.beginPath();
                ctx.arc(0, 0, dr, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
              }
              ctx.globalCompositeOperation = 'screen';
            }

            // Layer D: Embedded Cluster Stars (Lighting up the Ionization Cavity)
            if (neb.coreCluster && neb.coreCluster.length > 0) {
              for (const cl of neb.coreCluster) {
                const cxPos = cl.x * scale;
                const cyPos = cl.y * scale;
                const cR = Math.max(1.2, cl.size * 3.5 * scale);

                const cGrad = ctx.createRadialGradient(cxPos, cyPos, 0, cxPos, cyPos, cR);
                cGrad.addColorStop(0, cl.color);
                cGrad.addColorStop(0.35, 'rgba(186, 230, 253, 0.6)');
                cGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = cGrad;
                ctx.beginPath();
                ctx.arc(cxPos, cyPos, cR, 0, Math.PI * 2);
                ctx.fill();
              }
            }

            ctx.restore();
          }
        }
      }

      // ── 3. RENDER DISTANT DEEP-SKY GALAXIES ──
      for (const g of galaxies) {
        const p = project3D(g.x0, g.y0, g.z0);
        if (p.z2 > 80) {
          const scale = fov / p.z2;
          const gx = cx + p.x1 * scale;
          const gy = cy + p.y2 * scale;
          const gMajor = Math.max(1.0, g.majorR * scale);
          const gMinor = Math.max(0.5, g.minorR * scale);

          if (gx > -gMajor && gx < width + gMajor && gy > -gMajor && gy < height + gMajor) {
            const fade = Math.min(1.0, (p.z2 - 80) / 200);

            ctx.save();
            ctx.translate(gx, gy);
            ctx.rotate(g.tilt);

            const diskGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, gMajor);
            diskGrad.addColorStop(0, g.diskColor.replace(/[\d\.]+\)$/, `${0.25 * fade})`));
            diskGrad.addColorStop(0.55, g.diskColor.replace(/[\d\.]+\)$/, `${0.08 * fade})`));
            diskGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.scale(1.0, gMinor / gMajor);
            ctx.fillStyle = diskGrad;
            ctx.beginPath();
            ctx.arc(0, 0, gMajor, 0, Math.PI * 2);
            ctx.fill();

            ctx.scale(1.0, gMajor / gMinor);
            const coreR = Math.max(1.8, 4.2 * scale);
            const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreR * 2.5);
            coreGrad.addColorStop(0, g.coreColor);
            coreGrad.addColorStop(0.4, g.coreColor.replace(')', ', 0.55)'));
            coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(0, 0, coreR * 2.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over';

      // ── 5. RENDER ALL STARS WITH TRUE 3D OBSERVER PARALLAX ──
      const starCount = stars.length;
      const isTransit = warp.active && warp.progress > 0.12 && warp.progress < 0.88;
      const warpStreakPower = isTransit ? Math.sin((warp.progress - 0.12) / 0.76 * Math.PI) * 16 : 0;

      for (let i = 0; i < starCount; i++) {
        const s = stars[i];
        const p = project3D(s.x0, s.y0, s.z0);
        const isVisitedStar = visitedStar === s;

        if (p.z2 > 4) {
          const scale = fov / p.z2;
          const px = cx + p.x1 * scale;
          const py = cy + p.y2 * scale;

          if (px >= -40 && px <= width + 40 && py >= -40 && py <= height + 40) {
            const fade = Math.min(1.0, (p.z2 - 4) / 100);
            const twinkle = 1.0 + Math.sin(s.twinklePhase + time * s.twinkleSpeed) * 0.18;
            const alpha = Math.max(0.1, Math.min(1.0, s.baseAlpha * fade * twinkle));

            // Genuine arrival: at proximity, star grows into detailed stellar photosphere
            let renderSize = Math.max(0.4, s.size * scale);
            if (p.dist < 50) {
              // We are physically at the star's orbital position!
              renderSize = Math.max(renderSize, 14 + (50 - p.dist) * 0.6);
            }

            // Register in screen hits for click interaction
            if (s.isCompulsory || s.isBeacon) {
              screenStarHits.push({ px, py, star: s });
            }

            // High-luminosity Anchor / Compulsory Star Airy disk & Corona
            if (s.isBeacon && alpha > 0.35) {
              const haloMultiplier = p.dist < 60 ? 4.8 : 3.8;
              const haloR = Math.max(1.0, renderSize * haloMultiplier);
              const halo = ctx.createRadialGradient(px, py, 0, px, py, haloR);
              halo.addColorStop(0, s.glowColor);
              halo.addColorStop(0.4, s.glowColor.replace(/[\d\.]+\)$/, '0.25)'));
              halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
              ctx.fillStyle = halo;
              ctx.beginPath();
              ctx.arc(px, py, haloR, 0, Math.PI * 2);
              ctx.fill();
            }

            // Core photosphere disk
            ctx.fillStyle = s.color;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(px, py, renderSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1.0;

      // ── EVALUATE 2-SECOND HOVER DETECTION ON STAR DOTS ──
      let hitUnderCursor = null;
      if (currentMouseX > 0 && currentMouseY > 0 && !warp.active) {
        for (let j = 0; j < screenStarHits.length; j++) {
          const h = screenStarHits[j];
          const d = Math.hypot(h.px - currentMouseX, h.py - currentMouseY);
          const thresh = h.star.isCompulsory ? 22 : 16;
          if (d <= thresh) {
            hitUnderCursor = h;
            break;
          }
        }
      }

      const now = performance.now();
      if (hitUnderCursor) {
        if (!hoverCandidate || hoverCandidate.star !== hitUnderCursor.star) {
          hoverCandidate = hitUnderCursor;
          hoverStartTime = now;
          if (revealedStarRef.current) {
            revealedStarRef.current = null;
            setRevealedStar(null);
          }
        } else {
          // Pointer on dot for over 2 seconds (2000ms): reveal name
          if (now - hoverStartTime >= 2000) {
            if (!revealedStarRef.current || revealedStarRef.current.name !== hitUnderCursor.star.name) {
              const starData = {
                ...hitUnderCursor.star,
                screenX: hitUnderCursor.px,
                screenY: hitUnderCursor.py
              };
              revealedStarRef.current = starData;
              setRevealedStar(starData);
            } else {
              revealedStarRef.current.screenX = hitUnderCursor.px;
              revealedStarRef.current.screenY = hitUnderCursor.py;
            }
          }
        }
      } else {
        hoverCandidate = null;
        hoverStartTime = 0;
        if (revealedStarRef.current) {
          revealedStarRef.current = null;
          setRevealedStar(null);
        }
      }

      // ── 6. RENDER CATACLYSMIC ASTROPHYSICAL EVENTS ──
      if (!activeCosmicEvent && !warp.active) {
        eventCooldown -= 1 * speedFactor;
        if (eventCooldown <= 0) {
          triggerNextCosmicEvent();
          eventCooldown = 1100 + Math.random() * 600;
        }
      } else if (activeCosmicEvent) {
        const ev = activeCosmicEvent;
        ev.frame += 1 * speedFactor;
        const p = project3D(ev.x0, ev.y0, ev.z0);

        if (p.z2 > 40) {
          const scale = fov / p.z2;
          const ex = cx + p.x1 * scale;
          const ey = cy + p.y2 * scale;
          const progress = ev.frame / ev.maxFrames;

          if (ex > -150 && ex < width + 150 && ey > -150 && ey < height + 150) {
            ctx.save();
            ctx.translate(ex, ey);

            if (ev.type === 'SUPERNOVA') {
              const intensity = Math.pow(1.0 - progress, 1.4);
              const maxR = 120 * scale;
              const curR = maxR * Math.sqrt(progress);

              // Flash shockwave
              const sGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(1, curR));
              sGrad.addColorStop(0, `rgba(255, 255, 255, ${intensity * 0.9})`);
              sGrad.addColorStop(0.3, `rgba(56, 189, 248, ${intensity * 0.6})`);
              sGrad.addColorStop(0.7, `rgba(236, 72, 153, ${intensity * 0.3})`);
              sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
              ctx.fillStyle = sGrad;
              ctx.beginPath();
              ctx.arc(0, 0, Math.max(1, curR), 0, Math.PI * 2);
              ctx.fill();

              // Ejecta knots
              for (const k of ev.knots) {
                const kx = k.x * curR * 0.85;
                const ky = k.y * curR * 0.85;
                ctx.fillStyle = k.color;
                ctx.globalAlpha = intensity * 0.85;
                ctx.beginPath();
                ctx.arc(kx, ky, Math.max(0.5, k.size * scale), 0, Math.PI * 2);
                ctx.fill();
              }
            } else if (ev.type === 'GRB') {
              const intensity = Math.pow(1.0 - progress, 1.8);
              const flashR = (25 + progress * 50) * scale;
              const bGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, flashR);
              bGrad.addColorStop(0, `rgba(255, 255, 255, ${intensity * 0.95})`);
              bGrad.addColorStop(0.4, `rgba(186, 230, 253, ${intensity * 0.4})`);
              bGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
              ctx.fillStyle = bGrad;
              ctx.beginPath();
              ctx.arc(0, 0, flashR, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          }
        }

        if (ev.frame >= ev.maxFrames) {
          activeCosmicEvent = null;
        }
      }

      time += 1 * speedFactor;
      animationFrameId = requestAnimationFrame(render);
    };

    resizeCanvas();
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Return smoothly to Sol (Earth POV origin)
  const handleReturnToSol = () => {
    const curCam = cameraRef.current;
    warpStateRef.current = {
      active: true,
      progress: 0,
      targetStar: null,
      originCam: { ...curCam },
      targetCam: { x: 0, y: 0, z: 0 },
      targetYaw: 0,
      targetPitch: 0
    };
    setIsWarping(true);
    setVisitedStar(null);
    setWarpDistance('WARP DISENGAGED // RETURNING TO SOL SYSTEM');
  };

  return (
    <>
      {/* BACKGROUND DEEP SKY CANVAS */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 cursor-default"
        style={{ background: '#000000' }}
      />

      {/* 2-SECOND HOVER REVEAL TOOLTIP (Discreet, appears only when pointer rests on a dot for > 2 seconds) */}
      {revealedStar && !visitedStar && (
        <div
          className="fixed pointer-events-none z-50 transition-opacity duration-300 ease-out"
          style={{
            left: Math.min(window.innerWidth - 220, Math.max(16, revealedStar.screenX + 14)),
            top: Math.max(16, Math.min(window.innerHeight - 80, revealedStar.screenY - 20))
          }}
        >
          <div className="bg-zinc-950/90 border border-zinc-800/80 backdrop-blur-md rounded-lg px-3 py-2 shadow-[0_0_20px_rgba(0,0,0,0.8),0_0_10px_rgba(56,189,248,0.15)] text-zinc-100">
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: revealedStar.color || '#38bdf8' }}
              />
              <span className="text-xs font-light text-zinc-100 tracking-wide">
                {revealedStar.name}
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono mt-0.5 tracking-wider">
              {revealedStar.bayer || revealedStar.spectralType}
              {revealedStar.constellation ? ` • ${revealedStar.constellation}` : ''}
            </p>
          </div>
        </div>
      )}

      {/* STELLAR ARRIVAL & TELEMETRY HUD CARD (Appears only when user clicks a star dot to visit) */}
      {visitedStar && (
        <aside aria-label="Stellar Telemetry" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[94%] sm:w-auto transition-all duration-700 pointer-events-auto">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl p-5 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(56,189,248,0.15)] text-zinc-100">
            {/* CardHeader */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-zinc-800/60">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full animate-ping"
                    style={{ backgroundColor: visitedStar.color || '#38bdf8' }}
                  />
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-full">
                    {visitedStar.constellation || 'Deep Sky'}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {warpDistance}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-light text-zinc-50 tracking-wide mt-1.5">
                  {visitedStar.name}
                </h2>
                <p className="text-xs text-zinc-400 font-mono tracking-wider">
                  {visitedStar.bayer || visitedStar.designation}
                </p>
              </div>

              {/* Action Button: Return to Sol */}
              <button
                onClick={handleReturnToSol}
                className="inline-flex items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/70 hover:bg-zinc-700 text-zinc-200 hover:text-white px-3 py-1.5 text-xs font-mono tracking-wider transition-all cursor-pointer shadow-sm"
                title="Return observer position to Earth / Sol System"
              >
                ✕ Return to Sol
              </button>
            </div>

            {/* CardContent: 4-Column Astrophysical Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 text-xs font-mono">
              <div className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/60">
                <span className="text-[10px] text-zinc-400 block tracking-wider uppercase">Distance</span>
                <span className="text-cyan-300 font-medium text-sm">{visitedStar.distanceLy}</span>
              </div>
              <div className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/60">
                <span className="text-[10px] text-zinc-400 block tracking-wider uppercase">Spectral Class</span>
                <span className="text-amber-300 font-medium text-sm">{visitedStar.spectralType?.split(' ')[0] || 'Main Seq'}</span>
              </div>
              <div className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/60">
                <span className="text-[10px] text-zinc-400 block tracking-wider uppercase">Temperature</span>
                <span className="text-rose-300 font-medium text-sm">{visitedStar.tempK}</span>
              </div>
              <div className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/60">
                <span className="text-[10px] text-zinc-400 block tracking-wider uppercase">Luminosity</span>
                <span className="text-zinc-200 font-medium text-sm">{visitedStar.luminositySolar}</span>
              </div>
            </div>

            {/* CardFooter */}
            <div className="mt-3.5 pt-2.5 border-t border-zinc-800/50 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span>TIP: Click any other star to warp directly there</span>
              <span className="text-cyan-400/80 font-medium">3D PARALLAX ACTIVE</span>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
