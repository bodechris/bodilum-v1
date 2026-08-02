"use client";

import {
  Document,
  Link,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";
import type { BusinessProfile, PlaceDetails, ProspectReport } from "@/types/prospect";

const styles = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 50,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    color: "#161616",
    fontSize: 10,
    lineHeight: 1.45,
  },
  brand: { fontSize: 9, letterSpacing: 1.5, fontWeight: 700, marginBottom: 24 },
  kicker: { fontSize: 9, color: "#6657ff", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 },
  title: { fontSize: 26, fontWeight: 700, lineHeight: 1.08, marginBottom: 10 },
  subtitle: { fontSize: 11, color: "#666666", marginBottom: 24 },
  scoreRow: { display: "flex", flexDirection: "row", gap: 10, marginBottom: 24 },
  scoreBox: { width: "31%", border: "1px solid #dedede", padding: 12, borderRadius: 6 },
  scoreLabel: { fontSize: 7, color: "#777777", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 },
  scoreValue: { fontSize: 16, fontWeight: 700 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 15, fontWeight: 700, marginBottom: 10 },
  item: { marginBottom: 11, paddingBottom: 11, borderBottom: "1px solid #ececec" },
  itemTitle: { fontSize: 11, fontWeight: 700, marginBottom: 3 },
  muted: { color: "#666666" },
  label: { fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, color: "#6657ff", marginBottom: 2 },
  quote: { marginTop: 7, padding: 12, backgroundColor: "#f5f4ff", borderRadius: 5 },
  email: { fontFamily: "Courier", fontSize: 8.5, lineHeight: 1.55 },
  source: { fontSize: 8, color: "#666666", marginBottom: 4 },
  footer: { position: "absolute", left: 44, right: 44, bottom: 22, display: "flex", flexDirection: "row", justifyContent: "space-between", fontSize: 7.5, color: "#777777" },
  pageBreakTitle: { fontSize: 22, fontWeight: 700, marginBottom: 18 },
});

function Footer() {
  return (
    <View fixed style={styles.footer}>
      <Text>Generated with Bodilum Prospect Finder</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );
}

function ReportDocument({ report, profile, place }: { report: ProspectReport; profile: BusinessProfile; place: PlaceDetails }) {
  return (
    <Document title={`${report.prospectName} Prospect Analysis`} author="Bodilum Prospect Finder">
      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>BODILUM / PROSPECT FINDER</Text>
        <Text style={styles.kicker}>Prospect analysis</Text>
        <Text style={styles.title}>{report.prospectName}</Text>
        <Text style={styles.subtitle}>{place.address} · Prepared for {profile.businessName}</Text>

        <View style={styles.scoreRow}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Prospect score</Text>
            <Text style={styles.scoreValue}>{report.prospectScore.toFixed(1)} / 10</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Priority</Text>
            <Text style={styles.scoreValue}>{report.priority}</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Confidence</Text>
            <Text style={styles.scoreValue}>{report.confidence}</Text>
          </View>
        </View>

        <View style={styles.quote}><Text>{report.oneLineVerdict}</Text></View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why this business is commercially attractive</Text>
          {report.commerciallyAttractive.map((item, index) => (
            <View key={`${item.title}-${index}`} style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text>{item.evidence}</Text>
              <Text style={styles.muted}>{item.whyItMatters}</Text>
            </View>
          ))}
        </View>
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>BODILUM / PROSPECT FINDER</Text>
        <Text style={styles.pageBreakTitle}>Opportunity and outreach strategy</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The opportunity</Text>
          {report.opportunity.map((item, index) => (
            <View key={`${item.title}-${index}`} style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text style={styles.muted}>Outcome: {item.outcome}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best angle for {profile.businessName}</Text>
          <Text style={styles.itemTitle}>{report.bestAngle.headline}</Text>
          <Text>{report.bestAngle.explanation}</Text>
          <View style={styles.quote}>
            <Text style={styles.label}>Avoid leading with</Text>
            <Text>{report.bestAngle.avoidLeadingWith}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Possible objections</Text>
          {report.objections.map((item, index) => (
            <View key={`${item.objection}-${index}`} style={styles.item}>
              <Text style={styles.itemTitle}>{item.objection}</Text>
              <Text>{item.response}</Text>
            </View>
          ))}
        </View>
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>BODILUM / PROSPECT FINDER</Text>
        <Text style={styles.pageBreakTitle}>Who to approach</Text>

        {report.decisionMakers.map((person, index) => (
          <View key={`${person.role}-${index}`} style={styles.item}>
            <Text style={styles.itemTitle}>{person.name ? `${person.name} — ` : ""}{person.role}</Text>
            {person.contact ? <Text>{person.contact}</Text> : null}
            <Text style={styles.muted}>{person.confidence}{person.source ? ` · ${person.source}` : ""}</Text>
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Final assessment</Text>
          <Text style={styles.itemTitle}>{report.finalAssessment.verdict}</Text>
          <Text>{report.finalAssessment.nextStep}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Public contact routes found</Text>
          {report.discoveredContacts.emails.map((email) => <Text key={email}>Email: {email}</Text>)}
          {report.discoveredContacts.phones.map((phone) => <Text key={phone}>Phone: {phone}</Text>)}
          {report.discoveredContacts.websites.map((website) => <Link key={website} src={website} style={styles.source}>Website: {website}</Link>)}
          {!report.discoveredContacts.emails.length && !report.discoveredContacts.phones.length && !report.discoveredContacts.websites.length ? <Text style={styles.muted}>No verified public email, telephone number or official website was found. Use the Google Maps listing for further research.</Text> : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sources</Text>
          {report.sources.map((source, index) => (
            <Link key={`${source.url}-${index}`} src={source.url} style={styles.source}>{source.label}: {source.url}</Link>
          ))}
          <Text style={[styles.source, { marginTop: 8 }]}>Business discovery data powered by Google Maps. Verify all public data before outreach.</Text>
        </View>
        <Footer />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.brand}>BODILUM / PROSPECT FINDER</Text>
        <Text style={styles.pageBreakTitle}>Personalised introductory email</Text>
        <Text style={styles.label}>Recommended subject</Text>
        <Text style={{ marginBottom: 14 }}>{report.email.subjectLines[0]}</Text>
        <View style={styles.quote}><Text style={styles.email}>{report.email.body}</Text></View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Short WhatsApp introduction</Text>
          <Text>{report.email.whatsapp}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow-up</Text>
          <Text>{report.email.followUp}</Text>
        </View>

        <View style={[styles.quote, { marginTop: 24 }]}>
          <Text style={styles.itemTitle}>Need a complete lead-discovery and conversion system?</Text>
          <Text>Bodilum is a Nigerian-owned creative technology studio based in Johannesburg. Visit www.bodilum.com.</Text>
        </View>
        <Footer />
      </Page>
    </Document>
  );
}

export default function ProspectReportPdf({ report, profile, place }: { report: ProspectReport; profile: BusinessProfile; place: PlaceDetails }) {
  const filename = `${report.prospectName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-prospect-analysis.pdf`;
  return (
    <PDFDownloadLink document={<ReportDocument report={report} profile={profile} place={place} />} fileName={filename} className="button button-secondary pdf-download">
      {({ loading }) => <><Download size={17} /> {loading ? "Preparing PDF…" : "Download PDF"}</>}
    </PDFDownloadLink>
  );
}
