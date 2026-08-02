"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleGauge,
  LoaderCircle,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { BrandHeader } from "@/components/BrandHeader";
import { BrandScorecardResultView } from "@/components/BrandScorecardResult";
import { LegalFooterLinks } from "@/components/LegalFooterLinks";
import {
  allBrandScorecardQuestions,
  brandScorecardCategories,
  scoreOptions,
} from "@/lib/brand-scorecard";
import type {
  BrandScorecardAnswerMap,
  BrandScorecardProfile,
  BrandScorecardResult,
  BrandScorecardSavedState,
} from "@/types/brand-scorecard";

const blankProfile: BrandScorecardProfile = {
  businessName: "",
  website: "",
  industry: "",
  respondentName: "",
  contactEmail: "",
  contactPhone: "",
};

const localStorageKey = "bodilum-brand-scorecard";
const totalSteps = brandScorecardCategories.length + 1;

function profileError(profile: BrandScorecardProfile) {
  if (!profile.businessName.trim()) return "Enter your business or brand name.";
  if (!profile.industry.trim()) return "Enter your industry or business category.";
  if (!profile.respondentName.trim()) return "Enter your name.";
  if (!profile.contactEmail.trim() && !profile.contactPhone.trim()) return "Add an email address or phone/WhatsApp number.";
  if (profile.contactEmail && !/^\S+@\S+\.\S+$/.test(profile.contactEmail)) return "Enter a valid email address.";
  if (profile.contactPhone && profile.contactPhone.replace(/\D/g, "").length < 7) return "Enter a valid phone or WhatsApp number.";
  return "";
}

function categoryCompleted(categoryIndex: number, answers: BrandScorecardAnswerMap) {
  const category = brandScorecardCategories[categoryIndex];
  return category.questions.every((question) => Boolean(answers[question.id]));
}

export default function BrandScorecardPage() {
  const [profile, setProfile] = useState<BrandScorecardProfile>(blankProfile);
  const [answers, setAnswers] = useState<BrandScorecardAnswerMap>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<BrandScorecardResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "local" | "error">("idle");
  const [error, setError] = useState("");

  const answeredCount = Object.keys(answers).filter((id) => Boolean(answers[id])).length;
  const completion = Math.round((answeredCount / allBrandScorecardQuestions.length) * 100);
  const activeCategory = currentStep > 0 && currentStep <= brandScorecardCategories.length
    ? brandScorecardCategories[currentStep - 1]
    : null;

  const stepLabels = useMemo(
    () => ["Your business", ...brandScorecardCategories.map((category) => category.shortTitle)],
    [],
  );

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/brand-scorecard/profile", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Profile request failed");
        return response.json() as Promise<{ state: BrandScorecardSavedState; persistent: boolean }>;
      })
      .then(({ state, persistent }) => {
        if (cancelled) return;
        const hasServerState = Boolean(state.profile.businessName || Object.keys(state.answers).length || state.lastResult);
        if (hasServerState) {
          setProfile(state.profile);
          setAnswers(state.answers);
          setCurrentStep(Math.min(state.currentStep, brandScorecardCategories.length));
          setResult(state.lastResult);
          setSaveStatus(persistent ? "saved" : "local");
          return;
        }
        try {
          const local = window.localStorage.getItem(localStorageKey);
          if (local) {
            const parsed = JSON.parse(local) as Partial<BrandScorecardSavedState>;
            if (parsed.profile) setProfile({ ...blankProfile, ...parsed.profile });
            if (parsed.answers) setAnswers(parsed.answers);
            if (typeof parsed.currentStep === "number") setCurrentStep(Math.min(parsed.currentStep, brandScorecardCategories.length));
            if (parsed.lastResult) setResult(parsed.lastResult);
            setSaveStatus("local");
          }
        } catch {
          window.localStorage.removeItem(localStorageKey);
        }
      })
      .catch(() => {
        if (cancelled) return;
        try {
          const local = window.localStorage.getItem(localStorageKey);
          if (local) {
            const parsed = JSON.parse(local) as Partial<BrandScorecardSavedState>;
            if (parsed.profile) setProfile({ ...blankProfile, ...parsed.profile });
            if (parsed.answers) setAnswers(parsed.answers);
            if (typeof parsed.currentStep === "number") setCurrentStep(Math.min(parsed.currentStep, brandScorecardCategories.length));
            if (parsed.lastResult) setResult(parsed.lastResult);
          }
        } catch {
          window.localStorage.removeItem(localStorageKey);
        }
        setSaveStatus("local");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (loading) return;
    const timeout = window.setTimeout(() => {
      const state = { profile, answers, currentStep, lastResult: result } satisfies BrandScorecardSavedState;
      window.localStorage.setItem(localStorageKey, JSON.stringify(state));
      setSaveStatus("saving");
      void fetch("/api/brand-scorecard/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, answers, currentStep }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Save failed");
          setSaveStatus("saved");
        })
        .catch(() => setSaveStatus("local"));
    }, 700);
    return () => window.clearTimeout(timeout);
  }, [answers, currentStep, loading, profile, result]);

  function updateProfile(field: keyof BrandScorecardProfile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function selectAnswer(questionId: string, value: number) {
    setAnswers((current) => ({ ...current, [questionId]: value }));
    setError("");
  }

  function goNext() {
    setError("");
    if (currentStep === 0) {
      const message = profileError(profile);
      if (message) {
        setError(message);
        return;
      }
      setCurrentStep(1);
      return;
    }
    if (currentStep <= brandScorecardCategories.length) {
      const index = currentStep - 1;
      if (!categoryCompleted(index, answers)) {
        const remaining = brandScorecardCategories[index].questions.filter((question) => !answers[question.id]).length;
        setError(`Answer all questions in this section before continuing. ${remaining} remaining.`);
        return;
      }
      if (currentStep < brandScorecardCategories.length) {
        setCurrentStep((step) => step + 1);
      } else {
        void generateResult();
      }
    }
  }

  async function generateResult() {
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/brand-scorecard/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, answers }),
      });
      const payload = await response.json() as { result?: BrandScorecardResult; error?: string };
      if (!response.ok || !payload.result) throw new Error(payload.error || "Unable to generate your scorecard.");
      setResult(payload.result);
      setSaveStatus("saved");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to generate your scorecard.");
    } finally {
      setSubmitting(false);
    }
  }

  async function clearSavedDetails() {
    if (!window.confirm("Clear your saved Brand Scorecard details and results from this browser?")) return;
    await fetch("/api/brand-scorecard/profile", { method: "DELETE" }).catch(() => undefined);
    window.localStorage.removeItem(localStorageKey);
    setProfile(blankProfile);
    setAnswers({});
    setResult(null);
    setCurrentStep(0);
    setSaveStatus("idle");
    setError("");
  }

  function restart() {
    const nextAnswers: BrandScorecardAnswerMap = {};
    setAnswers(nextAnswers);
    setResult(null);
    setCurrentStep(0);
    setError("");
    window.localStorage.setItem(
      localStorageKey,
      JSON.stringify({ profile, answers: nextAnswers, currentStep: 0, lastResult: null }),
    );
    void fetch("/api/brand-scorecard/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile, answers: nextAnswers, currentStep: 0, clearResult: true }),
    }).catch(() => undefined);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (result) {
    return (
      <main className="site-shell scorecard-page">
        <BrandHeader />
        <BrandScorecardResultView
          result={result}
          onBack={() => { setResult(null); setCurrentStep(brandScorecardCategories.length); }}
          onRestart={restart}
        />
        <footer className="site-footer compact-footer"><p>Use your results as a prioritisation guide, not a substitute for customer research.</p><div className="footer-meta"><LegalFooterLinks /><span>© {new Date().getFullYear()} Bodilum</span></div></footer>
      </main>
    );
  }

  return (
    <main className="site-shell scorecard-page">
      <BrandHeader />
      <section className="scorecard-intro reveal-up">
        <Link href="/" className="back-link"><ArrowLeft size={14} /> All business tools</Link>
        <div className="eyebrow"><span /> Free 40-question assessment</div>
        <h1>How strong is the brand customers actually experience?</h1>
        <p>Measure the clarity, credibility and commercial readiness of your brand. Get a score out of 100, see what is holding the business back and leave with a practical 30-day improvement plan.</p>
        <div className="trust-row">
          <span><ShieldCheck size={17} /> Direct, transparent scoring</span>
          <span><Sparkles size={17} /> Personalised recommendations</span>
          <span><BadgeCheck size={17} /> Downloadable scorecard</span>
        </div>
      </section>

      {error ? <div className="alert alert-error"><AlertCircle size={18} /> {error}</div> : null}

      <section className="scorecard-workspace">
        <aside className="scorecard-navigation">
          <div className="scorecard-progress-card">
            <div><span>Assessment progress</span><strong>{completion}%</strong></div>
            <div className="scorecard-progress-track"><span style={{ width: `${completion}%` }} /></div>
            <small>{answeredCount} of {allBrandScorecardQuestions.length} questions answered</small>
          </div>

          <nav aria-label="Brand Scorecard sections">
            {stepLabels.map((label, index) => {
              const categoryIndex = index - 1;
              const completed = index === 0
                ? !profileError(profile)
                : categoryIndex >= 0 && categoryCompleted(categoryIndex, answers);
              return (
                <button
                  key={label}
                  type="button"
                  className={currentStep === index ? "active" : ""}
                  onClick={() => {
                    if (index <= currentStep || completed) {
                      setCurrentStep(index);
                      setError("");
                    }
                  }}
                >
                  <span>{completed ? <Check size={14} /> : index + 1}</span>
                  <div><strong>{label}</strong><small>{index === 0 ? "Business details" : `${brandScorecardCategories[categoryIndex].questions.length} questions`}</small></div>
                </button>
              );
            })}
          </nav>

          <div className="scorecard-save-card">
            <Save size={18} />
            <div><strong>{loading ? "Loading your scorecard" : saveStatus === "saved" ? "Saved to your browser profile" : saveStatus === "saving" ? "Saving progress" : "Saved on this device"}</strong><small>You can return and continue later on this browser.</small></div>
          </div>
          <button type="button" className="scorecard-clear-button" onClick={clearSavedDetails}><Trash2 size={14} /> Clear saved details</button>
        </aside>

        <div className="scorecard-panel">
          {loading ? (
            <div className="scorecard-loading"><LoaderCircle className="spin" size={28} /><h2>Loading your scorecard</h2><p>Restoring any progress saved on this browser.</p></div>
          ) : currentStep === 0 ? (
            <div className="scorecard-profile-step">
              <div className="scorecard-step-heading"><span>Step 1 of {totalSteps}</span><h2>Tell us about the business.</h2><p>These details personalise the scorecard and are saved to your browser-specific profile.</p></div>
              <div className="scorecard-profile-grid">
                <label><span>Business or brand name *</span><input value={profile.businessName} onChange={(event: ChangeEvent<HTMLInputElement>) => updateProfile("businessName", event.target.value)} placeholder="e.g. Kora Legal" maxLength={140} /></label>
                <label><span>Industry or business category *</span><input value={profile.industry} onChange={(event: ChangeEvent<HTMLInputElement>) => updateProfile("industry", event.target.value)} placeholder="e.g. Legal services" maxLength={160} /></label>
                <label className="wide"><span>Website</span><input value={profile.website} onChange={(event: ChangeEvent<HTMLInputElement>) => updateProfile("website", event.target.value)} placeholder="https://yourbusiness.com" maxLength={500} /></label>
                <label><span>Your name *</span><input value={profile.respondentName} onChange={(event: ChangeEvent<HTMLInputElement>) => updateProfile("respondentName", event.target.value)} placeholder="Name used on the report" maxLength={160} /></label>
                <label><span>Email address</span><input type="email" value={profile.contactEmail} onChange={(event: ChangeEvent<HTMLInputElement>) => updateProfile("contactEmail", event.target.value)} placeholder="you@business.com" maxLength={254} /></label>
                <label className="wide"><span>Phone or WhatsApp</span><input value={profile.contactPhone} onChange={(event: ChangeEvent<HTMLInputElement>) => updateProfile("contactPhone", event.target.value)} placeholder="+27 73 311 0149" maxLength={80} /></label>
              </div>
              <div className="scorecard-privacy-note"><ShieldCheck size={18} /><p>Your information is used to save and personalise this assessment. It is not shown publicly or shared with the businesses you assess elsewhere on Bodilum Tools.</p></div>
            </div>
          ) : activeCategory ? (
            <div className="scorecard-question-step">
              <div className="scorecard-step-heading">
                <span>Step {currentStep + 1} of {totalSteps}</span>
                <h2>{activeCategory.title}</h2>
                <p>{activeCategory.description}</p>
              </div>
              <div className="scorecard-question-list">
                {activeCategory.questions.map((question, index) => (
                  <article key={question.id} className={answers[question.id] ? "answered" : ""}>
                    <div className="scorecard-question-copy">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div><h3>{question.title}</h3><p>{question.help}</p></div>
                    </div>
                    <div className="scorecard-answer-options" role="radiogroup" aria-label={question.title}>
                      {scoreOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={answers[question.id] === option.value}
                          className={answers[question.id] === option.value ? "selected" : ""}
                          onClick={() => selectAnswer(question.id, option.value)}
                          title={option.label}
                        >
                          <strong>{option.value}</strong><span>{option.shortLabel}</span>
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {!loading ? (
            <div className="scorecard-actions">
              <button
                type="button"
                className="button button-secondary"
                disabled={currentStep === 0 || submitting}
                onClick={() => { setCurrentStep((step) => Math.max(0, step - 1)); setError(""); }}
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <span>{currentStep === 0 ? "Takes approximately 7–10 minutes." : activeCategory ? `${activeCategory.questions.filter((question) => answers[question.id]).length} of 8 answered in this section` : ""}</span>
              <button type="button" className="button button-primary" disabled={submitting} onClick={goNext}>
                {submitting ? <><LoaderCircle className="spin" size={17} /> Generating your score…</> : currentStep === brandScorecardCategories.length ? <><CircleGauge size={17} /> Generate my score</> : <>Continue <ArrowRight size={17} /></>}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="scorecard-how-it-works">
        <div className="eyebrow"><span /> What the score measures</div>
        <div className="scorecard-measure-grid">
          {brandScorecardCategories.map((category, index) => (
            <article key={category.id}><strong>0{index + 1}</strong><h3>{category.shortTitle}</h3><p>{category.description}</p></article>
          ))}
        </div>
      </section>

      <footer className="site-footer compact-footer"><p>Free diagnostic by <a href="https://www.bodilum.com" target="_blank" rel="noreferrer">Bodilum</a></p><div className="footer-meta"><LegalFooterLinks /><span>© {new Date().getFullYear()} Bodilum</span></div></footer>
    </main>
  );
}
