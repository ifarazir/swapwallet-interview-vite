import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['assets/**/*.png', 'assets/**/*.svg', 'assets/**/*.jpg', 'assets/**/*.gif', 'assets/**/*.webp'],
})
