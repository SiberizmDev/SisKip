import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface MagnitudeIndicatorProps {
  magnitude: number;
  size?: 'normal' | 'large';
}

export default function MagnitudeIndicator({ magnitude, size = 'normal' }: MagnitudeIndicatorProps) {
  // Determine color based on magnitude
  const getColor = () => {
    if (magnitude < 2.0) return theme.colors.magnitudeLow;
    if (magnitude < 4.0) return theme.colors.magnitudeMedium;
    if (magnitude < 5.0) return theme.colors.magnitudeHigh;
    return theme.colors.magnitudeVeryHigh;
  };
  
  const containerStyle = [
    styles.container,
    { backgroundColor: getColor() },
    size === 'large' && styles.containerLarge
  ];

  const textStyle = [
    styles.text,
    size === 'large' && styles.textLarge
  ];
  
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{magnitude.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.magnitudeMedium,
  },
  containerLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  text: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  textLarge: {
    fontSize: 24,
  },
});