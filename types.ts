
export interface Station {
  id: number;
  nome: string;
  nivel: number;
  bombas: (number | null)[];
  liga: number;
  desliga: number;
  superior: number;
  inferior: number;
  tempo_alarme: number;
}

export interface GeminiIssue {
    stationId: number;
    stationName: string;
    issueType: 'Integrity' | 'Operational';
    description: string;
    suggestion: Partial<Station>;
}

export interface GeminiAnalysisResult {
    analysisSummary: string;
    issues: GeminiIssue[];
}
