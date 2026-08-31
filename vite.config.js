import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https://images.unsplash.com https://*.cloudinary.com https://res.cloudinary.com https://*.amazonaws.com https://*.s3.amazonaws.com https://easa-college.s3.eu-north-1.amazonaws.com https://assets.aceternity.com https://img.youtube.com https://i.ytimg.com https://*.google.com https://*.googleapis.com https://*.gstatic.com; connect-src 'self' https: wss:; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://maps.google.com https://www.google.com; media-src 'self' data: blob: https://*.amazonaws.com https://easa-college.s3.eu-north-1.amazonaws.com https://*.cloudinary.com https://res.cloudinary.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests;",
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block'
}

const securityHeadersPlugin = () => ({
  name: 'security-headers-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      next();
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), securityHeadersPlugin()],
  server: {
    headers: SECURITY_HEADERS
  },
  preview: {
    headers: SECURITY_HEADERS
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
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


