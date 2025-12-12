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
    // Warm (default) palette
    background: '#F5F6F7',
    backgroundStrong: '#E5E7EB',
    surface: '#F5F6F7',
    surfaceAlt: '#FFFFFF',
    primary: '#9C4F3C',
    primaryActive: '#7F3E30',
    primaryHover: '#B45B46',
    primaryDeep: '#7F3E30',
    secondary: '#D8A55C',
    accent: '#9C4F3C',
    gold: '#D8A55C',
    goldDeep: '#C1874E',
    text: '#4C2D23',
    textPrimary: '#4C2D23',
    textSecondary: '#5C3A2F',
    textSoft: '#6C4B3C',
    border: '#9C4F3C',
    borderLight: '#D8A55C',
    borderSoft: '#C1874E',
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
      background: '#0F2F52',
      backgroundStrong: '#0F2F52',
      color: '#F2E6CF',
      primary: '#F2E6CF',
      primaryHover: '#F6EBD8',
      primaryActive: '#D9CDB6',
      primaryDeep: '#D9CDB6',
      secondary: '#D8A55C',
      accent: '#F2E6CF',
      borderColor: '#F2E6CF',
      surface: '#0F2F52',
      surfaceAlt: '#12375F',
      gold: '#D8A55C',
      goldDeep: '#C1874E',
      textPrimary: '#F2E6CF',
      textSecondary: '#F2E6CF',
      textSoft: '#E3D7C0',
      borderSoft: '#C1874E',
      borderLight: '#D8A55C',
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
