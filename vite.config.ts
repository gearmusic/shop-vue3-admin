import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

export default defineConfig({

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),

    },
  },   
  plugins: [
    vue(),

  ],
  server:{
    
    proxy:{
      '/login-api': {
        target: 'http://39.98.123.211:8170/',
        rewrite: path => path.replace(/^\/login-api/,''),
        changeOrigin: true,
      }
    }
   
  }

})
