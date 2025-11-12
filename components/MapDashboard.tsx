
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
    const isInitializedRef = useRef(false);

    useEffect(() => {
        // This block runs only once when the component mounts with stations.
        if (!isInitializedRef.current && stations.length > 0) {
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
            setTimers(initialTimers);
            isInitializedRef.current = true;
            lastTimestampRef.current = Date.now();
        }

        const interval = setInterval(() => {
            if (!isInitializedRef.current) return;

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
                    
                    const inAlarm = (station.nivel > station.liga) || (station.nivel < station.desliga && anyOperationalPumpOn);
                    const wasInAlarm = station.id in prevTimers;

                    if (inAlarm) {
                        if (wasInAlarm) {
                            newTimers[station.id] = prevTimers[station.id] + deltaSeconds;
                        } else {
                            newTimers[station.id] = (station.tempo_alarme || 0) + deltaSeconds;
                        }
                        timersChanged = true;
                    } else {
                        if (wasInAlarm) {
                            delete newTimers[station.id];
                            timersChanged = true;
                        }
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
        <div className="grid gap-2 sm:gap-3 md:gap-4 pb-12 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
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
