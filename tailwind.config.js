/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          950: '#03060f',
          900: '#070c1b',
          850: '#0c1328',
          800: '#111b38',
          700: '#1b2a52',
          600: '#263b73'
        },
        hud: {
          cyan: '#00f0ff',
          emerald: '#00ff88',
          amber: '#ffaa00',
          rose: '#ff3366',
          violet: '#a855f7'
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite'
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 0.9 },
          '50%': { opacity: 0.4 }
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 16px rgba(0, 240, 255, 0.85))' }
        }
      }
    },
  },
  plugins: [],
};
