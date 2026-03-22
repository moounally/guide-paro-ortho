"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ClinicalPDF } from "@/lib/pdf-generator";
import { Printer, FileDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useClinicalStore } from "@/lib/store";

export function PrintButton() {
  const [isClient, setIsClient] = useState(false);
  const store = useClinicalStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      {!isClient && (
        <button disabled className="inline-flex items-center gap-3 px-8 py-4 bg-sapphire-100 text-sapphire-400 rounded-full font-bold">
          <FileDown className="w-5 h-5 animate-spin" />
          Génération du PDF Officiel...
        </button>
      )}

      {isClient && (
        <PDFDownloadLink
          document={
            <ClinicalPDF 
              patient={store.patient}
              risk={store.risk}
              decisionNode={store.decisionNode}
              monitoring={store.monitoring}
            />
          }
          fileName={`Dossier_ParoOrtho_${store.patient.nom || 'Patient'}_${new Date().toISOString().split('T')[0]}.pdf`}
          className="inline-flex items-center gap-3 px-8 py-4 bg-sapphire-900 text-white-pure rounded-full font-bold hover:bg-sapphire-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          {({ loading }) => (
            <>
              {loading ? <FileDown className="w-5 h-5 animate-pulse" /> : <Printer className="w-5 h-5" />}
              {loading ? 'Préparation du Document...' : 'Télécharger le PDF Officiel'}
            </>
          )}
        </PDFDownloadLink>
      )}
    </div>
  );
}
