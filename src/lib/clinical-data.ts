export interface Study {
  id: string;
  auteur: string;
  annee: number;
  type: string;
  niveau: string; // ex: '1/A', '2/B', '3/C'
  n: number | null; // nombre de sujets
  pays: string;
  doi?: string;
  dispositif?: 'Aligneurs' | 'Multi-attaches' | 'Comparatif';
  conclusion?: string;
  impact_pi?: string;
  impact_bop?: string;
}

export const studies: Study[] = [
  { id: '01', auteur: 'Di Spirito et al.', annee: 2023, type: 'Umbrella review', niveau: '1/A', n: null, pays: 'Italie', doi: 'PMID:37...', dispositif: 'Aligneurs', conclusion: 'Meilleure santé parodontale globale', impact_pi: '-0.42', impact_bop: '-15%' },
  { id: '02', auteur: 'Llera-Romero et al.', annee: 2023, type: 'Méta-analyse + méta-régression', niveau: '1/A', n: 892, pays: 'Espagne', doi: '', dispositif: 'Comparatif', conclusion: 'Aligneurs supérieurs pour PI, GI, BOP. Pas de diff pour PPD/CAL', impact_pi: '-0.50', impact_bop: '-18%' },
  { id: '03', auteur: 'Crego-Ruiz & Jorba-García', annee: 2023, type: 'RS + méta-analyse', niveau: '1/A', n: null, pays: 'Espagne', doi: '' },
  { id: '04', auteur: 'Oikonomou et al.', annee: 2021, type: 'RS + méta-analyse', niveau: '1/A', n: null, pays: 'Suisse/Grèce', doi: '' },
  { id: '05', auteur: 'Belanche Monterde et al.', annee: 2025, type: 'RS', niveau: '1/A', n: null, pays: 'Espagne', doi: '' },
  { id: '06', auteur: 'España-Pamplona et al.', annee: 2024, type: 'RS', niveau: '1/A', n: null, pays: 'Espagne', doi: '' },
  { id: '07', auteur: 'Benkhalifa et al.', annee: 2022, type: 'RS', niveau: '1/A', n: null, pays: 'Tunisie', doi: '' },
  { id: '08', auteur: 'Kamran et al.', annee: 2023, type: 'ECR', niveau: '1/A', n: 60, pays: 'Arabie Saoudite', doi: '' },
  { id: '09', auteur: 'Baeshen', annee: 2022, type: 'ECR', niveau: '1/A', n: 40, pays: 'Arabie Saoudite', doi: '' },
  { id: '10', auteur: 'Pisarla et al.', annee: 2021, type: 'ECR', niveau: '2/B', n: 30, pays: 'Inde', doi: '' },
  { id: '11', auteur: 'Nemec et al.', annee: 2025, type: 'Cohorte prospective', niveau: '2/B', n: 45, pays: 'Autriche', doi: '' },
  { id: '12', auteur: 'Giannini et al.', annee: 2025, type: 'Split-mouth', niveau: '2/B', n: 20, pays: 'Italie', doi: '' },
  { id: '13', auteur: 'Sen / Wani et al.', annee: 2025, type: 'Cohorte prospective', niveau: '2/B', n: 64, pays: 'Inde', doi: '' },
  { id: '14', auteur: 'Annamalaisamy et al.', annee: 2024, type: 'Cohorte prospective', niveau: '2/B', n: 50, pays: 'Inde', doi: '' },
  { id: '15', auteur: 'Caccianiga et al.', annee: 2022, type: 'Cohorte + intervention', niveau: '2/B', n: 30, pays: 'Italie', doi: '' },
  { id: '16', auteur: 'Lombardo et al.', annee: 2021, type: 'Cohorte prospective', niveau: '3/B', n: 50, pays: 'Italie', doi: '' },
  { id: '17', auteur: 'Madariaga et al.', annee: 2020, type: 'Cohorte prospective', niveau: '3/B', n: 35, pays: 'Italie', doi: '' },
  { id: '18', auteur: 'Romito et al.', annee: 2024, type: 'Cohorte rétrospective', niveau: '3/B', n: 48, pays: 'Italie', doi: '' },
  { id: '19', auteur: 'Yang et al.', annee: 2023, type: 'Cohorte rétrospective', niveau: '2/B', n: 120, pays: 'Chine', doi: '' },
  { id: '20', auteur: 'Zheng et al.', annee: 2024, type: 'Transversale', niveau: '3/C', n: 89, pays: 'Chine', doi: '' },
  { id: '21', auteur: 'Cenzato et al.', annee: 2024, type: 'Transversale', niveau: '3/C', n: 60, pays: 'Italie', doi: '' },
  { id: '22', auteur: 'Bober et al.', annee: 2023, type: 'Transversale', niveau: '3/C', n: 55, pays: 'Slovaquie', doi: '' },
];
