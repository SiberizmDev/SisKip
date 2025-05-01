import { View, StyleSheet, Animated } from 'react-native';
import { useRef, useEffect } from 'react';
import { Earthquake } from '@/types/earthquake';
import { theme } from '@/constants/theme';
import MagnitudeIndicator from './MagnitudeIndicator';

interface EarthquakeMarkerProps {
  earthquake: Earthquake;
}

export default function EarthquakeMarker({ earthquake }: EarthquakeMarkerProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Animate pulse effect for recent earthquakes
  useEffect(() => {
    const isRecent = new Date().getTime() - new Date(earthquake.time).getTime() < 3 * 60 * 60 * 1000;
    
    if (isRecent) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, []);

  // Determine size based on magnitude
  const getSize = () => {
    if (earthquake.magnitude < 2.0) return 'small';
    if (earthquake.magnitude < 4.0) return 'medium';
    return 'large';
  };

  return (
    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
      <MagnitudeIndicator 
        magnitude={earthquake.magnitude} 
        size={getSize()} 
      />
    </Animated.View>
  );
}