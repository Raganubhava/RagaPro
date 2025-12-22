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
    // Warm (default) palette (light)
    background: '#FBEDCB',
    backgroundStrong: '#F5E1B8',
    surface: '#FFF8EF',
    surfaceAlt: '#F7E7CF',
    primary: '#9C4F3C',
    primaryActive: '#7F3E30',
    primaryHover: '#B45B46',
    primaryDeep: '#7F3E30',
    secondary: '#D8A55C',
    accent: '#9C4F3C',
    gold: '#D8A55C',
    goldDeep: '#C1874E',
    text: '#3E2B23',
    textPrimary: '#3E2B23',
    textSecondary: '#5A4135',
    textSoft: '#7A5B4B',
    border: '#CFA792',
    borderLight: '#E5D6C8',
    borderSoft: '#D9C2B4',
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
      backgroundStrong: customTokens.color.backgroundStrong,
      color: customTokens.color.text,
      primary: customTokens.color.primary,
      primaryHover: customTokens.color.primaryHover,
      primaryActive: customTokens.color.primaryActive,
      primaryDeep: customTokens.color.primaryDeep,
      secondary: customTokens.color.secondary,
      accent: customTokens.color.accent,
      borderColor: customTokens.color.border,
      surface: customTokens.color.surface,
      surfaceAlt: customTokens.color.surfaceAlt,
      gold: customTokens.color.gold,
      goldDeep: customTokens.color.goldDeep,
      textPrimary: customTokens.color.textPrimary,
      textSecondary: customTokens.color.textSecondary,
      textSoft: customTokens.color.textSoft,
      borderSoft: customTokens.color.borderSoft,
      borderLight: customTokens.color.borderLight,
    },
    navy: {
      background: '#0B1026', // deep navy
      backgroundStrong: '#0B1026',
      color: '#F5F7FF',
      primary: '#F5F7FF', // foreground text/buttons
      primaryHover: '#FFFFFF',
      primaryActive: '#E6EAFA',
      primaryDeep: '#C9CFEC',
      secondary: '#D8A55C',
      accent: '#F5F7FF',
      borderColor: '#1C2140',
      surface: '#0B1026',
      surfaceAlt: '#12183A',
      gold: '#D8A55C',
      goldDeep: '#C1874E',
      textPrimary: '#FFFFFF',
      textSecondary: '#E6EAFA',
      textSoft: '#C9CFEC',
      borderSoft: '#262C4F',
      borderLight: '#343A5D',
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
