
import React from 'react';

interface HeaderProps {
  currentView: 'map' | 'editor' | 'analyzer';
  setView: (view: 'map' | 'editor' | 'analyzer') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const getButtonClass = (view: 'map' | 'editor' | 'analyzer') => {
    return currentView === view
      ? 'bg-white text-slate-800'
      : 'bg-slate-700 text-white hover:bg-slate-600';
  };

  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          EBAP Station Monitor & Analyzer
        </h1>
        <nav className="flex space-x-2 sm:space-x-4 rounded-lg p-1 bg-slate-900/50">
          <button
            onClick={() => setView('map')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${getButtonClass('map')}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setView('editor')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${getButtonClass('editor')}`}
          >
            Editor
          </button>
          <button
            onClick={() => setView('analyzer')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${getButtonClass('analyzer')}`}
          >
            AI Analyzer
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
