import path from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
    }
  },
  build: {
    lib: {
      formats: ["es", "cjs"],
      name: 'SGoogleMaps',
      entry: "./src/index.ts",
      fileName: 's-google-maps',
    },
  },
})
