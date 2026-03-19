import { RiskScoreData, RiskLevel } from "@/types/clinical";

export function calculateTotalScore(data: RiskScoreData): number {
  return (
    parseInt(data.biotype) +
    parseInt(data.bop) +
    parseInt(data.ppd) +
    parseInt(data.antecedents) +
    parseInt(data.pi) +
    parseInt(data.systemic) +
    parseInt(data.compliance)
  );
}

export function determineRiskLevel(total: number): RiskLevel {
  if (total <= 4) return 'LOW';     // 0-4 : Faible
  if (total <= 9) return 'MODERATE';// 5-9 : Modéré
  return 'HIGH';                    // 10-14 : Élevé
}

export function getRiskLevelDetails(level: RiskLevel) {
  switch (level) {
    case 'LOW':
      return {
        label: "Risque Faible",
        color: "success",
        protocol: "Protocole Standard ONDT",
        text: "Traitements multi-attachés ou aligneurs possibles après prophylaxie standard."
      };
    case 'MODERATE':
      return {
        label: "Risque Modéré",
        color: "warning",
        protocol: "Protocole Renforcé",
        text: "Avis parodontale conseillé. Suivi rapproché (4-6 sem). Aligneurs recommandés si hygiène difficile."
      };
    case 'HIGH':
      return {
        label: "Risque Élevé",
        color: "danger",
        protocol: "Protocole Maximal - STOP",
        text: "Contre-indication temporaire orthodontique. Traitement parodontal complet et stabilisation exigée."
      };
  }
}
