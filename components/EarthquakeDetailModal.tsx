import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { MapPin, Clock, Activity, ArrowDown, X, ExternalLink } from 'lucide-react-native';
import { Earthquake } from '@/types/earthquake';
import { theme } from '@/constants/theme';
import MagnitudeIndicator from './MagnitudeIndicator';

interface EarthquakeDetailModalProps {
  earthquake: Earthquake | null;
  visible: boolean;
  onClose: () => void;
}

export default function EarthquakeDetailModal({ 
  earthquake, 
  visible, 
  onClose 
}: EarthquakeDetailModalProps) {
  if (!earthquake) return null;

  const formattedDate = format(new Date(earthquake.time), 'd MMMM yyyy, HH:mm:ss', { locale: tr });

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${earthquake.latitude},${earthquake.longitude}`;
    Linking.openURL(url);
  };

  const openKandilliPage = () => {
    const url = 'http://www.koeri.boun.edu.tr/scripts/lasteq.asp';
    Linking.openURL(url);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
              <MagnitudeIndicator magnitude={earthquake.magnitude} size="large" />
              <View style={styles.headerText}>
                <Text style={styles.title}>Deprem Detayları</Text>
                <Text style={styles.source}>
                  {earthquake.source === 'kandilli' ? 'Kandilli Rasathanesi' : 'USGS'}
                </Text>
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <MapPin size={20} color={theme.colors.textSecondary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Lokasyon</Text>
                  <Text style={styles.detailValue}>{earthquake.location}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Activity size={20} color={theme.colors.textSecondary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Büyüklük</Text>
                  <Text style={styles.detailValue}>{earthquake.magnitude.toFixed(1)}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <ArrowDown size={20} color={theme.colors.textSecondary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Derinlik</Text>
                  <Text style={styles.detailValue}>{earthquake.depth.toFixed(1)} km</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Clock size={20} color={theme.colors.textSecondary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Zaman</Text>
                  <Text style={styles.detailValue}>{formattedDate}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <MapPin size={20} color={theme.colors.textSecondary} />
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Koordinatlar</Text>
                  <Text style={styles.detailValue}>
                    {earthquake.latitude.toFixed(4)}°N, {earthquake.longitude.toFixed(4)}°E
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton} onPress={openMap}>
                <ExternalLink size={20} color={theme.colors.accent} />
                <Text style={styles.actionButtonText}>Haritada Göster</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={openKandilliPage}>
                <ExternalLink size={20} color={theme.colors.accent} />
                <Text style={styles.actionButtonText}>Kandilli Sayfasına Git</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '80%',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  scrollView: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  source: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.textSecondary,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  detailTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: theme.colors.textPrimary,
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: theme.colors.accent,
  },
}); 