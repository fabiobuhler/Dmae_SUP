
import { useState, useEffect, useCallback } from 'react';
import type { Station } from '../types';
import { initialStationData } from '../data/initialData';

const STORAGE_KEY = 'dmae_mock_data_react';

export const useStationData = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setStations(JSON.parse(storedData));
      } else {
        setStations(initialStationData);
      }
    } catch (error) {
      console.error("Failed to load station data from localStorage", error);
      setStations(initialStationData);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStation = useCallback((id: number, field: keyof Station, value: any) => {
    setStations(prevStations =>
      prevStations.map(station =>
        station.id === id ? { ...station, [field]: value } : station
      )
    );
  }, []);
  
  const saveStations = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stations));
      alert('Changes saved successfully!');
    } catch (error) {
      console.error("Failed to save station data to localStorage", error);
      alert('Error saving changes.');
    }
  }, [stations]);

  return { stations, setStations, loading, updateStation, saveStations };
};
