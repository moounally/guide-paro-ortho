import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PatientData, RiskData, RDVData } from './store';

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 40, fontFamily: 'Helvetica' },
  header: { marginBottom: 20, borderBottom: '2px solid #083B8A', paddingBottom: 10 },
  title: { fontSize: 24, color: '#041E4D', fontFamily: 'Helvetica-Bold', marginBottom: 4 },
  subtitle: { fontSize: 12, color: '#7A6208' },
  section: { marginBottom: 15 },
  sectionTitle: { fontSize: 14, color: '#FFFFFF', backgroundColor: '#083B8A', padding: 6, marginBottom: 8, fontFamily: 'Helvetica-Bold' },
  row: { flexDirection: 'row', borderBottom: '1px solid #E2E8F0', paddingVertical: 4 },
  label: { width: 180, fontSize: 11, color: '#475569', fontFamily: 'Helvetica-Bold' },
  value: { flex: 1, fontSize: 11, color: '#0F172A' },
  table: { width: 'auto', borderStyle: 'solid', borderWidth: 1, borderColor: '#CBD5E1', marginBottom: 10 },
  tableRow: { flexDirection: 'row' },
  tableColHeader: { width: '14%', borderStyle: 'solid', borderWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderColor: '#CBD5E1', backgroundColor: '#F1F5F9', padding: 4 },
  tableCol: { width: '14%', borderStyle: 'solid', borderWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderColor: '#CBD5E1', padding: 4 },
  tableCellHeader: { fontSize: 9, fontFamily: 'Helvetica-Bold', textAlign: 'center' },
  tableCell: { fontSize: 9, textAlign: 'center' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 9, color: '#94A3B8', textAlign: 'center', borderTop: '1px solid #E2E8F0', paddingTop: 10 }
});

interface ClinicalPDFProps {
  patient: PatientData;
  risk: RiskData;
  decisionNode: string;
  monitoring: RDVData[];
}

export const ClinicalPDF = ({ patient, risk, decisionNode, monitoring }: ClinicalPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Dossier Parodonto-Orthodontique</Text>
        <Text style={styles.subtitle}>Évaluation du Risque & Décision Thérapeutique</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Identification du Patient</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nom Complet :</Text>
          <Text style={styles.value}>{patient.nom || 'Non renseigné'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>CIN / N° Dossier :</Text>
          <Text style={styles.value}>{patient.cin || 'Non renseigné'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date de Consultation :</Text>
          <Text style={styles.value}>{patient.date || 'Non renseigné'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Praticien Traitant :</Text>
          <Text style={styles.value}>{patient.praticien || 'Non renseigné'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Évaluation du Risque Parodontal</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Score Total Calculé :</Text>
          <Text style={styles.value}>{risk.totalScore} / 14</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Niveau de Risque :</Text>
          <Text style={styles.value}>{risk.categorie}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Protocole Recommandé :</Text>
          <Text style={styles.value}>{risk.protocole}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Arbre Décisionnel & Appareillage</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Diagnostic & Décision :</Text>
          <Text style={styles.value}>{decisionNode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Validation Clinique :</Text>
          <Text style={styles.value}>[   ] Approuvé      [   ] En attente d'examens complémentaires</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Grille de Suivi Clinique (Monitoring)</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={{...styles.tableColHeader, width: '20%'}}><Text style={styles.tableCellHeader}>Visite (Notes)</Text></View>
            <View style={{...styles.tableColHeader, width: '16%'}}><Text style={styles.tableCellHeader}>Date</Text></View>
            <View style={{...styles.tableColHeader, width: '12%'}}><Text style={styles.tableCellHeader}>PI (%)</Text></View>
            <View style={{...styles.tableColHeader, width: '12%'}}><Text style={styles.tableCellHeader}>GI</Text></View>
            <View style={{...styles.tableColHeader, width: '12%'}}><Text style={styles.tableCellHeader}>BOP (%)</Text></View>
            <View style={{...styles.tableColHeader, width: '14%'}}><Text style={styles.tableCellHeader}>PPD (mm)</Text></View>
            <View style={{...styles.tableColHeader, width: '14%', borderRightWidth: 0}}><Text style={styles.tableCellHeader}>CAL (mm)</Text></View>
          </View>
          {monitoring.map((m, i) => (
            <View style={styles.tableRow} key={i}>
              <View style={{...styles.tableCol, width: '20%'}}><Text style={{...styles.tableCell, fontFamily: 'Helvetica-Bold'}}>{m.notes.split(' ')[0]}</Text></View>
              <View style={{...styles.tableCol, width: '16%'}}><Text style={styles.tableCell}>{m.date}</Text></View>
              <View style={{...styles.tableCol, width: '12%'}}><Text style={styles.tableCell}>{m.pi}</Text></View>
              <View style={{...styles.tableCol, width: '12%'}}><Text style={styles.tableCell}>{m.gi}</Text></View>
              <View style={{...styles.tableCol, width: '12%'}}><Text style={styles.tableCell}>{m.bop}</Text></View>
              <View style={{...styles.tableCol, width: '14%'}}><Text style={styles.tableCell}>{m.ppd}</Text></View>
              <View style={{...styles.tableCol, width: '14%', borderRightWidth: 0}}><Text style={styles.tableCell}>{m.cal}</Text></View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Document édité le {new Date().toLocaleDateString('fr-FR')} — Destiné au dossier médical</Text>
        <Text>Guide Paro-Ortho — Ounally Z. & Dallel I. (Consultation Tunisie)</Text>
      </View>
    </Page>
  </Document>
);
