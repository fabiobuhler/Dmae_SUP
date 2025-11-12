
import React from 'react';
import type { Station } from '../types';

interface StationCardProps {
  station: Station;
  alertLevel: 'none' | 'yellow' | 'red';
  alarmTime: number;
}

const pctFromLevel = (level: number, sup: number, inf: number): number => {
  if (sup === inf) return 50;
  const percentage = ((level - inf) / (sup - inf)) * 100;
  return Math.max(0, Math.min(100, percentage));
};

const StationCard: React.FC<StationCardProps> = ({ station, alertLevel, alarmTime }) => {
  const { nome, nivel, bombas, bombas_manutencao, liga, desliga, superior, inferior, em_bateria } = station;
  const levelPercentage = pctFromLevel(nivel, superior, inferior);

  const ligaPercent = pctFromLevel(liga, superior, inferior);
  const desligaPercent = pctFromLevel(desliga, superior, inferior);

  const alertClasses = {
    yellow: 'border-yellow-400 animate-pulseYellow',
    red: 'border-red-500 animate-pulseRed',
    none: 'border-slate-200'
  };
  
  const levelBadgeAlertClasses = {
      yellow: 'bg-yellow-100 border-yellow-400 text-yellow-800',
      red: 'bg-red-100 border-red-500 text-red-800',
      none: 'bg-white border-slate-300 text-blue-600'
  };

  // When the level is high, the level badge and timer can overlap.
  // This flag helps move the timer down to avoid the collision.
  const isLevelHighForTimer = levelPercentage > 75;

  return (
    <div className={`relative bg-white rounded-lg shadow-md p-2 flex flex-col gap-2 border ${alertClasses[alertLevel]} transition-all`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xs font-bold text-slate-700 truncate text-center flex-grow">{nome}</h2>
          {em_bateria && (
              <div title="On Battery Power" className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-md flex items-center justify-center animate-pulseYellow border-2 border-transparent">
                  <span className="text-black font-bold text-sm">B</span>
              </div>
          )}
        </div>
        
        <div className="relative h-28 bg-slate-50 rounded-md border border-slate-200 overflow-hidden">
          {/* Top out-of-operation zone */}
          <div
            className="absolute top-0 w-full bg-slate-300/70"
            style={{ height: `${100 - ligaPercent}%` }}
          />
          {/* Bottom out-of-operation zone */}
          <div
            className="absolute bottom-0 w-full bg-slate-300/70"
            style={{ height: `${desligaPercent}%` }}
          />
          
          {/* Operational Threshold Arrows */}
          <div className="absolute left-1 w-full" style={{ top: `${100 - pctFromLevel(liga, superior, inferior)}%`, transform: 'translateY(-50%)' }}>
            <div className="flex items-center gap-1 text-red-500 text-[10px] leading-none">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[5px] border-l-red-500"></div>
              <span>{liga.toFixed(2)}</span>
            </div>
          </div>
          <div className="absolute left-1 w-full" style={{ top: `${100 - pctFromLevel(desliga, superior, inferior)}%`, transform: 'translateY(-50%)' }}>
            <div className="flex items-center gap-1 text-red-500 text-[10px] leading-none">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[5px] border-l-red-500"></div>
              <span>{desliga.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Water Level */}
          <div className="absolute right-0 bottom-0 w-[35%] bg-gradient-to-t from-blue-500 to-blue-300 border-l border-slate-200 transition-all duration-500" style={{ height: `${levelPercentage}%` }}></div>
          
          {/* Level Badge */}
          <div
            className={`absolute right-1 px-1.5 py-0.5 text-xs font-bold rounded-md border transition-all duration-500 ${levelBadgeAlertClasses[alertLevel]}`}
            style={{
              top: `clamp(0.75rem, ${100 - levelPercentage}%, calc(100% - 1.25rem))`,
              transform: 'translateY(-50%)',
            }}
          >
            {nivel.toFixed(2)}m
          </div>

          {/* Alarm Timer Badge */}
          {alertLevel !== 'none' && (
            <div className={`absolute right-1 px-1.5 py-0.5 text-[10px] font-semibold bg-white border border-slate-300 rounded-md text-slate-600 transition-all duration-300 ${isLevelHighForTimer ? 'top-8' : 'top-1'}`}>
              ⏱ {Math.floor(alarmTime)}s
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 justify-center">
          {bombas.map((b, i) => (
            <div key={i} className={`w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold
              ${bombas_manutencao[i] ? 'bg-yellow-400 text-black' : 'text-white'}
              ${!bombas_manutencao[i] && b === 1 ? 'bg-red-500' : ''}
              ${!bombas_manutencao[i] && b === 0 ? 'bg-green-500' : ''}
              ${!bombas_manutencao[i] && b === null ? 'bg-slate-200 text-slate-500 border border-slate-300' : ''}`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StationCard;