"use client";

import { tunisianRegulations } from "@/lib/tunisian-regulations";
import { ShieldAlert, FileSignature, Landmark } from "lucide-react";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { ConsentementPDF } from "@/lib/consent-pdf";

export default function ProtocolesTunisie() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <div className="inline-flex justify-center items-center p-4 bg-sapphire-50 rounded-full mb-6 relative">
          <Landmark className="w-12 h-12 text-sapphire-900" />
          <div className="absolute top-0 right-0 w-4 h-4 bg-danger rounded-full border-2 border-white-pure"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-sapphire-900 mb-6">
          Cadre Légal & Protocoles <span className="text-transparent bg-clip-text bg-gradient-to-r from-danger to-red-600">Tunisie</span> 🇹🇳
        </h1>
        <p className="text-xl text-sapphire-700/80 max-w-3xl mx-auto">
          Directives de l'Ordre National des Médecins Dentistes (ONDT) et de la CNAM concernant la pratique parodonto-orthodontique.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tunisianRegulations.map((reg) => (
          <div key={reg.id} className="bg-white-pure border-t-4 border-t-danger border-sapphire-50 border-x border-b rounded-xl p-8 shadow-sm hover:shadow-lg transition-all flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-danger text-white-pure text-xs font-bold px-3 py-1 rounded-bl-lg">
              {reg.source}
            </div>
            
            <div className="flex items-center gap-3 mb-6 mt-4">
              {reg.source === "ONDT" ? <ShieldAlert className="w-6 h-6 text-sapphire-500" /> : <FileSignature className="w-6 h-6 text-sapphire-500" />}
              <span className="text-sm font-semibold text-sapphire-500">{reg.annee}</span>
            </div>
            
            <h3 className="text-lg font-display font-bold text-sapphire-900 mb-4 leading-tight">{reg.titre}</h3>
            <p className="text-neutral text-sm mb-6 flex-grow">{reg.description}</p>
            
            <ul className="space-y-3 border-t border-sapphire-50/50 pt-6">
              {reg.points_cles.map((pt, i) => (
                <li key={i} className="flex gap-2 text-sm text-sapphire-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                  <span className="leading-snug">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-br from-sapphire-900 to-sapphire-800 text-white-pure rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="max-w-xl">
          <h3 className="text-2xl font-display font-bold mb-4">Consentement Éclairé Bilingue (FR/AR)</h3>
          <p className="text-sapphire-100/80 text-sm leading-relaxed mb-0">
            Générez automatiquement le formulaire de consentement légal adapté aux patients tunisiens, incluant les avertissements parodontaux requis par le code de déontologie.
          </p>
        </div>
        
        {isClient ? (
          <PDFDownloadLink
            document={<ConsentementPDF />}
            fileName="consentement-eclaire-paro-ortho.pdf"
            className="bg-gold-500 hover:bg-gold-600 text-sapphire-900 font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full md:w-auto shrink-0 whitespace-nowrap text-center"
          >
            {/* @ts-ignore */}
            {({ loading }) => (loading ? 'Génération...' : 'Générer PDF (العربية / FR)')}
          </PDFDownloadLink>
        ) : (
          <button className="bg-gold-500/50 text-sapphire-900/50 font-bold px-8 py-4 rounded-xl cursor-not-allowed w-full md:w-auto shrink-0">
            Chargement...
          </button>
        )}
      </div>
    </div>
  );
}
