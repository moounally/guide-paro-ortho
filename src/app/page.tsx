"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, FileText, Database, Activity, Sparkles, Stethoscope, Microscope, Focus } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GumAnimation } from "@/components/clinical/3d/GumAnimation";
import { useI18n } from "@/lib/i18n";

export default function Home() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col min-h-screen">
      {/* 🚀 HERO SECTION */}
      <section className="relative w-full pt-32 pb-24 overflow-hidden flex flex-col items-center border-b border-sapphire-100">
        <div className="absolute inset-0 bg-gradient-to-br from-sapphire-50/50 via-white-pure to-gold-500/5 -z-10" />
        
        <div className="container mx-auto px-4 text-center max-w-5xl z-10 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sapphire-100/50 border border-sapphire-200 text-sapphire-900 font-medium text-sm mb-8"
            >
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>Protocole Clinique Validé — Tunisie 2026 🇹🇳</span>
            </motion.div>
            
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
              className="text-5xl md:text-7xl font-display font-bold text-sapphire-900 leading-tight mb-8"
            >
              {t('hero.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sapphire-500 to-gold-600">{t('hero.title2')}</span>
            </motion.h1>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
              className="text-xl md:text-2xl text-sapphire-700/80 font-light max-w-3xl mx-auto leading-relaxed mb-12"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/formulaire" className="group flex items-center gap-3 bg-sapphire-900 hover:bg-sapphire-700 text-white-pure px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                {t('hero.cta1')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/recherche" className="flex items-center gap-3 bg-white-pure hover:bg-sapphire-50 text-sapphire-900 border-2 border-sapphire-100 px-8 py-4 rounded-full font-bold text-lg transition-all">
                {t('hero.cta2')}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* STATS COUNTERS */}
        <div className="container mx-auto px-4 mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { label: "Études Incluses", value: 22, suffix: "", icon: Database },
              { label: "Méta-analyses", value: 6, suffix: "", icon: FileText },
              { label: "Critères d'Évaluation", value: 14, suffix: "", icon: Activity },
              { label: "Efficacité Aligneurs", value: 40, suffix: "%", icon: ShieldCheck },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                className="text-center bg-white-pure/80 backdrop-blur-sm border border-sapphire-50 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-sapphire-50 rounded-full">
                    <stat.icon className="w-6 h-6 text-sapphire-600" />
                  </div>
                </div>
                <div className="text-4xl font-display font-bold text-sapphire-900 mb-2 flex justify-center items-baseline">
                  <AnimatedCounter value={stat.value} />
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-sm font-medium text-sapphire-700/70 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 SPLIT SCREEN COMPARAISON 3D */}
      <section className="w-full py-32 bg-white-pure relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-sapphire-900 mb-4 inline-flex items-center gap-3">
              <Stethoscope className="w-8 h-8 text-gold-500" />
              Simulateur Parodontal 3D
            </h2>
            <p className="text-xl text-neutral max-w-2xl mx-auto">
              Visualisez l'impact direct de la rétention de plaque selon le dispositif orthodontique.
            </p>
          </div>
          
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1 }}
          >
            <GumAnimation />
          </motion.div>
        </div>
      </section>

      {/* 🚀 SCIENTIFIC FOUNDATIONS SECTION */}
      <section className="w-full py-32 bg-gradient-to-b from-sapphire-50 to-white-pure border-t border-sapphire-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-sapphire-900 mb-6 inline-flex items-center justify-center gap-4">
              <Microscope className="w-10 h-10 text-sapphire-600" />
              Fondements Scientifiques
            </h2>
            <p className="text-xl md:text-2xl text-sapphire-700/80 font-light max-w-3xl mx-auto leading-relaxed">
              Une pratique orthodontique sécurisée, reposant sur l'analyse systématique de <span className="font-semibold text-sapphire-900">22 études cliniques majeures</span> et des méta-analyses rigoureuses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: "Approche Evidence-Based", 
                desc: "Intégrez les conclusions de la thèse Ounally & Dallel (2026) directement dans votre flux de travail clinique quotidien pour des décisions éclairées.",
                icon: FileText
              },
              { 
                title: "Préservation Parodontale", 
                desc: "Comparez l'impact réel des aligneurs transparents face aux systèmes multi-attachés sur l'indice de plaque et l'inflammation gingivale.",
                icon: ShieldCheck
              },
              { 
                title: "Précision Décisionnelle", 
                desc: "Minimisez les risques de récessions et de perte d'attache grâce à notre algorithme interactif évaluant le biotype de votre patient.",
                icon: Focus
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                className="bg-white-pure p-10 rounded-3xl shadow-lg shadow-sapphire-900/5 border border-sapphire-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-sapphire-100 to-sapphire-50 rounded-2xl flex items-center justify-center mb-8 text-sapphire-700 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-sapphire-900 mb-4">{feature.title}</h3>
                <p className="text-sapphire-700/80 text-lg leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 🚀 CALL TO ACTION APP */}
      <section className="w-full py-24 bg-sapphire-900 text-white-pure border-t-8 border-gold-500">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-display font-bold mb-8 flex items-center justify-center gap-4 text-white-pure">
            <Sparkles className="w-8 h-8 text-gold-500" />
            {t('cta.footer')}
          </h2>
          <p className="text-xl text-sapphire-100/80 mb-12 font-light leading-relaxed">
            Notre arbre décisionnel intègre des paramètres cliniques tels que le Biotype, l'Indice de Plaque et les Antécédents pour générer un protocole sur-mesure validé.
          </p>
          <Link href="/formulaire" className="inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-600 text-sapphire-900 px-10 py-5 rounded-full font-bold text-xl transition-all shadow-xl hover:shadow-gold-500/20">
            Ouvrir le Dossier Patient
            <Activity className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
