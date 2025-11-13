import type { Station } from '../types';

const rawStationData: Omit<Station, 'superior' | 'inferior'>[] = [
  {
    "id": 1, "nome": "1 - RODOVIÁRIA", "nivel": 1.9, "bombas": [1, 1, 0], "bombas_manutencao": [false, false, false], "liga": 1.6, "desliga": 1.0, "tempo_alarme": 44, "em_bateria": false
  },
  {
    "id": 2, "nome": "2 - SÃO JOÃO", "nivel": 1.35, "bombas": [1, 0, 0], "bombas_manutencao": [false, false, false], "liga": 1.6, "desliga": 1.1, "tempo_alarme": 0, "em_bateria": true
  },
  {
    "id": 3, "nome": "3 - SÃO PEDRO", "nivel": 1.3, "bombas": [1, 1, 0], "bombas_manutencao": [false, false, true], "liga": 1.55, "desliga": 1.05, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 4, "nome": "4 - PARQUE NÁUTICO", "nivel": 1.15, "bombas": [0, 1, 0, 0], "bombas_manutencao": [false, false, false, false], "liga": 1.4, "desliga": 0.7, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 5, "nome": "5 - CINCO", "nivel": 0.3, "bombas": [0, 0, 0, 1, null], "bombas_manutencao": [false, false, false, false, false], "liga": 1.0, "desliga": 0.7, "tempo_alarme": 35, "em_bateria": false
  },
  {
    "id": 6, "nome": "6 - TREVO", "nivel": 1.12, "bombas": [0, 1, 0, 0, 0], "bombas_manutencao": [false, false, false, false, false], "liga": 1.5, "desliga": 1.0, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 7, "nome": "7 - SÍLVIO BRUM", "nivel": 1.2, "bombas": [null, null, null, 0, null, 0, 0, 0], "bombas_manutencao": [false, false, false, false, false, false, false, false], "liga": 1.5, "desliga": 0.9, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 8, "nome": "8 - VILA FARRAPOS", "nivel": 0.2, "bombas": [0, 0, 1, 0, 0], "bombas_manutencao": [false, false, false, false, false], "liga": 0.5, "desliga": -0.1, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 9, "nome": "9 - SARANDI", "nivel": 0.85, "bombas": [0, 1, 0, 0], "bombas_manutencao": [false, false, false, false], "liga": 1.1, "desliga": 0.6, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 10, "nome": "10 - ABÍLIO FERNANDES", "nivel": 0.35, "bombas": [1, 1, 0, 0, 0], "bombas_manutencao": [false, false, false, false, false], "liga": 0.6, "desliga": 0.1, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 11, "nome": "11A - CORONEL CLAUDINO", "nivel": 1.9, "bombas": [1, null, 0, 0, 0], "bombas_manutencao": [false, false, false, false, false], "liga": 2.15, "desliga": 1.55, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 12, "nome": "11B - ICARAÍ II", "nivel": 2.15, "bombas": [1, 0, 0, 0, 0], "bombas_manutencao": [false, false, false, false, false], "liga": 2.45, "desliga": 1.85, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 13, "nome": "12 - PARQUE GIGANTE", "nivel": 0.45, "bombas": [0, 0, 1, 0], "bombas_manutencao": [false, false, false, false], "liga": 0.7, "desliga": 0.2, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 14, "nome": "13 - PARQUE MARINHA", "nivel": 0.7, "bombas": [1, 0, 1, 0, 0, 0, 0, 0], "bombas_manutencao": [false, false, false, false, false, false, false, false], "liga": 1.0, "desliga": 0.4, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 15, "nome": "14 - POLÍCIA FEDERAL", "nivel": 0.7, "bombas": [0, 1, 1], "bombas_manutencao": [false, false, false], "liga": 1.0, "desliga": 0.4, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 16, "nome": "15 - ÉRICO VERÍSSIMO", "nivel": 0.5, "bombas": [0, 1, 1, 0], "bombas_manutencao": [false, false, false, false], "liga": 0.8, "desliga": 0.2, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 17, "nome": "16 - RÓTULA CUIAS", "nivel": 0.6, "bombas": [1, 1, 1, null, 1, 1, 0, 0], "bombas_manutencao": [false, false, false, false, false, false, false, false], "liga": 1.0, "desliga": 0.0, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 18, "nome": "17 - MAUÁ", "nivel": 0.4, "bombas": [0, 0, 1, 0], "bombas_manutencao": [false, false, false, false], "liga": 0.8, "desliga": 0.0, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 19, "nome": "18 - CENTRO", "nivel": 2.5, "bombas": [0, 0, 0, 0, 0], "bombas_manutencao": [false, false, false, false, false], "liga": 2.7, "desliga": 1.9, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 20, "nome": "19 - SANTA TEREZINHA", "nivel": 1.5, "bombas": [1, 0, 0], "bombas_manutencao": [false, false, false], "liga": 1.8, "desliga": 1.2, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 21, "nome": "20 - VILA MINUANO", "nivel": 0.6, "bombas": [1, 0, 0, 0, 0], "bombas_manutencao": [false, false, false, false, false], "liga": 1.0, "desliga": 0.0, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 22, "nome": "21 - ASA BRANCA", "nivel": 2.25, "bombas": [1, 0], "bombas_manutencao": [false, false], "liga": 3.0, "desliga": 1.5, "tempo_alarme": 0, "em_bateria": false
  },
  {
    "id": 23, "nome": "22 - TRINCHEIRA", "nivel": 0.5, "bombas": [0, 1, 0], "bombas_manutencao": [false, false, false], "liga": 1.0, "desliga": 0.0, "tempo_alarme": 0, "em_bateria": false
  }
];

export const initialStationData: Station[] = rawStationData.map(station => {
  const operationalRange = station.liga - station.desliga;
  const superior = station.liga + 0.5 * operationalRange;
  const inferior = station.desliga - 0.5 * operationalRange;
  return { ...station, superior, inferior };
});
