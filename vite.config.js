import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('three') || id.includes('@react-three') || id.includes('maath')) {
            return 'three-vendor';
          }

          if (id.includes('react-markdown') || id.includes('remark-gfm')) {
            return 'markdown-vendor';
          }

          if (id.includes('framer-motion') || id.includes('/motion/')) {
            return 'motion-vendor';
          }

          if (id.includes('react') || id.includes('scheduler')) {
            return 'react-vendor';
          }

          return 'vendor';
        },
      },
    },
  },
})
