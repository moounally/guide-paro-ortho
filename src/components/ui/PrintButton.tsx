"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ClinicalPDF } from "@/lib/pdf-generator";
import { Printer, Loader2 } from "lucide-react"; // FileDown removed, Loader2 added
import { useEffect, useState } from "react";
import { useClinicalStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n"; // New import

export function PrintButton() {
  const { t, isRtl } = useI18n();
  const { patient, risk, decisionNode, monitoring } = useClinicalStore();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex justify-center my-12 relative z-20">
      <PDFDownloadLink
        document={<ClinicalPDF patient={patient} risk={risk} decisionNode={decisionNode} monitoring={monitoring} t={t} isRtl={isRtl} />}
        fileName={`Dossier_Paro_Ortho_${patient.nom.replace(/\s+/g, '_') || 'Patient'}.pdf`}
        className="group relative"
      >
        {({ loading }) => (
          <button
            disabled={loading}
            className={`
              relative overflow-hidden
              flex items-center gap-4 px-10 py-5 rounded-2xl font-bold text-lg
              transition-all duration-500 transform
              ${loading ? 'bg-sapphire-100 text-sapphire-500 scale-95 cursor-not-allowed' : 'bg-sapphire-900 text-white-pure hover:scale-105 hover:shadow-2xl hover:shadow-sapphire-900/40'}
            `}
          >
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-sapphire-600 to-sapphire-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex items-center gap-4">
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>{t('print.loading')}</span>
                </>
              ) : (
                <>
                  <Printer className="w-6 h-6" />
                  <span>{t('print.ready')}</span>
                </>
              )}
            </div>
            
            {/* Shine effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white-pure opacity-20 group-hover:animate-shine" />
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
