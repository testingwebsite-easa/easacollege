import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    legalComments: 'none'
  },
  build: {
    chunkSizeWarningLimit: 1400,
    target: ['es2015', 'chrome64', 'edge79', 'firefox67', 'safari12'],
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-framer-motion';
          }
          if (id.includes('node_modules/react-icons/')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules/xlsx/') || id.includes('node_modules/mammoth/') || id.includes('node_modules/html2canvas/')) {
            return 'vendor-docs';
          }
        }
      }
    }
  },
})
