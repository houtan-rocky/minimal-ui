import { sentryVitePlugin } from '@sentry/vite-plugin';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';

// ----------------------------------------------------------------------

function excludeMsw() {
  return {
    name: 'exclude-msw',
    resolveId(source: any) {
      return source === 'virtual-module' ? source : null;
    },
    renderStart(outputOptions: any, _inputOptions: any) {
      const outDir = outputOptions.dir;
      const msWorker = path.resolve(outDir, 'mockServiceWorker.js');
      fs.rm(msWorker, () => console.log(`Deleted ${msWorker}`));
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    excludeMsw(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
      overlay: {
        initialIsOpen: false,
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'test-app',
        short_name: 'TA',
        start_url: '',
        display: 'fullscreen',
        theme_color: '#000',
        background_color: '#fff',
        icons: [
          {
            src: 'pwa-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    sentryVitePlugin({
      org: 'houtan',
      project: 'marginx-tt',
    }),
  ],

  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },

  server: {
    port: 8080,
  },

  preview: {
    port: 8080,
  },

  build: {
    sourcemap: true,
  },
});
