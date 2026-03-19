"use client";

import { ResponsiveContainer, ComposedChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ErrorBar, ReferenceLine } from "recharts";
import { motion } from "framer-motion";

// Données fictives simulant une méta-analyse sur l'indice PI (Plaque Index)
// Différence de moyenne (MD) entre Aligneurs et Multi-attaches
const forestData = [
  { id: "Jiang et al.", year: 2018, md: -0.60, ci_low: -0.85, ci_high: -0.35, weight: 15 },
  { id: "Lu et al.", year: 2021, md: -0.45, ci_low: -0.70, ci_high: -0.20, weight: 20 },
  { id: "Borda et al.", year: 2020, md: -0.55, ci_low: -0.80, ci_high: -0.30, weight: 18 },
  { id: "Zhang et al.", year: 2023, md: -0.75, ci_low: -1.05, ci_high: -0.45, weight: 12 },
  { id: "Alassiry", year: 2023, md: -0.30, ci_low: -0.60, ci_high: 0.00, weight: 10 },
  { id: "Ounally & Dalloul", year: 2026, md: -0.52, ci_low: -0.65, ci_high: -0.39, weight: 25 },
];

export function ForestPlot() {
  const transformedData = forestData.map(d => ({
    name: `${d.id} (${d.year})`,
    md: d.md,
    error: [d.md - d.ci_low, d.ci_high - d.md], // Format pour recharts ErrorBar: [minus, plus]
    size: d.weight * 20, // Taille du point
  }));

  const globalEffect = -0.54; // Estimation combinée

  return (
    <div className="w-full h-[500px] bg-white-pure rounded-xl p-8 border border-sapphire-50 shadow-sm relative">
      <h3 className="text-xl font-display font-semibold text-sapphire-900 mb-6 text-center">
        Forest Plot : Impact sur l'Indice de Plaque (PI)
      </h3>
      <p className="text-center text-sm text-neutral mb-8">
        Différence de Moyenne (MD) : Aligneurs vs Multi-attachés. <br/>
        <span className="italic text-xs block mt-1">(Les valeurs à gauche de 0 favorisent les Aligneurs)</span>
      </p>

      <motion.div 
        className="w-full h-[350px]"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <ResponsiveContainer width="100%" height={350} minWidth={1}>
          <ComposedChart
            layout="vertical"
            data={transformedData}
            margin={{ top: 20, right: 30, bottom: 20, left: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#EBF4FF" />
            <XAxis 
              type="number" 
              domain={[-1.2, 0.2]} 
              ticks={[-1.0, -0.8, -0.6, -0.4, -0.2, 0, 0.2]}
              stroke="#083B8A" 
              tick={{ fill: '#083B8A', fontSize: 12 }} 
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              stroke="#083B8A" 
              tick={{ fill: '#2C3E50', fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip 
              cursor={{ fill: '#FAFAF8' }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #EBF4FF', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            
            <ReferenceLine x={0} stroke="#2C3E50" strokeWidth={2} />
            
            {/* Ligne d'effet global (Diamant virtuellement représenté par une ligne rouge/or) */}
            <ReferenceLine x={globalEffect} stroke="#B8960C" strokeDasharray="5 5" label={{ position: 'top', value: `Effet Global MD=${globalEffect}`, fill: '#B8960C', fontSize: 12 }} />

            <Scatter dataKey="md" fill="#041E4D" shape="square">
              <ErrorBar dataKey="error" width={4} strokeWidth={2} stroke="#083B8A" direction="x" />
            </Scatter>
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
