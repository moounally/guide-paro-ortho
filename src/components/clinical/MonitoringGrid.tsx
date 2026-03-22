"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ParamKey = 'pi' | 'gi' | 'bop' | 'ppd' | 'cal';

interface RDVData {
  id: number;
  date: string;
  pi: number | '';
  gi: number | '';
  bop: number | '';
  ppd: number | '';
  cal: number | '';
  notes: string;
}

const paramsConfig = [
  { key: 'pi', label: 'Indice PI (%)', threshold: 20 },
  { key: 'gi', label: 'Indice GI (0-3)', threshold: 1 },
  { key: 'bop', label: 'BOP (%)', threshold: 10 },
  { key: 'ppd', label: 'PPD (mm)', threshold: 4 },
  { key: 'cal', label: 'CAL (mm)', threshold: 2 },
];

export function MonitoringGrid() {
  const [rdvs, setRdvs] = useState<RDVData[]>([
    { id: 1, date: '', pi: '', gi: '', bop: '', ppd: '', cal: '', notes: 'Initial' },
    { id: 2, date: '', pi: '', gi: '', bop: '', ppd: '', cal: '', notes: 'Mois 1' },
    { id: 3, date: '', pi: '', gi: '', bop: '', ppd: '', cal: '', notes: 'Mois 3' },
    { id: 4, date: '', pi: '', gi: '', bop: '', ppd: '', cal: '', notes: 'Mois 6' },
  ]);

  const handleChange = (id: number, field: keyof RDVData, value: string) => {
    setRdvs(prev => prev.map(rdv => rdv.id === id ? { ...rdv, [field]: value === '' ? '' : field === 'date' || field === 'notes' ? value : Number(value) } : rdv));
  };

  const isAlert = (key: ParamKey, value: number | '') => {
    if (value === '') return false;
    const config = paramsConfig.find(p => p.key === key);
    return config && Number(value) >= config.threshold;
  };

  const getEscaladeMessage = (rdv: RDVData) => {
    let alerts = 0;
    if (isAlert('pi', rdv.pi)) alerts++;
    if (isAlert('bop', rdv.bop)) alerts++;
    if (isAlert('ppd', rdv.ppd)) alerts++;
    
    if (alerts >= 2 || isAlert('cal', rdv.cal)) return { text: "⚠️ ALERTE : Arrêt Ortho + Adresser Parodontiste", color: "text-danger" };
    if (alerts === 1) return { text: "⚡ VIGILANCE : Renforcer Motivation Hygiène", color: "text-warning" };
    if (rdv.pi !== '' && rdv.bop !== '') return { text: "✅ PARAMÈTRES CONTRÔLÉS : Continuer", color: "text-success" };
    return { text: "En attente de données", color: "text-neutral/50" };
  };

  return (
    <div className="w-full bg-white-pure rounded-3xl border border-sapphire-100 shadow-sm overflow-hidden p-4 md:p-8">
      <div className="w-full overflow-hidden h-[300px] sm:h-[450px] lg:h-auto pb-6">
        <div className="w-[900px] lg:w-full origin-top-left lg:origin-top scale-[0.35] sm:scale-[0.6] lg:scale-100 transition-transform pr-4">
          <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-3 border-b text-sapphire-900 font-semibold w-24">RDV</th>
              <th className="p-4 border-b-2 border-sapphire-100 text-sapphire-900 font-bold w-36 uppercase text-xs tracking-wider">Date</th>
              {paramsConfig.map(p => (
                <th key={p.key} className="p-4 border-b-2 border-sapphire-100 text-sapphire-900 font-bold w-24 uppercase text-xs tracking-wider" title={`Alerte si ≥ ${p.threshold}`}>
                  {p.label}
                </th>
              ))}
              <th className="p-4 border-b-2 border-sapphire-100 text-sapphire-900 font-bold flex-1 uppercase text-xs tracking-wider">Escalade / Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sapphire-50/50">
            {rdvs.map((rdv) => {
              const escalade = getEscaladeMessage(rdv);
              return (
                <tr key={rdv.id} className="hover:bg-off-white/50 transition-colors group">
                  <td className="p-4 align-top">
                    <span className="font-bold text-sapphire-800 bg-sapphire-50 px-3 py-1.5 rounded-lg text-sm group-hover:bg-sapphire-100 transition-colors">{rdv.notes.split(' ')[0]}</span>
                  </td>
                  <td className="p-4 align-top">
                    <Input 
                      type="date" 
                      value={rdv.date} 
                      onChange={(e) => handleChange(rdv.id, 'date', e.target.value)}
                      className="h-9"
                    />
                  </td>
                  {paramsConfig.map(p => (
                    <td key={p.key} className="p-3 border-b align-top">
                      <Input 
                        type="number" 
                        min="0"
                        value={rdv[p.key as ParamKey]} 
                        onChange={(e) => handleChange(rdv.id, p.key as ParamKey, e.target.value)}
                        className={cn("h-9 font-clinical w-20", isAlert(p.key as ParamKey, rdv[p.key as ParamKey]) && "bg-danger/10 border-danger/50 text-danger focus-visible:ring-danger")}
                      />
                    </td>
                  ))}
                  <td className="p-3 border-b align-top">
                    <div className="flex flex-col gap-2">
                      <span className={cn("text-xs font-bold px-3 py-1.5 rounded-lg w-max shadow-sm border", escalade.color.includes('danger') ? 'bg-danger/10 border-danger/20' : escalade.color.includes('warning') ? 'bg-warning/10 border-warning/20' : escalade.color.includes('success') ? 'bg-success/10 border-success/20' : 'bg-neutral/5 border-neutral/10', escalade.color)}>
                        {escalade.text}
                      </span>
                      <Input 
                        placeholder="Notes cliniques spécifiques..." 
                        value={rdv.notes} 
                        onChange={(e) => handleChange(rdv.id, 'notes', e.target.value)}
                        className="h-9 text-sm italic bg-off-white/50 border-sapphire-50/50 focus-visible:bg-white-pure mt-1"
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-sapphire-50/50 text-xs text-neutral/70 font-medium flex justify-end gap-2 items-center bg-white-pure">
        <span className="px-2 py-1 bg-sapphire-50 rounded text-sapphire-800">PI ≥ 20%</span>
        <span className="px-2 py-1 bg-sapphire-50 rounded text-sapphire-800">GI ≥ 1</span>
        <span className="px-2 py-1 bg-sapphire-50 rounded text-sapphire-800">BOP ≥ 10%</span>
        <span className="px-2 py-1 bg-sapphire-50 rounded text-sapphire-800">PPD ≥ 4mm</span>
        <span className="px-2 py-1 bg-danger/10 border border-danger/20 rounded text-danger-dark font-bold">CAL ≥ 2mm (Arrêt)</span>
      </div>
    </div>
  );
}
