import { MedicalCard } from "@/components/ui/MedicalCard";

export default function Comparaison() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold text-sapphire-900 mb-2">Comparaison Clinique</h1>
      <p className="text-sapphire-700 mb-8">Aligneurs Transparents vs Multi-attaches.</p>
      <MedicalCard title="Split-Screen Clinique (À venir)">
        <p className="text-neutral">L'interface Split-screen avec la dent 3D interactive et les paramètres (PI, GI, PPD, BOP) sera implémentée ici.</p>
      </MedicalCard>
    </div>
  );
}
