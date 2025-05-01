import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { theme } from '@/constants/theme';

interface MagnitudeChartProps {
  data: {
    '< 2.0': number;
    '2.0-2.9': number;
    '3.0-3.9': number;
    '4.0-4.9': number;
    '≥ 5.0': number;
  };
}

export default function MagnitudeChart({ data }: MagnitudeChartProps) {
  const maxValue = Math.max(...Object.values(data));
  
  // Get bar colors based on magnitude range
  const getBarColor = (key: string) => {
    switch (key) {
      case '< 2.0':
        return theme.colors.magnitudeLow;
      case '2.0-2.9':
        return theme.colors.magnitudeMediumLow;
      case '3.0-3.9':
        return theme.colors.magnitudeMedium;
      case '4.0-4.9':
        return theme.colors.magnitudeHigh;
      case '≥ 5.0':
        return theme.colors.magnitudeVeryHigh;
      default:
        return theme.colors.accent;
    }
  };

  return (
    <View style={styles.container}>
      {Object.entries(data).map(([key, value]) => (
        <View key={key} style={styles.barContainer}>
          <Text style={styles.label}>{key}</Text>
          <View style={styles.barWrapper}>
            <View 
              style={[
                styles.bar, 
                { 
                  width: `${maxValue > 0 ? (value / maxValue) * 100 : 0}%`,
                  backgroundColor: getBarColor(key)
                }
              ]} 
            />
            <Text style={styles.value}>{value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.textSecondary,
    width: 70,
  },
  barWrapper: {
    flex: 1,
    height: 24,
    backgroundColor: theme.colors.backgroundTertiary,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  value: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.textPrimary,
    position: 'absolute',
    left: 8,
  },
});