"use client";

import { useState } from "react";
import { User, Calendar, Stethoscope, FileDigit, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClinicalStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

export function PatientHeader() {
  const [isSaved, setIsSaved] = useState(false);
  const patient = useClinicalStore(state => state.patient);
  const setPatient = useClinicalStore(state => state.setPatient);
  const { t } = useI18n();

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-white-pure rounded-3xl p-8 border border-sapphire-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-sapphire-500 rounded-l-3xl"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-sapphire-50/50">
        <div>
          <h2 className="text-2xl font-display font-bold text-sapphire-900">{t('patient.title')}</h2>
          <p className="text-sm text-sapphire-700/80">{t('patient.desc')}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${isSaved ? 'bg-emerald-500 text-white-pure' : 'bg-sapphire-100 text-sapphire-900 hover:bg-sapphire-200'}`}
          >
            <Save className="w-4 h-4" />
            {isSaved ? t('patient.saved') : t('patient.save')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-sapphire-700 uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4" /> {t('patient.name')}
          </Label>
          <Input 
            value={patient.nom}
            onChange={(e) => setPatient({ nom: e.target.value })}
            placeholder={t('patient.name.ph')} 
            className="bg-off-white border-sapphire-100 focus-visible:ring-sapphire-500" 
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs font-bold text-sapphire-700 uppercase tracking-wider flex items-center gap-2">
            <FileDigit className="w-4 h-4" /> {t('patient.id')}
          </Label>
          <Input 
            value={patient.cin}
            onChange={(e) => setPatient({ cin: e.target.value })}
            placeholder={t('patient.id.ph')} 
            className="bg-off-white font-mono text-sm border-sapphire-100 focus-visible:ring-sapphire-500" 
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-sapphire-700 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {t('patient.date')}
          </Label>
          <Input 
            type="date" 
            value={patient.date}
            onChange={(e) => setPatient({ date: e.target.value })}
            className="bg-off-white border-sapphire-100 focus-visible:ring-sapphire-500" 
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-sapphire-700 uppercase tracking-wider flex items-center gap-2">
            <Stethoscope className="w-4 h-4" /> {t('patient.dr')}
          </Label>
          <Input 
            value={patient.praticien}
            onChange={(e) => setPatient({ praticien: e.target.value })}
            placeholder="Dr." 
            className="bg-off-white border-sapphire-100 focus-visible:ring-sapphire-500" 
          />
        </div>
      </div>
    </div>
  );
}
