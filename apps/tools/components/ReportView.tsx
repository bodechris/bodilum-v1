"use client";

import dynamic from "next/dynamic";
import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronUp,
  Clipboard,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Target,
  UserRoundSearch,
} from "lucide-react";
import { useState } from "react";
import type { BusinessProfile, PlaceDetails, ProspectReport } from "@/types/prospect";

const ProspectReportPdf = dynamic(() => import("@/components/ProspectReportPdf"), { ssr: false });

function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }
  return (
    <button type="button" className="copy-button" onClick={copy}>
      {copied ? <Check size={15} /> : <Clipboard size={15} />}
      {copied ? "Copied" : label}
    </button>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="report-accordion">
      <button type="button" onClick={() => setOpen((value) => !value)} className="accordion-trigger">
        <span>{title}</span>
        {open ? <ChevronUp size={19} /> : <ChevronDown size={19} />}
      </button>
      {open ? <div className="accordion-content">{children}</div> : null}
    </section>
  );
}

export function ReportView({
  report,
  profile,
  place,
  onBack,
}: {
  report: ProspectReport;
  profile: BusinessProfile;
  place: PlaceDetails;
  onBack: () => void;
}) {
  return (
    <div className="report-wrap reveal-up">
      <div className="report-actions-bar">
        <button type="button" className="text-button" onClick={onBack}><ArrowLeft size={17} /> Back to prospects</button>
        <ProspectReportPdf report={report} profile={profile} place={place} />
      </div>

      <section className="report-hero">
        <div>
          <div className="report-provider-row"><div className="eyebrow"><span /> Prospect analysis</div><span className={`analysis-provider-badge ${report.generatedWithAI ? "ai" : "fallback"}`}>{report.generatedWithAI ? "AI-assisted" : "Rules-based fallback"}</span></div>
          <h1>{report.prospectName}</h1>
          <p><MapPin size={16} /> {place.address}</p>
        </div>
        <div className="score-orb" aria-label={`Prospect score ${report.prospectScore} out of 10`}>
          <strong>{report.prospectScore.toFixed(1)}</strong>
          <span>/ 10</span>
        </div>
      </section>

      <section className="report-metrics">
        <div><span>Priority</span><strong>{report.priority}</strong></div>
        <div><span>Confidence</span><strong>{report.confidence}</strong></div>
        <div><span>Recommendation</span><strong>{report.finalAssessment.verdict}</strong></div>
      </section>

      <div className="report-verdict"><BadgeCheck size={22} /><p>{report.oneLineVerdict}</p></div>

      <div className="report-layout">
        <div className="report-main">
          <Accordion title="Why they are commercially attractive" defaultOpen>
            <div className="report-list">
              {report.commerciallyAttractive.map((item, index) => (
                <article key={`${item.title}-${index}`} className="report-list-item">
                  <div className="report-list-icon"><BriefcaseBusiness size={18} /></div>
                  <div><h3>{item.title}</h3><p>{item.evidence}</p><small>{item.whyItMatters}</small></div>
                </article>
              ))}
            </div>
          </Accordion>

          <Accordion title="The opportunity" defaultOpen>
            <div className="report-list">
              {report.opportunity.map((item, index) => (
                <article key={`${item.title}-${index}`} className="report-list-item">
                  <div className="report-list-icon"><Target size={18} /></div>
                  <div><h3>{item.title}</h3><p>{item.description}</p><small>Outcome: {item.outcome}</small></div>
                </article>
              ))}
            </div>
          </Accordion>

          <Accordion title={`Best angle for ${profile.businessName}`} defaultOpen>
            <div className="angle-card">
              <span>Lead with this</span>
              <h3>{report.bestAngle.headline}</h3>
              <p>{report.bestAngle.explanation}</p>
            </div>
            <div className="avoid-card"><strong>Avoid leading with:</strong> {report.bestAngle.avoidLeadingWith}</div>
          </Accordion>

          <Accordion title="Possible objections">
            <div className="objections-list">
              {report.objections.map((item, index) => (
                <article key={`${item.objection}-${index}`}><h3>“{item.objection}”</h3><p>{item.response}</p></article>
              ))}
            </div>
          </Accordion>

          <Accordion title="Who to approach" defaultOpen>
            <div className="decision-list">
              {report.decisionMakers.map((person, index) => (
                <article key={`${person.role}-${index}`}>
                  <UserRoundSearch size={18} />
                  <div><h3>{person.name ? `${person.name} — ` : ""}{person.role}</h3>{person.contact ? <p>{person.contact}</p> : null}<small>{person.confidence}{person.source ? ` · ${person.source}` : ""}</small></div>
                </article>
              ))}
            </div>
          </Accordion>

          <Accordion title="Sample email structure" defaultOpen>
            <div className="email-panel">
              <div className="email-panel-head"><div><span>Subject</span><strong>{report.email.subjectLines[0]}</strong></div><CopyButton value={`${report.email.subjectLines[0]}\n\n${report.email.body}`} label="Copy email" /></div>
              <pre>{report.email.body}</pre>
            </div>
          </Accordion>

          <Accordion title="WhatsApp introduction and follow-up">
            <div className="message-card"><div><MessageCircle size={18} /><strong>WhatsApp introduction</strong></div><p>{report.email.whatsapp}</p><CopyButton value={report.email.whatsapp} /></div>
            <div className="message-card"><div><Mail size={18} /><strong>Follow-up</strong></div><p>{report.email.followUp}</p><CopyButton value={report.email.followUp} /></div>
          </Accordion>
        </div>

        <aside className="report-sidebar">
          <div className="sidebar-card">
            <h3>Public contacts found</h3>
            {report.discoveredContacts.emails.map((email) => <a key={email} href={`mailto:${email}`}>{email}</a>)}
            {report.discoveredContacts.phones.map((phone) => <a key={phone} href={`tel:${phone}`}>{phone}</a>)}
            {!report.discoveredContacts.emails.length && !report.discoveredContacts.phones.length ? <p>No verified public email or phone was found. Use the official listing or website contact form.</p> : null}
          </div>

          <div className="sidebar-card">
            <h3>Sources reviewed</h3>
            {report.sources.map((source, index) => <a key={`${source.url}-${index}`} href={source.url} target="_blank" rel="noreferrer">{source.label}<ExternalLink size={14} /></a>)}
            <p className="google-attribution">Business discovery data powered by Google Maps.</p>
          </div>

          <div className="sidebar-card sidebar-note"><ShieldCheck size={20} /><div><h3>Verify before outreach</h3><p>{report.dataNote}</p></div></div>

          <div className="sidebar-card bodilum-cta">
            <span>Need the complete system?</span>
            <h3>Turn prospecting into a repeatable growth process.</h3>
            <p>Bodilum helps businesses implement lead discovery, websites, WhatsApp, CRM and follow-up systems.</p>
            <a href="https://www.bodilum.com" target="_blank" rel="noreferrer">Visit Bodilum <ExternalLink size={15} /></a>
          </div>
        </aside>
      </div>
    </div>
  );
}
