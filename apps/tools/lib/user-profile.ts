import { createHmac } from "node:crypto";
import type { Collection } from "mongodb";
import { env } from "@/lib/env";
import { getDatabase } from "@/lib/mongodb";
import type { BusinessProfile } from "@/types/prospect";

export type ProspectFinderPreferences = {
  profile: BusinessProfile;
  targetCategory: string;
  targetLocation: string;
};

type StoredProfileDocument = ProspectFinderPreferences & {
  ownerKey: string;
  schemaVersion: 1;
  createdAt: Date;
  updatedAt: Date;
};

declare global {
  var __bodilumProfileIndexes: Promise<string> | undefined;
}

function ownerKey(visitorId: string) {
  const secret = env.rateLimitSalt || env.siteUrl;
  return createHmac("sha256", secret).update(`prospect-profile:${visitorId}`).digest("hex");
}

async function profileCollection(): Promise<Collection<StoredProfileDocument> | null> {
  const database = await getDatabase();
  if (!database) return null;
  const collection = database.collection<StoredProfileDocument>("prospect_finder_profiles");
  if (!globalThis.__bodilumProfileIndexes) {
    globalThis.__bodilumProfileIndexes = collection.createIndex(
      { ownerKey: 1 },
      { unique: true, name: "unique_profile_owner" },
    );
  }
  await globalThis.__bodilumProfileIndexes;
  return collection;
}

export async function getProspectFinderPreferences(visitorId: string) {
  const collection = await profileCollection();
  if (!collection) return null;
  const document = await collection.findOne(
    { ownerKey: ownerKey(visitorId) },
    { projection: { _id: 0, profile: 1, targetCategory: 1, targetLocation: 1 } },
  );
  if (!document) return null;
  return {
    profile: document.profile,
    targetCategory: document.targetCategory ?? "",
    targetLocation: document.targetLocation ?? "",
  } satisfies ProspectFinderPreferences;
}

export async function saveProspectFinderPreferences(
  visitorId: string,
  preferences: ProspectFinderPreferences,
) {
  const collection = await profileCollection();
  if (!collection) return false;
  const now = new Date();
  await collection.updateOne(
    { ownerKey: ownerKey(visitorId) },
    {
      $set: {
        profile: preferences.profile,
        targetCategory: preferences.targetCategory,
        targetLocation: preferences.targetLocation,
        schemaVersion: 1,
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );
  return true;
}

export async function deleteProspectFinderPreferences(visitorId: string) {
  const collection = await profileCollection();
  if (!collection) return false;
  await collection.deleteOne({ ownerKey: ownerKey(visitorId) });
  return true;
}
