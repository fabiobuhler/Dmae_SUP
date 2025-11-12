
import React, { useState } from 'react';
import { analyzeStationDataWithGemini } from '../services/geminiService';
import type { Station, GeminiAnalysisResult, GeminiIssue } from '../types';

interface GeminiAnalyzerProps {
  stations: Station[];
  onApplySuggestions: (suggestions: { stationId: number; suggestion: Partial<Station> }[]) => void;
}

const GeminiAnalyzer: React.FC<GeminiAnalyzerProps> = ({ stations, onApplySuggestions }) => {
  const [analysis, setAnalysis] = useState<GeminiAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeStationDataWithGemini(stations);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };
  
  const getSuggestionsToApply = () => {
    if (!analysis || !analysis.issues) return [];
    return analysis.issues.map(issue => ({
        stationId: issue.stationId,
        suggestion: issue.suggestion
    }));
  };

  const renderIssue = (issue: GeminiIssue) => (
    <div key={issue.stationId + issue.description} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex justify-between items-start">
            <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${issue.issueType === 'Operational' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {issue.issueType}
                </span>
                <h4 className="mt-2 font-semibold text-slate-800">{issue.stationName}</h4>
            </div>
        </div>
        <p className="mt-1 text-sm text-slate-600">{issue.description}</p>
        <div className="mt-3 bg-slate-200/50 p-2 rounded">
            <p className="text-xs font-medium text-slate-500">Suggestion:</p>
            <pre className="text-xs text-slate-700 whitespace-pre-wrap"><code>{JSON.stringify(issue.suggestion, null, 2)}</code></pre>
        </div>
    </div>
  );

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">AI-Powered Data Analyzer</h2>
        <p className="mt-2 text-slate-600">
          Use the power of Gemini to analyze your station data for logical errors and operational risks.
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Current Data'
          )}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <p className="font-bold">Analysis Failed</p>
          <p>{error}</p>
        </div>
      )}

      {analysis && (
        <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-700">Analysis Complete</h3>
            <p className="mt-1 p-3 bg-slate-100 rounded-md text-sm text-slate-800">{analysis.analysisSummary}</p>
            {analysis.issues.length > 0 ? (
                <div className="mt-4 space-y-4">
                    {analysis.issues.map(renderIssue)}
                    <div className="flex justify-end pt-4">
                        <button 
                            onClick={() => onApplySuggestions(getSuggestionsToApply())}
                            className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                            Apply All Suggestions
                        </button>
                    </div>
                </div>

            ) : (
                <div className="mt-4 p-4 text-center bg-green-50 border border-green-200 text-green-700 rounded-lg">
                    <p className="font-semibold">No issues found. Your data looks great!</p>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default GeminiAnalyzer;
