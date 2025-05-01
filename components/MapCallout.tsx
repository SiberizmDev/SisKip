import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Earthquake } from '@/types/earthquake';
import { theme } from '@/constants/theme';

interface MapCalloutProps {
  earthquake: Earthquake;
}

export default function MapCallout({ earthquake }: MapCalloutProps) {
  const formattedDate = format(new Date(earthquake.time), 'd MMMM, HH:mm', { locale: tr });
  
  return (
    <View style={styles.container}>
      <Text style={styles.location}>{earthquake.location}</Text>
      
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Büyüklük:</Text>
          <Text style={styles.detailValue}>{earthquake.magnitude.toFixed(1)}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Derinlik:</Text>
          <Text style={styles.detailValue}>{earthquake.depth} km</Text>
        </View>
      </View>
      
      <Text style={styles.dateText}>{formattedDate}</Text>
      
      <Text style={styles.sourceText}>
        Kaynak: {earthquake.source === 'kandilli' ? 'Kandilli' : 'USGS'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: 8,
  },
  location: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailItem: {
    flexDirection: 'row',
  },
  detailLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginRight: 4,
  },
  detailValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    color: theme.colors.textPrimary,
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.textTertiary,
    marginBottom: 4,
  },
  sourceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: theme.colors.textTertiary,
  },
});