import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', '@vueuse/core'], // 自动导入 Vue 和 @vueuse/core 库中的常见方法
            dts: 'src/auto-imports.d.ts', // 生成类型声明文件
            eslintrc: {enabled: true}, // 启用 ESLint 的自动修复功能
            // 预设配置，比如导入 Vue 相关的方法
            presets: [
                [
                    'vue',
                    {
                        // 指定要自动导入的 Vue 方法
                        components: true,
                        directives: true,
                        filters: true,
                    },
                ],
            ],

        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    base: './',
    build: {
        chunkSizeWarningLimit: 10000000
    },
    server: {
        port: 5173
    }
})
