"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { riskScoreSchema, RiskScoreData } from "@/types/clinical";
import { calculateTotalScore, determineRiskLevel, getRiskLevelDetails } from "@/lib/score-calculator";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ClinicalBadge } from "@/components/ui/ClinicalBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { useClinicalStore } from "@/lib/store";

const criteria = [
  {
    name: "biotype" as const,
    label: "Biotype Parodontal",
    options: [
      { value: "0", label: "0 - Épais (Résistant)" },
      { value: "1", label: "1 - Moyen" },
      { value: "2", label: "2 - Fin / Festonné (Risque récession)" }
    ]
  },
  {
    name: "bop" as const,
    label: "Saignement au Sondage (BOP)",
    options: [
      { value: "0", label: "0 - < 10% (Sain clinique)" },
      { value: "1", label: "1 - 10% à 25% (Gingivite localisée)" },
      { value: "2", label: "2 - > 25% (Inflammation généralisée)" }
    ]
  },
  {
    name: "ppd" as const,
    label: "Profondeur de Poche (PPD)",
    options: [
      { value: "0", label: "0 - ≤ 3 mm (Sain)" },
      { value: "1", label: "1 - 4 à 5 mm (Poches modérées/pseudo-poches)" },
      { value: "2", label: "2 - ≥ 6 mm (Poches profondes)" }
    ]
  },
  {
    name: "antecedents" as const,
    label: "Antécédents Parodontaux / Perte Osseuse",
    options: [
      { value: "0", label: "0 - Aucun (Intact)" },
      { value: "1", label: "1 - Parodontite traitée / stabilisée" },
      { value: "2", label: "2 - Parodontite active / Récidive" }
    ]
  },
  {
    name: "pi" as const,
    label: "Indice de Plaque (PI)",
    options: [
      { value: "0", label: "0 - < 15% (Bonne hygiène)" },
      { value: "1", label: "1 - 15% à 30% (Hygiène moyenne)" },
      { value: "2", label: "2 - > 30% (Hygiène insuffisante)" }
    ]
  },
  {
    name: "systemic" as const,
    label: "Facteurs Systémiques (Tabac, Diabète)",
    options: [
      { value: "0", label: "0 - Aucun" },
      { value: "1", label: "1 - Tabac <10/j ou Diabète équilibré" },
      { value: "2", label: "2 - Tabac ≥10/j ou HbA1c >7%" }
    ]
  },
  {
    name: "compliance" as const,
    label: "Compliance / Coopération Patient",
    options: [
      { value: "0", label: "0 - Excellente" },
      { value: "1", label: "1 - Moyenne (Motivation nécessaire)" },
      { value: "2", label: "2 - Faible (Rappels fréquents requis)" }
    ]
  }
];

export function RiskScoreWidget() {
  const [totalScore, setTotalScore] = useState(0);

  const form = useForm<RiskScoreData>({
    resolver: zodResolver(riskScoreSchema),
    defaultValues: {
      biotype: "0",
      bop: "0",
      ppd: "0",
      antecedents: "0",
      pi: "0",
      systemic: "0",
      compliance: "0"
    },
    mode: "onChange"
  });

  const watchAll = form.watch();

  const { setRisk } = useClinicalStore();

  useEffect(() => {
    const score = calculateTotalScore(watchAll as RiskScoreData);
    if (!isNaN(score)) {
      setTotalScore(score);
      const riskLevel = determineRiskLevel(score);
      const details = getRiskLevelDetails(riskLevel);
      
      setRisk({
        totalScore: score,
        categorie: details.label,
        protocole: details.protocol
      });
    }
  }, [watchAll, setRisk]);

  const riskLevel = determineRiskLevel(totalScore);
  const details = getRiskLevelDetails(riskLevel);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <form className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {criteria.map((c) => (
              <Controller
                key={c.name}
                control={form.control}
                name={c.name}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="text-sm text-sapphire-900 font-semibold block">{c.label}</label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white-pure border-sapphire-50 focus:ring-sapphire-500 w-full">
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        {c.options.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            ))}
          </div>
        </form>
      </div>

      <div className="md:col-span-1">
        <div className="sticky top-24 bg-white-pure rounded-2xl border border-sapphire-50 shadow-sm p-6 text-center transition-all duration-300">
          <h3 className="text-sm font-semibold uppercase text-sapphire-700 tracking-wider mb-2">Score Total</h3>
          
          <div className="flex justify-center items-baseline gap-1 my-4">
            <span className="text-6xl font-display font-bold text-sapphire-900">
              <AnimatedCounter value={totalScore} duration={0.8} />
            </span>
            <span className="text-2xl text-neutral/50 font-light">/ 14</span>
          </div>

          <div className="mb-6">
            <ClinicalBadge level={details.color as "neutral" | "success" | "warning" | "danger"} className="px-4 py-1.5 text-sm uppercase animate-pulse">
              {details.label}
            </ClinicalBadge>
          </div>

          <div className="bg-off-white rounded-xl p-4 text-left border border-sapphire-50/50">
            <h4 className="font-semibold text-sapphire-900 mb-2">{details.protocol}</h4>
            <p className="text-sm text-neutral leading-relaxed">{details.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
