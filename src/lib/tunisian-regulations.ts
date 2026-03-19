export interface Regulation {
  id: string;
  titre: string;
  source: "ONDT" | "CNAM" | "Ministère de la Santé";
  annee: number;
  description: string;
  points_cles: string[];
}

export const tunisianRegulations: Regulation[] = [
  {
    id: "reg-01",
    titre: "Nomenclature Générale des Actes Professionnels (NGAP) - Parodontologie",
    source: "CNAM",
    annee: 2007,
    description: "Codification des actes de parodontologie pris en charge ou non par la Caisse Nationale d'Assurance Maladie.",
    points_cles: [
      "Le détartrage est pris en charge selon des fréquences spécifiques.",
      "Les surfaçages radiculaires nécessitent une entente préalable (AP).",
      "La chirurgie parodontale pré-orthodontique est soumise à un contrôle strict."
    ]
  },
  {
    id: "reg-02",
    titre: "Recommandations de l'Ordre sur l'Orthodontie par Aligneurs",
    source: "ONDT",
    annee: 2024,
    description: "Cadre légal et déontologique de la pratique de l'orthodontie par gouttières transparentes en Tunisie.",
    points_cles: [
      "Pratique strictement réservée aux médecins dentistes inscrits à l'ONDT.",
      "Obligation de réaliser un bilan parodontal complet avant tout traitement.",
      "Interdiction de la vente directe d'aligneurs aux patients sans supervision clinique."
    ]
  },
  {
    id: "reg-03",
    titre: "Consentement Éclairé en Parodonto-Orthodontie",
    source: "ONDT",
    annee: 2020,
    description: "Directives sur l'information du patient concernant les risques parodontaux liés aux traitements orthodontiques.",
    points_cles: [
      "Information obligatoire sur le risque de résorption radiculaire et de récession gingivale.",
      "Le patient doit signer un document explicitant son phénotype gingival et les contraintes d'hygiène.",
      "Nécessité de documenter photographiquement l'état initial."
    ]
  }
];
