"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية (Tunisie)', flag: '🇹🇳' }
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('fr');

  useEffect(() => {
    // Inject custom CSS to hide Google Translate's built-in UI cleanly
    const style = document.createElement('style');
    style.innerHTML = `
      .skiptranslate iframe, .goog-te-banner-frame { display: none !important; }
      body { top: 0px !important; }
      #google-translate-container { display: none !important; }
      font { background-color: transparent !important; box-shadow: none !important; }
    `;
    document.head.appendChild(style);

    // Provide the initialization callback expected by the script
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'fr',
          includedLanguages: 'fr,en,ar',
          autoDisplay: false,
        },
        'google-translate-container'
      );
    };

    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    addScript.setAttribute("id", "google-translate-script");
    document.body.appendChild(addScript);

    return () => {
      document.getElementById('google-translate-script')?.remove();
      delete (window as any).googleTranslateElementInit;
    };
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    // Wait slightly to ensure the select element has rendered its options
    setTimeout(() => {
      const select = document.querySelector('select.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, 300);
  };

  return (
    <div className="relative z-50">
      <div id="google-translate-container" className="hidden" />
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-sapphire-50/50 hover:bg-sapphire-100 rounded-full transition-colors text-sapphire-900 text-sm font-semibold border border-sapphire-200"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{languages.find(l => l.code === currentLang)?.name}</span>
        <span className="sm:hidden">{languages.find(l => l.code === currentLang)?.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white-pure border border-sapphire-100 shadow-xl rounded-2xl overflow-hidden py-2 min-w-[200px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-sapphire-50 transition-colors flex items-center gap-3 ${
                currentLang === lang.code ? 'bg-sapphire-50/50 font-bold text-sapphire-900' : 'text-sapphire-700'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
