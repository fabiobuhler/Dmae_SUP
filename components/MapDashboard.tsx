import React, { useState, useEffect, useRef } from 'react';
import type { Station } from '../types';
import StationCard from './StationCard';

interface MapDashboardProps {
  stations: Station[];
}

const ALARM_LIMIT_SECONDS = 60;

const usePersistentTimers = (stations: Station[]) => {
    const [timers, setTimers] = useState<Record<string, number>>(() => {
        const initialTimers: Record<string, number> = {};
        stations.forEach(station => {
            const operationalPumps = station.bombas
                .map((b, i) => ({ status: b, inMaintenance: station.bombas_manutencao[i] }))
                .filter(p => p.status !== null && !p.inMaintenance);

            const anyOperationalPumpOn = operationalPumps.some(p => p.status === 1);
            
            const inAlarm = (station.nivel > station.liga) || (station.nivel < station.desliga && anyOperationalPumpOn);

            if (inAlarm) {
                initialTimers[station.id] = station.tempo_alarme || 0;
            }
        });
        return initialTimers;
    });

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
                    const operationalPumps = station.bombas
                        .map((b, i) => ({ status: b, inMaintenance: station.bombas_manutencao[i] }))
                        .filter(p => p.status !== null && !p.inMaintenance);

                    const anyOperationalPumpOn = operationalPumps.some(p => p.status === 1);
                    
                    // An alarm is triggered if the level is above the 'liga' threshold,
                    // or if the level is below the 'desliga' threshold while operational pumps are still running.
                    const inAlarm = (station.nivel > station.liga) || (station.nivel < station.desliga && anyOperationalPumpOn);

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
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 pb-12">
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