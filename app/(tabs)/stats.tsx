import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useData } from '@/context/DataContext';
import { theme } from '@/constants/theme';
import StatsCard from '@/components/StatsCard';
import MagnitudeChart from '@/components/MagnitudeChart';
import TimeDistributionChart from '@/components/TimeDistributionChart';
import LoadingIndicator from '@/components/LoadingIndicator';
import FilterBar from '@/components/FilterBar';
import { Source } from '@/types/earthquake';
import { useState } from 'react';

export default function StatsScreen() {
  const { earthquakes, loading, source, setSource } = useData();
  const [sortOrder, setSortOrder] = useState<'time' | 'magnitude'>('time');

  if (loading) {
    return <LoadingIndicator />;
  }

  // Calculate statistics
  const totalCount = earthquakes.length;
  const averageMagnitude = totalCount > 0 
    ? earthquakes.reduce((sum, eq) => sum + eq.magnitude, 0) / totalCount 
    : 0;
  const maxMagnitude = totalCount > 0 
    ? Math.max(...earthquakes.map(eq => eq.magnitude)) 
    : 0;
  const averageDepth = totalCount > 0 
    ? earthquakes.reduce((sum, eq) => sum + eq.depth, 0) / totalCount 
    : 0;

  // Count earthquakes by magnitude range
  const magnitudeRanges = {
    '< 2.0': 0,
    '2.0-2.9': 0,
    '3.0-3.9': 0,
    '4.0-4.9': 0,
    '≥ 5.0': 0
  };

  earthquakes.forEach(eq => {
    if (eq.magnitude < 2.0) magnitudeRanges['< 2.0']++;
    else if (eq.magnitude < 3.0) magnitudeRanges['2.0-2.9']++;
    else if (eq.magnitude < 4.0) magnitudeRanges['3.0-3.9']++;
    else if (eq.magnitude < 5.0) magnitudeRanges['4.0-4.9']++;
    else magnitudeRanges['≥ 5.0']++;
  });

  const handleSourceChange = (newSource: Source) => {
    setSource(newSource);
  };

  return (
    <View style={styles.container}>
      <FilterBar 
        sortOrder={sortOrder} 
        onSortChange={setSortOrder} 
        source={source}
        onSourceChange={handleSourceChange}
        showSortOptions={false}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Son 150 Deprem İstatistikleri</Text>
        
        <View style={styles.statsGrid}>
          <StatsCard 
            title="Toplam Deprem" 
            value={totalCount.toString()} 
            icon="activity" 
          />
          <StatsCard 
            title="Ortalama Büyüklük" 
            value={averageMagnitude.toFixed(1)} 
            icon="bar-chart-2" 
          />
          <StatsCard 
            title="En Büyük Deprem" 
            value={maxMagnitude.toFixed(1)} 
            icon="zap" 
          />
          <StatsCard 
            title="Ortalama Derinlik" 
            value={`${averageDepth.toFixed(1)} km`} 
            icon="arrow-down" 
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Büyüklük Dağılımı</Text>
          <MagnitudeChart data={magnitudeRanges} />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Zaman Dağılımı</Text>
          <TimeDistributionChart earthquakes={earthquakes} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  chartContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  chartTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: 16,
  }
});