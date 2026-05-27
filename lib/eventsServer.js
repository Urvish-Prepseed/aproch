import mongoose from "mongoose";
import { getAprochEventsCollection } from "@/lib/db";
import { mapApiEventToDetail } from "@/lib/aprochEvents";

export async function getPublicEventsFromDb(filter = {}) {
  const collection = await getAprochEventsCollection();
  const baseFilter = { isArchived: { $ne: true }, ...filter };
  const docs = await collection.find(baseFilter).sort({ eventDate: 1 }).toArray();
  return docs;
}

export async function getPublicEventById(id) {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) return null;
  const collection = await getAprochEventsCollection();
  const doc = await collection.findOne({
    _id: new mongoose.Types.ObjectId(id),
    isArchived: { $ne: true },
  });
  return doc ? mapApiEventToDetail(doc) : null;
}
