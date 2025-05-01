import axios from 'axios';
import { Earthquake } from '@/types/earthquake';

interface KandilliEarthquakeResponse {
  result: Array<{
    earthquake_id: string;
    title: string;
    date: string;
    mag: number;
    depth: number;
    geojson: {
      coordinates: [number, number]; // [longitude, latitude]
    };
  }>;
}

// Kandilli Observatory Earthquake API
export const fetchKandilliEarthquakes = async (): Promise<Earthquake[]> => {
  try {
    const response = await axios.get<KandilliEarthquakeResponse>('https://api.orhanaydogdu.com.tr/deprem/kandilli/live');

    if (!response.data || !response.data.result) {
      throw new Error('Kandilli verisi alınamadı');
    }

    return response.data.result
      .map((eq) => {
        try {
          // API'den gelen tarih formatı: YYYY.MM.DD HH:mm:ss
          // Tarihi ISO formatına çevirelim
          const formattedDate = eq.date.replace(/\./g, '-');
          const datetime = new Date(formattedDate);

          if (isNaN(datetime.getTime())) {
            console.warn('Geçersiz tarih:', eq.date);
            return null;
          }

          const magnitude = eq.mag;
          const depth = eq.depth;
          const latitude = eq.geojson.coordinates[1];
          const longitude = eq.geojson.coordinates[0];

          const earthquake: Earthquake = {
            id: `kandilli-${datetime.getTime()}-${eq.earthquake_id}`,
            magnitude,
            depth,
            latitude,
            longitude,
            location: eq.title,
            time: datetime.toISOString(),
            source: 'kandilli'
          };

          return earthquake;
        } catch (err) {
          console.warn('Deprem verisi işlenirken hata:', err);
          return null;
        }
      })
      .filter((eq): eq is Earthquake => eq !== null);

  } catch (error) {
    console.error('Kandilli verisi alınırken hata:', error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Kandilli servisine bağlanırken zaman aşımı oluştu. Lütfen tekrar deneyin.');
      }
      const message = error.response?.status === 404 
        ? 'Kandilli servisi şu anda erişilemez durumda.'
        : error.response?.status === 429
        ? 'Çok fazla istek gönderildi. Lütfen biraz bekleyin.'
        : 'Kandilli verilerine erişilemiyor.';
      throw new Error(message);
    }
    throw new Error('Kandilli depremleri alınamadı. Lütfen daha sonra tekrar deneyin.');
  }
};

// USGS Earthquake API
export const fetchUSGSEarthquakes = async (): Promise<Earthquake[]> => {
  try {
    const response = await axios.get(
      'https://earthquake.usgs.gov/fdsnws/event/1/query',
      {
        params: {
          format: 'geojson',
          limit: 150,
          minlatitude: 35.9025,
          maxlatitude: 42.1025, 
          minlongitude: 25.9,
          maxlongitude: 44.9,
          minmagnitude: 1.0,
          orderby: 'time',
        },
      }
    );

    return response.data.features.map((feature: any) => ({
      id: `usgs-${feature.id}`,
      magnitude: feature.properties.mag,
      depth: feature.geometry.coordinates[2],
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
      location: feature.properties.place || 'Bilinmiyor',
      time: new Date(feature.properties.time).toISOString(),
      source: 'usgs',
    }));
  } catch (error) {
    console.error('Error fetching USGS data:', error);
    throw new Error('USGS depremleri alınamadı.');
  }
};