import { MongoClient, type Db } from "mongodb";
import { env } from "@/lib/env";

declare global {
  var __bodilumMongoPromise: Promise<MongoClient> | undefined;
}

export async function getDatabase(): Promise<Db | null> {
  if (!env.mongoUri) return null;

  if (!globalThis.__bodilumMongoPromise) {
    const client = new MongoClient(env.mongoUri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
    });
    globalThis.__bodilumMongoPromise = client.connect();
  }

  const client = await globalThis.__bodilumMongoPromise;
  return client.db(env.mongoDb);
}
