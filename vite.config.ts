import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return;
          }

          if (id.includes('recharts') || id.includes('d3-')) {
            return 'vendor-charts';
          }

          if (id.includes('@mui/') || id.includes('@emotion/')) {
            return 'vendor-mui';
          }

          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'vendor-i18n';
          }

          if (id.includes('zustand') || id.includes('zod') || id.includes('axios')) {
            return 'vendor-core';
          }

          if (id.includes('lucide-react') || id.includes('react-aria-components')) {
            return 'vendor-ui';
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/modules': path.resolve(__dirname, './src/modules'),
      '@/layouts': path.resolve(__dirname, './src/layouts'),
      '@/stores': path.resolve(__dirname, './src/stores'),
      '@/services': path.resolve(__dirname, './src/services'),
      '@/helpers': path.resolve(__dirname, './src/helpers'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/i18n': path.resolve(__dirname, './src/i18n'),
    },
  },
})
