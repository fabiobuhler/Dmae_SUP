
import React from 'react';
import type { Station } from '../types';

interface EditorTableProps {
  stations: Station[];
  onUpdate: (id: number, field: keyof Station, value: any) => void;
  onSave: () => void;
}

const EditorTable: React.FC<EditorTableProps> = ({ stations, onUpdate, onSave }) => {

  const handlePumpChange = (stationId: number, pumpIndex: number, isChecked: boolean) => {
    const station = stations.find(s => s.id === stationId);
    if (!station) return;
    const newBombas = [...station.bombas];
    newBombas[pumpIndex] = isChecked ? 1 : 0;
    onUpdate(stationId, 'bombas', newBombas);
  };

  const handleInputChange = (id: number, field: keyof Station, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onUpdate(id, field, numValue);
    }
  };

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
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Superior</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Inferior</th>
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
                <td><input type="number" step="0.01" value={station.superior} onChange={(e) => handleInputChange(station.id, 'superior', e.target.value)} className="w-24 p-1 border rounded-md border-slate-300"/></td>
                <td><input type="number" step="0.01" value={station.inferior} onChange={(e) => handleInputChange(station.id, 'inferior', e.target.value)} className="w-24 p-1 border rounded-md border-slate-300"/></td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {station.bombas.map((b, i) => (
                      b === null 
                        ? <span key={i} className="text-xs text-slate-400">B{i+1} N/A</span>
                        : <label key={i} className="flex items-center gap-1 text-sm">
                            <input type="checkbox" checked={b === 1} onChange={(e) => handlePumpChange(station.id, i, e.target.checked)} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"/>
                            B{i+1}
                          </label>
                    ))}
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
