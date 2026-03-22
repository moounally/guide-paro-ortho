"use client";

import { Printer } from "lucide-react";
import { useEffect, useState } from "react";

export function PrintButton() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!isClient) return null;

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-3 px-8 py-4 bg-sapphire-900 text-white-pure rounded-full font-bold hover:bg-sapphire-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
    >
      <Printer className="w-5 h-5" />
      Imprimer le Dossier Patient Complet
    </button>
  );
}
