"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XOctagon } from "lucide-react";
import { useClinicalStore } from "@/lib/store";

type NodeId = 'start' | 'sain' | 'paro' | 'active' | 'stabile' | 'ortho_standard' | 'ortho_aligneurs' | 'stop' | 'mid_eval' | 'mid_ok' | 'mid_inflam' | 'mid_stop';

interface TreeNode {
  id: NodeId;
  label: string;
  type: 'decision' | 'endpoint' | 'action';
  level?: 'success' | 'warning' | 'danger';
}

const nodes: Record<NodeId, TreeNode> = {
  start: { id: 'start', label: "Bilan Paro Initial", type: 'decision' },
  sain: { id: 'sain', label: "Parodonte Sain / Gingivite", type: 'action', level: 'success' },
  paro: { id: 'paro', label: "Parodontite", type: 'decision', level: 'warning' },
  active: { id: 'active', label: "Active", type: 'action', level: 'danger' },
  stabile: { id: 'stabile', label: "Stabilisée (Perte osseuse gérée)", type: 'action', level: 'warning' },
  ortho_standard: { id: 'ortho_standard', label: "Ortho Standard + Suivi", type: 'endpoint', level: 'success' },
  ortho_aligneurs: { id: 'ortho_aligneurs', label: "Aligneurs Fortement Recommandés", type: 'endpoint', level: 'success' },
  stop: { id: 'stop', label: "Contre-indication", type: 'endpoint', level: 'danger' },
  
  // Mid-Treatment Nodes
  mid_eval: { id: 'mid_eval', label: "Contrôle à 3/6 Mois", type: 'decision' },
  mid_ok: { id: 'mid_ok', label: "Maintien de l'hygiène", type: 'endpoint', level: 'success' },
  mid_inflam: { id: 'mid_inflam', label: "Poussée Inflammatoire", type: 'action', level: 'warning' },
  mid_stop: { id: 'mid_stop', label: "Retrait Appareil + Causal", type: 'endpoint', level: 'danger' }
};

const edges = [
  { from: 'start', to: 'sain' },
  { from: 'start', to: 'paro' },
  { from: 'sain', to: 'ortho_standard' },
  { from: 'paro', to: 'active' },
  { from: 'paro', to: 'stabile' },
  { from: 'active', to: 'stop' },
  { from: 'stabile', to: 'ortho_aligneurs' },
  { from: 'ortho_standard', to: 'mid_eval' },
  { from: 'ortho_aligneurs', to: 'mid_eval' },
  { from: 'mid_eval', to: 'mid_ok' },
  { from: 'mid_eval', to: 'mid_inflam' },
  { from: 'mid_inflam', to: 'mid_stop' }
];

export function DecisionTree() {
  const [activeNodes, setActiveNodes] = useState<Set<NodeId>>(new Set(['start' as NodeId]));
  const setDecisionNode = useClinicalStore(state => state.setDecisionNode);

  // Mettre à jour le store avec le nœud actif le plus profond
  useEffect(() => {
    let finalLabel = "En cours d'évaluation";
    if (activeNodes.has('mid_stop')) finalLabel = nodes.mid_stop.label;
    else if (activeNodes.has('mid_inflam')) finalLabel = nodes.mid_inflam.label;
    else if (activeNodes.has('mid_ok')) finalLabel = nodes.mid_ok.label;
    else if (activeNodes.has('stop')) finalLabel = nodes.stop.label;
    else if (activeNodes.has('ortho_aligneurs')) finalLabel = nodes.ortho_aligneurs.label;
    else if (activeNodes.has('ortho_standard')) finalLabel = nodes.ortho_standard.label;
    else if (activeNodes.has('stabile')) finalLabel = nodes.stabile.label;
    else if (activeNodes.has('active')) finalLabel = nodes.active.label;
    else if (activeNodes.has('paro')) finalLabel = nodes.paro.label;
    else if (activeNodes.has('sain')) finalLabel = nodes.sain.label;
    
    setDecisionNode(finalLabel);
  }, [activeNodes, setDecisionNode]);

  const parentMap: Partial<Record<NodeId, NodeId>> = {
    sain: 'start',
    paro: 'start',
    ortho_standard: 'sain',
    active: 'paro',
    stabile: 'paro',
    stop: 'active',
    ortho_aligneurs: 'stabile',
    mid_ok: 'mid_eval',
    mid_inflam: 'mid_eval',
    mid_stop: 'mid_inflam'
  };

  const handleNodeClick = (clickedId: NodeId) => {
    let currentId: NodeId | undefined = clickedId;
    const path: NodeId[] = [];
    
    while (currentId) {
      path.push(currentId);
      
      if (currentId === 'mid_eval') {
         if (activeNodes.has('ortho_aligneurs') && !activeNodes.has('ortho_standard')) {
             currentId = 'ortho_aligneurs';
         } else {
             currentId = 'ortho_standard';
         }
      } else {
         currentId = parentMap[currentId];
      }
    }
    
    setActiveNodes(new Set(path));
  };

  const isActive = (id: NodeId) => activeNodes.has(id);
  const isEdgeActive = (from: NodeId, to: NodeId) => isActive(from) && isActive(to);

  return (
    <div className="flex flex-col gap-6">
      {/* Légende */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-sapphire-900 bg-white-pure p-4 rounded-full shadow-sm border border-sapphire-100 max-w-2xl mx-auto">
        <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-sapphire-200"></div> Neutre</span>
        <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success"></div> Favorable</span>
        <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-warning"></div> Vigilance</span>
        <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-danger"></div> C.I. Absolue</span>
      </div>

      <div className="w-full max-w-5xl mx-auto p-4 md:p-8 bg-white-pure rounded-3xl border border-sapphire-100 shadow-lg overflow-hidden">
        {/* Conteneur adaptatif (Vue globale sans scroll) */}
        <div className="w-full flex justify-center pb-8 pt-4 overflow-hidden h-[350px] sm:h-[550px] lg:h-auto">
          <div className="w-[900px] shrink-0 flex flex-col items-center gap-0 relative z-10 px-4 mx-auto origin-top scale-[0.35] sm:scale-[0.6] lg:scale-100 transition-transform">
            
            {/* LIGNE 1 : Bilan Paro Initial */}
            <div className="flex justify-center w-full z-10">
              <TreeNodeComponent node={nodes.start} active={isActive('start')} onClick={() => handleNodeClick('start')} />
            </div>

            {/* CONNECTEUR 1 -> 2 */}
            <div className="w-full max-w-2xl flex relative h-16 justify-center">
               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 50 0 L 25 100" stroke={isEdgeActive('start', 'sain') ? "#B8960C" : "#CBD5E1"} strokeWidth="2" strokeDasharray={isEdgeActive('start', 'sain') ? "none" : "4 4"} fill="none" className="transition-all duration-500" vectorEffect="non-scaling-stroke" />
                  <path d="M 50 0 L 75 100" stroke={isEdgeActive('start', 'paro') ? "#B8960C" : "#CBD5E1"} strokeWidth="2" strokeDasharray={isEdgeActive('start', 'paro') ? "none" : "4 4"} fill="none" className="transition-all duration-500" vectorEffect="non-scaling-stroke" />
               </svg>
            </div>
            
            {/* LIGNE 2 : Diagnostics */}
            <div className="flex justify-between w-full max-w-2xl z-10">
              <div className="flex-1 flex justify-center"><TreeNodeComponent node={nodes.sain} active={isActive('sain')} onClick={() => handleNodeClick('sain')} /></div>
              <div className="flex-1 flex justify-center"><TreeNodeComponent node={nodes.paro} active={isActive('paro')} onClick={() => handleNodeClick('paro')} /></div>
            </div>

            {/* CONNECTEUR 2 -> 3 */}
            <div className="w-full max-w-3xl flex relative h-16 justify-center">
               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 21 0 L 21 100" stroke={isEdgeActive('sain', 'ortho_standard') ? "#B8960C" : "#CBD5E1"} strokeWidth="2" strokeDasharray={isEdgeActive('sain', 'ortho_standard') ? "none" : "4 4"} fill="none" className="transition-all duration-500" vectorEffect="non-scaling-stroke" />
                  <path d="M 79 0 L 50 100" stroke={isEdgeActive('paro', 'active') ? "#B8960C" : "#CBD5E1"} strokeWidth="2" strokeDasharray={isEdgeActive('paro', 'active') ? "none" : "4 4"} fill="none" className="transition-all duration-500" vectorEffect="non-scaling-stroke" />
                  <path d="M 79 0 L 95 100" stroke={isEdgeActive('paro', 'stabile') ? "#B8960C" : "#CBD5E1"} strokeWidth="2" strokeDasharray={isEdgeActive('paro', 'stabile') ? "none" : "4 4"} fill="none" className="transition-all duration-500" vectorEffect="non-scaling-stroke" />
               </svg>
            </div>

            {/* LIGNE 3 : Traitements Initiaux */}
            <div className="flex w-full max-w-3xl z-10 justify-between px-8">
              <div className="flex-1 flex justify-start"><TreeNodeComponent node={nodes.ortho_standard} active={isActive('ortho_standard')} onClick={() => handleNodeClick('ortho_standard')} /></div>
              <div className="flex-1 flex justify-center"><TreeNodeComponent node={nodes.active} active={isActive('active')} onClick={() => handleNodeClick('active')} /></div>
              <div className="flex-1 flex justify-end"><TreeNodeComponent node={nodes.stabile} active={isActive('stabile')} onClick={() => handleNodeClick('stabile')} /></div>
            </div>

            {/* CONNECTEUR 3 -> 4 */}
            <div className="w-full max-w-3xl flex relative h-16 justify-center">
               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 50 0 L 50 100" stroke={isEdgeActive('active', 'stop') ? "#B8960C" : "#CBD5E1"} strokeWidth="2" strokeDasharray={isEdgeActive('active', 'stop') ? "none" : "4 4"} fill="none" className="transition-all duration-500" vectorEffect="non-scaling-stroke" />
                  <path d="M 90 0 L 90 100" stroke={isEdgeActive('stabile', 'ortho_aligneurs') ? "#B8960C" : "#CBD5E1"} strokeWidth="2" strokeDasharray={isEdgeActive('stabile', 'ortho_aligneurs') ? "none" : "4 4"} fill="none" className="transition-all duration-500" vectorEffect="non-scaling-stroke" />
               </svg>
            </div>

            {/* LIGNE 4 : Recommandations */}
             <div className="flex w-full max-w-2xl z-10 justify-end gap-10 pr-10">
                <TreeNodeComponent node={nodes.stop} active={isActive('stop')} onClick={() => handleNodeClick('stop')} />
                <TreeNodeComponent node={nodes.ortho_aligneurs} active={isActive('ortho_aligneurs')} onClick={() => handleNodeClick('ortho_aligneurs')} />
              </div>

            {/* CONNECTEUR Espacement vers Mid-EVAL (les lignes croisées continuent) */}
            <div className="w-full max-w-3xl flex relative h-16 justify-center">
               <svg className="absolute top-[-64px] inset-x-0 w-full h-[128px]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 21 0 L 35 100" stroke={isEdgeActive('ortho_standard', 'mid_eval') ? "#B8960C" : "#CBD5E1"} strokeWidth="2" strokeDasharray={isEdgeActive('ortho_standard', 'mid_eval') ? "none" : "4 4"} fill="none" className="transition-all duration-500" vectorEffect="non-scaling-stroke" />
                  <path d="M 85 0 L 65 100" stroke={isEdgeActive('ortho_aligneurs', 'mid_eval') ? "#B8960C" : "#CBD5E1"} strokeWidth="2" strokeDasharray={isEdgeActive('ortho_aligneurs', 'mid_eval') ? "none" : "4 4"} fill="none" className="transition-all duration-500" vectorEffect="non-scaling-stroke" />
               </svg>
            </div>

            {/* LIGNE 5: Mid Evaluation */}
            <div className="flex justify-center w-full z-10 pb-2">
              <TreeNodeComponent node={nodes.mid_eval} active={isActive('mid_eval')} onClick={() => handleNodeClick('mid_eval')} />
            </div>

            {/* CONNECTEUR 5 -> 6 */}
            <div className="w-full max-w-lg flex relative h-16 justify-center">
               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 50 0 L 25 100" stroke={isEdgeActive('mid_eval', 'mid_ok') ? "#B8960C" : "#CBD5E1"} strokeWidth="2" strokeDasharray={isEdgeActive('mid_eval', 'mid_ok') ? "none" : "4 4"} fill="none" className="transition-all duration-500" vectorEffect="non-scaling-stroke" />
                  <path d="M 50 0 L 75 100" stroke={isEdgeActive('mid_eval', 'mid_inflam') ? "#B8960C" : "#CBD5E1"} strokeWidth="2" strokeDasharray={isEdgeActive('mid_eval', 'mid_inflam') ? "none" : "4 4"} fill="none" className="transition-all duration-500" vectorEffect="non-scaling-stroke" />
               </svg>
            </div>

            {/* LIGNE 6: Mid Evaluation Outcomes */}
            <div className="flex justify-between w-full max-w-lg z-10">
              <div className="flex-1 flex justify-center items-start"><TreeNodeComponent node={nodes.mid_ok} active={isActive('mid_ok')} onClick={() => handleNodeClick('mid_ok')} /></div>
              <div className="flex-1 flex flex-col items-center gap-0">
                 <TreeNodeComponent node={nodes.mid_inflam} active={isActive('mid_inflam')} onClick={() => handleNodeClick('mid_inflam')} />
                 {/* Mini connecteur vertical */}
                 <svg width="4" height="40" className="my-2"><line x1="2" y1="0" x2="2" y2="40" stroke={isEdgeActive('mid_inflam', 'mid_stop') ? "#B8960C" : "#CBD5E1"} strokeWidth="3" strokeDasharray={isEdgeActive('mid_inflam', 'mid_stop') ? "none" : "4 4"} /></svg>
                 <TreeNodeComponent node={nodes.mid_stop} active={isActive('mid_stop')} onClick={() => handleNodeClick('mid_stop')} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function TreeNodeComponent({ node, active, onClick }: { node: TreeNode, active: boolean, onClick: () => void }) {
  const getColors = () => {
    if (!active) return "bg-white-pure border-sapphire-100 text-sapphire-800 hover:border-sapphire-400 hover:bg-sapphire-50 shadow-sm";
    
    // Active Colors
    if (node.level === 'success') return "bg-success text-white-pure border-success border-2 shadow-lg shadow-success/30 ring-4 ring-success/10";
    if (node.level === 'warning') return "bg-warning text-white-pure border-warning border-2 shadow-lg shadow-warning/30 ring-4 ring-warning/10";
    if (node.level === 'danger') return "bg-danger text-white-pure border-danger border-2 shadow-lg shadow-danger/30 ring-4 ring-danger/10";
    
    // Default active (Start, Decision nodes)
    return "bg-gold-500 text-white-pure border-gold-500 border-2 shadow-lg shadow-gold-500/30 ring-4 ring-gold-500/10";
  };

  const Icon = node.level === 'success' ? CheckCircle2 : node.level === 'danger' ? XOctagon : AlertTriangle;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-full border-2 font-medium transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap",
        getColors(),
        node.type === 'endpoint' && "py-4 px-8 text-lg font-bold"
      )}
    >
      {active && node.level && <Icon className="w-5 h-5" />}
      {node.label}
    </motion.button>
  );
}
