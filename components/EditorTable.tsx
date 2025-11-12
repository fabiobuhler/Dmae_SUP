import React from 'react';
import type { Station } from '../types';

interface EditorTableProps {
  stations: Station[];
  onUpdate: (id: number, field: keyof Station, value: any) => void;
  onSave: () => void;
}

const EditorTable: React.FC<EditorTableProps> = ({ stations, onUpdate, onSave }) => {

  const handleBombasTextChange = (id: number, value: string) => {
    const newBombas = value.split(',').map(s => {
      const trimmed = s.trim().toLowerCase();
      if (trimmed === 'null' || trimmed === '') return null;
      const num = parseInt(trimmed, 10);
      // Ensure only 1 or 0 are stored for active pumps
      return isNaN(num) ? null : (num === 1 ? 1 : 0);
    });
    onUpdate(id, 'bombas', newBombas);
  };

  const handleInputChange = (id: number, field: keyof Station, value: string) => {
    const numValue = parseFloat(value);
    // Allow input to be temporarily empty or just a minus sign without updating state yet
    if (value === '' || value === '-') {
       onUpdate(id, field, value); // Pass string to allow partial input
       return;
    }
    if (!isNaN(numValue)) {
      onUpdate(id, field, numValue);
    }
  };
  
  const handleBombasToggle = (stationId: number, pumpIndex: number) => {
    const station = stations.find(s => s.id === stationId);
    if (!station) return;

    const newBombas = [...station.bombas];
    const currentStatus = newBombas[pumpIndex];

    if (currentStatus !== null && !station.bombas_manutencao[pumpIndex]) {
        newBombas[pumpIndex] = currentStatus === 1 ? 0 : 1;
        onUpdate(stationId, 'bombas', newBombas);
    }
  };

  const handleBombasMaintenanceToggle = (stationId: number, pumpIndex: number) => {
    const station = stations.find(s => s.id === stationId);
    if (!station) return;
    
    const newBombasManutencao = [...station.bombas_manutencao];
    newBombasManutencao[pumpIndex] = !newBombasManutencao[pumpIndex];
    onUpdate(stationId, 'bombas_manutencao', newBombasManutencao);
  }


  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">EBAP</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nível (m)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Liga</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Desliga</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Superior</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Inferior</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tempo Alarme (s)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Bateria</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Bombas</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {stations.map(station => (
              <tr key={station.id}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">{station.nome}</td>
                <td><input type="number" step="0.01" value={station.nivel} onChange={(e) => handleInputChange(station.id, 'nivel', e.target.value)} className="w-24 p-1 border rounded-md border-slate-300"/></td>
                <td><input type="number" step="0.01" value={station.liga} onChange={(e) => handleInputChange(station.id, 'liga', e.target.value)} className="w-24 p-1 border rounded-md border-slate-300"/></td>
                <td><input type="number" step="0.01" value={station.desliga} onChange={(e) => handleInputChange(station.id, 'desliga', e.target.value)} className="w-24 p-1 border rounded-md border-slate-300"/></td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 bg-slate-50 text-center font-mono">{station.superior.toFixed(2)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 bg-slate-50 text-center font-mono">{station.inferior.toFixed(2)}</td>
                <td><input type="number" step="1" value={station.tempo_alarme} onChange={(e) => handleInputChange(station.id, 'tempo_alarme', e.target.value)} className="w-24 p-1 border rounded-md border-slate-300"/></td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                    <input 
                        type="checkbox" 
                        checked={station.em_bateria} 
                        onChange={(e) => onUpdate(station.id, 'em_bateria', e.target.checked)} 
                        className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                    />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                      {station.bombas.map((b, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <button
                            onClick={() => handleBombasToggle(station.id, i)}
                            disabled={b === null || station.bombas_manutencao[i]}
                            title={`Toggle Bomba ${i + 1}`}
                            className={`w-24 h-7 rounded-md flex items-center justify-center text-xs font-bold transition-colors
                              ${station.bombas_manutencao[i] ? 'bg-yellow-400 text-black cursor-not-allowed' : 'text-white'}
                              ${!station.bombas_manutencao[i] && b === 1 ? 'bg-red-500 hover:bg-red-600' : ''}
                              ${!station.bombas_manutencao[i] && b === 0 ? 'bg-green-500 hover:bg-green-600' : ''}
                              ${b === null ? 'bg-slate-200 text-slate-500 border border-slate-300 cursor-not-allowed' : ''}`}
                          >
                             {station.bombas_manutencao[i] ? 'MANUT.' : `Bomba ${i + 1}: ${b === 1 ? 'ON' : b === 0 ? 'OFF' : 'N/A'}`}
                          </button>
                          <button 
                            onClick={() => handleBombasMaintenanceToggle(station.id, i)}
                            disabled={b === null}
                            title={`Toggle Manutenção Bomba ${i + 1}`}
                            className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors
                              ${b === null ? 'bg-slate-200 cursor-not-allowed' : ''}
                              ${station.bombas_manutencao[i] ? 'bg-yellow-500 text-black' : 'bg-slate-300 hover:bg-slate-400 text-slate-600'}
                            `}
                          >
                           🔧
                          </button>
                        </div>
                      ))}
                    </div>
                    <div>
                        <input
                            type="text"
                            value={station.bombas.map(b => b === null ? 'null' : String(b)).join(', ')}
                            onChange={(e) => handleBombasTextChange(station.id, e.target.value)}
                            className="w-full max-w-xs p-1 border rounded-md border-slate-300"
                            placeholder="e.g., 1, 0, null, 1"
                        />
                        <p className="text-xs text-slate-500 mt-1">Advanced: Edit array (1, 0, null).</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onSave}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditorTable;