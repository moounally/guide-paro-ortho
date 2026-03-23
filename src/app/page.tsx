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
      <section className="relative w-full h-[90vh] flex items-center bg-off-white overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sapphire-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-500 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* TEXT CONTENT */}
          <motion.div 
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left z-20"
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sapphire-100 text-sapphire-900 font-semibold text-sm mb-6 shadow-sm border border-sapphire-200"
            >
              <Activity className="w-4 h-4 text-sapphire-700" />
              Guide Pratique · Protocoles 2026
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
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } } }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
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

          {/* 3D SPLIT COMPONENT */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-[600px] w-full hidden lg:block rounded-3xl overflow-hidden shadow-2xl border-4 border-white-pure"
          >
            <GumAnimation />
          </motion.div>
        </div>
      </section>

      {/* 🚀 STATISTIQUES (SCROLL REVEAL) */}
      <section className="w-full py-16 bg-white-pure border-y border-sapphire-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <span className="text-4xl md:text-6xl font-display font-bold text-sapphire-900 mb-2">
                <AnimatedCounter value={22} suffix="" />
              </span>
              <span className="text-lg font-semibold text-sapphire-700/80 uppercase tracking-widest">Études PRISMA</span>
            </div>
            <div className="flex flex-col items-center text-center p-6 border-x border-sapphire-50">
              <span className="text-4xl md:text-6xl font-display font-bold text-gold-600 mb-2">
                <AnimatedCounter value={100} suffix="%" />
              </span>
              <span className="text-lg font-semibold text-sapphire-700/80 uppercase tracking-widest">Evidence-Based</span>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <span className="text-4xl md:text-6xl font-display font-bold text-sapphire-900 mb-2">
                <AnimatedCounter value={3} suffix="" />
              </span>
              <span className="text-lg font-semibold text-sapphire-700/80 uppercase tracking-widest">Protocoles Cliniques</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 OUTILS & FEATURES */}
      <section className="w-full py-24 bg-off-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sapphire-900 mb-4">La Plateforme Paro-Ortho Universelle</h2>
            <p className="text-xl text-sapphire-700/80 max-w-2xl mx-auto">Un écosystème conçu pour sécuriser vos plans de traitements orthodontiques grâce à une évaluation parodontale stricte.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white-pure p-8 rounded-3xl shadow-sm border border-sapphire-100 hover:shadow-xl transition-shadow flex flex-col gap-4 group">
              <div className="w-14 h-14 bg-sapphire-50 rounded-2xl flex items-center justify-center text-sapphire-900 mb-2 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-sapphire-900">Score de Risque Patient</h3>
              <p className="text-sapphire-700/80 leading-relaxed">Formulaire clinique générant un score sur 14 points (Biotype, PI, BOP, PPD...) orientant immédiatement votre diagnostic.</p>
            </div>
            
            <div className="bg-white-pure p-8 rounded-3xl shadow-sm border border-sapphire-100 hover:shadow-xl transition-shadow flex flex-col gap-4 group">
              <div className="w-14 h-14 bg-gold-50 rounded-2xl flex items-center justify-center text-gold-600 mb-2 group-hover:scale-110 transition-transform">
                <Focus className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-sapphire-900">Arbre Décisionnel</h3>
              <p className="text-sapphire-700/80 leading-relaxed">Algorithme visuel et interactif guidant le choix entre Aligneurs Transparents et Systèmes Multi-attaches basé sur l'inflammation.</p>
            </div>

            <div className="bg-white-pure p-8 rounded-3xl shadow-sm border border-sapphire-100 hover:shadow-xl transition-shadow flex flex-col gap-4 group">
              <div className="w-14 h-14 bg-sapphire-900 rounded-2xl flex items-center justify-center text-gold-500 mb-2 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-sapphire-900">Monitoring & Suivi</h3>
              <p className="text-sapphire-700/80 leading-relaxed">Grille de contrôle longitudinal (Mois 1, 3, 6) générant des alertes automatiques si une perte d'attache survient.</p>
            </div>

            <div className="bg-white-pure p-8 rounded-3xl shadow-sm border border-sapphire-100 hover:shadow-xl transition-shadow flex flex-col gap-4 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                <Database className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-sapphire-900">Base de Données PRISMA</h3>
              <p className="text-sapphire-700/80 leading-relaxed">Accès libre aux 22 études scientifiques ayant fondé nos recommandations. Filtrable par type comparatif et index médicaux.</p>
            </div>

            <div className="bg-white-pure p-8 rounded-3xl shadow-sm border border-sapphire-100 hover:shadow-xl transition-shadow flex flex-col gap-4 group lg:col-span-2">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-sapphire-900">Export & Protocoles Légaux</h3>
              <p className="text-sapphire-700/80 leading-relaxed max-w-xl">En un clic, téléchargez le dossier complet du patient ou visez les consentements éclairés médicaux bilingues approuvés (Protocole Tunisie).</p>
            </div>
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
