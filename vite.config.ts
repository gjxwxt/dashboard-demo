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
  }
});
