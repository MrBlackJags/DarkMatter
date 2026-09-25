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
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'fade-in': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'gentle-float': 'gentleFloat 6s ease-in-out infinite',
        'subtle-bounce': 'subtleBounce 3s ease-in-out infinite'
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
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        subtleBounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.3' },
          '50%': { transform: 'translateY(8px)', opacity: '0.15' }
        }
      }
    },
  },
  plugins: [],
};
