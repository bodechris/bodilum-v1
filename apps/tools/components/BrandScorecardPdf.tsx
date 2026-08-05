"use client";

import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";
import type { BrandScorecardResult } from "@/types/brand-scorecard";

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 50,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    color: "#171719",
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  brand: { fontSize: 8, letterSpacing: 1.6, fontWeight: 700, marginBottom: 24 },
  kicker: { fontSize: 8, color: "#6858ff", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: 700, lineHeight: 1.05, marginBottom: 10 },
  muted: { color: "#66666d" },
  hero: { backgroundColor: "#171719", color: "#ffffff", padding: 24, borderRadius: 8, marginBottom: 20 },
  heroScore: { fontSize: 44, fontWeight: 700, color: "#dfff65", marginBottom: 4 },
  heroLabel: { fontSize: 14, fontWeight: 700, marginBottom: 8 },
  row: { display: "flex", flexDirection: "row", gap: 9, marginBottom: 18 },
  metric: { width: "20%", padding: 10, border: "1px solid #dedee3", borderRadius: 5 },
  metricLabel: { fontSize: 6.5, textTransform: "uppercase", letterSpacing: 0.7, color: "#77777d", marginBottom: 5 },
  metricValue: { fontSize: 14, fontWeight: 700 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 700, marginBottom: 10 },
  card: { padding: 12, border: "1px solid #e6e6ea", borderRadius: 5, marginBottom: 9 },
  cardTitle: { fontSize: 10.5, fontWeight: 700, marginBottom: 4 },
  label: { fontSize: 7, textTransform: "uppercase", letterSpacing: 0.7, color: "#6858ff", marginBottom: 4 },
  aiBox: { padding: 14, backgroundColor: "#f2f0ff", borderRadius: 6, marginTop: 13 },
  planRow: { display: "flex", flexDirection: "row", gap: 10, paddingVertical: 10, borderBottom: "1px solid #ececf0" },
  planWeek: { width: 48, fontSize: 8, color: "#6858ff", fontWeight: 700 },
  planCopy: { flexGrow: 1 },
  footer: { position: "absolute", left: 44, right: 44, bottom: 20, display: "flex", flexDirection: "row", justifyContent: "space-between", color: "#77777d", fontSize: 7 },
});

function Footer() {
  return (
    <View fixed style={styles.footer}>
      <Text>Generated with Bodilum Brand Scorecard · tools.bodilum.com</Text>
      <Text render={({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );
}

function ScorecardDocument({ result }: { result: BrandScorecardResult }) {
  return (
    <Document title={`${result.profile.businessName} Brand Scorecard`} author="Bodilum Brand Scorecard">
      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>BODILUM / BRAND SCORECARD</Text>
        <Text style={styles.kicker}>Brand strength assessment</Text>
        <Text style={styles.title}>{result.profile.businessName}</Text>
        <Text style={[styles.muted, { marginBottom: 18 }]}>Prepared for {result.profile.respondentName} · {result.profile.industry}</Text>

        <View style={styles.hero}>
          <Text style={styles.heroScore}>{result.overallScore}/100</Text>
          <Text style={styles.heroLabel}>{result.maturity.label}</Text>
          <Text>{result.maturity.description}</Text>
        </View>

        <View style={styles.row}>
          {result.categoryScores.map((category) => (
            <View key={category.id} style={styles.metric}>
              <Text style={styles.metricLabel}>{category.shortTitle}</Text>
              <Text style={styles.metricValue}>{category.score}</Text>
            </View>
          ))}
        </View>

        <View style={styles.aiBox}>
          <Text style={styles.label}>{result.generatedWithAI ? "AI-assisted diagnosis" : "Scorecard diagnosis"}</Text>
          <Text>{result.aiInsight.executiveSummary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What the score means commercially</Text>
          {result.aiInsight.commercialImpact.map((item, index) => (
            <View key={`${item}-${index}`} style={styles.card}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>BODILUM / BRAND SCORECARD</Text>
        <Text style={styles.title}>Your strongest brand signals</Text>
        {result.strengths.map((item) => (
          <View key={item.questionId} style={styles.card}>
            <Text style={styles.label}>{item.category} · {item.score}/5</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.muted}>{item.whyItMatters}</Text>
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Priority improvements</Text>
          {result.priorities.map((item) => (
            <View key={item.questionId} style={styles.card}>
              <Text style={styles.label}>{item.category} · {item.score}/5</Text>
              <Text style={styles.cardTitle}>{item.action}</Text>
              <Text style={styles.muted}>{item.whyItMatters}</Text>
            </View>
          ))}
        </View>
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>BODILUM / BRAND SCORECARD</Text>
        <Text style={styles.title}>Your 30-day brand improvement plan</Text>
        <Text style={[styles.muted, { marginBottom: 18 }]}>Complete one focused improvement each week rather than trying to rebuild everything at once.</Text>

        {result.next30Days.map((item) => (
          <View key={item.period} style={styles.planRow}>
            <Text style={styles.planWeek}>{item.period}</Text>
            <View style={styles.planCopy}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text>{item.action}</Text>
              <Text style={[styles.muted, { marginTop: 4 }]}>Expected outcome: {item.outcome}</Text>
            </View>
          </View>
        ))}

        <View style={styles.aiBox}>
          <Text style={styles.label}>Best first move</Text>
          <Text style={styles.cardTitle}>{result.aiInsight.firstMove}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next step with Bodilum</Text>
          <Text>Bodilum is a global creative technology studio based in Johannesburg. We help businesses strengthen their positioning, identity, digital credibility, customer experience and practical AI-enabled growth systems.</Text>
          <Text style={{ marginTop: 8 }}>Visit www.bodilum.com to discuss a focused brand improvement sprint.</Text>
        </View>
        <Footer />
      </Page>
    </Document>
  );
}

export default function BrandScorecardPdf({ result }: { result: BrandScorecardResult }) {
  const filename = `${result.profile.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-brand-scorecard.pdf`;
  return (
    <PDFDownloadLink
      document={<ScorecardDocument result={result} />}
      fileName={filename}
      className="button button-secondary pdf-download"
    >
      {({ loading }: { loading: boolean }) => <><Download size={17} /> {loading ? "Preparing PDF…" : "Download PDF"}</>}
    </PDFDownloadLink>
  );
}
