
import type { Station } from '../types';

export const initialStationData: Station[] = [
  {
    "id": 1, "nome": "01 - RODOVIÁRIA", "nivel": 1.3, "bombas": [1, 1, 0], "liga": 1.6, "desliga": 1.0, "superior": 1.9, "inferior": 0.7, "tempo_alarme": 0
  },
  {
    "id": 2, "nome": "02 - SÃO JOÃO", "nivel": 1.35, "bombas": [1, 0, 0], "liga": 1.6, "desliga": 1.1, "superior": 1.85, "inferior": 0.85, "tempo_alarme": 0
  },
  {
    "id": 3, "nome": "03 - SÃO PEDRO", "nivel": 1.3, "bombas": [1, 1], "liga": 1.55, "desliga": 1.05, "superior": 1.8, "inferior": 0.8, "tempo_alarme": 0
  },
  {
    "id": 4, "nome": "04 - PARQUE NÁUTICO", "nivel": 1.15, "bombas": [0, 1, 0], "liga": 1.4, "desliga": 0.7, "superior": 1.75, "inferior": 0.55, "tempo_alarme": 0
  },
  {
    "id": 5, "nome": "05 - CINCO", "nivel": 0.3, "bombas": [0, 0, 0, 1, null], "liga": 1.0, "desliga": 0.7, "superior": 1.15, "inferior": -0.55, "tempo_alarme": 0
  },
  {
    "id": 6, "nome": "06 - TREVO", "nivel": 1.12, "bombas": [0, 1, 0], "liga": 1.5, "desliga": 1.0, "superior": 1.75, "inferior": 0.5, "tempo_alarme": 0
  },
  {
    "id": 7, "nome": "07 - SÍLVIO BRUM", "nivel": 1.2, "bombas": [0, 0], "liga": 1.5, "desliga": 0.9, "superior": 1.8, "inferior": 0.6, "tempo_alarme": 0
  },
  {
    "id": 8, "nome": "08 - VILA FARRAPOS", "nivel": 0.2, "bombas": [0, 0, 1, 0], "liga": 0.5, "desliga": -0.1, "superior": 0.8, "inferior": -0.4, "tempo_alarme": 0
  },
  {
    "id": 9, "nome": "09 - SARANDI", "nivel": 0.85, "bombas": [0, 1], "liga": 1.1, "desliga": 0.6, "superior": 1.35, "inferior": 0.35, "tempo_alarme": 0
  },
  {
    "id": 10, "nome": "10 - ABÍLIO FERNANDES", "nivel": 0.35, "bombas": [1, 1], "liga": 0.6, "desliga": 0.1, "superior": 0.85, "inferior": -0.15, "tempo_alarme": 0
  },
  {
    "id": 11, "nome": "11A - CORONEL CLAUDINO", "nivel": 1.9, "bombas": [1, 0], "liga": 2.15, "desliga": 1.55, "superior": 2.5, "inferior": 1.3, "tempo_alarme": 0
  },
  {
    "id": 12, "nome": "11B - ICARAÍ II", "nivel": 2.15, "bombas": [1, 0], "liga": 2.45, "desliga": 1.85, "superior": 2.75, "inferior": 1.55, "tempo_alarme": 0
  },
  {
    "id": 13, "nome": "12 - PARQUE GIGANTE", "nivel": 0.45, "bombas": [0, 0, 1], "liga": 0.7, "desliga": 0.2, "superior": 0.95, "inferior": -0.05, "tempo_alarme": 0
  },
  {
    "id": 14, "nome": "13 - PARQUE MARINHA", "nivel": 0.7, "bombas": [1, 0, 1], "liga": 1.0, "desliga": 0.4, "superior": 1.3, "inferior": 0.1, "tempo_alarme": 0
  },
  {
    "id": 15, "nome": "14 - POLÍCIA FEDERAL", "nivel": 0.7, "bombas": [0, 1, 1], "liga": 1.0, "desliga": 0.4, "superior": 1.3, "inferior": 0.1, "tempo_alarme": 0
  },
  {
    "id": 16, "nome": "15 - ÉRICO VERÍSSIMO", "nivel": 0.5, "bombas": [0, 1, 1, 0, 0], "liga": 0.8, "desliga": 0.2, "superior": 1.1, "inferior": -0.1, "tempo_alarme": 0
  },
  {
    "id": 17, "nome": "16 - RÓTULA CUIAS", "nivel": 0.6, "bombas": [1, 1, 1, null, 1, 1, 0, 0], "liga": 1.0, "desliga": 0.0, "superior": 1.5, "inferior": -0.3, "tempo_alarme": 0
  },
  {
    "id": 18, "nome": "17 - MAUÁ", "nivel": 0.4, "bombas": [0, 0, 1, 0], "liga": 0.8, "desliga": 0.0, "superior": 1.2, "inferior": -0.4, "tempo_alarme": 0
  },
  {
    "id": 19, "nome": "18 - CENTRO", "nivel": 2.5, "bombas": [0, 0, 0, 0], "liga": 2.7, "desliga": 1.9, "superior": 3.5, "inferior": 1.5, "tempo_alarme": 0
  },
  {
    "id": 20, "nome": "19 - SANTA TEREZINHA", "nivel": 1.5, "bombas": [1, 0, 0], "liga": 1.8, "desliga": 1.2, "superior": 2.1, "inferior": 0.9, "tempo_alarme": 0
  },
  {
    "id": 21, "nome": "20 - VILA MINUANO", "nivel": 0.6, "bombas": [1, 0], "liga": 1.0, "desliga": 0.0, "superior": 1.2, "inferior": 0.0, "tempo_alarme": 0
  },
  {
    "id": 22, "nome": "21 - ASA BRANCA", "nivel": 2.25, "bombas": [1, 1], "liga": 3.0, "desliga": 1.5, "superior": 3.75, "inferior": 0.75, "tempo_alarme": 0
  },
  {
    "id": 23, "nome": "22 - TRINCHEIRA", "nivel": 0.5, "bombas": [0, 1], "liga": 1.0, "desliga": 0.0, "superior": 1.0, "inferior": 0.0, "tempo_alarme": 0
  }
];
