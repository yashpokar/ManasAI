import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'

// TODO: refer this from the core package
const port = parseInt(process.env.UI_PORT || '3000')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port
  }
})
