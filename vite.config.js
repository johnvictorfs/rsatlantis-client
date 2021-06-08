import path from 'path'

import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import ViteComponents, { VuetifyResolver } from 'vite-plugin-components'
import visualizer from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    createVuePlugin(),
    vuetifyScssPlugin(),
    ViteComponents({
      customComponentResolvers: [VuetifyResolver()]
    })
  ],
  server: {
    port: 8080
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/scss/main.scss";'
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, '')
        }
      }
    ]
  }
})
