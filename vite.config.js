import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/', // For username.github.io repos, use '/'
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three/')) return 'three'
          if (id.includes('/node_modules/gsap/') || id.includes('/node_modules/lenis/') || id.includes('/node_modules/animejs/')) {
            return 'motion'
          }
        },
      },
    },
  },
})
