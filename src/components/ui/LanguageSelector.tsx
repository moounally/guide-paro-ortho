"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية (Tunisie)', flag: '🇹🇳' }
];

type LangCode = 'fr' | 'en' | 'ar';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useI18n();

  const changeLanguage = (langCode: LangCode) => {
    setLang(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-sapphire-50/50 hover:bg-sapphire-100 rounded-full transition-colors text-sapphire-900 text-sm font-semibold border border-sapphire-200"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{languages.find(l => l.code === lang)?.name}</span>
        <span className="sm:hidden">{languages.find(l => l.code === lang)?.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white-pure border border-sapphire-100 shadow-xl rounded-2xl overflow-hidden py-2 min-w-[200px]">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => changeLanguage(l.code as LangCode)}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-sapphire-50 transition-colors flex items-center gap-3 ${
                lang === l.code ? 'bg-sapphire-50/50 font-bold text-sapphire-900' : 'text-sapphire-700'
              }`}
            >
              <span className="text-xl">{l.flag}</span>
              {l.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
