import { NextResponse } from "next/server";
import { getAprochNewsCollection } from "@/lib/db";

export async function GET(_request) {
  try {
    const collection = await getAprochNewsCollection();
    const items = await collection
      .find({ isArchived: { $ne: true } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: items });
  } catch (err) {
    console.error("GET /api/news error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to load news",
      },
      { status: 500 }
    );
  }
}

