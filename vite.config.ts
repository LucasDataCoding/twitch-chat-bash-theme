import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Configurações importantes para servir com Python
  build: {
    outDir: 'dist', // Pasta de output
    assetsDir: 'assets', // Pasta dentro de dist para assets
    emptyOutDir: true, // Limpa a pasta dist antes de buildar
  },
  // Configuração do base path
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
})
