import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { cloudflareVitePlugin } from '@cloudflare/vite-plugin'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cloudflareVitePlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  server: {
    hmr: process.env.CF_PAGES_URL
      ? {
          protocol: 'wss',
          host: new URL(process.env.CF_PAGES_URL).hostname,
          clientPort: 443,
        }
      : true,
  }
})