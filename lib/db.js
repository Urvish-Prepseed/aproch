import mongoose from "mongoose";

/** Same collection name as riverside admin — no duplicate schema */
export const APROCH_EVENTS_COLLECTION = "aprochEvents";

function getMongoUri() {
  const base = process.env.MONGO_URL;
  if (!base) throw new Error("MONGO_URL is not set");

  const dbName = process.env.MONGO_MAIN_DB || "production";
  const trimmed = base.replace(/\/+$/, "");
  if (trimmed.includes("?")) {
    return trimmed.replace("?", `/${dbName}?`);
  }
  return `${trimmed}/${dbName}`;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDb() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(getMongoUri(), {
        bufferCommands: false,
        maxPoolSize: 10,
      })
      .then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/** Read/write `aprochEvents` without a Mongoose model (schema lives in riverside only). */
export async function getAprochEventsCollection() {
  const conn = await connectToDb();
  return conn.db.collection(APROCH_EVENTS_COLLECTION);
}
