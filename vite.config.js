import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    legalComments: 'none'
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('react-icons') || id.includes('lucide-react')) {
              return 'icons';
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
            if (id.includes('react-dom') || id.includes('react-router') || (id.includes('/react/') && !id.includes('react-icons'))) {
              return 'react-core';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})



