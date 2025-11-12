
import React, { useState, useCallback } from 'react';
import { useStationData } from './hooks/useStationData';
import Header from './components/Header';
import MapDashboard from './components/MapDashboard';
import EditorTable from './components/EditorTable';
import GeminiAnalyzer from './components/GeminiAnalyzer';
import type { Station } from './types';

type View = 'map' | 'editor' | 'analyzer';

const App: React.FC = () => {
  const { stations, updateStation, setStations, saveStations, loading } = useStationData();
  const [view, setView] = useState<View>('map');

  const handleApplySuggestions = useCallback((suggestions: { stationId: number; suggestion: Partial<Station> }[]) => {
    let updatedStations = [...stations];
    suggestions.forEach(({ stationId, suggestion }) => {
      const stationIndex = updatedStations.findIndex(s => s.id === stationId);
      if (stationIndex !== -1) {
        updatedStations[stationIndex] = { ...updatedStations[stationIndex], ...suggestion };
      }
    });
    setStations(updatedStations);
    alert('Suggestions applied! You can review them in the Editor and save.');
    setView('editor');
  }, [stations, setStations]);

  const renderView = () => {
    switch (view) {
      case 'map':
        return <MapDashboard stations={stations} />;
      case 'editor':
        return <EditorTable stations={stations} onUpdate={updateStation} onSave={saveStations} />;
      case 'analyzer':
        return <GeminiAnalyzer stations={stations} onApplySuggestions={handleApplySuggestions} />;
      default:
        return <MapDashboard stations={stations} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <div className="text-2xl font-bold text-slate-600">Loading Station Data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Header currentView={view} setView={setView} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderView()}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white p-2 text-center text-xs">
        EBAP Station Monitor & Analyzer - React & Gemini API Edition
      </footer>
    </div>
  );
};

export default App;
