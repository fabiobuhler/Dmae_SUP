
import React, { useState, useEffect, useRef } from 'react';
import type { Station } from '../types';
import StationCard from './StationCard';

interface MapDashboardProps {
  stations: Station[];
}

const ALARM_LIMIT_SECONDS = 60;

const usePersistentTimers = (stations: Station[]) => {
    const [timers, setTimers] = useState<Record<string, number>>({});
    const lastTimestampRef = useRef<number>(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const deltaSeconds = (now - lastTimestampRef.current) / 1000;
            lastTimestampRef.current = now;

            setTimers(prevTimers => {
                const newTimers = { ...prevTimers };
                let timersChanged = false;

                stations.forEach(station => {
                    const anyPumpOn = station.bombas.some(b => b === 1);
                    const allPumpsOff = station.bombas.filter(b => b !== null).every(b => b === 0);
                    
                    const isHighAlarm = station.nivel > station.superior && allPumpsOff;
                    const isLowAlarm = station.nivel < station.inferior && anyPumpOn;
                    const inAlarm = isHighAlarm || isLowAlarm;

                    if (inAlarm) {
                        const newTime = (newTimers[station.id] || station.tempo_alarme || 0) + deltaSeconds;
                        if (newTimers[station.id] !== newTime) {
                           newTimers[station.id] = newTime;
                           timersChanged = true;
                        }
                    } else if (newTimers[station.id] !== undefined) {
                        delete newTimers[station.id];
                        timersChanged = true;
                    }
                });
                
                return timersChanged ? newTimers : prevTimers;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [stations]);

    return timers;
};

const MapDashboard: React.FC<MapDashboardProps> = ({ stations }) => {
    const timers = usePersistentTimers(stations);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-12">
            {stations.map(station => {
                const alarmTime = timers[station.id] || 0;
                let alertLevel: 'none' | 'yellow' | 'red' = 'none';
                if (alarmTime > 0 && alarmTime < ALARM_LIMIT_SECONDS) {
                    alertLevel = 'yellow';
                } else if (alarmTime >= ALARM_LIMIT_SECONDS) {
                    alertLevel = 'red';
                }

                return (
                    <StationCard key={station.id} station={station} alertLevel={alertLevel} alarmTime={alarmTime} />
                );
            })}
        </div>
    );
};

export default MapDashboard;
