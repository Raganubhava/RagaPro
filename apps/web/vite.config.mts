import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tamaguiPlugin } from '@tamagui/vite-plugin';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';
import viteBabel from 'vite-plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  // This is crucial for react-native-reanimated on web.
  // It prevents Vite's esbuild pre-bundler from processing these packages,
  // which would fail on native `require()` calls.
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
      // This is the key fix: A single, strong alias for all Reanimated imports
      // that points to our local web stub. This prevents Vite from ever trying
      // to load the native Reanimated code.
      {
        find: /^react-native-reanimated(\/.*)?$/,
        replacement: path.resolve(__dirname, 'src/reanimated-web-stub.tsx'),
      },

      // Keep existing shims for other potential native imports that might
      // be required by other parts of the ecosystem.
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

      // Standard aliases for the monorepo
      { find: 'react-native', replacement: 'react-native-web' },
      { find: 'ui', replacement: path.resolve(__dirname, '../../packages/ui/src') },
      // New alias for the shared data package
      { find: '@raga/data', replacement: path.resolve(__dirname, '../../packages/data/src') },
    ],
  },
  plugins: [
    // This plugin runs Babel BEFORE Vite's internal plugins.
    // This is necessary to transform the JSX in any files that need it
    // before Vite's import-analysis plugin sees it.
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
    // basicSsl removed to allow HTTP during local development
  ],
  server: {
    https: false,
  },
  define: {
    global: 'window',
    __DEV__: true,
  },
  ssr: {
    noExternal: ['react-native-reanimated', 'moti'],
  },
});
