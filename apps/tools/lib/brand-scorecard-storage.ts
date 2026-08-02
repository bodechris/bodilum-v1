import { createHmac } from "node:crypto";
import type { Collection } from "mongodb";
import { env } from "@/lib/env";
import { getDatabase } from "@/lib/mongodb";
import type {
  BrandScorecardAnswerMap,
  BrandScorecardProfile,
  BrandScorecardResult,
  BrandScorecardSavedState,
} from "@/types/brand-scorecard";

type BrandScorecardStateDocument = BrandScorecardSavedState & {
  ownerKey: string;
  schemaVersion: 1;
  createdAt: Date;
  updatedAt: Date;
};

type BrandScorecardResultDocument = {
  ownerKey: string;
  result: BrandScorecardResult;
  createdAt: Date;
};

declare global {
  var __bodilumScorecardStateIndexes: Promise<string> | undefined;
  var __bodilumScorecardResultIndexes: Promise<string[]> | undefined;
}

function ownerKey(visitorId: string) {
  const secret = env.rateLimitSalt || env.siteUrl;
  return createHmac("sha256", secret).update(`brand-scorecard:${visitorId}`).digest("hex");
}

function blankProfile(): BrandScorecardProfile {
  return {
    businessName: "",
    website: "",
    industry: "",
    respondentName: "",
    contactEmail: "",
    contactPhone: "",
  };
}

export function blankBrandScorecardState(): BrandScorecardSavedState {
  return { profile: blankProfile(), answers: {}, currentStep: 0, lastResult: null };
}

async function stateCollection(): Promise<Collection<BrandScorecardStateDocument> | null> {
  const database = await getDatabase();
  if (!database) return null;
  const collection = database.collection<BrandScorecardStateDocument>("brand_scorecard_profiles");
  if (!globalThis.__bodilumScorecardStateIndexes) {
    globalThis.__bodilumScorecardStateIndexes = collection.createIndex(
      { ownerKey: 1 },
      { unique: true, name: "unique_brand_scorecard_owner" },
    );
  }
  await globalThis.__bodilumScorecardStateIndexes;
  return collection;
}

async function resultsCollection(): Promise<Collection<BrandScorecardResultDocument> | null> {
  const database = await getDatabase();
  if (!database) return null;
  const collection = database.collection<BrandScorecardResultDocument>("brand_scorecard_results");
  if (!globalThis.__bodilumScorecardResultIndexes) {
    globalThis.__bodilumScorecardResultIndexes = Promise.all([
      collection.createIndex({ ownerKey: 1, createdAt: -1 }, { name: "scorecard_results_by_owner" }),
      collection.createIndex({ "result.id": 1 }, { unique: true, name: "unique_scorecard_result" }),
    ]);
  }
  await globalThis.__bodilumScorecardResultIndexes;
  return collection;
}

export async function getBrandScorecardState(visitorId: string) {
  const collection = await stateCollection();
  if (!collection) return null;
  const document = await collection.findOne(
    { ownerKey: ownerKey(visitorId) },
    { projection: { _id: 0, profile: 1, answers: 1, currentStep: 1, lastResult: 1 } },
  );
  if (!document) return null;
  return {
    profile: document.profile ?? blankProfile(),
    answers: document.answers ?? {},
    currentStep: document.currentStep ?? 0,
    lastResult: document.lastResult ?? null,
  } satisfies BrandScorecardSavedState;
}

export async function saveBrandScorecardState(
  visitorId: string,
  state: {
    profile: BrandScorecardProfile;
    answers: BrandScorecardAnswerMap;
    currentStep: number;
  },
  clearResult = false,
) {
  const collection = await stateCollection();
  if (!collection) return false;
  const now = new Date();
  const setFields: Partial<BrandScorecardStateDocument> = {
    profile: state.profile,
    answers: state.answers,
    currentStep: state.currentStep,
    schemaVersion: 1,
    updatedAt: now,
  };
  if (clearResult) setFields.lastResult = null;
  const setOnInsert: Partial<BrandScorecardStateDocument> = clearResult
    ? { createdAt: now }
    : { createdAt: now, lastResult: null };
  await collection.updateOne(
    { ownerKey: ownerKey(visitorId) },
    {
      $set: setFields,
      $setOnInsert: setOnInsert,
    },
    { upsert: true },
  );
  return true;
}

export async function saveBrandScorecardResult(visitorId: string, result: BrandScorecardResult) {
  const state = await stateCollection();
  const results = await resultsCollection();
  if (!state || !results) return false;
  const key = ownerKey(visitorId);
  const now = new Date();
  await Promise.all([
    state.updateOne(
      { ownerKey: key },
      {
        $set: {
          profile: result.profile,
          answers: result.answers,
          currentStep: 6,
          lastResult: result,
          schemaVersion: 1,
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true },
    ),
    results.insertOne({ ownerKey: key, result, createdAt: now }),
  ]);
  return true;
}

export async function deleteBrandScorecardState(visitorId: string) {
  const state = await stateCollection();
  const results = await resultsCollection();
  if (!state || !results) return false;
  const key = ownerKey(visitorId);
  await Promise.all([state.deleteOne({ ownerKey: key }), results.deleteMany({ ownerKey: key })]);
  return true;
}
