"use client";

import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ClinicalPDF } from "@/lib/pdf-generator";
import { Printer, Download } from "lucide-react";

export function PrintButton() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex gap-4 no-print flex-wrap justify-center sm:justify-start">
      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-2 bg-sapphire-100/50 hover:bg-sapphire-100 text-sapphire-900 border border-sapphire-200 px-6 py-3 rounded-full font-medium transition-colors"
      >
        <Printer className="w-5 h-5" />
        Imprimer (Dossier Actuel)
      </button>

      {isClient && (
        <PDFDownloadLink
          document={<ClinicalPDF />}
          fileName="dossier-paro-ortho.pdf"
          className="inline-flex items-center gap-2 bg-sapphire-900 hover:bg-sapphire-700 text-white-pure px-6 py-3 rounded-full font-medium transition-colors shadow-sm"
        >
          {/* @ts-ignore : react-pdf child typing quirk */}
          {({ loading }) => (
            <>
              <Download className="w-5 h-5" />
              {loading ? "Génération PDF..." : "Télécharger PDF Officiel"}
            </>
          )}
        </PDFDownloadLink>
      )}
    </div>
  );
}
