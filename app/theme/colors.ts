export const palette = {
  // Base colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0056B3',
  primaryLight: '#47A3FF',
  
  // Secondary colors
  secondary: '#5856D6',
  secondaryDark: '#3634A3',
  secondaryLight: '#7A79E9',
  
  // Grayscale
  gray100: '#F7F7F7',
  gray200: '#E6E6E6',
  gray300: '#D4D4D4',
  gray400: '#A3A3A3',
  gray500: '#737373',
  gray600: '#525252',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#171717',
  
  // Status colors
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FFCC00',
  info: '#5856D6',

  // Map marker colors
  markerRestaurant: '#4CAF50',
  markerCafe: '#FF9800',
  markerGasStation: '#795548',
  markerBank: '#2196F3',
  markerPharmacy: '#F44336',
  markerLodging: '#9C27B0',
  markerPark: '#8BC34A',
  markerGym: '#FF5722',
  markerHospital: '#E91E63',
  markerShoppingMall: '#3F51B5',
} as const;

export const colors = {
  // Text colors
  text: {
    primary: palette.gray900,
    secondary: palette.gray600,
    disabled: palette.gray400,
    inverse: palette.white,
  },
  
  // Background colors
  background: {
    primary: palette.white,
    secondary: palette.gray100,
    tertiary: palette.gray200,
  },
  
  // Border colors
  border: {
    light: palette.gray200,
    medium: palette.gray300,
    dark: palette.gray400,
  },
  
  // Status colors
  status: {
    success: palette.success,
    error: palette.error,
    warning: palette.warning,
    info: palette.info,
  },
} as const;
