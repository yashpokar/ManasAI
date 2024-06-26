import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.UI_PORT || '6288')
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  envDir: '../../',
  envPrefix: ['UI_', 'API_']
})
