import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '@/constants/theme';
import { AlertTriangle, Shield, Home, Package, Phone } from 'lucide-react-native';

interface InfoSection {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

export default function InfoScreen() {
  const sections: InfoSection[] = [
    {
      title: 'Deprem Anında Yapılması Gerekenler',
      icon: <AlertTriangle size={24} color={theme.colors.error} />,
      items: [
        'Panik yapmayın, sakin kalmaya çalışın',
        'Çök-Kapan-Tutun hareketini uygulayın',
        'Sağlam bir masa altına girin veya duvarın köşesine geçin',
        'Pencerelerden ve cam eşyalardan uzak durun',
        'Asansör kullanmayın',
        'Merdivenlere yönelmeyin',
      ],
    },
    {
      title: 'Deprem Sonrası Yapılması Gerekenler',
      icon: <Shield size={24} color={theme.colors.success} />,
      items: [
        'Binayı hızlıca ve güvenli şekilde terk edin',
        'Yangın ve gaz kaçağı kontrolü yapın',
        'Yaralılara yardım edin',
        'Resmi kurumların uyarılarını takip edin',
        'Artçı sarsıntılara karşı dikkatli olun',
        'Hasarlı binalara girmeyin',
      ],
    },
    {
      title: 'Deprem Çantasında Bulunması Gerekenler',
      icon: <Package size={24} color={theme.colors.warning} />,
      items: [
        'Su ve kuru gıda (en az 3 günlük)',
        'İlk yardım malzemeleri',
        'El feneri ve yedek piller',
        'Powerbank ve şarj kabloları',
        'Düdük ve küçük radyo',
        'Önemli evrakların kopyaları',
        'Hijyen malzemeleri',
      ],
    },
    {
      title: 'Ev İçi Hazırlıklar',
      icon: <Home size={24} color={theme.colors.accent} />,
      items: [
        'Eşyaları duvara sabitleyin',
        'Acil durum planı hazırlayın',
        'Toplanma alanlarını öğrenin',
        'Gaz ve su vanalarının yerini öğrenin',
        'Deprem çantası hazırlayın',
        'Aile içi iletişim planı yapın',
      ],
    },
    {
      title: 'Önemli Telefon Numaraları',
      icon: <Phone size={24} color={theme.colors.textSecondary} />,
      items: [
        'AFAD: 122',
        'Acil Çağrı: 112',
        'İtfaiye: 110',
        'Polis İmdat: 155',
        'Jandarma: 156',
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.sectionHeader}>
            {section.icon}
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          <View style={styles.itemsContainer}>
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.itemRow}>
                <View style={styles.bullet} />
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  section: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: theme.colors.textPrimary,
    marginLeft: 12,
  },
  itemsContainer: {
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.textSecondary,
    marginTop: 8,
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
}); 