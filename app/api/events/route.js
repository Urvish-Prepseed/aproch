import { NextResponse } from "next/server";
import { getAprochEventsCollection } from "@/lib/db";

const TYPE_MAP = {
  festivals: "Festival",
  festival: "Festival",
  workshops: "Workshop",
  workshop: "Workshop",
  programs: "Program",
  program: "Program",
  training: "Training",
};

export async function GET(request) {
  try {
    const collection = await getAprochEventsCollection();

    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get("type");

    const filter = { isArchived: { $ne: true } };

    if (typeParam && typeParam !== "ALL") {
      const normalized = typeParam.toLowerCase();
      const apiType = TYPE_MAP[normalized];
      if (!apiType) {
        return NextResponse.json(
          { success: false, error: "Invalid type filter" },
          { status: 400 }
        );
      }
      filter.type = apiType;
    }

    const events = await collection
      .find(filter)
      .sort({ eventDate: 1 })
      .toArray();

    return NextResponse.json({ success: true, data: events });
  } catch (err) {
    console.error("GET /api/events error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to load events",
      },
      { status: 500 }
    );
  }
}
