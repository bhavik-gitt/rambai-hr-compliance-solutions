
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },

  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
  },

  preview: {
    host: 'localhost',
    port: 4173,
  },

  build: {
    sourcemap: false,
    outDir: 'dist',
  },
});
