import { MedicalCard } from "@/components/ui/MedicalCard";
import { RiskScoreWidget } from "@/components/clinical/RiskScoreWidget";
import { DecisionTree } from "@/components/clinical/DecisionTree";
import { MonitoringGrid } from "@/components/clinical/MonitoringGrid";
import { PatientHeader } from "@/components/clinical/PatientHeader";
import dynamic from "next/dynamic";
import { Stethoscope, Activity, Network, ListChecks } from "lucide-react";

// @react-pdf/renderer pose problème lors du build SSR Next.js
const PrintButton = dynamic(() => import("@/components/ui/PrintButton").then(mod => mod.PrintButton), { ssr: false });

export default function Formulaire() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-sapphire-900 mb-6">Dossier Parodonto-Orthodontique</h1>
        <p className="text-xl text-sapphire-700/80 max-w-2xl mx-auto">Interface clinique intégrée pour l'évaluation du risque, la décision thérapeutique et le suivi du patient sous traitement orthodontique.</p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-12">
        {/* IDENTIFICATION */}
        <PatientHeader />
        <section className="bg-white-pure p-8 rounded-3xl border border-sapphire-100 shadow-sm relative overflow-visible">
          <div className="absolute -top-4 -left-4 bg-sapphire-100 text-sapphire-900 p-3 rounded-2xl shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-sapphire-900 mb-8 ml-8">
            Phase 1 : Évaluation du Risque Initial
          </h2>
          <RiskScoreWidget />
        </section>

        <section className="bg-white-pure p-8 rounded-3xl border border-sapphire-100 shadow-sm relative overflow-visible mt-20">
          <div className="absolute -top-4 -left-4 bg-sapphire-100 text-sapphire-900 p-3 rounded-2xl shadow-sm">
            <Network className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-sapphire-900 mb-2 ml-8">
            Phase 2 : Arbre Décisionnel
          </h2>
          <p className="text-sapphire-700/80 mb-8 ml-8 text-sm">
            Naviguez à travers l'arbre pour déterminer la stratégie thérapeutique ou l'adaptation en cours de traitement (Mid-Treatment Adaptations).
          </p>
          <DecisionTree />
        </section>

        <section className="bg-white-pure p-8 rounded-3xl border border-sapphire-100 shadow-sm relative overflow-hidden mt-20">
          <div className="absolute -top-4 -left-4 bg-sapphire-100 text-sapphire-900 p-3 rounded-2xl shadow-sm z-10">
            <ListChecks className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-sapphire-900 mb-2 ml-8 relative z-10">
            Phase 3 : Suivi Clinique (Monitoring)
          </h2>
          <p className="text-sapphire-700/80 mb-8 ml-8 text-sm relative z-10">
            Le tableau synthétise les index cliniques à chaque visite de contrôle. Tout dépassement de seuil déclenche une alerte d'adaptation.
          </p>
          <div className="relative z-10">
            <MonitoringGrid />
          </div>
        </section>

        <section className="pt-12 text-center pb-20">
            <h2 className="text-2xl font-display font-semibold text-sapphire-900 mb-4">Exportation & Archivo du Dossier</h2>
            <p className="text-neutral mb-8">Générez un PDF officiel pour les archives ou partagez-le de manière sécurisée.</p>
            <PrintButton />
        </section>
      </div>
    </div>
  );
}
