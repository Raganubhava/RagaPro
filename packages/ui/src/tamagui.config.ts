import { createTamagui } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, size, space, zIndex } from '@tamagui/themes';
import { config as defaultConfig } from '@tamagui/config/v3';

// Define custom fonts
const bodyFont = createInterFont();
const headingFont = createInterFont({
  family: 'Playfair Display, serif',
  weight: {
    4: '400',
    7: '700',
  },
});

// Define custom tokens
const customTokens = {
  ...defaultConfig.tokens,
  color: {
    ...defaultConfig.tokens.color,
    background: '#FAF7F2',
    surface: '#FDFBF7',
    surfaceAlt: '#FBF7F1',
    primary: '#8B3A50',
    primaryDeep: '#6F2E41',
    gold: '#D8B169',
    goldDeep: '#CDA45C',
    textPrimary: '#3D2E2E',
    textSecondary: '#6F5B5B',
    borderLight: '#E5DACF',
    borderSoft: '#D8C7B4',
    mintAccent: '#A8D8CC',
  },
  radius: {
    6: 6,   // small
    10: 10, // medium
    14: 14, // large
    999: 999, // pill
  },
  shadows: {
    soft: '0px 2px 6px rgba(0,0,0,0.08)',
    medium: '0px 4px 10px rgba(0,0,0,0.12)',
  },
};

// Create the Tamagui config
const tamaguiConfig = createTamagui({
  ...defaultConfig,
  tokens: customTokens,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  themes: {
    ...defaultConfig.themes,
    light: {
      ...defaultConfig.themes.light,
      background: customTokens.color.background,
      color: customTokens.color.textPrimary,
      primary: customTokens.color.primary,
      secondary: customTokens.color.textSecondary,
      accent: customTokens.color.gold,
      borderColor: customTokens.color.borderLight,
      borderColorHover: customTokens.color.borderSoft,
    },
    dark: {
      // For future use, we can define a dark theme here
      ...defaultConfig.themes.dark,
    },
  },
  media: {
    sm: { maxWidth: 640 },
    md: { maxWidth: 900 },
    lg: { maxWidth: 1200 },

    // ADD THESE
    gtSm: { minWidth: 641 },
    gtMd: { minWidth: 901 },
    gtLg: { minWidth: 1201 },
  },
});

export type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
