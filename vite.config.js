import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        laboratory: resolve(__dirname, 'index_laboratory.html'),
        gourmet: resolve(__dirname, 'index_gourmet.html'),
      },
    },
  },
})
