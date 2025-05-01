export type Source = 'kandilli' | 'usgs' | 'all';

export interface Earthquake {
  id: string;
  magnitude: number;
  depth: number;
  latitude: number;
  longitude: number;
  location: string;
  time: string;
  source: 'kandilli' | 'usgs';
}