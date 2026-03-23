import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import { PatientData, RiskData, RDVData } from './store';

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40, fontFamily: 'Helvetica' },
  header: { marginBottom: 20, borderBottom: '2px solid #083B8A', paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  headerLeft: { flex: 1 },
  headerRight: { textAlign: 'right' },
  title: { fontSize: 24, color: '#041E4D', fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  subtitle: { fontSize: 11, color: '#7A6208' },
  dateStamp: { fontSize: 10, color: '#64748B', fontFamily: 'Helvetica-Bold' },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 14, color: '#FFFFFF', backgroundColor: '#083B8A', padding: 6, paddingLeft: 10, marginBottom: 8, fontFamily: 'Helvetica-Bold', borderRadius: 2 },
  row: { flexDirection: 'row', borderBottom: '1px solid #F1F5F9', paddingVertical: 5, alignItems: 'center' },
  label: { width: 180, fontSize: 11, color: '#475569', fontFamily: 'Helvetica-Bold' },
  value: { flex: 1, fontSize: 11, color: '#0F172A' },
  
  // Validation Stamp Styles
  stampContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10, padding: 12, borderRadius: 6, borderWidth: 1 },
  stampText: { fontSize: 14, fontFamily: 'Helvetica-Bold', marginLeft: 8 },
  stampDesc: { fontSize: 10, marginTop: 4, opacity: 0.8 },
  
  // Table Styles
  table: { width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#CBD5E1', marginBottom: 10, borderRadius: 4, overflow: 'hidden' },
  tableRow: { flexDirection: 'row' },
  tableColHeader: { borderStyle: 'solid', borderBottomWidth: 1, borderColor: '#CBD5E1', backgroundColor: '#F1F5F9', padding: 6 },
  tableCol: { borderStyle: 'solid', borderBottomWidth: 1, borderColor: '#F1F5F9', padding: 6 },
  tableCellHeader: { fontSize: 9, fontFamily: 'Helvetica-Bold', textAlign: 'center', color: '#334155' },
  tableCell: { fontSize: 9, textAlign: 'center', color: '#0F172A' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 9, color: '#94A3B8', textAlign: 'center', borderTop: '1px solid #E2E8F0', paddingTop: 10 }
});

// SVG Icons for PDF
const CheckIcon = ({ color }: { color: string }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20}>
    <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth={2.5} fill="none" />
  </Svg>
);

const AlertIcon = ({ color }: { color: string }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20}>
    <Path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke={color} strokeWidth={2.5} fill="none" />
  </Svg>
);

const CrossIcon = ({ color }: { color: string }) => (
  <Svg viewBox="0 0 24 24" width={20} height={20}>
    <Path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth={2.5} fill="none" />
  </Svg>
);

interface ClinicalPDFProps {
  patient: PatientData;
  risk: RiskData;
  decisionNode: string;
  monitoring: RDVData[];
  t: (key: string) => string;
  isRtl: boolean;
}

export const ClinicalPDF = ({ patient, risk, decisionNode, monitoring, t, isRtl }: ClinicalPDFProps) => {
  // Determine Stamp Output based on Risk / Decision
  const getStamp = () => {
    const r = risk.categorie || '';
    const d = decisionNode || '';
    if (r.includes('HAUT') || r.includes('HIGH') || d.includes('Active') || d.includes('Arrêt')) {
      return { 
        title: t('tree.legend.ci') || 'CONTRE-INDIQUÉ', 
        desc: 'Traitement parodontal actif requis avant toute orthodontie.',
        color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', Icon: CrossIcon 
      };
    }
    if (r.includes('MOD') || d.includes('Inflam') || d.includes('Surveillance')) {
      return { 
        title: t('tree.legend.vigilance') || 'SOUS RÉSERVE', 
        desc: 'Assainissement professionnel et surveillance stricte recommandés.',
        color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', Icon: AlertIcon 
      };
    }
    return { 
      title: t('tree.legend.fav') || 'APPROUVÉ', 
      desc: "Feu vert. Le parodonte du patient permet d'initier le traitement.",
      color: '#16A34A', bg: '#F0FDF4', border: '#BBF7D0', Icon: CheckIcon 
    };
  };

  const stamp = getStamp();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Dossier Parodonto-Orthodontique</Text>
            <Text style={styles.subtitle}>{t('hero.subtitle').substring(0, 75)}...</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.dateStamp}>{new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. {t('patient.title')}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>{t('patient.name')} :</Text>
            <Text style={styles.value}>{patient.nom || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('patient.id')} :</Text>
            <Text style={styles.value}>{patient.cin || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('patient.date')} :</Text>
            <Text style={styles.value}>{patient.date || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('patient.dr')} :</Text>
            <Text style={styles.value}>{patient.praticien || '-'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Avis Clinique & Décision</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>{t('form.phase1')} (Score) :</Text>
            <Text style={styles.value}>{risk.totalScore} / 14 — {risk.categorie}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Protocole :</Text>
            <Text style={styles.value}>{risk.protocole}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Stratégie (Arbre) :</Text>
            <Text style={styles.value}>{decisionNode}</Text>
          </View>

          {/* DYNAMIC STAMP */}
          <View style={{ ...styles.stampContainer, backgroundColor: stamp.bg, borderColor: stamp.border }}>
            <stamp.Icon color={stamp.color} />
            <View style={{ marginLeft: 10 }}>
               <Text style={{ ...styles.stampText, color: stamp.color }}>STATUT : {stamp.title.toUpperCase()}</Text>
               <Text style={{ ...styles.stampDesc, color: stamp.color }}>{stamp.desc}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. {t('form.phase3')}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={{...styles.tableColHeader, width: '20%'}}><Text style={styles.tableCellHeader}>{t('grid.rdv')}</Text></View>
              <View style={{...styles.tableColHeader, width: '20%'}}><Text style={styles.tableCellHeader}>{t('grid.date')}</Text></View>
              <View style={{...styles.tableColHeader, width: '12%'}}><Text style={styles.tableCellHeader}>PI</Text></View>
              <View style={{...styles.tableColHeader, width: '12%'}}><Text style={styles.tableCellHeader}>GI</Text></View>
              <View style={{...styles.tableColHeader, width: '12%'}}><Text style={styles.tableCellHeader}>BOP</Text></View>
              <View style={{...styles.tableColHeader, width: '12%'}}><Text style={styles.tableCellHeader}>PPD</Text></View>
              <View style={{...styles.tableColHeader, width: '12%'}}><Text style={styles.tableCellHeader}>CAL</Text></View>
            </View>
            {monitoring.map((m, i) => (
              <View style={styles.tableRow} key={i}>
                <View style={{...styles.tableCol, width: '20%'}}><Text style={{...styles.tableCell, fontFamily: 'Helvetica-Bold'}}>{m.notes.split(' ')[0] || '-'}</Text></View>
                <View style={{...styles.tableCol, width: '20%'}}><Text style={styles.tableCell}>{m.date || '-'}</Text></View>
                <View style={{...styles.tableCol, width: '12%'}}><Text style={styles.tableCell}>{m.pi || '-'}</Text></View>
                <View style={{...styles.tableCol, width: '12%'}}><Text style={styles.tableCell}>{m.gi || '-'}</Text></View>
                <View style={{...styles.tableCol, width: '12%'}}><Text style={styles.tableCell}>{m.bop || '-'}</Text></View>
                <View style={{...styles.tableCol, width: '12%'}}><Text style={styles.tableCell}>{m.ppd || '-'}</Text></View>
                <View style={{...styles.tableCol, width: '12%'}}><Text style={styles.tableCell}>{m.cal || '-'}</Text></View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Document certifié — Outil d'évaluation Guide Paro-Ortho (Z. Ounally & I. Dallel)</Text>
          <Text>Ce document est une aide à la décision et ne remplace pas le diagnostic clinique du praticien.</Text>
        </View>
      </Page>
    </Document>
  );
};
