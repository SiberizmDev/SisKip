import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { Earthquake } from '@/types/earthquake';
import { theme } from '@/constants/theme';

interface TimeDistributionChartProps {
  earthquakes: Earthquake[];
}

export default function TimeDistributionChart({ earthquakes }: TimeDistributionChartProps) {
  // Group earthquakes by hour
  const hourCounts: { [hour: string]: number } = {};
  
  // Initialize all hours
  for (let i = 0; i < 24; i++) {
    const hourString = i.toString().padStart(2, '0');
    hourCounts[hourString] = 0;
  }
  
  // Count earthquakes by hour
  earthquakes.forEach(eq => {
    const hour = format(new Date(eq.time), 'HH');
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });
  
  // Calculate max count for scaling
  const maxCount = Math.max(...Object.values(hourCounts));
  
  // Get current hour to highlight it
  const currentHour = format(new Date(), 'HH');
  
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {Object.entries(hourCounts).map(([hour, count]) => (
          <View key={hour} style={styles.hourColumn}>
            <View style={styles.barContainer}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: `${maxCount > 0 ? (count / maxCount) * 100 : 0}%`,
                    backgroundColor: hour === currentHour 
                      ? theme.colors.accent 
                      : theme.colors.magnitudeMedium,
                  }
                ]} 
              />
            </View>
            <Text 
              style={[
                styles.hourLabel,
                hour === currentHour && styles.currentHourLabel
              ]}
            >
              {hour}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.legendContainer}>
        <Text style={styles.legendText}>24 Saatlik Zaman Dağılımı</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    paddingHorizontal: 4,
  },
  hourColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    width: 6,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    backgroundColor: theme.colors.accent,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  hourLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: theme.colors.textTertiary,
    marginTop: 4,
  },
  currentHourLabel: {
    color: theme.colors.accent,
    fontFamily: 'Inter-Bold',
  },
  legendContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  legendText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
});