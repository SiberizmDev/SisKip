export const theme = {
  colors: {
    // Base colors
    backgroundPrimary: '#121212',
    backgroundSecondary: '#1E1E1E',
    backgroundTertiary: '#2A2A2A',
    background: '#121212', // Ana arka plan rengi
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#737373',
    border: '#2A2A2A',
    white: '#FFFFFF',
    black: '#000000',
    
    // Accent colors
    accent: '#FF6B6B',
    
    // Status colors
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    
    // Magnitude colors (gradient from yellow to red)
    magnitudeLow: '#4CAF50',       // < 2.0
    magnitudeMedium: '#FFC107',    // 2.0-2.9
    magnitudeHigh: '#FF5722',       // 4.0-4.9
    magnitudeVeryHigh: '#F44336',  // ≥ 5.0
  },
  
  // Border radii
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16,
  },
  
  // Spacing
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Typography sizing
  typography: {
    fontSize: {
      xs: 10,
      s: 12,
      m: 14,
      l: 16,
      xl: 18,
      xxl: 20,
      xxxl: 24,
    },
  },
};