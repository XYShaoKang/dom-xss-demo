const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  base: '/dom-xss-demo/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'preview.html'),
      },
    },
  },
})
