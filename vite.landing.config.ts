import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// ============================================================
// VITE CONFIG FOR LANDING PAGE ONLY BUILD
// Run with: npx vite build --config vite.landing.config.ts
// This produces a minimal bundle — only the landing page.
// ============================================================

export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist-landing',
    rollupOptions: {
      input: 'index-landing.html',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
