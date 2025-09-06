import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/fotocopiasDani/',  // 👈 nombre exacto del repo en GitHub
});
