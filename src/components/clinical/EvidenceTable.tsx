"use client";

import { useState } from "react";
import { studies as clinicalData, Study } from "@/lib/clinical-data";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

export function EvidenceTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDispositif, setFilterDispositif] = useState<string>("All");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Study; direction: 'asc' | 'desc' } | null>({ key: 'annee', direction: 'desc' });

  // Filtering
  const filteredData = clinicalData.filter((study: Study) => {
    const matchesSearch = study.auteur.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (study.conclusion?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesDispositif = filterDispositif === "All" || study.dispositif === filterDispositif;
    return matchesSearch && matchesDispositif;
  });

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const valA = a[key] ?? '';
    const valB = b[key] ?? '';
    
    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key: keyof Study) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key: keyof Study) => {
    if (!sortConfig || sortConfig.key !== key) return <ChevronDown className="w-4 h-4 opacity-20" />;
    return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white-pure p-4 rounded-xl border border-sapphire-50 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral/50" />
          <input 
            type="text" 
            placeholder="Rechercher auteur, conclusion..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-sapphire-50 focus:outline-none focus:ring-2 focus:ring-sapphire-300"
          />
        </div>
        
        <select 
          value={filterDispositif} 
          onChange={(e) => setFilterDispositif(e.target.value)}
          className="w-full md:w-auto px-4 py-2 rounded-lg border border-sapphire-50 focus:outline-none focus:ring-2 focus:ring-sapphire-300 bg-white-pure"
        >
          <option value="All">Tous les dispositifs</option>
          <option value="Aligneurs">Aligneurs</option>
          <option value="Multi-attaches">Multi-attaches</option>
          <option value="Comparatif">Comparatif</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-sapphire-50 shadow-sm bg-white-pure">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-off-white text-sapphire-900">
            <tr>
              <th className="p-4 border-b font-semibold cursor-pointer hover:bg-sapphire-50/50 transition-colors" onClick={() => requestSort('auteur')}>
                <div className="flex items-center gap-1">Auteur {renderSortIcon('auteur')}</div>
              </th>
              <th className="p-4 border-b font-semibold cursor-pointer hover:bg-sapphire-50/50 transition-colors" onClick={() => requestSort('annee')}>
                <div className="flex items-center gap-1">Année {renderSortIcon('annee')}</div>
              </th>
              <th className="p-4 border-b font-semibold cursor-pointer hover:bg-sapphire-50/50 transition-colors" onClick={() => requestSort('dispositif')}>
                <div className="flex items-center gap-1">Dispositif {renderSortIcon('dispositif')}</div>
              </th>
              <th className="p-4 border-b font-semibold">Conclusion Clinique</th>
              <th className="p-4 border-b font-semibold">Impact PI</th>
              <th className="p-4 border-b font-semibold">Impact BOP</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map(study => (
                <tr key={study.id} className="hover:bg-off-white/50 transition-colors border-b last:border-0 border-sapphire-50/30">
                  <td className="p-4 font-medium text-sapphire-700 whitespace-nowrap">{study.auteur}</td>
                  <td className="p-4 font-clinical">{study.annee}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      study.dispositif === 'Aligneurs' ? 'bg-success/10 text-success' :
                      study.dispositif === 'Multi-attaches' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'
                    }`}>
                      {study.dispositif}
                    </span>
                  </td>
                  <td className="p-4 text-neutral">{study.conclusion}</td>
                  <td className="p-4 text-xs font-medium">{study.impact_pi}</td>
                  <td className="p-4 text-xs font-medium">{study.impact_bop}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-neutral/50">Aucune étude ne correspond à vos critères.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="text-right text-xs text-neutral/60 italic">
        Affichage de {sortedData.length} sur {clinicalData.length} études.
      </div>
    </div>
  );
}
