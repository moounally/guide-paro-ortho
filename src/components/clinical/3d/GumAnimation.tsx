"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToothScene } from "./ToothScene";
import { Activity, ShieldCheck, Settings, Eye } from "lucide-react";
import { Sparkles } from "lucide-react"; // Added Sparkles import

export function GumAnimation() {
  const [healthState, setHealthState] = useState<'healthy' | 'inflamed'>('healthy');
  const [device, setDevice] = useState<'aligner' | 'bracket'>('aligner');

  return (
    <div className="w-full h-full min-h-[550px] bg-white-pure rounded-3xl border border-sapphire-50 shadow-xl overflow-hidden flex flex-col">
      {/* En-tête du Simulateur */}
      <div className="w-full shrink-0 px-6 py-4 bg-sapphire-900 text-white-pure flex justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-display font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-500" /> Simulateur Clinique
          </h3>
          <p className="text-sapphire-100/80 text-xs hidden md:block">Observez l'impact direct du dispositif sur le parodonte.</p>
        </div>
        
        <button 
          onClick={() => { setHealthState('healthy'); setDevice('aligner'); }} // Changed device_none to aligner for reset
          className="px-4 py-2 rounded-full border border-sapphire-500 hover:bg-sapphire-800 transition-colors text-xs font-semibold whitespace-nowrap"
        >
          Réinitialiser la vue
        </button>
      </div>

      {/* 3D Canvas Area */}
      <div className="w-full flex-1 relative min-h-[250px] bg-gradient-to-b from-neutral-50 to-neutral-200/50 cursor-grab active:cursor-grabbing border-b border-sapphire-100">
        <ToothScene state={healthState} isAligner={device === 'aligner'} />
        
        {/* Status badge in the top corner of the canvas */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={healthState + device}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute top-4 left-1/2 -translate-x-1/2 md:top-6 md:left-6 md:-translate-x-0 px-4 md:px-5 py-2 rounded-full font-bold shadow-md flex items-center gap-2 text-xs md:text-sm tracking-wide z-10 transition-colors
              ${healthState === 'healthy' ? 'bg-success text-white-pure border-2 border-emerald-400' : 'bg-danger text-white-pure border-2 border-rose-400'}
            `}
          >
            {healthState === 'healthy' ? <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" /> : <Activity className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />}
            {healthState === 'healthy' ? 'Parodonte Sain / Contrôlé' : 'Gingivite / Inflammation'}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Panel (Solid Bottom Bar - No overlays) */}
      <div className="w-full shrink-0 bg-off-white p-4 md:p-6">
         <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-center max-w-4xl mx-auto">
            
            {/* Health Toggle */}
            <div className="flex-1 bg-white-pure p-3 rounded-2xl shadow-sm border border-sapphire-100">
              <h4 className="text-[11px] font-bold text-sapphire-900 mb-2 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-sapphire-500" /> État Gingival
              </h4>
              <div className="flex bg-neutral-100 p-1 rounded-xl border border-sapphire-50">
                <button 
                  onClick={() => setHealthState('healthy')}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all ${healthState === 'healthy' ? 'bg-success text-white-pure shadow' : 'text-neutral hover:bg-white-pure hover:shadow-sm'}`}
                >
                  Intact
                </button>
                <button 
                  onClick={() => setHealthState('inflamed')}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all ${healthState === 'inflamed' ? 'bg-danger text-white-pure shadow' : 'text-neutral hover:bg-white-pure hover:shadow-sm'}`}
                >
                  Enflammé
                </button>
              </div>
            </div>

            {/* Device Toggle */}
            <div className="flex-1 bg-white-pure p-3 rounded-2xl shadow-sm border border-sapphire-100">
              <h4 className="text-[11px] font-bold text-sapphire-900 mb-2 uppercase tracking-wider flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-sapphire-500" /> Dispositif Orthodontique
              </h4>
              <div className="flex bg-neutral-100 p-1 rounded-xl border border-sapphire-50">
                <button 
                  onClick={() => setDevice('aligner')}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${device === 'aligner' ? 'bg-sapphire-500 text-white-pure shadow' : 'text-neutral hover:bg-white-pure hover:shadow-sm'}`}
                >
                  <Eye className="w-3.5 h-3.5 opacity-70" /> Aligneurs
                </button>
                <button 
                  onClick={() => setDevice('bracket')}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${device === 'bracket' ? 'bg-sapphire-500 text-white-pure shadow' : 'text-neutral hover:bg-white-pure hover:shadow-sm'}`}
                >
                  <Eye className="w-3.5 h-3.5 opacity-70" /> Multi-attaches
                </button>
              </div>
            </div>
            
         </div>
         
         {/* Contextual Info */}
         <div className="w-full text-center mt-3 text-[11px] font-medium text-sapphire-900/80 max-w-xl mx-auto px-2">
            {healthState === 'healthy' 
              ? "💡 L'absence de plaque maintient l'intégrité de l'attache épithéliale (Gingival Index = 0)." 
              : "⚠️ Vasodilatation et œdème dus à la rétention de plaque et difficulté de brossage."}
         </div>
      </div>
    </div>
  );
}
