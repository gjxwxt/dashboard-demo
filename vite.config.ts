/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import viteEslint from 'vite-plugin-eslint';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'; // 封装svg图标

const envDir = path.resolve(process.cwd(), './env');
// https://vitejs.dev/config/
export default defineConfig({
  envDir,
  envPrefix: 'VITE_',
  base: './',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src') // 源文件根目录
    }
  },
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'svg-[dir]-[name]'
    }),
    viteEslint({
      failOnError: false
    })
  ],
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      sass: {
        math: 'always',
        globalVars: {
          //配置全局变量
          test: '#1CC0FF'
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom', //提供浏览器API以模拟浏览器环境
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  },
  server: {
    open: true, // 自动打开浏览器
    port: 3000, // 服务端口
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }, // api代理路径
      '/mock': '' // mock代理路径,
    }
  },
  // 生产打包时采用rollup进行打包，
  build: {
    outDir: 'dist',
    target: 'es2015', // 设置最终构建的浏览器兼容目标。
    assetsDir: 'assets', // 指定生成静态资源的存放路径,相对于outDir
    assetsInlineLimit: 4096, // 默认4096kb，小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。
    sourcemap: false, // 默认是false，单独生成sourcemap文件
    reportCompressedSize: false, // gzip 压缩大小报告
    // minify: "esbuild", // 默认是esbuild，如果使用terser，需要安装terser npm i terser -D
    // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      treeshake: true,
      output: {
        // Static resource classification and packaging
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 让每个插件都打包成独立的文件
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});
