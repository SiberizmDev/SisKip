import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { MapPin, Clock } from 'lucide-react-native';
import { Earthquake } from '@/types/earthquake';
import { theme } from '@/constants/theme';
import MagnitudeIndicator from './MagnitudeIndicator';
import EarthquakeDetailModal from './EarthquakeDetailModal';

interface EarthquakeItemProps {
  earthquake: Earthquake;
}

export default function EarthquakeItem({ earthquake }: EarthquakeItemProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.97)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Format date
  const formattedDate = format(new Date(earthquake.time), 'd MMMM, HH:mm', { locale: tr });
  
  // Determine relative time
  const getRelativeTime = () => {
    const now = new Date();
    const eqTime = new Date(earthquake.time);
    const diffInMinutes = Math.floor((now.getTime() - eqTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} dakika önce`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours} saat önce`;
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays} gün önce`;
      }
    }
  };

  // Determine if earthquake is recent (< 3 hours)
  const isRecent = new Date().getTime() - new Date(earthquake.time).getTime() < 3 * 60 * 60 * 1000;

  return (
    <>
      <TouchableOpacity 
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Animated.View 
          style={[
            styles.container, 
            { 
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            }
          ]}
        >
          <View style={styles.leftContainer}>
            <MagnitudeIndicator magnitude={earthquake.magnitude} />
          </View>
          
          <View style={styles.contentContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.location} numberOfLines={1}>
                {earthquake.location}
              </Text>
              {isRecent && <View style={styles.recentIndicator} />}
            </View>
            
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <MapPin size={14} color={theme.colors.textSecondary} />
                <Text style={styles.detailText}>{earthquake.depth} km derinlik</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Clock size={14} color={theme.colors.textSecondary} />
                <Text style={styles.detailText}>{getRelativeTime()}</Text>
              </View>
            </View>
            
            <Text style={styles.dateText}>{formattedDate}</Text>
            
            <View style={styles.sourceContainer}>
              <Text style={styles.sourceText}>
                {earthquake.source === 'kandilli' ? 'Kandilli' : 'USGS'}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>

      <EarthquakeDetailModal
        earthquake={earthquake}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 120,
  },
  leftContainer: {
    marginRight: 16,
    justifyContent: 'center',
    minWidth: 60,
    paddingVertical: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingRight: 40,
  },
  location: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: theme.colors.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  recentIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accent,
    marginLeft: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 3,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    minWidth: 200,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginLeft: 4,
    lineHeight: 18,
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.textTertiary,
    marginTop: 4,
  },
  sourceContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundTertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  sourceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: theme.colors.textTertiary,
  },
});