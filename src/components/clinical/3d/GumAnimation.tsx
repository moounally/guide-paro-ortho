"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToothScene } from "./ToothScene";
import { Activity, ShieldCheck, Settings, Eye } from "lucide-react";

export function GumAnimation() {
  const [healthState, setHealthState] = useState<'healthy' | 'inflamed'>('healthy');
  const [device, setDevice] = useState<'aligner' | 'bracket'>('aligner');

  return (
    <div className="w-full bg-white-pure rounded-3xl border border-sapphire-50 shadow-lg overflow-hidden flex flex-col md:flex-row">
      {/* 3D Canvas Area */}
      <div className="w-full md:w-2/3 h-[500px] relative">
        <ToothScene state={healthState} isAligner={device === 'aligner'} />
        
        {/* Floating status badges in the 3D space */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={healthState + device}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute top-6 left-6 px-4 py-2 rounded-full font-semibold text-sm shadow-md flex items-center gap-2
              ${healthState === 'healthy' ? 'bg-emerald-500 text-white-pure' : 'bg-rose-600 text-white-pure'}
            `}
          >
            {healthState === 'healthy' ? <ShieldCheck className="w-5 h-5 text-white-pure" /> : <Activity className="w-5 h-5 text-white-pure" />}
            {healthState === 'healthy' ? 'Parodonte Sain / Contrôlé' : 'Gingivite / Inflammation'}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Panel */}
      <div className="w-full md:w-1/3 p-8 bg-off-white flex flex-col justify-center border-l border-sapphire-50/50">
        <h3 className="text-2xl font-display font-semibold text-sapphire-900 mb-2">Simulateur Clinique</h3>
        <p className="text-neutral text-sm mb-10">Observez l'impact direct du choix du dispositif sur l'état inflammatoire parodontal.</p>
        
        <div className="space-y-8">
          {/* Health Toggle */}
          <div>
            <h4 className="text-sm font-semibold text-sapphire-900 mb-3 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-sapphire-500" /> État Gingival
            </h4>
            <div className="flex bg-white-pure p-1 rounded-xl border border-sapphire-50 shadow-inner">
              <button 
                onClick={() => setHealthState('healthy')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${healthState === 'healthy' ? 'bg-success text-white-pure shadow' : 'text-neutral hover:bg-success/5'}`}
              >
                Intact
              </button>
              <button 
                onClick={() => setHealthState('inflamed')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${healthState === 'inflamed' ? 'bg-danger text-white-pure shadow' : 'text-neutral hover:bg-danger/5'}`}
              >
                Enflammé
              </button>
            </div>
            <p className="text-xs text-neutral/70 mt-3 px-1 italic">
              {healthState === 'healthy' 
                ? "L'absence de plaque évite l'hyperhémie gingivale (Gingival Index = 0)." 
                : "Aggravation due à la rétention de plaque et difficulté de brossage."}
            </p>
          </div>

          <div className="h-px w-full bg-sapphire-50/50"></div>

          {/* Device Toggle */}
          <div>
            <h4 className="text-sm font-semibold text-sapphire-900 mb-3 uppercase tracking-wider flex items-center gap-2">
              <Settings className="w-4 h-4 text-sapphire-500" /> Dispositif Ortho
            </h4>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => { setDevice('aligner'); setHealthState('healthy'); }}
                className={`px-4 py-3 rounded-xl border text-left flex items-center justify-between transition-all ${device === 'aligner' ? 'border-sapphire-500 bg-sapphire-50/50 shadow-sm' : 'border-transparent bg-white-pure hover:border-sapphire-200'}`}
              >
                <span className="font-semibold text-sapphire-900 text-sm">Aligneurs Transparents</span>
                {device === 'aligner' && <Eye className="w-4 h-4 text-sapphire-500" />}
              </button>
              <button 
                onClick={() => { setDevice('bracket'); setHealthState('inflamed'); }} // Force inflammation when clicking brackets for demo
                className={`px-4 py-3 rounded-xl border text-left flex items-center justify-between transition-all ${device === 'bracket' ? 'border-danger/50 bg-danger/5 shadow-sm' : 'border-transparent bg-white-pure hover:border-danger/20'}`}
              >
                <span className="font-semibold text-sapphire-900 text-sm">Système Multi-attaches</span>
                {device === 'bracket' && <Eye className="w-4 h-4 text-danger" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
