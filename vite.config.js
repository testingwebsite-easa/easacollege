import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const asyncCssPlugin = () => {
  return {
    name: 'async-css-plugin',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        '<link rel="preload" as="style" href="$1" /><link rel="stylesheet" href="$1" media="print" onload="this.media=\'all\'" /><noscript><link rel="stylesheet" href="$1" /></noscript>'
      );
    }
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), asyncCssPlugin()],
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

