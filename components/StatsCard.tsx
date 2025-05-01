import { View, Text, StyleSheet } from 'react-native';
import { Activity, BarChart2, Zap, ArrowDown } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface StatsCardProps {
  title: string;
  value: string;
  icon: 'activity' | 'bar-chart-2' | 'zap' | 'arrow-down';
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'activity':
        return <Activity size={24} color={theme.colors.accent} />;
      case 'bar-chart-2':
        return <BarChart2 size={24} color={theme.colors.accent} />;
      case 'zap':
        return <Zap size={24} color={theme.colors.accent} />;
      case 'arrow-down':
        return <ArrowDown size={24} color={theme.colors.accent} />;
      default:
        return <Activity size={24} color={theme.colors.accent} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${theme.colors.accent}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  value: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});