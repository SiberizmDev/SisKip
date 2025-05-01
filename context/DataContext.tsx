import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { fetchKandilliEarthquakes, fetchUSGSEarthquakes } from '@/services/earthquakeService';
import { Earthquake, Source } from '@/types/earthquake';

interface DataContextProps {
  earthquakes: Earthquake[];
  loading: boolean;
  error: string | null;
  fetchEarthquakes: () => Promise<void>;
  source: Source;
  setSource: (source: Source) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<Source>('all');

  const fetchEarthquakes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let combinedEarthquakes: Earthquake[] = [];
      
      if (source === 'all' || source === 'kandilli') {
        const kandilliData = await fetchKandilliEarthquakes();
        combinedEarthquakes = [...combinedEarthquakes, ...kandilliData];
      }
      
      if (source === 'all' || source === 'usgs') {
        const usgsData = await fetchUSGSEarthquakes();
        // Filter out USGS earthquakes that might overlap with Kandilli data
        const filteredUsgsData = usgsData.filter(usgsEq => {
          if (source === 'usgs') return true;
          
          // For 'all' source, check if this earthquake is already reported by Kandilli
          return !combinedEarthquakes.some(kandilliEq => {
            const timeDiff = Math.abs(
              new Date(usgsEq.time).getTime() - new Date(kandilliEq.time).getTime()
            );
            const distDiff = Math.sqrt(
              Math.pow(usgsEq.latitude - kandilliEq.latitude, 2) +
              Math.pow(usgsEq.longitude - kandilliEq.longitude, 2)
            );
            // If time difference is less than 5 minutes and distance is less than 0.1 degrees
            return timeDiff < 5 * 60 * 1000 && distDiff < 0.1;
          });
        });
        combinedEarthquakes = [...combinedEarthquakes, ...filteredUsgsData];
      }
      
      // Sort by time (newest first)
      combinedEarthquakes.sort((a, b) => 
        new Date(b.time).getTime() - new Date(a.time).getTime()
      );
      
      setEarthquakes(combinedEarthquakes);
    } catch (err) {
      console.error('Error fetching earthquake data:', err);
      setError('Deprem verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
  }, [source]);

  return (
    <DataContext.Provider
      value={{
        earthquakes,
        loading,
        error,
        fetchEarthquakes,
        source,
        setSource
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};