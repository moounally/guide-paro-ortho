import { create } from 'zustand';

export interface PatientData {
  nom: string;
  cin: string;
  date: string;
  praticien: string;
}

export interface RiskData {
  totalScore: number;
  categorie: string;
  protocole: string;
}

export interface RDVData {
  id: number;
  date: string;
  pi: string | number;
  gi: string | number;
  bop: string | number;
  ppd: string | number;
  cal: string | number;
  notes: string;
}

interface ClinicalState {
  patient: PatientData;
  setPatient: (patient: Partial<PatientData>) => void;
  
  risk: RiskData;
  setRisk: (risk: Partial<RiskData>) => void;
  
  decisionNode: string;
  setDecisionNode: (node: string) => void;
  
  monitoring: RDVData[];
  setMonitoring: (monitoring: RDVData[]) => void;
}

export const useClinicalStore = create<ClinicalState>((set) => ({
  patient: { nom: '', cin: '', date: new Date().toISOString().split('T')[0], praticien: '' },
  setPatient: (data) => set((state) => ({ patient: { ...state.patient, ...data } })),
  
  risk: { totalScore: 0, categorie: "FAIBLE", protocole: "Standard" },
  setRisk: (data) => set((state) => ({ risk: { ...state.risk, ...data } })),
  
  decisionNode: 'Attente de Décision',
  setDecisionNode: (node) => set({ decisionNode: node }),
  
  monitoring: [
    { id: 1, date: '', pi: '', gi: '', bop: '', ppd: '', cal: '', notes: 'Initial' },
    { id: 2, date: '', pi: '', gi: '', bop: '', ppd: '', cal: '', notes: 'Mois 1' },
    { id: 3, date: '', pi: '', gi: '', bop: '', ppd: '', cal: '', notes: 'Mois 3' },
    { id: 4, date: '', pi: '', gi: '', bop: '', ppd: '', cal: '', notes: 'Mois 6' },
  ],
  setMonitoring: (data) => set({ monitoring: data }),
}));
