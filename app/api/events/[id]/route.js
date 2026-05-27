import { NextResponse } from "next/server";
import { getPublicEventById } from "@/lib/eventsServer";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const event = await getPublicEventById(id);

    if (!event) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: event });
  } catch (err) {
    console.error("GET /api/events/[id] error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to load event",
      },
      { status: 500 }
    );
  }
}
