import { defineConfig } from 'vite'
import 'tailwindcss'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()],
    }),
    tailwindcss()
  ],
  build:{
    outDir: "../src/main/resources/static",
    emptyOutDir: true
  },
  server: {
    port:3000,
    strictPort: true,
    hmr:{
      clientPort:3000,
    },
    proxy: {
      // 1. Proxy standard REST API calls (Assuming your backend APIs start with /api)
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // 2. Proxy WebSocket connections (Crucial for your STOMP / WebSocket path)
      '/karakal': {
        target: 'ws://localhost:8080',
        ws: true,         // Tells Vite to proxy WebSockets
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
