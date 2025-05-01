import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { useData } from '@/context/DataContext';
import EarthquakeItem from '@/components/EarthquakeItem';
import FilterBar from '@/components/FilterBar';
import EmptyState from '@/components/EmptyState';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Earthquake, Source } from '@/types/earthquake';
import { theme } from '@/constants/theme';

export default function ListScreen() {
  const { 
    earthquakes, 
    loading, 
    error, 
    fetchEarthquakes,
    source,
    setSource
  } = useData();
  const [filteredEarthquakes, setFilteredEarthquakes] = useState<Earthquake[]>([]);
  const [sortOrder, setSortOrder] = useState<'time' | 'magnitude'>('time');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Apply sorting
    let sorted = [...earthquakes];
    if (sortOrder === 'time') {
      sorted.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    } else {
      sorted.sort((a, b) => b.magnitude - a.magnitude);
    }
    setFilteredEarthquakes(sorted);
  }, [earthquakes, sortOrder]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEarthquakes();
    setRefreshing(false);
  };

  const handleSortChange = (newSortOrder: 'time' | 'magnitude') => {
    setSortOrder(newSortOrder);
  };

  const handleSourceChange = (newSource: Source) => {
    setSource(newSource);
  };

  if (loading && !refreshing) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <FilterBar 
        sortOrder={sortOrder} 
        onSortChange={handleSortChange} 
        source={source}
        onSourceChange={handleSourceChange}
      />
      
      {error ? (
        <EmptyState 
          title="Veri Yüklenemedi" 
          message={error} 
          buttonText="Tekrar Dene"
          onPress={fetchEarthquakes}
        />
      ) : filteredEarthquakes.length === 0 ? (
        <EmptyState 
          title="Deprem Bulunamadı" 
          message="Son 24 saat içinde Türkiye'de kaydedilmiş deprem bulunmamaktadır." 
          buttonText="Yenile"
          onPress={fetchEarthquakes}
        />
      ) : (
        <FlatList
          data={filteredEarthquakes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EarthquakeItem earthquake={item} />}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              tintColor={theme.colors.accent}
              colors={[theme.colors.accent]}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 8,
  }
});