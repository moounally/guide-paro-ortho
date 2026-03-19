import { MedicalCard } from "@/components/ui/MedicalCard";

export default function Protocole() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold text-sapphire-900 mb-2">Protocoles Cliniques</h1>
      <p className="text-sapphire-700 mb-8">Recommandations ONDT et CNAM - Tunisie.</p>
      <MedicalCard title="Protocoles par Risque (À venir)">
        <p className="text-neutral">Les détails des protocoles Standard, Renforcé, et Maximal seront listés ici selon le risque calculé.</p>
      </MedicalCard>
    </div>
  );
}
