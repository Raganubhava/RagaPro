// This is the single source of truth for Babel configuration.
// It will be used by vite-plugin-babel.
module.exports = {
  presets: [
    // This is crucial: tell preset-env to NOT transform ES modules to CommonJS
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    // This MUST be the last plugin
    'react-native-reanimated/plugin',
  ],
};
