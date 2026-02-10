import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tamaguiPlugin } from '@tamagui/vite-plugin'
import path from 'path'
import viteBabel from 'vite-plugin-babel'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['react-native-reanimated', 'moti'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  resolve: {
    alias: [
      {
        find: /^react-native-reanimated(\/.*)?$/,
        replacement: path.resolve(__dirname, 'src/reanimated-web-stub.tsx'),
      },
      {
        find: 'react-native/Libraries/Renderer/shims/ReactNative',
        replacement: path.resolve(__dirname, 'src/shims/ReactNativeShim.js'),
      },
      {
        find: 'react-native/Libraries/Renderer/shims/ReactFabric',
        replacement: path.resolve(__dirname, 'src/shims/ReactFabricShim.js'),
      },
      {
        find: 'react-native/Libraries/TurboModule/TurboModuleRegistry',
        replacement: path.resolve(__dirname, 'src/shims/TurboModuleRegistry.js'),
      },
      { find: 'react-native', replacement: 'react-native-web' },
      { find: 'ui', replacement: path.resolve(__dirname, '../../packages/ui/src') },
      { find: '@raga/data', replacement: path.resolve(__dirname, '../../packages/data/src') },
    ],
  },

  plugins: [
    viteBabel({
      enforce: 'pre',
      babelConfig: {
        presets: [
          ['@babel/preset-env', { modules: false }],
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: ['react-native-reanimated/plugin'],
      },
    }),
    react(),
    tamaguiPlugin({
      components: ['tamagui', 'ui'],
      config: '../../packages/ui/src/tamagui.config.ts',
    }),
  ],

  server: {
    https: false,
    host: '0.0.0.0',
    port: 5174,
    strictPort: true,
    allowedHosts: ['raganidhi.com', 'www.raganidhi.com'],
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/fastapi': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/fastapi/, ''),
      },
    },
  },

  define: {
    global: 'window',
    __DEV__: true,
  },

  ssr: {
    noExternal: ['react-native-reanimated', 'moti'],
  },
})
