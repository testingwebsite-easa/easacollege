import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-icons') || id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('lightgallery') || id.includes('react-slick') || id.includes('slick-carousel')) {
              return 'ui-widgets';
            }
            if (id.includes('xlsx') || id.includes('file-saver')) {
              return 'excel';
            }
            if (id.includes('@aws-sdk') || id.includes('aws-sdk')) {
              return 'aws';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})

