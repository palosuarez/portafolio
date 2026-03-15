import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Si vas a usar Tailwind en el nuevo, mantén la importación,
// si no, déjalo así para máxima limpieza.
export default defineConfig({
  // VITAL: Sin esto, GitHub Pages te dará 404 siempre
  base: '/portafolio/',
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    outDir: 'dist', // Asegura que el build vaya a la carpeta que lee el Action
  },
  server: {
    host: true,
    port: 5173,
  },
});
