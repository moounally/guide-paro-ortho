"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "fr" | "en" | "ar";

const translations = {
  fr: {
    "nav.revue": "Revue Systématique",
    "nav.protocoles": "Protocoles Tunisie",
    "nav.dossier": "Dossier Patient",
    "hero.title1": "Orthodontie &",
    "hero.title2": "Parodontie",
    "hero.subtitle": "Le premier guide interactif basé sur l'évidence médicale comparant l'impact parodontal des aligneurs transparents versus systèmes multi-attachés.",
    "hero.cta1": "Démarrer une Évaluation",
    "hero.cta2": "Consulter les 22 Études",
    "form.phase1": "Phase 1 : Évaluation du Risque Initial",
    "form.phase2": "Phase 2 : Arbre Décisionnel",
    "form.phase3": "Phase 3 : Suivi Clinique (Monitoring)",
    "form.print": "Imprimer le Dossier Patient Complet",
    "cta.footer": "Un Outil Décisionnel Pour Votre Pratique",
    "export.title": "Impression Officielle du Dossier",
    "export.subtitle": "Générez un PDF complet incluant l'arbre et le tableau en utilisant l'impression native."
  },
  en: {
    "nav.revue": "Systematic Review",
    "nav.protocoles": "Tunisia Protocols",
    "nav.dossier": "Patient Record",
    "hero.title1": "Orthodontics &",
    "hero.title2": "Periodontics",
    "hero.subtitle": "The first interactive evidence-based guide comparing the periodontal impact of clear aligners versus multi-bracket systems.",
    "hero.cta1": "Start Evaluation",
    "hero.cta2": "View 22 Studies",
    "form.phase1": "Phase 1: Initial Risk Assessment",
    "form.phase2": "Phase 2: Decision Tree",
    "form.phase3": "Phase 3: Clinical Monitoring",
    "form.print": "Print Complete Patient Record",
    "cta.footer": "A Decision Tool For Your Practice",
    "export.title": "Official Patient Record Export",
    "export.subtitle": "Generate a complete PDF including the graphical tree and the monitoring grid via native printing."
  },
  ar: {
    "nav.revue": "مراجعة منهجية",
    "nav.protocoles": "البروتوكولات (تونس)",
    "nav.dossier": "ملف المريض",
    "hero.title1": "تقويم و",
    "hero.title2": "أمراض اللثة",
    "hero.subtitle": "أول دليل تفاعلي مبني على الأدلة الطبية يقارن التأثير الداعم للأسنان للمقومات الشفافة مقارنة بالأنظمة التقليدية.",
    "hero.cta1": "بدء التقييم",
    "hero.cta2": "تصفح 22 دراسة",
    "form.phase1": "المرحلة الأولى: تقييم المخاطر الأولية",
    "form.phase2": "المرحلة الثانية: شجرة اتخاذ القرار",
    "form.phase3": "المرحلة الثالثة: المراقبة السريرية",
    "form.print": "طباعة ملف المريض الكامل",
    "cta.footer": "أداة قرار لممارستك",
    "export.title": "طباعة الملف الطبي الرسمي",
    "export.subtitle": "قم بإنشاء ملف PDF كامل يتضمن شجرة القرار وجدول المراقبة عبر الطباعة الأصلية للمتصفح."
  }
};

type TranslationKey = keyof typeof translations.fr;

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("fr");

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations.fr[key] || key;
  };

  const isRtl = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isRtl }}>
      <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-sans rtl text-right" : ""}>
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
