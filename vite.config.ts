import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets load properly on GitHub Pages (SM1712.github.io/Aniversary-3/)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
