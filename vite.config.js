import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'html-transform',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          return html.replace(
            /<!-- LIVE_SERVER_BUNDLE_START -->[\s\S]*?<!-- LIVE_SERVER_BUNDLE_END -->/,
            '<script type="module" src="/src/main.jsx"></script>'
          );
        }
      },
      closeBundle() {
        try {
          const distAssets = path.resolve(__dirname, 'dist/assets');
          const rootAssets = path.resolve(__dirname, 'assets');
          if (fs.existsSync(distAssets)) {
            if (!fs.existsSync(rootAssets)) {
              fs.mkdirSync(rootAssets, { recursive: true });
            }
            const files = fs.readdirSync(distAssets);
            for (const file of files) {
              fs.copyFileSync(
                path.join(distAssets, file),
                path.join(rootAssets, file)
              );
            }
          }
        } catch (e) {
          console.warn('Could not sync assets to root:', e);
        }
      }
    },
    react()
  ],
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});

