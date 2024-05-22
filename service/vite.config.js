import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'main.js', // 库入口文件
      formats: ['es'], // 输出两种格式：CommonJS 和 ES Modules
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.js'
      },
    },
  },
})
