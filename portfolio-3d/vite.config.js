import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Le code 3D est chargé à la demande (React.lazy) : Vite le découpe tout seul
// en plusieurs fichiers, donc la page s'affiche vite même avec Three.js.
export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1200 },
});
