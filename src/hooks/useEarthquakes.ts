import { useState, useEffect } from 'react';
import { EarthquakeResponse, Earthquake } from '../types/earthquake';

const USGS_API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

export const useEarthquakes = () => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchEarthquakes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(USGS_API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: EarthquakeResponse = await response.json();
      
      // Sort earthquakes by time (most recent first)
      const sortedEarthquakes = data.features.sort(
        (a, b) => b.properties.time - a.properties.time
      );
      
      setEarthquakes(sortedEarthquakes);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch earthquake data');
      console.error('Error fetching earthquakes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
  }, []);

  return {
    earthquakes,
    loading,
    error,
    lastUpdated,
    refetch: fetchEarthquakes
  };
};