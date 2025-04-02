import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hot: true,
    port: 8000,
    proxy: {
      '/login': 'https://mern-repo-github-io.onrender.com'
    }
  }
})
