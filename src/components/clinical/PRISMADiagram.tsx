"use client";

import { motion } from "framer-motion";

const flowData = [
  { id: 1, label: "573 références identifiées", type: "blue", x: 200, y: 50 },
  { id: 2, label: "-44 doublons", type: "red", x: 400, y: 120, isExclusion: true },
  { id: 3, label: "529 articles triés", type: "blue", x: 200, y: 190 },
  { id: 4, label: "-438 exclus après lecture du titre/résumé", type: "red", x: 400, y: 260, isExclusion: true },
  { id: 5, label: "91 articles lus en texte intégral", type: "blue", x: 200, y: 330 },
  { id: 6, label: "-69 exclus (critères non satisfaits)", type: "red", x: 400, y: 400, isExclusion: true },
  { id: 7, label: "22 ÉTUDES INCLUSES", type: "gold", x: 200, y: 500, isFinal: true },
];

const paths = [
  { d: "M 200 80 L 200 190", delay: 0.5 },
  { d: "M 200 120 L 300 120", delay: 1, isExclusion: true },
  { d: "M 200 220 L 200 330", delay: 1.5 },
  { d: "M 200 260 L 300 260", delay: 2, isExclusion: true },
  { d: "M 200 360 L 200 500", delay: 2.5 },
  { d: "M 200 400 L 300 400", delay: 3, isExclusion: true },
];

export function PRISMADiagram() {
  return (
    <div className="w-full overflow-x-auto py-12 flex justify-center">
      <div className="relative w-[700px] h-[600px]">
        {/* SVG Paths for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {paths.map((p, i) => (
            <motion.path
              key={i}
              d={p.d}
              stroke={p.isExclusion ? "#8B1A1A" : "#0F52BA"} // danger or sapphire-500
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: p.delay, ease: "easeInOut" }}
            />
          ))}
        </svg>

        {/* Nodes */}
        {flowData.map((node, i) => {
          let bgColor = "bg-sapphire-50 border-sapphire-500 text-sapphire-900";
          if (node.type === "red") bgColor = "bg-white-pure border-danger text-danger shadow-sm";
          if (node.type === "gold") bgColor = "bg-gold-500 text-sapphire-900 shadow-xl shadow-gold-500/20 scale-110 font-bold border-none";

          return (
            <motion.div
              key={node.id}
              className={`absolute flex items-center justify-center p-4 border-2 rounded-xl text-sm font-medium w-64 text-center ${bgColor} ${node.isExclusion ? 'w-48 text-xs' : ''}`}
              style={{
                left: node.x - (node.isExclusion ? 100 : 128),
                top: node.y - 30,
                zIndex: 10
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: node.isFinal ? 1.1 : 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                delay: i * 0.4 
              }}
              whileHover={{ scale: node.isFinal ? 1.15 : 1.05 }}
            >
              {node.label}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
