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
import { useI18n } from "@/lib/i18n";

export function RiskScoreWidget() {
  const { t } = useI18n();

  const criteria = [
    {
      name: "biotype" as const,
      label: t('risk.biotype'),
      options: [
        { value: "0", label: t('risk.bio.0') },
        { value: "1", label: t('risk.bio.1') },
        { value: "2", label: t('risk.bio.2') }
      ]
    },
    {
      name: "bop" as const,
      label: t('risk.bop'),
      options: [
        { value: "0", label: t('risk.bop.0') },
        { value: "1", label: t('risk.bop.1') },
        { value: "2", label: t('risk.bop.2') }
      ]
    },
    {
      name: "ppd" as const,
      label: t('risk.ppd'),
      options: [
        { value: "0", label: t('risk.ppd.0') },
        { value: "1", label: t('risk.ppd.1') },
        { value: "2", label: t('risk.ppd.2') }
      ]
    },
    {
      name: "antecedents" as const,
      label: t('risk.ant'),
      options: [
        { value: "0", label: t('risk.ant.0') },
        { value: "1", label: t('risk.ant.1') },
        { value: "2", label: t('risk.ant.2') }
      ]
    },
    {
      name: "pi" as const,
      label: t('risk.pi'),
      options: [
        { value: "0", label: t('risk.pi.0') },
        { value: "1", label: t('risk.pi.1') },
        { value: "2", label: t('risk.pi.2') }
      ]
    },
    {
      name: "systemic" as const,
      label: t('risk.sys'),
      options: [
        { value: "0", label: t('risk.sys.0') },
        { value: "1", label: t('risk.sys.1') },
        { value: "2", label: t('risk.sys.2') }
      ]
    },
    {
      name: "compliance" as const,
      label: t('risk.comp'),
      options: [
        { value: "0", label: t('risk.comp.0') },
        { value: "1", label: t('risk.comp.1') },
        { value: "2", label: t('risk.comp.2') }
      ]
    }
  ];
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

  const setRisk = useClinicalStore(state => state.setRisk);
  const watchAll = form.watch();

  // Stabiliser la référence pour éviter les boucles de rendu
  const watchValuesString = JSON.stringify(watchAll);

  useEffect(() => {
    const data = JSON.parse(watchValuesString) as RiskScoreData;
    const score = calculateTotalScore(data);
    
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
  }, [watchValuesString, setRisk]);

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
          <h3 className="text-sm font-semibold uppercase text-sapphire-700 tracking-wider mb-2">{t('risk.score')}</h3>
          
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
