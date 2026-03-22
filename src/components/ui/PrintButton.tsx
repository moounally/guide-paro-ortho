"use client";

import { Printer, FileDown } from "lucide-react";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export function PrintButton() {
  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownloadPDF = async () => {
    const element = document.getElementById("dossier-patient-form");
    if (!element) return;
    
    setIsGenerating(true);
    try {
      window.scrollTo(0, 0);
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
      
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      
      pdf.save(`Dossier_ParoOrtho_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("Erreur génération PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isClient) return null;

  return (
    <button
      onClick={handleDownloadPDF}
      disabled={isGenerating}
      className={`inline-flex items-center gap-3 px-8 py-4 bg-sapphire-900 text-white-pure rounded-full font-bold hover:bg-sapphire-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {isGenerating ? <FileDown className="w-5 h-5 animate-bounce" /> : <Printer className="w-5 h-5" />}
      {isGenerating ? "Création du PDF Parfait en cours..." : "Télécharger le PDF Officiel"}
    </button>
  );
}
