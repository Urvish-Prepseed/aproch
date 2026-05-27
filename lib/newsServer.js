import mongoose from "mongoose";
import { getAprochNewsCollection } from "@/lib/db";
import { mapApiNewsToDetail, mapApiNewsToListItem } from "@/lib/aprochNews";

export async function getPublicNewsFromDb(filter = {}) {
  const collection = await getAprochNewsCollection();
  const baseFilter = { isArchived: { $ne: true }, ...filter };
  const docs = await collection.find(baseFilter).sort({ createdAt: -1 }).toArray();
  return docs;
}

export async function getPublicNewsList() {
  const docs = await getPublicNewsFromDb();
  return docs.map(mapApiNewsToListItem);
}

export async function getPublicNewsById(id) {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) return null;
  const collection = await getAprochNewsCollection();
  const doc = await collection.findOne({
    _id: new mongoose.Types.ObjectId(id),
    isArchived: { $ne: true },
  });
  return doc ? mapApiNewsToDetail(doc) : null;
}

