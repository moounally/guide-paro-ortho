import { MedicalCard } from "@/components/ui/MedicalCard";
import { PRISMADiagram } from "@/components/clinical/PRISMADiagram";
import { EvidenceTable } from "@/components/clinical/EvidenceTable";
import { ForestPlot } from "@/components/clinical/ForestPlot";
import { BibliographyCard } from "@/components/clinical/BibliographyCard";

export default function Recherche() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-display font-bold text-sapphire-900 mb-2">Revue Systématique</h1>
      <p className="text-sapphire-700 mb-12">Méthodologie PRISMA 2026 et analyse des 22 études incluses.</p>
      
      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-display font-semibold text-sapphire-900 mb-6 flex items-center gap-3">
            <span className="bg-sapphire-500 text-white-pure w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            Diagramme de Flux PRISMA
          </h2>
          <MedicalCard className="bg-off-white/30">
            <PRISMADiagram />
          </MedicalCard>
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-sapphire-900 mb-6 flex items-center gap-3">
            <span className="bg-sapphire-500 text-white-pure w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            Analyse des 22 Études Incluses
          </h2>
          <p className="text-neutral mb-8">Tableau récapitulatif des données cliniques et conclusions principales. Utilisez les filtres pour affiner l'affichage.</p>
          <EvidenceTable />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-sapphire-900 mb-6 flex items-center gap-3">
            <span className="bg-sapphire-500 text-white-pure w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
            Méta-analyse (Forest Plot)
          </h2>
          <ForestPlot />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold text-sapphire-900 mb-6 flex items-center gap-3">
            <span className="bg-sapphire-500 text-white-pure w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
            Références & Exportation
          </h2>
          <BibliographyCard />
        </section>
      </div>
    </div>
  );
}
