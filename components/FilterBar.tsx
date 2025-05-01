import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Filter, ArrowDown, Clock, Database } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { Source } from '@/types/earthquake';

interface FilterBarProps {
  sortOrder: 'time' | 'magnitude';
  onSortChange: (sortOrder: 'time' | 'magnitude') => void;
  source: Source;
  onSourceChange: (source: Source) => void;
  showSortOptions?: boolean;
}

export default function FilterBar({ 
  sortOrder, 
  onSortChange, 
  source, 
  onSourceChange,
  showSortOptions = true 
}: FilterBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.filterSection}>
        <Filter size={16} color={theme.colors.textSecondary} />
        <Text style={styles.sectionTitle}>Kaynak:</Text>
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.sourceButton,
              source === 'all' && styles.activeButton
            ]}
            onPress={() => onSourceChange('all')}
          >
            <Text 
              style={[
                styles.buttonText,
                source === 'all' && styles.activeButtonText
              ]}
            >
              Tümü
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.sourceButton,
              source === 'kandilli' && styles.activeButton
            ]}
            onPress={() => onSourceChange('kandilli')}
          >
            <Text 
              style={[
                styles.buttonText,
                source === 'kandilli' && styles.activeButtonText
              ]}
            >
              Kandilli
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.sourceButton,
              source === 'usgs' && styles.activeButton
            ]}
            onPress={() => onSourceChange('usgs')}
          >
            <Text 
              style={[
                styles.buttonText,
                source === 'usgs' && styles.activeButtonText
              ]}
            >
              USGS
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {showSortOptions && (
        <View style={styles.filterSection}>
          <ArrowDown size={16} color={theme.colors.textSecondary} />
          <Text style={styles.sectionTitle}>Sırala:</Text>
          
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortOrder === 'time' && styles.activeButton
              ]}
              onPress={() => onSortChange('time')}
            >
              <Clock size={14} color={sortOrder === 'time' ? theme.colors.accent : theme.colors.textSecondary} />
              <Text 
                style={[
                  styles.buttonText,
                  sortOrder === 'time' && styles.activeButtonText
                ]}
              >
                Zaman
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortOrder === 'magnitude' && styles.activeButton
              ]}
              onPress={() => onSortChange('magnitude')}
            >
              <Database size={14} color={sortOrder === 'magnitude' ? theme.colors.accent : theme.colors.textSecondary} />
              <Text 
                style={[
                  styles.buttonText,
                  sortOrder === 'magnitude' && styles.activeButtonText
                ]}
              >
                Büyüklük
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginLeft: 6,
    marginRight: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  sourceButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: theme.colors.backgroundTertiary,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: theme.colors.backgroundTertiary,
  },
  activeButton: {
    backgroundColor: `${theme.colors.accent}20`,
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  activeButtonText: {
    color: theme.colors.accent,
  },
});