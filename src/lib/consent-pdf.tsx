import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    borderBottom: '2px solid #083B8A',
    paddingBottom: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  titleFR: {
    fontSize: 18,
    color: '#041E4D',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 10,
    color: '#2C3E50',
    textAlign: 'justify',
  },
  list: {
    marginLeft: 20,
    marginBottom: 15,
  },
  listItem: {
    fontSize: 11,
    marginBottom: 5,
    color: '#2C3E50',
  },
  signatureBox: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureLine: {
    width: 200,
    borderTop: '1px solid #2C3E50',
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#888888',
    borderTop: '1px solid #EBF4FF',
    paddingTop: 10,
  }
});

export const ConsentementPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.titleFR}>CONSENTEMENT ÉCLAIRÉ EN PARODONTO-ORTHODONTIE</Text>
        <Text style={{ fontSize: 10, color: '#7A6208', marginTop: 10 }}>Conforme aux directives de l&apos;Ordre National des Médecins Dentistes de Tunisie (ONDT)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.paragraph}>
          Je soussigné(e), M/Mme _____________________________________, certifie avoir été informé(e) par mon médecin dentiste traitant de l&apos;état de mon parodonte (gencives et os) avant le début du traitement orthodontique.
        </Text>
        <Text style={styles.paragraph}>
          Il m&apos;a été clairement expliqué que le déplacement des dents comporte des risques parodontaux inhérents, notamment :
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• L&apos;apparition ou l&apos;aggravation de récessions gingivales (déchaussement).</Text>
          <Text style={styles.listItem}>• L&apos;inflammation gingivale en cas de contrôle de plaque insuffisant.</Text>
          <Text style={styles.listItem}>• La perte d&apos;attache osseuse ou la résorption radiculaire.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.paragraph}>
          Mon médecin m&apos;a recommandé un dispositif spécifique (Aligneurs transparents ou Multi-attaches) en fonction de mon biotype parodontal et de mon indice de risque (Score Paro-Ortho).
        </Text>
        <Text style={styles.paragraph}>
          Je m&apos;engage à respecter de manière stricte les consignes d&apos;hygiène bucco-dentaire et à honorer tous les rendez-vous de maintenance parodontologique durant la période active de mon traitement interceptif ou correctif.
        </Text>
      </View>

      <View style={styles.signatureBox}>
        <View>
          <Text style={{ fontSize: 10, marginBottom: 40 }}>Signature du/de la Patient(e) (ou Tuteur)</Text>
          <Text style={styles.signatureLine}>Lu et approuvé</Text>
        </View>
        <View>
          <Text style={{ fontSize: 10, marginBottom: 40 }}>Cachet et Signature du Praticien</Text>
          <Text style={styles.signatureLine}>Médecin Dentiste</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Document validé médicalement en référence à Ounally & Dalloul, 2026.</Text>
        <Text>Université de Monastir, Faculté de Médecine Dentaire</Text>
      </View>
    </Page>
  </Document>
);
