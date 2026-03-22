"use client";

import { useState } from "react";
import { Download, ExternalLink, Quote } from "lucide-react";

const citations = [
  {
    id: 1,
    text: "Ounally Z., Dallel I. (2026). Impact des dispositifs orthodontiques sur la santé parodontale : aligneurs transparents versus systèmes multi-attachés — revue systématique de la littérature. Thèse de doctorat en médecine dentaire, Univ. Monastir.",
    link: "#",
    type: "Thèse Principale (2026)",
  },
  {
    id: 2,
    text: "Llera-Romero, P., et al. (2023). Periodontal health in patients treated with clear aligners vs. fixed appliances: a systematic review and meta-analysis. Systematic Reviews.",
    link: "https://pubmed.ncbi.nlm.nih.gov/xxxxxx",
    type: "Méta-analyse (2023)",
  },
  {
    id: 3,
    text: "Di Spirito, F., et al. (2023). Clear Aligners versus Fixed Appliances in the Periodontal Repercussions. Umbrella review.",
    link: "https://pubmed.ncbi.nlm.nih.gov/37xxx",
    type: "Umbrella Review (2023)",
  }
];

export function BibliographyCard() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full bg-sapphire-900 border border-sapphire-700 rounded-2xl p-8 text-white-pure shadow-lg shadow-sapphire-900/20">
      <div className="flex items-center gap-4 mb-8 border-b border-sapphire-700/50 pb-6">
        <div className="bg-gold-500 rounded-full p-3">
          <Quote className="w-6 h-6 text-sapphire-900" />
        </div>
        <div>
          <h3 className="text-2xl font-display font-bold text-white-pure">Bibliographie Essentielle</h3>
          <p className="text-sapphire-100/70 text-sm">Références majeures recommandées pour export APA/Vancouver.</p>
        </div>
      </div>

      <div className="space-y-6">
        {citations.map(cit => (
          <div key={cit.id} className="group relative bg-white/5 hover:bg-white/10 transition-colors p-5 rounded-xl border border-white/5">
            <span className="absolute top-4 right-5 text-xs font-semibold px-2 py-1 bg-gold-500/20 text-gold-300 rounded">
              {cit.type}
            </span>
            <p className="text-sapphire-50 font-clinical leading-relaxed pr-24 mb-4">
              {cit.text}
            </p>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleCopy(cit.id, cit.text)}
                className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors text-white-pure"
              >
                {copiedId === cit.id ? "Copié !" : "Copier la citation"}
              </button>
              
              {cit.link !== "#" && (
                <a href={cit.link} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded hover:text-gold-400 transition-colors text-sapphire-200">
                  PMID / Lien <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-sapphire-700/50 flex justify-between items-center sm:flex-row flex-col gap-4">
        <p className="text-xs text-sapphire-200/50">Pour la liste exhaustive des 22 études, référez-vous au tableau ci-dessus.</p>
        <button className="flex items-center gap-2 text-sm bg-gold-500 hover:bg-gold-600 text-sapphire-900 font-bold px-4 py-2 rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          Télécharger .RIS / .BIB
        </button>
      </div>
    </div>
  );
}
