import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // SPA fallback: serve index.html for all routes (e.g. /shop, /cart, /checkout)
  appType: 'spa',
})
