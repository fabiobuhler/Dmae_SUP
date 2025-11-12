import { useState, useEffect, useCallback } from 'react';
import type { Station } from '../types';
import { initialStationData } from '../data/initialData';

const STORAGE_KEY = 'dmae_mock_data_react';

const processStationData = (stations: Station[]): Station[] => {
  return stations.map(station => {
    const operationalRange = station.liga - station.desliga;
    if (operationalRange > 0) {
      return {
        ...station,
        superior: station.liga + 0.5 * operationalRange,
        inferior: station.desliga - 0.5 * operationalRange,
      };
    }
    return station; // Return as-is if liga/desliga is invalid to avoid breaking data
  });
};

export const useStationData = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      const rawData = storedData ? JSON.parse(storedData) : initialStationData;
      setStations(processStationData(rawData));
    } catch (error) {
      console.error("Failed to load station data from localStorage", error);
      setStations(processStationData(initialStationData));
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStation = useCallback((id: number, field: keyof Station, value: any) => {
    setStations(prevStations =>
      prevStations.map(station => {
        if (station.id === id) {
            const updatedStation = { ...station, [field]: value };
            
            if (field === 'liga' || field === 'desliga') {
                const operationalRange = updatedStation.liga - updatedStation.desliga;
                if (operationalRange > 0) {
                    updatedStation.superior = updatedStation.liga + 0.5 * operationalRange;
                    updatedStation.inferior = updatedStation.desliga - 0.5 * operationalRange;
                }
            }
            return updatedStation;
        }
        return station;
      })
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
