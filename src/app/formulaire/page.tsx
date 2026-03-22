import { MedicalCard } from "@/components/ui/MedicalCard";
import { RiskScoreWidget } from "@/components/clinical/RiskScoreWidget";
import { DecisionTree } from "@/components/clinical/DecisionTree";
import { MonitoringGrid } from "@/components/clinical/MonitoringGrid";
import { PatientHeader } from "@/components/clinical/PatientHeader";
import dynamic from "next/dynamic";
import { Stethoscope, Activity, Network, ListChecks } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PrintButton } from "@/components/ui/PrintButton";

export default function Formulaire() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-sapphire-900 mb-6">Dossier Parodonto-Orthodontique</h1>
        <p className="text-xl text-sapphire-700/80 max-w-2xl mx-auto">Interface clinique intégrée pour l'évaluation du risque, la décision thérapeutique et le suivi du patient sous traitement orthodontique.</p>
      </div>
      
      <div id="dossier-patient-form" className="max-w-4xl mx-auto space-y-12 p-4 md:p-8 bg-white-pure rounded-3xl">
        {/* IDENTIFICATION */}
        <PatientHeader />
        <section className="relative mt-20 pt-12 border-t border-sapphire-100/50 print:border-t-0 print:mt-8 print:pt-4">
          <div className="absolute -top-6 left-0 bg-sapphire-100 text-sapphire-900 p-3 rounded-2xl shadow-sm print:hidden">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-sapphire-900 mb-8 pl-0 md:pl-16 print:pl-0">
            {t('form.phase1')}
          </h2>
          <div className="pl-0 md:pl-16 print:pl-0">
            <RiskScoreWidget />
          </div>
        </section>

        <section className="relative mt-24 pt-12 border-t border-sapphire-100/50 print:border-t-0 print:mt-12 print:pt-4 print:break-before-page">
          <div className="absolute -top-6 left-0 bg-sapphire-100 text-sapphire-900 p-3 rounded-2xl shadow-sm print:hidden">
            <Network className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-sapphire-900 mb-2 pl-0 md:pl-16 print:pl-0">
            {t('form.phase2')}
          </h2>
          <p className="text-sapphire-700/80 mb-12 pl-0 md:pl-16 text-sm max-w-3xl print:pl-0 print:text-black">
            Naviguez à travers l'arbre pour déterminer la stratégie thérapeutique ou l'adaptation en cours de traitement (Mid-Treatment Adaptations).
          </p>
          <DecisionTree />
        </section>

        <section className="relative mt-24 pt-12 border-t border-sapphire-100/50 print:border-t-0 print:mt-12 print:pt-4 print:break-before-page">
          <div className="absolute -top-6 left-0 bg-sapphire-100 text-sapphire-900 p-3 rounded-2xl shadow-sm z-10 print:hidden">
            <ListChecks className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-display font-semibold text-sapphire-900 mb-2 pl-0 md:pl-16 relative z-10 print:pl-0">
            {t('form.phase3')}
          </h2>
          <p className="text-sapphire-700/80 mb-12 pl-0 md:pl-16 text-sm max-w-3xl relative z-10 print:pl-0 print:text-black">
            Le tableau synthétise les index cliniques à chaque visite de contrôle. Tout dépassement de seuil déclenche une alerte d'adaptation.
          </p>
          <div className="relative z-10">
            <MonitoringGrid />
          </div>
        </section>

        <section className="pt-20 text-center pb-20 print:hidden border-t border-sapphire-100/30">
            <h2 className="text-2xl font-display font-semibold text-sapphire-900 mb-4">{t('export.title')}</h2>
            <p className="text-neutral mb-8">{t('export.subtitle')}</p>
            <PrintButton />
        </section>
      </div>
    </div>
  );
}
