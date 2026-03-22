import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2px solid #083B8A',
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    color: '#041E4D',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#7A6208',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#083B8A',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    backgroundColor: '#EBF4FF',
    padding: 6,
  },
  textRow: {
    flexDirection: 'row',
    marginBottom: 6,
    borderBottom: '1px solid #FAFAF8',
    paddingBottom: 4,
  },
  label: {
    width: 200,
    fontSize: 11,
    color: '#2C3E50',
    fontFamily: 'Helvetica-Bold',
  },
  value: {
    flex: 1,
    fontSize: 11,
    color: '#2C3E50',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    color: '#888888',
    textAlign: 'center',
    borderTop: '1px solid #EBF4FF',
    paddingTop: 10,
  },
  watermark: {
    position: 'absolute',
    top: 300,
    left: 100,
    fontSize: 60,
    color: '#FAFAF8',
    transform: 'rotate(-45deg)',
    zIndex: -1,
    opacity: 0.5,
  }
});

// Document Component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ClinicalPDF = ({ data }: { data?: unknown }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.watermark}>CONFIDENTIEL MÉDICAL</Text>
      
      <View style={styles.header}>
        <Text style={styles.title}>Dossier Parodonto-Orthodontique</Text>
        <Text style={styles.subtitle}>Ounally Z. & Dallel I. (2026) — Protocole Tunisie</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Identification du Patient</Text>
        <View style={styles.textRow}>
          <Text style={styles.label}>Nom & Prénom / Date de Naissance :</Text>
          <Text style={styles.value}>________________________________________</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Motif de consultation :</Text>
          <Text style={styles.value}>________________________________________</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Bilan Parodontal & Score de Risque</Text>
        <View style={styles.textRow}>
          <Text style={styles.label}>Score calculé sur 14 :</Text>
          <Text style={styles.value}>_______ (Faible / Modéré / Élevé)</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Protocole recommandé :</Text>
          <Text style={styles.value}>________________________________________</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Prescriptions & Décision Clinique</Text>
        <View style={styles.textRow}>
          <Text style={styles.label}>Appareillage choisi :</Text>
          <Text style={styles.value}>[ ] Aligneurs Transparents    [ ] Multi-Attachés</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.label}>Signature Praticien :</Text>
          <Text style={styles.value}></Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Document à usage clinique — Non contractuel</Text>
        <Text>Basé sur 22 études PRISMA · Ounally & Dallel, 2026</Text>
        <Text>Université de Monastir, Faculté de Médecine Dentaire, Tunisie</Text>
      </View>
    </Page>
  </Document>
);
