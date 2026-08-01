"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  CircleAlert,
  Globe2,
  LoaderCircle,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BrandHeader } from "@/components/BrandHeader";
import { ReportView } from "@/components/ReportView";
import type {
  BusinessProfile,
  Offer,
  PlaceDetails,
  PlaceSummary,
  ProspectReport,
} from "@/types/prospect";

const emptyOffer = (): Offer => ({ name: "", description: "" });

const initialProfile: BusinessProfile = {
  businessName: "",
  website: "",
  industry: "",
  description: "",
  offers: [emptyOffer(), emptyOffer(), emptyOffer()],
  contactName: "",
  contactEmail: "",
  contactPhone: "",
};

type SearchResponse = {
  places?: PlaceSummary[];
  demo?: boolean;
  rateLimit?: { remaining: number; limit: number };
  error?: string;
};

type AnalyseResponse = {
  report?: ProspectReport;
  place?: PlaceDetails;
  rateLimit?: { remaining: number; limit: number };
  error?: string;
};

function fieldClass(value: string) {
  return `form-field ${value.trim() ? "form-field-filled" : ""}`;
}

function prettyStatus(status?: string) {
  if (!status) return "Business";
  return status.toLowerCase().replaceAll("_", " ");
}

export default function ProspectFinderPage() {
  const [profile, setProfile] = useState<BusinessProfile>(initialProfile);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [places, setPlaces] = useState<PlaceSummary[]>([]);
  const [searching, setSearching] = useState(false);
  const [analysingId, setAnalysingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [demo, setDemo] = useState(false);
  const [searchRemaining, setSearchRemaining] = useState<number | null>(null);
  const [analysisRemaining, setAnalysisRemaining] = useState<number | null>(null);
  const [report, setReport] = useState<ProspectReport | null>(null);
  const [analysedPlace, setAnalysedPlace] = useState<PlaceDetails | null>(null);
  const [activeSection, setActiveSection] = useState<"profile" | "search">("profile");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("bodilum-prospect-profile");
      if (stored) setProfile(JSON.parse(stored) as BusinessProfile);
    } catch {
      // Ignore invalid local storage.
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      window.localStorage.setItem("bodilum-prospect-profile", JSON.stringify(profile));
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [profile]);

  const profileComplete = useMemo(
    () =>
      Boolean(
        profile.businessName.trim() &&
          profile.industry.trim() &&
          profile.description.trim() &&
          profile.offers.some((offer) => offer.name.trim() && offer.description.trim()),
      ),
    [profile],
  );

  function updateProfile<Key extends keyof BusinessProfile>(key: Key, value: BusinessProfile[Key]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function updateOffer(index: number, key: keyof Offer, value: string) {
    const offers = profile.offers.map((offer, offerIndex) =>
      offerIndex === index ? { ...offer, [key]: value } : offer,
    );
    updateProfile("offers", offers);
  }

  function addOffer() {
    if (profile.offers.length >= 5) return;
    updateProfile("offers", [...profile.offers, emptyOffer()]);
  }

  function removeOffer(index: number) {
    if (profile.offers.length <= 1) return;
    updateProfile("offers", profile.offers.filter((_, offerIndex) => offerIndex !== index));
  }

  async function searchProspects(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!profileComplete) {
      setActiveSection("profile");
      setError("Complete the required business profile fields before searching.");
      return;
    }
    if (!category.trim() || !location.trim()) {
      setError("Enter the type of business you want to find and the target city or area.");
      return;
    }

    setSearching(true);
    setPlaces([]);
    setReport(null);
    try {
      const response = await fetch("/api/places/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, location }),
      });
      const payload = (await response.json()) as SearchResponse;
      if (!response.ok) throw new Error(payload.error || "The search could not be completed.");
      setPlaces(payload.places ?? []);
      setDemo(Boolean(payload.demo));
      setSearchRemaining(payload.rateLimit?.remaining ?? null);
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : "The search could not be completed.");
    } finally {
      setSearching(false);
    }
  }

  async function analyseProspect(place: PlaceSummary) {
    setError("");
    setAnalysingId(place.id);
    try {
      const response = await fetch("/api/prospect/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: {
            ...profile,
            website: profile.website.trim(),
            offers: profile.offers.filter((offer) => offer.name.trim() && offer.description.trim()),
          },
          place,
        }),
      });
      const payload = (await response.json()) as AnalyseResponse;
      if (!response.ok || !payload.report || !payload.place) {
        throw new Error(payload.error || "The prospect could not be analysed.");
      }
      setReport(payload.report);
      setAnalysedPlace(payload.place);
      setAnalysisRemaining(payload.rateLimit?.remaining ?? null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (analysisError) {
      setError(analysisError instanceof Error ? analysisError.message : "The prospect could not be analysed.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setAnalysingId(null);
    }
  }

  if (report && analysedPlace) {
    return (
      <main className="site-shell prospect-page">
        <BrandHeader />
        <ReportView
          report={report}
          profile={profile}
          place={analysedPlace}
          onBack={() => {
            setReport(null);
            setAnalysedPlace(null);
          }}
        />
        <footer className="site-footer compact-footer">
          <p>Use public business information responsibly. Verify all details before outreach.</p>
          <span>© {new Date().getFullYear()} Bodilum</span>
        </footer>
      </main>
    );
  }

  return (
    <main className="site-shell prospect-page">
      <BrandHeader />

      <section className="prospect-intro reveal-up">
        <Link href="/" className="back-link"><ArrowLeft size={16} /> All business tools</Link>
        <div className="eyebrow"><span /> Free local lead discovery</div>
        <h1>Find businesses worth approaching.<br />Know exactly what to say.</h1>
        <p>
          Tell us what your business offers, choose a market and receive an evidence-led
          prospect score, opportunity analysis and personalised introduction.
        </p>
        <div className="trust-row">
          <span><ShieldCheck size={17} /> Public business data only</span>
          <span><Sparkles size={17} /> Outcome-led analysis</span>
          <span><CheckCircle2 size={17} /> Downloadable report</span>
        </div>
      </section>

      {error ? (
        <div className="alert alert-error" role="alert"><CircleAlert size={20} /><span>{error}</span></div>
      ) : null}

      <section className="finder-layout">
        <aside className="finder-steps" aria-label="Prospect finder steps">
          <button type="button" className={activeSection === "profile" ? "active" : ""} onClick={() => setActiveSection("profile")}>
            <span>1</span><div><strong>Your business</strong><small>What you offer</small></div>{profileComplete ? <CheckCircle2 size={17} /> : null}
          </button>
          <button type="button" className={activeSection === "search" ? "active" : ""} onClick={() => setActiveSection("search")}>
            <span>2</span><div><strong>Target market</strong><small>Where to find leads</small></div>
          </button>
          <div className="step-disabled"><span>3</span><div><strong>Prospect analysis</strong><small>Score and outreach</small></div></div>

          <div className="finder-limit-note">
            <strong>Free daily access</strong>
            <p>Up to 2 full prospect analyses per day. Search limits may also apply.</p>
            {analysisRemaining !== null ? <span>{analysisRemaining} analyses remaining today</span> : null}
          </div>
        </aside>

        <div className="finder-panel">
          {activeSection === "profile" ? (
            <section className="form-section reveal-up">
              <div className="section-heading">
                <span>Step 1</span>
                <h2>Help the tool understand your business.</h2>
                <p>Your profile stays in this browser and is used to judge whether each local business is a strong fit for your offers.</p>
              </div>

              <div className="form-grid two-columns">
                <label className={fieldClass(profile.businessName)}>
                  <span>Business name *</span>
                  <input value={profile.businessName} onChange={(event) => updateProfile("businessName", event.target.value)} placeholder="e.g. Bodilum" />
                </label>
                <label className={fieldClass(profile.website)}>
                  <span>Business website</span>
                  <input value={profile.website} onChange={(event) => updateProfile("website", event.target.value)} placeholder="https://www.yourbusiness.com" inputMode="url" />
                </label>
                <label className={fieldClass(profile.industry)}>
                  <span>Your industry *</span>
                  <input value={profile.industry} onChange={(event) => updateProfile("industry", event.target.value)} placeholder="e.g. Creative technology studio" />
                </label>
                <label className={`${fieldClass(profile.description)} full-span`}>
                  <span>What does your business help customers achieve? *</span>
                  <textarea value={profile.description} onChange={(event) => updateProfile("description", event.target.value)} placeholder="Describe the customer outcomes you create—not only the technology or tasks you provide." rows={4} />
                </label>
              </div>

              <div className="offers-heading">
                <div><span>Your offers *</span><p>Add 1–5 products or services and describe the outcome of each.</p></div>
                <button type="button" className="small-button" onClick={addOffer} disabled={profile.offers.length >= 5}><Plus size={15} /> Add offer</button>
              </div>

              <div className="offers-list">
                {profile.offers.map((offer, index) => (
                  <div className="offer-row" key={`offer-${index}`}>
                    <div className="offer-number">{String(index + 1).padStart(2, "0")}</div>
                    <label className={fieldClass(offer.name)}><span>Offer name</span><input value={offer.name} onChange={(event) => updateOffer(index, "name", event.target.value)} placeholder="e.g. WhatsApp lead-to-booking system" /></label>
                    <label className={fieldClass(offer.description)}><span>Outcome / description</span><textarea value={offer.description} onChange={(event) => updateOffer(index, "description", event.target.value)} placeholder="e.g. Turn more enquiries into qualified, booked customers." rows={2} /></label>
                    <button type="button" className="icon-button danger" onClick={() => removeOffer(index)} disabled={profile.offers.length <= 1} aria-label={`Remove offer ${index + 1}`}><Trash2 size={17} /></button>
                  </div>
                ))}
              </div>

              <div className="subsection-title"><h3>Your outreach details</h3><p>These details will be placed in the generated introduction and PDF.</p></div>
              <div className="form-grid three-columns">
                <label className={fieldClass(profile.contactName)}><span>Your name</span><input value={profile.contactName} onChange={(event) => updateProfile("contactName", event.target.value)} placeholder="Full name" /></label>
                <label className={fieldClass(profile.contactEmail)}><span>Email</span><input value={profile.contactEmail} onChange={(event) => updateProfile("contactEmail", event.target.value)} placeholder="you@business.com" inputMode="email" /></label>
                <label className={fieldClass(profile.contactPhone)}><span>Phone / WhatsApp</span><input value={profile.contactPhone} onChange={(event) => updateProfile("contactPhone", event.target.value)} placeholder="+27…" inputMode="tel" /></label>
              </div>

              <div className="form-actions">
                <span>{profileComplete ? <><CheckCircle2 size={17} /> Required profile details complete</> : "Complete all required fields to continue."}</span>
                <button type="button" className="button button-primary" disabled={!profileComplete} onClick={() => setActiveSection("search")}>Choose target market <ArrowRight size={17} /></button>
              </div>
            </section>
          ) : (
            <section className="form-section reveal-up">
              <div className="section-heading">
                <span>Step 2</span>
                <h2>Choose the businesses you want to approach.</h2>
                <p>Search by business category and location. Select a result to generate the full commercial analysis and outreach structure.</p>
              </div>

              <form className="market-search" onSubmit={searchProspects}>
                <label className={fieldClass(category)}>
                  <span>Type of prospect *</span>
                  <div className="input-with-icon"><Building2 size={19} /><input value={category} onChange={(event) => setCategory(event.target.value)} placeholder="e.g. Aesthetic clinics, hotels, accountants" /></div>
                </label>
                <label className={fieldClass(location)}>
                  <span>City, suburb or area *</span>
                  <div className="input-with-icon"><MapPin size={19} /><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="e.g. Lekki Phase 1, Lagos" /></div>
                </label>
                <button type="submit" className="button button-primary search-button" disabled={searching || !profileComplete}>
                  {searching ? <LoaderCircle className="spin" size={19} /> : <Search size={19} />}
                  {searching ? "Finding businesses…" : "Find prospects"}
                </button>
              </form>

              {searchRemaining !== null ? <p className="usage-caption">{searchRemaining} searches remaining today.</p> : null}

              {places.length ? (
                <div className="results-section">
                  <div className="results-heading">
                    <div><span>{places.length} businesses found</span><h3>Choose a business to analyse</h3></div>
                    {demo ? <span className="demo-badge">Demo data — add a Google Places key for live results</span> : null}
                  </div>

                  <div className="prospect-list">
                    {places.map((place, index) => (
                      <article className="prospect-card" key={place.id}>
                        <div className="prospect-index">{String(index + 1).padStart(2, "0")}</div>
                        <div className="prospect-copy">
                          <div className="prospect-title-row">
                            <div><h3>{place.name}</h3><span>{place.primaryType}</span></div>
                            {place.rating ? <span className="rating"><Star size={14} fill="currentColor" /> {place.rating}{place.reviewCount ? ` (${place.reviewCount})` : ""}</span> : null}
                          </div>
                          <p><MapPin size={15} /> {place.address}</p>
                          <div className="prospect-meta">
                            <span>{prettyStatus(place.businessStatus)}</span>
                            {place.website ? <span><Globe2 size={14} /> Website available</span> : null}
                          </div>
                        </div>
                        <button type="button" className="button analyse-button" onClick={() => analyseProspect(place)} disabled={Boolean(analysingId)}>
                          {analysingId === place.id ? <LoaderCircle className="spin" size={18} /> : <Sparkles size={18} />}
                          {analysingId === place.id ? "Analysing…" : "Analyse prospect"}
                        </button>
                      </article>
                    ))}
                  </div>

                  <p className="google-attribution results-attribution">Business discovery data powered by Google Maps.</p>
                </div>
              ) : !searching ? (
                <div className="empty-results">
                  <div><Search size={28} /></div>
                  <h3>Your local prospect shortlist will appear here.</h3>
                  <p>Start with a focused category and location—for example, “aesthetic clinics” in “Lekki Phase 1, Lagos”.</p>
                </div>
              ) : null}
            </section>
          )}
        </div>
      </section>

      <section className="how-it-works">
        <div className="eyebrow"><span /> What the full analysis includes</div>
        <div className="how-grid">
          <article><strong>01</strong><h3>Prospect score and priority</h3><p>See whether the business deserves immediate, selective or low-priority outreach.</p></article>
          <article><strong>02</strong><h3>Commercial opportunity</h3><p>Understand why the business is attractive and where your offers can create measurable value.</p></article>
          <article><strong>03</strong><h3>Outreach strategy</h3><p>Get the best angle, likely objections, decision-maker guidance and a personalised email.</p></article>
        </div>
      </section>

      <footer className="site-footer">
        <p>Tools by <a href="https://www.bodilum.com" target="_blank" rel="noreferrer">Bodilum</a> — a Nigerian-owned creative technology studio based in Johannesburg.</p>
        <span>© {new Date().getFullYear()} Bodilum</span>
      </footer>
    </main>
  );
}
