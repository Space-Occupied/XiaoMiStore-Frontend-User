import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()]
    })
  ],
  server: {
    open: true,
    port: 5174,
    host: "localhost",
    //配置代理，实现跨域
    proxy: {
      "/api": {
        target: "http://localhost:8001",
        // target: "http://localhost:3000",//原后端
        changeOrigin: true,
        rewrite: url=>url.replace(/^\/api/,"")
      }
    }
  },
  resolve: {
    alias: [{
      find: "@",
      replacement: resolve(__dirname, "src")
    }]
  }
})
