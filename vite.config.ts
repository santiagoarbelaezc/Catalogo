import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [],
    },
    commonjsOptions: {
      include: [/html2canvas/, /node_modules/],
    },
  },
  optimizeDeps: {
    include: ['html2canvas', 'aos'],
  },
});
