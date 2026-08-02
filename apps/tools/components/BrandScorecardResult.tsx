"use client";

import dynamic from "next/dynamic";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  Gauge,
  Lightbulb,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import type { BrandScorecardResult } from "@/types/brand-scorecard";

const BrandScorecardPdf = dynamic(() => import("@/components/BrandScorecardPdf"), { ssr: false });

export function BrandScorecardResultView({
  result,
  onBack,
  onRestart,
}: {
  result: BrandScorecardResult;
  onBack: () => void;
  onRestart: () => void;
}) {
  return (
    <section className="scorecard-result-wrap reveal-up">
      <div className="scorecard-result-actions">
        <button type="button" className="text-button" onClick={onBack}><ArrowLeft size={15} /> Review answers</button>
        <div>
          <button type="button" className="button button-secondary" onClick={onRestart}><RotateCcw size={16} /> Start again</button>
          <BrandScorecardPdf result={result} />
        </div>
      </div>

      <div className="scorecard-result-hero">
        <div>
          <div className="report-provider-row">
            <div className="eyebrow"><span /> Brand scorecard</div>
            <span className={`analysis-provider-badge ${result.generatedWithAI ? "ai" : "fallback"}`}>
              {result.generatedWithAI ? "AI-assisted" : "Direct score"}
            </span>
          </div>
          <h1>{result.profile.businessName}</h1>
          <p>{result.maturity.label}</p>
        </div>
        <div className="brand-score-orb"><strong>{result.overallScore}</strong><span>/100</span></div>
      </div>

      <div className="scorecard-verdict">
        <BadgeCheck size={22} />
        <div>
          <strong>{result.verdict}</strong>
          <p>{result.maturity.description}</p>
        </div>
      </div>

      <div className="scorecard-category-grid">
        {result.categoryScores.map((category) => (
          <article key={category.id}>
            <div><span>{category.shortTitle}</span><strong>{category.score}</strong></div>
            <div className="score-bar" aria-label={`${category.title}: ${category.score} out of 100`}><span style={{ width: `${category.score}%` }} /></div>
            <p>{category.interpretation}</p>
          </article>
        ))}
      </div>

      <div className="scorecard-result-layout">
        <div className="scorecard-result-main">
          <section className="scorecard-result-section scorecard-ai-diagnosis">
            <div className="scorecard-section-heading"><BrainCircuit size={21} /><div><span>Diagnosis</span><h2>What your score means</h2></div></div>
            <p className="scorecard-summary-copy">{result.aiInsight.executiveSummary}</p>
            <div className="scorecard-impact-list">
              {result.aiInsight.commercialImpact.map((item, index) => (
                <div key={`${item}-${index}`}><TrendingUp size={17} /><p>{item}</p></div>
              ))}
            </div>
          </section>

          <section className="scorecard-result-section">
            <div className="scorecard-section-heading"><ShieldCheck size={21} /><div><span>Protect these</span><h2>Your strongest brand signals</h2></div></div>
            <div className="scorecard-insight-list strengths">
              {result.strengths.map((item) => (
                <article key={item.questionId}>
                  <div className="insight-score">{item.score}/5</div>
                  <div><span>{item.category}</span><h3>{item.title}</h3><p>{item.whyItMatters}</p></div>
                </article>
              ))}
            </div>
          </section>

          <section className="scorecard-result-section">
            <div className="scorecard-section-heading"><Target size={21} /><div><span>Fix these first</span><h2>Your priority improvements</h2></div></div>
            <div className="scorecard-insight-list priorities">
              {result.priorities.map((item, index) => (
                <article key={item.questionId}>
                  <div className="priority-index">0{index + 1}</div>
                  <div><span>{item.category} · scored {item.score}/5</span><h3>{item.action}</h3><p>{item.whyItMatters}</p></div>
                </article>
              ))}
            </div>
          </section>

          <section className="scorecard-result-section">
            <div className="scorecard-section-heading"><Gauge size={21} /><div><span>Take action</span><h2>Your 30-day improvement plan</h2></div></div>
            <div className="scorecard-plan">
              {result.next30Days.map((item) => (
                <article key={item.period}>
                  <span>{item.period}</span>
                  <div><h3>{item.title}</h3><p>{item.action}</p><small>Expected outcome: {item.outcome}</small></div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="scorecard-result-sidebar">
          <div className="scorecard-sidebar-card first-move-card">
            <Lightbulb size={22} />
            <span>Best first move</span>
            <h3>{result.aiInsight.firstMove}</h3>
          </div>

          <div className="scorecard-sidebar-card">
            <Sparkles size={21} />
            <h3>What to focus on</h3>
            {result.aiInsight.priorityNarrative.map((item, index) => (
              <p key={`${item}-${index}`}><CheckCircle2 size={14} /> {item}</p>
            ))}
          </div>

          <div className="scorecard-sidebar-card scorecard-bodilum-cta">
            <span>Need expert implementation?</span>
            <h3>Turn the score into a stronger customer experience.</h3>
            <p>Bodilum helps businesses strengthen positioning, identity, websites, customer journeys and practical AI-enabled growth systems.</p>
            <a href="https://www.bodilum.com" target="_blank" rel="noreferrer">Visit Bodilum <ArrowUpRight size={16} /></a>
          </div>

          <div className="scorecard-sidebar-card scorecard-sprint-cta">
            <span>Work smarter with AI</span>
            <h3>Build a practical AI plan for your business.</h3>
            <p>The one-on-one AI Business Sprint turns everyday business bottlenecks into a focused 30-day action plan.</p>
            <a href="https://imaginelabs.bodilum.com/ai-business-sprint" target="_blank" rel="noreferrer">Explore the AI Business Sprint <ArrowUpRight size={16} /></a>
          </div>
        </aside>
      </div>
    </section>
  );
}
