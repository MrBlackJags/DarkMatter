/**
 * DARKMATTER - Scientific Data Lab & Interactive Chart Engine
 * Powered by Chart.js with dynamic parametric adjustments
 */

class SpaceDataCharts {
  constructor() {
    this.rotationChart = null;
    this.transitChart = null;
    this.cmbChart = null;
  }

  // 1. Galaxy Rotation Curve (Vera Rubin Dark Matter Evidence)
  initRotationCurveChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const data = SPACE_RESEARCH_DATA.datasets.galaxyRotation;

    this.rotationChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.radiiKpc,
        datasets: [
          {
            label: 'Observed Rotation v_obs (Flat Curve)',
            data: [...data.observedVelocity],
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            borderWidth: 3,
            pointBackgroundColor: '#38bdf8',
            pointRadius: 4,
            tension: 0.25,
            fill: false
          },
          {
            label: 'Expected Keplerian v_vis (Visible Baryonic Mass Only)',
            data: [...data.visibleBaryonicVelocity],
            borderColor: '#f87171',
            backgroundColor: 'rgba(248, 113, 113, 0.1)',
            borderWidth: 2,
            borderDash: [5, 5],
            pointBackgroundColor: '#f87171',
            pointRadius: 3,
            tension: 0.3,
            fill: false
          },
          {
            label: 'Calculated Dark Matter Halo Contribution v_dm',
            data: [...data.darkHaloVelocity],
            borderColor: '#a855f7',
            backgroundColor: 'rgba(168, 85, 247, 0.05)',
            borderWidth: 2,
            borderDash: [2, 4],
            pointBackgroundColor: '#a855f7',
            pointRadius: 2,
            tension: 0.3,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            labels: {
              color: '#cbd5e1',
              font: { family: 'system-ui, sans-serif', size: 12 }
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#38bdf8',
            bodyColor: '#e2e8f0',
            borderColor: '#334155',
            borderWidth: 1,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.parsed.y} km/s`
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Distance from Galactic Center (kpc)',
              color: '#94a3b8',
              font: { size: 12, weight: 'bold' }
            },
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            title: {
              display: true,
              text: 'Orbital Velocity (km/s)',
              color: '#94a3b8',
              font: { size: 12, weight: 'bold' }
            },
            min: 0,
            max: 260,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    });
  }

  updateRotationDarkMatterFraction(fraction) {
    if (!this.rotationChart) return;
    const base = SPACE_RESEARCH_DATA.datasets.galaxyRotation;

    // fraction 0.0 (No DM) to 2.0 (Heavy DM), normal is 1.0
    const newDarkHalo = base.darkHaloVelocity.map(v => Math.round(v * Math.sqrt(fraction)));
    const newObserved = base.visibleBaryonicVelocity.map((v_vis, i) => {
      const v_dm = newDarkHalo[i];
      return Math.round(Math.sqrt(v_vis * v_vis + v_dm * v_dm));
    });

    this.rotationChart.data.datasets[1].data = base.visibleBaryonicVelocity;
    this.rotationChart.data.datasets[2].data = newDarkHalo;
    this.rotationChart.data.datasets[0].data = newObserved;
    this.rotationChart.update();
  }

  // 2. Exoplanet Light Curve Transit
  initTransitPhotometryChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const data = SPACE_RESEARCH_DATA.datasets.exoplanetTransit;

    this.transitChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            type: 'scatter',
            label: 'Observed High-Cadence Flux (Photometry)',
            data: data.timeHours.map((t, i) => ({ x: t, y: data.normalizedFlux[i] })),
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.8)',
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            type: 'line',
            label: 'Fitted Transit Model (Mandel-Agol Limb Darkening)',
            data: data.timeHours.map((t, i) => ({ x: t, y: data.idealTransitModel[i] })),
            borderColor: '#f59e0b',
            borderWidth: 2.5,
            fill: false,
            tension: 0.1,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#cbd5e1',
              font: { size: 12 }
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            callbacks: {
              label: (c) => `Time: ${c.parsed.x.toFixed(2)}h | Flux: ${(c.parsed.y).toFixed(4)}`
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Time relative to mid-transit (Hours)',
              color: '#94a3b8',
              font: { weight: 'bold' }
            },
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            title: {
              display: true,
              text: 'Relative Normalized Stellar Flux',
              color: '#94a3b8',
              font: { weight: 'bold' }
            },
            min: 0.992,
            max: 1.002,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    });
  }

  updateTransitParameters(depthRatioPercent) {
    if (!this.transitChart) return;
    const base = SPACE_RESEARCH_DATA.datasets.exoplanetTransit;
    const depthFrac = depthRatioPercent / 100; // e.g. 0.005 for 0.5%

    const newModel = base.timeHours.map(t => {
      if (Math.abs(t) <= 0.6) {
        return 1.0 - depthFrac;
      } else if (Math.abs(t) <= 1.0) {
        const ingress = (1.0 - Math.abs(t)) / 0.4;
        return 1.0 - depthFrac * ingress;
      }
      return 1.0;
    });

    const newScatter = base.timeHours.map((t, idx) => {
      const noise = (Math.random() - 0.5) * 0.0006;
      return { x: t, y: newModel[idx] + noise };
    });

    this.transitChart.data.datasets[1].data = base.timeHours.map((t, i) => ({ x: t, y: newModel[i] }));
    this.transitChart.data.datasets[0].data = newScatter;
    this.transitChart.update();
  }

  // 3. Cosmic Microwave Background Power Spectrum
  initCMBPowerChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const data = SPACE_RESEARCH_DATA.datasets.cmbPowerSpectrum;

    this.cmbChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.multipoles,
        datasets: [
          {
            label: 'Planck 2018 TT Anisotropy Power D_l [μK²]',
            data: data.powerDl,
            borderColor: '#ec4899',
            backgroundColor: 'rgba(236, 72, 153, 0.12)',
            borderWidth: 2.5,
            pointBackgroundColor: '#ec4899',
            pointRadius: 4,
            tension: 0.35,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#cbd5e1' }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            callbacks: {
              title: (items) => `Multipole Moment l = ${items[0].label}`,
              afterBody: (items) => {
                const l = parseInt(items[0].label, 10);
                if (Math.abs(l - 220) < 50) return '★ 1st Acoustic Peak: Geometry of Space (Flat Ω = 1)';
                if (Math.abs(l - 540) < 50) return '★ 2nd Acoustic Peak: Baryon Mass Density';
                if (Math.abs(l - 810) < 50) return '★ 3rd Acoustic Peak: Cold Dark Matter Fraction';
                return '';
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Multipole Moment l (Angular Scale ~ 180° / l)',
              color: '#94a3b8',
              font: { weight: 'bold' }
            },
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: '#94a3b8' }
          },
          y: {
            title: {
              display: true,
              text: 'Temperature Fluctuation Power D_l = l(l+1)C_l / 2π [μK²]',
              color: '#94a3b8',
              font: { weight: 'bold' }
            },
            min: 0,
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    });
  }
}

if (typeof window !== 'undefined') {
  window.SpaceDataCharts = SpaceDataCharts;
}
