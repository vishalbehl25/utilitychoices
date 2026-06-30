/**
 * UtilityChoice Design System Tokens
 * Extracted from Wix site CSS custom properties (Revision 814)
 */

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#ED1C24',
  blue: '#0088CB',
  yellow: '#FFCB05',
  gray: '#727272',
  grayLight: '#B0B0B0',

  // Semantic palette (Wix color_N → hex)
  background: {
    primary: '#FFFFFF', // color_11
    secondary: '#FFFFFF', // color_12
    cream: '#FCF9E2', // color_37
    offWhite: '#FEFEF8', // color_38, color_17, color_23
    warmWhite: '#FEFCF1', // color_39
    paleCream: '#FDFBE9', // color_40
  },

  text: {
    primary: '#101921', // color_14, color_15, color_41, color_45, color_46
    secondary: '#101921',
    muted: '#727272', // color_6, color_9
    onPrimary: '#FFFFFF', // color_50, color_53
  },

  brand: {
    primary: '#0061B8', // color_18, color_42, color_48, color_49, color_56, color_58, color_59
    primaryDark: '#003A96', // color_19
    primaryDarker: '#001D4B', // color_20
    accent: '#FF6E00', // color_43
    accentBright: '#FF6200', // color_44, color_61
    lightBlue: '#E5F0FE', // color_16
  },

  border: {
    default: '#FCF9E2', // color_47
    light: '#D9D9D9', // color_13
  },

  button: {
    primary: {
      bg: '#0061B8',
      bgHover: '#101921',
      text: '#FFFFFF',
      border: '#0061B8',
    },
    secondary: {
      bg: '#FFFFFF',
      bgHover: '#FEFEF8',
      text: '#0061B8',
      border: '#0061B8',
    },
    disabled: {
      bg: '#FDFBE9',
      text: '#0061B8',
      border: '#FDFBE9',
    },
  },

  // Extended Wix palette
  palette: {
    color_1: '#FFFFFF',
    color_2: '#000000',
    color_3: '#ED1C24',
    color_4: '#0088CB',
    color_5: '#FFCB05',
    color_6: '#727272',
    color_7: '#B0B0B0',
    color_8: '#FFFFFF',
    color_9: '#727272',
    color_10: '#B0B0B0',
    color_11: '#FFFFFF',
    color_12: '#FFFFFF',
    color_13: '#D9D9D9',
    color_14: '#101921',
    color_15: '#101921',
    color_16: '#E5F0FE',
    color_17: '#FEFEF8',
    color_18: '#0061B8',
    color_19: '#003A96',
    color_20: '#001D4B',
    color_21: '#F9C5B4',
    color_22: '#F3A78F',
    color_23: '#FEFEF8',
    color_24: '#9E3B1B',
    color_25: '#4F1D0E',
    color_26: '#D2ACF7',
    color_27: '#BA83F0',
    color_28: '#8015E8',
    color_29: '#550E9B',
    color_30: '#2B074D',
    color_31: '#B1D3BB',
    color_32: '#7FA88B',
    color_33: '#407C51',
    color_34: '#2B5336',
    color_35: '#15291B',
    color_36: '#FFFFFF',
    color_37: '#FCF9E2',
    color_38: '#FEFEF8',
    color_39: '#FEFCF1',
    color_40: '#FDFBE9',
    color_41: '#101921',
    color_42: '#0061B8',
    color_43: '#FF6E00',
    color_44: '#FF6200',
    color_45: '#101921',
    color_46: '#101921',
    color_47: '#FCF9E2',
    color_48: '#0061B8',
    color_49: '#0061B8',
    color_50: '#FFFFFF',
    color_51: '#101921',
    color_52: '#101921',
    color_53: '#FFFFFF',
    color_54: '#FDFBE9',
    color_55: '#FDFBE9',
    color_56: '#0061B8',
    color_57: '#FFFFFF',
    color_58: '#0061B8',
    color_59: '#0061B8',
    color_60: '#FEFEF8',
    color_61: '#FF6200',
    color_62: '#101921',
    color_63: '#FDFBE9',
    color_64: '#FDFBE9',
    color_65: '#FEFEF8',
  },
} as const;

export const typography = {
  fontFamily: {
    heading: "'Nunito Sans', 'nunito-sans', sans-serif",
    body: "'Nunito Sans Light', 'nunito-sans-light', sans-serif",
    accent: "'DIN Next W01 Light', sans-serif",
  },

  fontSize: {
    hero: '90px', // font_0
    h1: '64px', // font_2
    h2: '44px', // font_3
    h3: '32px', // font_4
    h4: '24px', // font_5
    h5: '20px', // font_6
    bodyLarge: '18px', // font_7
    body: '16px', // font_1, font_8
    bodySmall: '14px', // font_9
    caption: '12px', // font_10
  },

  lineHeight: {
    hero: '1em',
    h1: '1em',
    h2: '1.2em',
    h3: '1.3em',
    h4: '1.4em',
    h5: '1.4em',
    bodyLarge: '1.5em',
    body: '1.4em',
    bodySmall: '1.3em',
    caption: '1.4em',
  },

  fontWeight: {
    light: 300,
    normal: 400,
    bold: 700,
  },

  letterSpacing: {
    normal: '0em',
    wide: '0.05em',
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '80px',
  section: '80px',
  container: '1400px',
} as const;

export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '50%',
  pill: '300px',
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(16, 25, 33, 0.05)',
  md: '0 4px 6px rgba(16, 25, 33, 0.07)',
  lg: '0 10px 15px rgba(16, 25, 33, 0.1)',
  card: '0 2px 8px rgba(16, 25, 33, 0.08)',
} as const;

export const animation = {
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.6s',
    page: '0.6s',
    imageLoad: '0.8s',
  },
  easing: {
    default: 'cubic-bezier(0.37, 0, 0.63, 1)',
    smooth: 'cubic-bezier(0.83, 0, 0.17, 1)',
    bounce: 'cubic-bezier(0, 1, 0.5, 1)',
    outIn: 'cubic-bezier(0.22, 1, 0.36, 1)',
    slide: 'cubic-bezier(0.87, 0, 0.13, 1)',
  },
  spring: {
    default: { type: 'spring' as const, stiffness: 300, damping: 30 },
    gentle: { type: 'spring' as const, stiffness: 200, damping: 25 },
  },
} as const;

export const breakpoints = {
  xs: 320,
  sm: 375,
  md: 425,
  tablet: 768,
  desktop: 1400,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
  '3xl': 1920,
} as const;

export const grid = {
  containerWidth: '1400px',
  columns: 12,
  gutter: '20px',
  maxWidth: '9999px',
} as const;

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  header: 300,
  overlay: 400,
  modal: 500,
  toast: 600,
} as const;

export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
