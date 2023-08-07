import uni from '@dcloudio/vite-plugin-uni'
import path from 'node:path'
import { defineConfig } from 'vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { NutResolver } from 'uniapp-nutui'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 在导入模块时，如果模块路径不包含文件扩展名，则会尝试添加下面这些扩展名
    // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    // 在导入模块时，如果模块路径以 / 开头，则会尝试在下面这些目录中查找该模块
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@img': path.resolve(__dirname, './src/assets/img'),
    },
  },
  plugins: [
    // ...
    uni(),
    Components({
      resolvers: [NutResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "uniapp-nutui/styles/variables.scss";',
      },
    },
  },
})